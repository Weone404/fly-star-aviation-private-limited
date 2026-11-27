 import { motion } from "framer-motion";
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
import { PAGE_FAQS } from "@/lib/schema";

const RTR_RULES_URL =
    "https://civilaviation.gov.in/sites/default/files/2025-11/telephone-operator-restricted-certificate-and-licence-rules-2025.pdf";

const rtrHighlights = [
    {
        icon: Award,
        title: "Certificate and Licence",
        description: "A single Certificate and Licence is required to operate specified radiotelephone services",
    },
    {
        icon: Shield,
        title: "Written and Practical Exams",
        description: "The 2025 rules specify both stages and require the written exam to be passed first",
    },
    {
        icon: Globe,
        title: "Official Process",
        description: "Applications and examinations follow directions of the Director General of Civil Aviation",
    },
    {
        icon: Target,
        title: "Defined Scope",
        description: "The rules limit its operational scope and require a valid licence",
    },
];

const rtrImportance = [
    "Rule 3 requires a valid Certificate and Licence for specified aircraft-station or aeronautical mobile/satellite radio services",
    "Rule 6 sets minimum age at 16 and Class X or equivalent education for exam eligibility",
    "Rule 8 requires both written and practical examinations",
    "Rule 10 requires the holder to meet the issue requirements and Rule 11 sets licence validity",
    "The rules do not establish an airline employment, selection or salary outcome",
];

const eligibilityRequirements = [
    {
        icon: Calendar,
        title: "Minimum Age",
        description: "Rule 6 requires the applicant to have attained 16 years of age",
    },
    {
        icon: BookOpen,
        title: "Education",
        description: "Rule 6 requires Class X or equivalent from a recognised Board",
    },
    {
        icon: Languages,
        title: "Application",
        description: "Applications are made to the Director General in the form specified by DGCA",
    },
    {
        icon: Shield,
        title: "Foreign Applicants",
        description: "Rule 6 requires Government of India security clearance for non-citizen applicants",
    },
];

const rtrTypes = [
    {
        type: "RTR (Aero)",
        subtitle: "Radio Telephony Restricted (Aeronautical)",
        icon: Radio,
        highlights: [
            "Used for radiotelephone operation in the scope defined by the 2025 rules",
            "Rule 12 recognises aircraft-station and aeronautical mobile radiotelephone services",
            "The rules require the certificate for specified aircraft radio operations",
            "Current CPL implications should be checked against DGCA licensing requirements",
        ],
    },
    {
        type: "RTR (Maritime)",
        subtitle: "For Maritime Industry Professionals",
        icon: Radio,
        highlights: [
            "Rule 12 also allows the Certificate and Licence to support radio services in defined maritime mobile scopes",
            "The rule text limits operation through technical and frequency conditions",
            "This page does not set a separate maritime eligibility or examination claim",
            "Check the current competent-authority notice for the service you intend to operate",
        ],
    },
];

