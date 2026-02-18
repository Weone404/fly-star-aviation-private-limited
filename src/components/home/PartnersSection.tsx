import { motion } from "framer-motion";
import airIndiaLogo from "../../../public/assets/air-india-logo.png";
import airIndiaExpressLogo from "../../../public/assets/Air-india-express-logo.png";
import indigoLogo from "../../../public/assets/indigo.png";
import spicejetLogo from "../../../public/assets/SpiceJet-Logo.webp";
import starAirLogo from "../../../public/assets/star-air-logo.webp";

const partners = [
  { name: "Air India", logo: airIndiaLogo },
  { name: "Air India Express", logo: airIndiaExpressLogo },
  { name: "IndiGo", logo: indigoLogo },
  { name: "SpiceJet", logo: spicejetLogo },
  { name: "Star Air", logo: starAirLogo },
  { name: "Fly Big", logo: "" },
  { name: "Jet Airways", logo: "" },
  { name: "Red Bird", logo: "" },
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
