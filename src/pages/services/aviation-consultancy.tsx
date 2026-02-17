import { useState } from "react";
import { Layout } from "@/components/layout/Layout";

// ─── Data ────────────────────────────────────────────────────────────────────

const deliverables = [
    {
        icon: "🔬",
        title: "Industry Research & Analysis",
        desc: "Deep-dive market intelligence and competitive landscape analysis tailored to your aviation needs.",
    },
    {
        icon: "📋",
        title: "User Needs Analysis",
        desc: "Requirements specification and mission profile definition to match the right solution to your operations.",
    },
    {
        icon: "✈️",
        title: "Aircraft Type Selection",
        desc: "Comparative performance analysis across aircraft categories to identify the optimal match.",
    },
    {
        icon: "🤝",
        title: "OEM Liaison & RFP Management",
        desc: "Direct manufacturer engagement and end-to-end Request for Proposal coordination.",
    },
    {
        icon: "📜",
        title: "Regulatory Advice & Compliance",
        desc: "DGCA licensing guidance and NSOP regulatory compliance support across all aviation categories.",
    },
    {
        icon: "🛃",
        title: "Import & Registration Scope",
        desc: "Comprehensive scope of work definition for aircraft import, title transfer, and registration.",
    },
    {
        icon: "📊",
        title: "Financial Analysis & Modelling",
        desc: "Cost-benefit modelling, acquisition financing, and long-term operational cost projections.",
    },
];

const whyPoints = [
    {
        stat: "NSOP",
        label: "Certified Operator",
        desc: "Regulatory expertise from an active DGCA-certified operator",
    },
    {
        stat: "360°",
        label: "Full-Spectrum Advisory",
        desc: "From market research to aircraft induction and beyond",
    },
    {
        stat: "India",
        label: "Local Market Mastery",
        desc: "Unmatched knowledge of India's unique aviation environment",
    },
    {
        stat: "OEM",
        label: "Manufacturer Access",
        desc: "Direct relationships with global aircraft manufacturers",
    },
];