const examStructure = [
    {
        part: "Written Examination",
        subtitle: "Rules and Radio Procedures",
        duration: "Format set by DGCA",
        icon: Radio,
        details: [
            "Rule 8 requires a practical examination",
            "The practical test uses an on-phone simulated environment",
            "It covers radio working procedures and associated communications",
            "Passing is subject to the rule's written-examination requirement",
        ],
    },
    {
        part: "Practical Examination",
        subtitle: "Radio Telephony Working",
        duration: "Current details must be confirmed",
        icon: Users,
        details: [
            "The 2025 rules establish written and practical examinations",
            "The 2025 rules do not publish fixed duration or a separate oral structure",
            "A listed practical syllabus is subject to the syllabus specified by DGCA",
            "Check the current DGCA examination notice before relying on any format",
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
        title: "Current Licence for Radio Operation",
        description: "The rules require a valid certificate for defined aircraft-station and aeronautical mobile radio services",
    },
    {
        icon: TrendingUp,
        title: "Written and Practical Preparation",
        description: "The rule framework requires preparation for written and practical examination stages",
    },
    {
        icon: Globe,
        title: "Foreign Recognition Not Established",
        description: "The 2025 rules do not state a foreign licence-recognition or conversion outcome",
    },
    {
        icon: CheckCircle,
        title: "No Employment Guarantee",
        description: "Holding or preparing for the Certificate and Licence does not guarantee selection or employment",
    },
];

const examChallenges = [
    {
        challenge: "Seat Availability",
        description: "Current seat availability and competition are not specified in the 2025 rules",
        icon: Users,
    },
    {
        challenge: "Exam Format",
        description: "The official rule identifies written and practical stages; current format details are set in DGCA directions",
        icon: AlertTriangle,
    },
    {
        challenge: "Limited Attempts",
        description: "A failed applicant must wait six weeks before re-examination",
        icon: Calendar,
    },
    {
        challenge: "Language or Medical Claim",
        description: "The 2025 rules do not state an additional medical certificate or ICAO English level",
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
        tip: "Stay Calm in the Exam",
        description: "Panel checks confidence and clarity, remain composed",
        icon: Shield,
    },
];

const examDetails = {
    conductedBy: "DGCA examination process under Central Government rules",
    frequency: "Set by DGCA",
    locations: "Set by DGCA",
    validity: "Until age 80 unless suspended or cancelled",
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

const faqs = PAGE_FAQS["/rtr"];

export default function RTRPage() {
    return (
        <Layout>

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
                            A rule-based guide to the RTR(A) Certificate and Licence under the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025. It explains the provisions directly supported by the official notification and identifies current details that must be confirmed with DGCA.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/contact">
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
                                In the present world of communication and technology, abbreviations are being used to replace lengthy terms. Among such abbreviations, RTR holds significant importance, and the full form of RTR varies according to the area of usage. However, the most common full form of RTR, as applied to the fields of aviation and telecommunication, is:
                            </p>
                            <div className="p-8 rounded-2xl border-2 border-primary bg-primary/5 text-center my-8">
                                <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
                                    RTR – Radio Telephony Restricted
                                </p>
                            </div>
                            <p className="text-muted-foreground text-lg mb-4">
                                The 2025 rules state that the Central Government may grant or extend the Certificate and Licence and that the Director General of Civil Aviation administers specified application, examination and direction processes.
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
                                <strong>RTR(A) is commonly used for Radio Telephone Operator (Restricted), Aeronautical.</strong> The official rules call the instrument a Radio Telephone Operator (Restricted) Certificate and Licence.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                In aviation, the rules recognise operation of specified aircraft-station and aeronautical mobile radiotelephone services. They do not establish every CPL or employer requirement.
                            </p>
                            <div className="p-6 rounded-xl bg-primary/10 border-l-4 border-primary">
                                <p className="text-lg font-semibold">
                                    Rule 3: operate or attempt to operate specified aircraft-station or aeronautical mobile/satellite radiotelephone services only with a valid Certificate and Licence issued or recognised under these rules.
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
                            Official 2025 RTR Rules
                        </h2>
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <p className="text-muted-foreground text-lg mb-4">
                                With the advent of World War I and II, radio communication became an essential aspect of the war, and aircraft and ships needed to have effective communication systems. After the emergence of civil aviation, countries began to control radio frequencies and issue radio operator licenses.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                The official 2025 notification is issued by the Ministry of Civil Aviation under the Bharatiya Vayuyan Adhiniyam, 2024 and names the Central Government and Director General of Civil Aviation in the licensing framework.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                The rules refer to Radio Regulations adopted by the World Radiocommunication Conference. They do not themselves state that an Indian licence is automatically recognised in another country.</p>
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
                            The 2025 rules recognise defined aeronautical and maritime mobile radiotelephone scopes
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
                            Rule 8 provides written and practical examinations. The Director General sets the form,
                            centres, invigilators and procedure; the 2025 rules do not publish a fixed annual frequency or city list.
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
                                        Candidates must pass the <strong>written examination before appearing for the practical examination</strong>
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">
                                        Rule 8 provides for practical attempts within three years of passing the written examination and additional written requirements after repeated practical failure
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
                            Topics to Confirm Against the DGCA Syllabus
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            These examples are not a verified or complete DGCA RTR(A) syllabus. Use them only as questions for the course provider, and confirm the current official syllabus and examination notice before relying on any topic.
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
                    <div className="max-w-3xl mx-auto mt-12">
                        <h3 className="text-xl md:text-2xl font-bold mb-4">
                            How to prepare for the RTR(A) examination
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            RTR(A) exam preparation should follow the latest examination notice and the syllabus specified by the Director General.
                            When comparing an RTR(A) course or classes, ask which examination components, study
                            materials and practice sessions are included; schedules and requirements can change.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Radio communication practice for pilots can include clear message structure, standard
                            aviation phraseology and routine or urgent exchanges. Confirm the current syllabus and
                            assessment format with the relevant authority before relying on older preparation material.
                        </p>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            Official source:{" "}
                            <a href={RTR_RULES_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                                Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025
                            </a>
                            , Ministry of Civil Aviation/Gazette notification dated 25 June 2025.
                        </p>
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
                            Regulatory and Career Context
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The rules establish the licence framework; they do not guarantee employment outcomes
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
                            In aviation, the official term is Radio Telephone Operator (Restricted), and the abbreviation also has unrelated meanings outside aviation
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
                            Prepare for the written and practical stages using the current DGCA syllabus and notice
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
                                    key={faq.q}
                                    value={`faq-${index}`}
                                    className="bg-card rounded-xl border border-border px-6"
                                >
                                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.a}
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
                            Summary
                        </h2>
                        <div className="p-8 rounded-2xl border border-border bg-card space-y-4">
                            <p className="text-muted-foreground text-lg">
                                The 2025 rules define a <strong>Radio Telephone Operator (Restricted) Certificate and Licence</strong>.
                                The instrument is required for specified aircraft-station and aeronautical mobile/satellite radiotelephone operation.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                The Central Government is the licensing authority. The Director General of Civil Aviation sets application, examination, syllabus and direction details under the rules.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                The abbreviation RTR also has meanings outside aviation. This page discusses the radiotelephone Certificate and Licence only.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                Completing ground preparation does not itself guarantee examination success, licence issue, selection or employment.
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
                            Check Current RTR(A) Guidance
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Flying Star provides RTR(A) ground-preparation guidance. Confirm current eligibility, examination format,
                            fees and operational requirements in the official notification and DGCA directions.
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
