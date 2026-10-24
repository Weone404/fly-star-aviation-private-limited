import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Plane,
    GraduationCap,
    BookOpen,
    Calendar,
    MapPin,
    Users,
    Award,
    DollarSign,
    Clock,
    FileCheck,
    Shield,
    TrendingUp,
    ArrowRight,
    ChevronRight,
    CheckCircle,
    Cloud,
    Sun,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const trainingHighlights = [
    {
        icon: Award,
        title: "Separate training stages",
        description: "Ground classes and theory exams are separate from aircraft flight training at an FTO.",
    },
    {
        icon: Plane,
        title: "Choose an FTO for flying",
        description: "Aircraft, instructors and operating schedules depend on the FTO selected for flight training.",
    },
    {
        icon: Sun,
        title: "Compare locations",
        description: "Weather, airport access and aircraft availability vary; confirm current conditions with each FTO.",
    },
    {
        icon: MapPin,
        title: "Ground classes in Delhi",
        description: "Flying Star's own centre is in Dwarka, New Delhi; it does not operate a flying school.",
    },
];

const eligibilityRequirements = [
    {
        icon: Calendar,
        title: "Age",
        description: "Check current DGCA age criteria for the licence and training stages you plan to undertake.",
    },
    {
        icon: BookOpen,
        title: "Education",
        description: "Verify current education and subject requirements with DGCA, including accepted equivalency routes.",
    },
    {
        icon: Shield,
        title: "Medical",
        description: "Review current DGCA medical certification requirements and confirm the required steps before committing to training.",
    },
    {
        icon: FileCheck,
        title: "Valid Passport",
        description: "For training outside India, confirm passport, visa and identification requirements with the destination authority and provider.",
    },
    {
        icon: FileCheck,
        title: "Police Clearance Certificate (PCC)",
        description: "Ask the selected FTO which background documents it currently requires and verify any validity period before applying.",
    },
];

const courseDetails = {
    duration: "Varies by provider",
    flyingHours: "Check current DGCA rules",
    courseFee: "Provider quote",
};

const courseCoverage = [
    "Ground classes and theory-exam preparation",
    "Aircraft flight training through a separately selected FTO",
    "Check the FTO's current DGCA approval before enrolling",
    "Confirm in writing which services and charges each quote includes",
];

const additionalCosts = [
    "Aircraft hourly rate and included instructor or briefing time",
    "Multi-engine, simulator, repeat-flight and test charges",
    "DGCA examination, medical, travel and accommodation charges",
    "Refund, delay and aircraft-availability terms",
];

const trainingStages = [
    {
        stage: "DGCA Theory Ground Class",
        duration: "Varies by provider",
        flyingHours: "N/A",
        highlights: [
            "Air Navigation",
            "Air Meteorology",
            "Air Regulations",
            "Technical General",
            "Technical Specific",
        ],
    },
    {
        stage: "DGCA theory examinations and radio telephony",
        duration: "Varies by candidate and examination schedule",
        flyingHours: "Not applicable",
        highlights: [
            "Check current DGCA and WPC requirements",
            "Plan examinations using the current official schedules",
        ],
    },
    {
        stage: "Practical flight training at an approved FTO",
        duration: "Set by the FTO and candidate progress",
        flyingHours: "Verify current DGCA requirements",
        highlights: [
            "Confirm the FTO's current DGCA approval and scope",
            "Review its syllabus, aircraft availability and written quote",
            "Check current skill-test and licence-application requirements",
        ],
    },
];

const stepByStepGuide = [
    {
        step: 1,
        title: "Medicals",
        description: "Check current DGCA medical requirements and complete the applicable medical assessment before committing to flight training.",
    },
    {
        step: 2,
        title: "DGCA Theory Class",
        description: "Attend DGCA-prescribed ground school covering Air Regulations, Navigation, Meteorology, Technical Subjects and Human Performance.",
    },
    {
        step: 3,
        title: "DGCA Theory Exam",
        description: "Sit the DGCA written papers and clear the required theory exams to progress to practical training stages.",
    },
    {
        step: 4,
        title: "RTR (Radio Telephony Restricted)",
        description: "Complete the RTR/RT licence course and exam to obtain mandatory aviation radio telephony endorsement.",
    },
    {
        step: 5,
        title: "Choose The Right Flight School",
        description: "Compare current DGCA approval and scope, aircraft and instructor availability, student support, and written costs.",
    },
    {
        step: 6,
        title: "SPL (Student Pilot Licence)",
        description: "Apply for and obtain your SPL after initial training and checks — this authorises you to commence supervised solo flying.",
    },
    {
        step: 7,
        title: "FRTOL (Flight Radio Telephony Operator's Licence)",
        description: "Obtain the FRTOL from WPC after passing the RTR exam. This licence authorises pilots to operate aircraft radio communication equipment during flight.",
    },
    {
        step: 8,
        title: "Flight Training",
        description: "Complete structured practical training from PPL through hour-building to CPL (including IR/ME as required), with regular checks and final DGCA skill tests.",
    },
];

