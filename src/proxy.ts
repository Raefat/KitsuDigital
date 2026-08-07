import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth'

/**
 * Gate for /admin. (Next 16 renamed the `middleware` convention to `proxy`.)
 *
 * The pages and server actions check the session again on their own — this is
 * the fast path, not the only lock, because a route that trusts the proxy alone
 * breaks open the moment its matcher is edited.
 */
export async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

  if (authed && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (!authed && !isLoginPage) {
    const loginUrl = new URL('/admin/login', request.url)
    // Send them back where they were headed once they are through.
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
