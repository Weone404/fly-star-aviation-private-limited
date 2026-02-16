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
    ChevronRight,
    CheckCircle,
    Award,
    Clock,
    MapPin,
    FileText,
    Users,
    Shield,
    Target,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const careerPaths = [
    {
        icon: Plane,
        title: "Civil Aviation Route",
        description:
            "Self-sponsored training at DGCA-  Flying Training Organisation. Complete pathway from SPL to CPL.",
        cost: "₹35 - 65 Lakhs",
        href: "/become-pilot/civil-aviation",
    },
    {
        icon: Users,
        title: "Cadet Pilot Programs",
        description:
            "Structured programs by airlines like IndiGo and Air India with training and employment letter of intent.",
        cost: "Sponsored Training",
        href: "/become-pilot/cadet-programs",
    },
    {
        icon: Shield,
        title: "Indian Air Force Route",
        description:
            "Join through NDA (after 12th) or AFCAT (after graduation). Government-funded training and prestigious career.",
        cost: "Fully Funded",
        href: "/become-pilot/air-force",
    },
];

const eligibilityChecklist = [
    {
        category: "Education",
        items: [
            "Minimum 10+2 with Physics and Mathematics",
            "Minimum 50% aggregate marks (recommended)",
            "Arts/Commerce students can qualify through NIOS",
        ],
    },
    {
        category: "Age Requirements",
        items: [
            "Student Pilot License (SPL): 16+ years",
            "Private Pilot License (PPL): 17+ years",
            "Commercial Pilot License (CPL): 18+ years",
        ],
    },
    {
        category: "Medical Fitness",
        items: [
            "Class 2 Medical: Initial screening requirement",
            "Class 1 Medical: Mandatory for holding CPL",
            "Must be conducted by DGCA-  medical examiner",
        ],
    },
    {
        category: "Language Proficiency",
        items: [
            "Proficiency in English (spoken and written)",
            "ICAO Level 4 or higher required",
            "Essential for aviation communication",
        ],
    },
];

const trainingRoadmap = [
    {
        step: 1,
        title: "Register with DGCA",
        description:
            "Apply for a unique Computer Number via the eGCA portal. This is required for all exams and is your trainee identification throughout the process.",
        duration: "1-2 weeks",
    },
    {
        step: 2,
        title: "Ground School Training",
        description:
            "Study theoretical subjects including Air Navigation, Aviation Meteorology, Air Regulations, Technical General, and Technical Specific.",
        duration: "3-6 months",
    },
    {
        step: 3,
        title: "Clear DGCA Exams",
        description:
            "Pass written and oral examinations for all theoretical subjects. These exams test your understanding of aviation fundamentals.",
        duration: "2-4 months",
    },
    {
        step: 4,
        title: "Radio Telephony (RTR) Exam",
        description:
            "Clear the RTR exam conducted by the Wireless Planning and Coordination (WPC) wing for aviation communication.",
        duration: "1 month",
    },
    {
        step: 5,
        title: "Join DGCA-  FTO",
        description:
            "Enroll in a Flying Training Organisation for practical flight training. Complete Student Pilot License requirements.",
        duration: "Ongoing",
    },
    {
        step: 6,
        title: "Accumulate Flight Hours",
        description:
            "Complete minimum 200 flying hours including solo flights, cross-country navigation, instrument flying, and night flying.",
        duration: "12-18 months",
    },
    {
        step: 7,
        title: "Obtain CPL License",
        description:
            "Submit flying logs and exam results to DGCA via eGCA portal. Receive your Commercial Pilot License upon approval.",
        duration: "1-2 months",
    },
    {
        step: 8,
        title: "Type Rating & Employment",
        description:
            "Get type rating for specific aircraft (A320/B737). Apply for First Officer positions or join airline cadet programs.",
        duration: "2-3 months",
    },
];

const costBreakdown = [
    { phase: "Ground School & Exams", cost: "₹2 - ₹5 Lakhs" },
    { phase: "Flying Training (CPL)", cost: "₹40 - ₹65 Lakhs" },
    { phase: "Type Rating", cost: "₹15 - ₹25 Lakhs" },
    { phase: "Total Investment", cost: "₹57 - ₹95 Lakhs", highlight: true },
];

