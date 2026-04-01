import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import EventsSection from "@/components/event-section";
import AppCTA from "@/components/app-cta";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <EventsSection />
      <AppCTA />
    </div>
  );
}
