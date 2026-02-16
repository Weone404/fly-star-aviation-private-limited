import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
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
    Globe,
    Briefcase,
    Languages,
    School,
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
        title: "CASA-  Excellence",
        description: "World-renowned aviation industry with globally recognised licences",
    },
    {
        icon: School,
        title: "Diploma in Aviation",
        description: "Academic qualification combined with professional flight training",
    },
    {
        icon: Plane,
        title: "Advanced Infrastructure",
        description: "Modern aircraft and advanced simulators for comprehensive training",
    },
    {
        icon: Briefcase,
        title: "Student Work Rights",
        description: "Work part-time (20 hrs/week) while completing your training",
    },
];

const eligibilityRequirements = [
    {
        icon: Calendar,
        title: "Age",
        description: "Minimum 17 years to begin pilot training and 18 years for a Commercial Pilot License.",
    },
    {
        icon: BookOpen,
        title: "Education",
        description: "10+2 with (Physics & Math) or equivalent is required. Non-science students can qualify via NIOS.",
    },
    {
        icon: Languages,
        title: "English Proficiency",
        description: "IELTS 5.5 each, 6.0 overall",
    },
    {
        icon: Shield,
        title: "Medical",
        description: "CASA Class 1 and DGCA Class 1 medicals",
    },
    {
        icon: FileCheck,
        title: "Visa",
        description: "Australian Student work Visa allows students to study full-time and work part-time during training",
    },
];

const courseDetails = {
    duration: "13-14 MONTHS",
    flyingHours: "221 Hrs",
    courseFee: "AUD 119k - 125k",
};

const courseCoverage = [
    "CASA Licence Issuance",
    "CASA Ground School",
    "Diploma Exams",
    "Written exams",
];

const additionalCosts = [
    "Visit & travel",
    "Transportation",
    "Accommodation & Living Costs",
    "Extra Flying Hours (if required)",
    "Personal Insurance",
    "Medicals",
];

const courseFlow = [
    {
        stage: "1",
        title: "RPL",
        description: "Assesses any previous flying experience or credits before beginning structured training.",
    },
    {
        stage: "2",
        title: "PPL",
        description: "Introduces foundational flying skills like take-offs, landings, navigation, and solo flights under instructor guidance.",
    },
    {
        stage: "3",
        title: "CPL + Hour building",
        description: "Develops advanced flight techniques and solo navigation proficiency to meet commercial standards.",
    },
    {
        stage: "4",
        title: "MEIR",
        description: "Trains you to operate complex aircraft and fly safely in instrument meteorological conditions, completing your professional pilot qualification.",
    },
];

const trainingStages = [
    {
        stage: "RPL",
        fullName: "Recognition of Prior Learning",
        duration: "0.5 Months",
        flyingHours: "0 Hrs",
        highlights: [
            "Initial training",
            "Basic Handling",
            "Recognition Of Any Prior Experience",
        ],
    },
    {
        stage: "PPL",
        fullName: "Private Pilot License",
        duration: "3-4 Months",
        flyingHours: "0-55 hrs",
        highlights: [
            "Dual and Solo Flight",
            "Basic Navigation",
            "Solo Development",
        ],
    },
    {
        stage: "CPL",
        fullName: "Commercial Pilot Licence + Hour Building",
        duration: "6-7 Months",
        flyingHours: "55-180 hrs",
        highlights: [
            "Solo cross-country",
            "Advanced Manoeuvres",
            "Commercial Flight Preparation",
        ],
    },
    {
        stage: "MEIR",
        fullName: "Multi-Engine + Instrument Rating",
        duration: "3 Months",
        flyingHours: "180-221 hrs",
        highlights: [
            "40 Hrs Simulator + 21 Hrs Aircraft Training",
            "Instrument Approaches",
            "And Final CPL/IR Flight Tests",
        ],
    },
];

