/**
 * Turns the single-page build into static HTML, one file per route.
 *
 * Runs after `vite build` (client, into dist/) and `vite build --ssr`
 * (server bundle, into dist-ssr/). For every route it renders the React tree
 * to HTML, writes the route's own <title>, description, canonical and social
 * tags, and saves dist/<route>/index.html. It also writes 404.html,
 * sitemap.xml and robots.txt. Search engines, link previews and visitors
 * without JavaScript all get real content; the browser then hydrates it.
 */
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, pageMeta, notFoundMeta, site, absoluteUrl } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = await readFile(path.join(dist, "index.html"), "utf8");
const manifest = JSON.parse(await readFile(path.join(dist, ".vite", "manifest.json"), "utf8"));
const assets = await readdir(path.join(dist, "assets"));

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Source file for each route, used to find its JavaScript chunk in the manifest. */
const pageSources = {
  "/": "src/pages/Index.tsx",
  "/what-we-do": "src/pages/WhatWeDo.tsx",
  "/platform": "src/pages/Platform.tsx",
  "/scenarios": "src/pages/Scenarios.tsx",
};

/** The page chunk and everything it imports, so the browser fetches them in parallel. */
const chunksFor = (source) => {
  const seen = new Set();
  const visit = (key) => {
    const entry = manifest[key];
    if (!entry || seen.has(entry.file)) return;
    seen.add(entry.file);
    (entry.imports ?? []).forEach(visit);
  };
  visit(source);
  return [...seen];
};

// Fonts used above the fold. Preloading them avoids a flash of fallback text.
const criticalFonts = [
  /^cormorant-garamond-latin-wght-normal-.+\.woff2$/,
  /^cormorant-garamond-latin-wght-italic-.+\.woff2$/,
  /^inter-latin-wght-normal-.+\.woff2$/,
]
  .map((pattern) => assets.find((file) => pattern.test(file)))
  .filter(Boolean);

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      logo: `${site.url}/logo.svg`,
      email: site.email,
      description: site.description,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
});

const setTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`prerender: tag not found for ${pattern}`);
  return html.replace(pattern, replacement);
};

const buildPage = (meta, marker, source) => {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const url = absoluteUrl(meta.path);

  let html = template;
  html = setTag(html, /<title>.*?<\/title>/, `<title>${title}</title>`);
  html = setTag(html, /(<meta name="description" content=")[^"]*/, `$1${description}`);
  html = setTag(html, /(<meta name="robots" content=")[^"]*/, `$1${meta.noindex ? "noindex" : "index, follow"}`);
  html = setTag(html, /(<link rel="canonical" href=")[^"]*/, `$1${url}`);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*/, `$1${title}`);
  html = setTag(html, /(<meta property="og:description" content=")[^"]*/, `$1${description}`);
  html = setTag(html, /(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*/, `$1${title}`);
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*/, `$1${description}`);
  html = setTag(html, /(<meta property="og:image" content=")[^"]*/, `$1${site.url}${site.ogImage}`);
  html = setTag(html, /(<meta name="twitter:image" content=")[^"]*/, `$1${site.url}${site.ogImage}`);

  const extra = [
    ...criticalFonts.map(
      (file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`,
    ),
    ...(source ? chunksFor(source) : []).map((file) => `<link rel="modulepreload" href="/${file}" />`),
    `<script type="application/ld+json">${structuredData}</script>`,
  ].join("\n    ");

  html = setTag(html, /<!--head-extra-->/, extra);
  html = setTag(
    html,
    /<div id="root"><!--app-html--><\/div>/,
    `<div id="root" data-prerendered="${marker}">${render(meta.path)}</div>`,
  );
  return html;
};

for (const meta of pageMeta) {
  const html = buildPage(meta, meta.path, pageSources[meta.path]);
  const file = meta.path === "/" ? path.join(dist, "index.html") : path.join(dist, meta.path, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`prerendered ${meta.path} (${(html.length / 1024).toFixed(1)} kB)`);
}

// Static hosts serve 404.html for unknown URLs. It still boots the app, so old
// links listed in src/routes.ts (such as /case-studies) redirect client-side.
await writeFile(path.join(dist, "404.html"), buildPage(notFoundMeta, "404"));
console.log("prerendered 404.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageMeta
  .filter((meta) => !meta.noindex)
  .map((meta) => `  <url><loc>${absoluteUrl(meta.path)}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log("wrote sitemap.xml and robots.txt");

await rm(ssrDir, { recursive: true, force: true });
await rm(path.join(dist, ".vite"), { recursive: true, force: true });
