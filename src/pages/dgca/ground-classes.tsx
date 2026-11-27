import { memo } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CitableAnswer } from "@/components/CitableAnswer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    BookOpen,
    GraduationCap,
    Award,
    TrendingUp,
    ArrowRight,
    CheckCircle,
    Users,
    Clock,
    DollarSign,
    Target,
    Compass,
    Cloud,
    Shield,
    Wrench,
    Radio,
    Globe,
    MonitorPlay,
    Building,
    MapPin,
    Star,
    Brain,
    FileCheck,
    Trophy,
    LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface OverviewRow { label: string; value: string }
interface Subject { icon: LucideIcon; name: string; description: string }
interface Benefit { icon: LucideIcon; title: string; description: string }
interface ComparisonRow { aspect: string; online: string; offline: string }
interface WhoShouldJoin { category: string; description: string; icon: LucideIcon }
interface SelectionFactor { factor: string; description: string; icon: LucideIcon }
interface SkillCovered { skill: string; description: string; icon: LucideIcon }

// ─── Static data (module scope — zero re-creation cost) ───────────────────────
const quickOverview: OverviewRow[] = [
    { label: "Course Name", value: "DGCA Ground Classes for CPL" },
    { label: "Purpose", value: "Ground-based theory preparation" },
    { label: "Training Mode", value: "Confirm current format with the course team" },
    { label: "Subjects Covered", value: "Confirm current course scope and DGCA requirements" },
    { label: "Authority", value: "DGCA (Directorate General of Civil Aviation)" },
    { label: "Fee Range", value: "Request a current written quotation" },
    { label: "Who Can Join", value: "Confirm current enrolment criteria with the course team" },
];

const cplSubjects: Subject[] = [
    { icon: Compass, name: "Navigation and Flight Planning", description: "Ask the course team whether these topics are part of the current class syllabus." },
    { icon: Cloud, name: "Meteorology", description: "Confirm current teaching scope with the course team and examination requirements with DGCA." },
    { icon: Shield, name: "Aviation Rules", description: "Check current DGCA requirements and confirm the topics covered by the course." },
    { icon: Wrench, name: "Aircraft and Engine Systems", description: "Ask which technical subjects and study materials are currently included." },
    { icon: Award, name: "Aircraft-Type Topics", description: "Applicability depends on current licensing and training requirements; confirm before enrolment." },
    { icon: Radio, name: "Radio-Telephony Requirements", description: "Check the applicable current official rules and examination notices." },
];

const trainingBenefits: Benefit[] = [
    { icon: TrendingUp, title: "Exam Preparation", description: "Confirm the current syllabus and examination process using official DGCA guidance." },
    { icon: Target, title: "Study Planning", description: "Ask the course team what schedule and academic support are currently available." },
    { icon: Users, title: "Instructor Information", description: "Request current instructor details and relevant credentials before enrolment." },
    { icon: FileCheck, title: "Practice Materials", description: "Confirm whether question banks, past papers or mock tests are included." },
    { icon: Clock, title: "Course Schedule", description: "Ask for the current schedule; examination and flight-training timelines vary." },
    { icon: DollarSign, title: "Fee Scope", description: "Request a written fee breakdown and confirm what is included or charged separately." },
];

const onlineVsOffline: ComparisonRow[] = [
    { aspect: "Current availability", online: "Confirm with the course team", offline: "Confirm with the course team" },
    { aspect: "Schedule", online: "Request current details", offline: "Request current details" },
    { aspect: "Study materials", online: "Confirm what is included", offline: "Confirm what is included" },
    { aspect: "Instructor access", online: "Confirm current arrangements", offline: "Confirm current arrangements" },
    { aspect: "Location or access", online: "Confirm before enrolment", offline: "Confirm before enrolment" },
    { aspect: "Assessment practice", online: "Ask which activities are offered", offline: "Ask which activities are offered" },
    { aspect: "Fees", online: "Request a written quotation", offline: "Request a written quotation" },
];

