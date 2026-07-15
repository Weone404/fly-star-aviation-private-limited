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
  Radio,
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

/* ================================================================== */
/* Intro: Your Journey to Becoming a Commercial Pilot Starts Here     */
/* ================================================================== */

export function JourneyIntroSection() {
  const header = useFadeInView();
  const panel = useFadeInView(0.05);

  const leadParagraph =
    "Dreaming of flying for leading airlines? Every successful aviation career begins with the right guidance, structured learning, and professional training. At Flystar Aviation Academy, we help aspiring pilots transform their passion for flying into a successful profession through industry-focused pilot training and expert mentorship.";

  const bodyParagraphs = [
    "Whether you are exploring how to become a pilot after 12th, searching for the best Commercial Pilot License (CPL) course, looking for DGCA Ground Classes, or need guidance on obtaining your DGCA Computer Number, Flystar provides complete support at every stage of your aviation journey.",
    "We believe becoming a pilot is more than clearing examinations—it requires the right knowledge, disciplined preparation, practical understanding, and career planning. Our experienced aviation instructors and counselors work closely with every student to ensure they understand the complete pilot training pathway, from eligibility and licensing to airline career opportunities.",
    "With a student-first approach, updated training methods, and a curriculum aligned with DGCA requirements, Flystar has become a trusted destination for future pilots across India.",
  ];

  const highlights = [
    { icon: GraduationCap, label: "How to Become a Pilot After 12th" },
    { icon: Shield, label: "Commercial Pilot License (CPL)" },
    { icon: BookOpenCheck, label: "DGCA Ground Classes" },
    { icon: Briefcase, label: "DGCA Computer Number Guidance" },
  ];

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
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            Your Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Your Journey to Becoming a Commercial Pilot Starts Here
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {leadParagraph}
          </p>
        </div>

        {/* Panel — accent-bar card matching the rest of the page */}
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
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-aviation-green-light"
              aria-hidden="true"
            />

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-primary to-aviation-green-light mb-4 md:mb-6">
              <Plane className="h-6 w-6 md:h-7 md:w-7 text-white" aria-hidden="true" />
            </div>

            {/* Body paragraphs */}
            <div className="space-y-4 mb-6 md:mb-8">
              {bodyParagraphs.map((para) => (
                <p
                  key={para}
                  className="text-sm md:text-base text-muted-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Highlight chips */}
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {highlights.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50
                             px-3.5 py-2 text-xs md:text-sm font-semibold text-foreground
                             hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200"
                >
                  <Icon className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

/* ================================================================== */
/* Detailed Service Information Section                              */
/* ================================================================== */

type ServiceDetail = {
  icon: typeof GraduationCap;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  closing?: string;
  color: string;
};

const serviceDetails: ServiceDetail[] = [
  {
    icon: GraduationCap,
    title: "Commercial Pilot License (CPL) Training",
    subtitle: "Your Path to Professional Aviation",
    description:
      "A Commercial Pilot License is the certification required to work as a professional pilot with airlines, charter companies, cargo operators, and corporate aviation organizations.",
    items: [
      "Career counselling",
      "DGCA examination preparation",
      "Ground school training",
      "Flying school guidance",
      "Documentation assistance",
      "Medical guidance",
      "Airline interview preparation",
    ],
    closing:
      "Our goal is to ensure that students are not only ready to obtain their license but are also prepared to begin successful careers in aviation.",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Shield,
    title: "DGCA Ground Classes Designed for Success",
    subtitle: "Master Aviation Theory with Confidence",
    description:
      "Strong theoretical knowledge is the foundation of every successful pilot. Our DGCA Ground Classes are designed to help students understand aviation concepts rather than simply memorize information.",
    items: [
      "Air Navigation",
      "Air Regulations",
      "Aviation Meteorology",
      "Technical General",
      "Technical Specific",
      "Flight Planning",
      "Performance",
      "Human Performance and Limitations",
      "Aircraft Systems",
      "Operational Procedures",
    ],
    closing:
      "Every class includes concept-based explanations, practical examples, revision sessions, doubt-solving classes, and regular mock examinations to help students build confidence before appearing for DGCA exams.",
    color: "from-aviation-sky to-blue-400",
  },
  {
    icon: Briefcase,
    title: "DGCA Computer Number Assistance",
    subtitle: "Complete First-Step Support",
    description:
      "Obtaining a DGCA Computer Number is one of the first official steps in becoming a pilot. However, many students face delays due to documentation errors or a lack of clarity about the application process.",
    items: [
      "Eligibility verification",
      "Required documents",
      "Online application process",
      "Certificate verification",
      "Common application mistakes",
      "Follow-up guidance",
    ],
    closing:
      "This helps students complete the process efficiently and avoid unnecessary delays.",
    color: "from-accent to-yellow-400",
  },
  {
    icon: Plane,
    title: "Private Pilot License (PPL)",
    subtitle: "Start Your Flying Journey",
    description:
      "A Private Pilot License (PPL) is an excellent option for students who wish to experience flying before pursuing a commercial aviation career. It also provides a strong foundation for those planning to progress toward a Commercial Pilot License.",
    closing:
      "With proper guidance, students can understand the differences between PPL and CPL, choose the right training route, and plan their aviation journey with confidence.",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Radio,
    title: "RTR(A) Classes",
    subtitle: "Master Aviation Communication",
    description:
      "Clear and professional communication is essential in aviation. The Radio Telephony Restricted (Aeronautical) examination evaluates a pilot's ability to communicate effectively with Air Traffic Control.",
    items: [
      "Aviation communication procedures",
      "Standard phraseology",
      "Radio communication practice",
      "Viva preparation",
      "Mock interviews",
      "Practical communication exercises",
    ],
    closing:
      "By combining theory with simulated communication scenarios, students develop the confidence required for real-world aviation environments.",
    color: "from-aviation-sky to-blue-400",
  },
];

export function ServiceDetailsSection() {
  const header = useFadeInView();
  const grid = useFadeInView(0.05);

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
            Detailed Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Our Training Programs In-Depth
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Explore comprehensive details about each of our specialized training programs designed to guide you through every stage of your aviation career.
          </p>
        </div>

        {/* Service Detail Cards */}
        <div
          ref={grid.ref}
          className="max-w-5xl mx-auto space-y-4 md:space-y-6"
        >
          {serviceDetails.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                style={{
                  opacity: grid.visible ? 1 : 0,
                  transform: grid.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${Math.min(index * 80, 400)}ms, transform 0.5s ease ${Math.min(index * 80, 400)}ms`,
                }}
                className="group relative rounded-2xl bg-card border border-border p-5 md:p-8 shadow-card
                           hover:shadow-hover hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
                  aria-hidden="true"
                />

                {/* Header with icon */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-4 md:mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${service.color} flex-shrink-0
                                transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" aria-hidden="true" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-accent font-semibold">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
                  {service.description}
                </p>

                {/* Items list */}
                {service.items && service.items.length > 0 && (
                  <div className="mb-4 md:mb-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span className="text-sm md:text-base text-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Closing */}
                {service.closing && (
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {service.closing}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Step 1: Meet the Basic Eligibility Section                        */
/* ================================================================== */

export function StepByStepPathwaySection() {
  const header = useFadeInView();
  const panel = useFadeInView(0.05);

  const stepBlock = {
    eyebrow: "Your Journey",
    title: "Step 1: Meet the Basic Eligibility",
    paragraphs: [
      "To pursue a Commercial Pilot License (CPL), students generally need to complete several foundational requirements. Our team will guide you through each requirement and help you plan your journey.",
      "If you have not studied Physics or Mathematics in Class 12, there are alternative pathways such as NIOS to meet the eligibility criteria. Our career counselors can guide you through the available options and help you choose the right path based on your academic background.",
    ],
    listHeading: "Basic Eligibility Requirements:",
    listItems: [
      "Complete 10+2 (or equivalent) with Physics and Mathematics",
      "Meet the DGCA medical fitness requirements",
      "Obtain a DGCA Computer Number",
      "Clear the required DGCA examinations",
      "Complete the required flying hours at a DGCA-approved flying school",
    ],
    closing:
      "Every student's journey is unique. Our counselors are here to help you understand these requirements and chart the best path forward.",
    icon: CheckCircle2,
    color: "from-primary to-aviation-green-light",
  };

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
            {stepBlock.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {stepBlock.title}
          </h2>
          {stepBlock.paragraphs.map((para) => (
            <p
              key={para}
              className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mt-4 first:mt-0"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Panel */}
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
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stepBlock.color}`}
              aria-hidden="true"
            />

            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${stepBlock.color} mb-4 md:mb-6`}
            >
              <stepBlock.icon className="h-6 w-6 md:h-7 md:w-7 text-white" aria-hidden="true" />
            </div>

            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">{stepBlock.listHeading}</h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6 md:mb-8">
              {stepBlock.listItems.map((item) => (
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
              {stepBlock.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Shared "content block" — intro copy + a checklist, in the same      */
/* accent-bar card language as the services cards above.               */
/* ================================================================== */

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

/* ================================================================== */
/* Frequently Asked Questions                                          */
/* ================================================================== */

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