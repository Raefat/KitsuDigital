import 'server-only'
import { query, isDatabaseConfigured } from '@/lib/db'
import {
  estimateReadingTime,
  type BlogPost,
  type BlogPostMeta,
} from '@/lib/blog-shared'

/**
 * Server-only blog data access. Everything a client component needs — the post
 * types, date formatting, slugify — lives in `@/lib/blog-shared`.
 *
 * Every public read is tolerant of a missing or unreachable database: the
 * marketing site is the business's front door, and it must not 500 because the
 * blog's Postgres is asleep. Reads degrade to "no posts"; the admin writes below
 * do not swallow anything, because losing a draft silently is worse.
 */

/** Row shape as stored. `body` is markdown; `content` on BlogPost is the same text. */
interface PostRow extends Record<string, unknown> {
  id: string
  slug: string
  title: string
  description: string
  body: string
  author: string
  tags: string[]
  featured: boolean
  published: boolean
  published_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface AdminPost extends BlogPost {
  id: string
  published: boolean
}

function toIsoDate(value: Date | null): string {
  return (value ?? new Date(0)).toISOString().slice(0, 10)
}

function toPost(row: PostRow): AdminPost {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: toIsoDate(row.published_at),
    // Only surface an "updated" date once it is meaningfully later than publish,
    // otherwise every post claims it was revised the second it went live.
    updated:
      row.published_at && row.updated_at.getTime() - row.published_at.getTime() > 86_400_000
        ? row.updated_at.toISOString().slice(0, 10)
        : undefined,
    author: row.author,
    tags: row.tags ?? [],
    readingTime: estimateReadingTime(row.body),
    featured: row.featured,
    published: row.published,
    content: row.body.trim(),
  }
}

const SELECT_COLUMNS = `
  id, slug, title, description, body, author, tags,
  featured, published, published_at, created_at, updated_at
`

/** Reads that must never take the site down. Returns `fallback` on any failure. */
async function safeRead<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  if (!isDatabaseConfigured()) return fallback
  try {
    return await run()
  } catch (error) {
    console.error('[blog] read failed, serving empty:', error)
    return fallback
  }
}

/** Published posts only, newest first. Drafts never leave the admin. */
export async function getAllPosts(): Promise<BlogPost[]> {
  return safeRead<BlogPost[]>([], async () => {
    const rows = await query<PostRow>(
      `SELECT ${SELECT_COLUMNS} FROM posts
       WHERE published = TRUE AND published_at IS NOT NULL
       ORDER BY published_at DESC`,
    )
    return rows.map(toPost)
  })
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts()
  return posts.map(({ content: _content, ...meta }) => meta)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return safeRead<BlogPost | null>(null, async () => {
    const rows = await query<PostRow>(
      `SELECT ${SELECT_COLUMNS} FROM posts
       WHERE slug = $1 AND published = TRUE AND published_at IS NOT NULL
       LIMIT 1`,
      [slug],
    )
    return rows[0] ? toPost(rows[0]) : null
  })
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  return [...new Set(posts.flatMap((post) => post.tags))].sort()
}

/** Posts sharing the most tags with `slug`, newest first, excluding itself. */
export async function getRelatedPosts(slug: string, limit = 2): Promise<BlogPostMeta[]> {
  const current = await getPostBySlug(slug)
  if (!current) return []

  const all = await getAllPostsMeta()
  return all
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      overlap: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map(({ post }) => post)
}

/* ---------------------------------------------------------------- admin --- */

/** Everything, drafts included. Admin only — never call from a public page. */
export async function getAdminPosts(): Promise<AdminPost[]> {
  const rows = await query<PostRow>(
    `SELECT ${SELECT_COLUMNS} FROM posts
     ORDER BY COALESCE(published_at, created_at) DESC`,
  )
  return rows.map(toPost)
}

export async function getAdminPostById(id: string): Promise<AdminPost | null> {
  const rows = await query<PostRow>(
    `SELECT ${SELECT_COLUMNS} FROM posts WHERE id = $1 LIMIT 1`,
    [id],
  )
  return rows[0] ? toPost(rows[0]) : null
}

export interface PostInput {
  slug: string
  title: string
  description: string
  body: string
  author: string
  tags: string[]
  featured: boolean
  published: boolean
  /** ISO date (YYYY-MM-DD). Ignored unless the post is published. */
  publishedAt: string | null
}

export async function createPost(input: PostInput): Promise<string> {
  const rows = await query<{ id: string }>(
    `INSERT INTO posts
       (slug, title, description, body, author, tags, featured, published, published_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id`,
    [
      input.slug,
      input.title,
      input.description,
      input.body,
      input.author,
      input.tags,
      input.featured,
      input.published,
      input.published ? (input.publishedAt ?? new Date().toISOString()) : null,
    ],
  )
  return String(rows[0].id)
}

export async function updatePost(id: string, input: PostInput): Promise<void> {
  await query(
    `UPDATE posts SET
       slug = $2, title = $3, description = $4, body = $5, author = $6,
       tags = $7, featured = $8, published = $9,
       -- Keep the original publish date when re-saving an already-live post, so
       -- editing a typo does not reorder the blog or churn the sitemap.
       published_at = CASE
         WHEN $9 = FALSE THEN NULL
         WHEN $10::timestamptz IS NOT NULL THEN $10::timestamptz
         ELSE COALESCE(published_at, NOW())
       END,
       updated_at = NOW()
     WHERE id = $1`,
    [
      id,
      input.slug,
      input.title,
      input.description,
      input.body,
      input.author,
      input.tags,
      input.featured,
      input.published,
      input.publishedAt,
    ],
  )
}

export async function deletePost(id: string): Promise<void> {
  await query(`DELETE FROM posts WHERE id = $1`, [id])
}

/** True when another post already owns this slug. */
export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const rows = await query<{ id: string }>(
    `SELECT id FROM posts WHERE slug = $1 AND ($2::bigint IS NULL OR id <> $2::bigint) LIMIT 1`,
    [slug, excludeId ?? null],
  )
  return rows.length > 0
}
