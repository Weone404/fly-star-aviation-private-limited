import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/breadcrumb-nav";
import { CitableAnswer } from "@/components/CitableAnswer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PAGE_FAQS } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Send } from "lucide-react";

const LAST_UPDATED = "2026-09-10";
const LAST_UPDATED_LABEL = "September 10, 2026";

/** Single source of truth: the same array feeds the FAQPage JSON-LD. */
const faqs = PAGE_FAQS["/apply"];

const COURSES = [
  "DGCA CPL ground classes",
  "DGCA ATPL ground classes",
  "RTR(A) preparation",
  "PPL guidance",
  "Career guidance, undecided",
  "Something else",
];

const QUALIFICATIONS = [
  "Currently in school",
  "Class 10 passed",
  "10+2 passed, with Physics and Mathematics",
  "10+2 passed, without Physics or Mathematics",
  "Graduate",
  "Already holding a DGCA computer number",
];

const STEPS: { title: string; body: string }[] = [
  {
    title: "Send this enquiry",
    body: "It reaches the academics team with what you are studying for and where you are starting from. Nothing is charged and nothing is committed at this stage.",
  },
  {
    title: "A counselling call",
    body: "The purpose is to work out which papers you should sit first, whether you need a computer number before anything else, and whether ground classes are the right next step for you at all.",
  },
  {
    title: "A written plan",
    body: "Which subjects, in what order, against the exam calendar. If the honest answer is that you should wait, sort your medical first, or finish an academic requirement, that is what the plan will say.",
  },
  {
    title: "Enrolment, only if it fits",
    body: "Fees, schedule and batch are confirmed in writing before any payment. Flying Star Aviator runs ground classes and career guidance; flying training happens at partner FTOs, and those are separate arrangements you make with the FTO.",
  },
];

const CHECKLIST: string[] = [
  "Your Class 10 and 10+2 marksheets, whichever you have",
  "A government photo ID",
  "Your DGCA computer number, if one has already been allotted",
  "Any DGCA paper results already attempted",
  "Your Class 1 or Class 2 medical status, if you have been assessed",
];

function validate(form: Record<string, string>): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!form.name.trim()) errs.name = "Name is required";
  if (!form.phone.trim()) errs.phone = "Phone is required";
  else if (!/^[+\d\s()-]{7,15}$/.test(form.phone)) errs.phone = "Enter a valid phone number";
  if (!form.email.trim()) errs.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
  return errs;
}

const INITIAL = {
  name: "",
  phone: "",
  email: "",
  course: COURSES[0],
  city: "",
  qualification: QUALIFICATIONS[0],
  message: "",
};

