/**
 * Post-deploy smoke check: every URL in sitemap.xml must return HTTP 200.
 *
 * This is the check that would have caught the 2026-09-04 defect on the day it
 * shipped instead of weeks later — fifteen advertised URLs were returning 404 to
 * Google and to every AI crawler, and nothing in the pipeline was looking.
 *
 * Run it against production after a deploy:
 *   node scripts/smoke.mjs
 *   node scripts/smoke.mjs --base https://staging.example.com
 *
 * Exits non-zero if anything is not 200, so CI can gate on it.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://www.flystar.co.in";

const baseArg = process.argv.indexOf("--base");
const BASE = (baseArg > -1 ? process.argv[baseArg + 1] : process.env.SMOKE_BASE_URL || ORIGIN).replace(/\/$/, "");
const CONCURRENCY = Number(process.env.SMOKE_CONCURRENCY || 6);
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS || 20000);

/** Redirect sources declared in vercel.json — these must 3xx, not 200. */
function expectedRedirects() {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
  return (config.routes || [])
    .filter((r) => r && typeof r.src === "string" && r.status >= 300 && r.status < 400)
    .map((r) => r.src)
    .filter((src) => /^\/[A-Za-z0-9/_-]+$/.test(src));
}

function sitemapPaths() {
  const xml = fs.readFileSync(path.join(ROOT, "public/sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, "") || "/");
}

async function check(url, { expectRedirect = false } = {}) {
  try {
    const res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "flystar-smoke/1.0" },
    });
    const ok = expectRedirect ? res.status >= 300 && res.status < 400 : res.status === 200;
    return { url, status: res.status, ok };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.message };
  }
}

async function pool(items, worker) {
  const results = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (i < items.length) results.push(await worker(items[i++]));
    })
  );
  return results;
}

/**
 * Cross-check the sitemap against the build's own blog report.
 *
 * The blog fetch fails soft, so a build where /api/blogs was unreachable still
 * succeeds — it just quietly ships fewer blog URLs. Smoke alone cannot catch
 * that: it only checks URLs that ARE in the sitemap, never the ones that should
 * have been. This is the check for the missing ones.
 */
function blogCountCheck() {
  const reportPath = path.join(ROOT, "blog-gate-report.json");
  if (!fs.existsSync(reportPath)) {
    console.warn("[smoke] no blog-gate-report.json — run a build first to cross-check blog counts");
    return true;
  }
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const inSitemap = sitemapPaths().filter((p) => p.startsWith("/blog/")).length;

  if (report.outcome === "fetch-failed") {
    console.error(`[smoke] FAIL the last build could not reach ${report.api} (${report.error}).`);
    console.error("[smoke]      Blog posts may be missing from the sitemap. Rebuild once the API is up.");
    return false;
  }

  const staticWithSlug = inSitemap - (report.merged ?? 0);
  console.log(`[smoke] blog URLs in sitemap: ${inSitemap} (${report.merged ?? 0} from the API, ${staticWithSlug} committed)`);

  if (staticWithSlug < 0) {
    console.error("[smoke] FAIL sitemap has fewer blog URLs than the build reported merging.");
    return false;
  }
  return true;
}

async function main() {
  const paths = sitemapPaths();
  const redirects = expectedRedirects();
  console.log(`[smoke] ${BASE} — ${paths.length} sitemap URLs, ${redirects.length} expected redirects`);

  const pageResults = await pool(paths, (p) => check(`${BASE}${p}`));
  const redirectResults = await pool(redirects, (p) => check(`${BASE}${p}`, { expectRedirect: true }));

  const countsOk = blogCountCheck();
  const failures = [...pageResults, ...redirectResults].filter((r) => !r.ok);

  for (const f of failures) {
    console.error(`[smoke] FAIL ${f.status || "ERR"} ${f.url}${f.error ? ` — ${f.error}` : ""}`);
  }

  if (failures.length || !countsOk) {
    console.error(`\n[smoke] ${failures.length} of ${paths.length + redirects.length} URL checks failed${countsOk ? "" : ", and the blog count cross-check failed"}.`);
    process.exit(1);
  }
  console.log(`[smoke] All ${paths.length + redirects.length} checks passed.`);
}

main();
