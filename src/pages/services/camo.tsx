import { useState, useEffect, useRef, useCallback, memo, createContext, useContext } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

// ─── Shared IntersectionObserver ──────────────────────────────────────────────
// One observer for the whole page instead of one per AnimatedSection.

type ObserverCallback = (isIntersecting: boolean) => void;

const observerCallbacks = new Map<Element, ObserverCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
    if (!sharedObserver) {
        sharedObserver = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const cb = observerCallbacks.get(entry.target);
                    if (cb) {
                        cb(entry.isIntersecting);
                        if (entry.isIntersecting) {
                            // Once visible, stop watching this element
                            sharedObserver!.unobserve(entry.target);
                            observerCallbacks.delete(entry.target);
                        }
                    }
                }
            },
            { threshold: 0.12 }
        );
    }
    return sharedObserver;
}

function useInView() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = getSharedObserver();
        observerCallbacks.set(el, setVisible);
        obs.observe(el);
        return () => {
            obs.unobserve(el);
            observerCallbacks.delete(el);
        };
    }, []);

    return { ref, visible };
}

// ─── Animated Section ─────────────────────────────────────────────────────────
// Memoised so it only re-renders when its own visibility changes.

const AnimatedSection = memo(function AnimatedSection({
    children,
    delay = 0,
    style = {},
}: {
    children: React.ReactNode;
    delay?: number;
    style?: React.CSSProperties;
}) {
    const { ref, visible } = useInView();
    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
                willChange: "opacity, transform",
                ...style,
            }}
        >
            {children}
        </div>
    );
});

// ─── Static data (module-level, zero re-creation cost) ───────────────────────

const HERO_LINES = Array.from({ length: 7 }, (_, i) => i); // replaces inline [...Array(7)]

const camoServices = [
    { icon: "📅", title: "Maintenance Planning & Coordination", desc: "We plan and coordinate all maintenance activities on behalf of the owner or operator, ensuring nothing is missed and every event is optimally scheduled." },
    { icon: "✅", title: "Approved Programme Compliance", desc: "All maintenance is verified to be carried out strictly in accordance with the approved aircraft maintenance programme." },
    { icon: "📋", title: "AD & Service Bulletin Management", desc: "Proactive tracking, management, and incorporation of all applicable Airworthiness Directives and Service Bulletins." },
    { icon: "🔗", title: "Regulatory & OEM Liaison", desc: "Ongoing communication with the regulatory authority and OEMs to manage the continuing airworthiness of your aircraft throughout its operation." },
    { icon: "🗂️", title: "Technical Record Keeping", desc: "Precise, audit-ready maintenance records and documentation management maintained to the highest regulatory standards." },
    { icon: "🔧", title: "Modification Status Compliance", desc: "Tracking and verification of all approved modifications to ensure your aircraft's modification status remains current and compliant." },
    { icon: "📄", title: "ARC Renewal & Approvals", desc: "Timely renewal of Airworthiness Review Certificates and management of all relevant regulatory approval submissions." },
    { icon: "⚖️", title: "Weight & Balance Monitoring", desc: "In-depth maintenance monitoring including comprehensive weight and balance management and documentation." },
    { icon: "🏭", title: "MRO Liaison & Compliance Oversight", desc: "Active MRO engagement and monitoring to ensure all third-party maintenance is performed in full compliance with your programme." },
    { icon: "📝", title: "Programme Development & Submission", desc: "Development and maintenance of the aircraft maintenance programme — including all amendments — and management of its submission to the regulator for approval." },
    { icon: "🗓️", title: "Scheduled Activity Tracking", desc: "Systematic tracking and recording of all scheduled maintenance activities to keep your aircraft on programme at all times." },
    { icon: "🛠️", title: "Technical & Documentation Services", desc: "Full technical advisory and documentation support, including customised maintenance programme preparation and maintenance data services." },
    { icon: "🛡️", title: "Warranty & Programme Management", desc: "Management of OEM warranties and aftermarket programme coverages to protect your investment and optimise costs." },
    { icon: "🚨", title: "24/7 AOG Support", desc: "Round-the-clock Aircraft-on-Ground emergency support — 365 days a year — for all aircraft under our management." },
    { icon: "📊", title: "Continuous Reporting", desc: "Regular, structured reporting on the airworthiness status of your aircraft, giving you full visibility at all times." },
];

