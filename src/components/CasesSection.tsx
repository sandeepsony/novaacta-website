import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import caseBridge from "@/assets/case-bridge.jpg";
import caseRefinery from "@/assets/case-refinery.jpg";
import caseWindfarm from "@/assets/case-windfarm.jpg";
import caseOffshore from "@/assets/case-offshore.jpg";
import caseGearsystem from "@/assets/case-gearsystem.jpg";
import casePipeline from "@/assets/case-pipeline.jpg";
import caseWastewater from "@/assets/case-wastewater.jpg";

const cases = [
  {
    title: "Offshore Platform",
    shortTitle: "Offshore",
    headline: "$400M offshore platform was losing 6% output.",
    subline: "Nobody knew why.",
    problem: "A major North Sea operator noticed a persistent 6.2% decline in production output over 14 months. Operations teams attributed it to seasonal variance and aging equipment.",
    investigation: "Our team deployed a multi-physics approach: subsea jacket nodes showed accelerated pitting corrosion masked by marine growth. We cross-referenced cathodic protection current maps with tidal flow simulations, thermal imaging of heat exchangers, and vibration frequency analysis of the riser system.",
    findings: [
      "Three critical jacket joints at 60% wall loss — invisible to routine ROV inspection",
      "Progressive heat exchanger fouling degrading efficiency by 0.3% per month",
      "Flow-induced oscillation in the riser — a fatigue cracking precursor with 26-month horizon",
      "All four issues were interconnected through a cascade effect",
    ],
    outcome: "Recovered 6.2% output, prevented $38M in failure costs, and provided 26 months of early warning before catastrophic failure.",
    disciplines: ["Structural Integrity", "Corrosion Engineering", "Subsea Systems", "Thermodynamics"],
    tags: ["Structural", "Corrosion", "Energy"],
    image: caseOffshore,
    stats: [
      { value: "$38M", label: "Prevented" },
      { value: "6.2%", label: "Recovered" },
      { value: "26mo", label: "Early Warning" },
    ],
  },
  {
    title: "Bridge Deflection",
    shortTitle: "Bridge",
    headline: "A bridge deflected 12mm overnight.",
    subline: "The design said it shouldn't.",
    problem: "A critical highway bridge showed an unexpected 12mm deflection during overnight monitoring. Structural engineers couldn't explain it — the deflection exceeded thermal expansion calculations by 400%.",
    investigation: "We deployed thermal gradient analysis combined with embedded sensor data arrays across all girder faces. High-resolution temperature mapping revealed asymmetric solar absorption patterns never considered in the original design.",
    findings: [
      "South-facing girders absorbed 3.2× more thermal energy than the design assumed",
      "Asymmetric expansion created a bending moment not in the structural model",
      "15 years of micro-fatigue cycles had reduced stiffness in 4 key connections",
      "The overnight deflection was actually a thermal relaxation event, not a load event",
    ],
    outcome: "Prevented a potential closure of a major highway artery. Retrofitted thermal expansion joints saved $12M vs full replacement.",
    disciplines: ["Structural Engineering", "Materials Science", "Sensor Analytics", "Thermal Analysis"],
    tags: ["Structural", "Materials"],
    image: caseBridge,
    stats: [
      { value: "$12M", label: "Saved" },
      { value: "12mm", label: "Explained" },
      { value: "15yr", label: "Fatigue Found" },
    ],
  },
  {
    title: "Wind Farm Capacity",
    shortTitle: "Wind Farm",
    headline: "A wind farm lost 11% capacity.",
    subline: "Not a single alarm triggered.",
    problem: "An offshore wind farm of 47 turbines showed a gradual but persistent capacity decline of 11% over 8 months. Every individual turbine passed its performance checks.",
    investigation: "We applied fleet-level aerodynamic modeling using SCADA data across all 47 turbines simultaneously, building a wake interference model incorporating real-time wind direction, turbulence intensity, and yaw position data.",
    findings: [
      "Average yaw misalignment of 2.3° across the fleet — individually below alarm thresholds",
      "Cumulative misalignment created wake interference patterns across turbine rows",
      "Turbines in rows 3-5 were operating in degraded wind conditions 68% of the time",
      "Root cause was a systematic calibration drift in yaw anemometers",
    ],
    outcome: "Fleet-wide yaw recalibration recovered 11% capacity worth $4.7M annually. Ongoing monitoring prevents recurrence.",
    disciplines: ["Aerodynamics", "Applied Mathematics", "Energy Systems", "Fleet Analytics"],
    tags: ["Energy", "Aerodynamics"],
    image: caseWindfarm,
    stats: [
      { value: "11%", label: "Recovered" },
      { value: "$4.7M", label: "Annual Value" },
      { value: "47", label: "Turbines" },
    ],
  },
  {
    title: "Gear System Failure",
    shortTitle: "Gears",
    headline: "A marine drive failed without warning.",
    subline: "The vibration data held the answer.",
    problem: "A critical marine propulsion gearbox suffered sudden tooth fracture during operation, causing $2.3M in direct damage and 6 weeks of downtime.",
    investigation: "We performed root cause analysis using archived vibration spectral data, lubricant analysis records, and operational load profiles. A custom frequency decomposition algorithm isolated harmonic patterns invisible in standard monitoring.",
    findings: [
      "Micro-pitting propagation from lubrication film breakdown at specific RPM harmonics",
      "3rd-order gear mesh frequency resonance amplified by progressive bearing clearance drift",
      "Lubricant degradation accelerated at sustained loads above 78% rated capacity",
      "The failure cascade took 18 months — during which standard monitoring showed 'healthy'",
    ],
    outcome: "Developed a predictive monitoring protocol now deployed across the operator's entire fleet of 12 vessels. Zero unplanned gearbox failures since.",
    disciplines: ["Mechanical Engineering", "Tribology", "Vibration Analysis", "Signal Processing"],
    tags: ["Mechanical", "Materials"],
    image: caseGearsystem,
    stats: [
      { value: "$2.3M", label: "Prevented" },
      { value: "12", label: "Vessels" },
      { value: "0", label: "Failures Since" },
    ],
  },
  {
    title: "Refinery Energy Loss",
    shortTitle: "Refinery",
    headline: "A refinery was bleeding $2M per year.",
    subline: "Hidden in plain sight for 3 years.",
    problem: "A major Gulf Coast refinery's crude distillation unit was consuming 15% more energy than its design basis. Multiple energy audits had failed to identify the root cause.",
    investigation: "We built a first-principles process simulation calibrated against 3 years of actual operating data and systematically compared simulated vs actual performance for every heat exchanger, pump, and control valve.",
    findings: [
      "A control loop on the overhead condenser was miscalibrated, causing systematic over-cooling",
      "The over-cooling triggered compensatory heating downstream, wasting 2.1 MW of energy",
      "Three heat exchangers had fouling rates 4× higher than assumed in maintenance schedules",
      "The combined effect had been masked by operators manually compensating for temperature drift",
    ],
    outcome: "Control loop recalibration and optimized cleaning schedule saved $2.1M/year in energy costs with zero capital expenditure.",
    disciplines: ["Process Engineering", "Thermodynamics", "Control Systems", "Energy Optimization"],
    tags: ["Energy", "Process"],
    image: caseRefinery,
    stats: [
      { value: "$2.1M", label: "Annual Savings" },
      { value: "0", label: "CapEx" },
      { value: "2.1MW", label: "Recovered" },
    ],
  },
  {
    title: "Pipeline Integrity",
    shortTitle: "Pipeline",
    headline: "A hidden pipeline defect. Under a river.",
    subline: "Found before it became a disaster.",
    problem: "A 36-inch transmission pipeline crossing a major river showed anomalous pressure readings — small enough to be within instrument tolerance, but persistent.",
    investigation: "We deployed acoustic emission monitoring combined with pressure transient analysis using a digital twin of the entire pipeline segment. Machine learning models trained on known defect signatures analyzed 6 months of continuous data.",
    findings: [
      "A 0.5mm through-wall defect was identified in a buried section under the river crossing",
      "Defect growth rate indicated failure within 4-8 months under normal operating pressure",
      "Digital twin pressure modeling narrowed the location to a 12-meter segment",
      "The defect originated from external stress corrosion cracking accelerated by soil chemistry",
    ],
    outcome: "Targeted excavation and repair prevented potential environmental catastrophe. Total cost: $800K vs estimated $50M+ for an uncontrolled release.",
    disciplines: ["Pipeline Engineering", "NDT", "Digital Twin Modeling", "Risk Assessment"],
    tags: ["Structural", "Process"],
    image: casePipeline,
    stats: [
      { value: "$50M+", label: "Averted" },
      { value: "0.5mm", label: "Detected" },
      { value: "12m", label: "Precision" },
    ],
  },
  {
    title: "Wastewater Treatment",
    shortTitle: "Wastewater",
    headline: "A treatment plant was failing compliance.",
    subline: "The chemistry said it shouldn't.",
    problem: "A municipal-industrial wastewater treatment facility serving 200,000 people was intermittently exceeding phosphorus and ammonia discharge limits despite operating within design parameters.",
    investigation: "We deployed real-time effluent chemistry monitoring, hydraulic flow modeling, and microbial community DNA sequencing across all treatment stages, building a first-principles biochemical model calibrated against 2 years of lab data.",
    findings: [
      "Intermittent industrial discharges from an upstream chemical plant were shocking the nitrifying bacteria",
      "Hydraulic short-circuiting in the secondary clarifier reduced effective retention time by 35%",
      "Phosphorus removal was undermined by ferric dosing at the wrong pH — a 0.4 pH unit error",
      "The combination only manifested during peak flow events, masking root causes during routine sampling",
    ],
    outcome: "Achieved full regulatory compliance within 8 weeks. Control system recalibration and clarifier baffle modification cost $340K — avoiding $15M in fines and a $60M plant upgrade.",
    disciplines: ["Environmental Engineering", "Biochemistry", "Hydraulic Modeling", "Process Control"],
    tags: ["Process", "Environmental"],
    image: caseWastewater,
    stats: [
      { value: "$15M", label: "Fines Avoided" },
      { value: "8wk", label: "To Compliance" },
      { value: "$340K", label: "Fix Cost" },
    ],
  },
];

