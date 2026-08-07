'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const steps = [
  {
    number: '01',
    title: 'A conversation',
    description:
      'Thirty minutes on what your business does, who you want to reach, and what the site has to achieve. Free, and you are not signing anything.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="7" stroke="#F97316" strokeWidth="1.5" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="11" x2="14" y2="11" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="11" y1="8" x2="11" y2="14" stroke="#F97316" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'A fixed quote',
    description:
      'Within two days you get the pages, the timeline and the price in writing. That price does not move unless you change the scope.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#F97316" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="#F97316" strokeWidth="1.5" />
        <line x1="12" y1="3" x2="12" y2="6" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="21" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="12" x2="6" y2="12" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="12" x2="21" y2="12" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Design and build',
    description:
      'You see the design before a line of code is written, and you get two rounds of changes on it. Then we build the real thing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 22V12" stroke="#F97316" strokeWidth="1.5" />
        <path d="M21 7L12 12L3 7" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Launch and hand over',
    description:
      'We put it live, connect Google, and show you how to update it yourself. Thirty days of fixes are included, and everything is in your name.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 4 10 4 15C4 18.9 7.6 22 12 22C16.4 22 20 18.9 20 15C20 10 12 2 12 2Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 18C14.2 18 16 16.6 16 15C16 12 12 9 12 9C12 9 8 12 8 15C8 16.6 9.8 18 12 18Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="12" y1="15" x2="12" y2="12" stroke="#F97316" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
];

function TimelineLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, amount: 'some' });

  return (
    <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-kitsu-border">
      <motion.div
        ref={lineRef}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-fox via-fox-light to-fox-glow"
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      />
    </div>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <AnimatedSection
      direction={isEven ? 'left' : 'right'}
      delay={0.15 + index * 0.08}
    >
      {/* Three cells in fixed DOM order: left · dot · right. The alternation is
          done by choosing which side cell gets the content, never by CSS order —
          reordering moved the dot out of the centre `auto` column and left the
          icons floating away from the timeline on every second step. */}
      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-start">
        <div className="hidden md:block md:pr-12 md:text-right">
          {isEven && <StepContent step={step} align="right" />}
        </div>

        {/* Center dot — always the middle column */}
        <div className="flex md:flex-col items-start md:items-center">
          <div className="md:sticky md:top-1/2 z-10 flex items-center justify-center">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-fox bg-[#0A0A0F] shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-shadow duration-300">
              <div className="absolute inset-0 rounded-full bg-fox/10" />
              {step.icon}
            </div>
          </div>
        </div>

        <div className="hidden md:block md:pl-12 md:text-left">
          {!isEven && <StepContent step={step} align="left" />}
        </div>

        {/* Mobile: always show content to the right of the dot */}
        <div className="md:hidden pl-4 -mt-14">
          <StepContent step={step} align="left" />
        </div>
      </div>
    </AnimatedSection>
  );
}

function StepContent({
  step,
  align,
}: {
  step: (typeof steps)[number];
  align: 'left' | 'right';
}) {
  return (
    <div className="pb-8 md:pb-12">
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-kitsu-border bg-kitsu-surface px-3 py-1 mb-3 ${align === 'right' ? 'ml-auto' : ''}`}
      >
        <span
          className="text-xs font-bold text-fox tabular-nums"
          style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
        >
          {step.number}
        </span>
        <span
          className="text-xs font-semibold text-white uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
        >
          {step.title}
        </span>
      </div>
      {/* max-w-sm keeps the line length readable; on the left side the box has to
          be pushed right or the text strands itself against the page edge. */}
      <p
        className={`text-sm md:text-base leading-relaxed text-kitsu-muted max-w-sm ${
          align === 'right' ? 'md:ml-auto' : ''
        }`}
        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        {step.description}
      </p>
    </div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
      aria-labelledby="process-heading"
    >
      {/* Background subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.05) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection direction="up" delay={0}>
          <div className="text-center mb-16 md:mb-20">
            <p
              className="mb-3 text-xs uppercase tracking-[0.2em] text-fox"
              style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
            >
              How we work
            </p>
            <h2
              id="process-heading"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Four steps, no surprises
            </h2>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-kitsu-muted leading-relaxed">
              You always know what happens next, what it costs, and when it is done.
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <TimelineLine />

          {/* Steps */}
          <div className="space-y-4 md:space-y-2">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>

          {/* End glow dot */}
          <AnimatedSection direction="up" delay={0.8}>
            <div className="flex justify-center mt-4">
              <div className="relative flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-fox/20" />
                <div className="absolute h-2 w-2 rounded-full bg-fox animate-pulse" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
