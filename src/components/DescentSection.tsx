import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import layerPlatform from "@/assets/layer-platform.jpg";
import descentCorrosion from "@/assets/descent-corrosion.jpg";
import layerThermal from "@/assets/layer-thermal.jpg";
import layerSubsea from "@/assets/layer-subsea.jpg";
import layerData from "@/assets/layer-data.jpg";

const layers = [
  {
    label: "01",
    title: "The Platform",
    description: "Production output dropped 6.2% over 14 months. Operations attributed it to seasonal variance.",
    expert: "Mechanical Engineer PhD",
    image: layerPlatform,
    imageAlt: "Offshore platform deck at night with workers",
  },
  {
    label: "02",
    title: "Process Systems",
    description: "Flow analysis revealed micro-pressure fluctuations in the separator train — invisible to standard SCADA thresholds.",
    expert: "Chemical Engineer PhD",
    image: descentCorrosion,
    imageAlt: "Corroded pipe cross-section",
  },
  {
    label: "03",
    title: "Heat Exchange Network",
    description: "Thermal imaging cross-referenced with physics models showed progressive fouling, degrading efficiency by 0.3% per month.",
    expert: "Thermodynamics PhD",
    image: layerThermal,
    imageAlt: "Heat exchanger tubes with thermal damage",
  },
  {
    label: "04",
    title: "Pipeline & Riser",
    description: "Vibration frequency analysis identified flow-induced oscillation — a precursor to fatigue cracking with a 26-month failure horizon.",
    expert: "Structural Dynamics PhD",
    image: layerSubsea,
    imageAlt: "Subsea pipeline infrastructure",
  },
  {
    label: "05",
    title: "The Convergence",
    description: "All four issues were interconnected. A physics-informed ML model mapped the cascade: fouling → pressure shift → vibration → accelerated fatigue.",
    expert: "Applied Mathematics PhD",
    image: layerData,
    imageAlt: "Data visualization network",
    isAccent: true,
  },
];

const DescentSection = () => {
  return (
    <div className="relative">
      {layers.map((layer, i) => (
        <DescentLayer key={i} layer={layer} index={i} />
      ))}
    </div>
  );
};

interface LayerData {
  label: string;
  title: string;
  description: string;
  expert: string;
  image: string;
  imageAlt: string;
  isAccent?: boolean;
}

const DescentLayer = ({ layer, index }: { layer: LayerData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.5], [80, 0, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.3]);

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Full-bleed background image */}
      <motion.div
        style={{ scale: imgScale }}
        className="absolute inset-0"
      >
        <img
          src={layer.image}
          alt={layer.imageAlt}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay - heavier on text side */}
        <div className={`absolute inset-0 ${
          isEven 
            ? "bg-gradient-to-r from-background via-background/70 to-transparent"
            : "bg-gradient-to-l from-background via-background/70 to-transparent"
        }`} />
        <div className="absolute inset-0 bg-background/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="cinematic-container w-full"
        >
          <div className={`max-w-xl ${isEven ? "" : "ml-auto"}`}>
            {/* Number */}
            <div className="font-heading text-8xl md:text-9xl font-bold text-foreground/[0.07] mb-[-2rem] md:mb-[-3rem]">
              {layer.label}
            </div>

            {/* Title */}
            <h2 className={`font-heading text-3xl md:text-5xl font-medium leading-tight mb-6 ${
              layer.isAccent ? "text-accent" : "text-foreground"
            }`}>
              {layer.title}
            </h2>

            {/* Description */}
            <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed mb-8 max-w-lg">
              {layer.description}
            </p>

            {/* Expert tag */}
            <div className="inline-flex items-center gap-3">
              <div className={`h-px w-8 ${layer.isAccent ? "bg-accent" : "bg-muted-foreground/40"}`} />
              <span className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {layer.expert}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DescentSection;
