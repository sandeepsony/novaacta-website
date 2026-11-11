import { lazy, StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App, { type PageMap } from "./App";
import { pageLoaders } from "./routes";
import { normalizePath, redirects } from "./site";
import "./index.css";

const start = async () => {
  const container = document.getElementById("root")!;
  const path = normalizePath(window.location.pathname);

  const pages: PageMap = Object.fromEntries(
    Object.entries(pageLoaders).map(([route, load]) => [route, lazy(load)]),
  );

  // Load the current page before rendering so the first render is complete
  // and matches the prerendered HTML exactly.
  if (pageLoaders[path]) {
    pages[path] = (await pageLoaders[path]()).default;
  }

  const app = (
    <StrictMode>
      <BrowserRouter>
        <App pages={pages} />
      </BrowserRouter>
    </StrictMode>
  );

  // scripts/prerender.mjs stamps the route it rendered onto #root. Hydrate only
  // when that matches what the router will show; otherwise render fresh.
  const prerendered = container.dataset.prerendered;
  const unknownPath = !pageLoaders[path] && !redirects[path];
  const matches = prerendered === path || (prerendered === "404" && unknownPath);

  if (matches) {
    hydrateRoot(container, app);
  } else {
    container.replaceChildren();
    createRoot(container).render(app);
  }
};

start();
