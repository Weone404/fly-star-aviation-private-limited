import { describe, it, expect } from 'vitest'
import { STATIC_BLOG_POSTS } from '@/lib/blogData'
import { sanitizeHtml } from '@/lib/sanitizeHtml'
import { prepareArticle } from '@/lib/articleHtml'

/**
 * Guards the one risky thing the editorial template does: it takes the FAQ
 * block out of the article body so the same questions can be re-rendered as
 * <details> accordions from the post's `faqs` array.
 *
 * Both of the defects this file exists to catch were real. The first version of
 * prepareArticle dropped everything between the FAQ heading and the next <h2>,
 * which silently deleted the reference footer on every post whose FAQ is the
 * last section. The second lost table wrappers on posts where a table sat after
 * the FAQ. Neither was visible in a passing build.
 */
describe('article preparation', () => {
  const withFaqs = (STATIC_BLOG_POSTS as { slug?: string; content?: string; faqs?: { q: string; a: string }[] }[])
    .filter((p) => (p.faqs || []).length)

  it('extracts the FAQ section from every post that has one', () => {
    for (const p of withFaqs) {
      const parts = prepareArticle(sanitizeHtml(p.content), p.faqs)
      expect(parts.faqExtracted, p.slug).toBe(true)
      expect(parts.bodyHtml.toLowerCase(), p.slug).not.toContain('frequently asked questions')
      expect(parts.tailHtml.toLowerCase(), p.slug).not.toContain('frequently asked questions')
      expect(parts.toc.length, p.slug).toBeGreaterThan(2)
      expect(parts.toc.some((t) => t.id === 'faq'), p.slug).toBe(true)
    }
  })

  it('gives every non-FAQ h2 a unique id and wraps every table', () => {
    for (const p of withFaqs) {
      const parts = prepareArticle(sanitizeHtml(p.content), p.faqs)
      const ids = parts.toc.map((t) => t.id)
      expect(new Set(ids).size, p.slug).toBe(ids.length)
      const html = parts.bodyHtml + parts.tailHtml
      const tables = (html.match(/<table/g) || []).length
      const wraps = (html.match(/class="table-scroll"/g) || []).length
      expect(wraps, `${p.slug}: a table escaped its scroll container`).toBe(tables)
    }
  })

  it('keeps every non-FAQ heading and the reference footer in the visible body', () => {
    for (const p of withFaqs) {
      const s = sanitizeHtml(p.content)
      const parts = prepareArticle(s, p.faqs)
      const html = parts.bodyHtml + parts.tailHtml
      const headings = [...s.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim())
      for (const h of headings) {
        if (/^frequently asked questions/i.test(h)) continue
        expect(html, `${p.slug} lost heading ${h}`).toContain(h)
      }
      expect(html, `${p.slug} lost the reference footer`).toContain('editorial policy')
    }
  })
})
