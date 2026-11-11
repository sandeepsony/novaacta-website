import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const commitments = [
  {
    title: "Physics before algorithms",
    body: "We start from the governing mechanics of the asset, then choose the analytical method that fits. A model that ignores the physics finds patterns that are not there.",
  },
  {
    title: "The data you already have",
    body: "Historians, SCADA exports, inspection reports and maintenance logs. We start with what exists before recommending any new instrumentation.",
  },
  {
    title: "Findings you can check",
    body: "Every conclusion comes with the evidence, assumptions and uncertainty behind it, written for the engineers who have to act on it.",
  },
  {
    title: "Capability, not dependency",
    body: "Models, code and methods are documented and handed over, so your team can run them and extend them without us.",
  },
];

const AboutSection = () => (
  <section className="section" aria-labelledby="about-heading">
    <div className="site-container grid gap-14 md:grid-cols-2 md:gap-20">
      <Reveal>
        <SectionHeading
          eyebrow="Why NovaActa"
          id="about-heading"
          title={
            <>
              The bridge between <span className="italic text-accent">deep engineering</span> and data science.
            </>
          }
        />
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Strategy consultants rarely model thermodynamics. Data scientists rarely model reservoir
          mechanics. The problems that cost the most sit between the two: a signal in the data that
          only makes sense once you understand the physics producing it.
        </p>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          NovaActa is built to work in that gap.
        </p>
      </Reveal>

      <ol className="border-t border-border">
        {commitments.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 70} className="flex gap-6 border-b border-border py-7">
            <span className="font-heading text-3xl leading-none text-accent" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-2xl leading-tight text-foreground">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default AboutSection;
