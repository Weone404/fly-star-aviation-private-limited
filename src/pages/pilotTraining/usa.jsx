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
    Gauge,
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
        title: "FAA-Approved Training",
        description: "World-class pilot training with globally recognized certification",
    },
    {
        icon: Plane,
        title: "Modern Aircraft Fleet",
        description: "Train on Cessna 152, Cessna 172, Piper Seneca, and more",
    },
    {
        icon: Sun,
        title: "Year-Round Flying",
        description: "310-365 flying days with excellent weather conditions",
    },
    {
        icon: Globe,
        title: "DGCA License Conversion",
        description: "Clear pathway to convert FAA license to DGCA",
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
        icon: Shield,
        title: "Medical",
        description: "Must hold an FAA Class 1 Medical and DGCA Class 1 Medical Certificate to qualify.",
    },
    {
        icon: FileCheck,
        title: "Visa",
        description: "Students require an M-1 Visa to pursue flight training in the USA.",
    },
];

const courseDetails = {
    duration: "10-12 MONTHS",
    flyingHours: "235-260 Hrs",
    courseFee: "USD 56k - 65k",
};

const courseCoverage = [
    "Study Material",
    "FAA Ground School",
    "FAA Written Exams",
    "Flight Training",
    "Checkride Flights",
    "FAA License Issue",
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
        stage: "SPL",
        title: "Student Pilot License",
        description: "Authorises you to fly under instructor supervision, marking the start of pilot training Journey.",
    },
    {
        stage: "PPL",
        title: "Private Pilot License",
        description: "Covers basic flying lessons, VFR flying & navigation, radio communication, enabling you to operate as PIC for non-commercial flights",
    },
    {
        stage: "IR+Hours",
        title: "Instrument Rating + Hour Building",
        description: "Develops your ability to fly and navigate with reference to instruments, while also logging extensive PIC cross-country hours to meet CPL requirements.",
    },
    {
        stage: "CPL",
        title: "Commercial Pilot License",
        description: "Enables you to fly professionally for hire, with training in night flying, cross-country navigation, and advanced aircraft operations, preparing you for a career in commercial aviation.",
    },
    {
        stage: "MEIR",
        title: "Multi-Engine Instrument Rating",
        description: "Adds multi-engine proficiency under IFR, a must for airline training and advanced checkrides. Usually endorsed after CPL training.",
    },
];

