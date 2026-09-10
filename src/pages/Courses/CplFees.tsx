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

const LAST_UPDATED = "2026-09-10";
const LAST_UPDATED_LABEL = "September 10, 2026";

/** Single source of truth: the same array feeds the FAQPage JSON-LD. */
const faqs = PAGE_FAQS["/courses/cpl/fees"];

/**
 * Deliberately no figures.
 *
 * Every rupee amount circulating for CPL training in India traces back to a
 * provider quote or to another blog quoting a provider quote. DGCA publishes
 * examination charges, not training prices, and no FTO price list has been
 * banked as a primary source. Publishing a range here would be an unsourced
 * number wearing a table's authority. What this page can do honestly is name
 * every component, say who sets it, and say whether anyone publishes it.
 */
const COMPONENTS: string[][] = [
  ["Ground classes", "The school you study with", "Each school publishes or quotes its own", "Charged per subject or as a full course; ask which"],
  ["DGCA examination charges", "DGCA", "Published by DGCA", "Payable per paper, per attempt, direct to DGCA"],
  ["Computer number application", "DGCA", "Published by DGCA", "One-time, before any paper can be booked"],
  ["Class 1 medical", "DGCA-empanelled examiner", "Varies by centre", "Do this early; it can end the plan before you spend on anything else"],
  ["Flying hours", "The FTO", "Quoted, not published", "Usually the largest single component by a wide margin"],
  ["Instructor and briefing time", "The FTO", "Sometimes inside the hourly rate, sometimes not", "Ask explicitly whether it is bundled"],
  ["Simulator time", "The FTO", "Quoted", "Cheaper per hour than the aircraft, and not always interchangeable with it"],
  ["Aircraft type used", "The FTO", "Quoted", "Single-engine and multi-engine hours are priced separately"],
  ["Accommodation and living", "You", "Not applicable", "A real cost of any residential FTO, and easy to leave out of a comparison"],
  ["Travel", "You", "Not applicable", "Matters most where the FTO is far from home and weather stretches the schedule"],
  ["Equipment and documents", "You", "Not applicable", "Headset, charts, logbook, photographs, attestations"],
  ["Retests and repeat attempts", "DGCA or the FTO", "Same rate as the first attempt", "Budget for at least the possibility"],
  ["Delay", "Nobody, and everybody", "Never quoted", "Weather, aircraft availability and instructor availability all cost money in living expenses"],
  ["Licence issue", "DGCA", "Published by DGCA", "The final step, and the smallest number on this list"],
  ["Type rating", "The training organisation", "Quoted", "After the CPL, not part of it, and frequently confused with it"],
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
          { label: "Courses", href: "/courses/cpl" },
          { label: "CPL", href: "/courses/cpl" },
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
          answer="There is no published answer, and any page that gives you one number is quoting a provider, not a regulator. DGCA publishes its examination and licensing charges; it does not publish training prices. Flying schools quote, and quotes vary by fleet, location, aircraft type and how much of the cost is bundled. What can be stated honestly is the full list of components you will pay for, which of them anyone publishes, and the questions that turn a quote into a comparable figure."
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="What you pay for, and who sets it"
          intro="Read this as a checklist against any quote you are given. A quote that covers only the first and fifth rows is not a wrong quote; it is an incomplete one, and the gap is what surprises people."
          columns={["Component", "Who sets it", "Publicly published?", "What to check"]}
          rows={COMPONENTS}
          note={
            <>
              No amounts appear in this table on purpose. Figures circulating for Indian
              CPL training trace back to provider quotes rather than to any published
              source, and this site does not restate an unsourced number as though it
              were one. Where DGCA does publish a charge, it is payable to DGCA directly
              and is listed on the{" "}
              <Link to="/dgca" className="underline hover:text-primary">
                DGCA information pages
              </Link>
              .
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
                A single total requires assuming a fleet, an aircraft type, a location, a
                number of flying hours, a completion time and a level of bundling. Change
                any one of those and the total moves. Sites that publish a headline range
                have made all six assumptions and shown none of them, which is why two
                sites quoting the same course disagree by a wide margin.
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
                The last question is the one that most often changes a decision, and it is
                the one least often asked.
              </p>
            </section>

            <section aria-labelledby="sequence">
              <h2 id="sequence" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                The order that protects your money
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Medical first, then the computer number, then the papers, then flying. A
                Class 1 assessment is comparatively inexpensive and is the step most
                capable of ending the plan; discovering a problem after paying an FTO
                deposit is the expensive way to learn the same thing. The DGCA papers do
                not require flying hours, so ground study can run before or alongside
                anything else.
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
