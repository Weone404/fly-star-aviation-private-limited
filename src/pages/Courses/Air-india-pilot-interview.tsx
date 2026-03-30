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
    Phone,
    Mail,
    Globe,
    Instagram,
    Award,
    Target,
    Clock,
    Zap,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const selectionStages = [
    {
        icon: Target,
        title: "Psychometric / ADAPT-style Assessments",
        description:
            "Strategic preparation for psychometric tests used in airline pilot recruitment, including ADAPT-style assessment formats.",
        href: "/contact",
    },
    {
        icon: Users,
        title: "Group Discussions (GD)",
        description:
            "Structured GD practice sessions with evaluation, feedback, and communication skill development.",
        href: "/contact",
    },
    {
        icon: Briefcase,
        title: "Personal Interviews – HR",
        description:
            "In-depth HR interview coaching with airline-specific scenarios and confidence-building techniques.",
        href: "/contact",
    },
    {
        icon: BookOpen,
        title: "Personal Interviews – Technical",
        description:
            "Technical interview preparation covering aircraft systems, SOPs, CRM, and line operations.",
        href: "/contact",
    },
];

const cplTrainingIncludes = [
    "ADAPT & psychometric test strategies",
    "GD communication & evaluation practice",
    "HR + technical interview preparation",
    "Airline knowledge & SOP awareness",
    "Confidence building sessions",
];

const typeRatedTrainingIncludes = [
    "Aircraft-specific technical interview prep",
    "Scenario-based questioning (line operations)",
    "HR interview polishing",
    "Airline SOP & CRM concepts",
    "Real airline-level mock interviews",
];

const differentiators = [
    {
        icon: Award,
        title: "Airline Professional Mentorship",
        description: "Learn from experienced airline professionals who know exactly what recruiters look for.",
    },
    {
        icon: Target,
        title: "Realistic Mock Assessments",
        description: "Practice with assessments modelled on actual Air India selection procedures.",
    },
    {
        icon: TrendingUp,
        title: "Personalized Feedback",
        description: "Receive a tailored improvement plan based on your individual performance and areas of growth.",
    },
    {
        icon: Shield,
        title: "Air India-Specific Patterns",
        description: "Training focused on Air India's unique hiring patterns, expectations, and evaluation criteria.",
    },
    {
        icon: Zap,
        title: "Proven Methodology",
        description: "A structured preparation approach refined through years of successful candidate placements.",
    },
];

const whoShouldJoin = [
    "CPL holders preparing for airline interviews",
    "Type Rated pilots targeting Air India",
    "Pilots who want structured GD + PI preparation",
    "Candidates aiming to improve confidence & performance",
];

const batchDetails = [
    { icon: Clock, label: "Start", value: "New batches starting soon" },
    { icon: Users, label: "Seats", value: "Limited seats for focused training" },
    { icon: Briefcase, label: "Schedule", value: "Weekend & weekday batches available" },
    { icon: Globe, label: "Mode", value: "Online + classroom options" },
];

const faqs = [
    {
        question: "Who is this Air India Pilot Interview Preparation program for?",
        answer:
            "This program is designed for CPL holders preparing for airline interviews, Type Rated pilots (A320/B737) targeting Air India, and any pilot who wants structured Group Discussion and Personal Interview preparation to improve confidence and performance.",
    },
    {
        question: "What stages of the Air India selection process are covered?",
        answer:
            "Our program covers all key stages: Psychometric / ADAPT-style assessments, Group Discussions (GD), HR Personal Interviews, and Technical Personal Interviews. Training is built around the actual airline hiring process.",
    },
    {
        question: "Is there separate training for CPL holders and Type Rated pilots?",
        answer:
            "Yes. We offer a dedicated course for CPL holders focusing on airline entry preparation, and a separate tailored program for Type Rated pilots (A320/B737) targeting Air India fleet operations, with aircraft-specific technical interview prep.",
    },
    {
        question: "Are online batches available?",
        answer:
            "Yes. We One Aviation offers both online and classroom training options, with weekend and weekday batches to suit different schedules. New batches are starting soon with limited seats.",
    },
    {
        question: "How can I contact We One Aviation to enroll?",
        answer:
            "You can reach us at +91 9555291956 or +91 9717977702, email info@weoneaviation.in, or visit our website at https://www.weoneaviation.in. You can also find us on Instagram @topflyer_pilot.",
    },
    {
        question: "What makes We One Aviation's preparation methodology different?",
        answer:
            "Our training is mentored by airline professionals, uses realistic mock assessments, and is specifically focused on Air India's hiring patterns. Each candidate receives personalized feedback and a tailored improvement plan — not a one-size-fits-all approach.",
    },
];

