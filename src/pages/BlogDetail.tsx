import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BLOG_POSTS, STATIC_BLOG_POSTS, getBlogPost, getReadingMinutes } from '@/lib/blogData'
import { sanitizeHtml } from '@/lib/sanitizeHtml'
import { prepareArticle } from '@/lib/articleHtml'
import { neighboursInTopic, sourcesOf } from '@/lib/blogTopics'
import { imagesFor } from '@/lib/blogImages'
import { Fragment } from 'react'
import {
  ArticleFigure,
  BackToTop,
  Breadcrumbs,
  CorrectionQuote,
  FaqAccordions,
  KeyFacts,
  PostHero,
  ReadingProgress,
  RelatedPosts,
  ShareBar,
  TableOfContents,
  TagList,
  formatDate,
  relatedTo,
} from '@/components/blog/EditorialKit'
import type { BlogPost } from '@/types/blog'

/**
 * Adds <meta name="robots" content="noindex,nofollow"> while mounted.
 *
 * A "not found" body served with HTTP 200 is a soft 404 — Google may index it,
 * and an externally linked spam URL would otherwise look like a live page on
 * this domain. The SPA cannot set a status code, so this is the signal it can
 * send.
 */
function NoIndex({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const el = document.createElement('meta')
    el.name = 'robots'
    el.content = 'noindex,nofollow'
    document.head.appendChild(el)
    return () => { el.remove() }
  }, [])
  return <>{children}</>
}

const staticSlugs = new Set(
  (STATIC_BLOG_POSTS as BlogPost[]).map((p) => p.slug).filter(Boolean) as string[],
)

