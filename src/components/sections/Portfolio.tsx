'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TiltCard } from '@/components/shared/TiltCard';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface Project {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  metrics: string[];
  metricValues: string[];
  tech: string[];
  device: 'macbook' | 'browser' | 'iphone';
  problem: string;
  approach: string;
  outcome: string;
  shipped: string[];
}

const projects: Project[] = [
  {
    id: 'luminary',
    name: 'Luminary',
    description: 'SaaS platform redesign',
    fullDescription:
      'Redesigned the entire user experience, resulting in a 340% increase in trial-to-paid conversions and $2.4M in Series A funding.',
    metrics: ['340% conversion lift', '2.4x faster onboarding'],
    metricValues: ['340%', '2.4x'],
    tech: ['Next.js', 'TypeScript', 'Framer Motion'],
    device: 'macbook',
    problem:
      'Luminary\'s SaaS platform suffered from a clunky, outdated interface that confused trial users and led to abysmal conversion rates. The onboarding flow had 12 steps, and users dropped off after step 3. Their existing tech stack made rapid iteration impossible.',
    approach:
      'We started with deep user research — 40+ interviews and heatmaps revealed the friction points. We then rebuilt the entire front-end with Next.js, creating a streamlined 4-step onboarding with progressive disclosure. Every interaction was animated with Framer Motion to guide users naturally through the flow.',
    outcome:
      'The redesign delivered a 340% increase in trial-to-paid conversions within 60 days of launch. Onboarding completion jumped from 23% to 89%. The improved metrics directly contributed to Luminary closing a $2.4M Series A round. The new codebase reduced feature delivery time by 60%.',
    shipped: [
      'Complete UX redesign with 40+ user-tested components',
      '4-step onboarding flow with progressive disclosure',
      'Real-time analytics dashboard for trial users',
      'Animated micro-interactions across 120+ touchpoints',
      'Performance optimization: 98 Lighthouse score',
    ],
  },
  {
    id: 'flux-ai',
    name: 'Flux AI',
    description: 'AI-powered analytics dashboard',
    fullDescription:
      'Built an intelligent analytics platform that processes 10M+ data points daily with real-time AI insights.',
    metrics: ['10M+ daily events', '< 200ms response'],
    metricValues: ['10M+', '< 200ms'],
    tech: ['React', 'Python', 'OpenAI', 'AWS'],
    device: 'browser',
    problem:
      'Flux AI needed to process massive streams of event data in real-time but their existing infrastructure couldn\'t handle the load. The team was spending 70% of their time on infrastructure instead of product. Their analytics UI was a mess of tables that made insights impossible to extract.',
    approach:
      'We architected a distributed event pipeline on AWS using Lambda, Kinesis, and DynamoDB. The React front-end was rebuilt with custom D3 visualizations and OpenAI-powered natural language queries. We implemented intelligent data aggregation that reduced raw queries by 95%.',
    outcome:
      'The platform now processes 10M+ events daily with sub-200ms response times. The AI-powered natural language query feature reduced analyst workload by 80%. Infrastructure costs dropped 40% through intelligent data routing and caching strategies.',
    shipped: [
      'Distributed event pipeline processing 10M+ daily events',
      'AI-powered natural language query interface',
      'Custom D3.js data visualizations with real-time updates',
      'Intelligent data aggregation reducing queries by 95%',
      'Auto-scaling infrastructure reducing costs by 40%',
    ],
  },
  {
    id: 'prism',
    name: 'Prism Commerce',
    description: 'Luxury ecommerce',
    fullDescription:
      'Crafted a high-converting ecommerce experience for a luxury brand, driving $1.8M in first-quarter revenue.',
    metrics: ['$1.8M Q1 revenue', '67% cart completion'],
    metricValues: ['$1.8M', '67%'],
    tech: ['Next.js', 'Shopify', 'Tailwind CSS'],
    device: 'iphone',
    problem:
      'Prism\'s luxury brand had a generic Shopify store that didn\'t reflect their premium positioning. Cart abandonment was at 78%, and mobile conversion was virtually non-existent at 0.4%. The checkout flow had 6 pages with no saved state.',
    approach:
      'We designed a bespoke ecommerce experience that felt like entering a luxury boutique. Product photography was showcased in immersive full-bleed layouts. We implemented a single-page checkout with Shopify Payments, address auto-complete, and Apple Pay. Every animation and transition was crafted to feel premium.',
    outcome:
      'The new store generated $1.8M in revenue in its first quarter — a 420% increase over the same period prior. Cart completion rate jumped from 22% to 67%. Mobile conversion increased 11x. The premium experience led to a 54% increase in average order value.',
    shipped: [
      'Bespoke luxury ecommerce design system',
      'Immersive product showcase with 3D interactions',
      'Single-page checkout with Apple Pay integration',
      'Mobile-first responsive design with 98 Lighthouse score',
      'Shopify headless architecture with custom storefront API',
    ],
  },
];

