import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const CountUp = ({ end, duration = 2, suffix = "", prefix = "" }: CountUpProps) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{value}{suffix}
    </span>
  );
};

const comparisons = [
  {
    ours: { value: 1, suffix: " day", label: "NovaActa analysis" },
    theirs: { value: 180, suffix: " days", label: "Traditional approach" },
    description: "From six months of manual review to overnight insights",
  },
  {
    ours: { value: 38, prefix: "$", suffix: "M", label: "Cost prevented" },
    theirs: { value: 0, suffix: "", label: "Without early detection" },
    description: "Single engagement failure cost prevention",
  },
  {
    ours: { value: 26, suffix: "mo", label: "Early warning" },
    theirs: { value: 0, suffix: "mo", label: "Post-failure response" },
    description: "Predicting failures before they happen",
  },
];

const ComparisonStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 md:py-48 border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="cinematic-container">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="label-mono mb-8">Impact</div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] mb-4">
            The NovaActa difference.
          </h2>
          <p className="font-heading text-2xl md:text-3xl italic text-accent">
            Measured, not promised.
          </p>
        </div>

        {/* Main VS comparison — Edison-inspired */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-10">
            {/* Our side */}
            <div className="text-center">
              <div className="font-heading text-6xl md:text-8xl lg:text-9xl font-medium text-accent">
                <CountUp end={1} duration={1} />
              </div>
              <div className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                Day with NovaActa
              </div>
            </div>

            {/* VS badge */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-px h-12 bg-border" />
              <div className="font-heading text-xl md:text-2xl italic text-muted-foreground">
                vs
              </div>
              <div className="w-px h-12 bg-border" />
            </div>

            {/* Traditional side */}
            <div className="text-center">
              <div className="font-heading text-6xl md:text-8xl lg:text-9xl font-medium text-foreground/30">
                <CountUp end={180} duration={2.5} />
              </div>
              <div className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                Days traditionally
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="font-body text-sm text-muted-foreground">
              From six months of manual engineering review to overnight AI-driven insights
            </p>
          </div>
        </motion.div>

        {/* Supporting stats */}
        <div className="border-t border-border pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-border">
            {[
              { value: 38, prefix: "$", suffix: "M", label: "Prevented failure cost", sub: "Single engagement" },
              { value: 6, suffix: ".2%", label: "Output recovered", sub: "Offshore platform" },
              { value: 26, suffix: "mo", label: "Early warning", sub: "Before catastrophic failure" },
              { value: 47, suffix: "", label: "Turbines optimized", sub: "Fleet-level analysis" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-8 px-4">
                <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-2">
                  <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
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
      </div>
    </section>
  );
};

export default ComparisonStats;
