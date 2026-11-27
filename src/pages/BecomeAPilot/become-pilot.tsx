import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CitableAnswer } from "@/components/CitableAnswer";
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
            "Check current DGCA licensing requirements and compare separate ground-class and FTO flying-training arrangements.",
        cost: "Request written quotes",
        href: "/contact",
    },
    {
        icon: Users,
        title: "Cadet Pilot Programs",
        description:
            "Check current programme eligibility, fees, selection stages and any employment-related terms directly with the airline.",
        cost: "Check with airline",
        href: "/contact",
    },
    {
        icon: Shield,
        title: "Indian Air Force Route",
        description:
            "Entry routes, eligibility, selection and training terms are governed by current official recruitment notices.",
        cost: "Check official notices",
        href: "/contact",
    },
];

const eligibilityChecklist = [
    {
        category: "Education",
        items: [
            "Check current DGCA education and subject requirements for the licence sought",
            "Verify accepted boards and equivalency routes using current official guidance",
            "Confirm how your own academic documents are assessed before enrolling",
        ],
    },
    {
        category: "Age Requirements",
        items: [
            "Check the current minimum age for each licence and training stage with DGCA",
            "Confirm examination eligibility separately from course enrolment",
        ],
    },
    {
        category: "Medical Fitness",
        items: [
            "Confirm the current medical class, sequence and assessment process with DGCA",
            "Use the current DGCA guidance to identify an authorised medical examiner",
        ],
    },
    {
        category: "Language Proficiency",
        items: [
            "Check current language-proficiency requirements for the licence and operation",
            "Verify the applicable assessment and documentation requirements with DGCA",
        ],
    },
];

const trainingRoadmap = [
    {
        step: 1,
        title: "Check current DGCA registration steps",
        description:
            "Follow current DGCA and Pariksha instructions for registration and examination applications.",
        duration: "Check current instructions",
    },
    {
        step: 2,
        title: "Ground School Training",
        description:
            "Confirm the current theory subjects with DGCA and the course syllabus with the ground-school provider.",
        duration: "Varies by provider",
    },
    {
        step: 3,
        title: "Clear DGCA Exams",
        description:
            "Check current examination formats, subjects and application requirements in official DGCA notices.",
        duration: "Varies by candidate",
    },
    {
        step: 4,
        title: "Check current radio-telephony requirements",
        description:
            "Verify the applicable radio-telephony qualification, examining authority and process against current official rules.",
        duration: "Check current rules",
    },
    {
        step: 5,
        title: "Verify and select an FTO",
        description:
            "Check the current DGCA approval and scope of the Flying Training Organisation before arranging aircraft training.",
        duration: "Provider and candidate dependent",
    },
    {
        step: 6,
        title: "Confirm flight-experience requirements",
        description:
            "Use current DGCA rules and the selected FTO's approved syllabus to confirm applicable flight experience and components.",
        duration: "Varies",
    },
    {
        step: 7,
        title: "Obtain CPL License",
        description:
            "Confirm current skill-test, document and licence-application requirements with DGCA.",
        duration: "Check current process",
    },
    {
        step: 8,
        title: "Type Rating & Employment",
        description:
            "Any additional rating, employer selection or training depends on current rules and the hiring organisation.",
        duration: "Depends on route",
    },
];

const costBreakdown = [
    { phase: "Ground classes", cost: "Request a current written quote" },
    { phase: "Aircraft flying training", cost: "Request a separate FTO quote" },
    { phase: "Additional ratings or tests", cost: "Confirm whether applicable and separately priced" },
    { phase: "Other charges", cost: "Check examinations, medicals, travel and accommodation" },
];

const salaryProgression = [
    {
        role: "Junior First Officer",
        salary: "No estimate published",
        period: "Check current employer information",
        icon: Plane,
    },
    {
        role: "Senior First Officer",
        salary: "No estimate published",
        period: "Check current employer information",
        icon: Briefcase,
    },
    {
        role: "Airline Captain",
        salary: "No estimate published",
        period: "Check current employer information",
        icon: Award,
    },
    {
        role: "Flight Instructor",
        salary: "No estimate published",
        period: "Check current employer information",
        icon: GraduationCap,
    },
];

