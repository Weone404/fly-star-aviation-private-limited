/**
 * CitableTable — a titled, self-contained data table designed for AI-answer
 * citation and featured snippets (comparison / fee / spec tables are among the
 * most-cited content formats). Plain server-renderable markup so it appears in
 * the prerendered HTML crawlers read.
 */
interface Source {
  label: string;
  url: string;
}

interface CitableTableProps {
  heading: string;
  intro?: string;
  columns: string[];
  rows: string[][];
  /** Caption/disclaimer under the table (e.g. figures are indicative). */
  note?: string;
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

export function CitableTable({ heading, intro, columns, rows, note, sources, lastUpdated }: CitableTableProps) {
  return (
    <section className="py-14 bg-background border-b border-border/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{heading}</h2>
        {intro && (
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">{intro}</p>
        )}

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-muted/50">
                {columns.map((c) => (
                  <th key={c} className="px-4 py-3 font-semibold text-foreground border-b border-border">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 ? "bg-muted/20" : ""}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 align-top text-muted-foreground border-b border-border/60">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {note && <p className="mt-4 text-sm text-muted-foreground/80 italic">{note}</p>}

        {sources && sources.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Sources: </span>
            {sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ", "}
                <a href={s.url} target="_blank" rel="noopener nofollow" className="underline hover:text-primary">
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        )}

        <p className="mt-3 text-sm text-muted-foreground/70">
          Last updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </p>
      </div>
    </section>
  );
}

export default CitableTable;
