import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import { CitableAnswer } from "@/components/CitableAnswer";
import { Link } from "react-router-dom";
import { GLOSSARY } from "@/lib/glossary";

const LAST_UPDATED = "2026-11-18";

/**
 * Glossary of Indian pilot-training terms.
 *
 * Definition queries are how answer engines resolve entities, and several terms
 * here — computer number, OLODE, BVC, RTR(A) — are Indian regulatory specifics
 * with no international equivalent, so a model reading the site cold has nothing
 * else to anchor them against. Each definition is self-contained and drawn from
 * a source already cited on the page it links to.
 */
export default function Glossary() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <Layout>
      <Breadcrumb items={[{ label: "Glossary" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
              Indian Pilot Training Glossary
            </h1>
            <p className="text-sm text-muted-foreground">
              {sorted.length} terms ·{" "}
              <Link to="/editorial-policy" className="underline hover:text-primary">
                how we source definitions
              </Link>{" "}
              · Last updated{" "}
              <time dateTime={LAST_UPDATED}>November 18, 2026</time>
            </p>
          </div>
        </header>

        <CitableAnswer
          heading="What do DGCA, CPL, ATPL and RTR(A) mean in Indian pilot training?"
          answer="DGCA is India's civil aviation regulator and issues every pilot licence. A CPL permits flying for hire or reward; a PPL permits private flying only; an ATPL is the senior airline licence and requires an existing Indian CPL. RTR(A) is the separate radio-telephony licence required alongside a pilot licence."
          lastUpdated={LAST_UPDATED}
        />

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <dl className="space-y-8">
              {sorted.map((entry) => (
                <div key={entry.term} id={(entry.abbr || entry.term).toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                  <dt className="text-lg font-semibold text-foreground mb-2">
                    {entry.term}
                    {entry.abbr && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">({entry.abbr})</span>
                    )}
                  </dt>
                  <dd className="text-muted-foreground leading-relaxed">
                    {entry.definition}
                    {entry.href && (
                      <>
                        {" "}
                        <Link to={entry.href} className="underline hover:text-primary whitespace-nowrap">
                          Read more
                        </Link>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <section className="mt-12 border-t border-border pt-8" aria-labelledby="duty-time">
              <h2 id="duty-time" className="text-xl font-bold mb-3">
                Duty time, flight duty period and flight time
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In the DGCA flight-crew CAR issued in 2024, duty period runs
                from reporting or starting an assigned duty until the crew
                member is free of duties. Flight duty period is a continuous
                duty including flight, from reporting until engines are off
                after the last flight. Flight time runs from the aeroplane's
                first movement for take-off until it comes to rest at the end
                of the flight.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                These measures are not interchangeable. The{" "}
                <a href="https://www.dgca.gov.in/digigov-portal/Upload?attachId=YUKKrHOBzBr0RZyThH2OXw%3D%3D&amp;flag=iframeAttachView" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  DGCA flight-crew CAR issued in 2024
                </a>{" "}
                is a dated reference; later revisions and the applicable
                operator scheme have not been verified here. Check current
                requirements before relying on duty or rest limits.
              </p>
            </section>

            <section className="mt-12 border-t border-border pt-8">
              <h2 className="text-xl font-bold mb-3">A note on the definitions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Each entry describes what DGCA publishes, not what is commonly
                said. Where the two differ — the PPL qualification, the paper
                validity periods, the absence of a published OLODE fee — this
                glossary follows the regulator and the linked page shows the
                source.
              </p>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
