import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ProblemSection } from '@/components/ProblemSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { DifferentialsSection } from '@/components/DifferentialsSection'
import { SecuritySection } from '@/components/SecuritySection'
import { ComparisonSection } from '@/components/ComparisonSection'
import { PricingSection } from '@/components/PricingSection'
import { CareerPlanSection } from '@/components/CareerPlanSection'
import { AffiliatesSection } from '@/components/AffiliatesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { FAQSection } from '@/components/FAQSection'
import { CTAFinalSection } from '@/components/CTAFinalSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[69px]">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <DifferentialsSection />
        <SecuritySection />
        <ComparisonSection />
        <PricingSection />
        <CareerPlanSection />
        <AffiliatesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTAFinalSection />
      </main>
      <Footer />
    </>
  )
}