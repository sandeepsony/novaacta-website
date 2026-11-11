// The Quintessence mark from the AetherActa identity: a regular pentagon (the
// face of the dodecahedron, the classical solid of aether) holding an A.
// Geometry is taken from the identity file unchanged. The pentagon follows the
// text color and the A follows the accent, so the mark works in both themes.
const PENTAGON = "M50 10 L88.04 37.64 L73.51 82.36 L26.49 82.36 L11.96 37.64 Z";
const LETTER_A = "M50 30 L36.5 76 M50 30 L63.5 76 M42 60 L58 60";

interface LogoProps {
  className?: string;
  /** Leave empty when the logo sits next to the wordmark text. */
  title?: string;
  /** Line weight in viewBox units. Use about 2.6 above 100px, 3.4 at header size. */
  strokeWidth?: number;
}

const Logo = ({ className = "h-9 w-9", title, strokeWidth = 3.4 }: LogoProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
  >
    <path d={PENTAGON} stroke="hsl(var(--foreground))" strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d={LETTER_A} stroke="hsl(var(--accent))" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Logo;
