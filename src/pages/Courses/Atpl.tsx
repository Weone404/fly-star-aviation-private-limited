import { motion } from "framer-motion";
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
    Globe,
    Star,
    Shield,
    Award,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── DATA ──────────────────────────────────────────────────────── */

const atplServices = [
    {
        icon: Plane,
        title: "ATPL Overview",
        description:
            "The highest pilot certification, mandatory for all airline captains flying multi-crew commercial aircraft in India.",
        href: "/atpl/overview",
    },
    {
        icon: BookOpen,
        title: "Ground Theory Classes",
        description:
            "Comprehensive DGCA ground training covering Air Navigation, Meteorology, Air Regulations, Radio Aids & Instruments.",
        href: "/atpl/ground-classes",
    },
    {
        icon: DollarSign,
        title: "ATPL Course Fees",
        description:
            "Detailed breakdown of registration, flight training, simulator, and accommodation costs for ATPL in India.",
        href: "/atpl/fees",
    },
    {
        icon: TrendingUp,
        title: "Career After ATPL",
        description:
            "Explore career paths as Airline Captain, Cargo Pilot, Charter Pilot, Corporate Pilot, and international roles.",
        href: "/atpl/careers",
    },
];

const trainingSteps = [
    {
        step: 1,
        title: "Obtain Valid CPL",
        description:
            "Complete your Commercial Pilot Licence with multi-engine rating — the mandatory foundation for ATPL eligibility.",
    },
    {
        step: 2,
        title: "ATPL Ground School",
        description:
            "Attend theoretical knowledge classes covering all DGCA ATPL subjects: meteorology, navigation, regulations and more.",
    },
    {
        step: 3,
        title: "Frozen ATPL (FATPL)",
        description:
            "Pass all ATPL theory exams to receive your Frozen ATPL — it activates once flying-hour requirements are met.",
    },
    {
        step: 4,
        title: "Accumulate Flight Hours",
        description:
            "Build 1,500 total hours with at least 500 hours as Pilot-in-Command through commercial line flying.",
    },
    {
        step: 5,
        title: "Practical Skill Test",
        description:
            "Pass the ATPL skill test conducted by a DGCA-authorised examiner on a multi-engine, multi-crew aircraft.",
    },
    {
        step: 6,
        title: "ATPL Issued",
        description:
            "Receive your full ATPL and take command as Captain for domestic or international airline operations.",
    },
];

const courseOverview = [
    { label: "Course Name", value: "Airline Transport Pilot License (ATPL)" },
    { label: "Course Type", value: "Advanced Professional Pilot Certification" },
    { label: "Training Mode", value: "Ground Theory + Instrument + Multi-Engine Flying" },
    { label: "Prerequisite", value: "Valid CPL with Multi-Engine Rating" },
    { label: "Minimum Age", value: "21 Years" },
    { label: "Total Hours", value: "1,500 hrs (500 as PIC)" },
    { label: "Duration", value: "~70 Weeks (Integrated)" },
    { label: "Career Outcome", value: "Airline Captain / Pilot-in-Command" },
];

const theorySubjects = [
    { name: "Aviation Meteorology", pass: "70%", papers: 1 },
    { name: "Air Regulation & Navigation", pass: "70%", papers: 1 },
    { name: "Basic Flight Instruments", pass: "70%", papers: 1 },
    { name: "Radio Aids & VOR Navigation", pass: "70%", papers: 1 },
    { name: "Flight Physiology & Aeromedical", pass: "70%", papers: 1 },
    { name: "Oral Communications", pass: "Pass/Fail", papers: 1 },
];

const practicalTopics = [
    "Manoeuvring — Solo & Dual Flights",
    "Forces Acting on the Airplane (Thrust, Drag, Lift, Weight)",
    "Stability and Control — Go-around Factors",
    "Normal & Crosswind Take-off, Approach and Landing",
    "Power-off Stalls & Eight-on Pylons",
    "Airframe Systems & Structural Knowledge",
    "VOR Navigation & Instrument Approaches",
    "Emergency Procedures & Crew Resource Management",
];

