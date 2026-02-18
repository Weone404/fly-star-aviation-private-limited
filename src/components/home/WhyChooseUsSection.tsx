import { motion } from "framer-motion";
import { Award, Users, Plane, Clock, Shield, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Pilot training   ",
    description: "Officially recognized by the Directorate General of Civil Aviation as an   training organization.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from experienced pilots and aviation professionals with thousands of flying hours.",
  },
  {
    icon: Plane,
    title: "Modern Fleet",
    description: "Train on well-maintained, modern aircraft equipped with the latest avionics and technology.",
  },
  {
    icon: Clock,
    title: "Flexible Programs",
    description: "Choose from integrated or modular training paths that fit your schedule and budget.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Industry-leading safety standards and protocols ensuring the highest level of training safety.",
  },
  {
    icon: TrendingUp,
    title: "98% Placement",
    description: "Outstanding placement record with top airlines in India and abroad through our network.",
  },
];

export function WhyChooseUsSection() {
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
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            India's Most Trusted Aviation Academy
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We've been shaping successful aviation careers for over 15 years with our commitment to excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-hover transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <reason.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
