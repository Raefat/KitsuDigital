'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';

const clients = [
  { name: 'Acme Corp', metric: '340% conversion increase' },
  { name: 'NovaTech', metric: '$2.4M funding raised' },
  { name: 'Luminary', metric: '0.8s load time' },
  { name: 'Flux AI', metric: '2.7x more leads' },
  { name: 'Prism Labs', metric: '99.9% uptime' },
  { name: 'Helix SaaS', metric: '4.8★ avg rating' },
];

export function ResultsStrip() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <AnimatedSection direction="up" delay={0.1}>
        {/* Section label */}
        <p className="text-center text-kitsu-dim text-xs font-accent uppercase tracking-[0.2em] mb-10">
          Trusted by teams that ship
        </p>

        {/* Scarcity badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-fox/30 bg-fox/5 px-5 py-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fox opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fox" />
            </span>
            <span className="text-sm font-medium text-fox">
              2 of 3 Q3 project slots remaining
            </span>
          </div>
        </div>

        {/* Client logos - scrollable on mobile, grid on desktop */}
        <div className="flex md:justify-center">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible">
            {clients.map((client, i) => (
              <div
                key={client.name}
                className="flex-shrink-0 snap-center w-40 md:w-auto"
              >
                <div className="group flex flex-col items-center gap-3 rounded-xl border border-kitsu-border bg-kitsu-surface p-5 transition-all duration-300 hover:border-fox/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)]">
                  {/* Logo placeholder */}
                  <div className="flex h-12 w-full items-center justify-center rounded-lg bg-kitsu-bg">
                    <span className="text-sm font-semibold text-kitsu-dim transition-colors duration-300 group-hover:text-fox font-heading">
                      {client.name}
                    </span>
                  </div>

                  {/* Metric */}
                  <p className="text-center text-xs text-kitsu-muted leading-relaxed">
                    {client.metric}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
