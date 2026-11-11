import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import { scenarios, scenarioTags, type Scenario } from "@/content/scenarios";

const chipClass = (active: boolean) =>
  `meta border px-4 py-2 transition-colors duration-200 ${
    active ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/50 hover:text-foreground"
  }`;

const Step = ({ number, title, children, last = false }: { number: number; title: string; children: ReactNode; last?: boolean }) => (
  <div className={`relative pl-12 ${last ? "" : "pb-9"}`}>
    <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-background font-mono text-xs text-accent" aria-hidden="true">
      {number}
    </span>
    <h3 className="eyebrow pt-2 font-mono font-normal text-accent">{title}</h3>
    <div className="mt-3">{children}</div>
  </div>
);

const ScenarioCard = ({ scenario, index, open, onToggle }: { scenario: Scenario; index: number; open: boolean; onToggle: () => void }) => {
  const panelId = `${scenario.id}-detail`;

  return (
    <article id={scenario.id} className={`scroll-mt-24 border transition-colors duration-300 ${open ? "border-accent/50 bg-card" : "border-border bg-card/50"}`}>
      <div className="flex flex-col md:flex-row">
        <div className="relative h-52 w-full flex-shrink-0 overflow-hidden md:h-auto md:w-60 lg:w-72">
          <img
            src={scenario.image.small}
            srcSet={`${scenario.image.small} 480w, ${scenario.image.large} 960w`}
            sizes="(min-width: 1024px) 288px, (min-width: 768px) 240px, 100vw"
            alt={scenario.image.alt}
            width={480}
            height={480}
            loading={index === 0 ? "eager" : "lazy"}
            {...(index === 0 ? { fetchpriority: "high" } : {})}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="meta absolute left-4 top-4 border border-accent/40 bg-background/85 px-3 py-1.5 text-accent backdrop-blur-sm">
            Scenario {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex-1 p-6 md:p-8">
          <p className="meta">{scenario.title}</p>
          <h2 className="mt-3 text-2xl leading-snug text-foreground md:text-3xl">
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={panelId}
              className="group flex w-full items-start justify-between gap-4 text-left"
            >
              <span>{scenario.headline}</span>
              <ChevronDown
                className={`mt-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-accent ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
          </h2>
          <p className="mt-1 font-heading text-xl italic text-accent">{scenario.subline}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Disciplines involved">
            {scenario.disciplines.map((discipline) => (
              <li key={discipline} className="meta border border-border px-2.5 py-1">
                {discipline}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Always in the DOM so the text is indexable; collapsed with CSS only. */}
      <div id={panelId} className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className={`overflow-hidden transition-[visibility] duration-500 ${open ? "visible" : "invisible"}`}>
          <div className="border-t border-border p-6 md:p-10">
            <div className="relative max-w-3xl">
              <div className="absolute bottom-0 left-4 top-0 w-px bg-border" aria-hidden="true" />
              <Step number={1} title="The situation">
                <p className="leading-relaxed text-muted-foreground">{scenario.situation}</p>
              </Step>
              <Step number={2} title="How we would investigate">
                <p className="leading-relaxed text-muted-foreground">{scenario.approach}</p>
              </Step>
              <Step number={3} title="What this kind of analysis can surface">
                <ul className="space-y-2.5">
                  {scenario.findings.map((finding) => (
                    <li key={finding} className="flex gap-3 leading-relaxed text-muted-foreground">
                      <span className="mt-[0.7em] h-px w-4 flex-shrink-0 bg-accent" aria-hidden="true" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </Step>
              <Step number={4} title="Why it matters" last>
                <p className="border border-accent/30 bg-accent/5 p-5 font-heading text-xl leading-relaxed text-foreground md:p-6">
                  {scenario.stakes}
                </p>
              </Step>
            </div>

            <div className="mt-9 border-t border-border pt-6">
              <Link to="/platform" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                See this scenario in the platform preview
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const Scenarios = () => {
  const { hash } = useLocation();
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Deep links such as /scenarios#bridge open that scenario and scroll to it.
  useEffect(() => {
    const id = hash.replace("#", "");
    if (!scenarios.some((scenario) => scenario.id === id)) return;

    setActiveTags([]);
    setOpenId(id);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  }, [hash]);

  const toggleTag = (tag: string) =>
    setActiveTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));

  const visible = activeTags.length === 0 ? scenarios : scenarios.filter((scenario) => scenario.tags.some((tag) => activeTags.includes(tag)));

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" aria-hidden="true" />
        <div className="site-container relative">
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Illustrative scenarios"
            title={
              <>
                Seven problems we are <span className="italic text-accent">built for.</span>
              </>
            }
            intro="Each one starts the same way: something is wrong, the monitoring says everything is fine, and nobody can say why."
          />

          <p className="mx-auto mt-10 flex max-w-2xl items-start gap-3 border border-border bg-card/60 p-5 text-left text-[0.9375rem] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
            <span>
              <strong className="font-medium text-foreground">These are constructed examples, not client engagements.</strong>{" "}
              They show the kinds of failure pattern we work on and how we would approach each one. We will publish
              case studies here as engagements complete.
            </span>
          </p>
        </div>
      </section>

      <section className="border-t border-border py-14 md:py-20" aria-label="Scenarios">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter scenarios by field">
            <button type="button" onClick={() => setActiveTags([])} aria-pressed={activeTags.length === 0} className={chipClass(activeTags.length === 0)}>
              All
            </button>
            {scenarioTags.map((tag) => (
              <button key={tag} type="button" onClick={() => toggleTag(tag)} aria-pressed={activeTags.includes(tag)} className={chipClass(activeTags.includes(tag))}>
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {visible.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                index={scenarios.indexOf(scenario)}
                open={openId === scenario.id}
                onToggle={() => setOpenId((current) => (current === scenario.id ? null : scenario.id))}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Recognize one of these?"
        body="If a problem in your operation looks like any of the seven, or like none of them, tell us about it. We will tell you plainly whether we can help."
      />
    </>
  );
};

export default Scenarios;