const trainingStages = [
    {
        stage: "SPL",
        fullName: "Student Pilot License",
        duration: "0-1 Months",
        flyingHours: "N/A",
        highlights: [
            "FAA Ground Class",
            "Discovery Flight",
            "Dual Flights",
        ],
    },
    {
        stage: "PPL",
        fullName: "Private Pilot License",
        duration: "5 Months",
        flyingHours: "70-160 hrs",
        highlights: [
            "Solo & Basic Training",
            "Take-Offs & Landings",
        ],
    },
    {
        stage: "Hour Building (IR)",
        fullName: "Instrument Rating + Hour Building",
        duration: "3 Months",
        flyingHours: "160-240 hrs",
        highlights: [
            "PIC Hours",
            "Instrument Flying",
        ],
    },
    {
        stage: "CPL",
        fullName: "Commercial Pilot License",
        duration: "2-3 Months",
        flyingHours: "50-70 hrs",
        highlights: [
            "Advanced Maneuvers",
            "Checkride",
        ],
    },
    {
        stage: "MEIR",
        fullName: "Multi-Engine + Instrument Rating",
        duration: "1 month",
        flyingHours: "240-260 hrs",
        highlights: [
            "Multi Engine Operations",
            "Advanced instruments Flying",
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
        description: "Compare FAA-approved USA schools on course structure, fleet, instructor experience, student outcomes, and living support to pick the best fit for your goals",
    },
    {
        step: 4,
        title: "FAA Medicals",
        description: "Obtain an FAA Class 1 Medical Certificate. This is mandatory before you can begin your flight training.",
    },
    {
        step: 5,
        title: "Admission & I-20 Form",
        description: "Once accepted by a flight school, you will receive the I-20 form, which is required for your visa process.",
    },
    {
        step: 6,
        title: "Visa Application (M-1 Visa)",
        description: "Apply for the M-1 Student Visa, specifically designed for vocational courses like pilot training. This allows you to legally train in the USA.",
    },
    {
        step: 7,
        title: "FAA Ground School (At Flight School In USA)",
        description: "Begin your FAA Ground School, where you'll study aviation theory, regulations, and prepare for written knowledge tests.",
    },
    {
        step: 8,
        title: "Flight Training (At Flight School In USA)",
        description: "Move to practical flying lessons — starting with SPL → PPL → IR → CPL → MEIR. Training is structured under FAA requirements for each stage.",
    },
    {
        step: 9,
        title: "Licence Conversion (At FTO In India)",
        description: "After completing training, return to India and convert your FAA license into a DGCA license by meeting DGCA's conversion requirements and exams.",
    },
];

const flyingSchools = [
    {
        name: "Flying School 01",
        location: "California, USA",
        duration: "10 - 12 Months",
        fleetSize: "30 Aircrafts",
        aircraft: "Cessna 152, Cessna 172, Piper Seneca (PA34)",
        flyingHours: "250 Hrs",
    },
    {
        name: "Flying School 02",
        location: "California, USA",
        duration: "10 - 12 Months",
        fleetSize: "38 Aircrafts",
        aircraft: "Cessna 152, Cessna 172, Piper Seneca (PA34)",
        flyingHours: "252 Hrs",
    },
    {
        name: "Flying School 03",
        location: "California, USA",
        duration: "10 - 12 Months",
        fleetSize: "22 Aircrafts",
        aircraft: "Cessna 152, Cessna 172, Piper Seneca 34, Piper Arrow",
        flyingHours: "246 Hrs",
    },
    {
        name: "Flying School 04",
        location: "Texas, USA",
        duration: "10 - 12 Months",
        fleetSize: "70 Aircrafts",
        aircraft: "Cessna 152, Cessna 172, Piper Seneca (PA34)",
        flyingHours: "263 Hrs",
    },
    {
        name: "Flying School 05",
        location: "California, USA",
        duration: "10 - 12 Months",
        fleetSize: "30 Aircrafts",
        aircraft: "Cessna 152, Cessna 172, Piper Seneca (PA34)",
        flyingHours: "250 Hrs",
    },
    {
        name: "Flying School 06",
        location: "California, USA",
        duration: "10 - 12 Months",
        fleetSize: "30 Aircrafts",
        aircraft: "Cessna 152, Cessna 172, Piper Seneca (PA34)",
        flyingHours: "250 Hrs",
    },
];

const trainingLocations = [
    {
        name: "California",
        flyingDays: "310 Days",
        weather: "Sunny, Clear",
    },
    {
        name: "Texas",
        flyingDays: "365 Days",
        weather: "Sunny, Clear Skies",
    },
    {
        name: "Florida",
        flyingDays: "320 Days",
        weather: "Clear skies, sunny, cloudy, Good Visibility",
    },
];

const aircraftFleet = [
    {
        name: "Cessna 172",
        description: "Single-engine four-seat trainer and cross-country aircraft, ideal for PPL training, night flying, and navigation practice.",
    },
    {
        name: "Cessna 152",
        description: "Light, two-seat trainer aircraft for initial flight training and first solo hours. Helps students build confidence.",
    },
    {
        name: "PA-34 Seneca",
        description: "Twin-engine trainer for IFR and advanced flight training. Students learn complex handling and multi-engine operations.",
    },
    {
        name: "Seminole (PA-44)",
        description: "Twin-engine trainer for instrument and commercial pilot training. Masters precision flying and maneuvers.",
    },
];

const trainingPathways = [
    {
        title: "Part 61",
        subtitle: "Flexible and self-paced training",
        icon: Users,
        features: [
            "Flexible and self-paced training",
            "Requires more hours (~250hrs)",
            "Suits working or part-time students",
            "Lessons can be customized individually",
        ],
    },
    {
        title: "Part 141",
        subtitle: "Structured FAA-approved syllabus",
        icon: Award,
        features: [
            "Structured FAA-approved syllabus",
            "Fewer hours to CPL",
            "Ideal for full-time or international students",
            "Includes stage checks and progress reviews",
        ],
    },
];

const benefitsOfTraining = [
    "Consistently good weather and diverse geography for year-round flying",
    "FAA license recognized worldwide and easily convertible to DGCA",
    "Access to a large, modern fleet of training aircraft",
    "High-quality instruction under FAA-certified flight schools",
    "Faster course completion with efficient hour building",
    "Safe, student-friendly environment with great living standards",
    "Exposure to multiple airports and complex airspace operations",
];

const faqs = [
    {
        question: "What is the minimum age requirement for pilot training in USA?",
        answer: "You must be at least 17 years old to begin pilot training and 18 years old to obtain a Commercial Pilot License (CPL) in the USA.",
    },
    {
        question: "What visa do I need for pilot training in USA?",
        answer: "Students require an M-1 Student Visa to pursue flight training in the USA. This visa is specifically designed for vocational courses like pilot training.",
    },
    {
        question: "How long does it take to complete pilot training in USA?",
        answer: "The complete Commercial Pilot Training program typically takes 10-12 months, covering all stages from SPL to CPL and MEIR under FAA standards.",
    },
    {
        question: "What is the total cost of pilot training in USA?",
        answer: "The course fee ranges from USD 56k to 65k, covering study material, FAA ground school, written exams, flight training, checkride flights, and FAA license issue. Additional costs include travel, transportation, accommodation, living costs, extra flying hours (if required), personal insurance, and medicals.",
    },
    {
        question: "How many flying hours are required for CPL in USA?",
        answer: "Students typically complete 235-260 hours of flying, covering FAA and DGCA requirements, including dual and solo flights, cross-country, night flying, instrument procedures, and multi-engine operations.",
    },
    {
        question: "What is the difference between Part 61 and Part 141 training?",
        answer: "Part 61 is flexible and self-paced training requiring more hours (~250hrs), suitable for working or part-time students with customizable lessons. Part 141 is a structured FAA-approved syllabus with fewer hours to CPL, ideal for full-time or international students, including stage checks and progress reviews.",
    },
    {
        question: "Can I convert my FAA license to DGCA?",
        answer: "Yes, after completing training in the USA, you can return to India and convert your FAA license into a DGCA license by meeting DGCA's conversion requirements and exams at an FTO in India.",
    },
    {
        question: "Is the FAA license recognized internationally?",
        answer: "Yes, the FAA license is recognized worldwide and easily convertible to DGCA. Training is conducted at FAA-certified flight schools, providing internationally recognized standards and world-class flight experience.",
    },
];

export default function PilotTrainingUSAPage() {
    return (
        <Layout>
            <Helmet>
                <title>Pilot Training USA | FAA-Approved Commercial Pilot Training</title>
                <meta
                    name="description"
                    content="Train in the USA with FAA-approved flight schools. 10-12 months CPL training, 235-260 flying hours, modern fleet. DGCA license conversion available. Apply now."
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
                            PILOT TRAINING USA
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Commercial Pilot Training in USA
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            The USA is the premier destination for international students aspiring to become commercial
                            pilots. Boasting FAA-approved flight schools, modern aircraft fleets, and year-round flying
                            conditions, it offers world-class pilot training and a clear pathway to DGCA license conversion.
                            With structured courses, experienced instructors, and globally recognized certification, the USA
                            remains the top choice for students aiming to launch a successful aviation career.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
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
                            Why Choose USA for Pilot Training?
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Experience world-class training with FAA certification and seamless DGCA conversion pathway.
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
                            Check if you meet the requirements to begin your pilot training journey in the USA.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Overview</h2>
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
                            <h3 className="font-bold text-lg mb-2">Course Duration</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.duration}</p>
                            <p className="text-sm text-muted-foreground">
                                Training timelines may exceed based on performance
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
                            <h3 className="font-bold text-lg mb-2">Avg Flying Hours For CPL</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.flyingHours}</p>
                            <p className="text-sm text-muted-foreground">
                                Covers FAA and DGCA requirements
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
                            <h3 className="font-bold text-lg mb-2">Course Fee</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.courseFee}</p>
                            <p className="text-sm text-muted-foreground">
                                Comprehensive training package
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
                            <h3 className="text-xl font-bold mb-6">This Course Covers</h3>
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
                            <h3 className="text-xl font-bold mb-6">Additional Costs</h3>
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
                        Structured training combining theory and hands-on flying, covering all stages from PPL to CPL and
                        multi-engine ratings, following FAA & DGCA standards.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Flight Training Course Flow</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Structured progression from Student Pilot License to Multi-Engine Instrument Rating
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                                    {index + 1}
                                </div>
                                <div className="text-center mb-4 pt-2">
                                    <h3 className="font-bold text-2xl text-primary mb-1">{item.stage}</h3>
                                    <p className="text-xs font-semibold text-muted-foreground">{item.title}</p>
                                </div>
                                <p className="text-sm text-muted-foreground text-center">{item.description}</p>
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
                            Flight Training Stages & Progression
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Detailed breakdown of each training stage with hours and highlights
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
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            USA Pilot Training - Step by Step Guide
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Follow these steps to begin your pilot training journey in the USA
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
                            Pilot Academies in USA
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            FAA-approved flying schools with modern fleets and experienced instructors
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                        <span className="text-muted-foreground">Course Duration:</span>
                                        <span className="font-semibold">{school.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Fleet Size:</span>
                                        <span className="font-semibold">{school.fleetSize}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Aircraft:</span>
                                        <span className="font-semibold text-right">{school.aircraft}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Flying Hours:</span>
                                        <span className="font-semibold">{school.flyingHours}</span>
                                    </div>
                                </div>
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
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Popular Pilot Training Locations in USA
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose from locations offering excellent weather conditions and year-round flying
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
                                    <span className="font-semibold text-primary">No. Of Flying Days:</span>{" "}
                                    {location.flyingDays}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">Weather:</span> {location.weather}
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
                            Types Of Fleets Available For Flight Training In USA
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Train on modern, well-maintained aircraft with advanced avionics
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Training Pathways */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Path Way</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose the training pathway that best suits your needs and goals
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {trainingPathways.map((pathway, index) => (
                            <motion.div
                                key={pathway.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    <pathway.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-2xl mb-2">{pathway.title}</h3>
                                <p className="text-muted-foreground mb-6">{pathway.subtitle}</p>
                                <ul className="space-y-3">
                                    {pathway.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
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
                            Benefits Of Training In USA
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
                                Our Commercial Pilot Training program in the USA offers Indian students a pathway to earn
                                DGCA-approved Commercial Pilot Licenses (CPL) and Multi-Engine Instrument Ratings (MEIR),
                                ensuring full compliance with Indian aviation regulations.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                Training is conducted at FAA-certified flight schools, providing internationally recognized
                                standards and world-class flight experience. Graduates leave fully prepared to operate
                                commercially with airlines globally, benefiting from licenses that are valid both in India
                                (DGCA) and internationally through the FAA (USA) framework.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                This dual recognition ensures that students gain not only practical flight experience but also
                                a globally respected qualification, opening doors to diverse aviation career opportunities.
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
                            Common questions about pilot training in USA
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
                            Start Your Pilot Journey in the USA Today
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            With FAA-approved training, modern aircraft fleets, year-round flying conditions, and experienced
                            instructors, the USA offers everything you need to build a successful aviation career. Take the
                            first step towards your dream of becoming a professional pilot with globally recognized
                            certification and seamless DGCA conversion.
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