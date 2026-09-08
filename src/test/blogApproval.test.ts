import { describe, expect, it } from "vitest";
import { APPROVED_POSTS, REFUSED_POSTS, isApproved } from "../lib/blogApproval";
// @ts-expect-error - plain .mjs build script, no types
import { assess, partition, postHash, HASHED_FIELDS } from "../../scripts/blogGate.mjs";

const gate = { minWords: 300, denySlugs: [], denyIds: [], spamMarkers: [] };
const body = (n: number) => `<p>${Array(n).fill("word").join(" ")}</p>`;

/**
 * The allowlist is the control; the heuristics are only a safety net. These
 * assert that ordering: nothing publishes on heuristics alone, and an approved
 * post whose text later changes stops publishing until it is re-approved.
 */
describe("blog approval list", () => {
  it("publishes nothing when the allowlist is empty", () => {
    const { accepted, rejected } = partition(
      [{ _id: "1", slug: "clean-post", title: "Clean", content: body(900) }],
      gate,
      []
    );
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toBe("not on the approval list");
  });

  it("publishes an approved post whose content still matches", () => {
    const content = body(900);
    const post = { _id: "1", slug: "clean-post", title: "Clean", content };
    const approvals = [{ slug: "clean-post", sha256: postHash(post), approvedOn: "2026-09-04" }];
    const { accepted } = partition([post], gate, approvals);
    expect(accepted.map((p: { slug: string }) => p.slug)).toEqual(["clean-post"]);
  });

  it("refuses an approved post whose content changed, and reports the drift", () => {
    const original = { _id: "1", slug: "clean-post", title: "Clean", content: body(900) };
    const approvals = [{ slug: "clean-post", sha256: postHash(original), approvedOn: "2026-09-04" }];
    const edited = { ...original, content: body(900) + "<p>injected later</p>" };
    const { accepted, rejected, drifted } = partition([edited], gate, approvals);
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toBe("content changed since approval");
    expect(drifted).toHaveLength(1);
    expect(drifted[0].current).toBe(postHash(edited));
    expect(drifted[0].approved).not.toBe(drifted[0].current);
  });

  it("does not let an unapproved post in just because it looks clean", () => {
    expect(assess({ _id: "9", slug: "looks-fine", title: "Fine", content: body(2000) }, gate, []).ok).toBe(false);
  });

  it("refuses an approved post whose TITLE changed, not just its content", () => {
    // The title is the H1 and the meta title. Pinning content alone left this
    // open: an unauthenticated PUT could swap the headline and publish it.
    const original = { _id: "1", slug: "clean-post", title: "Clean", content: body(900) };
    const approvals = [{ slug: "clean-post", sha256: postHash(original), approvedOn: "2026-09-04" }];
    const retitled = { ...original, title: "Cheap Steel Flats, Call Now" };
    const { accepted, drifted } = partition([retitled], gate, approvals);
    expect(accepted).toHaveLength(0);
    expect(drifted).toHaveLength(1);
  });

  it("refuses when any other rendered field changes", () => {
    const original = {
      _id: "1", slug: "clean-post", title: "Clean", excerpt: "e",
      content: body(900), coverImage: "/a.webp", category: "DGCA",
    };
    const approvals = [{ slug: "clean-post", sha256: postHash(original), approvedOn: "2026-09-04" }];
    for (const field of ["excerpt", "coverImage", "category"]) {
      const tampered = { ...original, [field]: "attacker-supplied" };
      const { accepted } = partition([tampered], gate, approvals);
      expect(accepted, field).toHaveLength(0);
    }
  });

  it("hashes every field that renders", () => {
    expect(new Set(HASHED_FIELDS)).toEqual(
      new Set(["slug", "title", "excerpt", "content", "coverImage", "category"])
    );
  });

  it("is not fooled by text moved across a field boundary", () => {
    const a = { slug: "s", title: "ab", excerpt: "c", content: "x" };
    const b = { slug: "s", title: "a", excerpt: "bc", content: "x" };
    expect(postHash(a)).not.toBe(postHash(b));
  });

  it("fails the build when an approved post disappears from the API", () => {
    // DELETE was open until 2026-09-04. A post vanishing between builds looks
    // exactly like that, and a silently shrinking sitemap would hide it.
    const approvals = [{ slug: "was-approved", sha256: "0".repeat(64), approvedOn: "2026-09-04" }];
    const { missing } = partition([], gate, approvals);
    expect(missing).toHaveLength(1);
    expect(missing[0].slug).toBe("was-approved");
  });

  it("keeps the spam post on the refused record", () => {
    expect(REFUSED_POSTS.some((p) => p.slug === "why-india-needs-more-pilots")).toBe(true);
  });

  it("isApproved matches the committed list", () => {
    expect(isApproved(undefined)).toBe(false);
    expect(isApproved("nothing-like-this")).toBe(false);
    for (const p of APPROVED_POSTS) expect(isApproved(p.slug)).toBe(true);
  });

  it("every approved entry carries a pinned hash and a date", () => {
    for (const p of APPROVED_POSTS) {
      expect(p.sha256, p.slug).toMatch(/^[0-9a-f]{64}$/);
      expect(p.approvedOn, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
