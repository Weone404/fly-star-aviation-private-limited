/**
 * Presentation-layer preparation of a sanitised article body.
 *
 * Three jobs, none of which touch the post's data:
 *
 *  1. Give every <h2> a stable id so the table of contents can link to it.
 *     The ids are generated here, AFTER sanitisation, from the heading's own
 *     text — they are never read out of the source HTML. That is deliberate:
 *     adding "id" to the DOMPurify allow-list would let post content name DOM
 *     properties (the clobbering class of bug), and the sanitiser config is an
 *     invariant of this repo. Generating them downstream gets the anchors with
 *     none of that surface.
 *
 *  2. Split the "Frequently asked questions" section out of the body so the
 *     template can re-render it as <details> accordions from the post's `faqs`
 *     array. The array and the embedded HTML are already one source — the FAQ
 *     HTML in `content` was generated from the array — so rendering the array
 *     and dropping the generated copy shows the reader exactly what the
 *     FAQPage schema claims, with no duplication.
 *
 *  3. Keep whatever follows the FAQ (a "Related" list, the reference footer)
 *     as a tail that renders after the accordions, in its original order.
 *
 * Everything is done through the DOM parser rather than by pattern-matching the
 * markup. When no parser is available the input is returned untouched and the
 * caller falls back to rendering the body as it stands — the FAQ then shows as
 * plain headings, which is degraded but never duplicated.
 */

export type TocItem = { id: string; text: string }

export type ArticleParts = {
  /** Body up to (not including) the FAQ heading. */
  bodyHtml: string
  /** Anything after the FAQ section, in source order. */
  tailHtml: string
  /** H2s, in document order, including a synthetic FAQ entry when one was split out. */
  toc: TocItem[]
  /** True when the FAQ section was found and removed from bodyHtml. */
  faqExtracted: boolean
  /**
   * The body split at its <h2> boundaries, so an illustration can be placed
   * after a named section instead of being dropped at the end of the article.
   * `heading` is 0 for whatever precedes the first h2, then 1, 2, 3 …
   */
  sections: { heading: number; html: string }[]
}

export const FAQ_ANCHOR = 'faq'

const FAQ_HEADING = /^frequently asked questions\b/i

/** Lowercase, hyphenated, ASCII-only — the charset is ours, not the content's. */
export function headingId(text: string, taken?: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'section'
  if (!taken) return base
  let id = base
  let n = 2
  while (taken.has(id)) id = `${base}-${n++}`
  taken.add(id)
  return id
}

const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()

export function prepareArticle(
  sanitized: string,
  faqs?: { q: string; a: string }[],
): ArticleParts {
  const fallback: ArticleParts = {
    bodyHtml: sanitized || '',
    tailHtml: '',
    toc: [],
    faqExtracted: false,
    sections: sanitized ? [{ heading: 0, html: sanitized }] : [],
  }
  if (!sanitized) return fallback
  if (typeof DOMParser === 'undefined') return fallback

  let doc: Document
  try {
    doc = new DOMParser().parseFromString(`<div id="root">${sanitized}</div>`, 'text/html')
  } catch {
    return fallback
  }
  const root = doc.getElementById('root')
  if (!root) return fallback

  // Wide tables get their own scroll container so a comparison table can never
  // make the page itself scroll sideways on a phone.
  root.querySelectorAll('table').forEach((table) => {
    const parent = table.parentNode
    if (!parent) return
    const wrap = doc.createElement('div')
    wrap.className = 'table-scroll'
    parent.insertBefore(wrap, table)
    wrap.appendChild(table)
  })

  // The generated FAQ block is recognised by its own text rather than by
  // position. An earlier version dropped everything from the FAQ heading to the
  // next <h2>, which silently swallowed the reference footer on posts where the
  // FAQ is the last section — the tests caught it, and the fix is to remove
  // exactly the question-and-answer nodes and keep whatever else is down there.
  const faqText = new Set<string>()
  for (const f of faqs || []) {
    faqText.add(norm(f.q))
    faqText.add(norm(f.a))
  }

  const taken = new Set<string>()
  const nodes = Array.from(root.childNodes)

  const before: Node[] = []
  const after: Node[] = []
  const toc: TocItem[] = []

  let phase: 'body' | 'faq' | 'tail' = 'body'
  let faqExtracted = false
  const sections: { heading: number; nodes: Node[] }[] = [{ heading: 0, nodes: [] }]
  let h2Count = 0

  for (const node of nodes) {
    const el = node.nodeType === 1 ? (node as Element) : null
    const tag = el?.tagName?.toLowerCase()

    if (tag === 'h2') {
      const text = (el?.textContent || '').trim()
      if (FAQ_HEADING.test(text)) {
        phase = 'faq'
        faqExtracted = true
        taken.add(FAQ_ANCHOR)
        toc.push({ id: FAQ_ANCHOR, text: 'Frequently asked questions' })
        continue
      }
      if (phase === 'faq') phase = 'tail'
      const id = headingId(text, taken)
      el!.setAttribute('id', id)
      if (text) toc.push({ id, text })
      if (phase === 'body') sections.push({ heading: ++h2Count, nodes: [] })
    }

    if (phase === 'faq') {
      const text = norm(node.textContent || '')
      if (!text || faqText.has(text)) continue
      // Not part of the generated FAQ — everything from here on is tail.
      phase = 'tail'
    }
    ;(phase === 'tail' ? after : before).push(node)
    if (phase === 'body') sections[sections.length - 1].nodes.push(node)
  }

  const html = (list: Node[]) =>
    list
      .map((n) => (n.nodeType === 1 ? (n as Element).outerHTML : n.textContent || ''))
      .join('')

  return {
    bodyHtml: html(before),
    tailHtml: html(after),
    toc,
    faqExtracted,
    sections: sections
      .filter((sec) => sec.nodes.length > 0)
      .map((sec) => ({ heading: sec.heading, html: html(sec.nodes) })),
  }
}

/** Distinct categories in document order — used by the listing's filter chips. */
export function categoriesOf<T extends { category?: string }>(posts: T[]): string[] {
  const seen = new Set<string>()
  for (const p of posts) if (p.category) seen.add(p.category)
  return Array.from(seen)
}