const stepByStepGuide = [
    {
        step: 1,
        title: "DGCA Medicals",
        description: "Complete your DGCA Class 2 & 1 Medicals and join reputed DGCA Ground Classes to clear theory exams.",
    },
    {
        step: 2,
        title: "DGCA Theory Class",
        description: "Complete your DGCA Class 2 & 1 Medicals and join reputed DGCA Ground Classes to clear theory exams.",
    },
    {
        step: 3,
        title: "Choose the Right Flight School",
        description: "Select a CASA-  Australian flight school like Airways Aviation, known for structured Diploma in Aviation programs, modern aircraft, and global career",
    },
    {
        step: 4,
        title: "CASA Medicals",
        description: "Obtain an Australian Civil Aviation Safety Authority (CASA) Class 1 Medical Certificate. This is mandatory before commencing any flight training in Australia.",
    },
    {
        step: 5,
        title: "Admission & Offer Letter (COE)",
        description: "Once accepted into the Diploma of Aviation (CPL-A) program, you'll receive an official offer letter required for visa application and enrolment.",
    },
    {
        step: 6,
        title: "Visa Application (Student Visa Subclass 500)",
        description: "Apply for the Subclass 500 Student Visa, allowing you to live and study in Australia throughout your pilot training period.",
    },
    {
        step: 7,
        title: "CASA Ground School (At FTO in Australia)",
        description: "Begin your theoretical training under CASA curriculum, covering subjects such as meteorology, navigation, flight rules, and human performance.",
    },
    {
        step: 8,
        title: "Flight Training (At FTO in Australia)",
        description: "Progress through structured flight stages — RPL → PPL → CPL → MEIR — completing 221 flight hours including solo, cross-country, night, and instrument flying.",
    },
    {
        step: 9,
        title: "Licence Conversion (At FTO in India)",
        description: "After completing training, return to India and convert your CASA licence into a DGCA licence by meeting the DGCA's conversion requirements and flight checks.",
    },
];

const flyingSchools = [
    {
        name: "Flying School 01",
        location: "Gold Coast, Brisbane, Lismore, Australia",
        duration: "13-14 Months",
        fleetSize: "35 Aircrafts",
        aircraft: "Diamond DA40, Diamond DA42, Cessna 172",
        flyingHours: "221 Hrs",
    },
];

const trainingLocations = [
    {
        name: "Gold Coast",
        flyingDays: "295 Days",
        weather: "Coastal, warm & breezy",
    },
    {
        name: "Brisbane",
        flyingDays: "300 Days",
        weather: "Subtropical & mostly clear",
    },
    {
        name: "Lismore",
        flyingDays: "280 Days",
        weather: "Humid subtropical & mild",
    },
];

const aircraftFleet = [
    {
        name: "Diamond (DA42)",
        description: "Used for advanced multi-engine and instrument training, the DA42 features modern avionics and high performance, preparing students for complex flight operations and airline-level proficiency.",
    },
    {
        name: "Cessna 182",
        description: "Equipped with modern avionics, the Cessna 182 is ideal for advanced CPL and cross-country training, offering stable handling, higher performance, and reliability for professional pilot development.",
    },
    {
        name: "Piper Archer 44",
        description: "A reliable four-seat trainer equipped with modern avionics, ideal for PPL and CPL training. Known for its stable handling and performance, it helps students master navigation, cross-country, and instrument flying skills.",
    },
];

const benefitsOfTraining = [
    "CASA-  and globally recognised training",
    "Includes Diploma in Aviation for added qualification",
    "Diverse weather and airspace experience",
    "Modern aircraft and high safety standards",
    "English-speaking aviation environment",
    "Student work visa allows 20 hrs/week work",
    "Easy licence conversion for DGCA",
];

