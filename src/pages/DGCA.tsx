import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Stethoscope, GraduationCap, ArrowRight, ChevronRight, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const dgcaServices = [
  {
    icon: FileText,
    title: "DGCA Computer Number",
    description: "Get your unique DGCA computer number registration for all aviation examinations and licensing.",
    href: "/dgca/computer-number",
  },
  {
    icon: Stethoscope,
    title: "Medical Class 1 & 2",
    description: "Complete guidance for aviation medical examinations and certifications required for pilot licensing.",
    href: "/dgca/medical",
  },
  {
    icon: BookOpen,
    title: "Ground Classes",
    description: "Comprehensive ground training covering all DGCA exam subjects with expert instructors.",
    href: "/dgca/ground-classes",
  },
  {
    icon: GraduationCap,
    title: "DGCA Full Form",
    description: "Learn about the Directorate General of Civil Aviation and its role in Indian aviation.",
    href: "/dgca/full-form",
  },
];

const examSubjects = [
  { name: "Air Navigation", pass: "70%", papers: 1 },
  { name: "Aviation Meteorology", pass: "70%", papers: 1 },
  { name: "Air Regulations", pass: "70%", papers: 1 },
  { name: "Technical General", pass: "70%", papers: 1 },
  { name: "Technical Specific", pass: "70%", papers: 1 },
  { name: "RTR(A) - Radio Telephony", pass: "Practical", papers: 1 },
];

const faqs = [
  {
    question: "What is DGCA?",
    answer: "DGCA stands for Directorate General of Civil Aviation. It is the regulatory body for civil aviation in India, responsible for regulating air transport services, enforcing civil air regulations, and licensing of pilots and aircraft.",
  },
  {
    question: "How do I get a DGCA Computer Number?",
    answer: "You can apply for a DGCA Computer Number online through the DGCA e-Governance portal. You need to submit your identity proof, address proof, and educational certificates. Our team can assist you with the complete registration process.",
  },
  {
    question: "What are the medical requirements for pilots?",
    answer: "Pilots require either Class 1 or Class 2 medical certificates issued by DGCA-approved medical examiners. Class 1 is required for CPL holders while Class 2 is sufficient for PPL. The examination includes vision, hearing, cardiovascular, and general health assessments.",
  },
  {
    question: "How many attempts are allowed for DGCA exams?",
    answer: "There is no limit on the number of attempts for DGCA exams. However, each attempt requires payment of the examination fee. We recommend thorough preparation to clear exams in minimum attempts.",
  },
  {
    question: "What is the validity of DGCA exam results?",
    answer: "DGCA exam results are valid for 5 years from the date of passing. All subjects must be cleared within this 5-year window to qualify for the license.",
  },
];

const steps = [
  { step: 1, title: "Computer Number", description: "Register on DGCA portal and obtain your unique computer number" },
  { step: 2, title: "Medical Examination", description: "Complete Class 1/2 medical examination from approved centers" },
  { step: 3, title: "Ground Training", description: "Enroll in ground classes and prepare for written exams" },
  { step: 4, title: "Written Exams", description: "Clear all DGCA written examinations" },
  { step: 5, title: "Flight Training", description: "Complete required flying hours at approved FTO" },
  { step: 6, title: "Skill Test", description: "Pass the final skill test to obtain your license" },
];

export default function DGCAPage() {
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
              DGCA Preparation
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master Your DGCA Exams
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Comprehensive preparation for all DGCA examinations with expert guidance, 
              study materials, and a 95%+ success rate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DGCA Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for your DGCA journey, from registration to exam clearance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {dgcaServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={service.href} className="block group">
                  <div className="h-full p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <service.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center text-primary font-semibold">
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilot License Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Step-by-step process to obtain your pilot license in India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-card border border-border"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 pt-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Subjects Table */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DGCA Exam Subjects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Written examinations required for Commercial Pilot License (CPL).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Subject</th>
                    <th className="px-6 py-4 text-center font-semibold">Papers</th>
                    <th className="px-6 py-4 text-center font-semibold">Pass %</th>
                  </tr>
                </thead>
                <tbody>
                  {examSubjects.map((subject, index) => (
                    <tr key={subject.name} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                      <td className="px-6 py-4">{subject.name}</td>
                      <td className="px-6 py-4 text-center">{subject.papers}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-primary font-medium">
                          <CheckCircle className="h-4 w-4" />
                          {subject.pass}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about DGCA exams and pilot licensing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card rounded-xl border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
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
              Start Your DGCA Preparation Today
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join our comprehensive ground school program and clear your DGCA exams with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  Enroll Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline-white" size="lg" asChild>
                <a href="tel:+919876543210">Call for Free Demo</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
