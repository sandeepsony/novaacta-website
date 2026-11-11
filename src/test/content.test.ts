import { describe, expect, it } from "vitest";
import { scenarios } from "@/content/scenarios";
import { pageLoaders } from "@/routes";
import { metaForPath, notFoundMeta, pages, redirects } from "@/site";

describe("page metadata", () => {
  it("has a unique title and description for every page", () => {
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length);
  });

  it("keeps titles and descriptions within search result limits", () => {
    for (const page of pages) {
      expect(page.title.length, page.path).toBeLessThanOrEqual(62);
      expect(page.description.length, page.path).toBeGreaterThanOrEqual(70);
      expect(page.description.length, page.path).toBeLessThanOrEqual(165);
    }
  });

  it("has metadata for every route, and a route for every page", () => {
    expect(Object.keys(pageLoaders).sort()).toEqual(pages.map((page) => page.path).sort());
  });

  it("resolves trailing slashes and unknown paths", () => {
    expect(metaForPath("/platform/").path).toBe("/platform");
    expect(metaForPath("/does-not-exist")).toBe(notFoundMeta);
  });

  it("only redirects to pages that exist", () => {
    for (const target of Object.values(redirects)) {
      expect(pages.some((page) => page.path === target)).toBe(true);
    }
  });
});

describe("illustrative scenarios", () => {
  // These are constructed examples. A dollar figure or a percentage would read
  // as a real result, so this test fails if one is added by mistake.
  it("contain no outcome figures", () => {
    for (const scenario of scenarios) {
      const text = [
        scenario.headline,
        scenario.subline,
        scenario.situation,
        scenario.approach,
        scenario.stakes,
        ...scenario.findings,
      ].join(" ");
      expect(text, scenario.id).not.toMatch(/[$€£]|\d\s?%|\bmillion\b|\bbillion\b/i);
    }
  });

  it("have unique ids, since they are used as link anchors", () => {
    expect(new Set(scenarios.map((scenario) => scenario.id)).size).toBe(scenarios.length);
  });
});