// Pre-compute clamped delays so nothing runs in render
const SERVICE_DELAYS = camoServices.map((_, i) => Math.min(i * 0.05, 0.5));

const stats = [
    { value: "DGCA", label: "Authorised CAMO", sub: "Certified Continuing Airworthiness body" },
    { value: "24/7", label: "AOG Response", sub: "365 days per year, no exceptions" },
    { value: "100%", label: "Compliance Focus", sub: "Every aircraft, every requirement" },
    { value: "Annual", label: "Airworthiness Reviews", sub: "Certified readiness, every cycle" },
];

const whyPoints = [
    { icon: "🎯", title: "Single Point of Accountability", desc: "One dedicated team managing every airworthiness obligation — eliminating gaps, overlaps, and missed deadlines." },
    { icon: "📡", title: "Proactive Monitoring", desc: "Continuous surveillance of AD status, programme compliance, and regulatory changes keeps you ahead of every requirement." },
    { icon: "🏛️", title: "Regulatory Expertise", desc: "Deep familiarity with DGCA requirements, CAR-M standards, and OEM guidelines means your aircraft is always correctly managed." },
    { icon: "💼", title: "Operator-Focused Approach", desc: "We work around your operations — not the other way. Our processes are designed to minimise disruption to your schedule." },
];

const reviewItems = [
    "Full review of maintenance records and task completion",
    "Verification of all AD and SB incorporation status",
    "Confirmation of ARC validity and timely renewal",
    "Weight and balance documentation check",
    "Modification and repair status compliance review",
    "Submission of renewal paperwork to the regulator",
];

const breadcrumbs = ["Home", "Our Services", "CAMO Services"];

// ─── Shared hover styles (CSS class approach avoids JS style mutations) ────────
// Applied via a <style> tag so hover logic lives in CSS, not JS event handlers.
// This removes all the onMouseEnter/Leave DOM style manipulation from JSX.

