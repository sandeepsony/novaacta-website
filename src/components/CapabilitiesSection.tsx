import { Activity, ArrowRight, Building2, Cpu, Flame, Waves, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const capabilities = [
  {
    icon: Activity,
    title: "Predictive asset analytics",
    description:
      "Sensor data, maintenance logs and inspection records turned into models that anticipate failure, built on the degradation physics of the asset.",
    tags: ["Predictive maintenance", "Anomaly detection", "Remaining useful life"],
  },
  {
    icon: Flame,
    title: "Process and operational optimization",
    description:
      "Optimization of manufacturing and energy processes using the operating data you already hold, to find efficiency that conventional audits miss.",
    tags: ["Yield", "Energy efficiency", "Process simulation"],
  },
  {
    icon: Waves,
    title: "Subsurface and reservoir intelligence",
    description:
      "Seismic, well log and production data interpreted with models grounded in geoscience, for characterization and forecasting.",
    tags: ["Reservoir characterization", "Production forecasting"],
  },
  {
    icon: Wind,
    title: "Climate risk quantification",
    description:
      "Physics-based models that put numbers on physical climate exposure across a portfolio, beyond qualitative reporting.",
    tags: ["Physical risk modeling", "Carbon analytics"],
  },
  {
    icon: Cpu,
    title: "Digital twin development",
    description:
      "Physics-informed replicas that fuse live sensor data with engineering models, for simulation, prediction and decision support.",
    tags: ["Physics-informed ML", "IoT integration", "Simulation"],
  },
  {
    icon: Building2,
    title: "BIM and construction intelligence",
    description:
      "Building information models and project data turned into decisions, from automated clash detection to lifecycle cost prediction.",
    tags: ["Data-driven BIM", "Cost prediction"],
  },
];

const CapabilitiesSection = () => (
  <section className="section" aria-labelledby="capabilities-heading">
    <div className="site-container">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="What we do"
          id="capabilities-heading"
          title={
            <>
              Six capabilities. <span className="italic text-accent">One method.</span>
            </>
          }
        />
        <Link to="/what-we-do" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
          All capabilities
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Reveal as="li" key={capability.title} delay={(index % 3) * 70} className="group flex flex-col bg-background p-7 transition-colors duration-300 hover:bg-card md:p-9">
            <div className="flex items-center justify-between">
              <capability.icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <span className="font-heading text-4xl leading-none text-foreground/15" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-8 text-2xl leading-tight text-foreground">{capability.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{capability.description}</p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Typical work">
              {capability.tags.map((tag) => (
                <li key={tag} className="meta border border-border px-2.5 py-1">
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

export default CapabilitiesSection;
