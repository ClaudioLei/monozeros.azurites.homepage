import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { TrustBar } from "@/components/home/trust-bar"
import { ProblemSection } from "@/components/home/problem-section"
import { SolutionSection } from "@/components/home/solution-section"
import { ROISection } from "@/components/home/roi-section"
import { SocialProof } from "@/components/home/social-proof"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <SolutionSection />
      <ROISection />
      <SocialProof />
      <CTASection />
      <Footer />
    </main>
  )
}
