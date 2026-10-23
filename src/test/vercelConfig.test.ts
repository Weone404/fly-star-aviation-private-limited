import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { once } from "node:events";
import { PassThrough, Readable } from "node:stream";
import { describe, expect, it, vi } from "vitest";
import { BLOG_POSTS } from "../lib/blogData.js";
import { getRouteMeta } from "../lib/routeMeta";
import { ALIAS_CANONICAL } from "../lib/routes";
import backendProxy, { createBackendProxyHandler } from "../../api/backend-api/[...path].js";

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
  it("serves prerendered files and sends unmatched routes to a genuine 404", () => {
    const routes = loadRoutes();
    const filesystemIndex = routes.findIndex((route) => route?.handle === "filesystem");
    const notFoundIndex = routes.findIndex((route) => route?.src === "/(.*)" && route.status === 404);

    expect(filesystemIndex).toBeGreaterThanOrEqual(0);
    expect(notFoundIndex).toBeGreaterThan(filesystemIndex);
    expect(notFoundIndex).toBe(routes.length - 1);
    expect(routes.filter((route) => route?.dest === "/index.html")).toEqual([]);
  });

  it("redirects only known legacy blog IDs to their canonical slugs", () => {
    const routes = loadRoutes();
    const filesystemIndex = routes.findIndex((route) => route?.handle === "filesystem");
    const bySource = new Map(routes.map((route) => [route.src, route]));
    const legacyPosts = BLOG_POSTS.filter((post) => post._id && post.slug);
    expect(legacyPosts).toHaveLength(BLOG_POSTS.filter((post) => post._id).length);

    for (const post of legacyPosts) {
      expect(bySource.get(`/blogs/${post._id}`)).toEqual({
        src: `/blogs/${post._id}`,
        status: 308,
        dest: `/blog/${post.slug}`,
      });
      expect(routes.findIndex((route) => route.src === `/blogs/${post._id}`)).toBeLessThan(filesystemIndex);
    }

    for (const id of ["19", "999999", "not-an-id"]) {
      expect(bySource.has(`/blogs/${id}`)).toBe(false);
    }
    expect(routes.some((route) => route.src === "/blogs/([0-9]+)")).toBe(false);
  });

  it("keeps the API pass-through ahead of the terminal 404", () => {
    const routes = loadRoutes();
    const apiIndex = routes.findIndex((route) => route?.src === "/api/(.*)");
    const notFoundIndex = routes.findIndex((route) => route?.src === "/(.*)" && route.status === 404);

    expect(routes[apiIndex]).toEqual({ src: "/api/(.*)", dest: "/api/$1" });
    expect(apiIndex).toBeGreaterThanOrEqual(0);
    expect(apiIndex).toBeLessThan(notFoundIndex);
  });

  it("routes browser admin API requests through the preview-guarded function", () => {
    const routes = loadRoutes();
    const proxyIndex = routes.findIndex((route) => route?.src === "/backend-api/(.*)");
    const filesystemIndex = routes.findIndex((route) => route?.handle === "filesystem");

    expect(routes[proxyIndex]).toEqual({
      src: "/backend-api/(.*)",
      dest: "/api/backend-api/$1",
    });
    expect(proxyIndex).toBeGreaterThanOrEqual(0);
    expect(proxyIndex).toBeLessThan(filesystemIndex);
  });

  it("blocks backend API requests on Vercel preview deployments", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    const response = {
      statusCode: 0,
      body: undefined as unknown,
      status(status: number) {
        this.statusCode = status;
        return this;
      },
      json(body: unknown) {
        this.body = body;
        return this;
      },
    };

    try {
      backendProxy(
        {
          method: "GET",
          query: { path: ["api", "admin", "session"] },
          headers: {},
          url: "/api/backend-api/api/admin/session",
        },
        response,
      );

      expect(response.statusCode).toBe(503);
      expect(response.body).toEqual({ error: "Backend API is not configured for this deployment." });
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("preserves proxy methods, query, body, cookies, and status", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("PREVIEW_BACKEND_API_ORIGIN", "https://isolated-preview.onrender.com");
    vi.stubEnv("PRODUCTION_BACKEND_API_ORIGIN", "https://production.example");
    let requestOptions: Record<string, unknown> | undefined;
    let requestBody = "";
    const outgoing = new PassThrough() as PassThrough & {
      setTimeout: (timeout: number, callback: () => void) => void;
    };
    outgoing.setTimeout = vi.fn();
    outgoing.on("data", (chunk: Buffer) => { requestBody += chunk.toString(); });

    const mockedRequest = (
      options: Record<string, unknown>,
      callback: (response: Readable & { statusCode: number; headers: Record<string, unknown> }) => void,
    ) => {
      requestOptions = options;
      const upstream = Object.assign(Readable.from(["upstream response"]), {
        statusCode: 202,
        headers: {
          "content-type": "text/plain",
          "set-cookie": ["session=redacted; HttpOnly", "preference=redacted; Path=/"],
        },
      });
      callback(upstream);
      return outgoing;
    };
    const incoming = Object.assign(Readable.from(["request body"]), {
      method: "POST",
      query: { path: ["api", "blogs"] },
      headers: {
        host: "preview.vercel.app",
        cookie: "session=redacted",
        "content-type": "text/plain",
      },
      url: "/api/backend-api/api/blogs?draft=1",
    });
    const response = Object.assign(new PassThrough(), {
      statusCode: 0,
      headers: {} as Record<string, unknown>,
      setHeader(name: string, value: unknown) {
        this.headers[name] = value;
      },
    });
    let responseBody = "";
    response.on("data", (chunk: Buffer) => { responseBody += chunk.toString(); });
    const responseFinished = once(response, "end");

    try {
      createBackendProxyHandler(mockedRequest)(incoming, response);
      await responseFinished;

      expect(requestOptions).toMatchObject({
        hostname: "isolated-preview.onrender.com",
        method: "POST",
        path: "/api/blogs?draft=1",
      });
      expect(requestOptions?.headers).toMatchObject({
        cookie: "session=redacted",
        "content-type": "text/plain",
      });
      expect(requestBody).toBe("request body");
      expect(response.statusCode).toBe(202);
      expect(response.headers["set-cookie"]).toEqual([
        "session=redacted; HttpOnly",
        "preference=redacted; Path=/",
      ]);
      expect(responseBody).toBe("upstream response");
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("refuses to route preview deployments to the production backend", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("PREVIEW_BACKEND_API_ORIGIN", "https://fly-star-aviation-private-limited.onrender.com");
    vi.stubEnv("PRODUCTION_BACKEND_API_ORIGIN", "https://fly-star-aviation-private-limited.onrender.com");
    const response = {
      statusCode: 0,
      status(status: number) {
        this.statusCode = status;
        return this;
      },
      json() {
        return this;
      },
    };
    const outboundRequest = vi.fn();

    try {
      createBackendProxyHandler(outboundRequest)(
        {
          method: "GET",
          query: { path: ["api", "blogs"] },
          headers: {},
          url: "/api/backend-api/api/blogs",
        },
        response,
      );

      expect(response.statusCode).toBe(503);
      expect(outboundRequest).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("requires distinct, explicit preview and production backend origins", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("PREVIEW_BACKEND_API_ORIGIN", "https://preview.example");
    vi.stubEnv("PRODUCTION_BACKEND_API_ORIGIN", "https://preview.example");
    const response = {
      statusCode: 0,
      status(status: number) {
        this.statusCode = status;
        return this;
      },
      json() {
        return this;
      },
    };
    const outboundRequest = vi.fn();

    try {
      createBackendProxyHandler(outboundRequest)(
        {
          method: "GET",
          query: { path: ["api", "blogs"] },
          headers: {},
          url: "/api/backend-api/api/blogs",
        },
        response,
      );
      expect(response.statusCode).toBe(503);
      expect(outboundRequest).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllEnvs();
    }
  });

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
