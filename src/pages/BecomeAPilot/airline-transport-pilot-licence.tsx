import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Plane, GraduationCap, BookOpen, Award, Globe, FileCheck,
    Target, Compass, Cloud, Shield, Radio, ArrowRight,
    CheckCircle, Users, Clock, Trophy, Briefcase, TrendingUp, Star,
} from "lucide-react";

const quickOverview = [
    { label: "Course Name", value: "Airline Transport Pilot License (ATPL)" },
    { label: "Course Type", value: "Advanced Professional Pilot Course" },
    { label: "Duration", value: "90 Days (5 Days/Week, 2 Hours/Day)" },
    { label: "Eligibility", value: "Commercial Pilot License (CPL) Required" },
    { label: "License Type", value: "DGCA ATPL" },
    { label: "Training Mode", value: "Ground Classes + Theory" },
    { label: "Career Outcome", value: "Airline Captain / Commander" },
];

const keyHighlights = [
    { label: "License Name", value: "Airline Transport Pilot License" },
    { label: "Authority", value: "DGCA (Directorate General of Civil Aviation)" },
    { label: "Recognition", value: "International - Global Operations" },
    { label: "Career Path", value: "Captain, Airline Commander" },
    { label: "Training Type", value: "Advanced Aviation Theory" },
];

const atplBenefits = [
    "Qualify to fly as Captain/Pilot-in-Command anywhere in the world",
    "Highest level of pilot certification recognized globally",
    "Command large commercial aircraft for major airlines",
    "Significantly enhanced career growth and earning potential",
    "100% pass rate in first attempt with our training program",
    "Lifetime access to study materials and resources",
];

const preEntryRequirements = [
    "Must have a Commercial Pilot License (CPL)",
    "Class I Medical (Indian) with fitness certificate",
    "Adequate competency in the English Language",
    "Minimum of 18 years on the date of joining",
];

const flyingExperienceRequirements = [
    "Minimum 1,500 hours of total flying experience",
    "At least 150 hours must be in the last year",
    "500 hours as pilot-in-command or supervised co-pilot",
    "200 hours cross-country flying (including 50 hours night)",
    "1000 hours of cross-country flight time",
    "100 hours of instrument time",
    "100 hours of night flying",
    "10 hours of flight time in the last six months",
    "Valid flight radiotelephony operator's license",
    "Valid instrument rating",
];

const groundSubjects = [
    { icon: Compass, name: "Air Navigation", description: "General navigation principles and radio navigation aids", details: "Covers navigation systems, GPS, VOR, RNAV, and advanced navigation techniques" },
    { icon: Cloud, name: "Aviation Meteorology", description: "Weather patterns, forecasting, and flight safety considerations", details: "Atmosphere, wind, thermodynamics, clouds, precipitation, air masses, and flight hazards" },
    { icon: Radio, name: "Radio Aids & Instruments", description: "Radio navigation systems and aircraft instrumentation", details: "Radio navigation, radar principles, INS/IRS, flight instruments, and monitoring equipment" },
    { icon: Target, name: "General Navigation", description: "Practical navigation, charts, and flight planning", details: "Magnetism, compasses, dead reckoning, mass & balance, aircraft performance" },
    { icon: FileCheck, name: "Flight Planning & Performance", description: "Route planning, fuel management, and aircraft performance calculations", details: "Flight plans, nav logs, ATC plans, ICAO procedures, practical flight planning" },
    { icon: Shield, name: "Air Regulations", description: "International and national aviation laws and compliance", details: "Aviation law, operational procedures, licensing requirements, safety regulations" },
];