const faqs = [
    {
        question: "What age requirements apply for pilot training in Australia?",
        answer: "Aspiring pilots must be at least 17 years old to commence pilot training and 18 years old to obtain a Commercial Pilot License (CPL) in Australia.",
    },
    {
        question: "What visa is required for pilot training in Australia?",
        answer: "Students need an Australian Student Work Visa (Subclass 500) that permits full-time study and part-time work (20 hours per week) during training.",
    },
    {
        question: "What English proficiency level is needed?",
        answer: "Applicants must achieve IELTS 5.5 in each component and 6.0 overall to satisfy the English proficiency requirements for pilot training in Australia.",
    },
    {
        question: "How much time does the pilot training program take in Australia?",
        answer: "The comprehensive Commercial Pilot Training program typically requires 13-14 months, encompassing all phases from RPL through to CPL with Multi-Engine Instrument Rating, while earning a Diploma in Aviation.",
    },
    {
        question: "What are the total training costs in Australia?",
        answer: "Course fees range from AUD 119k to 125k, encompassing CASA licence issuance, CASA ground school, diploma exams, and written exams. Additional expenses include travel, transportation, accommodation, living costs, extra flying hours (if needed), personal insurance, and medicals.",
    },
    {
        question: "How many flying hours are completed for CPL in Australia?",
        answer: "Students complete 221 hours of flying covering CASA and DGCA requirements, including dual and solo flights, cross-country navigation, night operations, instrument flying, and multi-engine training for complete operational competence.",
    },
    {
        question: "Can I work while training in Australia?",
        answer: "Yes, the Australian Student Work Visa permits you to work up to 20 hours per week while completing your flight training program.",
    },
    {
        question: "What is the Diploma in Aviation?",
        answer: "The Diploma of Aviation (CPL – Aeroplane) integrates theory and flight training under CASA standards, combining academic qualification with professional flight training, enhancing your credentials and career prospects.",
    },
    {
        question: "Can I convert my CASA licence to DGCA?",
        answer: "Yes, upon completing training in Australia, you can return to India and convert your CASA licence into a DGCA licence by fulfilling DGCA's conversion requirements and flight checks.",
    },
    {
        question: "Is the CASA licence recognized globally?",
        answer: "Yes, CASA-  training provides globally recognised credentials. With internationally respected CASA qualifications, students gain the skills, confidence, and global eligibility to launch successful airline careers worldwide.",
    },
];

