import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Commercial Pilot, IndiGo Airlines",
    image: "https://i.pravatar.cc/150?img=11",
    quote: "Flying Star Aviator transformed my dream into reality. The training quality and placement support are exceptional. I'm now flying with IndiGo, thanks to their comprehensive CPL program.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "First Officer, Air India",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "The instructors here are world-class. They don't just teach you to fly; they prepare you for a successful aviation career. The DGCA exam preparation was incredibly thorough.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Pilot, Vistara",
    image: "https://i.pravatar.cc/150?img=12",
    quote: "I tried multiple training schools before joining Flying Star. The difference in quality is remarkable. Their simulators and practical training gave me confidence from day one.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "CPL Trainee",
    image: "https://i.pravatar.cc/150?img=9",
    quote: "Currently in my final phase of training, and I couldn't be happier with my choice. The support system here is amazing, and the fees structure is very reasonable for the quality offered.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 aviation-gradient text-primary-foreground overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold bg-white/20 px-4 py-2 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Our Pilots Say
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Hear from our graduates who are now flying with top airlines across the globe.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 -left-4 opacity-20">
            <Quote className="h-24 w-24" />
          </div>

          {/* Testimonial Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-accent"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-lg md:text-xl leading-relaxed mb-6 italic">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div>
                    <h4 className="font-bold text-xl">{testimonials[currentIndex].name}</h4>
                    <p className="text-accent">{testimonials[currentIndex].role}</p>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-1 mt-3">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-accent fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? "bg-accent w-8" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
