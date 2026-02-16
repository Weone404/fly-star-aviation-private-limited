import { motion } from "framer-motion";
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
    CheckCircle,
    Award,
    Globe,
    FileCheck,
    Target,
    Compass,
    Cloud,
    Shield,
    Wrench,
} from "lucide-react";

const quickOverview = [
    { label: "Course Name", value: "Commercial Pilot License (CPL)" },
    { label: "Course Type", value: "Professional Pilot Course" },
    { label: "Duration", value: "18–24 Months" },
    { label: "Eligibility", value: "10+2 With Physics & Mathematics" },
    { label: "License Type", value: "DGCA Approved CPL" },
    { label: "Training Mode", value: "Ground + Flying" },
    { label: "Career Outcome", value: "Airline Pilot / CPL Pilot" },
];

const keyHighlights = [
    { label: "License Name", value: "Commercial Pilot License" },
    { label: "Authority", value: "DGCA" },
    { label: "Recognition", value: "International" },
    { label: "Career Path", value: "Airline, Charter, Cargo" },
    { label: "Training Type", value: "Commercial Pilot Training" },
];

const cplBenefits = [
    "Opportunity to work with national and international airlines",
    "Attractive career growth and global exposure",
    "High earning potential after gaining experience",
    "Profession filled with adventure and responsibility",
];

const trainingComponents = [
    {
        icon: BookOpen,
        title: "Ground Theory Classes",
        description: "Comprehensive classroom sessions covering aviation concepts",
    },
    {
        icon: Plane,
        title: "Flying Practice",
        description: "Hands-on flight hours with experienced instructors",
    },
    {
        icon: Target,
        title: "Simulator Training",
        description: "Advanced flight simulation for skill development",
    },
    {
        icon: Shield,
        title: "Safety & Technical",
        description: "Critical safety protocols and technical knowledge",
    },
    {
        icon: FileCheck,
        title: "DGCA Exam Prep",
        description: "Complete preparation for DGCA theory examinations",
    },
];

const groundSubjects = [
    {
        icon: Compass,
        name: "Air Navigation",
        description: "Understanding flight paths, charts, and navigation systems",
    },
    {
        icon: Cloud,
        name: "Aviation Meteorology",
        description: "Weather patterns and their impact on flight operations",
    },
    {
        icon: Shield,
        name: "Air Regulations",
        description: "Aviation laws, safety rules, and regulatory compliance",
    },
    {
        icon: Wrench,
        name: "Technical General",
        description: "Aircraft systems, engines, and general mechanics",
    },
    {
        icon: Award,
        name: "Technical Specific",
        description: "Specific aircraft type knowledge and operations",
    },
];

const syllabusTable = [
    { ground: "Air Navigation", flying: "Takeoff & Landing" },
    { ground: "Meteorology", flying: "Cross-Country Flying" },
    { ground: "Air Regulations", flying: "Night Flying" },
    { ground: "Technical General", flying: "Instrument Flying" },
    { ground: "Technical Specific", flying: "Emergency Handling" },
];

const admissionSteps = [
    {
        step: 1,
        title: "Complete 10+2 with Physics and Mathematics",
        description: "Meet the basic educational requirement",
    },
    {
        step: 2,
        title: "Apply for Commercial Pilot Licence Course",
        description: "Submit your application to approved training academy",
    },
    {
        step: 3,
        title: "Clear Medical Examination",
        description: "Pass DGCA Class 1 & 2 medical fitness test",
    },
    {
        step: 4,
        title: "Enroll in the Training Program",
        description: "Complete enrollment and payment process",
    },
    {
        step: 5,
        title: "Start Ground Classes and Flying Training",
        description: "Begin your journey with theoretical and practical training",
    },
];

const feeComponents = [
    "Training fees",
    "Flying hours charges",
    "Exam and licensing fees",
    "Study materials",
];

const trainingPhases = [
    {
        icon: BookOpen,
        phase: "Ground Training Phase",
        description:
            "Students attend CPL ground classes to understand aviation subjects, regulations, and aircraft systems.",
    },
    {
        icon: Plane,
        phase: "Flying Training Phase",
        description: "During this phase, students complete required flight hours under instructor supervision.",
    },
    {
        icon: TrendingUp,
        phase: "Skill Development Phase",
        description: "Focus is given to navigation, communication, and handling real-time flight situations.",
    },
];

const careerOptions = [
    { role: "Airline First Officer", growth: "High", icon: Plane },
    { role: "Charter Pilot", growth: "Medium", icon: Plane },
    { role: "Cargo Pilot", growth: "High", icon: Briefcase },
    { role: "Flight Instructor", growth: "Entry Level", icon: GraduationCap },
    { role: "International Pilot", growth: "Premium", icon: Globe },
];

