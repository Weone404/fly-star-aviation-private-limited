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
        title: "CAA-  Training",
        description: "World-class flight academies with internationally recognized licences",
    },
    {
        icon: Plane,
        title: "Diverse Flying Environments",
        description: "Train in varied terrain and coastal conditions",
    },
    {
        icon: Sun,
        title: "Excellent Weather",
        description: "260-280 flying days for faster course completion",
    },
    {
        icon: Globe,
        title: "DGCA Conversion Compatible",
        description: "Clear pathway to convert CAA license to DGCA",
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
        description: "CASA Class 1 and DGCA Class 1 medicals",
    },
    {
        icon: FileCheck,
        title: "Visa",
        description: "Student work visa allows you to study full-time and work part-time while completing your flight training program",
    },
    {
        icon: Languages,
        title: "English Proficiency",
        description: "IELTS 5.5 each, 6.0 overall",
    },
];

const courseDetails = {
    duration: "12-14 MONTHS",
    flyingHours: "220 - 240 Hrs",
    courseFee: "NZD 115k - 125k",
};

const courseCoverage = [
    "CAA Theory lectures",
    "Meals",
    "Flight training",
    "Flight tests",
    "Licence issuance",
    "Student Pilot Kit",
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
        title: "CAA Theory Ground Class",
        description: "Students begin with CAA-  ground classes and written exams, building a strong foundation in aviation theory before starting their flight training.",
    },
    {
        stage: "2",
        title: "PPL",
        description: "Learn fundamental flying skills, complete first solo, circuit training, and introductory cross-country flights to qualify as a Private Pilot.",
    },
    {
        stage: "3",
        title: "CPL Training + Hour Building",
        description: "Focus on commercial-level manoeuvres, navigation exercises, and extensive cross-country flying to build confidence and total flight hours",
    },
    {
        stage: "4",
        title: "Multi Engine + IR + CPL flight tests",
        description: "Complete Multi-Engine endorsement and Instrument Rating, including 40 hours on aircraft and 40 hours on simulator, followed by final CPL flight tests to qualify as a Commercial Pilot.",
    },
];

const trainingStages = [
    {
        stage: "CAA Ground Theory",
        duration: "3 Months",
        flyingHours: "0 Hrs",
        highlights: [
            "Written exams and theory assessments",
            "Air law, navigation, meteorology, human factors, Technical",
            "Prepared for beginning practical flight training",
        ],
    },
    {
        stage: "Private Pilot Licence – PPL",
        duration: "5 Months",
        flyingHours: "0-70 hrs",
        highlights: [
            "Basic aircraft handling & flight manoeuvres",
            "First Solo, Circuit flying & Solo consolidation",
            "Cross-country navigation exercises",
            "PPL Flight Test and licence issue",
        ],
    },
    {
        stage: "CPL Training + Hour Building",
        duration: "4 Months",
        flyingHours: "70-200 hrs",
        highlights: [
            "Commercial-level manoeuvres and advanced airmanship",
            "Long Cross-Country Navigation & Hour Building",
            "Solo and dual flights to develop confidence and precision",
            "Preparation for CPL performance standards",
        ],
    },
    {
        stage: "Multi-Engine + Instrument Rating + CPL Tests",
        duration: "2 Months",
        flyingHours: "200-240 hrs",
        highlights: [
            "Multi-Engine Endorsement",
            "Instrument Rating (40 hrs simulator + 40 hrs aircraft)",
            "IFR procedures, navigation, holds, and approaches",
            "Final CPL Flight Tests and licence completion",
        ],
    },
];

