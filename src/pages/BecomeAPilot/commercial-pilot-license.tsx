import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    CheckCircle,
    FileCheck,
    Plane,
    ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const overview = [
    { label: "Page scope", value: "CPL pathway information and ground-class preparation" },
    { label: "Flying Star Aviator service", value: "CPL ground classes and exam preparation in Dwarka, New Delhi" },
    { label: "Aircraft flying training", value: "Separate service; not provided by Flying Star Aviator" },
    { label: "Duration and eligibility", value: "Check current requirements and provider schedules before planning" },
    { label: "Fees", value: "Request current, itemised quotations from each provider" },
];

const pathwayStages = [
    {
        icon: BookOpen,
        title: "Theory preparation",
        description:
            "Ground classes support study for applicable DGCA theory examinations. Confirm the current syllabus and the provider's course coverage before enrolling.",
    },
    {
        icon: Plane,
        title: "Aircraft training",
        description:
            "Aircraft instruction is a separate stage. Flying Star Aviator does not operate an FTO or provide aircraft flying training.",
    },
    {
        icon: FileCheck,
        title: "Requirements and records",
        description:
            "Eligibility, examinations, medical requirements and documentation should be checked against current DGCA material for the candidate's circumstances.",
    },
];

const providerChecks = [
    "Written description of subjects and course inclusions",
    "Class schedule, teaching support and instructor information",
    "Itemised fees, exclusions, additional charges and payment terms",
    "Cancellation, refund and missed-class terms",
    "For flight training, the provider's current approval, scope and written terms",
];

const faqs = [
    {
        question: "Does Flying Star Aviator provide aircraft flying training?",
        answer:
            "No. Flying Star Aviator provides CPL ground classes and theory-exam preparation in Dwarka, New Delhi; it does not operate a Flying Training Organisation (FTO) or provide aircraft flying training. Its service is classroom preparation, not aircraft instruction. Candidates considering flight training should assess that stage separately and obtain the provider's current scope, schedule, fees, and terms in writing.",
    },
    {
        question: "Are CPL ground classes and aircraft flying training the same service?",
        answer:
            "No. CPL ground classes and aircraft flying training are separate parts of the pathway. Ground classes focus on theory preparation and exam study; aircraft training involves flight instruction. The distinction matters when comparing course descriptions and fees: confirm which provider delivers each stage and what its written quotation includes.",
    },
    {
        question: "Does completing CPL ground classes guarantee a licence or airline job?",
        answer:
            "No. Completing a ground-class course is not the same as meeting every licensing requirement, receiving a licence, or being selected for a job. Course providers cannot guarantee examination results, licence issue, airline employment, salary, or command. Treat training completion, regulatory licensing, and employer selection as separate outcomes.",
    },
    {
        question: "How should I compare CPL ground-class providers?",
        answer:
            "Ask for a written list of subjects covered, class schedule, teaching support, instructor credentials, fees, exclusions, additional charges, and cancellation or refund terms. Compare the same items across providers, and confirm whether missed sessions or syllabus updates are included. Keep the written quotation and terms before paying.",
    },
];

