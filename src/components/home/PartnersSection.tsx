import { motion } from "framer-motion";

const partners = [
  { name: "DGCA India", logo: "DGCA" },
  { name: "Air India", logo: "Air India" },
  { name: "IndiGo", logo: "IndiGo" },
  { name: "Vistara", logo: "Vistara" },
  { name: "SpiceJet", logo: "SpiceJet" },
  { name: "GoAir", logo: "GoAir" },
  { name: "AirAsia", logo: "AirAsia" },
  { name: "IATA", logo: "IATA" },
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
                className="flex-shrink-0 flex items-center justify-center bg-background rounded-xl px-8 py-4 shadow-card min-w-[160px]"
              >
                <span className="font-bold text-lg text-muted-foreground">{partner.logo}</span>
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
