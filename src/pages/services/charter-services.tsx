import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";

const aircrafts = [
    {
        name: "King Air B200",
        category: "Turboprop",
        image: "/king_air_b200.jpeg",
        specs: "King Air B200 is a twin-engine turboprop aircraft known for reliability and versatility. It's commonly used for business travel, air ambulance, and government missions.",
        capacity: "6–9",
        range: "1,800 NM",
        speed: "280 knots",
        runway: "Short Runway",
    },
    {
        name: "King Air C-90",
        category: "Turboprop",
        image: "/king_air_c_90.jpeg",
        specs: "King Air C90 is a light twin-engine turboprop aircraft known for efficiency, reliability, and short-runway performance. Widely used for business travel, charter, and training.",
        capacity: "5–7",
        range: "1,200 NM",
        speed: "250 knots",
        runway: "Short Runway",
    },
    {
        name: "King Air B-350",
        category: "Turboprop",
        image: "/king_air_b_350.jpeg",
        specs: "King Air B350 is a large, twin-engine turboprop known for comfort, long range, and strong performance. Used for business aviation, air ambulance, and government operations.",
        capacity: "8–11",
        range: "1,800 NM",
        speed: "312 knots",
        runway: "Short Runway",
    },
    {
        name: "Learjet 45",
        category: "Light Jet",
        image: "/learjet_45.jpeg",
        specs: "Learjet 45 is a light business jet offering high cruise speed and efficient performance, suitable for short to mid-range routes. Valued for smooth handling and quick climb capability.",
        capacity: "7–9",
        range: "2,000 NM",
        speed: "465 knots",
        runway: "Standard",
    },
    {
        name: "Phenom 100",
        category: "Very Light Jet",
        image: "/phenom_100.jpeg",
        specs: "Phenom 100 is a modern very light jet designed for short-haul travel with low operating costs. Features advanced avionics and a comfortable cabin for regional business trips.",
        capacity: "4–6",
        range: "1,178 NM",
        speed: "390 knots",
        runway: "Short Runway",
    },
    {
        name: "Premier 1A",
        category: "Light Jet",
        image: "/premier_1A.jpeg",
        specs: "Premier 1A is a fast light jet with one of the widest cabins in its class. Commonly used for corporate and charter flying, offering a great balance of speed and cabin comfort.",
        capacity: "6–7",
        range: "1,500 NM",
        speed: "461 knots",
        runway: "Standard",
    },
    {
        name: "Pilatus PC 12/47",
        category: "Turboprop",
        image: "/pilatus_pc_1247.jpeg",
        specs: "Pilatus PC-12/47 is a highly versatile single-engine turboprop known for short and unpaved runway operations. Used for business travel, cargo transport, and air ambulance missions.",
        capacity: "6–9",
        range: "1,800 NM",
        speed: "270 knots",
        runway: "Unpaved OK",
    },
    {
        name: "CRJ 100",
        category: "Regional Jet",
        image: "/crj_100.jpeg",
        specs: "CRJ 100 is a regional jet aircraft designed for airline operations, typically configured for 50 passengers. Optimized for short-haul commercial routes with high reliability.",
        capacity: "50",
        range: "1,340 NM",
        speed: "464 knots",
        runway: "Standard",
    },
    {
        name: "Citation 560XLS",
        category: "Midsize Jet",
        image: "/citation_560_xls.jpeg",
        specs: "Citation 560 XLS is a popular mid-size business jet offering excellent range, fuel efficiency, and passenger comfort. Features a stand-up cabin, widely used for corporate flights.",
        capacity: "7–9",
        range: "2,100 NM",
        speed: "441 knots",
        runway: "Standard",
    },
    {
        name: "Challenger 604",
        category: "Large Jet",
        image: "/challenger_604.jpeg",
        specs: "Challenger 604 is a large-cabin, long-range jet designed for intercontinental travel. Offers a spacious, quiet cabin and is commonly used for VIP and government missions.",
        capacity: "10–19",
        range: "4,077 NM",
        speed: "459 knots",
        runway: "Standard",
    },
    {
        name: "Hawker 750 / 850 / 900",
        category: "Midsize Jet",
        image: "/Hawker_750_850_900.jpeg",
        specs: "Hawker 750/850/900 family consists of mid-size business jets known for solid performance, dependable systems, and comfortable cabins for regional and continental routes.",
        capacity: "8–9",
        range: "2,800 NM",
        speed: "447 knots",
        runway: "Standard",
    },
    {
        name: "Air Ambulance",
        category: "Medical",
        image: "/air_ambulance.jpeg",
        specs: "Air Ambulance aircraft are specially equipped for medical evacuation and patient transfer, fitted with stretchers, oxygen systems, monitors, and life-support equipment with trained medical staff.",
        capacity: "1–2 patients",
        range: "Varies",
        speed: "Varies",
        runway: "Any Terrain",
    },
];

