import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Commercial Pilot, IndiGo Airlines",
    src: "/assets/pilot1.webp",
    quote: "fly star Aviator transformed my dream into reality. The training quality and placement support are exceptional. I'm now flying with IndiGo, thanks to their comprehensive CPL program.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "First Officer, Air India",
    src: "/assets/pilot5.webp",
    quote: "The instructors here are world-class. They don't just teach you to fly; they prepare you for a successful aviation career. The DGCA exam preparation was incredibly thorough.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Pilot, Vistara",
    src: "/assets/pilot3.webp",
    quote: "I tried multiple training schools before joining fly star. The difference in quality is remarkable. Their simulators and practical training gave me confidence from day one.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "CPL Trainee",
    src: "/assets/pilot4.webp",
    quote: "Currently in my final phase of training, and I couldn't be happier with my choice. The support system here is amazing, and the fees structure is very reasonable for the quality offered.",
    rating: 5,
  },
];

// Star row is always rating=5, so render it once as a constant
const StarRow = (
  <div className="flex items-center justify-center md:justify-start gap-1 mt-3" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-5 h-5 text-accent fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState<"idle" | "exit-left" | "exit-right" | "enter">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Header fade-in
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Transition helper — exit then swap then enter
  const goTo = useCallback((nextIndex: number, direction: "left" | "right") => {
    setAnimState(direction === "right" ? "exit-left" : "exit-right");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setAnimState("enter");
      timerRef.current = setTimeout(() => setAnimState("idle"), 400);
    }, 300);
  }, []);

  const next = useCallback(() => {
    goTo((currentIndex + 1) % testimonials.length, "right");
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + testimonials.length) % testimonials.length, "left");
  }, [currentIndex, goTo]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const t = testimonials[currentIndex];

  // CSS transform/opacity values per animation state
  const cardStyle: React.CSSProperties = {
    opacity: animState === "exit-left" || animState === "exit-right" ? 0 : 1,
    transform:
      animState === "exit-left" ? "translateX(-60px)" :
        animState === "exit-right" ? "translateX(60px)" :
          animState === "enter" ? "translateX(0)" : "translateX(0)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };

  return (
    <section ref={sectionRef} className="py-20 aviation-gradient text-primary-foreground overflow-hidden">
      <div className="container">
        {/* Header */}
        <div
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Pilots Say</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Hear from our graduates who are now flying with top airlines across the globe.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Decorative quote icon */}
          <div className="absolute -top-8 -left-4 opacity-20 pointer-events-none" aria-hidden="true">
            <Quote className="h-24 w-24" />
          </div>

          {/* Card — CSS transition replaces AnimatePresence entirely */}
          <div style={cardStyle} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={t.src}
                  alt={t.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-accent"
                  loading="lazy"
                  decoding="async"
                  width={128}
                  height={128}
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg md:text-xl leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-xl">{t.name}</h4>
                  <p className="text-accent">{t.role}</p>
                </div>
                {StarRow}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, index) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Testimonial from ${t.name}`}
                  onClick={() => goTo(index, index > currentIndex ? "right" : "left")}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-accent w-8" : "bg-white/40 w-3"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}