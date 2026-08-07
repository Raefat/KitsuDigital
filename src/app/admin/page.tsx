import type { Metadata } from 'next'
import Link from 'next/link'
import { getAdminPosts } from '@/lib/blog'
import { isDatabaseConfigured } from '@/lib/db'
import { formatPostDate } from '@/lib/blog-shared'
import { logout } from '@/app/admin/actions'
import { DeletePostButton } from '@/components/admin/DeletePostButton'

export const metadata: Metadata = {
  title: 'Journal admin',
  robots: { index: false, follow: false },
}

// Always reflect the database as it is right now — a cached admin list would
// show a post as still-draft seconds after publishing it.
export const dynamic = 'force-dynamic'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>
}) {
  const { saved, deleted } = await searchParams

  if (!isDatabaseConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-20">
        <h1 className="mb-4 font-heading text-2xl font-bold text-white">Database not connected</h1>
        <p className="text-kitsu-muted">
          Set <code className="text-fox">DATABASE_URL</code> in your environment and run the schema
          in <code className="text-fox">db/schema.sql</code>, then reload this page.
        </p>
      </main>
    )
  }

  const posts = await getAdminPosts()

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 md:py-16">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 font-accent text-xs uppercase tracking-[0.2em] text-fox">
            Kitsu Digital
          </p>
          <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">Journal</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/new"
            className="rounded-lg bg-fox px-4 py-2.5 text-sm font-semibold text-kitsu-bg transition-opacity hover:opacity-90"
          >
            New post
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-kitsu-border px-4 py-2.5 text-sm text-kitsu-muted transition-colors hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {(saved || deleted) && (
        <p className="mb-6 rounded-lg border border-fox/30 bg-fox/5 px-4 py-3 text-sm text-fox">
          {saved ? 'Post saved.' : 'Post deleted.'}
        </p>
      )}

      {posts.length === 0 ? (
        <p className="rounded-xl border border-kitsu-border bg-kitsu-surface p-10 text-center text-kitsu-muted">
          No posts yet. Write the first one.
        </p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-kitsu-border bg-kitsu-surface p-5"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 font-accent text-[0.6875rem] uppercase tracking-wider ${
                      post.published
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-kitsu-border/40 text-kitsu-dim'
                    }`}
                  >
                    {post.published ? 'Live' : 'Draft'}
                  </span>
                  {post.featured && (
                    <span className="rounded-full bg-fox/10 px-2 py-0.5 font-accent text-[0.6875rem] uppercase tracking-wider text-fox">
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="truncate font-heading font-semibold text-white">{post.title}</h2>
                <p className="mt-1 font-accent text-xs text-kitsu-dim">
                  /{post.slug}
                  {post.published && ` · ${formatPostDate(post.date)}`}
                  {` · ${post.readingTime} min`}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {post.published && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="rounded-lg border border-kitsu-border px-3 py-2 text-sm text-kitsu-muted transition-colors hover:text-white"
                  >
                    View
                  </Link>
                )}
                <Link
                  href={`/admin/${post.id}`}
                  className="rounded-lg border border-kitsu-border px-3 py-2 text-sm text-kitsu-muted transition-colors hover:text-white"
                >
                  Edit
                </Link>
                <DeletePostButton id={post.id} slug={post.slug} title={post.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
