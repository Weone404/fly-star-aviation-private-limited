import { useState } from "react";
import { Layout } from "@/components/layout/Layout";

// ─── Data ────────────────────────────────────────────────────────────────────

const advisoryPoints = [
    { icon: "💰", label: "Price & Age", desc: "Market-aligned valuation and age assessment" },
    { icon: "🛋️", label: "Cabin Size & Layout", desc: "Passenger comfort and interior configuration" },
    { icon: "📦", label: "Payload & Range", desc: "Operational performance for your missions" },
    { icon: "🛬", label: "Runway Performance", desc: "Short-field and high-altitude capability" },
    { icon: "📈", label: "Residual Value", desc: "Long-term asset protection analysis" },
    { icon: "👨‍✈️", label: "Crew Requirements", desc: "Pilot certification and staffing planning" },
];

const processSteps = [
    {
        step: "01",
        title: "Consultation",
        desc: "Detailed discovery session to understand your mission profile, budget, and operational requirements.",
    },
    {
        step: "02",
        title: "Shortlisting",
        desc: "Budgeting support and curated aircraft shortlist based on your specific criteria.",
    },
    {
        step: "03",
        title: "Inspection & Survey",
        desc: "Physical inspections, pre-purchase surveys, and technical audits by our experts.",
    },
    {
        step: "04",
        title: "Negotiation & Legal",
        desc: "Skilled negotiation, contract review, and full legal documentation management.",
    },
    {
        step: "05",
        title: "Induction",
        desc: "Registration, title verification, delivery coordination, and import/export formalities.",
    },
];

const aircraftOptions = [
    { name: "King Air B200 / C-90 / B-350", category: "Turboprop", icon: "✈️" },
    { name: "Learjet 45", category: "Light Jet", icon: "✈️" },
    { name: "Phenom 100", category: "Very Light Jet", icon: "✈️" },
    { name: "Pilatus PC-12", category: "Turboprop", icon: "✈️" },
    { name: "CRJ 100", category: "Regional Jet", icon: "✈️" },
    { name: "Citation XLS", category: "Midsize Jet", icon: "✈️" },
    { name: "Challenger 604", category: "Large Jet", icon: "✈️" },
    { name: "ATR 42 / 72-600", category: "Turboprop Airliner", icon: "✈️" },
    { name: "Airbus A320", category: "Narrow-body Airliner", icon: "✈️" },
    { name: "Boeing 737", category: "Narrow-body Airliner", icon: "✈️" },
];

const relatedServices = [
    {
        title: "Pilot Training",
        desc: "Customized crew training programs tailored to operational needs.",
        icon: "🎓",
        href: "#",
    },
    {
        title: "Charter Services",
        desc: "Government-approved private charter aircraft with expert pilots.",
        icon: "🛩️",
        href: "#",
    },
    {
        title: "Aviation Placement",
        desc: "Career assistance and placement support for aviation professionals.",
        icon: "🧭",
        href: "#",
    },
];

const categoryColors: Record<string, string> = {
    Turboprop: "hsl(145, 70%, 22%)",
    "Light Jet": "hsl(200, 80%, 30%)",
    "Very Light Jet": "hsl(200, 75%, 38%)",
    "Regional Jet": "hsl(160, 60%, 25%)",
    "Midsize Jet": "hsl(170, 60%, 22%)",
    "Large Jet": "hsl(145, 80%, 16%)",
    "Turboprop Airliner": "hsl(38, 80%, 35%)",
    "Narrow-body Airliner": "hsl(38, 90%, 30%)",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function GoldDivider() {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
            <div style={{ width: "48px", height: "2px", background: "hsl(45,100%,51%)" }} />
            <span style={{
                color: "rgba(255,255,255,0.3)", fontSize: "11px",
                letterSpacing: "2.5px", textTransform: "uppercase",
            }}>
                FLY SPACE Advisory
            </span>
        </div>
    );
}

