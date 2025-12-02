import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VideoHero } from "@/components/home/video-hero";
import { FeaturesSection } from "@/components/home/features-section";
import { VehicleShowcase } from "@/components/home/vehicle-showcase";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <VideoHero />
        <FeaturesSection />
        <VehicleShowcase />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
