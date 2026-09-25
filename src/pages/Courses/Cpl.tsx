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
        description: "Structured subject preparation for the CPL theory papers and the commercial pilot licence pathway.",
        href: "/dgca/ground-classes",
    },
    {
        icon: FileCheck,
        title: "DGCA Exam Preparation",
        description: "Guidance for the current DGCA theory examination structure and study plan.",
        href: "/dgca",
    },
    {
        icon: GraduationCap,
        title: "CPL Pathway Guidance",
        description: "Advice on the overall CPL process, eligibility checks and how the route fits together.",
        href: "/become-a-pilot/commercial-pilot-licence",
    },
    {
        icon: Briefcase,
        title: "Career Guidance",
        description: "A realistic overview of pilot careers, airline criteria and next steps after ground-school preparation.",
        href: "/about",
    },
];

const trainingSteps = [
    {
        step: 1,
        title: "Check current DGCA requirements",
        description: "Review the latest DGCA eligibility, medical and examination requirements before starting the application process.",
    },
    {
        step: 2,
        title: "Prepare for the theory papers",
        description: "Build a strong base in the relevant DGCA subjects through structured ground classes and guided revision.",
    },
    {
        step: 3,
        title: "Register for the examinations",
        description: "Apply for the relevant DGCA examinations through the official process and keep the supporting documentation current.",
    },
    {
        step: 4,
        title: "Complete flying training",
        description: "Satisfy the flight-training requirements through an approved Flying Training Organisation as required by DGCA rules.",
    },
    {
        step: 5,
        title: "Meet licence conditions",
        description: "Complete the remaining licensing and operational steps required by the regulator and the approved training pathway.",
    },
    {
        step: 6,
        title: "Move into the next role",
        description: "Career progression depends on recruitment, qualifications, experience, ratings and airline/operator requirements.",
    },
];

const courseOverview = [
    { label: "Course focus", value: "DGCA ground classes / theory preparation" },
    { label: "Training model", value: "Ground-school learning and pathway guidance" },
    { label: "Separate requirement", value: "Flying training through an approved FTO" },
    { label: "Typical support", value: "Subject preparation, counselling and study guidance" },
    { label: "Not included automatically", value: "Aircraft hours, simulator training, medical certification and licence issuance" },
];

const groundSubjects = [
    { name: "Air Navigation", focus: "Pilot navigation and operational procedures" },
    { name: "Aviation Meteorology", focus: "Weather, forecasts and operational planning" },
    { name: "Air Regulations", focus: "Rules, procedures and compliance" },
    { name: "Technical General", focus: "Aerodynamics, aircraft systems and theory" },
    { name: "Technical Specific", focus: "Aircraft-specific technical knowledge" },
];

