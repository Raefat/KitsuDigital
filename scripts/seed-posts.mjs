/**
 * One-off migration: loads the markdown files in content/blog into Postgres.
 *
 *   node --env-file=.env.local scripts/seed-posts.mjs
 *
 * Idempotent — re-running updates the existing row for a slug rather than
 * inserting a duplicate, so it is safe to run again after editing a file.
 */

import fs from 'node:fs'
import path from 'node:path'
import pg from 'pg'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function parseFrontMatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) return { data: {}, body: raw }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(':')
    if (sep === -1) continue
    const key = line.slice(0, sep).trim()
    let value = line.slice(sep + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, body: match[2] }
}

function parseList(value) {
  if (!value) return []
  return value
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((item) => item.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean)
}

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL is not set. Pass it via --env-file=.env.local')
  process.exit(1)
}

if (!fs.existsSync(BLOG_DIR)) {
  console.error(`No content directory at ${BLOG_DIR} — nothing to seed.`)
  process.exit(1)
}

const pool = new pg.Pool({
  connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
})

const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'))
if (files.length === 0) {
  console.log('No markdown files found — nothing to seed.')
  await pool.end()
  process.exit(0)
}

let inserted = 0
let updated = 0

for (const file of files) {
  const slug = file.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
  const { data, body } = parseFrontMatter(raw)

  const result = await pool.query(
    `INSERT INTO posts
       (slug, title, description, body, author, tags, featured, published, published_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, $8)
     ON CONFLICT (slug) DO UPDATE SET
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       body = EXCLUDED.body,
       author = EXCLUDED.author,
       tags = EXCLUDED.tags,
       featured = EXCLUDED.featured,
       updated_at = NOW()
     RETURNING (xmax = 0) AS was_inserted`,
    [
      slug,
      data.title ?? slug,
      data.description ?? '',
      body.trim(),
      data.author ?? 'Kitsu Digital',
      parseList(data.tags),
      data.featured === 'true',
      data.date ?? new Date().toISOString().slice(0, 10),
    ],
  )

  if (result.rows[0].was_inserted) {
    inserted += 1
    console.log(`  + ${slug}`)
  } else {
    updated += 1
    console.log(`  ~ ${slug} (updated)`)
  }
}

console.log(`\nDone. ${inserted} inserted, ${updated} updated.`)
await pool.end()
