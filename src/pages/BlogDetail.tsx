import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BLOG_POSTS, STATIC_BLOG_POSTS, getBlogPost, getReadingMinutes } from '@/lib/blogData'
import { sanitizeHtml } from '@/lib/sanitizeHtml'
import { prepareArticle } from '@/lib/articleHtml'
import {
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

      {isEditorial ? (
        <PostHero post={blog} readingMinutes={readingMinutes} authorName={authorName} authorRole={authorRole} />
      ) : (
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-3xl font-bold leading-tight text-foreground">{blog.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {blog.category} · {readingMinutes} min read
              {blog.createdAt && <> · <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time></>}
            </p>
          </div>
        </header>
      )}

      <div className="mx-auto max-w-6xl gap-10 px-4 py-10 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="min-w-0">
          {isEditorial && (
            <>
              <KeyFacts facts={blog.keyFacts} />
              <TableOfContents items={parts.toc} variant="mobile" />
              <CorrectionQuote item={blog.correction} />
            </>
          )}

          {blog.coverImage && (
            <figure className="my-8">
              <img
                src={blog.coverImage}
                alt={blog.coverAlt || blog.title}
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border border-border object-cover"
              />
            </figure>
          )}

          <div className="article-body" dangerouslySetInnerHTML={{ __html: body }} />

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

          {isEditorial && <RelatedPosts posts={related} />}
        </article>

        {isEditorial && (
          <aside className="mt-10 lg:mt-0">
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