export default function ApplyPage() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Honeypot. Always empty for a real visitor; bots fill it.
  const [company, setCompany] = useState("");
  const { toast } = useToast();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const found = validate(form);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        return;
      }
      setSubmitting(true);

      // The existing enquiry endpoint stores a fixed set of fields, so the
      // details it has no column for travel in the message rather than in a
      // new endpoint that would widen the public write surface.
      const message = [
        form.message.trim(),
        form.city.trim() ? `City: ${form.city.trim()}` : "",
        `Current qualification: ${form.qualification}`,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,
            interest: form.course,
            message: message || "No additional message",
            company,
          }),
        });
        const data = await res.json().catch(() => ({ success: res.ok }));
        if (!res.ok || data.success === false) throw new Error(data.error || "Request failed");
        setSubmitted(true);
      } catch {
        toast({
          title: "That did not go through",
          description: "Please call +91 99535 36199 or email info@flyingstaraviator.com and we will pick it up from there.",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [form, company, toast],
  );

  return (
    <Layout>
      <Breadcrumb items={[{ label: "Apply" }]} />

      <main>
        <header className="py-10 md:py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Apply to Flying Star Aviator: What Happens, and What to Have Ready
            </h1>
            <p className="text-sm text-muted-foreground">
              Written by{" "}
              <Link to="/editorial-policy" className="underline hover:text-primary">
                Flying Star Aviator Academics Team
              </Link>{" "}
              &middot; Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
            </p>
          </div>
        </header>

        <CitableAnswer
          heading="What does applying to Flying Star Aviator actually involve?"
          answer="Applying here is an enquiry, not a regulatory step. You send your details, the academics team calls to work out which DGCA papers you should sit first and in what order, and you get a written study plan before any fee is discussed. Flying Star Aviator is a DGCA ground school and career-guidance organisation in Dwarka, New Delhi; flying training happens at partner FTOs under separate arrangements. Nothing on this page registers you with DGCA."
          lastUpdated={LAST_UPDATED}
        />

        <article>
          <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
            <section aria-labelledby="what-this-is-not">
              <h2 id="what-this-is-not" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What this form is not
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                It is not a DGCA application. Registering as a Flight Crew candidate and
                obtaining a computer number happens only on the DGCA examination portal,
                and no institute can do it on your behalf. If you have not started that
                yet, read{" "}
                <Link to="/dgca/computer-number" className="underline hover:text-primary">
                  how the DGCA computer number process works
                </Link>{" "}
                first; it is usually the correct first move, and it is free to begin.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                It is also not an admission decision. Ground classes suit some candidates
                and not others, and the counselling call exists partly to say so.
              </p>
            </section>

            <section aria-labelledby="steps">
              <h2 id="steps" className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                What happens after you send this
              </h2>
              <ol className="space-y-6">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="checklist">
              <h2 id="checklist" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What to have ready for the call
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                None of this is needed to send the form. It is what makes the call useful
                rather than a second round of questions.
              </p>
              <ul className="space-y-3">
                {CHECKLIST.map((c) => (
                  <li key={c} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <CheckCircle aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="form-heading" id="form">
              <h2 id="form-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Send your enquiry
              </h2>

              {submitted ? (
                <div className="rounded-xl border border-border bg-card p-6">
                  <CheckCircle aria-hidden="true" className="h-8 w-8 text-primary" />
                  <h3 className="mt-3 text-xl font-semibold text-foreground">Received</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    The academics team has your details. If you would rather not wait for
                    the call, phone{" "}
                    <a href="tel:+919953536199" className="underline hover:text-primary">
                      +91 99535 36199
                    </a>{" "}
                    during working hours, Monday to Saturday, 9:00 AM to 6:00 PM.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    While you wait, the{" "}
                    <Link to="/dgca/ground-classes" className="underline hover:text-primary">
                      ground classes page
                    </Link>{" "}
                    explains what the six DGCA papers cover.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="apply-name" className="mb-1 block text-sm font-medium text-foreground">
                        Full name
                      </label>
                      <Input
                        id="apply-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "apply-name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="apply-name-error" className="mt-1 text-sm text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="apply-phone" className="mb-1 block text-sm font-medium text-foreground">
                        Phone
                      </label>
                      <Input
                        id="apply-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "apply-phone-error" : undefined}
                      />
                      {errors.phone && (
                        <p id="apply-phone-error" className="mt-1 text-sm text-destructive">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="apply-email" className="mb-1 block text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="apply-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "apply-email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="apply-email-error" className="mt-1 text-sm text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="apply-city" className="mb-1 block text-sm font-medium text-foreground">
                        City
                      </label>
                      <Input
                        id="apply-city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="apply-course" className="mb-1 block text-sm font-medium text-foreground">
                        What are you asking about
                      </label>
                      <select
                        id="apply-course"
                        name="course"
                        value={form.course}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {COURSES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="apply-qualification" className="mb-1 block text-sm font-medium text-foreground">
                        Where you are right now
                      </label>
                      <select
                        id="apply-qualification"
                        name="qualification"
                        value={form.qualification}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {QUALIFICATIONS.map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="apply-message" className="mb-1 block text-sm font-medium text-foreground">
                      Anything you want the counsellor to know
                    </label>
                    <Textarea
                      id="apply-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Papers already attempted, medical status, timelines you are working to."
                    />
                  </div>

                  {/* Honeypot: hidden from people, filled by bots. */}
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="apply-company">Company</label>
                    <input
                      id="apply-company"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" disabled={submitting}>
                    {submitting ? "Sending" : "Send enquiry"}
                    <Send aria-hidden="true" className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    Your details are used to answer this enquiry. Read the{" "}
                    <Link to="/editorial-policy" className="underline hover:text-primary">
                      editorial and data policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </section>

            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section aria-labelledby="related">
              <h2 id="related" className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Before you send it
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>
                  <Link to="/dgca/computer-number" className="underline hover:text-primary">
                    Getting a DGCA computer number
                  </Link>
                </li>
                <li>
                  <Link to="/courses/cpl/fees" className="underline hover:text-primary">
                    What CPL training actually costs you, component by component
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/medical" className="underline hover:text-primary">
                    Class 1 and Class 2 medical requirements
                  </Link>
                </li>
                <li>
                  <Link to="/dgca/ground-classes" className="underline hover:text-primary">
                    What DGCA ground classes cover
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
