import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import Wordmark from "@/components/Wordmark";
import { pages, site } from "@/site";

const Footer = () => (
  <footer className="border-t border-border py-14">
    <div className="site-container">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link to="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
            <Logo className="h-9 w-9" />
            <Wordmark size="md" />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Engineering intelligence for industrial data. Physics first, then algorithms.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          {pages.map((page) => (
            <Link key={page.path} to={page.path} className="meta transition-colors hover:text-accent">
              {page.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="meta">Contact</span>
          <a href={`mailto:${site.email}`} className="text-sm text-foreground underline-offset-4 hover:text-accent hover:underline">
            {site.email}
          </a>
        </div>
      </div>

      <p className="meta mt-12 border-t border-border pt-6">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
