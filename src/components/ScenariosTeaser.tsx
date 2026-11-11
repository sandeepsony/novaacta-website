import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { scenarios } from "@/content/scenarios";

const featured = scenarios.slice(0, 3);

const ScenariosTeaser = () => (
  <section className="section" aria-labelledby="scenarios-heading">
    <div className="site-container">
      <SectionHeading
        eyebrow="Illustrative scenarios"
        id="scenarios-heading"
        title={
          <>
            The problems we are <span className="italic text-accent">built for.</span>
          </>
        }
        intro="Constructed examples, not client engagements. Each shows a failure pattern that standard monitoring tends to miss and how we would investigate it."
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {featured.map((scenario, index) => (
          <Reveal as="li" key={scenario.id} delay={index * 80}>
            <Link to={`/scenarios#${scenario.id}`} className="group flex h-full flex-col border border-border bg-card/50 transition-colors duration-300 hover:border-accent/50">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={scenario.image.small}
                  srcSet={`${scenario.image.small} 480w, ${scenario.image.large} 960w`}
                  sizes="(min-width: 768px) 30vw, 90vw"
                  alt={scenario.image.alt}
                  width={480}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="meta text-accent">{scenario.title}</span>
                <h3 className="mt-3 text-2xl leading-tight text-foreground">{scenario.headline}</h3>
                <p className="mt-2 flex-1 text-muted-foreground">{scenario.subline}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground group-hover:text-accent">
                  Read the scenario
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="mt-10">
        <Link to="/scenarios" className="btn-secondary">
          All seven scenarios
        </Link>
      </div>
    </div>
  </section>
);

export default ScenariosTeaser;
