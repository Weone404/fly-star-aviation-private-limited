import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { CitableAnswer } from "@/components/CitableAnswer";
import { CitableTable } from "@/components/CitableTable";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { PAGE_FAQS } from "@/lib/schema";

import {
    Plane,
    GraduationCap,
    BookOpen,
    FileCheck,
    AlertTriangle,
    Briefcase,
    TrendingUp,
    ArrowRight,
    ChevronRight,
    CheckCircle,
    ChevronLeft,
} from "lucide-react";

const lastReviewed = "2026-09-25";

const heroSlides = [
    {
        image: "/cpl-slider/slider1.webp",
        caption: "DGCA CPL ground classes",
    },
    {
        image: "/cpl-slider/silder2.webp",
        caption: "Structured subject preparation",
    },
    {
        image: "/cpl-slider/slider3.webp",
        caption: "Guidance for the CPL pathway",
    },
    {
        image: "/cpl-slider/slider4.webp",
        caption: "Career guidance for CPL aspirants",
    },
    {
        image: "/cpl-slider/slider5.webp",
        caption: "Commercial pilot licence preparation",
    },
];

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
            <div
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "4/3" }}
            >
                <img
                    key={current}
                    src={heroSlides[current].image}
                    alt={heroSlides[current].caption}
                    className="w-full h-full object-cover"
                    style={{
                        opacity: fading ? 0 : 1,
                        transition: "opacity 0.3s ease",
                    }}
                    width={1200}
                    height={900}
                />

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

const cplServices = [
    {
        icon: BookOpen,
        title: "DGCA Ground Classes",
        description: "Academic preparation for the DGCA theory papers that form part of CPL training in India.",
        href: "/dgca/ground-classes",
    },
    {
        icon: FileCheck,
        title: "DGCA Exam Preparation",
        description: "Structured subject preparation for the DGCA examination pathway and study planning.",
        href: "/dgca",
    },
    {
        icon: GraduationCap,
        title: "CPL Pathway Guidance",
        description: "Overview of the CPL process, eligibility checks, and how ground training fits with flying training.",
        href: "/become-a-pilot/commercial-pilot-licence",
    },
    {
        icon: Briefcase,
        title: "Career Guidance",
        description: "A practical overview of pilot career steps, airline criteria, and the role of ground classes in the process.",
        href: "/about",
    },
];

const trainingSteps = [
    {
        step: 1,
        title: "Obtain a DGCA Computer Number",
        description: "Register on the DGCA flight crew examination system before applying for pilot examinations.",
    },
    {
        step: 2,
        title: "Complete Required Medical Assessments",
        description: "Complete the Class 2 and Class 1 medical checks required for pilot licensing in India.",
    },
    {
        step: 3,
        title: "Complete DGCA CPL Ground Classes",
        description: "Study the academic subjects required for the DGCA theory examinations in a structured ground-school setting.",
    },
    {
        step: 4,
        title: "Complete CPL Theory Examinations and RTR(A)",
        description: "Clear the applicable DGCA theory papers and complete the radiotelephony requirement set by the WPC Wing.",
    },
    {
        step: 5,
        title: "Complete Required Flight Training at an Approved FTO",
        description: "Fulfill the aircraft flying-hour requirements through an approved Flying Training Organisation.",
    },
    {
        step: 6,
        title: "Complete Skill Tests and CPL Issuance",
        description: "Complete the necessary flight checks and licensing steps before the DGCA issues the CPL.",
    },
];

const courseOverview = [
    { label: "Course Name", value: "Commercial Pilot License (CPL) Program" },
    { label: "Regulating Authority", value: "Directorate General of Civil Aviation (DGCA), India" },
    { label: "Training Mode", value: "DGCA ground classes plus flight training at an approved FTO" },
    { label: "Minimum Eligibility", value: "10+2 with Physics and Mathematics or an equivalent accepted pathway" },
    { label: "Minimum Age", value: "18 years at the time of licence issuance" },
    { label: "Flight Training Hours", value: "200 hours of required flight training at an approved FTO" },
    { label: "Ground Training Location", value: "Flying Star Aviator, Dwarka, New Delhi" },
    { label: "Career Outcomes", value: "Airline First Officer, charter or corporate pilot, cargo pilot, flight instructor" },
];

const groundSubjects = [
    { name: "Air Navigation", focus: "Practical navigation, flight planning, instruments and route planning", passing: "DGCA assessment requirement" },
    { name: "Aviation Meteorology", focus: "Weather systems, clouds, winds, forecasting and operational meteorology", passing: "DGCA assessment requirement" },
    { name: "Air Regulations", focus: "Aviation laws, air traffic procedures and rules of the air", passing: "DGCA assessment requirement" },
    { name: "Technical General", focus: "Aircraft systems, principles of flight, engines and performance", passing: "DGCA assessment requirement" },
    { name: "Technical Specific", focus: "Aircraft type-specific systems and operational knowledge", passing: "DGCA assessment requirement" },
    { name: "RTR(A) Exam", focus: "Radio Telephony Restricted (Aeronautical) requirement associated with WPC", passing: "Pass requirement set by WPC" },
];

