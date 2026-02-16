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
    Wallet,
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
        title: "SACAA-  Training",
        description: "Internationally recognized training standards with global career opportunities",
    },
    {
        icon: Plane,
        title: "Diverse Flying Environments",
        description: "Build strong real-world skills in varied conditions",
    },
    {
        icon: Sun,
        title: "300+ Flying Days",
        description: "Excellent weather for fast course completion year-round",
    },
    {
        icon: Wallet,
        title: "Cost-Effective Training",
        description: "Competitive pricing compared to many international destinations",
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
        description: "Must hold an SACAA medicals Class 1 Medical and DGCA Class 1 Medical Certificate to qualify for Commercial Pilot Training.",
    },
    {
        icon: FileCheck,
        title: "Visa",
        description: "South African Student Visa, which requires medicals for application, allowing full-time flight training.",
    },
];

const courseDetails = {
    duration: "14-15 MONTHS",
    flyingHours: "200-210 Hrs",
    courseFee: "ZAR 860k - 995k",
};

const courseCoverage = [
    "Study Material",
    "Theory Classes",
    "Written Exams",
    "Flight Training",
    "Pilot Kit",
    "Checkride flights",
    "Licence issuance",
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
        title: "PPL",
        description: "Lays the foundation of your flying skills, introducing you to aircraft handling, navigation, and solo flight operations.",
    },
    {
        stage: "2",
        title: "Night Rating + Hour building",
        description: "Enhances your skills through night flying experience and extensive cross-country solo flights to build total flight hours and confidence.",
    },
    {
        stage: "3",
        title: "IR + Multi Engine",
        description: "Enhances your skills through night flying experience and extensive cross-country solo flights to build total flight hours and confidence.",
    },
    {
        stage: "4",
        title: "CPL + IR Skill tests",
        description: "Final assessment stage to demonstrate competency and earn your SACAA Commercial Pilot Licence with Instrument Rating",
    },
];

