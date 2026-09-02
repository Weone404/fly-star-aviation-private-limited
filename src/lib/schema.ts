/**
 * Per-page JSON-LD builder. Emits page-appropriate structured data
 * (BreadcrumbList + a page-type node) that references the site-wide
 * Organization/WebSite defined statically in index.html.
 *
 * Injected by useSchema on every route so each prerendered page carries
 * correct schema instead of the old homepage graph.
 */
import { SITE_ORIGIN, canonicalUrl } from "./routes";
import { PAGE_META } from "./pageMeta";
import { getBlogPost, getWordCount, getReadingMinutes } from "./blogData.js";

const ORG_ID = `${SITE_ORIGIN}/#organization`;

// Human-readable labels for breadcrumb segments (acronyms, ampersands, etc.).
const LABELS: Record<string, string> = {
  courses: "Courses",
  cpl: "CPL Training",
  atpl: "ATPL Training",
  "cabin-crew": "Cabin Crew",
  "ground-staff": "Ground Staff",
  "airline-preparation": "Airline Preparation",
  "Air-india-pilot-interview": "Air India Pilot Interview",
  "Indigo-pilot-interview": "IndiGo Pilot Interview",
  services: "Services",
  "aircraft-management": "Aircraft Management",
  "aircraft-sourcing-sale": "Aircraft Sourcing & Sale",
  "aviation-consultancy": "Aviation Consultancy",
  mro: "MRO",
  "charter-services": "Charter Services",
  "livery-painting": "Livery Painting",
  camo: "CAMO",
  "components-spares": "Components & Spares",
  dgca: "DGCA",
  medical: "Medical Requirements",
  "ground-classes": "Ground Classes",
  "computer-number": "Computer Number",
  "board-verification": "Board Verification",
  "full-form": "Full Form",
  "pilot-training": "Pilot Training",
  india: "India",
  usa: "USA",
  australia: "Australia",
  "new-zealand": "New Zealand",
  "south-africa": "South Africa",
  maldives: "Maldives",
  "sri-lanka": "Sri Lanka",
  "guide-to-conversion": "Licence Conversion Guide",
  ppl: "PPL Training",
  "become-a-pilot": "Become a Pilot",
  "become-pilot": "How to Become a Pilot",
  "commercial-pilot-licence": "Commercial Pilot Licence",
  "airline-transport-pilot-licence": "Airline Transport Pilot Licence",
  locations: "Locations",
  delhi: "Delhi",
  mumbai: "Mumbai",
  bangalore: "Bangalore",
  hyderabad: "Hyderabad",
  about: "About",
  contact: "Contact",
  rtr: "RTR(A) Training",
  blogs: "Blogs",
  blog: "Blogs",
};

function labelFor(slug: string): string {
  return LABELS[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Page name from the meta map (title before the " | " brand suffix). */
function nameFor(path: string, fallback: string): string {
  const title = PAGE_META[path]?.title;
  return title ? title.split("|")[0].trim() : fallback;
}

function descFor(path: string, fallback: string): string {
  return PAGE_META[path]?.description || fallback;
}

interface JsonLdNode {
  [key: string]: unknown;
}

function breadcrumb(path: string): JsonLdNode {
  const items: JsonLdNode[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
  ];
  const segments = path.split("/").filter(Boolean);
  const post = blogPostFor(path);
  let acc = "";
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    const isBlogRoot = post && i === 0;
    const isBlogLeaf = post && i === segments.length - 1;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: isBlogLeaf ? post.title : labelFor(seg),
      item: isBlogRoot ? `${SITE_ORIGIN}/blogs` : `${SITE_ORIGIN}${acc}`,
    });
  });
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl(path)}#breadcrumb`,
    itemListElement: items,
  };
}

function courseNode(path: string): JsonLdNode {
  const url = canonicalUrl(path);
  return {
    "@type": "Course",
    "@id": `${url}#course`,
    name: nameFor(path, "Aviation Course"),
    description: descFor(path, "DGCA-focused aviation training course by Flying Star Aviator."),
    url,
    provider: { "@id": ORG_ID },
    educationalLevel: "Professional",
    inLanguage: "en-IN",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["OnSite", "Online"],
      inLanguage: ["en", "hi"],
      location: {
        "@type": "Place",
        name: "Flying Star Aviator, Dwarka",
        address: {
          "@type": "PostalAddress",
          addressLocality: "New Delhi",
          addressRegion: "Delhi",
          addressCountry: "IN",
        },
      },
    },
  };
}

function serviceNode(path: string): JsonLdNode {
  const url = canonicalUrl(path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: nameFor(path, "Aviation Service"),
    description: descFor(path, "Professional aviation service by Flying Star Aviator."),
    url,
    provider: { "@id": ORG_ID },
    serviceType: "Aviation Service",
    areaServed: { "@type": "Country", name: "India" },
  };
}

