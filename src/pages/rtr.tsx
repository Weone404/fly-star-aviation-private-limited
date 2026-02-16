import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Radio,
    GraduationCap,
    BookOpen,
    Calendar,
    Shield,
    Award,
    Clock,
    FileCheck,
    Globe,
    CheckCircle,
    ArrowRight,
    ChevronRight,
    Users,
    Target,
    Lightbulb,
    AlertTriangle,
    TrendingUp,
    Languages,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const rtrHighlights = [
    {
        icon: Award,
        title: "Mandatory License",
        description: "Essential certification for all commercial pilots and ATCs",
    },
    {
        icon: Shield,
        title: "Aviation Safety",
        description: "Ensures effective emergency and routine communications",
    },
    {
        icon: Globe,
        title: "Global Recognition",
        description: "ICAO-approved phraseology and international standards",
    },
    {
        icon: Target,
        title: "Career Essential",
        description: "Required for CPL and airline pilot positions",
    },
];

const rtrImportance = [
    "Mandatory for Pilots – Essential for Commercial Pilot License (CPL)",
    "Ensures Safety – Handle emergency communications efficiently",
    "International Recognition – ICAO-approved phraseology validation",
    "Eligibility for CPL – Required before obtaining Commercial Pilot License",
    "Professional Requirement – Must-have for ATCs and pilots",
    "Legal Compliance – Cannot operate aircraft in controlled airspace without RTR",
];

const eligibilityRequirements = [
    {
        icon: Calendar,
        title: "Minimum Age",
        description: "Must be at least 18 years old to appear for RTR examination",
    },
    {
        icon: BookOpen,
        title: "Education",
        description: "10+2 with Physics and Mathematics (same as CPL eligibility)",
    },
    {
        icon: Languages,
        title: "Language Proficiency",
        description: "Good command of English (ICAO Level 4 or higher recommended)",
    },
    {
        icon: Shield,
        title: "Medical Certificate",
        description: "Must hold a Class 2/1 Medical Certificate approved by DGCA",
    },
];

const rtrTypes = [
    {
        type: "RTR (Aero)",
        subtitle: "Radio Telephony Restricted (Aeronautical)",
        icon: Radio,
        highlights: [
            "Required by pilots and air traffic controllers",
            "Allows communication between aircraft and ground stations",
            "Focuses on aviation phraseology and emergency procedures",
            "Mandatory for all commercial aviation operations",
        ],
    },
    {
        type: "RTR (Maritime)",
        subtitle: "For Maritime Industry Professionals",
        icon: Radio,
        highlights: [
            "Required for ship captains and marine officers",
            "Ensures communication between ships and port authorities",
            "Radio operators in maritime industry must hold this",
            "Communication between vessels and coastal stations",
        ],
    },
];

const examStructure = [
    {
        part: "Part 1: Practical Test",
        subtitle: "Transmission & Reception",
        duration: "30-45 Minutes",
        icon: Radio,
        details: [
            "Radio telephony procedures testing",
            "Aviation phraseology usage",
            "Emergency handling and distress calls",
            "Communication techniques evaluation",
            "Conducted in simulated environment",
        ],
    },
    {
        part: "Part 2: Viva Voice",
        subtitle: "Oral Examination",
        duration: "20-30 Minutes",
        icon: Users,
        details: [
            "Panel includes DGCA and WPC representatives",
            "Radio communication rules & regulations",
            "ICAO communication standards",
            "Meteorology & navigation terms",
            "Aviation safety procedures",
            "Emergency scenario handling",
        ],
    },
];

