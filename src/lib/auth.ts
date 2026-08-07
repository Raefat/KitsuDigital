/**
 * Single-operator admin auth: one shared password, one signed session cookie.
 *
 * Deliberately not a user system — there is one person publishing here, and a
 * users table would be more attack surface and more code for no benefit. Built
 * on Web Crypto rather than node:crypto so middleware (Edge runtime) and server
 * actions can both verify the same token.
 */

export const SESSION_COOKIE = 'kitsu_admin'
const SESSION_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 16) {
    throw new Error('AUTH_SECRET is missing or too short (need 16+ chars) — see .env.example')
  }
  return secret
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return toBase64Url(new Uint8Array(signature))
}

/** Length-independent equality — avoids leaking the secret through timing. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS
  return `${expiresAt}.${await sign(String(expiresAt))}`
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false

  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature) return false

  // Check expiry before the HMAC so an expired token cannot be replayed even if
  // the secret later leaks.
  const expiry = Number(expiresAt)
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false

  try {
    return timingSafeEqual(signature, await sign(expiresAt))
  } catch {
    return false
  }
}

export function isPasswordCorrect(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    throw new Error('ADMIN_PASSWORD is not set — see .env.example')
  }
  return timingSafeEqual(candidate, expected)
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET)
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_TTL_MS / 1000,
}
