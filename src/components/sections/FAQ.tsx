'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Container } from '@/components/shared/Container'
import { faqs } from '@/config/content'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative scroll-mt-20 py-24 md:py-32" aria-labelledby="faq-heading">
      <Container>
        <AnimatedSection direction="up">
          <div className="mb-16 text-center">
            <p className="mb-3 font-accent text-xs uppercase tracking-[0.2em] text-fox">FAQ</p>
            <h2
              id="faq-heading"
              className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            >
              Frequently Asked <span className="gradient-text-fox">Questions</span>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-kitsu-muted md:text-lg">
              Everything you need to know before we start building together.
            </p>
          </div>
        </AnimatedSection>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            const panelId = `faq-panel-${i}`
            const buttonId = `faq-button-${i}`

            return (
              <AnimatedSection key={faq.question} direction="up" delay={i * 0.05}>
                <div className="border-b border-kitsu-border">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className={`flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-all duration-300 ${
                        isOpen ? 'border-l-2 border-fox pl-4' : 'pl-6 hover:bg-kitsu-surface/50'
                      }`}
                    >
                      <span
                        className={`font-heading text-base font-medium transition-colors duration-300 md:text-lg ${
                          isOpen ? 'text-fox' : 'text-white'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="shrink-0"
                        aria-hidden="true"
                      >
                        <Plus
                          className={`h-5 w-5 transition-colors duration-300 ${
                            isOpen ? 'text-fox' : 'text-kitsu-dim'
                          }`}
                          strokeWidth={1.5}
                        />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-6 pr-4 text-sm leading-relaxed text-kitsu-muted md:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
