import { ImageResponse } from 'next/og'
import { getAllPostsMeta, getPostBySlug } from '@/lib/blog'
import { formatPostDate } from '@/lib/blog-shared'
import { siteConfig } from '@/config/site'

export const alt = 'Kitsu Digital article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  const posts = await getAllPostsMeta()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  const title = post?.title ?? `${siteConfig.name} Journal`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0F',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: -220,
            left: -160,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background:
              'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.26) 0%, rgba(10,10,15,0) 68%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="46" height="46" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 15 L65 5 L72 30 L85 25 L78 50 L90 55 L70 60 L72 80 L50 70 L28 80 L30 60 L10 55 L22 50 L15 25 L28 30 L35 5 Z"
              stroke="#F97316"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: 'flex', marginLeft: 16, fontSize: 28, fontWeight: 700, color: '#FFFFFF' }}>
            <span>Kitsu</span>
            <span style={{ color: '#F97316' }}>Digital</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {post ? (
            <div
              style={{
                display: 'flex',
                fontSize: 26,
                color: '#F97316',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              {post.tags[0] ?? 'Journal'}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 60 ? 60 : 70,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#71717A' }}>
            {post ? `${formatPostDate(post.date)} · ${post.readingTime} min read` : siteConfig.name}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#F97316' }}>
            {siteConfig.url.replace(/^https?:\/\//, '')}/blog
          </div>
        </div>
      </div>
    ),
    size,
  )
}
