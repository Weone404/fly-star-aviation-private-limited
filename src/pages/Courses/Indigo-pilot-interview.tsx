import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Plane,
    GraduationCap,
    BookOpen,
    Briefcase,
    TrendingUp,
    ArrowRight,
    ChevronRight,
    CheckCircle,
    Users,
    Shield,
    Star,
    Clock,
    Target,
    Award,
    MessageSquare,
    Brain,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const preparationHighlights = [
    {
        icon: Brain,
        title: "ADAPT / Psychometric Test",
        description:
            "Comprehensive preparation strategies and practice sessions for IndiGo's psychometric evaluation.",
        href: "/contact",
    },
    {
        icon: Users,
        title: "Group Discussion (GD)",
        description:
            "Real-time GD practice with evaluation, techniques, and feedback from aviation mentors.",
        href: "/contact",
    },
    {
        icon: MessageSquare,
        title: "Personal Interview (PI)",
        description:
            "HR and technical interview preparation with mock sessions tailored to IndiGo's format.",
        href: "/contact",
    },
    {
        icon: Plane,
        title: "A320 Type Rating Prep",
        description:
            "Specialized technical interview coaching for pilots with Airbus A320 type rating.",
        href: "/contact",
    },
];

const selectionStages = [
    {
        step: 1,
        title: "ADAPT / Psychometric Test",
        description:
            "Prepare with targeted strategies and practice sessions designed specifically for IndiGo's psychometric evaluation format.",
    },
    {
        step: 2,
        title: "Group Discussion (GD)",
        description:
            "Master GD techniques through real-time practice with live evaluation and constructive feedback.",
    },
    {
        step: 3,
        title: "HR Interview",
        description:
            "Build confidence and communication skills with structured HR interview preparation and mock sessions.",
    },
    {
        step: 4,
        title: "Technical Interview",
        description:
            "Deep-dive into airline knowledge, SOPs, and technical concepts tested by IndiGo interviewers.",
    },
    {
        step: 5,
        title: "Simulator / Sim Check",
        description:
            "Understand what to expect in type-rating sim checks and how to perform under evaluation conditions.",
    },
    {
        step: 6,
        title: "Final Selection",
        description:
            "Consolidate everything — confidence, technical knowledge, communication, and airline readiness.",
    },
];

const courseOverview = [
    { label: "Program Name", value: "IndiGo JFO Interview Preparation 2026" },
    { label: "Eligibility", value: "CPL Holders & A320 Type Rated Pilots" },
    { label: "Training Mode", value: "Online + Offline" },
    { label: "Batch Options", value: "Weekday / Weekend" },
    { label: "Focus Areas", value: "ADAPT, GD, HR Interview, Technical Interview" },
    { label: "Target Outcome", value: "IndiGo Junior First Officer (JFO) Selection" },
];

const cplModules = [
    { name: "ADAPT Test Strategies", description: "In-depth strategies and timed practice sessions for the psychometric test" },
    { name: "GD Techniques", description: "Real-time group discussion practice with live evaluation and peer feedback" },
    { name: "HR Interview Preparation", description: "Structured coaching for HR rounds with confidence-building exercises" },
    { name: "Technical Interview Prep", description: "Core aviation concepts, airline knowledge, and SOP fundamentals" },
    { name: "Airline Knowledge & SOPs", description: "IndiGo-specific operational knowledge and standard procedures" },
    { name: "Communication & Confidence", description: "Voice modulation, body language, and effective communication techniques" },
];

const a320Modules = [
    { name: "A320 Technical Interview", description: "Airbus A320-specific systems, operations, and technical Q&A preparation" },
    { name: "Scenario-Based Questions", description: "Real airline scenarios and decision-making frameworks used in interviews" },
    { name: "HR Interview Polishing", description: "Advanced HR coaching for type-rated pilot profiles and experience articulation" },
    { name: "CRM & Airline SOPs", description: "Crew Resource Management principles and IndiGo SOP understanding" },
    { name: "Advanced Mock Interviews", description: "Simulated interview sessions with airline mentor feedback and scoring" },
    { name: "Performance Review", description: "Personalized improvement plans based on mock test and session evaluations" },
];

const whyChoose = [
    "Airline pilot mentors with real-world experience",
    "IndiGo-specific preparation modules",
    "Realistic mock tests & simulations",
    "Personalized feedback & improvement plan",
    "Proven success-focused training approach",
    "Small batch sizes for focused learning",
];

