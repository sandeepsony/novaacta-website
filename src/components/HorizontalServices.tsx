import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Cpu, Flame, Wind, Building2, Waves } from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Predictive Asset Analytics",
    description:
      "Transform sensor data, maintenance logs, and inspection records into predictive models that prevent failures — built by PhDs who understand the underlying physics.",
    tags: ["Predictive Maintenance", "Anomaly Detection", "RUL Estimation"],
  },
  {
    icon: Flame,
    title: "Process & Operational Optimization",
    description:
      "Apply advanced optimization to manufacturing and energy processes — using your existing operational data to find efficiencies invisible to conventional analysis.",
    tags: ["Yield Optimization", "Energy Efficiency", "Process Simulation"],
  },
  {
    icon: Waves,
    title: "Subsurface & Reservoir Intelligence",
    description:
      "Unlock value from seismic, well log, and production data with AI models built by PhD geoscientists who speak the language of the subsurface.",
    tags: ["Reservoir Characterization", "Production Forecasting"],
  },
  {
    icon: Wind,
    title: "Climate Risk Quantification",
    description:
      "Move beyond qualitative ESG reporting. Our climate scientists build physics-based models that quantify portfolio-level climate exposure.",
    tags: ["Carbon Analytics", "Physical Risk Modeling"],
  },
  {
    icon: Cpu,
    title: "Digital Twin Development",
    description:
      "Physics-informed digital replicas that fuse real-time IoT data with engineering models — enabling simulation, prediction, and autonomous decision-making.",
    tags: ["Physics-Informed ML", "IoT Integration", "Simulation"],
  },
  {
    icon: Building2,
    title: "BIM & Construction Intelligence",
    description:
      "Turn building information models and project data into actionable intelligence — from automated clash detection to lifecycle cost prediction.",
    tags: ["Data-Driven BIM", "Cost Prediction"],
  },
];

const HorizontalServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-border">
        {/* Header */}
        <div className="cinematic-container mb-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="label-mono mb-4">What We Do</div>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground leading-[1.15]">
                Six capabilities.{" "}
                <span className="italic text-accent">One mission.</span>
              </h2>
            </div>
            <p className="font-body text-sm text-muted-foreground max-w-sm leading-relaxed">
              Every engagement starts with physics, not algorithms. Scroll to explore →
            </p>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 pl-6 md:pl-16 pr-[50vw]"
          >
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] bg-card border border-border p-8 md:p-10 group hover:border-accent/30 transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-8">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                    <span className="font-heading text-6xl md:text-7xl font-medium text-foreground/[0.06]">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                    {s.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-data text-[8px] uppercase tracking-[0.15em] text-muted-foreground/50 border border-border px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="cinematic-container pb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border relative">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="absolute inset-y-0 left-0 right-0 bg-accent origin-left"
              />
            </div>
            <span className="font-mono-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {services.length} services
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalServices;
