/**
 * The FAQ hub's questions.
 *
 * RULE: this hub introduces no facts. Every answer here is already stated and
 * sourced on the page it links to. If something is not sourced elsewhere on this
 * site, it does not belong in the hub — an aggregator that invents an answer is
 * worse than no aggregator, because the FAQPage schema makes it quotable.
 *
 * Lives in lib/ because src/lib/schema.ts generates the page's FAQPage JSON-LD
 * from this same array. One source, two consumers, no drift.
 */
export interface HubQuestion {
  q: string;
  a: string;
  /** Where this answer is treated in full. */
  href: string;
  linkLabel: string;
}

export interface HubSection {
  heading: string;
  intro: string;
  questions: HubQuestion[];
}

export const FAQ_SECTIONS: HubSection[] = [
  {
    heading: "Eligibility",
    intro: "Who may appear for DGCA examinations, and on what qualification.",
    questions: [
      {
        q: "What qualification do I need for the CPL exams?",
        a: "A pass in 10+2 standard with Physics and Mathematics from a recognised board, plus a computer number allotted by the Central Examination Organization. Chemistry is not part of the stated requirement.",
        href: "/blog/dgca-exam-subjects-by-licence",
        linkLabel: "Subjects and eligibility by licence",
      },
      {
        q: "What qualification do I need for the PPL exams?",
        a: "A pass in Class Ten or equivalent, plus a computer number. The 10+2 with Physics and Mathematics rule applies to the Commercial Pilot Licence, not the Private Pilot Licence.",
        href: "/pilot-training/ppl",
        linkLabel: "PPL requirements in India",
      },
      {
        q: "Is there a maximum age to register with DGCA?",
        a: "No. DGCA states there is no maximum age limit to register as a Flight Crew candidate. Age ceilings belong to airline recruitment and cadet programmes, which are separate from licensing.",
        href: "/blog/dgca-exam-misconceptions",
        linkLabel: "Common DGCA exam misconceptions",
      },
      {
        q: "Can I sit the ATPL exam without a CPL?",
        a: "DGCA states an ATPL applicant should hold an Indian Commercial Pilot Licence. Defence personnel may instead qualify on 500 hours of flying experience, of which 200 should be as Pilot-in-Command.",
        href: "/blog/atpl-eligibility-india",
        linkLabel: "ATPL eligibility in India",
      },
    ],
  },
  {
    heading: "Examinations",
    intro: "Subjects, pass marks, validity and what a paper costs.",
    questions: [
      {
        q: "What is the pass mark for DGCA theory papers?",
        a: "70% in each paper, with no aggregate across papers. A strong score in one subject cannot compensate for a shortfall in another. For the ATPL, 70% is also required in the oral examination.",
        href: "/blog/dgca-exam-subjects-by-licence",
        linkLabel: "Subjects and pass marks",
      },
      {
        q: "How long does a cleared DGCA paper stay valid?",
        a: "Five years for a CPL or ATPL paper, and two and a half years for a PPL paper. The shorter PPL window is rarely stated and changes how attempts should be staged.",
        href: "/blog/dgca-exam-subjects-by-licence",
        linkLabel: "Validity by licence",
      },
      {
        q: "How much does a DGCA exam paper cost?",
        a: "Rs 2,500 per paper for Flight Crew Licence online examination, and the fee is not refundable under any circumstances. DGCA publishes no separate fee for the on-demand route.",
        href: "/blog/dgca-exam-fees",
        linkLabel: "DGCA exam fees",
      },
      {
        q: "What is OLODE?",
        a: "The Online On-Demand Examination route. It lets a candidate book an available slot rather than waiting for a scheduled session. Syllabus, pass mark and eligibility are identical to a regular session.",
        href: "/blog/dgca-olode-vs-regular-exams",
        linkLabel: "OLODE vs regular sessions",
      },
      {
        q: "Are DGCA ground classes mandatory?",
        a: "No. The eligibility conditions are a computer number and the educational qualification for your licence. Ground school attendance is not among them, though a flying school may require it under its own contract.",
        href: "/blog/dgca-ground-classes-vs-self-study",
        linkLabel: "Ground classes vs self-study",
      },
    ],
  },
  {
    heading: "Registration and documents",
    intro: "The computer number, and the paperwork that gates it.",
    questions: [
      {
        q: "What is a DGCA computer number?",
        a: "The unique lifetime identifier allotted to a Flight Crew candidate by the Central Examination Organization. It is required to apply for any DGCA pilot examination, a candidate may hold only one, and it covers every Flight Crew examination category.",
        href: "/dgca/computer-number",
        linkLabel: "DGCA computer number guide",
      },
      {
        q: "Is the computer number generated automatically when I submit?",
        a: "No. For new candidates it is allotted only after DGCA scrutinises the online application against a hard copy posted to the Central Examination Organization.",
        href: "/dgca/computer-number",
        linkLabel: "The full application process",
      },
      {
        q: "What is a Board Verification Certificate?",
        a: "A certificate from the relevant board confirming that your mark sheet is authentic. It is mandatory for all NEW candidates before registration. Candidates allotted a number before the Pariksha portal launched do not need one.",
        href: "/blog/dgca-board-verification-certificate",
        linkLabel: "Board Verification Certificate",
      },
      {
        q: "Can I upload a document after Final Submission?",
        a: "No. Nothing can be uploaded after Final Submit, so every document must be assembled before you submit. Documents must be PDF; only the photograph and signature are JPEG.",
        href: "/dgca/computer-number",
        linkLabel: "Document requirements",
      },
    ],
  },
  {
    heading: "Training abroad and conversion",
    intro: "What a foreign licence does and does not permit in India.",
    questions: [
      {
        q: "Can I fly commercially in India on a foreign licence?",
        a: "Not without converting it. DGCA conversion under CAR Section 7, Series G, Part I requires written examinations through the Central Examination Organisation and a skill test with a DGCA-approved examiner in India.",
        href: "/pilot-training/guide-to-conversion",
        linkLabel: "Converting a foreign licence",
      },
      {
        q: "What currency does DGCA require on a foreign licence?",
        a: "At least 10 hours as Pilot-in-Command in the twenty-four months preceding the date of application, for the type of aircraft. This is the rule people discover too late.",
        href: "/pilot-training/guide-to-conversion",
        linkLabel: "The conversion currency rule",
      },
    ],
  },
  {
    heading: "About this site",
    intro: "How these answers are produced.",
    questions: [
      {
        q: "Where do these figures come from?",
        a: "DGCA's own Civil Aviation Requirements and its Pariksha Flight Crew FAQ, named on each page. Where we cannot source a figure, we say so and leave it out rather than repeating what is widely stated.",
        href: "/editorial-policy",
        linkLabel: "Our editorial policy",
      },
    ],
  },
];

/** Flat list, for the FAQPage schema node. */
export const FAQ_HUB_QUESTIONS = FAQ_SECTIONS.flatMap((s) =>
  s.questions.map(({ q, a }) => ({ q, a }))
);
