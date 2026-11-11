import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroPlatform from "@/assets/hero-platform.jpg";

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img src={heroPlatform} alt="" className="w-full h-full object-cover opacity-[0.08]" />
      </motion.div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <motion.div style={{ opacity }} className="cinematic-container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="label-mono mb-8">Track Record</div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] mb-4">
            Results that speak.
          </h2>
          <p className="font-heading text-2xl md:text-3xl italic text-accent">
            Numbers that matter.
          </p>
        </div>

        <div className="border-t border-border pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-border">
            {[
              { value: "$38M", label: "Prevented failure cost", sub: "Single engagement" },
              { value: "6.2%", label: "Output recovered", sub: "Offshore platform" },
              { value: "26mo", label: "Early warning", sub: "Before catastrophic failure" },
              { value: "47", label: "Turbines optimized", sub: "Fleet-level analysis" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-8 px-4">
                <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  {stat.label}
                </div>
                <div className="font-body text-[10px] text-muted-foreground/40">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="divider-line mx-auto mb-8" />
          <p className="font-heading text-xl md:text-2xl italic text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            "Five PhDs. Three disciplines. Fourteen months of overlooked data.
            The answer was always there — it just needed the right people to see it."
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
