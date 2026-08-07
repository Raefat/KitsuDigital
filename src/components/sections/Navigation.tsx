'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { FoxMark } from '@/components/shared/FoxMark';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navigation() {
  const { scrollDirection, scrollY, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll spy
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    const handleScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNavVisible = scrollDirection === 'up' || isAtTop;
  const hasScrolled = scrollY > 100;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          hasScrolled
            ? 'bg-kitsu-bg/80 backdrop-blur-xl border-b border-kitsu-border'
            : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 md:h-18 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Kitsu Digital home">
            <FoxMark size={28} className="text-fox transition-transform duration-300 group-hover:scale-110" />
            <span
              className="text-lg font-bold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Kitsu
              <span className="text-fox">Digital</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`animated-underline text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-fox'
                    : 'text-kitsu-muted hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="text-sm font-medium text-fox hover:text-fox-light transition-colors animated-underline"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-white"
              animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-white"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-white"
              animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-kitsu-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-2xl font-semibold text-white hover:text-fox transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="mt-4 px-8 py-3 bg-fox text-white rounded-full font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              onClick={() => setMobileOpen(false)}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky CTA (appears after hero) */}
      <AnimatePresence>
        {!isAtTop && (
          <motion.div
            className="fixed bottom-6 right-6 z-[90]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <a
              href="#contact"
              className="block px-5 py-2.5 bg-fox text-white text-sm font-semibold rounded-full fox-glow hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-shadow"
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