const careerOptions = [
    { title: "Airline First Officer", icon: Plane },
    { title: "Charter Pilot", icon: Plane },
    { title: "Cargo Pilot", icon: Briefcase },
    { title: "Corporate Aviation Pilot", icon: Briefcase },
    { title: "Flight Instructor", icon: GraduationCap },
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
                                Commercial Pilot Licence (CPL) Ground Classes &amp; Exam Preparation
                            </h1>
                            <p className="text-xl text-primary-foreground/80 mb-8">
                                Prepare for DGCA CPL theory examinations with structured ground classes, subject-focused preparation and guidance on the commercial pilot licensing pathway.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="gold" size="lg" asChild>
                                    <Link to="/apply">
                                        Enquire About CPL Ground Classes
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button variant="outline-white" size="lg" asChild>
                                    <Link to="/courses/cpl/fees">View Course Details</Link>
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
                heading="What is a Commercial Pilot Licence (CPL) and how do you get one in India?"
                answer="A Commercial Pilot Licence (CPL) is the licence that allows a pilot to fly for remuneration under the rules and conditions set by India’s Directorate General of Civil Aviation (DGCA). The full pathway includes meeting current DGCA eligibility and medical requirements, preparing for the required theory papers, completing the relevant flying-training requirements through an approved Flying Training Organisation, and satisfying the licensing conditions set by the regulator. Ground-school preparation is an important part of that process, but it is not the same as the separate flying-training and licensing steps that a student must complete through approved training organisations and authorities."
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Flying Star Provides for CPL Aspirants</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Flying Star Aviator supports students with DGCA ground classes, subject preparation and guidance on the CPL pathway. The service scope is focused on ground-school preparation and career guidance, not aircraft training or licence issuance.
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
                                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Flying Training and CPL Licensing</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Ground-school preparation is only one part of the CPL pathway. Applicants must separately complete the applicable flying-training requirements through an appropriately approved Flying Training Organisation and satisfy the current DGCA licensing conditions before a Commercial Pilot Licence can be issued.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">CPL subjects and theory preparation</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            CPL theory preparation focuses on the DGCA subjects relevant to the Commercial Pilot Licence pathway. Students should check the current DGCA examination structure before proceeding.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full border-collapse">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Subject</th>
                                    <th className="px-6 py-4 text-left font-semibold">Focus</th>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How CPL requirements work</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            Eligibility, medical, examination and licensing requirements are regulated by DGCA and can change. Students should confirm the latest requirements through the relevant official authority before applying.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: "Academic requirements", text: "Students must satisfy the relevant educational criteria set out by the current DGCA rules and verify them before applying." },
                            { title: "Medical requirements", text: "Medical clearance is a separate requirement and must satisfy the applicable DGCA medical standards for pilot licensing." },
                            { title: "Theory preparation", text: "Ground classes support the required DGCA theory examinations and the subject knowledge needed for the pathway." },
                            { title: "Flying and licensing", text: "The flying requirements and the final licence conditions are distinct from ground-school preparation and must be completed through approved training structures." },
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
                heading="How much does CPL training cost in India?"
                intro="The total cost varies significantly by Flying Training Organisation, aircraft type, location, flying-hour requirements, fuel and operating costs, accommodation, examination costs and other factors. A CPL candidate should compare current written quotations from approved training providers before enrolling."
                columns={["Cost component", "What it usually involves", "Important point"]}
                rows={[
                    ["Ground-school preparation", "DGCA theory classes and study support", "Separate from flying training; quoted by the ground-school provider"],
                    ["Flying training at an FTO", "Aircraft hours and flight instruction", "Typically the largest variable cost; quoted separately by the FTO"],
                    ["DGCA examination and licence charges", "Exam application, computer-number and licence-related charges", "Verify current official DGCA charges before paying"],
                    ["Medical examination", "Medical assessment and required fitness checks", "Separate from academic and flying-training costs"],
                    ["RTR(A) and related requirements", "Radio telephony-related licensing requirements where applicable", "May be required as part of the pathway depending on the current rules"],
                    ["Accommodation and living costs", "Meals, transport and local living expenses", "Can materially change the total outlay"],
                    ["Type rating and later airline training", "Additional aircraft-specific training after CPL", "Not automatically included as part of CPL licensing"],
                ]}
                note={
                    <>
                        Licensing, medical, examination and flying requirements can change. Students should verify the latest requirements through the relevant official authority before applying. For current written quotations, ask the training provider and the approved FTO directly.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Career pathway after a CPL</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            A CPL can form part of the qualification pathway for commercial flying roles. Progression depends on factors such as airline or operator recruitment, aircraft type, type ratings where applicable, flight experience, checks and vacancies.
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
                            A CPL does not automatically lead to a captain role. Progression depends on airline or operator requirements, aircraft type, additional training or ratings, flight experience, checks and hiring conditions.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick course overview</h2>
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

            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why the right preparation matters</h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            Students benefit most from a clear understanding of the DGCA theory papers, the licensing pathway and the separation between ground-school learning and flying training.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            A well-structured preparation plan helps students understand the process, avoid confusion between academic and flying requirements, and make better decisions before enrolling at a training organisation.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Common questions about CPL theory preparation, the commercial pilot licensing pathway and the roles of ground classes versus flying training.
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
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
