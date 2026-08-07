'use client'

import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Container } from '@/components/shared/Container'
import { commitments } from '@/config/content'

/**
 * What the visitor gets, stated plainly. This replaced a strip of invented
 * client logos and metrics — an unknown agency quoting fake numbers reads as a
 * lie to exactly the buyer it is trying to win. Say what you will do instead.
 */
export function ResultsStrip() {
  return (
    <section className="relative py-16 md:py-20" aria-labelledby="commitments-heading">
      <Container>
        <AnimatedSection direction="up" delay={0.1}>
          <h2 id="commitments-heading" className="sr-only">
            How we work
          </h2>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {commitments.map((item, i) => (
              <li
                key={item.label}
                className="rounded-xl border border-kitsu-border bg-kitsu-surface p-6 transition-colors duration-300 hover:border-fox/30"
              >
                <span className="mb-3 block font-accent text-xs text-fox">
                  0{i + 1}
                </span>
                <p className="mb-2 font-heading text-lg font-semibold text-white">
                  {item.label}
                </p>
                <p className="text-sm leading-relaxed text-kitsu-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </Container>
    </section>
  )
}
