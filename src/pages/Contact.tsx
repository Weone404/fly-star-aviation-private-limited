import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 99535 36199", href: "tel:+919953536199" },
  { icon: Mail, label: "Email", value: "info@flyingstaraviator.com", href: "mailto:info@flyingstaraviator.com" },
  { icon: MapPin, label: "Address", value: "C-404, 3rd Floor, Near Ramphal Chowk Sector-7, Dwarka, New Delhi - 110075", href: "#" },
  { icon: Clock, label: "Working Hours", value: "Mon - Sat: 9:00 AM - 6:00 PM", href: "#" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 aviation-gradient text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Start Your Aviation Journey
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Have questions? Our team is ready to help you take the first step towards your pilot career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our counselors will contact you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <Input type="tel" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input type="email" placeholder="your@email.com" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interested In</label>
                  <select className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm">
                    <option>CPL - Commercial Pilot License</option>
                    <option>PPL - Private Pilot License</option>
                    <option>DGCA Exam Preparation</option>
                    <option>Type Rating</option>
                    <option>Other Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea placeholder="Tell us about your aviation goals..." rows={4} />
                </div>

                <Button
                  type="submit"
                  variant="aviation"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border h-80 bg-muted">
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">C-404, 3rd Floor, Near Ramphal Chowk Sector-7, Dwarka, New Delhi - 110075</p>
                  </div>
                </div>
              </div>

              {/* Quick Connect */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Need Immediate Assistance?</h3>
                <p className="text-primary-foreground/80 mb-4">
                  Our counselors are available to answer your queries immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline-white" asChild className="flex-1">
                    <a href="tel:+919953536199">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="gold" asChild className="flex-1">
                    <a href="https://wa.me/919953536199" target="_blank" rel="noopener noreferrer">
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
