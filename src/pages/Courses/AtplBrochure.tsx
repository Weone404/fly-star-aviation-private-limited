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
const faqs = PAGE_FAQS["/atpl/brochure"];

const CPL_VS_ATPL: string[][] = [
  ["What it permits", "Flying for hire and reward as a commercial pilot", "Acting as pilot-in-command of an aircraft requiring two pilots, in scheduled air transport"],
  ["When people sit it", "Early, as the working licence", "Later, usually while already flying commercially"],
  ["Theory", "The CPL subject set", "A separate ATPL theory set, sat under DGCA"],
  ["Flying experience", "Set out in Schedule II of the Aircraft Rules 1937", "Set out in Schedule II, and substantially greater"],
  ["Medical", "Class 1", "Class 1"],
  ["What a ground school provides", "Theory preparation", "Theory preparation"],
];

const WHAT_WE_DO: string[] = [
  "Structured classroom and online preparation for the DGCA ATPL theory papers",
  "Subject sequencing against the DGCA examination calendar, so papers are attempted in a workable order",
  "Question practice and revision cycles built around the published syllabus",
  "Guidance on paper validity windows and how to stagger attempts",
];

const WHAT_WE_DO_NOT: string[] = [
  "Operate aircraft or provide flying hours; that happens at a DGCA-approved FTO",
  "Issue, endorse or process any licence; DGCA does that",
  "Register you as a Flight Crew candidate; you do that yourself on the DGCA portal",
  "Conduct medicals; those are done by DGCA-empanelled examiners",
  "Provide type ratings, which are a separate qualification after the licence",
];

export default function AtplBrochurePage() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "ATPL", href: "/courses/atpl" }, { label: "Brochure" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              ATPL Ground Classes: Course Brochure
            </h1>
            <p className="text-sm text-muted-foreground">
              Written by{" "}
              <Link to="/editorial-policy" className="underline hover:text-primary">
                Flying Star Aviator Academics Team
              </Link>{" "}
              &middot; Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This is the brochure, on the page rather than behind a download. Everything a
              PDF would have said is here, in a form you can search, link to and quote.
            </p>
          </div>
        </header>

        <CitableAnswer
          heading="What is an ATPL, and who is this course for?"
          answer="The Airline Transport Pilot Licence is the senior DGCA flight crew licence, required to act as pilot-in-command of an aircraft certificated for two pilots in scheduled air transport. Most candidates hold a CPL and are already flying commercially when they sit the ATPL theory papers. Flying Star Aviator prepares candidates for those papers as a ground school in Dwarka, New Delhi. The flying experience an ATPL requires is accrued at an operator or an approved training organisation, never in a classroom."
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="How the ATPL differs from the CPL"
          intro="The two licences are often discussed as though the ATPL were a longer CPL. They serve different purposes and are sat at different points in a career."
          columns={["", "CPL", "ATPL"]}
          rows={CPL_VS_ATPL}
          note={
            <>
              Flying experience requirements for both licences sit in Schedule II to the
              Aircraft Rules 1937. This page does not restate those figures: the publicly
              circulating copies of the Rules truncate before the schedules, and the one
              archived copy available to us is too poorly digitised to quote from with
              confidence. Read the requirement from the current official text rather than
              from any website, this one included.
            </>
          }
          lastUpdated={LAST_UPDATED}
        />

        <article>
          <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
            <section aria-labelledby="who-for">
              <h2 id="who-for" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Who should be on this course
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Candidates already holding a CPL and building the experience an ATPL
                requires, and candidates preparing the theory papers ahead of that point so
                the papers are behind them when the hours arrive. Sequencing matters here
                more than it does at CPL stage, because a pass has a validity window and an
                expired paper has to be sat again.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                If you are not yet a CPL holder, the more useful starting points are the{" "}
                <Link to="/courses/cpl" className="underline hover:text-primary">
                  CPL course
                </Link>{" "}
                and the{" "}
                <Link to="/dgca/computer-number" className="underline hover:text-primary">
                  DGCA computer number
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="what-we-do">
              <h2 id="what-we-do" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What this course provides
              </h2>
              <ul className="space-y-3 list-disc pl-5 text-muted-foreground leading-relaxed">
                {WHAT_WE_DO.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="what-we-dont">
              <h2 id="what-we-dont" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What it does not provide
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Stated plainly, because the distinction between a ground school and a flying
                training organisation is the thing most often blurred in aviation marketing.
              </p>
              <ul className="space-y-3 list-disc pl-5 text-muted-foreground leading-relaxed">
                {WHAT_WE_DO_NOT.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="fees">
              <h2 id="fees" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Fees
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Course fees are confirmed in writing before enrolment, against the subjects
                and the batch you actually take. DGCA examination charges are separate and
                are paid to DGCA directly. The{" "}
                <Link to="/courses/cpl/fees" className="underline hover:text-primary">
                  cost-component breakdown
                </Link>{" "}
                explains which parts of pilot training anyone publishes a price for and
                which parts are always quoted.
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
                  <Link to="/courses/atpl" className="underline hover:text-primary">
                    The ATPL course page
                  </Link>
                </li>
                <li>
                  <Link to="/become-a-pilot/airline-transport-pilot-licence" className="underline hover:text-primary">
                    What an ATPL is and where it sits in a pilot's career
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/ground-classes" className="underline hover:text-primary">
                    DGCA ground classes
                  </Link>
                </li>
                <li>
                  <Link to="/apply" className="underline hover:text-primary">
                    Ask the academics team about sequencing
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
