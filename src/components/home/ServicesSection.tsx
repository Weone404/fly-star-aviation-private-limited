import { useEffect, useRef, useState } from "react";
import { GraduationCap, Plane, Shield, Briefcase, Wrench, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Passresultsslider from "../layout/Passresultsslider";

const services = [
  {
    icon: GraduationCap,
    title: "Pilot Training",
    description: "Complete CPL & PPL training courses with experienced trainers and state-of-the-art aircraft fleet.",
    href: "/become-a-pilot/become-pilot",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Shield,
    title: "DGCA Exams",
    description: "Complete coaching for all DGCA exams with high success rates and personal attention.",
    href: "/dgca",
    color: "from-aviation-sky to-blue-400",
  },
  {
    icon: Briefcase,
    title: "Aviation Placement",
    description: "Support for instructors, NSOP/govt pilots, line training, cargo, and domestic & international airlines.",
    href: "/courses/airline-preparation",
    color: "from-accent to-yellow-400",
  },
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