const categoryColors: Record<string, string> = {
    Turboprop: "hsl(145, 70%, 22%)",
    "Light Jet": "hsl(200, 80%, 35%)",
    "Very Light Jet": "hsl(200, 80%, 45%)",
    "Regional Jet": "hsl(160, 60%, 28%)",
    "Midsize Jet": "hsl(170, 65%, 25%)",
    "Large Jet": "hsl(145, 80%, 18%)",
    Medical: "hsl(0, 72%, 40%)",
};

export default function AircraftShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // ✅ THE FIX: ref always holds the latest index so the interval never has a stale closure
    const activeIndexRef = useRef(0);
    activeIndexRef.current = activeIndex;

    const aircraft = aircrafts[activeIndex];

    const startAutoplay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => {
            // Reads activeIndexRef.current — always the latest, never stale
            setActiveIndex((activeIndexRef.current + 1) % aircrafts.length);
        }, 7000);
    };

    // Mount once — interval always reads the latest index via ref
    useEffect(() => {
        startAutoplay();
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, []);

    const handleManualNav = (index: number) => {
        setActiveIndex(index);
        startAutoplay(); // reset 7s countdown after manual click
    };

    return (
        <Layout>


            <div
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    width: "100%",
                    background: "hsl(150, 30%, 5%)",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* ── Main Showcase ── */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "560px",
                        overflow: "hidden",
                        flexShrink: 0,
                    }}
                >
                    {/* Background image — key forces remount & re-animation on every slide */}
                    <div
                        key={`bg-${activeIndex}`}
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${aircraft.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center 60%",
                            animation: "bgZoom 7s ease-out forwards",
                        }}
                    />

                    {/* Gradient overlays */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(10,25,15,0.95) 0%, transparent 55%)",
                        }}
                    />

                    {/* Top accent line */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            background:
                                "linear-gradient(to right, hsl(145,70%,22%), hsl(45,100%,51%), hsl(145,70%,22%))",
                        }}
                    />

                    {/* Info panel — key forces re-animation on every slide change */}
                    <div
                        key={`info-${activeIndex}`}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "5%",
                            transform: "translateY(-50%)",
                            maxWidth: "480px",
                            zIndex: 10,
                        }}
                    >
                        {/* Category badge */}
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                background: categoryColors[aircraft.category] ?? "hsl(145,70%,22%)",
                                color: "#fff",
                                padding: "4px 14px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "1.5px",
                                textTransform: "uppercase",
                                marginBottom: "14px",
                                animation: "fadeUp 0.5s ease forwards",
                                opacity: 0,
                                animationDelay: "0.1s",
                            }}
                        >
                            ✈ {aircraft.category}
                        </div>

                        {/* Name */}
                        <h1
                            style={{
                                color: "#fff",
                                fontSize: "clamp(28px, 4vw, 52px)",
                                fontWeight: 800,
                                lineHeight: 1.1,
                                marginBottom: "14px",
                                letterSpacing: "-1px",
                                animation: "fadeUp 0.55s ease forwards",
                                opacity: 0,
                                animationDelay: "0.2s",
                            }}
                        >
                            {aircraft.name}
                        </h1>

                        {/* Divider */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "16px",
                                animation: "fadeUp 0.6s ease forwards",
                                opacity: 0,
                                animationDelay: "0.3s",
                            }}
                        >
                            <div style={{ width: "40px", height: "2px", background: "hsl(45,100%,51%)" }} />
                            <span
                                style={{
                                    color: "rgba(255,255,255,0.5)",
                                    fontSize: "11px",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                }}
                            >
                                Fleet Details
                            </span>
                        </div>

                        {/* Specs description */}
                        <p
                            style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "14px",
                                lineHeight: 1.7,
                                marginBottom: "22px",
                                animation: "fadeUp 0.65s ease forwards",
                                opacity: 0,
                                animationDelay: "0.35s",
                            }}
                        >
                            {aircraft.specs}
                        </p>

                        {/* Specs grid */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "10px",
                                animation: "fadeUp 0.7s ease forwards",
                                opacity: 0,
                                animationDelay: "0.45s",
                            }}
                        >
                            {[
                                { label: "Capacity", value: aircraft.capacity + " pax", icon: "👥" },
                                { label: "Range", value: aircraft.range, icon: "🗺️" },
                                { label: "Cruise Speed", value: aircraft.speed, icon: "💨" },
                                { label: "Runway", value: aircraft.runway, icon: "🛬" },
                            ].map((spec) => (
                                <div
                                    key={spec.label}
                                    style={{
                                        background: "rgba(255,255,255,0.07)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "10px",
                                        padding: "10px 14px",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "10px",
                                            color: "rgba(255,255,255,0.5)",
                                            letterSpacing: "1px",
                                            textTransform: "uppercase",
                                            marginBottom: "3px",
                                        }}
                                    >
                                        {spec.icon} {spec.label}
                                    </div>
                                    <div style={{ color: "hsl(45,100%,70%)", fontWeight: 700, fontSize: "14px" }}>
                                        {spec.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress bar — key forces restart on every slide */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "90px",
                            left: "5%",
                            right: "5%",
                            height: "2px",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "2px",
                            overflow: "hidden",
                            zIndex: 10,
                        }}
                    >
                        <div
                            key={`progress-${activeIndex}`}
                            style={{
                                height: "100%",
                                background: "linear-gradient(to right, hsl(145,70%,45%), hsl(45,100%,51%))",
                                animation: "progress 7s linear forwards",
                                width: "0%",
                            }}
                        />
                    </div>

                    {/* Slide counter */}
                    <div
                        style={{
                            position: "absolute",
                            top: "24px",
                            right: "5%",
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "13px",
                            fontWeight: 600,
                            letterSpacing: "2px",
                            zIndex: 10,
                        }}
                    >
                        <span style={{ color: "hsl(45,100%,60%)", fontSize: "20px", fontWeight: 800 }}>
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>{" "}
                        / {String(aircrafts.length).padStart(2, "0")}
                    </div>

                    {/* Prev / Next arrows */}
                    {[
                        {
                            dir: "prev",
                            symbol: "‹",
                            onClick: () =>
                                handleManualNav(
                                    (activeIndexRef.current - 1 + aircrafts.length) % aircrafts.length
                                ),
                        },
                        {
                            dir: "next",
                            symbol: "›",
                            onClick: () =>
                                handleManualNav((activeIndexRef.current + 1) % aircrafts.length),
                        },
                    ].map(({ dir, symbol, onClick }) => (
                        <button
                            key={dir}
                            onClick={onClick}
                            style={{
                                position: "absolute",
                                bottom: "115px",
                                right: dir === "next" ? "5%" : "calc(5% + 54px)",
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                border: "1px solid rgba(255,255,255,0.2)",
                                background: "rgba(255,255,255,0.07)",
                                color: "#fff",
                                fontSize: "24px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backdropFilter: "blur(8px)",
                                transition: "all 0.2s",
                                zIndex: 10,
                                lineHeight: 1,
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "hsl(145,70%,22%)";
                                (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(145,70%,22%)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
                                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
                            }}
                        >
                            {symbol}
                        </button>
                    ))}
                </div>

                {/* ── Thumbnail Strip ── */}
                <div
                    ref={sliderRef}
                    style={{
                        background: "hsl(150,25%,8%)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        padding: "18px 20px",
                        overflowX: "auto",
                        flexShrink: 0,
                        scrollbarWidth: "none",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            minWidth: "max-content",
                            justifyContent: "center",
                        }}
                    >
                        {aircrafts.map((ac, i) => (
                            <button
                                key={ac.name}
                                onClick={() => handleManualNav(i)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "12px 14px",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    border:
                                        i === activeIndex
                                            ? "1px solid hsl(45,100%,51%)"
                                            : "1px solid rgba(255,255,255,0.07)",
                                    background:
                                        i === activeIndex
                                            ? "rgba(145,200,130,0.12)"
                                            : "rgba(255,255,255,0.03)",
                                    transition: "all 0.3s ease",
                                    minWidth: "100px",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        width: "80px",
                                        height: "52px",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        background: "rgba(0,0,0,0.4)",
                                        flexShrink: 0,
                                    }}
                                >
                                    <img
                                        src={ac.image}
                                        alt={ac.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            filter:
                                                i === activeIndex
                                                    ? "brightness(1)"
                                                    : "brightness(0.55) grayscale(0.4)",
                                            transition: "filter 0.3s ease",
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                </div>

                                <span
                                    style={{
                                        color: i === activeIndex ? "hsl(45,100%,65%)" : "rgba(255,255,255,0.5)",
                                        fontSize: "11px",
                                        fontWeight: i === activeIndex ? 700 : 400,
                                        textAlign: "center",
                                        lineHeight: 1.3,
                                        whiteSpace: "nowrap",
                                        maxWidth: "90px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        transition: "color 0.3s",
                                    }}
                                >
                                    {ac.name}
                                </span>

                                {i === activeIndex && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "6px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: "20px",
                                            height: "2px",
                                            borderRadius: "2px",
                                            background: "hsl(45,100%,51%)",
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Keyframes */}
                <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes bgZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1);    }
        }
        @keyframes progress {
          from { width: 0%;   }
          to   { width: 100%; }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>
            </div>
        </Layout>
    );
}