export default function PilotTrainingAustraliaPage() {
    return (
        <Layout>
            <Helmet>
                <title>Pilot Training Australia | CASA-  Commercial Pilot Training & Diploma</title>
                <meta
                    name="description"
                    content="Train in Australia with CASA-  flight schools. 13-14 months CPL training with Diploma in Aviation, 221 flying hours, modern fleet. DGCA license conversion available. Apply now."
                />
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
                            PILOT TRAINING AUSTRALIA
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Commercial Pilot Training in Australia
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Australia's aviation industry is renowned worldwide, offering international students high-quality
                            flight training through its CASA-  academies and Diploma in Aviation programs. With modern
                            aircraft, advanced simulators, excellent training infrastructure, and globally recognised licences,
                            Australia provides the perfect environment for aspiring pilots to build a professional and
                            successful flying career.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Begin Your Journey
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Speak with Counselor</Link>
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
                            Why Select Australia for Pilot Training?
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Experience world-renowned aviation education with CASA certification and integrated academic
                            qualifications.
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
                            Commercial Pilot Eligibility
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Verify if you satisfy the criteria to commence your pilot training journey in Australia.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Program Overview</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Commercial Pilot License With Multi Engine Instrument Rating (CPL-MEIR) + Instructor Rating (CFI)
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
                            <h3 className="font-bold text-lg mb-2">Program Duration</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.duration}</p>
                            <p className="text-sm text-muted-foreground">
                                Timeline may vary based on individual performance
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
                            <h3 className="font-bold text-lg mb-2">Flight Hours</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.flyingHours}</p>
                            <p className="text-sm text-muted-foreground">
                                Satisfies CASA and DGCA standards
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
                            <h3 className="font-bold text-lg mb-2">Program Fee</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.courseFee}</p>
                            <p className="text-sm text-muted-foreground">
                                All-inclusive training package
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
                            <h3 className="text-xl font-bold mb-6">Program Includes</h3>
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
                            <h3 className="text-xl font-bold mb-6">Additional Expenses</h3>
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
                        The program integrates classroom theory with practical flight training under CASA standards, guiding
                        students from PPL to CPL while earning a Diploma in Aviation. This structured approach builds strong
                        foundational skills and professional competence.
                    </motion.p>
                </div>
            </section>

            {/* Course Flow */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Flight Training Program Flow</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Sequential advancement from RPL through to CPL with Multi-Engine Instrument Rating
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courseFlow.map((item, index) => (
                            <motion.div
                                key={item.stage}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-xl bg-card border border-border"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    {item.stage}
                                </div>
                                <div className="mb-4 pt-2">
                                    <h3 className="font-bold text-lg text-primary mb-2">{item.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Training Stages */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Flight Training Phases & Advancement
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive overview of each training phase with hours and key elements
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
                                        <div className="mb-4">
                                            <h3 className="font-bold text-2xl mb-1">{stage.stage}</h3>
                                            <p className="text-muted-foreground">{stage.fullName}</p>
                                        </div>
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
                                            <h4 className="font-semibold mb-3">Training Focus:</h4>
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
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Australia Pilot Training - Sequential Guide
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Navigate these steps to initiate your pilot training journey in Australia
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Aviation Academies in Australia
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            CASA-  flight schools featuring modern fleets and qualified instructors
                        </p>
                    </motion.div>

                    <div className="max-w-2xl mx-auto">
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
                                    {school.location}
                                </p>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Program Duration:</span>
                                        <span className="font-semibold">{school.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Fleet Size:</span>
                                        <span className="font-semibold">{school.fleetSize}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Type Of Fleet:</span>
                                        <span className="font-semibold text-right">{school.aircraft}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Flying Hours:</span>
                                        <span className="font-semibold">{school.flyingHours}</span>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link to="/contact">
                                        Discover More
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Training Locations */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Premier Pilot Training Destinations in Australia
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Select from locations providing superior weather conditions and varied flying environments
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
                                    <span className="font-semibold text-primary">Annual Flying Days:</span>{" "}
                                    {location.flyingDays}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">Climate:</span> {location.weather}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Aircraft Fleet */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Aircraft Fleet Available For Flight Training In Australia
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Train with contemporary, well-maintained aircraft featuring cutting-edge avionics
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Advantages Of Training In Australia
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
            <section className="py-20 bg-background">
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
                                Licence And Acknowledgment
                            </h2>
                        </div>
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <p className="text-muted-foreground text-lg mb-4">
                                Designed for aspiring Indian pilots, our Commercial Pilot Training program in Australia
                                integrates CASA-  flight training with the Diploma in Aviation, providing both academic
                                and practical expertise.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                Conducted at CASA-certified flight schools, the program ensures globally recognized standards,
                                advanced aircraft experience, and exposure to diverse flying conditions. Graduates earn a
                                Commercial Pilot Licence (CPL) with Multi-Engine Instrument Rating (MEIR), easily convertible
                                to DGCA standards in India.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                With internationally respected CASA credentials, students gain the skills, confidence, and
                                global eligibility to launch successful airline careers.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Inquiries</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Frequently asked questions regarding pilot training in Australia
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
                            Begin Your Aviation Career in Australia Today
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            With CASA-  training, Diploma in Aviation qualification, superior weather conditions,
                            diverse flying environments, and qualified instructors, Australia provides everything essential to
                            establish a thriving aviation career. Take the initial step toward realizing your aspiration of
                            becoming a professional pilot with internationally acknowledged certification and straightforward
                            DGCA conversion. Work part-time during your training and experience Australia's world-renowned
                            aviation education system.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Submit Application
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Consult with Advisor</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}