/**
 * Text that is rendered on the page *and* mirrored into structured data.
 * Keep it here so the two can never drift apart — Google treats FAQ/Service
 * markup that does not match visible content as a violation.
 */

export const services = [
  {
    slug: 'website-design',
    title: 'Websites',
    description:
      'Your whole site — designed, written, built and launched. Not a template with your logo dropped into it.',
    span: 'lg:col-span-2',
  },
  {
    slug: 'ecommerce',
    title: 'Online stores',
    description:
      'Fast product pages and a checkout that does not lose people halfway through.',
    span: '',
  },
  {
    slug: 'seo',
    title: 'SEO & performance',
    description:
      'Load in under two seconds and show up when someone searches for what you sell.',
    span: '',
  },
  {
    slug: 'web-development',
    title: 'Web apps',
    description:
      'Booking systems, dashboards, client portals — the software your business actually runs on.',
    span: '',
  },
  {
    slug: 'brand-identity',
    title: 'Brand identity',
    description:
      'A logo, colours and type you can hand to anyone without it falling apart.',
    span: '',
  },
  {
    slug: 'maintenance',
    title: 'Care plan',
    description:
      'Updates, backups, monitoring and small changes handled monthly, so nothing quietly breaks.',
    span: 'lg:col-span-2',
  },
] as const

export type ServiceSlug = (typeof services)[number]['slug']

export const faqs = [
  {
    question: 'What does a website actually cost?',
    answer:
      'Our packages and their prices are listed on this page — no discovery call needed to find out. Every quote is fixed before we start, so the number you agree to is the number you pay. If your project does not fit a package, we scope it and send a fixed price for that.',
  },
  {
    question: 'How long does it take?',
    answer:
      'A standard business site goes live in about three weeks from the day we have your content. Online stores and web apps take longer, usually four to eight weeks. You get the timeline in writing with the quote.',
  },
  {
    question: 'What do you need from me?',
    answer:
      'Your logo if you have one, any photos you want used, and a rough idea of what each page should say. If you do not have the text, we write it — that is included, not an extra.',
  },
  {
    question: 'Do I own the site when it is finished?',
    answer:
      'Yes. The domain, the hosting account and the code are all in your name. If you ever want to move to another agency, nothing is locked to us and we will hand over access without a fuss.',
  },
  {
    question: 'Will it show up on Google?',
    answer:
      'Every site we build ships with the technical groundwork search engines need: fast loading, clean structure, proper titles, a sitemap and a Google Business Profile setup for local searches. Ranking also depends on your market and competition, so we tell you what to expect rather than promising a position.',
  },
  {
    question: 'Which languages do you work in?',
    answer:
      'English, French and Arabic, including full right-to-left layouts for Arabic. Multilingual sites are built with separate URLs and hreflang tags so each language ranks on its own.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Nothing breaks the day we leave. You get thirty days of free fixes, and after that you can either take a monthly care plan or just call us when you need something. There is no lock-in contract either way.',
  },
  {
    question: 'Do you work with clients outside Morocco?',
    answer:
      'Yes. We are based in Morocco and work remotely with clients across Europe, North America and the Gulf, overlapping with European business hours.',
  },
] as const

/**
 * What we commit to on every project. These are promises, not past results —
 * keep them true or take them down.
 */
export const commitments = [
  {
    label: 'Live in 3 weeks',
    detail: 'From the day we have your content, for a standard business site.',
  },
  {
    label: 'Fixed price, quoted upfront',
    detail: 'Agreed before we start. No hourly surprises at the end.',
  },
  {
    label: 'Built to load under 2s',
    detail: 'On a normal Moroccan mobile connection, not just on office wifi.',
  },
] as const
