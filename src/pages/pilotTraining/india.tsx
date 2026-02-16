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
        title: "DGCA-  Training",
        description: "Aligned with Indian aviation standards and regulations",
    },
    {
        icon: Plane,
        title: "Modern Fleet",
        description: "Train on Cessna 172, Tecnam, Piper Archer, and Diamond aircraft",
    },
    {
        icon: Sun,
        title: "300+ Flying Days",
        description: "Excellent weather conditions across major bases",
    },
    {
        icon: MapPin,
        title: "Close to Home",
        description: "Quality training facilities across India",
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
        description: "Must hold a valid DGCA Class 1 Medical Certificate issued by DGCA medical examiner to ensure physical fitness for flying.",
    },
    {
        icon: FileCheck,
        title: "Valid Passport",
        description: "A current passport is mandatory for identification and for students pursuing any part of their training abroad.",
    },
    {
        icon: FileCheck,
        title: "Police Clearance Certificate (PCC)",
        description: "A valid Police Clearance Certificate (PCC), valid for 6 months, is required to begin flight training at any Indian FTO.",
    },
];

const courseDetails = {
    duration: "14-16 MONTHS",
    flyingHours: "200 Hrs",
    courseFee: "INR 58lakhs - 60lakhs",
};

const courseCoverage = [
    "Study Material",
    "Flight Training",
    "Checkride Flights",
    "License Insurance",
];

const additionalCosts = [
    "Extra Flying Hours (if required)",
    "Theory Classes",
    "Accommodation & Living Costs",
    "Written Exams",
    "Personal Insurance",
    "Medicals",
];

const trainingStages = [
    {
        stage: "DGCA Theory Ground Class",
        duration: "3-4 Months",
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
        stage: "SPL + Oral Exam",
        duration: "1-2 Months",
        flyingHours: "0 hrs",
        highlights: [
            "Radio Telephony (RT) Basics",
            "Pre-Flight Briefings & Safety Checks",
            "Oral Exam Preparation",
        ],
    },
    {
        stage: "Solo Flight Training",
        duration: "2 Months",
        flyingHours: "15-20 hrs",
        highlights: [
            "Circuit flying",
            "Take-offs and landings",
            "Basic manoeuvres",
            "Radio communication practice",
            "Emergency procedures",
        ],
    },
    {
        stage: "Hour Building + Checks",
        duration: "6 months",
        flyingHours: "20-185 hrs",
        highlights: [
            "Cross-country flights",
            "Navigation exercises",
            "Instrument flying",
            "Flight planning",
            "Progress checks with CFI",
        ],
    },
    {
        stage: "Multi-Engine Rating + Checks",
        duration: "2 Months",
        flyingHours: "185-200 hrs",
        highlights: [
            "Asymmetric flight handling",
            "Engine failure drills",
            "Multi-engine instrument flying",
            "Emergency procedures",
            "DGCA skill test and endorsement",
        ],
    },
];

const stepByStepGuide = [
    {
        step: 1,
        title: "Medicals",
        description: "Obtain a valid DGCA Class 1 medical (for CPL pathway) from an authorised AME to confirm fitness for professional flying.",
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
        description: "Select a DGCA-  FTO based on fleet, instructor experience, placement outcomes and student support services.",
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
        name: "Flying School 01",
        location: "Maharashtra, India",
        duration: "14 - 16 Months",
        fleetSize: "17 Aircrafts",
        aircraft: "Cessna 172, Tecnam (ME), Piper Archer",
        flyingHours: "200 Hrs",
    },
    {
        name: "Flying School 02",
        location: "Gujarat, India",
        duration: "14 - 16 Months",
        fleetSize: "10 Aircrafts",
        aircraft: "Tecnam P-Mentor",
        flyingHours: "200 Hrs",
    },
    {
        name: "Flying School 03",
        location: "Rajasthan, India / Gujarat, India",
        duration: "14 - 16 Months",
        fleetSize: "18 Aircrafts",
        aircraft: "Cessna 172, Diamond (DA42)",
        flyingHours: "200 Hrs",
    },
];

const trainingLocations = [
    {
        name: "Maharashtra",
        flyingDays: "270+ Days",
        weather: "Tropical & humid",
    },
    {
        name: "Gujarat",
        flyingDays: "300+ Days",
        weather: "Dry & clear",
    },
    {
        name: "Rajasthan",
        flyingDays: "320+ Days",
        weather: "Arid & sunny",
    },
];

