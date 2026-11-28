import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  BackToTop,
  Breadcrumbs,
  FaqAccordions,
  ReadingProgress,
  ShareBar,
  TableOfContents,
} from "@/components/blog/EditorialKit";
import type { TocItem } from "@/lib/articleHtml";
import { FAQ_ANCHOR } from "@/lib/articleHtml";
import {
  PILOT_AFTER_12TH_FAQS,
  PILOT_AFTER_12TH_LAST_MODIFIED,
  PILOT_AFTER_12TH_PUBLISHED,
} from "@/lib/pilotAfter12thContent";

const TITLE = "How to Become a Pilot After 12th in India";
const publishedDate = new Date(`${PILOT_AFTER_12TH_PUBLISHED}T00:00:00Z`);
const formattedPublishedDate = publishedDate.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const updatedDate = new Date(`${PILOT_AFTER_12TH_LAST_MODIFIED}T00:00:00Z`);
const formattedUpdatedDate = updatedDate.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function headingId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const sections = [
  {
    title: "Can you become a pilot after 12th in India?",
    content: (
      <>
        <p>
          Yes, Class 12 is an important starting point for a civilian pilot-licensing
          pathway. It is not, by itself, a licence or an assurance of airline
          employment. A candidate must meet the current DGCA requirements for the
          licence sought, complete the applicable examinations and medical
          assessments, and arrange aircraft training separately through an
          appropriately approved Flying Training Organisation (FTO).
        </p>
        <p>
          The practical plan has two distinct learning stages: theoretical
          preparation and flying training. Flying Star Aviator provides DGCA CPL
          and ATPL ground classes in Dwarka, New Delhi; aircraft flying training
          takes place separately at an FTO. The steps below explain what to check
          before enrolling or paying a provider.
        </p>
      </>
    ),
  },
  {
    title: "Eligibility criteria to become a pilot after 12th",
    content: (
      <>
        <p>
          Separate DGCA licensing requirements from an academy's or airline's
          admission conditions. A provider may set its own selection criteria;
          those should not be presented as a universal DGCA rule.
        </p>
        <h3>Educational qualification and subjects</h3>
        <p>
          For the CPL route, check the current DGCA requirement for 10+2 Physics
          and Mathematics, accepted boards and any equivalency documents. The
          Pariksha Flight Crew FAQ and current Civil Aviation Requirements are the
          controlling references. If you studied a different subject combination,
          confirm the exact route with DGCA before submitting an application.
        </p>
        <p>
          The supplied article describes NIOS as an option for students who need
          Physics or Mathematics. It does not establish that every board,
          marksheet or subject-credit combination will be accepted. See our{" "}
          <Link to="/blog/pilot-without-maths-nios-route-india">
            guide to the NIOS route
          </Link>{" "}
          and confirm your own documents with DGCA and the relevant board.
        </p>
        <h3>Age and licence stage</h3>
        <p>
          Minimum ages differ across student, private and commercial licence
          stages. The supplied draft lists specific ages, but those figures
          should be checked against the current Aircraft Rules before you rely
          on them: it lists 16 for SPL, 17 for PPL and 18 for CPL. A school's
          minimum admission age may be different from the regulator's licence
          requirement.
        </p>
        <h3>Medical fitness</h3>
        <p>
          Medical requirements are licence-specific. The current DGCA medical
          requirement says a Class 2 assessment is not mandatory before an
          initial Class 1 medical examination; this differs from the sequence
          stated in the supplied draft. A Class 1 medical applies to CPL
          requirements. Read our{" "}
          <Link to="/dgca/medical">DGCA medical guide</Link> and confirm the
          applicable route directly with DGCA.
        </p>
        <h3>Marks and admission criteria</h3>
        <p>
          The supplied draft mentions percentage cut-offs used by some schools
          or cadet programmes, including a 50–60% range. This is not a single
          DGCA-wide threshold and has not been verified for current providers.
          Confirm current admission criteria with the specific FTO or airline
          programme, and obtain them in writing.
        </p>
        <h3>How SPL, PPL and CPL differ</h3>
        <p>
          SPL means Student Pilot Licence, PPL means Private Pilot Licence and
          CPL means Commercial Pilot Licence. They are separate licence
          categories with different privileges and requirements. Confirm the
          current privileges, eligibility and experience requirements for the
          category you intend to pursue in DGCA's Aircraft Rules.
        </p>
      </>
    ),
  },
  {
    title: "How to become a pilot after 12th: step-by-step process",
    content: (
      <>
        <p>
          These stages are a planning sequence, not a promise that every
          application follows an identical order. DGCA's current instructions
          determine the requirements for your licence category.
        </p>
        <ol>
          <li>
            <strong>Choose the licence route.</strong> Decide whether you are
            researching a civilian CPL, an airline cadet programme or a military
            entry route. Their eligibility, selection and costs are different.
          </li>
          <li>
            <strong>Check your Class 12 documents.</strong> Confirm subjects,
            board recognition, equivalency and any verification steps against
            the current DGCA and Pariksha guidance.
          </li>
          <li>
            <strong>Review the medical requirements early.</strong> Check the
            medical class and examination route for your intended licence with
            DGCA. A school checklist does not replace a DGCA medical assessment.
          </li>
          <li>
            <strong>Read the current Computer Number instructions.</strong>{" "}
            Apply through the official Pariksha process and follow the document
            checklist that applies to your board and candidate route. See the{" "}
            <Link to="/dgca/computer-number">Computer Number guide</Link>.
          </li>
          <li>
            <strong>Prepare for the theory examinations.</strong> Use the
            current DGCA syllabus and plan for the applicable papers. Ground
            classes are separate from aircraft flying training.
          </li>
          <li>
            <strong>Select an FTO for the flying phase.</strong> Verify active
            approval, operating base, training scope, aircraft availability and
            written payment and refund terms before paying a deposit.
          </li>
          <li>
            <strong>Complete examinations and radio-telephony requirements.</strong>{" "}
            Check current DGCA and WPC notices for the applicable examination,
            licence and radio-telephony steps; arrangements can change.
          </li>
          <li>
            <strong>Meet the flight-experience and skill-test requirements.</strong>{" "}
            The total and required components depend on the current licensing
            rules. Confirm the applicable breakdown with DGCA and the FTO.
          </li>
          <li>
            <strong>Apply for licence issue.</strong> Submit the current
            application, logbook and supporting records through the official
            process after confirming all requirements for the licence sought.
          </li>
        </ol>
        <p>
          Before you start, compare the{" "}
          <Link to="/become-a-pilot/commercial-pilot-licence">
            CPL licence overview
          </Link>{" "}
          with the full{" "}
          <Link to="/pilot-training/india">pilot-training pathway in India</Link>.
        </p>
      </>
    ),
  },
  {
    title: "DGCA examinations and ground training",
    content: (
      <>
        <p>
          The supplied article names Air Navigation, Aviation Meteorology, Air
          Regulations, Technical General and Technical Specific among the
          theory subjects. Paper names, syllabus and examination arrangements
          should be checked against the current DGCA Flight Crew material rather
          than assumed from an older course outline.
        </p>
        <p>
          Radio-telephony has a separate regulatory process. Confirm the
          applicable examination and licence steps with the current DGCA and
          WPC notices. Our{" "}
          <Link to="/blog/dgca-exam-subjects-by-licence">
            guide to DGCA examination subjects
          </Link>{" "}
          provides further context, while the{" "}
          <Link to="/courses/cpl">CPL ground-class page</Link> explains what
          theoretical preparation covers.
        </p>
        <p>
          Passing theory papers does not complete the flying phase or issue a
          CPL. Keep the distinction between ground school, FTO flying,
          examinations, medical requirements and licence issuance clear when
          comparing course offers.
        </p>
      </>
    ),
  },
  {
    title: "How long does pilot training take?",
    content: (
      <>
        <p>
          The supplied draft estimates 18–24 months for ground examinations and
          flying training. That estimate is not a DGCA timetable and has not
          been independently checked against recent FTO completion data. Treat
          it as an unverified planning estimate, not a promised duration.
        </p>
        <p>
          Actual timing depends on examination schedules, medical and document
          processing, weather, aircraft serviceability, instructor and aircraft
          availability, training progress and any additional requirements.
          Ask an FTO for recent completion data, what its estimate includes,
          and what happens if training takes longer.
        </p>
      </>
    ),
  },
  {
    title: "Pilot training fees in India",
    content: (
      <>
        <p>
          There is no single all-inclusive DGCA price for pilot training.
          Ground-school fees, regulator charges, medicals, flying training,
          accommodation and later ratings may be separate expenses. Ask each
          provider for an itemised quotation with inclusions, exclusions,
          payment milestones and refund terms. Our{" "}
          <Link to="/courses/cpl/fees">CPL fees guide</Link> explains how to
          compare cost components.
        </p>
        <aside className="my-6 rounded-xl border border-accent/40 bg-accent/10 p-5 text-sm leading-relaxed text-foreground">
          <strong>Unverified figures from the supplied draft:</strong> it lists
          cost ranges that have not been independently verified against current
          provider quotations. The following table preserves the supplied
          breakdown for review; these are not Flying Star Aviator fees or DGCA
          tariffs. Do not use them as a current quote.
        </aside>
        <div className="table-scroll">
          <table>
            <caption>Supplied draft estimates only; verify with current written provider quotations</caption>
            <thead>
              <tr>
                <th scope="col">Expense</th>
                <th scope="col">Figure in supplied draft</th>
                <th scope="col">What to verify</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">DGCA Class 1 and Class 2 medicals</th>
                <td>₹15,000–₹35,000</td>
                <td>Applicable medical route, examination charges and any additional tests.</td>
              </tr>
              <tr>
                <th scope="row">Ground school and examination costs</th>
                <td>₹2–₹3.5 lakh</td>
                <td>Separate tuition, examination charges, study materials and RTR-related expenses.</td>
              </tr>
              <tr>
                <th scope="row">Flying training</th>
                <td>₹35–₹48 lakh</td>
                <td>Aircraft, hours, instructor, simulator, landing, navigation and retest charges.</td>
              </tr>
              <tr>
                <th scope="row">Single-engine flying within that estimate</th>
                <td>150–170 hours; ₹25–₹30 lakh</td>
                <td>Hours, aircraft rate, included charges and applicable DGCA experience requirements.</td>
              </tr>
              <tr>
                <th scope="row">Multi-engine flying within that estimate</th>
                <td>15–25 hours; ₹10–₹15 lakh</td>
                <td>Aircraft, hours, rating scope and additional charges.</td>
              </tr>
              <tr>
                <th scope="row">Simulator, examinations and DGCA charges</th>
                <td>₹3–₹5 lakh</td>
                <td>Current regulator charges and the provider's included training or simulator time.</td>
              </tr>
              <tr>
                <th scope="row">Accommodation and equipment</th>
                <td>₹2–₹4 lakh</td>
                <td>Living costs, travel, uniform, equipment and the period covered.</td>
              </tr>
              <tr>
                <th scope="row">Estimated CPL total in India</th>
                <td>₹40–₹55 lakh</td>
                <td>All inclusions, exclusions, payment terms and refund conditions.</td>
              </tr>
              <tr>
                <th scope="row">Training abroad, including conversion</th>
                <td>
                  Draft sections conflict: ₹35–₹60 lakh plus ₹6–₹8 lakh for
                  conversion; total estimates of ₹45–₹65 lakh+ and ₹50–₹70 lakh.
                </td>
                <td>Local licence, conversion requirements, travel, visa and currency exposure.</td>
              </tr>
              <tr>
                <th scope="row">Type rating</th>
                <td>₹15–₹25 lakh or more; the draft says 2–3 months</td>
                <td>Aircraft type, training centre, employer arrangement, duration and current contract terms.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The draft's cost table is retained here for review because figures
          matter to students and families. It should be replaced or confirmed
          with current written quotations before anyone treats those estimates
          as a budget.
        </p>
      </>
    ),
  },
  {
    title: "Pilot training in India vs. abroad",
    content: (
      <>
        <div className="table-scroll">
          <table>
            <caption>Questions to compare before choosing a training location</caption>
            <thead>
              <tr>
                <th scope="col">Factor</th>
                <th scope="col">Training in India</th>
                <th scope="col">Training abroad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Licence route</th>
                <td>Check the requirements for the intended Indian DGCA licence.</td>
                <td>Confirm the issuing authority and the current DGCA conversion route.</td>
              </tr>
              <tr>
                <th scope="row">Provider status</th>
                <td>Verify the FTO's current DGCA approval and its scope.</td>
                <td>Verify the school's current approval with its local aviation authority.</td>
              </tr>
              <tr>
                <th scope="row">Additional planning</th>
                <td>Compare current FTO terms and local living costs.</td>
                <td>Include conversion requirements, travel, visa and currency exposure in the comparison.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The supplied draft estimates 12–16 months for overseas training and
          another 3–6 months for conversion. These timelines have not been
          independently verified and are not guarantees. Its overseas cost
          figures also conflict; see the flagged cost breakdown above. For
          licence conversion, see the{" "}
          <Link to="/pilot-training/guide-to-conversion">
            DGCA foreign-licence conversion guide
          </Link>{" "}
          and confirm the latest rule before enrolling abroad.
        </p>
      </>
    ),
  },
  {
    title: "How to choose a flying school",
    content: (
      <>
        <p>
          A school advertisement is not proof of approval or available training
          capacity. Before paying, verify the provider's current status with
          DGCA and ask for written answers to practical questions:
        </p>
        <ul>
          <li>What is the active approval scope and which base does it cover?</li>
          <li>How many training aircraft are currently serviceable?</li>
          <li>How are aircraft, instructors and students scheduled?</li>
          <li>Which flight hours, checks and ratings are included in the quote?</li>
          <li>What extra charges, payment terms and refund conditions apply?</li>
          <li>Can the provider share recent completion timelines and explain delays?</li>
        </ul>
        <p>
          Read our practical{" "}
          <Link to="/blog/how-to-choose-a-flying-school-in-india">
            flying-school selection checklist
          </Link>{" "}
          and compare written quotations rather than relying on a headline total
          or an employment promise.
        </p>
      </>
    ),
  },
  {
    title: "Can commerce or arts students become pilots?",
    content: (
      <>
        <p>
          The supplied article says students from Commerce or Arts can pursue a
          CPL after completing the required Physics and Mathematics subjects
          through an accepted board. The key step is not to assume that a
          particular open-school subject, marksheet or part-credit route will be
          accepted automatically.
        </p>
        <p>
          Check board recognition, subject documentation and DGCA verification
          requirements before registering for examinations. The{" "}
          <Link to="/blog/pilot-without-maths-nios-route-india">
            NIOS and Physics/Mathematics guide
          </Link>{" "}
          explains the document questions to resolve.
        </p>
      </>
    ),
  },
  {
    title: "How to become a female pilot after 12th",
    content: (
      <>
        <p>
          The supplied article describes the same licensing pathway for women
          and men. Candidates should assess their application against the
          current DGCA eligibility and medical requirements for the intended
          licence, rather than relying on gender-specific claims from an
          academy or an unsourced career page.
        </p>
        <p>
          Airline hiring, cadet-programme selection, scholarship availability
          and financing terms are set by the relevant organisation and can
          change. Confirm each programme's current published conditions
          directly; a licence or course does not guarantee selection or
          employment.
        </p>
      </>
    ),
  },
  {
    title: "Pilot salary and career opportunities after a CPL",
    content: (
      <>
        <p>
          The supplied draft does not provide a sourced salary scale, and pilot
          pay varies by employer, role, experience, aircraft and contract. We
          do not add salary ranges without a reliable current source. See the{" "}
          <Link to="/pilot-salary-in-india">pilot salary guide</Link> for a
          source-based discussion of what can and cannot be verified.
        </p>
        <p>
          The career paths described in the supplied article include airline
          recruitment, cadet programmes, flight instruction, charter and
          business aviation, and specialised operations. Each has separate
          recruitment, licence, rating and experience requirements. Review the
          employer's current criteria and do not treat a training course or
          licence as a job guarantee.
        </p>
      </>
    ),
  },
  {
    title: "Common mistakes students should avoid",
    content: (
      <>
        <ul>
          <li>Committing a large deposit before checking the medical route and provider's written terms.</li>
          <li>Assuming an academy's claims about DGCA approval apply to its own ground classes or to an FTO.</li>
          <li>Relying on unsourced fees, flight-hour totals, timelines or salary promises.</li>
          <li>Comparing providers without checking aircraft availability, inclusions, payment milestones and refunds.</li>
          <li>Waiting to confirm board documents and examination registration requirements until training is underway.</li>
        </ul>
        <p>
          Keep copies of current DGCA instructions and every provider quotation.
          Recheck regulatory details when you apply; a saved article or old
          brochure may no longer reflect the latest process.
        </p>
      </>
    ),
  },
];

