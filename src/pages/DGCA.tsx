import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  UserCheck,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  ArrowRight,
  ChevronRight,
  IdCard,
  GraduationCap,
  Plane,
  BookOpen,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const computerNumberUses = [
  {
    icon: FileText,
    title: "DGCA Exam Registration",
    description: "Required to appear for any DGCA ground theory examination",
  },
  {
    icon: GraduationCap,
    title: "Apply for CPL or PPL",
    description: "Essential for Commercial Pilot License and Private Pilot License applications",
  },
  {
    icon: BookOpen,
    title: "Academic Records",
    description: "Track your exam results and academic progress with DGCA",
  },
  {
    icon: Plane,
    title: "Flying School Registration",
    description: "Register at any DGCA-  flying training organization",
  },
];

const whoNeedsIt = [
  { title: "Commercial Pilot (CPL)", icon: Plane },
  { title: "Private Pilot (PPL)", icon: Plane },
  { title: "Flight Instructor", icon: GraduationCap },
  { title: "ATPL Holder", icon: Plane },
  { title: "Foreign License Conversion", icon: IdCard },
];

const educationalDocs = [
  "10th Mark Sheet (Physics & Maths required)",
  "12th Mark Sheet (Physics & Maths required)",
  "Class 10 Certificate (Date of Birth proof)",
];

const personalDocs = [
  "Passport size photo (white background, recent)",
  "Signature (black ink on white paper)",
  "Aadhar Card or Passport copy",
];

const applicationSteps = [
  {
    step: 1,
    title: "Visit Official Website",
    description: "Go to https://pariksha.dgca.gov.in and navigate to Student Registration section.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Student Registration",
    description: "Fill in your Name (must match certificates), Date of Birth, Email, Mobile number, and Education details.",
    icon: UserCheck,
    warning: "Any mismatch in details leads to rejection",
  },
  {
    step: 3,
    title: "Upload Documents",
    description: "Upload clear scans with proper file names and within size limits. All files must be PDF/JPG and self-attested.",
    icon: Upload,
  },
  {
    step: 4,
    title: "Submit Application",
    description: "Review all details carefully and save your application number for future reference.",
    icon: CheckCircle,
  },
  {
    step: 5,
    title: "DGCA Verification",
    description: "Approval takes around 2–4 weeks. DGCA will verify all submitted documents.",
    icon: Clock,
  },
  {
    step: 6,
    title: "Computer Number Issued",
    description: "Receive your 10-digit Computer Number via email confirmation and get exam registration access.",
    icon: Shield,
  },
];

const documentRequirements = [
  { name: "10th & 12th mark sheets", format: "PDF/JPG" },
  { name: "Passport photo", format: "JPG (white background)" },
  { name: "Signature", format: "JPG (black ink, 300 DPI)" },
  { name: "Aadhar / Passport", format: "PDF/JPG" },
  { name: "Class 10 certificate", format: "PDF/JPG" },
];

const bonusTips = [
  {
    category: "Photo Requirements",
    tips: [
      "White background only",
      "No filters or editing",
      "No shadows on face or background",
      "Recent photograph (within 6 months)",
    ],
  },
  {
    category: "Signature Requirements",
    tips: [
      "Black ink on white paper",
      "English language only",
      "300 DPI scan quality",
      "No digital signatures",
    ],
  },
];

const faqs = [
  {
    question: "What is a DGCA Computer Number?",
    answer:
      "Computer Number is a unique identification number issued by DGCA to every student who wants to become a pilot in India. It's like a roll number for DGCA exams. Without getting a Computer Number, you cannot appear for any DGCA examination. This number is used throughout your aviation career at every stage.",
  },
  {
    question: "Who needs a DGCA Computer Number?",
    answer:
      "Anyone aspiring to become a Commercial Pilot (CPL), Private Pilot (PPL), Flight Instructor, ATPL Holder, or those applying for Foreign License Conversion needs a DGCA Computer Number. It's the first mandatory step in your pilot training journey.",
  },
  {
    question: "What documents are required to apply for Computer Number?",
    answer:
      "You need educational documents (10th & 12th mark sheets with Physics and Maths, Class 10 certificate for DOB proof) and personal documents (passport size photo with white background, signature in black ink, and Aadhar Card or Passport copy). All documents must be scanned and self-attested.",
  },
  {
    question: "How long does DGCA verification take?",
    answer:
      "DGCA verification typically takes around 2 to 4 weeks after submission. If your application is rejected, DGCA will mention the reason, and you can fix the issue and re-upload the documents.",
  },
  {
    question: "What is the validity of Computer Number?",
    answer:
      "The Computer Number is valid for lifetime and will be used throughout your entire aviation career. You'll use it for exam registration, license applications, and tracking your academic records with DGCA.",
  },
  {
    question: "What are common reasons for application rejection?",
    answer:
      "Most rejections happen due to incorrect photo (not white background, filters, shadows), signature issues (colored ink, low quality scan), name mismatch between certificates, or unclear document scans. Always double-check these details before submission.",
  },
];