const breadcrumbs = ["Home", "Our Services", "Aviation Consultancy"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function GoldDivider({ label = "JetSetGo Advisory" }: { label?: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "44px", height: "2px", background: "hsl(45,100%,51%)" }} />
            <span style={{
                color: "rgba(255,255,255,0.3)", fontSize: "11px",
                letterSpacing: "2.5px", textTransform: "uppercase",
            }}>
                {label}
            </span>
        </div>
    );
}

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
            <circle cx="8" cy="8" r="8" fill="hsl(145,70%,22%)" fillOpacity="0.25" />
            <path d="M4.5 8L7 10.5L11.5 5.5" stroke="hsl(45,100%,58%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AviationConsultancy() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <Layout>
            <div style={{
                fontFamily: "'Poppins', sans-serif",
                background: "hsl(150,30%,5%)",
                minHeight: "100vh",
                color: "#fff",
            }}>

                {/* ── Hero ── */}
                <div style={{
                    position: "relative",
                    padding: "80px 6% 76px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, hsl(145,80%,9%) 0%, hsl(145,65%,6%) 55%, hsl(200,55%,8%) 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                    {/* Decorative elements */}
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                        {[...Array(7)].map((_, i) => (
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
                        }} />
                        <div style={{
                            position: "absolute", right: "-6%", top: "-25%",
                            width: "480px", height: "480px", borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.035)",
                        }} />
                        <div style={{
                            position: "absolute", right: "2%", top: "-5%",
                            width: "300px", height: "300px", borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.025)",
                        }} />
                    </div>

                    <div style={{ position: "relative", maxWidth: "760px" }}>
                        {/* Breadcrumb */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            marginBottom: "28px", flexWrap: "wrap",
                        }}>
                            {breadcrumbs.map((crumb, i) => (
                                <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{
                                        fontSize: "12px",
                                        color: i === breadcrumbs.length - 1 ? "hsl(45,100%,60%)" : "rgba(255,255,255,0.3)",
                                        fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
                                        cursor: i < breadcrumbs.length - 1 ? "pointer" : "default",
                                    }}>
                                        {crumb}
                                    </span>
                                    {i < breadcrumbs.length - 1 && (
                                        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>›</span>
                                    )}
                                </span>
                            ))}
                        </div>

                        {/* Eyebrow */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            padding: "5px 16px", borderRadius: "20px",
                            fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
                            textTransform: "uppercase", color: "hsl(45,100%,60%)",
                            marginBottom: "24px",
                        }}>
                            ✈ Aviation Consultancy
                        </div>

                        <h1 style={{
                            fontSize: "clamp(32px, 5.5vw, 62px)",
                            fontWeight: 800, lineHeight: 1.05,
                            letterSpacing: "-1.5px", marginBottom: "12px",
                        }}>
                            Your Trusted Aviation
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                Consultation Partner
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p style={{
                            fontSize: "13px", fontWeight: 600, letterSpacing: "3px",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.3)",
                            marginBottom: "20px",
                        }}>
                            Taking you the extra mile
                        </p>

                        <p style={{
                            fontSize: "16px", lineHeight: 1.85,
                            color: "rgba(255,255,255,0.6)", maxWidth: "620px", marginBottom: "38px",
                        }}>
                            Private aviation offers significant benefits in time-saving and convenience
                            to both corporations and individuals. Owning and operating a private aircraft
                            is a complex business — our team provides the expert counsel to get it right.
                        </p>

                        {/* CTAs */}
                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                            <button
                                style={{
                                    padding: "15px 40px", borderRadius: "10px",
                                    background: "linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%))",
                                    border: "1px solid hsl(145,70%,30%)",
                                    color: "#fff", fontSize: "14px", fontWeight: 700,
                                    letterSpacing: "0.5px", cursor: "pointer",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                                    transition: "all 0.25s ease",
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
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    color: "rgba(255,255,255,0.6)", fontSize: "14px",
                                    fontWeight: 500, cursor: "pointer",
                                    transition: "all 0.2s",
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
                                Our Services
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Why JetSetGo stats ── */}
                <div style={{
                    background: "hsl(150,28%,6%)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    padding: "0 6%",
                }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    }}>
                        {whyPoints.map((pt, i) => (
                            <div key={pt.stat} style={{
                                padding: "32px 24px",
                                borderRight: i < whyPoints.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                display: "flex", flexDirection: "column", gap: "6px",
                            }}>
                                <div style={{
                                    fontSize: "28px", fontWeight: 800,
                                    background: "linear-gradient(90deg, hsl(145,60%,45%), hsl(45,100%,55%))",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                    letterSpacing: "-1px",
                                }}>
                                    {pt.stat}
                                </div>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
                                    {pt.label}
                                </div>
                                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                                    {pt.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── About the Advisory ── */}
                <div style={{
                    padding: "68px 6%",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "60px",
                        alignItems: "center",
                    }}>
                        {/* Left text */}
                        <div>
                            <GoldDivider label="Our Expertise" />
                            <h2 style={{
                                fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800,
                                letterSpacing: "-0.8px", marginBottom: "20px",
                            }}>
                                Deep Experience in Non-Scheduled On-Demand Aviation
                            </h2>
                            <p style={{
                                fontSize: "15px", color: "rgba(255,255,255,0.6)",
                                lineHeight: 1.85, marginBottom: "20px",
                            }}>
                                The JetSetGo team has deep and broad experience in the particular demands
                                and complexities of non-scheduled on-demand aviation. As a certified NSOP
                                operator we understand the regulatory and licensing requirements of the DGCA,
                                and the unique aviation environment in India.
                            </p>
                            <p style={{
                                fontSize: "15px", color: "rgba(255,255,255,0.6)",
                                lineHeight: 1.85,
                            }}>
                                Our team is available to advise corporations and individuals wishing to
                                explore all options available for a private aviation solution to their
                                travel needs.
                            </p>
                        </div>

                        {/* Right: highlight cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {[
                                {
                                    icon: "🏛️",
                                    title: "DGCA Regulatory Expertise",
                                    desc: "First-hand knowledge of India's civil aviation regulatory framework and compliance requirements.",
                                },
                                {
                                    icon: "🌐",
                                    title: "Corporate & Individual Advisory",
                                    desc: "Tailored counsel for both enterprise-level fleet decisions and individual ownership queries.",
                                },
                                {
                                    icon: "🔍",
                                    title: "Research-Backed Decisions",
                                    desc: "Every recommendation is supported by thorough research, analysis, and financial modelling.",
                                },
                            ].map((item) => (
                                <div key={item.title} style={{
                                    display: "flex", gap: "16px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: "12px", padding: "18px 20px",
                                    transition: "border-color 0.2s, background 0.2s",
                                }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)";
                                        (e.currentTarget as HTMLDivElement).style.background = "rgba(30,80,45,0.18)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                                        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                                    }}
                                >
                                    <div style={{
                                        width: "42px", height: "42px", borderRadius: "12px",
                                        background: "hsl(145,70%,22%)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "18px", flexShrink: 0,
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "5px" }}>
                                            {item.title}
                                        </div>
                                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                                            {item.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Our Deliverables ── */}
                <div style={{
                    padding: "68px 6% 80px",
                    background: "hsl(150,28%,6%)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider label="What We Deliver" />
                        <h2 style={{
                            fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800,
                            letterSpacing: "-0.8px", marginBottom: "12px",
                        }}>
                            Our Deliverables
                        </h2>
                        <p style={{
                            fontSize: "15px", color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.75, maxWidth: "540px", marginBottom: "48px",
                        }}>
                            Every engagement is customised to your specific situation, from a single
                            advisory session to a full end-to-end acquisition consultation.
                        </p>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "20px",
                        }}>
                            {deliverables.map((item, i) => {
                                const isHov = hoveredCard === item.title;
                                return (
                                    <div
                                        key={item.title}
                                        onMouseEnter={() => setHoveredCard(item.title)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            background: isHov
                                                ? "linear-gradient(135deg, rgba(30,80,45,0.45), rgba(10,30,18,0.5))"
                                                : "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                            border: isHov
                                                ? "1px solid hsl(45,100%,42%)"
                                                : "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "16px",
                                            padding: "28px 26px",
                                            cursor: "default",
                                            transition: "all 0.28s ease",
                                            transform: isHov ? "translateY(-4px)" : "translateY(0)",
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {/* Top accent line */}
                                        <div style={{
                                            position: "absolute", top: 0, left: "26px",
                                            width: isHov ? "44px" : "28px", height: "2px",
                                            background: isHov
                                                ? "linear-gradient(to right, hsl(145,70%,35%), hsl(45,100%,55%))"
                                                : "hsl(145,70%,28%)",
                                            transition: "width 0.3s, background 0.3s",
                                        }} />

                                        {/* Step number */}
                                        <div style={{
                                            position: "absolute", top: "20px", right: "22px",
                                            fontSize: "28px", fontWeight: 800,
                                            color: "rgba(255,255,255,0.04)",
                                            letterSpacing: "-1px", lineHeight: 1,
                                        }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </div>

                                        <div style={{
                                            width: "46px", height: "46px", borderRadius: "13px",
                                            background: isHov ? "hsl(145,70%,22%)" : "rgba(255,255,255,0.06)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "20px", marginBottom: "18px",
                                            transition: "background 0.25s",
                                        }}>
                                            {item.icon}
                                        </div>

                                        <div style={{
                                            fontSize: "14px", fontWeight: 700,
                                            marginBottom: "10px", lineHeight: 1.3,
                                            color: isHov ? "#fff" : "rgba(255,255,255,0.88)",
                                            transition: "color 0.2s",
                                        }}>
                                            {item.title}
                                        </div>
                                        <div style={{
                                            fontSize: "13px",
                                            color: isHov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.45)",
                                            lineHeight: 1.65,
                                            transition: "color 0.2s",
                                        }}>
                                            {item.desc}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Who We Serve ── */}
                <div style={{ padding: "64px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider label="Who We Serve" />
                        <h2 style={{
                            fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800,
                            letterSpacing: "-0.8px", marginBottom: "40px",
                        }}>
                            Advisory for Corporations &amp; Individuals
                        </h2>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "20px",
                        }}>
                            {[
                                {
                                    icon: "🏢",
                                    title: "Corporations",
                                    points: [
                                        "Fleet acquisition strategy & planning",
                                        "Cost-benefit analysis vs charter",
                                        "OEM RFP management",
                                        "DGCA regulatory compliance",
                                        "Financial modelling & capex planning",
                                    ],
                                },
                                {
                                    icon: "👤",
                                    title: "Individual Owners",
                                    points: [
                                        "First-time ownership advisory",
                                        "Aircraft type & model selection",
                                        "Import & registration guidance",
                                        "Crew requirements planning",
                                        "Pre-purchase inspection support",
                                    ],
                                },
                                {
                                    icon: "🚀",
                                    title: "Startups & Operators",
                                    points: [
                                        "NSOP licensing & setup advisory",
                                        "Business model analysis",
                                        "Route & market feasibility",
                                        "Regulatory framework navigation",
                                        "Operational structure design",
                                    ],
                                },
                            ].map((segment) => (
                                <div key={segment.title} style={{
                                    background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "16px", padding: "30px 26px",
                                    position: "relative", overflow: "hidden",
                                    transition: "border-color 0.25s, transform 0.25s",
                                }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)";
                                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                    }}
                                >
                                    <div style={{
                                        position: "absolute", top: 0, left: "26px",
                                        width: "32px", height: "2px",
                                        background: "linear-gradient(to right, hsl(145,70%,35%), hsl(45,100%,51%))",
                                    }} />
                                    <div style={{
                                        fontSize: "28px", marginBottom: "14px",
                                    }}>
                                        {segment.icon}
                                    </div>
                                    <div style={{
                                        fontSize: "16px", fontWeight: 700, marginBottom: "18px",
                                        color: "hsl(45,100%,62%)",
                                    }}>
                                        {segment.title}
                                    </div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
                                        {segment.points.map((pt) => (
                                            <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                                <CheckIcon />
                                                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
                                                    {pt}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom CTA ── */}
                <div style={{
                    background: "linear-gradient(135deg, hsl(145,80%,10%) 0%, hsl(145,60%,7%) 100%)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    padding: "60px 6%",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                        <div style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "600px", height: "600px", borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.03)",
                        }} />
                        <div style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "400px", height: "400px", borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.04)",
                        }} />
                    </div>
                    <div style={{ position: "relative" }}>
                        <div style={{
                            display: "inline-block",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "20px",
                            padding: "5px 16px",
                            fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
                            textTransform: "uppercase", color: "hsl(45,100%,60%)",
                            marginBottom: "20px",
                        }}>
                            Start Your Journey
                        </div>
                        <h2 style={{
                            fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800,
                            letterSpacing: "-1px", marginBottom: "16px",
                        }}>
                            Let's Chart the Right Course
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                for Your Aviation Needs
                            </span>
                        </h2>
                        <p style={{
                            fontSize: "15px", color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.75, maxWidth: "480px", margin: "0 auto 36px",
                        }}>
                            Our expert team is ready to guide you through every decision —
                            from your very first question to full aircraft induction.
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <button
                                style={{
                                    padding: "16px 48px", borderRadius: "10px",
                                    background: "linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%))",
                                    border: "1px solid hsl(145,70%,30%)",
                                    color: "#fff", fontSize: "15px", fontWeight: 700,
                                    letterSpacing: "0.5px", cursor: "pointer",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                                    transition: "all 0.25s ease",
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
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    color: "rgba(255,255,255,0.6)", fontSize: "15px",
                                    fontWeight: 500, cursor: "pointer",
                                    transition: "all 0.2s",
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

            </div>
        </Layout>
    );
}