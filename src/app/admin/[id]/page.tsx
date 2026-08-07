import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAdminPostById } from '@/lib/blog'
import { PostEditor } from '@/components/admin/PostEditor'

export const metadata: Metadata = {
  title: 'Edit post',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Ids come from the URL — a non-numeric one would make Postgres throw on the
  // bigint cast rather than simply not matching.
  if (!/^\d+$/.test(id)) notFound()

  const post = await getAdminPostById(id)
  if (!post) notFound()

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <Link href="/admin" className="mb-6 inline-block text-sm text-kitsu-muted hover:text-fox">
        ← Journal
      </Link>
      <h1 className="mb-10 font-heading text-2xl font-bold text-white md:text-3xl">Edit post</h1>
      <PostEditor post={post} />
    </main>
  )
}
