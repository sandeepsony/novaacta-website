import { Link } from "react-router-dom";
import logoGold from "@/assets/logo-compass-gold.png";
import Wordmark from "@/components/Wordmark";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="cinematic-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <img src={logoGold} alt="NovaActa" className="w-12 h-12 object-contain" />
          <Wordmark size="md" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-mono-data text-[9px] uppercase tracking-[0.3em] text-muted-foreground/40">
            © 2023 NovaActa · All rights reserved
          </span>

          <div className="flex gap-6">
            <Link to="/" className="font-mono-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/case-studies" className="font-mono-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-accent transition-colors">
              Case Studies
            </Link>
          </div>

          <span className="font-mono-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground/30">
            Palo Alto
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
