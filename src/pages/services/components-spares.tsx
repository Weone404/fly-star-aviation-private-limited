import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";

// ─── Animation Hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

function AnimatedSection({ children, delay = 0, style = {} }: {
    children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const corePromises = [
    {
        icon: "⚡",
        title: "Minimise Asset Downtime",
        desc: "Through our global partner ecosystem, we deliver rapid part ordering, turnkey shipping, and seamless logistics — getting your aircraft back in service as fast as possible.",
    },
    {
        icon: "✅",
        title: "Genuine Parts, Every Time",
        desc: "We supply only verified, authentic components — sourced directly from OEMs or our trusted third-party supplier network — at highly competitive prices.",
    },
    {
        icon: "🏆",
        title: "Uncompromising Quality",
        desc: "Every part we supply and every service we provide carries the same stamp of industry-leading workmanship and quality assurance standards.",
    },
];

const oemPartners = [
    { name: "Bell", category: "Rotorcraft" },
    { name: "Leonardo", category: "Rotorcraft" },
    { name: "Dassault", category: "Business Jet" },
    { name: "Gulfstream", category: "Business Jet" },
    { name: "Textron Aviation", category: "Multi-platform" },
    { name: "Embraer", category: "Regional & Business" },
    { name: "Honda Jets", category: "Business Jet" },
    { name: "Honeywell", category: "Avionics & Engines" },
    { name: "Collins Aerospace", category: "Avionics & Systems" },
    { name: "Williams Engines", category: "Propulsion" },
];

const logisticsFeatures = [
    { icon: "✈️", title: "Air Freight", desc: "Priority air freight arrangements for time-critical component deliveries across domestic and international routes." },
    { icon: "🚚", title: "Land Transport", desc: "Reliable road distribution for non-urgent shipments and bulk consumables across our nationwide service points." },
    { icon: "📦", title: "Courier Services", desc: "Express courier dispatch for small components and documentation, with full tracking and proof of delivery." },
    { icon: "🛩️", title: "Air Charter", desc: "Dedicated air charter capability for critical AOG situations where standard freight timelines are not acceptable." },
    { icon: "☢️", title: "Dangerous Goods", desc: "Certified handling, packaging, and shipment of Dangerous Goods (DG) in full compliance with IATA regulations." },
    { icon: "🌐", title: "Global Network", desc: "International logistics coverage through established partnerships — supporting your operations wherever they are based." },
];

const inventoryHighlights = [
    "Ready-to-deploy inventory of high-demand aircraft parts",
    "Comprehensive warranties on all supplied components",
    "Full range of consumables and expendables in stock",
    "Competitive price advantage through direct OEM relationships",
    "ASA-approved supply chain for business aviation",
    "Proprietary ERP and Warehouse Management Systems",
];

const stats = [
    { value: "24/7", label: "AOG Helpdesk", sub: "Round-the-clock, 365 days a year" },
    { value: "Global", label: "Logistics Network", sub: "International freight & clearance" },
    { value: "OEM", label: "Authorised Supplier", sub: "Direct manufacturer relationships" },
    { value: "ASA", label: "Approved Organisation", sub: "Business aviation supply chain" },
];

const breadcrumbs = ["Home", "Our Services", "Components & Spares"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoldDivider({ label = "FLY SPACE Supply" }: { label?: string }) {
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComponentsAndSpares() {
    const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
    const [hoveredLogistic, setHoveredLogistic] = useState<string | null>(null);

    return (
        <Layout>
            <div style={{ fontFamily: "'Poppins', sans-serif", background: "hsl(150,30%,5%)", minHeight: "100vh", color: "#fff" }}>

                {/* ── Hero ── */}
                <div style={{
                    position: "relative", padding: "80px 6% 76px", overflow: "hidden",
                    background: "linear-gradient(135deg, hsl(145,80%,9%) 0%, hsl(145,65%,6%) 55%, hsl(200,55%,8%) 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                    {/* Decorative background */}
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                        {[...Array(7)].map((_, i) => (
                            <div key={i} style={{
                                position: "absolute", top: 0, bottom: 0, left: `${6 + i * 14}%`,
                                width: "1px", background: "rgba(255,255,255,0.022)", transform: "skewX(-12deg)",
                            }} />
                        ))}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
                            background: "linear-gradient(to right, transparent, hsl(145,70%,25%), hsl(45,100%,51%), hsl(145,70%,25%), transparent)",
                            animation: "pulseGold 3s ease-in-out infinite",
                        }} />
                        <div style={{
                            position: "absolute", right: "-6%", top: "-20%", width: "500px", height: "500px",
                            borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)",
                            animation: "slowSpin 45s linear infinite",
                        }} />
                        <div style={{
                            position: "absolute", right: "4%", top: "8%", width: "290px", height: "290px",
                            borderRadius: "50%", border: "1px solid rgba(255,255,255,0.025)",
                            animation: "slowSpin 30s linear infinite reverse",
                        }} />
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
                            🔩 Components &amp; Spares
                        </div>

                        <h1 style={{
                            fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 800,
                            lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: "12px",
                            animation: "fadeUp 0.7s ease 0.2s forwards", opacity: 0,
                        }}>
                            The Right Part,
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>
                                Right When You Need It
                            </span>
                        </h1>

                        <p style={{
                            fontSize: "13px", fontWeight: 600, letterSpacing: "3px",
                            textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "20px",
                            animation: "fadeUp 0.7s ease 0.3s forwards", opacity: 0,
                        }}>
                            Assuring your flight with the right parts, wherever you are
                        </p>

                        <p style={{
                            fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.6)",
                            maxWidth: "620px", marginBottom: "38px",
                            animation: "fadeUp 0.7s ease 0.35s forwards", opacity: 0,
                        }}>
                            We maintain deep, long-standing relationships with a global ecosystem of
                            leading parts suppliers, distributors, and OEMs — built over decades of
                            aviation support. Whether you operate commercial, business, or defence
                            platforms, our network delivers reliable, genuine parts with speed, wherever
                            you are based.
                        </p>

                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.45s forwards", opacity: 0 }}>
                            <button
                                style={{
                                    padding: "15px 40px", borderRadius: "10px",
                                    background: "linear-gradient(135deg, hsl(145,70%,22%), hsl(145,80%,16%))",
                                    border: "1px solid hsl(145,70%,30%)", color: "#fff",
                                    fontSize: "14px", fontWeight: 700, cursor: "pointer",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.35)", transition: "all 0.25s ease", letterSpacing: "0.5px",
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
                                Request Parts →
                            </button>
                            <button
                                style={{
                                    padding: "15px 28px", borderRadius: "10px", background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)",
                                    fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
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
                                AOG Helpdesk
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
                                    padding: "30px 24px",
                                    borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                    display: "flex", flexDirection: "column", gap: "5px",
                                }}>
                                    <div style={{
                                        fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.1,
                                        background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,55%))",
                                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                    }}>{s.value}</div>
                                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{s.label}</div>
                                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{s.sub}</div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>

                {/* ── Core Promises ── */}
                <div style={{ padding: "68px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <AnimatedSection>
                            <GoldDivider label="Our Commitment" />
                            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "12px" }}>
                                Three Promises We Never Compromise On
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "520px", marginBottom: "44px" }}>
                                Regardless of platform, location, or urgency — these principles drive
                                every component and spares interaction we have with our customers.
                            </p>
                        </AnimatedSection>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                            {corePromises.map((p, i) => (
                                <AnimatedSection key={p.title} delay={i * 0.12}>
                                    <div style={{
                                        background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                        border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "30px 26px",
                                        position: "relative", overflow: "hidden",
                                        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
                                    }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)";
                                            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                                            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                                            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                                        }}
                                    >
                                        <div style={{ position: "absolute", top: 0, left: "26px", width: "32px", height: "2px", background: "linear-gradient(to right, hsl(145,70%,35%), hsl(45,100%,51%))" }} />
                                        <div style={{
                                            width: "50px", height: "50px", borderRadius: "14px",
                                            background: "hsl(145,70%,22%)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "22px", marginBottom: "18px",
                                        }}>
                                            {p.icon}
                                        </div>
                                        <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "10px" }}>{p.title}</div>
                                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{p.desc}</div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── OEM & Partner Network ── */}
                <div style={{ padding: "68px 6%", background: "hsl(150,28%,6%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <AnimatedSection>
                            <GoldDivider label="Our Partners" />
                            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "12px" }}>
                                Authorised Service Facility &amp; Channel Partnerships
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "580px", marginBottom: "44px" }}>
                                As an authorised Customer Service Facility and channel partner for some
                                of the world's most respected aviation manufacturers, we provide direct
                                access to genuine OEM parts, technical support, and warranty coverage.
                            </p>
                        </AnimatedSection>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "14px" }}>
                            {oemPartners.map((partner, i) => {
                                const isHov = hoveredPartner === partner.name;
                                return (
                                    <AnimatedSection key={partner.name} delay={Math.min(i * 0.06, 0.45)}>
                                        <div
                                            onMouseEnter={() => setHoveredPartner(partner.name)}
                                            onMouseLeave={() => setHoveredPartner(null)}
                                            style={{
                                                background: isHov
                                                    ? "linear-gradient(135deg, rgba(30,80,45,0.45), rgba(10,30,18,0.5))"
                                                    : "rgba(255,255,255,0.03)",
                                                border: isHov ? "1px solid hsl(45,100%,45%)" : "1px solid rgba(255,255,255,0.07)",
                                                borderRadius: "12px", padding: "18px 16px",
                                                transition: "all 0.25s ease",
                                                transform: isHov ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                                                cursor: "default",
                                                display: "flex", flexDirection: "column", gap: "6px",
                                            }}
                                        >
                                            <div style={{
                                                width: "8px", height: "8px", borderRadius: "50%",
                                                background: isHov ? "hsl(45,100%,51%)" : "hsl(145,60%,35%)",
                                                transition: "background 0.2s",
                                            }} />
                                            <div style={{ fontSize: "14px", fontWeight: 700, color: isHov ? "#fff" : "rgba(255,255,255,0.85)", transition: "color 0.2s" }}>
                                                {partner.name}
                                            </div>
                                            <div style={{
                                                fontSize: "11px", fontWeight: 600,
                                                color: isHov ? "hsl(45,100%,60%)" : "rgba(255,255,255,0.35)",
                                                letterSpacing: "0.5px", transition: "color 0.2s",
                                            }}>
                                                {partner.category}
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Inventory Highlights ── */}
                <div style={{ padding: "68px 6%", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "56px", alignItems: "center",
                    }}>
                        <AnimatedSection>
                            <GoldDivider label="Our Inventory" />
                            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "20px" }}>
                                Ready-to-Deploy Stock, Backed by Quality Assurance
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: "20px" }}>
                                We maintain a continuously refreshed inventory of high-demand aircraft
                                components, consumables, and expendables — all sourced through authorised
                                channels and backed by manufacturer warranties and competitive pricing.
                            </p>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.85 }}>
                                Our proprietary ERP and Warehouse Management Systems give us real-time
                                visibility over stock levels, ensuring that when you need a part urgently,
                                we can locate, pick, and ship with minimal delay.
                            </p>
                        </AnimatedSection>

                        <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                            {inventoryHighlights.map((item, i) => (
                                <AnimatedSection key={item} delay={i * 0.08}>
                                    <div style={{
                                        display: "flex", alignItems: "flex-start", gap: "12px",
                                        padding: "13px 16px",
                                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                                        borderRadius: "10px",
                                        transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                                    }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "hsl(145,70%,28%)";
                                            (e.currentTarget as HTMLDivElement).style.background = "rgba(30,80,45,0.12)";
                                            (e.currentTarget as HTMLDivElement).style.transform = "translateX(5px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                                            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                                            (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
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

                {/* ── Logistics Network ── */}
                <div style={{ padding: "68px 6%", background: "hsl(150,28%,6%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <AnimatedSection>
                            <GoldDivider label="Logistics" />
                            <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "12px" }}>
                                End-to-End Logistics, Wherever You Fly
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "580px", marginBottom: "48px" }}>
                                Our in-house global logistics team operates around the clock, supported
                                by priority freight, distribution, and customs clearance arrangements
                                with trusted domestic and international partners.
                            </p>
                        </AnimatedSection>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
                            {logisticsFeatures.map((feat, i) => {
                                const isHov = hoveredLogistic === feat.title;
                                return (
                                    <AnimatedSection key={feat.title} delay={Math.min(i * 0.08, 0.4)}>
                                        <div
                                            onMouseEnter={() => setHoveredLogistic(feat.title)}
                                            onMouseLeave={() => setHoveredLogistic(null)}
                                            style={{
                                                background: isHov
                                                    ? "linear-gradient(135deg, rgba(30,80,45,0.45), rgba(10,30,18,0.5))"
                                                    : "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                                border: isHov ? "1px solid hsl(45,100%,42%)" : "1px solid rgba(255,255,255,0.08)",
                                                borderRadius: "14px", padding: "24px 22px",
                                                transition: "all 0.28s ease",
                                                transform: isHov ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
                                                position: "relative", overflow: "hidden", cursor: "default",
                                                boxShadow: isHov ? "0 12px 32px rgba(0,0,0,0.28)" : "none",
                                            }}
                                        >
                                            <div style={{
                                                position: "absolute", top: 0, left: "22px",
                                                width: isHov ? "42px" : "24px", height: "2px",
                                                background: isHov
                                                    ? "linear-gradient(to right, hsl(145,70%,38%), hsl(45,100%,55%))"
                                                    : "hsl(145,70%,28%)",
                                                transition: "width 0.35s, background 0.35s",
                                            }} />
                                            <div style={{
                                                width: "44px", height: "44px", borderRadius: "12px",
                                                background: isHov ? "hsl(145,70%,22%)" : "rgba(255,255,255,0.06)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "20px", marginBottom: "14px",
                                                transition: "background 0.25s, transform 0.25s",
                                                transform: isHov ? "rotate(-5deg) scale(1.1)" : "rotate(0) scale(1)",
                                            }}>
                                                {feat.icon}
                                            </div>
                                            <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px", color: isHov ? "#fff" : "rgba(255,255,255,0.88)", transition: "color 0.2s" }}>
                                                {feat.title}
                                            </div>
                                            <div style={{ fontSize: "13px", color: isHov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.42)", lineHeight: 1.65, transition: "color 0.2s" }}>
                                                {feat.desc}
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── AOG Helpdesk Banner ── */}
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
                            width: "60px", height: "60px", borderRadius: "16px", background: "hsl(145,70%,22%)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "28px", flexShrink: 0,
                        }}>
                            🚨
                        </div>
                        <div style={{ flex: 1, minWidth: "240px" }}>
                            <div style={{ fontSize: "18px", fontWeight: 800, marginBottom: "6px" }}>
                                AOG Helpdesk — Available 24/7, Every Day of the Year
                            </div>
                            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                                Aircraft-on-Ground situations demand immediate action. Our dedicated AOG
                                helpdesk is staffed around the clock to source, ship, and deliver critical
                                parts at the fastest possible speed — minimising your downtime and
                                protecting your operational schedule.
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

                {/* ── Bottom CTA ── */}
                <AnimatedSection>
                    <div style={{
                        background: "linear-gradient(135deg, hsl(145,80%,10%) 0%, hsl(145,60%,7%) 100%)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        padding: "60px 6%", textAlign: "center",
                        position: "relative", overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "580px", height: "580px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", animation: "slowSpin 50s linear infinite" }} />
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
                                Get the Parts You Need
                            </div>
                            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: "16px" }}>
                                Never Be Grounded
                                <br />
                                <span style={{
                                    background: "linear-gradient(90deg, hsl(145,60%,48%), hsl(45,100%,58%))",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                }}>
                                    for Lack of the Right Part
                                </span>
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto 36px" }}>
                                Speak with our components team today. We'll source, supply, and
                                deliver what you need — fast, genuine, and cost-effective.
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
                                    Request Parts →
                                </button>
                                <button
                                    style={{
                                        padding: "16px 32px", borderRadius: "10px", background: "transparent",
                                        border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)",
                                        fontSize: "15px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
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

                {/* ── Keyframes ── */}
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
            50%       { box-shadow: 0 0 28px rgba(255,200,50,0.07); }
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