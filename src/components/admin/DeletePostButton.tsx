'use client'

import { removePost } from '@/app/admin/actions'

/**
 * Deletion is immediate and unrecoverable — there is no trash table — so it goes
 * through a confirm() naming the post rather than a bare submit button.
 */
export function DeletePostButton({ id, slug, title }: { id: string; slug: string; title: string }) {
  return (
    <form
      action={removePost}
      onSubmit={(event) => {
        if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) {
          event.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        className="rounded-lg border border-kitsu-border px-3 py-2 text-sm text-kitsu-dim transition-colors hover:border-red-500/40 hover:text-red-400"
      >
        Delete
      </button>
    </form>
  )
}
