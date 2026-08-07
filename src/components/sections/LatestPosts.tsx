import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { PostCard } from '@/components/blog/PostCard'
import { getAllPostsMeta } from '@/lib/blog'

/**
 * Server component — reads the three most recent posts straight from Postgres,
 * so the homepage links to them without a client fetch. Renders nothing at all
 * when there are no posts yet, rather than an empty section.
 */
export async function LatestPosts() {
  const posts = (await getAllPostsMeta()).slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section id="journal" className="relative scroll-mt-20 py-24 md:py-32" aria-labelledby="journal-heading">
      <Container>
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 font-accent text-xs uppercase tracking-[0.2em] text-fox">
              The Journal
            </p>
            <h2
              id="journal-heading"
              className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            >
              What we have <span className="gradient-text-fox">learned</span> building
            </h2>
            <p className="text-base leading-relaxed text-kitsu-muted md:text-lg">
              Practical notes on performance, search visibility and the decisions that
              separate a site that works from one that just exists.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-fox transition-colors hover:text-fox-light"
          >
            All articles
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
