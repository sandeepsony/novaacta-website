import logo8 from "@/assets/logo-option-8.png";

interface NovaActaLogoProps {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
}

const sizes = {
  sm: { mark: 20, text: "text-[11px]", spacing: "tracking-[0.35em]", gap: "gap-3" },
  md: { mark: 28, text: "text-[13px]", spacing: "tracking-[0.3em]", gap: "gap-3.5" },
  lg: { mark: 36, text: "text-base", spacing: "tracking-[0.25em]", gap: "gap-4" },
  xl: { mark: 48, text: "text-xl", spacing: "tracking-[0.2em]", gap: "gap-5" },
  hero: { mark: 72, text: "text-3xl md:text-4xl", spacing: "tracking-[0.15em]", gap: "gap-6" },
};

/**
 * NovaActa brand mark — North Star Compass
 * Option 8: Direction, discovery, exploration
 */
const BrandMark = ({ size = 28 }: { size?: number }) => (
  <img
    src={logo8}
    alt="NovaActa"
    width={size}
    height={size}
    className="invert flex-shrink-0"
    style={{ width: size, height: size }}
  />
);

const NovaActaLogo = ({ variant = "full", size = "md", className = "" }: NovaActaLogoProps) => {
  const s = sizes[size];

  if (variant === "mark") {
    return (
      <div className={`${className}`}>
        <BrandMark size={s.mark} />
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={`text-foreground ${className}`}>
        <span className={`font-heading font-medium ${s.text} ${s.spacing} uppercase`}>
          Nova<span className="text-accent">Acta</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${s.gap} text-foreground ${className}`}>
      <BrandMark size={s.mark} />
      <div className="flex flex-col">
        <span className={`font-heading font-medium ${s.text} ${s.spacing} uppercase leading-none`}>
          Nova<span className="text-accent">Acta</span>
        </span>
        {(size === "lg" || size === "xl" || size === "hero") && (
          <span className="font-mono-data text-[8px] uppercase tracking-[0.4em] text-muted-foreground mt-1">
            Engineering Intelligence
          </span>
        )}
      </div>
    </div>
  );
};

export default NovaActaLogo;
export { BrandMark };
