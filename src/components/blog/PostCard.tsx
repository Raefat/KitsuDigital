'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { formatPostDate, type BlogPostMeta } from '@/lib/blog-shared'

export function PostCard({
  post,
  index = 0,
  featured = false,
}: {
  post: BlogPostMeta
  index?: number
  featured?: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={featured ? 'md:col-span-2' : undefined}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex h-full flex-col rounded-2xl border border-kitsu-border bg-kitsu-surface p-6 transition-all duration-500 hover:border-fox/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] focus-visible:border-fox/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fox/40 md:p-7"
      >
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-fox/20 bg-fox/5 px-2.5 py-1 font-accent text-[0.6875rem] uppercase tracking-[0.14em] text-fox"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className={`mb-3 font-heading font-semibold text-white transition-colors duration-300 group-hover:text-fox-glow ${
            featured ? 'text-2xl md:text-[1.75rem]' : 'text-lg md:text-xl'
          }`}
        >
          {post.title}
        </h3>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-kitsu-muted">{post.description}</p>

        <div className="flex items-center justify-between border-t border-kitsu-border/60 pt-4">
          <span className="font-accent text-xs text-kitsu-dim">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="mx-2 text-kitsu-border">·</span>
            {post.readingTime} min read
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-fox transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-fox/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>
    </motion.article>
  )
}
