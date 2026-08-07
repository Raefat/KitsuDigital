import { siteConfig, absoluteUrl, activeSocials } from '@/config/site'
import type { BlogPostMeta } from '@/lib/blog-shared'

/**
 * JSON-LD builders. Everything emitted here is read by search engines, so it
 * must stay in sync with what is actually visible on the page — mismatched
 * structured data is a manual-action risk, not just wasted markup.
 */

type Json = Record<string, unknown>

const ORGANIZATION_ID = absoluteUrl('/#organization')
const WEBSITE_ID = absoluteUrl('/#website')

function postalAddress(): Json {
  const { address } = siteConfig
  return {
    '@type': 'PostalAddress',
    ...(address.street ? { streetAddress: address.street } : {}),
    addressLocality: address.city,
    addressRegion: address.region,
    ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    addressCountry: address.country,
  }
}

/**
 * ProfessionalService is a LocalBusiness subtype — it carries the local signals
 * (address, area served, languages) that a plain Organization cannot.
 */
export function organizationSchema(): Json {
  const socials = activeSocials().map((social) => social.href)

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl('/logo.svg'),
    image: absoluteUrl('/opengraph-image'),
    foundingDate: siteConfig.founded,
    address: postalAddress(),
    areaServed: siteConfig.areaServed.map((code) => ({
      '@type': 'Country',
      identifier: code,
    })),
    knowsLanguage: siteConfig.languages,
    priceRange: '$$',
    ...(socials.length ? { sameAs: socials } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.contact.email,
      ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
      availableLanguage: siteConfig.languages,
      areaServed: siteConfig.areaServed,
    },
  }
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  }
}

/** Drives the service list in rich results. Mirror the Services section exactly. */
export function servicesSchema(services: Array<{ title: string; description: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteConfig.name} services`,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: siteConfig.areaServed,
      },
    })),
  }
}

/** Only valid when the same Q&A pairs are visible on the page. */
export function faqSchema(faqs: Array<{ question: string; answer: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function blogPostingSchema(post: BlogPostMeta): Json {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: post.author, '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: url,
    url,
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    keywords: post.tags.join(', '),
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
  }
}

export function blogSchema(posts: BlogPostMeta[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': absoluteUrl('/blog#blog'),
    name: `${siteConfig.name} Journal`,
    description:
      'Practical notes on web performance, SEO and building digital products that earn their keep.',
    url: absoluteUrl('/blog'),
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  }
}
