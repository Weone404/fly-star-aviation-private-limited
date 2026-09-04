import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import { Link } from "react-router-dom";

const LAST_UPDATED = "2026-09-04";

export default function EditorialPolicy() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "Editorial Policy" }]} />

      <main className="py-12 md:py-16">
        <article className="container mx-auto px-4 max-w-3xl">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Editorial Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated:{" "}
              <time dateTime={LAST_UPDATED}>September 4, 2026</time>
            </p>
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-lg prose-p:leading-relaxed">
            <p>
              Guides on this site are published under the byline{" "}
              <strong>Flying Star Aviator Academics Team</strong>. This page
              explains how they are researched, what we will and will not state,
              and how to tell us we are wrong. It exists because a reader
              deciding whether to trust a page about examination rules deserves
              to see the process behind it, not just the claim.
            </p>

            <h2>Why an institutional byline</h2>
            <p>
              Our guides to DGCA examinations are reference material. Their
              claims rest on what the Directorate General of Civil Aviation
              publishes — the examination fee, the eligibility rule, the
              document specifications — not on any individual's opinion.
              Authority for that kind of content comes from the source and from
              a visible, repeatable process, so we sign it institutionally and
              show our sourcing instead.
            </p>
            <p>
              Where an article's value does rest on individual judgement or
              first-hand experience, we name the author and state their
              credentials.
            </p>

            <h2>How we research</h2>
            <p>
              <strong>Primary sources first.</strong> For anything about DGCA
              examinations, the authority is DGCA — dgca.gov.in and
              pariksha.dgca.gov.in. For radio telephony it is the Wireless
              Planning and Coordination Wing. Where an official document states
              a fact, that is the fact we publish, and we name the source in the
              text.
            </p>
            <p>
              <strong>We keep a research file.</strong> Official pages and
              documents we rely on are saved with the URL and the date they were
              retrieved, so any claim can be traced back and re-checked later. A
              guide is written from that file, not from other people's articles.
            </p>
            <p>
              <strong>Secondary sources are treated as leads, not evidence.</strong>{" "}
              Where we have only a secondary source for a number, we say so in
              the text rather than presenting it as settled.
            </p>

            <h2>What we will not do</h2>
            <p>
              <strong>We do not publish a number we have not verified.</strong>{" "}
              If a figure matters and we cannot source it, the page says the
              figure is unconfirmed and points you at the authority. It does not
              appear as though it were established.
            </p>
            <p>
              <strong>
                We do not put unverified figures into structured data.
              </strong>{" "}
              Machine-readable markup gets copied and repeated by other
              services, so an error there spreads beyond our ability to correct
              it. Only verified values go into it.
            </p>
            <p>
              <strong>
                We do not present open questions as settled corrections.
              </strong>{" "}
              Where sources genuinely conflict, the article says so in its own
              section and tells you where to check. A confident wrong answer is
              worse than an acknowledged gap.
            </p>
            <p>
              <strong>We do not name or criticise other institutes.</strong>{" "}
              Where we believe a widely repeated claim is wrong, we state the
              correct fact and cite its source. Whose page carried the error is
              not the reader's problem.
            </p>
            <p>
              <strong>We do not claim outcomes we cannot evidence.</strong> No
              guaranteed results, no pass rates we cannot substantiate, no
              placement promises.
            </p>

            <h2>How we handle dates and changes</h2>
            <p>
              <strong>Claims are anchored in time.</strong> Aviation rules
              change. Where a requirement could be revised, we write it as "as of
              [month year], DGCA states…" so a claim stays accurate as a
              statement of what the source said when we checked it.
            </p>
            <p>
              <strong>We re-check published guides every quarter.</strong> Fees,
              rules, dates and procedures are re-verified against the original
              sources, and where anything has changed we update the article and
              its last-updated date. Guides whose value depends on correcting a
              common misunderstanding are re-checked first, because those do the
              most damage if they go stale.
            </p>
            <p>
              <strong>Last-updated dates are real.</strong> We change that date
              when the content changes, not to signal freshness.
            </p>

            <h2>Corrections</h2>
            <p>
              If something on this site is wrong, tell us and we will fix it and
              note the change. Accuracy on examination requirements matters more
              to us than being first, and a reader who catches an error has done
              us a favour.
            </p>
            <p>
              <strong>Contact:</strong>{" "}
              <a href="mailto:flyingstaraviator@gmail.com">
                flyingstaraviator@gmail.com
              </a>{" "}
              · <a href="tel:+919953536199">+91 99535 36199</a>
            </p>

            <h2>About the pages that sell something</h2>
            <p>
              Course and service pages describe what we offer and are written to
              be useful, but they are sales pages and you should read them as
              such. The guides are different: they are written to answer a
              question accurately whether or not you ever become a student here,
              and they will sometimes tell you that the answer is "you do not
              need us for this."
            </p>

            <hr />
            <p className="text-sm">
              Flying Star Aviator Private Limited runs{" "}
              <Link to="/dgca/ground-classes">
                DGCA CPL and ATPL ground classes
              </Link>{" "}
              in Dwarka, New Delhi.
            </p>
          </div>
        </article>
      </main>
    </Layout>
  );
}