export default function BlogDetail() {
  const { id, slug } = useParams()
  const postId = id || slug
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!postId) return

    // No runtime fetch. BLOG_POSTS already holds every post this site will
    // show: the ones committed here, plus the ones scripts/fetch-blogs.mjs
    // pulled from /api/blogs at build time and a human approved by slug in
    // src/lib/blogApproval.ts. getBlogPost resolves either a slug or a legacy
    // _id, so it covers both URL forms.
    //
    // Two earlier versions of this effect fetched the API directly and rendered
    // whatever came back. That endpoint takes unauthenticated writes and this
    // body renders as HTML, so every one of those responses was untrusted input
    // on the page. Reading from the build output removes the path entirely.
    setBlog(getBlogPost(postId))
    setLoading(false)
  }, [postId])

  // Sanitised even though the post is approved: approval is a review of the
  // text, not proof the markup is safe. Everything downstream — anchors, the
  // FAQ split, the table wrappers — operates on the output of this call.
  const sanitized = useMemo(() => sanitizeHtml(blog?.content), [blog?.content])
  const parts = useMemo(() => prepareArticle(sanitized, blog?.faqs), [sanitized, blog?.faqs])

  // A post that came from the database gets the plain layout. The editorial
  // treatment reads as a claim about how carefully a page was checked, and that
  // claim is only true for the posts written and sourced in this repo.
  const isEditorial = Boolean(blog?.slug && staticSlugs.has(blog.slug))

  const readingMinutes = blog ? getReadingMinutes(blog) : 0
  const authorName = blog?.author || 'Flying Star Aviator Academics Team'
  const authorRole = blog?.authorRole || 'DGCA CPL & ATPL ground instruction, Dwarka, New Delhi'
  const cluster = useMemo(() => (blog ? neighboursInTopic(blog) : null), [blog])
  const sources = useMemo(() => (blog ? sourcesOf(blog) : []), [blog])
  const images = useMemo(() => imagesFor(blog?.slug), [blog?.slug])
  const cover = images.find((i) => i.slot === 'cover' && i.ready)
  const related = useMemo(
    () => (blog && isEditorial ? relatedTo(blog, BLOG_POSTS as BlogPost[]) : []),
    [blog, isEditorial],
  )

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading article…</p>
      </div>
    )
  }

  // An unapproved or unknown post must never look like a real page to a search
  // engine. /blog/<slug> for anything not prerendered is a hard 404 from the
  // edge (see vercel.json); this covers the legacy /blogs/<id> path, which stays
  // routed to the SPA so old links keep working.
  if (!blog) {
    return (
      <NoIndex>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Article not found</h1>
          <p className="text-sm text-muted-foreground">This page does not exist.</p>
          <Link to="/blogs" className="mt-2 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground">
            Back to the blog
          </Link>
        </div>
      </NoIndex>
    )
  }

  const body = parts.faqExtracted ? parts.bodyHtml : sanitized

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {isEditorial && <ReadingProgress />}
      <Breadcrumbs title={blog.title} />

      {isEditorial && cluster?.topic && (
        <div className="border-b border-border bg-primary/5">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-xs text-muted-foreground sm:px-6 xl:max-w-7xl">
            <Link to={`/blog/topic/${cluster.topic.slug}`} className="font-semibold text-primary hover:underline">
              {cluster.topic.name}
            </Link>
            <span aria-hidden="true">·</span>
            <span>
              Part {cluster.position} of {cluster.total}
            </span>
          </div>
        </div>
      )}

      {isEditorial ? (
        <PostHero post={blog} readingMinutes={readingMinutes} authorName={authorName} authorRole={authorRole} />
      ) : (
        <header className="border-b border-border bg-card">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 xl:max-w-7xl">
            <h1 className="text-3xl font-bold leading-tight text-foreground">{blog.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {blog.category} · {readingMinutes} min read
              {blog.createdAt && <> · <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time></>}
            </p>
          </div>
        </header>
      )}

      <div className="mx-auto w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="min-w-0">
          {isEditorial && (
            <>
              <KeyFacts facts={blog.keyFacts} />
              <TableOfContents items={parts.toc} variant="mobile" />
              <CorrectionQuote item={blog.correction} />
            </>
          )}

          {(cover || blog.coverImage) && (
            <figure className="my-8">
              <img
                src={cover?.file || blog.coverImage}
                alt={cover?.alt || blog.coverAlt || blog.title}
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border border-border object-cover"
              />
            </figure>
          )}

          {parts.sections.length > 0 ? (
            <>
              {parts.sections.map((section) => (
                <Fragment key={section.heading}>
                  <div className="article-body" dangerouslySetInnerHTML={{ __html: section.html }} />
                  {images
                    .filter((img) => img.slot === 'inline' && img.after === section.heading)
                    .map((img) => (
                      <ArticleFigure key={img.file} image={img} />
                    ))}
                </Fragment>
              ))}
              {/* An illustration aimed at a heading that no longer exists still
                  belongs on the page rather than nowhere. */}
              {images
                .filter(
                  (img) =>
                    img.slot === 'inline' &&
                    !parts.sections.some((section) => section.heading === img.after),
                )
                .map((img) => (
                  <ArticleFigure key={img.file} image={img} />
                ))}
            </>
          ) : (
            <div className="article-body" dangerouslySetInnerHTML={{ __html: body }} />
          )}

          {parts.faqExtracted && <FaqAccordions faqs={blog.faqs} />}

          {parts.tailHtml && (
            <div className="article-body mt-10" dangerouslySetInnerHTML={{ __html: parts.tailHtml }} />
          )}

          <TagList tags={blog.tags} />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <ShareBar title={blog.title} />
            <Link to="/blogs" className="text-sm font-semibold text-primary underline underline-offset-2">
              All articles
            </Link>
          </div>

          {isEditorial && sources.length > 0 && (
            <section aria-labelledby="sources" className="mt-12 border-t border-border pt-8">
              <h2 id="sources" className="text-xl font-bold text-foreground">Sources</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Every figure above traces to one of these documents. Where a claim could not be sourced, the
                page says so instead of repeating it.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {sources.map((s) => (
                  <li key={s.source}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-2"
                      >
                        {s.source}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{s.source}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {isEditorial && cluster?.topic && (cluster.prev || cluster.next) && (
            <nav
              aria-label={`More in ${cluster.topic.name}`}
              className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
            >
              {cluster.prev && (
                <Link
                  to={`/blog/${cluster.prev.slug}`}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Previous in {cluster.topic.name}
                  </span>
                  <span className="mt-1 block text-sm font-bold leading-snug text-foreground">
                    {cluster.prev.title}
                  </span>
                </Link>
              )}
              {cluster.next && (
                <Link
                  to={`/blog/${cluster.next.slug}`}
                  className="rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-primary/40 sm:col-start-2"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Next in {cluster.topic.name}
                  </span>
                  <span className="mt-1 block text-sm font-bold leading-snug text-foreground">
                    {cluster.next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}

          {isEditorial && <RelatedPosts posts={related} />}
        </article>

        {isEditorial && (
          <aside className="mt-10 min-w-0 lg:mt-0">
            <div className="lg:sticky lg:top-24 lg:space-y-6">
              <div className="hidden lg:block">
                <TableOfContents items={parts.toc} variant="desktop" />
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold text-foreground">Talk to the academics team</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Ground instruction for DGCA CPL and ATPL papers, from Dwarka, New Delhi.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>

      {isEditorial && <BackToTop />}
      <Footer />
    </div>
  )
}
