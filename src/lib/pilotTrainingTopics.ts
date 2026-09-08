/**
 * Data for the five /pilot-training/* topic pages.
 *
 * Lives in lib/ rather than beside the component because src/lib/schema.ts also
 * reads it: the FAQPage JSON-LD for these pages is generated from the very same
 * `faqs` arrays the page renders, so the visible text and the structured data
 * are physically one source and cannot drift apart.
 */

const CAR_B1 = {
  label: "DGCA CAR Section 7, Series 'B', Part I (Issue III, Rev 2, 13 Feb 2019)",
  url: "https://www.dgca.gov.in/digigov-portal/?dynamicPage=circularsRulesFlightCrewLic%2F7%2F3324%2FviewDynamicRuleContLvl2",
};
const CAR_G1 = {
  label: "DGCA CAR Section 7, Series 'G', Part I (Issue II, Rev 4, 9 Sep 2019)",
  url: "https://www.dgca.gov.in/digigov-portal/?dynamicPage=circularsRulesFlightCrewLic%2F7%2F3324%2FviewDynamicRuleContLvl2",
};

export interface Section {
  h2: string;
  body?: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][]; caption?: string };
  steps?: string[];
}

export interface Topic {
  h1: string;
  question: string;
  answer: string;
  sources: { label: string; url: string }[];
  sections: Section[];
  faqs: { q: string; a: string }[];
  related: { to: string; label: string }[];
}

