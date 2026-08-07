'use client';

import { Loader } from '@/components/shared/Loader';
import { FoxTrailCursor } from '@/components/shared/FoxTrailCursor';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { ResultsStrip } from '@/components/sections/ResultsStrip';
import { Services } from '@/components/sections/Services';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Process } from '@/components/sections/Process';
import { Portfolio } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { TechStack } from '@/components/sections/TechStack';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Loader />
      <FoxTrailCursor />
      <Navigation />
      <main>
        <Hero />
        <ResultsStrip />
        <Services />
        <WhyChooseUs />
        <Process />
        <Portfolio />
        <Testimonials />
        <TechStack />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