const basicRequirements = [
    "10+2 with Physics & Mathematics",
    "Minimum age requirement as per DGCA",
    "Medical fitness certificate",
    "Strong interest in aviation",
];

export default function CPLCourseDetailsPage() {
    return (
        <Layout>
            <Helmet>
                <title>Commercial Pilot License Course Details | CPL Training in India</title>
                <meta
                    name="description"
                    content="Complete guide to Commercial Pilot License course in India. Learn about CPL training, syllabus, fees, eligibility, admission process, and career opportunities."
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
                            Complete Course Information
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Commercial Pilot License Course Details
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-6">
                            Becoming a commercial pilot is one of the most exciting and respected career choices in the world.
                            With the rapid growth of aviation, the demand for skilled pilots is increasing every year.
                        </p>
                        <p className="text-lg text-primary-foreground/80 mb-8">
                            If you dream of flying professionally, enrolling in a commercial pilot license program is the first
                            step toward turning that dream into reality. This page gives you complete information about the
                            pilot course, training structure, eligibility, admission process, and important details like CPL
                            course fees, syllabus, and career scope in India.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Course Overview */}
            <section className="py-20 bg-background">
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
                        className="max-w-4xl mx-auto"
                    >
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
                            <table className="w-full">
                                <thead className="bg-primary text-primary-foreground">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Course Name</th>
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

            {/* What is CPL */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">What is a Commercial Pilot License?</h2>
                        <div className="space-y-4 text-lg text-muted-foreground mb-8">
                            <p>
                                A commercial pilot license (CPL) is a professional certification that allows you to fly
                                aircraft for commercial purposes. After completing your commercial pilot course, you can work
                                with airlines, charter companies, cargo operators, or aviation training institutes.
                            </p>
                            <p>
                                The CPL license is recognized globally and is essential for anyone who wants to build a
                                long-term career in aviation. With proper pilot training, candidates gain both theoretical
                                knowledge and practical flying experience.
                            </p>
                        </div>

                        {/* Key Highlights Table */}
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
                            <div className="bg-primary text-primary-foreground px-6 py-4">
                                <h3 className="font-semibold text-lg">Key Highlights</h3>
                            </div>
                            <table className="w-full">
                                <tbody>
                                    {keyHighlights.map((row, index) => (
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

            {/* Why Choose CPL */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose a Commercial Pilot Course?</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            The aviation industry is growing rapidly, creating more opportunities for trained pilots. A
                            well-structured commercial pilot course helps students build strong technical knowledge,
                            confidence, and real flying experience.
                        </p>

                        <h3 className="text-2xl font-bold mb-6">Benefits of Becoming a CPL Pilot</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {cplBenefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border"
                                >
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-lg text-muted-foreground">
                            A CPL pilot is not just a job role — it is a respected profession that combines skill, precision,
                            and passion.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Training Overview */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Commercial Pilot Training in India – Course Overview
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Commercial pilot training in India is designed according to DGCA guidelines and includes both
                            ground training and flying hours. Students are trained through classroom sessions, simulator
                            practice, and real aircraft flying.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto mb-12">
                        <h3 className="text-2xl font-bold mb-8 text-center">Key Components of Commercial Pilot Training</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trainingComponents.map((component, index) => (
                                <motion.div
                                    key={component.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <component.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2">{component.title}</h4>
                                    <p className="text-sm text-muted-foreground">{component.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-muted-foreground text-lg max-w-3xl mx-auto"
                    >
                        The commercial pilot license course in India ensures that students are fully prepared to handle
                        real-world flying conditions.
                    </motion.p>
                </div>
            </section>

            {/* Syllabus Section */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Commercial Pilot License Syllabus</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            The commercial pilot license syllabus is designed to provide deep knowledge of aviation concepts
                            and safe flying operations.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto mb-16">
                        <h3 className="text-2xl font-bold mb-8 text-center">Main Subjects Covered in CPL Course</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {groundSubjects.map((subject, index) => (
                                <motion.div
                                    key={subject.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <subject.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2">{subject.name}</h4>
                                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-center text-muted-foreground">
                            Along with flying, students also attend CPL ground classes to prepare for DGCA theory exams. These
                            subjects help build a strong foundation for a successful aviation career.
                        </p>
                    </div>

                    {/* Syllabus Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center">
                            Commercial Pilot License Syllabus Overview
                        </h3>
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
                            <table className="w-full">
                                <thead className="bg-primary text-primary-foreground">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Ground Training Subjects</th>
                                        <th className="px-6 py-4 text-left font-semibold">Flying Training Skills</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {syllabusTable.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                            <td className="px-6 py-4 text-sm">{row.ground}</td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">{row.flying}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Admission Process - Continued in next section */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Commercial Pilot License Admission Process
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            The Commercial Pilot License Admission Process is simple and structured. Students must meet basic
                            academic and medical requirements before starting training.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto mb-8">
                        <h3 className="text-2xl font-bold mb-8 text-center">Steps to Join a Pilot Course</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {admissionSteps.map((item, index) => (
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
                                    <h4 className="font-bold mb-2 pt-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-muted-foreground"
                    >
                        This process ensures that candidates are physically and mentally fit for professional pilot training.
                    </motion.p>
                </div>
            </section>

            {/* CPL Course Fees */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                            CPL Course Fees & Cost Details
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 text-center">
                            One of the most common questions students ask is about CPL course fees and overall expenses.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-2xl border border-border bg-card">
                                <h3 className="text-xl font-bold mb-6">Estimated CPL Licence Cost</h3>
                                <p className="text-muted-foreground mb-6">
                                    The total CPL licence cost depends on the training location, flying hours, and aircraft
                                    type. In India, the approximate cost range may include:
                                </p>
                                <ul className="space-y-3">
                                    {feeComponents.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-center">
                                <p className="text-muted-foreground mb-6">
                                    The overall commercial pilot fees may vary from academy to academy, but it is an investment
                                    in a high-value career.
                                </p>
                                <Button variant="gold" size="lg" asChild className="w-full">
                                    <Link to="/cpl/fees">
                                        Get Detailed Fee Breakdown
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Training Structure */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Commercial Pilot Training Structure</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            A professional commercial pilot training program includes both theoretical and practical learning.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto mb-12">
                        <h3 className="text-2xl font-bold mb-8 text-center">Training Phases</h3>
                        <div className="space-y-6">
                            {trainingPhases.map((phase, index) => (
                                <motion.div
                                    key={phase.phase}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border flex items-start gap-6"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <phase.icon className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">{phase.phase}</h4>
                                        <p className="text-muted-foreground">{phase.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-muted-foreground text-lg"
                    >
                        This structured CPL pilot training ensures students become confident and capable professionals.
                    </motion.p>
                </div>
            </section>

            {/* Career Opportunities */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Opportunities After CPL License</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            After obtaining a commercial pilot license, several career paths open up.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto mb-12">
                        <h3 className="text-2xl font-bold mb-8 text-center">Career Options</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {careerOptions.map((career, index) => (
                                <motion.div
                                    key={career.role}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <career.icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="font-bold mb-1">{career.role}</h4>
                                    <p className="text-sm text-primary font-medium">Growth: {career.growth}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center">Career Growth Overview</h3>
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
                            <table className="w-full">
                                <thead className="bg-primary text-primary-foreground">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Job Role</th>
                                        <th className="px-6 py-4 text-left font-semibold">Growth Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {careerOptions.map((career, index) => (
                                        <tr key={career.role} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                            <td className="px-6 py-4 text-sm font-medium">{career.role}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                                                    <TrendingUp className="h-4 w-4" />
                                                    {career.growth}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-center text-muted-foreground mt-6">
                            With experience, pilots can become captains and earn a strong commercial pilot license salary along
                            with international opportunities.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Right Institute */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Why Choose the Right Pilot Training Institute?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            Choosing the right academy for your pilot course is very important. A good training institute
                            provides quality education, experienced instructors, and proper flying exposure.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            A well-structured commercial pilot license course in India helps students gain confidence and
                            prepares them for DGCA exams and airline careers.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Who Can Apply */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Who Can Apply for a CPL Course?</h2>
                        <p className="text-lg text-muted-foreground mb-8 text-center">
                            Students who have a passion for aviation and meet the eligibility criteria can apply for a CPL
                            course.
                        </p>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-6 text-center">Basic Requirements</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {basicRequirements.map((req, index) => (
                                    <motion.div
                                        key={req}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border"
                                    >
                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                        <span className="text-muted-foreground">{req}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <p className="text-center text-muted-foreground text-lg">
                            With the right dedication and guidance, anyone can become a successful commercial pilot.
                        </p>
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
                            Start Your Journey as a Commercial Pilot
                        </h2>
                        <div className="space-y-4 text-primary-foreground/80 text-lg mb-8">
                            <p>
                                A commercial pilot licence course is the gateway to a high-growth and exciting career in
                                aviation. From structured pilot training and strong technical knowledge to global job
                                opportunities, this course prepares you for a lifetime profession.
                            </p>
                            <p>
                                Whether you are exploring the commercial pilot license course in India, learning about CPL
                                course fees, or understanding the training structure, taking the first step today can bring you
                                closer to your dream of flying.
                            </p>
                            <p>
                                If you are passionate about aviation and ready to commit to your goal, the commercial pilot
                                course can open the door to a successful and rewarding future in the skies.
                            </p>
                        </div>
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
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}