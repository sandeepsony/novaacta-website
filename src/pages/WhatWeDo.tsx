import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Cpu,
  ShieldCheck,
  FileText,
  Database,
  GitBranch,
  BarChart3,
  TrendingUp,
  Brain,
  FileSearch,
  Eye,
  Boxes,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/* ── capability data ── */
const engineeringCapabilities = [
  {
    icon: Search,
    title: "Failure & Root Cause Analysis",
    description:
      "Forensic investigation of structural, mechanical, and process failures using first-principles physics and metallurgical evidence.",
    details: [
      "Fracture mechanics & fatigue analysis",
      "Metallurgical failure mode identification",
      "Cascade failure pathway mapping",
    ],
  },
  {
    icon: Cpu,
    title: "First-Principles Simulation",
    description:
      "Physics-based modeling including FEA, CFD, and thermodynamic analysis to replicate real-world conditions with precision.",
    details: [
      "Finite element & computational fluid dynamics",
      "Thermal-mechanical coupling models",
      "Multi-physics scenario simulation",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Asset Integrity Management",
    description:
      "Lifecycle assessment, corrosion modeling, and predictive maintenance strategies that extend asset life and reduce unplanned downtime.",
    details: [
      "Remaining useful life estimation",
      "Corrosion rate modeling & mitigation",
      "Risk-based inspection planning",
    ],
  },
  {
    icon: FileText,
    title: "Regulatory & Compliance Engineering",
    description:
      "Code compliance analysis, safety case development, and expert testimony grounded in engineering evidence.",
    details: [
      "ASME, API, ASCE code compliance",
      "Safety case & risk assessment",
      "Litigation support & expert testimony",
    ],
  },
  {
    icon: TrendingUp,
    title: "Process Optimization",
    description:
      "Systematic improvement of industrial processes through energy audits, heat integration studies, and efficiency benchmarking.",
    details: [
      "Pinch analysis & heat integration",
      "Energy audit & loss identification",
      "Throughput & yield optimization",
    ],
  },
];

const dataCapabilities = [
  {
    icon: Database,
    title: "Industrial Data Curation",
    description:
      "Cleaning, harmonizing, and structuring sensor, SCADA, and historian data from disparate systems into analysis-ready datasets.",
    details: [
      "Multi-source data harmonization",
      "Sensor drift correction & validation",
      "Data quality scoring & lineage tracking",
    ],
  },
  {
    icon: GitBranch,
    title: "Data Pipeline Architecture",
    description:
      "Real-time ingestion, transformation, and warehousing pipelines designed for operational data at industrial scale.",
    details: [
      "Streaming & batch ingestion frameworks",
      "ETL/ELT pipeline design",
      "Time-series data warehousing",
    ],
  },
  {
    icon: BarChart3,
    title: "Operational Analytics & Dashboards",
    description:
      "KPI monitoring, anomaly detection, and performance benchmarking dashboards tailored to engineering decision-makers.",
    details: [
      "Real-time KPI dashboards",
      "Statistical anomaly detection",
      "Cross-asset performance benchmarking",
    ],
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Statistical modeling and trend forecasting for asset health, process degradation, and operational risk.",
    details: [
      "Time-series forecasting models",
      "Degradation trend analysis",
      "Risk probability scoring",
    ],
  },
];

const aiScenarios = [
  {
    icon: Brain,
    title: "AI-Augmented Failure Prediction",
    description:
      "Machine learning models trained on historical failure data flag at-risk assets before incidents occur.",
    impact: "40%",
    impactLabel: "reduction in unplanned downtime",
  },
  {
    icon: FileSearch,
    title: "Natural Language Report Mining",
    description:
      "AI parses thousands of inspection reports, maintenance logs, and incident records to surface hidden patterns.",
    impact: "10×",
    impactLabel: "faster pattern discovery",
  },
  {
    icon: Eye,
    title: "Computer Vision for Inspection",
    description:
      "Automated defect detection from drone imagery, radiographic scans, and ultrasonic data.",
    impact: "95%+",
    impactLabel: "defect detection accuracy",
  },
  {
    icon: Boxes,
    title: "Digital Twin Simulation",
    description:
      "AI-driven digital twins simulate 'what-if' scenarios for infrastructure under stress.",
    impact: "1000s",
    impactLabel: "of scenarios in hours",
  },
  {
    icon: Sparkles,
    title: "Intelligent Data Preparation",
    description:
      "Automated data quality scoring, missing-value imputation, and sensor drift correction.",
    impact: "80%",
    impactLabel: "less manual data prep",
  },
];

/* ── animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

/* ── page ── */
const WhatWeDo = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const dataScrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ─── Hero — Bold Split Layout ─── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div className="cinematic-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Big keyword */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="label-mono mb-6">What We Do</div>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[0.95] tracking-tight">
                Engineer.
                <br />
                <span className="italic text-accent">Analyze.</span>
                <br />
                Transform.
              </h1>
            </motion.div>

            {/* Right — Description + stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:pt-8"
            >
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                We combine deep engineering domain expertise with modern data
                engineering, analytics, and AI to solve problems that neither
                discipline can tackle alone.
              </p>

              {/* Mini stat row */}
              <div className="flex gap-10">
                {[
                  { value: "3", label: "Disciplines" },
                  { value: "9+", label: "Capabilities" },
                  { value: "5", label: "AI Scenarios" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-heading text-3xl md:text-4xl text-accent font-medium">
                      {s.value}
                    </div>
                    <div className="font-mono-data text-[9px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ─── Engineering Capabilities — Interactive Grid ─── */}
      <section className="py-20 md:py-28 relative">
        {/* Section accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="cinematic-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <div className="label-mono mb-4 text-accent">01 / Engineering</div>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground leading-[1.05]">
                Deep-Domain
                <br />
                <span className="italic">Expertise</span>
              </h2>
            </div>
            <p className="font-body text-sm text-muted-foreground max-w-sm leading-relaxed">
              From forensic failure analysis to regulatory compliance — rigorous,
              first-principles engineering across critical infrastructure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {engineeringCapabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-sm p-7 
                  hover:bg-card hover:border-accent/30 hover:shadow-[0_0_40px_-12px_hsl(var(--accent)/0.15)]
                  transition-all duration-500 cursor-default"
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-sm bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-500">
                    <cap.icon className="w-4.5 h-4.5 text-accent" />
                  </div>
                  <span className="font-mono-data text-[9px] text-muted-foreground/60 uppercase tracking-[0.2em]">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-heading text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {cap.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-5">
                  {cap.description}
                </p>

                <ul className="space-y-2.5">
                  {cap.details.map((d) => (
                    <li
                      key={d}
                      className="font-mono-data text-[9px] uppercase tracking-[0.1em] text-muted-foreground/70 flex items-center gap-2.5
                        group-hover:text-muted-foreground transition-colors duration-300"
                    >
                      <ArrowRight className="w-2.5 h-2.5 text-accent/50 group-hover:text-accent transition-colors duration-300" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Data Engineering — Horizontal Scroll Strip ─── */}
      <section className="py-20 md:py-28 relative bg-card/30">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="cinematic-container mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <div className="label-mono mb-4 text-accent">02 / Data Intelligence</div>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground leading-[1.05]">
                Industrial Data,
                <br />
                <span className="italic">Made Actionable</span>
              </h2>
            </div>
            <p className="font-body text-sm text-muted-foreground max-w-sm leading-relaxed">
              From raw sensor feeds to executive dashboards — we build the data
              infrastructure that turns operational noise into insight.
            </p>
          </motion.div>
        </div>

        {/* Horizontal scroll strip */}
        <div className="relative">
          <div
            ref={dataScrollRef}
            className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-12 lg:px-16 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {dataCapabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative min-w-[75vw] sm:min-w-[50vw] md:min-w-[420px] lg:min-w-[400px] bg-background border border-border/50 rounded-sm p-8 snap-start
                  hover:border-accent/30 hover:shadow-[0_0_40px_-12px_hsl(var(--accent)/0.15)]
                  transition-all duration-500 flex-shrink-0"
              >
                {/* Number watermark */}
                <div className="absolute top-6 right-6 font-heading text-6xl font-medium text-muted/50 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-sm bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-500 mb-6">
                    <cap.icon className="w-4.5 h-4.5 text-accent" />
                  </div>

                  <h3 className="font-heading text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {cap.title}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-6">
                    {cap.description}
                  </p>

                  <ul className="space-y-2.5">
                    {cap.details.map((d) => (
                      <li
                        key={d}
                        className="font-mono-data text-[9px] uppercase tracking-[0.1em] text-muted-foreground/70 flex items-center gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll fade edges */}
          <div className="absolute top-0 left-0 bottom-6 w-12 bg-gradient-to-r from-card/30 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-6 w-12 bg-gradient-to-l from-card/30 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ─── AI Scenarios — Dark Showcase ─── */}
      <section className="py-20 md:py-28 relative bg-background">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />

        <div className="cinematic-container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="label-mono mb-4 text-accent">03 / AI-Powered Engineering</div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground max-w-3xl mx-auto leading-[1.05]">
              AI That Understands{" "}
              <span className="italic text-accent">Physics</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-5 max-w-lg mx-auto leading-relaxed">
              Practical AI applications grounded in engineering reality — not
              hype. Each scenario is deployed with domain-specific validation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {aiScenarios.map((scenario, i) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group relative border border-border/50 rounded-sm overflow-hidden
                  hover:border-accent/40 transition-all duration-500 cursor-default
                  ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                  bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] transition-colors duration-500" />

                <div className="relative z-10 p-8 md:p-9">
                  {/* Impact metric — big and bold */}
                  <div className="mb-6">
                    <span className="font-heading text-4xl md:text-5xl font-medium text-accent leading-none">
                      {scenario.impact}
                    </span>
                    <span className="block font-mono-data text-[9px] uppercase tracking-[0.15em] text-muted-foreground mt-2">
                      {scenario.impactLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <scenario.icon className="w-4 h-4 text-accent/70" />
                    <h3 className="font-heading text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                      {scenario.title}
                    </h3>
                  </div>

                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="cinematic-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="label-mono mb-6 text-accent">Let's Talk</div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground max-w-2xl mx-auto mb-6 leading-[1.05]">
              Ready to see
              <br />
              <span className="italic">what's possible?</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto mb-12">
              Whether you need forensic expertise, a modern data platform, or
              AI-driven insights — we bring it all together.
            </p>
            <a
              href="mailto:hello@novaacta.com"
              className="group inline-flex items-center gap-3 bg-accent text-accent-foreground font-mono-data text-[10px] uppercase tracking-[0.2em] px-10 py-4 rounded-sm hover:gap-5 transition-all duration-300"
            >
              Start a Conversation
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatWeDo;
