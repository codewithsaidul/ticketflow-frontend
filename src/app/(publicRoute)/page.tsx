import {
  CategorySection,
  CTASection,
  FeaturedSection,
  Hero,
  HowItWorks,
} from "@/components/pages/home";
import WhyChooseUS from "@/components/pages/home/why-choose";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <CategorySection />
      <WhyChooseUS />
      <HowItWorks />
      <CTASection />
    </>
  );
}
