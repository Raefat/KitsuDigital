import type { Metadata } from 'next'
import Link from 'next/link'
import { PostEditor } from '@/components/admin/PostEditor'

export const metadata: Metadata = {
  title: 'New post',
  robots: { index: false, follow: false },
}

// This page has no dynamic data of its own, so Next would happily prerender it
// at build time — but a statically rendered form cannot carry a server-action
// binding, which leaves the editor broken whenever JS fails to load.
export const dynamic = 'force-dynamic'

export default function NewPostPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <Link href="/admin" className="mb-6 inline-block text-sm text-kitsu-muted hover:text-fox">
        ← Journal
      </Link>
      <h1 className="mb-10 font-heading text-2xl font-bold text-white md:text-3xl">New post</h1>
      <PostEditor />
    </main>
  )
}