/* ========== DEVICE MOCKUP SCREENS ========== */

function MacBookScreen() {
  return (
    <div className="relative w-full h-full bg-[#0d0d14] overflow-hidden rounded-sm">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-[#111119] flex items-center px-3 gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        <div className="flex-1 flex justify-center">
          <div className="w-32 h-3 rounded bg-[#1a1a24] mt-0.5" />
        </div>
      </div>
      {/* Sidebar */}
      <div className="absolute top-6 left-0 w-10 bottom-0 bg-[#111119] border-r border-[#1e1e2a]">
        <div className="flex flex-col items-center gap-3 pt-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-md ${i === 0 ? 'bg-fox/30' : 'bg-[#1e1e2a]'}`}
            />
          ))}
        </div>
      </div>
      {/* Main content area */}
      <div className="absolute top-6 left-10 right-0 bottom-0 p-3">
        {/* Breadcrumb */}
        <div className="flex gap-2 mb-2">
          <div className="w-8 h-1.5 rounded bg-kitsu-dim/30" />
          <div className="w-4 h-1.5 rounded bg-kitsu-dim/20" />
        </div>
        {/* Hero card */}
        <div className="rounded-lg bg-gradient-to-br from-fox/20 to-fox/5 p-2.5 mb-2 border border-fox/10">
          <div className="w-16 h-1.5 rounded bg-white/80 mb-1.5" />
          <div className="w-24 h-1 rounded bg-white/30 mb-2" />
          <div className="flex gap-1.5">
            <div className="w-8 h-4 rounded bg-fox/40" />
            <div className="w-8 h-4 rounded bg-[#1e1e2a]" />
          </div>
        </div>
        {/* Metric cards row */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {['bg-emerald-500/15', 'bg-sky-500/15', 'bg-purple-500/15'].map((bg, i) => (
            <div key={i} className={`rounded-md ${bg} p-1.5`}
              style={{ border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div className="w-6 h-1 rounded bg-white/20 mb-1" />
              <div className="w-10 h-2 rounded bg-white/60" />
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div
          className="rounded-lg p-2"
          style={{ background: '#111119', border: '1px solid #1e1e2a' }}
        >
          <div className="w-10 h-1 rounded bg-white/20 mb-2" />
          <div className="flex items-end gap-0.5 h-10">
            {[40, 55, 35, 70, 60, 85, 75, 90, 65, 80, 95, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(to top, rgba(249,115,22,${0.3 + h * 0.007}), rgba(249,115,22,${0.6 + h * 0.004}))`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserScreen() {
  return (
    <div className="relative w-full h-full bg-[#0d0d14] overflow-hidden rounded-sm">
      {/* URL bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#111119] flex items-center px-2 gap-2 border-b border-[#1e1e2a]">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-3/4 h-4 rounded bg-[#1a1a24] flex items-center px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-kitsu-dim/40 mr-1.5" />
            <div className="w-20 h-1 rounded bg-kitsu-dim/30" />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="absolute top-8 left-0 right-0 bottom-0 p-2.5">
        {/* AI Query Bar */}
        <div
          className="rounded-lg p-2 mb-2 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(249,115,22,0.15)' }}
        >
          <div className="w-4 h-4 rounded-full bg-fox/20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-fox" />
          </div>
          <div className="flex-1 h-2 rounded bg-white/5" />
          <div className="w-5 h-4 rounded bg-fox/30" />
        </div>
        {/* Grid of data cards */}
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {[
            { label: 'Events', value: '2.4M', color: 'from-emerald-500/15 to-emerald-500/5', accent: 'bg-emerald-500/40' },
            { label: 'Users', value: '89K', color: 'from-sky-500/15 to-sky-500/5', accent: 'bg-sky-500/40' },
            { label: 'Revenue', value: '$142K', color: 'from-amber-500/15 to-amber-500/5', accent: 'bg-amber-500/40' },
            { label: 'Growth', value: '+34%', color: 'from-purple-500/15 to-purple-500/5', accent: 'bg-purple-500/40' },
          ].map((card) => (
            <div
              key={card.label}
              className={`rounded-md bg-gradient-to-br ${card.color} p-1.5`}
              style={{ border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div className="w-6 h-1 rounded bg-white/20 mb-1" />
              <div className="w-9 h-2 rounded bg-white/70 mb-1" />
              <div className={`w-4 h-1 rounded ${card.accent}`} />
            </div>
          ))}
        </div>
        {/* Line chart area */}
        <div
          className="rounded-lg p-2"
          style={{ background: '#111119', border: '1px solid #1e1e2a' }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="w-10 h-1 rounded bg-white/20" />
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-4 h-2 rounded bg-[#1e1e2a]" />
              ))}
            </div>
          </div>
          <div className="h-9 relative">
            <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(249,115,22,0.3)" />
                  <stop offset="100%" stopColor="rgba(249,115,22,0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,35 Q20,30 40,25 T80,18 T120,22 T160,8 T200,12 V40 H0 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M0,35 Q20,30 40,25 T80,18 T120,22 T160,8 T200,12"
                fill="none"
                stroke="#F97316"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function IPhoneScreen() {
  return (
    <div className="relative w-full h-full bg-[#0d0d14] overflow-hidden rounded-[1px]">
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#111119] flex items-center justify-center">
        <div className="w-8 h-1.5 rounded-full bg-black" />
      </div>
      {/* Nav bar */}
      <div className="absolute top-4 left-0 right-0 h-5 bg-[#111119] flex items-center justify-between px-2.5 border-b border-[#1e1e2a]">
        <div className="w-3 h-1 rounded bg-fox" />
        <div className="flex gap-2.5">
          <div className="w-3 h-1 rounded bg-white/20" />
          <div className="w-3 h-1 rounded bg-white/20" />
          <div className="w-3 h-1 rounded bg-white/20" />
        </div>
        <div className="w-3 h-3 rounded-full bg-[#1e1e2a]" />
      </div>
      {/* Content */}
      <div className="absolute top-9 left-0 right-0 bottom-4 overflow-hidden">
        {/* Hero product image */}
        <div className="h-[38%] bg-gradient-to-br from-[#1a1520] via-[#18131a] to-[#13131a] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fox/20 to-purple-500/10" />
          </div>
          <div className="absolute bottom-1.5 left-2.5 right-2.5">
            <div className="w-14 h-1.5 rounded bg-white/80 mb-1" />
            <div className="w-20 h-1 rounded bg-white/30" />
          </div>
        </div>
        {/* Product details */}
        <div className="p-2.5 space-y-2">
          <div className="flex gap-1.5">
            <div className="w-5 h-5 rounded bg-fox/15 border border-fox/20" />
            <div className="w-5 h-5 rounded bg-[#1e1e2a]" />
            <div className="w-5 h-5 rounded bg-[#1e1e2a]" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1 rounded bg-white/15" />
            <div className="w-4/5 h-1 rounded bg-white/10" />
            <div className="w-3/5 h-1 rounded bg-white/10" />
          </div>
          {/* Price row */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-2.5 rounded bg-white/70" />
            <div className="w-12 h-5 rounded-full bg-fox/80" />
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#111119] flex items-center justify-around border-t border-[#1e1e2a]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`w-3 h-1.5 rounded ${i === 0 ? 'bg-fox' : 'bg-[#1e1e2a]'}`} />
        ))}
      </div>
    </div>
  );
}

/* ========== DEVICE FRAMES ========== */

function MacBookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: '100%', maxWidth: '420px' }}>
      {/* Screen bezel */}
      <div
        className="rounded-t-xl overflow-hidden"
        style={{
          border: '2px solid #2a2a35',
          borderBottom: 'none',
          background: '#1a1a24',
          padding: '8px',
        }}
      >
        <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
          {children}
        </div>
      </div>
      {/* Bottom bezel / chin */}
      <div
        className="mx-auto rounded-b-xl"
        style={{
          width: '60%',
          height: '6px',
          background: 'linear-gradient(180deg, #2a2a35 0%, #1e1e28 100%)',
          borderRadius: '0 0 12px 12px',
        }}
      />
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: '80px',
          height: '10px',
          background: '#1a1a24',
          borderRadius: '0 0 8px 8px',
          border: '2px solid #2a2a35',
          borderTop: 'none',
          zIndex: 10,
        }}
      >
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2"
          style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#27272a' }}
        />
      </div>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto rounded-xl overflow-hidden"
      style={{
        width: '100%',
        maxWidth: '420px',
        border: '2px solid #2a2a35',
        background: '#1a1a24',
        padding: '8px',
      }}
    >
      <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
        {children}
      </div>
    </div>
  );
}

function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: '100%', maxWidth: '180px' }}>
      {/* Phone body */}
      <div
        className="relative rounded-[20px] overflow-hidden"
        style={{
          border: '2.5px solid #2a2a35',
          background: '#1a1a24',
          padding: '6px',
        }}
      >
        <div className="relative w-full rounded-[14px] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
          {children}
        </div>
        {/* Dynamic Island / Notch */}
        <div
          className="absolute top-3.5 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: '50px',
            height: '12px',
            background: '#000',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  );
}

/* ========== CASE STUDY MODAL ========== */

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 case-study-overlay"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl hide-scrollbar"
        style={{
          background: '#13131A',
          border: '1px solid #27272A',
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4"
          style={{
            background: 'linear-gradient(180deg, #13131A 80%, transparent 100%)',
          }}
        >
          <div>
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              {project.name}
            </h2>
            <p className="text-sm text-kitsu-muted mt-0.5" style={{ fontFamily: 'var(--font-grotesk)' }}>
              {project.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-kitsu-elevated border border-kitsu-border flex items-center justify-center text-kitsu-muted hover:text-white hover:border-fox/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Metrics Banner */}
          <div className="grid grid-cols-2 gap-3">
            {project.metricValues.map((val, i) => (
              <div
                key={i}
                className="rounded-xl p-4 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(249,115,22,0.02))',
                  border: '1px solid rgba(249,115,22,0.12)',
                }}
              >
                <div
                  className="text-2xl font-bold text-fox"
                  style={{ fontFamily: 'var(--font-grotesk)' }}
                >
                  {val}
                </div>
                <div className="text-xs text-kitsu-dim mt-1">{project.metrics[i]}</div>
              </div>
            ))}
          </div>

          {/* Narrative */}
          <div className="space-y-4">
            <div>
              <h3
                className="text-sm font-semibold text-fox uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-grotesk)' }}
              >
                The Problem
              </h3>
              <p className="text-sm text-kitsu-muted leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h3
                className="text-sm font-semibold text-fox uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-grotesk)' }}
              >
                Our Approach
              </h3>
              <p className="text-sm text-kitsu-muted leading-relaxed">{project.approach}</p>
            </div>
            <div>
              <h3
                className="text-sm font-semibold text-fox uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-grotesk)' }}
              >
                The Outcome
              </h3>
              <p className="text-sm text-kitsu-muted leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* What We Shipped */}
          <div>
            <h3
              className="text-sm font-semibold text-fox uppercase tracking-wider mb-3"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              What We Shipped
            </h3>
            <ul className="space-y-2">
              {project.shipped.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-kitsu-muted">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-fox flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3
              className="text-sm font-semibold text-fox uppercase tracking-wider mb-3"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(249,115,22,0.1)',
                    color: '#F97316',
                    border: '1px solid rgba(249,115,22,0.15)',
                    fontFamily: 'var(--font-grotesk)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ========== MAIN PORTFOLIO SECTION ========== */

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const screenMap = {
    macbook: MacBookScreen,
    browser: BrowserScreen,
    iphone: IPhoneScreen,
  };

  const frameMap = {
    macbook: MacBookFrame,
    browser: BrowserFrame,
    iphone: IPhoneFrame,
  };

  return (
    <section className="py-24 md:py-32" id="portfolio">
      {/* Section Heading */}
      <AnimatedSection className="text-center mb-16 md:mb-20">
        <p
          className="text-sm font-medium text-fox uppercase tracking-widest mb-3"
          style={{ fontFamily: 'var(--font-grotesk)' }}
        >
          Portfolio
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          Selected Work
        </h2>
        <p className="text-kitsu-muted max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          A curated collection of projects where strategy, design, and engineering
          converge to create measurable business impact.
        </p>
      </AnimatedSection>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, idx) => {
          const Screen = screenMap[project.device];
          const Frame = frameMap[project.device];
          return (
            <TiltCard key={project.id}>
              <div
                className="group relative cursor-pointer rounded-2xl overflow-hidden"
                style={{
                  background: '#13131A',
                  border: '1px solid #27272A',
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Device Mockup */}
                <div className="relative p-5 pb-0">
                  <Frame>
                    <Screen />
                  </Frame>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-fox/0 group-hover:bg-fox/15 transition-all duration-300 pointer-events-none">
                  <span className="text-kitsu-bg font-semibold text-sm tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-fox/80 backdrop-blur-sm">
                    View Case Study
                  </span>
                </div>

                {/* Project Info */}
                <div className="p-5 pt-4">
                  <h3
                    className="text-lg font-bold text-white mb-1"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-sm text-kitsu-muted" style={{ fontFamily: 'var(--font-grotesk)' }}>
                    {project.description}
                  </p>
                  {/* Metrics pills */}
                  <div className="flex gap-2 mt-3">
                    {project.metrics.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2.5 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(249,115,22,0.08)',
                          color: '#F97316',
                          border: '1px solid rgba(249,115,22,0.12)',
                          fontFamily: 'var(--font-grotesk)',
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
