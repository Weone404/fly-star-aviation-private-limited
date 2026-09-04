/**
 * The blog approval list — the single control that decides which
 * database-authored posts this site will show or advertise.
 *
 * WHY THIS EXISTS
 * `POST /api/blogs` accepts unauthenticated writes, and `BlogDetail.tsx` renders
 * `content` through `dangerouslySetInnerHTML`. A heuristic filter is not a
 * control: its rules live in this repo, so anyone who can read them can write
 * content that passes. An allowlist inverts that — nothing from the database is
 * shown or advertised unless a human has approved that exact post.
 *
 * The `sha256` field pins the approved *content*, so an already-approved post
 * cannot be silently edited afterwards. If the hash drifts, the build fails
 * loudly rather than republishing changed text under an old approval.
 *
 * HOW TO APPROVE A POST
 *   1. Write or edit it in /admin/blog.
 *   2. Review it — including a fact-check against the editorial policy.
 *   3. npm run blogs:approve -- <slug>     (adds slug + current hash here)
 *   4. Commit this file, then rebuild.
 *
 * AFTER A LEGITIMATE EDIT the hash changes and the build fails with the old and
 * new hashes printed. Re-review, run the approve script again to re-pin it, and
 * commit. That failure is the feature: an edit you did not make cannot reach the
 * site quietly.
 *
 * Imported by the browser bundle as well as the build scripts, so held-back
 * posts stop rendering for visitors too — not just for crawlers.
 */
export interface ApprovedPost {
  slug: string;
  /** sha256 of the post's `content` field at the moment it was approved. */
  sha256: string;
  approvedOn: string;
  note?: string;
}

export const APPROVED_POSTS: ApprovedPost[] = [];

/**
 * Posts explicitly refused, kept as a record so a rejection stays visible and
 * deliberate rather than an absence someone later "fixes" by approving.
 */
export const REFUSED_POSTS: { slug: string; reason: string }[] = [
  {
    slug: "why-india-needs-more-pilots",
    reason:
      "Body opens with an 'HCHCR Steel Flat Supplier in Delhi' block — SEO spam for an unrelated product, found in the production database 2026-09-04. Origin not established.",
  },
];

const approvedSlugs = new Set(APPROVED_POSTS.map((p) => p.slug));

/** True only for a post a human has approved by slug. */
export function isApproved(slug?: string | null): boolean {
  return Boolean(slug && approvedSlugs.has(slug));
}

export function approvalFor(slug?: string | null): ApprovedPost | undefined {
  return APPROVED_POSTS.find((p) => p.slug === slug);
}
