import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * llms.txt is hand-written, not generated.
 *
 * The sitemap and the feed regenerate from routeMeta on every build; llms.txt
 * does not, and nothing noticed when it fell three pages behind. This gate is
 * the substitute for a generator: a new route either appears in llms.txt or is
 * named here as a deliberate omission, and a link in llms.txt that no longer
 * prerenders fails the build.
 */

const BASE = "https://www.flystar.co.in";

/** Deliberately absent from llms.txt, with the reason. */
const OMITTED = new Set([
  // The home page is the file's own header and summary.
  "/",
  // Alias of a listed page.
  "/contact-us",
  // Legacy keyword URLs kept alive for inbound links; each renders a page that
  // is already listed under its canonical address. Listing them again would be
  // the ceremonial expansion the campaign refuses.
  "/air-transport-pilots-license-atpl",
  "/best-atpl-classes-in-india",
  "/commercial-pilot-training",
  "/best-cpl-ground-classes",
  "/commercial-pilot-training-in-dwarka",
  "/courses-and-careers",
  "/pilot-course",
  "/top-aviation-courses-and-careers-after-12th",
  "/careers",
  "/dgca-ground-classes-training-classes",
  "/cpl-atpl-ground-classes-2",
  "/training-in-australia",
  "/training-in-south-africa",
  "/how-to-become-a-pilot",
  "/how-to-become-a-pilot-in-india-after-12th",
  "/guide-on-how-to-become-a-pilot",
  "/training-in-india/",
  "/how-to-become-a-pilot-in-india/",
  // Navigation surface, not content.
  "/sitemap",
  // Not for crawlers.
  "/admin/login",
  "/admin/blog",
]);

/** Linked from llms.txt but not pages, so absent from the sitemap by design. */
const NOT_PAGES = new Set(["/feed.xml", "/sitemap.xml", "/robots.txt", "/llms.txt"]);

const norm = (p: string) => (p.replace(/\/$/, "") || "/");

function routeMetaPaths(): string[] {
  const src = readFileSync("src/lib/routeMeta.ts", "utf8");
  return [...src.matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((m) => m[1]);
}

function llmsPaths(): string[] {
  const src = readFileSync("public/llms.txt", "utf8");
  return [...src.matchAll(new RegExp(`${BASE}(/[^)\\s]*)?`, "g"))].map((m) => norm(m[1] || "/"));
}

function sitemapPaths(): string[] {
  const src = readFileSync("public/sitemap.xml", "utf8");
  return [...src.matchAll(/<loc>https:\/\/www\.flystar\.co\.in([^<]*)<\/loc>/g)].map((m) => norm(m[1] || "/"));
}

describe("llms.txt", () => {
  it("lists every route in routeMeta, or names it as a deliberate omission", () => {
    const listed = new Set(llmsPaths());
    const missing = routeMetaPaths()
      .map(norm)
      .filter((p) => !listed.has(p) && !OMITTED.has(p) && !OMITTED.has(`${p}/`));
    expect(
      missing,
      `routes absent from public/llms.txt. Add a line for each, or add it to OMITTED with a reason: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  it("never advertises a URL that does not prerender", () => {
    const advertised = new Set(sitemapPaths());
    const dead = [...new Set(llmsPaths())].filter((p) => !advertised.has(p) && !NOT_PAGES.has(p));
    expect(dead, `llms.txt links URLs the sitemap does not carry, so they may 404: ${dead.join(", ")}`).toEqual([]);
  });

  it("keeps every OMITTED entry real, so the list cannot rot into an excuse", () => {
    const known = new Set(routeMetaPaths().map(norm));
    const stale = [...OMITTED].filter((p) => !known.has(norm(p)));
    expect(stale, `OMITTED names routes that no longer exist: ${stale.join(", ")}`).toEqual([]);
  });
});