export default function CPLCourseDetailsPage() {
    return (
        <Layout>
            <section className="relative py-20 aviation-gradient text-primary-foreground md:py-24">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                            CPL pathway information
                        </span>
                        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                            Commercial Pilot License Course Details
                        </h1>
                        <p className="mb-6 text-xl text-primary-foreground/90">
                            A Commercial Pilot Licence (CPL) pathway separates theory preparation from aircraft training through an appropriately approved Flying Training Organisation (FTO). Flying Star Aviator provides CPL ground classes and exam preparation in Dwarka, New Delhi; it does not operate an FTO or provide aircraft flying training. Verify current eligibility and licensing requirements with DGCA before enrolment.
                        </p>
                        <p className="text-sm text-primary-foreground/80">
                            For current rules, consult the{" "}
                            <a
                                className="underline underline-offset-4 hover:text-white"
                                href="https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=1A745E291DDC1E1BDC7FD70AEC52B711"
                                target="_blank"
                                rel="noreferrer"
                            >
                                DGCA Flight Crew CAR
                            </a>{" "}
                            and the latest official notices.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="bg-background py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-8 text-3xl font-bold">CPL pathway overview</h2>
                        <div className="overflow-hidden rounded-2xl border border-border shadow-card">
                            <table className="w-full border-collapse text-left">
                                <thead className="bg-primary text-primary-foreground">
                                    <tr>
                                        <th className="px-5 py-4 text-sm font-semibold md:px-6" scope="col">
                                            Topic
                                        </th>
                                        <th className="px-5 py-4 text-sm font-semibold md:px-6" scope="col">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {overview.map((row, index) => (
                                        <tr
                                            key={row.label}
                                            className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}
                                        >
                                            <th
                                                className="w-1/3 px-5 py-4 text-sm font-semibold md:px-6"
                                                scope="row"
                                            >
                                                {row.label}
                                            </th>
                                            <td className="px-5 py-4 text-sm text-muted-foreground md:px-6">
                                                {row.value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-muted/30 py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-5 text-3xl font-bold">What is a Commercial Pilot Licence?</h2>
                        <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
                            A Commercial Pilot Licence is a professional pilot licence issued under applicable DGCA requirements. Its privileges and the requirements a candidate must meet depend on the rules in force. A ground-class course is preparation; completing it does not itself issue a licence.
                        </p>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            Recognition or conversion in another country depends on that jurisdiction's current rules. Check with the relevant aviation authority before relying on an overseas recognition or conversion claim.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-background py-16">
                <div className="container">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="mb-5 text-3xl font-bold">What does the CPL pathway involve?</h2>
                        <p className="mb-8 max-w-4xl text-lg leading-relaxed text-muted-foreground">
                            The CPL pathway has separate theory-preparation and aircraft-training components, alongside applicable DGCA examinations and licensing requirements. Flying Star Aviator provides ground classes and exam preparation; it does not operate an FTO or provide aircraft flying training. Confirm the current rules and the scope of each provider before planning the stages.
                        </p>
                        <div className="grid gap-5 md:grid-cols-3">
                            {pathwayStages.map((stage) => (
                                <article
                                    key={stage.title}
                                    className="rounded-2xl border border-border bg-card p-6"
                                >
                                    <stage.icon className="mb-4 h-7 w-7 text-primary" aria-hidden="true" />
                                    <h3 className="mb-3 text-xl font-semibold">{stage.title}</h3>
                                    <p className="text-muted-foreground">{stage.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-muted/30 py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-5 text-3xl font-bold">What subjects are covered in CPL theory preparation?</h2>
                        <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
                            Check the current DGCA syllabus and notices for the applicable CPL theory subjects; this page does not repeat an unverified subject list. Course coverage is provider-specific, so confirm in writing which subjects and study support are included in Flying Star Aviator's current ground classes.
                        </p>
                        <p className="text-muted-foreground">
                            The{" "}
                            <a
                                className="font-medium text-primary underline underline-offset-4"
                                href="https://pariksha.dgca.gov.in/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                DGCA Pariksha portal
                            </a>{" "}
                            publishes examination instructions and notices. Check the latest official information before applying.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-background py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-5 text-3xl font-bold">Who can apply for a CPL course?</h2>
                        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                            Applicants should verify current education, age, medical, examination and document requirements with DGCA before enrolling; this page does not restate numeric thresholds. Confirm the ground-class provider's own enrolment conditions separately, because course enrolment and regulatory eligibility are not the same decision.
                        </p>
                        <div className="space-y-3">
                            {[
                                "Check the latest DGCA licensing and examination requirements.",
                                "Confirm applicable medical and documentation steps with DGCA.",
                                "Ask the ground-class provider for its current enrolment terms.",
                                "Keep provider quotations and commitments in writing.",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <CheckCircle
                                        className="mt-1 h-5 w-5 shrink-0 text-primary"
                                        aria-hidden="true"
                                    />
                                    <p className="text-muted-foreground">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-muted/30 py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-5 text-3xl font-bold">How long does CPL training take?</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            The overall timeline depends on the candidate's preparation and the schedules of the providers involved. It is not a guaranteed course duration. Ask each provider for its current schedule and check DGCA examination notices before making a plan.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-background py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-5 text-3xl font-bold">What costs should candidates compare?</h2>
                        <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
                            CPL training costs depend on the services and providers selected. Ground classes and aircraft training are separate services; request current, itemised quotations and confirm inclusions, exclusions, additional charges, payment timing and refund terms in writing.
                        </p>
                        <Link
                            className="font-semibold text-primary underline underline-offset-4"
                            to="/courses/cpl/fees"
                        >
                            Read the CPL cost guide
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-muted/30 py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-5 text-3xl font-bold">What career outcomes can candidates expect?</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            Completing ground classes or a CPL pathway does not guarantee a licence, airline employment, salary, career progression or command. Licensing decisions follow current DGCA requirements, while hiring decisions depend on each employer's criteria. Verify regulatory questions with DGCA and recruitment requirements with the relevant employer.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-background py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-5 text-3xl font-bold">How should candidates compare training providers?</h2>
                        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                            Compare the written scope and terms of each service rather than relying on a general course label. Ask ground-class providers about syllabus coverage, timetable, teaching support, fees and exclusions. For flight training, confirm the provider's current approval, scope, availability and written terms.
                        </p>
                        <ul className="space-y-3">
                            {providerChecks.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                                    <ShieldCheck
                                        className="mt-1 h-5 w-5 shrink-0 text-primary"
                                        aria-hidden="true"
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-muted-foreground">
                            See the guide to{" "}
                            <Link
                                className="font-medium text-primary underline underline-offset-4"
                                to="/dgca/fto-ranking"
                            >
                                checking DGCA FTO information
                            </Link>{" "}
                            and the wider{" "}
                            <Link
                                className="font-medium text-primary underline underline-offset-4"
                                to="/become-a-pilot/become-pilot"
                            >
                                pilot pathway in India
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="cpl-faq-heading"
                className="bg-muted/30 py-16"
            >
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <h2 id="cpl-faq-heading" className="mb-8 text-3xl font-bold">
                            Frequently asked questions
                        </h2>
                        <div className="space-y-6">
                            {faqs.map((faq) => (
                                <article key={faq.question} className="rounded-2xl border border-border bg-card p-6">
                                    <h3 className="mb-3 text-xl font-semibold">{faq.question}</h3>
                                    <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-background py-8">
                <div className="container">
                    <p className="mx-auto max-w-4xl text-sm text-muted-foreground">
                        Written by{" "}
                        <Link
                            className="underline underline-offset-4"
                            to="/editorial-policy"
                        >
                            Flying Star Aviator Academics Team
                        </Link>
                        {" · "}
                        <time dateTime="2026-11-14">Last reviewed: 14 November 2026</time>
                    </p>
                </div>
            </section>

            <section className="py-16 aviation-gradient text-primary-foreground">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-5 text-3xl font-bold">Explore CPL ground classes</h2>
                        <p className="mb-7 text-lg text-primary-foreground/85">
                            Flying Star Aviator provides CPL ground classes and exam preparation in Dwarka, New Delhi. Review the current course scope and written terms before enrolling.
                        </p>
                        <Button variant="gold" size="lg" asChild>
                            <Link to="/dgca/ground-classes">
                                View CPL ground classes
                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
