/**
 * Per-page title/description map — the single source of truth for document
 * metadata, read synchronously by the useMeta hook. Ported from the former
 * backend `/api/meta` route so metadata is available instantly at render time
 * (works during static prerendering, no network / CORS / cold-start).
 *
 * Keys are canonical paths (no trailing slash). Alias routes resolve to their
 * canonical path before lookup (see useMeta).
 */
export interface PageMeta {
  title: string;
  description: string;
}

export const DEFAULT_META: PageMeta = {
  title: "Flying Star Aviator | Best Pilot Training in India",
  description:
    "Flying Star Aviator — DGCA-approved CPL & ATPL ground classes in Delhi since 2008.",
};

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Flying Star Aviator | Best Pilot Training Institute in India",
    description:
      "Join Flying Star Aviator — India's best DGCA-approved CPL & ATPL ground classes in Delhi. Start your pilot career today.",
  },
  "/about": {
    title: "About Us | Flying Star Aviator Private Limited",
    description:
      "Learn about Flying Star Aviator, Delhi's leading aviation training institute since 2008.",
  },
  "/blogs": {
    title: "Aviation Blogs | Flying Star Aviator",
    description:
      "Read the latest aviation news, DGCA updates, CPL guides and pilot career tips from Flying Star Aviator.",
  },
  "/contact": {
    title: "Contact Us | Flying Star Aviator",
    description:
      "Get in touch with Flying Star Aviator. Visit us in Dwarka, Delhi or call +91 9953536199.",
  },
  "/courses/cpl": {
    title: "CPL Ground Classes in Delhi | Flying Star Aviator",
    description:
      "Best DGCA CPL ground classes in Delhi. Air Navigation, Meteorology, Air Regulations & more. Enroll now.",
  },
  "/courses/atpl": {
    title: "ATPL Ground Training | Flying Star Aviator",
    description:
      "Airline Transport Pilot License ground training for pilots advancing their aviation career.",
  },
  "/courses/cabin-crew": {
    title: "Cabin Crew Course | Flying Star Aviator",
    description:
      "Professional cabin crew training program. Start your airline career with Flying Star Aviator.",
  },
  "/courses/ground-staff": {
    title: "Ground Staff Course | Flying Star Aviator",
    description:
      "Aviation ground staff training for a rewarding career at airports across India.",
  },
  "/pilot-training": {
    title: "Pilot Training | Flying Star Aviator",
    description:
      "Complete pilot training guidance for India, USA, Australia, New Zealand & South Africa.",
  },
  "/pilot-training/india": {
    title: "Pilot Training in India | Flying Star Aviator",
    description:
      "Guide to becoming a commercial pilot in India with DGCA-approved flight training.",
  },
  "/pilot-training/usa": {
    title: "Pilot Training in USA | Flying Star Aviator",
    description:
      "Complete guide to pilot training in the USA for Indian students. FAA approved programs.",
  },
  "/pilot-training/australia": {
    title: "Pilot Training in Australia | Flying Star Aviator",
    description:
      "Explore CASA-approved pilot training programs in Australia for aspiring commercial pilots.",
  },
  "/pilot-training/new-zealand": {
    title: "Pilot Training in New Zealand | Flying Star Aviator",
    description:
      "Pilot training options in New Zealand for Indian students seeking an international aviation career.",
  },
  "/pilot-training/south-africa": {
    title: "Pilot Training in South Africa | Flying Star Aviator",
    description:
      "Affordable pilot training in South Africa. Explore options with Flying Star Aviator.",
  },
  "/dgca": {
    title: "DGCA Exam Preparation | Flying Star Aviator",
    description:
      "Crack your DGCA exams with Flying Star Aviator's expert-led ground classes in Delhi.",
  },
  "/dgca/ground-classes": {
    title: "DGCA Ground Classes in Delhi | Flying Star Aviator",
    description:
      "Top DGCA CPL & ATPL ground classes in Dwarka, Delhi. Expert faculty, high pass rates.",
  },
  "/dgca/medical": {
    title: "DGCA Medical Requirements | Flying Star Aviator",
    description:
      "Complete guide to DGCA Class 1 & Class 2 medical requirements for pilot license in India.",
  },
  "/become-a-pilot/become-pilot": {
    title: "How to Become a Pilot in India | Flying Star Aviator",
    description:
      "Step-by-step guide to becoming a commercial pilot in India after 12th. Eligibility, fees & process.",
  },
  "/become-a-pilot/commercial-pilot-licence": {
    title: "Commercial Pilot Licence (CPL) | Flying Star Aviator",
    description:
      "Everything you need to know about getting a CPL in India. Training, exams, cost & career scope.",
  },
  "/become-a-pilot/airline-transport-pilot-licence": {
    title: "Airline Transport Pilot Licence (ATPL) | Flying Star Aviator",
    description:
      "Guide to obtaining an ATPL in India. Requirements, training and career opportunities.",
  },
  "/services": {
    title: "Aviation Services | Flying Star Aviator",
    description:
      "Flying Star Aviator offers charter services, aircraft management, MRO, CAMO and more.",
  },
  "/locations": {
    title: "Our Locations | Flying Star Aviator",
    description: "Find Flying Star Aviator training centers and offices across India.",
  },
  "/rtr": {
    title: "RTR(A) Training | Flying Star Aviator",
    description:
      "Radio Telephony Restricted (Aeronautical) exam preparation with Flying Star Aviator.",
  },

  // ── Pilot training sub-pages ────────────────────────────────────────────────
  "/pilot-training/cpl": {
    title: "CPL Pilot Training | Flying Star Aviator",
    description:
      "Commercial Pilot Licence training pathway with DGCA-focused ground classes and flight training guidance.",
  },
  "/pilot-training/ppl": {
    title: "PPL Pilot Training | Flying Star Aviator",
    description:
      "Private Pilot Licence training guidance — eligibility, syllabus and the first step toward a flying career.",
  },
  "/pilot-training/maldives": {
    title: "Pilot Training in Maldives | Flying Star Aviator",
    description:
      "Explore pilot training options in the Maldives for Indian students seeking an international flying career.",
  },
  "/pilot-training/sri-lanka": {
    title: "Pilot Training in Sri Lanka | Flying Star Aviator",
    description:
      "Guide to pilot training in Sri Lanka for aspiring commercial pilots from India.",
  },
  "/pilot-training/guide-to-conversion": {
    title: "Foreign Licence to DGCA Conversion Guide | Flying Star Aviator",
    description:
      "Step-by-step guide to converting a foreign pilot licence to a DGCA CPL in India.",
  },

  // ── Locations ───────────────────────────────────────────────────────────────
  "/locations/delhi": {
    title: "Pilot Training in Delhi | Flying Star Aviator",
    description:
      "DGCA CPL & ATPL ground classes in Dwarka, Delhi. Visit Flying Star Aviator's flagship training centre.",
  },
  "/locations/mumbai": {
    title: "Pilot Training in Mumbai | Flying Star Aviator",
    description:
      "Pilot training guidance for aspiring pilots in Mumbai with Flying Star Aviator.",
  },
  "/locations/bangalore": {
    title: "Pilot Training in Bangalore | Flying Star Aviator",
    description:
      "Pilot training guidance for aspiring pilots in Bangalore with Flying Star Aviator.",
  },
  "/locations/hyderabad": {
    title: "Pilot Training in Hyderabad | Flying Star Aviator",
    description:
      "Pilot training guidance for aspiring pilots in Hyderabad with Flying Star Aviator.",
  },

  // ── DGCA sub-pages ──────────────────────────────────────────────────────────
  "/editorial-policy": {
    title: "Editorial Policy | Flying Star Aviator",
    description:
      "How our DGCA guides are researched, verified and corrected.",
  },
  "/dgca/computer-number": {
    title: "DGCA Computer Number Guide | Flying Star Aviator",
    description:
      "How to apply for your DGCA computer number — eligibility, documents and the step-by-step process.",
  },
  "/dgca/board-verification": {
    title: "DGCA Board Verification Guide | Flying Star Aviator",
    description:
      "Understand the DGCA board verification process for your 10th and 12th certificates.",
  },
  "/dgca/full-form": {
    title: "DGCA Full Form & Meaning | Flying Star Aviator",
    description:
      "What DGCA stands for and its role in regulating pilot training and licensing in India.",
  },

  // ── Courses ─────────────────────────────────────────────────────────────────
  "/courses/airline-preparation": {
    title: "Airline Preparation Course | Flying Star Aviator",
    description:
      "Airline interview and assessment preparation to help pilots land their first airline job.",
  },
  "/courses/Air-india-pilot-interview": {
    title: "Air India Pilot Interview Preparation | Flying Star Aviator",
    description:
      "Targeted preparation for the Air India pilot interview and assessment process.",
  },
  "/courses/Indigo-pilot-interview": {
    title: "IndiGo Pilot Interview Preparation | Flying Star Aviator",
    description:
      "Targeted preparation for the IndiGo pilot interview and assessment process.",
  },

  // ── Aviation services ───────────────────────────────────────────────────────
  "/services/aircraft-management": {
    title: "Aircraft Management Services | Flying Star Aviator",
    description:
      "Professional aircraft management — operations, crewing, compliance and cost control for owners.",
  },
  "/services/aircraft-sourcing-sale": {
    title: "Aircraft Sourcing & Sale | Flying Star Aviator",
    description:
      "Aircraft acquisition, sourcing and sale advisory for buyers and sellers across India.",
  },
  "/services/aviation-consultancy": {
    title: "Aviation Consultancy Services | Flying Star Aviator",
    description:
      "Expert aviation consultancy covering operations, compliance and business setup.",
  },
  "/services/mro": {
    title: "Aircraft MRO Services | Flying Star Aviator",
    description:
      "Maintenance, Repair and Overhaul services delivered to OEM and DGCA standards.",
  },
  "/services/charter-services": {
    title: "Air Charter Services | Flying Star Aviator",
    description:
      "Private jet and air charter services for business and leisure travel across India.",
  },
  "/services/livery-painting": {
    title: "Aircraft Livery Painting | Flying Star Aviator",
    description:
      "Professional aircraft livery design and painting services to OEM specifications.",
  },
  "/services/camo": {
    title: "CAMO Services | Flying Star Aviator",
    description:
      "Continuing Airworthiness Management Organisation (CAMO) services for aircraft operators.",
  },
  "/services/components-spares": {
    title: "Aircraft Components & Spares | Flying Star Aviator",
    description:
      "Sourcing and supply of aircraft components and spare parts for operators and MROs.",
  },
};
