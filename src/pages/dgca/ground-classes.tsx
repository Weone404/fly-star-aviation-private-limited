import { memo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
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
    { label: "Purpose", value: "CPL Theory Exam Preparation" },
    { label: "Training Mode", value: "Online / Offline / Hybrid" },
    { label: "Subjects Covered", value: "6 DGCA Papers" },
    { label: "Authority", value: "DGCA (Directorate General of Civil Aviation)" },
    { label: "Fee Range", value: "₹1.5 - 3.5 Lakhs (Full Course)" },
    { label: "Who Can Join", value: "10+2 Students, Flying Students, Professionals" },
];

const cplSubjects: Subject[] = [
    { icon: Compass, name: "Air Navigation", description: "Navigation principles, charts, flight planning, and dead reckoning techniques" },
    { icon: Cloud, name: "Aviation Meteorology", description: "Weather patterns, atmospheric conditions, and meteorological decision-making" },
    { icon: Shield, name: "Air Regulations", description: "Aviation laws, DGCA regulations, licensing requirements, and safety protocols" },
    { icon: Wrench, name: "Technical General", description: "Aircraft systems, engines, instruments, and general aviation mechanics" },
    { icon: Award, name: "Technical Specific", description: "Specific aircraft type systems and operational procedures" },
    { icon: Radio, name: "Radio Telephony Restricted (RTR)", description: "Aviation communication procedures and radio telephony protocols" },
];

const trainingBenefits: Benefit[] = [
    { icon: TrendingUp, title: "Higher DGCA Exam Pass Rate", description: "Structured training leads to better exam performance and first-attempt success" },
    { icon: Target, title: "Structured Study Plan", description: "Organized curriculum covering all topics systematically with proper revision" },
    { icon: Users, title: "Experienced Instructors", description: "Learn from aviation professionals with flying and teaching experience" },
    { icon: FileCheck, title: "Real DGCA Exam Practice", description: "Access to previous year questions and mock tests matching actual exam patterns" },
    { icon: Clock, title: "Faster CPL Completion", description: "Efficient preparation reduces overall time to complete your Commercial Pilot License" },
    { icon: DollarSign, title: "Cost Savings", description: "Clear exams on first attempt, avoiding re-exam fees and training delays" },
];

const onlineVsOffline: ComparisonRow[] = [
    { aspect: "Learning Format", online: "Live & Recorded Lectures", offline: "Face-to-Face Classroom" },
    { aspect: "Schedule", online: "Flexible Study Timing", offline: "Fixed Class Routine" },
    { aspect: "Study Material", online: "Digital Resources & E-Books", offline: "Physical Books & Notes" },
    { aspect: "Interaction", online: "Virtual Q&A Sessions", offline: "Direct Instructor Access" },
    { aspect: "Location", online: "Learn from Anywhere", offline: "Institute Premises" },
    { aspect: "Peer Learning", online: "Online Study Groups", offline: "Classroom Collaboration" },
    { aspect: "Cost", online: "Generally Lower Fees", offline: "Higher Investment" },
];

const whoShouldJoin: WhoShouldJoin[] = [
    { category: "10+2 Students", description: "Students who have completed 10+2 with Physics and Mathematics, planning to pursue CPL", icon: GraduationCap },
    { category: "Flying Students", description: "Current flight training students preparing for DGCA theory examinations", icon: Target },
    { category: "Foreign License Holders", description: "Pilots with foreign licenses converting to DGCA Commercial Pilot License", icon: Globe },
    { category: "Working Professionals", description: "Professionals pursuing pilot training while managing career commitments", icon: Users },
];

const selectionFactors: SelectionFactor[] = [
    { factor: "DGCA Exam Success Rate", description: "Check the institute's track record of students clearing DGCA exams on first attempt", icon: Trophy },
    { factor: "Instructor Experience", description: "Verify that instructors have both flying experience and teaching expertise", icon: Award },
    { factor: "Updated DGCA Syllabus", description: "Ensure training follows the latest DGCA curriculum and exam patterns", icon: FileCheck },
    { factor: "Mock Tests & Revision", description: "Availability of regular mock exams and comprehensive revision support", icon: Brain },
    { factor: "Online/Offline Flexibility", description: "Choose institutes offering both online and offline training options", icon: MonitorPlay },
];

