/**
 * Read and write src/lib/blogApproval.ts from the build scripts.
 *
 * The approval list is a .ts file rather than JSON on purpose: the browser
 * bundle imports it too, so held-back posts stop rendering for visitors and not
 * only for crawlers. One list, one truth, both paths.
 */
import fs from "node:fs";
import path from "node:path";

const REL = "src/lib/blogApproval.ts";

export function approvalPath(root) {
  return path.join(root, REL);
}

/** Parse APPROVED_POSTS out of the TS source. */
export function readApprovals(root) {
  const src = fs.readFileSync(approvalPath(root), "utf8");
  const block = src.match(/export const APPROVED_POSTS: ApprovedPost\[\] = \[([\s\S]*?)\n\];/m);
  if (!block) throw new Error(`Could not parse APPROVED_POSTS from ${REL}`);

  const out = [];
  for (const entry of block[1].split(/\},\s*\{/)) {
    const slug = entry.match(/slug:\s*"([^"]+)"/)?.[1];
    const sha256 = entry.match(/sha256:\s*"([^"]+)"/)?.[1];
    const approvedOn = entry.match(/approvedOn:\s*"([^"]+)"/)?.[1];
    if (slug && sha256) out.push({ slug, sha256, approvedOn });
  }
  return out;
}

/** Rewrite APPROVED_POSTS, preserving everything else in the file. */
export function writeApprovals(root, approvals) {
  const file = approvalPath(root);
  const src = fs.readFileSync(file, "utf8");
  const body = approvals
    .slice()
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map(
      (a) =>
        `  {\n    slug: "${a.slug}",\n    sha256: "${a.sha256}",\n    approvedOn: "${a.approvedOn}",${
          a.note ? `\n    note: ${JSON.stringify(a.note)},` : ""
        }\n  },`
    )
    .join("\n");

  const next = src.replace(
    /export const APPROVED_POSTS: ApprovedPost\[\] = \[[\s\S]*?\n\];/m,
    `export const APPROVED_POSTS: ApprovedPost[] = [\n${body}\n];`
  );
  fs.writeFileSync(file, next);
}
