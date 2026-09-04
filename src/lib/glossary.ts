/**
 * Indian pilot-training glossary.
 *
 * Definition queries ("what is a computer number", "what is OLODE") are how
 * answer engines resolve an entity, and a glossary is the canonical shape for
 * them. It also disambiguates this site's own vocabulary for a model reading it
 * cold — which matters more than usual here, where several terms are Indian
 * regulatory specifics with no international equivalent.
 *
 * Every definition is 40-60 words, self-contained, and drawn from a source
 * already cited elsewhere on the site. No term gets an entry we cannot support.
 */
export interface GlossaryTerm {
  term: string;
  abbr?: string;
  definition: string;
  href?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Airline Transport Pilot Licence",
    abbr: "ATPL",
    definition:
      "The senior pilot licence in India, held by airline captains. DGCA states an applicant should already hold an Indian Commercial Pilot Licence, with a separate route for defence personnel on 500 hours including 200 as Pilot-in-Command. An ATPL is not issued on a single-engine aircraft.",
    href: "/blog/atpl-eligibility-india",
  },
  {
    term: "Board Verification Certificate",
    abbr: "BVC",
    definition:
      "A certificate issued by your school board confirming that your 10th, 10+2, 10+2-equivalent or Diploma mark sheet is authentic. DGCA requires one from every NEW Flight Crew candidate before registration. Candidates allotted a computer number before the Pariksha portal launched do not need one.",
    href: "/blog/dgca-board-verification-certificate",
  },
  {
    term: "Central Examination Organization",
    abbr: "CEO",
    definition:
      "The DGCA office that allots computer numbers and conducts Flight Crew examinations, located at East Block-III, Level-III, R.K. Puram, New Delhi 110066. New candidates post their printed application here, and it is the authority that scrutinises applications before a number is issued.",
    href: "/dgca/computer-number",
  },
  {
    term: "Civil Aviation Requirements",
    abbr: "CAR",
    definition:
      "DGCA's published regulatory requirements, organised by section, series and part. Section 7 Series 'B' Part I governs eligibility for flight crew examinations; Section 7 Series 'G' Part I governs conversion of a foreign licence. CARs are revised, so the revision number matters when citing one.",
  },
  {
    term: "Commercial Pilot Licence",
    abbr: "CPL",
    definition:
      "The licence that permits flying for hire or reward in India. Appearing for the theory papers requires a computer number and a pass in 10+2 with Physics and Mathematics. Chemistry is not part of the stated requirement. A cleared CPL paper stays valid for five years.",
    href: "/become-a-pilot/commercial-pilot-licence",
  },
  {
    term: "Computer Number",
    definition:
      "The unique lifetime identifier DGCA allots to a Flight Crew candidate through the Central Examination Organization. It is required to apply for any DGCA pilot examination, a candidate may hold only one, and it covers every Flight Crew examination category. Your portal login becomes this number prefixed 'P-'.",
    href: "/dgca/computer-number",
  },
  {
    term: "Directorate General of Civil Aviation",
    abbr: "DGCA",
    definition:
      "India's civil aviation regulator, headquartered in New Delhi. It issues every pilot licence in India, approves Flying Training Organisations, and conducts the theory examinations that licensing depends on through its Central Examination Organization.",
    href: "/dgca/full-form",
  },
  {
    term: "Flying Training Organisation",
    abbr: "FTO",
    definition:
      "A DGCA-approved school where flight hours are logged. An FTO is a separate institution from a ground school: one provides aircraft, instructors and flying time, the other teaches theory for the written papers. Clearing one does nothing for the other.",
    href: "/blog/how-to-choose-a-flying-school-in-india",
  },
  {
    term: "Ground Classes",
    definition:
      "Classroom teaching for the DGCA theory subjects. Not a licensing requirement: DGCA's eligibility conditions list a computer number and an educational qualification, and attendance appears nowhere in them. A flying school may still require a ground phase under its own training contract.",
    href: "/blog/dgca-ground-classes-vs-self-study",
  },
  {
    term: "Online On-Demand Examination",
    abbr: "OLODE",
    definition:
      "DGCA's on-demand examination route, where a candidate books an available slot instead of waiting for a scheduled session date. Syllabus, the 70% pass mark and eligibility are identical to a regular session. DGCA publishes no separate fee for it.",
    href: "/blog/dgca-olode-vs-regular-exams",
  },
  {
    term: "Pilot-in-Command",
    abbr: "PIC",
    definition:
      "The pilot responsible for the operation and safety of the aircraft during flight time. PIC hours are counted separately from total flight time and carry their own minimums — DGCA's foreign-licence conversion rule, for instance, requires at least 10 hours as PIC in the preceding 24 months.",
    href: "/pilot-training/guide-to-conversion",
  },
  {
    term: "Private Pilot Licence",
    abbr: "PPL",
    definition:
      "A licence permitting private flying, not flying for hire or reward. To appear for the theory papers DGCA requires a computer number and a pass in Class Ten or equivalent — not 10+2 with Physics and Mathematics, which is the CPL rule. A cleared PPL paper is valid two and a half years.",
    href: "/pilot-training/ppl",
  },
  {
    term: "Radio Telephony Restricted (Aeronautical)",
    abbr: "RTR(A)",
    definition:
      "The radio-telephony licence required alongside a pilot licence in India. It is a separate examination with its own syllabus and a practical component, sitting outside the DGCA theory papers and usually outside a ground-class package. Confirm the current examining authority before applying.",
    href: "/rtr",
  },
  {
    term: "Schedule II, Aircraft Rules 1937",
    definition:
      "The schedule setting licence requirements including flight-time minimums, medical fitness and the documents an applicant must produce. Where a page states an hours figure, Schedule II is the document that governs it — and the reason we hold figures we have not read there directly.",
  },
];