const syllabusCoverage = [
    {
        title: "Radio Communication Procedures",
        topics: ["Standard phraseology", "Call signs and identifications", "Message transmission formats"],
    },
    {
        title: "ICAO Aviation English & Phraseology",
        topics: ["Standard ICAO terminology", "Aviation English proficiency", "International communication standards"],
    },
    {
        title: "Aircraft Communication Systems",
        topics: ["VHF radio operations", "Communication equipment", "Frequency management"],
    },
    {
        title: "Emergency Procedures & Distress Calls",
        topics: ["Mayday and Pan-Pan calls", "Emergency communications", "Urgency procedures"],
    },
    {
        title: "Telegraph Act & Wireless Rules",
        topics: ["Indian Telegraph Act", "Wireless Telegraphy Rules", "Regulatory compliance"],
    },
    {
        title: "Navigation and Meteorology",
        topics: ["Basic navigation terms", "Weather communication", "METAR/TAF readings"],
    },
];

const careerBenefits = [
    {
        icon: Award,
        title: "Mandatory Step for Pilots",
        description: "Cannot obtain CPL without RTR license clearance",
    },
    {
        icon: TrendingUp,
        title: "Better Job Opportunities",
        description: "Airlines prefer candidates with RTR already completed",
    },
    {
        icon: Globe,
        title: "International Career",
        description: "Globally recognized for working abroad as pilot or ATC",
    },
    {
        icon: CheckCircle,
        title: "Professional Credibility",
        description: "Demonstrates strong communication and regulatory knowledge",
    },
];

const examChallenges = [
    {
        challenge: "High Competition",
        description: "Limited seats available per exam session",
        icon: Users,
    },
    {
        challenge: "Oral Exam Pressure",
        description: "Many candidates fail in viva voice examination",
        icon: AlertTriangle,
    },
    {
        challenge: "Limited Attempts",
        description: "Exam conducted only a few times yearly",
        icon: Calendar,
    },
    {
        challenge: "Aviation English",
        description: "Requirement of fluent aviation English proficiency",
        icon: Languages,
    },
];

const examTips = [
    {
        tip: "Practice Radio Calls Daily",
        description: "Listen to and practice with ATC recordings regularly",
        icon: Radio,
    },
    {
        tip: "Master ICAO Phraseology",
        description: "Focus on standard phraseology instead of casual English",
        icon: BookOpen,
    },
    {
        tip: "Study Regulations",
        description: "Learn communication rules from DGCA-approved books",
        icon: FileCheck,
    },
    {
        tip: "Join Training Institute",
        description: "Enroll in RTR training for mock tests and oral preparation",
        icon: GraduationCap,
    },
    {
        tip: "Stay Calm in Viva",
        description: "Panel checks confidence and clarity, remain composed",
        icon: Shield,
    },
];

const examDetails = {
    conductedBy: "WPC Wing, Ministry of Communications",
    frequency: "6 times per year",
    locations: "Delhi, Mumbai, Chennai, Kolkata",
    validity: "Lifetime (unless suspended or canceled)",
};

const otherRTRMeanings = [
    {
        field: "Accounting & Finance",
        fullForm: "Record to Report",
        description: "Process involving collection, processing, and delivering business reports",
    },
    {
        field: "Technology",
        fullForm: "Real-Time Rendering",
        description: "Used in computer graphics and gaming for live rendering of visuals",
    },
    {
        field: "Business",
        fullForm: "Ready to Run",
        description: "Products or services that are pre-configured and ready for immediate use",
    },
    {
        field: "Manufacturing",
        fullForm: "Release to Ramp",
        description: "Phase in product development before mass production begins",
    },
];

