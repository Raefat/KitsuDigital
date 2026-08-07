'use client'

import Link from 'next/link'
import { FoxMark } from '@/components/shared/FoxMark'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Container } from '@/components/shared/Container'
import { siteConfig, activeSocials } from '@/config/site'

// Mirrors the six entries in `services` (src/config/content.ts). If you add or
// rename one there, change it here too.
const serviceLinks = [
  { label: 'Websites', href: '/#services' },
  { label: 'Online stores', href: '/#services' },
  { label: 'SEO & performance', href: '/#services' },
  { label: 'Web apps', href: '/#services' },
  { label: 'Brand identity', href: '/#services' },
  { label: 'Care plan', href: '/#services' },
]

// No 'Work' entry — the portfolio section is not on the page while it still
// holds invented case studies, and this linked to a #portfolio anchor that no
// longer exists.
const companyLinks = [
  { label: 'Process', href: '/#process' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Journal', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

const socialPaths: Record<string, string> = {
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z',
  github:
    'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 6.837a3 3 0 100 6 3 3 0 000-6zm0 7.622a4.622 4.622 0 110-9.244 4.622 4.622 0 010 9.244zm4.804-8.884a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z',
}

export function Footer() {
  const socials = activeSocials()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-kitsu-border bg-kitsu-bg">
      <Container className="pt-16 pb-8 md:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <AnimatedSection direction="up">
            <Link href="/" className="mb-5 flex items-center gap-3" aria-label="Kitsu Digital home">
              <FoxMark size={32} className="text-fox" />
              <span className="font-heading text-lg font-bold text-white">{siteConfig.name}</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-kitsu-muted">
              {siteConfig.shortDescription} Based in {siteConfig.address.city},{' '}
              {siteConfig.address.countryName} — working worldwide.
            </p>

            {socials.length > 0 && (
              <ul className="flex items-center gap-3">
                {socials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-kitsu-border text-kitsu-dim transition-all duration-300 hover:border-fox/30 hover:text-fox"
                      aria-label={social.label}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path d={socialPaths[social.key]} fill="currentColor" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </AnimatedSection>

          {/* Services */}
          <AnimatedSection direction="up" delay={0.06}>
            <h2 className="mb-5 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h2>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="animated-underline text-sm text-kitsu-muted transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Company */}
          <AnimatedSection direction="up" delay={0.12}>
            <h2 className="mb-5 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h2>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="animated-underline text-sm text-kitsu-muted transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection direction="up" delay={0.18}>
            <h2 className="mb-5 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h2>
            <ul className="mb-8 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="animated-underline text-sm text-kitsu-muted transition-colors duration-300 hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              {siteConfig.contact.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                    className="animated-underline text-sm text-kitsu-muted transition-colors duration-300 hover:text-white"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}
              <li>
                <address className="text-sm not-italic text-kitsu-muted">
                  {siteConfig.address.city}, {siteConfig.address.countryName}
                </address>
              </li>
            </ul>

            <Link
              href="/#contact"
              className="inline-block rounded-full bg-fox px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] active:scale-[0.97]"
            >
              Start a project
            </Link>
          </AnimatedSection>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-kitsu-border pt-8 sm:flex-row">
          <p className="text-xs text-kitsu-dim">
            © {year} {siteConfig.legalName}. All rights reserved.
            <span className="mx-2 text-kitsu-border">·</span>
            Made by{' '}
            <a
              href="https://raefet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline text-kitsu-muted transition-colors duration-300 hover:text-fox"
            >
              raefet.com
            </a>
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="animated-underline text-xs text-kitsu-dim transition-colors duration-300 hover:text-kitsu-muted"
            >
              Journal
            </Link>
            <a
              href="/rss.xml"
              className="animated-underline text-xs text-kitsu-dim transition-colors duration-300 hover:text-kitsu-muted"
            >
              RSS
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
