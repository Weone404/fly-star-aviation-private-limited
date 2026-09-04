import { getBlogPost } from "./blogData.js";

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
    title: "Flying Star Aviator | DGCA-Approved Pilot Training in India",
    description: "DGCA-approved pilot training in Delhi for CPL and ATPL aspirants. Learn with expert instructors, structured classes, and career-focused support.",
    canonical: `${BASE_URL}/`,
  },
  "/about": {
    title: "About Us | Flying Star Aviator Private Limited",
    description: "Learn about Flying Star Aviator, Delhi's leading aviation training institute since 2008.",
    canonical: `${BASE_URL}/about`,
  },
  "/contact": {
    title: "Contact Us | Flying Star Aviator",
    description: "Get in touch with Flying Star Aviator. Visit us in Dwarka, Delhi or call +91 9953536199.",
    canonical: `${BASE_URL}/contact`,
  },
  "/contact-us": {
    title: "Contact Us | Flying Star Aviator",
    description: "Get in touch with Flying Star Aviator. Visit us in Dwarka, Delhi or call +91 9953536199.",
    canonical: `${BASE_URL}/contact-us`,
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
    title: "Commercial Pilot License Course in India | CPL Training",
    description: "Best DGCA CPL ground classes in Delhi. Air Navigation, Meteorology, Air Regulations & more. Enroll now.",
    canonical: `${BASE_URL}/courses/cpl`,
  },
  "/courses/atpl": {
    title: "ATPL Course Details | Airline Transport Pilot License Training India",
    description: "Airline Transport Pilot License ground training for pilots advancing their aviation career.",
    canonical: `${BASE_URL}/courses/atpl`,
  },
  "/air-transport-pilots-license-atpl": {
    title: "ATPL Course Details | Airline Transport Pilot License Training India",
    description: "Airline Transport Pilot License ground training for pilots advancing their aviation career.",
    canonical: `${BASE_URL}/air-transport-pilots-license-atpl`,
  },
  "/best-atpl-classes-in-india": {
    title: "ATPL Course Details | Airline Transport Pilot License Training India",
    description: "Airline Transport Pilot License ground training for pilots advancing their aviation career.",
    canonical: `${BASE_URL}/best-atpl-classes-in-india`,
  },
  "/commercial-pilot-training": {
    title: "Commercial Pilot License Course in India | CPL Training",
    description: "Best DGCA CPL ground classes in Delhi. Air Navigation, Meteorology, Air Regulations & more. Enroll now.",
    canonical: `${BASE_URL}/commercial-pilot-training`,
  },
  "/best-cpl-ground-classes": {
    title: "Commercial Pilot License Course in India | CPL Training",
    description: "Best DGCA CPL ground classes in Delhi. Air Navigation, Meteorology, Air Regulations & more. Enroll now.",
    canonical: `${BASE_URL}/best-cpl-ground-classes`,
  },
  "/commercial-pilot-training-in-dwarka": {
    title: "Commercial Pilot License Course in India | CPL Training",
    description: "Best DGCA CPL ground classes in Delhi. Air Navigation, Meteorology, Air Regulations & more. Enroll now.",
    canonical: `${BASE_URL}/commercial-pilot-training-in-dwarka`,
  },
  "/courses-and-careers": {
    title: "Commercial Pilot License Course in India | CPL Training",
    description: "Best DGCA CPL ground classes in Delhi. Air Navigation, Meteorology, Air Regulations & more. Enroll now.",
    canonical: `${BASE_URL}/courses-and-careers`,
  },
  "/pilot-course": {
    title: "Airline Preparation Course in India | Pilot Interview & CRM Training",
    description: "Pilot interview preparation and airline readiness training to advance your aviation career.",
    canonical: `${BASE_URL}/pilot-course`,
  },
  "/top-aviation-courses-and-careers-after-12th": {
    title: "Airline Preparation Course in India | Pilot Interview & CRM Training",
    description: "Pilot interview preparation and airline readiness training to advance your aviation career.",
    canonical: `${BASE_URL}/top-aviation-courses-and-careers-after-12th`,
  },
  "/careers": {
    title: "Airline Preparation Course in India | Pilot Interview & CRM Training",
    description: "Pilot interview preparation and airline readiness training to advance your aviation career.",
    canonical: `${BASE_URL}/careers`,
  },
  "/courses/Air-india-pilot-interview": {
    title: "Air India Pilot Interview Preparation 2026 | Flying Star Aviator",
    description: "Air India pilot interview coaching, psychometric assessments and personality preparation for airline entry.",
    canonical: `${BASE_URL}/courses/Air-india-pilot-interview`,
  },
  "/courses/Indigo-pilot-interview": {
    title: "IndiGo Pilot Interview Preparation (JFO 2026) | Flying Star Aviator",
    description: "IndiGo pilot interview coaching with mock interviews, CRM training, and HR preparation.",
    canonical: `${BASE_URL}/courses/Indigo-pilot-interview`,
  },
  "/courses/airline-preparation": {
    title: "Airline Preparation Course in India | Pilot Interview & CRM Training",
    description: "Pilot interview preparation and airline readiness training to advance your aviation career.",
    canonical: `${BASE_URL}/courses/airline-preparation`,
  },
  "/dgca": {
    title: "DGCA Computer Number - Complete Guide for Pilot Aspirants",
    description: "Everything you need to know about DGCA computer number, exam registration, and pilot training requirements.",
    canonical: `${BASE_URL}/dgca`,
  },
  "/dgca/full-form": {
    title: "DGCA Full Form - Directorate General of Civil Aviation | Role & Functions",
    description: "Understand the full form of DGCA, its roles in aviation safety, licences, and aircraft operations.",
    canonical: `${BASE_URL}/dgca/full-form`,
  },
  "/dgca/medical": {
    title: "DGCA Class 1 & Class 2 Medical Guide | Medical Requirements for Pilots in India",
    description: "Complete guide to DGCA medical requirements for pilot licenses, Class 1 and Class 2 certification.",
    canonical: `${BASE_URL}/dgca/medical`,
  },
  "/dgca/ground-classes": {
    title: "DGCA Ground Classes | CPL Ground Training in India - Complete Guide",
    description: "Top DGCA ground classes for CPL and ATPL aspirants with expert instructors and structured coaching.",
    canonical: `${BASE_URL}/dgca/ground-classes`,
  },
  "/dgca-ground-classes-training-classes": {
    title: "DGCA Ground Classes | CPL Ground Training in India - Complete Guide",
    description: "Top DGCA ground classes for CPL and ATPL aspirants with expert instructors and structured coaching.",
    canonical: `${BASE_URL}/dgca-ground-classes-training-classes`,
  },
  "/cpl-atpl-ground-classes-2": {
    title: "DGCA Ground Classes | CPL Ground Training in India - Complete Guide",
    description: "Top DGCA ground classes for CPL and ATPL aspirants with expert instructors and structured coaching.",
    canonical: `${BASE_URL}/cpl-atpl-ground-classes-2`,
  },
  "/pilot-training": {
    title: "Pilot Training | Flying Star Aviator",
    description: "Complete pilot training guidance for India, USA, Australia, New Zealand & South Africa.",
    canonical: `${BASE_URL}/pilot-training`,
  },
  "/pilot-training/india": {
    title: "Pilot Training India | DGCA-  Commercial Pilot Training",
    description: "DGCA-approved commercial pilot training in India with expert faculty and practical flight preparation.",
    canonical: `${BASE_URL}/pilot-training/india`,
  },
  "/pilot-training/usa": {
    title: "Pilot Training USA | FAA-  Commercial Pilot Training",
    description: "FAA-approved pilot training programs in the USA for aspiring commercial pilots.",
    canonical: `${BASE_URL}/pilot-training/usa`,
  },
  "/pilot-training/australia": {
    title: "Pilot Training Australia | CASA-  Commercial Pilot Training & Diploma",
    description: "CASA-approved pilot training in Australia with integrated flight and ground training.",
    canonical: `${BASE_URL}/pilot-training/australia`,
  },
  "/training-in-australia": {
    title: "Pilot Training Australia | CASA-  Commercial Pilot Training & Diploma",
    description: "CASA-approved pilot training in Australia with integrated flight and ground training.",
    canonical: `${BASE_URL}/training-in-australia`,
  },
  "/pilot-training/new-zealand": {
    title: "Pilot Training New Zealand | CAA-  Commercial Pilot Training",
    description: "Pilot training options in New Zealand for Indian students seeking an international aviation career.",
    canonical: `${BASE_URL}/pilot-training/new-zealand`,
  },
  "/pilot-training/south-africa": {
    title: "Pilot Training South Africa | SACAA-  Commercial Pilot Training",
    description: "Train in South Africa with SACAA-  flight schools. 14-15 months CPL training, 200-210 flying hours, cost-effective programs. DGCA license conversion available. Apply now.",
    canonical: `${BASE_URL}/pilot-training/south-africa`,
  },
  "/training-in-south-africa": {
    title: "Pilot Training South Africa | SACAA-  Commercial Pilot Training",
    description: "Train in South Africa with SACAA-  flight schools. 14-15 months CPL training, 200-210 flying hours, cost-effective programs. DGCA license conversion available. Apply now.",
    canonical: `${BASE_URL}/training-in-south-africa`,
  },
  "/become-a-pilot/become-pilot": {
    title: "How to Become a Pilot in India 2026 | Complete Guide, Eligibility & Career Path",
    description: "Step-by-step guide to becoming a commercial pilot in India after 12th. Eligibility, fees & process.",
    canonical: `${BASE_URL}/become-a-pilot/become-pilot`,
  },
  "/how-to-become-a-pilot": {
    title: "How to Become a Pilot in India 2026 | Complete Guide, Eligibility & Career Path",
    description: "Step-by-step guide to becoming a commercial pilot in India after 12th. Eligibility, fees & process.",
    canonical: `${BASE_URL}/how-to-become-a-pilot`,
  },
  "/how-to-become-a-pilot-in-india-after-12th": {
    title: "How to Become a Pilot in India 2026 | Complete Guide, Eligibility & Career Path",
    description: "Step-by-step guide to becoming a commercial pilot in India after 12th. Eligibility, fees & process.",
    canonical: `${BASE_URL}/how-to-become-a-pilot-in-india-after-12th`,
  },
  "/guide-on-how-to-become-a-pilot": {
    title: "How to Become a Pilot in India 2026 | Complete Guide, Eligibility & Career Path",
    description: "Step-by-step guide to becoming a commercial pilot in India after 12th. Eligibility, fees & process.",
    canonical: `${BASE_URL}/guide-on-how-to-become-a-pilot`,
  },
  "/training-in-india/": {
    title: "Pilot Training India | DGCA-  Commercial Pilot Training",
    description: "DGCA-approved commercial pilot training in India with expert faculty and practical flight preparation.",
    canonical: `${BASE_URL}/training-in-india/`,
  },
  "/how-to-become-a-pilot-in-india/": {
    title: "How to Become a Pilot in India 2026 | Complete Guide, Eligibility & Career Path",
    description: "Step-by-step guide to becoming a commercial pilot in India after 12th. Eligibility, fees & process.",
    canonical: `${BASE_URL}/how-to-become-a-pilot-in-india/`,
  },
  "/locations": {
    title: "Our Locations | Flying Star Aviator",
    description: "Find Flying Star Aviator training centers and offices across India.",
    canonical: `${BASE_URL}/locations`,
  },
  "/pilot-training/ppl": {
    title: "PPL Training in India: Eligibility, Exams & Validity",
    description: "A PPL needs a Class 10 pass, not 10+2 with PCM — that is the CPL rule. DGCA subjects, the 70% pass mark and the two-and-a-half-year paper validity explained.",
    canonical: `${BASE_URL}/pilot-training/ppl`,
  },
  "/pilot-training/cpl": {
    title: "CPL Flight Training in India: The Flying Half of the Licence",
    description: "Ground school and flying school are different institutions. What DGCA requires for the theory papers, the 200-hour minimum and how the two halves sequence.",
    canonical: `${BASE_URL}/pilot-training/cpl`,
  },
  "/pilot-training/guide-to-conversion": {
    title: "Convert a Foreign Pilot Licence to a DGCA Licence",
    description: "DGCA conversion under CAR Section 7 Series G Part I: the 10-hours-PIC-in-24-months currency rule, Indian written exams and a skill test with a DGCA examiner.",
    canonical: `${BASE_URL}/pilot-training/guide-to-conversion`,
  },
  "/pilot-training/maldives": {
    title: "Pilot Training in the Maldives: What to Check First",
    description: "The Maldives CAA publishes its approved flight training organisations. Verify the school on that list, and know that the licence needs DGCA conversion for India.",
    canonical: `${BASE_URL}/pilot-training/maldives`,
  },
  "/pilot-training/sri-lanka": {
    title: "Pilot Training in Sri Lanka: CAASL Requirements Explained",
    description: "CAASL requires age 18+, a Class I medical and English Language Proficiency at ELPC Level 4. What differs from the Indian route, and how conversion back works.",
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
    title: "Pilot Training for Bangalore Candidates | Flying Star Aviator",
    description: "We have no centre in Bangalore. Ground training runs from Delhi, partner schools cover flying hours — DGCA licensing rules are national either way.",
    canonical: `${BASE_URL}/locations/bangalore`,
  },
  "/locations/hyderabad": {
    title: "Pilot Training for Hyderabad Candidates | Flying Star Aviator",
    description: "We have no centre in Hyderabad. Ground classes run from Dwarka, Delhi; flying through partner schools. Same DGCA papers, same 200-hour minimum.",
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
    title: "Aviation Blogs | Flying Star Aviator",
    description: "Read the latest aviation news, DGCA updates, CPL guides and pilot career tips from Flying Star Aviator.",
    canonical: `${BASE_URL}/blogs`,
    ogImage: "/assets/hero-aircraft-1600w.jpg",
    twitterImage: "/assets/hero-aircraft-1600w.jpg",
  },
  "/admin/login": {
    title: "Admin Login — Fly Star Aviation",
    description: "Sign in to the Fly Star Aviation admin console.",
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
    title: "Commercial Pilot Licence (CPL) in India | Flying Star Aviator",
    description: "How to get a DGCA Commercial Pilot Licence in India: eligibility, 200 flight hours, theory papers, medical and cost.",
    canonical: `${BASE_URL}/become-a-pilot/commercial-pilot-licence`,
  },
  "/become-a-pilot/airline-transport-pilot-licence": {
    title: "Airline Transport Pilot Licence (ATPL) in India | Flying Star Aviator",
    description: "DGCA ATPL requirements in India: 1,500 flight hours, theory papers, Class 1 medical and how ATPL differs from CPL.",
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
  "/rtr": {
    title: "RTR Full Form - Radio Telephony Restricted | Complete Guide 2026",
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
    title: blog.seoTitle || `${blog.title} | Fly Star Aviation Blog`,
    description: blog.metaDescription || blog.excerpt || "Expert pilot training guidance, DGCA updates, and aviation career advice from Fly Star Aviation.",
    canonical: `${BASE_URL}${canonicalPath}`,
    ogTitle: blog.seoTitle || blog.title,
    ogDescription: blog.metaDescription || blog.excerpt || "Expert pilot training guidance, DGCA updates, and aviation career advice from Fly Star Aviation.",
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
  return (
    getBlogMeta(normalized) ||
    normalizedRouteMeta[normalized] || {
      title: "Flying Star Aviator | Best Pilot Training Institute in India",
      description: "Join Flying Star Aviator — India's best DGCA-approved CPL & ATPL ground classes in Delhi.",
      canonical: `${BASE_URL}${normalized}`,
    }
  );
}