const feesBreakdown = [
    { component: "Registration", amount: "₹ 15,000" },
    { component: "225 Hrs Flight Training (CPL + AFI)", amount: "₹ 47,50,000" },
    { component: "500 Hrs Ground Classes", amount: "₹ 1,80,000" },
    { component: "Accommodation & Transportation", amount: "₹ 10,500 – ₹ 15,000" },
    { component: "Scholarship Available (up to)", amount: "₹ 3,50,000" },
];

const feesIncludes = [
    "Ground theory classes & DGCA exam preparation",
    "Multi-engine aircraft flying hours",
    "Flight Simulator (FFS / FTD) sessions",
    "Licensing and examination fees",
    "Study materials and digital resources",
    "Class-1 Medical Assessment",
];

const careerOptions = [
    { title: "Airline Captain (PIC)", icon: Plane, desc: "Command wide-body jets on domestic & international routes." },
    { title: "Government & PSU Airlines", icon: Shield, desc: "Fly for public-sector carriers with structured pay & benefits." },
    { title: "Cargo & Freight Pilot", icon: Briefcase, desc: "Operate freighter aircraft for logistics and express companies." },
    { title: "International Airlines", icon: Globe, desc: "Captain roles with carriers in the US, UK, Australia & Gulf." },
    { title: "Corporate Aviation", icon: Star, desc: "Fly private and business jets for corporations and HNWIs." },
    { title: "Charter Pilot", icon: Plane, desc: "On-demand charter flights offering flexibility and route variety." },
];

const salaryGrowth = [
    { stage: "Fresh ATPL Holder", level: "Competitive entry salary as First Officer with fast upgrade track", icon: DollarSign },
    { stage: "Mid-Level Captain", level: "Higher monthly earnings + allowances, PF, gratuity & medical", icon: TrendingUp },
    { stage: "Senior Captain", level: "Premium international pay + complimentary air passes for family", icon: Award },
];

const keyAdvantages = [
    "Strong career growth in aviation",
    "Opportunity to travel globally",
    "High earning potential",
    "Respected & prestigious profession",
    "Exciting & dynamic work environment",
    "Multi-crew command authority",
];

const eligibilityCriteria = [
    "Minimum age 21 years",
    "Valid Indian CPL with multi-engine endorsement (or 500 hrs for Defence with 200 hrs as PIC)",
    "Minimum 1,500 total flying hours, of which at least 500 hrs as Pilot-in-Command",
    "Successful Class-1 Medical Assessment by DGCA-  doctors",
    "Pass DGCA theory tests in Navigation, Meteorology, Regulations, Radio Aids & Oral Comms",
    "Valid DGCA CPL and Class-1 Medical Assessment mandatory before applying",
];

const skillsRequired = [
    "Strong communication & command authority with crew and ATC",
    "Advanced problem-solving, observation, and depth-perception",
    "Proficiency in aircraft computer and navigation systems",
    "Exceptional mental fortitude and calmness under pressure",
    "Written English proficiency for aviation report writing",
    "Technical competence & ability to inspire crew confidence",
];

const admissionSteps = [
    "Hold a valid Commercial Pilot Licence (CPL) with multi-engine endorsement",
    "Accumulate minimum 1,500 total flight hours (500 as PIC)",
    "Pass Class-1 Medical Assessment from a DGCA-  doctor",
    "Clear all DGCA ATPL theory examinations (Frozen ATPL)",
    "Complete the ATPL practical skill test with a DGCA examiner",
];

