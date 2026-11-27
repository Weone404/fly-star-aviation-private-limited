import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CitableTable } from "@/components/CitableTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, ArrowRight, GraduationCap } from "lucide-react";

const licenses = [
  {
    title: "Commercial Pilot License (CPL)",
    description: "Flying Star Aviator provides ground classes for theory preparation; aircraft flying training is separate. Check the selected FTO's current DGCA approval and scope before enrolment.",
    href: "/courses/cpl",
  },
  {
    title: "Private Pilot License (PPL)",
    description: "Aircraft flying training is separate from Flying Star Aviator's ground classes. Check current DGCA requirements and the selected FTO's approval and scope.",
    href: "/pilot-training/ppl",
  },
];

const eligibility = [
  { label: "Minimum Age", value: "Check current DGCA criteria for the licence sought." },
  { label: "Education", value: "Verify current education and subject requirements with DGCA." },
  { label: "Medical", value: "Confirm the applicable medical class and process with DGCA." },
  { label: "English", value: "Check current language-proficiency requirements with DGCA." },
  { label: "Vision", value: "Check current medical and vision standards with DGCA." },
  { label: "Height", value: "Confirm applicable medical standards with an authorised examiner." },
];

const syllabus = [
  { subject: "Theory preparation", topics: "Confirm the current DGCA examination subjects and requirements before planning." },
  { subject: "Course syllabus", topics: "Ask the course team to confirm the subjects and teaching scope currently offered." },
  { subject: "Radio-telephony requirements", topics: "Check the applicable current official rules and examination notices." },
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
              Pilot Training Pathway
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become a Professional Pilot
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Flying Star Aviator provides ground classes for CPL theory. Aircraft flying training is completed separately at an appropriately approved Flying Training Organisation (FTO).
            </p>
            <Link
              className="inline-block mt-4 underline underline-offset-4"
              to="/pilot-training/cpl"
            >
              Understand the CPL ground and flying stages
            </Link>
          </motion.div>
        </div>
      </section>

      <CitableTable
        heading="Pilot training routes: India, USA and South Africa"
        intro="The licensing authority differs by country. Verify current licensing and conversion requirements with the relevant authorities before choosing a training route."
        columns={["Country", "Licensing authority"]}
        rows={[
          ["India", "DGCA"],
          ["USA", "FAA"],
          ["South Africa", "SACAA"],
        ]}
        note={
          <>
            Training costs are not estimated here. For related guidance, see{" "}
            <a href="/blog/dgca-exam-fees" className="underline hover:text-primary">
              the DGCA exam-fee overview
            </a>{" "}
            and{" "}
            <a href="/blog/foreign-licence-conversion-checklist" className="underline hover:text-primary">
              the foreign-licence conversion checklist
            </a>
            .
          </>
        }
        lastUpdated="2026-11-26"
      />

      {/* License Cards */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilot Licence Pathways</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the CPL and PPL pathways. Flying Star Aviator provides ground training; aircraft flying training is separate. Verify current DGCA requirements and any selected FTO's approval and scope.
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
                className="relative rounded-2xl border-2 border-border bg-card p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{license.title}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{license.description}</p>

                <Button
                  variant="aviation"
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
                These are eligibility areas to check against current DGCA requirements for the licence you seek.
              </p>
              <Button variant="aviation" asChild>
                <Link to="/become-a-pilot/become-pilot">
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

      <section className="py-12 bg-background" aria-labelledby="related-dgca-resources">
        <div className="container">
          <h2 id="related-dgca-resources" className="text-2xl md:text-3xl font-bold mb-6">
            Related DGCA resources
          </h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <Link className="underline hover:text-primary" to="/dgca/ground-classes">
                DGCA ground classes
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-primary" to="/dgca/computer-number">
                DGCA Computer Number
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-primary" to="/dgca/medical">
                DGCA medical requirements
              </Link>
            </li>
          </ul>
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
              Flying Star Aviator provides ground-based academic preparation. This page does not describe aircraft flight instruction; confirm the current course syllabus with the team.
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
              <Link to="/courses/cpl">
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
              Contact the team to confirm current ground-class details and the separate flight-training stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <Link to="/apply">
                  Apply Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline-white" size="lg" asChild>
                <a href="tel:+919953536199">Talk to Counselor</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
