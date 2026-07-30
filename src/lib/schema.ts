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
  let acc = "";
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: labelFor(seg),
      item: `${SITE_ORIGIN}${acc}`,
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
  const url = canonicalUrl(path);
  let type: string | string[] = "WebPage";
  if (path === "/about") type = ["AboutPage", "WebPage"];
  else if (path === "/contact") type = ["ContactPage", "WebPage"];
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: nameFor(path, "Flying Star Aviator"),
    description: descFor(path, "Flying Star Aviator — DGCA pilot training in Delhi."),
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    inLanguage: "en-IN",
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
  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumb(path), pageNode(path)],
  };
}
