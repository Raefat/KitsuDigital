'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SESSION_KEY = 'kitsu:intro-seen'
// The overlay hides the hero, so whatever it costs is added straight onto
// Largest Contentful Paint: at 900ms the homepage measured FCP 256ms but LCP
// 1508ms. Keep this short — it is decorative, and LCP is a ranking signal.
const DURATION_MS = 400

/**
 * Brand intro. Shown once per session only — an overlay covering the page on
 * every navigation is a direct hit to Largest Contentful Paint, and the second
 * viewing has no brand value anyway. Skipped entirely under reduced-motion.
 */
export function Loader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === '1'

    if (prefersReducedMotion || alreadySeen) return

    // Whether to show the intro depends on matchMedia and sessionStorage, so it
    // cannot be decided until after hydration — the server has no way to know.
    // One mount-time transition is the cost of not shipping a hydration
    // mismatch, and it only ever runs on the first page of a session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true)

    const timer = window.setTimeout(() => {
      setIsVisible(false)
      // Marked seen only once it has actually played. Writing this up front is
      // what wedged the overlay open: Strict Mode runs the effect, cleans it up
      // (killing the timer), then runs it again — and the second pass read the
      // flag the first had already written, bailed early, and left the overlay
      // visible with nothing left to hide it.
      sessionStorage.setItem(SESSION_KEY, '1')
    }, DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-kitsu-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          {/* A single arc rotating inside a faint track. Nothing to recognise,
              nothing to draw — it just says "a moment" and gets out of the way. */}
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="14" stroke="#F97316" strokeOpacity="0.15" strokeWidth="2.5" />
            <path
              d="M17 3a14 14 0 0 1 14 14"
              stroke="#F97316"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ transformOrigin: '17px 17px', animation: 'loader-spin 0.7s linear infinite' }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
