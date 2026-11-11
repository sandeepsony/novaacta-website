import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformSection from "@/components/PlatformSection";
import { motion } from "framer-motion";
import { Activity, Shield, Gauge, BarChart3 } from "lucide-react";

const summaryStats = [
  { icon: Activity, value: "42", label: "Active Sensors" },
  { icon: Shield, value: "7", label: "Cases Tracked" },
  { icon: Gauge, value: "98.2%", label: "Uptime" },
  { icon: BarChart3, value: "156", label: "Alerts Resolved" },
];

const Platform = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-border">
        <div className="cinematic-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="label-mono mb-6">Real-Time Engineering Intelligence</div>
            <div className="divider-line mx-auto mb-10" />
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] max-w-4xl mx-auto">
              Nova Acta{" "}
              <span className="italic text-accent">Platform</span>
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto mt-6 leading-relaxed">
              Every investigation tracked, analyzed, and resolved through our
              integrated engineering intelligence system.
            </p>
          </motion.div>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-14"
          >
            {summaryStats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-sm p-5 text-center"
              >
                <stat.icon className="w-4 h-4 text-accent mx-auto mb-3" />
                <div className="font-heading text-2xl md:text-3xl text-foreground">
                  {stat.value}
                </div>
                <div className="font-mono-data text-[8px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dashboard */}
      <PlatformSection />

      <Footer />
    </div>
  );
};

export default Platform;
