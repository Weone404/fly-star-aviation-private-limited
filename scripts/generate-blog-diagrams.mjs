/**
 * Renders every spec in src/lib/blogDiagrams.js to an SVG in public/blog/diagrams/.
 *
 * SVG rather than a generated raster: the text is typed, so it cannot be wrong
 * the way generated lettering is; a crawler reads it as text; it is a few
 * kilobytes rather than sixty; and it stays crisp at any width.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/blog/diagrams");
const { BLOG_DIAGRAMS, PALETTE: P } = await import(path.join(ROOT, "src/lib/blogDiagrams.js"));

const W = 1200, H = 675, PAD = 64;
const TOP = 24; // extra head room for the accent rule above the title
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

function text(x, y, s, { size = 20, weight = 400, fill = P.ink, anchor = "start" } = {}) {
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;
}

/** Wrap on width estimate; SVG has no text metrics, so approximate by character. */
function wrap(s, chars) {
  const words = String(s).split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > chars && line) { lines.push(line); line = w; }
    else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function frame(title, source, body, h = H) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" role="img" aria-label="${esc(title)}">
<rect width="${W}" height="${h}" fill="${P.ground}"/>
<rect x="0" y="0" width="${W}" height="8" fill="${P.accent}"/>
<rect x="${PAD}" y="46" width="54" height="5" rx="2.5" fill="${P.warn}"/>
${text(PAD, 96, title, { size: 34, weight: 700 })}
${body}
${source ? text(PAD, h - 34, "Source: " + source, { size: 16, fill: P.muted }) : ""}
</svg>`;
}

const render = {
  matrix({ columns, rows }) {
    const n = columns.length;
    const x0 = PAD, tableW = W - PAD * 2;
    const firstW = tableW * 0.26;
    const colW = (tableW - firstW) / (n - 1);
    const colX = (i) => (i === 0 ? x0 : x0 + firstW + colW * (i - 1));
    const top = 146, rowH = 78;
    let out = `<rect x="${x0}" y="${top}" width="${tableW}" height="40" fill="${P.band}"/>`;
    columns.forEach((c, i) => { if (c) out += text(colX(i) + 14, top + 27, c, { size: 19, weight: 700 }); });
    rows.forEach((r, ri) => {
      const y = top + 40 + ri * rowH;
      if (ri % 2) out += `<rect x="${x0}" y="${y}" width="${tableW}" height="${rowH}" fill="#ffffff"/>`;
      out += `<line x1="${x0}" y1="${y}" x2="${x0 + tableW}" y2="${y}" stroke="${P.rule}" stroke-width="1"/>`;
      r.forEach((cell, ci) => {
        const width = ci === 0 ? firstW : colW;
        const chars = Math.floor(width / 8.6);
        wrap(cell, chars).slice(0, 3).forEach((ln, li) => {
          out += text(colX(ci) + 14, y + 30 + li * 21, ln, {
            size: 17, weight: ci === 0 ? 600 : 400, fill: ci === 0 ? P.ink : P.muted,
          });
        });
      });
    });
    return { body: out, height: top + 40 + rows.length * rowH + 76 };
  },

  timeline({ unit, max, bars }) {
    const x0 = PAD + 190, barW = W - x0 - PAD - 40;
    const top = 186, gap = 96;
    let out = text(PAD, 132, unit, { size: 18, fill: P.muted });
    for (let t = 0; t <= max; t++) {
      const x = x0 + (barW * t) / max;
      out += `<line x1="${x}" y1="${top - 16}" x2="${x}" y2="${top + gap * bars.length - 40}" stroke="${P.rule}" stroke-width="1"/>`;
      out += text(x, top - 24, String(t), { size: 15, fill: P.muted, anchor: "middle" });
    }
    bars.forEach((b, i) => {
      const y = top + i * gap;
      out += text(PAD, y + 34, b.label, { size: 21, weight: 600 });
      const w = (barW * b.value) / max;
      out += `<rect x="${x0}" y="${y + 10}" width="${w}" height="34" rx="4" fill="${P.accent}"/>`;
      // Long bars carry their label inside, so nothing runs off the right edge.
      const inside = w > barW * 0.75;
      out += text(inside ? x0 + w - 14 : x0 + w + 14, y + 34, b.note, {
        size: 17, fill: inside ? "#ffffff" : P.muted, anchor: inside ? "end" : "start",
      });
    });
    return { body: out, height: top + bars.length * gap + 40 };
  },

  weighted({ bars }) {
    const x0 = PAD + 300, barW = W - x0 - PAD - 70;
    const top = 158, gap = 88;
    let out = "";
    bars.forEach((b, i) => {
      const y = top + i * gap;
      out += text(PAD, y + 26, b.label, { size: 20, weight: 600 });
      wrap(b.note, 34).slice(0, 2).forEach((ln, li) => out += text(PAD, y + 48 + li * 18, ln, { size: 14, fill: P.muted }));
      out += `<rect x="${x0}" y="${y + 6}" width="${barW}" height="30" rx="4" fill="${P.band}"/>`;
      out += `<rect x="${x0}" y="${y + 6}" width="${(barW * b.value) / 40}" height="30" rx="4" fill="${P.accent}"/>`;
      out += text(x0 + barW + 14, y + 28, b.value + "%", { size: 20, weight: 700 });
    });
    return { body: out, height: top + bars.length * gap + 60 };
  },

  steps({ steps }) {
    const top = 148, gap = 88;
    let out = "";
    steps.forEach((s, i) => {
      const y = top + i * gap;
      out += `<circle cx="${PAD + 22}" cy="${y + 22}" r="22" fill="${P.accent}"/>`;
      out += text(PAD + 22, y + 29, s.n, { size: 20, weight: 700, fill: "#ffffff", anchor: "middle" });
      if (i < steps.length - 1) out += `<line x1="${PAD + 22}" y1="${y + 46}" x2="${PAD + 22}" y2="${y + gap}" stroke="${P.rule}" stroke-width="2"/>`;
      out += text(PAD + 66, y + 20, s.label, { size: 22, weight: 600 });
      out += text(PAD + 66, y + 45, s.note, { size: 17, fill: P.muted });
    });
    return { body: out, height: top + steps.length * gap + 50 };
  },

  stat({ hero, rows }) {
    const top = 150, panelH = 168;
    let out = `<rect x="${PAD}" y="${top}" width="${W - PAD * 2}" height="${panelH}" rx="8" fill="${P.amber}"/>`;
    // Value on its own line, label beneath it: the value's width is not
    // knowable without text metrics, so nothing is positioned relative to it.
    out += text(PAD + 36, top + 84, hero.value, { size: 68, weight: 700, fill: P.ink });
    wrap(hero.label, 62).slice(0, 2).forEach((ln, li) =>
      out += text(PAD + 36, top + 120 + li * 24, ln, { size: 20, fill: P.muted }));
    const rowH = 70;
    rows.forEach((r, i) => {
      const y = top + panelH + 46 + i * rowH;
      out += `<line x1="${PAD}" y1="${y - 26}" x2="${W - PAD}" y2="${y - 26}" stroke="${P.rule}" stroke-width="1"/>`;
      out += text(PAD, y, r[0], { size: 19, weight: 600 });
      wrap(r[1], 52).slice(0, 2).forEach((ln, li) =>
        out += text(PAD + 400, y + li * 22, ln, { size: 18, fill: P.muted }));
    });
    return { body: out, height: top + panelH + 46 + rows.length * rowH + 56 };
  },

  absence({ rows }) {
    const x0 = PAD, tableW = W - PAD * 2, half = tableW * 0.46;
    const top = 150, rowH = 84;
    let out = `<rect x="${x0}" y="${top}" width="${tableW}" height="40" fill="${P.band}"/>`;
    out += text(x0 + 14, top + 27, "Claim you will see", { size: 19, weight: 700 });
    out += text(x0 + half + 14, top + 27, "What actually backs it", { size: 19, weight: 700 });
    rows.forEach((r, ri) => {
      const y = top + 40 + ri * rowH;
      out += `<line x1="${x0}" y1="${y}" x2="${x0 + tableW}" y2="${y}" stroke="${P.rule}" stroke-width="1"/>`;
      wrap(r.claim, 44).slice(0, 2).forEach((ln, li) => out += text(x0 + 14, y + 32 + li * 22, ln, { size: 18 }));
      const colour = r.ok ? P.accent : P.warn;
      out += `<rect x="${x0 + half}" y="${y + 14}" width="4" height="${rowH - 28}" fill="${colour}"/>`;
      wrap(r.backing, 40).slice(0, 2).forEach((ln, li) =>
        out += text(x0 + half + 18, y + 32 + li * 22, ln, { size: 18, weight: r.ok ? 400 : 600, fill: colour }));
    });
    return { body: out, height: top + 40 + rows.length * rowH + 76 };
  },
};

fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const [slug, spec] of Object.entries(BLOG_DIAGRAMS)) {
  const draw = render[spec.type];
  if (!draw) throw new Error(`No renderer for diagram type "${spec.type}" (${slug})`);
  const { body, height } = draw(spec.data);
  const svg = frame(spec.title, spec.source, body, height);
  fs.writeFileSync(path.join(OUT, `${slug}.svg`), svg);
  n++;
}
console.log(`[diagrams] ${n} SVGs written to public/blog/diagrams/`);
