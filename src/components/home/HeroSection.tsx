import { useEffect, useRef, useState } from "react";
import { Plane, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-aircraft.jpg";

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "5000+", label: "Trained Pilots" },
  { value: "98%", label: "Placement Rate" },
  { value: "50+", label: "Partner Airlines" },
];

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const t = setTimeout(() => setVisible(true), prefersReduced ? 0 : delay);
    return () => clearTimeout(t);
  }, [delay]);

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)", // reduced from 30px — subtler on small screens
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    },
  };
}

export function HeroSection() {
  const [planeKey, setPlaneKey] = useState(0);

  useEffect(() => {
    // Only run plane animation on non-touch devices to save battery
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const interval = setInterval(() => setPlaneKey((k) => k + 1), 14000);
    return () => clearInterval(interval);
  }, []);

  const badge = useFadeIn(0);
  const heading = useFadeIn(100);
  const para = useFadeIn(200);
  const cta = useFadeIn(300);
  const stats = useFadeIn(500);

  return (
    <section className="relative min-h-[100svh] md:min-h-[90vh] overflow-hidden">
      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Commercial aircraft flying through clouds"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
        />
        {/* Heavier overlay on mobile for legibility over bright sky images */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, hsla(var(--aviation-runway),0.95) 0%, hsla(var(--aviation-runway),0.85) 60%, hsla(var(--aviation-runway),0.6) 100%)," +
              "linear-gradient(to top, hsla(var(--aviation-runway),0.9) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Plane — desktop only, skipped on touch/mobile */}
      <div
        key={planeKey}
        className="absolute top-1/4 z-10 hidden md:block"
        style={{ animation: "flyAcross 8s ease-in-out forwards" }}
        aria-hidden="true"
      >
        <Plane className="h-12 w-12 text-accent drop-shadow-lg" />
      </div>

      {/* Hero content — tighter top padding on mobile to clear the navbar */}
      <div className="container relative z-20 px-4 sm:px-6 pt-24 pb-20 md:pt-32 md:pb-32 min-h-[100svh] md:min-h-[90vh] flex items-center">
        <div className="max-w-3xl w-full">

          {/* Badge */}
          <div
            {...badge}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8 border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-xs md:text-sm font-medium text-white">
              DGCA Training Institute
            </span>
          </div>

          {/* h1 — never animated; scales gracefully across breakpoints */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight">
            Your Key to a{" "}
            <span className="text-accent">Successful Aviation</span>{" "}
            Career
          </h1>

          <div {...para}>
            <p className="text-base md:text-xl text-white/80 mb-8 md:mb-10 max-w-2xl">
              Turn your dreams into reality with the best aviation training
              academy in India. Experienced faculty, state-of-the-art
              infrastructure, and assured placement assistance.
            </p>
          </div>

          {/* CTA buttons — full-width stacked on mobile, inline from sm */}
          <div
            {...cta}
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4"
          >
            <Button
              variant="aviation"
              size="xl"
              className="w-full sm:w-auto justify-center"
              asChild
            >
              <Link to="/pilot-training">
                Begin Pilot Training
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="gold"
              size="xl"
              className="w-full sm:w-auto justify-center"
              asChild
            >
              <Link to="/contact">Discuss with Counsellor</Link>
            </Button>
          </div>

          {/* Stats — 2×2 on mobile, 4-col from md */}
          <div
            {...stats}
            className="mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-white/10
                           transition-transform duration-200 active:scale-95 md:hover:scale-105 md:hover:bg-white/15"
              >
                <div className="text-xl md:text-3xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/70 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>

      <style>{`
        @keyframes flyAcross {
          0%   { transform: translateX(-120px) translateY(0px) rotate(-5deg); opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translateX(calc(50vw - 50px)) translateY(-30px) rotate(0deg); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(calc(150vw)) translateY(-60px) rotate(5deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}