import { useState } from "react";
import { motion } from "framer-motion";

const MAP_IMAGE = "/assets/world-map.webp";

// Coordinates pixel-verified by brightness-sampling the actual rendered screenshot
// Every dot confirmed on land (not ocean)
const countries = [
  {
    id: "usa",
    name: "USA",
    href: "/pilot-training/usa",
    x: 270,
    y: 210,
    trainingCenters: 8,
    flag: "🇺🇸",
    description: "New York, LA, Miami & more",
  },
  {
    id: "Camada",
    name: "Canda",
    href: "/pilot-training/Canada",
    x: 280,
    y: 170,
    trainingCenters: 8,
    flag: "🇨🇦",
    description: "British Columbia (BC): Vancouver, Victoria & more",
  },
  {
    id: "india",
    name: "India",
    href: "/pilot-training/india",
    x: 630,
    y: 250,
    trainingCenters: 16,
    flag: "🇮🇳",
    description: "Delhi, Mumbai, Bangalore & more",
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    href: "/pilot-training/sri-lanka",
    x: 635,
    y: 292,
    trainingCenters: 2,
    flag: "🇱🇰",
    description: "Colombo, Kandy",
  },
  {
    id: "maldives",
    name: "Maldives",
    href: "/pilot-training/maldives",
    x: 618,
    y: 305,
    trainingCenters: 1,
    flag: "🇲🇻",
    description: "Malé",
  },
  {
    id: "south-africa",
    name: "South Africa",
    href: "/pilot-training/south-africa",
    x: 522,
    y: 350,
    trainingCenters: 4,
    flag: "🇿🇦",
    description: "Johannesburg, Cape Town & more",
  },
  {
    id: "australia",
    name: "Australia",
    href: "/pilot-training/australia",
    x: 730,
    y: 350,
    trainingCenters: 5,
    flag: "🇦🇺",
    description: "Sydney, Melbourne, Brisbane & more",
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    href: "/pilot-training/new-zealand",
    x: 810,
    y: 390,
    trainingCenters: 3,
    flag: "🇳🇿",
    description: "Auckland, Wellington, Christchurch",
  },
];

