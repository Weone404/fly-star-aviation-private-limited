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
const faqs = PAGE_FAQS["/cadet-pilot-programme"];

const INDIGO_LABEL = "IndiGo, official pilot careers information; check the current intake";
const INDIGO_URL = "https://www.goindigo.in/how-to-become-a-pilot.html";

const PROGRAMME_CHECKLIST: string[][] = [
  ["Age", "Not verified in this review", "Check the current airline intake"],
  ["Academic requirement", "Not verified in this review", "Check the current airline intake"],
  ["Attempts", "Not verified in this review", "Check the current airline intake"],
  ["Duration", "Not verified in this review", "Confirm with the airline and training provider"],
  ["Ground school", "Not verified in this review", "Confirm the current training stages"],
  ["Student pilot licence", "Not verified in this review", "Confirm current sequence and terms"],
  ["Training partners", "Current partner-school list not verified", "Confirm directly with the airline"],
  ["Licence obtained", "Not verified in this review", "Confirm the current licence and training scope"],
  ["Programme cost", "Not verified in this review", "Request complete written terms"],
  ["Bond or service commitment", "Not verified in this review", "Request current written terms"],
  ["Stipend or starting pay", "Not verified in this review", "Request current written terms"],
  ["Selection criteria in detail", "Not verified in this review", "Confirm current stages and criteria"],
];

const DIFFERENCES: string[][] = [
  ["Selection", "Confirm the current selection stages and conditions with the airline", "Check the provider's admission requirements"],
  ["Training provider", "Confirm current partner(s), DGCA approval and scope with the airline", "Verify the chosen FTO's current DGCA approval and scope"],
  ["Employment", "Confirm any written offer conditions; selection is not treated here as a job guarantee", "A licence or training completion is not a job guarantee"],
  ["Cost", "Request itemised terms from the airline and training provider", "Request itemised terms from the selected provider"],
  ["Flexibility", "Check current change, withdrawal and refund terms", "Check current change, withdrawal and refund terms"],
  ["If not selected", "Ask the airline about current alternatives and any costs", "No airline cadet selection is involved; provider requirements still apply"],
];

export default function CadetPilotProgrammePage() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "Cadet pilot programme" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Cadet Pilot Programmes in India: What Airlines Actually Publish
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
          heading="What is a cadet pilot programme, and what do airlines publish about it?"
          answer="Cadet pilot programme terms are set by each airline and may be intake-specific. This review could not verify current eligibility, selection stages, training route, duration or commercial terms. Check the airline's current intake information and obtain complete written terms from the airline and any named training provider before applying."
          sources={[{ label: INDIGO_LABEL, url: INDIGO_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="What to verify before applying to a cadet programme"
          intro="The official airline page was not accessible during this review. These rows identify information to confirm; they are not verified current programme terms."
          columns={["Item", "Verification status", "What to confirm"]}
          rows={PROGRAMME_CHECKLIST}
          note={
            <>
              Current airline intake details were not verified here. Confirm
              eligibility, programme duration, partners, costs, bond terms and any
              employment conditions in writing before relying on them.
            </>
          }
          sources={[{ label: INDIGO_LABEL, url: INDIGO_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="Cadet programme against self-sponsored training"
          intro="The details of both routes depend on current provider and airline terms. Verify each item rather than assuming a particular selection, training or employment outcome."
          columns={["", "Cadet programme", "Self-sponsored"]}
          rows={DIFFERENCES}
          note={<>Selection into a training programme does not by itself establish employment. Confirm any offer conditions in writing.</>}
          lastUpdated={LAST_UPDATED}
        />

        <article>
          <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
            <section aria-labelledby="air-india-fees">
              <h2 id="air-india-fees" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                How can you check Air India cadet pilot programme fees?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We have not independently verified a current Air India programme
                fee. Ask the airline for the applicable written terms and compare
                the training-school charges, accommodation, travel, examinations,
                payment schedule and refund conditions. Do not treat an online
                estimate as a quote for a particular intake.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Check{" "}
                <a href="https://www.airindia.com/content/cadetpilot/in/en/course-details.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  Air India's programme information
                </a>{" "}
                for current details. Our{" "}
                <Link to="/courses/cpl/fees" className="underline hover:text-primary">CPL cost guide</Link>{" "}
                explains how to compare the components of a training quote.
              </p>
            </section>

            <section aria-labelledby="what-to-ask">
              <h2 id="what-to-ask" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What to ask before you apply
              </h2>
              <ul className="space-y-3 list-disc pl-5 text-muted-foreground leading-relaxed">
                <li>What is the total cost, in writing, including everything payable to the training school?</li>
                <li>Is there a bond, for how long, and what does it cost to break?</li>
                <li>Which of the partner schools would I be sent to, and can I choose?</li>
                <li>What happens if I fail a stage at the second attempt?</li>
                <li>Is a job offer conditional, and on what?</li>
                <li>What did the last intake actually experience, in months from selection to line flying?</li>
              </ul>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Do not rely on details from a past intake. Ask for the current
                written terms that apply to the programme you are considering.
              </p>
            </section>

            <section aria-labelledby="eligibility-trap">
              <h2 id="eligibility-trap" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                One eligibility detail worth checking early
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Airline admission criteria and DGCA licensing requirements are
                separate questions. Confirm the current criteria for the specific
                airline intake and check applicable DGCA requirements independently.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Check current medical requirements and the applicable assessment
                process with DGCA before committing to training costs. The{" "}
                <Link to="/dgca/medical" className="underline hover:text-primary">
                  medical requirements page
                </Link>{" "}
                explains what is assessed.
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
                  <Link to="/blog/cadet-pilot-programme-vs-self-sponsored-cpl" className="underline hover:text-primary">
                    Cadet programme against self-sponsored CPL, in detail
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/fto-ranking" className="underline hover:text-primary">
                    How DGCA ranks the schools these programmes use
                  </Link>
                </li>
                <li>
                  <Link to="/courses/cpl/fees" className="underline hover:text-primary">
                    What self-sponsored training costs
                  </Link>
                </li>
                <li>
                  <Link to="/pilot-salary-india" className="underline hover:text-primary">
                    What pilots earn, and what is actually published
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
