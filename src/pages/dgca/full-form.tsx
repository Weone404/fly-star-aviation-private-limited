import { memo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Plane,
    GraduationCap,
    Shield,
    Award,
    Building2,
    CheckCircle,
    ArrowRight,
    FileCheck,
    Users,
    AlertTriangle,
    Globe,
    MapPin,
    Calendar,
    BookOpen,
    Search,
    Settings,
    ClipboardCheck,
    MessageSquare,
    TrendingUp,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Static data (module scope — never recreated) ─────────────────────────────

const dgcaHighlights = [
    { icon: Shield, title: "Top Regulatory Authority", description: "India's supreme aviation safety and regulatory organization" },
    { icon: Globe, title: "International Standards", description: "Aligned with ICAO global aviation norms and protocols" },
    { icon: Award, title: "License Issuing Body", description: "Issues all pilot licenses - CPL, PPL, SPL, ATPL in India" },
    { icon: TrendingUp, title: "Growing Aviation Market", description: "Supporting India's rapidly expanding aviation industry" },
];

const dgcaFunctions = [
    {
        number: "1", title: "Issuing Pilot Licenses", icon: Award,
        description: "DGCA is the supreme authority for issuing all pilot licenses in India. Without DGCA approval, you cannot obtain any aviation license.",
        details: ["Commercial Pilot License (CPL)", "Private Pilot License (PPL)", "Student Pilot License (SPL)", "Airline Transport Pilot License (ATPL)", "All licenses issued after exams and flying hour requirements"],
    },
    {
        number: "2", title: "Aircraft Certification", icon: Plane,
        description: "Before any airplane can fly in India, DGCA thoroughly checks it to ensure everything is working properly, especially new model planes.",
        details: ["Safety inspection of all aircraft", "New model aircraft approval", "Airworthiness certification", "Regular maintenance checks verification", "Only certified aircraft allowed to operate"],
    },
    {
        number: "3", title: "Monitoring Aviation Institutes", icon: GraduationCap,
        description: "No aviation academy can operate without DGCA permission. They must meet all eligibility criteria set by DGCA.",
        details: ["DGCA-approved instructors mandatory", "Training standards verification", "Aircraft fleet inspection", "National and international standard compliance", "Regular monitoring and audits"],
    },
    {
        number: "4", title: "Ensuring Safety Standards", icon: Shield,
        description: "DGCA sets comprehensive rules that airlines must follow to ensure passenger and operational safety.",
        details: ["Safety protocols establishment", "Maintenance check requirements", "Operational guidelines for airlines", "Crew member training standards", "Emergency procedure protocols"],
    },
    {
        number: "5", title: "Handling Passenger Complaints", icon: MessageSquare,
        description: "DGCA is the authority that can hold airlines accountable for passenger grievances and service issues.",
        details: ["Flight delay complaint resolution", "Airline service quality monitoring", "Passenger rights enforcement", "Refund and compensation matters", "Customer service standards oversight"],
    },
    {
        number: "6", title: "Investigating Incidents", icon: Search,
        description: "In case of flight incidents or emergencies, DGCA investigates thoroughly to prevent future occurrences.",
        details: ["Accident investigation procedures", "Safety breach analysis", "Root cause identification", "Preventive measures implementation", "Industry-wide safety improvements"],
    },
];

const pilotCareerSteps = [
    { step: 1, title: "DGCA-Approved Flying School", description: "Get admission to a flying school that is approved and certified by DGCA", icon: GraduationCap },
    { step: 2, title: "Medical Tests", description: "Pass Class 2 and Class 1 medical tests as per DGCA medical standards", icon: Shield },
    { step: 3, title: "Clear DGCA Exams", description: "Pass DGCA theory exams including Air Navigation, Meteorology, Regulations, and more", icon: BookOpen },
    { step: 4, title: "Log Flying Hours", description: "Complete minimum flying hours - typically 200 hours for Commercial Pilot License (CPL)", icon: Plane },
    { step: 5, title: "Receive License", description: "Finally receive your official pilot license from DGCA after meeting all requirements", icon: Award },
];

const dgcaImportance = [
    { icon: Shield, title: "Aviation Safety Guardian", description: "Ensures every flight is safe by enforcing strict compliance with safety regulations" },
    { icon: Globe, title: "ICAO Collaboration", description: "Works closely with International Civil Aviation Organization for global standards alignment" },
    { icon: TrendingUp, title: "Supporting Growth", description: "Facilitating India's position as one of the world's fastest-growing aviation markets" },
    { icon: CheckCircle, title: "Rule Enforcement", description: "Not just making rules but ensuring everyone follows them for passenger safety" },
];

const dgcaOffices = [
    { location: "New Delhi", type: "Headquarters", address: "Near Safdarjung Airport", icon: Building2 },
    { location: "Mumbai", type: "Regional Office", address: "Western Region Coverage", icon: MapPin },
    { location: "Kolkata", type: "Regional Office", address: "Eastern Region Coverage", icon: MapPin },
    { location: "Chennai", type: "Regional Office", address: "Southern Region Coverage", icon: MapPin },
    { location: "Hyderabad", type: "Regional Office", address: "South-Central Region Coverage", icon: MapPin },
];

const dgcaQuickFacts = [
    { label: "Full Form", value: "Directorate General of Civil Aviation", icon: FileCheck },
    { label: "Works Under", value: "Ministry of Civil Aviation, Govt. of India", icon: Building2 },
    { label: "Established In", value: "1971", icon: Calendar },
    { label: "Headquarters", value: "New Delhi (near Safdarjung Airport)", icon: MapPin },
    { label: "Official Website", value: "dgca.gov.in", icon: Globe },
];

const faqs = [
    { question: "What is the full form of DGCA?", answer: "DGCA stands for Directorate General of Civil Aviation. It is the top regulatory authority for civil aviation in India, operating under the Ministry of Civil Aviation." },
    { question: "What is the main role of DGCA in Indian aviation?", answer: "DGCA ensures that flying in India is safe, structured, and follows international norms. It regulates all aspects of civil aviation including pilot licensing, aircraft certification, aviation institute monitoring, safety standards, and incident investigation." },
    { question: "When was DGCA established?", answer: "DGCA was founded in 1971 and has since played a critical role in growing Indian aviation from approving flying schools to ensuring aircraft safety before takeoff." },
    { question: "Where is DGCA headquarters located?", answer: "DGCA's headquarters is located in New Delhi, just across from Safdarjung Airport. It also operates regional offices in major cities like Mumbai, Kolkata, Chennai, and Hyderabad." },
    { question: "Can I become a pilot without DGCA approval?", answer: "No, you cannot become a legal pilot in India without DGCA approval. All pilot licenses in India — CPL, PPL, SPL, ATPL — are issued by DGCA after candidates fulfill exam and flying hour requirements. Without DGCA = No legal pilot license in India." },
    { question: "What types of pilot licenses does DGCA issue?", answer: "DGCA issues several types of pilot licenses including Commercial Pilot License (CPL), Private Pilot License (PPL), Student Pilot License (SPL), and Airline Transport Pilot License (ATPL). Each license has specific requirements and flying hour criteria." },
    { question: "Does DGCA approve flying schools?", answer: "Yes, DGCA must approve all aviation academies and flying schools in India. No aviation academy can operate without DGCA permission. Schools must have DGCA-approved instructors, meet training standards, and ensure their aircraft meet national and international standards." },
    { question: "Can DGCA handle passenger complaints?", answer: "Yes, DGCA is the authority that can hold airlines accountable for passenger complaints. If you have complaints about flight delays or airline service, DGCA is the body that addresses these issues and enforces passenger rights." },
    { question: "How does DGCA ensure flight safety?", answer: "DGCA ensures safety by setting comprehensive rules for airlines including safety protocols, maintenance checks, operational guidelines, and crew training standards. They also certify aircraft airworthiness and investigate any incidents to prevent future occurrences." },
    { question: "How is DGCA connected to international aviation standards?", answer: "DGCA works closely with ICAO (International Civil Aviation Organization) to ensure India stays aligned with global aviation standards. This is especially important as India is becoming one of the world's fastest-growing aviation markets." },
];

// ─── Shared animation variants (module scope — never recreated) ───────────────

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const viewport = { once: true, margin: "-50px" } as const;

// Staggered children helper
const staggerDelay = (i: number) => ({ delay: i * 0.1 });

// ─── Memoized sub-components ──────────────────────────────────────────────────

/** Reusable icon box */
const IconBox = memo(({ icon: Icon, className = "" }: { icon: React.ElementType; className?: string }) => (
    <div className={`flex items-center justify-center ${className}`}>
        <Icon className="h-6 w-6" />
    </div>
));
IconBox.displayName = "IconBox";

/** DGCA highlight card */
const HighlightCard = memo(({ item, delay }: { item: typeof dgcaHighlights[0]; delay: number }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={staggerDelay(delay)}
        className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all group"
    >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <item.icon className="h-6 w-6" />
        </div>
        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
    </motion.div>
));
HighlightCard.displayName = "HighlightCard";

/** DGCA function card */
const FunctionCard = memo(({ func, delay }: { func: typeof dgcaFunctions[0]; delay: number }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={staggerDelay(delay)}
        className="p-8 rounded-2xl border border-border bg-card"
    >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl">
                    {func.number}
                </div>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <func.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-2xl">{func.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg mb-4">{func.description}</p>
                <div className="grid md:grid-cols-2 gap-2">
                    {func.details.map((detail) => (
                        <div key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            {detail}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
));
FunctionCard.displayName = "FunctionCard";

/** Office location card */
const OfficeCard = memo(({ office, delay }: { office: typeof dgcaOffices[0]; delay: number }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={staggerDelay(delay)}
        className="p-6 rounded-2xl border border-border bg-card text-center hover:border-primary/50 hover:shadow-hover transition-all"
    >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <office.icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-bold text-lg mb-1">{office.location}</h3>
        <p className="text-sm text-primary font-semibold mb-2">{office.type}</p>
        <p className="text-xs text-muted-foreground">{office.address}</p>
    </motion.div>
));
OfficeCard.displayName = "OfficeCard";

/** Career step card */
const CareerStepCard = memo(({ step, delay }: { step: typeof pilotCareerSteps[0]; delay: number }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={staggerDelay(delay)}
        className="relative p-6 rounded-xl bg-card border border-border"
    >
        <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
            {step.step}
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-2">
            <step.icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground">{step.description}</p>
    </motion.div>
));
CareerStepCard.displayName = "CareerStepCard";

/** Importance card */
const ImportanceCard = memo(({ item, delay }: { item: typeof dgcaImportance[0]; delay: number }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={staggerDelay(delay)}
        className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all"
    >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <item.icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
    </motion.div>
));
ImportanceCard.displayName = "ImportanceCard";

/** Section heading — shared pattern across page */
const SectionHeading = memo(({ title, subtitle, icon: Icon }: {
    title: string;
    subtitle?: string;
    icon?: React.ElementType;
}) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="text-center mb-16"
    >
        {Icon && <Icon className="h-16 w-16 text-primary mx-auto mb-6" />}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-muted-foreground max-w-3xl mx-auto text-lg">{subtitle}</p>}
    </motion.div>
));
SectionHeading.displayName = "SectionHeading";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DGCAPage() {
    return (
        <Layout>
            <Helmet>
                <title>DGCA Full Form - Directorate General of Civil Aviation | Role & Functions</title>
                <meta
                    name="description"
                    content="Complete guide to DGCA (Directorate General of Civil Aviation) - India's top aviation regulatory authority. Learn about DGCA's role, functions, importance, and impact on Indian aviation industry."
                />
            </Helmet>

            {/* ── Hero ── */}
            <section className="relative py-24 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="max-w-4xl"
                    >
                        <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
                            DGCA - INDIA'S AVIATION AUTHORITY
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            DGCA Full Form – What is DGCA in Aviation?
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-4">
                            Directorate General of Civil Aviation (DGCA) – Role, Importance & Functions in Indian Aviation
                        </p>
                        <p className="text-lg text-primary-foreground/70 mb-8">
                            When you take flight, have you ever thought about who is behind the flight safety, rules, and
                            operations in the skies? Behind all of these operations, there is a government organization which
                            is DGCA - India's supreme aviation regulatory authority.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Start Pilot Training
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

            {/* ── Introduction ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                            Let's Start With The Basics
                        </h2>
                        <div className="p-8 rounded-2xl border-2 border-primary bg-primary/5 text-center mb-8">
                            <p className="text-2xl md:text-3xl font-bold text-primary mb-2">The DGCA Full Form is</p>
                            <p className="text-3xl md:text-4xl font-bold text-primary">Directorate General of Civil Aviation</p>
                        </div>
                        <p className="text-muted-foreground text-lg">
                            Let's understand what is DGCA, what is their role, its importance, and why it matters
                            the most for India's aviation industry.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── What is DGCA ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">What is DGCA?</h2>
                        </div>
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <p className="text-muted-foreground text-lg mb-4">
                                In simple terms, <strong>DGCA is the top regulatory authority for civil aviation in India.</strong> It
                                operates under the Ministry of Civil Aviation and ensures that flying in India is safe, structured,
                                and follows international norms.
                            </p>
                            <p className="text-muted-foreground text-lg mb-4">
                                Founded back in <strong>1971</strong>, DGCA has played a critical role in growing Indian aviation — from
                                approving flying schools to making sure your plane is safe to fly before takeoff.
                            </p>
                            <div className="p-6 rounded-xl bg-primary/10 border-l-4 border-primary mt-6">
                                <p className="text-lg font-semibold">🎯 DGCA in Aviation = Directorate General Of Civil Aviation</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── DGCA Highlights ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Why DGCA Matters?"
                        subtitle="DGCA's comprehensive oversight ensures India's aviation safety and growth"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dgcaHighlights.map((item, i) => (
                            <HighlightCard key={item.title} item={item} delay={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DGCA Functions ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <SectionHeading
                        title="What Does DGCA Do?"
                        subtitle="You might be surprised to know that DGCA is involved in almost every aspect of flying — not just what happens in the cockpit. Let's break down their main functions:"
                    />
                    <div className="space-y-6 max-w-6xl mx-auto">
                        {dgcaFunctions.map((func, i) => (
                            <FunctionCard key={func.title} func={func} delay={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DGCA Offices ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Where is DGCA Located?"
                        subtitle="DGCA's headquarters is located in New Delhi, just across from Safdarjung Airport — one of India's historic aviation sites. It operates regional offices in major cities to keep local aviation activities in check."
                        icon={MapPin}
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                        {dgcaOffices.map((office, i) => (
                            <OfficeCard key={office.location} office={office} delay={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Pilot Career Steps ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <SectionHeading
                        title="DGCA's Role in a Pilot's Career"
                        subtitle="If you're planning to become a pilot, you'll be dealing with DGCA from day one. Here's a quick overview of what your journey would look like:"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
                        {pilotCareerSteps.map((step, i) => (
                            <CareerStepCard key={step.step} step={step} delay={i} />
                        ))}
                    </div>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="p-8 rounded-2xl border-2 border-primary bg-primary/5 text-center">
                            <p className="text-2xl font-bold text-primary">No DGCA = No Legal Pilot License in India</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Why DGCA is Important ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Why DGCA is So Important"
                        subtitle="You might think of DGCA as just a government office — but its role is far more impactful. It doesn't just make rules; it makes sure everyone follows them to ensure your flight is safe every time you board an aircraft."
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {dgcaImportance.map((item, i) => (
                            <ImportanceCard key={item.title} item={item} delay={i} />
                        ))}
                    </div>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <p className="text-muted-foreground text-lg mb-4">
                                Additionally, DGCA works closely with <strong>ICAO (International Civil Aviation Organization)</strong> to
                                make sure India stays aligned with global aviation standards.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                This is especially important now, as <strong>India is becoming one of the world's fastest-growing
                                    aviation markets.</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Quick Facts ── */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <SectionHeading
                        title="All Details About DGCA in Short"
                        subtitle="Quick reference guide to essential DGCA information"
                    />
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="p-8 rounded-2xl border border-border bg-card">
                            <div className="space-y-6">
                                {dgcaQuickFacts.map((fact) => (
                                    <div
                                        key={fact.label}
                                        className="flex items-start gap-4 pb-6 border-b border-border last:border-b-0 last:pb-0"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <fact.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 grid md:grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Topic</p>
                                                <p className="font-semibold">{fact.label}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Details</p>
                                                <p className="font-semibold text-primary">{fact.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-6 rounded-xl bg-primary/10 border-l-4 border-primary">
                                <p className="font-semibold mb-2">Major Functions:</p>
                                <p className="text-sm text-muted-foreground">
                                    Licensing, Certification, Regulations, Safety Oversight, Monitoring, Investigation
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 bg-background">
                <div className="container">
                    <SectionHeading
                        title="Frequently Asked Questions"
                        subtitle="Common questions about DGCA (Directorate General of Civil Aviation)"
                    />
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-3xl mx-auto"
                    >
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={faq.question}
                                    value={`faq-${i}`}
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

            {/* ── Final CTA ── */}
            <section className="py-20 aviation-gradient text-primary-foreground">
                <div className="container">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Your DGCA-Approved Pilot Training?
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Begin your journey with DGCA-certified flying schools and experienced guidance. From medical
                            tests to license acquisition, we'll help you navigate every step of the DGCA requirements
                            for becoming a commercial pilot in India.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/Contact">
                                    Apply for Training
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
        </Layout>
    );
}