const whoShouldJoin = [
    { title: "CPL Holders", description: "Preparing for IndiGo JFO recruitment", icon: GraduationCap },
    { title: "A320 Type Rated Pilots", description: "Targeting IndiGo direct entry", icon: Plane },
    { title: "Interview-Stage Candidates", description: "Already shortlisted for IndiGo rounds", icon: Target },
    { title: "GD + PI Improvement", description: "Pilots needing communication coaching", icon: MessageSquare },
    { title: "Returner Pilots", description: "Re-attempting IndiGo after previous attempt", icon: TrendingUp },
    { title: "Freshers", description: "First-time airline interview aspirants", icon: Star },
];

const batchInfo = [
    {
        title: "Weekday Batch",
        details: "Monday to Friday, ideal for full-time preparation candidates",
        icon: Clock,
    },
    {
        title: "Weekend Batch",
        details: "Saturday & Sunday sessions for working professionals",
        icon: Clock,
    },
    {
        title: "Online Mode",
        details: "Live interactive sessions accessible from anywhere in India",
        icon: BookOpen,
    },
    {
        title: "Offline Mode",
        details: "In-person training for immersive, hands-on preparation",
        icon: Users,
    },
];

const faqs = [
    {
        question: "Who is this program designed for?",
        answer:
            "This program is specifically designed for CPL holders and A320 Type Rated pilots aiming to clear the IndiGo Junior First Officer (JFO) 2026 selection process. It's also suitable for pilots appearing in their first airline interview or those looking to improve after a previous attempt.",
    },
    {
        question: "What is the ADAPT test and how do you prepare for it?",
        answer:
            "ADAPT is a psychometric assessment used by IndiGo to evaluate pilot aptitude, decision-making patterns, and personality traits. Our program includes targeted strategy sessions and timed practice papers modeled on the actual test format to help you score optimally.",
    },
    {
        question: "Is the training available online?",
        answer:
            "Yes, we offer both online and offline training modes. Online sessions are conducted live with interactive participation, mock tests, and real-time feedback. Offline batches are available at our training center for a more immersive experience.",
    },
    {
        question: "What is the difference between the CPL Holder and A320 Type Rated program?",
        answer:
            "The CPL Holder program covers foundational airline interview preparation including ADAPT, GD, HR, and general technical topics. The A320 Type Rated program goes deeper into Airbus A320-specific technical questions, CRM, advanced scenarios, and is tailored for pilots who already hold a type rating.",
    },
    {
        question: "How many seats are available per batch?",
        answer:
            "We maintain limited batch sizes to ensure personalized attention and focused preparation for each candidate. Early registration is recommended as seats fill up quickly before new IndiGo recruitment cycles.",
    },
    {
        question: "What is the success track record of We One Aviation?",
        answer:
            "We One Aviation has trained numerous pilots who have successfully cleared IndiGo and other major airline selection processes. Our mentors are experienced airline pilots who provide real-world insights and proven preparation strategies.",
    },
];

