import {
  ArrowRight,
  BarChart3,
  Boxes,
  Brain,
  Cpu,
  Database,
  Eye,
  FileSearch,
  FileText,
  GitBranch,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
}

const engineering: Capability[] = [
  {
    icon: Search,
    title: "Failure and root cause analysis",
    description:
      "Forensic investigation of structural, mechanical and process failures using first-principles physics and metallurgical evidence.",
    details: ["Fracture mechanics and fatigue analysis", "Failure mode identification", "Cascade failure pathway mapping"],
  },
  {
    icon: Cpu,
    title: "First-principles simulation",
    description:
      "Physics-based modeling, including FEA, CFD and thermodynamic analysis, calibrated against how the asset actually behaves.",
    details: ["Finite element and computational fluid dynamics", "Thermal-mechanical coupling", "Multi-physics scenario simulation"],
  },
  {
    icon: ShieldCheck,
    title: "Asset integrity management",
    description:
      "Lifecycle assessment, corrosion modeling and maintenance strategy aimed at longer asset life and less unplanned downtime.",
    details: ["Remaining useful life estimation", "Corrosion rate modeling and mitigation", "Risk-based inspection planning"],
  },
  {
    icon: FileText,
    title: "Regulatory and compliance engineering",
    description:
      "Code compliance analysis and safety case development, with conclusions grounded in engineering evidence.",
    details: ["ASME, API and ASCE code compliance", "Safety case and risk assessment", "Independent technical review"],
  },
  {
    icon: TrendingUp,
    title: "Process optimization",
    description:
      "Systematic improvement of industrial processes through energy audits, heat integration studies and efficiency benchmarking.",
    details: ["Pinch analysis and heat integration", "Energy audit and loss identification", "Throughput and yield optimization"],
  },
];

const data: Capability[] = [
  {
    icon: Database,
    title: "Industrial data curation",
    description:
      "Cleaning, harmonizing and structuring sensor, SCADA and historian data from separate systems into datasets ready for analysis.",
    details: ["Multi-source harmonization", "Sensor drift correction and validation", "Quality scoring and lineage tracking"],
  },
  {
    icon: GitBranch,
    title: "Data pipeline architecture",
    description:
      "Ingestion, transformation and warehousing pipelines designed for operational data at industrial scale.",
    details: ["Streaming and batch ingestion", "ETL and ELT pipeline design", "Time-series data warehousing"],
  },
  {
    icon: BarChart3,
    title: "Operational analytics and dashboards",
    description:
      "KPI monitoring, anomaly detection and benchmarking dashboards built for the engineers who make the decisions.",
    details: ["Real-time KPI dashboards", "Statistical anomaly detection", "Cross-asset benchmarking"],
  },
  {
    icon: TrendingUp,
    title: "Predictive analytics",
    description:
      "Statistical modeling and forecasting for asset health, process degradation and operational risk.",
    details: ["Time-series forecasting", "Degradation trend analysis", "Risk probability scoring"],
  },
];

const appliedAi = [
  {
    icon: Brain,
    title: "Failure prediction",
    benefit: "Earlier warning than threshold alarms",
    description:
      "Models trained on failure history flag at-risk assets before an incident, with the physics used to check each prediction.",
  },
  {
    icon: FileSearch,
    title: "Report mining",
    benefit: "Years of free text, searchable",
    description:
      "Language models read inspection reports, maintenance logs and incident records at a scale no team can, and surface recurring patterns.",
  },
  {
    icon: Eye,
    title: "Computer vision for inspection",
    benefit: "Consistent first-pass screening",
    description:
      "Defect detection from drone imagery, radiographs and ultrasonic scans, with a qualified inspector reviewing what the model flags.",
  },
  {
    icon: Boxes,
    title: "Digital twin simulation",
    benefit: "More scenarios per study",
    description:
      "Surrogate models let a digital twin run what-if cases for an asset under stress in a fraction of the time of a full simulation.",
  },
  {
    icon: Sparkles,
    title: "Data preparation",
    benefit: "Less manual cleaning",
    description:
      "Automated quality scoring, gap filling and sensor drift correction, so engineers spend their time on the analysis.",
  },
];

const sections = [
  { id: "engineering", number: "01", label: "Engineering" },
  { id: "data", number: "02", label: "Data" },
  { id: "applied-ai", number: "03", label: "Applied AI" },
];

