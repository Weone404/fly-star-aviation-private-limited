import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

describe("Preview blog build fetch", () => {
  it("blocks the build and preserves prior generated data when the Preview API fails", () => {
    const sourceRoot = resolve(__dirname, "../..");
    const tempRoot = mkdtempSync(join(tmpdir(), "flystar-preview-fetch-"));
    const priorGeneratedData = "// existing generated fixture\nexport const REMOTE_BLOG_POSTS = [];\n";

    try {
      for (const file of [
        "scripts/fetch-blogs.mjs",
        "scripts/blogApiOrigin.mjs",
        "scripts/blogGate.mjs",
        "scripts/approvals.mjs",
        "scripts/sanitize.mjs",
        "blog-gate.json",
      ]) {
        const target = join(tempRoot, file);
        mkdirSync(resolve(target, ".."), { recursive: true });
        cpSync(join(sourceRoot, file), target);
      }

      const approvalPath = join(tempRoot, "src/lib/blogApproval.ts");
      const generatedPath = join(tempRoot, "src/lib/blogData.remote.js");
      mkdirSync(resolve(approvalPath, ".."), { recursive: true });
      writeFileSync(
        approvalPath,
        "export interface ApprovedPost { slug: string; sha256: string; approvedOn: string; }\nexport const APPROVED_POSTS: ApprovedPost[] = [\n];\n",
        "utf8",
      );
      writeFileSync(generatedPath, priorGeneratedData, "utf8");
      symlinkSync(join(sourceRoot, "node_modules"), join(tempRoot, "node_modules"), "junction");

      const preloadPath = join(tempRoot, "mock-fetch.mjs");
      writeFileSync(
        preloadPath,
        'globalThis.fetch = async () => { throw new Error("request failed https://preview.example.invalid/?token=fixture-secret"); };\n',
        "utf8",
      );

      const result = spawnSync(
        process.execPath,
        ["--import", pathToFileURL(preloadPath).href, join(tempRoot, "scripts/fetch-blogs.mjs")],
        {
          cwd: tempRoot,
          encoding: "utf8",
          env: {
            PATH: process.env.PATH || "",
            SystemRoot: process.env.SystemRoot || "",
            TEMP: process.env.TEMP || "",
            TMP: process.env.TMP || "",
            VERCEL_ENV: "preview",
            BLOG_API_URL: "https://preview.example.invalid",
            PREVIEW_BACKEND_API_ORIGIN: "https://preview.example.invalid",
            PRODUCTION_BACKEND_API_ORIGIN: "https://production.example.invalid",
          },
        },
      );

      expect(result.error).toBeUndefined();
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("PREVIEW BLOG FETCH FAILED — BUILD STOPPED");
      expect(result.stderr).toContain("https://preview.example.invalid");
      expect(result.stderr).not.toContain("fixture-secret");
      expect(result.stderr).not.toContain("?token=");
      expect(readFileSync(generatedPath, "utf8")).toBe(priorGeneratedData);

      const report = JSON.parse(readFileSync(join(tempRoot, "blog-gate-report.json"), "utf8"));
      expect(report).toMatchObject({
        api: "https://preview.example.invalid",
        outcome: "fetch-failed",
        error: "request-failed",
        keptPreviousFile: true,
        buildBlocked: true,
      });
    } finally {
      if (existsSync(tempRoot) && lstatSync(tempRoot).isDirectory()) {
        rmSync(tempRoot, { recursive: true, force: true });
      }
    }
  }, 15_000);
});
