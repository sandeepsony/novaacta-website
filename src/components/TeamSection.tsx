import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import layerPlatform from "@/assets/layer-platform.jpg";

const disciplines = [
  { name: "Structural Engineering", count: 3 },
  { name: "Thermodynamics", count: 2 },
  { name: "Applied Mathematics", count: 2 },
  { name: "Materials Science", count: 2 },
  { name: "Chemical Engineering", count: 2 },
  { name: "Geomechanics", count: 1 },
  { name: "Control Systems", count: 1 },
  { name: "Fluid Dynamics", count: 1 },
];

const TeamSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img src={layerPlatform} alt="" className="w-full h-full object-cover opacity-[0.07]" />
      </motion.div>

      <motion.div style={{ opacity }} className="cinematic-container relative z-10">
        {/* Big editorial headline */}
        <div className="max-w-4xl mb-20">
          <div className="label-mono mb-8">Who we are</div>

          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-[1.1] mb-8">
            14 PhDs. 8 disciplines.
          </h2>
          <p className="font-heading text-2xl md:text-3xl italic text-muted-foreground leading-relaxed max-w-2xl">
            We are not consultants. We are researchers who chose industry 
            over academia — because the most interesting problems live 
            inside your data, not inside journals.
          </p>
        </div>

        {/* Discipline grid - editorial style */}
        <div className="border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {disciplines.map((d) => (
              <div
                key={d.name}
                className="border-b border-r border-border p-8 group hover:bg-card transition-colors duration-500"
              >
                <div className="font-heading text-4xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-500">
                  {d.count}
                </div>
                <div className="font-mono-data text-[9px] uppercase tracking-[0.15em] text-muted-foreground leading-relaxed">
                  {d.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSection;
