'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { savePost, type ActionState } from '@/app/admin/actions'
import { estimateReadingTime, slugify, type BlogPost } from '@/lib/blog-shared'

interface EditablePost extends BlogPost {
  id: string
  published: boolean
}

const inputClass =
  'w-full rounded-lg border border-kitsu-border bg-kitsu-surface px-4 py-3 text-white outline-none transition-colors focus:border-fox/50'

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-kitsu-muted">{label}</label>
        {hint && <span className="font-accent text-xs text-kitsu-dim">{hint}</span>}
      </div>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function PostEditor({ post }: { post?: EditablePost }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(savePost, {})

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [body, setBody] = useState(post?.content ?? '')
  const [showPreview, setShowPreview] = useState(false)

  // An empty slug field means "follow the title" — the server does the same, so
  // what is shown here is what gets saved.
  const effectiveSlug = slugify(slug || title)
  const errors = state.fieldErrors ?? {}

  return (
    <form action={formAction} className="space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <Field label="Title" error={errors.title}>
        <input
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className={inputClass}
          placeholder="Why Moroccan websites load slowly"
        />
      </Field>

      <Field
        label="URL slug"
        hint={effectiveSlug ? `/blog/${effectiveSlug}` : 'follows the title'}
        error={errors.slug}
      >
        <input
          name="slug"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          className={inputClass}
          placeholder="leave empty to generate from the title"
        />
      </Field>

      <Field
        label="Summary"
        hint="shown on cards and in Google results"
        error={errors.description}
      >
        <textarea
          name="description"
          defaultValue={post?.description ?? ''}
          rows={2}
          required
          className={`${inputClass} resize-y`}
        />
      </Field>

      <Field
        label="Body"
        hint={`markdown · ${estimateReadingTime(body)} min read`}
        error={errors.body}
      >
        <div className="mb-2 flex gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              !showPreview ? 'bg-fox/10 text-fox' : 'text-kitsu-dim hover:text-white'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              showPreview ? 'bg-fox/10 text-fox' : 'text-kitsu-dim hover:text-white'
            }`}
          >
            Preview
          </button>
        </div>

        {showPreview ? (
          <div className="min-h-[420px] whitespace-pre-wrap rounded-lg border border-kitsu-border bg-kitsu-surface p-5 text-sm leading-relaxed text-kitsu-muted">
            {body || 'Nothing to preview yet.'}
          </div>
        ) : (
          <textarea
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={20}
            required
            className={`${inputClass} resize-y font-mono text-sm leading-relaxed`}
            placeholder={'## A heading\n\nYour first paragraph.'}
          />
        )}
        {/* Preview swaps the textarea out of the DOM, so carry the value along. */}
        {showPreview && <input type="hidden" name="body" value={body} />}
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Tags" hint="comma separated, max 6" error={errors.tags}>
          <input
            name="tags"
            defaultValue={post?.tags.join(', ') ?? ''}
            className={inputClass}
            placeholder="SEO, Performance, Morocco"
          />
        </Field>

        <Field label="Author" error={errors.author}>
          <input
            name="author"
            defaultValue={post?.author ?? 'Kitsu Digital'}
            required
            className={inputClass}
          />
        </Field>
      </div>

      <Field
        label="Publish date"
        hint="leave empty to use today"
        error={errors.publishedAt}
      >
        <input
          type="date"
          name="publishedAt"
          defaultValue={post?.published ? post.date : ''}
          className={inputClass}
        />
      </Field>

      <div className="flex flex-wrap gap-6 rounded-xl border border-kitsu-border bg-kitsu-surface p-5">
        <label className="flex items-center gap-3 text-sm text-kitsu-muted">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? false}
            className="h-4 w-4 accent-fox"
          />
          Published
          <span className="font-accent text-xs text-kitsu-dim">(drafts stay private)</span>
        </label>

        <label className="flex items-center gap-3 text-sm text-kitsu-muted">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={post?.featured ?? false}
            className="h-4 w-4 accent-fox"
          />
          Featured
        </label>
      </div>

      {state.error && (
        <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-fox px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? 'Saving…' : post ? 'Save changes' : 'Create post'}
        </button>
        <Link
          href="/admin"
          className="rounded-lg border border-kitsu-border px-5 py-3 text-sm text-kitsu-muted transition-colors hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
