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
const faqs = PAGE_FAQS["/dgca/fto-ranking"];

/** DGCA Public Notice F. No: DGCA-16017/10/2025-DFT, dated 30 September 2025. */
const NOTICE = "DGCA Public Notice F. No: DGCA-16017/10/2025-DFT, 30 September 2025";
const NOTICE_URL =
  "https://www.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView&attachId=OXOBBPO50KNsVklXF1f0cQ%3D%3D&baseLocale=en_US";

const GRADES: string[][] = [
  ["A+", "85% and above", "No organisation reached this band in the first ranking."],
  ["A", "70% to less than 85%", "No organisation reached this band in the first ranking."],
  ["B", "50% to less than 70%", "Thirteen organisations were in this band in the first ranking."],
  ["C", "Below 50%", "Twenty-two organisations were in this band in the first ranking."],
];

const PARAMETERS: string[][] = [
  [
    "Operational aspects",
    "40%",
    "Student-to-aircraft ratio (10), student-to-instructor ratio (10), fleet-to-maintenance-engineer ratio (10), fleet size (5), ground school and simulator availability (5)",
  ],
  [
    "FTO performance",
    "20%",
    "Average time to complete 175 flying hours (10; a ranking metric, not a CPL minimum), aircraft utilisation over the last six months (5), trainee completion-to-enrolment ratio (5)",
  ],
  ["Safety standards", "20%", "Accident count (18), incident count (2)"],
  ["Compliance standards", "10%", "Level-I safety observations (5), breath analyser violations (5)"],
  [
    "Assistance to students",
    "10%",
    "Grievance resolution (4), financial assistance (2), placement support (2), fee transparency (2)",
  ],
];

const HOW_TO_USE: { title: string; body: string }[] = [
  {
    title: "Read the parameter weights, not just the letter",
    body: "The DGCA notice assigns points to student-to-aircraft, student-to-instructor and fleet-to-engineer ratios. Ask an FTO for the current figures and the date and scope they describe.",
  },
  {
    title: "Ask about the ten per cent for time-to-175-hours",
    body: "The notice includes average time to complete 175 flying hours as a ranking metric; it does not state that figure here as a CPL minimum. Ask the school what current data it can provide and how it defines the measurement.",
  },
  {
    title: "Treat safety weighting as a floor, not a feature",
    body: "The notice allocates 18 of 20 safety points to accident count and 2 to incident count. A ranking score is a snapshot of the stated metrics, not a guarantee of future safety.",
  },
  {
    title: "Notice what the grade does not measure",
    body: "The published groups score operational aspects, FTO performance, safety, compliance and student assistance. The notice does not provide a direct rating of teaching quality or an individual trainee's experience.",
  },
  {
    title: "Check the current list at the source",
    body: "Rankings are published twice a year, so any list on any website, this one included, is a snapshot. Read the live one from DGCA before you decide.",
  },
];

