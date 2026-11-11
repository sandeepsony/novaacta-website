import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** Id for the heading, so the section can point at it with aria-labelledby. */
  id?: string;
  /** Heading level. Pages use one h1; sections use h2. */
  as?: "h1" | "h2";
  className?: string;
}

/** Eyebrow, rule, heading and optional intro, used at the top of every section. */
const SectionHeading = ({ eyebrow, title, intro, id, align = "left", as: Heading = "h2", className = "" }: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <div className={`rule my-6 ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
      <Heading
        id={id}
        className={
          Heading === "h1"
            ? "text-[2.75rem] leading-[1.05] text-foreground sm:text-6xl md:text-7xl"
            : "text-4xl leading-[1.1] text-foreground md:text-5xl"
        }
      >
        {title}
      </Heading>
      {intro && (
        <p className={`mt-6 text-lg leading-relaxed text-muted-foreground ${centered ? "mx-auto" : ""} max-w-2xl`}>{intro}</p>
      )}
    </div>
  );
};

export default SectionHeading;
