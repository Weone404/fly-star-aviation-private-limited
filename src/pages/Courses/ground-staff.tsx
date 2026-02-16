import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Plane,
    GraduationCap,
    BookOpen,
    DollarSign,
    Briefcase,
    TrendingUp,
    ArrowRight,
    ChevronRight,
    CheckCircle,
    Users,
    Luggage,
    Shield,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const groundStaffServices = [
    {
        icon: Users,
        title: "Ground Staff Role",
        description:
            "Essential personnel ensuring smooth airport operations, passenger assistance, and flight coordination.",
        href: "/ground-staff/overview",
    },
    {
        icon: Luggage,
        title: "Ground Crew Functions",
        description:
            "Baggage handling, boarding assistance, aircraft maintenance checks, and overall airport operations management.",
        href: "/ground-staff/ground-crew",
    },
    {
        icon: BookOpen,
        title: "Course Subjects",
        description:
            "Aviation fundamentals, reservation systems, check-in procedures, security protocols, and customer service.",
        href: "/ground-staff/subjects",
    },
    {
        icon: TrendingUp,
        title: "Career Opportunities",
        description:
            "Join leading airlines like Air India, IndiGo, SpiceJet, and more in various ground staff positions.",
        href: "/ground-staff/careers",
    },
];

const trainingSteps = [
    {
        step: 1,
        title: "Eligibility Check",
        description:
            "Complete 10+2 with any stream or 3-year engineering diploma from recognized board/university.",
    },
    {
        step: 2,
        title: "Entrance Exam",
        description:
            "Qualify the National level Entrance Test AME CET for admission to top ground staff institutes.",
    },
    {
        step: 3,
        title: "Ground Training",
        description:
            "Complete 11-month certification course covering all aspects of airport ground operations.",
    },
    {
        step: 4,
        title: "Skills Development",
        description:
            "Master customer service, baggage handling, security procedures, and emergency protocols.",
    },
    {
        step: 5,
        title: "Practical Training",
        description:
            "Gain hands-on experience with real-world airport operations and equipment.",
    },
    {
        step: 6,
        title: "Certification & Placement",
        description:
            "Receive airport ground staff certificate and begin career with leading airlines.",
    },
];

const courseOverview = [
    { label: "Course Name", value: "Airport Ground Staff Certification Course" },
    { label: "Course Type", value: "Professional Certification" },
    { label: "Training Mode", value: "Classroom + Practical" },
    { label: "Eligibility", value: "10+2 Any Stream" },
    { label: "Duration", value: "11 Months" },
    { label: "Career Outcome", value: "Airport Ground Staff / Ground Crew" },
];

const courseSubjects = [
    { name: "Airport Division", description: "Understanding airport structure and departments" },
    { name: "Aviation Fundamentals", description: "Basic aviation concepts and terminology" },
    { name: "Reservation & Queue Management", description: "Baggage screening and queue systems" },
    { name: "Check-in Procedures", description: "Passenger check-in and boarding processes" },
    { name: "Baggage Make-Up Area", description: "Baggage handling and loading procedures" },
    { name: "Security Hold Area", description: "Security protocols and boarding gate operations" },
    { name: "Boarding Gate Formalities", description: "Announcements and boarding procedures" },
    { name: "Arrival Procedures", description: "Passenger arrival and baggage claim management" },
    { name: "Ramp Management", description: "Aircraft ground operations and coordination" },
    { name: "Frequent Flyer Program", description: "Loyalty program management and customer service" },
    { name: "SABRE System", description: "Basic reservations and check-in system training" },
];

const careerOpportunities = [
    { title: "Customer Service Agent", icon: Users },
    { title: "Ticketing Executive", icon: Briefcase },
    { title: "Baggage Handler", icon: Luggage },
    { title: "Passenger Handling Staff", icon: Users },
    { title: "Cargo Handler", icon: Briefcase },
    { title: "Security Personnel", icon: Shield },
];

