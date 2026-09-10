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
const faqs = PAGE_FAQS["/pilot-salary-india"];

const INDIGO_URL = "https://www.goindigo.in/how-to-become-a-pilot.html";

/**
 * This page carries no salary figure, and that is the point.
 *
 * A search run on 10 September 2026 for "pilot salary in India" returned ten
 * organic results, every one of them a flight school, a ground school or a
 * content site, and not one of them citing an airline disclosure, a regulator
 * publication or a government statistic. The numbers on those pages agree with
 * each other because they are copied from each other, not because anyone
 * measured anything.
 */
const WHAT_IS_PUBLISHED: string[][] = [
  [
    "Airline pay scales",
    "Not published",
    "No Indian scheduled carrier publishes a pilot pay scale. Pay is set in individual contracts and, where they exist, collective agreements.",
  ],
  [
    "Airline joining criteria",
    "Published, by the airline",
    "IndiGo states an age range of 18 to 32 and 10+2 with Physics and Mathematics for its cadet programme, and that a candidate gets a maximum of two attempts per stage.",
  ],
  [
    "Licensing requirements",
    "Published, by DGCA",
    "What a licence requires and permits is in the Aircraft Rules 1937 and the CARs. None of it concerns pay.",
  ],
  [
    "Total employee cost",
    "Published, in annual reports",
    "Listed carriers disclose aggregate employee benefit expense. It covers every employee from cabin crew to engineering and cannot be divided into a pilot salary.",
  ],
  [
    "Figures on training-provider websites",
    "Published, sourced to nobody",
    "Presented as fact, attributed to no airline, no regulator and no survey.",
  ],
];

const WHAT_MOVES_IT: { title: string; body: string }[] = [
  {
    title: "Which seat you are in",
    body: "First officer and captain are different jobs on different pay. The gap between them is larger than the gap between airlines, and the timing of a command upgrade depends on fleet growth and seniority rather than on ability alone.",
  },
  {
    title: "Which employer",
    body: "Scheduled carrier, charter operator, corporate flight department, flying school instructor and cargo operator are five different labour markets. Most published comparisons quietly assume the first.",
  },
  {
    title: "Hours actually rostered",
    body: "Where pay includes a flying-hour component, what you earn depends on what you are scheduled, which moves with fleet availability, season and network.",
  },
  {
    title: "Type rating and the debt behind it",
    body: "A type rating is a real cost taken on before the first airline pay cheque. Any earnings figure that ignores what was borrowed to reach it describes income, not financial position.",
  },
  {
    title: "Time to the first job",
    body: "The months between licence issue and a first flying job earn nothing, and that interval varies with hiring cycles far more than with the licence itself.",
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
          answer="Nobody publishes an authoritative answer. No Indian airline publishes a pilot pay scale, DGCA publishes licensing requirements rather than salaries, and no government statistic reports pilot pay separately. Every figure circulating online comes from a training provider or a content site, none of which names a primary source. This page sets out what is genuinely published, what moves the number, and how to read a salary claim before you plan a career around it."
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="What is published, and by whom"
          intro="Sorted by how much weight it can carry. The useful test on any salary claim is not whether the number looks plausible but whether the page naming it can name where it came from."
          columns={["Item", "Published?", "Detail"]}
          rows={WHAT_IS_PUBLISHED}
          note={
            <>
              The IndiGo criteria in row two are quoted from the airline's own
              careers information, retrieved 10 September 2026. That page publishes
              eligibility and selection detail and does not state pay, bond, cost or
              stipend.
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
                On 10 September 2026 we searched for the phrase most aspiring pilots
                type, and read the first ten organic results. Every one was a flight
                school, a ground school or a content site. Not one cited an airline
                disclosure, a regulator publication or a survey. Several quoted
                identical ranges, which tells you they share a source, and the source
                is each other.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Publishing our own range would add an eleventh unsourced page and make
                the problem marginally worse. It would also be the easiest page on this
                site to write, which is usually a warning rather than an opportunity.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                If you want a figure for planning, the honest way to get one is to ask
                working pilots at the specific employer and fleet you are aiming at,
                treat what they tell you as one data point rather than a market rate,
                and remember that people discussing pay online are not a random sample.
              </p>
            </section>

            <section aria-labelledby="what-moves-it">
              <h2 id="what-moves-it" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                What actually moves the number
              </h2>
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
                A claim that survives all six is worth something. Most do not survive
                the first.
              </p>
            </section>

            <section aria-labelledby="the-cost-side">
              <h2 id="the-cost-side" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                The side of the ledger you can actually pin down
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Earnings are unpublished, but costs are knowable, because you are the
                one being quoted. Getting the cost side right is worth more to a
                training decision than any earnings estimate, and it is the half you
                can verify before you commit.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The{" "}
                <Link to="/courses/cpl/fees" className="underline hover:text-primary">
                  CPL cost breakdown
                </Link>{" "}
                lists every component you will pay for and who sets each one, and{" "}
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
