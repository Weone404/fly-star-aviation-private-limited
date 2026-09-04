import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SocialShareButtons } from '@/components/SocialShareButtons'
import { getBlogPost, getReadingMinutes } from '@/lib/blogData'
import { isApproved } from '@/lib/blogApproval'
import { sanitizeHtml } from '@/lib/sanitizeHtml'
import type { BlogPost } from '@/types/blog'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const formatBlogDate = (value?: string) => {
    if (!value) return 'N/A'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    })
}

export default function BlogDetail() {
    const { id, slug } = useParams()
    const postId = id || slug
    const [blog, setBlog] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [readProgress, setReadProgress] = useState(0)

    // Reading time is computed from the article body (200 wpm) instead of the
    // old hardcoded "5 min read", which understated every long-form guide.
    const readingMinutes = blog ? getReadingMinutes(blog) : 0
    const authorName = blog?.author || 'Flying Star Aviator Academics Team'
    const authorRole = blog?.authorRole || 'DGCA CPL & ATPL ground instruction, Dwarka, New Delhi'

    useEffect(() => {
        if (!postId) return
        // Try the API first; fall back to the static posts in blogData.js
        fetch(`${API_URL}/api/blogs/${postId}`)
            .then(res => res.json())
            .then(data => {
                // A post from the API is only trusted if a human approved that
                // exact slug. Everything else falls back to the committed posts —
                // the write endpoint is open, and this body is rendered as HTML.
                if (data && data.title && isApproved(data.slug)) { setBlog(data); setLoading(false) }
                else if (getBlogPost(postId)) { setBlog(getBlogPost(postId)); setLoading(false) }
                else { setLoading(false) }
            })
            .catch(() => {
                if (getBlogPost(postId)) setBlog(getBlogPost(postId))
                setLoading(false)
            })
    }, [postId])

    // Reading progress bar
    useEffect(() => {
        const handleScroll = () => {
            const el = document.documentElement
            const scrolled = el.scrollTop
            const total = el.scrollHeight - el.clientHeight
            setReadProgress(total > 0 ? (scrolled / total) * 100 : 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-[hsl(145,70%,22%)]/20 border-t-[hsl(145,70%,22%)] animate-spin" />
            <p className="text-muted-foreground text-sm">Loading article...</p>
        </div>
    )

    if (!blog) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
            <div className="text-6xl animate-float">✈️</div>
            <h1 className="text-2xl font-bold text-foreground">Article Not Found</h1>
            <p className="text-muted-foreground text-sm">This flight path doesn't exist.</p>
            <Link to="/blogs"
                className="aviation-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold mt-2 btn-aviation">
                ← Back to Blogs
            </Link>
        </div>
    )

    return (
        <div className="min-h-screen bg-background">

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border">
                <div
                    className="h-full gold-gradient transition-all duration-100"
                    style={{ width: `${readProgress}%` }}
                />
            </div>

            {/* Hero */}
            <header className="relative h-72 md:h-96 overflow-hidden">
                {blog.coverImage ? (
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        width={1600}
                        height={900}
                    />
                ) : (
                    <div className="w-full h-full aviation-gradient" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(145,80%,15%)] via-[hsl(145,80%,15%)]/50 to-transparent" />

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
                    <span className="inline-block gold-gradient text-[hsl(145,80%,15%)] text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                        {blog.category}
                    </span>
                    <h1 className="font-bold text-white text-2xl md:text-4xl leading-tight mb-3">
                        {blog.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-white/60 text-xs">
                        <span>By <span className="text-white/80 font-medium">{authorName}</span></span>
                        <span>
                            Published <time dateTime={blog.createdAt}>{formatBlogDate(blog.createdAt)}</time>
                        </span>
                        {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                            <span>
                                Updated <time dateTime={blog.updatedAt}>{formatBlogDate(blog.updatedAt)}</time>
                            </span>
                        )}
                        <span>{readingMinutes} min read</span>
                        <span>{blog.category}</span>
                    </div>
                </div>
            </header>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="bg-[hsl(145,80%,15%)] border-b border-amber-400/20 px-4 py-3">
                <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-white/50">
                    <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/blogs" className="hover:text-amber-400 transition-colors">Blogs</Link>
                    <span>/</span>
                    <span aria-current="page" className="text-amber-400 truncate max-w-xs">{blog.title}</span>
                </div>
            </nav>

            {/* Article Layout */}
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content */}
                <article className="lg:col-span-2">
                    {/* Article Card */}
                    <div className="bg-white rounded-2xl border border-border shadow-card p-8 md:p-10">

                        {/* Byline */}
                        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border">
                            <div className="w-10 h-10 rounded-full aviation-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
                                FS
                            </div>
                            <div className="text-xs leading-snug">
                                <p className="font-semibold text-foreground">{authorName}</p>
                                <p className="text-muted-foreground">{authorRole}</p>
                            </div>
                        </div>

                        {/* Key takeaway */}
                        {blog.excerpt && (
                            <div className="border-l-4 border-[hsl(145,70%,22%)] pl-4 mb-8 bg-[hsl(145,70%,22%)]/5 py-3 rounded-r-xl">
                                <p className="text-[hsl(145,70%,22%)] font-medium text-sm leading-relaxed italic">
                                    {blog.excerpt}
                                </p>
                            </div>
                        )}

                        {blog.intro && (
                            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                {blog.intro}
                            </p>
                        )}

                        <div className="mb-8 flex justify-end">
                            <SocialShareButtons title={blog.title} label="Share this article" className="justify-end" />
                        </div>

                        {/* Content */}
                        <div
                            className="article-content prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-[hsl(145,70%,22%)]
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-sm
                prose-li:text-muted-foreground prose-li:text-sm
                prose-strong:text-foreground
                prose-a:text-[hsl(145,70%,22%)] prose-a:no-underline hover:prose-a:underline
                prose-ul:my-4 prose-ol:my-4"
                            // Sanitised even though the post is approved: approval is
                            // a review of the text, not proof the markup is safe.
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {(blog.tags || ['Pilot Training', 'Aviation', blog.category, 'DGCA', 'India']).map((tag: string) => (
                            <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-[hsl(145,70%,22%)]/10 text-[hsl(145,70%,22%)] font-medium border border-[hsl(145,70%,22%)]/20">
                                #{tag.replace(/\s+/g, '')}
                            </span>
                        ))}
                    </div>

                    {/* Back Button */}
                    <div className="mt-8">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 aviation-gradient text-white px-6 py-3 rounded-xl text-sm font-semibold btn-aviation"
                        >
                            ← Back to All Articles
                        </Link>
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-6">

                    {/* Author Card */}
                    <div className="bg-white rounded-2xl border border-border shadow-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full aviation-gradient flex items-center justify-center text-white font-bold text-lg">
                                FS
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-sm">{authorName}</p>
                                <p className="text-xs text-muted-foreground">{authorRole}</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Expert guidance on pilot training, DGCA exams, and aviation careers in India.
                        </p>
                    </div>

                    {/* CTA Card */}
                    <div className="aviation-gradient rounded-2xl p-6 text-center">
                        <div className="text-3xl mb-3 animate-float">✈️</div>
                        <h3 className="font-bold text-white text-base mb-2">Start Your Pilot Journey</h3>
                        <p className="text-white/60 text-xs mb-4">Get free expert guidance from our airline pilot mentors</p>

                        <a
                            href="https://wa.me/919355611996"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block gold-gradient text-[hsl(145,80%,15%)] font-bold text-xs py-3 rounded-xl btn-aviation animate-pulse-glow"
                        >
                            📱 Talk to an Expert
                        </a>
                    </div>

                    {/* Quick Info */}
                    <div className="bg-white rounded-2xl border border-border shadow-card p-6">
                        <h4 className="font-bold text-foreground text-sm mb-4">Article Info</h4>
                        <div className="space-y-3">
                            {[
                                { label: 'Category', value: blog.category },
                                { label: 'Published', value: formatBlogDate(blog.createdAt) },
                                { label: 'Read Time', value: `${readingMinutes} min read` },
                                ...(blog.updatedAt ? [{ label: 'Updated', value: formatBlogDate(blog.updatedAt) }] : []),
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center text-xs border-b border-border pb-2 last:border-0 last:pb-0">
                                    <span className="text-muted-foreground">{item.label}</span>
                                    <span className="font-semibold text-foreground">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-border shadow-card p-6">
                        <h4 className="font-bold text-foreground text-sm mb-4">Share Article</h4>
                        <SocialShareButtons title={blog.title} label="" className="flex-wrap" />
                    </div>
                </aside>
            </div>



            {/* Bottom CTA */}
            < div className="aviation-gradient py-16 px-4 text-center" >
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-3">
                        Ready to Take <span className="gold-text">Flight?</span>
                    </h2>
                    <p className="text-white/60 text-sm mb-8">
                        Join thousands of students who started their pilot journey with Flystar Aviation
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <a
                            href="https://wa.me/919355611996"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 gold-gradient text-[hsl(145,80%,15%)] px-8 py-3.5 rounded-xl font-bold text-sm animate-pulse-glow btn-aviation"
                        >
                            ✈️ Talk to an Expert
                        </a>
                        <Link
                            to="/blogs"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-all"
                        >
                            ← More Articles
                        </Link>
                    </div>
                </div >
            </div >
        </div >


    )
}