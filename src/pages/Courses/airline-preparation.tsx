import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Plane,
    GraduationCap,
    BookOpen,
    Users,
    Map,
    Briefcase,
    ClipboardList,
    ArrowRight,
    ChevronRight,
    CheckCircle,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const courseModules = [
    {
        icon: BookOpen,
        title: "Aviation Theory & Procedures",
        description:
            "Ask the course team whether aviation regulations, navigation procedures or safety topics are currently included.",
        href: "/contact",
    },
    {
        icon: Plane,
        title: "Airline Operations & Procedures",
        description:
            "Confirm whether airline operations or standard operating procedures are part of the current syllabus.",
        href: "/contact",
    },
    {
        icon: Users,
        title: "Crew Resource Management",
        description:
            "Ask whether the current course includes CRM material and what activities, if any, are offered.",
        href: "/contact",
    },
    {
        icon: Map,
        title: "Flight Planning & Navigation",
        description:
            "Confirm whether route planning, chart reading, weather interpretation or pre-flight decisions are included.",
        href: "/contact",
    },
    {
        icon: ClipboardList,
        title: "Interview & Assessment Prep",
        description:
            "Ask the course team which interview or assessment preparation formats, if any, are currently offered.",
        href: "/contact",
    },
];

const courseHighlights = [
    "Ask whether airline operations and procedures are included",
    "Confirm any aviation regulation or safety topics",
    "Ask whether CRM or cockpit communication is covered",
    "Confirm any flight-planning or navigation topics",
    "Ask which interview preparation activities are offered",
    "Confirm assessment format and any practice activities",
];

const trainingComponents = [
    {
        step: 1,
        title: "Theory & Ground Modules",
        description:
            "Ask the course team to confirm the current theory syllabus, if any, and its delivery format.",
    },
    {
        step: 2,
        title: "Crew Resource Management",
        description:
            "Confirm whether CRM content and related exercises are included in the current course.",
    },
    {
        step: 3,
        title: "Flight Planning & Navigation",
        description:
            "Ask whether these topics are part of the current syllabus and whether they involve classroom, practical or other activities.",
    },
    {
        step: 4,
        title: "Interview & Assessment Preparation",
        description:
            "Confirm whether interview or assessment preparation is currently offered and what formats are used.",
    },
];

const courseOverview = [
    { label: "Course Name", value: "Airline Preparation Course" },
    { label: "Course Type", value: "Interview and assessment preparation" },
    { label: "Course Topics", value: "Confirm the current syllabus with the course team" },
    { label: "Intended Audience", value: "Confirm current eligibility with the course team" },
    { label: "Focus Areas", value: "Ask which areas and activities are currently included" },
];

const crmTopics = [
    { name: "Effective Cockpit Communication", detail: "Confirm inclusion" },
    { name: "Decision-Making Under Pressure", detail: "Confirm inclusion" },
    { name: "Situational Awareness", detail: "Confirm inclusion" },
    { name: "Leadership & Teamwork", detail: "Confirm inclusion" },
    { name: "Threat & Error Management", detail: "Confirm inclusion" },
];

const careerPaths = [
    { title: "Airline First Officer", icon: Plane },
    { title: "Regional Carrier Pilot", icon: Plane },
    { title: "Cargo Operations Pilot", icon: Briefcase },
    { title: "Corporate Aviation Pilot", icon: Briefcase },
    { title: "Charter & Executive Pilot", icon: Plane },
    { title: "Future Airline Captain", icon: GraduationCap },
];

const industryInsights = [
    {
        stage: "Airline Operations",
        description: "Ask whether airline operations or procedures are included in the current syllabus.",
        icon: Plane,
    },
    {
        stage: "Aviation Regulations",
        description: "Confirm any aviation regulation topics with the course team.",
        icon: ClipboardList,
    },
    {
        stage: "Interview Preparation",
        description: "Ask whether interview or assessment preparation is currently offered and in what format.",
        icon: Users,
    },
];

const faqs = [
    {
        question: "What is the Airline Preparation Course?",
        answer:
            "This page does not independently verify the current syllabus or delivery. Ask the course team to confirm available modules, format, instructors, practice activities, simulator access and fees.",
    },
    {
        question: "Who is this course designed for?",
        answer:
            "Current eligibility is not independently confirmed here. Contact the course team to confirm who may enrol and what prerequisites apply.",
    },
    {
        question: "What is Crew Resource Management (CRM) and why is it important?",
        answer:
            "Crew Resource Management (CRM) concerns communication, teamwork, decision-making, situational awareness, and threat and error management in flight operations. Assessment criteria vary by airline.",
    },
    {
        question: "Does the course include simulator training?",
        answer:
            "Simulator training is not confirmed as part of this course. Contact the course team to check whether any simulator sessions are currently offered.",
    },
    {
        question: "How does the course prepare me for airline interviews?",
        answer:
            "Ask the course team whether interview or assessment preparation is currently offered and which practice formats are used.",
    },
];

