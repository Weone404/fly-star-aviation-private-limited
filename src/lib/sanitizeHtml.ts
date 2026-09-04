import DOMPurify from "dompurify";

/**
 * Sanitiser for blog post bodies (browser side).
 *
 * `BlogDetail.tsx` renders post content through `dangerouslySetInnerHTML`, and
 * that content can come from `/api/blogs`, whose write endpoint is
 * unauthenticated. Without sanitisation, HTML written to the database executes
 * in a visitor's browser on this origin — stored XSS.
 *
 * WHY DOMPURIFY AND NOT OUR OWN
 * The first version of this file was a hand-rolled, regex-based sanitiser. It
 * held up against most of the corpus in src/test/sanitizeBypass.test.ts, and
 * then failed on `<img src=x onerror=alert(1)//` — an unterminated tag. A regex
 * needs a closing ">" to recognise a tag, so the payload passed through as
 * "text"; the browser's own parser then recovered it into a live <img> as soon
 * as any later ">" appeared in the document.
 *
 * That is not a bug to patch. It is the category of bug you get from parsing
 * HTML with regular expressions, and patching it would have produced a slightly
 * different regex with a slightly different hole. DOMPurify parses with the same
 * engine the browser uses, so what it inspects is exactly what will render.
 *
 * Keep the bypass suite. Its job now is to catch a bad config here, and to fail
 * loudly if anyone ever swaps this back for something clever.
 */

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
  // Block every URI scheme except the ones a article body legitimately needs.
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i,
  FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "input", "button", "base", "meta", "template", "noscript"],
  FORBID_ATTR: ["srcdoc", "formaction", "style", "xlink:href"],
  ALLOW_DATA_ATTR: false,
  ALLOW_ARIA_ATTR: false,
  KEEP_CONTENT: true,
} as const;

let hookInstalled = false;

/** Force rel=noopener on any link that opens a new tab. */
function installHook() {
  if (hookInstalled) return;
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node instanceof Element && node.tagName === "A" && node.getAttribute("target")) {
      node.setAttribute("rel", "noopener noreferrer");
    }
  });
  hookInstalled = true;
}

export function sanitizeHtml(input?: string | null): string {
  if (!input) return "";
  installHook();
  return DOMPurify.sanitize(String(input), CONFIG as unknown as Record<string, unknown>);
}

/** Sanitise the free-text fields of a post that ever reach the DOM as HTML. */
export function sanitizePost<T extends { content?: string; intro?: string }>(post: T): T {
  return { ...post, content: sanitizeHtml(post.content), intro: sanitizeHtml(post.intro) };
}
