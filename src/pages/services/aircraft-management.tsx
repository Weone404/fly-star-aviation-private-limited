import { useState } from "react";
import { Layout } from "@/components/layout/Layout";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Program {
    id: string;
    badge: string;
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
    sections: { heading: string; items: string[] }[];
    note?: string;
    cta: string;
    accentColor: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const programs: Program[] = [
    {
        id: "proownership",
        badge: "ProOwnership®",
        title: "Aircraft Management",
        subtitle: "For Your Journey",
        tagline: "Entry-into-service solution that simplifies aircraft operation and maintenance.",
        description:
            "ProOwnership® aircraft management delivers a short-term, entry-into-service solution that simplifies aircraft operation and maintenance, supporting crews and owners through a smooth transition to independent operations.",
        sections: [
            {
                heading: "Ownership Support Made Easy",
                items: [
                    "Comprehensive trip planning including international travel support",
                    "Local crew providing operational assistance",
                    "Single consolidated monthly invoice for all fuel, services & fees",
                    "Detailed expense tracking and future cost projections",
                    "Designed to transition customer and crew into their own flight department",
                ],
            },
            {
                heading: "Pilot Services",
                items: [
                    "Experienced Textron Aviation pilots",
                    "Aircraft delivery to your base of operations",
                    "Mentorship for first-time owners or owners transitioning to different models",
                    "Support while meeting insurance or FAA hourly minimums for IOE/SOE",
                ],
            },
            {
                heading: "Aircraft Management",
                items: [
                    "Dedicated pilot/crew based at or near customer",
                    "Trip planning for domestic and international travel",
                    "Maintenance oversight with OEM-expert designated Maintenance Specialist",
                    "One consolidated monthly invoice for fuel, services and program fees",
                    "Projections for future operational costs within 1–3 years",
                ],
            },
        ],
        note: "Aircraft must be N-registered and based in the United States. Part 91 operations only.",
        cta: "Get Started",
        accentColor: "hsl(145, 70%, 22%)",
    },
    {
        id: "promaintenance",
        badge: "ProMaintenance®",
        title: "Maintenance Management",
        subtitle: "From Those Who Built Your Aircraft",
        tagline: "OEM expertise keeping your world moving — from start to finish.",
        description:
            "Every maintenance event comes with logistics to work out. ProMaintenance® lifts the pressure so you can enjoy peace of mind by leveraging OEM expertise to keep your world moving.",
        sections: [
            {
                heading: "How It Works",
                items: [
                    "Partnered with a dedicated director of maintenance",
                    "Personal understanding of your operation and aircraft",
                    "Resource for understanding due maintenance and scheduling",
                    "Planning repairs, modifications and compliance",
                    "Meeting airworthiness directives and service bulletins",
                ],
            },
            {
                heading: "ProMaintenance Solutions",
                items: [
                    "Dedicated director of maintenance with access to global service network",
                    "Total management of scheduled, unscheduled and AOG maintenance",
                    "Coordination of approved modifications and repairs",
                    "Planning for ADs, SBs and inspection compliance",
                    "Single point of contact for all maintenance inquiries",
                ],
            },
            {
                heading: "OEM Support",
                items: [
                    "Factory-direct service protecting your investment",
                    "Part of the ProOwnership® management portfolio",
                    "Customizable and seamless OEM solution",
                    "Driven to enhance your operational experience",
                ],
            },
        ],
        note: "Aircraft must be N-registered and based in the United States. Part 91 operations only. All maintenance at factory-owned service centers.",
        cta: "Get Started",
        accentColor: "hsl(160, 65%, 20%)",
    },
    {
        id: "engine",
        badge: "Engine Services",
        title: "Engine Event",
        subtitle: "Management Service",
        tagline: "Expert advocacy and oversight from induction to completion.",
        description:
            "Whether it's a repair, hot section inspection or complete overhaul, our OEM support capabilities ensure you'll get the experts, advocacy and oversight you've come to expect from Textron Aviation.",
        sections: [
            {
                heading: "Engine Service Highlights",
                items: [
                    "Hot section, repair or complete engine overhaul support available",
                    "Estimate reviews and cost management strategies",
                    "Work scope development targeted to unique operator needs",
                    "Schedule engine events with other aftermarket upgrades to minimize downtime",
                    "Access to engine experts following your engine from induction to completion",
                ],
            },
        ],
        cta: "Contact Us",
        accentColor: "hsl(38, 95%, 42%)",
    },
    {
        id: "procamo",
        badge: "ProCamo",
        title: "Continuing Airworthiness",
        subtitle: "Management Organization",
        tagline: "EASA-approved airworthiness management for Citation, Beechcraft & Hawker fleets.",
        description:
            "In an effort to provide comprehensive service to Cessna® Citation® jets, Beechcraft®, and Hawker® fleet, the ProCamo organization holds various approvals from EASA and overseas territories.",
        sections: [
            {
                heading: "Complimentary Services (3 Years)",
                items: [
                    "AMP development and revision",
                    "Scheduled maintenance planning for line and base",
                    "Technical records administration and storage",
                    "Management of approved modifications and repairs",
                    "AD and SB management",
                    "Flight log management",
                    "Lifetime parts control and management",
                    "Subpart I Airworthiness Review Certificate (ARC) for EASA aircraft",
                ],
            },
            {
                heading: "Available For",
                items: [
                    "Cessna® Citation® aircraft (all models)",
                    "Beechcraft® 90, 200, 300 aircraft",
                    "Hawker® 700, 750, 800, 800XP, 850XP, 900XP aircraft",
                ],
            },
            {
                heading: "ProCamo Approvals",
                items: [
                    "All EASA member states",
                    "Cayman Islands (generic)",
                    "Isle of Man — Nominated Technical Representative (NATR)",
                    "San Marino · Guernsey Aircraft Registry · Algeria",
                ],
            },
        ],
        cta: "Contact Local Service Center",
        accentColor: "hsl(200, 75%, 30%)",
    },
];

const europeanCenters = [
    { city: "Paris, France", phone: "+331.49922200" },
    { city: "Prague, Czech Republic", phone: "+420.234.624.517" },
    { city: "Zürich, Switzerland", phone: "+41.43.815.8123" },
    { city: "Valencia, Spain", phone: "+34.96.196.92.00" },
    { city: "Düsseldorf, Germany", phone: "+49.211.454.970" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
            <circle cx="7.5" cy="7.5" r="7.5" fill="hsl(145,70%,22%)" fillOpacity="0.18" />
            <path d="M4 7.5L6.5 10L11 5" stroke="hsl(45,100%,55%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ProgramCard({ program, isActive, onClick }: { program: Program; isActive: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                padding: "18px 20px",
                borderRadius: "14px",
                cursor: "pointer",
                border: isActive ? `1.5px solid hsl(45,100%,51%)` : "1.5px solid rgba(255,255,255,0.07)",
                background: isActive
                    ? "linear-gradient(135deg, rgba(30,80,45,0.55) 0%, rgba(15,35,20,0.7) 100%)"
                    : "rgba(255,255,255,0.03)",
                transition: "all 0.3s ease",
                textAlign: "left",
                flex: 1,
                minWidth: "140px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {isActive && (
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: "linear-gradient(to right, hsl(145,70%,30%), hsl(45,100%,51%))",
                }} />
            )}
            <span style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "1.8px",
                textTransform: "uppercase",
                color: isActive ? "hsl(45,100%,60%)" : "rgba(255,255,255,0.4)",
                transition: "color 0.3s",
            }}>
                {program.badge}
            </span>
            <span style={{
                fontSize: "13px", fontWeight: isActive ? 700 : 500,
                color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                lineHeight: 1.3,
                transition: "color 0.3s",
            }}>
                {program.title}
            </span>
        </button>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AircraftManagement() {
    const [activeId, setActiveId] = useState("proownership");
    const active = programs.find((p) => p.id === activeId)!;

    return (
        <Layout>
            <div style={{
                fontFamily: "'Poppins', sans-serif",
                background: "hsl(150,30%,5%)",
                minHeight: "100vh",
                color: "#fff",
            }}>

                {/* ── Hero Banner ── */}
                <div style={{
                    position: "relative",
                    padding: "72px 6% 64px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, hsl(145,80%,10%) 0%, hsl(145,60%,7%) 60%, hsl(200,60%,8%) 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                    {/* Decorative runway lines */}
                    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} style={{
                                position: "absolute",
                                top: 0, bottom: 0,
                                left: `${10 + i * 16}%`,
                                width: "1px",
                                background: "rgba(255,255,255,0.025)",
                                transform: "skewX(-15deg)",
                            }} />
                        ))}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
                            background: "linear-gradient(to right, transparent, hsl(145,70%,22%), hsl(45,100%,51%), hsl(145,70%,22%), transparent)",
                        }} />
                    </div>

                    <div style={{ position: "relative", maxWidth: "760px" }}>
                        {/* Eyebrow */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            padding: "5px 14px", borderRadius: "20px",
                            fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
                            textTransform: "uppercase", color: "hsl(45,100%,60%)",
                            marginBottom: "22px",
                        }}>
                            ✈ Explore Our Programs
                        </div>

                        <h1 style={{
                            fontSize: "clamp(32px, 5vw, 58px)",
                            fontWeight: 800, lineHeight: 1.05,
                            letterSpacing: "-1.5px", marginBottom: "20px",
                        }}>
                            Aircraft Management
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,45%), hsl(45,100%,55%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                Built Around You
                            </span>
                        </h1>

                        <p style={{
                            fontSize: "16px", lineHeight: 1.75,
                            color: "rgba(255,255,255,0.6)", maxWidth: "560px",
                        }}>
                            From entry-into-service ownership support to full EASA-approved airworthiness
                            management — Textron Aviation's OEM programs are crafted to keep you flying with
                            confidence at every stage.
                        </p>
                    </div>
                </div>

                {/* ── Program Selector Tabs ── */}
                <div style={{
                    background: "hsl(150,25%,7%)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    padding: "20px 6%",
                }}>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        {programs.map((p) => (
                            <ProgramCard
                                key={p.id}
                                program={p}
                                isActive={activeId === p.id}
                                onClick={() => setActiveId(p.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Active Program Detail ── */}
                <div
                    key={activeId}
                    style={{
                        padding: "52px 6% 80px",
                        maxWidth: "1200px",
                        margin: "0 auto",
                        animation: "fadeInUp 0.45s ease forwards",
                        opacity: 0,
                    }}
                >
                    {/* Program header */}
                    <div style={{ marginBottom: "44px" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: `${active.accentColor}22`,
                            border: `1px solid ${active.accentColor}55`,
                            padding: "5px 16px", borderRadius: "20px",
                            fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
                            textTransform: "uppercase", color: "hsl(45,100%,60%)",
                            marginBottom: "18px",
                        }}>
                            {active.badge}
                        </div>

                        <h2 style={{
                            fontSize: "clamp(26px, 4vw, 46px)",
                            fontWeight: 800, lineHeight: 1.1,
                            letterSpacing: "-1px", marginBottom: "8px",
                        }}>
                            {active.title}
                        </h2>
                        <h3 style={{
                            fontSize: "clamp(18px, 2.5vw, 28px)",
                            fontWeight: 500, color: "hsl(45,100%,60%)",
                            marginBottom: "20px", letterSpacing: "-0.5px",
                        }}>
                            {active.subtitle}
                        </h3>

                        {/* Divider */}
                        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
                            <div style={{ width: "48px", height: "2px", background: "hsl(45,100%,51%)" }} />
                            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
                                Program Overview
                            </span>
                        </div>

                        <p style={{
                            fontSize: "16px", lineHeight: 1.8,
                            color: "rgba(255,255,255,0.7)", maxWidth: "680px",
                        }}>
                            {active.description}
                        </p>
                    </div>

                    {/* Sections grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "24px",
                        marginBottom: "40px",
                    }}>
                        {active.sections.map((section) => (
                            <div
                                key={section.heading}
                                style={{
                                    background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "16px",
                                    padding: "28px",
                                    backdropFilter: "blur(8px)",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Top accent */}
                                <div style={{
                                    position: "absolute", top: 0, left: "28px",
                                    width: "36px", height: "2px",
                                    background: "linear-gradient(to right, hsl(145,70%,40%), hsl(45,100%,51%))",
                                }} />

                                <h4 style={{
                                    fontSize: "13px", fontWeight: 700,
                                    letterSpacing: "1.2px", textTransform: "uppercase",
                                    color: "hsl(45,100%,60%)", marginBottom: "20px", marginTop: "6px",
                                }}>
                                    {section.heading}
                                </h4>

                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                    {section.items.map((item) => (
                                        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                            <CheckIcon />
                                            <span style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* ProCamo European Centers */}
                    {activeId === "procamo" && (
                        <div style={{
                            background: "linear-gradient(135deg, rgba(30,60,80,0.4) 0%, rgba(10,25,35,0.5) 100%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "16px",
                            padding: "32px",
                            marginBottom: "32px",
                        }}>
                            <h4 style={{
                                fontSize: "13px", fontWeight: 700,
                                letterSpacing: "1.5px", textTransform: "uppercase",
                                color: "hsl(45,100%,60%)", marginBottom: "24px",
                            }}>
                                🌍 European Service Centers
                            </h4>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "16px",
                            }}>
                                {europeanCenters.map((center) => (
                                    <div key={center.city} style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: "10px",
                                        padding: "16px 18px",
                                    }}>
                                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                                            {center.city}
                                        </div>
                                        <div style={{ fontSize: "13px", color: "hsl(45,100%,60%)", fontWeight: 600 }}>
                                            {center.phone}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Note / disclaimer */}
                    {active.note && (
                        <div style={{
                            display: "flex", alignItems: "flex-start", gap: "12px",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderLeft: "3px solid hsl(145,70%,30%)",
                            borderRadius: "10px",
                            padding: "16px 20px",
                            marginBottom: "32px",
                        }}>
                            <span style={{ fontSize: "16px", flexShrink: 0 }}>ℹ️</span>
                            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>
                                {active.note}
                            </p>
                        </div>
                    )}

                    {/* CTA */}
                    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
                        <button style={{
                            padding: "14px 36px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, hsl(145,70%,22%) 0%, hsl(145,80%,16%) 100%)",
                            border: "1px solid hsl(145,70%,30%)",
                            color: "#fff",
                            fontSize: "14px", fontWeight: 700,
                            letterSpacing: "0.5px",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background =
                                    "linear-gradient(135deg, hsl(145,70%,28%) 0%, hsl(145,80%,20%) 100%)";
                                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background =
                                    "linear-gradient(135deg, hsl(145,70%,22%) 0%, hsl(145,80%,16%) 100%)";
                                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                            }}
                        >
                            {active.cta} →
                        </button>

                        <button style={{
                            padding: "14px 28px",
                            borderRadius: "10px",
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "14px", fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.25s ease",
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
                            Speak With Us
                        </button>
                    </div>
                </div>

                {/* ── All Programs Quick Nav ── */}
                <div style={{
                    background: "hsl(150,28%,6%)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    padding: "40px 6%",
                }}>
                    <p style={{
                        fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px",
                        textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
                        marginBottom: "24px",
                    }}>
                        All Programs
                    </p>
                    <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
                        {programs.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setActiveId(p.id)}
                                style={{
                                    background: "none", border: "none", padding: 0,
                                    cursor: "pointer", textAlign: "left",
                                }}
                            >
                                <span style={{
                                    fontSize: "14px", fontWeight: 600,
                                    color: activeId === p.id ? "hsl(45,100%,60%)" : "rgba(255,255,255,0.4)",
                                    transition: "color 0.2s",
                                    borderBottom: activeId === p.id ? "1px solid hsl(45,100%,51%)" : "1px solid transparent",
                                    paddingBottom: "2px",
                                }}>
                                    {p.badge}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Keyframes */}
                <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
            </div>
        </Layout>
    );
}