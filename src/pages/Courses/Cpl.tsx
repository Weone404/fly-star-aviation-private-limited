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
    Briefcase,
    ArrowRight,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";

const lastReviewed = "2026-11-13";

const heroSlides = [
    {
        image: "/cpl-slider/slider1.webp",
        caption: "Pilot beside a light aircraft",
    },
    {
        image: "/cpl-slider/silder2.webp",
        caption: "Group beside an aircraft",
    },
    {
        image: "/cpl-slider/slider3.webp",
        caption: "Aviation group at an airfield",
    },
    {
        image: "/cpl-slider/slider4.webp",
        caption: "Pilot beside a light aircraft",
    },
    {
        image: "/cpl-slider/slider5.webp",
        caption: "Pilot standing beside an aircraft",
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

    const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo]);
    const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, 4500);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center gap-4 flex-shrink-0 ml-auto"
            style={{ width: "clamp(320px, 42vw, 540px)" }}
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
                    loading={current === 0 ? "eager" : "lazy"}
                    fetchPriority={current === 0 ? "high" : "auto"}
                    decoding="async"
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
        title: "CPL Ground Classes",
        description: "Classroom-based academic preparation for the theory subjects in the CPL pathway.",
        href: "/dgca/ground-classes",
    },
    {
        icon: FileCheck,
        title: "DGCA Exam Preparation",
        description: "Guidance on the DGCA theory examination process and preparation planning.",
        href: "/dgca",
    },
    {
        icon: GraduationCap,
        title: "CPL Pathway",
        description: "An overview of the licensing stages and how ground study fits alongside separate flight training.",
        href: "/become-a-pilot/become-pilot",
    },
    {
        icon: Briefcase,
        title: "ATPL Ground Training",
        description: "Explore the next stage of theoretical licence preparation and its separate requirements.",
        href: "/courses/atpl",
    },
];

const trainingSteps = [
    {
        step: 1,
        title: "Check current eligibility",
        description: "Review DGCA's current educational, age and licensing criteria before making a training plan.",
    },
    {
        step: 2,
        title: "Review medical requirements",
        description: "Confirm the current medical assessment process and required medical class with DGCA.",
    },
    {
        step: 3,
        title: "Check Computer Number steps",
        description: "Review the current DGCA Pariksha application instructions and prepare the required documents.",
    },
    {
        step: 4,
        title: "Prepare for theory examinations",
        description: "Study the applicable DGCA subjects and confirm the current examination process before applying.",
    },
    {
        step: 5,
        title: "Check the RTR(A) process",
        description: "RTR(A) is a separate radio-telephony requirement. Check the latest DGCA Pariksha notice and current rules before applying.",
    },
    {
        step: 6,
        title: "Train at an approved FTO",
        description: "Arrange aircraft flying training separately with a Flying Training Organisation approved for your route.",
    },
    {
        step: 7,
        title: "Complete licensing checks",
        description: "Confirm and complete the applicable skill tests, documents and licence application steps with DGCA.",
    },
];

const groundSubjects = [
    { name: "Air Navigation", focus: "Position, route and flight planning; navigation instruments and aids; and the calculations used to plan a flight." },
    { name: "Aviation Meteorology", focus: "Atmospheric conditions, weather systems, clouds, winds and aviation weather reports, and how weather affects flight decisions." },
    { name: "Air Regulation", focus: "Aviation law, rules of the air, airspace, air traffic services and the procedures pilots must understand." },
    { name: "Aircraft and Engine / Instruments", focus: "General, specific and performance knowledge of aircraft and engine systems, including the aircraft type relevant to training." },
];

const careerOptions = [
    { title: "Commercial Airline First Officer", description: "A CPL is part of the qualification pathway for entry-level airline roles. Airlines may also require additional ratings, checks, experience and selection criteria.", icon: Plane },
    { title: "Corporate & Business Jet Pilot", description: "Corporate flying involves operating aircraft for business or private operators. Aircraft-specific training, experience and operator requirements may apply beyond the CPL.", icon: Plane },
    { title: "Cargo Airline Operations", description: "Cargo pilots operate scheduled or charter freight flights. The CPL is a foundation, while the employer sets the applicable experience, ratings and aircraft requirements.", icon: Briefcase },
    { title: "Charter Flight Services", description: "Charter operations use aircraft for on-demand passenger or cargo flights. The role can require relevant experience, checks and aircraft or operator qualifications.", icon: Briefcase },
    { title: "Flight Instruction", description: "Instructional roles have separate qualification and experience requirements beyond the CPL; confirm the current criteria with DGCA.", icon: GraduationCap },
];