const salaryProgression = [
    {
        role: "Junior First Officer",
        salary: "₹1.5 - ₹3.5 Lakhs",
        period: "Per Month",
        icon: Plane,
    },
    {
        role: "Senior First Officer",
        salary: "₹4 - ₹6 Lakhs",
        period: "Per Month",
        icon: Briefcase,
    },
    {
        role: "Airline Captain",
        salary: "₹6 - ₹10+ Lakhs",
        period: "Per Month",
        icon: Award,
    },
    {
        role: "Flight Instructor",
        salary: "₹50,000 - ₹2 Lakhs",
        period: "Per Month",
        icon: GraduationCap,
    },
];

const topFlyingSchools = [
    {
        name: "IGRUA (Amethi)",
        description: 'Often called the "IIT of Aviation" - state-run and highly prestigious with excellent training standards.',
        highlights: ["Government-operated", "Premier institute", "Excellent reputation"],
    },
    {
        name: "CAE Gondia (NFTI)",
        description: "Premier private academy with international training standards and modern facilities for comprehensive pilot training.",
        highlights: ["International standards", "Modern fleet", "Global recognition"],
    },
    {
        name: "Vision Flying Training Institute",
        description: "Modern fleet with 365-day flying weather in Amreli, offering consistent training throughout the year.",
        highlights: ["Year-round flying", "Modern aircraft", "Consistent training"],
    },
];

const dgcaExamSubjects = [
    { name: "Air Navigation", description: "Route planning, navigation systems, and flight instruments" },
    { name: "Aviation Meteorology", description: "Weather patterns, forecasting, and aviation climate" },
    { name: "Air Regulations", description: "DGCA rules, international aviation laws, and regulations" },
    { name: "Technical General", description: "Aircraft systems, engines, and general aviation technology" },
    { name: "Technical Specific", description: "Specific aircraft systems and operational procedures" },
];

const flightHoursBreakdown = [
    { type: "Solo Flying", hours: "50+ hours", description: "Independent flight practice" },
    { type: "Cross-Country", hours: "30+ hours", description: "Long-distance navigation flights" },
    { type: "Instrument Flying", hours: "25+ hours", description: "Flying using instruments only" },
    { type: "Night Flying", hours: "5+ hours", description: "Night-time flight operations" },
    { type: "Dual Instruction", hours: "90+ hours", description: "Training with instructor" },
];

const proTips = [
    {
        title: "Early Medical Assessment",
        description: "Get your Class 2 medical done before paying any fees to ensure you are medically fit for aviation.",
        icon: Shield,
    },
    {
        title: "Explore Scholarships",
        description: "Organizations like AME CET offer scholarships for aviation courses. Research and apply early.",
        icon: Award,
    },
    {
        title: "Use Flight Simulators",
        description: "Practice with basic flight simulator apps to build spatial awareness and understanding before actual training.",
        icon: Target,
    },
    {
        title: "Network with Pilots",
        description: "Connect with working pilots to gain insights about the career, training, and industry expectations.",
        icon: Users,
    },
];