const syllabusModules = [
    { module: "Aviation Meteorology", topics: ["Atmosphere and wind patterns", "Thermodynamics and cloud formation", "Precipitation and fog", "Air masses and frontal systems", "Pressure systems and climatology", "Flight hazards and weather information"] },
    { module: "Radio Aids and Instruments", topics: ["Radio navigation principles", "Basic radar systems", "Area navigation (RNAV)", "Inertial Navigation System (INS/IRS)", "Flight instruments and displays", "Warning and recording equipment"] },
    { module: "General Navigation", topics: ["Navigation fundamentals", "Magnetism and compass systems", "Charts and map reading", "Dead reckoning navigation", "In-flight navigation techniques", "Mass & balance calculations"] },
    { module: "Flight Planning", topics: ["Practical flight planning", "Flight plan preparation", "Nav log and flight log completion", "ICAO ATC flight plan", "Performance calculations", "Fuel and alternate planning"] },
];

const admissionSteps = [
    { step: 1, title: "Check Pre-Entry Requirements", description: "Ensure you have CPL, Class I Medical, and English proficiency" },
    { step: 2, title: "Verify Flying Experience", description: "Confirm 1,500 hours minimum with required cross-country and night hours" },
    { step: 3, title: "Enroll in ATPL Ground Classes", description: "Register for the 90-day intensive ground training program" },
    { step: 4, title: "Attend Ground Classes", description: "Complete theory classes in Aviation Meteorology, Radio Aids, and Navigation" },
    { step: 5, title: "Prepare for Viva", description: "Viva examination for Radio Aids and General Navigation" },
    { step: 6, title: "Take DGCA ATPL Exams", description: "Pass 6 written exams: Navigation, Meteorology, Radio Aids, Flight Planning, Performance, Regulations" },
    { step: 7, title: "Obtain ATPL License", description: "Receive your Airline Transport Pilot License and fly as Captain worldwide" },
];

const examPapers = [
    "Air Navigation",
    "Aviation Meteorology",
    "Radio Aids and Instruments",
    "General Navigation",
    "Flight Planning and Monitoring",
    "Aircraft Performance",
];

const careerRoles = [
    { role: "Airline Captain", level: "Commander", icon: Plane },
    { role: "International Pilot", level: "Global Operations", icon: Globe },
    { role: "Training Captain", level: "Instructor Pilot", icon: GraduationCap },
    { role: "Chief Pilot", level: "Management", icon: Trophy },
    { role: "Fleet Captain", level: "Senior Command", icon: Award },
];

const programFeatures = [
    { icon: Users, title: "Experienced Instructors", description: "15+ years of aviation industry experience" },
    { icon: BookOpen, title: "Comprehensive Study Material", description: "1000+ questions, updated notes, largest book collection" },
    { icon: Target, title: "Weekly Test Series", description: "Regular assessments for every subject" },
    { icon: Trophy, title: "100% Pass Rate", description: "Every batch clears exams on first attempt" },
    { icon: Globe, title: "International Recognition", description: "DGCA-approved, globally recognized training" },
    { icon: Clock, title: "Flexible Learning", description: "Online/offline classes with lifetime material access" },
];

const whyChooseUs = [
    "Largest community of aspiring pilots in India since 2009 (10,000+ students)",
    "More than 1,000 students successfully placed in airlines",
    "Largest team of experienced instructors from aviation industry",
    "Dedicated research team creating visual learning resources",
    "Interactive classroom activities with stress management programs",
    "World-class accommodation facilities within walking distance",
];

