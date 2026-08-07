'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { siteConfig } from '@/config/site'
import { commitments } from '@/config/content'

// Two sentences: the problem the visitor already recognises, then the promise.
// `accent` marks the words that carry the promise, in fox orange.
const headlineWords = [
  { text: 'Most', accent: false },
  { text: 'websites', accent: false },
  { text: 'just', accent: false },
  { text: 'sit', accent: false },
  { text: 'there.', accent: false },
  { text: 'Yours', accent: true },
  { text: "won't.", accent: true },
]
const subheadline =
  'We build fast, search-ready websites for Moroccan businesses. Live in three weeks, at a price we publish upfront.'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  // Aurora drifts with the pointer.
  useEffect(() => {
    const aurora = auroraRef.current
    if (!aurora || reducedMotion) return

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      aurora.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative" aria-labelledby="hero-heading">
      {/* One screen, everything visible on arrival. This used to be a 200vh
          sticky scroll sequence that faded the subheadline and buttons in as you
          scrolled — which meant landing on the page showed a headline and no
          call to action at all. */}
      {/* `relative` is load-bearing: the aurora and ember layers below are
          absolutely positioned and hang past the right edge. Without it their
          containing block is the <section>, which sits outside this wrapper —
          so `overflow-hidden` would not clip them and the page scrolled
          sideways by 80px. */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-28">
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

        {/* Fox-fire aurora */}
        <div
          ref={auroraRef}
          className="pointer-events-none absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full transition-transform duration-700 ease-out"
          style={{
            background:
              'radial-gradient(ellipse at 40% 40%, rgba(249,115,22,0.12) 0%, rgba(253,186,116,0.06) 30%, rgba(253,164,175,0.03) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-10 -left-20 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 60% 60%, rgba(249,115,22,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />

        {/* Floating embers */}
        {!reducedMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {EMBERS.map((ember, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: `rgba(249,115,22,${ember.opacity})`,
                  left: `${ember.left}%`,
                  bottom: '-10px',
                  width: `${ember.size}px`,
                  height: `${ember.size}px`,
                  animation: `ember-float ${ember.duration}s linear ${ember.delay}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-5 text-center sm:px-6">
          <motion.p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-fox/20 bg-fox/5 px-4 py-1.5 font-accent text-xs uppercase tracking-[0.16em] text-fox"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fox opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fox" />
            </span>
            Digital agency · {siteConfig.address.city}, {siteConfig.address.countryName}
          </motion.p>

          <h1
            id="hero-heading"
            className="mb-6 font-heading text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word.text}-${i}`}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ color: word.accent ? '#F97316' : '#FFFFFF' }}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-kitsu-muted md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.85 }}
          >
            <MagneticButton href="#contact" variant="primary" size="lg" className="font-semibold">
              Get a fixed price
            </MagneticButton>
            <MagneticButton href="#pricing" variant="ghost" size="lg">
              <span className="animated-underline">See what it costs</span>
            </MagneticButton>
          </motion.div>

          {/* Commitments, not claims — nothing here asserts a past result. */}
          <motion.ul
            className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-kitsu-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            {commitments.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 shrink-0 text-fox" strokeWidth={2.5} />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Scroll indicator */}
        {!reducedMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            aria-hidden="true"
          >
            <div className="flex h-8 w-5 justify-center rounded-full border border-kitsu-border pt-1.5">
              <motion.div
                className="h-1.5 w-1 rounded-full bg-fox"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

/** Fixed so server and client render identically — Math.random() here caused hydration drift. */
const EMBERS = [
  { left: 18, size: 2, opacity: 0.5, duration: 11, delay: 0 },
  { left: 29, size: 1.5, opacity: 0.4, duration: 9, delay: 1.6 },
  { left: 41, size: 2.5, opacity: 0.6, duration: 13, delay: 3.1 },
  { left: 52, size: 1, opacity: 0.35, duration: 10, delay: 0.8 },
  { left: 63, size: 2, opacity: 0.55, duration: 12, delay: 2.4 },
  { left: 71, size: 1.5, opacity: 0.45, duration: 8.5, delay: 4.2 },
  { left: 80, size: 2.5, opacity: 0.5, duration: 14, delay: 1.2 },
  { left: 88, size: 1, opacity: 0.4, duration: 10.5, delay: 3.7 },
]
