import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getReadingMinutes } from '@/lib/blogData'
import { TOPICS, postsInTopic, topicBySlug } from '@/lib/blogTopics'
import { BlogMasthead, formatDate } from '@/components/blog/EditorialKit'
import type { BlogPost } from '@/types/blog'
import type { KeyFact } from '@/components/blog/EditorialKit'

/**
 * A topic hub: the cluster's orientation copy, its posts in reading order, and
 * the sourced facts the cluster settles between them.
 *
 * Nothing on this page is a new claim. The facts panel is assembled from the
 * `keyFacts` already carried by the posts, each of which names the document it
 * came from, and the reading order comes from the cluster definition. If a post
 * is edited, this page follows.
 */
export default function BlogTopic() {
  const { topic: slug } = useParams()
  const topic = topicBySlug(slug)
  const posts = useMemo(() => (topic ? postsInTopic(topic) : []), [topic])

  // Two facts per post until six, so one long post cannot fill the panel.
  const facts = useMemo(() => {
    const out: KeyFact[] = []
    const seen = new Set<string>()
    for (const p of posts) {
      for (const f of (p.keyFacts || []).slice(0, 2)) {
        if (seen.has(f.fact)) continue
        seen.add(f.fact)
        out.push(f)
        if (out.length >= 6) return out
      }
    }
    return out
  }, [posts])

  const sources = useMemo(() => {
    const seen = new Map<string, { source: string; href?: string }>()
    for (const p of posts) for (const f of p.keyFacts || []) if (!seen.has(f.source)) seen.set(f.source, f)
    return Array.from(seen.values())
  }, [posts])

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">Topic not found</h1>
          <Link to="/blogs" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-2">
            Back to the blog
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/60">
        <ol className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/blogs" className="hover:text-primary">Blog</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-foreground">{topic.name}</li>
        </ol>
      </nav>

      <BlogMasthead
        eyebrow="Topic"
        title={topic.h1}
        lede={
          <>
            {topic.summary}{' '}
            <Link to="/editorial-policy" className="font-medium text-amber-300 underline underline-offset-2">
              How we check the figures
            </Link>
            .
          </>
        }
        stats={[
          { value: String(posts.length), label: 'Articles' },
          { value: String(sources.length), label: 'Documents cited' },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="article-body">
          {topic.intro.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        {facts.length > 0 && (
          <section aria-labelledby="settles" className="my-10 rounded-xl border border-primary/25 bg-primary/5 p-5 md:p-6">
            <h2 id="settles" className="text-sm font-bold uppercase tracking-wide text-primary">
              What these pages settle
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
                        className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary hover:bg-primary/20"
                      >
                        Sourced: {f.source}
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Sourced: {f.source}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="reading-order" className="mt-12">
          <h2 id="reading-order" className="text-2xl font-bold text-foreground">Read in this order</h2>
          <ol className="mt-6 space-y-4">
            {posts.map((post: BlogPost, i) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary"
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-bold leading-snug text-foreground">{post.title}</span>
                    {post.excerpt && (
                      <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{post.excerpt}</span>
                    )}
                    <span className="mt-2 block text-xs text-muted-foreground">
                      {getReadingMinutes(post)} min read
                      {(post.updatedAt || post.createdAt) && (
                        <>
                          {' · Last verified '}
                          <time dateTime={post.updatedAt || post.createdAt}>
                            {formatDate(post.updatedAt || post.createdAt)}
                          </time>
                        </>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {sources.length > 0 && (
          <section aria-labelledby="sources" className="mt-12 border-t border-border pt-8">
            <h2 id="sources" className="text-xl font-bold text-foreground">Documents these pages cite</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {sources.map((s) => (
                <li key={s.source}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                      {s.source}
                    </a>
                  ) : (
                    s.source
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="other-topics" className="mt-12 border-t border-border pt-8">
          <h2 id="other-topics" className="text-xl font-bold text-foreground">Other topics</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {TOPICS.filter((t) => t.slug !== topic.slug).map((t) => (
              <li key={t.slug}>
                <Link
                  to={`/blog/topic/${t.slug}`}
                  className="flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <span className="text-sm font-bold text-foreground">{t.name}</span>
                  <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  )
}