const allTags = Array.from(new Set(cases.flatMap((c) => c.tags)));

const timelineSteps = ["Problem", "Investigation", "Findings", "Outcome"] as const;

const CasesSection = () => {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredCases =
    activeFilters.length === 0
      ? cases
      : cases.filter((c) => c.tags.some((t) => activeFilters.includes(t)));

  const toggleExpand = (i: number) => {
    setExpandedCase(expandedCase === i ? null : i);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="cinematic-container">
        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveFilters([])}
            className={`font-mono-data text-[9px] uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 ${
              activeFilters.length === 0
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            All Cases
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`font-mono-data text-[9px] uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 ${
                activeFilters.includes(tag)
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cinematic case cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((c, idx) => {
              const globalIndex = cases.indexOf(c);
              const isExpanded = expandedCase === globalIndex;

              return (
                <motion.div
                  key={c.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  {/* Card header — always visible */}
                  <div
                    onClick={() => toggleExpand(globalIndex)}
                    className={`group cursor-pointer border transition-all duration-500 ${
                      isExpanded
                        ? "border-accent/30 bg-card"
                        : "border-border hover:border-accent/20 bg-card/50 hover:bg-card"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image strip */}
                      <div className="relative w-full md:w-56 lg:w-72 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent md:hidden" />
                        <div className="absolute top-4 left-4 font-mono-data text-[10px] uppercase tracking-[0.3em] text-accent bg-background/80 backdrop-blur-sm px-3 py-1.5 border border-accent/20">
                          Case {String(globalIndex + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-snug mb-1">
                              {c.headline}
                            </h3>
                            <p className="font-heading text-base md:text-lg italic text-accent/80">
                              {c.subline}
                            </p>

                            {/* Stats row */}
                            <div className="flex gap-6 mt-4">
                              {c.stats.map((s) => (
                                <div key={s.label}>
                                  <div className="font-heading text-lg md:text-xl font-medium text-foreground">
                                    {s.value}
                                  </div>
                                  <div className="font-mono-data text-[7px] uppercase tracking-[0.15em] text-muted-foreground">
                                    {s.label}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {c.disciplines.map((d) => (
                                <span
                                  key={d}
                                  className="font-mono-data text-[7px] uppercase tracking-[0.12em] text-muted-foreground/50 border border-border px-2 py-0.5"
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 mt-2"
                          >
                            <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded storytelling timeline */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border border-t-0 border-accent/20 bg-card p-6 md:p-10">
                          {/* Timeline */}
                          <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px bg-border" />

                            {/* Problem */}
                            <TimelineStep
                              step="01"
                              title="The Problem"
                              delay={0.1}
                            >
                              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                                {c.problem}
                              </p>
                            </TimelineStep>

                            {/* Investigation */}
                            <TimelineStep
                              step="02"
                              title="The Investigation"
                              delay={0.2}
                            >
                              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                                {c.investigation}
                              </p>
                            </TimelineStep>

                            {/* Findings */}
                            <TimelineStep
                              step="03"
                              title="Key Findings"
                              delay={0.3}
                            >
                              <ul className="space-y-2">
                                {c.findings.map((f, fi) => (
                                  <motion.li
                                    key={fi}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + fi * 0.08 }}
                                    className="flex gap-3"
                                  >
                                    <span className="font-mono-data text-[10px] text-accent mt-0.5 flex-shrink-0">
                                      {String(fi + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-body text-sm text-muted-foreground leading-relaxed">
                                      {f}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>
                            </TimelineStep>

                            {/* Outcome */}
                            <TimelineStep
                              step="04"
                              title="The Outcome"
                              delay={0.5}
                              isLast
                            >
                              <div className="border border-accent/20 bg-accent/5 p-5 md:p-6">
                                <p className="font-heading text-base md:text-lg font-medium text-foreground leading-relaxed">
                                  {c.outcome}
                                </p>
                              </div>
                            </TimelineStep>
                          </div>

                          {/* Platform link */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-8 pt-6 border-t border-border flex items-center justify-between"
                          >
                            <div className="font-mono-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                              View live data for this case
                            </div>
                            <Link
                              to="/platform"
                              className="inline-flex items-center gap-2 font-mono-data text-[9px] uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors group/link"
                            >
                              Open in Platform
                              <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                            </Link>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredCases.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border">
            <div className="font-mono-data text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 mb-3">
              No cases match
            </div>
            <p className="font-heading text-lg text-muted-foreground/60">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

/* Timeline step component */
const TimelineStep = ({
  step,
  title,
  children,
  delay = 0,
  isLast = false,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
  isLast?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`relative pl-10 md:pl-12 ${isLast ? "" : "pb-8"}`}
  >
    {/* Dot */}
    <div className="absolute left-0 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full border border-accent/40 bg-background flex items-center justify-center">
      <span className="font-mono-data text-[8px] text-accent">{step}</span>
    </div>
    <div className="label-mono text-accent mb-3">{title}</div>
    {children}
  </motion.div>
);

export default CasesSection;