function CheckIcon({ color = "hsl(45,100%,55%)" }: { color?: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
            <circle cx="8" cy="8" r="8" fill="hsl(145,70%,22%)" fillOpacity="0.2" />
            <path d="M4.5 8L7 10.5L11.5 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AircraftSalePurchase() {
    const [hoveredStep, setHoveredStep] = useState<string | null>(null);
    const [hoveredAircraft, setHoveredAircraft] = useState<string | null>(null);

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
                    padding: "80px 6% 72px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, hsl(145,80%,9%) 0%, hsl(145,65%,6%) 55%, hsl(200,55%,8%) 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                    {/* Decorative grid lines */}
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                        {[...Array(7)].map((_, i) => (
                            <div key={i} style={{
                                position: "absolute", top: 0, bottom: 0,
                                left: `${8 + i * 14}%`, width: "1px",
                                background: "rgba(255,255,255,0.022)",
                                transform: "skewX(-12deg)",
                            }} />
                        ))}
                        {/* Bottom gold line */}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
                            background: "linear-gradient(to right, transparent, hsl(145,70%,25%), hsl(45,100%,51%), hsl(145,70%,25%), transparent)",
                        }} />
                        {/* Faint circle */}
                        <div style={{
                            position: "absolute", right: "-8%", top: "-30%",
                            width: "520px", height: "520px", borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.04)",
                        }} />
                        <div style={{
                            position: "absolute", right: "-2%", top: "-10%",
                            width: "340px", height: "340px", borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.03)",
                        }} />
                    </div>

                    <div style={{ position: "relative", maxWidth: "700px" }}>
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
                            ✈ Aircraft Sale & Purchase
                        </div>

                        <h1 style={{
                            fontSize: "clamp(32px, 5.5vw, 62px)",
                            fontWeight: 800, lineHeight: 1.05,
                            letterSpacing: "-1.5px", marginBottom: "16px",
                        }}>
                            End-to-End Advisory
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                for New &amp; Used Aircraft
                            </span>
                        </h1>

                        <p style={{
                            fontSize: "16px", lineHeight: 1.8,
                            color: "rgba(255,255,255,0.6)", maxWidth: "560px", marginBottom: "36px",
                        }}>
                            FLY SPACE has a proven track record of advising clients through the complete
                            aircraft purchase process for both new and pre-owned aircraft.
                        </p>

                        {/* CTA */}
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
                                Enquire Now →
                            </button>
                            <button style={{
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
                                View Fleet Options
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Advisory Criteria ── */}
                <div style={{ padding: "64px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider />
                        <h2 style={{
                            fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800,
                            letterSpacing: "-0.8px", marginBottom: "12px",
                        }}>
                            What We Evaluate for You
                        </h2>
                        <p style={{
                            fontSize: "15px", color: "rgba(255,255,255,0.55)",
                            lineHeight: 1.75, maxWidth: "560px", marginBottom: "44px",
                        }}>
                            We conduct detailed consultations to identify the most suitable aircraft
                            category based on your specific operational needs.
                        </p>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "18px",
                        }}>
                            {advisoryPoints.map((point) => (
                                <div key={point.label} style={{
                                    background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "14px", padding: "24px",
                                    display: "flex", alignItems: "flex-start", gap: "16px",
                                    transition: "border-color 0.25s, transform 0.25s",
                                }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,30%)";
                                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                    }}
                                >
                                    <div style={{
                                        width: "44px", height: "44px", borderRadius: "12px",
                                        background: "hsl(145,70%,22%)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "20px", flexShrink: 0,
                                    }}>
                                        {point.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "5px" }}>
                                            {point.label}
                                        </div>
                                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                                            {point.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Our Process ── */}
                <div style={{
                    padding: "64px 6%",
                    background: "hsl(150,28%,6%)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider />
                        <h2 style={{
                            fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800,
                            letterSpacing: "-0.8px", marginBottom: "12px",
                        }}>
                            Our Purchase Process
                        </h2>
                        <p style={{
                            fontSize: "15px", color: "rgba(255,255,255,0.55)",
                            lineHeight: 1.75, maxWidth: "520px", marginBottom: "48px",
                        }}>
                            From the initial consultation to aircraft induction, we manage every detail
                            so you can focus on flying.
                        </p>

                        {/* Steps */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                            {processSteps.map((step, i) => {
                                const isHovered = hoveredStep === step.step;
                                const isLast = i === processSteps.length - 1;
                                return (
                                    <div
                                        key={step.step}
                                        style={{ display: "flex", alignItems: "stretch", gap: "0" }}
                                        onMouseEnter={() => setHoveredStep(step.step)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                    >
                                        {/* Left: number + line */}
                                        <div style={{
                                            display: "flex", flexDirection: "column", alignItems: "center",
                                            width: "64px", flexShrink: 0,
                                        }}>
                                            <div style={{
                                                width: "44px", height: "44px", borderRadius: "50%",
                                                background: isHovered
                                                    ? "linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%))"
                                                    : "rgba(255,255,255,0.06)",
                                                border: isHovered
                                                    ? "1.5px solid hsl(45,100%,51%)"
                                                    : "1.5px solid rgba(255,255,255,0.1)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "12px", fontWeight: 800,
                                                color: isHovered ? "hsl(45,100%,65%)" : "rgba(255,255,255,0.35)",
                                                transition: "all 0.25s",
                                                flexShrink: 0,
                                                zIndex: 1,
                                            }}>
                                                {step.step}
                                            </div>
                                            {!isLast && (
                                                <div style={{
                                                    width: "1.5px", flex: 1, minHeight: "24px",
                                                    background: "rgba(255,255,255,0.07)", margin: "4px 0",
                                                }} />
                                            )}
                                        </div>

                                        {/* Right: content */}
                                        <div style={{
                                            flex: 1, paddingBottom: isLast ? "0" : "28px",
                                            paddingLeft: "20px",
                                        }}>
                                            <div style={{
                                                background: isHovered
                                                    ? "linear-gradient(135deg, rgba(30,80,45,0.35), rgba(10,30,18,0.4))"
                                                    : "transparent",
                                                border: isHovered
                                                    ? "1px solid rgba(145,200,130,0.15)"
                                                    : "1px solid transparent",
                                                borderRadius: "12px",
                                                padding: isHovered ? "18px 20px" : "4px 0",
                                                transition: "all 0.3s ease",
                                            }}>
                                                <div style={{
                                                    fontSize: "15px", fontWeight: 700, marginBottom: "6px",
                                                    color: isHovered ? "#fff" : "rgba(255,255,255,0.85)",
                                                    transition: "color 0.2s",
                                                }}>
                                                    {step.title}
                                                </div>
                                                <div style={{
                                                    fontSize: "13px", color: "rgba(255,255,255,0.5)",
                                                    lineHeight: 1.65,
                                                }}>
                                                    {step.desc}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Popular Aircraft ── */}
                <div style={{ padding: "64px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider />
                        <h2 style={{
                            fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800,
                            letterSpacing: "-0.8px", marginBottom: "12px",
                        }}>
                            Popular Aircraft Options
                        </h2>
                        <p style={{
                            fontSize: "15px", color: "rgba(255,255,255,0.55)",
                            lineHeight: 1.75, maxWidth: "540px", marginBottom: "40px",
                        }}>
                            We assist with the acquisition of a wide range of aircraft categories —
                            from turboprops to widebodies.
                        </p>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                            gap: "14px",
                        }}>
                            {aircraftOptions.map((ac) => {
                                const isHov = hoveredAircraft === ac.name;
                                return (
                                    <div
                                        key={ac.name}
                                        onMouseEnter={() => setHoveredAircraft(ac.name)}
                                        onMouseLeave={() => setHoveredAircraft(null)}
                                        style={{
                                            background: isHov
                                                ? "linear-gradient(135deg, rgba(30,80,45,0.45), rgba(10,30,18,0.5))"
                                                : "rgba(255,255,255,0.03)",
                                            border: isHov
                                                ? "1px solid hsl(45,100%,45%)"
                                                : "1px solid rgba(255,255,255,0.07)",
                                            borderRadius: "12px",
                                            padding: "18px 20px",
                                            cursor: "default",
                                            transition: "all 0.25s ease",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px",
                                        }}
                                    >
                                        <div style={{
                                            display: "inline-flex",
                                            background: (categoryColors[ac.category] ?? "hsl(145,70%,22%)") + "33",
                                            border: `1px solid ${categoryColors[ac.category] ?? "hsl(145,70%,22%)"}55`,
                                            padding: "3px 10px", borderRadius: "20px",
                                            fontSize: "10px", fontWeight: 600,
                                            letterSpacing: "1px", textTransform: "uppercase",
                                            color: "hsl(45,100%,60%)",
                                            alignSelf: "flex-start",
                                        }}>
                                            {ac.category}
                                        </div>
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: "8px",
                                        }}>
                                            <CheckIcon color={isHov ? "hsl(45,100%,60%)" : "hsl(145,60%,45%)"} />
                                            <span style={{
                                                fontSize: "14px", fontWeight: isHov ? 700 : 500,
                                                color: isHov ? "#fff" : "rgba(255,255,255,0.75)",
                                                transition: "all 0.2s",
                                            }}>
                                                {ac.name}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── What We Assist With (summary) ── */}
                <div style={{
                    padding: "56px 6%",
                    background: "hsl(150,28%,6%)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "32px",
                            alignItems: "center",
                        }}>
                            <div>
                                <GoldDivider />
                                <h2 style={{
                                    fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 800,
                                    letterSpacing: "-0.8px", marginBottom: "14px",
                                }}>
                                    Full Purchase Support
                                </h2>
                                <p style={{
                                    fontSize: "15px", color: "rgba(255,255,255,0.55)",
                                    lineHeight: 1.8,
                                }}>
                                    We assist at every stage — from budgeting and shortlisting to legal
                                    documentation, surveys, and post-purchase induction.
                                </p>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {[
                                    "Budgeting & aircraft shortlisting",
                                    "Physical inspections & pre-purchase surveys",
                                    "Negotiation & legal documentation",
                                    "Registration & title verification",
                                    "Delivery & import/export formalities",
                                    "Smooth aircraft induction support",
                                ].map((item) => (
                                    <div key={item} style={{
                                        display: "flex", alignItems: "center", gap: "12px",
                                        padding: "12px 16px",
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        borderRadius: "10px",
                                    }}>
                                        <CheckIcon />
                                        <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related Services ── */}
                <div style={{ padding: "64px 6% 80px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider />
                        <h2 style={{
                            fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800,
                            letterSpacing: "-0.8px", marginBottom: "12px",
                        }}>
                            Related Services
                        </h2>
                        <p style={{
                            fontSize: "15px", color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.75, marginBottom: "40px",
                        }}>
                            Explore our full suite of aviation services designed for operators and professionals.
                        </p>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "20px",
                        }}>
                            {relatedServices.map((service) => (
                                <div key={service.title} style={{
                                    background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "16px", padding: "32px 28px",
                                    display: "flex", flexDirection: "column", gap: "14px",
                                    position: "relative", overflow: "hidden",
                                    transition: "border-color 0.25s, transform 0.25s",
                                    cursor: "pointer",
                                }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)";
                                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                    }}
                                >
                                    {/* Top accent */}
                                    <div style={{
                                        position: "absolute", top: 0, left: "28px",
                                        width: "32px", height: "2px",
                                        background: "linear-gradient(to right, hsl(145,70%,35%), hsl(45,100%,51%))",
                                    }} />

                                    <div style={{
                                        width: "48px", height: "48px", borderRadius: "14px",
                                        background: "hsl(145,70%,22%)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "22px",
                                    }}>
                                        {service.icon}
                                    </div>

                                    <div>
                                        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>
                                            {service.title}
                                        </div>
                                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
                                            {service.desc}
                                        </div>
                                    </div>

                                    <a href={service.href} style={{
                                        display: "inline-flex", alignItems: "center", gap: "6px",
                                        color: "hsl(45,100%,60%)", fontSize: "13px", fontWeight: 600,
                                        textDecoration: "none", marginTop: "auto",
                                    }}>
                                        Learn More
                                        <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom CTA Banner ── */}
                <div style={{
                    background: "linear-gradient(135deg, hsl(145,80%,10%) 0%, hsl(145,60%,7%) 100%)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    padding: "52px 6%",
                    textAlign: "center",
                }}>
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
                        Ready to Acquire?
                    </div>
                    <h2 style={{
                        fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 800,
                        letterSpacing: "-1px", marginBottom: "16px",
                    }}>
                        Let's Find Your Perfect Aircraft
                    </h2>
                    <p style={{
                        fontSize: "15px", color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.75, maxWidth: "480px", margin: "0 auto 32px",
                    }}>
                        Speak with our advisory team today and take the first step toward your
                        ideal aircraft acquisition.
                    </p>
                    <button style={{
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
                        Enquire Now →
                    </button>
                </div>

            </div>
        </Layout>
    );
}