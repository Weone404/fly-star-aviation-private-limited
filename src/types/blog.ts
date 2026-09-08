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

/** One planned illustration for a post. See src/lib/blogImages.js. */
export interface BlogImage {
  slot: 'cover' | 'inline'
  /** Public path the generated file should be saved to. */
  file: string
  /** Real alt text: what the image shows, not a keyword list. */
  alt: string
  /** Optional visible caption. */
  caption?: string
  /** The generation prompt, minus the house style line. */
  prompt: string
  /** Place after the Nth h2 of the body. Inline images only. */
  after?: number
  /** True once the file exists at `file`. Until then it renders in dev only. */
  ready?: boolean
}
