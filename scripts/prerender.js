import fs from "fs";
import path from "path";
import http from "http";
import serveHandler from "serve-handler";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { fileURLToPath } from "url";
import { getBlogRoutes } from "../src/lib/blogData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, "../dist");
const ROUTE_META_PATH = path.resolve(__dirname, "../src/lib/routeMeta.ts");
const SERVER_PORT = Number(process.env.PRERENDER_PORT || 4173);

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadRoutes() {
  const fileContent = fs.readFileSync(ROUTE_META_PATH, "utf-8");
  const routeMatch = fileContent.match(/const routeMeta: Record<string, RouteMeta> = \{([\s\S]*?)\};/m);
  if (!routeMatch) {
    throw new Error("Could not parse routeMeta from src/lib/routeMeta.ts");
  }

  const routes = new Set(["/"]);

  const routeLines = routeMatch[1].split("\n");
  for (const line of routeLines) {
    const trimmed = line.trim();
    const match = trimmed.match(/^"([^"]+)":\s*\{/);
    if (match) {
      const route = match[1];
      if (route !== "/") {
        routes.add(route);
      }
    }
  }

  for (const route of getBlogRoutes()) {
    routes.add(route);
  }

  return Array.from(routes).sort();
}

async function prerender() {
  const routes = loadRoutes();

  const server = http.createServer((req, res) => {
    return serveHandler(req, res, { public: DIST_DIR, rewrites: [{ source: "**", destination: "/index.html" }] });
  });

  await new Promise((resolve, reject) => {
    server.listen(SERVER_PORT, (err) => {
      if (err) reject(err);
      console.log(`Static server running at http://localhost:${SERVER_PORT}`);
      resolve(undefined);
    });
  });

  const isWindows = process.platform === "win32";
  // When PRERENDER_EXECUTABLE_PATH is set we are driving a stock Chrome/Chromium
  // (CI, or a local dev machine). @sparticuz/chromium's args are tuned for its
  // OWN bundled binary — they include --single-process and custom GL/font paths
  // that make a stock build exit during startup, which surfaces as
  // "Protocol error (Target.setDiscoverTargets): Target closed" before a single
  // route renders. Only pass those args alongside the binary they belong to.
  const externalBinary = Boolean(process.env.PRERENDER_EXECUTABLE_PATH);
  const chromiumPath = process.env.PRERENDER_EXECUTABLE_PATH || (isWindows ? null : await chromium.executablePath());
  const launchArgs = externalBinary
    ? ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
    : chromium.args;

  if (isWindows && !chromiumPath) {
    console.log(
      "Skipping prerender on Windows local build. Set PRERENDER_EXECUTABLE_PATH to a local Chrome/Chromium binary to enable prerender on Windows."
    );
    server.close();
    return;
  }

  // Two ways to get a browser, tried in order. CI provides a stock Chrome via
  // PRERENDER_EXECUTABLE_PATH; if that binary refuses to start we fall back to
  // the bundled @sparticuz build with its own args, which is a matched pair and
  // is what a local build uses. Either works, so a runner-image change cannot
  // silently break publishing again.
  async function launchBrowser() {
    const attempts = externalBinary
      ? [
          { label: "external", executablePath: chromiumPath, args: launchArgs },
          { label: "bundled", executablePath: await chromium.executablePath(), args: chromium.args },
        ]
      : [{ label: "bundled", executablePath: chromiumPath, args: chromium.args }];

    let lastError;
    for (const attempt of attempts) {
      try {
        const browser = await puppeteer.launch({
          executablePath: attempt.executablePath || undefined,
          headless: true,
          args: attempt.args,
          defaultViewport: chromium.defaultViewport,
        });
        console.log(`Prerendering with ${attempt.label} Chromium at ${attempt.executablePath}`);
        return browser;
      } catch (error) {
        lastError = error;
        console.warn(
          `Chromium (${attempt.label}) failed to launch: ${String(error).split("\n")[0]}`
        );
      }
    }
    throw lastError;
  }

  const browser = await launchBrowser();
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:${SERVER_PORT}${route}`;
    console.log(`Prerendering ${url}`);
    await page.goto(url, { waitUntil: ["networkidle2"] });
    await page.waitForSelector("body", { timeout: 10000 });

    const html = await page.content();

    const outputDir = path.join(DIST_DIR, route.replace(/^\//, ""));
    const outputFile = path.join(outputDir, "index.html");
    ensureDirectoryExists(outputFile);
    fs.writeFileSync(outputFile, html, "utf-8");
  }

  await browser.close();
  server.close();
  console.log("Prerender complete.");
}

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