const faqs = [
    {
        question: "What is an Airline Transport Pilot License (ATPL)?",
        answer:
            "The ATPL is the highest level of pilot certification, allowing the holder to act as Pilot-in-Command (Captain) of commercial airlines. It is required to fly multi-crew aircraft on scheduled passenger services in India and internationally.",
    },
    {
        question: "What are the minimum hours required for ATPL in India?",
        answer:
            "Applicants must have a minimum of 1,500 total flight hours, of which at least 500 hours must be logged as Pilot-in-Command. Defence personnel qualify with 500 hours total, of which 200 hours must be as PIC.",
    },
    {
        question: "What is a Frozen ATPL (FATPL)?",
        answer:
            "A Frozen ATPL is awarded after passing all ATPL theory examinations but before completing the required flight hours. It becomes 'unfrozen' — a full ATPL — once the pilot accumulates 1,500 flight hours and passes the practical skill test.",
    },
    {
        question: "How long does the Integrated ATPL course take?",
        answer:
            "The Integrated ATPL course typically lasts around 70 weeks, covering ground school and flight training. If combined with a university degree programme, it extends to approximately 3 years.",
    },
    {
        question: "What is the cost of ATPL training in India?",
        answer:
            "A typical structure includes registration (~₹15,000), 225 hours of flight training (~₹47.5 lakh), 500 hours of ground classes (~₹1.8 lakh), and accommodation costs. Scholarships of up to ₹3.5 lakh are available at select institutions.",
    },
    {
        question: "What career opportunities are available after ATPL?",
        answer:
            "ATPL holders can become airline captains, cargo pilots, charter pilots, corporate aviation pilots, or pursue international roles with carriers in the US, UK, Australia, and Gulf countries. Initial monthly salaries can reach ₹1,50,000 or more depending on the airline and experience.",
    },
];

/* ─── COMPONENT ─────────────────────────────────────────────────── */

