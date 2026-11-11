import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  return (
    <section ref={ref} className="py-28 md:py-40 border-t border-border">
      <motion.div style={{ opacity }} className="cinematic-container">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — statement */}
          <div>
            <div className="label-mono mb-6">Who We Are</div>
            <div className="divider-line mb-10" />
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground leading-[1.15] mb-8">
              The bridge between{" "}
              <span className="italic text-accent">deep engineering</span>{" "}
              and data science.
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Traditional consultants understand strategy but not thermodynamics. Data scientists 
              understand algorithms but not reservoir mechanics. We are the rare team that speaks 
              both languages — researchers who chose industry over academia because the most 
              interesting problems live inside your data, not inside journals.
            </p>
          </div>

          {/* Right — key facts */}
          <div className="space-y-0 border-t border-border">
            {[
              { value: "14", label: "PhDs on staff", detail: "Across structural, chemical, mechanical, and applied math" },
              { value: "8", label: "Engineering disciplines", detail: "From thermodynamics to geomechanics to control systems" },
              { value: "3", label: "Global offices", detail: "London · Houston · Singapore" },
              { value: "$2.1B", label: "Asset value protected", detail: "Across offshore, energy, infrastructure & manufacturing" },
            ].map((item) => (
              <div key={item.label} className="border-b border-border py-8 group hover:bg-card/50 transition-colors px-4 -mx-4">
                <div className="flex items-baseline gap-6">
                  <span className="font-heading text-4xl md:text-5xl font-medium text-accent min-w-[100px]">
                    {item.value}
                  </span>
                  <div>
                    <div className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-foreground mb-1">
                      {item.label}
                    </div>
                    <div className="font-body text-xs text-muted-foreground">
                      {item.detail}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
