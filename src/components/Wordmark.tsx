import { useTheme } from "@/hooks/useTimeTheme";

interface WordmarkProps {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
}

const sizes = {
  sm: "text-sm tracking-[0.35em]",
  md: "text-base tracking-[0.3em]",
  lg: "text-xl tracking-[0.25em]",
  hero: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.2em]",
};

const dividerSizes = {
  sm: "h-3 mx-2",
  md: "h-4 mx-2.5",
  lg: "h-5 mx-3",
  hero: "h-8 sm:h-10 md:h-14 lg:h-16 mx-4 md:mx-6",
};

const Wordmark = ({ size = "md", className = "" }: WordmarkProps) => {
  const { theme } = useTheme();
  const novaColor = theme === "dark" ? "text-foreground" : "text-foreground";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <span
        className={`font-light uppercase ${sizes[size]} ${novaColor}`}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        NOVA
      </span>
      <div
        className={`w-px bg-accent/70 ${dividerSizes[size]}`}
      />
      <span
        className={`font-light uppercase ${sizes[size]}`}
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          background: "linear-gradient(180deg, hsl(43, 74%, 65%) 0%, hsl(35, 100%, 45%) 50%, hsl(30, 80%, 35%) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        ACTA
      </span>
    </div>
  );
};

export default Wordmark;
