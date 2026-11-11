import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { site } from "@/site";

interface CTASectionProps {
  title?: string;
  body?: string;
}

const CTASection = ({
  title = "What is your unsolved problem?",
  body = "Tell us about the problem your best engineers keep coming back to. We will tell you plainly whether we can help, and what we would need to look at first.",
}: CTASectionProps) => (
  <section className="section" aria-labelledby="cta-heading">
    <Reveal className="site-container">
      <div className="mx-auto max-w-2xl text-center">
        <Logo className="mx-auto h-10 w-10" />
        <p className="eyebrow mt-8">Next step</p>
        <h2 id="cta-heading" className="mt-6 text-4xl italic leading-tight text-foreground md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{body}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={`mailto:${site.email}`} className="btn-primary group w-full sm:w-auto">
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a href={`mailto:${site.email}`} className="text-muted-foreground underline-offset-4 hover:text-accent hover:underline">
            {site.email}
          </a>
        </div>
      </div>
    </Reveal>
  </section>
);

export default CTASection;
