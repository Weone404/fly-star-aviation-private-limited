import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SocialShareButtons } from '@/components/SocialShareButtons'
import type { BlogPost } from '@/types/blog'
import type { TocItem } from '@/lib/articleHtml'
import { FAQ_ANCHOR } from '@/lib/articleHtml'

/**
 * The blog's editorial component library.
 *
 * Every colour here is a design token — no literal hsl() values — so the pages
 * follow the theme in both light and dark mode instead of pinning one palette.
 * Interactive targets are at least 44px. Nothing here fetches, and nothing here
 * renders post HTML: the only untrusted string on these pages still goes
 * through the sanitiser in the template, exactly as before.
 */

export const formatDate = (value?: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */

export function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/60">
      <ol className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 text-xs text-muted-foreground">
        <li><Link to="/" className="hover:text-primary">Home</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link to="/blogs" className="hover:text-primary">Blog</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="max-w-[16rem] truncate font-medium text-foreground sm:max-w-md">{title}</li>
      </ol>
    </nav>
  )
}

/* ── Post hero ───────────────────────────────────────────────────────────── */

export function PostHero({
  post,
  readingMinutes,
  authorName,
  authorRole,
}: {
  post: BlogPost
  readingMinutes: number
  authorName: string
  authorRole: string
}) {
  const verified = post.updatedAt || post.createdAt
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-3xl px-4 pb-10 pt-10 md:pt-14">
        {post.category && (
          <Link
            to="/blogs"
            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
          >
            {post.category}
          </Link>
        )}
        <h1 className="mt-4 text-balance text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{authorName}</span>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes} min read</span>
          {verified && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Last verified <time dateTime={verified}>{formatDate(verified)}</time>
              </span>
            </>
          )}
        </div>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {authorRole}. Figures on this page are checked against the regulator&rsquo;s own documents —{' '}
          <Link to="/editorial-policy" className="font-medium text-primary underline underline-offset-2">
            how we check them
          </Link>
          .
        </p>
      </div>
    </header>
  )
}

/* ── Key facts ───────────────────────────────────────────────────────────── */

export type KeyFact = { fact: string; source: string; href?: string }

