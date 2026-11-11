import { MotionConfig } from "framer-motion";
import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import ScenariosTeaser from "@/components/ScenariosTeaser";
import StealthOverlay from "@/components/StealthOverlay";

const Index = () => (
  <>
    <MotionConfig reducedMotion="user">
      <StealthOverlay />
    </MotionConfig>
    <HeroSection />
    <AboutSection />
    <CapabilitiesSection />
    <ApproachSection />
    <ScenariosTeaser />
    <CTASection />
  </>
);

export default Index;
