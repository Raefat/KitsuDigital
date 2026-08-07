import type { Metadata } from 'next'
import { LoginForm } from '@/components/admin/LoginForm'
import { isAuthConfigured } from '@/lib/auth'
import { isDatabaseConfigured } from '@/lib/db'

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

  // Which variables are missing, never their values. Without this a
  // misconfigured deployment just refuses the right password with no clue why.
  const missing = [
    !isAuthConfigured() && 'ADMIN_PASSWORD / AUTH_SECRET',
    !isDatabaseConfigured() && 'DATABASE_URL',
  ].filter(Boolean) as string[]

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <p className="mb-2 font-accent text-xs uppercase tracking-[0.2em] text-fox">
          Kitsu Digital
        </p>
        <h1 className="mb-8 font-heading text-2xl font-bold text-white">Journal admin</h1>

        {missing.length > 0 && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-300"
          >
            <p className="mb-1 font-semibold">This server is missing configuration</p>
            <p className="text-amber-300/80">
              Not set here: {missing.join(', ')}. Add them in your host&apos;s environment
              variables, then redeploy — existing builds do not pick up new values.
            </p>
          </div>
        )}

        <LoginForm next={next ?? '/admin'} />
      </div>
    </main>
  )
}
