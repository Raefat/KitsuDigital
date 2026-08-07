import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/sections/Navigation'
import { Footer } from '@/components/sections/Footer'
import { Container } from '@/components/shared/Container'
import { JsonLd } from '@/components/shared/JsonLd'
import { PostCard } from '@/components/blog/PostCard'
import { getAllPostsMeta, getAllTags } from '@/lib/blog'
import { blogSchema, breadcrumbSchema } from '@/lib/seo'
import { siteConfig } from '@/config/site'

const title = 'Journal'
const description =
  'Practical notes on web performance, SEO and building digital products that earn their keep — written by the team at Kitsu Digital.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: `${title} | ${siteConfig.name}`,
    description,
    url: '/blog',
  },
}

// Posts live in Postgres now, so the index is rebuilt on demand rather than
// frozen at build time. A new post is live within the minute without a deploy.
export const revalidate = 60

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPostsMeta(), getAllTags()])
  const [lead, ...rest] = posts

  return (
    <>
      <JsonLd
        schema={[
          blogSchema(posts),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blog' },
          ]),
        ]}
      />
      <Navigation />

      <main id="main">
        {/* Header */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.10) 0%, rgba(253,186,116,0.04) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />
          <Container className="relative z-10">
            <p className="mb-3 font-accent text-xs uppercase tracking-[0.2em] text-fox">
              The Kitsu Journal
            </p>
            <h1 className="mb-5 max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              Notes on building things that{' '}
              <span className="gradient-text-fox">actually work</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-kitsu-muted md:text-lg">
              {description}
            </p>

            {tags.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-kitsu-border bg-kitsu-surface px-3 py-1.5 font-accent text-xs text-kitsu-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>

        {/* Posts */}
        <section className="pb-24 md:pb-32" aria-label="Articles">
          <Container>
            {posts.length === 0 ? (
              <p className="rounded-2xl border border-kitsu-border bg-kitsu-surface p-10 text-center text-kitsu-muted">
                No articles published yet — the first one is on its way.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {lead && <PostCard post={lead} index={0} featured />}
                {rest.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i + 1} />
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* CTA */}
        <section className="pb-24 md:pb-32">
          <Container>
            <div className="relative overflow-hidden rounded-2xl border border-fox/20 bg-kitsu-surface p-10 text-center md:p-14">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.10) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <h2 className="mb-4 font-heading text-2xl font-bold text-white md:text-3xl">
                  Want this applied to your site?
                </h2>
                <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-kitsu-muted md:text-base">
                  We audit, rebuild and maintain sites for brands across Morocco and beyond.
                  Tell us what you are working on.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block rounded-full bg-fox px-8 py-3.5 font-semibold text-white fox-glow transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
