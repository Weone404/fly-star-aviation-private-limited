/**
 * Diagram specs for the blog, one entry per post.
 *
 * These replace the decorative illustrations. The previous house style forbade
 * text, letters and numbers in an image, on the reasoning that generated
 * lettering is unreliable and a wrong figure is worse than no picture. That
 * reasoning was right and the conclusion was wrong: the answer is not a picture
 * with no information, it is a picture whose text is typed rather than
 * generated.
 *
 * Every value below is copied from the post it belongs to, which already
 * carries its source. A diagram cannot drift from its article, because it is
 * built from the article. Rendered to SVG by scripts/generate-blog-diagrams.mjs:
 * real text a crawler can read, a few kilobytes instead of sixty, and crisp at
 * any size.
 */

export const PALETTE = {
  ink: "#123524",
  muted: "#4a5b52",
  rule: "#d8e0da",
  ground: "#f7f9f7",
  band: "#eef3ef",
  accent: "#1f6f43",
  warn: "#b7791f",
  amber: "#f6e6c8",
};

/** @type {Record<string, {type: string, title: string, source?: string, data: any}>} */
export const BLOG_DIAGRAMS = {
  "dgca-exam-subjects-by-licence": {
    type: "matrix",
    title: "DGCA theory requirements by licence",
    source: "CAR Section 7, Series B, Part I",
    data: {
      columns: ["", "PPL", "CPL", "ATPL"],
      rows: [
        ["Computer number", "Required", "Required", "Required"],
        ["Qualification to appear", "Class Ten pass", "10+2 with Physics and Maths", "Must hold an Indian CPL"],
        ["Pass mark", "70% per paper", "70% per paper", "70% per paper"],
        ["Paper validity", "2.5 years", "5 years", "5 years"],
      ],
    },
  },

  "dgca-exam-attempts-and-validity": {
    type: "timeline",
    title: "How long a passed DGCA paper stays valid",
    source: "CAR Section 7, Series B, Part I",
    data: {
      unit: "years from the date of passing",
      max: 5,
      bars: [
        { label: "PPL paper", value: 2.5, note: "two and a half years" },
        { label: "CPL paper", value: 5, note: "five years" },
        { label: "ATPL paper", value: 5, note: "five years" },
      ],
    },
  },

  "cpl-eligibility-after-12th": {
    type: "steps",
    title: "What DGCA requires before a CPL, in order",
    source: "CAR Section 7, Series B, Part I",
    data: {
      steps: [
        { n: "1", label: "10+2 with Physics and Mathematics", note: "Chemistry is not required" },
        { n: "2", label: "Class 1 medical", note: "The cheapest step that can end the plan" },
        { n: "3", label: "DGCA computer number", note: "Nothing can be booked without it" },
        { n: "4", label: "Theory papers at 70%", note: "Each paper separately, no aggregate" },
        { n: "5", label: "Flying hours at an approved FTO", note: "Schedule II, Aircraft Rules 1937" },
      ],
    },
  },

  "atpl-eligibility-india": {
    type: "matrix",
    title: "Why an ATPL is not a first licence",
    source: "CAR Section 7, Series B, Part I",
    data: {
      columns: ["", "CPL", "ATPL"],
      rows: [
        ["Prerequisite licence", "None", "Must already hold an Indian CPL"],
        ["Typical stage", "Entry to commercial flying", "Held while already flying commercially"],
        ["Theory papers", "Four subject areas", "Five subject areas plus an oral"],
        ["Flying experience", "Schedule II minimum", "Schedule II, substantially greater"],
      ],
    },
  },

  "dgca-olode-vs-regular-exams": {
    type: "matrix",
    title: "On-demand against regular DGCA sessions",
    source: "DGCA Programme of Examinations 2026",
    data: {
      columns: ["", "Regular session", "Online On-Demand"],
      rows: [
        ["Sessions in 2026", "4", "8"],
        ["Days per session", "5", "3"],
        ["Eligibility rules", "Same", "Same"],
        ["Pass mark", "70% per paper", "70% per paper"],
        ["What differs", "How long you wait", "How often the window opens"],
      ],
    },
  },

  "dgca-exam-pass-rate": {
    type: "absence",
    title: "DGCA exam pass rate: what backs each claim",
    source: "Checked against DGCA publications, September 2026",
    data: {
      rows: [
        { claim: "A specific national pass percentage", backing: "No DGCA document found", ok: false },
        { claim: "Per-paper pass rates by session", backing: "No DGCA document found", ok: false },
        { claim: "The 70% pass mark itself", backing: "CAR Section 7, Series B, Part I", ok: true },
        { claim: "Number of attempts permitted", backing: "See the validity and attempts guide", ok: true },
      ],
    },
  },

  "how-to-choose-a-flying-school-in-india": {
    type: "weighted",
    title: "How DGCA scores a flying training organisation",
    source: "DGCA Public Notice F. No: DGCA-16017/10/2025-DFT",
    data: {
      bars: [
        { label: "Operational aspects", value: 40, note: "student, instructor and engineer ratios, fleet, simulator" },
        { label: "FTO performance", value: 20, note: "time to 175 hours, utilisation, completion ratio" },
        { label: "Safety standards", value: 20, note: "accidents 18, incidents 2" },
        { label: "Compliance", value: 10, note: "Level-I observations, breath analyser" },
        { label: "Assistance to students", value: 10, note: "grievances, finance, placement, fee transparency" },
      ],
    },
  },

  "cadet-pilot-programme-vs-self-sponsored-cpl": {
    type: "matrix",
    title: "Cadet programme against self-sponsored training",
    source: "IndiGo careers page, retrieved 10 September 2026",
    data: {
      columns: ["", "Cadet programme", "Self-sponsored"],
      rows: [
        ["Who selects you", "The airline, before training", "Nobody; you choose the school"],
        ["Where you train", "A school the airline chose", "Any DGCA-approved FTO"],
        ["Cost", "Not published by the airline", "Quoted to you, component by component"],
        ["If you are not selected", "You are not in the programme", "There is no gate to fail"],
      ],
    },
  },
};