const GLOBAL_CSS = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseGold {
    0%, 100% { opacity: 0.8; }
    50%       { opacity: 1; filter: brightness(1.3); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 rgba(255,200,50,0); }
    50%       { box-shadow: 0 0 24px rgba(255,200,50,0.08); }
  }
  @keyframes slowSpin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .camo-btn-primary {
    padding: 15px 40px; border-radius: 10px;
    background: linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%));
    border: 1px solid hsl(145,70%,30%);
    color: #fff; font-size: 14px; font-weight: 700;
    text-decoration: none; display: inline-block;
    box-shadow: 0 4px 24px rgba(0,0,0,0.35);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    letter-spacing: 0.5px;
  }
  .camo-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(0,0,0,0.45);
  }

  .camo-btn-ghost {
    padding: 15px 28px; border-radius: 10px;
    background: transparent; border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.6); font-size: 14px;
    font-weight: 500; text-decoration: none; display: inline-block;
    transition: border-color 0.2s, color 0.2s;
  }
  .camo-btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

  .camo-btn-primary-lg {
    padding: 16px 48px; border-radius: 10px;
    background: linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%));
    border: 1px solid hsl(145,70%,30%);
    color: #fff; font-size: 15px; font-weight: 700;
    text-decoration: none; display: inline-block;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    letter-spacing: 0.5px;
  }
  .camo-btn-primary-lg:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(0,0,0,0.5);
  }

  .camo-btn-ghost-lg {
    padding: 16px 32px; border-radius: 10px;
    background: transparent; border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.6); font-size: 15px;
    font-weight: 500; text-decoration: none; display: inline-block;
    transition: border-color 0.2s, color 0.2s;
  }
  .camo-btn-ghost-lg:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

  .camo-aog-btn {
    padding: 13px 28px; border-radius: 10px;
    background: hsl(145,70%,22%); border: 1px solid hsl(145,70%,32%);
    color: #fff; font-size: 13px; font-weight: 700;
    white-space: nowrap; text-decoration: none; display: inline-block;
    transition: background 0.2s ease, transform 0.2s ease; flex-shrink: 0;
  }
  .camo-aog-btn:hover { background: hsl(145,70%,28%); transform: translateY(-1px); }

  /* Why-point cards: hover via CSS only */
  .why-card {
    display: flex; gap: 16px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 18px 20px;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .why-card:hover {
    border-color: hsl(145,70%,28%);
    background: rgba(30,80,45,0.18);
    transform: translateX(6px);
  }

  /* Review-item rows */
  .review-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 13px 16px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    transition: border-color 0.2s, background 0.2s;
  }
  .review-item:hover {
    border-color: hsl(145,70%,28%);
    background: rgba(30,80,45,0.12);
  }

  /* Service cards — hover managed in CSS, not React state */
  .svc-card {
    background: linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 24px 22px;
    transition: background 0.28s ease, border-color 0.28s ease,
                transform 0.28s ease, box-shadow 0.28s ease;
    position: relative; overflow: hidden; cursor: default;
    will-change: transform;
  }
  .svc-card:hover {
    background: linear-gradient(135deg, rgba(30,80,45,0.45), rgba(10,30,18,0.5));
    border-color: hsl(45,100%,42%);
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 12px 32px rgba(0,0,0,0.3);
  }

  .svc-card-bar {
    position: absolute; top: 0; left: 22px;
    width: 24px; height: 2px;
    background: hsl(145,70%,28%);
    transition: width 0.35s ease, background 0.35s ease;
  }
  .svc-card:hover .svc-card-bar {
    width: 44px;
    background: linear-gradient(to right, hsl(145,70%,38%), hsl(45,100%,55%));
  }

  .svc-card-icon {
    width: 42px; height: 42px; border-radius: 12px;
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 14px;
    transition: background 0.25s, transform 0.25s;
  }
  .svc-card:hover .svc-card-icon {
    background: hsl(145,70%,22%);
    transform: rotate(-5deg) scale(1.1);
  }

  .svc-card-title {
    font-size: 14px; font-weight: 700; margin-bottom: 8px;
    color: rgba(255,255,255,0.88);
    transition: color 0.2s;
  }
  .svc-card:hover .svc-card-title { color: #fff; }

  .svc-card-desc {
    font-size: 12px; color: rgba(255,255,255,0.42);
    line-height: 1.65; transition: color 0.2s;
  }
  .svc-card:hover .svc-card-desc { color: rgba(255,255,255,0.65); }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoldDivider({ label = "FLY SPACE CAMO" }: { label?: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "44px", height: "2px", background: "hsl(45,100%,51%)" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                {label}
            </span>
        </div>
    );
}

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
            <circle cx="8" cy="8" r="8" fill="hsl(145,70%,22%)" fillOpacity="0.25" />
            <path d="M4.5 8L7 10.5L11.5 5.5" stroke="hsl(45,100%,58%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// Service card is fully memoised — no parent state touches it anymore.
const ServiceCard = memo(function ServiceCard({
    svc, index, delay,
}: { svc: typeof camoServices[0]; index: number; delay: number }) {
    return (
        <AnimatedSection delay={delay}>
            <div className="svc-card">
                <div className="svc-card-bar" />
                <div style={{
                    position: "absolute", top: "14px", right: "16px",
                    fontSize: "28px", fontWeight: 800,
                    color: "rgba(255,255,255,0.04)", lineHeight: 1,
                }}>
                    {String(index + 1).padStart(2, "0")}
                </div>
                <div className="svc-card-icon">{svc.icon}</div>
                <div className="svc-card-title">{svc.title}</div>
                <div className="svc-card-desc">{svc.desc}</div>
            </div>
        </AnimatedSection>
    );
});

const WhyCard = memo(function WhyCard({ pt, delay }: { pt: typeof whyPoints[0]; delay: number }) {
    return (
        <AnimatedSection delay={delay}>
            <div className="why-card">
                <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: "hsl(145,70%,22%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", flexShrink: 0,
                }}>
                    {pt.icon}
                </div>
                <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "5px" }}>{pt.title}</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{pt.desc}</div>
                </div>
            </div>
        </AnimatedSection>
    );
});

