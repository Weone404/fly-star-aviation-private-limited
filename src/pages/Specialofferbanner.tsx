import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpecialOfferBanner: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                // ✅ Fixed: floats on every page, below navbar
                position: "fixed",
                top: "130px",        // adjust if your navbar height differs
                right: "0px",       // flush to right edge
                zIndex: 999,

                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(60px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                display: "inline-flex",
                flexDirection: "column",
                borderRadius: "10px 0 0 10px",  // right side flush to screen
                overflow: "hidden",
                boxShadow: "-4px 8px 32px rgba(0,0,0,0.45)",
                fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif",
                minWidth: "280px",
                maxWidth: "320px",
                border: "2px solid #f5c800",
                borderRight: "none",
                cursor: "pointer",
            }}
            onClick={() => navigate("/contact")}
        >
            {/* Top badge row */}
            <div
                style={{
                    background: "linear-gradient(90deg, #f5c800 0%, #f0a800 100%)",
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                {/* Badge */}
                <div
                    style={{
                        background: "#1a2a1a",
                        color: "#f5c800",
                        fontWeight: 900,
                        fontSize: "11px",
                        lineHeight: 1.2,
                        padding: "6px 10px",
                        borderRadius: "6px",
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        border: "2px solid #f5c800",
                        flexShrink: 0,
                    }}
                >
                    <div style={{ fontSize: "13px" }}>SPECIAL</div>
                    <div>OFFER!</div>
                    <div
                        style={{
                            color: "#fff",
                            fontSize: "9px",
                            fontWeight: 700,
                            marginTop: "2px",
                            background: "#c0392b",
                            borderRadius: "3px",
                            padding: "1px 4px",
                        }}
                    >
                        LIMITED SEATS
                    </div>
                </div>

                {/* Headline */}
                <div style={{ color: "#1a2a1a" }}>
                    <div
                        style={{
                            fontSize: "14px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 1.2,
                            letterSpacing: "0.3px",
                        }}
                    >
                        COMPLETE CPL
                    </div>
                    <div
                        style={{
                            fontSize: "14px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 1.2,
                        }}
                    >
                        TRAINING AT JUST
                    </div>
                </div>
            </div>

            {/* Price row */}
            <div
                style={{
                    background: "linear-gradient(135deg, #1a2a1a 0%, #0d1f0d 100%)",
                    padding: "12px 16px 10px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "200px",
                        height: "60px",
                        background: "radial-gradient(ellipse, rgba(245,200,0,0.15) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        color: "#f5c800",
                        fontSize: "38px",
                        fontWeight: 900,
                        letterSpacing: "-1px",
                        lineHeight: 1,
                        textShadow: "0 0 20px rgba(245,200,0,0.4)",
                    }}
                >
                    $35,000
                </div>
                <div
                    style={{
                        color: "#ccc",
                        fontSize: "12px",
                        marginTop: "6px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: 400,
                    }}
                >
                    (Approx. ₹29–32 Lakhs*)
                </div>
            </div>
        </div>
    );
};

export default SpecialOfferBanner;

/*
  ─────────────────────────────────────────────
  HOW TO USE IN YOUR HERO SECTION
  ─────────────────────────────────────────────

  Your hero section likely looks something like this:

    <section className="hero" style={{ position: "relative" }}>
      ...hero content (left side)...

      // Place this in the top-right area (where the red box is):
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
      }}>
        <SpecialOfferBanner />
      </div>
    </section>

  If your hero uses Tailwind CSS, use:

    <div className="absolute top-5 right-5">
      <SpecialOfferBanner />
    </div>

  Make sure the parent hero section has:
    position: relative  (or Tailwind: className="relative")
  ─────────────────────────────────────────────
*/