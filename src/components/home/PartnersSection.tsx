import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "Air India", logo: "/assets/air-india-logo.png" },
  { name: "Air India Express", logo: "/assets/Air-india-express-logo.png" },
  { name: "IndiGo", logo: "/assets/indigo.png" },
  { name: "SpiceJet", logo: "/assets/SpiceJet-Logo.webp" },
  { name: "Star Air", logo: "/assets/star-air-logo.webp" },
  { name: "Fly Big", logo: "/assets/flybig_logo.webp" },
  { name: "Jet Airways", logo: "/assets/jet_airways_logo.webp" },
  { name: "Red Bird", logo: "/assets/redbird_logo.webp" },
];

export function PartnersSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  // Replace framer-motion with IntersectionObserver
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
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
    <section className="py-12 md:py-16 bg-muted/30 overflow-hidden">
      <div className="container px-4">
        {/* Heading fade-in */}
        <div
          ref={headingRef}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="text-center mb-8 md:mb-10"
        >
          <h3 className="text-base md:text-xl font-semibold text-muted-foreground">
            Trusted by India's Leading Airlines & Organizations
          </h3>
        </div>
      </div>

      {/* Marquee — full bleed (outside container) so cards reach screen edges */}
      <div
        className="relative w-full"
        // Pause on touch (mobile tap) and mouse hover (desktop)
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        aria-label="Partner airlines"
        role="region"
      >
        {/* Fade masks — hide the hard cut-off at screen edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--muted) / 0.3), transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, hsl(var(--muted) / 0.3), transparent)",
          }}
          aria-hidden="true"
        />

        <div
          className="flex gap-4 md:gap-8"
          style={{
            animation: `marquee 28s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
            // Respect reduced-motion: freeze the strip
            ...(typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? { animation: "none" }
              : {}),
          }}
          aria-hidden="true" // decorative — screen readers don't need the repeated list
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center bg-background rounded-xl px-4 md:px-8 py-3 md:py-4 shadow-sm border border-border/40"
              style={{
                minWidth: "clamp(120px, 30vw, 160px)", // shrinks on narrow screens
                height: "clamp(56px, 12vw, 80px)",     // proportional height
              }}
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="object-contain w-full h-full"
                  style={{ maxHeight: "48px", maxWidth: "120px" }}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="font-bold text-sm md:text-lg text-muted-foreground text-center leading-tight">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Static fallback list for screen readers */}
      <ul className="sr-only">
        {partners.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}