import { describe, expect, it } from "vitest";
import { sanitizeHtml, sanitizePost } from "../lib/sanitizeHtml";
// @ts-expect-error - plain .mjs build script, no types
import { sanitizeHtml as sanitizeNode } from "../../scripts/sanitize.mjs";

/**
 * BlogDetail.tsx renders post content through dangerouslySetInnerHTML, and that
 * content can come from /api/blogs, whose write endpoint is unauthenticated.
 * These cases are the difference between a spam paragraph and script execution
 * on flystar.co.in.
 */
describe("sanitizeHtml", () => {
  it("keeps ordinary article markup intact", () => {
    const html = "<h2>Eligibility</h2><p>A CPL needs <strong>200 hours</strong>.</p><ul><li>Class 1 medical</li></ul>";
    expect(sanitizeHtml(html)).toBe(html);
  });

  it("removes a script tag and its contents", () => {
    expect(sanitizeHtml('<p>ok</p><script>fetch("//evil.tld")</script>')).toBe("<p>ok</p>");
  });

  it("removes inline event handlers", () => {
    expect(sanitizeHtml('<img src="/a.png" onerror="alert(1)" alt="a">')).not.toContain("onerror");
  });

  it("drops javascript: URLs, including obfuscated ones", () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).toBe("<a>x</a>");
    expect(sanitizeHtml('<a href="  javascript:alert(1)">x</a>')).toBe("<a>x</a>");
  });

  it("keeps safe URLs", () => {
    expect(sanitizeHtml('<a href="https://dgca.gov.in">DGCA</a>')).toContain('href="https://dgca.gov.in"');
    expect(sanitizeHtml('<a href="/courses/cpl">CPL</a>')).toContain('href="/courses/cpl"');
  });

  it("strips iframes, forms, styles and svg wholesale", () => {
    expect(sanitizeHtml('<iframe src="//evil.tld"></iframe><p>x</p>')).toBe("<p>x</p>");
    expect(sanitizeHtml('<form action="//evil.tld"><input name="pw"></form><p>x</p>')).toBe("<p>x</p>");
    expect(sanitizeHtml("<style>body{display:none}</style><p>x</p>")).toBe("<p>x</p>");
    expect(sanitizeHtml('<svg onload="alert(1)"></svg><p>x</p>')).toBe("<p>x</p>");
  });

  it("removes comments, which can carry conditional payloads", () => {
    expect(sanitizeHtml("<!--[if IE]><script>x</script><![endif]--><p>x</p>")).toBe("<p>x</p>");
  });

  it("adds rel=noopener when a link opens a new tab", () => {
    expect(sanitizeHtml('<a href="https://x.com" target="_blank">x</a>')).toContain('rel="noopener noreferrer"');
  });

  it("handles empty and missing input", () => {
    expect(sanitizeHtml("")).toBe("");
    expect(sanitizeHtml(null)).toBe("");
  });

  it("sanitises both rendered fields of a post", () => {
    const out = sanitizePost({ content: "<script>a</script><p>c</p>", intro: '<img src="x" onerror="y">' });
    expect(out.content).toBe("<p>c</p>");
    expect(out.intro).not.toContain("onerror");
  });

  it("agrees with the build-side copy in scripts/sanitize.mjs", () => {
    const cases = [
      "<p>plain</p>",
      "<script>evil()</script><p>x</p>",
      '<a href="javascript:alert(1)">x</a>',
      '<img src="/a.png" onerror="alert(1)" alt="a">',
      '<iframe src="//e.tld"></iframe>',
      '<a href="https://x.com" target="_blank">x</a>',
      "<h2>H</h2><ul><li>one</li></ul>",
    ];
    for (const c of cases) expect(sanitizeNode(c), c).toBe(sanitizeHtml(c));
  });
});
