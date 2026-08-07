'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Container } from '@/components/shared/Container';

const techItems = [
  {
    name: 'React',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* React atom - orbital paths */}
        <ellipse cx="16" cy="16" rx="12" ry="5" stroke="#A1A1AA" strokeWidth="1.2" transform="rotate(0 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="5" stroke="#A1A1AA" strokeWidth="1.2" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="5" stroke="#A1A1AA" strokeWidth="1.2" transform="rotate(-60 16 16)" />
        <circle cx="16" cy="16" r="2.5" fill="#A1A1AA" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Next.js triangle-ish / N shape */}
        <path d="M16 6L28 26H4L16 6Z" stroke="#A1A1AA" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <line x1="12" y1="26" x2="22" y2="12" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
        <text x="16" y="21" textAnchor="middle" fill="#A1A1AA" fontSize="10" fontWeight="bold" fontFamily="sans-serif">TS</text>
      </svg>
    ),
  },
  {
    name: 'Java',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Coffee cup with steam */}
        <path d="M8 14H22V24C22 26.2 20.2 28 18 28H12C9.8 28 8 26.2 8 24V14Z" stroke="#A1A1AA" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <path d="M22 17H25C26.1 17 27 17.9 27 19V19C27 20.1 26.1 21 25 21H22" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
        <path d="M12 11C12 9 13 7 13 7" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M16 10C16 8 17 6 17 6" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M20 11C20 9 21 7 21 7" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: 'Spring Boot',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Spring / leaf shape */}
        <path d="M8 26C8 26 10 10 26 6" stroke="#A1A1AA" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M14 20C14 20 18 12 26 8" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
        <circle cx="26" cy="6" r="2" fill="#A1A1AA" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hexagon for Node */}
        <path d="M16 4L27 10V22L16 28L5 22V10L16 4Z" stroke="#A1A1AA" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <text x="16" y="20" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontWeight="bold" fontFamily="sans-serif">N</text>
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Database cylinder */}
        <ellipse cx="16" cy="10" rx="9" ry="4" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
        <path d="M7 10V22C7 24.2 11 26 16 26C21 26 25 24.2 25 22V10" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
        <path d="M7 16C7 18.2 11 20 16 20C21 20 25 18.2 25 16" stroke="#A1A1AA" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified whale silhouette */}
        <path d="M4 20L8 16H14L16 14H20L22 16H26L28 18L26 20H4Z" stroke="#A1A1AA" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cloud shape */}
        <path d="M8 22C5.8 22 4 20.2 4 18C4 16 5.4 14.3 7.3 14C7.8 10.6 10.7 8 14.2 8C17.2 8 19.7 10 20.7 12.7C21.1 12.6 21.5 12.5 22 12.5C24.8 12.5 27 14.7 27 17.5C27 17.7 27 17.8 27 18C27 20.2 25.2 22 23 22H8Z" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Abstract brain / neural knot */}
        <circle cx="16" cy="16" r="10" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
        <path d="M12 12C14 10 18 10 20 12" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M12 20C14 22 18 22 20 20" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M10 16H22" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <circle cx="16" cy="16" r="2" fill="#A1A1AA" />
      </svg>
    ),
  },
  {
    name: 'LangGraph',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Graph nodes + edges */}
        <circle cx="8" cy="10" r="3" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
        <circle cx="24" cy="10" r="3" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
        <circle cx="16" cy="22" r="3" stroke="#A1A1AA" strokeWidth="1.2" fill="none" />
        <line x1="11" y1="11" x2="13" y2="20" stroke="#A1A1AA" strokeWidth="1" opacity="0.6" />
        <line x1="21" y1="11" x2="19" y2="20" stroke="#A1A1AA" strokeWidth="1" opacity="0.6" />
        <line x1="11" y1="10" x2="21" y2="10" stroke="#A1A1AA" strokeWidth="1" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Redis',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diamond / cache shape */}
        <path d="M16 4L28 16L16 28L4 16L16 4Z" stroke="#A1A1AA" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <path d="M10 16H22" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M16 10V22" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wind/wave shape */}
        <path d="M6 16C8 14 10 14 12 16C14 18 16 18 18 16C20 14 22 14 24 16" stroke="#A1A1AA" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M8 20C10 18 12 18 14 20C16 22 18 22 20 20C22 18 24 18 26 20" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M4 12C6 10 8 10 10 12C12 14 14 14 16 12C18 10 20 10 22 12" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
  },
];

export function TechStack() {
  return (
    <section
      id="tech"
      className="relative scroll-mt-20 py-24 md:py-32"
      aria-labelledby="tech-heading"
    >
      <Container>
      {/* Section header */}
      <AnimatedSection direction="up" delay={0}>
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-accent uppercase tracking-[0.2em] text-fox">
            Technology
          </p>
          <h2
            id="tech-heading"
            className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            Built With the{' '}
            <span className="gradient-text-fox">Best</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-kitsu-muted leading-relaxed md:text-lg">
            We leverage cutting-edge technologies to build fast, scalable, and
            intelligent digital products.
          </p>
        </div>
      </AnimatedSection>

      {/* Tech grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
        {techItems.map((tech, i) => (
          <AnimatedSection key={tech.name} direction="up" delay={i * 0.05}>
            <div className="group flex flex-col items-center gap-3 rounded-xl border border-kitsu-border bg-kitsu-surface p-4 text-center transition-all duration-300 hover:border-fox/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] cursor-default">
              <div className="transition-colors duration-300 [&_svg]:transition-colors [&_svg]:duration-300 [&_circle]:transition-colors [&_circle]:duration-300 [&_ellipse]:transition-colors [&_ellipse]:duration-300 [&_path]:transition-colors [&_path]:duration-300 [&_line]:transition-colors [&_line]:duration-300 [&_rect]:transition-colors [&_rect]:duration-300 [&_text]:transition-colors [&_text]:duration-300 group-hover:[&_svg]:stroke-fox group-hover:[&_circle]:stroke-fox group-hover:[&_circle]:fill-fox group-hover:[&_ellipse]:stroke-fox group-hover:[&_path]:stroke-fox group-hover:[&_line]:stroke-fox group-hover:[&_rect]:stroke-fox group-hover:[&_text]:fill-fox">
                {tech.icon}
              </div>
              <span className="text-xs font-medium text-kitsu-muted transition-colors duration-300 group-hover:text-white">
                {tech.name}
              </span>
            </div>
          </AnimatedSection>
        ))}
      </div>
      </Container>
    </section>
  );
}
