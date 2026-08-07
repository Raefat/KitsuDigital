'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects are delivered within 2-4 weeks. Complex SaaS platforms or enterprise solutions may take 6-8 weeks. We provide a detailed timeline during our strategy call.',
  },
  {
    question: 'What makes Kitsu different from other agencies?',
    answer:
      'We combine business strategy with technical excellence. Every design decision is tied to a measurable outcome. We use AI-powered workflows to deliver faster without compromising quality, and we build scalable architectures from day one.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. Our Growth plan includes ongoing maintenance, performance monitoring, and iterative improvements based on real user data. We also offer ad-hoc support packages.',
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'We specialize in modern stacks: Next.js, React, TypeScript, Node.js, and cloud platforms like AWS. We also integrate AI services like OpenAI and LangGraph for intelligent features.',
  },
  {
    question: 'Can you work with our existing team?',
    answer:
      'Absolutely. We integrate seamlessly with in-house teams, whether you need us to lead development or augment your current capabilities. We use modern collaboration tools and agile methodologies.',
  },
  {
    question: 'What if we are not happy with the design?',
    answer:
      'We include revision rounds in every package and work iteratively with you. Our discovery process ensures we deeply understand your vision before we start designing, which is why our client satisfaction rate is 98%.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 md:py-32">
      {/* Section header */}
      <AnimatedSection direction="up" delay={0}>
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-accent uppercase tracking-[0.2em] text-fox">
            FAQ
          </p>
          <h2
            className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            Frequently Asked{' '}
            <span className="gradient-text-fox">Questions</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-kitsu-muted leading-relaxed md:text-lg">
            Everything you need to know before we start building together.
          </p>
        </div>
      </AnimatedSection>

      {/* FAQ list */}
      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <AnimatedSection key={i} direction="up" delay={i * 0.06}>
              <div className="border-b border-kitsu-border">
                <button
                  onClick={() => toggle(i)}
                  className={`flex w-full items-center justify-between gap-4 py-5 text-left transition-all duration-300 cursor-pointer ${
                    isOpen
                      ? 'border-l-2 border-fox pl-4'
                      : 'pl-6 hover:bg-kitsu-surface/50'
                  }`}
                >
                  <span
                    className={`text-base font-medium transition-colors duration-300 md:text-lg ${
                      isOpen ? 'text-fox' : 'text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="shrink-0"
                  >
                    <Plus
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isOpen ? 'text-fox' : 'text-kitsu-dim'
                      }`}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pl-6 text-sm text-kitsu-muted leading-relaxed md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
