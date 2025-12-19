import AboutSection from "@/components/AboutSection/AboutSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import PricingSection from "@/components/PricingSection/PricingSection";
import ResultsSection from "@/components/ResultsSection/ResultsSection";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-250">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <AboutSection />
        <ResultsSection />
        <PricingSection />
      </main>
    </div>
  );
}
