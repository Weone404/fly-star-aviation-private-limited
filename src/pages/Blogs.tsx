import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const hardcoded = [
    { _id: '1', title: 'How to Become a Commercial Pilot in India – Complete 2026 Guide', excerpt: 'Everything you need to know about becoming a CPL holder in India – eligibility, DGCA exams, costs, flying hours, and career prospects.', category: 'CPL Guide', createdAt: 'Dec 15, 2026', coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80' },
    { _id: '2', title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips', excerpt: 'Ace all 9 DGCA written exams with our expert preparation strategy. Know the syllabus, exam pattern, and recommended study materials.', category: 'DGCA', createdAt: 'Dec 10, 2026', coverImage: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80' },
    { _id: '3', title: 'CPL Training in India vs Abroad – Which is Better?', excerpt: 'Pros and cons of training in India vs USA, Canada, Australia. Cost comparison, timelines, and license conversion process explained.', category: 'Training', createdAt: 'Dec 5, 2026', coverImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80' },
    { _id: '4', title: 'Pilot Salary in India 2026 – Complete Breakdown by Airline', excerpt: 'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains at IndiGo, Air India, SpiceJet.', category: 'Career', createdAt: 'Nov 28, 2026', coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' },
    { _id: '5', title: 'Medical Requirements to Become a Pilot – DGCA Class 1', excerpt: 'Detailed guide on DGCA Class 1 medical requirements, what conditions are disqualifying, and how to prepare for the medical exam.', category: 'Medical', createdAt: 'Nov 20, 2026', coverImage: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=800&q=80' },
    { _id: '6', title: 'How to Become a Pilot After 12th Science – Step-by-Step', excerpt: 'A complete roadmap for 12th PCM students aspiring to become commercial pilots. Colleges, entrance exams, fees, and timelines.', category: 'After 12th', createdAt: 'Nov 15, 2026', coverImage: 'https://images.unsplash.com/photo-1585995028913-16e7a4c9c1d3?w=800&q=80' },
]

const CATEGORIES = ['All', 'CPL Guide', 'DGCA', 'Career', 'Medical', 'Training', 'After 12th']

export default function Blogs() {
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState('All')
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch(`${API_URL}/api/blogs`)
            .then(res => res.json())
            .then(data => { setBlogs([...data, ...hardcoded]); setLoading(false) })
            .catch(() => { setBlogs(hardcoded); setLoading(false) })
    }, [])

    const filtered = blogs.filter(b => {
        const matchCat = activeFilter === 'All' || b.category === activeFilter
        const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || (b.excerpt || '').toLowerCase().includes(search.toLowerCase())
        return matchCat && matchSearch
    })

    const [featured, ...rest] = filtered

    return (
        <div className="min-h-screen bg-background">

            {/* ── Hero ── */}
            <div className="aviation-gradient pt-24 pb-16 px-4 text-center relative overflow-hidden">
                {/* Animated plane */}
                <div className="absolute top-8 left-0 w-full pointer-events-none">
                    <span className="animate-fly text-3xl inline-block">✈️</span>
                </div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <span className="inline-block bg-white/10 text-amber-400 border border-amber-400/30 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
                        Knowledge Hub
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Aviation Blog
                    </h1>
                    <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
                        Expert insights on pilot training, DGCA exams, career guidance and everything aviation
                    </p>

                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-amber-400/50 text-sm"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-400">🔍</span>
                    </div>
                </div>
            </div>

            {/* ── Stats Bar ── */}
            <div className="bg-[hsl(145,80%,15%)] border-y border-amber-400/20 py-4 px-4">
                <div className="max-w-5xl mx-auto flex justify-center gap-16">
                    {[
                        { num: `${blogs.length}+`, label: 'Articles' },
                        { num: '7+', label: 'Categories' },
                        { num: '100%', label: 'Free' },
                    ].map(s => (
                        <div key={s.label} className="text-center">
                            {/* ✅ FIX 1: was "gold-text" which broke as a gradient box */}
                            <div className="text-xl font-bold text-amber-400">{s.num}</div>
                            <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="bg-muted py-16 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Section Header + Filters */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <h2 className="text-2xl font-bold text-foreground">
                            {/* ✅ FIX 2: was "text-gradient" which broke as a gradient box */}
                            Latest <span className="text-[hsl(145,70%,35%)]">Articles</span>
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${activeFilter === cat
                                        ? 'bg-[hsl(145,70%,22%)] text-white border-[hsl(145,70%,22%)]'
                                        : 'bg-white text-muted-foreground border-border hover:border-[hsl(145,70%,22%)] hover:text-[hsl(145,70%,22%)]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="w-10 h-10 rounded-full border-4 border-[hsl(145,70%,22%)/20%] border-t-[hsl(145,70%,22%)] animate-spin" />
                            <p className="text-muted-foreground text-sm">Loading articles...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-24 text-muted-foreground">
                            <div className="text-5xl mb-4">✈️</div>
                            <p>No articles found. Try a different search or filter.</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Blog */}
                            {featured && (
                                <Link to={`/blogs/${featured._id}`} className="block mb-12 group">
                                    <div className="bg-white rounded-2xl overflow-hidden grid md:grid-cols-2 border border-border shadow-card hover:shadow-hover transition-all duration-300">
                                        <div className="relative min-h-[280px] bg-[hsl(145,70%,22%)] overflow-hidden">
                                            <img
                                                src={featured.coverImage}
                                                alt={featured.title}
                                                className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(145,80%,15%)]/60 to-transparent" />
                                            <span className="absolute top-4 left-4 gold-gradient text-[hsl(145,80%,15%)] text-xs font-bold px-3 py-1.5 rounded-full">
                                                ⭐ Featured
                                            </span>
                                        </div>
                                        <div className="p-10 flex flex-col justify-center">
                                            <span className="inline-block bg-[hsl(145,70%,22%)]/10 text-[hsl(145,70%,22%)] text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                                                {featured.category}
                                            </span>
                                            <h3 className="text-2xl font-bold text-foreground leading-snug mb-3 group-hover:text-[hsl(145,70%,22%)] transition-colors">
                                                {featured.title}
                                            </h3>
                                            <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                                                <span>📅 {featured.createdAt ? new Date(featured.createdAt).toDateString() : ''}</span>
                                                <span>⏱ 5 min read</span>
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                                            <div className="inline-flex items-center gap-2 aviation-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold w-fit btn-aviation">
                                                Read Article →
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Blog Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rest.map((blog, i) => (
                                    <Link
                                        to={`/blogs/${blog._id}`}
                                        key={blog._id}
                                        className={`block group scroll-fade-up stagger-${Math.min(i + 1, 5)}`}
                                    >
                                        <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden bg-[hsl(145,70%,22%)]">
                                                <img
                                                    src={blog.coverImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(145,80%,15%)]/40 to-transparent" />
                                                <span className="absolute top-3 left-3 gold-gradient text-[hsl(145,80%,15%)] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                                                    {blog.category}
                                                </span>
                                            </div>

                                            {/* Body */}
                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-[hsl(145,70%,22%)] transition-colors line-clamp-2">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                                                    {blog.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between pt-3 border-t border-border">
                                                    <span className="text-xs text-muted-foreground">
                                                        📅 {blog.createdAt ? new Date(blog.createdAt).toDateString() : ''}
                                                    </span>
                                                    <span className="text-xs font-semibold text-[hsl(145,70%,22%)] group-hover:text-amber-500 transition-colors">
                                                        Read →
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ── CTA Section ── */}
            <div className="aviation-gradient py-16 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="text-4xl mb-4 animate-float">✈️</div>
                    <h2 className="text-3xl font-bold text-white mb-3">
                        Ready to Start Your{' '}
                        <span className="text-amber-400">Pilot Journey?</span>
                    </h2>
                    <p className="text-white/60 text-sm mb-8">
                        Get free expert guidance from our airline pilot mentors
                    </p>

                    <a href="https://wa.me/919355611996"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 gold-gradient text-[hsl(145,80%,15%)] px-8 py-3.5 rounded-xl font-bold text-sm animate-pulse-glow btn-aviation"
                    >
                        ✈️ Talk to an Expert on WhatsApp
                    </a>
                </div>
            </div>

        </div>
    )
}