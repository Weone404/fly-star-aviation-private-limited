import { memo } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Heart, Award, Users } from "lucide-react";

// ─── Static data outside component (no re-creation on render) ───────────────
const values = [
  { icon: Target, title: "Excellence", description: "We strive for the highest standards in aviation training and services." },
  { icon: Heart, title: "Passion", description: "Aviation is not just our profession, it's our passion and life's calling." },
  { icon: Users, title: "Student First", description: "Every decision we make puts our students' success at the forefront." },
  { icon: Award, title: "Integrity", description: "We maintain honesty and transparency in all our dealings." },
];

const timeline = [
  { year: "2008", title: "Foundation", description: "Flying Star Aviator established with a vision to create world-class pilots." },
  { year: "2012", title: "DGCA Approval", description: "Received official DGCA approval as a recognized training organization." },
  { year: "2015", title: "1000+ Pilots", description: "Celebrated training milestone with 1000+ successful commercial pilots." },
  { year: "2018", title: "Pan-India Expansion", description: "Opened training centers across major Indian cities." },
  { year: "2021", title: "International Tie-ups", description: "Partnered with flying schools in USA and Europe for global opportunities." },
  { year: "2024", title: "5000+ Alumni", description: "Proud network of 5000+ pilots flying with major airlines worldwide." },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "5000+", label: "Trained Pilots" },
  { value: "50+", label: "Partner Airlines" },
  { value: "8", label: "Training Centers" },
];

// ─── Shared animation variants (defined once, never recreated) ───────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const fadeLeft = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } };
const scalePop = { hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1 } };

// Fire once, slightly before element is fully visible
const viewport = { once: true, margin: "-50px" } as const;

// ─── Memoized sub-components ─────────────────────────────────────────────────
const ValueCard = memo(({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    transition={{ delay }}
    className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-hover transition-shadow"
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
));
ValueCard.displayName = "ValueCard";

const TimelineItem = memo(({
  item,
  index,
}: {
  item: typeof timeline[0];
  index: number;
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    transition={{ delay: index * 0.1 }}
    className={`relative pl-12 md:pl-0 pb-12 last:pb-0 ${index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
      }`}
  >
    {/* Dot */}
    <div className="absolute left-2 md:left-1/2 top-1 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-2" />

    <div className="bg-card rounded-xl p-6 shadow-card">
      <span className="inline-block text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full mb-2">
        {item.year}
      </span>
      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
      <p className="text-muted-foreground text-sm">{item.description}</p>
    </div>
  </motion.div>
));
TimelineItem.displayName = "TimelineItem";

const StatItem = memo(({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    variants={scalePop}
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    transition={{ delay }}
    className="text-center"
  >
    <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{value}</div>
    <div className="text-primary-foreground/80">{label}</div>
  </motion.div>
));
StatItem.displayName = "StatItem";

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="relative py-24 aviation-gradient text-primary-foreground overflow-hidden">
        {/* Static decorative blob — no JS animation needed */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent rounded-full blur-3xl opacity-10 pointer-events-none" />

        <div className="container relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Shaping the Future of Indian Aviation
            </h1>
            <p className="text-xl text-primary-foreground/80">
              For over 15 years, Flying Star Aviator has been at the forefront of aviation
              training, creating skilled pilots who now fly with the world's leading airlines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="bg-secondary rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide world-class aviation training that transforms passionate individuals
                into skilled, confident, and professionally equipped pilots ready to excel in
                the global aviation industry.
              </p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="bg-primary text-primary-foreground rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-primary-foreground/80 leading-relaxed">
                To be India's most trusted and innovative aviation training academy, recognized
                globally for our excellence in pilot development and contribution to aviation safety.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Flying Star Aviator.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ValueCard key={v.title} {...v} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to becoming India's premier aviation academy.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 aviation-gradient text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}