const faqs = [
    {
        question: "What is the full form of RTR in aviation?",
        answer: "RTR stands for Radio Telephony Restricted. It is a professional license that certifies an individual's ability to operate radio communication equipment in the aviation sector, issued by the Wireless Planning and Coordination (WPC) Wing of the Ministry of Communications, Government of India.",
    },
    {
        question: "Is RTR mandatory for becoming a commercial pilot?",
        answer: "Yes, RTR is absolutely mandatory for obtaining a Commercial Pilot License (CPL) in India. Without clearing the RTR exam, you cannot legally operate an aircraft in controlled airspace as communication is a crucial part of aviation safety.",
    },
    {
        question: "What is the minimum age requirement for RTR exam?",
        answer: "The minimum age to appear for the RTR (Aero) examination is 18 years. You must also have completed 10+2 with Physics and Mathematics and hold a valid DGCA medical certificate.",
    },
    {
        question: "How many times is the RTR exam conducted in a year?",
        answer: "The RTR exam is generally conducted six times a year by the WPC Wing of the Ministry of Communications. The exam is held in major cities including Delhi, Mumbai, Chennai, and Kolkata.",
    },
    {
        question: "What are the two parts of the RTR exam?",
        answer: "The RTR exam consists of two parts: Part 1 - Practical Test (Transmission & Reception) where candidates are tested on radio telephony procedures, and Part 2 - Viva Voice (Oral Examination) conducted by a panel including DGCA and WPC representatives. Both parts must be cleared in the same attempt.",
    },
    {
        question: "How long is the RTR license valid?",
        answer: "RTR (Aero) is valid for life, unless suspended or canceled by authorities. Unlike medical certificates and CPL renewals, RTR does not require periodic re-validation.",
    },
    {
        question: "What is the difference between RTR (Aero) and RTR (Maritime)?",
        answer: "RTR (Aero) is for pilots and air traffic controllers, focusing on aircraft-to-ground communication and aviation phraseology. RTR (Maritime) is for ship captains, marine officers, and radio operators, ensuring communication between ships and port authorities or other vessels.",
    },
    {
        question: "Is RTR recognized internationally?",
        answer: "Yes, RTR is recognized globally as it validates that the candidate is capable of using standardized aviation English and ICAO-approved phraseology. This helps pilots work internationally in aviation careers.",
    },
    {
        question: "What happens if I fail one part of the RTR exam?",
        answer: "If a candidate passes only one part (either Part 1 or Part 2), they get a chance to clear the remaining part in the next attempt. However, for complete certification, both parts must be successfully cleared.",
    },
    {
        question: "How can I prepare for the RTR viva voice examination?",
        answer: "To prepare for the viva, practice radio calls daily with ATC recordings, focus on standard ICAO phraseology, study communication rules from DGCA-approved books, join an RTR training institute for mock tests, and maintain confidence during the oral examination.",
    },
];

