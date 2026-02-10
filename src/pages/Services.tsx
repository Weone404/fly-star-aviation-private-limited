import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Plane, Shield, Briefcase, Wrench, Building2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Pilot Training",
    description: "Comprehensive CPL & PPL training programs with experienced instructors, modern aircraft fleet, and world-class simulators. We offer both integrated and modular training paths.",
    features: ["CPL & PPL Courses", "Type Rating", "Simulator Training", "Multi-Engine Rating"],
    href: "/services/pilot-training",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Shield,
    title: "DGCA Exams",
    description: "Expert coaching for all DGCA examinations with proven study materials, mock tests, and personalized guidance. Our success rate exceeds 95%.",
    features: ["Air Navigation", "Air Regulations", "Meteorology", "Technical General"],
    href: "/dgca",
    color: "from-aviation-sky to-blue-400",
  },
  {
    icon: Briefcase,
    title: "Aviation Placement",
    description: "Guaranteed job assistance with leading airlines in India and abroad. We provide interview preparation, resume building, and direct placement support.",
    features: ["Resume Building", "Interview Prep", "Airline Tie-ups", "Career Counseling"],
    href: "/services/placement",
    color: "from-accent to-yellow-400",
  },
  {
    icon: Plane,
    title: "Chartered Services",
    description: "Premium charter flight services for corporate travel, special events, medical emergencies, and leisure trips. Available 24/7 across India.",
    features: ["Corporate Charters", "Medical Evacuation", "VIP Travel", "Tourism Packages"],
    href: "/services/chartered",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Building2,
    title: "Aircraft Sale & Purchase",
    description: "Expert consultation for buying, selling, and leasing aircraft. Access to global inventory with complete documentation and legal support.",
    features: ["Pre-Buy Inspection", "Documentation", "Market Analysis", "Lease Options"],
    href: "/services/aircraft-sale",
    color: "from-aviation-runway to-gray-600",
  },
  {
    icon: Wrench,
    title: "Aircraft Management",
    description: "Complete aircraft management solutions including maintenance scheduling, crew management, regulatory compliance, and operational oversight.",
    features: ["Maintenance", "Crew Management", "Compliance", "Operations"],
    href: "/services/management",
    color: "from-primary to-aviation-green-light",
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 aviation-gradient text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Complete Aviation Solutions
            </h1>
            <p className="text-xl text-primary-foreground/80">
              From pilot training to aircraft management, we provide comprehensive aviation 
              services to individuals and organizations across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}
              >
                {/* Image/Icon Section */}
                <div className="flex-1 w-full">
                  <div className={`aspect-video rounded-2xl bg-gradient-to-br ${service.color} p-12 flex items-center justify-center`}>
                    <service.icon className="h-32 w-32 text-white/80" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} mb-6`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">{service.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="aviation" asChild>
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact our team to discuss your requirements and find the perfect aviation solution for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="aviation" size="lg" asChild>
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+919876543210">Call: +91 98765 43210</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
