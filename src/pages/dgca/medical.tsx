import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Stethoscope,
    Heart,
    Eye,
    Ear,
    Brain,
    Activity,
    FileCheck,
    ArrowRight,
    CheckCircle,
    ClipboardList,
    UserCheck,
    Shield,
    AlertCircle,
    Clock,
    FileText,
    Award,
    Users,
    Zap,
    LucideIcon,
} from "lucide-react";

interface OverviewRow {
    label: string;
    value: string;
}

interface MedicalComparison {
    aspect: string;
    classII: string;
    classI: string;
}

interface ClassIIRequirement {
    icon: LucideIcon;
    category: string;
    details: string;
    tests: string[];
}

interface ClassIAdvancedTest {
    icon: LucideIcon;
    test: string;
    description: string;
}

interface MedicalStep {
    step: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

interface ImportantConsideration {
    title: string;
    description: string;
    icon: LucideIcon;
}

interface ValidityRule {
    age: string;
    classII: string;
    classI: string;
}

const quickOverview: OverviewRow[] = [
    { label: "Medical Types", value: "Class II & Class I" },
    { label: "Governing Authority", value: "DGCA (Directorate General of Civil Aviation)" },
    { label: "Class II Purpose", value: "Student Pilot License (SPL)" },
    { label: "Class I Purpose", value: "Commercial Pilot License (CPL)" },
    { label: "Class II Validity", value: "5 Years (Under 40) / 2 Years (Over 40)" },
    { label: "Class I Validity", value: "1 Year (Under 40) / 6 Months (Over 40)" },
    { label: "Examination Mode", value: "DGCA-Approved Medical Centers" },
];

const medicalComparison: MedicalComparison[] = [
    {
        aspect: "Purpose",
        classII: "Student Pilot License (SPL), Private Flying",
        classI: "Commercial Pilot License (CPL), Professional Flying"
    },
    {
        aspect: "Complexity",
        classII: "Basic Medical Assessment",
        classI: "Comprehensive Medical Examination"
    },
    {
        aspect: "Vision Standards",
        classII: "Standard eyesight (with/without correction)",
        classI: "Stricter vision requirements"
    },
    {
        aspect: "Testing Depth",
        classII: "General fitness evaluation",
        classI: "Advanced tests (ECG, X-ray, blood work)"
    },
    {
        aspect: "Validity (Under 40)",
        classII: "5 Years",
        classI: "1 Year"
    },
    {
        aspect: "Career Stage",
        classII: "Entry Level - Flight Training",
        classI: "Professional - Commercial Operations"
    },
];

const classIIRequirements: ClassIIRequirement[] = [
    {
        icon: Eye,
        category: "Vision Requirements",
        details: "Acceptable eyesight with or without corrective lenses",
        tests: ["Visual acuity test", "Color vision assessment", "Depth perception"]
    },
    {
        icon: Ear,
        category: "Hearing Requirements",
        details: "Standard hearing ability for effective communication",
        tests: ["Pure tone audiometry", "Speech discrimination", "Ear examination"]
    },
    {
        icon: Heart,
        category: "Physical Requirements",
        details: "Basic physical health to ensure general fitness",
        tests: ["Blood pressure", "General physical examination", "Height & weight assessment"]
    },
    {
        icon: Brain,
        category: "Mental Fitness",
        details: "Psychological stability for flight training",
        tests: ["Mental health assessment", "Cognitive function", "Stress evaluation"]
    },
];

const classIAdvancedTests: ClassIAdvancedTest[] = [
    {
        icon: Activity,
        test: "Electrocardiogram (ECG)",
        description: "Comprehensive heart function analysis",
    },
    {
        icon: Stethoscope,
        test: "Blood Tests",
        description: "Complete blood count, glucose, lipid profile",
    },
    {
        icon: FileCheck,
        test: "Chest X-Ray",
        description: "Lung and thoracic cavity assessment",
    },
    {
        icon: Ear,
        test: "Audiometry",
        description: "Detailed hearing threshold evaluation",
    },
    {
        icon: Eye,
        test: "Ophthalmology Assessment",
        description: "Advanced eye examination including fundoscopy",
    },
    {
        icon: Brain,
        test: "Psychological Evaluation",
        description: "In-depth mental health and cognitive assessment",
    },
];

const classIISteps: MedicalStep[] = [
    {
        step: 1,
        title: "Register on eGCA Portal",
        description: "Create account and register for DGCA Class II medical examination",
        icon: FileText,
    },
    {
        step: 2,
        title: "Select Medical Examiner",
        description: "Choose a DGCA-approved medical examiner or center",
        icon: Users,
    },
    {
        step: 3,
        title: "Undergo Medical Tests",
        description: "Complete all required physical and vision examinations",
        icon: Stethoscope,
    },
    {
        step: 4,
        title: "Submit Medical Reports",
        description: "Provide all test results to the approved doctor",
        icon: ClipboardList,
    },
    {
        step: 5,
        title: "Receive Certificate",
        description: "Get your DGCA Class II medical certificate",
        icon: Award,
    },
];

const classISteps: MedicalStep[] = [
    {
        step: 1,
        title: "Complete Class II Medical",
        description: "Ensure your Class II medical is valid before applying",
        icon: Shield,
    },
    {
        step: 2,
        title: "Register for Class I",
        description: "Apply through eGCA portal for advanced medical",
        icon: FileText,
    },
    {
        step: 3,
        title: "Choose Approved Center",
        description: "Select DGCA-authorized Class I medical facility",
        icon: Users,
    },
    {
        step: 4,
        title: "Comprehensive Testing",
        description: "Undergo ECG, blood tests, X-ray, and all assessments",
        icon: Activity,
    },
    {
        step: 5,
        title: "Specialist Consultations",
        description: "Complete ophthalmology and other specialist exams",
        icon: Eye,
    },
    {
        step: 6,
        title: "Final Assessment",
        description: "Medical examiner reviews all reports",
        icon: ClipboardList,
    },
    {
        step: 7,
        title: "Obtain Class I Certificate",
        description: "Receive your commercial pilot medical certification",
        icon: Award,
    },
];

const whoNeedsClassII: string[] = [
    "Student Pilot License (SPL) applicants starting flight training",
    "Private Pilot License (PPL) holders for recreational flying",
    "Flight Radio Telephone Operator's License applicants",
    "Aspiring pilots beginning their aviation journey",
];

const whoNeedsClassI: string[] = [
    "Commercial Pilot License (CPL) holders and applicants",
    "Airline Transport Pilot License (ATPL) holders",
    "Flight Engineers operating commercial aircraft",
    "Professional pilots flying for airlines and commercial operators",
];

const importantConsiderations: ImportantConsideration[] = [
    {
        title: "Medical Standards are Strict",
        description: "DGCA maintains stringent health standards to ensure passenger and crew safety",
        icon: Shield,
    },
    {
        title: "Early Preparation Matters",
        description: "Start your medical assessment early to address any potential issues",
        icon: Clock,
    },
    {
        title: "Choose Authorized Centers",
        description: "Only DGCA-approved medical examiners can issue valid certificates",
        icon: UserCheck,
    },
    {
        title: "Maintain Valid Certification",
        description: "Renew your medical before expiry to avoid training interruptions",
        icon: AlertCircle,
    },
];

const validityRules: ValidityRule[] = [
    {
        age: "Under 40 Years",
        classII: "Valid for 5 Years",
        classI: "Valid for 1 Year",
    },
    {
        age: "40-50 Years",
        classII: "Valid for 2 Years",
        classI: "Valid for 6 Months",
    },
    {
        age: "Over 50 Years",
        classII: "Valid for 1 Year",
        classI: "Valid for 6 Months",
    },
];

const preparationTips: string[] = [
    "Maintain good general health and fitness levels",
    "Get adequate sleep before your examination",
    "Avoid alcohol 24 hours before medical tests",
    "Bring all previous medical records if applicable",
    "Wear comfortable clothing for physical examination",
    "Bring prescription glasses or contact lenses if worn",
    "Fast overnight if blood tests are required",
    "Arrive on time with all required documents",
];

export default function DGCAMedicalGuidePage(): JSX.Element {
    return (
        <Layout>
            <Helmet>
                <title>DGCA Class 1 & Class 2 Medical Guide | Medical Requirements for Pilots in India</title>
                <meta
                    name="description"
                    content="Complete guide to DGCA Class I and Class II medical examinations for pilots in India. Requirements, procedures, validity, and steps to obtain medical certificates."
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
                            Essential Medical Guide
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            DGCA Class 2 & Class 1 Medical Guide
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-6">
                            Aspiring pilots in India are required to undergo specific medical assessments to ensure they
                            meet the necessary mental and physical health standards for aviation. The Directorate General
                            of Civil Aviation (DGCA) mandates two primary medical examinations — DGCA Class II and DGCA
                            Class I medical certifications.
                        </p>
                        <p className="text-lg text-primary-foreground/80 mb-8">
                            Both assessments are critical to starting and progressing in a pilot's career. This
                            comprehensive guide covers requirements, procedures, validity, and everything you need to know
                            about DGCA medical certifications.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Start Your Medical Process
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Medical Counselor</Link>
                            </Button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="h-5 w-5" />
                                    <div className="text-2xl font-bold">2 Types</div>
                                </div>
                                <div className="text-primary-foreground/70 text-sm">Medical Certifications</div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <UserCheck className="h-5 w-5" />
                                    <div className="text-2xl font-bold">DGCA</div>
                                </div>
                                <div className="text-primary-foreground/70 text-sm">Approved Centers</div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="h-5 w-5" />
                                    <div className="text-2xl font-bold">100%</div>
                                </div>
                                <div className="text-primary-foreground/70 text-sm">Safety Standards</div>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Medical Overview</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Essential information about DGCA medical certifications
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
                                        <th className="px-6 py-4 text-left font-semibold">Medical Information</th>
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

            {/* Overview Section */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Overview of DGCA Medical Examinations
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground mb-8">
                            <p>
                                To become a licensed pilot in India, DGCA mandates medical certifications to verify that
                                pilots meet stringent health standards. These examinations are designed to assess overall
                                fitness, detect any medical conditions that could impair flying ability, and ensure the
                                safety of passengers and crew.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <FileCheck className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Class II Medical Certificate</h3>
                                <p className="text-muted-foreground mb-4">
                                    Required initially for a Student Pilot License (SPL) and to start flight training.
                                    This is the entry-level medical certification.
                                </p>
                                <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                                    <Zap className="h-4 w-4" />
                                    Entry Level Assessment
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <Award className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Class I Medical Certificate</h3>
                                <p className="text-muted-foreground mb-4">
                                    Necessary for obtaining a Commercial Pilot License (CPL) and for operating as a
                                    commercial pilot. More comprehensive examination.
                                </p>
                                <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                                    <Shield className="h-4 w-4" />
                                    Professional Standards
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Class II vs Class I Medical</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Key differences between the two medical certifications
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
                            <table className="w-full">
                                <thead className="bg-primary text-primary-foreground">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Aspect</th>
                                        <th className="px-6 py-4 text-left font-semibold">Class II Medical</th>
                                        <th className="px-6 py-4 text-left font-semibold">Class I Medical</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicalComparison.map((row, index) => (
                                        <tr key={row.aspect} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                            <td className="px-6 py-4 font-semibold text-sm">{row.aspect}</td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm">{row.classII}</td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm">{row.classI}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Class II Medical Section */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mb-12"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Entry Level Certification
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">DGCA Class II Medical Examination</h2>
                        <p className="text-lg text-muted-foreground">
                            The DGCA Class II medical examination is the entry-level certification for individuals
                            aspiring to begin their pilot training. This certification is mandatory for obtaining a Student
                            Pilot License (SPL) and enrolling in a DGCA-approved flight school.
                        </p>
                    </motion.div>

                    {/* Who Needs Class II */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <h3 className="text-2xl font-bold mb-6">Who Needs a Class II Medical Certificate?</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {whoNeedsClassII.map((need, index) => (
                                <motion.div
                                    key={need}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border"
                                >
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{need}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Class II Standards */}
                    <div className="max-w-5xl mx-auto mb-12">
                        <h3 className="text-2xl font-bold mb-8 text-center">Class II Medical Standards</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {classIIRequirements.map((req, index) => (
                                <motion.div
                                    key={req.category}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <req.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2">{req.category}</h4>
                                    <p className="text-sm text-muted-foreground mb-4">{req.details}</p>
                                    <div className="space-y-1">
                                        {req.tests.map((test, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="w-1 h-1 rounded-full bg-primary"></span>
                                                {test}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Steps to Obtain Class II */}
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-2xl font-bold mb-8 text-center">
                            Steps to Obtain a Class II Medical Certificate
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {classIISteps.map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                                >
                                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                                        {item.step}
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Class I Medical Section - Continue with remaining sections */}
            {/* ... */}

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
                            Ready to Start Your Medical Certification?
                        </h2>
                        <div className="space-y-4 text-primary-foreground/80 text-lg mb-8">
                            <p>
                                DGCA medical certifications are crucial steps in your aviation career journey. Understanding
                                the requirements, procedures, and validity periods helps you plan your pilot training
                                timeline effectively.
                            </p>
                            <p>
                                Whether you're starting with Class II medical for your Student Pilot License or advancing to
                                Class I medical for commercial operations, proper preparation ensures a smooth certification
                                process.
                            </p>
                            <p>
                                For detailed guidance on DGCA medical requirements and to find authorized medical examiners,
                                consult with our experienced counselors who have helped thousands of aspiring pilots
                                navigate the medical certification process successfully.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Start Your Pilot Journey
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Get Medical Guidance</Link>
                            </Button>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/20">
                            <p className="text-primary-foreground/70 text-sm mb-4">
                                For More Information on DGCA Medical Centers
                            </p>
                            <p className="text-primary-foreground/80">
                                Candidates should consult DGCA-approved medical examiners or authorized medical centers for
                                the most current requirements and detailed medical examination procedures.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}