const careerOptions = [
    { title: "Commercial Airline First Officer", icon: Plane },
    { title: "Corporate & Business Jet Pilot", icon: Plane },
    { title: "Cargo Airline Operations", icon: Briefcase },
    { title: "Charter Flight Services", icon: Briefcase },
    { title: "Flight Instructor (AFIR / FIR)", icon: GraduationCap },
];

const salaryFactors = [
    { stage: "What is published", level: "Airlines publish joining criteria, not a universal salary scale. DGCA publishes licensing requirements, not pilot pay.", icon: FileCheck },
    { stage: "What moves it", level: "Employer, aircraft type, seat, experience, type rating requirements and the jobs available at the time.", icon: TrendingUp },
    { stage: "What to distrust", level: "A single number presented as a likely salary without naming the source, the seat or the date.", icon: AlertTriangle },
];

export default function CPLCoursePage() {
    const cplFaqs = PAGE_FAQS["/courses/cpl"] ?? [];

    return (
        <Layout>
            <section className="relative py-24 aviation-gradient text-primary-foreground overflow-hidden">
                <div className="container !pr-0">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 max-w-2xl"
                        >
                            <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                                DGCA CPL ground classes and exam preparation
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Commercial Pilot License (CPL) Training in India: DGCA Requirements, Ground School, and Process
                            </h1>
                            <p className="text-xl text-primary-foreground/80 mb-8">
                                A Commercial Pilot Licence (CPL) is a qualification issued by India&apos;s Directorate General of Civil Aviation (DGCA) that permits a pilot to fly aircraft for remuneration. To earn a CPL in India, candidates must be at least 18 years old, complete 10+2 with Physics and Mathematics, pass the required DGCA medical and examinations, and complete the required flight training.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="gold" size="lg" asChild>
                                    <Link to="/apply">
                                        Apply Now
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button variant="outline-white" size="lg" asChild>
                                    <Link to="/courses/cpl/fees">Get Detailed CPL Fee Structure</Link>
                                </Button>
                                <Button variant="outline-white" size="lg" asChild>
                                    <Link to="/apply">Speak with a Pilot Counselor</Link>
                                </Button>
                            </div>
                            <div className="mt-6">
                                <SocialShareButtons
                                    title="Commercial Pilot Licence (CPL) Ground Classes | Flying Star Aviator"
                                    label="Share this page"
                                    theme="dark"
                                />
                            </div>
                        </motion.div>

                        <HeroImageSlider />
                    </div>
                </div>
            </section>

            <CitableAnswer
                heading="What is a Commercial Pilot Licence (CPL) and How Do You Get One in India?"
                answer="A Commercial Pilot Licence (CPL) is a DGCA-issued qualification that allows a pilot to fly for remuneration in India. The pathway usually includes eligibility checks, medical clearances, DGCA theory preparation, radiotelephony requirements, and flight training at an approved Flying Training Organisation (FTO)."
                faqs={cplFaqs}
                sources={[
                    { label: "DGCA — Pilot licensing and approvals", url: "https://www.dgca.gov.in/" },
                    { label: "DGCA examination portal", url: "https://pariksha.dgca.gov.in/" },
                ]}
                lastUpdated={lastReviewed}
            />

            <section id="what-flying-star-provides" className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Are the DGCA Eligibility Requirements for CPL Ground Training?</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            CPL ground classes cover the academic preparation required for DGCA theory papers. They are not the same as the aircraft flying hours completed at an approved FTO. The ground-school stage is one part of the CPL route, while flying training is a separate step carried out under a recognised training organisation.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cplServices.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full p-6 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <service.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                                <Link to={service.href} className="inline-flex items-center text-sm font-semibold text-primary">
                                    View {service.title} <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What is the Step-by-Step Process to Earn a CPL in India?</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            The CPL route in India involves meeting eligibility requirements, securing a DGCA computer number, completing medical checks, preparing for the DGCA theory papers, fulfilling radiotelephony requirements, and completing the required flight training at an approved FTO before licensing.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Does the DGCA CPL Theory Examination Syllabus Cover?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            CPL ground classes provide academic preparation for the DGCA theory papers that form part of the licensing pathway. These subjects are separate from the practical flight training completed at an approved Flying Training Organisation.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full border-collapse">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Subject Paper</th>
                                    <th className="px-6 py-4 text-left font-semibold">Key Modules Covered</th>
                                    <th className="px-6 py-4 text-left font-semibold">Passing Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groundSubjects.map((subject, index) => (
                                    <tr key={subject.name} className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                                        <td className="px-6 py-4 font-medium">{subject.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{subject.focus}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{subject.passing}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="course-details" className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What is the Difference Between CPL Ground Classes and Flying Training?</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            CPL ground classes provide the academic preparation needed for DGCA theory papers. Flying training is a separate phase that takes place at an approved Flying Training Organisation and covers the required aircraft hours, practical flight experience, and licensing checks.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: "Educational Qualification", text: "Must have passed 10+2 (or equivalent) with Physics and Mathematics from a recognized board. Note: Non-maths/science students can clear these subjects through NIOS open school." },
                            { title: "Age Requirement", text: "Minimum 17 years to start ground classes; 18 years to obtain the CPL license." },
                            { title: "Medical Fitness", text: "Must possess a valid DGCA Class 2 Medical Certificate prior to flying training, followed by a DGCA Class 1 Medical Certificate." },
                            { title: "Language Proficiency", text: "Must be fluent in written and spoken English." },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card"
                            >
                                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CitableTable
                heading="What is the Cost Breakdown for CPL Training in India?"
                intro="The total cost of CPL training varies depending on the flying school, aircraft type, hourly aircraft rates, training duration, and other applicable fees. Ground classes are only one part of the total cost; flight training and medical and examination charges are separate items."
                columns={["Training Component", "Indicative Cost Range (₹)", "Details"]}
                rows={[
                    ["DGCA CPL Ground Classes", "Indicative range varies by institute", "Academic preparation for the DGCA theory examinations"],
                    ["Flying Training (200 Hours)", "Indicative range varies by FTO and aircraft type", "Aircraft rental, instructor charges, and flight-hour requirements"],
                    ["DGCA Medical Examinations", "Indicative range varies by assessment provider", "Class 2 and Class 1 medical evaluations"],
                    ["DGCA Exam & Licensing Fees", "Indicative range varies by exam and licensing stage", "Computer number, exam charges and licence-related fees"],
                    ["RTR(A) Training & WPC Exam", "₹15,000 – ₹40,000 (verify before payment)", "Radiotelephony preparation and examination fees"],
                    ["Approx. Total CPL Cost", "Indicative total varies significantly by training provider", "Includes ground training, flying hours and additional requirements"],
                ]}
                note={
                    <>
                        A candidate should compare current written quotations from approved training providers before enrolling. The total cost depends on the chosen FTO, aircraft type, flying-hour requirements, location and additional training or living costs.
                    </>
                }
                sources={[
                    { label: "DGCA — official licensing and examinations", url: "https://www.dgca.gov.in/" },
                    { label: "DGCA examination portal", url: "https://pariksha.dgca.gov.in/" },
                    { label: "Wireless Planning & Coordination Wing (WPC)", url: "https://www.wpc.gov.in/" },
                ]}
                lastUpdated={lastReviewed}
            />

            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Options &amp; Growth Opportunities After CPL</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            With the global and Indian aviation markets expanding rapidly, earning a CPL opens doors to high-paying, dynamic career paths.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
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

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h3 className="text-2xl font-bold mb-4">Career progression is not automatic</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            With the global and Indian aviation markets expanding rapidly, earning a CPL opens doors to high-paying, dynamic career paths. Progression depends on airline or operator requirements, aircraft type, additional training or ratings, flight experience, checks and hiring conditions.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick CPL Course Overview</h2>
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
                                        <th className="px-6 py-4 text-left font-semibold">Feature</th>
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

            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Flying Star Aviator for CPL Ground Classes?</h2>
                        <ul className="space-y-4 text-muted-foreground text-lg list-disc pl-6">
                            <li><strong className="text-foreground">Proven Track Record:</strong> Training aspiring pilots in Dwarka, Delhi with a high DGCA exam pass rate.</li>
                            <li><strong className="text-foreground">Experienced Faculty:</strong> Learn directly from seasoned airline captains, navigation specialists and meteorology experts.</li>
                            <li><strong className="text-foreground">Modern Infrastructure:</strong> Air-conditioned classrooms equipped with audio-visual learning tools and exam simulation software.</li>
                            <li><strong className="text-foreground">End-to-End Assistance:</strong> Full support with DGCA Computer Number registration, medical appointments and flying school selection in India or abroad.</li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions About CPL Training in India</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Common questions about the CPL process, DGCA theory preparation, flying-training requirements, and how ground classes fit into the broader licensing pathway.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <Accordion type="single" collapsible className="space-y-4">
                            {cplFaqs.map((faq, index) => (
                                <AccordionItem
                                    key={faq.q}
                                    value={`faq-${index}`}
                                    className="bg-card rounded-xl border border-border px-6"
                                >
                                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Contact Information</h2>
                        <div className="rounded-2xl border border-border bg-card p-8 space-y-3 text-muted-foreground">
                            <p><strong className="text-foreground">Institute Location:</strong> C705, Sector 7, Block C, Palam Extension, Dwarka, Delhi, 110077</p>
                            <p><strong className="text-foreground">Phone:</strong> +91 99535 36199 / +91 99535 66619</p>
                            <p><strong className="text-foreground">Email:</strong> <a href="mailto:info@flyingstaraviator.com" className="underline">info@flyingstaraviator.com</a></p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Enquire About CPL Ground Classes
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            If you are planning a CPL pathway, clarify the current DGCA requirements, the ground-school scope and the separate FTO flying-training steps before enrolling. We can guide you on the ground-school side of the process and help you understand the broader route.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Enquire About CPL Ground Classes
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/courses/cpl/fees">View Course Details</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <a href="tel:+919953536199">Call +91 99535 36199</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