export function KeyFacts({ facts }: { facts?: KeyFact[] }) {
  if (!facts || facts.length === 0) return null
  return (
    <section aria-labelledby="key-facts" className="my-8 rounded-xl border border-primary/25 bg-primary/5 p-5 md:p-6">
      <h2 id="key-facts" className="text-sm font-bold uppercase tracking-wide text-primary">
        Key facts
      </h2>
      <ul className="mt-4 space-y-4">
        {facts.map((f) => (
          <li key={f.fact} className="text-sm leading-relaxed text-foreground">
            <span>{f.fact}</span>
            <span className="mt-1 block">
              {f.href ? (
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary hover:bg-primary/20"
                >
                  Sourced: {f.source}
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Sourced: {f.source}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ── Correction pull-quote ───────────────────────────────────────────────── */

export type Correction = { claim: string; correction: string; source: string; href?: string }

export function CorrectionQuote({ item }: { item?: Correction }) {
  if (!item) return null
  return (
    <aside className="my-10 border-l-4 border-accent bg-accent/10 p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Commonly stated</p>
      <p className="mt-1 text-base leading-relaxed text-muted-foreground line-through decoration-muted-foreground/50">
        {item.claim}
      </p>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-primary">What the document says</p>
      <p className="mt-1 text-lg font-semibold leading-snug text-foreground md:text-xl">{item.correction}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        {item.href ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">
            {item.source}
          </a>
        ) : (
          item.source
        )}
      </p>
    </aside>
  )
}

/* ── Table of contents ───────────────────────────────────────────────────── */

export function TableOfContents({ items, variant }: { items: TocItem[]; variant: 'mobile' | 'desktop' }) {
  if (items.length < 3) return null
  const list = (
    <ol className="space-y-1.5 text-sm">
      {items.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            className="flex min-h-11 items-center rounded px-2 py-1 leading-snug text-muted-foreground hover:bg-muted hover:text-primary"
          >
            {i.text}
          </a>
        </li>
      ))}
    </ol>
  )
  if (variant === 'mobile') {
    return (
      <details className="my-6 rounded-xl border border-border bg-card p-4 lg:hidden">
        <summary className="min-h-11 cursor-pointer list-none py-2 text-sm font-bold text-foreground">
          On this page
        </summary>
        <div className="mt-2">{list}</div>
      </details>
    )
  }

  return (
    <nav aria-label="On this page" className="max-h-[calc(100vh-9rem)] overflow-y-auto">
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">On this page</p>
      {list}
    </nav>
  )
}

/* ── FAQ accordions ──────────────────────────────────────────────────────── */

export function FaqAccordions({ faqs }: { faqs?: { q: string; a: string }[] }) {
  if (!faqs || faqs.length === 0) return null
  return (
    <section aria-labelledby={FAQ_ANCHOR} className="mt-12 border-t border-border pt-8">
      <h2 id={FAQ_ANCHOR} className="text-2xl font-bold text-foreground">
        Frequently asked questions
      </h2>
      <div className="mt-4 divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          // Native <details>: the answer is in the served HTML whether it is
          // open or shut, so a crawler reads it without running any script.
          <details key={f.q} className="group py-1">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left text-base font-semibold text-foreground">
              <span>{f.q}</span>
              <span aria-hidden="true" className="shrink-0 text-primary transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-4 pr-8 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/* ── Related posts ───────────────────────────────────────────────────────── */

export function relatedTo(post: BlogPost, all: BlogPost[], limit = 3): BlogPost[] {
  const tags = new Set((post.tags || []).map((t) => t.toLowerCase()))
  const scored = all
    .filter((p) => p.slug && p.slug !== post.slug)
    .map((p) => {
      const shared = (p.tags || []).filter((t) => tags.has(t.toLowerCase())).length
      const sameCategory = p.category && p.category === post.category ? 1 : 0
      return { post: p, score: shared * 2 + sameCategory }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.post)
}

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null
  return (
    <section aria-labelledby="related" className="mt-12 border-t border-border pt-8">
      <h2 id="related" className="text-xl font-bold text-foreground">Related reading</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/blog/${p.slug}`}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              {p.category && (
                <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{p.category}</span>
              )}
              <span className="mt-1 text-sm font-semibold leading-snug text-foreground">{p.title}</span>
              {p.excerpt && (
                <span className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{p.excerpt}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ── Share ───────────────────────────────────────────────────────────────── */

export function ShareBar({ title }: { title: string }) {
  const [canShare, setCanShare] = useState(false)
  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  if (!canShare) return <SocialShareButtons title={title} label="Share" className="flex-wrap" />

  return (
    <button
      type="button"
      onClick={() => {
        navigator.share({ title, url: window.location.href }).catch(() => { /* dismissed */ })
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground hover:border-primary/40"
    >
      Share this article
    </button>
  )
}

/* ── Back to top ─────────────────────────────────────────────────────────── */

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg hover:border-primary/40"
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

/* ── Reading progress ────────────────────────────────────────────────────── */

export function ReadingProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent" aria-hidden="true">
      <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  )
}

/* ── Tag list ────────────────────────────────────────────────────────────── */

export function TagList({ tags }: { tags?: string[] }) {
  const items = useMemo(() => (tags || []).filter(Boolean), [tags])
  if (items.length === 0) return null
  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
          {t}
        </li>
      ))}
    </ul>
  )
}

/* ── Small inline icons (no icon library, no font) ───────────────────────── */

export function IconCheck({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconDoc({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M11.5 2.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 17.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5l-4-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11.5 2.5v4h4M7.5 11h5M7.5 14h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconArrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Gradient masthead shared by the listing and the topic hubs ──────────── */

export function BlogMasthead({
  eyebrow,
  title,
  lede,
  stats,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  lede: React.ReactNode
  stats?: { value: string; label: string }[]
  children?: React.ReactNode
}) {
  return (
    <header className="aviation-gradient relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background:radial-gradient(60rem_20rem_at_20%_-10%,white,transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 md:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-white md:text-[2.6rem]">{title}</h1>
        <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">{lede}</div>
        {children}
      </div>
      {stats && stats.length > 0 && (
        <div className="relative border-t border-white/15">
          <dl className="mx-auto flex max-w-6xl flex-wrap gap-x-10 gap-y-4 px-4 py-5">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] uppercase tracking-widest text-white/50">{s.label}</dt>
                <dd className="text-lg font-bold text-amber-300">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </header>
  )
}
