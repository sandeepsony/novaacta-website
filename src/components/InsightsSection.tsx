import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import insightManufacturing from "@/assets/insight-manufacturing.jpg";
import insightClimate from "@/assets/insight-climate.jpg";
import insightDigitalTwin from "@/assets/insight-digital-twin.jpg";

const insights = [
  {
    image: insightManufacturing,
    category: "Manufacturing Intelligence",
    date: "2026.02.14",
    title: "Why 73% of Industrial AI Projects Fail — and What PhD-Led Teams Do Differently",
    description:
      "Most AI initiatives in manufacturing stall because data scientists lack process knowledge. Domain-expert-led teams achieve 3.2x higher deployment success.",
  },
  {
    image: insightClimate,
    category: "Energy & Climate",
    date: "2026.01.28",
    title: "From Terabytes to Decisions: Making Sense of Operational Data in Energy Transition",
    description:
      "Energy companies sit on decades of production and emissions data. A framework for converting this into quantified transition strategies.",
  },
  {
    image: insightDigitalTwin,
    category: "Digital Twins",
    date: "2025.12.05",
    title: "The Missing Layer: Domain Expertise Between Data and Physics in Digital Twins",
    description:
      "Digital twins fail when built by data teams alone. PhD-level domain knowledge is the critical ingredient between raw IoT and actionable simulation.",
  },
];

const InsightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="insights" className="py-24 md:py-32 bg-secondary/30">
      <div className="editorial-container" ref={ref}>
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="label-uppercase mb-3">Intelligence Feed</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
              Thinking at the Intersection of Data & Domain
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors"
          >
            All Reports <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-0 border border-border mb-6 group cursor-pointer data-card"
        >
          <div className="overflow-hidden relative">
            <img
              src={insights[0].image}
              alt={insights[0].title}
              className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors" />
          </div>
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                {insights[0].category}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground/50">
                {insights[0].date}
              </span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-4 leading-snug group-hover:text-primary transition-colors duration-300">
              {insights[0].title}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              {insights[0].description}
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground flex items-center gap-1">
              Read Report <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </motion.div>

        {/* Secondary */}
        <div className="grid md:grid-cols-2 gap-6">
          {insights.slice(1).map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group cursor-pointer data-card overflow-hidden"
            >
              <div className="overflow-hidden relative">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/5 transition-colors" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                    {insight.category}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/50">
                    {insight.date}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-medium text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                  {insight.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
