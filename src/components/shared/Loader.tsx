'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SESSION_KEY = 'kitsu:intro-seen'
const DURATION_MS = 900

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
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        >
          <div className="relative">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
              <path
                d="M50 15 L65 5 L72 30 L85 25 L78 50 L90 55 L70 60 L72 80 L50 70 L28 80 L30 60 L10 55 L22 50 L15 25 L28 30 L35 5 Z"
                stroke="#F97316"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeDasharray="400"
                strokeDashoffset="400"
                style={{ animation: 'fox-draw 0.8s ease-out forwards' }}
              />
            </svg>
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
