import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import { CitableAnswer } from "@/components/CitableAnswer";
import { Link } from "react-router-dom";
import { PAGE_FAQS } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LAST_UPDATED = "2026-09-04";

/** Single source of truth — the same array feeds the FAQPage JSON-LD. */
const faqs = PAGE_FAQS["/dgca/computer-number"];
const DGCA_FAQ_URL = "https://pariksha.dgca.gov.in/";

const quickFacts: [string, string][] = [
  ["What it is", "Unique ID allotted after your application is approved by the CEO, DGCA"],
  ["Issued by", "Central Examination Organization (CEO), O/o DGCA, East Block-III, Level-III, R.K. Puram, New Delhi 110066"],
  ["Portal", "pariksha.dgca.gov.in"],
  ["Validity", "Lifetime"],
  ["How many", "One per candidate — no exceptions"],
  ["Covers", "All Flight Crew examinations (Pilot, FATA, FDEG, FE, FN)"],
  ["Minimum qualification", "10+2 with Physics and Mathematics from a recognised board (PPL category excepted)"],
  ["Maximum age", "None"],
  ["Legal basis", "Rule 41A, Aircraft Rules 1937; educational qualification under Rule 47A / Schedule II"],
  ["Hard copy", "Required for NEW candidates, by Speed Post or Registered Post"],
];

const newVsOld: [string, string, string][] = [
  ["Definition", "No Flight Crew Computer Number from CEO to date", "Number allotted before the portal launched"],
  ["Hard copy by post", "Required", "Not required"],
  ["Board Verification Certificate", "Mandatory", "Not required"],
  ["Profile updates", "Only after the number is allotted", "Via profile management after registering"],
];

const specs: [string, string, string][] = [
  ["Dimensions", "45 mm high × 35 mm wide", "20 mm high × 45 mm wide"],
  ["Background", "White, no border", "White, no border"],
  ["Maximum file size", "70 KB", "20 KB"],
  ["Format", "JPEG/JPG only", "JPEG/JPG only"],
  ["Other", "Face approximately 70% of the frame; matt finish; not more than 3 months old", "—"],
];

const steps: { title: string; body: string }[] = [
  { title: "Register", body: "Sign up at pariksha.dgca.gov.in under the Flight Crew section as a new candidate." },
  { title: "Activate the email link within 24 hours", body: "It expires after that, and an expired link means starting registration again from scratch." },
  { title: "Complete the application", body: "Enter personal, educational and address details. If your school board or institute is not in the dropdown, select \"OTHERS\" and continue." },
  { title: "Upload documents", body: "PDFs for documents, JPEG for photo and signature, within the size limits above." },
  { title: "Final Submit", body: "Check everything first; nothing can be added afterwards." },
  { title: "Print the PDF form", body: "The form is sent to your registered email. Affix the same passport-size photograph you uploaded and attach all supporting documents — self-attested or attested as applicable — in the same sequence as the printed list." },
  { title: "Post it by Speed Post or Registered Post", body: "Send it to: Central Examination Organization (CEO), O/o Director General of Civil Aviation, East Block-III, Level-III, R.K. Puram, New Delhi 110066." },
  { title: "Track the application", body: "Use Candidate Login with your temporary ID." },
];

const misconceptions: { claim: string; correction: string }[] = [
  {
    claim: "DGCA requires PCM — Physics, Chemistry and Mathematics.",
    correction: "The stated requirement is 10+2 with Physics and Mathematics from a recognised board or university, or its equivalent. Chemistry is not part of it. The PPL category is excepted.",
  },
  {
    claim: "There is an upper age limit to register.",
    correction: "DGCA states there is no maximum age limit to register as a Flight Crew candidate. Age ceilings belong to airline recruitment and cadet programmes, which are separate from DGCA registration.",
  },
  {
    claim: "The Computer Number expires or needs renewal.",
    correction: "Its validity is lifetime.",
  },
  {
    claim: "You can hold a second number for a different exam category.",
    correction: "A candidate is authorised to hold only one, and it covers every Flight Crew examination category.",
  },
  {
    claim: "Submitting online is enough.",
    correction: "For NEW candidates it is not. The number is allotted only after DGCA scrutinises the online application against the hard copy posted to the CEO.",
  },
  {
    claim: "Indian candidates need a passport.",
    correction: "They do not. A passport is mandatory for foreign candidates, including those from Nepal and Bhutan.",
  },
];

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th scope="col" className="text-left font-semibold p-3 border-b border-border">
      {children}
    </th>
  );
}

