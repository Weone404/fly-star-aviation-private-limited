import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BLOG_POSTS, sortBlogsByDate, getReadingMinutes } from '@/lib/blogData'
import { TOPICS, postsInTopic } from '@/lib/blogTopics'
import { isGenericCover } from '@/lib/blogImages'
import { BlogMasthead, IconArrow, formatDate } from '@/components/blog/EditorialKit'
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
  if (post.coverImage && !isGenericCover(post.coverImage)) {
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

  // Chosen, not newest: the listing leads with the page that answers the
  // highest-intent question, and falls back to the most recent only if nothing
  // is marked.
  const featured = useMemo(() => posts.find((p) => p.featured) || posts[0], [posts])

  // Posts that belong to no cluster still have to appear somewhere. They are
  // listed last under their own label rather than hidden — a category with two
  // posts does not deserve a hub page, but it does deserve to be readable.
  const clustered = useMemo(() => TOPICS.map((t) => ({ topic: t, posts: postsInTopic(t, posts) })), [posts])
  const inCluster = useMemo(
    () => new Set(clustered.flatMap((c) => c.posts.map((p) => p.slug))),
    [clustered],
  )
  const others = useMemo(() => posts.filter((p) => p.slug && !inCluster.has(p.slug)), [posts, inCluster])

  // Name the leftover group after its own category when it has only one, so the
  // heading says something. "More" is what it falls back to, not what it aims at.
  const othersLabel = useMemo(() => {
    const cats = new Set(others.map((p) => p.category).filter(Boolean))
    return cats.size === 1 ? (Array.from(cats)[0] as string) : 'More'
  }, [others])

  const sourceCount = useMemo(() => {
    const seen = new Set<string>()
    for (const p of posts) for (const f of p.keyFacts || []) seen.add(f.source)
    return seen.size
  }, [posts])

  const href = (p: BlogPost) => (p.slug ? `/blog/${p.slug}` : `/blogs/${p._id}`)

  const card = (post: BlogPost) => (
    <li key={post._id || post.slug}>
      <Link
        to={href(post)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-hover"
      >
        <span aria-hidden="true" className="gold-gradient h-1 w-full" />
        <Cover post={post} className="h-40 w-full object-cover" />
        <div className="flex flex-1 flex-col p-5">
          {post.category && (
            <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{post.category}</span>
          )}
          <h3 className="mt-1.5 text-base font-bold leading-snug text-foreground group-hover:text-primary">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
          )}
          <Meta post={post} />
        </div>
      </Link>
    </li>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <BlogMasthead
        eyebrow="Flying Star Aviator · Knowledge base"
        title={<>DGCA exams, CPL and pilot training in India &mdash; answered from the source documents</>}
        lede={
          <>
            Guides to the DGCA Flight Crew papers, licence eligibility and choosing ground classes. Every
            figure is checked against the regulator&rsquo;s own Civil Aviation Requirements or its Pariksha
            FAQ, and anything we cannot source is marked unsourced rather than filled in.{' '}
            <Link to="/editorial-policy" className="font-medium text-amber-300 underline underline-offset-2">
              How we check them
            </Link>
            .
          </>
        }
        stats={[
          { value: String(posts.length), label: 'Guides' },
          { value: String(TOPICS.length), label: 'Topics' },
          { value: String(sourceCount), label: 'Primary documents cited' },
        ]}
      >
        <nav aria-label="Topics" className="mt-7 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              to={`/blog/topic/${t.slug}`}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              {t.name}
              <IconArrow className="h-3.5 w-3.5" />
            </Link>
          ))}
        </nav>
      </BlogMasthead>

      {featured && (
        <section aria-labelledby="featured" className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 xl:max-w-7xl">
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

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 xl:max-w-7xl">
        {clustered.map(({ topic, posts: list }) => (
          <section key={topic.slug} aria-labelledby={topic.slug} className="mb-14">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
              <div className="min-w-0">
                <h2 id={topic.slug} className="text-2xl font-bold text-foreground">
                  {topic.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{topic.summary}</p>
              </div>
              <Link
                to={`/blog/topic/${topic.slug}`}
                className="inline-flex min-h-11 items-center whitespace-nowrap text-sm font-semibold text-primary underline underline-offset-2"
              >
                All {list.length} articles
              </Link>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map(card)}</ul>
          </section>
        ))}

        {others.length > 0 && (
          <section aria-labelledby="more" className="mb-6">
            <div className="border-b border-border pb-4">
              <h2 id="more" className="text-2xl font-bold text-foreground">{othersLabel}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Pages that do not yet sit in a topic. They get one when there is enough behind them to be
                worth a page of its own.
              </p>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{others.map(card)}</ul>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