const ReviewItem = memo(function ReviewItem({ item, delay }: { item: string; delay: number }) {
    return (
        <AnimatedSection delay={delay}>
            <div className="review-item">
                <CheckIcon />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>{item}</span>
            </div>
        </AnimatedSection>
    );
});

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CAMOServices() {
    // Counter animation — RAF-based, avoids rapid setState ticks
    const [count, setCount] = useState(0);
    useEffect(() => {
        const TARGET = 15;
        let current = 0;
        let raf: number;
        let last = performance.now();
        const INTERVAL_MS = 60;

        function tick(now: number) {
            if (now - last >= INTERVAL_MS) {
                last = now;
                current += 1;
                setCount(current);
            }
            if (current < TARGET) raf = requestAnimationFrame(tick);
        }

        const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, 600);
        return () => { clearTimeout(t); cancelAnimationFrame(raf); };
    }, []);

    return (
        <Layout>
            {/* Inject global CSS once */}
            <style>{GLOBAL_CSS}</style>

            <div style={{ fontFamily: "'Poppins', sans-serif", background: "hsl(150,30%,5%)", minHeight: "100vh", color: "#fff" }}>

                {/* ── Hero ── */}
                <div style={{
                    position: "relative", padding: "80px 6% 76px", overflow: "hidden",
                    background: "linear-gradient(135deg, hsl(145,80%,9%) 0%, hsl(145,65%,6%) 55%, hsl(200,55%,8%) 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                        {HERO_LINES.map((i) => (
                            <div key={i} style={{
                                position: "absolute", top: 0, bottom: 0,
                                left: `${6 + i * 14}%`, width: "1px",
                                background: "rgba(255,255,255,0.022)",
                                transform: "skewX(-12deg)",
                            }} />
                        ))}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
                            background: "linear-gradient(to right, transparent, hsl(145,70%,25%), hsl(45,100%,51%), hsl(145,70%,25%), transparent)",
                            animation: "pulseGold 3s ease-in-out infinite",
                        }} />
                        <div style={{ position: "absolute", right: "-6%", top: "-20%", width: "520px", height: "520px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", animation: "slowSpin 40s linear infinite" }} />
                        <div style={{ position: "absolute", right: "4%", top: "8%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.025)", animation: "slowSpin 28s linear infinite reverse" }} />
                    </div>

                    <div style={{ position: "relative", maxWidth: "760px" }}>
                        {/* Breadcrumb */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", flexWrap: "wrap", animation: "fadeDown 0.6s ease forwards", opacity: 0 }}>
                            {breadcrumbs.map((crumb, i) => (
                                <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ fontSize: "12px", color: i === breadcrumbs.length - 1 ? "hsl(45,100%,60%)" : "rgba(255,255,255,0.3)", fontWeight: i === breadcrumbs.length - 1 ? 600 : 400 }}>
                                        {crumb}
                                    </span>
                                    {i < breadcrumbs.length - 1 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>›</span>}
                                </span>
                            ))}
                        </div>

                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                            padding: "5px 16px", borderRadius: "20px",
                            fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
                            textTransform: "uppercase", color: "hsl(45,100%,60%)", marginBottom: "24px",
                            animation: "fadeDown 0.6s ease 0.1s forwards", opacity: 0,
                        }}>
                            🛡️ CAMO — Continuing Airworthiness
                        </div>

                        <h1 style={{
                            fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 800,
                            lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: "12px",
                            animation: "fadeUp 0.7s ease 0.2s forwards", opacity: 0,
                        }}>
                            Flight Ready
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                Anytime. Every Time.
                            </span>
                        </h1>

                        <p style={{
                            fontSize: "13px", fontWeight: 600, letterSpacing: "3px",
                            textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "20px",
                            animation: "fadeUp 0.7s ease 0.3s forwards", opacity: 0,
                        }}>
                            Ensuring you're always certified and cleared to fly
                        </p>

                        <p style={{
                            fontSize: "16px", lineHeight: 1.85,
                            color: "rgba(255,255,255,0.6)", maxWidth: "600px", marginBottom: "38px",
                            animation: "fadeUp 0.7s ease 0.35s forwards", opacity: 0,
                        }}>
                            As a DGCA Authorised Continuing Airworthiness Management Organisation, we relieve you of the technical, regulatory, and legal complexities associated with documentation and allow you to focus on flying while we ensure your aircraft is safe, certified, and ready for flight
                        </p>

                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.45s forwards", opacity: 0 }}>
                            <Link to="/contact" className="camo-btn-primary">Speak With Us →</Link>
                            <Link to="/contact" className="camo-btn-ghost">View All Services</Link>
                        </div>
                    </div>
                </div>

                {/* ── Stats Bar ── */}
                <div style={{ background: "hsl(150,28%,6%)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 6%" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                        {stats.map((s, i) => (
                            <AnimatedSection key={s.value} delay={i * 0.1}>
                                <div style={{
                                    padding: "32px 24px",
                                    borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                    display: "flex", flexDirection: "column", gap: "5px",
                                }}>
                                    <div style={{
                                        fontSize: "26px", fontWeight: 800,
                                        background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,55%))",
                                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                        letterSpacing: "-0.5px", lineHeight: 1.1,
                                    }}>
                                        {s.value}
                                    </div>
                                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{s.label}</div>
                                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{s.sub}</div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>

                {/* ── About CAMO ── */}
                <div style={{ padding: "68px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "60px", alignItems: "center",
                    }}>
                        <AnimatedSection>
                            <GoldDivider label="What Is CAMO" />
                            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "20px" }}>
                                Taking the Complexity Out of Airworthiness
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "18px" }}>
                                Maintaining the continuing airworthiness of your business aircraft involves the meticulous management of increasingly complex technical, regulatory, and legal requirements. Fail to comply with just one directive, fail to renew just one certificate, and your aircraft is grounded.
                            </p>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "24px" }}>
                                Our CAMO specialists can handle the complete airworthiness management process for you, providing complete support for annual airworthiness review, AD incorporation, liaison for maintenance and repair operations, and around-the-clock support for AOG situations, to keep your aircraft in peak condition and certified for flight at all times.
                            </p>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "10px",
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                padding: "12px 18px", borderRadius: "10px",
                            }}>
                                <span style={{ fontSize: "20px" }}>🏅</span>
                                <div>
                                    <div style={{ fontSize: "12px", fontWeight: 700, color: "hsl(45,100%,60%)" }}>DGCA Authorised</div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Certified CAMO for Business Aviation</div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {whyPoints.map((pt, i) => (
                                <WhyCard key={pt.title} pt={pt} delay={i * 0.1} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── CAMO Services Grid ── */}
                <div style={{ padding: "68px 6%", background: "hsl(150,28%,6%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <AnimatedSection>
                            <GoldDivider label="Our Full Scope" />
                            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "12px" }}>
                                What We Manage for You
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "560px", marginBottom: "48px" }}>
                                Our CAMO scope covers every airworthiness obligation from day one — a truly
                                comprehensive service built for business aviation owners and operators.
                            </p>
                        </AnimatedSection>

                        {/* Grid — no React hover state; all hover via CSS classes */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "18px" }}>
                            {camoServices.map((svc, i) => (
                                <ServiceCard key={svc.title} svc={svc} index={i} delay={SERVICE_DELAYS[i]} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── AOG Highlight ── */}
                <AnimatedSection>
                    <div style={{
                        margin: "56px 6%",
                        background: "linear-gradient(135deg, rgba(30,80,45,0.3) 0%, rgba(10,30,18,0.4) 100%)",
                        border: "1px solid hsl(145,70%,25%)",
                        borderLeft: "4px solid hsl(45,100%,51%)",
                        borderRadius: "16px", padding: "32px 36px",
                        display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap",
                        animation: "pulseGlow 3s ease-in-out infinite",
                    }}>
                        <div style={{
                            width: "60px", height: "60px", borderRadius: "16px",
                            background: "hsl(145,70%,22%)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "28px", flexShrink: 0,
                        }}>
                            🚨
                        </div>
                        <div style={{ flex: 1, minWidth: "240px" }}>
                            <div style={{ fontSize: "18px", fontWeight: 800, marginBottom: "6px", color: "#fff" }}>
                                24/7 AOG Support — 365 Days a Year
                            </div>
                            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                                Aircraft-on-Ground situations can't wait. Our team is reachable around the clock,
                                every day of the year, to mobilise rapid technical support and get your aircraft
                                back in the air as quickly as possible.
                            </div>
                        </div>
                        <Link to="/contact" className="camo-aog-btn">Contact AOG Desk →</Link>
                    </div>
                </AnimatedSection>

                {/* ── Annual Airworthiness Reviews ── */}
                <div style={{ padding: "0 6% 68px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "48px", alignItems: "center",
                    }}>
                        <AnimatedSection>
                            <GoldDivider label="Annual Reviews" />
                            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "20px" }}>
                                Airworthiness Reviews That Give You Certainty
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85 }}>
                                Our airworthiness review is a comprehensive and systematic annual review that is well documented. Your aircraft's maintenance status, certification, and compliance are thoroughly reviewed to expedite the renewal of your Airworthiness Review Certificate, which ensures that your aircraft remains airworthy.
                            </p>
                        </AnimatedSection>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {reviewItems.map((item, i) => (
                                <ReviewItem key={item} item={item} delay={i * 0.08} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom CTA ── */}
                <AnimatedSection>
                    <div style={{
                        background: "linear-gradient(135deg, hsl(145,80%,10%) 0%, hsl(145,60%,7%) 100%)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        padding: "60px 6%", textAlign: "center",
                        position: "relative", overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", animation: "slowSpin 50s linear infinite" }} />
                            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "360px", height: "360px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", animation: "slowSpin 35s linear infinite reverse" }} />
                        </div>
                        <div style={{ position: "relative" }}>
                            <div style={{
                                display: "inline-block",
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "20px", padding: "5px 16px",
                                fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
                                textTransform: "uppercase", color: "hsl(45,100%,60%)", marginBottom: "20px",
                            }}>
                                Let's Get Started
                            </div>
                            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: "16px" }}>
                                Keep Your Aircraft Certified
                                <br />
                                <span style={{
                                    background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                }}>
                                    and Ready to Fly — Always
                                </span>
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto 36px" }}>
                                Speak with our CAMO specialists. We'll take on your airworthiness
                                obligations so you never have to worry about compliance again.
                            </p>
                            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                                <Link to="/contact" className="camo-btn-primary-lg">Speak With Us →</Link>
                                <Link to="/contact" className="camo-btn-ghost-lg">View All Services</Link>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

            </div>
        </Layout>
    );
}