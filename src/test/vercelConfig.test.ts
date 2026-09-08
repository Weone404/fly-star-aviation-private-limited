import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * These assert BEHAVIOUR, not a literal regex string. The previous version
 * pinned the SPA allowlist as an exact string, so any legitimate addition to it
 * (e.g. blog/ or a new top-level page) failed the suite for the wrong reason.
 */
function loadRoutes() {
  const configPath = resolve(__dirname, "../../vercel.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  return Array.isArray(config.routes) ? config.routes : [];
}

const spaRoutes = () =>
  loadRoutes().filter(
    (r) => r && typeof r === "object" && r.dest === "/index.html" && typeof r.src === "string"
  );

function matchesSpa(path: string): boolean {
  return spaRoutes().some((r) => new RegExp(`^${r.src}$`).test(path));
}

describe("Vercel config", () => {
  it("has an SPA allowlist and a real 404 fallback", () => {
    expect(spaRoutes().length).toBeGreaterThan(0);
    expect(
      loadRoutes().find((r) => r && r.src === "/(.*)" && r.status === 404)
    ).toBeTruthy();
  });

  it.each([
    "/about",
    "/contact",
    "/courses/cpl",
    "/courses/cabin-crew",
    "/dgca/computer-number",
    "/pilot-training/india",
    "/become-a-pilot/commercial-pilot-licence",
    "/locations/delhi",
    "/blogs",
    "/editorial-policy",
    "/faq",
    "/glossary",
    "/rtr",
  ])("routes %s to the SPA", (path) => {
    expect(matchesSpa(path)).toBe(true);
  });

  /**
   * /blog/<slug> is deliberately NOT in the SPA allowlist.
   *
   * A blog post is served only if prerender wrote a file for it, which happens
   * only for posts on the approval list in src/lib/blogApproval.ts. Routing
   * /blog/* to the SPA would give every unapproved slug an HTTP 200 with a
   * "not found" body — a soft 404 that Google can index, and a live-looking URL
   * on this domain for anything written to the open write endpoint.
   *
   * Failing closed costs one thing: an approved post that fails to prerender
   * 404s instead of degrading to a client-side render. renderGate.test.ts and
   * scripts/smoke.mjs both exist to catch that first.
   */
  it("does not route /blog/<slug> to the SPA — unapproved posts must hard-404", () => {
    expect(matchesSpa("/blog/dgca-ground-classes-vs-self-study")).toBe(false);
    expect(matchesSpa("/blog/anything-someone-wrote-to-the-api")).toBe(false);
  });

  it("still routes the legacy /blogs/<id> form to the SPA so old links resolve", () => {
    expect(matchesSpa("/blogs/1")).toBe(true);
  });

  it.each(["/not-a-page", "/random/deep/path", "/wp-admin"])(
    "leaves %s to the 404 fallback",
    (path) => {
      expect(matchesSpa(path)).toBe(false);
    }
  );

  it("redirects the dead board-verification URL to the page that now answers it", () => {
    // Retargeted 2026-09-04: it pointed at the computer-number guide as the
    // nearest available answer. There is now a page on the query itself.
    const redirect = loadRoutes().find((r) => r && r.src === "/dgca/board-verification");
    expect(redirect?.status).toBe(301);
    expect(redirect?.dest).toBe("/blog/dgca-board-verification-certificate");
  });
});