export default function RTRPage() {
    return (
        <Layout>
            <Helmet>
                <title>RTR Full Form - Radio Telephony Restricted | Complete Guide 2026</title>
                <meta
                    name="description"
                    content="Complete guide to RTR (Radio Telephony Restricted) - meaning, importance, types, eligibility, exam pattern, preparation tips. Essential license for pilots and ATCs in India."
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
                            RTR - RADIO TELEPHONY RESTRICTED
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            RTR Full Form – Radio Telephony Restricted
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Complete guide covering RTR meaning, importance, types, eligibility, exam pattern, challenges,
                            and preparation tips for 2026. Essential license for commercial pilots and air traffic controllers
                            in India, issued by the WPC Wing of the Ministry of Communications.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Start Your Journey
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Get Expert Guidance</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                            Introduction to RTR
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-muted-foreground text-lg mb-4">
                                In today's world of communication and technology, abbreviations are commonly used to simplify
                                lengthy terms. One such important abbreviation is RTR, which holds different meanings depending
                                on the field of use. However, in aviation and telecommunication, the most widely recognized full
                                form of RTR is:
                            </p>
                            <div className="p-8 rounded-2xl border-2 border-primary bg-primary/5 text-center my-8">
                                <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
                                    RTR – Radio Telephony Restricted
                                </p>
                            </div>
                            <p className="text-muted-foreground text-lg mb-4">
                                RTR is an essential license issued by the <strong>Wireless Planning and Coordination (WPC) Wing</strong> of
                                the Ministry of Communications, Government of India, under the Department of Telecommunications.
                                It plays a significant role for pilots, air traffic controllers (ATCs), and other professionals
                                involved in air-to-ground and ground-to-air communication.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What is RTR */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <Radio className="h-16 w-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                What is RTR?
                            </h2>
                        </div>
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <p className="text-muted-foreground text-lg mb-4">
                                <strong>RTR stands for Radio Telephony Restricted.</strong> It is a professional license that certifies
                                an individual's ability to operate radio communication equipment in the aviation and maritime sectors.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                In aviation, RTR ensures that pilots and ATCs can communicate effectively using radio telephony,
                                which is the standard method of exchanging vital information related to aircraft operations,
                                navigation, and safety.
                            </p>
                            <div className="p-6 rounded-xl bg-primary/10 border-l-4 border-primary">
                                <p className="text-lg font-semibold">
                                    ⚠️ Without an RTR license, a pilot cannot legally operate an aircraft in controlled airspace,
                                    as communication is a crucial part of aviation safety.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* RTR Highlights */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why RTR is Essential?
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            RTR certification is fundamental for aviation communication and safety operations
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {rtrHighlights.map((item, index) => (
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

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <h3 className="text-2xl font-bold mb-6">Importance of RTR in Aviation</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {rtrImportance.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* History and Background */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                            History and Background of RTR
                        </h2>
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <p className="text-muted-foreground text-lg mb-4">
                                Radio communication became a necessity during <strong>World War I and II</strong>, where aircraft and ships
                                required reliable communication methods. After the development of civil aviation, countries started
                                regulating radio frequencies and licensing radio operators.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                In India, the <strong>Wireless Planning and Coordination (WPC) Wing</strong> under the Ministry of Communications
                                took charge of monitoring and issuing radio licenses, including RTR.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                The RTR license evolved into a global requirement aligned with <strong>ICAO (International Civil Aviation
                                    Organization)</strong> standards, ensuring standardized communication procedures across the aviation industry worldwide.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Types of RTR */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Types of RTR Licenses
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            In India, there are two main categories of RTR licenses
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {rtrTypes.map((type, index) => (
                            <motion.div
                                key={type.type}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    <type.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-2xl mb-2">{type.type}</h3>
                                <p className="text-muted-foreground mb-6">{type.subtitle}</p>
                                <div className="space-y-3">
                                    {type.highlights.map((highlight, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-muted-foreground">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mt-12"
                    >
                        <div className="p-6 rounded-xl bg-primary/10 border-l-4 border-primary">
                            <p className="text-lg font-semibold">
                                Since most students and professionals seek RTR in aviation, the focus of this guide is on
                                <strong> RTR (Aero)</strong> for pilots and aviation professionals.
                            </p>
                        </div>
                    </motion.div>
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
                            Eligibility for RTR (Aero)
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Check if you meet the requirements to appear for RTR examination
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Exam Structure */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            RTR (Aero) Examination Process
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            The RTR exam is conducted by the WPC Wing of the Ministry of Communications.
                            Exam is held six times a year in Delhi, Mumbai, Chennai, and Kolkata.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
                        {examStructure.map((part, index) => (
                            <motion.div
                                key={part.part}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    <part.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-2xl mb-2">{part.part}</h3>
                                <p className="text-muted-foreground mb-2">{part.subtitle}</p>
                                <p className="text-sm text-primary font-semibold mb-6 flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Duration: {part.duration}
                                </p>
                                <div className="space-y-3">
                                    {part.details.map((detail, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-muted-foreground">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="p-8 rounded-2xl border-2 border-primary bg-primary/5">
                            <h3 className="text-xl font-bold mb-4 text-center">Passing Criteria</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">
                                        Candidates must clear <strong>both Part 1 and Part 2 in the same attempt</strong>
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">
                                        If a candidate passes only one part, they get a chance to clear the remaining part in the next attempt
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-4 gap-6 mt-12"
                    >
                        <div className="p-6 rounded-xl bg-card border border-border text-center">
                            <p className="text-sm text-muted-foreground mb-2">Conducted By</p>
                            <p className="font-bold">{examDetails.conductedBy}</p>
                        </div>
                        <div className="p-6 rounded-xl bg-card border border-border text-center">
                            <p className="text-sm text-muted-foreground mb-2">Frequency</p>
                            <p className="font-bold text-primary">{examDetails.frequency}</p>
                        </div>
                        <div className="p-6 rounded-xl bg-card border border-border text-center">
                            <p className="text-sm text-muted-foreground mb-2">Locations</p>
                            <p className="font-bold">{examDetails.locations}</p>
                        </div>
                        <div className="p-6 rounded-xl bg-card border border-border text-center">
                            <p className="text-sm text-muted-foreground mb-2">Validity</p>
                            <p className="font-bold text-primary">{examDetails.validity}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Syllabus */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Syllabus for RTR (Aero)
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive coverage of all essential topics for RTR examination
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {syllabusCoverage.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <BookOpen className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-4">{item.title}</h3>
                                <ul className="space-y-2">
                                    {item.topics.map((topic, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Career Benefits */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Career Benefits of RTR
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            How RTR certification enhances your aviation career prospects
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {careerBenefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <benefit.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other RTR Meanings */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            RTR in Other Fields
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            Though in aviation RTR stands for Radio Telephony Restricted, the abbreviation has different
                            full forms in other sectors too
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {otherRTRMeanings.map((meaning, index) => (
                            <motion.div
                                key={meaning.field}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card"
                            >
                                <h3 className="font-bold text-lg mb-2">{meaning.field}</h3>
                                <p className="text-primary font-semibold mb-3">{meaning.fullForm}</p>
                                <p className="text-sm text-muted-foreground">{meaning.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mt-12"
                    >
                        <div className="p-6 rounded-xl bg-primary/10 border-l-4 border-primary">
                            <p className="text-lg font-semibold text-center">
                                RTR has multiple meanings across different industries, but in aviation, it is primarily
                                <strong> Radio Telephony Restricted</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Challenges */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Challenges Faced by Students in RTR Exam
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Understanding common obstacles helps in better preparation
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {examChallenges.map((item, index) => (
                            <motion.div
                                key={item.challenge}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                                    <item.icon className="h-6 w-6 text-destructive" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.challenge}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preparation Tips */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Lightbulb className="h-16 w-16 text-primary mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Tips to Crack RTR Exam
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Expert strategies to excel in both practical and viva voice examinations
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {examTips.map((item, index) => (
                            <motion.div
                                key={item.tip}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.tip}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
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
                            Common questions about RTR (Radio Telephony Restricted) examination
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

            {/* Conclusion */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                            Conclusion
                        </h2>
                        <div className="p-8 rounded-2xl border border-border bg-card space-y-4">
                            <p className="text-muted-foreground text-lg">
                                The full form of <strong>RTR is Radio Telephony Restricted</strong>, a crucial license for aviation
                                and maritime professionals. In aviation, it is mandatory for pilots and ATCs to legally operate
                                aircraft communication systems.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                Conducted by the WPC wing of the Ministry of Communications, the RTR exam ensures that candidates
                                are competent in handling radio communication, emergency procedures, and aviation phraseology.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                Apart from aviation, RTR has different meanings in finance, technology, and business, but its
                                significance in aviation is unmatched.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                For any aspiring commercial pilot in India, <strong>clearing RTR is one of the most important
                                    milestones</strong> in the journey toward flying an aircraft. With proper preparation, practice,
                                and guidance, one can successfully clear RTR and move closer to fulfilling the dream of becoming
                                a pilot.
                            </p>
                        </div>
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
                            Ready to Start Your Pilot Journey?
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Get expert guidance on RTR preparation and complete pilot training. Our experienced counselors
                            will help you navigate the entire process from eligibility to license acquisition.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Expert</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}