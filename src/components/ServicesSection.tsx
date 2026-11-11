import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="cinematic-container">
        <div className="label-mono mb-6">What We Do</div>
        <div className="divider-line mb-10" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground max-w-2xl leading-[1.15]">
            Six capabilities.{" "}
            <span className="italic text-accent">One mission:</span>{" "}
            turning untapped data into engineering breakthroughs.
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-sm leading-relaxed">
            Every engagement starts with physics, not algorithms. We build models grounded 
            in the science of your specific domain.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background p-8 md:p-10 group hover:bg-card transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <span className="font-mono-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
