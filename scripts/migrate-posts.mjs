/**
 * Copies posts from one Postgres to another — local Docker → Neon, or between
 * any two databases.
 *
 *   node --env-file=.env.local scripts/migrate-posts.mjs
 *
 * Reads SOURCE_DATABASE_URL (defaults to DATABASE_URL) and writes to
 * TARGET_DATABASE_URL. Creates the table on the target if it is missing.
 *
 * Matching is by slug, so re-running updates rather than duplicating. Ids are
 * deliberately not carried over — the target keeps its own sequence, and the
 * site addresses posts by slug everywhere.
 *
 * Add --dry-run to see what it would do without writing anything.
 */

import fs from 'node:fs'
import path from 'node:path'
import pg from 'pg'

const DRY_RUN = process.argv.includes('--dry-run')

const sourceUrl = process.env.SOURCE_DATABASE_URL || process.env.DATABASE_URL
const targetUrl = process.env.TARGET_DATABASE_URL

if (!sourceUrl) {
  console.error('Set SOURCE_DATABASE_URL (or DATABASE_URL) to the database to copy FROM.')
  process.exit(1)
}
if (!targetUrl) {
  console.error('Set TARGET_DATABASE_URL to the database to copy TO (your Neon string).')
  process.exit(1)
}
if (sourceUrl === targetUrl) {
  console.error('Source and target are the same database — refusing to run.')
  process.exit(1)
}

const connect = (connectionString) =>
  new pg.Pool({
    connectionString,
    ssl: /localhost|127\.0\.0\.1/.test(connectionString) ? false : { rejectUnauthorized: false },
  })

const source = connect(sourceUrl)
const target = connect(targetUrl)

/** Host only — never print the credentials embedded in a connection string. */
const describe = (url) => {
  try {
    return new URL(url).host
  } catch {
    return '(unparseable url)'
  }
}

console.log(`source: ${describe(sourceUrl)}`)
console.log(`target: ${describe(targetUrl)}${DRY_RUN ? '  [DRY RUN]' : ''}\n`)

try {
  // The target may be a brand new Neon project with nothing in it.
  const schemaPath = path.join(process.cwd(), 'db', 'schema.sql')
  if (!DRY_RUN && fs.existsSync(schemaPath)) {
    await target.query(fs.readFileSync(schemaPath, 'utf8'))
    console.log('target schema ensured (CREATE TABLE IF NOT EXISTS)\n')
  }

  const { rows } = await source.query(
    `SELECT slug, title, description, body, author, tags, featured, published,
            published_at, created_at
       FROM posts
      ORDER BY COALESCE(published_at, created_at)`,
  )

  if (rows.length === 0) {
    console.log('No posts in the source database — nothing to copy.')
    process.exit(0)
  }

  let inserted = 0
  let updated = 0

  for (const post of rows) {
    if (DRY_RUN) {
      console.log(`  would copy ${post.slug} (${post.published ? 'live' : 'draft'})`)
      continue
    }

    const result = await target.query(
      `INSERT INTO posts
         (slug, title, description, body, author, tags, featured, published, published_at, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title,
         description = EXCLUDED.description,
         body = EXCLUDED.body,
         author = EXCLUDED.author,
         tags = EXCLUDED.tags,
         featured = EXCLUDED.featured,
         published = EXCLUDED.published,
         published_at = EXCLUDED.published_at,
         updated_at = NOW()
       RETURNING (xmax = 0) AS was_inserted`,
      [
        post.slug,
        post.title,
        post.description,
        post.body,
        post.author,
        post.tags,
        post.featured,
        post.published,
        post.published_at,
        post.created_at,
      ],
    )

    if (result.rows[0].was_inserted) {
      inserted += 1
      console.log(`  + ${post.slug}`)
    } else {
      updated += 1
      console.log(`  ~ ${post.slug} (updated)`)
    }
  }

  if (DRY_RUN) {
    console.log(`\nDry run: ${rows.length} post(s) would be copied. Nothing was written.`)
  } else {
    const { rows: check } = await target.query('SELECT COUNT(*)::int AS n FROM posts')
    console.log(`\nDone. ${inserted} inserted, ${updated} updated.`)
    console.log(`Target now holds ${check[0].n} post(s).`)
  }
} catch (error) {
  console.error('\nMigration failed:', error.message)
  process.exitCode = 1
} finally {
  await source.end()
  await target.end()
}
