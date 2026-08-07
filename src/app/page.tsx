import type { Metadata } from 'next'
import { Loader } from '@/components/shared/Loader'
import { FoxTrailCursor } from '@/components/shared/FoxTrailCursor'
import { JsonLd } from '@/components/shared/JsonLd'
import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { ResultsStrip } from '@/components/sections/ResultsStrip'
import { Services } from '@/components/sections/Services'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Process } from '@/components/sections/Process'
import { TechStack } from '@/components/sections/TechStack'
import { Pricing } from '@/components/sections/Pricing'
import { LatestPosts } from '@/components/sections/LatestPosts'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Footer } from '@/components/sections/Footer'
import { faqSchema, servicesSchema } from '@/lib/seo'
import { services, faqs } from '@/config/content'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      {/* Mirrors the Services and FAQ sections rendered below. */}
      <JsonLd
        schema={[
          servicesSchema(services.map(({ title, description }) => ({ title, description }))),
          faqSchema(faqs.map(({ question, answer }) => ({ question, answer }))),
        ]}
      />

      <Loader />
      <FoxTrailCursor />
      <Navigation />

      <main id="main">
        {/* Portfolio and Testimonials are deliberately not rendered: both still
            hold invented clients and outcomes. The components remain in the repo
            — put them back once there is real work and real quotes to show. */}
        <Hero />
        <ResultsStrip />
        <Services />
        <Process />
        <WhyChooseUs />
        <Pricing />
        <TechStack />
        <LatestPosts />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
