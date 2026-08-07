'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import {
  SESSION_COOKIE,
  createSessionToken,
  isPasswordCorrect,
  sessionCookieOptions,
  verifySessionToken,
} from '@/lib/auth'
import { createPost, deletePost, slugExists, updatePost, type PostInput } from '@/lib/blog'
import { slugify } from '@/lib/blog-shared'

export interface ActionState {
  error?: string
  fieldErrors?: Record<string, string>
}

/**
 * Every mutating action re-checks the session. Middleware already redirects
 * unauthenticated page loads, but server actions are POST endpoints that can be
 * called directly — they cannot rely on a redirect that only guards navigation.
 */
async function requireSession(): Promise<void> {
  const store = await cookies()
  if (!(await verifySessionToken(store.get(SESSION_COOKIE)?.value))) {
    redirect('/admin/login')
  }
}

/* ----------------------------------------------------------------- auth --- */

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/admin')

  if (!password) return { error: 'Enter your password.' }

  try {
    if (!isPasswordCorrect(password)) {
      return { error: 'That password is not right.' }
    }
  } catch (error) {
    console.error('[admin] auth is not configured:', error)
    return { error: 'Admin access is not configured on this server yet.' }
  }

  const store = await cookies()
  store.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions)

  // Only ever bounce to an in-app path, so a crafted ?next= cannot turn the
  // login form into an open redirect.
  redirect(next.startsWith('/admin') ? next : '/admin')
}

export async function logout(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  redirect('/admin/login')
}

/* ---------------------------------------------------------------- posts --- */

const postSchema = z.object({
  title: z.string().trim().min(3, 'Give the post a title'),
  slug: z.string().trim().max(80).optional(),
  description: z.string().trim().min(10, 'Write a short summary — it is the search snippet').max(300),
  body: z.string().trim().min(20, 'The post body is empty'),
  author: z.string().trim().min(2).max(100),
  tags: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD').optional().or(z.literal('')),
})

function readForm(formData: FormData) {
  return postSchema.safeParse({
    title: formData.get('title') ?? '',
    slug: formData.get('slug') ?? '',
    description: formData.get('description') ?? '',
    body: formData.get('body') ?? '',
    author: formData.get('author') ?? 'Kitsu Digital',
    tags: formData.get('tags') ?? '',
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
    publishedAt: formData.get('publishedAt') ?? '',
  })
}

function toInput(data: z.infer<typeof postSchema>, slug: string): PostInput {
  return {
    slug,
    title: data.title,
    description: data.description,
    body: data.body,
    author: data.author,
    tags: (data.tags ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 6),
    featured: data.featured,
    published: data.published,
    publishedAt: data.publishedAt ? data.publishedAt : null,
  }
}

/** Refresh every surface that lists posts, so a publish shows up immediately. */
function revalidateBlog(slug: string) {
  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/sitemap.xml')
}

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? '')
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message
  }
  return fieldErrors
}

export async function savePost(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession()

  const id = String(formData.get('id') ?? '').trim() || null
  const parsed = readForm(formData)

  if (!parsed.success) {
    return { error: 'Please fix the highlighted fields.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }

  const slug = slugify(parsed.data.slug || parsed.data.title)
  if (!slug) {
    return { error: 'Could not build a URL from that title.', fieldErrors: { slug: 'Enter a slug' } }
  }

  if (await slugExists(slug, id ?? undefined)) {
    return {
      error: 'Another post already uses that URL.',
      fieldErrors: { slug: 'This slug is taken' },
    }
  }

  const input = toInput(parsed.data, slug)

  try {
    if (id) {
      await updatePost(id, input)
    } else {
      await createPost(input)
    }
  } catch (error) {
    console.error('[admin] save failed:', error)
    return { error: 'Could not save the post. Check the server logs.' }
  }

  revalidateBlog(slug)
  redirect('/admin?saved=1')
}

export async function removePost(formData: FormData): Promise<void> {
  await requireSession()

  const id = String(formData.get('id') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim()
  if (!id) return

  await deletePost(id)
  revalidateBlog(slug)
  redirect('/admin?deleted=1')
}
