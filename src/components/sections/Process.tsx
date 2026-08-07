'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We dive deep into your business, audience, and goals. No assumptions — just data-driven understanding of what moves the needle for you.',
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
    title: 'Strategy',
    description:
      'We map out the architecture, features, and user flows. Every decision is tied to a measurable business outcome.',
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
    title: 'Design',
    description:
      'Pixel-perfect interfaces crafted for conversion. Every element is intentional, every interaction is tested.',
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
    title: 'Development',
    description:
      'Clean, scalable code built for performance. We use modern stacks that grow with your business.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6L3 12L8 18" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6L21 12L16 18" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="14" y1="4" x2="10" y2="20" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Testing',
    description:
      'Rigorous QA across devices, browsers, and edge cases. We ship confident, not hopeful.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7V17C3 19.8 7 22.5 12 22.5C17 22.5 21 19.8 21 17V7L12 2Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Launch',
    description:
      'Seamless deployment with zero downtime. Your product goes live and starts generating results immediately.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 4 10 4 15C4 18.9 7.6 22 12 22C16.4 22 20 18.9 20 15C20 10 12 2 12 2Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 18C14.2 18 16 16.6 16 15C16 12 12 9 12 9C12 9 8 12 8 15C8 16.6 9.8 18 12 18Z" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="12" y1="15" x2="12" y2="12" stroke="#F97316" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '07',
    title: 'Growth',
    description:
      'Ongoing optimization based on real user data. We iterate fast and compound your results over time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 20L9 14L13 17L21 8" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 8H21V13" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-start">
        {/* Left content (visible on even items) / empty on odd */}
        <div
          className={`md:pr-12 ${isEven ? 'md:text-right' : 'md:order-3 md:pl-12 md:text-left'}`}
        >
          {isEven && <StepContent step={step} align="right" />}
          {!isEven && <div className="hidden md:block" />}
        </div>

        {/* Center dot */}
        <div className="flex md:flex-col items-start md:items-center">
          <div className="md:sticky md:top-1/2 z-10 flex items-center justify-center">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-fox bg-[#0A0A0F] shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-shadow duration-300">
              <div className="absolute inset-0 rounded-full bg-fox/10" />
              {step.icon}
            </div>
          </div>
        </div>

        {/* Right content (visible on odd items) / empty on even */}
        <div
          className={`md:pl-12 ${!isEven ? 'md:order-1 md:text-right md:pr-12' : 'md:order-3 md:pl-12 md:text-left'}`}
        >
          {!isEven && <StepContent step={step} align="left" />}
          {isEven && <div className="hidden md:block" />}
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
      <p className="text-sm md:text-base leading-relaxed text-kitsu-muted max-w-sm" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
        {step.description}
      </p>
    </div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
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
              className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Our Process
            </h2>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-kitsu-muted leading-relaxed">
              A battle-tested framework refined across 147+ projects. No wasted
              steps — every phase is engineered to move you closer to measurable growth.
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