export default function AirlinePreparationPage() {
    return (
        <Layout>
            <Breadcrumb items={[{ label: "Airline Preparation" }]} />

            {/* ── Hero Section ─────────────────────────────────────────── */}
            <section className="relative py-24 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                            Airline Preparation Course
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Airline Preparation Course for Pilot Applicants
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Ask the course team to confirm the current syllabus, delivery format, practice activities, instructors, simulator access and fees. Course completion does not guarantee selection, placement, or employment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Get Course Fees</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
                        </div>
                        <div className="mt-6">
                            <SocialShareButtons
                                title="Airline Preparation Course in India | Pilot Interview & CRM Training"
                                label="Share this course"
                                theme="dark"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── About the Course ─────────────────────────────────────── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            About the Airline Preparation Course
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            This page does not independently verify current course contents or delivery. Contact the course team to confirm the syllabus, eligibility, schedule, instructors and fees.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <p className="text-muted-foreground mb-4">
                                Ask the course team to confirm whether airline operations, CRM, flight planning, interview or assessment preparation are currently included.
                            </p>
                            <p className="text-muted-foreground">
                                Ask the course team to confirm current instructors, practice formats, and any simulator access.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {courseModules.slice(0, 4).map((module) => (
                                    <Link to={module.href} key={module.title} className="block group">
                                        <div className="h-full p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <module.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-sm font-bold mb-1">{module.title}</h3>
                                            <div className="flex items-center text-primary text-xs font-semibold mt-2">
                                                Learn More <ChevronRight className="h-3 w-3 ml-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Course Highlights ─────────────────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Course Topics
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Ask the course team which airline-related topics, if any, are currently included. Airline requirements vary; check current employer information.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {courseHighlights.map((highlight, index) => (
                            <motion.div
                                key={highlight}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border"
                            >
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="font-medium text-sm">{highlight}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Course Modules ────────────────────────────────────────── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What the Course Covers
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            This page does not confirm the course syllabus or practical delivery. Ask the course team about current topics, session formats and any simulator access.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courseModules.map((module, index) => (
                            <motion.div
                                key={module.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <module.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{module.title}</h3>
                                <p className="text-sm text-muted-foreground">{module.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CRM Training ─────────────────────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Crew Resource Management (CRM) Training
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            CRM is a subject area to ask about; this page does not confirm whether or how it is currently taught in this course.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">CRM Topics Listed</h3>
                            <ul className="space-y-4">
                                {[
                                    "Effective cockpit communication",
                                    "Collaborative decision-making",
                                    "Threat and error management",
                                    "Leadership within a crew environment",
                                    "Situational awareness development",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-bold mb-6">CRM Topic Areas</h3>
                            <p className="text-muted-foreground mb-6">
                                Topics include communication, decision-making, situational awareness, teamwork, and threat and error management.
                            </p>
                            <div className="rounded-2xl border border-border overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-primary text-primary-foreground">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-sm">Competency</th>
                                            <th className="px-4 py-3 text-center font-semibold text-sm">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {crmTopics.map((topic, index) => (
                                            <tr key={topic.name} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                                <td className="px-4 py-3 text-sm">{topic.name}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                                                        <CheckCircle className="h-3 w-3" />
                                                        {topic.detail}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">
                                Ask the course team which CRM practice sessions, if any, are currently included.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Training Journey ─────────────────────────────────────── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Preparation Topics</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Confirm the current syllabus and delivery formats with the course team.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainingComponents.map((item, index) => (
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

            {/* ── Industry Insights ─────────────────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Airline and Assessment Topics</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Ask the course team to confirm whether these topics are currently included.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {industryInsights.map((item, index) => (
                            <motion.div
                                key={item.stage}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-xl bg-card border border-border text-center"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold mb-2">{item.stage}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Career Outcomes ───────────────────────────────────────── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Possible Aviation Career Paths
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            These are possible career paths, not course outcomes. Eligibility depends on applicable qualifications and employer requirements.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {careerPaths.map((career, index) => (
                            <motion.div
                                key={career.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <career.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg">{career.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Course Overview Table ─────────────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Course Overview</h2>
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
                                        <th className="px-6 py-4 text-left font-semibold">Field</th>
                                        <th className="px-6 py-4 text-left font-semibold">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseOverview.map((row, index) => (
                                        <tr key={row.label} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                            <td className="px-6 py-4 font-semibold text-sm">{row.label}</td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm">{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Why Right Preparation Matters ────────────────────────── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            What This Course Can and Cannot Do
                        </h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            Airline selection methods vary. This course offers preparation, not a hiring decision.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            Completing the course does not guarantee an interview, selection, placement, or employment.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────────── */}
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
                            Common questions about the Airline Preparation Course and the information available about it.
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

            {/* ── Final CTA ─────────────────────────────────────────────── */}
            <section className="py-20 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ask About Airline Preparation
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-4">
                            Contact the course team to confirm the current syllabus, course format, instructor details, practice activities, simulator access and fees.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Contact the course team to confirm current eligibility, course details, delivery format and fees.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Get Course Fees</Link>
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
