import { useEffect, useRef, useState } from "react";

import {
  Award,
  Users,
  BookOpen,
  Clock,
  CheckCircle2,
  Plane,
  Compass,
  Radio,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Experienced Aviation Mentors",
    description:
      "Our instructors bring years of aviation knowledge and practical experience into the classroom. Instead of relying solely on textbooks, they explain aviation concepts using real operational examples that help students understand subjects more effectively.",
  },
  {
    icon: BookOpen,
    title: "Updated DGCA Curriculum",
    description:
      "Aviation regulations continue to evolve. Our training materials are regularly updated to reflect the latest DGCA syllabus, examination patterns, and industry practices, ensuring students prepare with relevant and accurate information.",
  },
  {
    icon: Users,
    title: "Personalized Learning Experience",
    description:
      "Every student learns differently. We maintain focused classroom sessions, regular assessments, and one-on-one mentoring to identify strengths and improve weaker areas before examinations.",
  },
];

const structuredProcess = [
  "Foundation Classes",
  "Subject-wise Concept Building",
  "Weekly Assessments",
  "Mock Examinations",
  "Performance Reviews",
  "Doubt-Clearing Sessions",
  "Revision Programs",
  "Career Guidance",
];

const trainingStages = [
  {
    icon: Plane,
    title: "Commercial Pilot License (CPL)",
    description:
      "A Commercial Pilot License is the qualification required to work as a professional pilot. We guide students through every step involved in earning a CPL, including eligibility, documentation, DGCA examinations, medical requirements, flying school selection, and career planning.",
  },
  {
    icon: BookOpen,
    title: "DGCA Ground Classes",
    description:
      "Our DGCA Ground Classes are designed to build a deep understanding of aviation subjects rather than focusing only on memorization. Students learn concepts that are valuable not only for examinations but also for real-world flight operations.",
    subjects: [
      "Air Navigation",
      "Air Regulations",
      "Aviation Meteorology",
      "Technical General",
      "Technical Specific",
      "Flight Planning",
      "Performance",
      "Human Factors",
      "Operational Procedures",
    ],
    closing:
      "Interactive sessions, practice tests, and expert faculty ensure students develop confidence before appearing for DGCA examinations.",
  },
  {
    icon: Compass,
    title: "Private Pilot License (PPL)",
    description:
      "Students wishing to experience flying before pursuing a commercial aviation career can begin with a Private Pilot License. We provide guidance regarding eligibility, training requirements, and the progression from PPL to CPL.",
  },
  {
    icon: Radio,
    title: "RTR(A) Preparation",
    description:
      "Professional communication is essential in aviation. Our RTR(A) preparation includes communication techniques, aviation phraseology, mock viva sessions, and examination guidance to help students prepare effectively.",
  },
];

