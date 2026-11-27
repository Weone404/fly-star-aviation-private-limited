import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PILOT_SALARY_FAQS } from "@/lib/pilotSalaryFaqs";

const PUBLISHED = "2026-11-27";
const UPDATED = "2026-11-27";

const tableOfContents = [
  { id: "introduction", label: "Introduction" },
  { id: "pilot-salary-overview", label: "Pilot Salary in India – Overview" },
  { id: "airline-wise-pilot-salary", label: "Airline-Wise Pilot Salary in India" },
  { id: "pilot-salary-by-experience", label: "Pilot Salary Based on Experience" },
  { id: "pilot-starting-salary", label: "Pilot Starting Salary in India" },
  { id: "indigo-pilot-salary", label: "IndiGo Pilot Salary" },
  { id: "air-india-pilot-salary", label: "Air India Pilot Salary" },
  { id: "female-pilot-salary", label: "Female Pilot Salary in India" },
  { id: "helicopter-pilot-salary", label: "Helicopter Pilot Salary in India" },
  { id: "flight-instructor-salary", label: "Flight Instructor Salary in India" },
  { id: "pilot-salary-india-vs-abroad", label: "Pilot Salary in India vs Abroad" },
  { id: "factors-affecting-pilot-salary", label: "Factors Affecting Pilot Salary" },
  { id: "pilot-training-cost-roi", label: "Pilot Training Cost and Return on Investment" },
  { id: "how-to-become-a-pilot", label: "How to Become a Commercial Pilot in India" },
  { id: "is-becoming-a-pilot-worth-it", label: "Is Becoming a Pilot Financially Worth It?" },
  { id: "faqs", label: "Frequently Asked Questions" },
];

const overviewRows: ReactNode[][] = [
  [
    <strong key="position">Trainee / Cadet Pilot</strong>,
    "₹15,000 – ₹1,00,000 (Stipend)",
    "₹1.8 Lakh – ₹12 Lakh",
    "0 – 12 months post-CPL (in airline training)",
    "Paid during ground, simulator, and line training; some cadet pathways pay minimal or zero stipend until line release.",
  ],
  [
    <strong key="position">Junior First Officer (JFO)</strong>,
    "₹1.5 Lakh – ₹2.7 Lakh",
    "₹18 Lakh – ₹32.4 Lakh",
    "0 – 2 years after line release (under 1,000 hrs)",
    "Entry-level operational rank after completing Type Rating and line checks.",
  ],
  [
    <strong key="position">First Officer (Co-Pilot)</strong>,
    "₹2.3 Lakh – ₹3.5 Lakh",
    "₹27.6 Lakh – ₹42 Lakh",
    "1 – 4 years (1,000+ hrs on type)",
    "Significant step-up once crossing the 1,000-hour experience threshold on commercial jets.",
  ],
  [
    <strong key="position">Senior First Officer (SFO)</strong>,
    "₹3.4 Lakh – ₹5.5 Lakh",
    "₹40.8 Lakh – ₹66 Lakh",
    "3 – 7 years (2,500+ hrs & ATPL qualified)",
    "Holds a full ATPL and awaits command upgrade slots based on airline seniority and fleet growth.",
  ],
  [
    <strong key="position">Captain (Narrow-Body)</strong>,
    "₹6.0 Lakh – ₹10.0 Lakh",
    "₹72 Lakh – ₹1.20 Crore",
    "6 – 12 years",
    "Pilot-in-Command (P1) on domestic/short-haul fleets (A320/B737).",
  ],
  [
    <strong key="position">Senior / Wide-Body / Training Captain</strong>,
    "₹8.5 Lakh – ₹15.0 Lakh+",
    "₹1.02 Crore – ₹1.80 Crore+",
    "10 – 15+ years",
    "Commands long-haul wide-body aircraft (B777/B787/A350) or holds TRI / TRE appointments.",
  ],
];