const topFlyingSchools = [
    {
        name: "Current DGCA approval",
        description: "Check the regulator's current listing and the exact scope approved for the organisation.",
        highlights: ["Verify current status", "Check approved scope", "Confirm directly with DGCA"],
    },
    {
        name: "Training delivery",
        description: "Ask the FTO about its current syllabus, aircraft and instructor availability.",
        highlights: ["Request current syllabus", "Confirm aircraft availability", "Ask about scheduling"],
    },
    {
        name: "Written terms and costs",
        description: "Compare itemised quotes and confirm what is included, excluded or charged separately.",
        highlights: ["Compare written quotes", "Check refund terms", "Confirm extra charges"],
    },
];

const dgcaExamSubjects = [
    { name: "Current subject list", description: "Check the applicable DGCA examination requirements and paper structure before planning." },
    { name: "Examination format", description: "Verify current written, oral or other assessment requirements in official notices." },
    { name: "Course syllabus", description: "Confirm with the provider which subjects and teaching materials are currently included." },
];

const flightHoursBreakdown = [
    { type: "Flight-experience minimums", hours: "Check current DGCA rules", description: "Verify applicable total and component requirements in the current regulations." },
    { type: "Training components", hours: "Check approved syllabus", description: "Confirm the selected FTO's current approved training scope." },
    { type: "Progress and scheduling", hours: "Varies", description: "Aircraft availability, weather, scheduling and candidate progress affect timing." },
];

const proTips = [
    {
        title: "Early Medical Assessment",
        description: "Check the current DGCA medical requirements and assessment process before committing to training.",
        icon: Shield,
    },
    {
        title: "Review Written Fees",
        description: "Compare itemised quotes and confirm inclusions, exclusions, payment terms and refunds.",
        icon: Award,
    },
    {
        title: "Use Flight Simulators",
        description: "Ask the selected FTO whether any simulator activity is included in its current approved training scope.",
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
            "Education, age, medical and language requirements depend on the licence sought and current DGCA rules. Check the current official requirements and accepted equivalencies directly with DGCA before enrolling.",
    },
    {
        question: "How long does it take to become a commercial pilot?",
        answer:
            "There is no single timeline for every candidate. Examination schedules, medical and document processing, FTO scheduling, aircraft availability and candidate progress can affect completion time.",
    },
    {
        question: "What is the total cost of pilot training in India?",
        answer:
            "Costs depend on the provider, training scope and applicable additional charges. Request separate written, itemised quotes for ground classes and FTO flying training; confirm what is included and excluded.",
    },
    {
        question: "What is the salary of a pilot in India?",
        answer:
            "This page does not publish salary estimates. Compensation varies by employer, role, experience, aircraft and employment terms; consult current employer information and written offers.",
    },
    {
        question: "What are the different paths to becoming a pilot?",
        answer:
            "Possible routes include civil flight training, airline cadet programmes and military service. Eligibility, selection, costs and any employment terms differ; check current official notices and programme terms directly with each organisation.",
    },
    {
        question: "What is the difference between SPL, PPL, and CPL?",
        answer:
            "SPL, PPL and CPL are distinct licence categories. Check current DGCA rules for their privileges, eligibility, age limits and progression requirements; this page does not state unverified thresholds.",
    },
];

