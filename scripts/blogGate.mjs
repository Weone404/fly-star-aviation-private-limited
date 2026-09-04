/**
 * Pure logic for the build-time blog quality gate.
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
 * Decide whether a post may be advertised to crawlers.
 *
 * A rejected post is NOT deleted and is still served by the SPA at runtime — it
 * simply gets no prerendered file and no sitemap entry, so it is never offered
 * to a search engine or an answer engine.
 */
export function assess(post, gateInput = {}) {
  const gate = { ...DEFAULT_GATE, ...gateInput };
  const id = post?._id ? String(post._id) : "";
  const rawSlug = post?.slug;
  const slug = tidySlug(rawSlug);
  const words = plainWords(post);

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
export function partition(posts, gate) {
  const accepted = [];
  const rejected = [];
  const seen = new Set();

  for (const post of posts) {
    const verdict = assess(post, gate);
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

  return { accepted, rejected };
}
