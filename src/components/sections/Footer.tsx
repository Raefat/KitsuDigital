'use client';

import { useState } from 'react';
import { FoxMark } from '@/components/shared/FoxMark';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const serviceLinks = [
  'Web Design',
  'Development',
  'AI Automation',
  'Ecommerce',
  'Branding',
  'SEO',
];

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Process', href: '#' },
  { label: 'Portfolio', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Blog', href: '#' },
];

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="border-t border-kitsu-border bg-kitsu-bg">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:pt-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <AnimatedSection direction="up" delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <FoxMark size={32} className="text-fox" />
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                Kitsu Digital
              </span>
            </div>
            <p className="mb-6 max-w-xs text-sm text-kitsu-muted leading-relaxed">
              Premium digital agency building high-converting websites and
              intelligent products for ambitious brands.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Twitter/X */}
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-kitsu-border text-kitsu-dim transition-all duration-300 hover:border-fox/30 hover:text-fox"
                aria-label="Twitter / X"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-kitsu-border text-kitsu-dim transition-all duration-300 hover:border-fox/30 hover:text-fox"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" fill="currentColor" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-kitsu-border text-kitsu-dim transition-all duration-300 hover:border-fox/30 hover:text-fox"
                aria-label="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor" />
                </svg>
              </a>
              {/* Dribbble */}
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-kitsu-border text-kitsu-dim transition-all duration-300 hover:border-fox/30 hover:text-fox"
                aria-label="Dribbble"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </AnimatedSection>

          {/* Services column */}
          <AnimatedSection direction="up" delay={0.06}>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="animated-underline text-sm text-kitsu-muted transition-colors duration-300 hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Company column */}
          <AnimatedSection direction="up" delay={0.12}>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="animated-underline text-sm text-kitsu-muted transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact + Newsletter column */}
          <AnimatedSection direction="up" delay={0.18}>
            <h4
              className="mb-5 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Contact
            </h4>
            <ul className="mb-8 space-y-3">
              <li>
                <a
                  href="mailto:hello@kitsudigital.com"
                  className="animated-underline text-sm text-kitsu-muted transition-colors duration-300 hover:text-white"
                >
                  hello@kitsudigital.com
                </a>
              </li>
              <li>
                <span className="text-sm text-kitsu-muted">
                  +1 (555) 000-0000
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="mb-3 text-sm text-kitsu-muted">Stay in the loop</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="h-10 flex-1 rounded-lg border border-kitsu-border bg-kitsu-surface px-3 text-sm text-white placeholder:text-kitsu-dim outline-none transition-colors duration-300 focus:border-fox"
                />
                <button className="h-10 rounded-lg bg-fox px-4 text-sm font-medium text-white transition-all duration-300 hover:bg-fox/90 active:scale-[0.97]">
                  Subscribe
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-kitsu-border pt-8 sm:flex-row">
          <p className="text-xs text-kitsu-dim">
            © 2025 Kitsu Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="animated-underline text-xs text-kitsu-dim transition-colors duration-300 hover:text-kitsu-muted"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="animated-underline text-xs text-kitsu-dim transition-colors duration-300 hover:text-kitsu-muted"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
