import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Plane, Shield, Briefcase, Building2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Pilot Training",
    description: "CPL and ATPL ground classes for DGCA theory preparation. Aircraft flying training is separate; verify current DGCA requirements and any selected FTO's approval and scope.",
    features: ["CPL Ground Classes", "ATPL Ground Classes", "DGCA Exam Preparation", "RTR(A)"],
    href: "/dgca/ground-classes",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Shield,
    title: "DGCA Exams",
    description: "Preparation for DGCA theory examinations, with guidance on subject study and exam planning.",
    features: ["Air Navigation", "Air Regulations", "Meteorology", "Technical General"],
    href: "/dgca",
    color: "from-aviation-sky to-blue-400",
  },
  {
    icon: Briefcase,
    title: "Airline Preparation",
    description: "Visit the Airline Preparation page for course information. Job placement or employment is not guaranteed.",
    features: [],
    href: "/courses/airline-preparation",
    color: "from-accent to-yellow-400",
  },
  {
    icon: Plane,
    title: "Chartered Services",
    description: "For charter enquiries, contact the team to confirm whether an option is available and verify its operating area, aircraft and service scope.",
    features: [],
    href: "/services/charter-services",
    color: "from-primary to-aviation-green-light",
  },
  {
    icon: Building2,
    title: "Aircraft Sale & Purchase",
    description: "For aircraft sale, purchase or lease enquiries, ask the team to confirm whether assistance is available and what representation, inspection or documentation support is included.",
    features: [],
    href: "/services/aircraft-sourcing-sale",
    color: "from-aviation-runway to-gray-600",
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
              Aviation Training and Services
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Flying Star Aviator provides CPL and ATPL ground training alongside aviation services for individuals and organizations.
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

                  {service.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

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
              Contact our team to discuss your requirements and confirm current service availability and scope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="aviation" size="lg" asChild>
                <Link to="/contact">Discuss Your Requirements</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+919953536199">Call: +91 9953536199</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
