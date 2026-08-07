'use client';

import { Check } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Container } from '@/components/shared/Container';

interface PricingCard {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  ctaVariant: 'primary' | 'outline';
}

// PLACEHOLDER PRICES — these amounts and the currency came from the template.
// Set your real numbers before launch: publishing a price you will not honour is
// worse than publishing none, and this section is the page's main promise.
const plans: PricingCard[] = [
  {
    name: 'Presence',
    price: '$2,499',
    period: 'one-off',
    description: 'For a business that needs to exist properly online.',
    features: [
      'Up to 5 pages, written by us',
      'Works on every phone and screen',
      'Google Business Profile set up',
      'Contact form to your inbox',
      '2 rounds of changes',
      'Live in 3 weeks',
    ],
    highlighted: false,
    cta: 'Get a quote',
    ctaVariant: 'outline',
  },
  {
    name: 'Growth',
    price: '$4,999',
    period: 'one-off',
    description: 'For a business that wants the site to bring in work.',
    features: [
      'Everything in Presence',
      'Up to 10 pages, or a small store',
      'Full SEO setup and sitemap',
      'Speed tuned to load under 2s',
      'Blog you can update yourself',
      'Analytics, so you see what works',
      '3 rounds of changes',
      'Live in 4 weeks',
    ],
    highlighted: true,
    cta: 'Get a quote',
    ctaVariant: 'primary',
  },
  {
    name: 'Custom',
    price: 'Quoted',
    period: 'fixed, before we start',
    description: 'For stores, booking systems and web apps.',
    features: [
      'Online stores of any size',
      'Booking and client portals',
      'Multilingual, including Arabic RTL',
      'Integrations with tools you use',
      'Timeline agreed upfront',
      'Monthly care plan available',
    ],
    highlighted: false,
    cta: 'Tell us the scope',
    ctaVariant: 'outline',
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 py-24 md:py-32"
      aria-labelledby="pricing-heading"
    >
      <Container>
      {/* Section header */}
      <AnimatedSection direction="up" delay={0}>
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-accent uppercase tracking-[0.2em] text-fox">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            Here are the prices.{' '}
            <span className="gradient-text-fox">No call required.</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-kitsu-muted leading-relaxed md:text-lg">
            Most agencies make you sit through a sales call to find out. Your quote is
            fixed before we start, and it includes the writing.
          </p>
        </div>
      </AnimatedSection>

      {/* Pricing cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan, i) => (
          <AnimatedSection key={plan.name} direction="up" delay={i * 0.12}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border bg-kitsu-surface p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'border-fox/40 shadow-[0_0_40px_rgba(249,115,22,0.2)]'
                  : 'border-kitsu-border hover:border-kitsu-border/80'
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-fox text-xs font-semibold text-kitsu-bg px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3
                className={`mb-2 text-lg font-semibold ${
                  plan.highlighted ? 'text-fox' : 'text-white'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-2">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-fox' : 'text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
                >
                  {plan.price}
                </span>
              </div>
              <p className="mb-4 text-sm text-kitsu-dim">{plan.period}</p>

              {/* Description */}
              <p className="mb-6 text-sm text-kitsu-muted leading-relaxed">
                {plan.description}
              </p>

              {/* Feature list */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-fox"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm text-kitsu-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <MagneticButton
                href="#contact"
                variant={plan.ctaVariant}
                className="block w-full text-center"
              >
                {plan.cta}
              </MagneticButton>
            </div>
          </AnimatedSection>
        ))}
      </div>
      </Container>
    </section>
  );
}
