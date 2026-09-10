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
import { PILOT_TRAINING_TOPICS } from "./pilotTrainingTopics";
import { FAQ_HUB_QUESTIONS } from "./faqHub";
import { GLOSSARY } from "./glossary";
import { imagesFor } from "./blogImages.js";
import { postsInTopic, topicBySlug, type Topic } from "./blogTopics";

const ORG_ID = `${SITE_ORIGIN}/#organization`;

// Human-readable labels for breadcrumb segments (acronyms, ampersands, etc.).
const LABELS: Record<string, string> = {
  courses: "Courses",
  faq: "FAQ",
  glossary: "Glossary",
  "editorial-policy": "Editorial Policy",
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

  // A topic hub sits under the blog, not under two path segments that are not
  // pages. Walking the URL would advertise /blog and /blog/topic, neither of
  // which resolves.
  const topic = topicFor(path);
  if (topic) {
    items.push({ "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blogs` });
    items.push({ "@type": "ListItem", position: 3, name: topic.name, item: canonicalUrl(path) });
    return { "@type": "BreadcrumbList", "@id": `${canonicalUrl(path)}#breadcrumb`, itemListElement: items };
  }
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
/**
 * Every illustration on the post, as ImageObject nodes.
 *
 * Only images whose file actually exists are listed — an entry still waiting to
 * be generated renders a placeholder on the page, and a placeholder must never
 * be claimed in structured data as an image of the article. Each node carries
 * its own caption and alt text, which is what makes an image quotable rather
 * than merely present.
 */
function articleImages(post: BlogPost): unknown {
  const planned = imagesFor(post.slug).filter((img) => img.ready);
  const nodes = planned.map((img) => ({
    "@type": "ImageObject",
    url: absolute(img.file),
    contentUrl: absolute(img.file),
    width: 1200,
    height: 675,
    caption: img.caption || img.alt,
    description: img.alt,
    representativeOfPage: img.slot === "cover" || undefined,
  }));
  if (nodes.length > 0) return nodes;
  return absolute(post.coverImage);
}

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
    image: articleImages(post),
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

/** The topic cluster behind a /blog/topic/<slug> path, if any. */
function topicFor(path: string): Topic | undefined {
  const match = path.match(/^\/blog\/topic\/([^/]+)$/);
  return match ? topicBySlug(match[1]) : undefined;
}

/**
 * CollectionPage for a topic hub, carrying the cluster's reading order as an
 * ItemList.
 *
 * No FAQPage here on purpose. Every question in this cluster is already
 * answered — and marked up — on the post that answers it, and repeating that
 * markup on the hub would offer two pages as the source of one answer.
 */
function topicNode(path: string, topic: Topic): JsonLdNode {
  const url = canonicalUrl(path);
  const posts = postsInTopic(topic);
  return {
    "@type": ["CollectionPage", "WebPage"],
    "@id": `${url}#collection`,
    url,
    name: topic.title,
    description: topic.description,
    abstract: topic.summary,
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      "@id": `${url}#list`,
      name: topic.title,
      numberOfItems: posts.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: post.title,
        url: `${SITE_ORIGIN}/blog/${post.slug}`,
      })),
    },
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
/**
 * FAQs for non-blog pages. Each entry MUST mirror the visible FAQ text on that
 * page word for word — schema that carries answers a reader cannot see on the
 * page is a structured-data violation, and Google drops the rich result for it.
 * Source of truth for /dgca/computer-number is COMPUTER_NUMBER_FAQS in
 * src/pages/dgca/computer-number.tsx.
 */
export const PAGE_FAQS: Record<string, { q: string; a: string }[]> = {
  "/dgca/computer-number": [
    { q: "What is a DGCA Computer Number?", a: "It is the unique identity allotted to a Flight Crew candidate by the Central Examination Organization, Office of the DGCA, after the candidate's application is approved. It is required to apply for any DGCA pilot examination." },
    { q: "How long is a Computer Number valid?", a: "Its validity is lifetime." },
    { q: "Can I have more than one Computer Number?", a: "No. A candidate is authorised to hold only one, and it applies to all Flight Crew examination categories." },
    { q: "What qualification do I need?", a: "Except for the PPL category, applicants must have passed 10+2 with Physics and Mathematics from a recognised board or university, or an equivalent." },
    { q: "Is there a maximum age to register?", a: "No. DGCA states there is no maximum age limit to register as a Flight Crew candidate." },
    { q: "Do I have to post a hard copy?", a: "NEW candidates do — by Speed Post or Registered Post to the CEO at East Block-III, Level-III, R.K. Puram, New Delhi 110066. OLD candidates do not." },
    { q: "Is the Computer Number generated automatically after I submit?", a: "No. It is allotted only after DGCA scrutinises the online application against the hard copy posted by the candidate." },
    { q: "What is a Board Verification Certificate?", a: "A certificate from the relevant board certifying that your 10th, 10+2, 10+2-equivalent or Diploma mark sheet is authentic. It is mandatory for all NEW candidates." },
    { q: "Can I upload documents as JPEG?", a: "No. Documents must be PDF. Only the photograph and signature are JPEG/JPG." },
    { q: "Can I add a missing document after Final Submission?", a: "No. Nothing can be uploaded after Final Submit." },
    { q: "How long is the registration email link valid?", a: "24 hours. If it is not activated in that window, you must register again." },
    { q: "My school board is not in the dropdown. What do I do?", a: "Select \"OTHERS\" and proceed with registration." },
    { q: "What will my login ID be after allotment?", a: "Your allotted Computer Number with the prefix \"P-\"." },
    { q: "Which profile details can I change myself?", a: "Mobile number, email ID and correspondence address. Everything else requires prior approval from the CEO, DGCA, requested through the \"Raise query\" tab." },
  ],
  "/apply": [
    { q: "Is this form a DGCA application?", a: "No. Registering as a Flight Crew candidate and obtaining a computer number happens only on the DGCA examination portal, and no institute can do it on your behalf. This form starts a conversation with the academics team." },
    { q: "Does sending it commit me to anything?", a: "No. Nothing is charged and nothing is reserved. Fees, schedule and batch are confirmed in writing before any payment." },
    { q: "Do I need documents ready before I send it?", a: "No. Documents make the counselling call more useful, but none are needed to send the enquiry itself." },
    { q: "Does Flying Star Aviator provide the flying training?", a: "No. It is a DGCA ground school and career-guidance organisation in Dwarka, New Delhi. Flying training happens at partner FTOs under separate arrangements you make with the FTO." },
    { q: "What if I am not sure which licence I am aiming for?", a: "Choose the career-guidance option. Working out whether a PPL, a CPL or neither fits your situation is part of what the call is for." },
    { q: "Can I call instead of filling this in?", a: "Yes. Phone +91 99535 36199, Monday to Saturday, 9:00 AM to 6:00 PM." },
  ],
  "/courses/cpl/fees": [
    { q: "What does a CPL cost in India?", a: "There is no published figure. DGCA publishes examination and licensing charges, not training prices, and flying schools quote rather than publish. Any single number you see is a provider quote or a restatement of one." },
    { q: "Why does this page not show a price range?", a: "A range requires assuming a fleet, an aircraft type, a location, an hours figure, a completion time and a level of bundling. Publishing the range without those assumptions presents a guess as a fact." },
    { q: "Which costs does DGCA actually publish?", a: "The charges payable to DGCA itself: examination charges per paper, the computer number application, and licence issue. Training costs are not among them." },
    { q: "What is usually the largest component?", a: "Flying hours at the FTO, by a wide margin over everything else on the list." },
    { q: "What is most often left out of a quote?", a: "Accommodation, travel, equipment, retests and the cost of delay. None of them are hidden; they are simply not the flying school's to quote." },
    { q: "Should I pay for ground classes or flying first?", a: "The DGCA papers do not require flying hours, so ground study can run first or alongside. A Class 1 medical is the cheapest step most capable of changing the plan, so it is worth doing before committing money to anything else." },
  ],
  "/pilot-salary-india": [
    { q: "How much does a pilot earn in India?", a: "There is no authoritative published figure. No Indian airline publishes a pilot pay scale, DGCA publishes licensing requirements rather than salaries, and no government statistic reports pilot pay separately." },
    { q: "Why does this page not give a number?", a: "Because every number in circulation traces back to a training provider or a content site, none of which names a primary source. Publishing our own estimate would add one more unsourced page." },
    { q: "Do airlines publish anything useful?", a: "They publish joining criteria. IndiGo, for example, states an age range of 18 to 32 and 10+2 with Physics and Mathematics for its cadet programme. It does not state pay, bond or cost." },
    { q: "What about employee costs in annual reports?", a: "Listed carriers disclose aggregate employee benefit expense. It covers every employee in the company and cannot be divided into a pilot salary." },
    { q: "What actually changes what a pilot earns?", a: "The seat, the employer, the hours actually rostered, the debt taken on for a type rating, and how long it takes to get the first flying job after licence issue." },
    { q: "How should I test a salary claim I read?", a: "Ask who published it and whether they sell training, whether it names an airline or document, whether it is gross or net, which seat and fleet it describes, whether it nets off training debt, and what date it carries." },
  ],
  "/dgca/fto-ranking": [
    { q: "Does DGCA rank flying schools?", a: "Yes. A ranking framework for approved Flying Training Organisations took effect on 1 October 2025. Each FTO is scored out of 100 and placed in band A+, A, B or C, and rankings are published twice a year." },
    { q: "What do the bands mean?", a: "A+ is 85 per cent and above, A is 70 to 84.99, B is 50 to 69.99, and C is below 50. An organisation in band C receives an improvement notice from DGCA." },
    { q: "What is the score made of?", a: "Operational aspects 40 per cent, FTO performance 20, safety standards 20, compliance standards 10, and assistance to students 10." },
    { q: "Which single factor carries the most weight?", a: "Operational ratios. Student-to-aircraft, student-to-instructor and fleet-to-engineer ratios are worth ten percentage points each, thirty between them." },
    { q: "Did any school get an A grade?", a: "Not in the first ranking, which covered September 2024 to August 2025: thirteen organisations were in band B and twenty-two in band C, with none in A or A+. In the second ranking, released 24 April 2026, one organisation of thirty-five reached band A: Avyanna Aviation Pvt. Ltd." },
    { q: "Is Flying Star Aviator in the ranking?", a: "No. It is a ground school and career-guidance organisation, not a Flying Training Organisation, so it is not ranked and has no grade." },
  ],
  "/dgca/exam-calendar": [
    { q: "When are the DGCA exams in 2026?", a: "DGCA publishes a Programme of Examinations for the year. It sets four Regular sessions, eight Online On-Demand sessions, twelve FIR/AFIR sessions and a FATA examination. The dates are stated by DGCA as tentative and subject to change for gazetted holidays." },
    { q: "How many regular DGCA exam sessions are there in a year?", a: "Four in the 2026 programme: 10 to 14 March, 16 to 20 June, 22 to 26 September and 15 to 19 December." },
    { q: "What is the difference between a Regular session and OLOD?", a: "Regular sessions run four times a year over five days. Online On-Demand sessions run more often, eight times in 2026, over three days each. Eligibility and rules are the same; the scheduling is not." },
    { q: "What is FIR/AFIR in the calendar?", a: "Flight Instructor Rating and Assistant Flight Instructor Rating examinations. There are twelve sessions in the 2026 programme, roughly one a month, and they are not the CPL or ATPL papers." },
    { q: "Are these dates final?", a: "No. The DGCA document states the dates are tentative and subject to change in case of gazetted holidays, festivity and similar. Confirm on pariksha.dgca.gov.in before planning around any of them." },
    { q: "Where do I apply?", a: "Through the DGCA examination portal at pariksha.dgca.gov.in, using your computer number. No institute can apply on your behalf." },
  ],
  "/cadet-pilot-programme": [
    { q: "What is a cadet pilot programme?", a: "A programme that selects candidates before training begins and routes them through schools the airline has chosen, ending in a Commercial Pilot Licence." },
    { q: "What eligibility do airlines publish?", a: "IndiGo states an age range of 18 to 32 and 10+2 with Physics and Mathematics as compulsory subjects, with a maximum of two attempts per stage." },
    { q: "How long does a cadet programme take?", a: "IndiGo states 22 months from zero flight time, including a four-month ground school stage and 15 days of training to obtain a student pilot licence." },
    { q: "What does a cadet programme cost?", a: "The airline does not publish it. Figures circulate widely and are not stated by the airline, so ask in writing before treating any number as real." },
    { q: "Is there a bond?", a: "Bond terms are not published by the airline. That is one of the questions to put in writing before applying." },
    { q: "Cadet programme or self-sponsored training?", a: "Neither is better in the abstract. A cadet programme fixes the school and the route but gates you on selection; self-sponsored training gives you the choice and the whole cost." },
  ],
  "/atpl/brochure": [
    { q: "What is an ATPL?", a: "The Airline Transport Pilot Licence is the senior DGCA flight crew licence, required to act as pilot-in-command of an aircraft certificated for two pilots in scheduled air transport." },
    { q: "Is the ATPL just a longer CPL?", a: "No. They are separate licences with separate theory papers, sat at different points in a career. Most candidates hold a CPL and are already flying commercially when they sit the ATPL papers." },
    { q: "How many flying hours does an ATPL need?", a: "The requirement is set out in Schedule II to the Aircraft Rules 1937. This site does not restate the figure, because publicly circulating copies of the Rules truncate before the schedules. Read it from the current official text." },
    { q: "Is there a downloadable brochure PDF?", a: "No. The brochure is this page, so it can be searched, linked to and quoted rather than sitting inside a file." },
    { q: "Does Flying Star Aviator provide ATPL flying experience?", a: "No. It prepares candidates for the DGCA ATPL theory papers. Flying experience is accrued at an operator or an approved training organisation." },
    { q: "Is a type rating part of the ATPL?", a: "No. A type rating is a separate qualification taken after the licence, and it is frequently confused with it." },
  ],
};

/** /pilot-training/<topic> FAQs come straight from the array the page renders. */
function faqsFor(path: string): { q: string; a: string }[] | undefined {
  const direct = PAGE_FAQS[path];
  if (direct) return direct;
  if (path === "/faq") return FAQ_HUB_QUESTIONS;
  const topic = path.match(/^\/pilot-training\/([^/]+)$/)?.[1];
  return topic ? PILOT_TRAINING_TOPICS[topic]?.faqs : undefined;
}

function pageFaqNode(path: string): JsonLdNode | null {
  const faqs = faqsFor(path);
  if (!faqs?.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${canonicalUrl(path)}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * DefinedTermSet for /glossary.
 *
 * A glossary rendered as a <dl> is unambiguous to a person and ambiguous to a
 * parser — it looks like any other list of bold text and paragraphs.
 * DefinedTermSet/DefinedTerm says explicitly "these are terms and these are
 * their definitions", which is what lets an answer engine lift a definition
 * knowing it is one. No visible change; this is purely machine-facing.
 *
 * Built from the same GLOSSARY array the page renders, so the two cannot drift.
 */
function glossaryNode(path: string): JsonLdNode | null {
  if (path !== "/glossary") return null;
  const url = canonicalUrl(path);
  return {
    "@type": "DefinedTermSet",
    "@id": `${url}#glossary`,
    name: "Indian Pilot Training Glossary",
    description:
      "Terms used in Indian pilot training and DGCA licensing, defined as the regulator uses them.",
    url,
    inDefinedTermSet: undefined,
    hasDefinedTerm: GLOSSARY.map((entry) => ({
      "@type": "DefinedTerm",
      name: entry.term,
      ...(entry.abbr ? { alternateName: entry.abbr } : {}),
      description: entry.definition,
      inDefinedTermSet: `${url}#glossary`,
      ...(entry.href ? { url: canonicalUrl(entry.href) } : {}),
    })),
  };
}

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

  const topic = topicFor(path);
  if (topic) {
    return { "@context": "https://schema.org", "@graph": [breadcrumb(path), topicNode(path, topic)] };
  }

  const nodes: JsonLdNode[] = [breadcrumb(path), pageNode(path)];
  const pageFaq = pageFaqNode(path);
  if (pageFaq) nodes.push(pageFaq);
  const glossary = glossaryNode(path);
  if (glossary) nodes.push(glossary);

  return { "@context": "https://schema.org", "@graph": nodes };
}