const flyingSchools = [
    {
        name: "Verify current approval",
        context: "Before you enrol",
        questions: [
            "Check the current DGCA listing and the FTO's approved scope.",
            "Ask which aircraft and instructors are currently available.",
            "Compare its syllabus with current DGCA requirements.",
        ],
    },
    {
        name: "Compare training delivery",
        context: "With each FTO",
        questions: [
            "Ask about recent completion timelines and factors that can delay training.",
            "Check aircraft serviceability and instructor availability.",
            "Confirm aircraft type and training availability.",
        ],
    },
    {
        name: "Get a written quote",
        context: "Before paying",
        questions: [
            "Confirm what happens if weather, aircraft or instructor availability causes delays.",
            "Check whether instructor, simulator and multi-engine charges are included.",
            "List repeat-flight, test and refund terms.",
        ],
    },
];

const trainingLocations = [
    {
        name: "Weather and season",
        question: "How do seasonal weather conditions affect the flying schedule?",
    },
    {
        name: "Airport and airspace",
        question: "How do local airport and airspace operations affect training?",
    },
    {
        name: "Aircraft availability",
        question: "How are aircraft serviceability and instructor availability managed?",
    },
];

const aircraftFleet = [
    {
        name: "Single-engine training",
        description: "Ask the FTO which aircraft are currently available and how they are used in its approved training scope.",
    },
    {
        name: "Multi-engine training",
        description: "Confirm whether multi-engine training is offered, which aircraft are used, and what the quoted rate includes.",
    },
    {
        name: "Instrument training",
        description: "Ask how instrument training is delivered and whether simulator or aircraft time is included in the written quote.",
    },
];

const benefitsOfTraining = [
    "Ground classes and practical flight training are separate stages.",
    "Flying Star provides CPL ground classes from its Dwarka, New Delhi centre.",
    "Candidates complete practical flying through a separately selected FTO.",
    "Verify an FTO's current DGCA approval and scope before enrolment.",
    "Compare provider quotes and ask which services and charges are included.",
    "Check current DGCA licensing and conversion requirements before planning.",
];

const faqs = [
    {
        question: "What is the minimum age requirement for pilot training in India?",
        answer: "Age criteria can depend on the licence and training stage. Check the current DGCA requirements before enrolling.",
    },
    {
        question: "What educational qualifications do I need?",
        answer: "Check DGCA's current educational and subject requirements, including any accepted equivalency route, before enrolling.",
    },
    {
        question: "How long does it take to complete pilot training in India?",
        answer: "There is no single timeline for every candidate. Ground-class schedules, examination availability, FTO aircraft and instructor availability, and candidate progress affect completion time.",
    },
    {
        question: "What is the total cost of pilot training in India?",
        answer: "There is no single regulator-set total CPL training price. Ground schools and FTOs set separate prices; compare written quotes and check which services and charges each includes. See the CPL fees guide for a component-by-component checklist.",
    },
    {
        question: "How many flying hours are required for CPL?",
        answer: "Flight-experience requirements are set by current DGCA rules and may change. Check the latest official requirements and confirm how the selected FTO's syllabus addresses them.",
    },
    {
        question: "What medical certificate is required?",
        answer: "Medical certification requirements depend on the licence sought. Check current DGCA requirements and use an authorised medical examiner.",
    },
    {
        question: "Which locations in India are best for pilot training?",
        answer: "Compare an FTO's current approval, aircraft and instructor availability, operating conditions, and written quote. A location's weather alone does not guarantee a particular training timeline.",
    },
    {
        question: "Is the DGCA license recognized internationally?",
        answer: "Licence privileges and acceptance depend on the destination regulator's rules. Check the current conversion and validation requirements with the relevant authority before relying on a licence abroad.",
    },
];

