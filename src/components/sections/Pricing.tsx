'use client';

import { Check } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { MagneticButton } from '@/components/shared/MagneticButton';

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

const plans: PricingCard[] = [
  {
    name: 'Starter',
    price: '$2,499',
    period: 'per project',
    description: 'Perfect for small businesses and MVPs.',
    features: [
      'Custom website (up to 5 pages)',
      'Mobile responsive',
      'Basic SEO',
      'Contact form',
      '2 revision rounds',
      '2-3 week delivery',
    ],
    highlighted: false,
    cta: 'Get Started',
    ctaVariant: 'outline',
  },
  {
    name: 'Growth',
    price: '$4,999',
    period: 'per project',
    description: 'For brands ready to scale and convert.',
    features: [
      'Custom website (up to 10 pages)',
      'Advanced UI/UX design',
      'E-commerce integration',
      'AI-powered features',
      'SEO optimization',
      'Performance tuning',
      'CMS integration',
      '3 revision rounds',
      '3-4 week delivery',
    ],
    highlighted: true,
    cta: 'Start Growing',
    ctaVariant: 'primary',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored scope',
    description: 'For complex products and enterprise needs.',
    features: [
      'Full SaaS development',
      'Custom integrations',
      'AI/ML implementation',
      'Dedicated team',
      'Priority support',
      'Ongoing maintenance',
      'Custom timeline',
    ],
    highlighted: false,
    cta: 'Contact Us',
    ctaVariant: 'outline',
  },
];

export function Pricing() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Section header */}
      <AnimatedSection direction="up" delay={0}>
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-accent uppercase tracking-[0.2em] text-fox">
            Pricing
          </p>
          <h2
            className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            Transparent Pricing,{' '}
            <span className="gradient-text-fox">Exceptional Value</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-kitsu-muted leading-relaxed md:text-lg">
            No hidden fees, no surprises. Choose the plan that matches your
            ambition and we will handle the rest.
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
                  <span className="bg-fox text-xs font-semibold text-white px-3 py-1 rounded-full">
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
                variant={plan.ctaVariant}
                className="w-full justify-center"
              >
                {plan.cta}
              </MagneticButton>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
