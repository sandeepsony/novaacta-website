import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasesSection from "@/components/CasesSection";
import { motion } from "framer-motion";

const heroStats = [
  { value: "$120M+", label: "Value Delivered" },
  { value: "7", label: "Industries" },
  { value: "28+", label: "Disciplines" },
  { value: "100%", label: "Resolved" },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Impact Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 border-b border-border relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="cinematic-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="label-mono mb-6">Engineering Investigations</div>
            <div className="divider-line mx-auto mb-10" />
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] max-w-4xl mx-auto">
              Seven puzzles.{" "}
              <span className="italic text-accent">Seven breakthroughs.</span>
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto mt-6 leading-relaxed">
              Every case below began as an unsolved engineering mystery. We dissected each one to its root cause — and turned uncertainty into measurable impact.
            </p>
          </motion.div>

          {/* Aggregate stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border max-w-3xl mx-auto mt-16"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-background text-center py-8 px-4">
                <div className="font-heading text-3xl md:text-4xl font-medium text-accent">
                  {stat.value}
                </div>
                <div className="font-mono-data text-[8px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <CasesSection />

      <Footer />
    </div>
  );
};

export default CaseStudies;
