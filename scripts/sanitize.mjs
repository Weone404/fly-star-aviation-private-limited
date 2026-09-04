/**
 * Build-side sanitisation of fetched post bodies.
 *
 * Prerendering writes fetched content into static HTML files served from the
 * edge, so unsanitised markup here is worse than at runtime: no fetch is needed
 * for it to execute, and it is cached. The rules are transliterated from
 * src/lib/sanitizeHtml.ts; src/test/sanitizeHtml.test.ts asserts the two agree.
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

const STRIP_WITH_CONTENT = [
  "script", "style", "iframe", "object", "embed",
  "noscript", "template", "svg", "math", "form", "input", "button",
];

const ALLOWED_ATTRS = {
  a: new Set(["href", "title", "rel", "target"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
  th: new Set(["scope", "colspan", "rowspan"]),
  td: new Set(["colspan", "rowspan"]),
};

const SAFE_URL = /^(?:https?:|mailto:|tel:|\/(?!\/)|#)/i;

function safeUrl(value) {
  return SAFE_URL.test(value.replace(/[\u0000-\u0020\u007f-\u00a0]/g, ""));
}

function cleanAttributes(tag, raw) {
  const allowed = ALLOWED_ATTRS[tag];
  if (!allowed) return "";
  const out = [];
  const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let m;
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

export function sanitizeHtml(input) {
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

export function sanitizePostFields(post) {
  return { ...post, content: sanitizeHtml(post.content), intro: sanitizeHtml(post.intro) };
}
