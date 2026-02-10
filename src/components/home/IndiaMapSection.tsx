import { useState } from "react";
import { motion } from "framer-motion";

const states = [
  { id: "delhi", name: "Delhi", x: 195, y: 130, trainingCenters: 3 },
  { id: "mumbai", name: "Mumbai", x: 115, y: 280, trainingCenters: 2 },
  { id: "bangalore", name: "Bangalore", x: 160, y: 380, trainingCenters: 4 },
  { id: "hyderabad", name: "Hyderabad", x: 180, y: 310, trainingCenters: 2 },
  { id: "chennai", name: "Chennai", x: 210, y: 390, trainingCenters: 1 },
  { id: "kolkata", name: "Kolkata", x: 310, y: 210, trainingCenters: 2 },
  { id: "lucknow", name: "Lucknow", x: 230, y: 170, trainingCenters: 1 },
  { id: "pune", name: "Pune", x: 130, y: 300, trainingCenters: 1 },
];

export function IndiaMapSection() {
  const [activeState, setActiveState] = useState<string | null>(null);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            Our Presence
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Training Centers Across India
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            With training facilities in major cities, we make quality aviation education accessible to aspiring pilots nationwide.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md"
          >
            <svg viewBox="0 0 400 500" className="w-full">
              {/* Simplified India outline */}
              <path
                d="M180 40 L220 35 L250 45 L280 60 L310 80 L340 120 L350 160 L345 200 L330 240 L310 280 L290 320 L270 360 L250 400 L220 440 L180 470 L140 450 L100 420 L80 380 L70 340 L60 300 L70 260 L80 220 L90 180 L110 140 L130 100 L150 60 Z"
                fill="hsl(var(--secondary))"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="transition-all duration-300"
              />
              
              {/* State markers */}
              {states.map((state) => (
                <motion.g
                  key={state.id}
                  onMouseEnter={() => setActiveState(state.id)}
                  onMouseLeave={() => setActiveState(null)}
                  className="cursor-pointer"
                >
                  <motion.circle
                    cx={state.x}
                    cy={state.y}
                    r={activeState === state.id ? 12 : 8}
                    fill={activeState === state.id ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                    className="transition-all duration-300"
                    animate={{
                      scale: activeState === state.id ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ repeat: activeState === state.id ? Infinity : 0, duration: 1 }}
                  />
                  {activeState === state.id && (
                    <motion.g
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <rect
                        x={state.x - 50}
                        y={state.y - 55}
                        width={100}
                        height={40}
                        rx={8}
                        fill="hsl(var(--primary))"
                      />
                      <text
                        x={state.x}
                        y={state.y - 35}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {state.name}
                      </text>
                      <text
                        x={state.x}
                        y={state.y - 22}
                        textAnchor="middle"
                        fill="hsl(var(--accent))"
                        fontSize="10"
                      >
                        {state.trainingCenters} Centers
                      </text>
                    </motion.g>
                  )}
                </motion.g>
              ))}
            </svg>
          </motion.div>

          {/* Location Cards */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {states.map((state, index) => (
              <motion.a
                key={state.id}
                href={`/locations/${state.id}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeState === state.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
                onMouseEnter={() => setActiveState(state.id)}
                onMouseLeave={() => setActiveState(null)}
              >
                <h4 className="font-bold">{state.name}</h4>
                <p className={`text-sm ${activeState === state.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {state.trainingCenters} Training {state.trainingCenters > 1 ? "Centers" : "Center"}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