export default function PilotTrainingIndiaPage() {
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
                            PILOT TRAINING INDIA
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Commercial Pilot Training in India
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            A DGCA CPL pathway includes ground classes and theory exams, followed by practical flight training at a separately selected, DGCA-approved Flying Training Organisation (FTO). Flying Star provides ground classes in Dwarka, New Delhi; it does not operate an FTO.
                        </p>
                        <p className="text-primary-foreground/80 mb-8">
                            Explore our{" "}
                            <Link to="/courses/cpl" className="underline underline-offset-4">
                                DGCA CPL ground classes
                            </Link>
                            , the{" "}
                            <Link to="/courses/cpl/fees" className="underline underline-offset-4">
                                CPL fees guide
                            </Link>
                            , and the{" "}
                            <Link to="/become-a-pilot/become-pilot" className="underline underline-offset-4">
                                pilot eligibility and licensing steps
                            </Link>
                            .
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
                                    Start Your Journey
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

            {/* Training Highlights */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why Choose India for Pilot Training?
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            India offers globally recognized DGCA licenses with a solid pathway to both domestic and
                            international aviation careers.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trainingHighlights.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Eligibility Requirements */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            CPL Eligibility: Verify Current DGCA Requirements
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Check if you meet the requirements to begin your pilot training journey in India.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {eligibilityRequirements.map((requirement, index) => (
                            <motion.div
                                key={requirement.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <requirement.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{requirement.title}</h3>
                                <p className="text-sm text-muted-foreground">{requirement.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Overview */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            CPL Ground Classes and Flight Training: Separate Stages
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            CPL-MEIR describes a licensing and training pathway. Flying Star provides ground classes; practical flight training is completed separately through an appropriately approved FTO.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card text-center"
                        >
                            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Course Duration</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.duration}</p>
                            <p className="text-sm text-muted-foreground">
                                Timelines depend on the candidate, provider and training availability
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-2xl border border-border bg-card text-center"
                        >
                            <Plane className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Flying Hours</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.flyingHours}</p>
                            <p className="text-sm text-muted-foreground">
                                Requirements can change; verify the current DGCA rules and the FTO's syllabus
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-2xl border border-border bg-card text-center"
                        >
                            <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Training Quote</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.courseFee}</p>
                            <p className="text-sm text-muted-foreground">
                                Ground-school and FTO flight-training prices are separate
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">Ground School and Flight Training</h3>
                            <ul className="space-y-3">
                                {courseCoverage.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
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
                            <h3 className="text-xl font-bold mb-6">Costs to Confirm with Each Provider</h3>
                            <ul className="space-y-3">
                                {additionalCosts.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-muted-foreground mt-8"
                    >
                        Flying Star Aviator provides CPL ground classes. Practical flight training is completed
                        separately through an appropriately approved FTO.
                    </motion.p>
                </div>
            </section>

            {/* Training Stages */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Flight Training Stages & Progression
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Structured training program from ground theory to multi-engine rating
                        </p>
                    </motion.div>

                    <div className="space-y-6 max-w-5xl mx-auto">
                        {trainingStages.map((stage, index) => (
                            <motion.div
                                key={stage.stage}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-border bg-card"
                            >
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl mb-2">{stage.stage}</h3>
                                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Duration: {stage.duration}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Plane className="h-4 w-4" />
                                                Flying Hours: {stage.flyingHours}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-3">Training Highlights:</h4>
                                            <ul className="grid md:grid-cols-2 gap-2">
                                                {stage.highlights.map((highlight, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Step by Step Guide */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            India Pilot Training - Step by Step Guide
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Follow these steps to begin your pilot training journey in India
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stepByStepGuide.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-xl bg-card border border-border"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    {step.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2 pt-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flying Schools */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How to Compare a Flying Training Organisation
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Check each organisation's current DGCA approval, training scope, aircraft availability and written quote before enrolling.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {flyingSchools.map((school, index) => (
                            <motion.div
                                key={school.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <GraduationCap className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">{school.name}</h3>
                                <p className="text-muted-foreground mb-6 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {school.context}
                                </p>
                                <ul className="mb-6 space-y-3 text-sm text-muted-foreground">
                                    {school.questions.map((question) => (
                                        <li key={question} className="flex gap-2">
                                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                            {question}
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link to="/contact">
                                        Know More
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Training Locations */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What to Check at Each FTO Location
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Compare local weather, airport access and aircraft and instructor availability directly with the FTO.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {trainingLocations.map((location, index) => (
                            <motion.div
                                key={location.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-border bg-card text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                                    <Sun className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">{location.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    <span className="font-semibold text-primary">Question to ask:</span>{" "}
                                    {location.question}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Aircraft Fleet */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Aircraft Questions to Ask an FTO
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Aircraft type, serviceability and training availability depend on the FTO.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aircraftFleet.map((aircraft, index) => (
                            <motion.div
                                key={aircraft.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <Plane className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-3">{aircraft.name}</h3>
                                <p className="text-sm text-muted-foreground">{aircraft.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Before Choosing a Pilot Training Provider
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {benefitsOfTraining.map((benefit, index) => (
                            <motion.div
                                key={benefit}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border"
                            >
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="font-medium">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* License & Recognition */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <Award className="h-16 w-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                License And Recognition
                            </h2>
                        </div>
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <p className="text-muted-foreground text-lg mb-4">
                                DGCA sets the licensing requirements and issues licences. Ground schools prepare candidates for theory examinations; an approved Flying Training Organisation (FTO) delivers practical aircraft training.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                Flying Star Aviator provides CPL and ATPL ground classes from its Dwarka, New Delhi centre. It does not operate an FTO or provide aircraft flight training.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                Before paying an FTO, verify its current approval and scope with DGCA, confirm what its written quote includes, and check the current licensing requirements with the regulator.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Common questions about pilot training in India
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
                            Start Your Pilot Journey Today
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Start by comparing ground-class options and current DGCA licensing requirements. Practical flight training is a separate stage completed through an FTO you select.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </Layout>
    );
}
