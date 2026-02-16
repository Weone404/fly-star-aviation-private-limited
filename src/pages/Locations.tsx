import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { MapPin, Phone, ArrowRight, ChevronRight } from "lucide-react";

const locationData: Record<string, { name: string; description: string; highlights: string[]; centers: number }> = {
  india: {
    name: "Pilot Training in India",
    description: "India offers excellent opportunities for pilot training with DGCA-  flying schools, modern aircraft, and favorable weather conditions throughout the year.",
    highlights: ["DGCA   Schools", "Year-round Flying Weather", "Cost-effective Training", "Strong Aviation Industry"],
    centers: 16,
  },
  hyderabad: {
    name: "Pilot Training in Hyderabad",
    description: "Hyderabad is emerging as a major aviation hub in South India with excellent infrastructure and growing airline operations.",
    highlights: ["Rajiv Gandhi International Airport", "Multiple FTOs", "Good Weather", "IT Hub Connectivity"],
    centers: 2,
  },
  mumbai: {
    name: "Pilot Training in Mumbai",
    description: "Mumbai, India's financial capital, offers access to major airline headquarters and excellent networking opportunities for aspiring pilots.",
    highlights: ["Major Airline HQs", "International Hub", "Networking Hub", "Career Opportunities"],
    centers: 2,
  },
  delhi: {
    name: "Pilot Training in Delhi",
    description: "Delhi NCR region provides access to India's busiest airport and serves as the headquarters for many leading airlines.",
    highlights: ["Busiest Airport", "DGCA Headquarters", "Central Location", "Multiple Airlines"],
    centers: 3,
  },
  bangalore: {
    name: "Pilot Training in Bangalore",
    description: "Bangalore offers a thriving aviation ecosystem with multiple training schools and pleasant weather conditions.",
    highlights: ["HAL Heritage", "Pleasant Climate", "Tech Hub", "Growing Sector"],
    centers: 4,
  },
  usa: {
    name: "Flying Schools in USA",
    description: "Training in the USA offers exposure to advanced aviation systems, FAA certification, and international experience valued by global airlines.",
    highlights: ["FAA Certification", "Advanced Aircraft", "International Exposure", "Global Recognition"],
    centers: 8,
  },
};

const allLocations = [
  { id: "india", name: "Pan-India Overview" },
  { id: "delhi", name: "Delhi" },
  { id: "mumbai", name: "Mumbai" },
  { id: "bangalore", name: "Bangalore" },
  { id: "hyderabad", name: "Hyderabad" },
  { id: "usa", name: "USA" },
];

export default function LocationsPage() {
  const { location } = useParams();
  const currentLocation = location ? locationData[location] : null;

  if (currentLocation) {
    return (
      <Layout>
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to="/locations" className="text-muted-foreground hover:text-primary">Locations</Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{currentLocation.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-24 aviation-gradient text-primary-foreground">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-accent font-semibold">{currentLocation.centers} Training Centers</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {currentLocation.name}
              </h1>
              <p className="text-xl text-primary-foreground/80">
                {currentLocation.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentLocation.highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-card border border-border text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-4">
                Start Training in {location === "usa" ? "USA" : currentLocation.name.replace("Pilot Training in ", "")}
              </h2>
              <p className="text-muted-foreground mb-8">
                Get in touch with our local counselors to learn about training options and enrollment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="aviation" size="lg" asChild>
                  <Link to="/contact">Enquire Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:+919876543210">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Local Office
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  // Locations Index Page
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
              Training Locations
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn to Fly Anywhere
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Explore our training locations across India and internationally to find the perfect place for your pilot training.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allLocations.map((loc, index) => {
              const data = locationData[loc.id];
              return (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/locations/${loc.id}`} className="block group">
                    <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-aviation-green-light mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="h-20 w-20 text-white/30" />
                      </div>
                      <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-bold text-xl">Explore →</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{data.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{data.centers} Training Centers</p>
                    <p className="text-muted-foreground text-sm line-clamp-2">{data.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not Sure Which Location?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our counselors can help you choose the best training location based on your preferences and requirements.
            </p>
            <Button variant="aviation" size="lg" asChild>
              <Link to="/contact">
                Get Personalized Guidance
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
