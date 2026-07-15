import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Check, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function ShieldIcon() {
  return (
    <svg
      className="w-5 h-5 text-primary shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

const TRUST_BADGES = [
  { label: "EASA" },
  { label: "FAA pathway" },
  { label: "DGCA" },
  {
    label: "ISO Certified",
    svg: (
      <svg
        className="w-5 h-5 text-primary shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    label: "98% Placement Rate",
    svg: (
      <svg
        className="w-5 h-5 text-primary shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    question: "What is a Commercial Pilot License (CPL)?",
    answer:
      "A Commercial Pilot License (CPL) is the qualification required to operate aircraft professionally for airlines, charter companies, cargo operators, and other commercial aviation organizations. It is issued after meeting DGCA eligibility requirements, passing prescribed examinations, completing flight training, and fulfilling the required flying hours.",
  },
  {
    question: "Can I become a pilot after Class 12?",
    answer:
      "Yes. Students who have completed Class 12 with Physics and Mathematics can begin the process of becoming a commercial pilot, subject to meeting DGCA requirements.",
  },
  {
    question: "How do I become a commercial pilot after Class 12?",
    answer:
      "Students generally begin by completing Class 12 with Physics and Mathematics (or an equivalent qualification), obtaining a DGCA Computer Number, clearing the required medical examinations, completing DGCA ground training, joining a DGCA-approved flying school, and obtaining the necessary flight experience before applying for a Commercial Pilot License.",
  },
  {
    question: "Do I need a DGCA Computer Number before joining ground classes?",
    answer:
      "While requirements may vary, obtaining a DGCA Computer Number early in your journey helps streamline the examination and licensing process.",
  },
  {
    question: "What are DGCA Ground Classes?",
    answer:
      "DGCA Ground Classes prepare aspiring pilots for the theoretical subjects required for pilot licensing. Training typically covers Air Navigation, Air Regulations, Aviation Meteorology, Technical General, Technical Specific, Flight Planning, and other aviation-related topics.",
  },
  {
    question: "Is DGCA Ground School difficult?",
    answer:
      "DGCA subjects require consistent study and conceptual understanding. With structured training, regular practice, and expert guidance, students can prepare effectively.",
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
    question: "How do I choose the best pilot training institute?",
    answer:
      "Look for experienced instructors, updated curriculum, personalized mentoring, transparent guidance, and a strong focus on student outcomes rather than marketing claims.",
  },
];

const SEARCH_TOPICS = [
  { label: "Commercial Pilot License in India", to: "/become-a-pilot/commercial-pilot-licence" },
  { label: "Pilot Training in India", to: "/pilot-training/india" },
  { label: "Best Pilot Training Institute", to: "/pilot-training" },
  { label: "DGCA Ground Classes", to: "/dgca/ground-classes" },
  { label: "DGCA Computer Number", to: "/dgca/computer-number" },
  { label: "CPL Course", to: "/courses/cpl" },
  { label: "CPL Eligibility", to: "/pilot-training/eligibility" },
  { label: "Pilot Course Fees", to: "/courses/cpl" },
  { label: "Pilot Salary in India", to: "/pilot-training/salary-in-india" },
  { label: "Private Pilot License (PPL)", to: "/pilot-training/ppl" },
  { label: "Flight Training", to: "/pilot-training" },
  { label: "Flying Schools", to: "/pilot-training/india" },
  { label: "RTR(A) Classes", to: "/rtr" },
  { label: "Aviation Career", to: "/careers" },
  { label: "Airline Pilot Training", to: "/courses/airline-preparation" },
];

/** Small reusable heading with the accent "eyebrow" pill used across sections. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
      {children}
    </span>
  );
}

/** Checkmark list item — used in place of default browser bullets for a more premium feel. */
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-3 w-3 text-primary" strokeWidth={3} aria-hidden="true" />
      </span>
      <span className="text-muted-foreground text-base md:text-lg">{children}</span>
    </li>
  );
}

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`group border rounded-xl bg-card transition-colors ${
        open ? "border-primary/50" : "border-border hover:border-primary/40"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <span className="font-semibold text-foreground text-sm md:text-base">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {/* grid-rows trick animates height without a hardcoded max-height */}
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed px-5 pb-4 md:px-6 md:pb-5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <Eyebrow>Your Career, Mapped Out</Eyebrow>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
                Your Aviation Career Begins with the Right Foundation
              </h2>
            </div>

            <div className="text-left space-y-4 text-muted-foreground text-base md:text-lg">
              <p>
                The aviation industry offers exciting opportunities for
                individuals who are passionate about flying, technology, and
                continuous learning. Becoming a commercial pilot is not just
                about earning a license—it is about developing the knowledge,
                discipline, decision-making skills, and professionalism
                required to operate aircraft safely and responsibly.
              </p>

              <p>
                At Flystar Aviation Academy, we prepare students for every
                milestone of their aviation journey. From understanding
                eligibility requirements and clearing DGCA examinations to
                selecting the right flying school and preparing for airline
                recruitment, we provide structured guidance designed to help
                students make informed career decisions.
              </p>

              <p className="mb-4">
                Whether your ambition is to fly domestic routes, join an
                international airline, work in charter aviation, or pursue
                advanced aviation training, our team is committed to helping
                you achieve your long-term goals.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 text-left">
              Why Aviation is One of the Fastest-Growing Career Choices
            </h3>

            <div className="text-left space-y-4 text-muted-foreground text-base md:text-lg mb-8">
              <p>
                India is one of the fastest-growing aviation markets in the
                world. The expansion of airports, increased domestic and
                international travel, and growing airline fleets continue to
                create demand for trained aviation professionals.
              </p>
              <p>
                A career in aviation offers more than financial rewards. It
                provides opportunities to work in a dynamic global industry,
                travel to different destinations, and build a profession
                based on technical expertise, responsibility, and continuous
                learning.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8 mb-10">
              <h4 className="text-lg md:text-xl font-semibold text-foreground mb-4 text-left">
                Benefits of Choosing Aviation as a Career
              </h4>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-left">
                <CheckItem>Opportunity to work with leading domestic and international airlines</CheckItem>
                <CheckItem>Career growth in commercial, cargo, charter, and corporate aviation</CheckItem>
                <CheckItem>Globally recognized profession</CheckItem>
                <CheckItem>Continuous learning and skill development</CheckItem>
                <CheckItem>Exposure to advanced aviation technology</CheckItem>
                <CheckItem>Opportunities to work in different regions and countries</CheckItem>
                <CheckItem>Long-term professional growth</CheckItem>
              </ul>
            </div>

            <p className="text-muted-foreground text-base md:text-lg mb-10 text-left">
              With proper planning and quality training, students can build
              rewarding careers in one of the world's most exciting
              industries.
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 text-left">
              Our Student-First Approach
            </h3>

            <p className="text-muted-foreground text-base md:text-lg mb-6 text-left">
              Every aspiring pilot has different goals, strengths, and
              learning needs. That is why our training approach focuses on
              personalized guidance rather than a one-size-fits-all model.
            </p>

            <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8 mb-10">
              <h4 className="text-lg md:text-xl font-semibold text-foreground mb-4 text-left">
                We support students through:
              </h4>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-left">
                <CheckItem>Individual career counselling</CheckItem>
                <CheckItem>Academic planning</CheckItem>
                <CheckItem>Regular performance evaluations</CheckItem>
                <CheckItem>Doubt-clearing sessions</CheckItem>
                <CheckItem>Mock examinations</CheckItem>
                <CheckItem>Study strategies</CheckItem>
                <CheckItem>Interview preparation</CheckItem>
                <CheckItem>Aviation career planning</CheckItem>
              </ul>
            </div>

            <p className="text-muted-foreground text-base md:text-lg mb-10 text-left">
              Our objective is to help students build confidence while
              developing a strong understanding of aviation concepts.
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 text-left">
              Learn with Confidence, Grow with Knowledge
            </h3>

            <p className="text-muted-foreground text-base md:text-lg mb-6 text-left">
              Success in aviation depends on preparation, consistency, and
              the ability to understand complex concepts. Our faculty
              emphasizes conceptual learning, practical applications, and
              continuous improvement.
            </p>

            <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
              <h4 className="text-lg md:text-xl font-semibold text-foreground mb-4 text-left">
                Students benefit from:
              </h4>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-left">
                <CheckItem>Updated learning resources</CheckItem>
                <CheckItem>Interactive classroom discussions</CheckItem>
                <CheckItem>Practice question banks</CheckItem>
                <CheckItem>Performance tracking</CheckItem>
                <CheckItem>Revision sessions</CheckItem>
                <CheckItem>One-on-one mentoring</CheckItem>
                <CheckItem>Guidance from experienced aviation professionals</CheckItem>
              </ul>
            </div>

            <p className="text-muted-foreground text-base md:text-lg mt-8 text-left">
              By focusing on both knowledge and professional development, we
              prepare students for examinations and future airline careers.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 text-left">
                Frequently Searched Topics
              </h3>
              <p className="text-muted-foreground text-base md:text-lg mb-5 text-left">
                Students visiting Flystar Aviation Academy often search for:
              </p>
              <ul className="flex flex-wrap gap-2 list-none p-0">
                {SEARCH_TOPICS.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="inline-block text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border transition-colors hover:text-foreground hover:border-primary/40"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background relative overflow-hidden">
        {/* Background blobs — scaled down on mobile to prevent horizontal overflow */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container px-4 relative">
          <div
            ref={ref}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <Eyebrow>Ready to Begin Your Aviation Journey?</Eyebrow>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Your Aviation Career Begins with the Right Foundation
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-10 max-w-2xl mx-auto">
              Schedule your free career counselling session today and discover the right path
              toward earning your Commercial Pilot License, preparing for DGCA Ground Classes,
              and building a rewarding career in aviation.
            </p>

            {/* Full-width buttons on mobile for larger tap targets */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                variant="aviation"
                size="xl"
                className="w-full sm:w-auto group"
                asChild
              >
                <Link to="/contact">
                  Apply Now
                  <ArrowRight
                    className="h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto"
                asChild
              >
                <a href="tel:+919953536199">
                  <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                  Call: +91 99535 36199
                </a>
              </Button>
            </div>

            {/* Trust badges — 2-col grid on mobile, flex-wrap on larger screens */}
            <div className="mt-8 md:mt-12 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 md:gap-8">
              {TRUST_BADGES.map(({ label, svg }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {svg ?? <ShieldIcon />}
                  <span className="text-xs sm:text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Eyebrow>Have Questions?</Eyebrow>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              {FAQS.map((faq, index) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  open={openFaq === index}
                  onToggle={() =>
                    setOpenFaq((prev) => (prev === index ? null : index))
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}