export default function DgcaFtoRankingPage() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "DGCA", href: "/dgca" }, { label: "FTO ranking" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              How DGCA Ranks Flying Schools, and How to Use the Ranking
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
          heading="Does DGCA rank flying training organisations in India?"
          answer="Yes. DGCA introduced a ranking framework for approved Flying Training Organisations with effect from 1 October 2025, scoring each FTO out of 100 across five weighted parameter groups and placing it in band A+, A, B or C. Rankings are published twice a year. In the first ranking, covering September 2024 to August 2025, no organisation reached A or A+. The framework is published in full, which means you can read the criteria yourself rather than take any school's word for its standing."
          sources={[{ label: NOTICE, url: NOTICE_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="The four bands"
          intro="A single overall percentage score places the organisation in one band. There is no separate qualitative judgement."
          columns={["Band", "Score", "Status"]}
          rows={GRADES}
          sources={[{ label: NOTICE, url: NOTICE_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="What the score is made of"
          intro="Five groups, weighted. The sub-weights in brackets are percentage points of the total. Student-to-aircraft ratio is worth 10 points; financial assistance, placement support and fee transparency total 6 points."
          columns={["Parameter group", "Weight", "What it scores"]}
          rows={PARAMETERS}
          note={
            <>
              Operational aspects carry the largest group weight at 40 per cent.
              The notice lists student-to-aircraft and student-to-instructor ratios,
              fleet-to-engineer ratio, fleet size, and ground-school and simulator
              availability within that group.
            </>
          }
          sources={[{ label: NOTICE, url: NOTICE_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <article>
          <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
            <section aria-labelledby="what-happened">
              <h2 id="what-happened" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What the rankings have shown so far
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The first ranking, published with the notice that created the framework
                and covering 1 September 2024 to 31 August 2025, placed thirteen
                organisations in band B and twenty-two in band C. None reached A or A+.
                That is the regulator's own assessment of the sector at the point the
                framework began.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                This page reports only results directly documented in the DGCA notice.
                Later ranking results and pilot-demand figures previously associated
                with this page were not independently verified against an accessible
                official source in this review. Check DGCA's current ranking document
                for later results.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Flying Star Aviator is a ground school and career-guidance organisation
                and is not itself an FTO, so it does not appear in these rankings and
                has no grade to quote. Flying Star does not provide aircraft flying
                training; confirm any separate FTO arrangements directly with the
                provider. Consult DGCA's published notice and verify that it remains
                current before relying on a ranking.
              </p>
            </section>

            <section aria-labelledby="how-to-use">
              <h2 id="how-to-use" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                How to use the ranking when choosing a school
              </h2>
              <ol className="space-y-6">
                {HOW_TO_USE.map((item, i) => (
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

            <section aria-labelledby="igrua">
              <h2 id="igrua" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                How can you compare IGRUA and other flying schools?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Indira Gandhi Rashtriya Uran Akademi (IGRUA) lists an ab-initio
                CPL course with instrument rating and multi-engine endorsement.
                Its{" "}
                <a href="https://igrua.gov.in/approved-courses" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  official course page
                </a>, checked on 18 November 2026, states a course fee of
                Rs 55 lakh and lists additional expenses separately. It is not
                a complete budget for every student or a price for other schools.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A search for the top 10 pilot training institutes in India with
                fees does not establish an official price ranking. Compare
                current written quotes, inclusions, approvals and refund terms;
                check IGRUA's{" "}
                <a href="https://igrua.gov.in/igrua-entrance" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  entrance information
                </a>{" "}
                for the relevant intake. The{" "}
                <Link to="/courses/cpl/fees" className="underline hover:text-primary">CPL cost checklist</Link>{" "}
                helps identify costs outside a quoted fee.
              </p>
            </section>

            <section aria-labelledby="limits">
              <h2 id="limits" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What a band does not tell you
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A C grade means an organisation scored below fifty per cent against this
                framework in that evaluation window and has been sent an improvement
                notice. It does not mean the organisation is unsafe or that its
                graduates are unemployable, and a band can move at the next publication.
                Equally, a B grade is not an endorsement of anything beyond what the
                five parameter groups measure.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Use it the way DGCA appears to intend it: as a published, comparable
                signal to put alongside your own visit, your own questions about
                aircraft availability, and a written quotation. The questions worth
                asking are set out in the{" "}
                <Link to="/courses/cpl/fees" className="underline hover:text-primary">
                  cost breakdown
                </Link>
                , and the{" "}
                <Link to="/blog/how-to-choose-a-flying-school-in-india" className="underline hover:text-primary">
                  guide to choosing a flying school
                </Link>{" "}
                covers what to look for on the visit itself.
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

            <section aria-labelledby="sources-block">
              <h2 id="sources-block" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Official sources
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                <li>
                  {NOTICE} - the framework, the bands, the parameter weights and the
                  first ranking.{" "}
                  <a href={NOTICE_URL} rel="nofollow" className="underline hover:text-primary">
                    Read it at DGCA
                  </a>
                  .
                </li>
                <li>
                  DGCA publishes the current ranking as a document on its portal. It is
                  reissued twice a year, so check the date on whichever copy you open.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related">
              <h2 id="related" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Related
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>
                  <Link to="/blog/how-to-choose-a-flying-school-in-india" className="underline hover:text-primary">
                    How to choose a flying school in India
                  </Link>
                </li>
                <li>
                  <Link to="/courses/cpl/fees" className="underline hover:text-primary">
                    What CPL training costs, component by component
                  </Link>
                </li>
                <li>
                  <Link to="/pilot-training/india" className="underline hover:text-primary">
                    Pilot training in India
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
