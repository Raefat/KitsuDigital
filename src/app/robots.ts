import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/config/site'

/**
 * Vercel gives every commit its own public *.vercel.app URL. Those carry the
 * whole site, so if they are crawlable they compete with the real domain for the
 * same terms. Only the production deployment invites crawlers in.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'

  if (!isProduction) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
