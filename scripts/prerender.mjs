/**
 * Post-build prerenderer.
 *
 * Serves the built `dist/` with `vite preview`, visits every URL in
 * `dist/sitemap.xml` with a headless browser, waits for React + the useMeta
 * hook to finish, and writes the fully-rendered HTML back to
 * `dist/<route>/index.html`. Vercel serves those static files directly (the
 * SPA catch-all rewrite only fires when no file matches), so crawlers and
 * social/AI bots get real per-page HTML with the correct title, description,
 * canonical, Open Graph tags and rendered content — no JS required.
 *
 * Chromium resolution order:
 *   1. PUPPETEER_EXECUTABLE_PATH env var
 *   2. A Playwright-managed Chromium (~/Library/Caches/ms-playwright/...)
 *   3. Common system Chrome/Chromium locations
 * For CI (e.g. Vercel) set PUPPETEER_EXECUTABLE_PATH or run
 * `npx playwright install chromium` before this script.
 */
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = Number(process.env.PRERENDER_PORT || 4180);
const ORIGIN = `http://localhost:${PORT}`;

function findLocalChromium() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;

  // Playwright cache (macOS/Linux)
  const pwRoots = [
    join(homedir(), "Library/Caches/ms-playwright"),
    join(homedir(), ".cache/ms-playwright"),
  ];
  for (const base of pwRoots) {
    if (!existsSync(base)) continue;
    const dirs = readdirSync(base).filter((d) => d.startsWith("chromium")).sort().reverse();
    for (const d of dirs) {
      const candidates = [
        join(base, d, "chrome-mac/Chromium.app/Contents/MacOS/Chromium"),
        join(base, d, "chrome-linux/chrome"),
      ];
      for (const c of candidates) if (existsSync(c)) return c;
    }
  }

  // System installs
  const system = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];
  for (const c of system) if (existsSync(c)) return c;
  return null;
}

/**
 * Resolve a launch config. Prefers a local Chromium (dev machines); falls back
 * to @sparticuz/chromium — a Chromium built for minimal serverless Linux
 * (Vercel/Lambda) that runs without extra system libraries. Returns null if no
 * browser can be provisioned.
 */
async function resolveLauncher() {
  const local = findLocalChromium();
  if (local) {
    return {
      source: local,
      executablePath: local,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    };
  }
  try {
    const chromium = (await import("@sparticuz/chromium")).default;
    chromium.setGraphicsMode = false; // no WebGL needed for prerender; saves memory
    const executablePath = await chromium.executablePath();
    if (!executablePath) return null;
    return {
      source: "@sparticuz/chromium",
      executablePath,
      args: chromium.args,
      headless: chromium.headless,
    };
  } catch {
    return null;
  }
}

function routesFromSitemap() {
  const xml = readFileSync(join(DIST, "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  // keep only same-site paths, dedupe
  const paths = new Set();
  for (const loc of locs) {
    try {
      const u = new URL(loc);
      paths.add(u.pathname.replace(/\/+$/, "") || "/");
    } catch { /* ignore */ }
  }
  return [...paths];
}

function outputPathFor(route) {
  if (route === "/") return join(DIST, "index.html");
  return join(DIST, route.replace(/^\//, ""), "index.html");
}

async function waitForPreview(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  return false;
}

async function main() {
  const launcher = await resolveLauncher();
  if (!launcher) {
    console.warn(
      "\n[prerender] No Chromium available (no local browser and @sparticuz/chromium failed). " +
        "Skipping prerender — the SPA build still deploys normally.\n"
    );
    return; // graceful: do not fail the build
  }
  console.log(`[prerender] Using Chromium: ${launcher.source}`);

  // Render "/" LAST. Writing dist/index.html early would turn the home
  // snapshot into the SPA-fallback shell for every later route, leaking
  // home's Helmet canonical/OG (data-rh) tags into other pages.
  const routes = routesFromSitemap().sort((a, b) => (a === "/" ? 1 : b === "/" ? -1 : 0));
  console.log(`[prerender] ${routes.length} routes from sitemap.xml`);

  // Serve the build (SPA fallback so every route returns index.html)
  const preview = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort"],
    { cwd: ROOT, stdio: "ignore" }
  );

  const cleanup = () => { try { preview.kill(); } catch { /* noop */ } };
  process.on("exit", cleanup);
  process.on("SIGINT", () => { cleanup(); process.exit(1); });

  if (!(await waitForPreview(ORIGIN))) {
    console.error("[prerender] vite preview did not start");
    cleanup();
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: launcher.executablePath,
    headless: launcher.headless,
    args: launcher.args,
  });

  let ok = 0;
  let failed = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: "networkidle0", timeout: 45000 });
      // Wait until React has mounted content into #root
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          return root && root.children.length > 0;
        },
        { timeout: 15000 }
      ).catch(() => {});
      // Give the useMeta hook a beat to set canonical/OG after its fetch
      await new Promise((r) => setTimeout(r, 600));

      // Remove the initial loading spinner from the snapshot
      await page.evaluate(() => {
        document.getElementById("initial-loader")?.remove();
      });

      const html = await page.content();
      const out = outputPathFor(route);
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, html, "utf8");
      console.log(`[prerender] ✓ ${route} -> ${out.replace(DIST + "/", "dist/")}`);
      ok++;
    } catch (err) {
      console.warn(`[prerender] ✗ ${route}: ${err.message}`);
      failed++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  cleanup();
  console.log(`\n[prerender] done: ${ok} rendered, ${failed} failed`);
  if (failed > 0 && ok === 0) process.exit(1);
}

main().catch((e) => {
  console.error("[prerender] fatal:", e);
  process.exit(1);
});
