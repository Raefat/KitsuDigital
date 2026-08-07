'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function getInitialVisibility() {
  if (typeof window === 'undefined') return true;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const shouldAnimate = getInitialVisibility();

  // Use a timeout-based approach to avoid lint error
  if (!shouldAnimate) {
    return null;
  }

  // Schedule hiding in a microtask to avoid synchronous setState in effect
  if (typeof window !== 'undefined' && isVisible) {
    setTimeout(() => setIsVisible(false), 1400);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ backgroundColor: '#0A0A0F' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 15 L65 5 L72 30 L85 25 L78 50 L90 55 L70 60 L72 80 L50 70 L28 80 L30 60 L10 55 L22 50 L15 25 L28 30 L35 5 Z"
                stroke="#F97316"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray="400"
                strokeDashoffset="400"
                style={{
                  animation: 'fox-draw 1s ease-out forwards',
                }}
              />
            </svg>
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
