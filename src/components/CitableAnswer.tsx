/**
 * CitableAnswer — a front-loaded, self-contained answer block designed for
 * AI-search citability (AI Overviews, ChatGPT, Perplexity) and featured
 * snippets. Renders a question-style H2, a 130–170 word extractable answer,
 * optional Q&A pairs, and a visible "Last updated" date (a freshness signal).
 *
 * It is plain, server-renderable markup (no client-only APIs) so it appears in
 * the prerendered HTML that crawlers read.
 */
interface QA {
  q: string;
  a: string;
}

interface Source {
  label: string;
  url: string;
}

interface CitableAnswerProps {
  heading: string;
  answer: string;
  faqs?: QA[];
  /** Authoritative sources shown as citations (boosts AI-answer visibility). */
  sources?: Source[];
  /** ISO date, e.g. "2026-07-30" */
  lastUpdated: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function CitableAnswer({ heading, answer, faqs, sources, lastUpdated }: CitableAnswerProps) {
  return (
    <section className="py-14 bg-background border-b border-border/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{heading}</h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{answer}</p>

        {faqs && faqs.length > 0 && (
          <div className="mt-8 space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.q}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        )}

        {sources && sources.length > 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Sources: </span>
            {sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ", "}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="underline hover:text-primary"
                >
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        )}

        <p className="mt-4 text-sm text-muted-foreground/70">
          Last updated:{" "}
          <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </p>
      </div>
    </section>
  );
}

export default CitableAnswer;
