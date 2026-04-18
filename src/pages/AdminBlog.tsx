// src/pages/AdminBlog.tsx
import { useState, useEffect, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Blog {
    _id?: string
    id?: string
    title: string
    excerpt?: string
    content: string
    category?: string
    coverImage?: string
    image?: string
    readTime?: number
    createdAt?: string
}

interface BlogForm {
    title: string
    excerpt: string
    content: string
    category: string
    imageFile: File | null
    imagePreview: string
}

type ViewMode = 'dashboard' | 'new' | 'edit'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const blankForm = (): BlogForm => ({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    imageFile: null,
    imagePreview: '',
})

const categoryColour = (cat = ''): string => {
    const map: Record<string, string> = {
        dgca: 'bg-blue-100 text-blue-700',
        'cpl guide': 'bg-purple-100 text-purple-700',
        training: 'bg-green-100 text-green-700',
        career: 'bg-yellow-100 text-yellow-700',
        medical: 'bg-red-100 text-red-700',
        'after 12th': 'bg-orange-100 text-orange-700',
    }
    return map[(cat || '').toLowerCase()] || 'bg-gray-100 text-gray-600'
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
    ],
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminBlog() {
    const navigate = useNavigate()
    const [view, setView] = useState<ViewMode>('dashboard')

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [blogsLoading, setBlogsLoading] = useState(true)
    const [blogsError, setBlogsError] = useState('')

    const [form, setForm] = useState<BlogForm>(blankForm())
    const [editingId, setEditingId] = useState<string | null>(null)

    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    // ── Auth ────────────────────────────────────────────────────────────────
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('weone_admin')
        if (!isLoggedIn) navigate('/admin/login', { replace: true })
    }, [navigate])

    // ── Fetch blogs ─────────────────────────────────────────────────────────
    const fetchBlogs = useCallback(async () => {
        setBlogsLoading(true)
        setBlogsError('')
        try {
            const res = await fetch(`${API_URL}/api/blogs`)
            const data = await res.json()
            setBlogs(Array.isArray(data) ? data : data.blogs ?? [])
        } catch {
            setBlogsError('Could not load blogs. Make sure your backend is running.')
        } finally {
            setBlogsLoading(false)
        }
    }, [])

    useEffect(() => { fetchBlogs() }, [fetchBlogs])

    // ── Form helpers ────────────────────────────────────────────────────────
    const setField = <K extends keyof BlogForm>(key: K, val: BlogForm[K]) =>
        setForm(f => ({ ...f, [key]: val }))

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setField('imageFile', file)
            setField('imagePreview', URL.createObjectURL(file))
        }
    }

    const openNew = () => {
        setForm(blankForm())
        setEditingId(null)
        setStatus('')
        setView('new')
    }

    const openEdit = (blog: Blog) => {
        setForm({
            title: blog.title ?? '',
            excerpt: blog.excerpt ?? '',
            content: blog.content ?? '',
            category: blog.category ?? '',
            imageFile: null,
            imagePreview: blog.coverImage ?? blog.image ?? '',
        })
        setEditingId(blog._id ?? blog.id ?? null)
        setStatus('')
        setView('edit')
    }

    const backToDashboard = () => {
        setView('dashboard')
        setStatus('')
        fetchBlogs()
    }

    const handleLogout = () => {
        sessionStorage.removeItem('weone_admin')
        document.cookie = 'weone_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        navigate('/admin/login', { replace: true })
    }

    // ── Submit ──────────────────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (!form.title || !form.content) {
            setStatus('❌ Title and content are required.')
            return
        }
        setLoading(true)
        setStatus(view === 'edit' ? 'Saving changes...' : 'Publishing...')

        try {
            const formData = new FormData()
            formData.append('title', form.title)
            formData.append('excerpt', form.excerpt)
            formData.append('content', form.content)
            formData.append('category', form.category)
            if (form.imageFile) formData.append('coverImage', form.imageFile)

            const isEdit = view === 'edit'
            const url = isEdit ? `${API_URL}/api/blogs/${editingId}` : `${API_URL}/api/blogs`
            const method = isEdit ? 'PUT' : 'POST'

            const res = await fetch(url, { method, body: formData })
            const text = await res.text()

            let data: { success: boolean; message?: string }
            try { data = JSON.parse(text) } catch {
                setStatus(`❌ Server error: ${text.substring(0, 100)}`)
                setLoading(false)
                return
            }

            if (data.success) {
                setStatus(isEdit ? '✅ Blog updated!' : '✅ Blog published!')
                setTimeout(() => backToDashboard(), 1200)
            } else {
                setStatus(`❌ ${data.message ?? 'Something went wrong.'}`)
                setLoading(false)
            }
        } catch (e: unknown) {
            setStatus(`❌ Network error: ${(e as Error).message}`)
            setLoading(false)
        }
    }

    // ── Delete ──────────────────────────────────────────────────────────────
    const handleDelete = async () => {
        if (!confirm('Delete this blog permanently? This cannot be undone.')) return
        setLoading(true)
        setStatus('Deleting...')
        try {
            const res = await fetch(`${API_URL}/api/blogs/${editingId}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                setStatus('✅ Deleted.')
                setTimeout(() => backToDashboard(), 900)
            } else {
                setStatus(`❌ ${data.message ?? 'Delete failed.'}`)
                setLoading(false)
            }
        } catch (e: unknown) {
            setStatus(`❌ ${(e as Error).message}`)
            setLoading(false)
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // DASHBOARD
    // ════════════════════════════════════════════════════════════════════════
    if (view === 'dashboard') return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-10 pt-28">

                {/* Top bar */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">Blog Manager</h1>
                        <p className="text-gray-500 text-sm">
                            {blogsLoading
                                ? 'Loading...'
                                : `${blogs.length} blog${blogs.length !== 1 ? 's' : ''} published`}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={openNew}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                            ✏️ Write New Blog
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>

                {/* Stats */}
                {!blogsLoading && !blogsError && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                            <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">Total Blogs</p>
                            <p className="text-3xl font-bold text-blue-700">{blogs.length}</p>
                        </div>
                        <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                            <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Published</p>
                            <p className="text-3xl font-bold text-green-700">{blogs.length}</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                            <p className="text-xs text-purple-500 font-semibold uppercase tracking-wide mb-1">Categories</p>
                            <p className="text-3xl font-bold text-purple-700">
                                {new Set(blogs.map(b => (b.category ?? '').toLowerCase()).filter(Boolean)).size}
                            </p>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {blogsLoading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                        <p className="text-gray-400 text-sm">Loading blogs...</p>
                    </div>
                )}

                {/* Error */}
                {blogsError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center text-sm">
                        {blogsError}
                        <button onClick={fetchBlogs} className="ml-3 underline font-medium">Retry</button>
                    </div>
                )}

                {/* Empty */}
                {!blogsLoading && !blogsError && blogs.length === 0 && (
                    <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-2xl">
                        <p className="text-5xl mb-3">📝</p>
                        <p className="text-gray-500 font-medium">No blogs yet</p>
                        <p className="text-gray-400 text-sm mt-1">Click "Write New Blog" to get started</p>
                    </div>
                )}

                {/* Blog rows */}
                {!blogsLoading && !blogsError && blogs.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {blogs.map((blog, i) => (
                            <div
                                key={blog._id ?? blog.id ?? i}
                                className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all"
                            >
                                {/* Thumbnail */}
                                <div className="w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    {(blog.coverImage ?? blog.image) ? (
                                        <img
                                            src={blog.coverImage ?? blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">🖼️</div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        {blog.category && (
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColour(blog.category)}`}>
                                                {blog.category}
                                            </span>
                                        )}
                                        {blog.readTime && (
                                            <span className="text-xs text-gray-400">⏱ {blog.readTime} min read</span>
                                        )}
                                    </div>
                                    <p className="font-semibold text-gray-900 truncate">{blog.title}</p>
                                    {blog.excerpt && (
                                        <p className="text-sm text-gray-400 truncate mt-0.5">{blog.excerpt}</p>
                                    )}
                                </div>

                                {/* Date */}
                                <div className="text-right flex-shrink-0 hidden sm:block">
                                    <p className="text-xs text-gray-400">
                                        {blog.createdAt
                                            ? new Date(blog.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                            })
                                            : '—'}
                                    </p>
                                </div>

                                {/* Edit */}
                                <button
                                    onClick={() => openEdit(blog)}
                                    className="flex-shrink-0 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )

    // ════════════════════════════════════════════════════════════════════════
    // NEW / EDIT FORM
    // ════════════════════════════════════════════════════════════════════════
    return (
        <div className="min-h-screen bg-gray-50">
            <style>{`
                .ql-editor { min-height: 300px; font-size: 16px; }
                .ql-container { border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; }
                .ql-toolbar { border-top-left-radius: 6px; border-top-right-radius: 6px; }
            `}</style>

            <div className="max-w-4xl mx-auto px-4 py-10 pt-28">

                {/* Header */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={backToDashboard}
                            className="text-gray-400 hover:text-gray-700 text-sm flex items-center gap-1 transition-colors"
                        >
                            ← Back
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {view === 'edit' ? 'Edit Blog' : 'Write a Blog'}
                            </h1>
                            <p className="text-gray-500 text-sm">
                                {view === 'edit'
                                    ? 'Make your changes and click Save — updates instantly.'
                                    : 'Fill in the details and click Publish — appears instantly.'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {view === 'edit' && (
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-4 py-2 border border-red-300 text-red-500 hover:bg-red-500 hover:text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                            >
                                🗑 Delete
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>

                {/* Form card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-6">

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Blog Title *</label>
                        <input
                            className="w-full border border-gray-200 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                            placeholder="Enter a compelling title..."
                            value={form.title}
                            onChange={e => setField('title', e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
                        <input
                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                            placeholder="e.g. CPL Guide, DGCA, Career, Medical, Training"
                            value={form.category}
                            onChange={e => setField('category', e.target.value)}
                        />
                        {/* Quick-pick pills */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {['CPL Guide', 'DGCA', 'Career', 'Medical', 'Training', 'After 12th'].map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setField('category', cat)}
                                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${form.category === cat
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cover image */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Cover Image</label>
                        <div
                            className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50"
                            onClick={() => document.getElementById('imageInput')?.click()}
                        >
                            {form.imagePreview ? (
                                <img src={form.imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                            ) : (
                                <div>
                                    <p className="text-4xl mb-2">🖼️</p>
                                    <p className="text-gray-500 text-sm font-medium">Click to upload cover image</p>
                                    <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP up to 5MB</p>
                                </div>
                            )}
                        </div>
                        <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        {form.imagePreview && (
                            <button
                                onClick={() => { setField('imageFile', null); setField('imagePreview', '') }}
                                className="mt-2 text-red-500 text-sm hover:underline"
                            >
                                ✕ Remove image
                            </button>
                        )}
                    </div>

                    {/* SEO excerpt */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">SEO Description</label>
                        <textarea
                            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white resize-none"
                            placeholder="Short description shown in search results and blog cards (1–2 sentences)"
                            rows={3}
                            value={form.excerpt}
                            onChange={e => setField('excerpt', e.target.value)}
                        />
                        <p className="text-xs text-gray-400 mt-1">{form.excerpt.length}/160 characters recommended</p>
                    </div>

                    {/* Rich text content */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Blog Content *</label>
                        <ReactQuill
                            theme="snow"
                            value={form.content}
                            onChange={v => setField('content', v)}
                            modules={modules}
                            placeholder="Write your blog content here..."
                        />
                    </div>

                    {/* Action row */}
                    <div className="flex items-center gap-4 pt-2 border-t border-gray-100 flex-wrap">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`px-8 py-3 rounded-lg text-base font-semibold text-white transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {loading
                                ? (view === 'edit' ? 'Saving...' : 'Publishing...')
                                : (view === 'edit' ? '💾 Save Changes' : '🚀 Publish Blog')}
                        </button>
                        <button
                            onClick={backToDashboard}
                            className="px-6 py-3 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                        {status && (
                            <p className={`font-medium text-sm ${status.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                                {status}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}