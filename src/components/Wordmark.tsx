interface WordmarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-sm tracking-[0.32em]",
  md: "text-base tracking-[0.3em]",
  lg: "text-xl tracking-[0.25em]",
};

const dividerSizes = {
  sm: "h-3.5 mx-2.5",
  md: "h-4 mx-2.5",
  lg: "h-5 mx-3",
};

/** The NOVA | ACTA lockup, set in live text so it stays sharp at any size. */
const Wordmark = ({ size = "md", className = "" }: WordmarkProps) => (
  <span className={`inline-flex select-none items-center font-body font-light uppercase ${sizes[size]} ${className}`}>
    <span className="text-foreground">Nova</span>
    <span aria-hidden="true" className={`w-px bg-accent/70 ${dividerSizes[size]}`} />
    <span className="text-accent">Acta</span>
  </span>
);

export default Wordmark;