const skillsCovered: SkillCovered[] = [
    { skill: "Aviation Decision-Making", description: "Critical thinking and judgment skills for safe flight operations", icon: Brain },
    { skill: "Weather Interpretation", description: "Analyzing meteorological data and making informed flight decisions", icon: Cloud },
    { skill: "Flight Planning", description: "Route planning, fuel calculations, and operational planning skills", icon: Compass },
    { skill: "Aircraft Systems Understanding", description: "Deep knowledge of aircraft mechanics and operational systems", icon: Wrench },
    { skill: "Airline Interview Preparation", description: "Technical knowledge and confidence for airline selection processes", icon: Users },
];

const whyGroundTrainingMatters: string[] = [
    "Quality ground training is essential because DGCA exams are concept-based and require strong fundamentals",
    "Clear DGCA papers on first attempt with proper preparation",
    "Reduce overall CPL duration and accelerate your pilot career",
    "Save money on re-examination fees and additional training costs",
    "Improve overall flying performance with solid theoretical knowledge",
    "Build confidence for airline interviews and professional operations",
];

const preparationTips: string[] = [
    "Start ground classes before or alongside flight training for best results",
    "Attend all lectures and maintain regular study schedule",
    "Practice with previous year DGCA exam papers extensively",
    "Clear doubts immediately with instructors during classes",
    "Form study groups with fellow students for collaborative learning",
    "Take regular mock tests to assess your preparation level",
    "Revise thoroughly before DGCA examinations",
    "Stay updated with latest DGCA circulars and regulations",
];

const onlineFeatures = [
    "Live and recorded lectures",
    "Flexible study schedule",
    "Access to digital study material",
    "Learn from anywhere in India",
] as const;

const offlineFeatures = [
    "Face-to-face classroom interaction",
    "Structured discipline and routine",
    "Direct instructor guidance",
    "Peer learning opportunities",
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
        <h4 className="font-bold mb-2">{heading}</h4>
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
                <h4 className="font-bold mb-2">{heading}</h4>
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
            <Helmet>
                <title>DGCA Ground Classes | CPL Ground Training in India - Complete Guide</title>
                <meta
                    name="description"
                    content="Complete guide to DGCA ground classes for CPL in India. Structured ground training for Air Navigation, Meteorology, Regulations, Technical subjects. Online & offline classes available."
                />
            </Helmet>

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
                                { val: "6", label: "DGCA Subjects" },
                                { val: "100%", label: "Pass Rate" },
                                { val: "Both", label: "Online & Offline" },
                                { val: "DGCA", label: "Approved" },
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
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
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
                            DGCA ground classes are training sessions that are conducted to help students prepare and pass the DGCA CPL theory exams conducted by the Directorate General of Civil Aviation, India. These ground classes are conducted to provide students with a strong conceptual understanding and exam preparation, and they cover the basics of aviation. Professional CPL ground classes are conducted as per the latest DGCA syllabus and exam patterns.
                        </p>
                        <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Structured Learning Approach</h3>
                                    <p className="text-muted-foreground">
                                        Our ground classes combine theoretical knowledge with practical applications,
                                        ensuring students not only pass exams but also become competent aviation
                                        professionals ready for real-world flying scenarios.
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
                        subtitle="All ground classes for CPL cover mandatory DGCA subjects structured as per the latest DGCA syllabus and exam patterns"
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
                        subtitle="Choose the learning format that best suits your schedule and learning style"
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
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
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
                        subtitle="DGCA ground classes fees depend on location, faculty quality, and training format"
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
                            <h3 className="text-xl font-bold mb-4">Approximate Fee Range</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-semibold">Full CPL Ground Classes:</span>
                                        <span className="text-muted-foreground"> ₹1.5 – 3.5 Lakhs</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Subject-wise enrollment available</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Online classes generally cost less</span>
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
                                Cities like Delhi are major hubs for offline DGCA ground training. Reputed institutes
                                now offer hybrid models to support students across India.
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
                                This comprehensive approach makes aviation ground classes valuable even after clearing DGCA
                                exams, preparing you for professional airline operations and career advancement.
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
                            <p>Having the right theoretical knowledge is the key to becoming a professional pilot. Taking the right DGCA ground classes is the key to acing the exam with confidence and moving ahead with your CPL.</p>
                            <p>Whether you want to take the DGCA ground classes online or offline in Delhi, the right ground training is the smartest move you can make at the beginning of your pilot training.</p>
                            <p>Join thousands of other pilots who cleared the DGCA exam on the first attempt and are flying with the top airlines around the world.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </Layout>
    );
}