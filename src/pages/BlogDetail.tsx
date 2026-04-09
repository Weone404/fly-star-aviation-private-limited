import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const hardcoded: Record<string, any> = {
    '1': { _id: '1', title: 'How to Become a Commercial Pilot in India – Complete 2026 Guide', excerpt: 'Everything you need to know about becoming a CPL holder in India.', category: 'CPL Guide', createdAt: 'Dec 15, 2026', coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80', content: '<h2>What is a Commercial Pilot License (CPL)?</h2><p>A Commercial Pilot License (CPL) allows you to fly aircraft for compensation or hire. In India, the CPL is issued by the Directorate General of Civil Aviation (DGCA).</p><h2>Eligibility Requirements</h2><ul><li>Minimum age: 18 years</li><li>Educational qualification: 10+2 with Physics and Mathematics</li><li>Valid DGCA Class 1 Medical Certificate</li><li>Minimum 200 hours of total flight time</li></ul><h2>Conclusion</h2><p>Becoming a commercial pilot in India is a challenging but rewarding career path.</p>' },
    '2': { _id: '2', title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips', excerpt: 'Ace all 9 DGCA written exams.', category: 'DGCA', createdAt: 'Dec 10, 2026', coverImage: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&q=80', content: '<h2>Overview</h2><p>To obtain a CPL in India, candidates must pass 9 written examinations conducted by the DGCA.</p>' },
}

export default function BlogDetail() {
    const { id } = useParams()
    const [blog, setBlog] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [readProgress, setReadProgress] = useState(0)

    useEffect(() => {
        if (!id) return
        // Try MongoDB first, fallback to hardcoded
        fetch(`${API_URL}/api/blogs/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.title) { setBlog(data); setLoading(false) }
                else if (hardcoded[id]) { setBlog(hardcoded[id]); setLoading(false) }
                else { setLoading(false) }
            })
            .catch(() => {
                if (hardcoded[id]) setBlog(hardcoded[id])
                setLoading(false)
            })
    }, [id])

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
            <div className="relative h-72 md:h-96 overflow-hidden">
                {blog.coverImage ? (
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
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
                        <span>📅 {blog.createdAt ? new Date(blog.createdAt).toDateString() : ''}</span>
                        <span>⏱ 5 min read</span>
                        <span>✈️ {blog.category}</span>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-[hsl(145,80%,15%)] border-b border-amber-400/20 px-4 py-3">
                <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-white/50">
                    <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/blogs" className="hover:text-amber-400 transition-colors">Blogs</Link>
                    <span>/</span>
                    <span className="text-amber-400 truncate max-w-xs">{blog.title}</span>
                </div>
            </div>

            {/* Article Layout */}
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content */}
                <article className="lg:col-span-2">
                    {/* Article Card */}
                    <div className="bg-white rounded-2xl border border-border shadow-card p-8 md:p-10">

                        {/* Excerpt */}
                        {blog.excerpt && (
                            <div className="border-l-4 border-[hsl(145,70%,22%)] pl-4 mb-8 bg-[hsl(145,70%,22%)]/5 py-3 rounded-r-xl">
                                <p className="text-[hsl(145,70%,22%)] font-medium text-sm leading-relaxed italic">
                                    {blog.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-[hsl(145,70%,22%)]
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-sm
                prose-li:text-muted-foreground prose-li:text-sm
                prose-strong:text-foreground
                prose-a:text-[hsl(145,70%,22%)] prose-a:no-underline hover:prose-a:underline
                prose-ul:my-4 prose-ol:my-4"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {['Pilot Training', 'Aviation', blog.category, 'DGCA', 'India'].map(tag => (
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
                                <p className="font-bold text-foreground text-sm">Flystar Aviation</p>
                                <p className="text-xs text-muted-foreground">Aviation Experts</p>
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
                                { label: 'Published', value: blog.createdAt ? new Date(blog.createdAt).toDateString() : 'N/A' },
                                { label: 'Read Time', value: '5 min read' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center text-xs border-b border-border pb-2 last:border-0 last:pb-0">
                                    <span className="text-muted-foreground">{item.label}</span>
                                    <span className="font-semibold text-foreground">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Share */}
                    <div className="bg-white rounded-2xl border border-border shadow-card p-6">
                        <h4 className="font-bold text-foreground text-sm mb-4">Share Article</h4>
                        <div className="flex gap-3">
                            {[
                                { label: 'WhatsApp', emoji: '💬', href: `https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}` },
                                { label: 'Twitter', emoji: '🐦', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}` },
                                { label: 'Copy', emoji: '🔗', href: '#' },
                            ].map(s => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={s.label === 'Copy' ? (e) => { e.preventDefault(); navigator.clipboard.writeText(window.location.href) } : undefined}
                                    className="flex-1 text-center py-2 rounded-xl border border-border hover:border-[hsl(145,70%,22%)] hover:bg-[hsl(145,70%,22%)]/5 transition-all text-xs font-medium text-muted-foreground hover:text-[hsl(145,70%,22%)]"
                                    title={s.label}
                                >
                                    <div className="text-base mb-0.5">{s.emoji}</div>
                                    <div>{s.label}</div>
                                </a>
                            ))}
                        </div>
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