const CapabilityCard = ({ capability, index }: { capability: Capability; index: number }) => (
  <Reveal as="li" delay={(index % 3) * 70} className="group relative flex flex-col bg-background p-7 transition-colors duration-300 hover:bg-card md:p-8">
    <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
    <div className="flex h-11 w-11 items-center justify-center bg-accent/10">
      <capability.icon className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
    </div>
    <h3 className="mt-6 text-2xl leading-tight text-foreground">{capability.title}</h3>
    <p className="mt-3 leading-relaxed text-muted-foreground">{capability.description}</p>
    <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
      {capability.details.map((detail) => (
        <li key={detail} className="flex gap-3 text-sm leading-snug text-muted-foreground">
          <span className="mt-2 h-px w-3 flex-shrink-0 bg-accent" aria-hidden="true" />
          {detail}
        </li>
      ))}
    </ul>
  </Reveal>
);

const SectionIntro = ({ id, number, label, title, intro }: { id: string; number: string; label: string; title: ReactNode; intro: string }) => (
  <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="eyebrow text-accent">
        {number} / {label}
      </p>
      <h2 id={`${id}-heading`} className="mt-5 text-4xl leading-[1.08] text-foreground md:text-5xl">
        {title}
      </h2>
    </div>
    <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{intro}</p>
  </Reveal>
);

const WhatWeDo = () => (
  <>
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" aria-hidden="true" />
      <div className="site-container relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-6">What we do</p>
          <h1 className="text-6xl leading-[0.98] text-foreground md:text-7xl lg:text-8xl">
            Engineer.
            <br />
            <span className="italic text-accent">Analyze.</span>
            <br />
            Transform.
          </h1>
        </div>
        <div className="rise">
          <p className="max-w-md text-xl leading-relaxed text-muted-foreground">
            We combine engineering domain expertise with modern data engineering, analytics and AI
            to solve problems that neither discipline can solve alone.
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="group block">
                  <span className="font-heading text-4xl leading-none text-accent">{section.number}</span>
                  <span className="meta mt-2 block transition-colors group-hover:text-foreground">{section.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section id="engineering" className="section scroll-mt-16" aria-labelledby="engineering-heading">
      <div className="site-container">
        <SectionIntro
          id="engineering"
          number="01"
          label="Engineering"
          title={
            <>
              Deep-domain <span className="italic text-accent">expertise</span>
            </>
          }
          intro="From forensic failure analysis to code compliance: rigorous, first-principles engineering for critical infrastructure."
        />
        <ul className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {engineering.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
          <li className="hidden bg-background lg:block" aria-hidden="true" />
        </ul>
      </div>
    </section>

    <section id="data" className="section scroll-mt-16 bg-card/40" aria-labelledby="data-heading">
      <div className="site-container">
        <SectionIntro
          id="data"
          number="02"
          label="Data"
          title={
            <>
              Industrial data, <span className="italic text-accent">made usable</span>
            </>
          }
          intro="From raw sensor feeds to the dashboard a decision is made on: the data infrastructure that turns operational noise into evidence."
        />
        <ul className="grid gap-px border border-border bg-border md:grid-cols-2">
          {data.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </ul>
      </div>
    </section>

    <section id="applied-ai" className="section scroll-mt-16" aria-labelledby="applied-ai-heading">
      <div className="site-container">
        <SectionIntro
          id="applied-ai"
          number="03"
          label="Applied AI"
          title={
            <>
              AI that answers to <span className="italic text-accent">the physics</span>
            </>
          }
          intro="Practical applications, not hype. Every model is validated against the engineering before anyone relies on it."
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appliedAi.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(index % 3) * 70}
              className={`border border-border bg-card/50 p-7 transition-colors duration-300 hover:border-accent/50 md:p-8 ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              <item.icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-6 text-2xl leading-tight text-foreground">{item.title}</h3>
              <p className="mt-2 font-heading text-xl italic text-accent">{item.benefit}</p>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{item.description}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <Link to="/scenarios" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            See how we would apply this to a specific problem
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>

    <CTASection
      title="Not sure which of these you need?"
      body="Most problems cross all three. Describe what you are seeing and we will tell you where we would start."
    />
  </>
);

export default WhatWeDo;
