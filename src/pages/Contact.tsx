import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ─── Static data outside component ───────────────────────────────────────────
const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 99535 36199, 9953566619", href: "tel:+919953536199" },
  { icon: Mail, label: "Email", value: "info@flyingstaraviator.com", href: "mailto:info@flyingstaraviator.com" },
  { icon: MapPin, label: "Address", value: "C705, Sector 7, Block C Palam Extension, Dwarka, Delhi, 110077", href: "#" },
  { icon: Clock, label: "Working Hours", value: "Mon - Sat: 9:00 AM - 6:00 PM", href: "#" },
];

const interestOptions = [
  "CPL - Commercial Pilot License",
  "PPL - Private Pilot License",
  "DGCA Exam Preparation",
  "Type Rating",
  "Other Services",
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  interest: interestOptions[0],
  message: "",
};

const WA_NUMBER = "919953536199";

// ─── Shared animation variants (defined once, never recreated) ────────────────
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } };
const fadeOnly = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const viewport = { once: true, margin: "-50px" } as const;
const transitionMd = { duration: 0.5 } as const;

// ─── Memoized sub-components ──────────────────────────────────────────────────

/** Single contact info card */
const ContactCard = memo(({ item, delay }: { item: typeof contactInfo[0]; delay: number }) => (
  <motion.a
    href={item.href}
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    transition={{ delay }}
    className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all group"
  >
    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
      <item.icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold text-sm mb-0.5">{item.label}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.value}</p>
    </div>
  </motion.a>
));
ContactCard.displayName = "ContactCard";

/** Success state shown after submission */
const SuccessState = memo(({ onReset }: { onReset: () => void }) => (
  <motion.div
    key="success"
    variants={scaleIn}
    initial="hidden"
    animate="show"
    exit="hidden"
    className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-2xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800"
  >
    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-6">
      <CheckCircle className="h-10 w-10 text-green-600" />
    </div>
    <h3 className="text-2xl font-bold mb-3 text-green-700 dark:text-green-400">
      WhatsApp Opened!
    </h3>
    <p className="text-muted-foreground mb-2">Your details have been pre-filled in WhatsApp.</p>
    <p className="text-sm text-muted-foreground mb-8">
      Just press <strong>Send</strong> to complete your enquiry.
    </p>
    <Button variant="outline" onClick={onReset}>
      Submit Another Enquiry
    </Button>
  </motion.div>
));
SuccessState.displayName = "SuccessState";

// ─── Validation (pure function, defined once) ─────────────────────────────────
function validate(formData: typeof INITIAL_FORM): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!formData.name.trim()) errs.name = "Name is required";
  if (!formData.phone.trim()) errs.phone = "Phone is required";
  else if (!/^[+\d\s()-]{7,15}$/.test(formData.phone)) errs.phone = "Enter a valid phone number";
  if (!formData.email.trim()) errs.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Enter a valid email";
  return errs;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Stable handler — won't cause child re-renders
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
    },
    []
  );

  const saveToMongoDB = useCallback(async () => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          interest: formData.interest || "Not specified",
          message: formData.message || "No additional message",
        }),
      });
      const data = await res.json();
      if (!data.success) console.warn("⚠️ MongoDB save warning:", data.error);
    } catch (err) {
      console.error("❌ MongoDB save failed:", err); // Fail silently — WA still opens
    }
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsSubmitting(true);
      await saveToMongoDB();

      const { name, phone, email, interest, message } = formData;
      const text = `🛩️ *New Enquiry - Flying Star Aviator*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
🎯 *Interested In:* ${interest}
💬 *Message:* ${message || "No additional message"}

_Sent via flyingstaraviator.com contact form_`;

      const waURL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        window.open(waURL, "_blank");
        toast({
          title: "✈️ Redirecting to WhatsApp!",
          description: "Your details are pre-filled. Just press Send in WhatsApp.",
        });
      }, 1200);
    },
    [formData, saveToMongoDB, toast]
  );

  const handleReset = useCallback(() => {
    setSubmitted(false);
    setFormData(INITIAL_FORM);
    setErrors({});
  }, []);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative py-24 aviation-gradient text-primary-foreground overflow-hidden">
        {/* Static decorative blobs — no JS animation */}
        <div className="absolute -top-16 -right-16 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
              ✈️ Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Let's Start Your <br />
              Aviation Journey
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-xl">
              Have questions? Our expert counselors are ready to guide you
              towards your pilot career — one step at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── Left: Form column ── */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={transitionMd}
            >
              <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form — your details will be sent directly to our
                WhatsApp for a faster response.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessState key="success" onReset={handleReset} />
                ) : (
                  <motion.form
                    key="form"
                    variants={fadeOnly}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="name"
                          placeholder="Rahul Sharma"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? "border-red-400 focus-visible:ring-red-300" : ""}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className={errors.phone ? "border-red-400 focus-visible:ring-red-300" : ""}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="rahul@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-400 focus-visible:ring-red-300" : ""}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Interested In */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Interested In</label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {interestOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Message{" "}
                        <span className="text-muted-foreground font-normal">(optional)</span>
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your aviation goals, experience, or any questions..."
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    {/* WhatsApp note */}
                    <div className="flex items-start gap-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
                      <MessageCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Your details will open in <strong>WhatsApp</strong> pre-filled — just press{" "}
                        <strong>Send</strong> to reach us instantly.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="aviation"
                      size="lg"
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                          Preparing WhatsApp...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send via WhatsApp
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Right: Info column ── */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={transitionMd}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, i) => (
                  <ContactCard key={item.label} item={item} delay={i * 0.1} />
                ))}
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-72 bg-muted shadow-sm">
                <a
                  href="https://www.google.com/maps/place/Flying+Star+Aviator+Private+Limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  aria-label="Open location in Google Maps"
                >
                  <img
                    src="/map-preview.webp"
                    alt="Flying Star Aviator Location - C705, Sector 7, Block C, Palam Extension, Dwarka, Delhi, 110077"
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-200"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>

              {/* Quick Connect CTA */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 relative overflow-hidden">
                {/* Static decorative circle */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <h3 className="font-bold text-lg mb-2">Need Immediate Assistance?</h3>
                <p className="text-primary-foreground/75 text-sm mb-5">
                  Our counselors are available right now to answer your queries.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline-white" asChild className="flex-1">
                    <a href="tel:+919953536199">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="gold" asChild className="flex-1">
                    <a
                      href={`https://wa.me/${WA_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp Us
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
}