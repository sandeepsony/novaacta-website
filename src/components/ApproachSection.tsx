import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DataStreamViz from "@/components/DataStreamViz";

const steps = [
  {
    number: "01",
    title: "Data & Domain Audit",
    description:
      "We embed PhD-level specialists in your operations to map the data you're generating, assess its quality, and identify the highest-value problems it can solve.",
    status: "DIAGNOSTIC",
  },
  {
    number: "02",
    title: "Problem Formulation",
    description:
      "Most organizations fail at AI not because of bad data, but poorly framed problems. Our domain experts translate engineering challenges into precise analytical questions.",
    status: "CALIBRATION",
  },
  {
    number: "03",
    title: "Model & Solution Engineering",
    description:
      "We build bespoke analytical solutions — from physics-informed ML to optimization algorithms — designed by people who understand both the math and the machinery.",
    status: "EXECUTION",
  },
  {
    number: "04",
    title: "Operationalization & Transfer",
    description:
      "Solutions embedded into your workflows with full knowledge transfer. We don't leave black boxes — we leave capabilities your engineers can own and extend.",
    status: "DEPLOYMENT",
  },
];

const ApproachSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="methodology" className="py-24 md:py-32">
      <div className="editorial-container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20" ref={ref}>
          {/* Left column */}
          <div className="lg:col-span-4">
            <p className="label-uppercase mb-3">Methodology</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-5">
              From Raw Data to Real Decisions
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              Our methodology is built for engineering organizations that have invested
              in data infrastructure but haven't realized the return.
            </p>

            {/* Data stream visualization */}
            <div className="h-48 border border-border relative overflow-hidden hidden lg:block">
              <DataStreamViz />
              <div className="absolute top-2 left-3 font-mono text-[8px] text-muted-foreground/40">
                LIVE DATA STREAM // ENCRYPTED
              </div>
            </div>
          </div>

          {/* Right column - steps */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group border-b border-border py-10 first:pt-0 last:border-b-0"
                >
                  <div className="flex gap-6 md:gap-10">
                    <div className="shrink-0">
                      <span className="font-mono text-3xl md:text-4xl font-light text-border group-hover:text-primary transition-colors duration-500">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-xl font-medium text-foreground">
                          {step.title}
                        </h3>
                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/40 border border-border px-2 py-0.5 hidden sm:inline">
                          {step.status}
                        </span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
