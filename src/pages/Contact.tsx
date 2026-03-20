import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 99535 36199, 9953566619",
    href: "tel:+919953536199",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@flyingstaraviator.com",
    href: "mailto:info@flyingstaraviator.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "C705, Sector 7, Block C Palam Extension, Dwarka, Delhi, 110077",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon - Sat: 9:00 AM - 6:00 PM",
    href: "#",
  },
];

const interestOptions = [
  "CPL - Commercial Pilot License",
  "PPL - Private Pilot License",
  "DGCA Exam Preparation",
  "Type Rating",
  "Other Services",
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: interestOptions[0],
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[+\d\s()-]{7,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    return newErrors;
  };

  // ── Save to MongoDB via Vercel API route ──
  const saveToMongoDB = async () => {
    const { name, phone, email, interest, message } = formData;
    try {
      const res = await fetch("/api/contact", {  // ✅ relative URL — works on Vercel
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          interest: interest || "Not specified",
          message: message || "No additional message",
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("✅ Saved to MongoDB:", data.message);
      } else {
        console.warn("⚠️ MongoDB save warning:", data.error);
      }
    } catch (err) {
      // Fail silently — WhatsApp will still open
      console.error("❌ MongoDB save failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const { name, phone, email, interest, message } = formData;

    // ── 1. Save to MongoDB via Vercel API ──
    await saveToMongoDB();

    // ── 2. Build WhatsApp message ──
    const text = `🛩️ *New Enquiry - Flying Star Aviator*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
🎯 *Interested In:* ${interest}
💬 *Message:* ${message || "No additional message"}

_Sent via flyingstaraviator.com contact form_`;

    const phoneNumber = "919953536199";
    const waURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(waURL, "_blank");
      toast({
        title: "✈️ Redirecting to WhatsApp!",
        description:
          "Your details are pre-filled. Just press Send in WhatsApp.",
      });
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      interest: interestOptions[0],
      message: "",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 aviation-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* ── Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form — your details will be sent directly to our
                WhatsApp for a faster response.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success State ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-2xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-green-700 dark:text-green-400">
                      WhatsApp Opened!
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      Your details have been pre-filled in WhatsApp.
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                      Just press <strong>Send</strong> to complete your enquiry.
                    </p>
                    <Button variant="outline" onClick={handleReset}>
                      Submit Another Enquiry
                    </Button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
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
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                        )}
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
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Interested In */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Interested In
                      </label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {interestOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Message{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
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
                        Your details will open in{" "}
                        <strong>WhatsApp</strong> pre-filled — just press{" "}
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

            {/* ── Right Column ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-0.5">
                        {item.label}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-72 bg-muted shadow-sm relative">
                <a
                  href="https://www.google.com/maps/place/Flying+Star+Aviator+Private+Limited+%7C+Best+Cadet+Pilot+Training+Institute+in+India+-+DGCA+CPL+Flight+Training+in+Delhi/@28.585233,77.0658253,728m/data=!3m2!1e3!4b1!4m6!3m5!1s0x390d1bfa2be4aefb:0x48a070e238521650!8m2!3d28.5852283!4d77.0684002!16s%2Fg%2F11h3mlfkx4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  aria-label="Open location in Google Maps"
                >
                  <img
                    src="/map-preview.webp"
                    alt="Flying Star Aviator Location - C705, Sector 7, Block C, Palam Extension, Dwarka, Delhi, 110077"
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-200"
                  />
                </a>
              </div>

              {/* Quick Connect CTA */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <h3 className="font-bold text-lg mb-2">
                  Need Immediate Assistance?
                </h3>
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
                      href="https://wa.me/919953536199"
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