const airlineRows: ReactNode[][] = [
  [
    <strong key="airline">IndiGo</strong>,
    <>First Officer (&lt;1,000 hrs)<br />First Officer (&gt;1,000 hrs)<br />Senior First Officer<br />Captain / Sr. Captain</>,
    <>₹2.67 Lakh CTC<br />₹3.37 Lakh CTC<br />₹4.85 Lakh CTC<br />₹8.15 – ₹8.91 Lakh CTC</>,
    "Reported / Estimated (Based on leaked/reported 70-hr committed CTC structure)",
    "Reported in 2026 aviation compensation analyses (Pilots Academy, Maverick Aviation, Oct 2026)",
    "Committed 70-hour flying block, Airbus A320/A321 fleet assignment, night/layover allowances, and TRI/LTC trainer status.",
  ],
  [
    <strong key="airline">Air India</strong>,
    <>First Officer<br />Senior First Officer<br />Captain (Narrow/Wide-Body)</>,
    <>₹2.3 Lakh – ₹4.6 Lakh<br />₹4.0 Lakh – ₹5.5 Lakh<br />₹7.0 Lakh – ₹15.0 Lakh+</>,
    "Estimated Industry Range (Revised post-Tata Group harmonization)",
    "Reported by Maverick Aviation & Flysquad (Oct 2026)",
    "Fleet type (A320 family vs. B777/B787/A350 wide-body), international layover allowances, and guaranteed 40-hr base + overtime rates.",
  ],
  [
    <strong key="airline">Air India Express</strong>,
    <>Trainee (Stipend)<br />Junior First Officer (Y1)<br />First Officer (1+ yr)<br />Captain / Sr. Commander</>,
    <>₹50,000<br />₹2.35 Lakh<br />₹3.45 Lakh<br />₹7.50 – ₹8.50 Lakh</>,
    "Reported / Estimated (Assumes 70 flying hours/month)",
    "Reported in 2026 compensation breakdowns (Pilots Academy, The Pilot, 2026)",
    "Boeing 737 fleet operations, Middle East/short-haul international sector allowances, and tiered hourly pay above 40 hours.",
  ],
  [
    <strong key="airline">Akasa Air</strong>,
    <>First Officer (40 hrs fixed)<br />Senior First Officer (40 hrs)<br />Captain / Sr. Captain</>,
    <>₹2.60 Lakh (₹3.21L @ 60h)<br />₹3.40 Lakh (₹4.30L @ 60h)<br />₹5.50 – ₹6.25 Lakh fixed</>,
    "Reported / Estimated (40-hr guaranteed base + hourly pay)",
    "Reported in 2026 pay scale disclosures (Pilots Academy, Maverick Aviation, Oct 2026)",
    "Actual monthly flying hours above the 40-hour base, rapid fleet expansion upgrades, and Boeing 737 MAX allowances.",
  ],
  [
    <strong key="airline">Alliance Air</strong>,
    "Trainee First Officer (CPL holder, non-type-rated)",
    "₹25,000 stipend during training (post-training FO scale unpublished)",
    "Verified Official Notice",
    "Alliance Air Recruitment Notification Ref: AAAL/PERS/2026/626 (2 July 2026)",
    "Candidate bears upfront training cost at joining, signs a 5-year indemnity bond, and moves to regular FO pay after line release.",
  ],
  [
    <strong key="airline">SpiceJet</strong>,
    "All Commercial Ranks",
    "Reliable current 2026 figures unavailable",
    "Unverified / Unavailable",
    "Marked inconsistently reported across 2026 aviation trackers (Maverick Aviation, Oct 2026)",
    "Restructuring, fleet size fluctuations, and variable flight schedules have prevented consistent public benchmarking in 2026.",
  ],
  [
    <strong key="airline">Pawan Hans (Helicopter PSU)</strong>,
    <>Trainee CHPL Pilot<br />Fresh Endorsed Pilot (E-0)<br />Senior Pilot (Mi-172)</>,
    <>₹15,000 stipend<br />₹1,50,000 fixed<br />₹8,50,000 consolidated</>,
    "Verified Official Notices",
    "Pawan Hans Careers & Recruitment Notices (13 Nov & 19 Nov 2026)",
    "Helicopter type endorsement (e.g., Mi-172), 4,000+ type hours for senior roles, and offshore/remote deployment allowances.",
  ],
];

const internationalRows = [
  [
    "India (IndiGo, Air India)",
    "₹6 Lakh – ₹15 Lakh/month (₹72L – ₹1.8 Cr/year)",
    "Progressive personal income tax (up to ~30%+ surcharge)",
    "Moderate; pilots fund their own housing except on duty layovers",
    "Direct entry with DGCA CPL/ATPL; fastest path for freshers.",
  ],
  [
    "Middle East (Emirates, Qatar Airways, Etihad)",
    "₹10 Lakh – ₹18 Lakh+/month equivalent (AED 45,000 – 75,000+)",
    "0% personal income tax in UAE & Qatar",
    "High city rents, though carriers often provide housing allowances & schooling support",
    "Rarely hires fresh CPL holders; requires 2,500–4,000+ jet hours and ATPL conversion.",
  ],
  [
    "United States (Delta, United, American)",
    "₹20 Lakh – ₹30 Lakh+/month equivalent ($280,000 – $400,000+/yr)",
    "Federal + State income tax (~28% – 37% effective)",
    "High cost of living and healthcare",
    "Strict US citizenship/Green Card work authorization + FAA ATP (1,500-hr rule).",
  ],
  [
    "Europe / UK (British Airways, Lufthansa)",
    "₹12 Lakh – ₹20 Lakh/month equivalent",
    "High progressive income tax (40% – 45%)",
    "High housing and living expenses",
    "Requires UK CAA / EASA ATPL conversion and legal right to work in the UK/EU.",
  ],
];

