/** Shape of a post from src/lib/blogData.js or the /api/blogs endpoint. */
export interface BlogPost {
    _id?: string
    slug?: string
    title: string
    seoTitle?: string
    metaDescription?: string
    excerpt?: string
    intro?: string
    content?: string
    category?: string
    tags?: string[]
    author?: string
    authorRole?: string
    coverImage?: string
    createdAt?: string
    updatedAt?: string
    faqs?: { q: string; a: string }[]
}
