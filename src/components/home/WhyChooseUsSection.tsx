import { useEffect, useRef, useState } from "react";
import { Award, Users, Plane, Clock, Shield, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Pilot Training",
    description: "Ceremonial events, ground classes, and flight training.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Train with experienced pilots and aviation experts who have thousands of flying hours.",
  },
  {
    icon: Plane,
    title: "Modern Fleet",
    description:
      "Train on well-maintained modern aircraft with the latest avionics and technology.",
  },
  {
    icon: Clock,
    title: "Flexible Programs",
    description:
      "Choose from integrated or modular training programs that suit your schedule and budget.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Industry-leading safety standards and procedures to ensure the highest level of training safety.",
  },
  {
    icon: TrendingUp,
    title: "98% Placement",
    description:
      "Outstanding placement record with top airlines in India and abroad.",
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
            India's Most Trusted Aviation Academy
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            We've been shaping successful aviation careers for over 15 years
            with our commitment to excellence.
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
      </div>
    </section>
  );
}