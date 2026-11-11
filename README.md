# AetherActa website

Marketing site for AetherActa: engineering intelligence for industrial data.

Built with Vite, React, TypeScript and Tailwind CSS. Every route is prerendered to
static HTML at build time, so the output in `dist/` can be served by any static host.

## Run it

Requires Node.js 20 or newer.

```sh
npm install
npm run dev        # development server on http://localhost:8080
npm run build      # production build with prerendered pages, into dist/
npm run preview    # serve the production build locally
npm test           # content and metadata checks
npm run lint
npm run typecheck
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/site.ts` | Site name, production URL, contact email, and the title and description of every page |
| `src/routes.ts` | Which page component serves which URL |
| `src/content/scenarios.ts` | The seven illustrative scenarios, used by three pages |
| `src/pages/` | One file per page |
| `src/components/` | Sections and shared pieces (navigation, footer, headings) |
| `src/index.css` | Design tokens (colors for both themes), type styles, buttons |
| `scripts/prerender.mjs` | Writes static HTML, `sitemap.xml` and `robots.txt` after the build |
| `scripts/optimize_images.py` | Converts photos in `scripts/source-images/` to WebP |

## Common changes

**Change the domain.** Edit `url` in `src/site.ts`. Canonical links, the sitemap, social
tags and structured data in the built pages all follow from it.

**Add a page.** Create the component in `src/pages/`, then add it in three places:
`pages` in `src/site.ts`, `pageLoaders` in `src/routes.ts`, and the two page lists in
`src/entry-server.tsx` and `scripts/prerender.mjs`. `npm test` fails if the first two disagree.

**Add a photo.** Put the `.jpg` in `scripts/source-images/` and run `npm run images`
(needs Python with Pillow). Import the generated `-480.webp` and `-960.webp` files.

## Content rules

The scenarios and the platform preview are illustrative, and the site says so. Keep it that way:

- No outcome figures (money saved, percentages recovered) in `src/content/scenarios.ts`.
  A test enforces this.
- The platform preview uses generated data and is labeled as simulated.
- When there is a real engagement to report, add it as a case study with the client's
  approval instead of editing a scenario.

## Hosting

`dist/` is plain static files. The host needs two behaviors, both defaults on Netlify,
Vercel, Cloudflare Pages and GitHub Pages:

- serve `dist/<route>/index.html` for `/<route>`
- serve `dist/404.html` for unknown URLs

Old links such as `/case-studies` are redirected in the browser (see `redirects` in
`src/site.ts`). For a proper HTTP 301, add the same redirect in the host's settings.

## Access gate

The home page shows an access form (`src/components/StealthOverlay.tsx`). It runs in
the browser only, so it hides the page from casual visitors but is not access control:
the code is in the JavaScript bundle and the other routes are not gated. To restrict
the site for real, use the host's password protection.
