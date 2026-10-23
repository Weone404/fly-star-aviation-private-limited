import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  isIsolatedPreviewBlogApiOrigin,
  parseBlogApiOrigin,
  PRODUCTION_BACKEND_HOSTNAME,
} from "../../scripts/blogApiOrigin.mjs";

describe("blog API origin validation", () => {
  it("accepts safe HTTPS origins and rejects malformed origins", () => {
    expect(parseBlogApiOrigin("https://preview.example.invalid")).toBe("https://preview.example.invalid");
    expect(parseBlogApiOrigin("http://localhost:5000")).toBeNull();
    expect(parseBlogApiOrigin("******preview.example.invalid")).toBeNull();
  });

  it.each([
    "******preview.example.invalid",
    "https://preview.example.invalid/path",
    "https://preview.example.invalid?token=secret",
    "https://preview.example.invalid#token",
    "http://backend.example.invalid",
    "file:///tmp/backend",
  ])("rejects unsafe API URL %s without exposing it", (value) => {
    expect(parseBlogApiOrigin(value)).toBeNull();
  });

  it("rejects API URLs containing credentials", () => {
    expect(parseBlogApiOrigin("https://user@preview.example.invalid")).toBeNull();
  });

  it("uses the verified Production hostname to identify Preview API separation", () => {
    const previewApi = "https://preview.example.invalid";
    const productionApi = `https://${PRODUCTION_BACKEND_HOSTNAME}`;
    expect(isIsolatedPreviewBlogApiOrigin(previewApi)).toBe(true);
    expect(isIsolatedPreviewBlogApiOrigin(productionApi)).toBe(false);
  });

  it("blocks the known Production backend during a Preview build without extra origin variables", () => {
    const root = resolve(__dirname, "../..");
    const result = spawnSync(
      process.execPath,
      [resolve(root, "scripts/fetch-blogs.mjs")],
      {
        cwd: root,
        encoding: "utf8",
        env: {
          PATH: process.env.PATH || "",
          SystemRoot: process.env.SystemRoot || "",
          TEMP: process.env.TEMP || "",
          TMP: process.env.TMP || "",
          VERCEL_ENV: "preview",
          VITE_API_URL: `https://${PRODUCTION_BACKEND_HOSTNAME}`,
        },
      },
    );

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Preview blog API must be the isolated HTTPS backend origin");
    expect(result.stderr).not.toContain(PRODUCTION_BACKEND_HOSTNAME);
  });

  it("requires an explicit API origin instead of defaulting to Production", () => {
    const root = resolve(__dirname, "../..");
    const result = spawnSync(
      process.execPath,
      [resolve(root, "scripts/fetch-blogs.mjs")],
      {
        cwd: root,
        encoding: "utf8",
        env: {
          PATH: process.env.PATH || "",
          SystemRoot: process.env.SystemRoot || "",
          TEMP: process.env.TEMP || "",
          TMP: process.env.TMP || "",
        },
      },
    );

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("VITE_API_URL must be a valid HTTPS origin");
    expect(result.stderr).not.toContain("onrender.com");
  });

  it.each([
    ["missing", undefined],
    ["empty", ""],
    ["malformed", "not-a-url"],
    ["containing credentials", "https://user:pass@preview.example.invalid"],
    ["containing a path", "https://preview.example.invalid/api"],
    ["containing query data", "https://preview.example.invalid?token=fixture-secret"],
    ["containing a fragment", "https://preview.example.invalid#fragment"],
  ])("explains the required Preview API configuration when VITE_API_URL is %s", (_description, apiUrl) => {
    const root = resolve(__dirname, "../..");
    const result = spawnSync(
      process.execPath,
      [resolve(root, "scripts/fetch-blogs.mjs")],
      {
        cwd: root,
        encoding: "utf8",
        env: {
          PATH: process.env.PATH || "",
          SystemRoot: process.env.SystemRoot || "",
          TEMP: process.env.TEMP || "",
          TMP: process.env.TMP || "",
          VERCEL_ENV: "preview",
          ...(apiUrl === undefined ? {} : { VITE_API_URL: apiUrl }),
        },
      },
    );

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Preview builds require VITE_API_URL");
    expect(result.stderr).not.toContain("fixture-secret");
    expect(result.stderr).not.toContain("?token=");
  });

  it.each([
    ["malformed Preview origin", "not-a-url", "https://production.example.invalid"],
    ["malformed Production comparison origin", "https://preview.example.invalid", "not-a-url"],
    ["Production origin used for Preview", "https://production.example.invalid", "https://production.example.invalid"],
    ["Preview URL differs from the configured Preview origin", "https://other-preview.example.invalid", "https://production.example.invalid"],
  ])("rejects %s", (_description, previewOrigin, productionOrigin) => {
    const root = resolve(__dirname, "../..");
    const result = spawnSync(
      process.execPath,
      [resolve(root, "scripts/fetch-blogs.mjs")],
      {
        cwd: root,
        encoding: "utf8",
        env: {
          PATH: process.env.PATH || "",
          SystemRoot: process.env.SystemRoot || "",
          TEMP: process.env.TEMP || "",
          TMP: process.env.TMP || "",
          VERCEL_ENV: "preview",
          VITE_API_URL: "https://preview.example.invalid",
          PREVIEW_BACKEND_API_ORIGIN: previewOrigin,
          ...(productionOrigin === undefined ? {} : { PRODUCTION_BACKEND_API_ORIGIN: productionOrigin }),
        },
      },
    );

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(/Preview builds require|Preview blog API must be the isolated HTTPS backend origin/);
    expect(result.stderr).not.toContain("https://preview.example.invalid");
    expect(result.stderr).not.toContain("https://production.example.invalid");
  });

  it("rejects a VITE_API_URL that points away from the isolated Preview origin", () => {
    const root = resolve(__dirname, "../..");
    const result = spawnSync(
      process.execPath,
      [resolve(root, "scripts/fetch-blogs.mjs")],
      {
        cwd: root,
        encoding: "utf8",
        env: {
          PATH: process.env.PATH || "",
          SystemRoot: process.env.SystemRoot || "",
          TEMP: process.env.TEMP || "",
          TMP: process.env.TMP || "",
          VERCEL_ENV: "preview",
          VITE_API_URL: "https://production.example.invalid",
          PREVIEW_BACKEND_API_ORIGIN: "https://preview.example.invalid",
          PRODUCTION_BACKEND_API_ORIGIN: "https://production.example.invalid",
        },
      },
    );

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Preview blog API must be the isolated HTTPS backend origin");
    expect(result.stderr).not.toContain("https://production.example.invalid");
  });

  it("requires VITE_API_URL for the manual blog approval tool", () => {
    const root = resolve(__dirname, "../..");
    const result = spawnSync(
      process.execPath,
      [resolve(root, "scripts/approve-blog.mjs"), "--list"],
      {
        cwd: root,
        encoding: "utf8",
        env: {
          PATH: process.env.PATH || "",
          SystemRoot: process.env.SystemRoot || "",
          TEMP: process.env.TEMP || "",
          TMP: process.env.TMP || "",
        },
      },
    );

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("VITE_API_URL must be configured");
    expect(result.stderr).not.toContain("onrender.com");
  });

  it("rejects a Production origin in the manual tool during a Preview build", () => {
    const root = resolve(__dirname, "../..");
    const result = spawnSync(
      process.execPath,
      [resolve(root, "scripts/approve-blog.mjs"), "--list"],
      {
        cwd: root,
        encoding: "utf8",
        env: {
          PATH: process.env.PATH || "",
          SystemRoot: process.env.SystemRoot || "",
          TEMP: process.env.TEMP || "",
          TMP: process.env.TMP || "",
          VERCEL_ENV: "preview",
          VITE_API_URL: "https://production.example.invalid",
          PREVIEW_BACKEND_API_ORIGIN: "https://preview.example.invalid",
          PRODUCTION_BACKEND_API_ORIGIN: "https://production.example.invalid",
        },
      },
    );

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Preview blog API must be the isolated HTTPS backend origin");
    expect(result.stderr).not.toContain("https://production.example.invalid");
  });
});
