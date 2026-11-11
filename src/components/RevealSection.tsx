import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroPlatform from "@/assets/hero-platform.jpg";

const RevealSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      {/* Subtle background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src={heroPlatform}
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
      </motion.div>

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      
      <motion.div style={{ opacity }} className="cinematic-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Big statement */}
          <div className="text-center mb-20">
            <div className="label-mono mb-8">The outcome</div>
            
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] mb-6">
              One root cause.
            </h2>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium italic text-accent leading-[1.1]">
              Four symptoms nobody connected.
            </h2>
          </div>

          {/* Stats - McKinsey style horizontal layout */}
          <div className="border-t border-border pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-border">
              {[
                { value: "$38M", label: "Prevented failure cost" },
                { value: "6.2%", label: "Output recovered" },
                { value: "26mo", label: "Early warning before failure" },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0">
                  <div className="font-heading text-5xl md:text-6xl font-medium text-foreground mb-3">
                    {stat.value}
                  </div>
                  <div className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="mt-20 text-center">
            <div className="divider-line mx-auto mb-8" />
            <p className="font-heading text-xl md:text-2xl italic text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              "Five PhDs. Three disciplines. Fourteen months of overlooked data. 
              The answer was always there — it just needed the right people to see it."
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RevealSection;
