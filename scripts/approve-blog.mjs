/**
 * Approve a database-authored post for publication.
 *
 *   npm run blogs:approve -- <slug> [--note "why"]
 *   npm run blogs:approve -- --list
 *
 * Adds the slug to src/lib/blogApproval.ts and pins the sha256 of its content
 * as it exists right now. Until a slug appears there, the post is not
 * prerendered, not in the sitemap, and not rendered to visitors.
 *
 * Run this from a machine that can reach the API. Commit the changed file.
 *
 * Re-running it on an already-approved slug re-pins the hash — that is how you
 * clear a "content changed since approval" build failure after an edit you made
 * and reviewed on purpose.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readApprovals, writeApprovals } from "./approvals.mjs";
import { contentHash, tidySlug, plainWords } from "./blogGate.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = process.env.BLOG_API_URL || process.env.VITE_API_URL || "https://fly-star-aviation-private-limited.onrender.com";

const args = process.argv.slice(2);
const noteIdx = args.indexOf("--note");
const note = noteIdx > -1 ? args[noteIdx + 1] : undefined;
const slugArg = args.find((a) => !a.startsWith("--") && a !== note);

async function fetchPosts() {
  const res = await fetch(`${API}/api/blogs`, { signal: AbortSignal.timeout(60000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json)) throw new Error("response was not an array");
  return json;
}

async function main() {
  let posts;
  try {
    posts = await fetchPosts();
  } catch (err) {
    console.error(`Could not reach ${API}: ${err.message}`);
    console.error("Run this from a machine or network that can reach the blog API.");
    process.exit(1);
  }

  const approvals = readApprovals(ROOT);

  if (args.includes("--list") || !slugArg) {
    console.log(`\n${posts.length} posts in the database. ${approvals.length} approved.\n`);
    for (const p of posts) {
      const slug = tidySlug(p.slug);
      const current = contentHash(p.content);
      const approval = approvals.find((a) => a.slug === slug);
      const state = !approval ? "NOT APPROVED" : approval.sha256 === current ? "approved" : "CHANGED SINCE APPROVAL";
      console.log(`  [${state.padEnd(21)}] ${slug || "(no slug)"}  ${plainWords(p)}w  ${p.title || ""}`);
    }
    console.log("\nApprove one with:  npm run blogs:approve -- <slug>\n");
    return;
  }

  const wanted = tidySlug(slugArg);
  const post = posts.find((p) => tidySlug(p.slug) === wanted);
  if (!post) {
    console.error(`No post with slug "${wanted}". Run with --list to see what is there.`);
    process.exit(1);
  }

  const sha256 = contentHash(post.content);
  const existing = approvals.find((a) => a.slug === wanted);
  const next = approvals.filter((a) => a.slug !== wanted);
  next.push({ slug: wanted, sha256, approvedOn: new Date().toISOString().slice(0, 10), note });
  writeApprovals(ROOT, next);

  console.log(existing ? `Re-pinned "${wanted}".` : `Approved "${wanted}".`);
  if (existing && existing.sha256 !== sha256) {
    console.log(`  was: ${existing.sha256}`);
    console.log(`  now: ${sha256}`);
  }
  console.log(`  ${plainWords(post)} words · ${post.title}`);
  console.log("\nCommit src/lib/blogApproval.ts, then rebuild.");
}

main();
