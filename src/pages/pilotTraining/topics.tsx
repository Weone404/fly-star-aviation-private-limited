import { PILOT_TRAINING_TOPICS, type Section } from "@/lib/pilotTrainingTopics";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import { CitableAnswer } from "@/components/CitableAnswer";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LAST_UPDATED = "2026-09-04";

function SectionBlock({ s }: { s: Section }) {
  return (
    <section className="scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{s.h2}</h2>

      {s.body?.map((p) => (
        <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-4">
          {p}
        </p>
      ))}

      {s.bullets && (
        <ul className="space-y-2 list-disc pl-5">
          {s.bullets.map((b) => (
            <li key={b} className="text-muted-foreground leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      )}

      {s.steps && (
        <ol className="space-y-3 list-decimal pl-5">
          {s.steps.map((b) => (
            <li key={b} className="text-muted-foreground leading-relaxed">
              {b}
            </li>
          ))}
        </ol>
      )}

      {s.table && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  {s.table.head.map((h, i) => (
                    <th
                      key={h || `col-${i}`}
                      scope="col"
                      className="text-left font-semibold p-3 border-b border-border"
                    >
                      {h || " "}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.table.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-border last:border-0">
                    <th scope="row" className="text-left font-semibold p-3 align-top">
                      {row[0]}
                    </th>
                    {row.slice(1).map((cell, i) => (
                      <td key={i} className="p-3 text-muted-foreground align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.table.caption && (
            <p className="mt-3 text-sm text-muted-foreground">{s.table.caption}</p>
          )}
        </>
      )}
    </section>
  );
}

export default function PilotTrainingTopic() {
  const { topic } = useParams();
  const data = topic ? PILOT_TRAINING_TOPICS[topic] : undefined;

  if (!data) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Page not found</h1>
          <Button variant="aviation" asChild>
            <Link to="/pilot-training">Pilot training overview</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Pilot Training", href: "/pilot-training" },
          { label: data.h1.split(":")[0] },
        ]}
      />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
              {data.h1}
            </h1>
            <p className="text-sm text-muted-foreground">
              Written by{" "}
              <Link to="/editorial-policy" className="underline hover:text-primary">
                Flying Star Aviator Academics Team
              </Link>{" "}
              · Last updated{" "}
              <time dateTime={LAST_UPDATED}>September 4, 2026</time>
            </p>
          </div>
        </header>

        <CitableAnswer
          heading={data.question}
          answer={data.answer}
          sources={data.sources}
          lastUpdated={LAST_UPDATED}
        />

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl space-y-12">
            {data.sections.map((s) => (
              <SectionBlock key={s.h2} s={s} />
            ))}

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {data.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section className="border-t border-border pt-8">
              <h2 className="text-xl font-bold mb-3">Related</h2>
              <ul className="space-y-2 list-disc pl-5">
                {data.related.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="underline hover:text-primary">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-muted/30 p-6">
              <h2 className="text-xl font-bold mb-2">Ask before you commit</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                We run DGCA CPL and ATPL ground classes from Dwarka, New Delhi.
                If you want the sequencing checked against your own papers,
                medical and budget, tell us where you are and we will map it out.
              </p>
              <Button variant="aviation" asChild>
                <Link to="/contact">Contact us</Link>
              </Button>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