const airlinesHiring = [
    "Air India",
    "IndiGo",
    "SpiceJet",
    "GoAir",
    "AirAsia India",
    "Vistara",
    "Alliance Air",
    "Blue Dart Aviation",
];

const faqs = [
    {
        question: "What is an Airport Ground Staff Course?",
        answer:
            "It is a certification course related to the safety and comfort of passengers in the airport including checking, providing information, assisting disabled passengers, and selling tickets. Ground staff play a crucial role in ensuring smooth airport operations from check-in to boarding.",
    },
    {
        question: "What is the eligibility for the Ground Staff Course?",
        answer:
            "A student must be appearing or passed 10+2 with any stream or 3-year engineering diploma from any recognized board/university. Students can qualify through the National level Entrance Test AME CET to get admission in top ground staff institutes in India.",
    },
    {
        question: "What is the duration of the Ground Staff Course?",
        answer:
            "The ground staff course duration is tentatively 11 months certification course in the aviation sector. The course covers various topics like checking, assisting disabled passengers, providing information, confirming reservations, baggage handling, and customer service.",
    },
    {
        question: "What subjects are covered in the Airport Ground Staff Course?",
        answer:
            "The course covers Airport Division, Aviation Fundamentals, Reservation including Baggage screening and Queue Management, Check-in Procedures, Baggage Make-Up Area, Security Hold Area and boarding gate, Boarding Gate Formalities and Announcements, Arrival Procedures, Ramp Management, Frequent Flyer Program, and SABRE Basic Reservations and check-in.",
    },
    {
        question: "What is the fee structure for the Ground Staff Course?",
        answer:
            "Ground staff course fee is based on institute, location, infrastructure, and other facilities. Course fees vary from institute to institute but total fee will be ranging from INR 1,00,000 to INR 1,50,000. The fee covers training in cargo handling, passenger handling, customer service, and other essential skills.",
    },
    {
        question: "What is the salary after completing the Ground Staff Course?",
        answer:
            "Airport ground staff are responsible for the care of passengers once their plane is grounded. After completion of airline ground staff courses, the average salary of ground staff is 2 to 6 Lakhs per annum depending upon the skill of the student and the airline they work with.",
    },
];

const keySkills = [
    "Strong communication skills",
    "Customer service orientation",
    "Teamwork and collaboration",
    "Problem-solving abilities",
    "Attention to detail",
    "Adaptability to dynamic environment",
    "Physical fitness",
    "Multilingual capabilities (advantage)",
];

const groundStaffTasks = [
    "Customer Service (solving problems, issues, queries, complaints)",
    "Ticketing and Reservation",
    "Baggage Claims Management",
    "Passenger Handling and Assistance",
    "Cargo Loading and Unloading",
    "Security Processes Implementation",
    "Inter-department Coordination",
    "Assisting Disabled Passengers",
];

const admissionProcess = [
    "Fill the Aircraft Maintenance Engineering Common Entrance Test (AME CET) form",
    "Prepare for and clear the AME CET Exam",
    "Receive All India Rank (AIR) based on exam performance",
    "Get admission to top ground staff institutes based on AIR",
    "Complete documentation and enrollment process",
    "Begin ground staff training program",
];

