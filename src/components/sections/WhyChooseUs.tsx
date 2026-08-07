'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';

/**
 * Comparisons name things a buyer can check afterwards. Vague superlatives
 * ("award-worthy", "cutting-edge") were removed — an unverifiable boast on a
 * comparison table undermines the rows that are actually true.
 */
const comparisons = [
  {
    label: 'Price',
    traditional: 'Quote only after a sales call',
    kitsu: 'Published, and fixed before we start',
  },
  {
    label: 'Timeline',
    traditional: 'Three to six months, often longer',
    kitsu: 'Three weeks for a standard site',
  },
  {
    label: 'Speed',
    traditional: 'Built on a heavy page builder',
    kitsu: 'Under two seconds on mobile data',
  },
  {
    label: 'Search',
    traditional: 'SEO sold separately, later',
    kitsu: 'Structure, sitemap and Google setup included',
  },
  {
    label: 'Text',
    traditional: 'You write it yourself',
    kitsu: 'We write it, in the package',
  },
  {
    label: 'Ownership',
    traditional: 'Domain and hosting under their account',
    kitsu: 'Everything in your name from day one',
  },
  {
    label: 'After launch',
    traditional: 'Silence, then an invoice',
    kitsu: '30 days of fixes, no lock-in after',
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-kitsu"
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
      aria-labelledby="why-kitsu-heading"
    >
      {/* Background subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection direction="up" delay={0}>
          <div className="text-center mb-16 md:mb-20">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-fox" style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}>
              The difference
            </p>
            <h2
              id="why-kitsu-heading"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              What you get that you{' '}
              <span className="gradient-text-fox">usually don&apos;t</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-kitsu-muted leading-relaxed">
              Every row below is something you can hold us to, in writing, before you pay
              anything.
            </p>
          </div>
        </AnimatedSection>

        {/* Column headers */}
        <AnimatedSection direction="up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-6">
            <div className="hidden md:flex items-center gap-2 px-5 pb-4">
              <div className="h-px flex-1 bg-kitsu-border" />
              <span
                className="text-xs uppercase tracking-[0.15em] text-kitsu-dim whitespace-nowrap"
                style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
              >
                Traditional Agencies
              </span>
              <div className="h-px flex-1 bg-kitsu-border" />
            </div>
            <div className="hidden md:flex items-center gap-2 px-5 pb-4">
              <div className="h-px flex-1 border-t border-fox/30" />
              <span
                className="text-xs uppercase tracking-[0.15em] text-fox whitespace-nowrap"
                style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
              >
                Kitsu Digital
              </span>
              <div className="h-px flex-1 border-t border-fox/30" />
            </div>
          </div>
        </AnimatedSection>

        {/* Comparison rows */}
        <div className="space-y-0">
          {comparisons.map((item, i) => (
            <AnimatedSection key={item.label} direction="up" delay={0.12 + i * 0.06}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 group">
                {/* Traditional column */}
                <div className="relative flex items-center px-5 py-4 md:py-5 md:border-r md:border-kitsu-border">
                  {/* Label badge on mobile */}
                  <span
                    className="md:hidden shrink-0 w-28 text-xs uppercase tracking-wider text-kitsu-dim pr-3"
                    style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
                  >
                    {item.label}
                  </span>
                  {/* Dimmed text */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex-1 text-sm md:text-base text-kitsu-dim truncate">
                      {item.traditional}
                    </span>
                  </div>
                  {/* Bottom border */}
                  <div className="absolute bottom-0 left-5 right-0 h-px bg-kitsu-border/50" />
                </div>

                {/* Kitsu column */}
                <div className="relative flex items-center px-5 py-4 md:py-5 md:border-l-0">
                  {/* Label badge on mobile */}
                  <span
                    className="md:hidden shrink-0 w-28 text-xs uppercase tracking-wider text-kitsu-dim pr-3"
                    style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
                  >
                    {/* Empty — label shown on left cell */}
                  </span>
                  {/* Highlighted cell */}
                  <div className="flex items-center gap-3 min-w-0 w-full rounded-lg md:rounded-none border-l-2 border-fox/60 bg-fox/[0.04] px-4 py-2.5 transition-colors duration-300 group-hover:bg-fox/[0.07]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M15 4.5L6.75 12.75L3 9"
                        stroke="#F97316"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="flex-1 text-sm md:text-base font-medium text-fox truncate">
                      {item.kitsu}
                    </span>
                  </div>
                  {/* Bottom border */}
                  <div className="absolute bottom-0 left-5 right-0 h-px bg-kitsu-border/50" />
                </div>

                {/* Desktop label - positioned on the center divider */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-3 z-10">
                  <span
                    className="bg-[#0A0A0F] px-3 py-0.5 text-[10px] uppercase tracking-[0.15em] text-kitsu-dim"
                    style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile column headers (shown only on small screens) */}
        <div className="md:hidden flex gap-4 mt-6 pt-4 border-t border-kitsu-border">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-2 h-2 rounded-full bg-kitsu-dim/50" />
            <span className="text-xs uppercase tracking-[0.15em] text-kitsu-dim" style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}>
              Traditional
            </span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-2 h-2 rounded-full bg-fox" />
            <span className="text-xs uppercase tracking-[0.15em] text-fox" style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}>
              Kitsu Digital
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
