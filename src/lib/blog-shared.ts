/**
 * The client-safe half of the blog module: the post shape and pure helpers,
 * with no database or filesystem access.
 *
 * Kept separate from `@/lib/blog` on purpose — that module talks to Postgres and
 * is marked `server-only`, so a client component importing from it fails the
 * build. Client components import from here instead.
 */

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  author: string
  tags: string[]
  readingTime: number
  featured: boolean
  content: string
}

export type BlogPostMeta = Omit<BlogPost, 'content'>

/** ~200 wpm, rounded, floor of 1 minute. */
export function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Lowercase, strip accents and punctuation, collapse to hyphens. */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip the accents NFD just split off
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