const aircraftFleet = [
    {
        name: "Cessna 172",
        description: "Single-engine Four-seat trainer and cross-country aircraft, ideal for PPL training, night flying, and navigation practice. Perfect for students to gain real flight experience.",
    },
    {
        name: "Tecnam (ME)",
        description: "A modern twin-engine trainer used for Multi-Engine Rating and Instrument flight training, offering advanced avionics, fuel efficiency, and an ideal platform for transitioning to complex aircraft operations.",
    },
    {
        name: "Piper Archer",
        description: "A reliable four-seat trainer equipped with modern avionics, ideal for PPL and CPL training. Known for its stable handling and performance, it helps students master navigation, cross-country, and instrument flying skills.",
    },
    {
        name: "Tecnam P-Mentor",
        description: "A next-generation training aircraft featuring advanced glass cockpit avionics, ideal for ab-initio to CPL training. Efficient, safe, and designed for modern flight training with capabilities for basic instrument and navigation exercises.",
    },
    {
        name: "Diamond (DA42)",
        description: "Used for advanced multi-engine and instrument training, the DA42 features modern avionics and high performance, preparing students for complex flight operations and airline-level proficiency.",
    },
];

const benefitsOfTraining = [
    "DGCA-  training aligned with Indian aviation standards",
    "Close to home with quality training facilities",
    "Experienced instructors and modern aircraft",
    "Diverse weather and terrain for real-world exposure",
    "300+ flying days a year across major bases",
    "Seamless DGCA licence conversion for airline readiness",
];

const faqs = [
    {
        question: "What is the minimum age requirement for pilot training in India?",
        answer: "You must be at least 17 years old to begin pilot training and 18 years old to obtain a Commercial Pilot License (CPL) in India.",
    },
    {
        question: "What educational qualifications do I need?",
        answer: "You need to have completed 10+2 with Physics and Mathematics or an equivalent qualification. Non-science students can qualify through NIOS.",
    },
    {
        question: "How long does it take to complete pilot training in India?",
        answer: "The complete Commercial Pilot Training program typically takes 14-16 months, including ground theory, flight training, and all required examinations.",
    },
    {
        question: "What is the total cost of pilot training in India?",
        answer: "The course fee ranges from INR 58 lakhs to 60 lakhs, covering study material, flight training, checkride flights, and license insurance. Additional costs include extra flying hours (if required), accommodation, written exams, personal insurance, and medicals.",
    },
    {
        question: "How many flying hours are required for CPL?",
        answer: "Students must complete 200 hours of structured flight training, including Instrument Rating (IR) and Multi-Engine training under DGCA regulations.",
    },
    {
        question: "What medical certificate is required?",
        answer: "You must hold a valid DGCA Class 1 Medical Certificate issued by a DGCA medical examiner to ensure physical fitness for flying.",
    },
    {
        question: "Which locations in India are best for pilot training?",
        answer: "Maharashtra, Gujarat, and Rajasthan are popular locations offering 270-320+ flying days per year with diverse weather conditions ranging from tropical and humid to dry and arid.",
    },
    {
        question: "Is the DGCA license recognized internationally?",
        answer: "Yes, the DGCA-  Commercial Pilot License is recognized globally and qualifies graduates for airline careers within India and across international aviation networks.",
    },
];

export default function PilotTrainingIndiaPage() {
    return (
        <Layout>
            <Helmet>
                <title>Pilot Training India | DGCA-  Commercial Pilot Training</title>
                <meta
                    name="description"
                    content="Start your pilot journey with DGCA-  flight schools in India. 14-16 months CPL training, 200 flying hours, modern aircraft fleet. Get complete course details and apply now."
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
                            PILOT TRAINING INDIA
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Commercial Pilot Training in India
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            India's aviation industry is growing rapidly, offering aspiring pilots a strong foundation
                            through DGCA-  flight schools and structured Commercial Pilot Training programs. With
                            modern training aircraft, advanced simulators, and increasing airline opportunities, India
                            provides a comprehensive environment to begin your flying journey.
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
                            Commercial Pilot Eligibility
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Overview</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Commercial Pilot License With Multi Engine Instrument Rating (CPL-MEIR)
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
                                From SPL to CPL including IR and Multi-Engine training
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
                                Comprehensive training package with license support
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
                        The pilot training program combines classroom theory with in-flight training, guiding students
                        step by step through all license stages to build confidence, proficiency and achieve their
                        Commercial Pilot license.
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
                            Pilot Academies in India
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            DGCA-  flying schools with modern fleets and experienced instructors
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
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Popular Pilot Training Locations in India
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose from locations offering excellent weather conditions and flying days
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
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Types Of Fleets Available For Flight Training In India
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Train on modern, well-maintained aircraft with advanced avionics
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
                            Benefits Of Training In India
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
                                Commercial Pilot Training program in India provides aspiring pilots with a well-structured
                                pathway to obtain a DGCA-  Commercial Pilot Licence (CPL) along with Multi-Engine
                                and Instrument Ratings.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                Conducted at DGCA-certified Flying Training Organisations, the program combines extensive
                                ground classes with practical flight experience in diverse weather and airspace conditions.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                The training adheres to the highest national aviation standards, ensuring students develop
                                strong technical and operational skills.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                Upon completion, graduates earn a DGCA-recognised licence, qualifying them for airline
                                careers within India and across global aviation networks.
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
                            With DGCA-  training, modern aircraft, experienced instructors, and excellent weather
                            conditions, India offers everything you need to build a successful aviation career. Take the
                            first step towards your dream of becoming a professional pilot.
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