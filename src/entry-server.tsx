import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App, { type PageMap } from "./App";
import Index from "./pages/Index";
import Platform from "./pages/Platform";
import Scenarios from "./pages/Scenarios";
import WhatWeDo from "./pages/WhatWeDo";

export { absoluteUrl, notFoundMeta, pages as pageMeta, site } from "./site";

// Same routes as src/routes.ts, imported eagerly because renderToString
// cannot wait for lazy components.
const pages: PageMap = {
  "/": Index,
  "/what-we-do": WhatWeDo,
  "/platform": Platform,
  "/scenarios": Scenarios,
};

export const render = (url: string) =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App pages={pages} />
      </StaticRouter>
    </StrictMode>,
  );
