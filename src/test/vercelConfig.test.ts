import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getRouteMeta } from "../lib/routeMeta";
import { ALIAS_CANONICAL } from "../lib/routes";

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

function loadRedirects() {
  const configPath = resolve(__dirname, "../../vercel.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  return Array.isArray(config.redirects) ? config.redirects : [];
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
    "/apply",
    "/courses/cpl/fees",
    "/atpl/brochure",
    "/pilot-salary-india",
    "/cadet-pilot-programme",
    "/dgca/fto-ranking",
    "/dgca/exam-calendar",
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

  it("permanently redirects the salary alias to the canonical page before filesystem handling", () => {
    const routes = loadRoutes();
    const redirectRules = loadRedirects();
    const aliasRedirects = redirectRules.filter(
      (redirect) => redirect && redirect.source === "/pilot-salary-in-india",
    );
    const [redirect] = aliasRedirects;

    expect(aliasRedirects).toHaveLength(1);
    expect(redirectRules.indexOf(redirect)).toBe(0);
    expect(redirect?.permanent).toBe(true);
    expect(new URL(redirect?.destination).pathname).toBe("/pilot-salary-india");
    expect(new URL(redirect?.destination).origin).toBe("https://www.flystar.co.in");
    expect(new URL(getRouteMeta("/pilot-salary-india").canonical).pathname).toBe(
      new URL(redirect?.destination).pathname,
    );
    expect(ALIAS_CANONICAL["/pilot-salary-in-india"]).toBe(
      new URL(redirect?.destination).pathname,
    );
    expect(getRouteMeta("/pilot-salary-in-india").canonical).toBe(
      "https://www.flystar.co.in/pilot-salary-india",
    );
    expect(getRouteMeta("/pilot-salary-in-india").ogUrl).toBe(
      "https://www.flystar.co.in/pilot-salary-india",
    );
    expect(
      loadRedirects().some(
        (rule) =>
          rule &&
          rule.source === "/pilot-salary-india" &&
          new URL(rule.destination).pathname === new URL(redirect.destination).pathname,
      ),
    ).toBe(false);
    expect(matchesSpa("/pilot-salary-in-india")).toBe(false);

    const routeMeta = readFileSync(resolve(__dirname, "../lib/routeMeta.ts"), "utf8");
    const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
    const llms = readFileSync(resolve(__dirname, "../../public/llms.txt"), "utf8");
    expect(routeMeta).not.toMatch(/^\s*"\/pilot-salary-in-india":\s*\{/m);
    expect(sitemap).not.toContain("https://www.flystar.co.in/pilot-salary-in-india");
    expect(llms).not.toContain("https://www.flystar.co.in/pilot-salary-in-india");
    expect(sitemap).toContain("https://www.flystar.co.in/pilot-salary-india");
    expect(llms).toContain("https://www.flystar.co.in/pilot-salary-india");
    expect(routes.some((route) => route && route.src === "/(.*)" && route.status === 404)).toBe(
      true,
    );
  });

  it("permanently redirects apex requests to HTTPS www without creating a loop", () => {
    const apexRules = loadRedirects().filter(
      (redirect) =>
        redirect &&
        redirect.has?.some(
          (condition) =>
            condition.type === "host" && condition.value === "flystar.co.in",
        ),
    );

    expect(apexRules).toHaveLength(1);
    expect(apexRules[0].source).toBe("/:path*");
    expect(apexRules[0].destination).toBe(
      "https://www.flystar.co.in/:path*",
    );
    expect(apexRules[0].permanent).toBe(true);
    expect(
      loadRedirects().some(
        (redirect) =>
          redirect &&
          redirect.destination === apexRules[0].destination &&
          redirect.has?.some(
            (condition) =>
              condition.type === "host" && condition.value === "www.flystar.co.in",
          ) &&
          !redirect.has?.some(
            (condition) =>
              condition.type === "header" &&
              condition.key.toLowerCase() === "x-forwarded-proto" &&
              condition.value === "http",
          ),
      ),
    ).toBe(false);
  });

  it("permanently upgrades HTTP www requests without matching HTTPS www requests", () => {
    const httpWwwRules = loadRedirects().filter(
      (redirect) =>
        redirect &&
        redirect.has?.some(
          (condition) =>
            condition.type === "host" && condition.value === "www.flystar.co.in",
        ) &&
        redirect.has?.some(
          (condition) =>
            condition.type === "header" &&
            condition.key.toLowerCase() === "x-forwarded-proto" &&
            condition.value === "http",
        ),
    );

    expect(httpWwwRules).toHaveLength(1);
    expect(httpWwwRules[0].source).toBe("/:path*");
    expect(httpWwwRules[0].destination).toBe(
      "https://www.flystar.co.in/:path*",
    );
    expect(httpWwwRules[0].permanent).toBe(true);
    expect(httpWwwRules[0].has).toHaveLength(2);
  });
});
