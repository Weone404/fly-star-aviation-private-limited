import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseBlogApiOrigin } from "../../scripts/blogApiOrigin.mjs";

describe("blog API origin validation", () => {
  it("accepts safe origins and rejects malformed origins", () => {
    expect(parseBlogApiOrigin("https://preview.example.invalid")).toBe("https://preview.example.invalid");
    expect(parseBlogApiOrigin("http://localhost:5000")).toBe("http://localhost:5000");
    expect(parseBlogApiOrigin("http://localhost:5000", { requireHttps: true })).toBeNull();
    expect(parseBlogApiOrigin("https://user:password@preview.example.invalid")).toBeNull();
  });

  it.each([
    "https://user:password@preview.example.invalid",
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
    expect(result.stderr).toContain("API must be a valid origin");
    expect(result.stderr).not.toContain("onrender.com");
  });
});
