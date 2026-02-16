import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Plane,
    GraduationCap,
    BookOpen,
    Users,
    Map,
    Monitor,
    Briefcase,
    ClipboardList,
    ArrowRight,
    ChevronRight,
    CheckCircle,
    Star,
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
        title: "Theory & Practical Training",
        description:
            "Delve into aviation regulations, navigation procedures, and safety protocols with simulated flight scenarios for real-world application.",
        href: "/airline-prep/theory",
    },
    {
        icon: Plane,
        title: "Airline Operations & Procedures",
        description:
            "Gain a deep understanding of airline operations, standard operating procedures, and how to navigate all phases of a commercial flight.",
        href: "/airline-prep/operations",
    },
    {
        icon: Users,
        title: "Crew Resource Management",
        description:
            "Develop essential teamwork and communication skills through CRM training for safe and efficient flight operations.",
        href: "/airline-prep/crm",
    },
    {
        icon: Map,
        title: "Flight Planning & Navigation",
        description:
            "Master route optimisation, aviation chart reading, weather interpretation, and informed decision-making during flight planning.",
        href: "/airline-prep/navigation",
    },
    {
        icon: Monitor,
        title: "Simulator Training",
        description:
            "Experience realistic flight scenarios in state-of-the-art simulators to hone skills, practise emergency procedures, and build confidence.",
        href: "/airline-prep/simulator",
    },
    {
        icon: ClipboardList,
        title: "Interview & Assessment Prep",
        description:
            "Receive structured guidance on airline interviews, aptitude tests, and simulator assessments to excel in the selection process.",
        href: "/airline-prep/interview",
    },
];

const courseHighlights = [
    "Comprehensive airline operations training",
    "State-of-the-art simulator sessions",
    "CRM and cockpit communication skills",
    "Expert-led interview preparation",
    "Industry insights from aviation professionals",
    "Flight planning and navigation mastery",
    "Emergency procedures and safety training",
    "DGCA-aligned curriculum standards",
];

const trainingComponents = [
    {
        step: 1,
        title: "Theory & Ground Modules",
        description:
            "Structured classroom sessions covering aviation regulations, navigation procedures, safety protocols, and airline standard operating procedures.",
    },
    {
        step: 2,
        title: "CRM Workshop",
        description:
            "Interactive crew resource management sessions focused on effective communication, decision-making, and teamwork within a cockpit crew environment.",
    },
    {
        step: 3,
        title: "Flight Planning Lab",
        description:
            "Hands-on exercises in route optimisation, reading aviation charts, interpreting meteorological data, and building sound pre-flight decisions.",
    },
    {
        step: 4,
        title: "Simulator Training",
        description:
            "Full-mission simulator sessions covering normal and emergency procedures in realistic airline scenarios to build confidence and competency.",
    },
    {
        step: 5,
        title: "Industry Insights Programme",
        description:
            "Guest lectures by experienced airline captains and aviation professionals sharing current industry trends, regulations, and best practices.",
    },
    {
        step: 6,
        title: "Interview & Assessment Readiness",
        description:
            "Dedicated modules on interview techniques, psychometric and aptitude tests, and simulator-based assessments used by major airlines.",
    },
];

const courseOverview = [
    { label: "Course Name", value: "Airline Preparation Course" },
    { label: "Course Type", value: "Professional Pilot Programme" },
    { label: "Training Mode", value: "Theory + Simulator + Practical" },
    { label: "Eligibility", value: "CPL Holders / Final-Year Trainees" },
    { label: "Focus Areas", value: "CRM, Operations, Navigation, Interviews" },
    { label: "Career Outcome", value: "Airline First Officer" },
];

const crmTopics = [
    { name: "Effective Cockpit Communication", detail: "Core skill" },
    { name: "Decision-Making Under Pressure", detail: "Core skill" },
    { name: "Situational Awareness", detail: "Core skill" },
    { name: "Leadership & Teamwork", detail: "Core skill" },
    { name: "Threat & Error Management", detail: "Core skill" },
];

const careerOutcomes = [
    { title: "Airline First Officer", icon: Plane },
    { title: "Regional Carrier Pilot", icon: Plane },
    { title: "Cargo Operations Pilot", icon: Briefcase },
    { title: "Corporate Aviation Pilot", icon: Briefcase },
    { title: "Charter & Executive Pilot", icon: Plane },
    { title: "Future Airline Captain", icon: GraduationCap },
];

const industryInsights = [
    {
        stage: "Guest Lectures",
        description: "Active airline captains share real-world operational experience",
        icon: Star,
    },
    {
        stage: "Regulatory Updates",
        description: "Stay current with DGCA and international aviation regulations",
        icon: ClipboardList,
    },
    {
        stage: "Interview Simulations",
        description: "Mock airline interviews with structured feedback sessions",
        icon: Users,
    },
];

