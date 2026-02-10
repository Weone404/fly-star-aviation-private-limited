import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, Clock, IndianRupee, CheckCircle, ArrowRight, GraduationCap } from "lucide-react";

const licenses = [
  {
    title: "Commercial Pilot License (CPL)",
    description: "The CPL allows you to fly aircraft commercially and get paid for your services. It's the primary license for those aspiring to become airline pilots.",
    duration: "18-24 months",
    cost: "₹35-50 Lakhs",
    hours: "200 flying hours",
    href: "/pilot-training/cpl",
    features: [
      "Fly commercial aircraft",
      "Employment eligibility",
      "Multi-engine rating included",
      "Instrument rating training",
    ],
    popular: true,
  },
  {
    title: "Private Pilot License (PPL)",
    description: "The PPL allows you to fly single-engine aircraft for personal use. It's often the first step for aspiring commercial pilots.",
    duration: "6-12 months",
    cost: "₹10-15 Lakhs",
    hours: "40 flying hours",
    href: "/pilot-training/ppl",
    features: [
      "Fly for personal use",
      "Foundation for CPL",
      "Single-engine aircraft",
      "Day VFR operations",
    ],
    popular: false,
  },
];

const eligibility = [
  { label: "Minimum Age", value: "17 years (PPL), 18 years (CPL)" },
  { label: "Education", value: "10+2 with Physics & Mathematics" },
  { label: "Medical", value: "Class 1/2 Medical Certificate" },
  { label: "English", value: "ICAO Level 4 proficiency" },
  { label: "Vision", value: "6/6 (correctable)" },
  { label: "Height", value: "No specific requirement" },
];

const syllabus = [
  { subject: "Air Navigation", topics: "Maps, charts, flight planning, navigation systems" },
  { subject: "Meteorology", topics: "Weather systems, forecasts, aviation weather" },
  { subject: "Air Regulations", topics: "Aviation law, DGCA rules, airspace" },
  { subject: "Technical General", topics: "Aerodynamics, aircraft systems, instruments" },
  { subject: "Technical Specific", topics: "Aircraft type-specific knowledge" },
  { subject: "Radio Telephony", topics: "Communication procedures, phraseology" },
];

export default function PilotTrainingPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 aviation-gradient text-primary-foreground overflow-hidden">
        <motion.div
          className="absolute top-1/2 right-0 opacity-20"
          animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Plane className="h-64 w-64" />
        </motion.div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
              Pilot Training Programs
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become a Professional Pilot
            </h1>
            <p className="text-xl text-primary-foreground/80">
              World-class training programs designed to launch your aviation career. 
              Train with experienced instructors on modern aircraft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* License Cards */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Training Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the right program to kickstart your aviation career.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {licenses.map((license, index) => (
              <motion.div
                key={license.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border-2 p-8 ${
                  license.popular
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {license.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{license.title}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{license.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-muted-foreground">Duration</div>
                    <div className="text-sm font-semibold">{license.duration}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <IndianRupee className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-muted-foreground">Cost</div>
                    <div className="text-sm font-semibold">{license.cost}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <Plane className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-xs text-muted-foreground">Flying</div>
                    <div className="text-sm font-semibold">{license.hours}</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {license.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={license.popular ? "aviation" : "outline"}
                  className="w-full"
                  size="lg"
                  asChild
                >
                  <Link to={license.href}>
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
                Requirements
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Eligibility Criteria</h2>
              <p className="text-muted-foreground mb-8">
                Before starting your pilot training, ensure you meet the following requirements 
                set by DGCA for obtaining a pilot license in India.
              </p>
              <Button variant="aviation" asChild>
                <Link to="/pilot-training/eligibility">
                  Check Full Eligibility
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {eligibility.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                  <div className="font-semibold">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Syllabus</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive curriculum covering all aspects of aviation theory and practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {syllabus.map((item, index) => (
              <motion.div
                key={item.subject}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">{item.subject}</h3>
                <p className="text-sm text-muted-foreground">{item.topics}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/pilot-training/syllabus">
                View Complete Syllabus
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 aviation-gradient text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Flying?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Take the first step towards your aviation career. Our counselors are ready to guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  Apply Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline-white" size="lg" asChild>
                <a href="tel:+919876543210">Talk to Counselor</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
