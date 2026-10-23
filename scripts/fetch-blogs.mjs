/**
 * Build-time blog fetch.
 *
 * Posts written through /admin/blog live in MongoDB and are served by
 * /api/blogs. Until this script existed, `scripts/prerender.js` only knew about
 * the posts hardcoded in `src/lib/blogData.js`, so an admin-published post got
 * no static file, no meta tags and no sitemap entry — visible to a human via the
 * runtime fetch in BlogDetail.tsx, invisible to Google and every AI crawler.
 *
 * This runs BEFORE `vite build` (see the `prebuild` script). It writes
 * `src/lib/blogData.remote.js`, which `blogData.js` merges into BLOG_POSTS, so
 * routeMeta, the schema builder, the prerender route list and the generated
 * sitemap all see one set of posts.
 *
 * FAILS SOFT. If the API is unreachable — Render cold start, deploy-time
 * outage, no network — the previously generated file is left in place and the
 * build continues with whatever it already had. A blog outage must never break
 * a deploy of the whole site.
 *
 * Every post passes a quality gate before it is allowed into the sitemap; see
 * `blog-gate.json`. The gate exists because the database already contained a
 * post with an SEO-spam block in it.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { partition } from "./blogGate.mjs";
import { readApprovals } from "./approvals.mjs";
import { isIsolatedPreviewBlogApiOrigin, parseBlogApiOrigin } from "./blogApiOrigin.mjs";
import { sanitizePostFields } from "./sanitize.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src/lib/blogData.remote.js");
const REPORT = path.join(ROOT, "blog-gate-report.json");
const GATE = path.join(ROOT, "blog-gate.json");

const PREVIEW_BUILD = process.env.VERCEL_ENV === "preview";
const API = process.env.VITE_API_URL;
const API_ORIGIN = parseBlogApiOrigin(API);
const TIMEOUT_MS = Number(process.env.BLOG_FETCH_TIMEOUT_MS || 45000);

if (!API_ORIGIN) {
  console.error(
    PREVIEW_BUILD
      ? "[fetch-blogs] Preview builds require VITE_API_URL to be an HTTPS backend origin without credentials, path, query, or fragment."
      : "[fetch-blogs] VITE_API_URL must be a valid HTTPS origin without credentials, path, query, or fragment."
  );
  process.exit(1);
}

if (PREVIEW_BUILD) {
  const configuredPreviewOrigin = process.env.PREVIEW_BACKEND_API_ORIGIN;
  const productionApi = process.env.PRODUCTION_BACKEND_API_ORIGIN;
  if (!configuredPreviewOrigin || !productionApi) {
    console.error("[fetch-blogs] Preview builds require VITE_API_URL, PREVIEW_BACKEND_API_ORIGIN, and PRODUCTION_BACKEND_API_ORIGIN.");
    process.exit(1);
  }
  if (!isIsolatedPreviewBlogApiOrigin(API_ORIGIN, configuredPreviewOrigin, productionApi)) {
    console.error("[fetch-blogs] Preview blog API must be the isolated HTTPS backend origin.");
    process.exit(1);
  }
}

const gate = JSON.parse(fs.readFileSync(GATE, "utf8"));
const approvals = readApprovals(ROOT);

async function main() {
  let posts;
  try {
    const res = await fetch(`${API_ORIGIN}/api/blogs`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    posts = await res.json();
    if (!Array.isArray(posts)) throw new Error("response was not an array");
  } catch (err) {
    // A fetch failure and a gate rejection are completely different events and
    // must never look alike in a build log. Silence here is how a post quietly
    // stops being published without anyone noticing.
    const kept = fs.existsSync(OUT);
    console.warn("");
    console.warn("  ############################################################");
    console.warn(
      PREVIEW_BUILD
        ? "  #  PREVIEW BLOG FETCH FAILED — BUILD STOPPED              #"
        : "  #  BLOG FETCH FAILED — sitemap may be missing blog posts   #"
    );
    console.warn("  ############################################################");
    console.warn(`  #  API origin: ${API_ORIGIN}`);
    console.warn("  #  Reason: request failed or returned an invalid response");
    console.warn(
      PREVIEW_BUILD
        ? `  #  Action: ${kept ? "left prior generated data untouched" : "left generated data absent"}`
        : `  #  Action: ${kept ? "kept the previously generated file" : "wrote an empty remote set"}`
    );
    if (!PREVIEW_BUILD) {
      console.warn("  #  The build CONTINUES — static posts are unaffected.");
    }
    console.warn("  ############################################################");
    console.warn("");

    if (!PREVIEW_BUILD && !kept) {
      fs.writeFileSync(OUT, emit([], "API unreachable and no previous file existed"));
    }

    fs.writeFileSync(
      REPORT,
      JSON.stringify(
        {
          fetchedAt: new Date().toISOString(),
          api: API_ORIGIN,
          outcome: "fetch-failed",
          error: "request-failed",
          keptPreviousFile: kept,
          buildBlocked: PREVIEW_BUILD,
          total: null,
          merged: null,
          accepted: [],
          rejected: [],
          drifted: [],
        },
        null,
        2
      ) + "\n"
    );
    if (PREVIEW_BUILD) {
      process.exitCode = 1;
      return;
    }
    return;
  }

  const { accepted, rejected, drifted, missing } = partition(posts, gate, approvals);
  const clean = accepted.map(sanitizePostFields);

  fs.writeFileSync(OUT, emit(clean, `fetched ${posts.length}, approved and merged ${clean.length}`));
  fs.writeFileSync(
    REPORT,
    JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        api: API_ORIGIN,
        outcome: "ok",
        total: posts.length,
        merged: clean.length,
        accepted: clean.map((p) => p.slug),
        rejected,
        drifted,
        missing,
      },
      null,
      2
    ) + "\n"
  );

  console.log(`[fetch-blogs] ${posts.length} fetched, ${clean.length} approved and merged, ${rejected.length} held back.`);
  for (const r of rejected) console.log(`[fetch-blogs]   held back: ${r.slug || r.id} — ${r.reason}`);

  // Content drift on an APPROVED post is the one condition that fails the build.
  // An approval pins specific text; if the text changed, the approval no longer
  // describes what would be published.
  if (missing.length) {
    console.error("");
    console.error("  ############################################################");
    console.error("  #  APPROVED POST HAS DISAPPEARED — BUILD STOPPED           #");
    console.error("  ############################################################");
    for (const m of missing) console.error(`  #  ${m.slug}  (approved ${m.approvedOn})`);
    console.error("  #");
    console.error("  #  It was approved but is no longer returned by /api/blogs.");
    console.error("  #  If you deleted it on purpose, remove its entry from");
    console.error("  #    src/lib/blogApproval.ts");
    console.error("  #  and commit. If you did NOT delete it, check the backend");
    console.error("  #  request logs before doing anything else.");
    console.error("  ############################################################");
    console.error("");
    process.exit(1);
  }

  if (drifted.length) {
    console.error("");
    console.error("  ############################################################");
    console.error("  #  APPROVED POST CHANGED SINCE APPROVAL — BUILD STOPPED    #");
    console.error("  ############################################################");
    for (const d of drifted) {
      console.error(`  #  ${d.slug}`);
      console.error(`  #    approved sha256: ${d.approved}`);
      console.error(`  #    current  sha256: ${d.current}`);
    }
    console.error("  #");
    console.error("  #  If you made this edit: re-read the post, then run");
    console.error("  #    npm run blogs:approve -- <slug>");
    console.error("  #  and commit src/lib/blogApproval.ts.");
    console.error("  #  If you did NOT make this edit, do not re-approve it.");
    console.error("  ############################################################");
    console.error("");
    process.exit(1);
  }
}

function emit(posts, note) {
  return `// GENERATED by scripts/fetch-blogs.mjs — do not edit by hand.
// ${note}
// Generated ${new Date().toISOString()}
export const REMOTE_BLOG_POSTS = ${JSON.stringify(posts, null, 2)};
`;
}

main();