export default function ATPLCourseDetailsPage() {
    return (
        <Layout>
            <Helmet>
                <title>ATPL Course Details | Airline Transport Pilot License Training India</title>
                <meta name="description" content="Complete guide to ATPL course in India. DGCA-approved ground classes covering Air Navigation, Meteorology, Radio Aids, and Flight Planning. Become an airline captain." />
            </Helmet>

            {/* ── Hero ── */}
            <section className="relative py-16 md:py-24 aviation-gradient text-primary-foreground">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block text-xs md:text-sm font-semibold bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4">
                            DGCA-Approved Advanced Training
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            Airline Transport Pilot License (ATPL) Classes
                        </h1>

                        <p className="text-base md:text-xl text-primary-foreground/80 mb-4 md:mb-6">
                            Airline Transport Pilot License (ATPL) classes are necessary for pilots who wish to become captains in commercial flights. Our DGCA ground school provides in-depth knowledge in aviation theory to enable our students to clear DGCA ATPL exams with confidence and become commanders in the field.
                        </p>
                        <p className="text-sm md:text-lg text-primary-foreground/80 mb-6 md:mb-8">
                            With our structured notes and one-on-one attention, our ATPL classes enable you to become a captain anywhere in the world. The Airline Transport Pilot License is the highest license for a pilot.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Enroll Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Request Demo Class</Link>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-12 pt-8 md:pt-12 border-t border-white/20">
                            {[
                                { value: "4000+", label: "Pilots Trained" },
                                { value: "100%", label: "Pass Rate" },
                                { value: "20+", label: "Countries" },
                                { value: "4.9/5", label: "Student Rating" },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">{stat.value}</div>
                                    <div className="text-primary-foreground/70 text-xs md:text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Quick Course Overview ── */}
            <section className="py-12 md:py-20 bg-background">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Quick Course Overview</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                            Essential information about the ATPL Ground Classes program
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Scrollable table wrapper — prevents horizontal overflow on mobile */}
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[480px]">
                                    <thead className="bg-primary text-primary-foreground">
                                        <tr>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-sm md:text-base">Course Information</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-sm md:text-base">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quickOverview.map((row, index) => (
                                            <tr key={row.label} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                                <td className="px-4 md:px-6 py-3 md:py-4 font-semibold text-xs md:text-sm">{row.label}</td>
                                                <td className="px-4 md:px-6 py-3 md:py-4 text-muted-foreground text-xs md:text-sm">{row.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── What is ATPL ── */}
            <section className="py-12 md:py-20 bg-muted/30">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                            What is an Airline Transport Pilot License?
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
                            <p>
                                The Airline Transport Pilot License (ATPL) is the highest level of pilot certification, and it qualifies you for the position of pilot-in-command, also known as the captain, of a commercial airliner carrying passengers for airlines all over the world.
                            </p>
                            <p>
                                The ATPL denotes a high level of understanding of aviation knowledge, including sophisticated navigation aids, weather, aircraft performance, and airline operations regulations. After completing your ATPL ground school, you can pilot big commercial jets for any airline in the world.
                            </p>
                            <p>
                                This license is a must if you want to advance beyond the position of First Officer and have your doors opened for senior roles such as Training Captain, Check Pilot, and Chief Pilot, among other senior roles in the aviation field.
                            </p>
                        </div>

                        {/* Key Highlights Table */}
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
                            <div className="bg-primary text-primary-foreground px-4 md:px-6 py-3 md:py-4">
                                <h3 className="font-semibold text-base md:text-lg">Key Highlights</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[400px]">
                                    <tbody>
                                        {keyHighlights.map((row, index) => (
                                            <tr key={row.label} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                                <td className="px-4 md:px-6 py-3 md:py-4 font-semibold text-xs md:text-sm">{row.label}</td>
                                                <td className="px-4 md:px-6 py-3 md:py-4 text-muted-foreground text-xs md:text-sm">{row.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Why Choose ATPL ── */}
            <section className="py-12 md:py-20 bg-background">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                            Why Pursue an Airline Transport Pilot License?
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
                            The ATPL is not merely a license, but rather a gateway to the world's largest commercial flying machines and the top jobs at the airlines.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Benefits of ATPL Certification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                            {atplBenefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="flex items-start gap-3 p-4 md:p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                                >
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm md:text-base text-muted-foreground">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Program Features ── */}
            <section className="py-12 md:py-20 bg-muted/30">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-16"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Why Choose Our ATPL Program?</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-lg">
                            Golden Epaulettes Aviation provides comprehensive ATPL ground training with proven results
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {programFeatures.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="p-5 md:p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                                >
                                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                                        <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2 text-sm md:text-base">{feature.title}</h4>
                                    <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Pre-Entry Requirements ── */}
            <section className="py-12 md:py-20 bg-background">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">ATPL Eligibility Requirements</h2>
                        <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
                            To enroll in ATPL Ground Classes, candidates must meet specific prerequisites established by DGCA regulations.
                        </p>

                        <div className="mb-8 md:mb-12">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Pre-Entry Requirements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                {preEntryRequirements.map((req, index) => (
                                    <motion.div
                                        key={req}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.08 }}
                                        className="flex items-start gap-3 p-4 md:p-5 rounded-xl bg-card border border-border"
                                    >
                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-muted-foreground">{req}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                                Eligibility for DGCA ATPL Exams (Flying Experience)
                            </h3>
                            <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
                                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                                    To be eligible for DGCA ATPL examinations, you must have accumulated significant flying experience:
                                </p>
                                <ul className="space-y-2 md:space-y-3">
                                    {flyingExperienceRequirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Syllabus ── */}
            <section className="py-12 md:py-20 bg-muted/30">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">ATPL Ground Classes Syllabus</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-lg">
                            Comprehensive curriculum covering all aspects of advanced aviation theory
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto mb-10 md:mb-16">
                        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Main Subjects Covered</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {groundSubjects.map((subject, index) => (
                                <motion.div
                                    key={subject.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="p-5 md:p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                                >
                                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                                        <subject.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                    </div>
                                    <h4 className="font-bold mb-2 text-sm md:text-base">{subject.name}</h4>
                                    <p className="text-xs md:text-sm text-muted-foreground mb-2">{subject.description}</p>
                                    <p className="text-xs text-muted-foreground/70">{subject.details}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Modules */}
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Detailed Course Modules</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {syllabusModules.map((module, index) => (
                                <motion.div
                                    key={module.module}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="rounded-xl bg-card border border-border p-5 md:p-6"
                                >
                                    <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-primary">{module.module}</h4>
                                    <ul className="space-y-1.5 md:space-y-2">
                                        {module.topics.map((topic, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                                                <span className="text-primary mt-1 flex-shrink-0">•</span>
                                                <span>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Admission Process ── */}
            <section className="py-12 md:py-20 bg-background">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                            Process to Complete ATPL Ground Classes
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-lg">
                            Step-by-step guide to obtaining your Airline Transport Pilot License
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
                            {admissionSteps.map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    /* Extra top padding so the badge doesn't get clipped */
                                    className="relative pt-6 px-5 pb-5 md:p-6 md:pt-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                                >
                                    {/* Badge — inset so it's never cut off */}
                                    <div className="absolute top-0 left-4 -translate-y-1/2 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                                        {item.step}
                                    </div>
                                    <h4 className="font-bold mb-2 text-sm md:text-base">{item.title}</h4>
                                    <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DGCA Exam Papers ── */}
            <section className="py-12 md:py-20 bg-muted/30">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center">
                            DGCA ATPL Examination Papers
                        </h2>
                        <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 text-center">
                            The ATPL theoretical examination consists of 6 comprehensive papers covering all aspects of advanced aviation knowledge.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                            {examPapers.map((paper, index) => (
                                <motion.div
                                    key={paper}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="p-4 md:p-5 rounded-xl bg-card border border-border text-center hover:border-primary/50 hover:shadow-hover transition-all"
                                >
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 md:mb-3">
                                        <FileCheck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                    </div>
                                    <p className="font-semibold text-sm md:text-base">{paper}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl bg-primary/5 border border-primary/20 text-center"
                        >
                            <p className="text-sm md:text-base text-muted-foreground">
                                Our ATPL ground classes prepare you comprehensively for all six examination papers with structured notes, mock tests, and one-on-one guidance.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Career Opportunities ── */}
            <section className="py-12 md:py-20 bg-background">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Career Opportunities After ATPL</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-lg">
                            The ATPL opens doors to the highest levels of aviation career paths worldwide
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto mb-8 md:mb-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {careerRoles.map((career, index) => (
                                <motion.div
                                    key={career.role}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="p-5 md:p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
                                >
                                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <career.icon className="h-5 w-5 md:h-6 md:w-6" />
                                    </div>
                                    <h4 className="font-bold mb-1 text-sm md:text-base">{career.role}</h4>
                                    <p className="text-xs md:text-sm text-primary font-medium">{career.level}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="p-6 md:p-8 rounded-2xl bg-muted/50 border border-border">
                            <TrendingUp className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Exceptional Career Growth</h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                                ATPL holders command the highest salaries in aviation, with captains at major airlines earning premium compensation packages. The license enables progression to senior management roles including Chief Pilot, Fleet Captain, and Director of Flight Operations.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Why Choose Golden Epaulettes ── */}
            <section className="py-12 md:py-20 bg-muted/30">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                            Why Choose Golden Epaulettes Aviation?
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-lg">
                            India's most trusted and successful aviation training academy
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {whyChooseUs.map((reason, index) => (
                                <motion.div
                                    key={reason}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="flex items-start gap-3 p-4 md:p-6 rounded-xl bg-card border border-border"
                                >
                                    <Star className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-xs md:text-sm text-muted-foreground">{reason}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Learning Resources ── */}
            <section className="py-12 md:py-20 bg-background">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center">
                            Comprehensive Learning Resources
                        </h2>
                        <p className="text-sm md:text-lg text-muted-foreground mb-8 md:mb-12 text-center">
                            Everything you need to succeed in your ATPL examinations
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                            {[
                                { count: "1000+", label: "Interview Questions", sub: "Previous year exam papers" },
                                { count: "1000+", label: "Subjective Questions", sub: "Comprehensive practice materials" },
                                { count: "1000+", label: "Objective Questions", sub: "MCQ test preparation" },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-5 md:p-6 rounded-xl bg-card border border-border text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{item.count}</div>
                                    <div className="text-xs md:text-sm text-muted-foreground mb-1">{item.label}</div>
                                    <div className="text-xs text-muted-foreground/70">{item.sub}</div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-6 md:mt-8 p-5 md:p-8 rounded-2xl bg-primary/5 border border-primary/20"
                        >
                            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">Additional Study Resources</h3>
                            <ul className="space-y-2 md:space-y-3">
                                {[
                                    "Updated study material & notes with latest aviation information",
                                    "Largest collection of aviation reference books",
                                    "Weekly test series for every subject",
                                    "GE Learning Management System with lifetime access",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="py-16 md:py-20 aviation-gradient text-primary-foreground">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                            Begin Your Journey to Airline Captain
                        </h2>
                        <div className="space-y-3 md:space-y-4 text-primary-foreground/80 text-sm md:text-lg mb-6 md:mb-8">
                            <p>
                                The Airline Transport Pilot License is the highest level of aviation achievement. With our comprehensive ground classes, expert instructors, and successful training systems, Golden Epaulettes Aviation equips you to fly commercial aircraft anywhere in the world.
                            </p>
                            <p>
                                Our DGCA-ATPL program boasts a perfect record of a 100% pass rate on the very first attempt. Thousands of successful pilots have earned their ATPL with Golden Epaulettes Aviation and are flying for major airlines around the world.
                            </p>
                        </div>

                        {/* Stacked on mobile, row on sm+ */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Enroll in ATPL Program
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/atpl/brochure">Download Brochure</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Book Counselling</Link>
                            </Button>
                        </div>

                        <div className="mt-10 md:mt-12 pt-8 md:pt-12 border-t border-white/20">
                            <p className="text-primary-foreground/70 text-xs md:text-sm mb-3 md:mb-4">Contact Us</p>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center text-sm">
                                <a href="tel:+917428897782" className="hover:text-white transition-colors">
                                    📞 +91-7428897782
                                </a>
                                <a href="https://wa.me/917428897780" className="hover:text-white transition-colors">
                                    💬 WhatsApp: +91-7428897780
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}