const tocItems: TocItem[] = [
  ...sections.map(({ title }) => ({ id: headingId(title), text: title, level: 2 as const })),
  { id: FAQ_ANCHOR, text: "Frequently asked questions", level: 2 },
  { id: headingId("Sources and related resources"), text: "Sources and related resources", level: 2 },
  { id: headingId("Conclusion and next step"), text: "Conclusion and next step", level: 2 },
];

export default function PilotAfter12thPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ReadingProgress />
      <Breadcrumbs title={TITLE} />

      <header className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:items-center md:gap-10 md:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Pilot career guide
            </span>
            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {TITLE}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              A practical overview of the DGCA licensing pathway after Class 12:
              academic checks, medicals, examinations, flying training, costs to
              verify and career options.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <Link to="/editorial-policy" className="font-medium text-foreground underline-offset-4 hover:underline">
                Flying Star Aviator Academics Team
              </Link>
              <span>DGCA CPL &amp; ATPL ground instruction, Dwarka, New Delhi</span>
              <span aria-hidden="true">·</span>
              <span>
                Published{" "}
                <time dateTime={PILOT_AFTER_12TH_PUBLISHED}>{formattedPublishedDate}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Updated{" "}
                <time dateTime={PILOT_AFTER_12TH_LAST_MODIFIED}>{formattedUpdatedDate}</time>
              </span>
            </div>
          </div>
          <figure className="m-0">
            <img
              src="/assets/hero-aircraft-800w.jpg"
              srcSet="/assets/hero-aircraft-800w.jpg 800w, /assets/hero-aircraft-1600w.jpg 1600w, /assets/hero-aircraft-2400w.jpg 2400w"
              sizes="(max-width: 640px) 100vw, 600px"
              alt="Passenger aircraft in flight above clouds at sunset"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-[16/10] w-full rounded-xl border border-border object-cover"
            />
          </figure>
        </div>
      </header>

      <main>
        <article className="min-w-0">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="min-w-0">
              <section className="my-8 max-w-3xl border-l-4 border-primary bg-primary/5 px-5 py-4 md:px-6" aria-labelledby="quick-answer">
                <h2 id="quick-answer" className="text-xs font-bold uppercase tracking-wide text-primary">
                  In brief
                </h2>
                <p className="mt-2 text-base leading-relaxed text-foreground">
                  Becoming a commercial pilot after Class 12 involves meeting
                  the current DGCA academic, medical, examination and
                  flight-experience requirements, then completing aircraft
                  training through an appropriately approved FTO. Verify each
                  step and obtain written provider terms before committing
                  funds.
                </p>
              </section>

              <TableOfContents items={tocItems} variant="mobile" />

              <div className="article-body">
                {sections.map(({ title, content }) => {
                  const id = headingId(title);
                  return (
                    <section key={id} aria-labelledby={id}>
                      <h2 id={id}>{title}</h2>
                      {content}
                    </section>
                  );
                })}

                <FaqAccordions faqs={PILOT_AFTER_12TH_FAQS} />

                <section aria-labelledby={headingId("Sources and related resources")}>
                  <h2 id={headingId("Sources and related resources")}>Sources and related resources</h2>
                  <p>
                    Licensing details can change. Use current regulator
                    documents for decisions and verify provider terms directly.
                  </p>
                  <ul>
                    <li>
                      <a
                        href="https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=1A745E291DDC1E1BDC7FD70AEC52B711"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DGCA Flight Crew Civil Aviation Requirements
                      </a>
                    </li>
                    <li>
                      <a href="https://pariksha.dgca.gov.in/Form/PLT_FAQs" target="_blank" rel="noopener noreferrer">
                        DGCA Pariksha Flight Crew FAQs
                      </a>
                    </li>
                    <li>
                      <a href="https://www.dgca.gov.in/" target="_blank" rel="noopener noreferrer">
                        Directorate General of Civil Aviation
                      </a>
                    </li>
                    <li>
                      <Link to="/editorial-policy">Flying Star Aviator editorial policy</Link>
                    </li>
                  </ul>
                  <h3>Related reading</h3>
                  <ul>
                    <li><Link to="/courses/cpl">CPL ground classes and examination preparation</Link></li>
                    <li><Link to="/dgca/ground-classes">DGCA ground classes in Delhi</Link></li>
                    <li><Link to="/courses/cpl/fees">How to compare CPL cost components</Link></li>
                    <li><Link to="/pilot-training/guide-to-conversion">Foreign pilot-licence conversion</Link></li>
                  </ul>
                </section>

                <section aria-labelledby={headingId("Conclusion and next step")}>
                  <h2 id={headingId("Conclusion and next step")}>Conclusion and next step</h2>
                  <p>
                    Start with your academic documents and the current DGCA
                    requirements for the licence you intend to pursue. Confirm
                    the medical and examination process, distinguish theory
                    classes from FTO flying, and compare written quotations
                    before making a financial commitment. Recheck changing
                    rules with DGCA before applying.
                  </p>
                  <p>
                    Flying Star Aviator provides DGCA CPL and ATPL ground
                    classes and pathway guidance in Dwarka, New Delhi.
                    Aircraft flying training is arranged separately through an
                    FTO.
                  </p>
                  <Link
                    to="/apply"
                    className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Ask about DGCA ground classes
                  </Link>
                </section>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <ShareBar title={TITLE} />
                <Link to="/blogs" className="text-sm font-semibold text-primary underline underline-offset-2">
                  All articles
                </Link>
              </div>
            </div>

            <aside className="mt-10 min-w-0 lg:sticky lg:top-24 lg:mt-0">
              <div className="hidden rounded-xl border border-border bg-card p-4 lg:block">
                <TableOfContents items={tocItems} variant="desktop" />
              </div>
              <div className="mt-6 hidden rounded-xl border border-border bg-primary/5 p-4 text-sm leading-relaxed text-muted-foreground lg:block">
                Check every current licensing requirement with DGCA. Training
                prices and admission conditions are set by individual providers.
              </div>
            </aside>
          </div>
        </article>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
}
