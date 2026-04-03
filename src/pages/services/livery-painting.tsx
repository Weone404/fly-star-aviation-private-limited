import { memo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

// ─── Static data (module-level — zero re-creation cost) ──────────────────────

const additionalServices = [
    { icon: "🖥️", title: "Digital Concept Previews", desc: "Graphic design and digital visualisation of bespoke livery concepts before any paint touches the aircraft." },
    { icon: "⚗️", title: "Chemical & Mechanical Stripping", desc: "Full paint removal via chemical stripping, mechanical sanding, or a combination of both — matched to the aircraft type and condition." },
    { icon: "🎨", title: "Complex Livery & Airbrushing", desc: "Intricate hand-painted and airbrushed artwork, including multi-colour fades, custom graphics, and detailed imagery." },
    { icon: "🧹", title: "Dust-Free Component Booth", desc: "Dedicated controlled-environment painting booth for specialised parts, components, and assemblies." },
    { icon: "🔬", title: "Surface Prep & Primer Application", desc: "Comprehensive surface inspection, corrosion pre-treatment, and high-adhesion primer application prior to topcoat." },
    { icon: "🖌️", title: "Exterior Livery Painting", desc: "Full exterior refinishing using Topcoat, Base coat, and Clear coat systems — delivering a durable, high-gloss finish." },
    { icon: "🛋️", title: "Interior & Cabin Refinishing", desc: "Cabin and interior painting services including bulkheads, sidewalls, overhead panels, and galley structures." },
    { icon: "🏷️", title: "Decal Printing & Application", desc: "In-house decal design, printing, and precision application — including registration marks and branding elements." },
    { icon: "🔒", title: "Sealant Application", desc: "Protective sealant application on joints, seams, and fastener areas to safeguard against moisture ingress and corrosion." },
    { icon: "🔄", title: "Livery Neutralisation", desc: "Full redelivery paint neutralisation — removing existing branding and returning aircraft to a standard lease specification." },
    { icon: "✈️", title: "Flight Control Painting", desc: "Specialised refinishing of flight control surfaces in compliance with manufacturer tolerances and balance requirements." },
    { icon: "📐", title: "Technical Aircraft Markings", desc: "Application of regulatory technical markings, safety labels, zonal identification, and ground servicing callouts." },
];

const capabilities = [
    { icon: "🏭", label: "2,500 sqm", sub: "Dedicated painting hangar" },
    { icon: "🛩️", label: "Narrow-body", sub: "A320 / B737 / ATR capable" },
    { icon: "🚁", label: "4 Rotorcraft", sub: "Simultaneous capacity" },
    { icon: "💼", label: "2 Business Jets", sub: "Concurrent throughput" },
];

const materials = [
    { name: "Mankiewicz", desc: "Premium aerospace coatings" },
    { name: "AkzoNobel", desc: "High-performance aerospace finishes" },
    { name: "PPG Aerospace", desc: "Industry-leading paint systems" },
    { name: "Sherwin-Williams", desc: "Specialist aircraft coatings" },
];

const customers = [
    { icon: "✈️", label: "Commercial Airlines" },
    { icon: "📦", label: "Cargo Operators" },
    { icon: "🏦", label: "Asset Owners & Lessors" },
    { icon: "💼", label: "Corporate & Business Jets" },
    { icon: "🛡️", label: "Defence Services" },
    { icon: "🚁", label: "Rotary Wing Operators" },
];

const processSteps = [
    { step: "01", title: "Design Consultation", desc: "Digital concept development and livery preview — aligning your vision with what's achievable before a single component is touched." },
    { step: "02", title: "Surface Preparation", desc: "Chemical or mechanical paint removal, comprehensive surface inspection for corrosion, cracks, and damage, followed by pre-treatment and primer application." },
    { step: "03", title: "Paint Application", desc: "Precision topcoat, base coat, and clear coat application using world-class materials, executed in our controlled-environment hangar." },
    { step: "04", title: "Detail & Markings", desc: "Decal application, technical aircraft markings, sealant application, and flight control refinishing — every detail inspected before sign-off." },
    { step: "05", title: "Quality Sign-Off", desc: "Final quality inspection, documentation, and return-to-service clearance — ensuring the finish meets or exceeds the highest industry standards." },
];

const facilityPoints = [
    { icon: "🏅", title: "EASA-Certified Hangar", desc: "Our painting facility holds full EASA certification, ensuring every project meets internationally recognised airworthiness standards." },
    { icon: "🎯", title: "Keen Eye for Detail", desc: "Our teams inspect every surface for corrosion, cracks, and damage during the painting process — delivering first-class outcomes." },
    { icon: "⚡", title: "Aggressive TAT Capability", desc: "Continuously optimised processes allow us to meet demanding customer turnaround timelines without compromising quality." },
];

const HERO_LINES = Array.from({ length: 7 }, (_, i) => i);
const breadcrumbs = ["Home", "Our Services", "Aircraft Livery & Painting"];

// ─── Global CSS ───────────────────────────────────────────────────────────────
// All hover logic lives here — zero JS event handlers, zero React state for hover.

const GLOBAL_CSS = `
  /* ── Buttons ── */
  .alp-btn-primary {
    padding: 15px 40px; border-radius: 10px;
    background: linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%));
    border: 1px solid hsl(145,70%,30%);
    color: #fff; font-size: 14px; font-weight: 700;
    text-decoration: none; display: inline-block;
    box-shadow: 0 4px 24px rgba(0,0,0,0.35);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    letter-spacing: 0.5px;
  }
  .alp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.45); }

  .alp-btn-ghost {
    padding: 15px 28px; border-radius: 10px;
    background: transparent; border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 500;
    text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s;
  }
  .alp-btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

  .alp-btn-primary-lg {
    padding: 16px 48px; border-radius: 10px;
    background: linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%));
    border: 1px solid hsl(145,70%,30%);
    color: #fff; font-size: 15px; font-weight: 700;
    text-decoration: none; display: inline-block;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    transition: transform 0.25s ease, box-shadow 0.25s ease; letter-spacing: 0.5px;
  }
  .alp-btn-primary-lg:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(0,0,0,0.5); }

  .alp-btn-ghost-lg {
    padding: 16px 32px; border-radius: 10px;
    background: transparent; border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.6); font-size: 15px; font-weight: 500;
    text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s;
  }
  .alp-btn-ghost-lg:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

  /* ── Facility feature cards ── */
  .alp-facility-card {
    display: flex; gap: 16px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 18px 20px;
    transition: border-color 0.2s, background 0.2s;
  }
  .alp-facility-card:hover { border-color: hsl(145,70%,28%); background: rgba(30,80,45,0.18); }

  /* ── Process timeline step ── */
  .alp-step-dot {
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; color: rgba(255,255,255,0.35);
    transition: background 0.25s, border-color 0.25s, color 0.25s;
    flex-shrink: 0; z-index: 1;
  }
  .alp-step-row:hover .alp-step-dot {
    background: linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%));
    border-color: hsl(45,100%,51%); color: hsl(45,100%,65%);
  }
  .alp-step-body {
    border: 1px solid transparent; border-radius: 12px;
    padding: 4px 0;
    transition: background 0.3s, border-color 0.3s, padding 0.3s;
  }
  .alp-step-row:hover .alp-step-body {
    background: linear-gradient(135deg, rgba(30,80,45,0.35), rgba(10,30,18,0.4));
    border-color: rgba(145,200,130,0.15); padding: 18px 20px;
  }
  .alp-step-title {
    font-size: 15px; font-weight: 700; margin-bottom: 6px;
    color: rgba(255,255,255,0.85); transition: color 0.2s;
  }
  .alp-step-row:hover .alp-step-title { color: #fff; }

  /* ── Customer cards ── */
  .alp-customer-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 20px 18px;
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    cursor: default; text-align: center;
    will-change: transform;
  }
  .alp-customer-card:hover {
    border-color: hsl(145,70%,28%); background: rgba(30,80,45,0.15);
    transform: translateY(-3px);
  }

  /* ── Material cards ── */
  .alp-material-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 20px 22px;
    display: flex; align-items: center; gap: 14px;
    transition: border-color 0.2s; cursor: default;
  }
  .alp-material-card:hover { border-color: hsl(145,70%,28%); }

  /* ── Service cards ── */
  .alp-svc-card {
    background: linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 24px 22px;
    transition: background 0.28s ease, border-color 0.28s ease, transform 0.28s ease;
    position: relative; overflow: hidden; cursor: default;
    will-change: transform;
  }
  .alp-svc-card:hover {
    background: linear-gradient(135deg, rgba(30,80,45,0.45), rgba(10,30,18,0.5));
    border-color: hsl(45,100%,42%);
    transform: translateY(-4px);
  }
  .alp-svc-bar {
    position: absolute; top: 0; left: 22px;
    width: 24px; height: 2px;
    background: hsl(145,70%,28%);
    transition: width 0.3s, background 0.3s;
  }
  .alp-svc-card:hover .alp-svc-bar {
    width: 40px;
    background: linear-gradient(to right, hsl(145,70%,38%), hsl(45,100%,55%));
  }
  .alp-svc-icon {
    width: 42px; height: 42px; border-radius: 12px;
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 14px; transition: background 0.25s;
  }
  .alp-svc-card:hover .alp-svc-icon { background: hsl(145,70%,22%); }
  .alp-svc-title {
    font-size: 14px; font-weight: 700; margin-bottom: 8px;
    color: rgba(255,255,255,0.88); transition: color 0.2s;
  }
  .alp-svc-card:hover .alp-svc-title { color: #fff; }
  .alp-svc-desc {
    font-size: 12px; color: rgba(255,255,255,0.42);
    line-height: 1.65; transition: color 0.2s;
  }
  .alp-svc-card:hover .alp-svc-desc { color: rgba(255,255,255,0.65); }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoldDivider({ label = "FLY SPACE Coatings" }: { label?: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "44px", height: "2px", background: "hsl(45,100%,51%)" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                {label}
            </span>
        </div>
    );
}

// Memoised — props are static so these never re-render after mount.

const ServiceCard = memo(function ServiceCard({
    svc, index,
}: { svc: typeof additionalServices[0]; index: number }) {
    return (
        <div className="alp-svc-card">
            <div className="alp-svc-bar" />
            <div style={{
                position: "absolute", top: "16px", right: "18px",
                fontSize: "26px", fontWeight: 800,
                color: "rgba(255,255,255,0.04)", lineHeight: 1,
            }}>
                {String(index + 1).padStart(2, "0")}
            </div>
            <div className="alp-svc-icon">{svc.icon}</div>
            <div className="alp-svc-title">{svc.title}</div>
            <div className="alp-svc-desc">{svc.desc}</div>
        </div>
    );
});

const ProcessStep = memo(function ProcessStep({
    step, isLast,
}: { step: typeof processSteps[0]; isLast: boolean }) {
    return (
        <div className="alp-step-row" style={{ display: "flex", alignItems: "stretch" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "64px", flexShrink: 0 }}>
                <div className="alp-step-dot">{step.step}</div>
                {!isLast && (
                    <div style={{
                        width: "1.5px", flex: 1, minHeight: "24px",
                        background: "rgba(255,255,255,0.07)", margin: "4px 0",
                    }} />
                )}
            </div>
            <div style={{ flex: 1, paddingBottom: isLast ? "0" : "28px", paddingLeft: "20px" }}>
                <div className="alp-step-body">
                    <div className="alp-step-title">{step.title}</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{step.desc}</div>
                </div>
            </div>
        </div>
    );
});

const FacilityCard = memo(function FacilityCard({ item }: { item: typeof facilityPoints[0] }) {
    return (
        <div className="alp-facility-card">
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
    );
});

// ─── Main Component ───────────────────────────────────────────────────────────
// No useState at all — all interactivity is CSS-driven.

export default function AircraftLiveryPainting() {
    return (
        <Layout>
            <style>{GLOBAL_CSS}</style>

            <div style={{
                fontFamily: "'Poppins', sans-serif",
                background: "hsl(150,30%,5%)",
                minHeight: "100vh",
                color: "#fff",
            }}>

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
                        }} />
                        <div style={{ position: "absolute", right: "-6%", top: "-20%", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)" }} />
                        <div style={{ position: "absolute", right: "4%", top: "5%", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.025)" }} />
                    </div>

                    <div style={{ position: "relative", maxWidth: "760px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
                            {breadcrumbs.map((crumb, i) => (
                                <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{
                                        fontSize: "12px",
                                        color: i === breadcrumbs.length - 1 ? "hsl(45,100%,60%)" : "rgba(255,255,255,0.3)",
                                        fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
                                    }}>
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
                        }}>
                            🎨 Aircraft Livery &amp; Painting
                        </div>

                        <h1 style={{
                            fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 800,
                            lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: "12px",
                        }}>
                            Where Precision Meets
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                Artistry in the Air
                            </span>
                        </h1>

                        <p style={{
                            fontSize: "13px", fontWeight: 600, letterSpacing: "3px",
                            textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "20px",
                        }}>
                            Crafting visual identities, one aircraft at a time
                        </p>

                        <p style={{
                            fontSize: "16px", lineHeight: 1.85,
                            color: "rgba(255,255,255,0.6)", maxWidth: "620px", marginBottom: "38px",
                        }}>
                            We specialize in transforming aircraft exteriors into visual statements. Whether it's a full
                            aircraft repaint for a commercial airliner or a custom paint scheme for a business aircraft,
                            we offer a world-class painting facility and team, guaranteed to deliver on time, every time.
                        </p>

                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                            <Link to="/contact" className="alp-btn-primary">Request a Quote →</Link>
                            <Link to="/contact" className="alp-btn-ghost">View Capabilities</Link>
                        </div>
                    </div>
                </div>

                {/* ── Hangar Capability Bar ── */}
                <div style={{ background: "hsl(150,28%,6%)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 6%" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                        {capabilities.map((cap, i) => (
                            <div key={cap.label} style={{
                                padding: "32px 24px",
                                borderRight: i < capabilities.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                display: "flex", flexDirection: "column", gap: "6px",
                            }}>
                                <div style={{ fontSize: "22px", marginBottom: "4px" }}>{cap.icon}</div>
                                <div style={{
                                    fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px",
                                    background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,55%))",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                }}>
                                    {cap.label}
                                </div>
                                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{cap.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── About / Facility Section ── */}
                <div style={{ padding: "68px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "60px", alignItems: "center",
                    }}>
                        <div>
                            <GoldDivider label="Our Facility" />
                            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "20px" }}>
                                A Dedicated World-Class Painting Facility
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "18px" }}>
                                Our EASA-certified narrow-body painting hangar, covering an area of 2,500 sqm, is specially designed for precise aircraft refinishing. The location of this facility and the natural weather conditions offer an ideal environment for painting without the necessity of artificial control of temperature and humidity levels.
                            </p>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "24px" }}>
                                This facility is equipped with a specially designed air extraction system to ensure good ventilation and to minimize our ecological footprint through the use of high-grade carbon-impregnated filters to deal with Volatile Organic Compounds.
                            </p>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "10px",
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                padding: "12px 18px", borderRadius: "10px",
                            }}>
                                <span style={{ fontSize: "20px" }}>🌿</span>
                                <div>
                                    <div style={{ fontSize: "12px", fontWeight: 700, color: "hsl(145,60%,55%)" }}>Environmentally Responsible</div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Compliant effluent disposal &amp; filtered air treatment</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {facilityPoints.map((item) => (
                                <FacilityCard key={item.title} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Our Process ── */}
                <div style={{ padding: "68px 6%", background: "hsl(150,28%,6%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider label="Our Process" />
                        <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "12px" }}>
                            From Concept to Clearance
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "520px", marginBottom: "48px" }}>
                            Every project follows a rigorous, fully documented workflow — from initial
                            design consultation to final quality sign-off and return-to-service.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {processSteps.map((step, i) => (
                                <ProcessStep key={step.step} step={step} isLast={i === processSteps.length - 1} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Customers We Serve ── */}
                <div style={{ padding: "64px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider label="Who We Serve" />
                        <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "40px" }}>
                            Trusted Across the Aviation Spectrum
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
                            {customers.map((c) => (
                                <div key={c.label} className="alp-customer-card">
                                    <span style={{ fontSize: "26px" }}>{c.icon}</span>
                                    <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{c.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Paint Materials ── */}
                <div style={{ padding: "56px 6%", background: "hsl(150,28%,6%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider label="Materials We Use" />
                        <h2 style={{ fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "12px" }}>
                            Only the World's Best Coating Materials
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "540px", marginBottom: "36px" }}>
                            We source exclusively from globally recognised aerospace coating manufacturers
                            to guarantee finish quality, longevity, and compliance.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                            {materials.map((mat) => (
                                <div key={mat.name} className="alp-material-card">
                                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "hsl(45,100%,51%)", flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "3px" }}>{mat.name}</div>
                                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{mat.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Additional Services ── */}
                <div style={{ padding: "68px 6% 80px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <GoldDivider label="Full Service Range" />
                        <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "12px" }}>
                            Additional Painting &amp; Livery Services
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "540px", marginBottom: "48px" }}>
                            Beyond full aircraft repaints, our specialist team offers a comprehensive
                            range of ancillary services to cover every aspect of your project.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
                            {additionalServices.map((svc, i) => (
                                <ServiceCard key={svc.title} svc={svc} index={i} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom CTA ── */}
                <div style={{
                    background: "linear-gradient(135deg, hsl(145,80%,10%) 0%, hsl(145,60%,7%) 100%)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    padding: "60px 6%", textAlign: "center",
                    position: "relative", overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)" }} />
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "380px", height: "380px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.035)" }} />
                    </div>
                    <div style={{ position: "relative" }}>
                        <div style={{
                            display: "inline-block",
                            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "20px", padding: "5px 16px",
                            fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
                            textTransform: "uppercase", color: "hsl(45,100%,60%)", marginBottom: "20px",
                        }}>
                            Start Your Project
                        </div>
                        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: "16px" }}>
                            Ready to Transform
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                Your Aircraft's Identity?
                            </span>
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto 36px" }}>
                            Speak with our livery specialists today. We'll bring your vision to
                            life — beautifully, precisely, and on schedule.
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link to="/contact" className="alp-btn-primary-lg">Request a Quote →</Link>
                            <Link to="/contact" className="alp-btn-ghost-lg">View All Services</Link>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
}