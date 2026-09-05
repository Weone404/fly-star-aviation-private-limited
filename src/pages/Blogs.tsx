import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BLOG_POSTS, sortBlogsByDate, getReadingMinutes } from '@/lib/blogData'
import { categoriesOf } from '@/lib/articleHtml'
import { formatDate } from '@/components/blog/EditorialKit'
import type { BlogPost } from '@/types/blog'

const ALL = 'All'

function Meta({ post }: { post: BlogPost }) {
  const verified = post.updatedAt || post.createdAt
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
      <span>{getReadingMinutes(post)} min read</span>
      {verified && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            Last verified <time dateTime={verified}>{formatDate(verified)}</time>
          </span>
        </>
      )}
    </p>
  )
}

function Cover({ post, className }: { post: BlogPost; className?: string }) {
  if (post.coverImage) {
    return (
      <img
        src={post.coverImage}
        alt={post.coverAlt || post.title}
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        className={className}
      />
    )
  }
  // No stock photo stand-in: an unrelated aeroplane picture tells the reader
  // nothing and costs a request. The category does both jobs.
  return (
    <div className={`${className} grid place-items-center bg-primary/10`}>
      <span className="px-4 text-center text-sm font-semibold uppercase tracking-wide text-primary">
        {post.category}
      </span>
    </div>
  )
}

export default function Blogs() {
  const posts = useMemo(() => sortBlogsByDate(BLOG_POSTS) as BlogPost[], [])
  const categories = useMemo(() => [ALL, ...categoriesOf(posts)], [posts])
  const [active, setActive] = useState<string>(ALL)

  // Chosen, not newest: the listing leads with the page that answers the
  // highest-intent question, and falls back to the most recent only if nothing
  // is marked.
  const featured = useMemo(() => posts.find((p) => p.featured) || posts[0], [posts])
  const rest = useMemo(() => posts.filter((p) => p !== featured), [posts, featured])

  // Filtering runs in the browser over markup that is already fully rendered.
  // The prerendered HTML contains every post, so a crawler — and a visitor with
  // no JavaScript — sees the complete list.
  const shown = active === ALL ? rest : rest.filter((p) => p.category === active)

  const href = (p: BlogPost) => (p.slug ? `/blog/${p.slug}` : `/blogs/${p._id}`)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Flying Star Aviator</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
            DGCA exams, licences and pilot training, explained from the source
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every figure on these pages is checked against the regulator&rsquo;s own documents, and anything
            we cannot source is marked as unsourced rather than filled in.{' '}
            <Link to="/editorial-policy" className="font-medium text-primary underline underline-offset-2">
              How we check them
            </Link>
            .
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {posts.length} articles · {categories.length - 1} categories
          </p>
        </div>
      </header>

      {featured && (
        <section aria-labelledby="featured" className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h2 id="featured" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Start here
            </h2>
            <Link
              to={href(featured)}
              className="mt-4 grid gap-6 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 md:grid-cols-[1fr_18rem] md:p-6"
            >
              <div className="min-w-0">
                {featured.category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {featured.category}
                  </span>
                )}
                <h3 className="mt-2 text-2xl font-bold leading-snug text-foreground">{featured.title}</h3>
                {featured.excerpt && (
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                )}
                <Meta post={featured} />
              </div>
              <Cover post={featured} className="h-44 w-full rounded-xl object-cover md:h-full" />
            </Link>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={
                active === c
                  ? 'inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground'
                  : 'inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post) => (
            <li key={post._id || post.slug}>
              <Link
                to={href(post)}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
              >
                <Cover post={post} className="h-40 w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  {post.category && (
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                      {post.category}
                    </span>
                  )}
                  <h3 className="mt-1.5 text-base font-bold leading-snug text-foreground">{post.title}</h3>
                  {post.excerpt && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  )}
                  <Meta post={post} />
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {shown.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Nothing in this category yet.
          </p>
        )}
      </div>

      <Footer />
    </div>
  )
}
