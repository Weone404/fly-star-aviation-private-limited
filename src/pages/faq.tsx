import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import { CitableAnswer } from "@/components/CitableAnswer";
import { Link } from "react-router-dom";
import { FAQ_SECTIONS } from "@/lib/faqHub";

const LAST_UPDATED = "2026-09-04";

/**
 * FAQ hub.
 *
 * Every answer is already sourced on the page it links to; this page aggregates
 * rather than asserts. Questions live in src/lib/faqHub.ts because schema.ts
 * builds the FAQPage JSON-LD from the same array — the visible text and the
 * structured data cannot drift.
 */
export default function FaqHub() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "FAQ" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
              DGCA and Pilot Training: Frequently Asked Questions
            </h1>
            <p className="text-sm text-muted-foreground">
              Answers sourced from DGCA's published rules ·{" "}
              <Link to="/editorial-policy" className="underline hover:text-primary">
                how we verify them
              </Link>{" "}
              · Last updated{" "}
              <time dateTime={LAST_UPDATED}>September 4, 2026</time>
            </p>
          </div>
        </header>

        <CitableAnswer
          heading="What are the basic requirements to become a commercial pilot in India?"
          answer="A DGCA Commercial Pilot Licence requires a pass in 10+2 with Physics and Mathematics, a computer number from the Central Examination Organization, a Class 1 medical, passes at 70% in the DGCA theory papers, and the flight experience set in Schedule II of the Aircraft Rules 1937. Ground classes are not a licensing requirement."
          lastUpdated={LAST_UPDATED}
        />

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl space-y-12">
            {FAQ_SECTIONS.map((section) => (
              <section key={section.heading} aria-labelledby={section.heading.toLowerCase().replace(/\s+/g, "-")}>
                <h2
                  id={section.heading.toLowerCase().replace(/\s+/g, "-")}
                  className="text-2xl md:text-3xl font-bold mb-2"
                >
                  {section.heading}
                </h2>
                <p className="text-muted-foreground mb-6">{section.intro}</p>

                <div className="space-y-7">
                  {section.questions.map((item) => (
                    <div key={item.q}>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                      <p className="mt-2 text-sm">
                        <Link to={item.href} className="underline hover:text-primary">
                          {item.linkLabel}
                        </Link>
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="border-t border-border pt-8">
              <h2 className="text-xl font-bold mb-3">Not answered here?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every answer above links to the page that treats it in full, with
                its source named. If your question is about your own papers,
                medical or timeline,{" "}
                <Link to="/contact" className="underline hover:text-primary">
                  ask us
                </Link>{" "}
                — including when the answer is that you do not need us.
              </p>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
