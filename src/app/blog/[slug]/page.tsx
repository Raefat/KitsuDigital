import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Navigation } from '@/components/sections/Navigation'
import { Footer } from '@/components/sections/Footer'
import { Container } from '@/components/shared/Container'
import { JsonLd } from '@/components/shared/JsonLd'
import { Markdown } from '@/components/blog/Markdown'
import { PostCard } from '@/components/blog/PostCard'
import { getAllPostsMeta, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { formatPostDate } from '@/lib/blog-shared'
import { blogPostingSchema, breadcrumbSchema } from '@/lib/seo'
import { siteConfig } from '@/config/site'

// Prerender whatever exists at build time, then serve anything published since
// on demand and cache it. Without dynamicParams a post added through the admin
// would 404 until the next deploy.
export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getAllPostsMeta()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Article not found', robots: { index: false, follow: false } }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags],
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: [...post.tags],
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const { content: _content, ...meta } = post
  const related = await getRelatedPosts(slug)

  return (
    <>
      <JsonLd
        schema={[
          blogPostingSchema(meta),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <Navigation />

      <main id="main">
        <article>
          {/* Header */}
          <header className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14">
            <div
              className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.09) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              aria-hidden="true"
            />
            <Container size="narrow" className="relative z-10">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm text-kitsu-dim transition-colors duration-300 hover:text-fox"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                All articles
              </Link>

              <div className="mb-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-fox/20 bg-fox/5 px-2.5 py-1 font-accent text-[0.6875rem] uppercase tracking-[0.14em] text-fox"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mb-6 font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
                {post.title}
              </h1>

              <p className="mb-7 text-lg leading-relaxed text-kitsu-muted">{post.description}</p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-kitsu-border pt-6 font-accent text-sm text-kitsu-dim">
                <span className="text-kitsu-muted">{post.author}</span>
                <span className="text-kitsu-border">·</span>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span className="text-kitsu-border">·</span>
                <span>{post.readingTime} min read</span>
              </div>
            </Container>
          </header>

          {/* Body */}
          <Container size="narrow" className="pb-20 md:pb-28">
            <Markdown content={post.content} />
          </Container>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-kitsu-border py-16 md:py-20" aria-labelledby="related-heading">
            <Container>
              <h2
                id="related-heading"
                className="mb-8 font-heading text-xl font-semibold text-white md:text-2xl"
              >
                Keep reading
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {related.map((item, i) => (
                  <PostCard key={item.slug} post={item} index={i} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-kitsu-border py-16 md:py-20">
          <Container size="narrow">
            <div className="text-center">
              <h2 className="mb-4 font-heading text-2xl font-bold text-white md:text-3xl">
                Have a project in mind?
              </h2>
              <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-kitsu-muted md:text-base">
                Tell us what you are building and we will come back with a plan, a timeline
                and a number.
              </p>
              <Link
                href="/#contact"
                className="inline-block rounded-full bg-fox px-8 py-3.5 font-semibold text-white fox-glow transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]"
              >
                Start a conversation
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
