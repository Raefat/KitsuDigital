import 'server-only'
import { Pool } from 'pg'

/**
 * Postgres pool, created once per process.
 *
 * Next dev reloads modules on every edit, so the pool is cached on globalThis —
 * without that each save leaks a pool and you hit the connection limit within a
 * few minutes of editing.
 */

const globalForDb = globalThis as unknown as { kitsuPool?: Pool }

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL)
}

export function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set — see .env.example')
  }

  if (!globalForDb.kitsuPool) {
    globalForDb.kitsuPool = new Pool({
      connectionString,
      // Hosted Postgres (Neon, Supabase, Railway) terminates TLS at a proxy with
      // a cert chain node does not ship. Local Postgres usually has no TLS at all.
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
      // Serverless runs many short-lived instances, each with its own pool, so
      // the ceiling that matters is instances × max — not this number. Keep it
      // low and point DATABASE_URL at the provider's pooled endpoint.
      max: 3,
      idleTimeoutMillis: 10_000,
      // Fail fast instead of holding the function open until Vercel kills it;
      // the callers treat a throw as "no posts" and still render the page.
      connectionTimeoutMillis: 8_000,
    })

    // A pool that emits 'error' with no listener takes the process down.
    globalForDb.kitsuPool.on('error', (error) => {
      console.error('[db] idle client error:', error)
    })
  }

  return globalForDb.kitsuPool
}

export async function query<T extends Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await getPool().query(text, params)
  return result.rows as T[]
}