const afterApproval = [
  "10-digit Computer Number assigned",
  "Email confirmation from DGCA",
  "Access to DGCA exam registration portal",
  "Ability to track academic records",
  "Eligibility to register at flying schools",
];

export default function DGCAComputerNumberPage() {
  return (
    <Layout>
      <Helmet>
        <title>DGCA Computer Number - Complete Guide for Pilot Aspirants</title>
        <meta
          name="description"
          content="Get your DGCA Computer Number - the first step to become a pilot in India. Complete guide on application process, documents required, and approval timeline."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 aviation-gradient text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
              Essential Guide for Aspiring Pilots
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              DGCA Computer Number – Full Guide for Pilot Aspirants
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              If you're planning to become a pilot in India, the first thing you'll need to start your journey
              is a Computer Number issued by the DGCA (Directorate General of Civil Aviation). This comprehensive
              guide will walk you through everything you need to know.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="lg" asChild>
                <a
                  href="https://pariksha.dgca.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply for Computer Number
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline-white" size="lg" asChild>
                <Link to="/cpl">Learn About CPL Course</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Computer Number */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What is a Computer Number?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Computer Number is a Unique Number which is given by DGCA to every student who wants to become a
              pilot in India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <IdCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Simple Explanation</h3>
              <p className="text-muted-foreground mb-4">
                Think of it as your <strong>Roll Number for DGCA Exams</strong>. Without getting a Computer
                Number, you cannot appear for any DGCA examination.
              </p>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-medium text-primary flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  This Computer Number is extremely important and has many uses throughout your pilot training
                  journey and aviation career.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <h3 className="text-xl font-bold mb-6">Key Uses of Computer Number</h3>
              <ul className="space-y-4">
                {[
                  "Appear for any DGCA ground theory exam",
                  "Apply for CPL or PPL",
                  "Track exam & academic records",
                  "Register at DGCA-  flying schools",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Computer Number Uses Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {computerNumberUses.map((use, index) => (
              <motion.div
                key={use.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <use.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">{use.title}</h3>
                <p className="text-sm text-muted-foreground">{use.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who Needs It */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Needs a Computer Number?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Anyone aspiring to build a career in aviation needs this essential identification number
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {whoNeedsIt.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border text-center hover:border-primary/50 hover:shadow-hover transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <career.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm">{career.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Needed */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Documents Needed to Apply</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Before applying, ensure all documents are scanned and self-attested
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-primary" />
                Educational Documents
              </h3>
              <ul className="space-y-4">
                {educationalDocs.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <IdCard className="h-6 w-6 text-primary" />
                Personal Documents
              </h3>
              <ul className="space-y-4">
                {personalDocs.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Document Requirements Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Document Upload Requirements</h3>
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Document</th>
                    <th className="px-6 py-4 text-left font-semibold">Format Required</th>
                  </tr>
                </thead>
                <tbody>
                  {documentRequirements.map((doc, index) => (
                    <tr key={doc.name} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                      <td className="px-6 py-4 font-medium text-sm">{doc.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          <FileText className="h-3 w-3" />
                          {doc.format}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              All files must be self-attested and within size limits specified on the portal
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Step-by-Step Online Application Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to successfully apply for your DGCA Computer Number
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-card border border-border"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-2">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                {step.warning && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-xs font-medium text-destructive flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      {step.warning}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Application Rejected?</h4>
                <p className="text-muted-foreground">
                  DGCA will mention the reason for rejection. Simply fix the issue and re-upload the
                  documents. Common issues include photo/signature quality, name mismatch, or unclear scans.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bonus Tips */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-bold text-sm mb-4">
              BONUS TIPS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Important Guidelines to Avoid Rejection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most delays happen due to photo & signature issues. Follow these tips carefully
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bonusTips.map((section, index) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  {section.category}
                </h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* After Approval */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">After Approval</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Once your application is  , you'll receive the following
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-6">What You Get</h3>
              <ul className="space-y-4">
                {afterApproval.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-primary text-primary-foreground"
            >
              <h3 className="text-2xl font-bold mb-4">Computer Number Validity</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Clock className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-4xl font-bold">Lifetime</p>
                  <p className="text-primary-foreground/80">Used throughout your aviation career</p>
                </div>
              </div>
              <p className="text-primary-foreground/90">
                Your Computer Number remains valid for your entire career and will be used at every stage - from
                exam registration to license issuance and renewal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about DGCA Computer Number application and process
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

      {/* Final CTA */}
      <section className="py-20 aviation-gradient text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Pilot Journey?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Getting your DGCA Computer Number is the first official step toward becoming a professional pilot in
              India. Don't worry about the technical terms — just follow this guide carefully, prepare your
              documents properly, and submit your application. Your aviation career starts here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <a
                  href="https://pariksha.dgca.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply for Computer Number
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline-white" size="lg" asChild>
                <Link to="/cpl">Explore CPL Course</Link>
              </Button>
              <Button variant="outline-white" size="lg" asChild>
                <Link to="/contact">Talk to Counselor</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}