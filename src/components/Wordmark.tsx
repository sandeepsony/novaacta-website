interface WordmarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-[1.5rem]",
  md: "text-[1.625rem]",
  lg: "text-[2rem]",
};

/**
 * The AetherActa wordmark: one word, with the capital of each root keeping
 * the two halves readable and "Acta" in the accent. Set in live text in the
 * heading serif so it stays sharp at any size.
 */
const Wordmark = ({ size = "md", className = "" }: WordmarkProps) => (
  <span className={`inline-block select-none font-heading font-semibold leading-none tracking-[0.005em] ${sizes[size]} ${className}`}>
    <span className="text-foreground">Aether</span>
    <span className="text-accent">Acta</span>
  </span>
);

export default Wordmark;