const whoShouldJoin: WhoShouldJoin[] = [
    { category: "CPL Aspirants", description: "People considering CPL ground classes should confirm current enrolment criteria with the course team.", icon: GraduationCap },
    { category: "Flying Trainees", description: "Candidates undertaking aircraft training separately can ask about current theory-preparation options.", icon: Target },
    { category: "Licence Conversion Candidates", description: "Check current DGCA conversion requirements and confirm relevant course scope before enrolling.", icon: Globe },
    { category: "Other Applicants", description: "Ask the course team whether the current class schedule and format fit your circumstances.", icon: Users },
];

const selectionFactors: SelectionFactor[] = [
    { factor: "DGCA Exam Success Rate", description: "Check the institute's track record of students clearing DGCA exams on first attempt", icon: Trophy },
    { factor: "Instructor Experience", description: "Verify that instructors have both flying experience and teaching expertise", icon: Award },
    { factor: "Updated DGCA Syllabus", description: "Ensure training follows the latest DGCA curriculum and exam patterns", icon: FileCheck },
    { factor: "Mock Tests & Revision", description: "Availability of regular mock exams and comprehensive revision support", icon: Brain },
    { factor: "Online/Offline Flexibility", description: "Choose institutes offering both online and offline training options", icon: MonitorPlay },
];

const skillsCovered: SkillCovered[] = [
    { skill: "Theory Topics", description: "Confirm the current ground-class syllabus and examination subjects with the course team and DGCA.", icon: Brain },
    { skill: "Course Materials", description: "Ask which books, notes or other study materials are currently provided.", icon: Cloud },
    { skill: "Practice Activities", description: "Ask whether any question banks, mock tests or revision sessions are included.", icon: Compass },
    { skill: "Teaching Scope", description: "Confirm which academic subjects and course activities are currently available.", icon: Wrench },
    { skill: "Flight Training", description: "Aircraft flight training is separate; verify the FTO's current DGCA approval and scope.", icon: Users },
];

const whyGroundTrainingMatters: string[] = [
    "Ground classes are academic preparation and do not replace aircraft flight training.",
    "Check the current examination syllabus and eligibility directly with DGCA.",
    "Confirm course subjects, schedule and availability before enrolling.",
    "Request a written fee breakdown, including exclusions and refund terms.",
    "Arrange practical flying separately and verify the FTO's current approval and scope.",
    "Course attendance does not guarantee examination passes, employment or selection.",
];

const preparationTips: string[] = [
    "Check current DGCA examination requirements before planning your study.",
    "Ask the course team for the current schedule and attendance expectations.",
    "Confirm whether past papers or other practice materials are provided.",
    "Ask who teaches the classes and what relevant credentials are available.",
    "Confirm how questions are handled and whether academic support is included.",
    "Ask whether mock tests or other assessment activities are currently offered.",
    "Use current official DGCA material when revising regulatory requirements.",
    "Check for updated DGCA notices before applying for examinations.",
];

const onlineFeatures = [
    "Ask whether online classes are currently offered",
    "Confirm any live or recorded format",
    "Check which materials are included",
    "Request current schedule and fee details",
] as const;

const offlineFeatures = [
    "Ask whether classroom classes are currently offered",
    "Confirm the location and schedule",
    "Check instructor access and academic support",
    "Request current fee and refund details",
] as const;

// ─── Shared animation variants (module scope — single allocation) ─────────────
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } };
const viewport = { once: true, margin: "-50px" } as const;
const delay = (i: number) => ({ delay: i * 0.1 });

// ─── Memoized sub-components ──────────────────────────────────────────────────

/** Generic icon card used by subjects, benefits, skills */
const IconCard = memo(({ icon: Icon, heading, body, index }: {
    icon: LucideIcon; heading: string; body: string; index: number;
}) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={delay(index)}
        className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
    >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-bold mb-2">{heading}</h3>
        <p className="text-sm text-muted-foreground">{body}</p>
    </motion.div>
));
IconCard.displayName = "IconCard";

