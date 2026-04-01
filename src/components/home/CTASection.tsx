import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

// Reusable SVG badge icon (no repeated inline paths)
function ShieldIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

const TRUST_BADGES = [
  { icon: "shield", label: "EASA" },
  { icon: "shield", label: "FAA pathway" },
  { icon: "shield", label: "DGCA" },
  {
    icon: "check",
    label: "ISO Certified",
    svg: (
      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    icon: "trend",
    label: "98% Placement Rate",
    svg: (
      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
      </svg>
    ),
  },
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Replace framer-motion with a lightweight IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background blobs: CSS-only, no JS, use will-change hint removed to save memory */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            Ready to Take Off?
          </span>

          {/* h2 with explicit size avoids layout shift */}
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Start Your Aviation Journey Today
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of successful pilots who started their careers with us.
            Get personalized guidance and find the right program for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="aviation" size="xl" asChild>
              <Link to="/contact">
                Apply Now
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            {/* Native <a href="tel:"> avoids JS for phone calls */}
            <Button variant="outline" size="xl" asChild>
              <a href="tel:+919953536199">
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                Call: +91 99535 36199
              </a>
            </Button>
          </div>

          {/* Trust Badges — rendered from data array, no repeated SVG blobs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {TRUST_BADGES.map(({ label, svg }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground">
                {svg ?? <ShieldIcon />}
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}