const faqs = [
    {
        question: "What are the basic requirements to become a pilot in India?",
        answer:
            "To become a pilot in India, you need 10+2 with Physics and Mathematics (minimum 50% recommended), age 18+ for CPL, medical fitness (Class 1 medical), and English language proficiency (ICAO Level 4 or higher). Students from Arts or Commerce can clear required subjects through NIOS.",
    },
    {
        question: "How long does it take to become a commercial pilot?",
        answer:
            "The complete process from zero experience to obtaining your Commercial Pilot License typically takes 18 to 36 months. This includes ground school training (3-6 months), DGCA exams, and flight training to complete 200 flying hours (12-18 months).",
    },
    {
        question: "What is the total cost of pilot training in India?",
        answer:
            "The total cost ranges from ₹35 to ₹65 lakhs for CPL training at an FTO, plus ₹15-25 lakhs for type rating. This includes ground school (₹2-5 lakhs), flying training (₹40-65 lakhs), and type rating. Cadet programs and Air Force routes offer sponsored or fully-funded alternatives.",
    },
    {
        question: "What is the salary of a pilot in India?",
        answer:
            "Junior First Officers earn ₹1.5-3.5 lakhs per month, Senior First Officers earn ₹4-6 lakhs per month, and Airline Captains earn ₹6-10+ lakhs per month. Flight Instructors typically earn ₹50,000-2 lakhs per month. Salaries vary based on airline, experience, and aircraft type.",
    },
    {
        question: "What are the different paths to becoming a pilot?",
        answer:
            "There are three main paths: (1) Civil Aviation - Self-sponsored training at DGCA-  FTO (₹35-65 lakhs), (2) Cadet Pilot Programs - Airline-sponsored training with employment letter of intent, (3) Indian Air Force - Join through NDA or AFCAT with fully government-funded training.",
    },
    {
        question: "What is the difference between SPL, PPL, and CPL?",
        answer:
            "Student Pilot License (SPL) is the initial license obtained at 16+ years for training purposes. Private Pilot License (PPL) is obtained at 17+ years for recreational flying without payment. Commercial Pilot License (CPL) is obtained at 18+ years and allows you to fly aircraft for commercial operations and earn as a professional pilot.",
    },
];

