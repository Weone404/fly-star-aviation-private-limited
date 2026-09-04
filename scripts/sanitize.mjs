/**
 * Sanitiser for blog post bodies (build side).
 *
 * Prerendering writes fetched content into static HTML files served from the
 * edge, so unsanitised markup here is worse than at runtime: a payload needs no
 * fetch to run, and it is cached.
 *
 * Same engine and same config as src/lib/sanitizeHtml.ts — DOMPurify over a
 * jsdom window, so the parse is the browser's own. src/test/sanitizeBypass.test.ts
 * asserts both copies produce identical output on a shared corpus, which is what
 * stops the two drifting apart.
 *
 * The previous hand-rolled version failed on unterminated tags; see the note in
 * src/lib/sanitizeHtml.ts for why that was replaced rather than patched.
 */
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const purify = createDOMPurify(new JSDOM("").window);

purify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.getAttribute && node.getAttribute("target")) {
    node.setAttribute("rel", "noopener noreferrer");
  }
});

const CONFIG = {
  ALLOWED_TAGS: [
    "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "sub", "sup",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "dl", "dt", "dd",
    "blockquote", "pre", "code",
    "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
    "span", "div", "section", "article",
  ],
  ALLOWED_ATTR: ["href", "title", "rel", "target", "src", "alt", "width", "height", "loading", "scope", "colspan", "rowspan"],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i,
  FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "input", "button", "base", "meta", "template", "noscript"],
  FORBID_ATTR: ["srcdoc", "formaction", "style", "xlink:href"],
  ALLOW_DATA_ATTR: false,
  ALLOW_ARIA_ATTR: false,
  KEEP_CONTENT: true,
};

export function sanitizeHtml(input) {
  if (!input) return "";
  return purify.sanitize(String(input), CONFIG);
}

export function sanitizePostFields(post) {
  return { ...post, content: sanitizeHtml(post.content), intro: sanitizeHtml(post.intro) };
}
