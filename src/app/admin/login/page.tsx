import type { Metadata } from 'next'
import { LoginForm } from '@/components/admin/LoginForm'

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <p className="mb-2 font-accent text-xs uppercase tracking-[0.2em] text-fox">
          Kitsu Digital
        </p>
        <h1 className="mb-8 font-heading text-2xl font-bold text-white">Journal admin</h1>
        <LoginForm next={next ?? '/admin'} />
      </div>
    </main>
  )
}
