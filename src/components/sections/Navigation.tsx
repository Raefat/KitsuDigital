'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { FoxMark } from '@/components/shared/FoxMark'

const navLinks = [
  { label: 'Services', hash: '#services' },
  { label: 'Process', hash: '#process' },
  { label: 'Pricing', hash: '#pricing' },
  { label: 'Journal', href: '/blog' },
  { label: 'FAQ', hash: '#faq' },
]

export function Navigation() {
  const { scrollDirection, scrollY, isAtTop } = useScrollDirection()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const isHome = pathname === '/'

  /** Anchors only exist on the home page, so nothing is active anywhere else. */
  const currentSection = isHome ? activeSection : ''

  /** Section anchors only resolve on the home page; prefix them elsewhere. */
  const resolveHref = (link: (typeof navLinks)[number]) =>
    link.href ?? (isHome ? link.hash! : `/${link.hash}`)

  // Scroll spy — only meaningful on the home page.
  useEffect(() => {
    if (!isHome) return

    const ids = navLinks.filter((l) => l.hash).map((l) => l.hash!.slice(1))
    const handleScroll = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id)
          return
        }
      }
      setActiveSection('')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const isNavVisible = scrollDirection === 'up' || isAtTop || mobileOpen
  const hasScrolled = scrollY > 100

  const contactHref = isHome ? '#contact' : '/#contact'

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
          hasScrolled || !isHome
            ? 'border-b border-kitsu-border bg-kitsu-bg/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 md:h-18 lg:px-8"
          aria-label="Main"
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Kitsu Digital home">
            <FoxMark
              size={28}
              className="text-fox transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              Kitsu<span className="text-fox">Digital</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = link.href
                ? pathname.startsWith(link.href)
                : currentSection === link.hash!.slice(1)
              return (
                <Link
                  key={link.label}
                  href={resolveHref(link)}
                  className={`animated-underline text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-fox' : 'text-kitsu-muted hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            href={contactHref}
            className="animated-underline hidden text-sm font-medium text-fox transition-colors hover:text-fox-light md:block"
          >
            Get in Touch
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="block h-[1.5px] w-5 bg-white"
              animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1.5px] w-5 bg-white"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
            <motion.span
              className="block h-[1.5px] w-5 bg-white"
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
            id="mobile-menu"
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-7 bg-kitsu-bg/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <Link
                  href={resolveHref(link)}
                  className="text-2xl font-semibold text-white transition-colors hover:text-fox"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <Link
                href={contactHref}
                className="mt-2 block rounded-full bg-fox px-8 py-3 font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky CTA, once past the fold */}
      <AnimatePresence>
        {!isAtTop && !mobileOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[90]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={contactHref}
              className="block rounded-full bg-fox px-5 py-2.5 text-sm font-semibold text-white fox-glow transition-shadow hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            >
              Book a Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