export default function IndiGoPilotInterviewPage() {
    return (
        <Layout>
            <Helmet>
                <title>IndiGo Pilot Interview Preparation (JFO 2026) | We One Aviation</title>
                <meta name="description" content="Ace the IndiGo JFO 2026 selection process with We One Aviation. Structured preparation for ADAPT test, Group Discussion, HR & Technical Interview. CPL & A320 Type Rated programs available." />
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
                            ✈️ IndiGo Pilot Interview Preparation – JFO 2026
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Ace Your IndiGo JFO Selection Process
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            At We One Aviation, we provide a structured and result-driven training program to help aspiring pilots successfully clear the IndiGo Junior First Officer (JFO) recruitment process (2026). Our program is tailored for both CPL holders and Type Rated pilots (A320), covering every stage of the IndiGo selection process.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Check Batch Dates</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Selection Stages Overview */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            IndiGo Selection Stages Covered
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            We prepare you comprehensively for every stage of the IndiGo JFO selection process — from the psychometric test to the final personal interview. No stage is left unprepared.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-4">Our Complete Preparation Coverage</h3>
                            <p className="text-muted-foreground mb-4">
                                IndiGo's Junior First Officer selection is a multi-stage process that tests aptitude, personality, communication, and technical knowledge. Our program ensures you are thoroughly prepared for each round with dedicated modules, practice sessions, and expert mentoring.
                            </p>
                            <p className="text-muted-foreground">
                                With airline pilot mentors guiding every session, you get insider perspectives on what IndiGo evaluators look for — giving you a decisive edge over other candidates.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {preparationHighlights.map((item) => (
                                    <Link to={item.href} key={item.title} className="block group">
                                        <div className="h-full p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-sm font-bold mb-1">{item.title}</h3>
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

            {/* CPL Holder Program */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-sm font-semibold bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                            🧑‍✈️ For Fresh Commercial Pilots
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            CPL Holder Preparation Program
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Designed for fresh commercial pilots aiming to enter IndiGo. This program builds your foundation across all selection stages with focused modules and personalized coaching.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cplModules.map((module, index) => (
                            <motion.div
                                key={module.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <h3 className="font-bold text-lg mb-2">{module.name}</h3>
                                <p className="text-sm text-muted-foreground">{module.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* A320 Type Rated Program */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-sm font-semibold bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                            🛫 For A320 Type Rated Pilots
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Type Rated Pilot Program (A320)
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Specialized training for pilots with Airbus A320 type rating. Go deeper into aircraft-specific technical preparation, advanced mock sessions, and airline-readiness coaching.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {a320Modules.map((module, index) => (
                            <motion.div
                                key={module.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <h3 className="font-bold text-lg mb-2">{module.name}</h3>
                                <p className="text-sm text-muted-foreground">{module.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why Choose We One Aviation?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our preparation program is built on real airline experience, proven coaching methodologies, and a commitment to your success in the IndiGo JFO selection.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {whyChoose.map((reason, index) => (
                            <motion.div
                                key={reason}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border"
                            >
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="font-medium text-sm">{reason}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Step-by-Step Training Path */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">IndiGo Selection Stages We Cover</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our structured preparation program takes you through every stage of the IndiGo JFO selection — building knowledge, confidence, and readiness at each step.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectionStages.map((item, index) => (
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

            {/* Batch Information */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block text-sm font-semibold bg-amber-500/10 text-amber-600 px-4 py-2 rounded-full mb-4">
                            🚨 New Batches Starting Soon
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Batch Options</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Limited seats for focused learning. Choose the batch that fits your schedule and learning preference.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
                        {batchInfo.map((batch, index) => (
                            <motion.div
                                key={batch.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                                    <batch.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-base mb-2">{batch.title}</h3>
                                <p className="text-xs text-muted-foreground">{batch.details}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-4">Register Early</h3>
                            <ul className="space-y-3">
                                {[
                                    "Limited seats per batch for focused attention",
                                    "Flexible weekday and weekend options",
                                    "Online + offline training available",
                                    "New batches aligned with IndiGo recruitment cycles",
                                ].map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-center"
                        >
                            <p className="text-muted-foreground mb-6">
                                Seats are limited to ensure every candidate receives personalized mentoring and focused preparation.
                                Contact us now to secure your spot before the next IndiGo recruitment cycle.
                            </p>
                            <Button variant="gold" size="lg" asChild className="w-full">
                                <Link to="/contact">
                                    Reserve Your Seat
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Who Should Join */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            🏆 Who Should Join?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            This program is designed for pilots at various stages of their career journey who are targeting the IndiGo JFO position.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {whoShouldJoin.map((candidate, index) => (
                            <motion.div
                                key={candidate.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <candidate.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{candidate.title}</h3>
                                <p className="text-sm text-muted-foreground">{candidate.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Overview Table */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Program Overview</h2>
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

            {/* Why IndiGo Ground Staff Course */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Why Start Preparation Now?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            IndiGo is India's largest airline and regularly conducts JFO recruitment to meet growing demand. The competition is intense — candidates who prepare systematically with the right guidance have a significantly higher success rate.
                        </p>
                        <p className="text-muted-foreground text-lg mb-4">
                            Our program is not just about interview tips — it is a comprehensive preparation ecosystem that includes psychometric test training, group discussion practice, technical mock sessions, and personalized feedback. Every component is designed to get you ready for IndiGo's specific evaluation criteria.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            Whether you are a fresh CPL holder or an A320 type-rated pilot, starting early gives you the advantage of time, practice, and confidence that translates directly into selection success.
                        </p>
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
                            Common questions about the IndiGo JFO interview preparation program at We One Aviation.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            📞 Contact We One Aviation
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-4">
                            Ready to begin your IndiGo JFO preparation? Our counselors are available to guide you on the right program, upcoming batch dates, and everything you need to start your journey toward becoming an IndiGo pilot.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Don't wait — IndiGo recruitment cycles move fast, and early preparation is the key to success. Reach out today and take the first step toward your airline career.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Check Batch Dates</Link>
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