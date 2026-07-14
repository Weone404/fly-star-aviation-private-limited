import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Plane,
  Shield,
  Briefcase,
  Wrench,
  Building2,
  TrendingUp,
  Users,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import Passresultsslider from "../layout/Passresultsslider";

const services = [
  {
    icon: GraduationCap,
    title: "Commercial Pilot License (CPL)",
    description: "Complete guidance through every step of earning your CPL — eligibility, DGCA exams, medical requirements, flying school selection, and career planning.",
    href: "/become-a-pilot/become-pilot",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Shield,
    title: "DGCA Ground Classes",
    description: "Concept-based training in Air Navigation, Air Regulations, Meteorology, Technical General & Specific, and Flight Planning — built for exam and real-world confidence.",
    href: "/dgca",
    color: "from-aviation-sky to-blue-400",
  },
  {
    icon: Briefcase,
    title: "Airline Career Counselling",
    description: "Personalized guidance on flying school selection, DGCA Computer Number assistance, RTR(A) preparation, and interview readiness for domestic & international airlines.",
    href: "/courses/airline-preparation",
    color: "from-accent to-yellow-400",
  },
  // Chartered Services, Aircraft Sale & Purchase, Aircraft Management left unchanged
  {
    icon: Plane,
    title: "Chartered Services",
    description: "High-end charter flight services for business, events, and emergency requirements.",
    href: "/services/chartered",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Building2,
    title: "Aircraft Sale & Purchase",
    description: "Professional advice on aircraft purchase, sale, and leasing for access to worldwide networks.",
    href: "/services/aircraft-sourcing-sale",
    color: "from-aviation-runway to-gray-600",
  },
  {
    icon: Wrench,
    title: "Aircraft Management",
    description: "Comprehensive aircraft management services including maintenance, flight operations, and personnel management.",
    href: "/services/aircraft-management",
    color: "from-primary to-aviation-green-light",
  },
];
function useFadeInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Extracted constant — not recreated on every render
const ArrowIcon = (
  <svg
    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export function ServicesSection() {
  const header = useFadeInView();
  const grid = useFadeInView(0.05);

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4 sm:px-6">

        {/* Header */}
        <div
          ref={header.ref}
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Complete Aviation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            From training to placement, we offer complete aviation solutions to
            help you fulfill your dreams.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={grid.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              style={{
                opacity: grid.visible ? 1 : 0,
                transform: grid.visible ? "translateY(0)" : "translateY(20px)",
                // Clamp stagger delay — long delays feel broken on mobile
                transition: `opacity 0.5s ease ${Math.min(index * 80, 320)}ms, transform 0.5s ease ${Math.min(index * 80, 320)}ms`,
              }}
            >
              <Link to={service.href} className="block group h-full">
                <div className="relative h-full bg-card rounded-2xl p-5 md:p-8 shadow-card border border-border
                                hover:shadow-hover hover:border-primary/30 transition-shadow duration-300
                                active:scale-[0.98] transition-transform overflow-hidden">

                  {/* Gradient accent bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${service.color} mb-4 md:mb-6
                                transition-transform duration-300 group-hover:scale-110`}
                  >
                    <service.icon className="h-6 w-6 md:h-7 md:w-7 text-white" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* "Learn more" — always visible on mobile (no hover), hidden then revealed on desktop */}
                  <div className="mt-4 md:mt-6 flex items-center text-primary font-semibold
                                  opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                    Learn more
                    {ArrowIcon}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Passresultsslider />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared "content block" — intro copy + a checklist, in the same      */
/* accent-bar card language as the services cards above.               */
/* ------------------------------------------------------------------ */

type ContentBlock = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  listHeading: string;
  listItems: string[];
  closing: string;
  icon: typeof TrendingUp;
  color: string;
};

const contentBlocks: ContentBlock[] = [
  {
    eyebrow: "Why Aviation",
    title: "Why Aviation is One of the Fastest-Growing Career Choices",
    paragraphs: [
      "India is one of the fastest-growing aviation markets in the world. The expansion of airports, increased domestic and international travel, and growing airline fleets continue to create demand for trained aviation professionals.",
      "A career in aviation offers more than financial rewards. It provides opportunities to work in a dynamic global industry, travel to different destinations, and build a profession based on technical expertise, responsibility, and continuous learning.",
    ],
    listHeading: "Benefits of Choosing Aviation as a Career",
    listItems: [
      "Opportunity to work with leading domestic and international airlines",
      "Career growth in commercial, cargo, charter, and corporate aviation",
      "Globally recognized profession",
      "Continuous learning and skill development",
      "Exposure to advanced aviation technology",
      "Opportunities to work in different regions and countries",
      "Long-term professional growth",
    ],
    closing:
      "With proper planning and quality training, students can build rewarding careers in one of the world's most exciting industries.",
    icon: TrendingUp,
    color: "from-primary to-aviation-green-light",
  },
  {
    eyebrow: "Our Approach",
    title: "Our Student-First Approach",
    paragraphs: [
      "Every aspiring pilot has different goals, strengths, and learning needs. That is why our training approach focuses on personalized guidance rather than a one-size-fits-all model.",
    ],
    listHeading: "We support students through:",
    listItems: [
      "Individual career counselling",
      "Academic planning",
      "Regular performance evaluations",
      "Doubt-clearing sessions",
      "Mock examinations",
      "Study strategies",
      "Interview preparation",
      "Aviation career planning",
    ],
    closing:
      "Our objective is to help students build confidence while developing a strong understanding of aviation concepts.",
    icon: Users,
    color: "from-aviation-sky to-blue-400",
  },
  {
    eyebrow: "Our Teaching",
    title: "Learn with Confidence, Grow with Knowledge",
    paragraphs: [
      "Success in aviation depends on preparation, consistency, and the ability to understand complex concepts. Our faculty emphasizes conceptual learning, practical applications, and continuous improvement.",
    ],
    listHeading: "Students benefit from:",
    listItems: [
      "Updated learning resources",
      "Interactive classroom discussions",
      "Practice question banks",
      "Performance tracking",
      "Revision sessions",
      "One-on-one mentoring",
      "Guidance from experienced aviation professionals",
    ],
    closing:
      "By focusing on both knowledge and professional development, we prepare students for examinations and future airline careers.",
    icon: BookOpenCheck,
    color: "from-accent to-yellow-400",
  },
];

function ContentBlockSection({ block, bgClass }: { block: ContentBlock; bgClass: string }) {
  const header = useFadeInView();
  const panel = useFadeInView(0.05);

  return (
    <section className={`py-12 md:py-20 ${bgClass}`}>
      <div className="container px-4 sm:px-6">

        {/* Header */}
        <div
          ref={header.ref}
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            {block.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {block.title}
          </h2>
          {block.paragraphs.map((para) => (
            <p
              key={para}
              className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mt-4 first:mt-0"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Panel — same accent-bar card language as the services grid */}
        <div
          ref={panel.ref}
          style={{
            opacity: panel.visible ? 1 : 0,
            transform: panel.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 80ms, transform 0.5s ease 80ms",
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-card rounded-2xl p-5 md:p-8 shadow-card border border-border overflow-hidden">

            {/* Gradient accent bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${block.color}`}
              aria-hidden="true"
            />

            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${block.color} mb-4 md:mb-6`}
            >
              <block.icon className="h-6 w-6 md:h-7 md:w-7 text-white" aria-hidden="true" />
            </div>

            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">{block.listHeading}</h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6 md:mb-8">
              {block.listItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm md:text-base text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {block.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyAviationCareerSection() {
  return <ContentBlockSection block={contentBlocks[0]} bgClass="bg-background" />;
}

export function StudentFirstApproachSection() {
  return <ContentBlockSection block={contentBlocks[1]} bgClass="bg-muted/30" />;
}

export function LearnWithConfidenceSection() {
  return <ContentBlockSection block={contentBlocks[2]} bgClass="bg-background" />;
}

/* ------------------------------------------------------------------ */
/* Frequently Asked Questions                                          */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: "What is a Commercial Pilot License (CPL)?",
    answer:
      "A Commercial Pilot License (CPL) is the qualification required to operate aircraft professionally for airlines, charter companies, cargo operators, and other commercial aviation organizations. It is issued after meeting DGCA eligibility requirements, passing prescribed examinations, completing flight training, and fulfilling the required flying hours.",
  },
  {
    question: "How do I become a commercial pilot after Class 12?",
    answer:
      "Students generally begin by completing Class 12 with Physics and Mathematics (or an equivalent qualification), obtaining a DGCA Computer Number, clearing the required medical examinations, completing DGCA ground training, joining a DGCA-approved flying school, and obtaining the necessary flight experience before applying for a Commercial Pilot License.",
  },
  {
    question: "What are DGCA Ground Classes?",
    answer:
      "DGCA Ground Classes prepare aspiring pilots for the theoretical subjects required for pilot licensing. Training typically covers Air Navigation, Air Regulations, Aviation Meteorology, Technical General, Technical Specific, Flight Planning, and other aviation-related topics.",
  },
  {
    question: "What is the DGCA Computer Number?",
    answer:
      "The DGCA Computer Number is a unique identification number issued by the Directorate General of Civil Aviation (DGCA). It is required for appearing in DGCA examinations and completing various licensing procedures.",
  },
  {
    question: "Can I become a pilot without Physics and Mathematics in Class 12?",
    answer:
      "Students who have not studied Physics and Mathematics during Class 12 may be able to fulfill the eligibility requirements through recognized alternative educational pathways, such as approved equivalent qualifications. Professional guidance can help determine the most suitable option.",
  },
  {
    question: "What is the difference between PPL and CPL?",
    answer:
      "A Private Pilot License (PPL) allows individuals to fly privately and is generally intended for non-commercial purposes. A Commercial Pilot License (CPL) enables pilots to work professionally and receive compensation for flying.",
  },
  {
    question: "How long does commercial pilot training take?",
    answer:
      "The duration depends on factors such as examination schedules, weather conditions, flight availability, and individual progress. Training timelines vary, and students should consult their chosen academy and flying school for detailed planning.",
  },
  {
    question: "Is aviation a good career in India?",
    answer:
      "India's aviation sector continues to expand, creating opportunities for qualified pilots across passenger airlines, cargo operators, charter services, and corporate aviation. Students who receive quality training and maintain professional standards can build rewarding long-term careers.",
  },
  {
    question: "What should I look for when choosing a pilot training institute?",
    answer:
      "Important factors include experienced instructors, updated curriculum, personalized mentoring, transparent guidance, student support, and a strong reputation for academic quality.",
  },
  {
    question: "Why choose Flystar Aviation Academy?",
    answer:
      "Flystar Aviation Academy provides comprehensive guidance for aspiring pilots through structured learning, experienced faculty, career counselling, DGCA-focused preparation, and continuous student support.",
  },
];

export function FAQSection() {
  const header = useFadeInView();
  const list = useFadeInView(0.05);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4 sm:px-6">

        {/* Header */}
        <div
          ref={header.ref}
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            FAQs
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div ref={list.ref} className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                style={{
                  opacity: list.visible ? 1 : 0,
                  transform: list.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${Math.min(index * 60, 320)}ms, transform 0.5s ease ${Math.min(index * 60, 320)}ms`,
                }}
                className="bg-card rounded-2xl border border-border shadow-card overflow-hidden
                           hover:border-primary/30 transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                >
                  <span className="text-base md:text-lg font-bold text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.35s ease, opacity 0.3s ease",
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-5 md:px-6 pb-5 md:pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}