function useInView(threshold = 0.1) {
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

export function WhyChooseUsSection() {
  const header = useInView();
  const grid = useInView(0.05);
  const process = useInView(0.05);

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
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Why Choose Flystar Aviation Academy?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Choosing a pilot training institute is about more than comparing course fees. The
            quality of guidance, teaching methodology, faculty experience, and career support all
            play a significant role in your success.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mt-4">
            Flystar Aviation Academy combines academic excellence with practical aviation
            knowledge to create an environment where students can confidently prepare for both
            DGCA examinations and their future airline careers.
          </p>
        </div>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div
          ref={grid.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group"
              style={{
                opacity: grid.visible ? 1 : 0,
                transform: grid.visible ? "translateY(0)" : "translateY(20px)",
                // Cap stagger so last card doesn't wait too long on mobile
                transition: `opacity 0.5s ease ${Math.min(index * 80, 320)}ms, transform 0.5s ease ${Math.min(index * 80, 320)}ms`,
              }}
            >
              <div className="h-full p-5 md:p-8 rounded-2xl bg-card border border-border
                              hover:border-primary/30 hover:shadow-hover
                              active:scale-[0.98] transition-all duration-300">

                {/* Icon — scale on hover (desktop) / always visible state on mobile */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6
                                transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <reason.icon
                    className="h-6 w-6 md:h-7 md:w-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                  {reason.title.trim()}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Structured Learning Process — full-width panel, same card language */}
        <div
          ref={process.ref}
          style={{
            opacity: process.visible ? 1 : 0,
            transform: process.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 120ms, transform 0.5s ease 120ms",
          }}
          className="mt-4 md:mt-6"
        >
          <div className="rounded-2xl bg-card border border-border p-5 md:p-8">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 md:h-7 md:w-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg md:text-xl font-bold">Structured Learning Process</h3>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 md:mb-6">
              Our systematic approach includes:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-6 md:mb-8">
              {structuredProcess.map((step) => (
                <li key={step} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm md:text-base text-foreground">{step}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              This structured methodology helps students remain confident throughout their
              preparation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Pilot Training in India Section                                     */
/* ================================================================== */

export function PilotTrainingInIndiaSection() {
  const header = useInView();
  const content = useInView(0.05);

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
            India's Aviation Industry
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Pilot Training in India
          </h2>
        </div>

        {/* Content */}
        <div
          ref={content.ref}
          style={{
            opacity: content.visible ? 1 : 0,
            transform: content.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 80ms, transform 0.5s ease 80ms",
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-card border border-border p-5 md:p-8 shadow-card">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              India has become one of the world's fastest-growing aviation markets. With increasing passenger demand, airline expansion, and fleet growth, the need for Commercial Pilot Training and structured Pilot Training in India continues to rise.
            </p>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Choosing the right Pilot Training Institute or Aviation Academy involves more than selecting a Pilot Course. Students comparing a Commercial Pilot Course often need clarity on How to Become a Pilot, Pilot Eligibility, CPL Eligibility, and the overall pathway to Become a Pilot with confidence.
            </p>

            <h3 className="text-lg md:text-xl font-bold mb-4">Students evaluating Commercial Pilot License (CPL) pathways should consider:</h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
              {[
                "Faculty expertise",
                "Commercial Pilot Course structure",
                "DGCA Ground Classes and DGCA Ground School quality",
                "DGCA Coaching for DGCA Exams",
                "DGCA Computer Number assistance",
                "Private Pilot License (PPL) progression",
                "RTR(A) and Flying School guidance",
                "Flight Training planning for an Airline Career",
                "Aviation Career Guidance and transparency in counselling",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm md:text-base text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              At Flystar Aviation Academy, we help students evaluate these factors so they can move from DGCA Ground Classes to Flight Training with a clear plan for a long-term Airline Career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Choosing the Right Flying School Section                             */
/* ================================================================== */

export function ChoosingRightFlyingSchoolSection() {
  const header = useInView();
  const content = useInView(0.05);

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
            Flying School Selection
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Choosing the Right Flying School
          </h2>
        </div>

        {/* Content */}
        <div
          ref={content.ref}
          style={{
            opacity: content.visible ? 1 : 0,
            transform: content.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 80ms, transform 0.5s ease 80ms",
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-card border border-border p-5 md:p-8 shadow-card">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Selecting a flying school is one of the most important decisions in your aviation journey. Different schools may vary in training methods, aircraft availability, instructor experience, weather conditions, and training timelines.
            </p>

            <h3 className="text-lg md:text-xl font-bold mb-4">Our counselling team helps students compare flying schools based on factors such as:</h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
              {[
                "DGCA approval",
                "Fleet quality",
                "Instructor-to-student ratio",
                "Training environment",
                "Flight hour availability",
                "Safety standards",
                "Student support",
                "Overall value",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm md:text-base text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              This personalized guidance helps students choose a training path that suits their objectives and budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Why Students Trust Flystar Section                                  */
/* ================================================================== */

export function WhyStudentsTrustFlystarSection() {
  const header = useInView();
  const content = useInView(0.05);

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
            Trust & Quality
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Why Students Trust Flystar Aviation Academy
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Thousands of aspiring pilots choose Flystar because of our commitment to quality education and student success.
          </p>
        </div>

        {/* Content */}
        <div
          ref={content.ref}
          style={{
            opacity: content.visible ? 1 : 0,
            transform: content.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 80ms, transform 0.5s ease 80ms",
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-card border border-border p-5 md:p-8 shadow-card">
            <h3 className="text-lg md:text-xl font-bold mb-6">Our Approach</h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {[
                "Personalized career counselling",
                "Updated DGCA syllabus",
                "Experienced aviation faculty",
                "Regular assessments",
                "One-on-one mentoring",
                "Practical learning methods",
                "Career-focused training",
                "Ethical and transparent guidance",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm md:text-base text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              We believe every student deserves clear information, expert mentorship, and continuous support throughout their aviation journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Learn Beyond the Classroom Section                                  */
/* ================================================================== */

export function LearnBeyondClassroomSection() {
  const header = useInView();
  const content = useInView(0.05);

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
            Practical Learning
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Learn Beyond the Classroom
          </h2>
        </div>

        {/* Content */}
        <div
          ref={content.ref}
          style={{
            opacity: content.visible ? 1 : 0,
            transform: content.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 80ms, transform 0.5s ease 80ms",
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-card border border-border p-5 md:p-8 shadow-card">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Modern pilot training is not limited to textbooks. At Flystar, students are encouraged to develop the knowledge, discipline, and professional mindset required in today's aviation industry.
            </p>

            <h3 className="text-lg md:text-xl font-bold mb-4">Our learning approach includes:</h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
              {[
                "Scenario-based discussions",
                "Aviation case studies",
                "Flight planning exercises",
                "Navigation problem-solving",
                "Weather analysis",
                "Airline interview preparation",
                "Soft skills and communication development",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm md:text-base text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              This practical approach helps students apply theoretical concepts to real aviation situations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Complete Pilot Training Solutions Under One Roof                     */
/* ================================================================== */

export function CompletePilotTrainingSection() {
  const header = useInView();
  const grid = useInView(0.05);

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
            Your Complete Pathway
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Complete Pilot Training Solutions Under One Roof
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Many students believe pilot training begins only after joining a flying school. In
            reality, a successful aviation career starts much earlier with proper planning,
            understanding DGCA regulations, and building a strong theoretical foundation.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mt-4">
            Flystar provides guidance across every major stage of the pilot journey.
          </p>
        </div>

        {/* Stages */}
        <div ref={grid.ref} className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {trainingStages.map((stage, index) => (
            <div
              key={stage.title}
              style={{
                opacity: grid.visible ? 1 : 0,
                transform: grid.visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${Math.min(index * 80, 320)}ms, transform 0.5s ease ${Math.min(index * 80, 320)}ms`,
              }}
              className="group rounded-2xl bg-card border border-border p-5 md:p-8
                         hover:border-primary/30 hover:shadow-hover transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0
                                transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <stage.icon
                    className="h-6 w-6 md:h-7 md:w-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{stage.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>

                  {stage.subjects && (
                    <>
                      <p className="text-sm md:text-base text-foreground font-medium mt-4 mb-3">
                        Subjects covered include:
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {stage.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="text-xs md:text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {stage.closing && (
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {stage.closing}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}