export default function BecomePilotPage() {
    return (
        <Layout>

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
                            Learn how to become a commercial pilot in India. Read about the eligibility criteria, DGCA requirements, training process, and cost involved in becoming a commercial pilot in India. If you are interested in civil aviation, cadet programs, or the Air Force, your dream to become a pilot begins here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Start Your Journey
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/courses/cpl">View CPL Course</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <CitableAnswer
                heading="How do you become a commercial pilot in India after 12th?"
                answer="The requirements and steps for a commercial pilot pathway in India depend on current DGCA rules and the licence sought. Before committing to training, verify age, education, medical, language, examination, radio-telephony and flight-experience requirements in current official material. Flying Star Aviator provides ground classes; aircraft flight training is separate and should be arranged with an FTO whose current DGCA approval and scope you have checked. Fees and completion time vary by provider and candidate, and training does not guarantee employment."
                faqs={[
                    { q: "What is the minimum age to become a commercial pilot in India?", a: "Check current DGCA age requirements for the licence and training stage sought." },
                    { q: "How much does pilot training cost in India?", a: "Costs vary by provider and scope. Request separate itemised written quotes for ground classes, aircraft flying training and any additional charges." },
                ]}
                sources={[
                    { label: "DGCA Pariksha — current flight-crew examination portal", url: "https://pariksha.dgca.gov.in/" },
                ]}
                lastUpdated="2026-11-02"
            />

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
                    <div className="max-w-3xl mx-auto mt-10 text-muted-foreground leading-relaxed">
                        <h3 className="text-xl font-bold text-foreground mb-3">Pilot career options after training</h3>
                        <p>
                            Pilot career opportunities after a CPL depend on licence privileges, ratings, experience,
                            medical status and employer criteria. Read our guide to{" "}
                            <Link to="/blog/jobs-after-cpl-india" className="underline hover:text-primary">
                                pilot jobs and career paths after CPL in India
                            </Link>
                            . Candidates researching an international pilot career should also review the current
                            licensing and conversion requirements for the country where they plan to train or work.
                            See our guide to{" "}
                            <Link to="/pilot-training/guide-to-conversion" className="underline hover:text-primary">
                                foreign pilot licence conversion to DGCA
                            </Link>
                            .
                        </p>
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
                            Use official DGCA guidance to check the requirements that apply to your intended licence and training stage. The items below are prompts to verify, not a complete eligibility determination.
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
                            <strong className="text-primary">Before committing:</strong> Confirm the current DGCA medical assessment process and authorised examiner using official guidance.
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
                            Pilot Training Planning Steps
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Requirements and sequencing depend on current DGCA rules and the candidate's circumstances. Verify each step with the relevant regulator, examination authority and training provider.
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
                            This page does not reproduce an independently verified current subject list or examination format. Check DGCA's published requirements and confirm the course syllabus with the provider.
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
                            Flight Experience and Training Scope
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Flight-experience minimums and any component requirements must be checked against current DGCA rules and the selected FTO's approved syllabus.
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
                            Pilot Training Cost Planning
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            No current complete cost estimate is verified here. Request separate written quotes and check the scope, exclusions, payment and refund terms for each provider.
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
                                            className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}
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
                            Do not assume that a cadet, military or scholarship route is sponsored or funded. Check current programme and official recruitment terms directly.
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
                            Pilot Salaries and Employment
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            This page does not publish salary estimates. Compensation and progression depend on the employer, role, experience, aircraft and current employment terms.
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
                        Check current employer information and written employment terms for compensation details.
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
                            How to Evaluate a Flying Training Organisation
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Do not rely on an unverified list or ranking. Check each organisation's current DGCA approval and scope, and confirm its facilities, schedule and written terms directly.
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
                            Before committing, verify current requirements, course scope, fees and training arrangements with official sources and providers.
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
                            Possible routes include civil flight training, airline cadet programmes and military service. Eligibility, selection and terms differ; check current official notices and programme details directly with each organisation.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Check current DGCA eligibility and licensing requirements before planning training. Flying Star Aviator provides ground classes; aircraft flight training is separate. Course and FTO fees, timelines and employment terms vary, so obtain current written information from the relevant providers and employers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Apply for Training
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/courses/cpl">View CPL Course Details</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <a href="tel:+919953536199">Talk to Expert</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
