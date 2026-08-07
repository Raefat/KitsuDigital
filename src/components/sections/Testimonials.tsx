'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Container } from '@/components/shared/Container';

interface Testimonial {
  name: string;
  company: string;
  role: string;
  initials: string;
  quote: string;
  rating: number;
  metric: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    company: 'Luminary',
    role: 'CEO',
    initials: 'SC',
    quote:
      "Kitsu didn't just build us a website — they built us a revenue machine. Our conversion rate tripled within the first month of launch.",
    rating: 5,
    metric: '340% conversion increase',
    avatarColor: 'from-fox/30 to-amber-600/20',
  },
  {
    name: 'Marcus Rivera',
    company: 'Flux AI',
    role: 'Founder',
    initials: 'MR',
    quote:
      'The speed and quality of delivery was unlike any agency I\'ve worked with. They shipped our entire platform in 3 weeks.',
    rating: 5,
    metric: 'Shipped in 21 days',
    avatarColor: 'from-sky-500/25 to-cyan-500/15',
  },
  {
    name: 'Aisha Patel',
    company: 'Prism',
    role: 'Head of Product',
    initials: 'AP',
    quote:
      'Our ecommerce conversion rate went from 1.2% to 4.7% after the redesign. The ROI was immediate and undeniable.',
    rating: 5,
    metric: '4.7% conversion rate',
    avatarColor: 'from-violet-500/25 to-purple-500/15',
  },
  {
    name: 'James O\'Connor',
    company: 'Helix',
    role: 'CTO',
    initials: 'JO',
    quote:
      'The code quality is exceptional. We\'ve had zero downtime since launch, and the architecture scales effortlessly.',
    rating: 5,
    metric: '99.99% uptime',
    avatarColor: 'from-emerald-500/25 to-teal-500/15',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < count ? 'fill-fox text-fox' : 'fill-none text-kitsu-dim'
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth =
      container.querySelector<HTMLElement>('[data-card]')?.offsetWidth || 360;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 py-24 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      <Container>
      {/* Section Heading */}
      <AnimatedSection className="text-center mb-16 md:mb-20">
        <p
          className="text-sm font-medium text-fox uppercase tracking-widest mb-3"
          style={{ fontFamily: 'var(--font-grotesk)' }}
        >
          Testimonials
        </p>
        <h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          What Our Clients Say
        </h2>
        <p className="text-kitsu-muted max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Don&apos;t take our word for it. Here&apos;s what the leaders we&apos;ve
          worked with have to say about the Kitsu experience.
        </p>
      </AnimatedSection>

      {/* Carousel Container */}
      <div className="relative">
        {/* Prev Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center text-kitsu-muted hover:text-white transition-colors"
          style={{
            background: '#1A1A24',
            border: '1px solid #27272A',
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center text-kitsu-muted hover:text-white transition-colors"
          style={{
            background: '#1A1A24',
            border: '1px solid #27272A',
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar px-1 snap-x snap-mandatory"
          style={{
            /* Mobile: show ~1.1 cards; Tablet: ~2.1; Desktop: ~3.1 */
            scrollPaddingLeft: '4px',
          }}
        >
          {testimonials.map((t, idx) => (
            <AnimatedSection
              key={t.name}
              delay={idx * 0.1}
              className="snap-start flex-shrink-0 w-[320px] sm:w-[340px] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div
                data-card
                className="h-full rounded-2xl p-6 flex flex-col"
                style={{
                  background: '#13131A',
                  border: '1px solid #27272A',
                }}
              >
                {/* Header: Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center flex-shrink-0`}
                    style={{ border: '1.5px solid rgba(249,115,22,0.2)' }}
                  >
                    <span
                      className="text-sm font-bold text-fox"
                      style={{ fontFamily: 'var(--font-grotesk)' }}
                    >
                      {t.initials}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold text-white truncate"
                      style={{ fontFamily: 'var(--font-jakarta)' }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs text-kitsu-dim truncate"
                      style={{ fontFamily: 'var(--font-grotesk)' }}
                    >
                      {t.role} at {t.company}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <StarRating count={t.rating} />

                {/* Quote */}
                <p
                  className="mt-4 text-sm leading-relaxed text-kitsu-muted italic flex-1"
                  style={{ fontFamily: 'var(--font-grotesk)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Metric Badge */}
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid #27272A' }}>
                  <span
                    className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(249,115,22,0.08)',
                      color: '#F97316',
                      border: '1px solid rgba(249,115,22,0.12)',
                      fontFamily: 'var(--font-grotesk)',
                    }}
                  >
                    <span className="mr-1.5 w-1.5 h-1.5 rounded-full bg-fox" />
                    {t.metric}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile nav buttons */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-kitsu-muted hover:text-white transition-colors"
            style={{
              background: '#1A1A24',
              border: '1px solid #27272A',
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-kitsu-muted hover:text-white transition-colors"
            style={{
              background: '#1A1A24',
              border: '1px solid #27272A',
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      </Container>
    </section>
  );
}