/** Icon card with left-aligned icon + text (who should join, selection factors) */
const IconRowCard = memo(({ icon: Icon, heading, body, index }: {
    icon: LucideIcon; heading: string; body: string; index: number;
}) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={delay(index)}
        className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
    >
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h3 className="font-bold mb-2">{heading}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
            </div>
        </div>
    </motion.div>
));
IconRowCard.displayName = "IconRowCard";

/** Bullet point card (reasons + tips) */
const BulletCard = memo(({ text, icon: Icon, index }: {
    text: string; icon: LucideIcon; index: number;
}) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={delay(index)}
        className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border"
    >
        <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <span className="text-muted-foreground">{text}</span>
    </motion.div>
));
BulletCard.displayName = "BulletCard";

/** Section heading — reusable pattern */
const SectionHeading = memo(({ title, subtitle, center = true }: {
    title: string; subtitle?: string; center?: boolean;
}) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className={`mb-12 ${center ? "text-center" : ""}`}
    >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {subtitle && (
            <p className={`text-muted-foreground max-w-3xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>
        )}
    </motion.div>
));
SectionHeading.displayName = "SectionHeading";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DGCAGroundClassesPage(): JSX.Element {
    return (
        <Layout>

            {/* ── Hero ── */}
            <section className="relative py-24 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="max-w-4xl"
                    >
                        <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                            Professional Ground Training
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            DGCA Ground Classes – Complete CPL Ground Training
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-6">
                            The most important step to become a commercial pilot is to prepare for the DGCA exams. DGCA ground classes offer theoretical knowledge to clear the DGCA written exams and move towards a Commercial Pilot's License.
                        </p>
                        <p className="text-lg text-primary-foreground/80 mb-8">
                            You are a beginner, or are already a pilot, but need to find the right DGCA ground class to help you succeed. Our professional ground classes are designed to give you a strong conceptual understanding of the subject.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Enroll in Ground Classes
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Find Classes Near Me</Link>
                            </Button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/20">
                            {[
                                { val: "CPL", label: "Ground-class pathway" },
                                { val: "Theory", label: "Academic preparation" },
                                { val: "Current", label: "Course scope: confirm with team" },
                                { val: "Separate", label: "Aircraft flight training" },
                            ].map(({ val, label }) => (
                                <div key={label}>
                                    <div className="text-3xl md:text-4xl font-bold mb-1">{val}</div>
                                    <div className="text-primary-foreground/70 text-sm">{label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <CitableAnswer
                heading="What subjects are covered in DGCA ground classes?"
                answer="DGCA ground classes are academic preparation for flight-crew theory examinations. The current CPL paper structure, subject names, pass requirements, validity periods and radio-telephony process must be checked against current official rules and notices; this page does not state unverified regulatory details. Flying Star Aviator provides ground classes in Dwarka, New Delhi. Confirm the current course syllabus, class format, materials and fees with the course team. Aircraft flying training is a separate stage."
                faqs={[
                    { q: "How many subjects are there in the DGCA CPL exam?", a: "Check the current DGCA examination requirements for the applicable CPL paper structure and subject names." },
                    { q: "What is the passing mark for DGCA exams?", a: "Check the current official DGCA examination instructions for pass requirements and subject validity." },
                ]}
                sources={[
                    { label: "DGCA Pariksha — current flight-crew examination portal", url: "https://pariksha.dgca.gov.in/" },
                ]}
                lastUpdated="2026-07-30"
            />

            {/* ── Quick Overview Table ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Quick Course Overview"
                        subtitle="Essential information about DGCA Ground Classes for CPL"
                    />
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="rounded-2xl border border-border overflow-x-auto shadow-card">
                            <table className="w-full">
                                <thead className="bg-primary text-primary-foreground">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Course Information</th>
                                        <th className="px-6 py-4 text-left font-semibold">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quickOverview.map((row, i) => (
                                        <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
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

            {/* ── What Are DGCA Ground Classes ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">What Are DGCA Ground Classes?</h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            DGCA ground classes provide academic preparation for flight-crew theory examinations. Confirm the current DGCA syllabus and examination requirements using official notices, and ask the course team to confirm its current subjects, schedule and study materials. Ground classes do not include aircraft flight instruction.
                        </p>
                        <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Structured Learning Approach</h3>
                                    <p className="text-muted-foreground">
                                        Ground classes are academic preparation, not practical aircraft instruction. Confirm the current course syllabus, materials and any assessment activities with the course team before enrolment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CPL Subjects ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="DGCA Ground Class Subjects (CPL)"
                        subtitle="The cards below are study-area labels, not a verified current DGCA examination list. Confirm both the current DGCA requirements and the course's teaching scope before enrolment."
                    />
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cplSubjects.map((s, i) => (
                            <IconCard key={s.name} icon={s.icon} heading={s.name} body={s.description} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Ground Training Is Important ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <SectionHeading
                        title="Why DGCA Ground Training Is Important"
                        subtitle="Quality ground training is essential because DGCA exams are concept-based and require strong fundamentals"
                    />
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
                        {whyGroundTrainingMatters.map((reason, i) => (
                            <BulletCard key={reason} text={reason} icon={CheckCircle} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Benefits of DGCA Ground Classes"
                        subtitle="Professional ground training provides comprehensive advantages for your aviation career"
                    />
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainingBenefits.map((b, i) => (
                            <IconCard key={b.title} icon={b.icon} heading={b.title} body={b.description} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Who Should Join ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <SectionHeading
                        title="Ground Classes for DGCA Exams – Who Should Join?"
                        subtitle="DGCA ground classes are ideal for various categories of aviation aspirants"
                    />
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                        {whoShouldJoin.map((item, i) => (
                            <IconRowCard key={item.category} icon={item.icon} heading={item.category} body={item.description} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Online vs Offline ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Online vs Offline DGCA Ground Classes"
                        subtitle="Current delivery formats are not confirmed here. Ask the course team whether online or classroom classes are currently available."
                    />

                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <motion.div
                                variants={fadeLeft}
                                initial="hidden"
                                whileInView="show"
                                viewport={viewport}
                                className="p-8 rounded-2xl bg-card border border-border"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <MonitorPlay className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">DGCA Ground Classes Online</h3>
                                <ul className="space-y-2">
                                    {onlineFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                            <span className="text-sm">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                variants={fadeRight}
                                initial="hidden"
                                whileInView="show"
                                viewport={viewport}
                                className="p-8 rounded-2xl bg-card border border-border"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <Building className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Offline DGCA Ground Classes</h3>
                                <ul className="space-y-2">
                                    {offlineFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                            <span className="text-sm">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-5xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center">Detailed Comparison</h3>
                        <div className="rounded-2xl border border-border overflow-x-auto shadow-card">
                            <table className="w-full">
                                <thead className="bg-primary text-primary-foreground">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Aspect</th>
                                        <th className="px-6 py-4 text-left font-semibold">Online Classes</th>
                                        <th className="px-6 py-4 text-left font-semibold">Offline Classes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {onlineVsOffline.map((row, i) => (
                                        <tr key={row.aspect} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                            <td className="px-6 py-4 font-semibold text-sm">{row.aspect}</td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm">{row.online}</td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm">{row.offline}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Fees ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <SectionHeading
                        title="DGCA Ground Classes Fees"
                        subtitle="No current written course price is confirmed on this page. Request an itemised quotation from the course team."
                    />
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewport}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <DollarSign className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-4">Request Current Fees</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-semibold">Current course fee:</span>
                                        <span className="text-muted-foreground"> request a written quotation</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Confirm available enrolment options</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Confirm delivery format and any separate charges</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewport}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-2xl bg-primary/5 border border-primary/20"
                        >
                            <MapPin className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-4">Find Classes Near You</h3>
                            <p className="text-muted-foreground mb-4">
                                Students often search for "DGCA ground classes near me" or "CPL ground classes near
                                me" when comparing options.
                            </p>
                            <p className="text-muted-foreground">
                                Ask whether classes are available at the Dwarka, New Delhi centre or in another format. Confirm current access, schedule and fees directly with the course team.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── How to Choose ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Best Ground Classes for DGCA Exams – How to Choose"
                        subtitle="When selecting the best DGCA ground classes, consider these essential factors"
                    />
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                        {selectionFactors.map((f, i) => (
                            <IconRowCard key={f.factor} icon={f.icon} heading={f.factor} body={f.description} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What You Learn ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <SectionHeading
                        title="Ground Classes for Pilots – What You Learn"
                        subtitle="Professional ground classes for pilots go beyond exam preparation to develop comprehensive aviation skills"
                    />
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skillsCovered.map((s, i) => (
                                <IconCard key={s.skill} icon={s.icon} heading={s.skill} body={s.description} index={i} />
                            ))}
                        </div>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewport}
                            className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center"
                        >
                            <p className="text-muted-foreground">
                                Course content, delivery and assessment activities should be confirmed with the course team. Ground classes do not guarantee examination or employment outcomes and do not replace practical flight training.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Preparation Tips ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Ground Training Success Tips"
                        subtitle="Follow these guidelines to maximize your DGCA ground training experience"
                    />
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
                        {preparationTips.map((tip, i) => (
                            <BulletCard key={tip} text={tip} icon={Star} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="py-20 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Start Your Pilot Journey with the Right Ground Classes
                        </h2>
                        <div className="space-y-4 text-primary-foreground/80 text-lg mb-8">
                            <p>DGCA ground classes are a separate academic stage in a pilot-licensing pathway. They do not include aircraft flight training or guarantee an examination result or employment.</p>
                            <p>Before enrolling, confirm the current course syllabus, available delivery format, schedule, included materials, fees and refund terms with the course team.</p>
                            <p>Check current eligibility, examination subjects and regulatory requirements against official DGCA guidance.</p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Enroll in Ground Classes
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Get Fee Details</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Find Classes Near Me</Link>
                            </Button>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/20">
                            <p className="text-primary-foreground/70 text-sm mb-4">Popular Searches</p>
                            <div className="flex flex-wrap gap-3 justify-center text-sm">
                                {[
                                    "DGCA ground classes near me",
                                    "CPL ground classes near me",
                                    "Ground classes for CPL in Delhi",
                                    "DGCA ground classes online",
                                    "Online ground classes for CPL",
                                ].map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Further reading — internal links to related guides */}
            <section aria-labelledby="further-reading" className="py-12 bg-muted">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 id="further-reading" className="text-2xl font-bold mb-6">Further reading</h2>
                    <ul className="space-y-4">
                        <li>
                            <Link to="/blog/dgca-ground-classes-vs-self-study" className="group block">
                                <span className="font-semibold text-primary group-hover:underline">
                                    DGCA Ground Classes vs Self-Study: Which Route Actually Clears the Exams?
                                </span>
                                <span className="block text-sm text-muted-foreground mt-1">
                                    Ground classes are not a DGCA requirement. An honest look at what each route costs
                                    in fees and months, and how to judge a ground school before you pay.
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dgca/computer-number" className="group block">
                                <span className="font-semibold text-primary group-hover:underline">
                                    DGCA Computer Number: documents and process
                                </span>
                                <span className="block text-sm text-muted-foreground mt-1">
                                    Check current Pariksha instructions for registration requirements before applying.
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dgca/medical" className="group block">
                                <span className="font-semibold text-primary group-hover:underline">
                                    DGCA Class 1 and Class 2 medical requirements
                                </span>
                                <span className="block text-sm text-muted-foreground mt-1">
                                    Read about medical assessment guidance and confirm current requirements with DGCA.
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </Layout>
    );
}