export default function DgcaComputerNumber() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "DGCA", href: "/dgca" }, { label: "Computer Number" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              DGCA Computer Number: Eligibility, Documents, Process &amp; Timeline
            </h1>
            <p className="text-sm text-muted-foreground">
              Written by{" "}
              <Link to="/editorial-policy" className="underline hover:text-primary">
                Flying Star Aviator Academics Team
              </Link>{" "}
              · Last updated{" "}
              <time dateTime={LAST_UPDATED}>September 4, 2026</time>
            </p>
          </div>
        </header>

        <CitableAnswer
          heading="What is a DGCA Computer Number and how do you get one?"
          answer="A DGCA Computer Number is the unique lifetime identifier allotted to a Flight Crew candidate by the Central Examination Organization, Office of the DGCA. You cannot apply for any DGCA pilot examination without one. A candidate may hold only one, it covers every Flight Crew examination category, and it is issued only after DGCA scrutinises both your online application and the hard copy you post to Delhi."
          sources={[{ label: "DGCA Pariksha — Flight Crew FAQ", url: DGCA_FAQ_URL }]}
          lastUpdated={LAST_UPDATED}
        />

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl space-y-12">
            <section aria-labelledby="quick-facts">
              <h2 id="quick-facts" className="text-2xl md:text-3xl font-bold mb-4">
                Quick facts
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <tbody>
                    {quickFacts.map(([k, v]) => (
                      <tr key={k} className="border-b border-border last:border-0">
                        <th scope="row" className="text-left font-semibold p-3 w-1/3 align-top">
                          {k}
                        </th>
                        <td className="p-3 text-muted-foreground">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                DGCA's Flight Crew FAQ does not publish a processing timeline, so
                this guide does not state one. Track your application through
                Candidate Login rather than working to an assumed date.
              </p>
            </section>

            <section aria-labelledby="eligibility">
              <h2 id="eligibility" className="text-2xl md:text-3xl font-bold mb-4">
                Who is eligible?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Except for the PPL category, applicants must have passed 10+2 with{" "}
                <strong className="text-foreground">Physics and Mathematics</strong>{" "}
                from a recognised board or university, or an equivalent. DGCA states
                there is <strong className="text-foreground">no maximum age limit</strong>{" "}
                to register as a Flight Crew candidate.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Two situations need an extra certificate:
              </p>
              <ul className="mt-3 space-y-3 text-muted-foreground leading-relaxed list-disc pl-5">
                <li>
                  <strong className="text-foreground">
                    Qualifications from outside the Indian board system.
                  </strong>{" "}
                  Anyone whose 10th, 10+2 or equivalent came from an international
                  school, board or university — whether located in India or abroad —
                  needs an equivalency certificate from the Association of Indian
                  Universities (AIU House, 16 Kotla Marg, New Delhi 110022).
                </li>
                <li>
                  <strong className="text-foreground">Diploma holders.</strong> A
                  10+2 equivalency certificate is required from the relevant state
                  Directorate of Technical Education, or from a recognised
                  institution or university.
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Foreign nationals face three additional requirements: a valid
                passport (the passport address becomes the permanent address on
                record), an Indian mobile number before registering, and security
                clearance — Annexure A, submitted in quintuplicate by post along
                with the application. Candidates from Nepal and Bhutan also require
                a valid passport. Indian candidates do not need a passport at all.
              </p>
            </section>

            <section aria-labelledby="new-old">
              <h2 id="new-old" className="text-2xl md:text-3xl font-bold mb-4">
                NEW candidate or OLD candidate?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                DGCA divides applicants into two groups, and the paperwork differs
                sharply. A NEW candidate has never held a Flight Crew Computer
                Number. An OLD candidate was allotted one before the Pariksha portal
                launched.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted/50">
                      <Th>&nbsp;</Th>
                      <Th>NEW candidate</Th>
                      <Th>OLD candidate</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {newVsOld.map(([k, a, b]) => (
                      <tr key={k} className="border-b border-border last:border-0">
                        <th scope="row" className="text-left font-semibold p-3 align-top">
                          {k}
                        </th>
                        <td className="p-3 text-muted-foreground">{a}</td>
                        <td className="p-3 text-muted-foreground">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                If your saved data as an OLD candidate shows a mismatch during
                registration, DGCA's guidance is to complete registration with the
                saved data anyway, then correct it afterwards through the profile
                management link.
              </p>
            </section>

            <section aria-labelledby="documents">
              <h2 id="documents" className="text-2xl md:text-3xl font-bold mb-4">
                What documents do you need?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                NEW candidates need their educational mark sheets, a Board
                Verification Certificate for each, and the supporting documents
                listed on the generated application form — all uploaded as PDFs.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A <strong className="text-foreground">Board Verification Certificate (BVC)</strong>{" "}
                is issued by the relevant board to certify that your mark sheet is
                authentic. It is required for the 10th, 10+2, 10+2-equivalent or
                Diploma mark sheets of Indian and foreign candidates alike, and it is
                mandatory for all NEW candidates before registration. OLD candidates
                do not need one.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Two format rules reject applications routinely:
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
                <li>
                  <strong className="text-foreground">All documents must be PDF.</strong>{" "}
                  JPEG is not accepted for documents.
                </li>
                <li>
                  <strong className="text-foreground">
                    Photograph and signature must be JPEG/JPG.
                  </strong>{" "}
                  PDF is not accepted for these.
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                One rule deserves particular attention: after Final Submission you
                cannot upload anything further. A forgotten document means correcting
                a rejection later, not adding a file. Assemble everything before you
                submit.
              </p>
            </section>

            <section aria-labelledby="specs">
              <h2 id="specs" className="text-2xl md:text-3xl font-bold mb-4">
                Photo and signature specifications
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                DGCA publishes exact specifications, and mismatches are a common
                rejection reason.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted/50">
                      <Th>&nbsp;</Th>
                      <Th>Photograph</Th>
                      <Th>Signature</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map(([k, a, b]) => (
                      <tr key={k} className="border-b border-border last:border-0">
                        <th scope="row" className="text-left font-semibold p-3 align-top">
                          {k}
                        </th>
                        <td className="p-3 text-muted-foreground">{a}</td>
                        <td className="p-3 text-muted-foreground">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section aria-labelledby="apply">
              <h2 id="apply" className="text-2xl md:text-3xl font-bold mb-4">
                How to apply, step by step
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You register on the Pariksha portal, activate the emailed link within
                24 hours, complete the form, upload documents, submit, then post a
                printed hard copy with attached documents to the CEO in New Delhi.
                The number is allotted only after DGCA scrutinises both.
              </p>
              <ol className="space-y-4 list-decimal pl-5">
                {steps.map((s) => (
                  <li key={s.title} className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">{s.title}.</strong> {s.body}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Foreign nationals additionally enclose the security clearance form
                (Annexure A) in quintuplicate with the same posted application.
              </p>
            </section>

            <section aria-labelledby="after">
              <h2 id="after" className="text-2xl md:text-3xl font-bold mb-4">
                What happens after you submit?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                DGCA scrutinises the online application against the posted hard copy.
                The number is not generated automatically on submission. If approved,
                the allotted Computer Number arrives by email at your registered
                address.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Once allotted, your login ID becomes the number prefixed with "P-",
                and you can update your profile for the first time. Note what you can
                change yourself and what you cannot:
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
                <li>
                  <strong className="text-foreground">No approval needed:</strong>{" "}
                  mobile number, email ID, correspondence address.
                </li>
                <li>
                  <strong className="text-foreground">CEO approval needed:</strong>{" "}
                  everything else. Raise it through the "Raise query" tab in profile
                  management.
                </li>
              </ul>
            </section>

            <section aria-labelledby="rejected">
              <h2 id="rejected" className="text-2xl md:text-3xl font-bold mb-4">
                If your application is rejected
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Rejections are emailed to your registered address with the reason
                stated. You then log in through Candidate Login, correct every item
                listed in the rejection email, and resubmit.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Worth planning around: DGCA states the examination fee is not
                refundable under any circumstances, so it is worth being certain of
                your eligibility and your documents before money is involved at the
                examination stage.
              </p>
            </section>

            <section aria-labelledby="misconceptions">
              <h2 id="misconceptions" className="text-2xl md:text-3xl font-bold mb-4">
                Common misconceptions
              </h2>
              <div className="space-y-5">
                {misconceptions.map((m) => (
                  <div key={m.claim}>
                    <h3 className="font-semibold text-foreground mb-1">
                      Misconception: {m.claim}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {m.correction}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Source for all six:{" "}
                <a
                  href={DGCA_FAQ_URL}
                  target="_blank"
                  rel="noopener nofollow"
                  className="underline hover:text-primary"
                >
                  DGCA Pariksha Flight Crew FAQ
                </a>
                , retrieved 22 August 2026.
              </p>
            </section>

            <section aria-labelledby="faq">
              <h2 id="faq" className="text-2xl md:text-3xl font-bold mb-4">
                Frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section aria-labelledby="next" className="border-t border-border pt-8">
              <h2 id="next" className="text-xl font-bold mb-3">
                Related guides
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <Link to="/dgca/ground-classes" className="underline hover:text-primary">
                    DGCA CPL and ATPL ground classes
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/medical" className="underline hover:text-primary">
                    Class 1 and Class 2 medical requirements
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/full-form" className="underline hover:text-primary">
                    What DGCA is and what it regulates
                  </Link>
                </li>
                <li>
                  <Link to="/blog/dgca-ground-classes-vs-self-study" className="underline hover:text-primary">
                    DGCA ground classes vs self-study
                  </Link>
                </li>
              </ul>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Verify current requirements on pariksha.dgca.gov.in before applying —
                DGCA revises procedures periodically, and the portal's user manual
                carries the authoritative document list. Flying Star Aviator runs
                DGCA CPL and ATPL ground classes in Dwarka, New Delhi; if you want
                help sequencing your Computer Number application against your exam
                plan,{" "}
                <Link to="/contact" className="underline hover:text-primary">
                  get in touch
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