const stepByStepGuide = [
    {
        step: 1,
        title: "DGCA Medicals",
        description: "Obtain a valid DGCA Class 1 medical (for CPL pathway) from an authorised AME to confirm fitness for professional flying.",
    },
    {
        step: 2,
        title: "DGCA Theory Class",
        description: "Complete your DGCA Class 2 & 1 Medicals and join reputed DGCA Ground Classes to clear theory exams.",
    },
    {
        step: 3,
        title: "Choose the Right Flight School",
        description: "Compare CAA-  NZ schools on course structure, fleet, instructor experience, student outcomes, and living support to pick the best fit for your goals",
    },
    {
        step: 4,
        title: "CAA Medicals",
        description: "Clear the required aviation medical (Class 1) with an   AME. It's mandatory before advanced training.",
    },
    {
        step: 5,
        title: "Admission & Offer Letter (COE)",
        description: "Apply to the school, submit documents and medical clearance; once accepted you'll receive an offer letter needed for visa and enrolment formalities.",
    },
    {
        step: 6,
        title: "Orientation Day (Student Visa Subclass 500)",
        description: "Attend orientation to meet instructors, review the syllabus, learn safety procedures, and get introduced to schedules, simulators and campus facilities.",
    },
    {
        step: 7,
        title: "CAA Ground Class",
        description: "Complete mandatory ground school modules (air law, navigation, meteorology, human factors) to prepare for theory exams and practical flying.",
    },
    {
        step: 8,
        title: "Flight Training",
        description: "Follow the structured PPL→hour-building→CPL (and optional IR/ME) progression with dual instruction, solo flights, cross-countries and simulator sessions.",
    },
    {
        step: 9,
        title: "Licence Conversion",
        description: "After completing training, return to India and convert your CAA License into a DGCA license by meeting DGCA's conversion requirements and exams.",
    },
];

const flyingSchools = [
    {
        name: "Flying School 01",
        location: "Omaru, Whanganui",
        duration: "12-14 Months",
        fleetSize: "24 Aircrafts",
        aircraft: "Tecnam (SS), Tecnam (ME)",
        flyingHours: "222 Hrs",
    },
    {
        name: "Flying School 02",
        location: "Auckland",
        duration: "12-14 Months",
        fleetSize: "10 Aircrafts",
        aircraft: "Cessna 172, DA 42",
        flyingHours: "221 Hrs",
    },
];

const trainingLocations = [
    {
        name: "Whanganui",
        flyingDays: "260 Days",
        weather: "Subtropical with mild, Humid summers",
    },
    {
        name: "Omaru",
        flyingDays: "260 Days",
        weather: "Windy, Winters",
    },
    {
        name: "Auckland",
        flyingDays: "280 Days",
        weather: "Subtropical with mild, Humid summers",
    },
];

const aircraftFleet = [
    {
        name: "Tecnam (SE)",
        description: "A versatile and fuel-efficient trainer, perfect for ab-initio and cross-country training. Equipped with modern avionics and responsive handling, it's widely used for PPL, CPL, and navigation exercises.",
    },
    {
        name: "Tecnam (ME)",
        description: "A modern twin-engine trainer used for Multi-Engine Rating and Instrument flight training, offering advanced avionics, fuel efficiency, and an ideal platform for transitioning to complex aircraft operations.",
    },
    {
        name: "Diamond (DA42)",
        description: "Used for advanced multi-engine and instrument training, the DA42 features modern avionics and high performance, preparing students for complex flight operations and airline-level proficiency.",
    },
];

const benefitsOfTraining = [
    "Excellent flying weather throughout the year, allowing faster course completion",
    "Globally recognised CAA NZ training standards, opening doors to airlines worldwide",
    "Diverse terrain and coastal conditions that build strong piloting skills and confidence",
    "Safe, clean, and student-friendly country ideal for international aviation students",
    "Student work visa allows 20 hrs/week work",
    "Clear post-training pathways with strong industry reputation and global acceptance",
];

