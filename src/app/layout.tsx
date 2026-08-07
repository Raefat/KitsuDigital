import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { JsonLd } from '@/components/shared/JsonLd'
import { siteConfig, absoluteUrl } from '@/config/site'
import { organizationSchema, websiteSchema } from '@/lib/seo'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const grotesk = Space_Grotesk({
  variable: '--font-grotesk',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  // Required for OG/canonical URLs to resolve to absolute paths.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'digital agency Morocco',
    'agence web Maroc',
    'web development Morocco',
    'web design Marrakech',
    'création site web Maroc',
    'ecommerce development Morocco',
    'SEO Morocco',
    'UI/UX design',
    'Next.js agency',
    'AI automation',
    'branding',
    'landing pages',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: `${siteConfig.name} Journal` }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: ['/opengraph-image'],
    ...(siteConfig.social.x ? { creator: siteConfig.social.x } : {}),
  },
  category: 'technology',
  // Add the Google Search Console token here once the property is verified.
  // verification: { google: 'xxx' },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} Journal`} href={absoluteUrl('/rss.xml')} />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} ${grotesk.variable} bg-kitsu-bg font-sans text-white antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-lg focus:bg-fox focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
