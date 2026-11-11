import { MotionConfig } from "framer-motion";
import { Info } from "lucide-react";
import CTASection from "@/components/CTASection";
import PlatformSection from "@/components/PlatformSection";
import SectionHeading from "@/components/SectionHeading";

const Platform = () => (
  <>
    <section className="pb-12 pt-36 md:pb-16 md:pt-44">
      <div className="site-container">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Platform · concept preview"
          title={
            <>
              One view of <span className="italic text-accent">the whole investigation.</span>
            </>
          }
          intro="A preview of how we present an investigation: the signals, the risk trend and the things worth watching for one asset, on a single screen."
        />

        <p className="mx-auto mt-10 flex max-w-2xl items-start gap-3 border border-border bg-card/60 p-5 text-left text-[0.9375rem] leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
          <span>
            <strong className="font-medium text-foreground">Every number below is simulated.</strong> The workspace
            is a design concept populated with generated signals for the seven illustrative scenarios. It is not
            connected to any live asset.
          </span>
        </p>
      </div>
    </section>

    <MotionConfig reducedMotion="user">
      <PlatformSection />
    </MotionConfig>

    <CTASection
      title="Want this view of your own asset?"
      body="Tell us what you monitor today and what you wish it could tell you. We will tell you what it would take."
    />
  </>
);

export default Platform;
