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
    Zap,
    Brain,
    FileCheck,
    Trophy,
    LucideIcon,
} from "lucide-react";

interface OverviewRow {
    label: string;
    value: string;
}

interface Subject {
    icon: LucideIcon;
    name: string;
    description: string;
}

interface Benefit {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface ComparisonRow {
    aspect: string;
    online: string;
    offline: string;
}

interface WhoShouldJoin {
    category: string;
    description: string;
    icon: LucideIcon;
}

interface SelectionFactor {
    factor: string;
    description: string;
    icon: LucideIcon;
}

interface SkillCovered {
    skill: string;
    description: string;
    icon: LucideIcon;
}

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
    {
        icon: Compass,
        name: "Air Navigation",
        description: "Navigation principles, charts, flight planning, and dead reckoning techniques",
    },
    {
        icon: Cloud,
        name: "Aviation Meteorology",
        description: "Weather patterns, atmospheric conditions, and meteorological decision-making",
    },
    {
        icon: Shield,
        name: "Air Regulations",
        description: "Aviation laws, DGCA regulations, licensing requirements, and safety protocols",
    },
    {
        icon: Wrench,
        name: "Technical General",
        description: "Aircraft systems, engines, instruments, and general aviation mechanics",
    },
    {
        icon: Award,
        name: "Technical Specific",
        description: "Specific aircraft type systems and operational procedures",
    },
    {
        icon: Radio,
        name: "Radio Telephony Restricted (RTR)",
        description: "Aviation communication procedures and radio telephony protocols",
    },
];

const trainingBenefits: Benefit[] = [
    {
        icon: TrendingUp,
        title: "Higher DGCA Exam Pass Rate",
        description: "Structured training leads to better exam performance and first-attempt success",
    },
    {
        icon: Target,
        title: "Structured Study Plan",
        description: "Organized curriculum covering all topics systematically with proper revision",
    },
    {
        icon: Users,
        title: "Experienced Instructors",
        description: "Learn from aviation professionals with flying and teaching experience",
    },
    {
        icon: FileCheck,
        title: "Real DGCA Exam Practice",
        description: "Access to previous year questions and mock tests matching actual exam patterns",
    },
    {
        icon: Clock,
        title: "Faster CPL Completion",
        description: "Efficient preparation reduces overall time to complete your Commercial Pilot License",
    },
    {
        icon: DollarSign,
        title: "Cost Savings",
        description: "Clear exams on first attempt, avoiding re-exam fees and training delays",
    },
];

const onlineVsOffline: ComparisonRow[] = [
    {
        aspect: "Learning Format",
        online: "Live & Recorded Lectures",
        offline: "Face-to-Face Classroom",
    },
    {
        aspect: "Schedule",
        online: "Flexible Study Timing",
        offline: "Fixed Class Routine",
    },
    {
        aspect: "Study Material",
        online: "Digital Resources & E-Books",
        offline: "Physical Books & Notes",
    },
    {
        aspect: "Interaction",
        online: "Virtual Q&A Sessions",
        offline: "Direct Instructor Access",
    },
    {
        aspect: "Location",
        online: "Learn from Anywhere",
        offline: "Institute Premises",
    },
    {
        aspect: "Peer Learning",
        online: "Online Study Groups",
        offline: "Classroom Collaboration",
    },
    {
        aspect: "Cost",
        online: "Generally Lower Fees",
        offline: "Higher Investment",
    },
];

const whoShouldJoin: WhoShouldJoin[] = [
    {
        category: "10+2 Students",
        description: "Students who have completed 10+2 with Physics and Mathematics, planning to pursue CPL",
        icon: GraduationCap,
    },
    {
        category: "Flying Students",
        description: "Current flight training students preparing for DGCA theory examinations",
        icon: Target,
    },
    {
        category: "Foreign License Holders",
        description: "Pilots with foreign licenses converting to DGCA Commercial Pilot License",
        icon: Globe,
    },
    {
        category: "Working Professionals",
        description: "Professionals pursuing pilot training while managing career commitments",
        icon: Users,
    },
];

