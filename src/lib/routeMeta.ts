import { getBlogPost } from "./blogData.js";
import { resolvePath } from "./routes";

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  twitterImage?: string;
}

const BASE_URL = "https://www.flystar.co.in";

const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "DGCA Ground Classes in Delhi | CPL & ATPL – Flystar",
    description: "DGCA CPL and ATPL ground classes in Dwarka, Delhi. Explore aviation subjects, exam preparation, RTR(A) training and career guidance at Flying Star Aviator.",
    canonical: `${BASE_URL}/`,
  },
  "/about": {
    title: "About Us | Flying Star Aviator Private Limited",
    description: "Learn about Flying Star Aviator, a DGCA CPL and ATPL ground-training institute located in Dwarka, New Delhi.",
    canonical: `${BASE_URL}/about`,
  },
  "/contact": {
    title: "Contact Us | Flying Star Aviator",
    description: "Get in touch with Flying Star Aviator. Visit us in Dwarka, Delhi or call +91 9953536199.",
    canonical: `${BASE_URL}/contact`,
  },
  "/services": {
    title: "Aviation Services | Flying Star Aviator",
    description: "Flying Star Aviator offers charter services, aircraft management, MRO, CAMO and more.",
    canonical: `${BASE_URL}/services`,
  },
  "/services/charter-services": {
    title: "Charter Services | Flying Star Aviator",
    description: "Premium aircraft charter services for business, personal, and special event travel.",
    canonical: `${BASE_URL}/services/charter-services`,
  },
  "/services/aircraft-management": {
    title: "Aircraft Management | Flying Star Aviator",
    description: "Full-service aircraft management solutions including maintenance, operations, and asset protection.",
    canonical: `${BASE_URL}/services/aircraft-management`,
  },
  "/services/aircraft-sourcing-sale": {
    title: "Aircraft Sourcing & Sale | Flying Star Aviator",
    description: "Aircraft acquisition and sales support for operators, owners, and investors.",
    canonical: `${BASE_URL}/services/aircraft-sourcing-sale`,
  },
  "/services/aviation-consultancy": {
    title: "Aviation Consultancy | Flying Star Aviator",
    description: "Aviation consulting services for operators, startups, and training organisations.",
    canonical: `${BASE_URL}/services/aviation-consultancy`,
  },
  "/services/mro": {
    title: "MRO Services | Flying Star Aviator",
    description: "Aircraft maintenance, repair, and overhaul services for commercial and private aviation.",
    canonical: `${BASE_URL}/services/mro`,
  },
  "/services/livery-painting": {
    title: "Livery Painting | Flying Star Aviator",
    description: "Custom aircraft livery painting and branding services for airlines and private owners.",
    canonical: `${BASE_URL}/services/livery-painting`,
  },
  "/services/camo": {
    title: "CAMO Services | Flying Star Aviator",
    description: "Continuing airworthiness management to keep aircraft compliant and airworthy.",
    canonical: `${BASE_URL}/services/camo`,
  },
  "/services/components-spares": {
    title: "Components & Spares | Flying Star Aviator",
    description: "Genuine aviation parts and spares support for aircraft operators and MRO providers.",
    canonical: `${BASE_URL}/services/components-spares`,
  },
  "/courses/cpl": {
    title: "CPL Ground Classes in Delhi | DGCA CPL | Flying Star Aviator",
    description:
      "DGCA CPL theory preparation at Flying Star Aviator, Dwarka, Delhi. Explore subjects, eligibility and fees, and how FTO flight training differs.",
    canonical: `${BASE_URL}/courses/cpl`,
    ogTitle: "CPL Ground Classes in Delhi | DGCA CPL | Flying Star Aviator",
    ogDescription:
      "DGCA CPL theory preparation at Flying Star Aviator, Dwarka, Delhi. Explore subjects, eligibility and fees, and how FTO flight training differs.",
    ogImage: "https://www.flystar.co.in/cpl-slider/slider1.webp",
    twitterImage: "https://www.flystar.co.in/cpl-slider/slider1.webp",
  },
  "/courses/atpl": {
    title: "ATPL Ground Classes in India | Flying Star Aviator",
    description: "ATPL ground classes and DGCA exam preparation at Flying Star Aviator in Dwarka, Delhi. See subjects and how ground school differs from flight training.",
    canonical: `${BASE_URL}/courses/atpl`,
  },
  "/courses/Air-india-pilot-interview": {
    title: "Air India Pilot Interview Prep | Flying Star Aviator",
    description: "Air India pilot interview coaching, psychometric assessments and personality preparation for airline entry.",
    canonical: `${BASE_URL}/courses/Air-india-pilot-interview`,
  },
  "/courses/Indigo-pilot-interview": {
    title: "IndiGo Pilot Interview Prep | Flying Star Aviator",
    description: "IndiGo pilot interview coaching with mock interviews, CRM training, and HR preparation.",
    canonical: `${BASE_URL}/courses/Indigo-pilot-interview`,
  },
  "/courses/airline-preparation": {
    title: "Airline Pilot Interview & CRM Course | Flying Star Aviator",
    description: "Pilot interview preparation and airline readiness training to advance your aviation career.",
    canonical: `${BASE_URL}/courses/airline-preparation`,
  },
  "/dgca": {
    title: "DGCA Computer Number Guide for Pilot Aspirants",
    description: "How to apply for a DGCA Computer Number, including registration steps, document preparation and Flight Crew exam access.",
    canonical: `${BASE_URL}/dgca`,
  },
  "/dgca/full-form": {
    title: "DGCA Full Form: Role & Functions | Flying Star Aviator",
    description: "Understand the full form of DGCA, its roles in aviation safety, licences, and aircraft operations.",
    canonical: `${BASE_URL}/dgca/full-form`,
  },
  "/dgca/medical": {
    title: "DGCA Class 1 & 2 Medical Guide | Flying Star Aviator",
    description: "Complete guide to DGCA medical requirements for pilot licenses, Class 1 and Class 2 certification.",
    canonical: `${BASE_URL}/dgca/medical`,
  },
  "/dgca/ground-classes": {
    title: "DGCA Ground Classes in Delhi | CPL & ATPL",
    description: "CPL and ATPL ground classes in Dwarka, Delhi, with DGCA exam preparation. Review subjects and the difference from FTO flight training.",
    canonical: `${BASE_URL}/dgca/ground-classes`,
  },
  "/pilot-training": {
    title: "Pilot Training | Flying Star Aviator",
    description: "Complete pilot training guidance for India, USA, Australia, New Zealand & South Africa.",
    canonical: `${BASE_URL}/pilot-training`,
  },
  "/pilot-training/india": {
    title: "Pilot Training in India: DGCA Pathway",
    description: "Understand the DGCA pilot-training pathway in India: ground classes and theory exams are separate from flight training at an approved FTO.",
    canonical: `${BASE_URL}/pilot-training/india`,
  },
  "/pilot-training/usa": {
    title: "Pilot Training USA | FAA-approved Commercial Pilot Training",
    description: "FAA-approved pilot training programs in the USA for aspiring commercial pilots.",
    canonical: `${BASE_URL}/pilot-training/usa`,
  },
  "/pilot-training/australia": {
    title: "Pilot Training in Australia | Flying Star Aviator",
    description: "CASA-approved pilot training in Australia with integrated flight and ground training.",
    canonical: `${BASE_URL}/pilot-training/australia`,
  },
  "/pilot-training/new-zealand": {
    title: "Pilot Training in New Zealand | Flying Star Aviator",
    description: "Pilot training options in New Zealand for Indian students seeking an international aviation career.",
    canonical: `${BASE_URL}/pilot-training/new-zealand`,
  },
  "/pilot-training/south-africa": {
    title: "Pilot Training in South Africa | Flying Star Aviator",
    description: "A guide to pilot training in South Africa for Indian candidates, including the training route, example flight schools and DGCA conversion considerations.",
    canonical: `${BASE_URL}/pilot-training/south-africa`,
  },
  "/become-a-pilot/become-pilot": {
    title: "How to Become a Pilot in India | Flying Star Aviator",
    description: "Step-by-step guide to becoming a commercial pilot in India after 12th. Eligibility, fees & process.",
    canonical: `${BASE_URL}/become-a-pilot/become-pilot`,
  },
  "/locations": {
    title: "Our Locations | Flying Star Aviator",
    description: "Flying Star Aviator's ground-training centre is in Dwarka, New Delhi. The page explains ground classes and the separate FTO flying-training stage.",
    canonical: `${BASE_URL}/locations`,
  },
  "/pilot-training/ppl": {
    title: "PPL Training in India: Eligibility, Exams & Validity",
    description: "Review DGCA PPL eligibility, theory subjects, pass marks and exam validity for pilot candidates in India.",
    canonical: `${BASE_URL}/pilot-training/ppl`,
  },
  "/pilot-training/cpl": {
    title: "CPL Flight Training in India: The Flying Half of the Licence",
    description: "The DGCA CPL pathway separates theory exams from flight training. See how the two stages fit together and where current requirements apply.",
    canonical: `${BASE_URL}/pilot-training/cpl`,
  },
  "/pilot-training/guide-to-conversion": {
    title: "Convert a Foreign Pilot Licence to a DGCA Licence",
    description: "DGCA foreign-licence conversion involves current experience, written exams and a skill test with a DGCA examiner.",
    canonical: `${BASE_URL}/pilot-training/guide-to-conversion`,
  },
  "/pilot-training/maldives": {
    title: "Pilot Training in the Maldives: What to Check First",
    description: "Check Maldives CAA-approved flight training organisations and the DGCA licence-conversion process for India.",
    canonical: `${BASE_URL}/pilot-training/maldives`,
  },
  "/pilot-training/sri-lanka": {
    title: "Pilot Training in Sri Lanka: CAASL Requirements Explained",
    description: "Review CAASL training requirements, English proficiency and converting a Sri Lankan licence to a DGCA licence.",
    canonical: `${BASE_URL}/pilot-training/sri-lanka`,
  },
  "/locations/india": {
    title: "Pilot Training in India: The Two Phases Explained",
    description: "A DGCA licence in India has two phases: ground training and theory papers, then flying hours at a DGCA-approved FTO. What each one involves.",
    canonical: `${BASE_URL}/locations/india`,
  },
  "/locations/delhi": {
    title: "Pilot Training in Delhi | Flying Star Aviator",
    description: "Our own centre is at C705, Sector 7, Palam Extension, Dwarka, New Delhi 110077 — DGCA CPL and ATPL ground classes since 2008. Visit before you enrol.",
    canonical: `${BASE_URL}/locations/delhi`,
  },
  "/locations/mumbai": {
    title: "Pilot Training for Mumbai Candidates | Flying Star Aviator",
    description: "We have no centre in Mumbai. DGCA ground classes run from Dwarka, Delhi; partner schools handle flying. What that means for a Mumbai candidate.",
    canonical: `${BASE_URL}/locations/mumbai`,
  },
  "/locations/bangalore": {
    title: "Pilot Training in Bangalore | Flying Star Aviator",
    description: "We have no centre in Bangalore. Ground training runs from Delhi, partner schools cover flying hours — DGCA licensing rules are national either way.",
    canonical: `${BASE_URL}/locations/bangalore`,
  },
  "/locations/hyderabad": {
    title: "Pilot Training in Hyderabad | Flying Star Aviator",
    description: "Flying Star Aviator has no Hyderabad centre. Ground classes run from Dwarka; partner schools provide flight training. Verify current DGCA requirements.",
    canonical: `${BASE_URL}/locations/hyderabad`,
  },
  "/locations/usa": {
    title: "Flight Training in the USA for Indian Candidates",
    description: "An FAA licence does not permit commercial flying in India. What DGCA conversion requires for flight hours logged in the USA, and when to clear the papers.",
    canonical: `${BASE_URL}/locations/usa`,
  },
  "/sitemap": {
    title: "Sitemap | Flying Star Aviator",
    description: "Flying Star Aviator sitemap and navigation guide for pilot training, services, and aviation resources.",
    canonical: `${BASE_URL}/sitemap`,
  },
  "/blogs": {
    title: "DGCA & Pilot Training Guides | Flying Star Aviator",
    description:
      "Guides to DGCA exams, CPL and ATPL eligibility, ground classes and flying schools in India - every figure checked against the regulator's own documents.",
    canonical: `${BASE_URL}/blogs`,
    ogImage: "/assets/hero-aircraft-1600w.jpg",
    twitterImage: "/assets/hero-aircraft-1600w.jpg",
  },
  // Topic hubs. Each is a real page with its own copy and an ordered reading
  // list; membership comes from the post `category`, so the hub and the posts
  // cannot drift. Present here means prerendered and advertised — routeMeta is
  // the gate that scripts/prerender.js and generate-sitemap.mjs both read.
  "/blog/topic/dgca-exams": {
    title: "DGCA Exams: Subjects & Fees | Flying Star Aviator",
    description:
      "Everything the DGCA theory examinations involve - subjects by licence, the fee, how long a pass stays valid, and the claims that are wrong.",
    canonical: `${BASE_URL}/blog/topic/dgca-exams`,
    ogImage: "/assets/hero-aircraft-1600w.jpg",
    twitterImage: "/assets/hero-aircraft-1600w.jpg",
  },
  "/blog/topic/licences-and-eligibility": {
    title: "Pilot Licence Eligibility in India | Flying Star Aviator",
    description:
      "What DGCA requires before you can appear for CPL and ATPL theory papers, and what converting a foreign licence actually involves.",
    canonical: `${BASE_URL}/blog/topic/licences-and-eligibility`,
    ogImage: "/assets/hero-aircraft-1600w.jpg",
    twitterImage: "/assets/hero-aircraft-1600w.jpg",
  },
  "/blog/topic/choosing-training": {
    title: "Choosing a Flying School in India | Flying Star Aviator",
    description:
      "How to judge DGCA ground classes and a flying training organisation before you pay - what to verify, what to ask, and what ends the conversation.",
    canonical: `${BASE_URL}/blog/topic/choosing-training`,
    ogImage: "/assets/hero-aircraft-1600w.jpg",
    twitterImage: "/assets/hero-aircraft-1600w.jpg",
  },
  "/admin/login": {
    title: "Admin Login — Flying Star Aviator",
    description: "Sign in to the Flying Star Aviator admin console.",
    canonical: `${BASE_URL}/admin/login`,
  },
  "/courses/cabin-crew": {
    title: "Cabin Crew Course | Flying Star Aviator",
    description: "Cabin crew training in Delhi — eligibility, syllabus, grooming and interview preparation for airline cabin crew roles in India.",
    canonical: `${BASE_URL}/courses/cabin-crew`,
  },
  "/courses/ground-staff": {
    title: "Airport Ground Staff Course | Flying Star Aviator",
    description: "Aviation ground staff training in Delhi — job roles, eligibility, syllabus and airport career paths explained.",
    canonical: `${BASE_URL}/courses/ground-staff`,
  },
  "/become-a-pilot/commercial-pilot-licence": {
    title: "Commercial Pilot Licence in India | Flying Star Aviator",
    description: "Understand the DGCA CPL pathway in India, including ground classes, separate aircraft training and where to verify current requirements.",
    canonical: `${BASE_URL}/become-a-pilot/commercial-pilot-licence`,
  },
  "/become-a-pilot/airline-transport-pilot-licence": {
    title: "ATPL Requirements in India | Flying Star Aviator",
    description: "Understand DGCA ATPL eligibility, theory papers, medical requirements and how the licence differs from a CPL. Verify current requirements with DGCA.",
    canonical: `${BASE_URL}/become-a-pilot/airline-transport-pilot-licence`,
  },
  "/dgca/computer-number": {
    title: "DGCA Computer Number: Eligibility, Documents, Steps",
    description: "DGCA Computer Number explained: 10+2 with Physics and Maths, no age limit, lifetime validity, one per candidate, and the hard copy you must post to CEO.",
    canonical: `${BASE_URL}/dgca/computer-number`,
  },
  "/editorial-policy": {
    title: "Editorial Policy | Flying Star Aviator",
    description: "How our DGCA guides are researched and verified: primary sources first, unverified figures never stated as fact, quarterly re-checks, corrections welcomed.",
    canonical: `${BASE_URL}/editorial-policy`,
  },
  "/admin/blog": {
    title: "Blog Manager — Flying Star Aviator Admin",
    description: "Admin console for managing blogs.",
    canonical: `${BASE_URL}/admin/blog`,
  },
  "/faq": {
    title: "DGCA & Pilot Training FAQ | Flying Star Aviator",
    description: "Sourced answers on DGCA eligibility, exam subjects, pass marks, fees, the computer number and licence conversion, each linked to the rule behind it.",
    canonical: `${BASE_URL}/faq`,
  },
  "/glossary": {
    title: "Indian Pilot Training Glossary | Flying Star Aviator",
    description: "CPL, ATPL, PPL, RTR(A), computer number, OLODE, BVC and more — what each term means under DGCA's published rules, defined in plain English.",
    canonical: `${BASE_URL}/glossary`,
  },
  "/pilot-salary-india": {
    title: "Pilot Salary in India: Published Data vs Claims",
    description: "Indian airlines and DGCA do not publish pilot pay scales. Review available data and how to assess salary claims.",
    canonical: `${BASE_URL}/pilot-salary-india`,
  },
  "/cadet-pilot-programme": {
    title: "Cadet Pilot Programmes in India | Flying Star Aviator",
    description: "Compare airline-published cadet eligibility and programme structure with self-sponsored CPL training, including what is not disclosed about cost and pay.",
    canonical: `${BASE_URL}/cadet-pilot-programme`,
  },
  "/dgca/exam-calendar": {
    title: "DGCA Exam Dates 2026: Full Programme of Examinations",
    description: "Every 2026 DGCA examination session transcribed from the regulator's own programme: four Regular sessions, eight Online On-Demand sessions, twelve FIR and AFIR sessions. Dates are DGCA-tentative.",
    canonical: `${BASE_URL}/dgca/exam-calendar`,
  },
  "/dgca/fto-ranking": {
    title: "DGCA FTO Ranking: How Flying Schools Are Scored and Graded",
    description: "Learn how DGCA scores approved flight training organisations across five weighted parameters and assigns grades from A+ to C.",
    canonical: `${BASE_URL}/dgca/fto-ranking`,
  },
  "/apply": {
    title: "Apply to Flying Star Aviator | DGCA Ground Classes, Dwarka",
    description: "Send an enquiry to the academics team. What happens after you send it, what to have ready, and why this is not a DGCA application.",
    canonical: `${BASE_URL}/apply`,
  },
  "/courses/cpl/fees": {
    title: "CPL Fees in India: Costs & Price Sources",
    description: "DGCA publishes examination charges, not CPL training prices. See cost components, who sets them and how to compare quotes.",
    canonical: `${BASE_URL}/courses/cpl/fees`,
  },
  "/atpl/brochure": {
    title: "ATPL Ground Classes Brochure | Flying Star Aviator",
    description: "ATPL privileges, how the licence differs from a CPL, and what ground school covers versus flight training.",
    canonical: `${BASE_URL}/atpl/brochure`,
  },
  "/rtr": {
    title: "RTR Full Form: Radio Telephony Restricted | Guide",
    description: "Essential RTR(A) exam guidance for pilot candidates and aviation students.",
    canonical: `${BASE_URL}/rtr`,
  },
};

