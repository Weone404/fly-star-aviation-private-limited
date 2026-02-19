import { motion } from "framer-motion";

const partners = [
  { name: "Air India", logo: "/assets/air-india-logo.png" },
  { name: "Air India Express", logo: "/assets/Air-india-express-logo.png" },
  { name: "IndiGo", logo: "/assets/indigo.png" },
  { name: "SpiceJet", logo: "/assets/SpiceJet-Logo.webp" },
  { name: "Star Air", logo: "/assets/star-air-logo.webp" },
  { name: "Fly Big", logo: "/assets/flybig_logo.webp" },
  { name: "Jet Airways", logo: "/assets/jet_airways_logo.webp" },
  { name: "Red Bird", logo: "/assets/redbird_logo.webp" },
];

export function PartnersSection() {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-xl font-semibold text-muted-foreground">
            Trusted by India's Leading Airlines & Organizations
          </h3>
        </motion.div>

        {/* Marquee Animation */}
        <div className="relative">
          <div className="flex animate-marquee gap-12">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center bg-background rounded-xl px-8 py-4 shadow-card min-w-[160px] h-20"
              >
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="max-h-16 max-w-40 object-contain" />
                ) : (
                  <span className="font-bold text-lg text-muted-foreground text-center">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
