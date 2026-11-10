import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OFFERINGS = [
  { value: "CPL / ATPL", label: "DGCA ground classes" },
  { value: "DGCA", label: "Theory exam preparation" },
  { value: "RTR(A)", label: "Radio telephony preparation" },
  { value: "Dwarka", label: "New Delhi classroom" },
];

const COLLAGE_IMAGES = [
  "/assets/hero-aircraft-1600w.jpg",
  "/crj_100.jpeg",
  "/challenger_604.jpeg",
  "/citation_560_xls.jpeg",
  "/Hawker_750_850_900.jpeg",
  "/king_air_b200.jpeg",
  "/phenom_100.jpeg",
  "/learjet_45.jpeg",
];

export function HeroSection() {
  return (
    <section className="home-hero relative isolate overflow-hidden bg-white text-slate-900">
      <div className="home-hero__surface absolute inset-0" aria-hidden="true" />

      <div className="container relative z-10 mx-auto flex w-full flex-col items-center px-4 pt-10 text-center sm:px-6 md:pt-14">
        <div className="w-full max-w-5xl">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 shadow-sm"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500" />
            <span className="text-xs font-medium text-slate-600 md:text-sm">
              Pilot-training pathway information and DGCA ground classes
            </span>
          </div>

          <h1 className="mx-auto mb-4 max-w-5xl text-3xl font-bold leading-tight tracking-tight text-[#122b4a] sm:text-4xl md:mb-5 md:text-5xl lg:text-6xl">
            Pilot Training in India:{" "}
            <span className="text-[#164b73]">DGCA CPL &amp; ATPL Ground Classes</span>
          </h1>

          <p className="mx-auto mb-6 max-w-4xl text-base leading-relaxed text-slate-600 md:mb-7 md:text-lg">
            Flying Star Aviator is a pilot training institute in India focused on DGCA CPL
            and ATPL ground classes in Dwarka, New Delhi. This guide explains the pilot
            training pathway and DGCA exam preparation; aircraft flying training is a
            separate stage completed through an appropriately approved Flying Training
            Organisation (FTO).
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-start sm:gap-4">
            <Button
              variant="aviation"
              size="xl"
              className="w-full justify-center sm:w-auto"
              asChild
            >
              <Link to="/pilot-training">
                Explore Pilot Training Guides
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="gold"
              size="xl"
              className="w-full justify-center sm:w-auto"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          <div
            className="home-hero__offerings mx-auto mt-7 grid w-full max-w-5xl grid-cols-2 sm:mt-9 sm:flex sm:justify-center"
            role="list"
            aria-label="Training offerings"
          >
            {OFFERINGS.map((stat) => (
              <div className="home-hero__offering" key={stat.label} role="listitem">
                <div className="text-lg font-bold text-[#164b73] md:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-500 md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="home-hero__collage relative mx-auto mt-7 w-full max-w-[1600px] sm:mt-9"
          role="img"
          aria-label="Airplane photographs showing aircraft in flight and at airports"
        >
          <div className="home-hero__track" aria-hidden="true">
            {[0, 1].map((sequence) => (
              <div className="home-hero__sequence" key={sequence}>
                {COLLAGE_IMAGES.map((src) => (
                  <figure className="home-hero__card" key={`${sequence}-${src}`}>
                    <img
                      src={src}
                      alt=""
                      loading={sequence === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .home-hero {
          background:
            radial-gradient(ellipse at 50% 70%, rgba(218, 237, 250, 0.62), transparent 52%),
            #fff;
        }

        .home-hero__surface {
          background:
            radial-gradient(ellipse at 12% 22%, rgba(228, 243, 253, 0.58), transparent 34%),
            radial-gradient(ellipse at 88% 18%, rgba(237, 247, 253, 0.72), transparent 36%);
          pointer-events: none;
        }

        .home-hero__offering {
          min-width: 0;
          padding: 0 1.35rem;
        }

        .home-hero__offering + .home-hero__offering {
          border-left: 1px solid #dbe5ed;
        }

        .home-hero__collage {
          height: clamp(245px, 31vw, 390px);
          isolation: isolate;
          overflow: hidden;
        }

        .home-hero__track {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          width: 200%;
          height: 100%;
          animation: home-hero-scroll 8s linear infinite;
          will-change: transform;
        }

        .home-hero__sequence {
          position: relative;
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
        }

        @keyframes home-hero-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .home-hero__collage::after {
          position: absolute;
          z-index: 20;
          inset: 48% 0 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff 96%);
          content: "";
          pointer-events: none;
        }

        .home-hero__card {
          position: absolute;
          box-sizing: border-box;
          padding: 7px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.92);
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 16px 38px rgba(27, 55, 79, 0.2);
        }

        .home-hero__card img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          object-fit: cover;
        }

        .home-hero__card:nth-child(1) {
          z-index: 2;
          top: 18%;
          left: -5%;
          width: 19%;
          height: 59%;
          transform: rotate(-8deg);
        }

        .home-hero__card:nth-child(2) {
          z-index: 4;
          top: 36%;
          left: 8%;
          width: 19%;
          height: 53%;
          transform: rotate(6deg);
        }

        .home-hero__card:nth-child(3) {
          z-index: 3;
          top: 7%;
          left: 20%;
          width: 20%;
          height: 68%;
          transform: rotate(-5deg);
        }

        .home-hero__card:nth-child(4) {
          z-index: 7;
          top: 22%;
          left: 33%;
          width: 23%;
          height: 70%;
          transform: rotate(5deg);
        }

        .home-hero__card:nth-child(5) {
          z-index: 6;
          top: 4%;
          left: 49%;
          width: 22%;
          height: 69%;
          transform: rotate(-6deg);
        }

        .home-hero__card:nth-child(6) {
          z-index: 5;
          top: 31%;
          left: 66%;
          width: 19%;
          height: 56%;
          transform: rotate(7deg);
        }

        .home-hero__card:nth-child(7) {
          z-index: 3;
          top: 12%;
          left: 78%;
          width: 19%;
          height: 61%;
          transform: rotate(-5deg);
        }

        .home-hero__card:nth-child(8) {
          z-index: 2;
          top: 29%;
          left: 90%;
          width: 18%;
          height: 56%;
          transform: rotate(7deg);
        }

        @media (max-width: 1023px) {
          .home-hero__collage {
            height: 310px;
          }

          .home-hero__card:nth-child(1) { left: -9%; width: 26%; }
          .home-hero__card:nth-child(2) { left: 4%; width: 26%; }
          .home-hero__card:nth-child(3) { left: 17%; width: 27%; }
          .home-hero__card:nth-child(4) { left: 30%; width: 29%; }
          .home-hero__card:nth-child(5) { left: 46%; width: 28%; }
          .home-hero__card:nth-child(6) { left: 63%; width: 26%; }
          .home-hero__card:nth-child(7) { left: 77%; width: 26%; }
          .home-hero__card:nth-child(8) { left: 89%; width: 25%; }
        }

        @media (max-width: 639px) {
          .home-hero__offering {
            padding: 0.65rem 0.3rem;
          }

          .home-hero__offering:nth-child(odd) {
            border-left: 0;
            border-right: 1px solid #dbe5ed;
          }

          .home-hero__offering:nth-child(-n + 2) {
            border-bottom: 1px solid #dbe5ed;
          }

          .home-hero__collage {
            height: 245px;
            margin-right: -1rem;
            margin-left: -1rem;
            width: calc(100% + 2rem);
          }

          .home-hero__card {
            border-radius: 17px;
            padding: 5px;
          }

          .home-hero__card img {
            border-radius: 11px;
          }

          .home-hero__card:nth-child(1) { left: -12%; width: 45%; height: 67%; top: 18%; }
          .home-hero__card:nth-child(2) { left: 10%; width: 45%; height: 63%; top: 31%; }
          .home-hero__card:nth-child(3) { left: 32%; width: 47%; height: 72%; top: 8%; }
          .home-hero__card:nth-child(4) { left: 55%; width: 48%; height: 70%; top: 22%; }
          .home-hero__card:nth-child(5) { left: 79%; width: 45%; height: 64%; top: 11%; }
          .home-hero__card:nth-child(n + 6) { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-hero__track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
