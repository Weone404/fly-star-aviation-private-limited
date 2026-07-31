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
  const chromiumPath = process.env.PRERENDER_EXECUTABLE_PATH || (isWindows ? null : await chromium.executablePath());

  if (isWindows && !chromiumPath) {
    console.log(
      "Skipping prerender on Windows local build. Set PRERENDER_EXECUTABLE_PATH to a local Chrome/Chromium binary to enable prerender on Windows."
    );
    server.close();
    return;
  }

  const browser = await puppeteer.launch({
    executablePath: chromiumPath || undefined,
    headless: true,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
  });
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
