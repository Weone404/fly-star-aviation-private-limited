import { useState } from "react";
import { Layout } from "@/components/layout/Layout";

// ─── Data ────────────────────────────────────────────────────────────────────

const coreValues = [
    {
        icon: "⚙️",
        title: "Precision Workmanship",
        desc: "Every maintenance task is executed to exact OEM standards by our certified engineering team.",
    },
    {
        icon: "🕐",
        title: "On-Time Delivery",
        desc: "We respect your operational schedule — our processes are engineered to minimize turnaround time.",
    },
    {
        icon: "🔍",
        title: "Transparent Processes",
        desc: "Full visibility into every stage of your maintenance event, from induction to return-to-service.",
    },
    {
        icon: "📋",
        title: "Regulatory Compliance",
        desc: "All work is performed in strict accordance with DGCA requirements and international aviation standards.",
    },
];

const mroServices = [
    {
        icon: "🔧",
        title: "Scheduled Maintenance",
        desc: "Routine inspections and phase checks carried out as per manufacturer maintenance schedules.",
        tag: "Line Maintenance",
    },
    {
        icon: "🛠️",
        title: "Unscheduled Repairs",
        desc: "Rapid-response technical support and component repair to address defects and return aircraft to service.",
        tag: "Base Maintenance",
    },
    {
        icon: "🔬",
        title: "Component Overhaul",
        desc: "Full overhaul of rotorcraft components with controlled workshop conditions and quality assurance.",
        tag: "Component Services",
    },
    {
        icon: "🔩",
        title: "Engine Services",
        desc: "Engine health monitoring, borescope inspections, and power section assessments by our specialists.",
        tag: "Engine Support",
    },
    {
        icon: "🛡️",
        title: "Airworthiness Compliance",
        desc: "Airworthiness Directive tracking, Service Bulletin incorporation, and DGCA documentation management.",
        tag: "Compliance",
    },
    {
        icon: "📦",
        title: "Parts & Logistics",
        desc: "Genuine OEM spares sourcing, controlled parts storage, and expedited logistics to minimise AOG time.",
        tag: "Parts Support",
    },
];

const stats = [
    { value: "20+", label: "Years of Excellence", sub: "India's most experienced rotorcraft MRO" },
    { value: "CAR 145", label: "Approved Organisation", sub: "DGCA-certified maintenance authority" },
    { value: "100%", label: "Flight-Ready Focus", sub: "Every aircraft, every mission, every time" },
    { value: "AOG", label: "Rapid Response", sub: "Aircraft-on-ground support around the clock" },
];

const commitments = [
    "Consistent, repeatable workmanship across every maintenance event",
    "Timely aircraft return-to-service without compromising quality",
    "Full transparency throughout every inspection and repair",
    "Strict DGCA compliance and international airworthiness standards",
    "Cost-optimised solutions that protect your operational budget",
    "Dedicated engineering team with deep rotorcraft expertise",
];

