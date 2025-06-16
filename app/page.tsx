import Hero from "@/components/hero"
import WhyUseSection from "@/components/why-use-section"
import WhoIsItFor from "@/components/who-is-it-for"
import ProblemSolutionTabs from "@/components/problem-solution-tabs"
import VisualProcessSection from "@/components/visual-process-selection"
import DigitalEmpiresSection from "@/components/digital-empires-section"
import RegisterForm from "@/components/register-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <WhyUseSection />
      <WhoIsItFor />
      <ProblemSolutionTabs />
      <VisualProcessSection />
      <DigitalEmpiresSection />
      <RegisterForm />
      <Footer />
    </main>
  )
}