export default function BecomePilotPage() {
    return (
        <Layout>
            <Helmet>
                <title>How to Become a Pilot in India 2026 | Complete Guide, Eligibility & Career Path</title>
                <meta name="description" content="Complete guide to becoming a pilot in India. Learn about eligibility, DGCA requirements, training costs (₹35-65L), flying schools, salary (₹1.5L-10L+/month) & career paths." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-24 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                            Your Journey to the Cockpit Starts Here
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            How to Become a Pilot in India - Complete 2026 Guide
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Discover the structured roadmap to becoming a commercial pilot in India. Learn about eligibility criteria,
                            DGCA requirements, training process, costs, and career opportunities. Whether you choose civil aviation,
                            cadet programs, or the Air Force route, your dream of flying starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Start Your Journey
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/cpl">View CPL Course</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Career Paths Overview */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Three Pathways to Becoming a Pilot
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Choose the path that best suits your circumstances, financial situation, and career goals. Each route
                            has distinct advantages and requirements.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {careerPaths.map((path, index) => (
                            <motion.div
                                key={path.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={path.href} className="block group h-full">
                                    <div className="h-full p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <path.icon className="h-7 w-7" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{path.title}</h3>
                                        <p className="text-muted-foreground mb-4 text-sm">{path.description}</p>
                                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                                            <span className="text-primary font-bold">{path.cost}</span>
                                            <div className="flex items-center text-primary text-sm font-semibold">
                                                Learn More <ChevronRight className="h-4 w-4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Eligibility Checklist */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Mandatory Eligibility Requirements
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Use this comprehensive checklist to assess your eligibility before investing in pilot training.
                            All criteria must be met to pursue a career as a commercial pilot.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {eligibilityChecklist.map((section, index) => (
                            <motion.div
                                key={section.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-border bg-card"
                            >
                                <h3 className="text-xl font-bold mb-6">{section.category}</h3>
                                <ul className="space-y-4">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20 max-w-3xl mx-auto"
                    >
                        <p className="text-center text-muted-foreground">
                            <strong className="text-primary">Pro Tip:</strong> Get your Class 2 medical examination done early
                            to confirm medical fitness before making any financial commitments to training.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Step-by-Step Roadmap */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            The Complete 8-Step Training Roadmap
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            From zero experience to professional cockpit - this comprehensive roadmap takes 18 to 36 months.
                            Follow each stage systematically to achieve your Commercial Pilot License.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {trainingRoadmap.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="relative p-6 rounded-xl bg-card border border-border"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                                    {step.step}
                                </div>
                                <div className="flex items-center gap-2 mb-3 pt-2">
                                    <h3 className="font-bold text-lg">{step.title}</h3>
                                    <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {step.duration}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DGCA Exam Subjects */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            DGCA Theory Examination Subjects
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Master these five core subjects through ground school training. You must pass both written and oral
                            examinations for each subject to proceed to flight training.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {dgcaExamSubjects.map((subject, index) => (
                            <motion.div
                                key={subject.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{subject.name}</h3>
                                <p className="text-sm text-muted-foreground">{subject.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flight Hours Breakdown */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            200 Flying Hours Breakdown
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Complete a minimum of 200 flying hours across different categories. Each type of flying develops
                            specific skills essential for commercial pilot operations.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {flightHoursBreakdown.map((item, index) => (
                            <motion.div
                                key={item.type}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                                    <Plane className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.type}</h3>
                                <p className="text-2xl font-bold text-primary mb-2">{item.hours}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cost Breakdown */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Complete Cost Breakdown (2025-2026)
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Understand the financial investment required for pilot training. Costs vary based on flying school,
                            aircraft type, and training location.
                        </p>
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
                                        <th className="px-6 py-4 text-left font-semibold">Training Phase</th>
                                        <th className="px-6 py-4 text-right font-semibold">Estimated Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {costBreakdown.map((item, index) => (
                                        <tr
                                            key={item.phase}
                                            className={
                                                item.highlight
                                                    ? "bg-primary/10 font-bold"
                                                    : index % 2 === 0
                                                        ? "bg-card"
                                                        : "bg-muted/30"
                                            }
                                        >
                                            <td className="px-6 py-4">{item.phase}</td>
                                            <td className="px-6 py-4 text-right font-semibold text-primary">
                                                {item.cost}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-muted-foreground text-center mt-6">
                            Note: Cadet programs offer sponsored training, while Air Force route is fully funded by the government.
                            Scholarships available through organizations like AME CET.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Salary Progression */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Pilot Salary in India (2025-2026)
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Aviation offers excellent earning potential with rapid career progression. Salaries vary based on
                            airline, experience, aircraft type, and rank.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {salaryProgression.map((item, index) => (
                            <motion.div
                                key={item.role}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all text-center"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                                    <item.icon className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-3">{item.role}</h3>
                                <p className="text-2xl font-bold text-primary mb-1">{item.salary}</p>
                                <p className="text-sm text-muted-foreground">{item.period}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-muted-foreground mt-8"
                    >
                        Airline Captains at major carriers can earn ₹10+ lakhs per month with additional benefits and allowances.
                    </motion.p>
                </div>
            </section>

            {/* Top Flying Schools */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Top Flying Schools in India
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose from India's premier DGCA-  Flying Training Organisations. Each offers unique advantages
                            in terms of location, fleet, weather, and training standards.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {topFlyingSchools.map((school, index) => (
                            <motion.div
                                key={school.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{school.name}</h3>
                                <p className="text-muted-foreground mb-6 text-sm">{school.description}</p>
                                <div className="space-y-2">
                                    {school.highlights.map((highlight, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                            <span className="text-sm text-muted-foreground">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pro Tips */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Expert Tips for Aspiring Pilots
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Valuable advice to help you prepare better, save costs, and maximize your chances of success in
                            your pilot training journey.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {proTips.map((tip, index) => (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <tip.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2">{tip.title}</h3>
                                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
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
                            Common questions about becoming a pilot in India, answered by aviation experts.
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
                            Ready to Begin Your Pilot Journey?
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-4">
                            Becoming a pilot in India is a structured journey that combines education, rigorous training, and
                            dedication. Whether you choose the civil aviation route with self-sponsored training, join airline
                            cadet programs, or pursue the prestigious Indian Air Force path, each offers unique opportunities.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            With the aviation industry experiencing high demand for pilots, this is the perfect time to start your
                            training. Complete your 10+2 with Physics and Mathematics, ensure medical fitness, and register with
                            DGCA to begin your 18-36 month journey to the cockpit. The investment ranges from ₹35-65 lakhs for
                            civil aviation, but with starting salaries of ₹1.5-3.5 lakhs per month and rapid career progression
                            to Captain positions earning ₹10+ lakhs monthly, aviation offers exceptional long-term returns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply for Training
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/cpl">View CPL Course Details</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <a href="tel:+919876543210">Talk to Expert</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}