const eligibilityTopics = [
    {
        title: "Education",
        description: "Check the current DGCA educational criteria, including required subjects and accepted equivalencies, against your own documents.",
        href: "/dgca/computer-number",
        link: "Review Computer Number document guidance",
    },
    {
        title: "Age and licence stage",
        description: "Age criteria depend on the licensing stage. Verify the current minimum age and examination eligibility directly with DGCA.",
        href: "https://www.dgca.gov.in/",
        link: "Check current DGCA requirements",
    },
    {
        title: "Medical assessment",
        description: "The medical assessments required for training and licence issue are set by DGCA. Confirm the current process before committing to flying training.",
        href: "/dgca/medical",
        link: "Read about DGCA medical assessments",
    },
    {
        title: "Examination registration",
        description: "A Computer Number and the relevant examination application steps may be required before booking theory papers. Follow the latest Pariksha instructions.",
        href: "/dgca/computer-number",
        link: "See the DGCA Computer Number guide",
    },
];

export default function CPLCoursePage() {
    const cplFaqs = PAGE_FAQS["/courses/cpl"] ?? [];

    return (
        <Layout>
            <section className="relative py-24 aviation-gradient text-primary-foreground overflow-hidden">
                <div className="container">
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
                                CPL Ground Classes in Delhi: DGCA Commercial Pilot Licence Training
                            </h1>
                            <p className="text-xl text-primary-foreground/80 mb-8">
                                Flying Star Aviator provides CPL ground training and DGCA theory examination preparation at its Dwarka, New Delhi centre. The classes cover the academic stage of the CPL pathway; aircraft flying training and applicable flight-experience requirements are completed separately through an appropriately approved Flying Training Organisation (FTO).
                            </p>
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
                heading="What Is a Commercial Pilot Licence (CPL)?"
                answer="A Commercial Pilot Licence (CPL) is a professional pilot licence issued by the Directorate General of Civil Aviation (DGCA) to candidates who meet the current licensing requirements. The pathway includes regulatory, medical, examination and practical flight-training stages. Ground classes prepare candidates for the theory component; they do not provide aircraft flying hours or issue a licence."
                sources={[
                    { label: "DGCA — Pilot licensing and approvals", url: "https://www.dgca.gov.in/" },
                    { label: "DGCA examination portal", url: "https://pariksha.dgca.gov.in/" },
                ]}
                lastUpdated={lastReviewed}
            />

            <section className="py-16 bg-muted/30">
                <div className="container max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4">How Does a CPL Differ from a PPL?</h2>
                    <p className="text-muted-foreground mb-8">
                        A Private Pilot Licence (PPL) and a Commercial Pilot Licence (CPL) are different licence categories with different privileges and requirements. Check the current DGCA rules for the privileges attached to each licence; a CPL pathway is intended for professional flying, while a PPL is not a substitute for a commercial licence.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <article className="rounded-2xl border border-border bg-card p-6">
                            <h3 className="font-bold text-xl mb-2">Private Pilot Licence</h3>
                            <p className="text-muted-foreground">
                                A separate licence category for private flying. Its privileges do not make it equivalent to a CPL for professional flying.
                            </p>
                        </article>
                        <article className="rounded-2xl border border-border bg-card p-6">
                            <h3 className="font-bold text-xl mb-2">Commercial Pilot Licence</h3>
                            <p className="text-muted-foreground">
                                A professional licence category. The privileges, aircraft ratings and operational limits depend on current DGCA rules and the pilot's qualifications.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <p className="container mx-auto max-w-3xl px-4 py-6 text-center text-muted-foreground">
                For the wider pilot pathway from eligibility to licensing, read our{" "}
                <Link to="/become-a-pilot/become-pilot" className="underline hover:text-primary">
                    guide to becoming a pilot in India
                </Link>
                .
            </p>

            <section id="cpl-eligibility" className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">CPL Eligibility Requirements in India</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Joining ground classes and being eligible for a licence are different things. Before applying, check the current DGCA requirements for education, age, medical fitness, examinations, radio telephony, flight experience and licensing.                             Requirements can change, so confirm them against current DGCA guidance.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {eligibilityTopics.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full p-6 rounded-2xl border border-border bg-card"
                            >
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                                {item.href.startsWith("http") ? (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-primary">
                                        {item.link} <ChevronRight className="h-4 w-4 ml-1" />
                                    </a>
                                ) : (
                                    <Link to={item.href} className="inline-flex items-center text-sm font-semibold text-primary">
                                        {item.link} <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                )}
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Become a Commercial Pilot in India</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            The route combines eligibility checks and regulatory steps with theory preparation and separate aircraft training. The sequence and requirements should be confirmed against current DGCA instructions.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">DGCA CPL Ground Training Subjects</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The CPL theory syllabus is organized into four papers. Subject names and exam requirements can change; confirm the current list in DGCA's published requirements before planning an attempt.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full border-collapse">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Subject</th>
                                    <th className="px-6 py-4 text-left font-semibold">Areas covered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groundSubjects.map((subject, index) => (
                                    <tr key={subject.name} className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                                        <td className="px-6 py-4 font-medium">{subject.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{subject.focus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="max-w-4xl mx-auto mt-6 text-muted-foreground">
                        For a licence-by-licence comparison of DGCA theory requirements, read the{" "}
                        <Link to="/blog/dgca-exam-subjects-by-licence" className="underline hover:text-primary">
                            DGCA theory subjects guide
                        </Link>
                        .
                    </p>
                    <p className="max-w-4xl mx-auto mt-6 text-muted-foreground">
                        Radio Telephony Restricted (Aeronautical), or RTR(A), is a separate radio-telephony requirement, not one of these CPL theory papers. Its examining authority and registration process changed under the 2025 rules; older WPC-era guides may be outdated. Check current{" "}
                        <a href="https://pariksha.dgca.gov.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">DGCA Pariksha notices</a>
                        {" "}and our{" "}
                        <Link to="/blog/rtr-a-exam-dgca-takeover-2026" className="underline hover:text-primary">updated RTR(A) guide</Link>
                        {" "}before applying.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-muted/30">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">CPL Ground Classes at Flying Star Aviator</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            The Dwarka centre provides academic preparation, DGCA examination guidance and pilot-pathway counselling. Class formats, schedules, fees and current availability should be confirmed directly before enrolment.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cplServices.map((service) => (
                            <article key={service.title} className="h-full p-6 rounded-2xl border border-border bg-card">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <service.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                                <Link to={service.href} className="inline-flex items-center text-sm font-semibold text-primary">
                                    Explore {service.title} <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="ground-vs-flight" className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ground Training vs Flying Training</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            These are separate parts of the CPL pathway. Flying Star Aviator provides ground training; aircraft flying hours are completed separately at an appropriately approved Flying Training Organisation (FTO).
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full min-w-[640px] border-collapse bg-card">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Training stage</th>
                                    <th className="px-6 py-4 text-left font-semibold">CPL ground classes</th>
                                    <th className="px-6 py-4 text-left font-semibold">Aircraft flying training</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-border">
                                    <th scope="row" className="px-6 py-4 text-left font-medium">Focus</th>
                                    <td className="px-6 py-4 text-muted-foreground">Aviation theory and preparation for applicable written examinations.</td>
                                    <td className="px-6 py-4 text-muted-foreground">Practical aircraft handling and flight experience under the FTO's approved training.</td>
                                </tr>
                                <tr className="border-t border-border">
                                    <th scope="row" className="px-6 py-4 text-left font-medium">Provider</th>
                                    <td className="px-6 py-4 text-muted-foreground">A ground-training institute, such as Flying Star Aviator.</td>
                                    <td className="px-6 py-4 text-muted-foreground">An appropriately approved Flying Training Organisation (FTO).</td>
                                </tr>
                                <tr className="border-t border-border">
                                    <th scope="row" className="px-6 py-4 text-left font-medium">Outcome</th>
                                    <td className="px-6 py-4 text-muted-foreground">Academic preparation; it does not provide flight hours or issue a CPL.</td>
                                    <td className="px-6 py-4 text-muted-foreground">Practical training and flight experience required for the licensing pathway.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <CitableTable
                heading="CPL Course Fees"
                intro="Ground-class fees are separate from aircraft flying training, medical assessments and government examination or licensing charges. Costs vary by provider and inclusions; no fee figure is published here without a current, verified quotation."
                columns={["Cost component", "What to confirm before paying"]}
                rows={[
                    ["CPL ground classes", "Written fee, included subjects, schedule, payment terms and refund policy."],
                    ["Flying training at an FTO", "Separate written quotation, training scope, aircraft and applicable extra charges."],
                    ["Medical assessments", "Current assessment process and charges from the authorised provider."],
                    ["DGCA examination and licensing", "Current charges and instructions on the official DGCA/Pariksha portal."],
                    ["RTR(A)", "Current DGCA application, examination and any preparation charges."],
                    ["Travel, accommodation and equipment", "Any costs relevant to your location and individual training plan."],
                ]}
                note={
                    <>
                        Ask for a written, itemised fee breakdown and compare ground-school charges separately from an FTO's flying-training quote. See our{" "}
                        <Link to="/courses/cpl/fees" className="underline hover:text-primary">CPL cost guide</Link>
                        {" "}for more detail.
                    </>
                }
                sources={[
                    { label: "DGCA — official licensing and examinations", url: "https://www.dgca.gov.in/" },
                    { label: "DGCA examination portal", url: "https://pariksha.dgca.gov.in/" },
                    { label: "Ministry of Civil Aviation — Radio Telephone Operator Rules, 2025", url: "https://civilaviation.gov.in/ministry-documents/rules/telephone-operator-restricted-certificate-and-licence-rules-2025" },
                ]}
                lastUpdated={lastReviewed}
            />

            <section className="py-20 bg-muted/30">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">CPL Course Duration</h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            There is no single completion timeline that applies to every candidate. Ground study and examination attempts, medical and document processing, FTO scheduling, aircraft availability, weather and any licence-conversion steps can affect the overall duration.
                        </p>
                        <ul className="space-y-4 text-muted-foreground list-disc pl-6">
                            <li><strong className="text-foreground">Ground training:</strong> Confirm the current course schedule and subject sequence directly with the institute.</li>
                            <li><strong className="text-foreground">Theory examinations:</strong> Progress depends on preparation and the available DGCA examination sessions.</li>
                            <li><strong className="text-foreground">Flying training:</strong> The FTO's aircraft, instructor and scheduling availability, as well as local operating conditions, affect progress.</li>
                            <li><strong className="text-foreground">Licensing:</strong> Medical, document-verification and application processing can add time at different stages.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Opportunities After CPL</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            A CPL may be relevant to professional flying roles, subject to licence privileges, additional qualifications, employer requirements and recruitment conditions.
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
                                <p className="mt-2 text-sm text-muted-foreground">{career.description}</p>
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
                            A CPL does not guarantee airline employment, salary or promotion. Progression depends on the employer, aircraft type, additional training or ratings, flight experience, checks, recruitment conditions and the roles available at the time.
                        </p>
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
                            <li><strong className="text-foreground">Focused scope:</strong> The page and course focus on CPL ground training and DGCA theory preparation, not aircraft flying hours.</li>
                            <li><strong className="text-foreground">Pathway guidance:</strong> Academic and licensing-stage counselling helps candidates understand which requirements to check with DGCA.</li>
                            <li><strong className="text-foreground">Separate cost planning:</strong> Ground-class fees and FTO flying-training quotes are treated as separate items.</li>
                            <li><strong className="text-foreground">Dwarka location:</strong> Ground classes are based at the Flying Star Aviator centre in Dwarka, New Delhi.</li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-muted/30">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Experiences and Training Environment</h2>
                        <p className="text-muted-foreground">
                            This page does not publish student testimonials, individual results, faculty biographies or classroom photographs without verified details and appropriate permission. No pass-rate, placement or student-outcome claim is made here.
                        </p>
                    </div>
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
                            Contact Flying Star Aviator to discuss CPL ground classes, current course availability and the separate FTO flying-training stage.
                        </p>
                        <div className="space-y-2 mb-8 text-primary-foreground/90">
                            <p>C705, Sector 7, Block C, Palam Extension, Dwarka, Delhi 110077</p>
                            <p>
                                <a href="tel:+919953536199" className="underline">+91 99535 36199</a>
                                {" / "}
                                <a href="tel:+919953566619" className="underline">+91 99535 66619</a>
                                {" · "}
                                <a href="mailto:info@flyingstaraviator.com" className="underline">info@flyingstaraviator.com</a>
                            </p>
                        </div>
                        <Button variant="gold" size="lg" asChild>
                            <Link to="/contact">
                                Contact Flying Star Aviator
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
