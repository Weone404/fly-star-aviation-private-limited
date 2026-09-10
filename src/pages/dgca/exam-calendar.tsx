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
const faqs = PAGE_FAQS["/dgca/exam-calendar"];

const SOURCE = "DGCA Programme of Examinations 2026, DGCA examination portal, read 10 September 2026";
const SOURCE_URL = "https://pariksha.dgca.gov.in/";

/**
 * Transcribed from the DGCA programme, not rewritten.
 *
 * DGCA states on the document that the dates are tentative and subject to
 * change for gazetted holidays and similar, so that caveat travels with the
 * table wherever it appears and is never quietly dropped to make the page look
 * more authoritative than the source.
 */
const REGULAR: string[][] = [
  ["Regular Exam 01 of 2026", "10 to 14 March 2026"],
  ["Regular Exam 02 of 2026", "16 to 20 June 2026"],
  ["Regular Exam 03 of 2026", "22 to 26 September 2026"],
  ["Regular Exam 04 of 2026", "15 to 19 December 2026"],
];

const OLOD: string[][] = [
  ["Session 1 of 2026", "21 to 23 January 2026"],
  ["Session 2 of 2026", "4 to 6 February 2026"],
  ["Session 3 of 2026", "22 to 24 April 2026"],
  ["Session 4 of 2026", "20 to 22 May 2026"],
  ["Session 5 of 2026", "15 to 17 July 2026"],
  ["Session 6 of 2026", "19 to 21 August 2026"],
  ["Session 7 of 2026", "28 to 30 October 2026"],
  ["Session 8 of 2026", "18 to 20 November 2026"],
];

const FIR: string[][] = [
  ["Session 1", "28 to 30 January 2026"],
  ["Session 2", "18 to 20 February 2026"],
  ["Session 3", "18 to 20 March 2026"],
  ["Session 4", "27 to 29 April 2026"],
  ["Session 5", "13 to 15 May 2026"],
  ["Session 6", "22 to 24 June 2026"],
  ["Session 7", "20 to 22 July 2026"],
  ["Session 8", "12 to 14 August 2026"],
  ["Session 9", "16 to 18 September 2026"],
  ["Session 10", "21 to 23 October 2026"],
  ["Session 11", "25 to 27 November 2026"],
  ["Session 12", "21 to 23 December 2026"],
];

const PLANNING: { title: string; body: string }[] = [
  {
    title: "The computer number comes first, and it is not quick",
    body: "You cannot book any paper without one, and for a new candidate it is allotted only after DGCA scrutinises the online application against a hard copy posted to Delhi. Start it well before the session you are aiming at, not in the month of it.",
  },
  {
    title: "Regular and on-demand are the same exam on different schedules",
    body: "Four Regular sessions of five days each, eight on-demand sessions of three days each. The eligibility and the rules do not change between them; only how long you wait does.",
  },
  {
    title: "Stagger papers against the validity window, not against convenience",
    body: "A passed paper stays valid for a defined period. Sitting everything in one session and then stalling on the flying side can expire an early pass; spreading attempts across sessions costs nothing and protects the ones already banked.",
  },
  {
    title: "FIR and AFIR sessions are not your exam",
    body: "Twelve of the twenty-five sessions in the programme are Flight Instructor and Assistant Flight Instructor Rating examinations. If you are working towards a CPL or an ATPL, those twelve dates are noise.",
  },
  {
    title: "Treat every date as provisional until the portal confirms it",
    body: "The programme carries DGCA's own tentative caveat. Confirm on the portal before you book travel, book leave, or promise anyone anything.",
  },
];

export default function DgcaExamCalendarPage() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "DGCA", href: "/dgca" }, { label: "Exam calendar" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              DGCA Exam Dates 2026: The Full Programme of Examinations
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
          heading="When are the DGCA exams in 2026?"
          answer="DGCA publishes a Programme of Examinations for the calendar year. For 2026 it sets four Regular sessions of five days each, eight Online On-Demand sessions of three days each, twelve Flight Instructor and Assistant Flight Instructor Rating sessions, and a FATA examination in January. Every date below is transcribed from that programme. DGCA states on the document itself that the dates are tentative and subject to change for gazetted holidays and similar, so confirm on the examination portal before planning around any of them."
          sources={[{ label: SOURCE, url: SOURCE_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="Regular examination sessions, 2026"
          intro="Four sessions, five days each. These are the sessions most CPL and ATPL candidates plan around."
          columns={["Session", "Dates"]}
          rows={REGULAR}
          note={<>Tentative, per DGCA's own note on the programme.</>}
          sources={[{ label: SOURCE, url: SOURCE_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="Online On-Demand (OLOD) sessions, 2026"
          intro="Eight sessions, three days each. Same papers and same rules as a Regular session; the difference is how often the window opens."
          columns={["Session", "Dates"]}
          rows={OLOD}
          note={<>Tentative, per DGCA's own note on the programme.</>}
          sources={[{ label: SOURCE, url: SOURCE_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <CitableTable
          heading="FIR and AFIR sessions, 2026"
          intro="Flight Instructor Rating and Assistant Flight Instructor Rating examinations, roughly monthly. Listed for completeness; these are not the CPL or ATPL papers."
          columns={["Session", "Dates"]}
          rows={FIR}
          note={<>Tentative, per DGCA's own note on the programme. A FATA examination is also listed, for January 2026, without specific dates.</>}
          sources={[{ label: SOURCE, url: SOURCE_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <article>
          <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
            <section aria-labelledby="planning">
              <h2 id="planning" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                How to plan against this calendar
              </h2>
              <ol className="space-y-6">
                {PLANNING.map((item, i) => (
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

            <section aria-labelledby="what-this-page-is-not">
              <h2 id="what-this-page-is-not" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What this page is not
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                It is not the application window. The programme sets examination dates;
                the portal opens and closes applications separately, and those windows
                are announced on the portal rather than in this document. It is also not
                a substitute for the portal: a page on any website is a copy of a
                document that DGCA can reissue at any time.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Applications are made by the candidate, through the DGCA examination
                portal, using a computer number. No ground school can apply on your
                behalf, and any organisation offering to is describing something that
                does not exist.
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
                  <Link to="/dgca/computer-number" className="underline hover:text-primary">
                    Getting a DGCA computer number, which you need before booking anything
                  </Link>
                </li>
                <li>
                  <Link to="/blog/dgca-exam-attempts-and-validity" className="underline hover:text-primary">
                    How long a passed paper stays valid, and how many attempts you get
                  </Link>
                </li>
                <li>
                  <Link to="/blog/dgca-olode-vs-regular-exams" className="underline hover:text-primary">
                    On-demand against regular sessions, compared
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/ground-classes" className="underline hover:text-primary">
                    Ground classes for the papers themselves
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
