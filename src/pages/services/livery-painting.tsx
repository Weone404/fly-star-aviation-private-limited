import { useState } from "react";
import { Layout } from "@/components/layout/Layout";

// ─── Data ────────────────────────────────────────────────────────────────────

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

const breadcrumbs = ["Home", "Our Services", "Aircraft Livery & Painting"];

// ─── Sub-components ──────────────────────────────────────────────────────────

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

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
            <circle cx="8" cy="8" r="8" fill="hsl(145,70%,22%)" fillOpacity="0.25" />
            <path d="M4.5 8L7 10.5L11.5 5.5" stroke="hsl(45,100%,58%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AircraftLiveryPainting() {
    const [hoveredService, setHoveredService] = useState<string | null>(null);
    const [hoveredStep, setHoveredStep] = useState<string | null>(null);

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
                        <div style={{ position: "absolute", right: "-6%", top: "-20%", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)" }} />
                        <div style={{ position: "absolute", right: "4%", top: "5%", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.025)" }} />
                    </div>

                    <div style={{ position: "relative", maxWidth: "760px" }}>
                        {/* Breadcrumb */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
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
                            We transform aircraft exteriors into powerful visual statements. From
                            full commercial airline repaints to bespoke business jet liveries, our
                            dedicated painting facility and specialist team deliver world-class
                            finishes — on time, every time.
                        </p>

                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
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
                                Request a Quote →
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
                                View Capabilities
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Hangar Capability Bar ── */}
                <div style={{
                    background: "hsl(150,28%,6%)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 6%",
                }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    }}>
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

                {/* ── About Section ── */}
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
                                Our 2,500 sqm EASA-certified narrow-body painting hangar is purpose-built
                                for precision aircraft refinishing. Its geographic location and natural
                                climate provide ideal painting conditions without the need for artificial
                                temperature or humidity control systems.
                            </p>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "24px" }}>
                                The hangar is fitted with a purpose-designed air extraction system that
                                promotes healthy airflow, captures paint particles, and treats volatile
                                organic compounds through high-grade carbon-impregnated filters —
                                keeping our environmental footprint to a minimum.
                            </p>
                            {/* Environmental badge */}
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "10px",
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                padding: "12px 18px", borderRadius: "10px",
                            }}>
                                <span style={{ fontSize: "20px" }}>🌿</span>
                                <div>
                                    <div style={{ fontSize: "12px", fontWeight: 700, color: "hsl(145,60%,55%)" }}>Environmentally Responsible</div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Compliant effluent disposal & filtered air treatment</div>
                                </div>
                            </div>
                        </div>

                        {/* Right highlight cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {[
                                { icon: "🏅", title: "EASA-Certified Hangar", desc: "Our painting facility holds full EASA certification, ensuring every project meets internationally recognised airworthiness standards." },
                                { icon: "🎯", title: "Keen Eye for Detail", desc: "Our teams inspect every surface for corrosion, cracks, and damage during the painting process — delivering first-class outcomes." },
                                { icon: "⚡", title: "Aggressive TAT Capability", desc: "Continuously optimised processes allow us to meet demanding customer turnaround timelines without compromising quality." },
                            ].map((item) => (
                                <div key={item.title} style={{
                                    display: "flex", gap: "16px",
                                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
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

                        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                            {processSteps.map((step, i) => {
                                const isHov = hoveredStep === step.step;
                                const isLast = i === processSteps.length - 1;
                                return (
                                    <div key={step.step} style={{ display: "flex", alignItems: "stretch" }}
                                        onMouseEnter={() => setHoveredStep(step.step)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                    >
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "64px", flexShrink: 0 }}>
                                            <div style={{
                                                width: "44px", height: "44px", borderRadius: "50%",
                                                background: isHov
                                                    ? "linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%))"
                                                    : "rgba(255,255,255,0.06)",
                                                border: isHov ? "1.5px solid hsl(45,100%,51%)" : "1.5px solid rgba(255,255,255,0.1)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "12px", fontWeight: 800,
                                                color: isHov ? "hsl(45,100%,65%)" : "rgba(255,255,255,0.35)",
                                                transition: "all 0.25s", flexShrink: 0, zIndex: 1,
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
                                        <div style={{ flex: 1, paddingBottom: isLast ? "0" : "28px", paddingLeft: "20px" }}>
                                            <div style={{
                                                background: isHov ? "linear-gradient(135deg, rgba(30,80,45,0.35), rgba(10,30,18,0.4))" : "transparent",
                                                border: isHov ? "1px solid rgba(145,200,130,0.15)" : "1px solid transparent",
                                                borderRadius: "12px",
                                                padding: isHov ? "18px 20px" : "4px 0",
                                                transition: "all 0.3s ease",
                                            }}>
                                                <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "6px", color: isHov ? "#fff" : "rgba(255,255,255,0.85)", transition: "color 0.2s" }}>
                                                    {step.title}
                                                </div>
                                                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{step.desc}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                                <div key={c.label} style={{
                                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: "12px", padding: "20px 18px",
                                    display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                                    transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                                    cursor: "default", textAlign: "center",
                                }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)";
                                        (e.currentTarget as HTMLDivElement).style.background = "rgba(30,80,45,0.15)";
                                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                                        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                    }}
                                >
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
                                <div key={mat.name} style={{
                                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: "12px", padding: "20px 22px",
                                    display: "flex", alignItems: "center", gap: "14px",
                                    transition: "border-color 0.2s", cursor: "default",
                                }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                                >
                                    <div style={{
                                        width: "8px", height: "8px", borderRadius: "50%",
                                        background: "hsl(45,100%,51%)", flexShrink: 0,
                                    }} />
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
                            {additionalServices.map((svc, i) => {
                                const isHov = hoveredService === svc.title;
                                return (
                                    <div key={svc.title}
                                        onMouseEnter={() => setHoveredService(svc.title)}
                                        onMouseLeave={() => setHoveredService(null)}
                                        style={{
                                            background: isHov
                                                ? "linear-gradient(135deg, rgba(30,80,45,0.45), rgba(10,30,18,0.5))"
                                                : "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                            border: isHov ? "1px solid hsl(45,100%,42%)" : "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "14px", padding: "24px 22px",
                                            transition: "all 0.28s ease",
                                            transform: isHov ? "translateY(-4px)" : "translateY(0)",
                                            position: "relative", overflow: "hidden", cursor: "default",
                                        }}
                                    >
                                        <div style={{
                                            position: "absolute", top: 0, left: "22px",
                                            width: isHov ? "40px" : "24px", height: "2px",
                                            background: isHov
                                                ? "linear-gradient(to right, hsl(145,70%,38%), hsl(45,100%,55%))"
                                                : "hsl(145,70%,28%)",
                                            transition: "width 0.3s, background 0.3s",
                                        }} />
                                        <div style={{
                                            position: "absolute", top: "16px", right: "18px",
                                            fontSize: "26px", fontWeight: 800,
                                            color: "rgba(255,255,255,0.04)", lineHeight: 1,
                                        }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </div>
                                        <div style={{
                                            width: "42px", height: "42px", borderRadius: "12px",
                                            background: isHov ? "hsl(145,70%,22%)" : "rgba(255,255,255,0.06)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "18px", marginBottom: "14px", transition: "background 0.25s",
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
                                );
                            })}
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
                                Request a Quote →
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

            </div>
        </Layout>
    );
}