function webPageNode(path: string): JsonLdNode {
  const post = blogPostFor(path);
  const url = canonicalUrl(post ? blogPath(path, post) : path);
  let type: string | string[] = "WebPage";
  if (path === "/about") type = ["AboutPage", "WebPage"];
  else if (path === "/contact") type = ["ContactPage", "WebPage"];
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: post ? post.title : nameFor(path, "Flying Star Aviator"),
    description: post
      ? post.metaDescription || post.excerpt || ""
      : descFor(path, "Flying Star Aviator — DGCA pilot training in Delhi."),
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    inLanguage: "en-IN",
    ...(post ? { breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: absolute(post.coverImage) } : {}),
  };
}

/** The blog post behind a /blog/<slug> or /blogs/<id> path, if any. */
function blogPostFor(path: string) {
  const match = path.match(/^\/(?:blogs|blog)\/([^/]+)$/);
  if (!match) return null;
  const post = getBlogPost(match[1]) as Record<string, unknown> | null;
  return post && post.content ? (post as BlogPost) : null;
}

interface BlogPost {
  title: string;
  slug?: string;
  seoTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  intro?: string;
  content?: string;
  category?: string;
  tags?: string[];
  author?: string;
  authorRole?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
  dateModified?: string;
  // Two shapes are accepted: {q,a} (as written by this repo) and
  // {question,answer} (as the scheduled routine's prompt specifies).
  faqs?: ({ q?: string; a?: string; question?: string; answer?: string })[];
}

/**
 * A post with a slug has exactly one canonical URL: /blog/<slug>. The legacy
 * /blogs/<id> form resolves to the same post, so every URL and @id we emit is
 * pinned to the slug form to stop the two competing as duplicates.
 */
function blogPath(path: string, post: BlogPost): string {
  return post.slug ? `/blog/${post.slug}` : path;
}

/** ISO-8601 date, or undefined when the stored value is not parseable. */
function isoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/** ISO-8601 duration for `timeRequired` (e.g. 15 minutes -> "PT15M"). */
function readingDuration(post: BlogPost): string {
  return `PT${getReadingMinutes(post)}M`;
}

function absolute(url?: string): string | undefined {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${SITE_ORIGIN}${url}`;
}

/**
 * BlogPosting for a blog post. Carries author, publisher, both dates, word
 * count and reading time — the fields Google and answer engines use to judge
 * whether a page is a maintained article or an orphan.
 */
function blogPostingNode(path: string, post: BlogPost): JsonLdNode {
  const url = canonicalUrl(blogPath(path, post));
  const published = isoDate(post.createdAt);
  const modified = isoDate(post.updatedAt || post.dateModified) || published;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    alternativeHeadline: post.seoTitle,
    description: post.metaDescription || post.excerpt,
    abstract: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    image: absolute(post.coverImage),
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    wordCount: getWordCount(post),
    timeRequired: readingDuration(post),
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    author: post.author
      ? {
          "@type": "Organization",
          name: post.author,
          url: `${SITE_ORIGIN}/about`,
          ...(post.authorRole ? { description: post.authorRole } : {}),
        }
      : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: {
      "@type": "Thing",
      name: "DGCA Flight Crew Theoretical Knowledge Examinations",
    },
  };
}

/** FAQPage built from the post's `faqs` array — the AEO extraction surface. */
function faqNode(path: string, post: BlogPost): JsonLdNode | null {
  if (!post.faqs?.length) return null;
  const url = canonicalUrl(blogPath(path, post));
  const entries = post.faqs
    .map((item) => ({ name: item.question ?? item.q, text: item.answer ?? item.a }))
    .filter((item): item is { name: string; text: string } => Boolean(item.name && item.text));
  if (!entries.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: entries.map((item) => ({
      "@type": "Question",
      name: item.name,
      acceptedAnswer: { "@type": "Answer", text: item.text },
    })),
  };
}

function pageNode(path: string): JsonLdNode {
  if (path.startsWith("/courses/")) return courseNode(path);
  if (path.startsWith("/services/")) return serviceNode(path);
  return webPageNode(path);
}

/**
 * Build the per-page @graph. Returns null for the homepage, whose page-level
 * schema (WebPage + FAQPage) is provided by the Index component's Helmet and
 * whose Organization/WebSite live in index.html.
 */
export function buildGraph(path: string): JsonLdNode | null {
  if (path === "/") return null;

  const post = blogPostFor(path);
  if (post) {
    const nodes: JsonLdNode[] = [
      breadcrumb(path),
      webPageNode(path),
      blogPostingNode(path, post),
    ];
    const faq = faqNode(path, post);
    if (faq) nodes.push(faq);
    return { "@context": "https://schema.org", "@graph": nodes };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumb(path), pageNode(path)],
  };
}
