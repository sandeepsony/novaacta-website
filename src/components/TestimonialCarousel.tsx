import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "They identified a fatigue-driven crack propagation pattern our inspection team had classified as cosmetic. Their cascade failure model prevented what could have been a catastrophic shutdown.",
    name: "Senior Operations Manager",
    title: "Offshore Energy Operator",
    org: "Offshore Energy Operator",
    orgAbbr: "OEO",
  },
  {
    quote:
      "We were days from approving a $12M structural retrofit. NovaActa's thermal-mechanical analysis proved the deflection was environmentally induced — not structural. That single finding changed everything.",
    name: "Director of Infrastructure",
    title: "State Transportation Authority",
    org: "State DOT",
    orgAbbr: "DOT",
  },
  {
    quote:
      "Standard energy audits kept pointing to equipment age. Their first-principles simulation traced the loss to a heat integration bottleneck no one had modeled before. We recovered 18% efficiency in one quarter.",
    name: "Plant Reliability Engineer",
    title: "Gulf Coast Refinery",
    org: "Gulf Coast Refinery",
    orgAbbr: "GCR",
  },
  {
    quote:
      "Our biological nutrient removal was failing intermittently with no clear pattern. Their biochemical kinetics model pinpointed a dissolved oxygen stratification issue — we've been in full compliance ever since.",
    name: "Chief of Operations",
    title: "Municipal Water Utility",
    org: "Municipal Water Utility",
    orgAbbr: "MWU",
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-32 md:py-48 border-t border-border relative overflow-hidden">
      <div className="cinematic-container">
        <div className="label-mono mb-8 text-center">Trusted By</div>

        {/* Org logos strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-8 md:gap-16 mb-20"
        >
          {testimonials.map((t, i) => (
            <button
              key={t.orgAbbr}
              onClick={() => setCurrent(i)}
              className={`font-mono-data text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-500 px-3 py-2 border-b-2 ${
                i === current
                  ? "text-accent border-accent"
                  : "text-muted-foreground/40 border-transparent hover:text-muted-foreground"
              }`}
            >
              {t.org}
            </button>
          ))}
        </motion.div>

        {/* Quote */}
        <div className="max-w-4xl mx-auto relative min-h-[250px]">
          <Quote className="h-10 w-10 text-accent/20 mb-6 mx-auto" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-heading text-xl md:text-3xl lg:text-4xl italic text-foreground leading-relaxed mb-10">
                "{testimonials[current].quote}"
              </p>

              <div className="flex flex-col items-center gap-1">
                <span className="font-body text-sm text-foreground font-medium">
                  {testimonials[current].name}
                </span>
                <span className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {testimonials[current].title} · {testimonials[current].org}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="p-2 border border-border hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 transition-all duration-500 ${
                  i === current ? "w-8 bg-accent" : "w-3 bg-border hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 border border-border hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