function normalizePath(pathname: string) {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function getBlogMeta(pathname: string): RouteMeta | null {
  const normalized = normalizePath(pathname);
  const blogMatch = normalized.match(/^\/(?:blogs|blog)\/([^/]+)$/);
  if (!blogMatch) return null;

  const blog = getBlogPost(blogMatch[1]);
  if (!blog) return null;

  // A post with a slug canonicalises to /blog/<slug> even when reached via the
  // legacy /blogs/<id> URL, so the two forms never compete in search.
  const canonicalPath = blog.slug ? `/blog/${blog.slug}` : normalized;

  return {
    title: blog.seoTitle || `${blog.title} | Flying Star Aviator Blog`,
    description: blog.metaDescription || blog.excerpt || "Expert pilot training guidance, DGCA updates, and aviation career advice from Flying Star Aviator.",
    canonical: `${BASE_URL}${canonicalPath}`,
    ogTitle: blog.seoTitle || blog.title,
    ogDescription: blog.metaDescription || blog.excerpt || "Expert pilot training guidance, DGCA updates, and aviation career advice from Flying Star Aviator.",
    ogUrl: `${BASE_URL}${normalized}`,
    ogImage: blog.coverImage || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    twitterImage: blog.coverImage || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
  };
}

const normalizedRouteMeta: Record<string, RouteMeta> = Object.fromEntries(
  Object.entries(routeMeta).map(([key, value]) => [normalizePath(key), value])
);

export function getRouteMeta(pathname: string): RouteMeta {
  const normalized = normalizePath(pathname);
  const resolvedPath = resolvePath(normalized);

  const blogMeta = getBlogMeta(resolvedPath);
  if (blogMeta) {
    return blogMeta;
  }

  const routeMetaEntry = normalizedRouteMeta[resolvedPath] || normalizedRouteMeta[normalized];
  if (routeMetaEntry) {
    return {
      ...routeMetaEntry,
      canonical: `${BASE_URL}${resolvedPath === "/" ? "/" : resolvedPath}`,
      ogUrl: `${BASE_URL}${resolvedPath === "/" ? "/" : resolvedPath}`,
    };
  }

  return {
    title: "Flying Star Aviator | CPL & ATPL Ground Training in India",
    description: "Flying Star Aviator Private Limited provides CPL and ATPL ground training, DGCA theory preparation and pilot-training pathway guidance in Dwarka, New Delhi.",
    canonical: `${BASE_URL}${resolvedPath === "/" ? "/" : resolvedPath}`,
    ogUrl: `${BASE_URL}${resolvedPath === "/" ? "/" : resolvedPath}`,
  };
}