const faqs = [
    {
        question: "What is the Airline Preparation Course?",
        answer:
            "The Airline Preparation Course is a comprehensive programme designed to equip aspiring pilots with the knowledge, skills, and confidence required to excel in commercial aviation. It covers airline operations, crew resource management, flight planning, simulator training, industry insights, and interview preparation — giving graduates a competitive edge in airline recruitment.",
    },
    {
        question: "Who is this course designed for?",
        answer:
            "The course is tailored for CPL holders and final-year flying trainees who are preparing to enter the airline industry. It bridges the gap between completing pilot training and meeting the rigorous standards expected by commercial airlines during the selection process.",
    },
    {
        question: "What is Crew Resource Management (CRM) and why is it important?",
        answer:
            "Crew Resource Management (CRM) training develops essential teamwork and communication skills critical to airline operations. It focuses on effective cockpit communication, collaborative decision-making, situational awareness, and threat and error management — all of which are essential competencies assessed during airline selection and throughout a pilot's career.",
    },
    {
        question: "Does the course include simulator training?",
        answer:
            "Yes. The Airline Preparation Course includes dedicated simulator sessions in state-of-the-art flight simulators. These sessions allow students to practise normal and emergency procedures in realistic airline scenarios, building confidence and technical proficiency in a safe, controlled environment.",
    },
    {
        question: "How does the course prepare me for airline interviews?",
        answer:
            "The course includes specific modules on interview techniques, aptitude and psychometric tests, and simulator-based assessments used by leading airlines. Students participate in mock interviews and receive structured feedback, ensuring they are thoroughly prepared for the selection process at domestic and international carriers.",
    },
];

export default function AirlinePreparationPage() {
    return (
        <Layout>
            <Helmet>
                <title>Airline Preparation Course in India | Pilot Interview & CRM Training</title>
                <meta
                    name="description"
                    content="Prepare for your airline career with our comprehensive Airline Preparation Course. Covers CRM, flight planning, simulator training, and interview preparation for aspiring commercial pilots."
                />
            </Helmet>

            {/* ── Hero Section ─────────────────────────────────────────── */}
            <section className="relative py-24 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                            Airline Preparation Course — Bridge the Gap Between Training & Your First Airline Job
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Airline Preparation Course — Launch Your Commercial Aviation Career
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Prepare for a successful career in aviation with our comprehensive Airline Preparation Course.
                            Meticulously designed to equip aspiring pilots with the knowledge, skills, and confidence
                            required to excel in the dynamic world of commercial aviation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/airline-prep/fees">Get Course Fees</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
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
                            Our Airline Preparation Course is tailored to meet the rigorous standards set by the aviation
                            industry, ensuring that graduates are well-prepared for the challenges of a professional pilot
                            career. The course covers a wide range of topics, providing a holistic approach to pilot readiness.
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
                                This course bridges the gap between completing your commercial pilot training and meeting the
                                exacting expectations of airline recruiters. From mastering crew resource management to
                                acing airline interview assessments, every module is purpose-built for career readiness.
                            </p>
                            <p className="text-muted-foreground">
                                Participants benefit from industry-aligned curriculum, experienced aviation instructors,
                                state-of-the-art simulator access, and hands-on preparation for the entire airline
                                selection process.
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
                            Why Choose Our Airline Preparation Course?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Designed in consultation with airline industry professionals, our course covers every
                            competency airlines assess — from technical knowledge to interpersonal readiness.
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
                            A wide range of topics delivered through theory, simulation, and practical sessions — providing
                            a holistic approach to airline readiness.
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
                            Understand the importance of effective communication and collaboration in ensuring safe and
                            efficient flight operations. CRM is a core competency assessed by every major airline.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">CRM Training Includes</h3>
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
                            <p className="text-sm text-muted-foreground mt-6">
                                CRM skills are assessed at every stage of an airline career — from initial selection to
                                recurrent training and command upgrade.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-bold mb-6">Key CRM Competencies Covered</h3>
                            <p className="text-muted-foreground mb-6">
                                Our CRM curriculum aligns with international aviation safety standards and airline assessment criteria.
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
                                Students practise CRM skills through group exercises, simulator scenarios, and facilitated debriefs.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Step-by-Step Training Path</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A structured progression that builds knowledge, practical skill, and airline-readiness at every stage.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry Insights Programme</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Benefit from guest lectures and insider knowledge from experienced airline professionals.
                            Stay updated on industry trends, regulations, and best practices to enhance your readiness.
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
                            Career Opportunities After Airline Preparation
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Graduates of our Airline Preparation Course are equipped to pursue roles across the full
                            spectrum of commercial aviation operations.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {careerOutcomes.map((career, index) => (
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
                            Why the Right Preparation Makes All the Difference
                        </h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            The transition from completing your pilot training to securing a position at an airline is
                            highly competitive. Airlines assess candidates on technical knowledge, CRM competencies,
                            simulator performance, and communication skills simultaneously.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            Our Airline Preparation Course ensures you walk into every assessment and interview with
                            structured preparation, practised skills, and the confidence that comes from expert-guided
                            readiness — significantly improving your selection prospects.
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
                            Common questions about our Airline Preparation Course and what to expect.
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
                            Take the Next Step Towards Your Airline Career
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-4">
                            The Airline Preparation Course is more than training — it is your competitive advantage
                            in the airline selection process. From CRM and simulator proficiency to polished interview
                            performance, every module is designed to maximise your chances of success.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            If you are a CPL holder or final-year trainee ready to pursue your dream of flying for
                            a commercial airline, enrol in our Airline Preparation Course today and take the most
                            important step towards your first officer role.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/airline-prep/fees">Get Course Fees</Link>
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