const selectionFactors: SelectionFactor[] = [
    {
        factor: "DGCA Exam Success Rate",
        description: "Check the institute's track record of students clearing DGCA exams on first attempt",
        icon: Trophy,
    },
    {
        factor: "Instructor Experience",
        description: "Verify that instructors have both flying experience and teaching expertise",
        icon: Award,
    },
    {
        factor: "Updated DGCA Syllabus",
        description: "Ensure training follows the latest DGCA curriculum and exam patterns",
        icon: FileCheck,
    },
    {
        factor: "Mock Tests & Revision",
        description: "Availability of regular mock exams and comprehensive revision support",
        icon: Brain,
    },
    {
        factor: "Online/Offline Flexibility",
        description: "Choose institutes offering both online and offline training options",
        icon: MonitorPlay,
    },
];

const skillsCovered: SkillCovered[] = [
    {
        skill: "Aviation Decision-Making",
        description: "Critical thinking and judgment skills for safe flight operations",
        icon: Brain,
    },
    {
        skill: "Weather Interpretation",
        description: "Analyzing meteorological data and making informed flight decisions",
        icon: Cloud,
    },
    {
        skill: "Flight Planning",
        description: "Route planning, fuel calculations, and operational planning skills",
        icon: Compass,
    },
    {
        skill: "Aircraft Systems Understanding",
        description: "Deep knowledge of aircraft mechanics and operational systems",
        icon: Wrench,
    },
    {
        skill: "Airline Interview Preparation",
        description: "Technical knowledge and confidence for airline selection processes",
        icon: Users,
    },
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

            {/* Hero Section */}
            <section className="relative py-24 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                            Professional Ground Training
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            DGCA Ground Classes – Complete CPL Ground Training
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-6">
                            Preparing for DGCA exams is the most crucial step in becoming a commercial pilot. DGCA ground
                            classes provide structured theoretical knowledge required to clear DGCA written examinations
                            and progress toward a Commercial Pilot License (CPL).
                        </p>
                        <p className="text-lg text-primary-foreground/80 mb-8">
                            Whether you are a beginner or already flying, enrolling in the right DGCA ground class can make
                            a significant difference in your success. Our professional ground classes focus on strong
                            conceptual understanding, exam-oriented preparation, and aviation fundamentals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
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
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">6</div>
                                <div className="text-primary-foreground/70 text-sm">DGCA Subjects</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">100%</div>
                                <div className="text-primary-foreground/70 text-sm">Pass Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">Both</div>
                                <div className="text-primary-foreground/70 text-sm">Online & Offline</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">DGCA</div>
                                <div className="text-primary-foreground/70 text-sm">Approved</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Overview */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Course Overview</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Essential information about DGCA Ground Classes for CPL
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
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
                                    {quickOverview.map((row, index) => (
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

            {/* What Are DGCA Ground Classes */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">What Are DGCA Ground Classes?</h2>
                        <div className="space-y-4 text-lg text-muted-foreground mb-8">
                            <p>
                                DGCA ground classes are classroom or online training programs designed to help aspiring
                                pilots clear DGCA CPL theory exams conducted by the Directorate General of Civil Aviation
                                (DGCA), India.
                            </p>
                            <p>
                                These ground classes focus on strong conceptual understanding, exam-oriented preparation,
                                and aviation fundamentals. Professional CPL ground classes are structured as per the latest
                                DGCA syllabus and exam patterns.
                            </p>
                        </div>

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

            {/* CPL Subjects */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">DGCA Ground Class Subjects (CPL)</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            All ground classes for CPL cover mandatory DGCA subjects structured as per the latest DGCA
                            syllabus and exam patterns
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cplSubjects.map((subject, index) => (
                                <motion.div
                                    key={subject.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <subject.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2">{subject.name}</h4>
                                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Ground Training Is Important */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                            Why DGCA Ground Training Is Important
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 text-center">
                            Quality ground training is essential because DGCA exams are concept-based and require strong
                            fundamentals
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            {whyGroundTrainingMatters.map((reason, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border"
                                >
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{reason}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits of DGCA Ground Classes */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of DGCA Ground Classes</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            Professional ground training provides comprehensive advantages for your aviation career
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trainingBenefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <benefit.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2">{benefit.title}</h4>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
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
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ground Classes for DGCA Exams – Who Should Join?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            DGCA ground classes are ideal for various categories of aviation aspirants
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            {whoShouldJoin.map((item, index) => (
                                <motion.div
                                    key={item.category}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">{item.category}</h4>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Online vs Offline */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Online vs Offline DGCA Ground Classes</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose the learning format that best suits your schedule and learning style
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-card border border-border"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <MonitorPlay className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">DGCA Ground Classes Online</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Live and recorded lectures</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Flexible study schedule</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Access to digital study material</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Learn from anywhere in India</span>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-card border border-border"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <Building className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Offline DGCA Ground Classes</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Face-to-face classroom interaction</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Structured discipline and routine</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Direct instructor guidance</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Peer learning opportunities</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
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
                                    {onlineVsOffline.map((row, index) => (
                                        <tr key={row.aspect} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
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

            {/* DGCA Ground Classes Fees */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">DGCA Ground Classes Fees</h2>
                        <p className="text-lg text-muted-foreground mb-8 text-center">
                            DGCA ground classes fees depend on location, faculty quality, and training format
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
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
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
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
                    </motion.div>
                </div>
            </section>

            {/* How to Choose Best Ground Classes */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Best Ground Classes for DGCA Exams – How to Choose
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            When selecting the best DGCA ground classes, consider these essential factors
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            {selectionFactors.map((factor, index) => (
                                <motion.div
                                    key={factor.factor}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <factor.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">{factor.factor}</h4>
                                            <p className="text-sm text-muted-foreground">{factor.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Learn */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ground Classes for Pilots – What You Learn
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Professional ground classes for pilots go beyond exam preparation to develop comprehensive
                            aviation skills
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skillsCovered.map((skill, index) => (
                                <motion.div
                                    key={skill.skill}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <skill.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2">{skill.skill}</h4>
                                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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

            {/* Preparation Tips */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                            Ground Training Success Tips
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 text-center">
                            Follow these guidelines to maximize your DGCA ground training experience
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            {preparationTips.map((tip, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border"
                                >
                                    <Star className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{tip}</span>
                                </motion.div>
                            ))}
                        </div>
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
                            Start Your Pilot Journey with the Right Ground Classes
                        </h2>
                        <div className="space-y-4 text-primary-foreground/80 text-lg mb-8">
                            <p>
                                Strong theoretical foundations are key to becoming a professional pilot. Enrolling in the
                                right DGCA ground classes ensures confident exam performance and smooth progress toward
                                your CPL.
                            </p>
                            <p>
                                Whether you choose DGCA ground classes online, offline training in Delhi, or a hybrid
                                model, investing in quality ground training is the smartest first step in your aviation
                                career.
                            </p>
                            <p>
                                Join thousands of successful pilots who have cleared their DGCA exams on the first attempt
                                and are now flying for major airlines across the world.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Enroll in Ground Classes
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/ground-classes/fees">Get Fee Details</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Find Classes Near Me</Link>
                            </Button>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/20">
                            <p className="text-primary-foreground/70 text-sm mb-4">Popular Searches</p>
                            <div className="flex flex-wrap gap-3 justify-center text-sm">
                                <span className="px-3 py-1 bg-white/10 rounded-full">DGCA ground classes near me</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full">CPL ground classes near me</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full">Ground classes for CPL in Delhi</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full">DGCA ground classes online</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full">Online ground classes for CPL</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}