export const PILOT_TRAINING_TOPICS: Record<string, Topic> = {
  /* ─────────────────────────────── PPL ─────────────────────────────── */
  ppl: {
    h1: "PPL Training in India: Eligibility, Exams and What It Does Not Get You",
    question: "What does a Private Pilot Licence require in India?",
    answer:
      "A Private Pilot Licence lets you fly privately, not for hire or reward. To sit the DGCA theory papers for a PPL you need a computer number from the Central Examination Organization and a pass in Class 10 or equivalent — not 10+2 with Physics and Mathematics, which is the Commercial Pilot Licence rule. The pass mark is 70%.",
    sources: [CAR_B1],
    sections: [
      {
        h2: "Is a PPL the same starting point as a CPL?",
        body: [
          "No, and this is where most planning goes wrong. A PPL and a CPL are separate licences with separate eligibility rules, separate theory papers and separate paper-validity periods. A PPL permits private flying; it does not permit flying for hire or reward, which is what a commercial career requires.",
          "Many candidates take a PPL first because it builds hours and confidence before committing to the full commercial route. That is a reasonable choice. It is not, however, a prerequisite — you can pursue a CPL directly if you meet the CPL eligibility rules.",
        ],
      },
      {
        h2: "What are the DGCA exam eligibility rules for a PPL?",
        table: {
          head: ["", "PPL", "CPL"],
          rows: [
            ["Computer number", "Required, from CEO, DGCA", "Required, from CEO, DGCA"],
            [
              "Educational qualification",
              "Passed Class Ten or equivalent from a recognised board",
              "Passed 10+2 with Physics and Mathematics from a recognised board",
            ],
            [
              "Theory subjects",
              "Composite Paper; Aircraft & Engine / Instruments in general and specific",
              "Air Navigation; Aviation Meteorology; Air Regulation; Aircraft & Engine / Instruments in general, specific and performance",
            ],
            ["Pass mark", "70%", "70%"],
            ["Validity of a passed paper", "Two and a half years", "Five years"],
          ],
          caption: "Source: DGCA CAR Section 7, Series 'B', Part I (Issue III, Rev 2, 13 February 2019).",
        },
      },
      {
        h2: "Why the two-and-a-half-year validity matters",
        body: [
          "A cleared CPL paper stays valid for five years. A cleared PPL paper stays valid for two and a half. If you clear PPL papers and then take a long break before completing the licence, they can lapse in half the time you might have assumed from reading about CPL.",
          "Plan the theory papers against when you will actually be flying, not against when it is convenient to study.",
        ],
      },
      {
        h2: "What about flight hours and the medical?",
        body: [
          "Flight-time minimums and medical fitness for a PPL are set in Schedule II of the Aircraft Rules, 1937, and are administered through your Flying Training Organisation. We do not publish an hours figure here because we have not verified one against Schedule II's current text — the widely repeated numbers on training-school pages are not sourced, and a wrong figure here would cost you money.",
          "Ask your FTO for the current Schedule II requirement in writing, and confirm which class of medical you need before you begin, not after.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need 10+2 with Physics and Maths for a PPL?",
        a: "No. DGCA's stated requirement to appear in PPL theory examinations is a pass in Class Ten or equivalent from a recognised board. 10+2 with Physics and Mathematics is the Commercial Pilot Licence requirement.",
      },
      {
        q: "Can I fly commercially on a PPL?",
        a: "No. A Private Pilot Licence does not permit flying for hire or reward. Commercial flying requires a Commercial Pilot Licence.",
      },
      {
        q: "How long does a passed PPL paper stay valid?",
        a: "Two and a half years immediately preceding the date of application. A passed CPL or ATPL paper is valid for five years.",
      },
      {
        q: "Do I need a computer number for PPL exams?",
        a: "Yes. A computer number allotted by the Central Examination Organization, DGCA, is required to appear in PPL theory examinations.",
      },
      {
        q: "Is a PPL required before a CPL?",
        a: "No. A PPL is a separate licence, not a prerequisite for a CPL. Many candidates take one first to build experience, but DGCA does not require it.",
      },
    ],
    related: [
      { to: "/dgca/computer-number", label: "How to get your DGCA computer number" },
      { to: "/courses/cpl", label: "DGCA CPL ground classes" },
      { to: "/dgca/medical", label: "Class 1 and Class 2 medical requirements" },
    ],
  },

  /* ─────────────────────────────── CPL ─────────────────────────────── */
  cpl: {
    h1: "CPL Flight Training in India: The Flying Half of the Licence",
    question: "What does CPL flight training in India actually involve?",
    answer:
      "A Commercial Pilot Licence in India has two halves that happen at different institutions. Ground training and the DGCA theory papers are one; the flying hours are the other, logged at a DGCA-approved Flying Training Organisation. A CPL requires a minimum of 200 hours of flight time and a Class 1 medical, and the theory papers can be cleared before, during or after the flying.",
    sources: [CAR_B1],
    sections: [
      {
        h2: "Ground school and flying school are not the same institution",
        body: [
          "Flying Star Aviator is a ground-training institute. We teach the DGCA theory subjects and prepare candidates for the examinations. We do not own aircraft and we do not log your hours — that happens at a Flying Training Organisation approved by DGCA.",
          "Saying so matters, because the single most common budgeting mistake is treating a ground-school fee as though it covered flying. It does not, anywhere. The flying hours are almost always the larger cost by a wide margin.",
        ],
      },
      {
        h2: "What DGCA requires for the theory papers",
        table: {
          head: ["Requirement", "What DGCA states"],
          rows: [
            ["Computer number", "Allotted by CEO, DGCA — required before you can apply for any paper"],
            ["Educational qualification", "Passed 10+2 standard with Physics and Mathematics from a recognised board"],
            [
              "Subjects",
              "Air Navigation; Aviation Meteorology; Air Regulation; Aircraft & Engine / Instruments in general, specific and performance",
            ],
            ["Pass mark", "70% in the theoretical knowledge examination — per paper, with no aggregate across papers"],
            ["Validity of a passed paper", "Five years"],
            ["Examination fee", "Rs 2,500 per paper in a regular session; Rs 5,000 per paper through the OLODE route"],
          ],
          caption: "Source: DGCA CAR Section 7, Series 'B', Part I (Issue III, Rev 2, 13 February 2019).",
        },
      },
      {
        h2: "Are ground classes compulsory?",
        body: [
          "No. DGCA does not list ground-school attendance as an eligibility condition for sitting the CPL theory papers. What it requires is the computer number and the 10+2 with Physics and Mathematics.",
          "We say this on a page that sells ground classes because it is true, and because the honest question is not whether classes are mandatory but whether you clear four papers faster with structure or without it. That depends on you, and we have written about it separately rather than answering it for you here.",
        ],
      },
      {
        h2: "How the two halves fit together",
        steps: [
          "Get a computer number from the Central Examination Organization, DGCA.",
          "Complete a Class 2 medical to begin flying training, and a Class 1 medical, which a CPL requires.",
          "Begin flying training at a DGCA-approved FTO, working toward the 200-hour minimum.",
          "Clear the DGCA theory papers — before, during or after the flying. Each pass is valid five years, so clearing early is usually the cheaper sequencing.",
          "Complete RTR(A), the radio telephony licence, which is separate from the DGCA theory papers and is administered by the WPC Wing.",
          "Apply for licence issue once flying hours, papers, medical and RTR(A) are all in place.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many flight hours does an Indian CPL require?",
        a: "A minimum of 200 hours of flight time.",
      },
      {
        q: "Which medical class does a CPL require?",
        a: "A Class 1 medical. A Class 2 medical is the minimum needed to begin flying training.",
      },
      {
        q: "Do I have to clear the theory papers before I start flying?",
        a: "No. The papers and the flying can run in any order. A passed CPL paper is valid for five years, so many candidates clear the theory early and fly afterwards.",
      },
      {
        q: "What does the DGCA examination cost per paper?",
        a: "Rs 2,500 per paper in a regular session, and Rs 5,000 per paper through the Online On-Demand Examination (OLODE) route.",
      },
      {
        q: "Is the pass mark an aggregate across papers?",
        a: "No. The 70% pass mark applies to each paper individually. There is no aggregate.",
      },
    ],
    related: [
      { to: "/courses/cpl", label: "Our DGCA CPL ground classes" },
      { to: "/dgca/computer-number", label: "Getting your DGCA computer number" },
      { to: "/blog/dgca-ground-classes-vs-self-study", label: "Ground classes vs self-study" },
      { to: "/rtr", label: "RTR(A) radio telephony" },
    ],
  },

  /* ───────────────────────── Licence conversion ───────────────────────── */
  "guide-to-conversion": {
    h1: "Converting a Foreign Pilot Licence to an Indian DGCA Licence",
    question: "How do you convert a foreign pilot licence to an Indian licence?",
    answer:
      "DGCA converts foreign pilot licences under CAR Section 7, Series 'G', Part I. Your rating on the foreign licence must be current — at least 10 hours as Pilot-in-Command in the 24 months before you apply — and you must pass DGCA's written examinations through the Central Examination Organization and a skill test with a DGCA-approved examiner in India.",
    sources: [CAR_G1],
    sections: [
      {
        h2: "Which licences can be converted?",
        body: [
          "CAR Section 7, Series 'G', Part I covers conversion of foreign pilot licences into Indian ones. The categories it names are pilot licences for microlights, gliders, balloons, light sport aircraft and gyroplanes, plus the Private Pilot's Licence, Commercial Pilot's Licence and Airline Transport Pilot's Licence — each for aeroplanes or helicopters.",
          "The practical case for most Indian candidates is a CPL earned abroad, commonly on an FAA or EASA licence, being converted so it can be used commercially in India.",
        ],
      },
      {
        h2: "What does conversion actually require?",
        table: {
          head: ["Requirement", "What the CAR states"],
          rows: [
            [
              "Currency on the foreign licence",
              "The rating must be 'current' for the type of aircraft — defined as at least 10 hours as Pilot-in-Command in the twenty-four months preceding the date of application",
            ],
            [
              "Written examinations",
              "Conducted by DGCA's Central Examination Organisation",
            ],
            [
              "Skill test",
              "Competency demonstrated to a DGCA-approved examiner in India",
            ],
            [
              "Medical fitness",
              "Per Schedule II of the Aircraft Rules, 1937",
            ],
            [
              "Validity of documents",
              "The foreign licence and supporting documents must be within their laid-down validity period",
            ],
            [
              "Documents",
              "As required under the applicable provisions of Schedule II, Aircraft Rules 1937",
            ],
          ],
          caption:
            "Source: DGCA CAR Section 7, Series 'G', Part I, Issue II, Revision 4, dated 9 September 2019 (effective 1 July 2019).",
        },
      },
      {
        h2: "The mistake that costs the most time",
        body: [
          "The currency rule is the one people discover too late. If you finish training abroad, return to India and then spend a year arranging paperwork, your 10 hours of Pilot-in-Command time in the preceding 24 months can quietly become a problem — and re-establishing currency abroad is expensive.",
          "The theory papers are the part you can do something about early. They are Indian papers, sat in India, and a passed CPL or ATPL paper is valid for five years. Clearing them before or during your time abroad removes the longest pole from the conversion timeline.",
        ],
      },
      {
        h2: "What conversion does not do",
        bullets: [
          "It does not waive the DGCA theory examinations. Hours logged abroad do not substitute for Indian papers.",
          "It does not waive the skill test with a DGCA-approved examiner in India.",
          "It does not waive Indian medical requirements under Schedule II.",
          "It does not make an expired foreign licence usable — documents must be within validity.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I fly commercially in India on an FAA or EASA licence?",
        a: "No. A foreign licence must be converted to an Indian DGCA licence under CAR Section 7, Series 'G', Part I before it can be used for commercial flying in India.",
      },
      {
        q: "What does 'current' mean on the foreign licence?",
        a: "The CAR defines it as having flying experience of at least 10 hours as Pilot-in-Command in the twenty-four months preceding the date of application, for the type of aircraft.",
      },
      {
        q: "Do I still have to pass Indian exams if I trained abroad?",
        a: "Yes. Conversion requires passing written examinations through DGCA's Central Examination Organisation, plus a skill test with a DGCA-approved examiner in India.",
      },
      {
        q: "Which foreign licences can be converted?",
        a: "Pilot licences for microlights, gliders, balloons, light sport aircraft and gyroplanes, and the PPL, CPL and ATPL for aeroplanes or helicopters.",
      },
      {
        q: "When should I clear the DGCA papers if I am training abroad?",
        a: "Early. A passed CPL or ATPL paper is valid for five years, so clearing the theory before or during training abroad removes the longest step from the conversion timeline.",
      },
    ],
    related: [
      { to: "/pilot-training/usa", label: "Flight training in the USA" },
      { to: "/dgca/computer-number", label: "Getting your DGCA computer number" },
      { to: "/courses/cpl", label: "DGCA CPL ground classes" },
    ],
  },

  /* ─────────────────────────────── Maldives ─────────────────────────────── */
  maldives: {
    h1: "Pilot Training in the Maldives: What Indian Candidates Should Check First",
    question: "Can an Indian candidate train for a pilot licence in the Maldives?",
    answer:
      "Yes, but the licence you earn is a Maldivian one, and it must be converted before it permits commercial flying in India. The Maldives Civil Aviation Authority lists its approved flight training organisations publicly, and there are very few of them — verifying that a school appears on that list is the first thing to do.",
    sources: [
      {
        label: "Maldives Civil Aviation Authority — approved flight training schools",
        url: "https://www.caa.gov.mv/operations/air-operations/flight-training-schools",
      },
      CAR_G1,
    ],
    sections: [
      {
        h2: "Verify the school against the regulator's own list",
        body: [
          "The Maldives Civil Aviation Authority publishes its list of approved flight training organisations on its own website. As of September 2026 that list names the Asian Academy of Aeronautics, based at Gan International Airport, Addu Atoll, and EAS Barcelona in Spain.",
          "Check the regulator's page yourself before paying anything, and check it on the day. A school's own marketing is not evidence of approval; the regulator's list is. This is the same rule we would give you for a school in India.",
        ],
      },
      {
        h2: "The licence you earn is Maldivian, not Indian",
        body: [
          "Training in the Maldives produces a licence issued under Maldivian regulation. To fly commercially in India it must be converted to an Indian DGCA licence under CAR Section 7, Series 'G', Part I.",
          "Conversion means DGCA written examinations through the Central Examination Organisation, a skill test with a DGCA-approved examiner in India, medical fitness under Schedule II of the Aircraft Rules 1937, and a current rating on the foreign licence — at least 10 hours as Pilot-in-Command in the preceding 24 months.",
        ],
      },
      {
        h2: "What to work out before you commit",
        bullets: [
          "Is the school on the MCAA's published list of approved flight training organisations, today?",
          "What licence and ratings will you actually hold at the end, in writing?",
          "What is the total cost including accommodation, and what happens to it if weather or aircraft availability stretches the timeline?",
          "Have you cleared, or planned, the Indian DGCA theory papers? They are needed for conversion regardless of where you fly.",
          "Will you still meet the 10-hours-PIC-in-24-months currency rule by the time you apply to DGCA?",
        ],
      },
      {
        h2: "Our honest position",
        body: [
          "Flying Star Aviator does not own a flight school in the Maldives and we are not going to describe one we have not inspected. What we do is the Indian half — DGCA ground classes and theory-paper preparation from Dwarka, New Delhi — which you will need whether you fly in Addu Atoll, Arizona or Amethi.",
          "If you want a second opinion on a school's paperwork before you sign, ask us. We would rather answer that than have you find out later.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which flight schools are approved in the Maldives?",
        a: "The Maldives Civil Aviation Authority publishes the list on its own website. As of September 2026 it names the Asian Academy of Aeronautics at Gan International Airport, Addu Atoll, and EAS Barcelona in Spain. Check the regulator's page for the current list before enrolling.",
      },
      {
        q: "Can I fly for an Indian airline on a Maldivian licence?",
        a: "Not directly. The licence must first be converted to an Indian DGCA licence under CAR Section 7, Series 'G', Part I, which requires DGCA written examinations and a skill test in India.",
      },
      {
        q: "Do I still need the Indian DGCA theory papers?",
        a: "Yes. Conversion requires passing written examinations through DGCA's Central Examination Organisation. Hours flown abroad do not substitute for them.",
      },
      {
        q: "What currency does DGCA require on the foreign licence?",
        a: "At least 10 hours as Pilot-in-Command in the twenty-four months preceding the date of application, for the type of aircraft.",
      },
    ],
    related: [
      { to: "/pilot-training/guide-to-conversion", label: "Converting a foreign licence to a DGCA licence" },
      { to: "/blog/how-to-choose-a-flying-school-in-india", label: "How to choose a flying school" },
      { to: "/courses/cpl", label: "DGCA CPL ground classes" },
    ],
  },

  /* ─────────────────────────────── Sri Lanka ─────────────────────────────── */
  "sri-lanka": {
    h1: "Pilot Training in Sri Lanka: CAASL Requirements and the Route Back to India",
    question: "What does a Commercial Pilot Licence in Sri Lanka require?",
    answer:
      "The Civil Aviation Authority of Sri Lanka requires a CPL applicant to be at least 18 years old, hold a CAASL Class I medical certificate, and hold English Language Proficiency at ELPC Level 4 or higher. Flying experience is set by Implementing Standard 72. A Sri Lankan licence must be converted before it permits commercial flying in India.",
    sources: [
      {
        label: "Civil Aviation Authority of Sri Lanka — Commercial Pilot Licence",
        url: "https://www.caa.lk/en/personnel-licences/commercial-pilot-licence-cpl",
      },
      CAR_G1,
    ],
    sections: [
      {
        h2: "What CAASL states for a Commercial Pilot Licence",
        table: {
          head: ["Requirement", "CAASL"],
          rows: [
            ["Minimum age", "Not less than 18 years"],
            ["Medical", "CAASL Class I Medical Certificate"],
            ["English language", "English Language Proficiency, ELPC Level 4 or higher"],
            ["Flying experience", "As per Implementing Standard 72, Appendix 3"],
            ["Flight instruction", "As per Implementing Standard 72"],
            ["Theory", "CPL/ATPL theory examination"],
          ],
          caption:
            "Source: Civil Aviation Authority of Sri Lanka, Commercial Pilot Licence requirements. Detailed hour-by-hour minimums sit in IS 72 and SLCAP 3010 — ask your school for the current text rather than relying on a summary.",
        },
      },
      {
        h2: "How this differs from the Indian route",
        body: [
          "The most visible difference is the English Language Proficiency requirement, which CAASL states explicitly at ELPC Level 4 or higher as a condition of the licence. India's route places its educational condition differently: DGCA requires a 10+2 pass with Physics and Mathematics to sit the CPL theory papers.",
          "The other difference is where the numbers live. CAASL points to Implementing Standard 72 for flying experience rather than publishing the hours on the licence page itself, so a figure you read on a school's website is a summary of a document you should read yourself.",
        ],
      },
      {
        h2: "Coming back to India",
        body: [
          "A Sri Lankan licence is a foreign licence as far as DGCA is concerned. Converting it means DGCA written examinations through the Central Examination Organisation, a skill test with a DGCA-approved examiner in India, medical fitness under Schedule II of the Aircraft Rules 1937, and a current rating — at least 10 hours as Pilot-in-Command in the preceding 24 months.",
          "As with any training abroad, the Indian theory papers are the piece worth doing early. They are valid for five years once passed, and they are the step most likely to stall a conversion.",
        ],
      },
      {
        h2: "Before you enrol",
        bullets: [
          "Confirm the school is approved by CAASL, on CAASL's own records.",
          "Ask for the IS 72 Appendix 3 hour requirements in writing, not a marketing summary.",
          "Confirm how and where you will sit the English Language Proficiency assessment.",
          "Plan the Indian DGCA theory papers into the timeline from the start.",
          "Check that your PIC currency will still hold when you apply to DGCA.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the minimum age for a CPL in Sri Lanka?",
        a: "Not less than 18 years, per the Civil Aviation Authority of Sri Lanka.",
      },
      {
        q: "Does Sri Lanka require an English language test for a CPL?",
        a: "Yes. CAASL requires English Language Proficiency at ELPC Level 4 or higher.",
      },
      {
        q: "How many flight hours does a Sri Lankan CPL require?",
        a: "CAASL sets flying experience by Implementing Standard 72, Appendix 3, rather than stating the hours on its licence page. Ask your training organisation for the current IS 72 text.",
      },
      {
        q: "Can I fly for an Indian airline on a Sri Lankan licence?",
        a: "Not without converting it. DGCA conversion under CAR Section 7, Series 'G', Part I requires Indian written examinations and a skill test with a DGCA-approved examiner in India.",
      },
      {
        q: "Which medical does a Sri Lankan CPL need?",
        a: "A CAASL Class I Medical Certificate. An Indian CPL separately requires a DGCA Class 1 medical.",
      },
    ],
    related: [
      { to: "/pilot-training/guide-to-conversion", label: "Converting a foreign licence to a DGCA licence" },
      { to: "/courses/cpl", label: "DGCA CPL ground classes" },
      { to: "/dgca/medical", label: "DGCA medical requirements" },
    ],
  },
};

