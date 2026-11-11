import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import Wordmark from "@/components/Wordmark";
import { normalizePath, pages, site } from "@/site";

const navLinks = pages.filter((page) => page.path !== "/");

const linkClass = (active: boolean) =>
  `font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-200 ${
    active ? "text-accent" : "text-muted-foreground hover:text-foreground"
  }`;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = normalizePath(useLocation().pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-border bg-background/95 backdrop-blur-sm" : "border-transparent bg-transparent"
      }`}
    >
      <div className="site-container">
        <div className="flex h-[4.5rem] items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <Logo className="h-9 w-9" />
            <Wordmark size="sm" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={pathname === link.path ? "page" : undefined}
                className={linkClass(pathname === link.path)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="border border-foreground/25 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Contact
            </a>
            <ThemeToggle className="-ml-3 -mr-3" />
          </nav>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-foreground"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-border bg-background md:hidden">
          <div className="site-container flex flex-col py-4">
            {pages.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={pathname === link.path ? "page" : undefined}
                className={`py-3 ${linkClass(pathname === link.path)}`}
              >
                {link.label}
              </Link>
            ))}
            <a href={`mailto:${site.email}`} className={`py-3 ${linkClass(false)}`}>
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
