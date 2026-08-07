'use client'

import { useActionState } from 'react'
import { login, type ActionState } from '@/app/admin/actions'

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(login, {})

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-kitsu-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className="w-full rounded-lg border border-kitsu-border bg-kitsu-surface px-4 py-3 text-white outline-none transition-colors focus:border-fox/50"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-fox px-5 py-3 font-semibold text-kitsu-bg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? 'Checking…' : 'Sign in'}
      </button>
    </form>
  )
}