export function WorldMapSection() {
  const [activeCountry, setActiveCountry] = useState(null);

  return (
    <section style={{
      padding: "80px 0",
      background: "linear-gradient(135deg, #020817 0%, #0a1628 50%, #060f1e 100%)",
      fontFamily: "'Sora', 'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.3) 0%, transparent 100%),
          radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.2) 0%, transparent 100%),
          radial-gradient(1px 1px at 55% 15%, rgba(255,255,255,0.25) 0%, transparent 100%),
          radial-gradient(1px 1px at 75% 45%, rgba(255,255,255,0.2) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 75%, rgba(255,255,255,0.3) 0%, transparent 100%)`,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{
            display: "inline-block", fontSize: "12px", fontWeight: 700,
            letterSpacing: "3px", textTransform: "uppercase", color: "#38bdf8",
            background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)",
            padding: "8px 20px", borderRadius: "100px", marginBottom: "20px",
          }}>
            ✈ Our Global Presence
          </span>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "#ffffff",
            margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-1px",
          }}>
            Training Centers{" "}
            <span style={{
              background: "linear-gradient(90deg, #38bdf8, #818cf8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Across the World
            </span>
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "580px", margin: "0 auto", fontSize: "17px", lineHeight: 1.7 }}>
            From the skies of India to New Zealand and beyond — we bring world-class aviation
            education to aspiring <a href="https://www.weoneaviation.com/" style={{ color: "#38bdf8", textDecoration: "underline" }}>pilots</a> on every continent.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            position: "relative", borderRadius: "20px", overflow: "hidden",
            border: "1px solid rgba(56,189,248,0.15)",
            background: "#060f1e", marginBottom: "48px",
          }}
        >
          <svg viewBox="0 0 1000 500" style={{ width: "100%", display: "block", minHeight: "300px" }}>
            <defs>
              <radialGradient id="oceanGrad" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#0c1f3a" />
                <stop offset="100%" stopColor="#060f1e" />
              </radialGradient>
              <filter id="dotGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <rect width="1000" height="500" fill="url(#oceanGrad)" />

            {/* Map image — xMidYMid meet renders as 750x500 at SVG x=125 */}
            <image
              href={MAP_IMAGE}
              x="0" y="0" width="1000" height="500"
              preserveAspectRatio="xMidYMid meet"
              opacity="0.72"
              style={{ mixBlendMode: "luminosity" }}
            />
            <rect width="1000" height="500" fill="rgba(4,12,30,0.50)" />

            {/* Grid */}
            {[100, 200, 300, 400].map(y => (
              <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(56,189,248,0.05)" strokeWidth="1" />
            ))}
            {[125, 250, 375, 500, 625, 750, 875].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="rgba(56,189,248,0.05)" strokeWidth="1" />
            ))}

            {/* Markers */}
            {countries.map((country) => {
              const isActive = activeCountry === country.id;
              const tipW = 160;
              const tipH = 58;
              const tipX = country.x > 800 ? country.x - tipW - 12 : country.x - tipW / 2;
              const tipY = country.y > 420 ? country.y - tipH - 14 : country.y - tipH - 10;

              return (
                <g
                  key={country.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setActiveCountry(country.id)}
                  onMouseLeave={() => setActiveCountry(null)}
                  onClick={() => (window.location.href = country.href)}
                >
                  <circle cx={country.x} cy={country.y} r="8" fill="none"
                    stroke={isActive ? "#38bdf8" : "#818cf8"}
                    strokeWidth={isActive ? "1.5" : "1"}>
                    <animate attributeName="r" from="8" to={isActive ? "26" : "20"}
                      dur={isActive ? "1.2s" : "2s"} repeatCount="indefinite" />
                    <animate attributeName="opacity" from={isActive ? "0.8" : "0.45"} to="0"
                      dur={isActive ? "1.2s" : "2s"} repeatCount="indefinite" />
                  </circle>
                  {isActive && (
                    <circle cx={country.x} cy={country.y} r="8" fill="none"
                      stroke="#38bdf8" strokeWidth="1" opacity="0.5">
                      <animate attributeName="r" from="14" to="34" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={country.x} cy={country.y} r={isActive ? 9 : 6}
                    fill={isActive ? "#38bdf8" : "#818cf8"}
                    filter="url(#dotGlow)"
                    style={{ transition: "all 0.25s ease" }} />
                  <circle cx={country.x} cy={country.y} r={isActive ? 4 : 2.5}
                    fill="white" style={{ transition: "all 0.25s ease" }} />

                  {isActive && (
                    <g>
                      <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="8"
                        fill="rgba(2,8,23,0.96)" stroke="rgba(56,189,248,0.55)" strokeWidth="1" />
                      <text x={tipX + tipW / 2} y={tipY + 18} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
                        {country.flag} {country.name}
                      </text>
                      <text x={tipX + tipW / 2} y={tipY + 34} textAnchor="middle" fill="#38bdf8" fontSize="10">
                        {country.trainingCenters} Training {country.trainingCenters > 1 ? "Centers" : "Center"}
                      </text>
                      <text x={tipX + tipW / 2} y={tipY + 50} textAnchor="middle" fill="#64748b" fontSize="9">
                        Click to explore →
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Country Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
          {countries.map((country, index) => {
            const isActive = activeCountry === country.id;
            return (
              <motion.a
                key={country.id}
                href={country.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                onMouseEnter={() => setActiveCountry(country.id)}
                onMouseLeave={() => setActiveCountry(null)}
                style={{
                  display: "block", padding: "20px", borderRadius: "14px",
                  border: isActive ? "1px solid rgba(56,189,248,0.6)" : "1px solid rgba(255,255,255,0.07)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(129,140,248,0.08))"
                    : "rgba(255,255,255,0.03)",
                  textDecoration: "none", transition: "all 0.3s ease",
                  transform: isActive ? "translateY(-2px)" : "none",
                  boxShadow: isActive ? "0 8px 32px rgba(56,189,248,0.15)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "28px" }}>{country.flag}</span>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>{country.name}</div>
                    <div style={{ color: "#38bdf8", fontSize: "12px", fontWeight: 600 }}>
                      {country.trainingCenters} Training {country.trainingCenters > 1 ? "Centers" : "Center"}
                    </div>
                  </div>
                </div>
                <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>{country.description}</p>
                <div style={{
                  marginTop: "12px", display: "flex", alignItems: "center", gap: "4px",
                  color: isActive ? "#38bdf8" : "#475569", fontSize: "12px", fontWeight: 600, transition: "color 0.3s",
                }}>
                  Explore Program <span style={{ fontSize: "14px" }}>→</span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px", background: "rgba(56,189,248,0.1)", borderRadius: "16px",
            overflow: "hidden", border: "1px solid rgba(56,189,248,0.1)",
          }}
        >
          {[
            { value: "7", label: "Countries" },
            { value: "41+", label: "Training Centers" },
            { value: "5000+", label: "Pilots Trained" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "28px", textAlign: "center", background: "rgba(6,15,30,0.8)" }}>
              <div style={{
                fontSize: "36px", fontWeight: 800,
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {stat.value}
              </div>
              <div style={{ color: "#64748b", fontSize: "13px", fontWeight: 500, marginTop: "4px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}