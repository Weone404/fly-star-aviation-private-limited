import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function AdminBlog() {
    const [title, setTitle] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
        ]
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async () => {
        if (!title || !content) {
            setStatus('❌ Title and content are required.')
            return
        }
        setLoading(true)
        setStatus('Publishing...')

        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('excerpt', excerpt)
            formData.append('content', content)
            formData.append('category', category)
            if (imageFile) formData.append('coverImage', imageFile)

            const res = await fetch(`${API_URL}/api/blogs`, {
                method: 'POST',
                body: formData,
            })

            const text = await res.text()
            const data = JSON.parse(text)

            if (data.success) {
                setStatus('✅ Blog published successfully!')
                setTitle('')
                setExcerpt('')
                setContent('')
                setCategory('')
                setImageFile(null)
                setImagePreview('')
            } else {
                setStatus(`❌ ${data.message || 'Something went wrong.'}`)
            }
        } catch (e: any) {
            setStatus(`❌ Network error: ${e.message}`)
        }
        setLoading(false)
    }

    return (
        <div className="max-w-4xl mx-auto p-8 pt-28">
            <h1 className="text-3xl font-bold mb-2">Write a Blog</h1>
            <p className="text-gray-500 mb-6">Fill in the details and click Publish — your blog will appear instantly.</p>

            <input
                className="w-full border p-3 rounded mb-4 text-lg"
                placeholder="Blog Title *"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <input
                className="w-full border p-3 rounded mb-4"
                placeholder="Category (e.g. CPL Guide, DGCA, Career, Medical)"
                value={category}
                onChange={e => setCategory(e.target.value)}
            />

            {/* Image Upload */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    onClick={() => document.getElementById('imageInput')?.click()}
                >
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                    ) : (
                        <div>
                            <p className="text-4xl mb-2">🖼️</p>
                            <p className="text-gray-500 text-sm">Click to upload cover image</p>
                            <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP up to 5MB</p>
                        </div>
                    )}
                </div>
                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
                {imagePreview && (
                    <button
                        onClick={() => { setImageFile(null); setImagePreview('') }}
                        className="mt-2 text-red-500 text-sm hover:underline"
                    >
                        ✕ Remove image
                    </button>
                )}
            </div>

            <textarea
                className="w-full border p-3 rounded mb-4"
                placeholder="Short description for SEO (1-2 sentences)"
                rows={3}
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
            />

            <div className="mb-6">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    placeholder="Write your blog content here..."
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-8 py-3 rounded-lg text-lg font-semibold text-white transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {loading ? 'Publishing...' : '🚀 Publish Blog'}
            </button>

            {status && (
                <p className={`mt-4 font-medium text-lg ${status.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                    {status}
                </p>
            )}
        </div>
    )
}