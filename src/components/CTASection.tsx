import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoGold from "@/assets/logo-compass-gold.png";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="py-32 md:py-48 border-t border-border">
      <motion.div style={{ opacity }} className="cinematic-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <img src={logoGold} alt="" className="w-10 h-10 object-contain opacity-30" />
          </div>

          <div className="label-mono mb-12">Next step</div>

          <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground leading-tight mb-8 italic">
            What's your unsolved problem?
          </h2>

          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto">
            We don't do proposals. We do conversations. Tell us the problem
            that keeps your best engineers up at night — and we'll tell you
            if we can help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@novaacta.com"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-mono-data text-[11px] uppercase tracking-[0.2em] hover:bg-accent/90 transition-all duration-300 group"
            >
              Start a conversation
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 font-mono-data text-[11px] uppercase tracking-[0.2em] text-foreground hover:border-accent hover:text-accent transition-all duration-500"
            >
              View case studies
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
