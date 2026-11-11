import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ParticleNetwork from "@/components/ParticleNetwork";
import { site } from "@/site";

const principles = [
  {
    title: "Physics first",
    body: "Every model starts from the mechanics of the asset, not from a generic algorithm.",
  },
  {
    title: "Your existing data",
    body: "Historians, inspection records and maintenance logs you already collect.",
  },
  {
    title: "Findings you can check",
    body: "Evidence, assumptions and uncertainty stated with every conclusion.",
  },
];

const HeroSection = () => (
  <section className="relative flex min-h-[92vh] items-center overflow-hidden pb-16 pt-32 md:pt-40">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
    <ParticleNetwork />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[56rem] md:w-[56rem]"
      style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.07) 0%, transparent 68%)" }}
    />

    <div className="site-container relative z-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow rise mb-7">{site.tagline}</p>

        <h1 className="text-[2.75rem] leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
          The failure is already <span className="italic text-accent">in your data.</span>
        </h1>

        <p className="rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "80ms" }}>
          AetherActa pairs research-level engineering expertise with data science to find the
          degradation, loss and risk hiding in the operational data you already collect, and
          to explain the physics behind it.
        </p>

        <div className="rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "160ms" }}>
          <Link to="/scenarios" className="btn-primary group w-full sm:w-auto">
            See how we investigate
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <a href={`mailto:${site.email}`} className="btn-secondary w-full sm:w-auto">
            Start a conversation
          </a>
        </div>
      </div>

      <ul className="rise mx-auto mt-20 grid max-w-5xl gap-px border border-border bg-border md:grid-cols-3" style={{ animationDelay: "240ms" }}>
        {principles.map((item) => (
          <li key={item.title} className="bg-background/80 p-6 backdrop-blur-sm md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{item.title}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HeroSection;
