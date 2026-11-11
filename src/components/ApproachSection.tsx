import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    title: "Data and domain audit",
    body: "We map the data your operation generates, assess its quality, and identify which of your open problems it can actually answer.",
  },
  {
    title: "Problem formulation",
    body: "Analytics projects fail more often from a badly framed question than from bad data. We turn the engineering problem into a precise analytical one.",
  },
  {
    title: "Model and solution engineering",
    body: "We build the analysis the problem calls for, from physics-informed machine learning to optimization, and validate it against the physics.",
  },
  {
    title: "Handover",
    body: "The result is embedded in your workflow with full documentation. No black boxes: your engineers can run it, question it and extend it.",
  },
];

const ApproachSection = () => (
  <section className="section bg-card/40" aria-labelledby="approach-heading">
    <div className="site-container">
      <SectionHeading
        eyebrow="How we work"
        id="approach-heading"
        title={
          <>
            From raw data to a decision <span className="italic text-accent">you can defend.</span>
          </>
        }
        intro="Four stages, from working out what your data can answer to handing over a result your team can run."
      />

      <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 80} className="border-t border-accent/50 pt-6">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Stage {index + 1}</span>
            <h3 className="mt-4 text-2xl leading-tight text-foreground">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default ApproachSection;
