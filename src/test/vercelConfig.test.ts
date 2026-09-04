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
    "/blog/dgca-ground-classes-vs-self-study",
    "/editorial-policy",
    "/rtr",
  ])("routes %s to the SPA", (path) => {
    expect(matchesSpa(path)).toBe(true);
  });

  it.each(["/not-a-page", "/random/deep/path", "/wp-admin"])(
    "leaves %s to the 404 fallback",
    (path) => {
      expect(matchesSpa(path)).toBe(false);
    }
  );

  it("keeps the dead board-verification URL redirecting rather than 404ing", () => {
    const redirect = loadRoutes().find(
      (r) => r && r.src === "/dgca/board-verification"
    );
    expect(redirect?.status).toBe(301);
    expect(redirect?.dest).toBe("/dgca/computer-number");
  });
});
