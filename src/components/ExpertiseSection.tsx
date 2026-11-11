import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { MiniAreaChart, MiniBarChart } from "@/components/MiniCharts";

const capabilities = [
  {
    id: "PAA",
    title: "Predictive Asset Analytics",
    description:
      "Transform sensor data, maintenance logs, and inspection records into predictive models that prevent failures — built by PhDs who understand the underlying physics.",
    tags: ["Predictive Maintenance", "Anomaly Detection", "RUL Estimation"],
    chart: "area",
  },
  {
    id: "POO",
    title: "Process & Operational Optimization",
    description:
      "Apply advanced optimization to manufacturing and energy processes — using your existing operational data to find efficiencies invisible to conventional analysis.",
    tags: ["Yield Optimization", "Energy Efficiency", "Process Simulation"],
    chart: "bar",
  },
  {
    id: "SRI",
    title: "Subsurface & Reservoir Intelligence",
    description:
      "Unlock value from seismic, well log, and production data with AI models built by PhD geoscientists who speak the language of the subsurface.",
    tags: ["Reservoir Characterization", "Production Forecasting", "Well Optimization"],
    chart: "area",
  },
  {
    id: "CRQ",
    title: "Climate Risk Quantification",
    description:
      "Move beyond qualitative ESG reporting. Our climate scientists build physics-based models that quantify portfolio-level climate exposure.",
    tags: ["Carbon Analytics", "Physical Risk Modeling", "Transition Scenarios"],
    chart: "bar",
  },
  {
    id: "DTD",
    title: "Digital Twin Development",
    description:
      "Physics-informed digital replicas that fuse real-time IoT data with engineering models — enabling simulation, prediction, and autonomous decision-making.",
    tags: ["Physics-Informed ML", "IoT Integration", "Scenario Simulation"],
    chart: "area",
  },
  {
    id: "BCI",
    title: "BIM & Construction Intelligence",
    description:
      "Turn building information models and project data into actionable intelligence — from automated clash detection to lifecycle cost prediction.",
    tags: ["Data-Driven BIM", "Cost Prediction", "Schedule Analytics"],
    chart: "bar",
  },
];

const ExpertiseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="capabilities" className="py-24 md:py-32">
      <div className="editorial-container">
        {/* Problem statement */}
        <div className="border border-border p-10 md:p-16 mb-20 relative overflow-hidden">
          <div className="absolute top-4 right-4 font-mono text-[9px] text-muted-foreground/40">
            BRIEF // 001
          </div>
          <p className="label-uppercase mb-4">The Challenge</p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-6">
            The Problem We Solve
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Engineering-adjacent industries generate petabytes of operational data every year.
            Yet most organizations lack the specialized talent to connect domain knowledge with
            data science. <span className="text-primary">Traditional consultants understand strategy but not thermodynamics.
            Data scientists understand algorithms but not reservoir mechanics.</span> We are the bridge.
          </p>
        </div>

        {/* Capabilities heading */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="label-uppercase mb-3">Capabilities</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Turning Untapped Data Into Engineering Breakthroughs
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="data-card p-8 group cursor-pointer relative overflow-hidden"
            >
              {/* Module ID */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-[0.2em]">
                  Module {cap.id}
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              </div>

              <h3 className="font-heading text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {cap.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                {cap.description}
              </p>

              {/* Mini chart */}
              <div className="mb-5 opacity-50 group-hover:opacity-80 transition-opacity">
                {cap.chart === "area" ? <MiniAreaChart /> : <MiniBarChart />}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground border border-border px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
                Explore <ArrowUpRight className="h-3 w-3" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
