import { createHash } from "node:crypto";

/**
 * Pure logic for the build-time blog approval gate.
 *
 * Kept separate from scripts/fetch-blogs.mjs (which does the network I/O) so it
 * can be unit-tested without reaching the API — the API is not reachable from
 * CI sandboxes or from a developer machine behind an egress allowlist, and
 * untested code in the build path is how a deploy breaks quietly.
 */

/** Plain-text word count of a post body. Mirrors getWordCount in blogData.js. */
export function plainWords(post) {
  const raw = `${post?.intro || ""} ${post?.content || ""}`;
  const text = raw
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}

/**
 * Trim leading and trailing hyphens from a slug.
 *
 * Internal double hyphens are deliberately left alone: several live posts have
 * them (a side effect of slugifying titles containing punctuation), they are
 * valid in a URL, and changing them would break the /api/blogs/:slug lookup that
 * BlogDetail.tsx does at runtime. Leading and trailing hyphens are different —
 * they are simply malformed.
 */
export function tidySlug(slug) {
  return String(slug ?? "").trim().replace(/^-+|-+$/g, "");
}

export const DEFAULT_GATE = {
  minWords: 300,
  denySlugs: [],
  denyIds: [],
  spamMarkers: [],
};

/**
 * Fields an approval pins.
 *
 * Every one of these renders somewhere a reader or a search engine sees it:
 * `title` is the H1 and the meta title, `excerpt` the meta description and the
 * card text, `coverImage` the hero and the OG image, `category` the label, and
 * `slug` the URL itself. Pinning `content` alone left a hole — an unauthenticated
 * PUT could swap an approved post's title and land attacker-chosen text on the
 * site without tripping the alarm.
 */
export const HASHED_FIELDS = ["slug", "title", "excerpt", "content", "coverImage", "category"];

/**
 * sha256 over every rendered field, in a fixed order, length-prefixed.
 *
 * Length prefixes stop a boundary attack: without them, moving text from the end
 * of one field to the start of the next leaves the concatenation — and so the
 * hash — unchanged.
 */
export function postHash(post) {
  const h = createHash("sha256");
  for (const field of HASHED_FIELDS) {
    const value = String(post?.[field] ?? "");
    h.update(`${field}:${value.length}:`, "utf8");
    h.update(value, "utf8");
  }
  return h.digest("hex");
}

/** @deprecated Use postHash. Kept so an old approval file fails loudly rather than silently mismatching. */
export function contentHash(content) {
  return createHash("sha256").update(String(content ?? ""), "utf8").digest("hex");
}

/**
 * Decide whether a post may be advertised to crawlers.
 *
 * A rejected post is NOT deleted and is still served by the SPA at runtime — it
 * simply gets no prerendered file and no sitemap entry, so it is never offered
 * to a search engine or an answer engine.
 */
export function assess(post, gateInput = {}, approvals = null) {
  const gate = { ...DEFAULT_GATE, ...gateInput };
  const id = post?._id ? String(post._id) : "";
  const rawSlug = post?.slug;
  const slug = tidySlug(rawSlug);
  const words = plainWords(post);

  // ── The allowlist comes first and overrides everything below it. ──────────
  // The heuristics that follow are a safety net for an approved post that has
  // become malformed; they are NOT the control. The control is that a human
  // named this slug and pinned this content.
  if (approvals) {
    const approval = approvals.find((a) => a.slug === slug || a.slug === rawSlug);
    if (!approval) return { ok: false, reason: "not on the approval list", slug, words };

    const actual = postHash(post);
    if (approval.sha256 !== actual) {
      return {
        ok: false,
        reason: "content changed since approval",
        slug,
        words,
        drift: { approved: approval.sha256, current: actual },
      };
    }
  }

  if (gate.denySlugs.includes(rawSlug) || (slug && gate.denySlugs.includes(slug)))
    return { ok: false, reason: "denylisted by slug" };
  if (id && gate.denyIds.includes(id)) return { ok: false, reason: "denylisted by id" };
  if (!post?.title || !String(post.title).trim()) return { ok: false, reason: "no title" };
  if (!slug) return { ok: false, reason: "no usable slug" };
  if (words < gate.minWords)
    return { ok: false, reason: `too thin (${words} words, minimum ${gate.minWords})` };

  const haystack = `${post.title} ${post.content || ""}`.toLowerCase();
  const marker = gate.spamMarkers.find((m) => haystack.includes(String(m).toLowerCase()));
  if (marker) return { ok: false, reason: `matched spam marker "${marker}"` };

  return { ok: true, slug, words };
}

/** Fields carried through to the generated file. Anything else is dropped. */
export function normalise(post, slug) {
  return {
    _id: String(post._id || ""),
    slug,
    title: post.title,
    seoTitle: post.seoTitle,
    metaDescription: post.metaDescription,
    excerpt: post.excerpt,
    intro: post.intro,
    content: post.content,
    category: post.category,
    tags: post.tags,
    author: post.author,
    authorRole: post.authorRole,
    coverImage: post.coverImage,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    faqs: post.faqs,
  };
}

/** Split a fetched list into what may be published and what is held back. */
export function partition(posts, gate, approvals = null) {
  const accepted = [];
  const rejected = [];
  const drifted = [];
  const seen = new Set();

  for (const post of posts) {
    const verdict = assess(post, gate, approvals);
    if (verdict.drift) {
      drifted.push({ slug: verdict.slug, title: post?.title ?? null, ...verdict.drift });
    }
    if (!verdict.ok) {
      rejected.push({
        id: String(post?._id || ""),
        slug: post?.slug ?? null,
        title: post?.title ?? null,
        reason: verdict.reason,
      });
      continue;
    }
    if (seen.has(verdict.slug)) {
      rejected.push({
        id: String(post?._id || ""),
        slug: verdict.slug,
        title: post?.title ?? null,
        reason: "duplicate slug",
      });
      continue;
    }
    seen.add(verdict.slug);
    accepted.push(normalise(post, verdict.slug));
  }

  // An approval whose post is no longer in the API response is as serious as a
  // changed hash: DELETE was open until 2026-09-04, and a post disappearing
  // between builds is exactly what that looks like. Silently shrinking the
  // sitemap would hide it.
  const present = new Set(posts.map((p) => tidySlug(p?.slug)).filter(Boolean));
  const missing = (approvals || [])
    .filter((a) => !present.has(a.slug))
    .map((a) => ({ slug: a.slug, approvedOn: a.approvedOn }));

  return { accepted, rejected, drifted, missing };
}
