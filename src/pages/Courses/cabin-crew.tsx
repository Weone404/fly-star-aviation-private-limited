import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Plane,
    Users,
    Briefcase,
    Globe,
    Heart,
    Award,
    ArrowRight,
    ChevronRight,
    CheckCircle,
    FileText,
    MessageSquare,
    ClipboardList,
    HelpCircle,
    UserPlus,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const cabinCrewServices = [
    {
        icon: Plane,
        title: "Etihad Cabin Crew",
        description: "Open Application",
        href: "/cabin-crew/etihad",
    },
    {
        icon: Plane,
        title: "SAS Air Steward",
        description: "Copenhagen",
        href: "/cabin-crew/sas-copenhagen",
    },
    {
        icon: Plane,
        title: "SAS Cabin Crew",
        description: "Stockholm - Open Application",
        href: "/cabin-crew/sas-stockholm",
    },
];

const resourceHub = [
    {
        icon: FileText,
        title: "How to Become a Cabin Crew",
        description: "Step-by-step guide to starting your aviation journey",
        href: "/resources/become-cabin-crew",
    },
    {
        icon: Briefcase,
        title: "CV Help",
        description: "What airlines look for in your application",
        href: "/resources/cv-help",
    },
    {
        icon: MessageSquare,
        title: "Interview Prep",
        description: "Tips for your individual interview",
        href: "/resources/interview-prep",
    },
    {
        icon: ClipboardList,
        title: "Assessment Day",
        description: "How to shine in group exercises",
        href: "/resources/assessment-day",
    },
    {
        icon: HelpCircle,
        title: "Frequently Asked Questions",
        description: "Get answers to the most common questions",
        href: "/resources/faq",
    },
];

const keyBenefits = [
    "Permanent contracts for all employees",
    "Close cooperation and relationship building",
    "Work with esteemed airlines globally",
    "Predictability in your career path",
    "Dedicated team finding the best match for you",
    "Opportunities for experienced and inexperienced crew",
];

const partnerAirlines = [
    { name: "Etihad Airways", type: "Open Application" },
    { name: "SAS Copenhagen", type: "Air Steward" },
    { name: "SAS Stockholm", type: "Open Application" },
];

const faqs = [
    {
        question: "Do I need previous experience to apply?",
        answer:
            "No! We work with both experienced and inexperienced cabin crew members. Our partner airlines have opportunities for all levels, and we're dedicated to finding the right match for your background and aspirations.",
    },
    {
        question: "What type of contracts do you offer?",
        answer:
            "One of our top priorities is to offer permanent contracts to all our employees. We believe in creating predictability and stability in your aviation career by cooperating closely and building strong relationships with all our employees.",
    },
    {
        question: "Which airlines do you partner with?",
        answer:
            "We partner with various esteemed airlines around the globe, including Etihad Airways, SAS, Braathens, and many more. Our global reach combined with local knowledge enables us to constantly expand our airline partnerships.",
    },
    {
        question: "How do I register my candidate profile?",
        answer:
            "Registering is incredibly easy! Simply leave your name and email, and we'll send you information about how you can set up your complete candidate profile. This ensures you don't miss your next opportunity.",
    },
    {
        question: "What happens after I apply?",
        answer:
            "Our dedicated team reviews your application and works to find the best possible match for you with our partner airlines. We'll guide you through the entire process, from application to interview preparation and beyond.",
    },
];