const trainingStages = [
    {
        stage: "PPL",
        fullName: "Private Pilot License",
        duration: "6 Months",
        flyingHours: "0-65 Hrs",
        highlights: [
            "Basic flight principles",
            "Take-offs & landings",
            "Circuit Training",
            "Solo flight",
            "Navigation exercises",
            "Emergency Procedures",
        ],
    },
    {
        stage: "Night Rating + Hour Building",
        fullName: "Night Operations & PIC Hours",
        duration: "4 Months",
        flyingHours: "65-165 hrs",
        highlights: [
            "Night flying operations",
            "Solo cross-country navigation",
            "Instrument familiarisation",
            "PIC Hours",
        ],
    },
    {
        stage: "IR + Multi-Engine Rating",
        fullName: "Instrument Rating & Multi-Engine",
        duration: "3 Months",
        flyingHours: "160-205 hrs",
        highlights: [
            "Multi-engine handling",
            "Instrument Flight Procedures",
            "Precision Approaches",
            "Simulator Training",
            "IFR operations",
        ],
    },
    {
        stage: "CPL + IR Skill Tests",
        fullName: "Commercial Pilot License & Tests",
        duration: "1 Month",
        flyingHours: "205-210 hrs",
        highlights: [
            "Advanced navigation and instrument flying",
            "Complex aircraft handling and flight management",
            "CPL & IR flight tests and check rides",
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
        description: "Select a SACAA-  flight school in South Africa. Compare fleet, instructor experience, and training environment to find your ideal fit.",
    },
    {
        step: 4,
        title: "Admission & Documentation",
        description: "Admission & Documentation Receive your Letter of Acceptance and other documents required for the South African Study Visa.",
    },
    {
        step: 5,
        title: "Study Visa Application",
        description: "Apply for your South African Study Visa, allowing you to legally stay and complete your pilot training program.",
    },
    {
        step: 6,
        title: "SACAA Medicals (In South Africa)",
        description: "On arrival, complete your SACAA Class 1 Medical with an   aviation medical examiner before beginning flight training.",
    },
    {
        step: 7,
        title: "English Language Proficiency (ELP) Test",
        description: "Take your ELP assessment with the Chief Flying Instructor (CFI) to verify communication skills before starting flight operations.",
    },
    {
        step: 8,
        title: "Ground School (At FTO in South Africa)",
        description: "Begin SACAA Ground School, covering Air Law, Navigation, Meteorology, and Human Performance, followed by written exams.",
    },
    {
        step: 9,
        title: "Flight Training (At FTO in South Africa)",
        description: "Begin SACAA Ground School, covering Air Law, Navigation, Meteorology, and Human Performance, followed by written exams.",
    },
    {
        step: 10,
        title: "Licence Conversion (At FTO In India)",
        description: "Return to India and convert your SACAA CPL into a DGCA CPL by meeting DGCA conversion requirements and clearing exams.",
    },
];

const flyingSchools = [
    {
        name: "Flying School 01",
        location: "Cape Town, South Africa",
        duration: "15 Months",
        fleetSize: "28 Aircrafts",
        aircraft: "Cessna (152, 172, 150), Piper Seneca (PA34), Tecnam",
        flyingHours: "210 Hrs",
    },
    {
        name: "Flying School 02",
        location: "Secunda, Margate, Brakpan, South Africa",
        duration: "12 Months",
        fleetSize: "40 Aircrafts",
        aircraft: "Cessna 172, Piper Cherokee, Piper Seneca",
        flyingHours: "200 Hrs",
    },
    {
        name: "Flying School 03",
        location: "Durban, South Africa",
        duration: "13 - 14 Months",
        fleetSize: "7 Aircrafts",
        aircraft: "Cessna (172, 152), Piper Seneca (PA34), PA 140",
        flyingHours: "200 Hrs",
    },
    {
        name: "Flying School 04",
        location: "Johannesburg, South Africa",
        duration: "12 Months",
        fleetSize: "21 Aircrafts",
        aircraft: "Cessna 172, PA 28, Diamond DA-42, Piper Seneca PA-34",
        flyingHours: "200 Hrs",
    },
    {
        name: "Flying School 05",
        location: "Johannesburg, South Africa",
        duration: "14 Months",
        fleetSize: "9 Aircrafts",
        aircraft: "PA28, C172, Piper Seneca PA34",
        flyingHours: "200 Hrs",
    },
    {
        name: "Flying School 06",
        location: "Grand Central Airport, South Africa",
        duration: "10 - 12 Months",
        fleetSize: "30 Aircrafts",
        aircraft: "Cessna (172, 182), Diamond DA42, PS (PA34)",
        flyingHours: "200 Hrs",
    },
    {
        name: "Flying School 07",
        location: "Johannesburg, South Africa",
        duration: "12 Months",
        fleetSize: "22 Aircrafts",
        aircraft: "Cessna 172, PA 28, PA 34, DV 20, DA42",
        flyingHours: "200 Hrs",
    },
];

const trainingLocations = [
    {
        name: "Cape Town",
        flyingDays: "300 Days",
        weather: "Humid climate, good visibility",
    },
    {
        name: "Secunda",
        flyingDays: "280 Days",
        weather: "Clear Skies, Good for VFR",
    },
    {
        name: "Durban",
        flyingDays: "250 Days",
        weather: "Sunny, Humid, Mild winters",
    },
    {
        name: "Johannesburg",
        flyingDays: "320 Days",
        weather: "Sunny, good year-round conditions",
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
        name: "Cessna 150",
        description: "A classic two-seat trainer used for initial flight training and circuit practice, perfect for mastering basic manoeuvres, take-offs, and landings during early pilot training stages.",
    },
    {
        name: "PA-34 Seneca",
        description: "Twin-engine trainer for IFR and advanced flight training. Students learn complex handling and multi-engine operations.",
    },
    {
        name: "Piper Archer",
        description: "A reliable four-seat trainer equipped with modern avionics, ideal for PPL and CPL training. Known for its stable handling and performance, it helps students master navigation, cross-country, and instrument flying skills.",
    },
    {
        name: "Diamond (DA42)",
        description: "Used for advanced multi-engine and instrument training, the DA42 features modern avionics and high performance, preparing students for complex flight operations and airline-level proficiency.",
    },
];

const benefitsOfTraining = [
    "Excellent weather with 300+ flying days per year for fast course completion",
    "SACAA-  training with globally recognised licence pathways",
    "Diverse flying environments that build strong real-world skills",
    "Cost-effective training compared to many international destinations",
    "Modern training fleets with experienced instructors",
    "Easy DGCA licence conversion for Indian students",
];

const faqs = [
    {
        question: "What is the minimum age requirement for pilot training in South Africa?",
        answer: "You must be at least 17 years old to begin pilot training and 18 years old to obtain a Commercial Pilot License (CPL) in South Africa.",
    },
    {
        question: "What visa do I need for pilot training in South Africa?",
        answer: "Students require a South African Student Visa, which requires medicals for application, allowing full-time flight training.",
    },
    {
        question: "How long does it take to complete pilot training in South Africa?",
        answer: "The complete Commercial Pilot Training program typically takes 14-15 months, covering all stages from PPL to CPL with Night Rating, Instrument Rating, and Multi-Engine training.",
    },
    {
        question: "What is the total cost of pilot training in South Africa?",
        answer: "The course fee ranges from ZAR 860k to 995k, covering study material, theory classes, written exams, flight training, pilot kit, checkride flights, and licence issuance. Additional costs include travel, transportation, accommodation, living costs, extra flying hours (if required), personal insurance, and medicals.",
    },
    {
        question: "How many flying hours are required for CPL in South Africa?",
        answer: "Students complete 200-210 hours of structured flight hours from PPL to CPL, including IR and Multi-Engine training under SACAA regulations, ensuring full proficiency and readiness for DGCA licence conversion.",
    },
    {
        question: "What medical certificates are required?",
        answer: "You must hold an SACAA Class 1 Medical and DGCA Class 1 Medical Certificate to qualify for Commercial Pilot Training. SACAA medical is completed on arrival in South Africa.",
    },
    {
        question: "Is an English Language Proficiency test required?",
        answer: "Yes, you need to take an ELP (English Language Proficiency) assessment with the Chief Flying Instructor (CFI) to verify communication skills before starting flight operations.",
    },
    {
        question: "Can I convert my SACAA license to DGCA?",
        answer: "Yes, after completing training in South Africa, you can return to India and convert your SACAA CPL into a DGCA CPL by meeting DGCA conversion requirements and clearing exams.",
    },
    {
        question: "Is the SACAA license recognized internationally?",
        answer: "Yes, SACAA-  training provides globally recognised licence pathways. The training ensures compliance with both SACAA and DGCA standards, preparing students for licence conversion in India and global airline careers.",
    },
    {
        question: "What makes South Africa cost-effective for pilot training?",
        answer: "South Africa offers competitive training costs compared to many international destinations, with excellent weather (300+ flying days per year), modern training fleets, experienced instructors, and diverse flying environments.",
    },
];

export default function PilotTrainingSouthAfricaPage() {
    return (
        <Layout>
            <Helmet>
                <title>Pilot Training South Africa | SACAA-  Commercial Pilot Training</title>
                <meta
                    name="description"
                    content="Train in South Africa with SACAA-  flight schools. 14-15 months CPL training, 200-210 flying hours, cost-effective programs. DGCA license conversion available. Apply now."
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
                            PILOT TRAINING SOUTH AFRICA
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Commercial Pilot Training in South Africa
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Designed for aspiring Indian pilots, the South Africa program offers SACAA-  flight
                            training covering PPL to CPL with Multi-Engine and Instrument Rating. Conducted at leading flight
                            schools with modern aircraft, it provides internationally recognized training standards. Graduates
                            earn a SACAA Commercial Pilot Licence, easily convertible to DGCA, ensuring strong global career
                            opportunities.
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
                            Why Choose South Africa for Pilot Training?
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Experience cost-effective, world-class training with SACAA certification and excellent flying
                            conditions year-round.
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
                            Check if you meet the requirements to begin your pilot training journey in South Africa.
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
                            <h3 className="font-bold text-lg mb-2">Flying Hours</h3>
                            <p className="text-2xl font-bold text-primary mb-2">{courseDetails.flyingHours}</p>
                            <p className="text-sm text-muted-foreground">
                                Under SACAA regulations for DGCA conversion
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
                                Cost-effective comprehensive training
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
                        Comprehensive SACAA-  CPL program with PPL, Night Rating, IR, and Multi-Engine training,
                        aligned for DGCA licence conversion, covering ground school, simulator, and flight hours.
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
                            Structured progression from PPL to CPL with Night Rating, Instrument Rating, and Multi-Engine
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
                            South Africa Pilot Training - Step by Step Guide
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Follow these steps to begin your pilot training journey in South Africa
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
                            Pilot Academies in South Africa
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            SACAA-  flying schools with modern fleets and experienced instructors
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
                                        <span className="font-semibold text-right text-xs">{school.aircraft}</span>
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
                            Popular Pilot Training Locations in South Africa
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose from locations offering excellent weather conditions and diverse flying environments
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            Types Of Fleets Available For Flight Training In South Africa
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Train on modern, well-maintained aircraft with experienced instructors
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
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Benefits Of Training In South Africa
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
                                License And Recognition
                            </h2>
                        </div>
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <p className="text-muted-foreground text-lg mb-4">
                                Pilot training in South Africa offers Indian students a structured pathway to earn a
                                DGCA-  Commercial Pilot Licence (CPL) and Multi-Engine Instrument Rating (MEIR) under
                                the South African Civil Aviation Authority (SACAA).
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                Conducted at globally recognized flight schools, the program combines advanced instruction,
                                diverse weather conditions, and modern aircraft operations. The training ensures compliance
                                with both SACAA and DGCA standards, preparing students for licence conversion in India and
                                global airline careers.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                With excellent flying conditions year-round, students gain the skills, confidence, and
                                international exposure needed to excel as professional pilots.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Common questions about pilot training in South Africa
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
                            Start Your Pilot Journey in South Africa Today
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            With SACAA-  training, excellent weather conditions (300+ flying days per year), diverse
                            flying environments, and cost-effective programs, South Africa offers everything you need to build
                            a successful aviation career. Take the first step towards your dream of becoming a professional
                            pilot with internationally recognized certification and seamless DGCA conversion. Experience
                            modern training fleets and experienced instructors in one of the world's premier aviation training
                            destinations.
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