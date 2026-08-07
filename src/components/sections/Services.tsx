'use client';

import { motion } from 'framer-motion';
import { TiltCard } from '@/components/shared/TiltCard';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const services = [
  {
    title: 'Website Design',
    description: 'Sites that make visitors stay, browse, and buy.',
    span: 'lg:col-span-2',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Monitor */}
        <rect x="4" y="6" width="32" height="22" rx="3" stroke="#F97316" strokeWidth="1.5" />
        <line x1="14" y1="32" x2="26" y2="32" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="28" x2="20" y2="32" stroke="#F97316" strokeWidth="1.5" />
        {/* Brush stroke across screen */}
        <path d="M10 18C14 14 18 22 22 16C26 10 30 18 30 18" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M10 22C13 20 17 24 20 20C23 16 27 22 30 20" stroke="#F97316" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Web Development',
    description: 'Blazing-fast, scalable code that grows with you.',
    span: '',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Code brackets */}
        <path d="M15 12L8 20L15 28" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25 12L32 20L25 28" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Lightning bolt */}
        <path d="M22 10L18 21H22L17 30" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'AI Automation',
    description: 'Eliminate busywork. Let intelligent systems handle the rest.',
    span: '',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Brain outline */}
        <path d="M20 8C14 8 10 12 10 17C10 20 12 22 12 22" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 8C26 8 30 12 30 17C30 20 28 22 28 22" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        {/* Center divide */}
        <path d="M20 8V32" stroke="#F97316" strokeWidth="1" opacity="0.4" />
        {/* Circuit nodes */}
        <circle cx="20" cy="17" r="2" stroke="#F97316" strokeWidth="1.5" fill="none" />
        <path d="M20 19V24" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="24" r="1.5" fill="#F97316" opacity="0.6" />
        <circle cx="26" cy="24" r="1.5" fill="#F97316" opacity="0.6" />
        <path d="M18.5 24H14" stroke="#F97316" strokeWidth="1" strokeLinecap="round" />
        <path d="M21.5 24H26" stroke="#F97316" strokeWidth="1" strokeLinecap="round" />
        {/* Bottom connectors */}
        <path d="M14 24V28" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M26 24V28" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M20 26V30" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    description: 'Interfaces so intuitive, users never think about them.',
    span: '',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stacked cards */}
        <rect x="8" y="10" width="24" height="16" rx="2" stroke="#F97316" strokeWidth="1" opacity="0.3" />
        <rect x="6" y="14" width="24" height="16" rx="2" stroke="#F97316" strokeWidth="1" opacity="0.6" />
        <rect x="4" y="18" width="24" height="16" rx="2" stroke="#F97316" strokeWidth="1.5" />
        {/* UI elements on top card */}
        <line x1="8" y1="23" x2="18" y2="23" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <line x1="8" y1="27" x2="14" y2="27" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        <circle cx="22" cy="23" r="1.5" fill="#F97316" opacity="0.6" />
        <rect x="8" y="29" width="10" height="2" rx="1" fill="#F97316" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: 'Ecommerce',
    description: 'Turn browsers into buyers with frictionless stores.',
    span: 'lg:col-span-2',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shopping bag */}
        <path d="M8 14H32L30 34H10L8 14Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 14V10C14 7.8 15.8 6 18 6H22C24.2 6 26 7.8 26 10V14" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        {/* Arrow pointing into bag */}
        <path d="M20 20V28" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 24L20 28L24 24" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Brand Identity',
    description: 'A brand that commands attention and builds trust.',
    span: '',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diamond / Prism */}
        <path d="M20 4L36 20L20 36L4 20L20 4Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Inner facets */}
        <path d="M20 4L12 20L20 36" stroke="#F97316" strokeWidth="1" opacity="0.4" />
        <path d="M20 4L28 20L20 36" stroke="#F97316" strokeWidth="1" opacity="0.4" />
        {/* Light refraction */}
        <line x1="28" y1="20" x2="36" y2="12" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="28" y1="20" x2="36" y2="20" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <circle cx="20" cy="20" r="2" stroke="#F97316" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    title: 'SEO',
    description: 'Get found by the people already searching for you.',
    span: '',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Magnifying glass */}
        <circle cx="17" cy="17" r="9" stroke="#F97316" strokeWidth="1.5" />
        <line x1="24" y1="24" x2="34" y2="34" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        {/* Graph line inside lens */}
        <path d="M11 20L14 16L17 18L20 12L23 14" stroke="#F97316" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        {/* Graph bar */}
        <rect x="11" y="22" width="2.5" height="3" rx="0.5" fill="#F97316" opacity="0.3" />
        <rect x="15" y="20" width="2.5" height="5" rx="0.5" fill="#F97316" opacity="0.4" />
        <rect x="19" y="18" width="2.5" height="7" rx="0.5" fill="#F97316" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Maintenance',
    description: 'Keep your product fast, secure, and evolving.',
    span: '',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield */}
        <path d="M20 4L32 10V20C32 27 26 33 20 35C14 33 8 27 8 20V10L20 4Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Gear inside */}
        <circle cx="20" cy="19" r="4" stroke="#F97316" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="19" r="1.5" fill="#F97316" />
        {/* Gear teeth */}
        <line x1="20" y1="13" x2="20" y2="15" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="23" x2="20" y2="25" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="19" x2="16" y2="19" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="19" x2="26" y2="19" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        {/* Diagonal teeth */}
        <line x1="15.8" y1="14.8" x2="17.2" y2="16.2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22.8" y1="21.8" x2="24.2" y2="23.2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24.2" y1="14.8" x2="22.8" y2="16.2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17.2" y1="21.8" x2="15.8" y2="23.2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function ServiceCard({
  title,
  description,
  icon,
  span,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  span: string;
  index: number;
}) {
  return (
    <AnimatedSection direction="up" delay={index * 0.07}>
      <TiltCard className={span}>
        <div className="group relative h-full rounded-2xl border border-kitsu-border bg-kitsu-surface p-6 transition-all duration-500 hover:border-fox/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]">
          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-fox/5 transition-colors duration-300 group-hover:bg-fox/10">
            {icon}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold font-heading text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-kitsu-muted">
            {description}
          </p>

          {/* Learn more link */}
          <motion.span
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fox cursor-pointer"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span>Learn more</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300"
            >
              <path
                d="M1 7H13M13 7L8 2M13 7L8 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>

          {/* Subtle corner glow on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-fox/[0.03] via-transparent to-transparent" />
        </div>
      </TiltCard>
    </AnimatedSection>
  );
}

export function Services() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Section header */}
      <AnimatedSection direction="up" delay={0}>
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-accent uppercase tracking-[0.2em] text-fox">
            What we do
          </p>
          <h2 className="mb-4 text-3xl font-bold font-heading text-white md:text-4xl lg:text-5xl">
            Services built for
            <span className="gradient-text-fox"> ambitious </span>
            brands
          </h2>
          <p className="text-base text-kitsu-muted leading-relaxed md:text-lg">
            From first pixel to final deployment, we craft every layer of your
            digital presence with precision and purpose.
          </p>
        </div>
      </AnimatedSection>

      {/* Service cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, i) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            icon={service.icon}
            span={service.span}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
