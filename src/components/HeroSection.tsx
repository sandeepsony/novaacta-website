import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Wordmark from "@/components/Wordmark";
import ParticleNetwork from "@/components/ParticleNetwork";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Particle network */}
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>

      {/* Radial glow behind wordmark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(35 100% 50% / 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Horizontal accent lines */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Wordmark — the star */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-10"
        >
          <Wordmark size="hero" />
        </motion.div>

        {/* Tagline label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="label-mono mb-8"
        >
          Engineering Intelligence · Palo Alto
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.2 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.12] text-foreground mb-6 max-w-3xl mx-auto"
        >
          We solve engineering problems{" "}
          <span className="italic text-accent">nobody else can.</span>
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12"
        >
          14 PhDs across 8 engineering disciplines. Deep domain expertise
          meets advanced data science to uncover failures before they happen.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-mono-data text-[11px] uppercase tracking-[0.2em] hover:bg-accent/90 transition-all duration-300 group"
          >
            View Case Studies
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="mailto:hello@novaacta.com"
            className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 font-mono-data text-[11px] uppercase tracking-[0.2em] text-foreground hover:border-accent hover:text-accent transition-all duration-500"
          >
            Start a Conversation
          </a>
        </motion.div>

        {/* Stat ticker strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-20 flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: "$2.1B", label: "Assets protected" },
            { value: "14", label: "PhDs on staff" },
            { value: "8", label: "Disciplines" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="font-heading text-2xl md:text-3xl font-medium text-foreground">
                  {stat.value}
                </div>
                <div className="font-mono-data text-[8px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
              {i < 2 && (
                <div className="w-px h-8 bg-border hidden md:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="divider-line" />
        <span className="label-mono">Discover more</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