export default function AirportGroundStaffCoursePage() {
    return (
        <Layout>
            <Helmet>
                <title>Airport Ground Staff Course in India | Aviation Ground Staff Training</title>
                <meta name="description" content="Join the airport ground staff course - 11 months certification program. Learn passenger handling, baggage management, customer service. Salary 2-6 LPA. Apply now." />
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
                            Airport Ground Staff Course - Complete Training Guide
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Airport Ground Staff Course - Build Your Aviation Career
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Become a certified airport ground staff professional with our comprehensive 11-month certification course.
                            Master passenger handling, baggage management, customer service, and airport operations. Join leading
                            airlines in India and start your exciting aviation career.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/ground-staff/fees">Check Course Fees</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/contact">Talk to Counselor</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What is Ground Staff */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Understanding Airport Ground Staff & Ground Crew
                        </h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                            Ground staff play a crucial role in the aviation industry, serving as the backbone of airport operations.
                            They ensure passengers have a smooth and pleasant experience from check-in to boarding, while ground crew
                            members handle vital tasks including baggage handling, boarding assistance, and aircraft maintenance checks.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-4">Ground Staff Role</h3>
                            <p className="text-muted-foreground mb-4">
                                Ground staff are responsible for ensuring that passengers have a smooth and pleasant experience from
                                check-in to boarding. This involves checking baggage, providing information, assisting with boarding
                                procedures, and ensuring safety protocols are followed.
                            </p>
                            <p className="text-muted-foreground">
                                They also coordinate with other airport departments, including security and maintenance, to ensure
                                timely and efficient operations. The number of aircraft and airports is increasing rapidly in India,
                                creating huge demand for well-skilled ground staff.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {groundStaffServices.map((service) => (
                                    <Link to={service.href} key={service.title} className="block group">
                                        <div className="h-full p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-hover transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <service.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-sm font-bold mb-1">{service.title}</h3>
                                            <div className="flex items-center text-primary text-xs font-semibold mt-2">
                                                Learn More <ChevronRight className="h-3 w-3 ml-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key Skills Section */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Essential Skills for Ground Staff Success
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            To succeed as ground staff in the aviation industry, several key factors and skills are essential.
                            Our comprehensive training program develops all these competencies.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {keySkills.map((skill, index) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border"
                            >
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="font-medium text-sm">{skill}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center text-muted-foreground mt-8"
                    >
                        By focusing on these factors and enrolling in an airport management ground staff course, aspiring ground
                        staff can enhance their chances of success and contribute positively to the aviation industry.
                    </motion.p>
                </div>
            </section>

            {/* Course Subjects */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Airport Ground Staff Course Subjects
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Airports are busy and crowded places with increasing air traffic each year. To ensure smooth functioning,
                            our course covers comprehensive subjects to train skilled ground staff professionals.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courseSubjects.map((subject, index) => (
                            <motion.div
                                key={subject.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all"
                            >
                                <h3 className="font-bold text-lg mb-2">{subject.name}</h3>
                                <p className="text-sm text-muted-foreground">{subject.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Responsibilities Section */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ground Staff Responsibilities & Tasks
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Ground staff course is a popular field of aviation that covers various works like security, cargo handling,
                            passenger handling, and customer service. They work as a team in the airport performing essential tasks.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {groundStaffTasks.map((task, index) => (
                            <motion.div
                                key={task}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="p-5 rounded-xl bg-card border border-border"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <p className="font-medium text-sm">{task}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Training Journey Steps */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Step-by-Step Training Path</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our structured ground staff training program helps students gradually develop knowledge, practical skills,
                            and confidence to excel in airport operations.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainingSteps.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-xl bg-card border border-border"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2 pt-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ground Staff Course Admission Process
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            To become a ground staff member, candidates should follow this admission process to get into top
                            ground staff institutes in India.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {admissionProcess.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-xl bg-card border border-border"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                                <p className="text-sm text-muted-foreground pt-2">{step}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Fees */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ground Staff Course Fee Structure</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Ground staff course fee is based on institute, location, infrastructure, and other facilities.
                            The investment in your aviation career includes comprehensive training and placement support.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-xl font-bold mb-6">Fee Range & Inclusions</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Total Course Fee Range</p>
                                        <p className="text-sm text-muted-foreground">INR 1,00,000 to INR 1,50,000</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Course Duration</p>
                                        <p className="text-sm text-muted-foreground">11 Months Certification Program</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Training Coverage</p>
                                        <p className="text-sm text-muted-foreground">Cargo handling, passenger handling, customer service, and more</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Faculty will help students learn faster in various activities and subjects, preparing them for
                                successful careers in aviation.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-center"
                        >
                            <p className="text-muted-foreground mb-6">
                                The course fees vary from institute to institute based on infrastructure, facilities, and training
                                quality. This investment opens doors to exciting career opportunities in India's growing aviation sector.
                            </p>
                            <Button variant="gold" size="lg" asChild className="w-full">
                                <Link to="/ground-staff/fees">
                                    Get Detailed Fee Breakdown
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Career Opportunities */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ground Staff Career Opportunities
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            After completing airline ground staff courses, students will be eligible to work in the aviation sector.
                            Ground staff roles are available at leading airlines and aviation companies across India.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {careerOpportunities.map((career, index) => (
                            <motion.div
                                key={career.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-hover transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <career.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg">{career.title}</h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Airlines Hiring */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h3 className="text-2xl font-bold mb-6">Leading Airlines Hiring Ground Staff</h3>
                        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                            {airlinesHiring.map((airline, index) => (
                                <motion.div
                                    key={airline}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="px-6 py-3 rounded-full bg-card border border-border font-medium hover:border-primary/50 transition-colors"
                                >
                                    {airline}
                                </motion.div>
                            ))}
                            <div className="px-6 py-3 rounded-full bg-primary/10 border border-primary/20 font-medium text-primary">
                                And many more...
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Salary Information */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ground Staff Course Salary
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Airport ground staff are responsible for the care of passengers once their plane is grounded.
                                They are involved in every aspect of airport operations.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl border border-border bg-card"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                    <DollarSign className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Average Salary Range</h3>
                                <p className="text-3xl font-bold text-primary mb-4">₹2 - 6 Lakhs</p>
                                <p className="text-muted-foreground">Per annum</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-center"
                            >
                                <h3 className="font-bold text-lg mb-4">Salary Depends On:</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Student's skill level and competencies",
                                        "Airlines and organization type",
                                        "Location and city of employment",
                                        "Experience and expertise gained",
                                        "Additional certifications and training",
                                    ].map((factor, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                            {factor}
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
                            After completion of airline ground staff courses, students will be eligible to work in the aviation sector
                            with competitive salaries and growth opportunities.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Course Overview Table */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Course Overview</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="rounded-2xl border border-border overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-primary text-primary-foreground">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Field</th>
                                        <th className="px-6 py-4 text-left font-semibold">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseOverview.map((row, index) => (
                                        <tr key={row.label} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                                            <td className="px-6 py-4 font-semibold text-sm">{row.label}</td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm">{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose */}
            <section className="py-20 bg-background">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Why Choose Airport Ground Staff Course?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            The aviation industry in India is experiencing rapid growth with increasing number of aircraft and airports.
                            This creates a massive demand for well-skilled ground staff who can handle the complex functioning at airports
                            efficiently and professionally.
                        </p>
                        <p className="text-muted-foreground text-lg mb-4">
                            Airport ground staff courses and aviation ground staff courses provide specialized training programs focused
                            on customer service, baggage handling, and emergency protocols. Completing a diploma in airport ground staff
                            training or airlines ground staff course significantly boosts your employability in this growing sector.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            Obtaining an airport ground staff certificate improves job prospects and showcases your proficiency in airport
                            operations. This certification increases your chances during airport ground staff hiring processes, highlighting
                            your skills and readiness for the role.
                        </p>
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
                            Common questions about airport ground staff course and aviation ground staff training in India.
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
                            Start Your Ground Staff Career Today
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-4">
                            The airport ground staff course is more than just a certification — it is your gateway to an exciting
                            career in India's booming aviation industry. With comprehensive training in passenger handling, customer
                            service, baggage management, and airport operations, you'll be equipped with all the skills needed to excel.
                        </p>
                        <p className="text-primary-foreground/80 text-lg mb-8">
                            Join leading airlines like Air India, IndiGo, SpiceJet, and many more. With the right training from top
                            ground staff institutes and dedication, you can build a rewarding career with competitive salaries ranging
                            from 2 to 6 lakhs per annum. Take the first step toward your aviation dreams today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="gold" size="lg" asChild>
                                <Link to="/apply">
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <Link to="/ground-staff/fees">Check Course Fees</Link>
                            </Button>
                            <Button variant="outline-white" size="lg" asChild>
                                <a href="tel:+919876543210">Talk to Counselor</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}