const breadcrumbs = ["Home", "Our Services", "MRO Services"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function GoldDivider({ label = "FLY SPACE MRO" }: { label?: string }) {
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

function CheckIcon({ active = false }: { active?: boolean }) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
            <circle cx="8" cy="8" r="8" fill="hsl(145,70%,22%)" fillOpacity={active ? 0.35 : 0.2} />
            <path d="M4.5 8L7 10.5L11.5 5.5"
                stroke={active ? "hsl(45,100%,65%)" : "hsl(45,100%,55%)"}
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MROServices() {
    const [hoveredService, setHoveredService] = useState<string | null>(null);

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
                    {/* Decorative background */}
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
                            position: "absolute", right: "-6%", top: "-20%",
                            width: "500px", height: "500px", borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.03)",
                        }} />
                        <div style={{
                            position: "absolute", right: "4%", top: "5%",
                            width: "280px", height: "280px", borderRadius: "50%",
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
                            🔧 MRO — Maintenance, Repair &amp; Overhaul
                        </div>

                        <h1 style={{
                            fontSize: "clamp(32px, 5.5vw, 62px)",
                            fontWeight: 800, lineHeight: 1.05,
                            letterSpacing: "-1.5px", marginBottom: "16px",
                        }}>
                            Keeping Your Aircraft
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                Mission Ready, Always
                            </span>
                        </h1>

                        <p style={{
                            fontSize: "16px", lineHeight: 1.85,
                            color: "rgba(255,255,255,0.6)", maxWidth: "600px", marginBottom: "38px",
                        }}>
                            We deliver end-to-end MRO solutions engineered to maintain airworthiness,
                            maximise aircraft reliability, and keep your operations running without
                            interruption — backed by over two decades of rotorcraft engineering expertise
                            and our own CAR 145 certification.
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
                                Request MRO Support →
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
                                View Capabilities
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Stats Bar ── */}
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
                        {stats.map((s, i) => (
                            <div key={s.value} style={{
                                padding: "32px 24px",
                                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                display: "flex", flexDirection: "column", gap: "5px",
                            }}>
                                <div style={{
                                    fontSize: "26px", fontWeight: 800,
                                    background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,55%))",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                    letterSpacing: "-1px", lineHeight: 1.1,
                                }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{s.label}</div>
                                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── About Our MRO ── */}
                <div style={{ padding: "68px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "60px", alignItems: "center",
                    }}>
                        <div>
                            <GoldDivider label="Who We Are" />
                            <h2 style={{
                                fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800,
                                letterSpacing: "-0.8px", marginBottom: "20px",
                            }}>
                                India's Most Trusted Rotorcraft Maintenance Partner
                            </h2>
                            <p style={{
                                fontSize: "15px", color: "rgba(255,255,255,0.6)",
                                lineHeight: 1.85, marginBottom: "18px",
                            }}>
                                With over 20 years of hands-on engineering experience, we stand among India's
                                oldest and most respected rotorcraft maintenance organisations. Our CAR 145
                                approval is a mark of technical excellence, regulatory discipline, and an
                                unwavering commitment to airworthiness.
                            </p>
                            <p style={{
                                fontSize: "15px", color: "rgba(255,255,255,0.6)",
                                lineHeight: 1.85,
                            }}>
                                Our engineering team works to precise, cost-optimised standards — reducing
                                downtime and keeping your aircraft ready for every operation, every single day.
                            </p>
                        </div>

                        {/* Right: outcome cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {[
                                {
                                    icon: "🚁",
                                    title: "Enhanced Aircraft Reliability",
                                    desc: "Proactive maintenance strategies that catch issues before they become operational problems.",
                                },
                                {
                                    icon: "⏱️",
                                    title: "Minimised Operational Downtime",
                                    desc: "Streamlined workflows and rapid parts sourcing to get your aircraft back in the air fast.",
                                },
                                {
                                    icon: "✅",
                                    title: "Strict Aviation Safety Standards",
                                    desc: "Zero compromise on safety — every task is verified, documented, and compliant.",
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
                                        width: "44px", height: "44px", borderRadius: "12px",
                                        background: "hsl(145,70%,22%)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "20px", flexShrink: 0,
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "5px" }}>{item.title}</div>
                                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── MRO Services Grid ── */}
                <div style={{
                    padding: "68px 6%",
                    background: "hsl(150,28%,6%)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider label="Our Capabilities" />
                        <h2 style={{
                            fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800,
                            letterSpacing: "-0.8px", marginBottom: "12px",
                        }}>
                            Comprehensive MRO Services
                        </h2>
                        <p style={{
                            fontSize: "15px", color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.75, maxWidth: "540px", marginBottom: "48px",
                        }}>
                            From routine line checks to complex base maintenance and component overhaul,
                            our full-spectrum capabilities cover every aspect of aircraft sustainment.
                        </p>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "20px",
                        }}>
                            {mroServices.map((svc, i) => {
                                const isHov = hoveredService === svc.title;
                                return (
                                    <div
                                        key={svc.title}
                                        onMouseEnter={() => setHoveredService(svc.title)}
                                        onMouseLeave={() => setHoveredService(null)}
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
                                            position: "relative", overflow: "hidden",
                                        }}
                                    >
                                        {/* Top accent */}
                                        <div style={{
                                            position: "absolute", top: 0, left: "26px",
                                            width: isHov ? "46px" : "28px", height: "2px",
                                            background: isHov
                                                ? "linear-gradient(to right, hsl(145,70%,38%), hsl(45,100%,55%))"
                                                : "hsl(145,70%,28%)",
                                            transition: "width 0.3s, background 0.3s",
                                        }} />

                                        {/* Step number watermark */}
                                        <div style={{
                                            position: "absolute", top: "18px", right: "20px",
                                            fontSize: "30px", fontWeight: 800,
                                            color: "rgba(255,255,255,0.04)",
                                            lineHeight: 1, letterSpacing: "-1px",
                                        }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </div>

                                        {/* Category tag */}
                                        <div style={{
                                            display: "inline-flex",
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            padding: "3px 10px", borderRadius: "20px",
                                            fontSize: "10px", fontWeight: 600, letterSpacing: "1px",
                                            textTransform: "uppercase", color: "hsl(45,100%,55%)",
                                            marginBottom: "16px",
                                        }}>
                                            {svc.tag}
                                        </div>

                                        <div style={{
                                            width: "46px", height: "46px", borderRadius: "13px",
                                            background: isHov ? "hsl(145,70%,22%)" : "rgba(255,255,255,0.06)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "20px", marginBottom: "16px",
                                            transition: "background 0.25s",
                                        }}>
                                            {svc.icon}
                                        </div>

                                        <div style={{
                                            fontSize: "15px", fontWeight: 700, marginBottom: "10px",
                                            color: isHov ? "#fff" : "rgba(255,255,255,0.88)",
                                            transition: "color 0.2s",
                                        }}>
                                            {svc.title}
                                        </div>
                                        <div style={{
                                            fontSize: "13px",
                                            color: isHov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.45)",
                                            lineHeight: 1.65, transition: "color 0.2s",
                                        }}>
                                            {svc.desc}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Our Commitment ── */}
                <div style={{ padding: "68px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "60px", alignItems: "start",
                    }}>
                        <div>
                            <GoldDivider label="Our Promise" />
                            <h2 style={{
                                fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800,
                                letterSpacing: "-0.8px", marginBottom: "20px",
                            }}>
                                Our Commitment to Excellence
                            </h2>
                            <p style={{
                                fontSize: "15px", color: "rgba(255,255,255,0.6)",
                                lineHeight: 1.85, marginBottom: "24px",
                            }}>
                                We follow global aviation best practices across every maintenance event.
                                With us as your maintenance partner, your aircraft is always in expert
                                hands — ready to perform, ready to protect, and ready to fly.
                            </p>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "10px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                padding: "12px 18px", borderRadius: "10px",
                            }}>
                                <span style={{ fontSize: "20px" }}>🏅</span>
                                <div>
                                    <div style={{ fontSize: "12px", fontWeight: 700, color: "hsl(45,100%,60%)" }}>
                                        CAR 145 Approved
                                    </div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                                        DGCA-certified maintenance organisation
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {commitments.map((item, i) => (
                                <div
                                    key={item}
                                    style={{
                                        display: "flex", alignItems: "flex-start", gap: "12px",
                                        padding: "14px 18px",
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        borderRadius: "10px",
                                        animation: "fadeInUp 0.4s ease forwards",
                                        opacity: 0,
                                        animationDelay: `${i * 0.07}s`,
                                    }}
                                >
                                    <CheckIcon />
                                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Core Values ── */}
                <div style={{
                    padding: "64px 6%",
                    background: "hsl(150,28%,6%)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider label="How We Work" />
                        <h2 style={{
                            fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800,
                            letterSpacing: "-0.8px", marginBottom: "40px",
                        }}>
                            The Principles Behind Every Task
                        </h2>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: "18px",
                        }}>
                            {coreValues.map((val) => (
                                <div key={val.title} style={{
                                    background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "14px", padding: "26px",
                                    transition: "border-color 0.25s, transform 0.25s",
                                    display: "flex", flexDirection: "column", gap: "12px",
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
                                        width: "46px", height: "46px", borderRadius: "13px",
                                        background: "hsl(145,70%,22%)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "20px",
                                    }}>
                                        {val.icon}
                                    </div>
                                    <div style={{ fontSize: "14px", fontWeight: 700 }}>{val.title}</div>
                                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{val.desc}</div>
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
                            width: "380px", height: "380px", borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.035)",
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
                            Ready to Partner?
                        </div>
                        <h2 style={{
                            fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800,
                            letterSpacing: "-1px", marginBottom: "16px",
                        }}>
                            Your Aircraft Deserves
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                Expert Hands Every Time
                            </span>
                        </h2>
                        <p style={{
                            fontSize: "15px", color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.75, maxWidth: "460px", margin: "0 auto 36px",
                        }}>
                            Talk to our maintenance team today. We'll assess your requirements and
                            provide a tailored MRO plan to keep your operations flying.
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <button
                                style={{
                                    padding: "16px 48px", borderRadius: "10px",
                                    background: "linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%))",
                                    border: "1px solid hsl(145,70%,30%)",
                                    color: "#fff", fontSize: "15px", fontWeight: 700,
                                    cursor: "pointer", letterSpacing: "0.5px",
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
                                Request MRO Support →
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

            {/* Keyframes */}
            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
        </Layout>
    );
}