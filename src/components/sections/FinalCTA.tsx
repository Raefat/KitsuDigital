'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { MagneticButton } from '@/components/shared/MagneticButton';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32 md:py-40">
      {/* Animated amber aurora background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'aurora-pulse 8s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute left-1/4 top-1/3 h-[400px] w-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 40% 60%, rgba(253,186,116,0.07) 0%, transparent 60%)',
            filter: 'blur(80px)',
            animation: 'aurora-drift 10s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Abstract flowing tail SVGs */}
      <svg
        className="pointer-events-none absolute left-0 top-1/4 h-[300px] w-full opacity-[0.04]"
        viewBox="0 0 1200 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 200C200 100 400 250 600 150C800 50 1000 200 1200 120"
          stroke="#F97316"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M0 180C150 120 350 220 550 140C750 60 950 180 1200 100"
          stroke="#F97316"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M0 220C250 130 450 270 650 170C850 70 1050 220 1200 140"
          stroke="#F97316"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>

      <svg
        className="pointer-events-none absolute bottom-1/4 left-0 h-[200px] w-full opacity-[0.03]"
        viewBox="0 0 1200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 100C300 50 500 150 800 80C1000 40 1100 120 1200 90"
          stroke="#F97316"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M0 120C250 70 450 170 700 100C950 30 1100 100 1200 80"
          stroke="#F97316"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <AnimatedSection direction="up" delay={0}>
          <h2
            className="mb-6 text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
          >
            Ready to Build Something That{' '}
            <span className="gradient-text-fox">Actually Converts</span>?
          </h2>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.15}>
          <p className="mx-auto mb-10 max-w-xl text-base text-kitsu-muted leading-relaxed md:text-lg">
            Join 147+ brands that chose Kitsu to build their digital presence.
            Your competitors are not waiting — neither should you.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <div className="flex flex-col items-center gap-5">
            <MagneticButton variant="primary" size="lg" className="font-semibold">
              Book Your Free Strategy Call
            </MagneticButton>
            <a
              href="mailto:hello@kitsudigital.com"
              className="text-sm text-kitsu-dim transition-colors duration-300 hover:text-kitsu-muted"
            >
              hello@kitsudigital.com
            </a>
          </div>
        </AnimatedSection>
      </div>

      {/* Aurora keyframes */}
      <style>{`
        @keyframes aurora-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
        }
        @keyframes aurora-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, -20px); }
        }
      `}</style>
    </section>
  );
}