const faqs = [
    {
        question: "What is the minimum age requirement for pilot training in New Zealand?",
        answer: "You must be at least 17 years old to begin pilot training and 18 years old to obtain a Commercial Pilot License (CPL) in New Zealand.",
    },
    {
        question: "What visa do I need for pilot training in New Zealand?",
        answer: "Students require a Student Work Visa that allows you to study full-time and work part-time (20 hours/week) while completing your flight training program.",
    },
    {
        question: "What English proficiency is required?",
        answer: "You need IELTS 5.5 in each component and 6.0 overall to meet the English proficiency requirements for pilot training in New Zealand.",
    },
    {
        question: "How long does it take to complete pilot training in New Zealand?",
        answer: "The complete Commercial Pilot Training program typically takes 12-14 months, covering all stages from CAA ground theory to CPL with Multi-Engine Instrument Rating.",
    },
    {
        question: "What is the total cost of pilot training in New Zealand?",
        answer: "The course fee ranges from NZD 115k to 125k, covering CAA theory lectures, meals, flight training, flight tests, licence issuance, and student pilot kit. Additional costs include travel, transportation, accommodation, living costs, extra flying hours (if required), personal insurance, and medicals.",
    },
    {
        question: "How many flying hours are required for CPL in New Zealand?",
        answer: "Students complete 220-240 hours of flying, covering CAA and DGCA requirements, including dual and solo flights, cross-country, night flying, instrument procedures, and multi-engine operations.",
    },
    {
        question: "Can I work while studying in New Zealand?",
        answer: "Yes, the student work visa allows you to work up to 20 hours per week while completing your flight training program.",
    },
    {
        question: "Can I convert my CAA NZ license to DGCA?",
        answer: "Yes, after completing training in New Zealand, you can return to India and convert your CAA NZ license into a DGCA license by meeting DGCA's conversion requirements and exams.",
    },
    {
        question: "Is the CAA NZ license recognized internationally?",
        answer: "Yes, the CAA NZ licence is internationally recognised and aligned with ICAO standards, making it easily convertible in India and other ICAO member states, opening opportunities for global airline careers.",
    },
];

export default function PilotTrainingNewZealandPage() {
    return (
        <Layout>
            <Helmet>
                <title>Pilot Training New Zealand | CAA-  Commercial Pilot Training</title>
                <meta
                    name="description"
                    content="Train in New Zealand with CAA-  flight schools. 12-14 months CPL training, 220-240 flying hours, diverse flying environments. DGCA license conversion available. Apply now."
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
                            PILOT TRAINING NEW ZEALAND
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Commercial Pilot Training in New Zealand
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            New Zealand is a leading destination for aspiring commercial pilots, known for its world-class
                            flight academies, CAA-  training programs, and diverse flying environments. With structured
                            courses, experienced instructors, and internationally recognized licences, it offers the perfect
                            balance of quality education and practical flight experience. Its excellent weather and global DGCA
                            conversion compatibility make New Zealand an ideal choice for pilot training.
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
                            Why Choose New Zealand for Pilot Training?
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Experience world-class training with CAA certification and perfect balance of quality education
                            and practical flight experience.
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
                            Check if you meet the requirements to begin your pilot training journey in New Zealand.
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
                                Covers CAA and DGCA requirements
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
                        Structured program combining theory and hands-on flying, from PPL to CPL. Conducted under New Zealand
                        CAA and DGCA standards for globally recognized certification and real-world experience.
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
                            Structured progression from CAA ground theory to CPL with Multi-Engine Instrument Rating
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
                                        <h3 className="font-bold text-xl mb-4">{stage.stage}</h3>
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
                            New Zealand Pilot Training - Step by Step Guide
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Follow these steps to begin your pilot training journey in New Zealand
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
                            Pilot Academies in New Zealand
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            CAA-  flying schools with modern fleets and experienced instructors
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                            Popular Pilot Training Locations in New Zealand
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose from locations offering excellent weather conditions and diverse flying environments
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
                            Types Of Fleets Available For Flight Training In New Zealand
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Train on modern, well-maintained aircraft with advanced avionics
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
                            Benefits Of Training In New Zealand
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
                                Commercial Pilot Training program in New Zealand offers Indian students a clear pathway to
                                obtain a CAA NZ Commercial Pilot Licence (CPL) with Multi-Engine Instrument Rating (MEIR),
                                fully aligned with ICAO standards and suitable for DGCA licence conversion.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                Training is delivered through CAA-certified flight schools, ensuring high operational standards,
                                structured learning, and world-class flying exposure in diverse weather and terrain.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                Graduates complete the program with a licence that is internationally recognised and easily
                                convertible in India and other ICAO member states, opening opportunities for global airline
                                careers with a strong professional foundation.
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
                            Common questions about pilot training in New Zealand
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
                            Start Your Pilot Journey in New Zealand Today
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            With CAA-  training, diverse flying environments, excellent weather conditions, and
                            experienced instructors, New Zealand offers everything you need to build a successful aviation
                            career. Take the first step towards your dream of becoming a professional pilot with internationally
                            recognized certification and seamless DGCA conversion. Work part-time while you train and
                            experience the perfect balance of quality education and practical flight experience.
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
