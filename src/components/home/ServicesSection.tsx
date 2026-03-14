import { motion } from "framer-motion";
import { GraduationCap, Plane, Shield, Briefcase, Wrench, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: GraduationCap,
    title: "Pilot Training",
    description: "Complete CPL & PPL training courses with experienced trainers and state-of-the-art aircraft fleet.",
    href: "/become-a-pilot/become-pilot",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Shield,
    title: "DGCA Exams",
    description: "Complete coaching for all DGCA exams with high success rates and personal attention.",
    href: "/dgca",
    color: "from-aviation-sky to-blue-400",
  },
  {
    icon: Briefcase,
    title: "Aviation Placement",
    description: "Support for instructors, NSOP/govt pilots, line training, cargo, and domestic & international airlines.",
    href: "/courses/airline-preparation",
    color: "from-accent to-yellow-400",
  },
  {
    icon: Plane,
    title: "Chartered Services",
    description: "High-end charter flight services for business, events, and emergency requirements.",
    href: "/services/chartered",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Building2,
    title: "Aircraft Sale & Purchase",
    description: "Professional advice on aircraft purchase, sale, and leasing for access to worldwide networks.",
    href: "/services/aircraft-sourcing-sale",
    color: "from-aviation-runway to-gray-600",
  },
  {
    icon: Wrench,
    title: "Aircraft Management",
    description: "Comprehensive aircraft management services including maintenance, flight operations, and personnel management.",
    href: "/services/aircraft-management",
    color: "from-primary to-aviation-green-light",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Complete Aviation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From training to placement, we offer complete aviation solutions to help you fulfill your dreams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.href} className="block group">
                <div className="relative h-full bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 border border-border group-hover:border-primary/30 overflow-hidden">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover arrow */}
                  <div className="mt-6 flex items-center text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
