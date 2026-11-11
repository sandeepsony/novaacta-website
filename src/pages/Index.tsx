import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

import HorizontalServices from "@/components/HorizontalServices";
import ComparisonStats from "@/components/ComparisonStats";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StealthOverlay from "@/components/StealthOverlay";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StealthOverlay />
      <Navbar />
      <HeroSection />
      <AboutSection />
      
      <HorizontalServices />
      <ComparisonStats />
      <TestimonialCarousel />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
