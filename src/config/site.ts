/**
 * Single source of truth for business data, contact details and SEO defaults.
 *
 * Values marked PLACEHOLDER are not real yet — they were inherited from the
 * original template. Replace them before going live: they are emitted into
 * structured data and search engines will index whatever is here.
 */

export const siteConfig = {
  name: 'Kitsu Digital',
  legalName: 'Kitsu Digital',
  // Used for canonical URLs, sitemap, OG tags. Must be the live origin, no trailing slash.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kitsudigital.com',

  tagline: 'Premium Digital Products That Convert',
  description:
    'Moroccan digital agency building high-converting websites, web apps and e-commerce for ambitious brands. Design, development, SEO and AI automation — delivered in English, French and Arabic.',
  shortDescription:
    'We design and build premium websites, web apps and online stores for ambitious brands.',

  founded: '2023', // PLACEHOLDER — set the real founding year

  contact: {
    email: 'hello@kitsudigital.com', // PLACEHOLDER
    // PLACEHOLDER — Moroccan format, e.g. '+212 6 12 34 56 78'. Leave null to hide it.
    phone: null as string | null,
  },

  /**
   * Physical presence. Drives LocalBusiness structured data, which is the single
   * biggest lever for ranking on "agence web Marrakech" style local queries.
   * PLACEHOLDER — verify city/region and add a street address once you have one.
   */
  address: {
    street: '',
    city: 'Marrakech',
    region: 'Marrakech-Safi',
    postalCode: '',
    country: 'MA',
    countryName: 'Morocco',
  },

  /** Markets served, in schema.org terms. */
  areaServed: ['MA', 'FR', 'ES', 'BE', 'CH', 'CA', 'US', 'GB', 'AE'],
  languages: ['en', 'fr', 'ar'],

  /** Default billing currency shown in Pricing. */
  currency: 'USD',

  social: {
    // PLACEHOLDER — set the real handles, or leave empty to hide the icon.
    x: '',
    linkedin: '',
    github: '',
    instagram: '',
  },

} as const

export type SiteConfig = typeof siteConfig

/** Absolute URL helper — always use this for canonicals, OG tags and sitemaps. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.url).toString()
}

/** Social links that have actually been filled in. */
export function activeSocials() {
  const labels: Record<keyof typeof siteConfig.social, string> = {
    x: 'X (Twitter)',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    instagram: 'Instagram',
  }
  return (Object.keys(siteConfig.social) as Array<keyof typeof siteConfig.social>)
    .filter((key) => siteConfig.social[key].length > 0)
    .map((key) => ({ key, label: labels[key], href: siteConfig.social[key] }))
}