export default function AirIndiaPilotInterviewPage() {
    return (
        <Layout>
            <Helmet>
                <title>Air India Pilot Interview Preparation 2026 | We One Aviation</title>
                <meta
                    name="description"
                    content="Crack the Air India pilot selection process with We One Aviation. Structured preparation for CPL holders & Type Rated pilots – Psychometric, GD, HR & Technical interviews. Enroll now."
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
                            ✈️ Air India Pilot Interview Preparation (2026) – We One Aviation
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Crack Your Air India Pilot Selection Process
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            At We One Aviation, we offer a structured and airline-focused training program designed to help pilots successfully clear the Air India recruitment process. Whether you are a CPL holder or a Type Rated pilot (A320/B737), our training prepares you for every stage of selection with precision and confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Join Preparation Program
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Check Batch Schedule</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <a href="tel:+919555291956">Talk to Counselor</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Selection Stages We Cover */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Air India Selection Stages We Cover
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Our program is built around the actual airline hiring process. We prepare you thoroughly for every stage of the Air India pilot selection — from psychometric testing to final personal interviews.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-4">Why Structured Preparation Matters</h3>
                            <p className="text-muted-foreground mb-4">
                                Airline pilot selection is highly competitive. Beyond flying skills, Air India evaluates communication, psychological fit, technical depth, and leadership potential. Most candidates underestimate these non-technical stages.
                            </p>
                            <p className="text-muted-foreground">
                                We One Aviation's program gives you the structure, practice, and insider knowledge to walk into each stage with confidence and clarity.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {selectionStages.map((stage) => (
                                    <Link to={stage.href} key={stage.title} className="block group">
                                        <div className="h-full p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <stage.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-sm font-bold mb-1">{stage.title}</h3>
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

            {/* CPL Holders Course */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            🧑‍✈️ Courses for CPL Holders
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Designed for fresh commercial pilots preparing for airline entry. Build the skills, knowledge, and confidence needed to clear Air India's multi-stage selection process.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {cplTrainingIncludes.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border"
                            >
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="font-medium text-sm">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-10"
                    >
                        <Button variant="gold" size="lg" asChild>
                            <Link to="/contact">
                                Enroll as CPL Holder
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Type Rated Pilots */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            🛫 Type Rated Pilot Preparation (A320 / B737)
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Tailored for experienced pilots aiming to join Air India fleet operations. Go beyond technical knowledge and master the full interview process.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {typeRatedTrainingIncludes.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border"
                            >
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="font-medium text-sm">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-10"
                    >
                        <Button variant="gold" size="lg" asChild>
                            <Link to="/contact">
                                Enroll as Type Rated Pilot
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            🧠 What Makes Our Training Different?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We don't just teach you what to say — we prepare you to think, perform, and succeed under real airline evaluation conditions.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {differentiators.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Batches */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">📅 Upcoming Batches</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            🚨 New batches starting soon — secure your seat before it fills up.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">Batch Details</h3>
                            <div className="space-y-4">
                                {batchDetails.map((detail) => (
                                    <div key={detail.label} className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <detail.icon className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{detail.label}</p>
                                            <p className="text-sm text-muted-foreground">{detail.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-center"
                        >
                            <p className="text-muted-foreground mb-6">
                                Seats are limited for each batch to ensure focused, personalized attention for every pilot. Don't miss your window to prepare with India's leading airline interview training team.
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
            <section className="py-20 bg-muted/30">
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
                            This program is ideal for pilots at any stage who are serious about clearing the Air India selection process.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {whoShouldJoin.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border"
                            >
                                <Star className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="font-medium text-sm">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">📞 Contact We One Aviation</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Get in touch with our team to learn more about upcoming batches, course details, and enrollment.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Phone,
                                label: "Phone",
                                value: "+91 9555291956 / 9717977702",
                                href: "tel:+919555291956",
                            },
                            {
                                icon: Globe,
                                label: "Website",
                                value: "www.weoneaviation.in",
                                href: "https://www.weoneaviation.in",
                            },
                            {
                                icon: Mail,
                                label: "Email",
                                value: "info@weoneaviation.in",
                                href: "mailto:info@weoneaviation.in",
                            },
                            {
                                icon: Instagram,
                                label: "Instagram",
                                value: "@topflyer_pilot",
                                href: "https://www.instagram.com/topflyer_pilot",
                            },
                        ].map((contact, index) => (
                            <motion.a
                                key={contact.label}
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="block p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <contact.icon className="h-6 w-6" />
                                </div>
                                <p className="font-bold text-sm mb-1">{contact.label}</p>
                                <p className="text-sm text-muted-foreground">{contact.value}</p>
                            </motion.a>
                        ))}
                    </div>
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
                            Common questions about the Air India pilot interview preparation program at We One Aviation.
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
                            🚀 Start Your Airline Career Today
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-4">
                            ✈️ Prepare Smart. Perform Better. Get Selected.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Join We One Aviation's Air India Pilot Interview Preparation Program and give yourself the edge you need to succeed in one of India's most competitive airline selection processes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Join Preparation Program Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Check Batch Schedule</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <a href="tel:+919555291956">Talk to Counselor</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}