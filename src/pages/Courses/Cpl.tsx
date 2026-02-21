import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
    Plane,
    GraduationCap,
    BookOpen,
    DollarSign,
    Briefcase,
    TrendingUp,
    ArrowRight,
    ChevronRight,
    CheckCircle,
    ChevronLeft,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Image Slider Data ────────────────────────────────────────────────────────
const heroSlides = [
    {
        image: "/cpl-slider/slider1.jpeg",
        caption: "Your First Step Toward the Cockpit",
    },
    {
        image: "/cpl-slider/silder2.jpeg",
        caption: "World-Class Flying Training",
    },
    {
        image: "/cpl-slider/slider3.jpeg",
        caption: "Real Cross-Country Experience",
    },
    {
        image: "/cpl-slider/slider4.jpeg",
        caption: "CPL Certified & Career Ready",
    },
    {
        image: "/cpl-slider/slider5.jpeg",
        caption: "Professional Flight Training",
    },
];

// ─── Hero Image Slider Component ──────────────────────────────────────────────
function HeroImageSlider() {
    const [current, setCurrent] = useState(0);
    const [fading, setFading] = useState(false);

    const goTo = useCallback(
        (index: number) => {
            if (fading) return;
            setFading(true);
            setTimeout(() => {
                setCurrent(index);
                setFading(false);
            }, 300);
        },
        [fading]
    );

    const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);
    const next = () => goTo((current + 1) % heroSlides.length);

    useEffect(() => {
        const timer = setInterval(next, 4500);
        return () => clearInterval(timer);
    }, [current]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center gap-4 flex-shrink-0 ml-auto"
            style={{ width: "clamp(380px, 46vw, 600px)", marginRight: "-5rem" }}
        >
            {/* Slider Card */}
            <div
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "4/3" }}
            >
                {/* Image */}
                <img
                    key={current}
                    src={heroSlides[current].image}
                    alt={heroSlides[current].caption}
                    className="w-full h-full object-cover"
                    style={{
                        opacity: fading ? 0 : 1,
                        transition: "opacity 0.3s ease",
                    }}
                />

                {/* Caption overlay */}
                <div
                    className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10"
                    style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
                    }}
                >
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                        <span
                            className="inline-block rounded-full flex-shrink-0"
                            style={{ width: 4, height: 18, background: "#f0b429" }}
                        />
                        {heroSlides[current].caption}
                    </div>
                </div>

                {/* Prev Button */}
                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.4)")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)")
                    }
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Next Button */}
                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.4)")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)")
                    }
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="rounded-full border-none cursor-pointer transition-all duration-300"
                        style={{
                            width: i === current ? 24 : 8,
                            height: 8,
                            background: i === current ? "#f0b429" : "rgba(255,255,255,0.4)",
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// ─── Page Data ────────────────────────────────────────────────────────────────
const cplServices = [
    {
        icon: Plane,
        title: "Commercial Pilot License",
        description:
            "A commercial pilot license is a professional certification that allows individuals to fly aircraft for commercial operations.",
        href: "/courses/cpl",
    },
    {
        icon: BookOpen,
        title: "Ground Classes",
        description:
            "Comprehensive ground training covering all DGCA exam subjects — Air Navigation, Meteorology, Air Regulations, Technical General & Specific.",
        href: "/dgca/ground-classes",
    },
    {
        icon: GraduationCap,
        title: "CPL Course Fees",
        description:
            "The total CPL licence cost depends on flying hours, aircraft type, and training facilities. Get a complete fee breakdown.",
        href: "/courses/cpl",
    },
    {
        icon: TrendingUp,
        title: "Career After CPL",
        description:
            "Explore career options as an Airline First Officer, Charter Pilot, Cargo Pilot, Corporate Pilot, or Flight Instructor.",
        href: "/about",
    },
];

const trainingSteps = [
    {
        step: 1,
        title: "Admission",
        description:
            "Complete 10+2 with Physics and Mathematics, apply for the commercial pilot licence course.",
    },
    {
        step: 2,
        title: "Ground Training",
        description:
            "Attend CPL ground classes covering Air Navigation, Meteorology, Air Regulations, Technical General and Technical Specific.",
    },
    {
        step: 3,
        title: "DGCA Exams",
        description:
            "Prepare for and clear all DGCA theory examinations to qualify for flying training.",
    },
    {
        step: 4,
        title: "Flying Training Hours",
        description:
            "Complete required aircraft flying hours and simulator training at an FTO.",
    },
    {
        step: 5,
        title: "Skill Tests",
        description:
            "Pass the final skill test conducted by a DGCA-authorised examiner.",
    },
    {
        step: 6,
        title: "CPL License Issued",
        description:
            "Receive your Commercial Pilot License and begin your airline career path.",
    },
];

const courseOverview = [
    { label: "Course Name", value: "Commercial Pilot License Course" },
    { label: "Course Type", value: "Professional Pilot Course" },
    { label: "Training Mode", value: "Ground + Flying" },
    { label: "Eligibility", value: "10+2 with PCM" },
    { label: "License", value: "CPL License" },
    { label: "Career Outcome", value: "Commercial Pilot" },
];

const groundSubjects = [
    { name: "Air Navigation", pass: "70%", papers: 1 },
    { name: "Meteorology", pass: "70%", papers: 1 },
    { name: "Air Regulations", pass: "70%", papers: 1 },
    { name: "Technical General", pass: "70%", papers: 1 },
    { name: "Technical Specific", pass: "70%", papers: 1 },
];

const careerOptions = [
    { title: "Airline First Officer", icon: Plane },
    { title: "Charter Pilot", icon: Plane },
    { title: "Cargo Pilot", icon: Briefcase },
    { title: "Corporate Aviation Pilot", icon: Briefcase },
    { title: "Flight Instructor", icon: GraduationCap },
];

const salaryGrowth = [
    { stage: "Fresh CPL holder", level: "₹1.5Lakh to ₹2.5Lakh", icon: DollarSign },
    { stage: "Mid-level pilot", level: "₹3.5Lakh to ₹8.5Lakh", icon: TrendingUp },
    { stage: "Captain", level: "₹8Lakh to ∞", icon: TrendingUp },
];

const faqs = [
    {
        question: "What is a Commercial Pilot License?",
        answer:
            "A commercial pilot license is a professional certification that allows individuals to fly aircraft for commercial operations. After completing a commercial pilot licence course, candidates can work with airlines, cargo companies, charter operators, and aviation organizations.",
    },
    {
        question: "What is the eligibility for a CPL course in India?",
        answer:
            "Students must complete 10+2 with Physics and Mathematics, pass a medical fitness test, apply for the commercial pilot licence course, confirm admission in the CPL program, and then begin ground classes and flying training.",
    },
    {
        question: "What does the commercial pilot license syllabus cover?",
        answer:
            "The commercial pilot license syllabus covers Air Navigation, Meteorology, Air Regulations, Technical General, and Technical Specific. Students also attend CPL ground classes to prepare for DGCA theory exams and develop a strong understanding of aviation concepts.",
    },
    {
        question: "How much does the CPL course cost?",
        answer:
            "The total CPL licence cost depends on several factors like flying hours, aircraft type, and training facilities. It includes flying training charges, ground classes, simulator training, exam and licensing fees, and study materials. The total commercial pilot fees can vary depending on the academy and training structure.",
    },
    {
        question: "What are the career options after completing a CPL course?",
        answer:
            "After completing a commercial pilot license course in India, students can work as an Airline First Officer, Charter Pilot, Cargo Pilot, Corporate Aviation Pilot, or Flight Instructor. A CPL pilot can grow into a captain role with experience and flight hours.",
    },
];

const keyAdvantages = [
    "Strong career growth in aviation",
    "Opportunity to travel globally",
    "High earning potential",
    "Respected profession",
    "Exciting and dynamic work environment",
];

const feesBreakdown = [
    "Flying training charges",
    "Ground classes",
    "Simulator training",
    "Exam and licensing fees",
    "Study materials",
];

const admissionSteps = [
    "Complete 10+2 with Physics and Mathematics",
    "Apply for the commercial pilot licence course",
    "Pass medical fitness test",
    "Confirm admission in CPL program",
    "Begin ground classes and flying training",
];

// ─── Page Component ───────────────────────────────────────────────────────────
export default function CPLCoursePage() {
    return (
        <Layout>
            <Helmet>
                <title>Commercial Pilot License Course in India | CPL Training</title>
                <meta
                    name="description"
                    content="Become a commercial pilot with DGCA-approved pilot training in India. Check CPL course fees, eligibility, syllabus & career opportunities. Apply now."
                />
            </Helmet>

            {/* ── Hero Section ── */}
            <section className="relative py-24 aviation-gradient text-primary-foreground overflow-hidden">
                <div className="container !pr-0">
                    {/* Two-column layout: content left, slider right */}
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        {/* Left: Text content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 max-w-2xl"
                        >
                            <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                                Plan Commercial Pilot License Course in India - Complete Guide to Pilot Training & Career
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Commercial Pilot License Course - Start Your Pilot Training Journey
                            </h1>
                            <p className="text-xl text-primary-foreground/80 mb-8">
                                Become a professional commercial pilot with a structured pilot course designed to give you
                                world-class pilot training and real flying experience. Our commercial pilot course prepares
                                students for a successful aviation career with complete ground training, flying practice, and
                                career guidance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="gold" size="lg" asChild>
                                    <Link to="/rtr">
                                        Apply Now
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button variant="outline-white" size="lg" asChild>
                                    <Link to="/cpl/fees">Get CPL Course Fees</Link>
                                </Button>
                                <Button variant="outline-white" size="lg" asChild>
                                    <Link to="/contact">Talk to Counselor</Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Right: Image Slider */}
                        <HeroImageSlider />

                    </div>
                </div>
            </section>

            {/* ── What is CPL ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Understanding the Commercial Pilot License (CPL)
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            A commercial pilot license is a professional certification that allows individuals to fly aircraft
                            for commercial operations. After completing a commercial pilot licence course, candidates can work
                            with airlines, cargo companies, charter operators, and aviation organizations.
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
                                This pilot course is the most important step for students who want to build a long-term career
                                in aviation. With proper commercial pilot training, students gain both theoretical knowledge and
                                practical flying experience required to become skilled pilots.
                            </p>
                            <p className="text-muted-foreground">
                                The commercial pilot license course in India follows DGCA guidelines and ensures students are
                                trained according to industry safety standards.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {cplServices.map((service) => (
                                    <Link to={service.href} key={service.title} className="block group">
                                        <div className="h-full p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <service.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-sm font-bold mb-1">{service.title}</h3>
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

            {/* ── Benefits ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Benefits of Becoming a CPL Pilot
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choosing a commercial pilot course opens doors to a high-growth profession. Aviation is expanding
                            rapidly, creating a strong demand for trained pilots across domestic and international airlines.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {keyAdvantages.map((advantage, index) => (
                            <motion.div
                                key={advantage}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border"
                            >
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="font-medium">{advantage}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center text-muted-foreground mt-8"
                    >
                        Completing a cpl course allows students to become a certified cpl pilot and explore multiple career opportunities.
                    </motion.p>
                </div>
            </section>

            {/* ── Training Structure ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Structure of Commercial Pilot Training
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Commercial pilot training in India includes both classroom learning and practical flying. A
                            professional CPL pilot training program ensures that students are trained in all aspects of aviation.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">Training Includes</h3>
                            <ul className="space-y-4">
                                {[
                                    "Ground theory classes",
                                    "Flight simulator training",
                                    "Aircraft flying hours",
                                    "Safety and emergency handling",
                                    "DGCA exam preparation",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm text-muted-foreground mt-6">
                                This complete commercial pilot training structure helps students gain confidence and technical knowledge.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-bold mb-6">Subjects Covered in CPL Course</h3>
                            <p className="text-muted-foreground mb-6">
                                The commercial pilot license syllabus is designed to prepare students for real-world aviation operations.
                            </p>
                            <div className="rounded-2xl border border-border overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-primary text-primary-foreground">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-sm">Subject</th>
                                            <th className="px-4 py-3 text-center font-semibold text-sm">Papers</th>
                                            <th className="px-4 py-3 text-center font-semibold text-sm">Pass %</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groundSubjects.map((subject, index) => (
                                            <tr key={subject.name} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                                <td className="px-4 py-3 text-sm">{subject.name}</td>
                                                <td className="px-4 py-3 text-center text-sm">{subject.papers}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                                                        <CheckCircle className="h-3 w-3" />
                                                        {subject.pass}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">
                                Students also attend cpl ground classes to prepare for DGCA theory exams and develop a strong understanding of aviation concepts.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Admission Process ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Step-by-Step Admission Guide
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The Commercial Pilot License Admission Process is simple and structured. Students must meet
                            academic and medical requirements before starting training.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                        {admissionSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-xl bg-card border border-border"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                                <p className="text-sm text-muted-foreground pt-2">{step}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-muted-foreground"
                    >
                        This process ensures students are prepared for professional pilot training.
                    </motion.p>
                </div>
            </section>

            {/* ── CPL Fees ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">CPL Course Fees in India</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            One of the most common questions is about CPL course fees. The total cpl licence cost depends on
                            several factors like flying hours, aircraft type, and training facilities.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">CPL Licence Cost Includes</h3>
                            <ul className="space-y-4">
                                {feesBreakdown.map((item, i) => (
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
                            className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-center"
                        >
                            <p className="text-muted-foreground mb-6">
                                The total commercial pilot fees can vary depending on the academy and training structure.
                                However, this investment leads to a high-value career in aviation.
                            </p>
                            <Button variant="gold" size="lg" asChild className="w-full">
                                <Link to="/cpl/fees">
                                    Get Detailed Fee Breakdown
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Training Journey Steps ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Step-by-Step Training Path</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            This structured CPL pilot training helps students gradually develop knowledge, flying skills, and confidence.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainingSteps.map((item, index) => (
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

            {/* ── Career Opportunities ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Jobs After Commercial Pilot Training
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            After completing a commercial pilot license course in India, students can explore various career paths.
                            A cpl pilot can grow into a captain role with experience and flight hours.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {careerOptions.map((career, index) => (
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

                    {/* Salary Growth */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Salary After Commercial Pilot Training</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The commercial pilot license salary depends on experience, airline, and aircraft type. With experience,
                            pilots enjoy strong financial growth and international career opportunities.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {salaryGrowth.map((item, index) => (
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
                                <p className="text-sm text-muted-foreground">{item.level}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Course Overview Table ── */}
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

            {/* ── Why Choose ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Importance of the Right Pilot Course
                        </h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            Selecting the right pilot course is crucial for building a successful aviation career. A well-structured
                            commercial pilot licence course provides proper guidance, experienced instructors, and quality training
                            facilities.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            A strong foundation in pilot training helps students clear exams, gain flying experience, and secure
                            aviation jobs faster.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ── */}
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
                            Common questions about commercial pilot license course and pilot training in India.
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

            {/* ── Final CTA ── */}
            <section className="py-20 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Build Your Aviation Career Today
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-4">
                            A commercial pilot license is more than just a certification — it is the beginning of an exciting
                            and rewarding profession. From structured commercial pilot training and DGCA-approved syllabus to
                            real flight experience, the cpl course prepares students for a successful future.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            If you are passionate about aviation and dream of flying professionally, enrolling in a commercial
                            pilot license course in India is the first step toward achieving your goal. With the right training,
                            dedication, and guidance, you can become a confident and skilled commercial pilot and build a strong
                            career in the aviation industry.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/cpl/fees">Get CPL Course Fees</Link>
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