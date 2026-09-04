/**
 * Minimal HTML sanitiser for post bodies.
 *
 * `BlogDetail.tsx` renders post content with `dangerouslySetInnerHTML`, and that
 * content can come from `/api/blogs`, whose write endpoint is unauthenticated.
 * Without this, any HTML written to the database executes in a visitor's browser
 * on this origin — stored XSS. Prerendering makes it worse, because the injected
 * markup is then baked into a static file and served from the edge.
 *
 * Deliberately allowlist-based: anything not named here is dropped. An allowlist
 * fails closed when a new attack shape appears; a denylist does not.
 *
 * Runs in the browser and in the Node build, so it uses only string operations —
 * no DOM, and no dependency to keep patched.
 */

const ALLOWED_TAGS = new Set([
  "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "sub", "sup",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "dl", "dt", "dd",
  "blockquote", "pre", "code",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  "span", "div", "section", "article",
]);

/** Tags whose entire contents are removed, not just the tag itself. */
const STRIP_WITH_CONTENT = [
  "script", "style", "iframe", "object", "embed",
  "noscript", "template", "svg", "math", "form", "input", "button",
];

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "rel", "target"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
  th: new Set(["scope", "colspan", "rowspan"]),
  td: new Set(["colspan", "rowspan"]),
};

const SAFE_URL = /^(?:https?:|mailto:|tel:|\/(?!\/)|#)/i;

/** Strip whitespace and control characters before testing a URL scheme —
 *  "java\tscript:" and "java\u0000script:" are both live in some parsers. */
function safeUrl(value: string): boolean {
  // eslint-disable-next-line no-control-regex -- stripping control characters is the point
  const stripped = value.replace(/[\u0000-\u0020\u007f-\u00a0]/g, "");
  return SAFE_URL.test(stripped);
}

function cleanAttributes(tag: string, raw: string): string {
  const allowed = ALLOWED_ATTRS[tag];
  if (!allowed) return "";

  const out: string[] = [];
  const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let m: RegExpExecArray | null;

  while ((m = attrRe.exec(raw))) {
    const name = m[1].toLowerCase();
    const value = m[2] ?? m[3] ?? m[4] ?? "";
    if (name.startsWith("on")) continue;
    if (!allowed.has(name)) continue;
    if ((name === "href" || name === "src") && !safeUrl(value)) continue;
    out.push(name + '="' + value.replace(/"/g, "&quot;") + '"');
  }

  if (tag === "a" && out.some((a) => a.startsWith("target=")) && !out.some((a) => a.startsWith("rel="))) {
    out.push('rel="noopener noreferrer"');
  }
  return out.length ? " " + out.join(" ") : "";
}

export function sanitizeHtml(input?: string | null): string {
  if (!input) return "";
  let html = String(input);

  for (const tag of STRIP_WITH_CONTENT) {
    html = html.replace(new RegExp("<" + tag + "\\b[\\s\\S]*?</" + tag + "\\s*>", "gi"), "");
    html = html.replace(new RegExp("<" + tag + "\\b[^>]*/?>", "gi"), "");
  }
  html = html.replace(/<!--[\s\S]*?-->/g, "");

  return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>/g, (match, rawTag, attrs) => {
    const tag = String(rawTag).toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (match.startsWith("</")) return "</" + tag + ">";
    const selfClosing = /\/\s*$/.test(attrs) || tag === "br" || tag === "hr" || tag === "img";
    return "<" + tag + cleanAttributes(tag, attrs) + (selfClosing ? " /" : "") + ">";
  });
}

/** Sanitise the free-text fields of a post that ever reach the DOM as HTML. */
export function sanitizePost<T extends { content?: string; intro?: string }>(post: T): T {
  return { ...post, content: sanitizeHtml(post.content), intro: sanitizeHtml(post.intro) };
}
