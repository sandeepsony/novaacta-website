const LIGHT = "#EBCB8B";
const MID = "#C99F58";
const DARK = "#96702F";

// Eight-point compass star: four short diagonal points drawn first, four long
// cardinal points on top. Each point is two facets, lit from the upper left.
const facets: [string, string][] = [
  [MID, "M50 50L52.76 43.35L67.68 32.32Z"],
  [DARK, "M50 50L67.68 32.32L56.65 47.24Z"],
  [MID, "M50 50L56.65 52.76L67.68 67.68Z"],
  [DARK, "M50 50L67.68 67.68L52.76 56.65Z"],
  [MID, "M50 50L47.24 56.65L32.32 67.68Z"],
  [DARK, "M50 50L32.32 67.68L43.35 52.76Z"],
  [MID, "M50 50L43.35 47.24L32.32 32.32Z"],
  [DARK, "M50 50L32.32 32.32L47.24 43.35Z"],
  [LIGHT, "M50 50L47.24 43.35L50 4Z"],
  [DARK, "M50 50L50 4L52.76 43.35Z"],
  [LIGHT, "M50 50L56.65 47.24L96 50Z"],
  [DARK, "M50 50L96 50L56.65 52.76Z"],
  [LIGHT, "M50 50L52.76 56.65L50 96Z"],
  [DARK, "M50 50L50 96L47.24 56.65Z"],
  [LIGHT, "M50 50L43.35 52.76L4 50Z"],
  [DARK, "M50 50L4 50L43.35 47.24Z"],
];

interface LogoProps {
  className?: string;
  /** Leave empty when the logo sits next to the wordmark text. */
  title?: string;
}

const Logo = ({ className = "h-9 w-9", title }: LogoProps) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
  >
    {facets.map(([fill, d]) => (
      <path key={d} fill={fill} d={d} />
    ))}
  </svg>
);

export default Logo;
