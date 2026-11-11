/**
 * Single source of truth for site identity and per-page metadata.
 * Used by the client (document title on navigation), the prerender script
 * (static <head> for every route), the sitemap and the structured data.
 */

export const site = {
  name: "NovaActa",
  /** Production origin, no trailing slash. Change this if the domain differs. */
  url: "https://novaacta.com",
  email: "hello@novaacta.com",
  tagline: "Engineering intelligence",
  description:
    "NovaActa pairs research-level engineering expertise with data science to find the root cause of failures, losses and risks hiding in industrial data.",
  ogImage: "/og-image.png",
} as const;

export interface PageMeta {
  path: string;
  /** Short label used in navigation. */
  label: string;
  title: string;
  description: string;
  /** Excluded from the sitemap and marked noindex when true. */
  noindex?: boolean;
}

export const pages: PageMeta[] = [
  {
    path: "/",
    label: "Home",
    title: "NovaActa | Engineering intelligence for industrial data",
    description: site.description,
  },
  {
    path: "/what-we-do",
    label: "What we do",
    title: "What we do | Engineering, data and applied AI | NovaActa",
    description:
      "Failure and root cause analysis, first-principles simulation, industrial data pipelines and applied AI, delivered by engineers who understand the physics.",
  },
  {
    path: "/platform",
    label: "Platform",
    title: "Platform preview | Investigation workspace | NovaActa",
    description:
      "A concept preview of the NovaActa investigation workspace: sensor signals, risk trends and findings for one asset in a single view. Shown with simulated data.",
  },
  {
    path: "/scenarios",
    label: "Scenarios",
    title: "Scenarios | Engineering problems we are built for | NovaActa",
    description:
      "Seven illustrative scenarios, from offshore corrosion to wind farm wake losses, showing how NovaActa would investigate a problem that standard monitoring misses.",
  },
];

/** Old URLs that should keep working. Handled client-side by the router. */
export const redirects: Record<string, string> = {
  "/case-studies": "/scenarios",
};

export const notFoundMeta: PageMeta = {
  path: "/404",
  label: "Not found",
  title: "Page not found | NovaActa",
  description: "The page you were looking for does not exist.",
  noindex: true,
};

export const normalizePath = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

export const metaForPath = (pathname: string): PageMeta =>
  pages.find((page) => page.path === normalizePath(pathname)) ?? notFoundMeta;

export const absoluteUrl = (path: string) => `${site.url}${path === "/" ? "/" : path}`;
