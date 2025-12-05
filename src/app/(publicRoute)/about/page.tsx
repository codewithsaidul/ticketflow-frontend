import { AboutCTA, AboutHero, MissionVision, StatsSection, TeamSection, ValuesSection } from "@/components/pages/about"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "About Velotix - Revolutionizing Event Ticketing",
  description:
    "Learn how Velotix is transforming the event ticketing experience with lightning-fast, reliable booking for millions.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <MissionVision />
      <StatsSection />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
    </main>
  )
}