export default function CabinCrewPage() {
    return (
        <Layout>
            <Helmet>
                <title>Cabin Crew Jobs | Join Esteemed Airlines Worldwide</title>
                <meta
                    name="description"
                    content="Launch your cabin crew career with AAP Aviation. Permanent contracts, global opportunities with Etihad, SAS & more. For experienced and inexperienced crew."
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
                            Join Esteemed Airlines Worldwide
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Cabin Crew</h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Are you an experienced or inexperienced Cabin Crew member dreaming of joining an airline that
                            values your passion for aviation? We work with various esteemed airlines and might have the
                            opportunity you have been waiting for!
                        </p>
                        <p className="text-lg text-primary-foreground/80 mb-8">
                            Our team is dedicated on finding the best possible match for you, and one of our top priorities
                            is to offer permanent contracts to all our employees and to create predictability - by cooperating
                            closely and building relations to all our employees.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply for a Cabin Crew Job
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/register">Create a Profile</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Cabin Crew Opportunities */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cabin Crew Opportunities</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Our partner airlines are scaling up more than ever! Our job in AAP Aviation is to be primed and
                            ready to help the industry fill the high demand, and find the best opportunities for our Cabin Crew
                            candidates.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {cabinCrewServices.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={service.href} className="block group h-full">
                                    <div className="h-full p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <service.icon className="h-7 w-7" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                        <p className="text-muted-foreground mb-4">{service.description}</p>
                                        <div className="flex items-center text-primary text-sm font-semibold">
                                            Apply Now <ChevronRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Button variant="gold" size="lg" asChild>
                            <Link to="/cabin-crew/all">
                                Check All Cabin Crew Opportunities Here
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The combination of our global reach and local knowledge enables us to constantly partner with
                            esteemed airlines around the globe.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {keyBenefits.map((benefit, index) => (
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

            {/* Resource Hub */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Launch Your Career as a Cabin Crew Member?
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Find everything you need to succeed: step-by-step guides, interview and assessment day tips, CV
                            advice, and answers to the most common questions about the application process.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h3 className="text-2xl font-bold mb-2">Resource Hub</h3>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resourceHub.map((resource, index) => (
                            <motion.div
                                key={resource.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={resource.href} className="block group h-full">
                                    <div className="h-full p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <resource.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                                        <div className="flex items-center text-primary text-sm font-semibold">
                                            Learn More <ChevronRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* A Day in the Life */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Day in the Life of a Cabin Crew</h2>
                            <p className="text-muted-foreground text-lg">
                                Curious what the job really looks like beyond the job ad?
                            </p>
                        </div>

                        <div className="p-8 md:p-12 rounded-2xl border border-border bg-card">
                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Users className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Meet Alva</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Come along with Alva, one of our AAP crew members, for a day in her life flying on
                                        behalf of Braathens!
                                    </p>
                                </div>
                            </div>

                            <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center mb-6">
                                <div className="text-center">
                                    <Plane className="h-16 w-16 text-primary mx-auto mb-4" />
                                    <p className="text-muted-foreground">Video content placeholder</p>
                                </div>
                            </div>

                            <Button variant="gold" size="lg" className="w-full">
                                Watch Alva's Day
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Register Profile Section */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="p-8 md:p-12 rounded-2xl border border-primary/20 bg-primary/5">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <UserPlus className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                    You Didn't Find Exactly the Position You Were Looking For?
                                </h2>
                                <p className="text-muted-foreground text-lg mb-6">
                                    Register your candidate profile today so you don't miss your next opportunity!
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <p className="text-muted-foreground">
                                    The combination of our global reach and local knowledge enables us to constantly partner
                                    with esteemed airlines around the globe.
                                </p>
                                <p className="text-muted-foreground">
                                    Registering your candidate profile is incredibly easy. Simply leave your name and email and
                                    we'll send you information about how you can set up your profile.
                                </p>
                            </div>

                            <Button variant="gold" size="lg" asChild className="w-full">
                                <Link to="/register">
                                    Register Your Candidate Profile Here
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Partner Airlines */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partner Airlines</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We work with esteemed airlines worldwide to bring you the best cabin crew opportunities.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {partnerAirlines.map((airline, index) => (
                            <motion.div
                                key={airline.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Globe className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-bold mb-2">{airline.name}</h3>
                                <p className="text-sm text-muted-foreground">{airline.type}</p>
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
                            Get answers to the most common questions about cabin crew opportunities and the application
                            process.
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
                                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Cabin Crew Journey Today</h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Whether you're an experienced professional or just starting out, we're here to help you find the
                            perfect cabin crew position with our partner airlines. With permanent contracts, dedicated support,
                            and global opportunities, your aviation career starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/register">Create Your Profile</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}