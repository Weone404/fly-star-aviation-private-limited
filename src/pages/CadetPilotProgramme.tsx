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
const faqs = PAGE_FAQS["/cadet-pilot-programme"];

const INDIGO_LABEL = "IndiGo, How to become a pilot (airline careers page), retrieved 10 September 2026";
const INDIGO_URL = "https://www.goindigo.in/how-to-become-a-pilot.html";

/**
 * Every row below is quoted from the airline's own page or marked as not stated
 * there. Cadet programme costs, bonds and partner-school names circulate widely
 * and are not published by the airline, so they are named as unpublished rather
 * than repeated from a third party.
 */
const PUBLISHED: string[][] = [
  ["Age", "18 to 32", "Stated by the airline"],
  ["Academic requirement", "10+2 with Physics and Mathematics as compulsory subjects", "Stated by the airline"],
  ["Attempts", "A maximum of two attempts per stage", "Stated by the airline"],
  ["Duration", "Zero flight time to commercial airbus pilot in 22 months", "Stated by the airline"],
  ["Ground school", "A four-month ground school stage", "Stated by the airline"],
  ["Student pilot licence", "15 days of training to obtain it", "Stated by the airline"],
  ["Training partners", "Seven chosen training schools", "Named? No. The airline states the number, not the schools"],
  ["Licence obtained", "Commercial Pilot Licence", "Stated by the airline"],
  ["Programme cost", "Not stated", "Circulates widely; not published by the airline"],
  ["Bond or service commitment", "Not stated", "Circulates widely; not published by the airline"],
  ["Stipend or starting pay", "Not stated", "Not published by the airline"],
  ["Selection criteria in detail", "Not stated", "The airline describes stages, not scoring"],
];

const DIFFERENCES: string[][] = [
  ["Who selects you", "The airline, before training begins", "You select the school; nobody selects you"],
  ["Where you train", "A school the airline has chosen", "Any DGCA-approved FTO you choose"],
  ["Sequence", "Selection, then training, then a defined route into the airline", "Training, then licence, then apply for jobs"],
  ["Cost", "Not published by the airline", "Quoted to you by the school, component by component"],
  ["Flexibility", "Fixed programme, fixed partners", "You choose, and can change your mind"],
  ["If you are not selected", "You are not in the programme", "Not applicable; there is no gate to fail"],
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
          answer="A cadet pilot programme selects candidates before training begins and routes them through schools the airline has chosen, ending in a Commercial Pilot Licence. Airlines publish eligibility and structure: IndiGo states an age range of 18 to 32, 10+2 with Physics and Mathematics, a maximum of two attempts per stage, and 22 months from zero flight time. What airlines do not publish is the part candidates most want to know, which is cost, bond and starting pay. This page separates the two."
          sources={[{ label: INDIGO_LABEL, url: INDIGO_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="What one airline publishes, line by line"
          intro="Taken from IndiGo's own careers information because it is the most detailed publicly available account. Other carriers publish less. Rows marked not stated are not omissions on our part; the airline does not say."
          columns={["Item", "What the airline states", "Note"]}
          rows={PUBLISHED}
          note={
            <>
              Four of the twelve rows are unpublished, and they are the four that
              decide affordability. Any page quoting a cadet programme fee or bond
              length is quoting something the airline has not said, so ask the airline
              in writing before treating a number as real.
            </>
          }
          sources={[{ label: INDIGO_LABEL, url: INDIGO_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="Cadet programme against self-sponsored training"
          intro="Neither route is better in the abstract. They fail in different ways, and the right question is which failure you can absorb."
          columns={["", "Cadet programme", "Self-sponsored"]}
          rows={DIFFERENCES}
          lastUpdated={LAST_UPDATED}
        />

        <article>
          <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
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
                The first two are the ones that change a decision, and they are the two
                the published pages do not answer.
              </p>
            </section>

            <section aria-labelledby="eligibility-trap">
              <h2 id="eligibility-trap" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                One eligibility detail worth checking early
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A cadet programme requiring 10+2 with Physics and Mathematics is stating
                an airline requirement that matches the DGCA rule for the commercial
                stream. If you passed 10+2 without those subjects there are routes to
                correct it, and doing so before applying is far cheaper than
                discovering the gap at selection.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A Class 1 medical is the other early gate. It is comparatively
                inexpensive and it is the step most capable of ending the plan, which is
                a reason to take it first rather than last. The{" "}
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