function ResponsiveTable({
  heading,
  columns,
  rows,
}: {
  heading: string;
  columns: string[];
  rows: readonly (readonly ReactNode[])[];
}) {
  return (
    <div
      className="my-6 overflow-x-auto rounded-xl border border-border"
      role="region"
      aria-label={`${heading} table`}
      tabIndex={0}
    >
      <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
        <caption className="sr-only">{heading}</caption>
        <thead className="bg-muted/70">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="border-b border-border px-4 py-3 font-semibold text-foreground">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${heading}-${rowIndex}`} className={rowIndex % 2 ? "bg-muted/20" : undefined}>
              {row.map((cell, cellIndex) => (
                <td key={`${heading}-${rowIndex}-${cellIndex}`} className="border-b border-border/60 px-4 py-3 align-top leading-relaxed text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 border-b border-border/70 py-10 md:py-12">
      <h2 id={`${id}-heading`} className="mb-5 text-2xl font-bold leading-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="space-y-5 leading-8 text-muted-foreground">{children}</div>
    </section>
  );
}

export default function PilotSalaryIndiaPage() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "Pilot Salary in India 2026" }]} />

      <header className="border-b border-border bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 md:pb-14 md:pt-12">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Pilot careers · India · 2026
            </p>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
              Pilot Salary in India 2026 – Monthly Earnings, Airline-Wise Pay and Career Growth
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">
              Written by{" "}
              <Link to="/editorial-policy" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
                Flying Star Aviator Academics Team
              </Link>
              {" · "}Published <time dateTime={PUBLISHED}>November 27, 2026</time>
              {" · "}Updated <time dateTime={UPDATED}>November 27, 2026</time>
            </p>
            <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-muted">
              <img
                src="/assets/hero-aircraft-1600w.jpg"
                srcSet="/assets/hero-aircraft-800w.jpg 800w, /assets/hero-aircraft-1600w.jpg 1600w, /assets/hero-aircraft-2400w.jpg 2400w"
                sizes="(max-width: 768px) 100vw, 1100px"
                alt="Commercial passenger aircraft flying above the clouds at sunset"
                width={1600}
                height={900}
                loading="eager"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </header>

      <article className="scroll-smooth">
        <div className="container mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12 lg:py-12">
          <div className="min-w-0">
            <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm leading-7 text-foreground md:p-6">
              <p>
                <strong>Editorial &amp; Data Transparency Note:</strong> Private airlines in India do not publish official, binding salary tables for general public distribution. Throughout this guide, we clearly distinguish between <strong>officially published government/PSU recruitment notices</strong> (such as Alliance Air and Pawan Hans), <strong>leaked or reported airline compensation structures</strong>, and <strong>indicative industry ranges</strong> compiled from aviation recruitment disclosures. Actual take-home pay depends on individual employment contracts, fleet assignment, monthly flying hours, and income tax deductions.
              </p>
            </div>

            <details className="mb-8 rounded-xl border border-border bg-card p-4 lg:hidden">
              <summary className="cursor-pointer font-semibold text-foreground">Table of contents</summary>
              <nav aria-label="Table of contents" className="mt-3">
                <ol className="list-inside list-decimal space-y-2 text-sm leading-6">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a className="text-muted-foreground underline underline-offset-4 hover:text-primary" href={`#${item.id}`}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>

            <Section id="introduction" title="1. Introduction">
              <p>
                Ask ten commercial pilots in India what they earn each month, and you will hear ten different figures. Across scheduled Indian airlines in 2026, gross monthly compensation spans roughly <strong>₹25,000 to ₹1,00,000 during initial airline training</strong>, rises to <strong>₹1.5 lakh to ₹3.5 lakh per month for line-released First Officers</strong>, and reaches <strong>₹6 lakh to ₹10 lakh+ per month for domestic narrow-body Captains</strong>—with wide-body international commanders and examiners earning higher.
              </p>
              <p>
                Unlike a standard corporate desk job with a flat monthly paycheck, airline pilot compensation is built like a flight roster: it combines a <strong>guaranteed base component</strong> (often tied to a minimum block of 40 to 70 flying hours) with <strong>variable hourly flying allowances</strong>, layover per diems, and fleet-specific incentives. Two First Officers hired in the same batch can see noticeably different pay slips depending on whether they fly short-haul domestic sectors or international routes, how many hours they log in a peak travel season, and which aircraft type they operate.
              </p>
              <p>
                This guide breaks down realistic commercial pilot salary expectations in India for 2026—separating confirmed recruitment figures from industry estimates, explaining the financial reality of moving from a Commercial Pilot License (CPL) to the Captain’s seat, and helping aspiring aviators weigh training costs against long-term career returns.
              </p>
            </Section>

            <Section id="pilot-salary-overview" title="2. Pilot Salary in India – Overview">
              <p>
                To understand how much money a pilot makes per month in India, it helps to separate <strong>training stipends</strong> from <strong>line-released flight deck salaries</strong>. Once a pilot completes simulator checks and supervised line flying, pay increases sharply at two milestones: obtaining an ATPL and upgrading from the right-hand seat (First Officer) to the left-hand seat (Captain).
              </p>
              <ResponsiveTable
                heading="Pilot salary in India by position"
                columns={["Pilot Position", "Indicative Monthly Salary (Gross)", "Indicative Annual CTC", "Typical Experience Level", "Important Notes"]}
                rows={overviewRows}
              />
              <p className="text-sm italic">
                Note: Figures above represent indicative industry ranges for scheduled commercial airlines in 2026 based on reported carrier pay structures and recruitment disclosures. All Indian airline salaries are subject to statutory income tax deductions.
              </p>
            </Section>

            <Section id="airline-wise-pilot-salary" title="3. Airline-Wise Pilot Salary in India">
              <p>
                Every carrier structures its pilot pay differently. Low-cost carriers (LCCs) typically build packages around a committed flying-hour block (such as 70 hours per month), whereas full-service carriers (FSCs) and newer airlines often pair a lower guaranteed base (such as 40 hours) with tiered hourly flying allowances and international layover perks.
              </p>
              <ResponsiveTable
                heading="Airline-wise pilot salary information"
                columns={["Airline", "Pilot Rank", "Available Salary Information (Monthly)", "Status (Verified vs. Estimated)", "Source & Publication Reference", "Factors Affecting Compensation"]}
                rows={airlineRows}
              />
            </Section>

            <Section id="pilot-salary-by-experience" title="4. Pilot Salary Based on Experience">
              <p>
                In aviation, salary progression is governed by <strong>logged flight hours, license upgrades, and command assessments</strong> rather than annual appraisal cycles alone.
              </p>
              <ol className="list-decimal space-y-5 pl-6">
                <li>
                  <h3 className="font-semibold text-foreground">Newly Qualified CPL Holders (0 – 250 Hours)</h3>
                  <p>Holding a fresh DGCA Commercial Pilot License with ~200 hours of flying on single- and multi-engine trainer aircraft does not automatically generate an airline paycheck. At this stage, pilots either invest in an aircraft Type Rating (such as Airbus A320 or Boeing 737) or enter an airline cadet/trainee program, earning either nothing or a modest training stipend of <strong>₹15,000 to ₹50,000 per month</strong> while completing ground school and simulator sessions.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-foreground">Junior First Officers (Years 0 – 2 | 250 – 1,000 Hours)</h3>
                  <p>Once a trainee clears simulator checks and Supernumerary / Line Training, they are released to the line as a Junior First Officer. Gross pay typically settles between <strong>₹1.5 lakh and ₹2.7 lakh per month</strong>.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-foreground">First Officers (Years 2 – 4 | 1,000 – 2,500 Hours)</h3>
                  <p>Crossing 1,000 flying hours on a commercial jet triggers an automatic pay band revision at most Indian carriers, lifting monthly compensation to roughly <strong>₹2.6 lakh – ₹3.5 lakh</strong>. During these years, pilots focus on accumulating the 1,500 total flying hours (including 500 hours Pilot-in-Command or eligible co-pilot credit under DGCA rules) needed to unfreeze their ATPL.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-foreground">Senior First Officers (Years 4 – 7 | 2,500+ Hours + ATPL)</h3>
                  <p>With an Unfrozen ATPL in hand, a pilot becomes a Senior First Officer earning <strong>₹3.4 lakh to ₹5.5 lakh per month</strong>. You remain in the right-hand seat until a command vacancy opens on your fleet and you pass the airline’s internal command upgrade board.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-foreground">Captains &amp; Senior Captains (Years 6 – 15+ | 3,000 – 10,000+ Hours)</h3>
                  <p>Upgrading to Captain is the single largest financial leap in a pilot’s career, doubling monthly income to <strong>₹6 lakh – ₹10 lakh</strong> on narrow-body fleets. Experienced Captains who transition to long-haul wide-body jets or qualify as Line Training Captains (LTC), Type Rating Instructors (TRI), or Designated Examiners (DE) earn <strong>₹8.5 lakh to ₹15 lakh+ per month</strong>.</p>
                </li>
              </ol>
              <blockquote className="border-l-4 border-primary bg-muted/40 py-4 pl-5 pr-4 text-foreground">
                <strong>Important Career Reality:</strong> Promotion timelines are never guaranteed. During periods of rapid fleet induction, a First Officer might reach command in 5 to 6 years; during industry slowdowns or aircraft delivery delays, the same upgrade can take 8 to 10 years.
              </blockquote>
            </Section>

            <Section id="pilot-starting-salary" title="5. Pilot Starting Salary in India">
              <p>
                Many aspiring students assume that the day they pass their final DGCA flight test, an airline transfers ₹2.5 lakh into their bank account. In practice, there is a distinct financial bridge between <strong>CPL completion</strong> and <strong>airline line release</strong>.
              </p>
              <ol className="list-decimal space-y-5 pl-6">
                <li><strong className="text-foreground">CPL Completion vs. Airline Employment:</strong> A standard DGCA CPL qualifies you to fly light single- and multi-engine piston aircraft (~200 hours total). Scheduled airlines operate complex multi-crew jets (A320, B737, ATR-72) that require an aircraft-specific <strong>Type Rating</strong>.</li>
                <li><strong className="text-foreground">Why a CPL Does Not Guarantee an Airline Job:</strong> Airlines hire based on fleet delivery schedules and attrition. When supply exceeds immediate cockpit vacancies, fresh CPL holders compete in multi-stage selection processes (aptitude tests, psychometric assessments, simulator evaluations, and technical interviews).</li>
                <li>
                  <strong className="text-foreground">Training Stipends vs. First Officer Pay:</strong>
                  <ul className="mt-3 list-disc space-y-3 pl-6">
                    <li>If you join a regional carrier like <strong>Alliance Air</strong> as a non-type-rated CPL holder (per their July 2026 recruitment notice), you receive a <strong>₹25,000 monthly stipend</strong> during training while funding your own type training under an indemnity bond.</li>
                    <li>At major carriers like <strong>Air India Express</strong> or <strong>IndiGo</strong>, trainees typically receive a stipend of around <strong>₹50,000 per month</strong> during ground and simulator phases before stepping up to <strong>₹2.35 lakh – ₹2.67 lakh per month</strong> once released as a Junior First Officer.</li>
                  </ul>
                </li>
              </ol>
            </Section>

            <Section id="indigo-pilot-salary" title="6. IndiGo Pilot Salary">
              <p>
                As India’s largest domestic carrier by market share and fleet size, IndiGo is the single biggest employer of commercial pilots in the country.
              </p>
              <ul className="list-disc space-y-4 pl-6">
                <li><strong className="text-foreground">Compensation Model:</strong> IndiGo primarily uses a <strong>70-hour committed monthly CTC structure</strong> for its Airbus A320/A321 and ATR fleets. Pilots receive a fixed monthly salary bundled with a guaranteed 70-hour flying allowance, supplemented by extra hourly pay if they fly beyond 70 hours, plus night-stop and layover allowances.</li>
                <li>
                  <strong className="text-foreground">Reported Rank-Wise Pay (2026):</strong>
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li><strong>Junior First Officer (under 1,000 hrs):</strong> ~₹2.67 lakh/month CTC</li>
                    <li><strong>First Officer (over 1,000 hrs):</strong> ~₹3.37 lakh/month CTC</li>
                    <li><strong>Senior First Officer (ATPL):</strong> ~₹4.85 lakh/month CTC</li>
                    <li><strong>Captain (under 1,000 PIC hrs):</strong> ~₹8.15 lakh/month CTC</li>
                    <li><strong>Senior Captain (over 2,500 PIC hrs):</strong> ~₹8.91 lakh/month CTC</li>
                    <li><strong>Check / Training Captains (LTC / TRI):</strong> ₹9.77 lakh – ₹10.5 lakh/month</li>
                  </ul>
                </li>
                <li><strong className="text-foreground">Key Variables:</strong> Take-home pay fluctuates based on whether a pilot opts for standard leave rosters or additional privilege leave (PL) buy-back options, seasonal roster utilization, and international short-haul layovers.</li>
              </ul>
            </Section>

            <Section id="air-india-pilot-salary" title="7. Air India Pilot Salary">
              <p>
                Following its privatization and fleet consolidation under the Tata Group, Air India operates both narrow-body domestic/regional fleets (Airbus A320 family) and long-haul wide-body aircraft (Boeing 777, Boeing 787 Dreamliner, and Airbus A350).
              </p>
              <ul className="list-disc space-y-4 pl-6">
                <li><strong className="text-foreground">First Officers vs. Captains:</strong> Industry reports in 2026 place Air India First Officer packages between <strong>₹2.3 lakh and ₹4.6 lakh per month</strong> (₹28 lakh to ₹55 lakh annually), while Senior First Officers earn roughly <strong>₹4 lakh to ₹5.5 lakh per month</strong>.</li>
                <li><strong className="text-foreground">Wide-Body Advantage:</strong> Narrow-body Captains earn roughly <strong>₹7 lakh to ₹10 lakh per month</strong>, whereas experienced wide-body Captains flying ultra-long-haul routes to North America, Europe, and Australia can reach <strong>₹12 lakh to ₹15 lakh+ per month</strong> (₹1.4 crore to ₹1.8 crore annually) once international per diems and wide-body allowances are factored in.</li>
                <li><strong className="text-foreground">Contract Structure:</strong> Air India’s revised compensation framework generally guarantees a <strong>40-hour monthly base</strong> with progressive hourly flying rates that escalate once a pilot crosses 40, 70, and 90 flying hours in a calendar month.</li>
              </ul>
            </Section>

            <Section id="female-pilot-salary" title="8. Female Pilot Salary in India">
              <p>
                India leads the world in female flight-deck representation: according to Ministry of Civil Aviation and DGCA data tabled in Parliament in 2026, <strong>women account for roughly 15% to 16.4% of India’s commercial pilots</strong>—more than three times the global average of ~5%.
              </p>
              <ul className="list-disc space-y-4 pl-6">
                <li><strong className="text-foreground">Equal Pay Structure:</strong> Commercial airline pay scales in India are <strong>strictly rank-, fleet-, and seniority-based</strong>. There is no gender-based pay differential; a female First Officer or Captain flying the same aircraft type and logging the same block hours earns the exact same base salary and hourly allowance as a male colleague.</li>
                <li><strong className="text-foreground">Eligibility &amp; Career Growth:</strong> DGCA medical standards, theoretical examinations, and flight-hour minimums are identical for all candidates. Major Indian carriers provide structured maternity leave policies, temporary ground-duty transitions during pregnancy, and predictable roster support so women pilots can resume flying without losing seniority.</li>
              </ul>
            </Section>

            <Section id="helicopter-pilot-salary" title="9. Helicopter Pilot Salary in India">
              <p>
                Rotary-wing aviation operates on a very different career track from commercial airlines, requiring a <strong>Commercial Helicopter Pilot License (CHPL)</strong>.
              </p>
              <ul className="list-disc space-y-4 pl-6">
                <li><strong className="text-foreground">Employment Sectors:</strong> Helicopter pilots in India fly for state-owned enterprises like <strong>Pawan Hans</strong>, offshore oil and gas logistics (ONGC support), corporate VIP charters, Himalayan pilgrimage shuttles (Kedarnath/Amarnath), and Helicopter Emergency Medical Services (HEMS).</li>
                <li>
                  <strong className="text-foreground">Salary Benchmarks:</strong>
                  <ul className="mt-3 list-disc space-y-3 pl-6">
                    <li><strong>Entry-Level / Trainee CHPL:</strong> In November 2026 recruitment notices, Pawan Hans published a <strong>₹15,000/month stipend</strong> during type conversion training, stepping up to <strong>₹1,50,000/month fixed pay</strong> (E-0 grade) upon DGCA type endorsement.</li>
                    <li><strong>Mid-Career Commercial Helicopter Pilot:</strong> Typically <strong>₹2.0 lakh to ₹4.0 lakh per month</strong> depending on multi-engine turbine experience and offshore risk allowances.</li>
                    <li><strong>Senior Captain / Examiner (e.g., Mi-172):</strong> Pawan Hans’ November 2026 recruitment notices listed <strong>₹8,50,000/month</strong> consolidated pay for Senior Pilots (4,000+ hours on type) and <strong>₹9,00,000/month</strong> for Chief Pilots (TRI/TRE).</li>
                  </ul>
                </li>
              </ul>
            </Section>

            <Section id="flight-instructor-salary" title="10. Flight Instructor Salary in India">
              <p>
                Many freshly licensed CPL holders earn an <strong>Assistant Flight Instructor (AFI)</strong> rating and later upgrade to <strong>Flight Instructor (FI)</strong> at DGCA-approved Flying Training Organisations (FTOs) to build flight hours while earning an income.
              </p>
              <ul className="list-disc space-y-4 pl-6">
                <li><strong className="text-foreground">Qualifications:</strong> Requires a valid CPL, passing the DGCA AFI/FI oral board examinations, and completing instructional flying hours under a Chief Flight Instructor (CFI).</li>
                <li>
                  <strong className="text-foreground">Compensation Range:</strong>
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li><strong>Assistant Flight Instructor (AFI):</strong> Roughly <strong>₹80,000 to ₹2.0 lakh per month</strong> depending on the flying school’s location and monthly instructional hours flown.</li>
                    <li><strong>Flight Instructor (FI):</strong> Roughly <strong>₹2.0 lakh to ₹3.5 lakh per month</strong>.</li>
                    <li><strong>Chief Flight Instructor (CFI):</strong> <strong>₹4.0 lakh to ₹6.0 lakh+ per month</strong> at large FTOs.</li>
                  </ul>
                </li>
                <li><strong className="text-foreground">Strategic Value:</strong> While AFI pay is lower than airline Captain pay, instructing allows pilots to log 60 to 90 PIC hours per month without paying out of pocket—accelerating their path to the 1,500-hour ATPL threshold.</li>
              </ul>
            </Section>

            <Section id="pilot-salary-india-vs-abroad" title="11. Pilot Salary in India vs Abroad">
              <p>
                Comparing gross figures in Indian Rupees against US Dollars or UAE Dirhams can be misleading without accounting for taxes, housing, and licensing hurdles.
              </p>
              <ResponsiveTable
                heading="Pilot salary in India compared with other aviation markets"
                columns={["Aviation Market", "Typical Captain Pay (Indicative)", "Income Tax Environment", "Cost of Living & Housing", "Licensing & Entry Reality for Indian Pilots"]}
                rows={internationalRows}
              />
              <p>
                <strong className="text-foreground">Bottom-Line Comparison:</strong> For a <strong>new pilot</strong>, India offers far stronger entry-level pay and direct airline access than most Western markets (where entry-level regional pilots or flight instructors often earn modest wages for years). For a <strong>senior Captain with 3,000+ jet hours</strong>, tax-free Gulf carriers offer higher net savings—provided you are willing to relocate abroad.
              </p>
            </Section>

            <Section id="factors-affecting-pilot-salary" title="12. Factors Affecting Pilot Salary">
              <p>Nine primary variables determine where a pilot lands within the salary spectrum:</p>
              <ol className="list-decimal space-y-4 pl-6">
                <li><strong className="text-foreground">Airline Business Model:</strong> Full-service international carriers pay higher top-end wide-body rates than domestic regional airlines.</li>
                <li><strong className="text-foreground">Aircraft Type:</strong> Wide-body aircraft (B777, B787, A350) command higher pay scales than narrow-body jets (A320, B737) or regional turboprops (ATR-72).</li>
                <li><strong className="text-foreground">Rank &amp; Command Status:</strong> Moving from Senior First Officer to Captain typically increases total compensation by 60% to 100%.</li>
                <li><strong className="text-foreground">Monthly Flying Hours:</strong> Under DGCA FDTL rules, pilots can fly up to 100 hours in any 28 consecutive days. Flying 80–90 hours yields substantially more variable pay than flying 45 hours.</li>
                <li><strong className="text-foreground">Seniority Within the Airline:</strong> Annual increments reward continuous years of service on the airline’s seniority list.</li>
                <li><strong className="text-foreground">Type Rating &amp; Instructor Endorsements:</strong> Holding TRI, TRE, or LTC designations adds dedicated instructional allowances.</li>
                <li><strong className="text-foreground">Employment Contract &amp; Bonds:</strong> Cadet-pathway pilots or pilots whose Type Rating was funded by the airline may have temporary salary deductions or 3-to-5-year service bonds.</li>
                <li><strong className="text-foreground">Base Location &amp; Allowances:</strong> International layover per diems (paid in USD/EUR), night-flying allowances, and deadhead positioning pay add meaningful tax-efficient income.</li>
                <li><strong className="text-foreground">Macroeconomic &amp; Industry Cycles:</strong> Fuel prices, aircraft delivery backlogs, and pilot shortages directly influence signing bonuses and pay revisions.</li>
              </ol>
            </Section>

            <Section id="pilot-training-cost-roi" title="13. Pilot Training Cost and Return on Investment">
              <p>Before evaluating pilot salaries, every family must audit the complete upfront capital required to reach the cockpit.</p>
              <ul className="list-disc space-y-4 pl-6">
                <li><strong className="text-foreground">DGCA Ground Classes:</strong> Paid to a ground training institute to prepare for DGCA theory papers (typically ₹1.5 lakh to ₹2.5 lakh depending on inclusions; confirm itemised schedules before enrolling).</li>
                <li><strong className="text-foreground">DGCA Examination Fees:</strong> Officially published by the DGCA at <strong>₹2,500 per theory paper</strong> (non-refundable), totaling ₹10,000 across four core CPL papers if cleared on the first attempt. (See our verified breakdown of <Link to="/blog/dgca-exam-fees" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">DGCA Exam Fees</Link>.)</li>
                <li><strong className="text-foreground">DGCA Class 2 &amp; Class 1 Medicals:</strong> Mandatory initial and renewal medical assessments at DGCA-empaneled doctors/centers (typically ₹10,000 – ₹25,000 including diagnostic tests).</li>
                <li><strong className="text-foreground">Flying Training (200 Hours for CPL):</strong> The largest expense. In India, DGCA-approved FTOs such as IGRUA and Chimes Aviation Academy publish CPL course fees in the <strong>₹55 lakh to ₹61 lakh range in 2026</strong>, while flying abroad (USA, South Africa, New Zealand) plus <Link to="/pilot-training/guide-to-conversion" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">DGCA Foreign Licence Conversion</Link> generally totals ₹45 lakh to ₹65 lakh depending on exchange rates and living costs.</li>
                <li><strong className="text-foreground">Aircraft Type Rating (A320 / B737):</strong> Typically <strong>₹15 lakh to ₹30 lakh</strong> if self-sponsored after CPL.</li>
              </ul>
              <p>
                <strong className="text-foreground">Realistic ROI &amp; Financial Planning:</strong> Total all-in expenditure from zero hours to an airline-ready type-rated pilot commonly falls between <strong>₹65 lakh and ₹90 lakh</strong> (and ₹95 lakh – ₹1.25 crore for airline-sponsored Cadet Pilot Programmes). Rather than assuming a guaranteed 2-year payback, prudent candidates should budget for a <strong>6-to-18-month buffer</strong> between CPL completion and first airline salary, and calculate loan EMIs against conservative Junior First Officer take-home pay (~₹1.8 lakh – ₹2.2 lakh post-tax) rather than Captain salaries.
              </p>
              <blockquote className="border-l-4 border-primary bg-muted/40 py-4 pl-5 pr-4 text-foreground">
                <strong>Need clarity on every official vs. institute fee?</strong> Read our detailed{" "}
                <Link to="/courses/cpl/fees" className="font-semibold underline underline-offset-4 hover:text-primary">
                  CPL Fees in India Cost Breakdown
                </Link>{" "}
                before signing any flying school contract.
              </blockquote>
            </Section>

            <Section id="how-to-become-a-pilot" title="14. How to Become a Commercial Pilot in India">
              <p>Under DGCA Civil Aviation Requirements (CAR Section 7, Series B, Part I), earning a Commercial Pilot License follows nine sequential milestones:</p>
              <ol className="list-decimal space-y-4 pl-6">
                <li><strong className="text-foreground">Meet Educational Eligibility:</strong> Complete <strong>10+2 (Class 12) with Physics and Mathematics</strong> from a recognized board (students from non-science streams can clear Physics and Maths through NIOS on-demand exams). Minimum age to apply for a CPL is <strong>18 years</strong>.</li>
                <li><strong className="text-foreground">Clear DGCA Class 2 &amp; Class 1 Medicals:</strong> Obtain a DGCA Class 2 Medical Assessment first, followed by a Class 1 Medical Assessment (mandatory prior to CPL issuance) to verify vision, cardiovascular, and auditory fitness.</li>
                <li><strong className="text-foreground">Register for a DGCA Computer Number:</strong> Apply online via the <strong>DGCA Pariksha portal</strong> with verified 10th and 12th board certificates to receive your permanent examination ID.</li>
                <li><strong className="text-foreground">Pass DGCA Theory Examinations &amp; RTR(A):</strong> Score at least <strong>70% in each paper</strong> across Air Navigation, Aviation Meteorology, Air Regulations, Technical General, and Technical Specific, and clear the Radio Telephony Restricted (Aeronautical) – <strong>RTR(A)</strong> exam.</li>
                <li><strong className="text-foreground">Complete 200 Hours of Flying Training:</strong> Log a minimum of <strong>200 flying hours</strong> at a DGCA-approved FTO (or ICAO-compliant foreign school), including 100 hours Pilot-in-Command (PIC), cross-country flights, instrument time, and multi-engine endorsement.</li>
                <li><strong className="text-foreground">Obtain Your DGCA CPL:</strong> Submit your eGCA logbook, medicals, exam pass certificates, and skill test reports to receive your Commercial Pilot License.</li>
                <li><strong className="text-foreground">Complete Aircraft Type Rating (Where Applicable):</strong> Train on a Level-D full-flight simulator for a commercial airliner (such as Airbus A320 or Boeing 737) either independently or via an airline cadet program.</li>
                <li><strong className="text-foreground">Clear Airline Selection:</strong> Pass airline written tests, COMPASS / ADAPT assessments, simulator checks, and HR/technical interviews.</li>
                <li><strong className="text-foreground">Complete Line Training &amp; Build Toward ATPL:</strong> Fly supervised sectors as a Trainee First Officer, earn line release, and accumulate 1,500 total hours to upgrade to ATPL and eventual Captaincy.</li>
              </ol>
            </Section>

            <Section id="is-becoming-a-pilot-worth-it" title="15. Is Becoming a Pilot Financially Worth It?">
              <p>
                Aviation offers one of the highest lifetime earning trajectories of any profession accessible straight after Class 12—<strong>if you enter with clear financial eyes</strong>.
              </p>
              <ul className="list-disc space-y-4 pl-6">
                <li><strong className="text-foreground">The Upside:</strong> Few careers allow a 21-year-old graduate without a master’s degree to earn ₹2.5 lakh/month in their early twenties and ₹8 lakh to ₹12 lakh/month by their late twenties or early thirties. Combined with India’s multi-hundred-aircraft order books at IndiGo and Air India, long-term demand for experienced Captains remains strong.</li>
                <li><strong className="text-foreground">The Risks:</strong> High upfront capital (₹65–90 lakh), cyclical airline hiring freezes, strict semi-annual/annual Class 1 medical standards, and zero guaranteed placement after independent CPL training.</li>
                <li><strong className="text-foreground">The Verdict:</strong> Becoming a pilot is financially worth it if you can fund training without predatory high-interest debt, maintain strict medical and academic discipline, and view the first 2–3 years as an investment phase rather than immediate peak income.</li>
              </ul>
            </Section>

            <section id="faqs" aria-labelledby="faqs-heading" className="scroll-mt-24 border-b border-border/70 py-10 md:py-12">
              <h2 id="faqs-heading" className="mb-5 text-2xl font-bold leading-tight text-foreground md:text-3xl">
                16. Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {PILOT_SALARY_FAQS.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`salary-faq-${index}`} className="border-b border-border">
                    <AccordionTrigger className="py-5 text-left font-semibold leading-6 hover:no-underline">
                    {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 leading-7 text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section aria-labelledby="related-guides" className="border-b border-border/70 py-10 md:py-12">
              <h2 id="related-guides" className="mb-5 text-2xl font-bold leading-tight text-foreground md:text-3xl">
                Related Guides
              </h2>
              <ul className="list-disc space-y-3 pl-6">
                <li><Link to="/blog/dgca-exam-fees" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">DGCA Exam Fees: what candidates pay per paper</Link></li>
                <li><Link to="/blog/jobs-after-cpl-india" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">Jobs after CPL in India: what the licence qualifies you for</Link></li>
                <li><Link to="/blog/cadet-pilot-programme-vs-self-sponsored-cpl" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">Cadet pilot programme vs self-sponsored CPL</Link></li>
              </ul>
            </section>

            <section aria-labelledby="pilot-pathway-cta" className="mt-10 rounded-2xl bg-primary px-6 py-8 text-primary-foreground md:px-10 md:py-10">
              <h2 id="pilot-pathway-cta" className="text-2xl font-bold leading-tight md:text-3xl">
                Plan Your Commercial Pilot Pathway with Flying Star Aviator
              </h2>
              <p className="mt-4 leading-7 text-primary-foreground/85">
                Building a rewarding airline career starts with clearing your DGCA theory examinations on the first attempt and choosing the right flying training pathway.
              </p>
              <ul className="mt-5 space-y-3 leading-7">
                <li><strong>Start Your Theory Prep:</strong> Explore <Link to="/courses/cpl" className="underline underline-offset-4">DGCA CPL Ground Classes in Delhi</Link></li>
                <li><strong>Plan Your Budget Transparently:</strong> Review our <Link to="/courses/cpl/fees" className="underline underline-offset-4">CPL Fees in India Guide</Link></li>
                <li><strong>Prepare for Command Upgrades:</strong> Learn about <Link to="/courses/atpl" className="underline underline-offset-4">DGCA ATPL Ground Classes</Link></li>
                <li>
                  <strong>Speak with an Aviation Career Advisor:</strong> Call{" "}
                  <a href="tel:+919953536199" className="underline underline-offset-4">+91 99535 36199</a>
                  {" / "}
                  <a href="tel:+919953566619" className="underline underline-offset-4">+91 99535 66619</a>
                  {" "}or email{" "}
                  <a href="mailto:info@flyingstaraviator.com" className="underline underline-offset-4">info@flyingstaraviator.com</a>
                  {" "}(Dwarka, New Delhi).
                </li>
              </ul>
            </section>
          </div>

          <aside className="hidden min-w-0 lg:block">
            <nav aria-label="Table of contents" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground">On this page</h2>
              <ol className="list-inside list-decimal space-y-2 text-sm leading-5">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline" href={`#${item.id}`}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </article>
    </Layout>
  );
}
