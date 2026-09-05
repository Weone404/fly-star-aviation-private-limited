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
    /** Alt text for the cover image, when the title is not a good description. */
    coverAlt?: string
    /** Marks the post the listing leads with. Search value, not recency. */
    featured?: boolean
    /**
     * 3-5 facts pulled from the post's own sourced material, rendered as React
     * text rather than HTML — this field never touches the sanitiser because it
     * never becomes markup. Every entry names the document it came from.
     */
    keyFacts?: { fact: string; source: string; href?: string }[]
    /**
     * The one widely-repeated claim this post corrects, given the loudest
     * treatment on the page. Optional, and only where a primary source settles
     * it.
     */
    correction?: { claim: string; correction: string; source: string; href?: string }
}
