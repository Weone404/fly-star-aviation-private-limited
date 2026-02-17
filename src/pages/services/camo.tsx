import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";

// ─── Animation Hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, visible };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const breadcrumbs = ["Home", "Our Services", "CAMO Services"];

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

function AnimatedSection({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
    const { ref, visible } = useInView();
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
            ...style,
        }}>
            {children}
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CAMOServices() {
    const [hoveredService, setHoveredService] = useState<string | null>(null);
    const [count, setCount] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    // Animated counter for a touch of life in the hero
    useEffect(() => {
        const target = 15;
        let start = 0;
        const step = () => {
            start += 1;
            setCount(start);
            if (start < target) setTimeout(step, 60);
        };
        const t = setTimeout(step, 600);
        return () => clearTimeout(t);
    }, []);

    return (
        <Layout>
            <div style={{ fontFamily: "'Poppins', sans-serif", background: "hsl(150,30%,5%)", minHeight: "100vh", color: "#fff" }}>

                {/* ── Hero ── */}
                <div
                    ref={heroRef}
                    style={{
                        position: "relative",
                        padding: "80px 6% 76px",
                        overflow: "hidden",
                        background: "linear-gradient(135deg, hsl(145,80%,9%) 0%, hsl(145,65%,6%) 55%, hsl(200,55%,8%) 100%)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    {/* Animated background grid */}
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                        {[...Array(7)].map((_, i) => (
                            <div key={i} style={{
                                position: "absolute", top: 0, bottom: 0,
                                left: `${6 + i * 14}%`, width: "1px",
                                background: "rgba(255,255,255,0.022)",
                                transform: "skewX(-12deg)",
                            }} />
                        ))}
                        {/* Pulsing gold bottom line */}
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

                        {/* Eyebrow */}
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
                            As a DGCA-authorised Continuing Airworthiness Management Organisation,
                            we lift the burden of technical, regulatory, and legal documentation
                            from aircraft owners and operators — so you can focus on flying while
                            we ensure your aircraft is always safe, certified, and ready.
                        </p>

                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.45s forwards", opacity: 0 }}>
                            <button
                                style={{
                                    padding: "15px 40px", borderRadius: "10px",
                                    background: "linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%))",
                                    border: "1px solid hsl(145,70%,30%)",
                                    color: "#fff", fontSize: "14px", fontWeight: 700,
                                    cursor: "pointer", boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                                    transition: "all 0.25s ease", letterSpacing: "0.5px",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px rgba(0,0,0,0.45)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
                                }}
                            >
                                Speak With Us →
                            </button>
                            <button
                                style={{
                                    padding: "15px 28px", borderRadius: "10px",
                                    background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                                    color: "rgba(255,255,255,0.6)", fontSize: "14px",
                                    fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
                                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                                }}
                            >
                                View All Services
                            </button>
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
                                Maintaining the continuing airworthiness of a business aircraft requires
                                meticulous management of an ever-growing set of technical, regulatory, and
                                legal obligations. One missed directive, one lapsed certificate, and your
                                aircraft is grounded.
                            </p>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "24px" }}>
                                Our dedicated CAMO team handles the entire airworthiness management
                                lifecycle on your behalf — from annual airworthiness reviews and AD
                                incorporation to MRO liaison and 24/7 AOG support — keeping your aircraft
                                in a peak, certified, flight-ready condition at all times.
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
                                <AnimatedSection key={pt.title} delay={i * 0.1}>
                                    <div style={{
                                        display: "flex", gap: "16px",
                                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: "12px", padding: "18px 20px",
                                        transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                                    }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)";
                                            (e.currentTarget as HTMLDivElement).style.background = "rgba(30,80,45,0.18)";
                                            (e.currentTarget as HTMLDivElement).style.transform = "translateX(6px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                                            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                                            (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
                                        }}
                                    >
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

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "18px" }}>
                            {camoServices.map((svc, i) => {
                                const isHov = hoveredService === svc.title;
                                return (
                                    <AnimatedSection key={svc.title} delay={Math.min(i * 0.05, 0.5)}>
                                        <div
                                            onMouseEnter={() => setHoveredService(svc.title)}
                                            onMouseLeave={() => setHoveredService(null)}
                                            style={{
                                                background: isHov
                                                    ? "linear-gradient(135deg, rgba(30,80,45,0.45), rgba(10,30,18,0.5))"
                                                    : "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                                border: isHov ? "1px solid hsl(45,100%,42%)" : "1px solid rgba(255,255,255,0.08)",
                                                borderRadius: "14px", padding: "24px 22px",
                                                transition: "all 0.28s ease",
                                                transform: isHov ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
                                                position: "relative", overflow: "hidden", cursor: "default",
                                                boxShadow: isHov ? "0 12px 32px rgba(0,0,0,0.3)" : "none",
                                            }}
                                        >
                                            {/* Animated top accent */}
                                            <div style={{
                                                position: "absolute", top: 0, left: "22px",
                                                width: isHov ? "44px" : "24px", height: "2px",
                                                background: isHov
                                                    ? "linear-gradient(to right, hsl(145,70%,38%), hsl(45,100%,55%))"
                                                    : "hsl(145,70%,28%)",
                                                transition: "width 0.35s ease, background 0.35s ease",
                                            }} />

                                            {/* Watermark number */}
                                            <div style={{
                                                position: "absolute", top: "14px", right: "16px",
                                                fontSize: "28px", fontWeight: 800,
                                                color: "rgba(255,255,255,0.04)", lineHeight: 1,
                                            }}>
                                                {String(i + 1).padStart(2, "0")}
                                            </div>

                                            <div style={{
                                                width: "42px", height: "42px", borderRadius: "12px",
                                                background: isHov ? "hsl(145,70%,22%)" : "rgba(255,255,255,0.06)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "18px", marginBottom: "14px",
                                                transition: "background 0.25s, transform 0.25s",
                                                transform: isHov ? "rotate(-5deg) scale(1.1)" : "rotate(0) scale(1)",
                                            }}>
                                                {svc.icon}
                                            </div>

                                            <div style={{
                                                fontSize: "14px", fontWeight: 700, marginBottom: "8px",
                                                color: isHov ? "#fff" : "rgba(255,255,255,0.88)", transition: "color 0.2s",
                                            }}>
                                                {svc.title}
                                            </div>
                                            <div style={{
                                                fontSize: "12px",
                                                color: isHov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.42)",
                                                lineHeight: 1.65, transition: "color 0.2s",
                                            }}>
                                                {svc.desc}
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── AOG Highlight ── */}
                <AnimatedSection>
                    <div style={{
                        margin: "0 6%",
                        marginTop: "56px", marginBottom: "56px",
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
                        <button style={{
                            padding: "13px 28px", borderRadius: "10px",
                            background: "hsl(145,70%,22%)", border: "1px solid hsl(145,70%,32%)",
                            color: "#fff", fontSize: "13px", fontWeight: 700,
                            cursor: "pointer", whiteSpace: "nowrap",
                            transition: "all 0.2s ease", flexShrink: 0,
                        }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "hsl(145,70%,28%)";
                                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "hsl(145,70%,22%)";
                                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                            }}
                        >
                            Contact AOG Desk →
                        </button>
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
                                Our annual airworthiness review process is thorough, structured, and
                                fully documented. Every aspect of your aircraft's maintenance status,
                                certification, and regulatory compliance is examined to ensure your
                                Airworthiness Review Certificate (ARC) is renewed without delay —
                                and your aircraft remains cleared to fly.
                            </p>
                        </AnimatedSection>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {[
                                "Full review of maintenance records and task completion",
                                "Verification of all AD and SB incorporation status",
                                "Confirmation of ARC validity and timely renewal",
                                "Weight and balance documentation check",
                                "Modification and repair status compliance review",
                                "Submission of renewal paperwork to the regulator",
                            ].map((item, i) => (
                                <AnimatedSection key={item} delay={i * 0.08}>
                                    <div style={{
                                        display: "flex", alignItems: "flex-start", gap: "12px",
                                        padding: "13px 16px",
                                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                                        borderRadius: "10px",
                                        transition: "border-color 0.2s, background 0.2s",
                                    }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)";
                                            (e.currentTarget as HTMLDivElement).style.background = "rgba(30,80,45,0.12)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                                            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                                        }}
                                    >
                                        <CheckIcon />
                                        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>{item}</span>
                                    </div>
                                </AnimatedSection>
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
                                <button
                                    style={{
                                        padding: "16px 48px", borderRadius: "10px",
                                        background: "linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%))",
                                        border: "1px solid hsl(145,70%,30%)",
                                        color: "#fff", fontSize: "15px", fontWeight: 700,
                                        cursor: "pointer", letterSpacing: "0.5px",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.4)", transition: "all 0.25s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.5)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
                                    }}
                                >
                                    Speak With Us →
                                </button>
                                <button
                                    style={{
                                        padding: "16px 32px", borderRadius: "10px",
                                        background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                                        color: "rgba(255,255,255,0.6)", fontSize: "15px",
                                        fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
                                        (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                                    }}
                                >
                                    View All Services
                                </button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* ── Global Keyframes ── */}
                <style>{`
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
        `}</style>

            </div>
        </Layout>
    );
}