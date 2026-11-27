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
const faqs = PAGE_FAQS["/pilot-salary-india"];

const INDIGO_URL = "https://www.goindigo.in/how-to-become-a-pilot.html";

const WHAT_IS_PUBLISHED: string[][] = [
  [
    "Airline pay scales",
    "Not verified here",
    "This page has not verified a current, representative Indian airline pilot pay scale. Check the terms of a specific role with the employer.",
  ],
  [
    "Airline joining criteria",
    "Not verified in this review",
    "The official airline page was unavailable; check current intake requirements directly with the airline.",
  ],
  [
    "Licensing requirements",
    "Separate from salary terms",
    "Check current DGCA licensing material separately; this review did not use it to establish pilot pay.",
  ],
  [
    "Total employee cost",
    "Not a verified pilot pay scale",
    "An aggregate employment-cost figure would not, by itself, establish an individual pilot's pay; no such figure is used here.",
  ],
  [
    "Figures on training-provider websites",
    "Varies by source",
    "Check the source, date and sample before relying on an estimate.",
  ],
];

const WHAT_MOVES_IT: { title: string; body: string }[] = [
  {
    title: "Which role the figure describes",
    body: "Compare like roles and ranks. This page has not verified how a particular employer defines or compensates each role.",
  },
  {
    title: "Which employer",
    body: "Check the specific employer and role in the written terms. This review has not established representative pay across airline, charter, training or other operators.",
  },
  {
    title: "Fixed and variable pay",
    body: "Check the written offer for fixed pay, variable components, allowances, deductions and any conditions. Do not treat an online estimate as a job offer.",
  },
  {
    title: "Training costs and financing",
    body: "Separate employment compensation from training or financing costs. This guide does not state that a specific rating, loan or payment is required for a particular role.",
  },
  {
    title: "Time to the first job",
    body: "A licence or course completion does not establish an employment offer or start date. Confirm any selection conditions and timeline with the employer in writing.",
  },
];

export default function PilotSalaryIndiaPage() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "Pilot salary in India" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Pilot Salary in India: What Is Actually Published, and What Is Not
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
          heading="How much does a pilot earn in India?"
          answer="Pilot salary in India varies with the employer, rank, aircraft and the terms of the job. We have not verified a representative current airline pay scale or salary range, so this guide does not present an estimate as official pay. Compare the source and date of any figure, its fixed and variable components, and whether it is gross or in-hand."
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="What is published, and by whom"
          intro="Sorted by how much weight it can carry. The useful test on any salary claim is not whether the number looks plausible but whether the page naming it can name where it came from."
          columns={["Item", "Published?", "Detail"]}
          rows={WHAT_IS_PUBLISHED}
          note={
            <>
              Airline eligibility, selection and commercial terms are intake-specific.
              They were not verified in this review; consult the current official
              airline information rather than relying on a previously retrieved copy.
            </>
          }
          sources={[{ label: "IndiGo, How to become a pilot (airline careers page)", url: INDIGO_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <article>
          <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
            <section aria-labelledby="why-no-number">
              <h2 id="why-no-number" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Why this page gives you no number
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                No representative current airline pay scale or salary range was
                verified from a suitable primary source in this review. This page
                therefore does not present an estimate as official or representative
                pay; the absence of a verified figure here does not establish that
                reliable data does not exist elsewhere.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Publishing a range without a suitable source would imply precision
                that the available evidence does not establish.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                For a specific role, ask the employer for current written terms and
                compare the role, pay components, deductions and date. A single
                personal account is not a representative market rate.
              </p>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                Pilot salary in India per month: gross and in-hand
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A monthly gross figure is before deductions; in-hand pay is after
                deductions. Check whether a quoted amount includes flying-related
                pay and allowances, and whether it describes a first officer or a
                captain. An annual package divided by twelve is not necessarily
                the amount paid into a bank account each month.
              </p>
            </section>

            <section aria-labelledby="indigo-pay">
              <h2 id="indigo-pay" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                How should you assess an IndiGo pilot salary estimate?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Check the source, date, rank and aircraft, and distinguish fixed
                salary from variable payments. We have not verified a current
                IndiGo pilot salary scale; an online estimate is not an offer of
                employment. Ask the airline for the written terms of the role,
                including deductions and any training-related commitments.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The{" "}
                <a href={INDIGO_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  IndiGo pilot careers page
                </a>{" "}
                is a starting point for current programme information.
              </p>
            </section>

            <section aria-labelledby="what-moves-it">
              <h2 id="what-moves-it" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                What affects commercial pilot salary?
              </h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                For an airline pilot salary comparison, use the same rank and
                time period, then check the employer, aircraft, fixed pay and
                variable components. Salary is different from the cost of
                financing training.
              </p>
              <ol className="space-y-6">
                {WHAT_MOVES_IT.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="reading-a-claim">
              <h2 id="reading-a-claim" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                How to read a salary claim in thirty seconds
              </h2>
              <ul className="space-y-3 list-disc pl-5 text-muted-foreground leading-relaxed">
                <li>Who published the number, and do they sell training?</li>
                <li>Does the page name an airline, a document or a survey, or only assert?</li>
                <li>Is it gross or net, and does it include flying-hour pay and allowances?</li>
                <li>First officer or captain, and on which fleet?</li>
                <li>Does it net off the cost of the licence and the type rating?</li>
                <li>What date is on it, and what changed in hiring since then?</li>
              </ul>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                These checks help identify what a figure does and does not establish;
                they do not turn an estimate into a verified market rate.
              </p>
            </section>

            <section aria-labelledby="the-cost-side">
              <h2 id="the-cost-side" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                The side of the ledger you can actually pin down
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                An individual offer and provider quotes can help you plan, although
                neither establishes a market-wide figure. Getting the cost side right is worth more to a
                training decision than any earnings estimate, and it is the half you
                can verify before you commit.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The{" "}
                <Link to="/courses/cpl/fees" className="underline hover:text-primary">
                  CPL cost breakdown
                </Link>{" "}
                provides a checklist of cost components to verify in written quotes, and{" "}
                <Link to="/blog/air-hostess-salary-in-india-2026" className="underline hover:text-primary">
                  the same question asked about cabin crew pay
                </Link>{" "}
                reaches the same answer from a different direction.
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
                  <Link to="/courses/cpl/fees" className="underline hover:text-primary">
                    What CPL training costs, component by component
                  </Link>
                </li>
                <li>
                  <Link to="/cadet-pilot-programme" className="underline hover:text-primary">
                    Cadet pilot programmes: what airlines actually publish
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/fto-ranking" className="underline hover:text-primary">
                    How DGCA ranks flying schools
                  </Link>
                </li>
                <li>
                  <Link to="/become-a-pilot/become-pilot" className="underline hover:text-primary">
                    The route to a commercial licence, start to finish
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
