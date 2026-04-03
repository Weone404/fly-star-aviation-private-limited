import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Commercial Pilot, IndiGo Airlines",
    src: "/assets/pilot1.webp",
    quote:
      "fly star Aviator transformed my dream into reality. The training quality and placement support are exceptional. I'm now flying with IndiGo, thanks to their comprehensive CPL program.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "First Officer, Air India",
    src: "/assets/pilot5.webp",
    quote:
      "The instructors here are world-class. They don't just teach you to fly; they prepare you for a successful aviation career. The DGCA exam preparation was incredibly thorough.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Pilot, Vistara",
    src: "/assets/pilot3.webp",
    quote:
      "I tried multiple training schools before joining fly star. The difference in quality is remarkable. Their simulators and practical training gave me confidence from day one.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "CPL Trainee",
    src: "/assets/pilot4.webp",
    quote:
      "Currently in my final phase of training, and I couldn't be happier with my choice. The support system here is amazing, and the fees structure is very reasonable for the quality offered.",
    rating: 5,
  },
];

const StarRow = (
  <div
    className="flex items-center justify-center md:justify-start gap-1 mt-3"
    aria-label="5 out of 5 stars"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 md:w-5 md:h-5 text-accent fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
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

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeaderVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (nextIndex: number, direction: "left" | "right") => {
      if (nextIndex === currentIndex) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        setCurrentIndex(nextIndex);
        return;
      }

      setAnimState(direction === "right" ? "exit-left" : "exit-right");
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCurrentIndex(nextIndex);
        setAnimState("enter");
        timerRef.current = setTimeout(() => setAnimState("idle"), 400);
      }, 300);
    },
    [currentIndex]
  );

  const next = useCallback(() => {
    goTo((currentIndex + 1) % testimonials.length, "right");
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + testimonials.length) % testimonials.length, "left");
  }, [currentIndex, goTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        dx < 0 ? next() : prev();
      }
      touchStartX.current = null;
      touchStartY.current = null;
    },
    [next, prev]
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const t = testimonials[currentIndex];

  const cardStyle: React.CSSProperties = {
    opacity: animState === "exit-left" || animState === "exit-right" ? 0 : 1,
    transform:
      animState === "exit-left"
        ? "translateX(-40px)"
        : animState === "exit-right"
          ? "translateX(40px)"
          : "translateX(0)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 aviation-gradient text-primary-foreground overflow-hidden"
    >
      <div className="container px-4 sm:px-6">

        {/* Header */}
        <div
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            What Our Pilots Say
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base md:text-lg">
            Hear from our graduates who are now flying with top airlines across
            the globe.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Decorative quote — hidden on mobile */}
          <div
            className="absolute -top-8 -left-4 opacity-20 pointer-events-none hidden md:block"
            aria-hidden="true"
          >
            <Quote className="h-24 w-24" />
          </div>

          {/* Card */}
          <div
            style={cardStyle}
            className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">

              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={t.src}
                  alt={t.name}
                  className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover border-4 border-accent"
                  loading="lazy"
                  decoding="async"
                  width={128}
                  height={128}
                />
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <p className="text-base md:text-xl leading-relaxed mb-4 md:mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-lg md:text-xl">{t.name}</h4>
                  <p className="text-accent text-sm md:text-base">{t.role}</p>
                </div>
                {StarRow}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 active:scale-95 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Testimonial from ${testimonial.name}`}
                  onClick={() =>
                    goTo(index, index > currentIndex ? "right" : "left")
                  }
                  className="py-4 flex items-center"
                >
                  <span
                    className={`block h-2.5 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex
                        ? "bg-accent w-6 md:w-8"
                        : "bg-white/40 w-2.5 md:w-3"
                      }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 active:scale-95 flex items-center justify-center transition-all"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Swipe hint — touch devices only */}
          <p className="text-center text-xs text-primary-foreground/50 mt-3 md:hidden">
            Swipe to navigate
          </p>
        </div>
      </div>
    </section>
  );
}