export default function ATPLCoursePage() {
    return (
        <Layout>

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section className="relative py-24 aviation-gradient text-primary-foreground overflow-hidden">
                {/* subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                {/* radial glow */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 80% 30%, hsl(145 50% 35% / .25) 0%, transparent 60%)" }}
                />

                <div className="container relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                            ✈ Airline Transport Pilot License (ATPL) in India — Complete Guide to Pilot Certification & Career
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Airline Transport Pilot License (ATPL) — Reach the Pinnacle of Aviation
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            The ATPL is the highest pilot certification available. Command commercial airlines as Pilot-in-Command
                            with India's most comprehensive guide to eligibility, syllabus, fees, and career prospects. Your journey
                            to becoming an airline captain starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/atpl/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/atpl/fees">Get ATPL Course Fees</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats Strip ────────────────────────────────────────── */}
            <section className="py-0 bg-card border-t-4 border-accent shadow-hover">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {[
                            { num: "21+", label: "Minimum Age" },
                            { num: "1,500", label: "Total Flight Hours" },
                            { num: "500", label: "PIC Hours Required" },
                            { num: "~70 Wks", label: "Integrated Course" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center py-8 px-4 border-r border-border last:border-r-0 hover:bg-muted/50 transition-colors"
                            >
                                <div className="text-3xl font-bold text-primary mb-1">{stat.num}</div>
                                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What is ATPL ───────────────────────────────────────── */}
            <section className="py-20 bg-background" id="overview">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Introduction</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Understanding the Airline Transport Pilot License (ATPL)
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            The most advanced aircraft pilot certification — enabling holders to serve as Pilot-in-Command of
                            commercial airlines worldwide.
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
                                The Airline Transport Pilot License (ATPL) is the highest level of certification available to aircraft
                                pilots — referred to as an ATP certificate in the US. It enables a pilot to take charge of an airplane
                                and is <strong className="text-foreground">mandatory to serve as Captain</strong> for any commercial airline.
                            </p>
                            <p className="text-muted-foreground mb-4">
                                ATPL training begins with theory classes — akin to ground school — resulting in an{" "}
                                <strong className="text-foreground">ATPL Theory License or Frozen ATPL (FATPL)</strong>. This
                                "unfreezes" into a full ATPL once the pilot accumulates 1,500 flying hours and passes the practical
                                skill test.
                            </p>
                            <p className="text-muted-foreground">
                                ATPLs are <em>not</em> granted for single-engine aircraft. A valid DGCA CPL with multi-engine
                                endorsement and a successful Class-1 Medical Assessment are mandatory prerequisites.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {atplServices.map((service) => (
                                    <Link to={service.href} key={service.title} className="block group">
                                        <div className="h-full p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <service.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-sm font-bold mb-1">{service.title}</h3>
                                            <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
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

            {/* ── Benefits ───────────────────────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Why ATPL</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Becoming an ATPL Pilot</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            An ATPL opens doors to the highest-paying and most prestigious pilot roles across domestic and
                            international aviation. Aviation is expanding rapidly, creating strong demand for certified captains.
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
                                className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
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
                        Completing an ATPL course allows pilots to take command of commercial aircraft and explore the highest tier
                        of aviation career opportunities.
                    </motion.p>
                </div>
            </section>

            {/* ── Eligibility ────────────────────────────────────────── */}
            <section className="py-20 bg-background" id="eligibility">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Requirements</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">ATPL Course Eligibility & Requirements</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Candidates must meet DGCA-mandated academic, medical, and flying-hour criteria before applying for the
                            Airline Transport Pilot License.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">Core Eligibility Criteria</h3>
                            <ul className="space-y-4">
                                {eligibilityCriteria.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                                        {item}
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
                            <h3 className="text-xl font-bold mb-6">Key Skills Required</h3>
                            <ul className="space-y-4">
                                {skillsRequired.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Training Structure ─────────────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Curriculum</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Structure of ATPL Training</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            ATPL training in India includes intensive classroom learning and practical multi-engine flying. A
                            professional ATPL programme ensures students are trained in all aspects of commercial aviation command.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
                        {/* Training includes */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">Training Includes</h3>
                            <ul className="space-y-4">
                                {[
                                    "Ground theory classes & DGCA exam preparation",
                                    "Multi-engine flight simulator (FFS / FTD) training",
                                    "Multi-engine aircraft flying hours",
                                    "Emergency procedures & Crew Resource Management",
                                    "Instrument & VOR navigation exercises",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm text-muted-foreground mt-6">
                                This complete ATPL training structure helps students gain command authority, technical knowledge, and
                                real-world flying confidence.
                            </p>
                        </motion.div>

                        {/* Theory subjects table */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-bold mb-6">Theory Examination Subjects</h3>
                            <p className="text-muted-foreground mb-6">
                                The ATPL syllabus is designed per DGCA Civil Aviation Requirements to prepare students for
                                real-world airline command operations.
                            </p>
                            <div className="rounded-2xl border border-border overflow-hidden">
                                <table className="w-full">
                                    <thead className="aviation-gradient text-primary-foreground">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-sm">Subject</th>
                                            <th className="px-4 py-3 text-center font-semibold text-sm">Papers</th>
                                            <th className="px-4 py-3 text-center font-semibold text-sm">Pass %</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {theorySubjects.map((subject, index) => (
                                            <tr
                                                key={subject.name}
                                                className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}
                                            >
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

                            <div className="mt-6 p-5 rounded-xl border border-border bg-card">
                                <h4 className="font-bold text-sm mb-3">Practical & Flight Training Topics</h4>
                                <ul className="space-y-2">
                                    {practicalTopics.map((topic, i) => (
                                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                                            <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Admission Process ──────────────────────────────────── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Step-by-Step Admission Guide</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The ATPL Admission Process is structured around DGCA requirements. Candidates must meet academic, medical,
                            and flight-hour prerequisites before applying.
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
                                className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full aviation-gradient text-primary-foreground flex items-center justify-center font-bold shadow-card">
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
                        This structured process ensures candidates are fully prepared for professional ATPL pilot training.
                    </motion.p>
                </div>
            </section>

            {/* ── ATPL Fees ──────────────────────────────────────────── */}
            <section className="py-20 bg-muted/30" id="fees">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Investment</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">ATPL Course Fees in India</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The total ATPL licence cost depends on flying hours, aircraft type, and training facilities. Below is a
                            representative breakdown from a DGCA-  Flying Training Organisation.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">Fee Structure Breakdown</h3>
                            <div className="rounded-xl border border-border overflow-hidden">
                                <table className="w-full">
                                    <thead className="aviation-gradient text-primary-foreground">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-sm">Component</th>
                                            <th className="px-4 py-3 text-right font-semibold text-sm">Amount (INR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feesBreakdown.map((row, index) => (
                                            <tr key={row.component} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                                <td className="px-4 py-3 text-sm">{row.component}</td>
                                                <td className="px-4 py-3 text-sm text-right font-medium text-primary">{row.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                Fees are subject to change if training exceeds 18 months from commencement date or hours are exceeded.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6"
                        >
                            <div className="p-8 rounded-2xl border border-border bg-card flex-1">
                                <h3 className="text-xl font-bold mb-6">Total ATPL Cost Includes</h3>
                                <ul className="space-y-4">
                                    {feesIncludes.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-center">
                                <p className="text-muted-foreground mb-4 text-sm">
                                    This investment leads to one of aviation's most financially rewarding careers — with starting salaries
                                    up to <strong className="text-foreground">₹1,50,000/month</strong> and growing rapidly with experience.
                                </p>
                                <Button variant="gold" size="lg" asChild className="w-full">
                                    <Link to="/atpl/fees">
                                        Get Detailed Fee Breakdown
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Training Journey Steps ─────────────────────────────── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Training Journey</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Step-by-Step ATPL Training Path</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            This structured ATPL training path helps candidates gradually build theoretical knowledge, flying skills,
                            and the command confidence required to lead a commercial flight crew.
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
                                className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full aviation-gradient text-primary-foreground flex items-center justify-center font-bold shadow-card">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2 pt-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Course Overview Table ──────────────────────────────── */}
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
                                <thead className="aviation-gradient text-primary-foreground">
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

            {/* ── Career Opportunities ───────────────────────────────── */}
            <section className="py-20 bg-background" id="career">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Career Prospects</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Jobs After ATPL Training</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            After obtaining an Airline Transport Pilot License in India, pilots can explore the highest-tier career
                            paths in domestic and international aviation. An ATPL holder can grow into a senior captain role with
                            experience and additional type ratings.
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
                                <h3 className="font-bold text-lg mb-2">{career.title}</h3>
                                <p className="text-sm text-muted-foreground">{career.desc}</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Salary After ATPL Training</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The ATPL pilot salary depends on experience, airline, and aircraft type. Starting salaries can reach
                            ₹1,50,000/month, with strong financial growth and international career opportunities as seniority
                            increases.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                        {salaryGrowth.map((item, index) => (
                            <motion.div
                                key={item.stage}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-xl bg-card border border-border text-center hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full aviation-gradient text-primary-foreground flex items-center justify-center font-bold shadow-card">
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

                    {/* Perks callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center"
                    >
                        <p className="text-muted-foreground">
                            Additional perks include{" "}
                            <strong className="text-foreground">
                                contributory provident fund, gratuity, housing allowance, medical facilities,
                            </strong>{" "}
                            out-of-town allowances, and complimentary or heavily discounted air passes for the pilot and direct
                            dependants.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Why Right Training Matters ─────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">Guidance</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Importance of the Right ATPL Training Programme
                        </h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            Selecting the right ATPL training programme is crucial for building a successful aviation career. A
                            well-structured course provides proper guidance, experienced instructors, DGCA-  simulators, and
                            quality flying facilities.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            A strong foundation in ATPL theory and practical training helps students clear all DGCA examinations,
                            accumulate the required flight hours efficiently, and secure captain-level aviation jobs faster.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ────────────────────────────────────────────────── */}
            <section className="py-20 bg-background" id="faq">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-2">FAQs</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Common questions about the Airline Transport Pilot License course and ATPL training in India.
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

            {/* ── Final CTA ──────────────────────────────────────────── */}
            <section className="py-20 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Achieve the Highest Pilot Certification in Aviation
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-4">
                            An Airline Transport Pilot License is more than a certification — it is your gateway to commanding
                            commercial aircraft, leading flight crews, and building a prestigious international career. From
                            structured ATPL training and a DGCA-  syllabus to real multi-engine flight experience, the ATPL
                            course prepares pilots for a successful future at the captain's seat.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            If you are passionate about aviation and dream of flying professionally as a captain, enrolling in an
                            ATPL programme in India is the definitive step toward achieving your goal. With the right training,
                            dedication, and guidance, you can become a confident, certified airline captain.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/atpl/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/atpl/fees">Get ATPL Course Fees</Link>
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