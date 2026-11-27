import { Link } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import { CitableAnswer } from "@/components/CitableAnswer";
import { CitableTable } from "@/components/CitableTable";
import { PAGE_FAQS } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LAST_UPDATED = "2026-11-18";
const LAST_UPDATED_LABEL = "November 18, 2026";

/** Single source of truth: the same array feeds the FAQPage JSON-LD. */
const faqs = PAGE_FAQS["/courses/cpl/fees"];
const DGCA_FAQ_URL = "https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=01BA8FB2105DBF5FA48E2F8D89E1E054";

/**
 * Deliberately no figures.
 *
 * A published FTO fee is specific to that course and does not establish a
 * market range. This table identifies cost components and who sets them.
 */
const COMPONENTS: string[][] = [
  ["Ground classes", "The course provider", "Confirm current written fees", "Check subjects, schedule, inclusions and exclusions"],
  ["DGCA examination charges", "DGCA", "The Pariksha FAQ lists charges per paper", "Confirm current fee and payment instructions on Pariksha"],
  ["Computer Number application", "DGCA / Pariksha", "A charge was not verified in this review", "Check current official instructions; no amount is assumed here"],
  ["Medical assessment", "Confirm with DGCA", "Required class and current fee were not verified here", "Check current requirements and authorised assessment process before paying"],
  ["Aircraft training", "The selected FTO", "Request a current written quote", "Verify the provider's current DGCA approval, scope and inclusions"],
  ["Instructor and briefing time", "The selected provider", "Confirm in the written quote", "Ask whether it is included or charged separately"],
  ["Simulator time", "The selected provider", "Confirm in the written quote", "Ask what is included and whether any time counts toward applicable requirements"],
  ["Aircraft type and training scope", "The selected FTO", "Confirm in the written quote", "Ask for charges by component; this page does not assume a particular aircraft or endorsement"],
  ["Accommodation and living", "Confirm for your circumstances", "Not verified here", "Include only if relevant to the selected provider and location"],
  ["Travel", "Confirm for your circumstances", "Not verified here", "Include only if relevant to the selected provider and location"],
  ["Equipment and documents", "Confirm with the relevant provider or authority", "Not verified here", "Ask which items are required and which are included"],
  ["Retests and repeat attempts", "Confirm with DGCA and the provider", "Rates were not verified here", "Ask which charges apply if a repeat attempt or sortie is needed"],
  ["Delays or extensions", "Confirm with the provider", "Terms were not verified here", "Ask how schedule changes affect payment and accommodation terms"],
  ["Licence issue", "DGCA", "A current charge was not verified in this review", "Check the current official fee schedule before budgeting"],
  ["Type rating", "Confirm with the relevant provider or employer", "Applicability and charges vary; not verified here", "Ask whether any such costs are included in the written quote"],
];

const QUESTIONS: string[] = [
  "Is the quoted flying rate per block hour or per airborne hour, and what is the difference on your fleet?",
  "Is instructor and briefing time inside that rate or billed separately?",
  "What is the rate for a repeat sortie, and who decides one is needed?",
  "How many aircraft are serviceable today, and how many students are on the roll?",
  "What happened to last year's intake, in months from joining to CPL issue?",
  "What is the refund position if I stop after ground school but before flying?",
  "Which costs on this page are not in your quote?",
];

export default function CplFeesPage() {
  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "CPL Training", href: "/courses/cpl" },
          { label: "Fees" },
        ]}
      />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              CPL Fees in India: Every Component, and Who Actually Publishes a Price
            </h1>
            <p className="text-sm text-muted-foreground">
              Written by{" "}
              <Link to="/editorial-policy" className="underline hover:text-primary">
                Flying Star Aviator Academics Team
              </Link>{" "}
              &middot; Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
            </p>
          </div>
        </header>

        <CitableAnswer
          heading="What does a CPL cost in India?"
          answer="Pilot training fees in India vary by provider, aircraft and what is included. Some schools publish a course fee, while others provide a quotation; a published course fee is not necessarily the total cost. Compare flying, ground instruction, examinations, medicals, accommodation and any additional charges before committing."
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="Pilot course fees in India: what you pay for and who sets it"
          intro="Use this checklist to compare written quotes. Ask each provider to identify included items, exclusions and charges quoted separately."
          columns={["Component", "Who sets it", "Publicly published?", "What to check"]}
          rows={COMPONENTS}
          note={
            <>
              No market total is stated because the scope and terms vary. For an
              example of an officially published school fee, see our{" "}
              <a href="/dgca/fto-ranking#igrua" className="underline hover:text-primary">
                IGRUA comparison
              </a>. The{" "}
              <a href={DGCA_FAQ_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                DGCA Pariksha Flight Crew FAQ
              </a>{" "}
              lists exam charges per paper; confirm current fees, payment
              instructions and refund conditions in official material.
            </>
          }
          lastUpdated={LAST_UPDATED}
        />

        <article>
          <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
            <section aria-labelledby="why-no-number">
              <h2 id="why-no-number" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Why this page does not give you a total
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A total depends on the provider, training scope, location, schedule
                and written inclusions. This page does not publish an unverified
                market range. Compare itemised quotes for the same scope and ask
                each provider to identify exclusions and separate charges.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The more useful thing to carry into a conversation with a flying school is
                the component list above and the questions below. They convert a quote
                into something you can compare against another quote.
              </p>
            </section>

            <section aria-labelledby="questions">
              <h2 id="questions" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Seven questions that make two quotes comparable
              </h2>
              <ol className="space-y-3 list-decimal pl-5 text-muted-foreground leading-relaxed">
                {QUESTIONS.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                The final question can surface charges outside a provider's quote;
                compare the written responses before making a decision.
              </p>
            </section>

            <section aria-labelledby="sequence">
              <h2 id="sequence" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                The order that protects your money
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This page does not prescribe a sequence for medical assessments,
                examinations or aircraft training. Confirm current eligibility and
                licensing requirements with DGCA before making payments, and obtain
                separate written terms for ground classes and aircraft training from
                the relevant providers.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Flying Star Aviator is a ground school and career-guidance organisation in
                Dwarka, New Delhi. It does not operate aircraft, and it does not quote for
                flying hours; those come from the FTO you choose.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section aria-labelledby="related">
              <h2 id="related" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Related
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>
                  <Link to="/courses/cpl" className="underline hover:text-primary">
                    The CPL course and what it covers
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/medical" className="underline hover:text-primary">
                    Class 1 and Class 2 medical requirements
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/computer-number" className="underline hover:text-primary">
                    Getting a DGCA computer number
                  </Link>
                </li>
                <li>
                  <Link to="/apply" className="underline hover:text-primary">
                    Talk it through with the academics team
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
