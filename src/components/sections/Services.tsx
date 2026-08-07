'use client'

import { motion } from 'framer-motion'
import { TiltCard } from '@/components/shared/TiltCard'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Container } from '@/components/shared/Container'
import { services, type ServiceSlug } from '@/config/content'

/** Icons live here; the copy lives in config/content so structured data can reuse it. */
const icons: Record<ServiceSlug, React.ReactNode> = {
  'website-design': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="32" height="22" rx="3" stroke="#F97316" strokeWidth="1.5" />
      <line x1="14" y1="32" x2="26" y2="32" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="28" x2="20" y2="32" stroke="#F97316" strokeWidth="1.5" />
      <path d="M10 18C14 14 18 22 22 16C26 10 30 18 30 18" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 22C13 20 17 24 20 20C23 16 27 22 30 20" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  'web-development': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M15 12L8 20L15 28" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 12L32 20L25 28" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10L18 21H22L17 30" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ecommerce: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 14H32L30 34H10L8 14Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 14V10C14 7.8 15.8 6 18 6H22C24.2 6 26 7.8 26 10V14" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 20V28" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 24L20 28L24 24" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'brand-identity': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 4L36 20L20 36L4 20L20 4Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 4L12 20L20 36" stroke="#F97316" strokeWidth="1" opacity="0.4" />
      <path d="M20 4L28 20L20 36" stroke="#F97316" strokeWidth="1" opacity="0.4" />
      <line x1="28" y1="20" x2="36" y2="12" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="28" y1="20" x2="36" y2="20" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <circle cx="20" cy="20" r="2" stroke="#F97316" strokeWidth="1" />
    </svg>
  ),
  seo: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="9" stroke="#F97316" strokeWidth="1.5" />
      <line x1="24" y1="24" x2="34" y2="34" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 20L14 16L17 18L20 12L23 14" stroke="#F97316" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="11" y="22" width="2.5" height="3" rx="0.5" fill="#F97316" opacity="0.3" />
      <rect x="15" y="20" width="2.5" height="5" rx="0.5" fill="#F97316" opacity="0.4" />
      <rect x="19" y="18" width="2.5" height="7" rx="0.5" fill="#F97316" opacity="0.5" />
    </svg>
  ),
  maintenance: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 4L32 10V20C32 27 26 33 20 35C14 33 8 27 8 20V10L20 4Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="20" cy="19" r="4" stroke="#F97316" strokeWidth="1.5" />
      <circle cx="20" cy="19" r="1.5" fill="#F97316" />
      <line x1="20" y1="13" x2="20" y2="15" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="23" x2="20" y2="25" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="19" x2="16" y2="19" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="19" x2="26" y2="19" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15.8" y1="14.8" x2="17.2" y2="16.2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22.8" y1="21.8" x2="24.2" y2="23.2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24.2" y1="14.8" x2="22.8" y2="16.2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17.2" y1="21.8" x2="15.8" y2="23.2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

function ServiceCard({
  slug,
  title,
  description,
  span,
  index,
}: {
  slug: ServiceSlug
  title: string
  description: string
  span: string
  index: number
}) {
  return (
    <AnimatedSection direction="up" delay={index * 0.07} className={span}>
      <TiltCard className="h-full">
        <div className="group relative flex h-full flex-col rounded-2xl border border-kitsu-border bg-kitsu-surface p-6 transition-all duration-500 hover:border-fox/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-fox/5 transition-colors duration-300 group-hover:bg-fox/10">
            {icons[slug]}
          </div>

          <h3 className="mb-2 font-heading text-lg font-semibold text-white">{title}</h3>

          <p className="mb-5 flex-1 text-sm leading-relaxed text-kitsu-muted">{description}</p>

          <motion.a
            href="#contact"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-fox"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span>Discuss this</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7H13M13 7L8 2M13 7L8 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>

          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-fox/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </TiltCard>
    </AnimatedSection>
  )
}

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      <Container>
        <AnimatedSection direction="up">
          <div className="mb-16 max-w-2xl">
            <p className="mb-3 font-accent text-xs uppercase tracking-[0.2em] text-fox">
              What we do
            </p>
            <h2
              id="services-heading"
              className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            >
              Services built for
              <span className="gradient-text-fox"> ambitious </span>
              brands
            </h2>
            <p className="text-base leading-relaxed text-kitsu-muted md:text-lg">
              From first pixel to final deployment, we craft every layer of your digital
              presence with precision and purpose.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              title={service.title}
              description={service.description}
              span={service.span}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
