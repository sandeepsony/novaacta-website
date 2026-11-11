import type { ComponentType } from "react";

type PageModule = { default: ComponentType };

/** Lazy loaders keyed by route path. Each becomes its own JavaScript chunk. */
export const pageLoaders: Record<string, () => Promise<PageModule>> = {
  "/": () => import("./pages/Index"),
  "/what-we-do": () => import("./pages/WhatWeDo"),
  "/platform": () => import("./pages/Platform"),
  "/scenarios": () => import("./pages/Scenarios"),
};
