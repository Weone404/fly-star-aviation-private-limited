import { describe, expect, it } from "vitest";
import { APPROVED_POSTS, REFUSED_POSTS, isApproved } from "../lib/blogApproval";
// @ts-expect-error - plain .mjs build script, no types
import { assess, partition, contentHash } from "../../scripts/blogGate.mjs";

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
    const approvals = [{ slug: "clean-post", sha256: contentHash(content), approvedOn: "2026-09-04" }];
    const { accepted } = partition([{ _id: "1", slug: "clean-post", title: "Clean", content }], gate, approvals);
    expect(accepted.map((p: { slug: string }) => p.slug)).toEqual(["clean-post"]);
  });

  it("refuses an approved post whose content changed, and reports the drift", () => {
    const approvals = [{ slug: "clean-post", sha256: contentHash(body(900)), approvedOn: "2026-09-04" }];
    const edited = body(900) + "<p>injected later</p>";
    const { accepted, rejected, drifted } = partition(
      [{ _id: "1", slug: "clean-post", title: "Clean", content: edited }],
      gate,
      approvals
    );
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toBe("content changed since approval");
    expect(drifted).toHaveLength(1);
    expect(drifted[0].current).toBe(contentHash(edited));
    expect(drifted[0].approved).not.toBe(drifted[0].current);
  });

  it("does not let an unapproved post in just because it looks clean", () => {
    expect(assess({ _id: "9", slug: "looks-fine", title: "Fine", content: body(2000) }, gate, []).ok).toBe(false);
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
