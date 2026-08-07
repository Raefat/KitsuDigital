'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { useCountUp } from '@/hooks/useCountUp';

const headlineWords = ['Digital', 'Products', 'That', 'Turn', 'Visitors', 'Into', 'Revenue'];
const subheadline = 'We design and build premium digital experiences for ambitious brands that demand more than templates and freelancers.';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const auroraRef = useRef<HTMLDivElement>(null);

  const metric1 = useCountUp({ end: 147, suffix: '+', duration: 2000, enabled: scrollProgress > 0.4 });
  const metric2 = useCountUp({ end: 12, prefix: '$', suffix: 'M+', duration: 2000, enabled: scrollProgress > 0.5 });
  const metric3 = useCountUp({ end: 98, suffix: '%', duration: 1800, enabled: scrollProgress > 0.55 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const totalScroll = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Aurora follows mouse
  useEffect(() => {
    const aurora = auroraRef.current;
    if (!aurora) return;
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      aurora.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh]"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* Pinned container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Aurora / Fox Fire Background */}
        <div
          ref={auroraRef}
          className="absolute w-[600px] h-[600px] -top-20 -right-20 rounded-full transition-transform duration-700 ease-out pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 40% 40%, rgba(249,115,22,0.12) 0%, rgba(253,186,116,0.06) 30%, rgba(253,164,175,0.03) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute w-[400px] h-[400px] bottom-10 -left-20 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 60% 60%, rgba(249,115,22,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />

        {/* Floating embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: `rgba(249,115,22,${0.3 + Math.random() * 0.4})`,
                left: `${15 + Math.random() * 70}%`,
                bottom: '-10px',
                animation: `ember-float ${8 + Math.random() * 6}s linear ${Math.random() * 5}s infinite`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Phase 1: Headline words */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold leading-[0.95] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1.4 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  color: word === 'Revenue' ? '#F97316' : '#FFFFFF',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Phase 2: Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-kitsu-muted max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: scrollProgress > 0.15 ? 1 : 0, y: scrollProgress > 0.15 ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            {subheadline}
          </motion.p>

          {/* Phase 4: Metrics */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-14 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress > 0.35 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <span
                ref={metric1.ref}
                className="text-3xl md:text-4xl font-bold text-white block"
                style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
              >
                {metric1.displayValue}
              </span>
              <span className="text-sm text-kitsu-dim mt-1 block">Projects Delivered</span>
            </div>
            <div className="text-center">
              <span
                ref={metric2.ref}
                className="text-3xl md:text-4xl font-bold gradient-text-fox block"
                style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
              >
                {metric2.displayValue}
              </span>
              <span className="text-sm text-kitsu-dim mt-1 block">Revenue Generated</span>
            </div>
            <div className="text-center">
              <span
                ref={metric3.ref}
                className="text-3xl md:text-4xl font-bold text-white block"
                style={{ fontFamily: 'var(--font-grotesk), sans-serif' }}
              >
                {metric3.displayValue}
              </span>
              <span className="text-sm text-kitsu-dim mt-1 block">Client Satisfaction</span>
            </div>
          </motion.div>

          {/* Phase 5: CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: scrollProgress > 0.6 ? 1 : 0,
              y: scrollProgress > 0.6 ? 0 : 20,
              scale: scrollProgress > 0.9 ? 0.9 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <MagneticButton variant="primary" size="lg" className="font-semibold">
              Book a Free Strategy Call
            </MagneticButton>
            <MagneticButton variant="ghost" size="lg">
              <span className="animated-underline">View Our Work</span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollProgress < 0.1 ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-5 h-8 border border-kitsu-border rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 bg-fox rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
