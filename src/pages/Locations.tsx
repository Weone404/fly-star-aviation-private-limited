import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CitableAnswer } from "@/components/CitableAnswer";
import { Link, useParams } from "react-router-dom";
import { MapPin, Phone, ArrowRight, ChevronRight, Building2, Handshake } from "lucide-react";

const PHONE = "+919953536199";
const PHONE_DISPLAY = "+91 99535 36199";
const LAST_UPDATED = "2026-09-04";

/**
 * Location model, stated honestly.
 *
 * Flying Star Aviator operates ONE centre: Dwarka, New Delhi. Everywhere else
 * is a partner or affiliate relationship for the flying phase. Earlier versions
 * of this page published a `centers` count per city (3 Delhi, 2 Mumbai, 4
 * Bangalore, 8 USA) that the business does not support — those numbers are gone
 * and must not come back. A city page here describes what a candidate in that
 * city actually needs to do, and says plainly where we do and do not have a
 * centre. See CHANGELOG.md, 2026-09-04.
 */
type Presence = "own-centre" | "partner";

interface LocationEntry {
  name: string;
  h1: string;
  presence: Presence;
  /** Self-contained 40–60 word answer, front-loaded for AI extraction. */
  answer: string;
  /** Verifiable context about aviation in that city. No claims about us. */
  context: string[];
  /** What Flying Star actually does for a candidate based there. */
  whatWeDo: string;
  image: string;
}

const locationData: Record<string, LocationEntry> = {
  india: {
    name: "Pilot Training in India",
    h1: "Pilot Training in India",
    presence: "own-centre",
    answer:
      "A DGCA pilot licence earned in India has two separate phases. Ground training and the DGCA theory examinations come first, and Flying Star Aviator teaches these from its centre in Dwarka, New Delhi. The flying hours are then logged at a DGCA-approved Flying Training Organisation, which is a separate institution from a ground school.",
    context: [
      "The Directorate General of Civil Aviation is headquartered in New Delhi and issues every pilot licence in India.",
      "DGCA theory papers are administered by the Central Examination Organization, R.K. Puram, New Delhi.",
      "A Commercial Pilot Licence requires a minimum of 200 hours of flight time and a Class 1 medical.",
      "Ground school attendance is not a DGCA eligibility condition for sitting the theory papers.",
    ],
    whatWeDo:
      "We run DGCA CPL and ATPL ground classes from Dwarka, New Delhi, for candidates preparing for Air Navigation, Meteorology, Air Regulations and Technical General. We do not operate a flying school; the flying phase happens at a DGCA-approved FTO.",
    image: "/flying_logo-optimized.webp",
  },
  delhi: {
    name: "Delhi",
    h1: "Pilot Training in Delhi",
    presence: "own-centre",
    answer:
      "Flying Star Aviator's own training centre is in Dwarka, New Delhi — C705, Sector 7, Block C, Palam Extension, 110077. This is where DGCA CPL and ATPL ground classes are taught. Delhi is also where the DGCA is headquartered and where the Central Examination Organization administers the theory papers.",
    context: [
      "The DGCA is headquartered in New Delhi.",
      "The Central Examination Organization, which allots computer numbers and conducts Flight Crew examinations, is at East Block-III, Level-III, R.K. Puram, New Delhi 110066.",
      "Indira Gandhi International Airport is India's busiest airport by passenger traffic and the base for several major carriers.",
    ],
    whatWeDo:
      "This is our own centre, not a partner arrangement. Classroom DGCA ground training, exam sequencing and RTR(A) preparation all run from here. Visit or call before enrolling — we would rather you saw the classroom first.",
    image: "/Delhi.webp",
  },
  mumbai: {
    name: "Mumbai",
    h1: "Pilot Training for Candidates in Mumbai",
    presence: "partner",
    answer:
      "Flying Star Aviator does not operate a centre in Mumbai. Our ground training runs from Dwarka, New Delhi, and we work with partner flying schools for the flying phase. For a Mumbai-based candidate this matters less than it sounds: DGCA theory eligibility does not depend on where you attend ground classes.",
    context: [
      "Chhatrapati Shivaji Maharaj International Airport is Mumbai's main airport and a base for several Indian carriers.",
      "Airline head offices in Mumbai make it a strong city for aviation networking, though airline recruitment is separate from DGCA licensing.",
      "DGCA licensing rules are national — the same eligibility, the same papers and the same 200-hour CPL minimum apply wherever you are based.",
    ],
    whatWeDo:
      "We provide the ground-training and exam-preparation half of the licence from Delhi, and connect candidates to partner flying schools for the flying phase. If you are in Mumbai and only want to know which order to do things in, ask us — that conversation costs nothing.",
    image: "/Mumbai.webp",
  },
  bangalore: {
    name: "Bangalore",
    h1: "Pilot Training for Candidates in Bangalore",
    presence: "partner",
    answer:
      "Flying Star Aviator does not operate a centre in Bangalore. Ground training runs from our Dwarka, New Delhi centre, and the flying phase is handled through partner flying schools. DGCA eligibility and examination rules are national, so a Bangalore-based candidate follows the same route as one in Delhi.",
    context: [
      "Kempegowda International Airport serves Bangalore and is one of India's busiest airports.",
      "Bangalore has a long-standing aerospace and aviation engineering presence, which is distinct from pilot training.",
      "The DGCA theory papers, the 70% pass mark and the five-year validity of a cleared paper apply nationally.",
    ],
    whatWeDo:
      "Ground classes and DGCA exam preparation from Delhi; partner flying schools for the hours. We will tell you honestly if a local option suits you better — that is covered in our guide on choosing a flying school.",
    image: "/Bangalore.webp",
  },
  hyderabad: {
    name: "Hyderabad",
    h1: "Pilot Training for Candidates in Hyderabad",
    presence: "partner",
    answer:
      "Flying Star Aviator does not operate a centre in Hyderabad. Our DGCA ground classes run from Dwarka, New Delhi, and we work through partner flying schools for flying hours. Because DGCA licensing is national, a Hyderabad candidate's eligibility, papers and flight-hour minimums are identical to anyone else's.",
    context: [
      "Rajiv Gandhi International Airport serves Hyderabad and is a growing hub in south India.",
      "DGCA computer number registration, the theory papers and the Class 1 medical are handled the same way regardless of home city.",
      "A cleared CPL or ATPL theory paper remains valid for five years, nationally.",
    ],
    whatWeDo:
      "Ground training and exam sequencing from Delhi, partner flying schools for the flying phase. If you are weighing a local FTO against training elsewhere, we can walk you through what to verify before you pay anything.",
    image: "/hyderabad.webp",
  },
  usa: {
    name: "USA",
    h1: "Flight Training in the USA for Indian Candidates",
    presence: "partner",
    answer:
      "Flying Star Aviator does not own flight schools in the USA; we work with partner schools. Indian candidates who build hours on an FAA licence must convert to a DGCA licence to fly commercially in India, which means clearing DGCA theory papers and meeting DGCA's conversion requirements — the flying hours alone are not enough.",
    context: [
      "An FAA licence is not valid for commercial flying in India without conversion to a DGCA licence.",
      "DGCA theory papers must be cleared regardless of the country the flying hours were logged in.",
      "A Class 1 medical from a DGCA-approved examiner is required for an Indian CPL.",
    ],
    whatWeDo:
      "Our role is the DGCA half: ground classes and theory-paper preparation, which many candidates complete before or alongside flying abroad. Partner schools handle the flying. Clear the papers early — they stay valid for five years.",
    image: "/usa.webp",
  },
};

const allLocations = [
  { id: "india", name: "India — the full route" },
  { id: "delhi", name: "Delhi" },
  { id: "mumbai", name: "Mumbai" },
  { id: "bangalore", name: "Bangalore" },
  { id: "hyderabad", name: "Hyderabad" },
  { id: "usa", name: "USA" },
];

function PresenceBadge({ presence }: { presence: Presence }) {
  const own = presence === "own-centre";
  const Icon = own ? Building2 : Handshake;
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold bg-white/15 px-3 py-1.5 rounded-full">
      <Icon className="h-4 w-4 text-accent" />
      {own ? "Our own centre" : "Partner schools — no centre here"}
    </span>
  );
}

export default function LocationsPage() {
  const { location } = useParams();
  const currentLocation = location ? locationData[location] : null;

  if (currentLocation) {
    return (
      <Layout>
        <div className="bg-muted/30 py-4">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to="/locations" className="text-muted-foreground hover:text-primary">Locations</Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{currentLocation.name}</span>
            </nav>
          </div>
        </div>

        <section className="relative py-20 md:py-24 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={currentLocation.image}
              alt={`${currentLocation.h1} — Flying Star Aviator`}
              className="w-full h-full object-cover"
              width={1600}
              height={900}
            />
            <div className="absolute inset-0 bg-primary/75" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="mb-4">
                <PresenceBadge presence={currentLocation.presence} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
                {currentLocation.h1}
              </h1>
            </motion.div>
          </div>
        </section>

        <CitableAnswer
          heading={`Does Flying Star Aviator train pilots in ${currentLocation.name}?`}
          answer={currentLocation.answer}
          lastUpdated={LAST_UPDATED}
        />

        <section className="py-14 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What we do for candidates here
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {currentLocation.whatWeDo}
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4">
              Worth knowing
            </h2>
            <ul className="space-y-3 list-disc pl-5">
              {currentLocation.context.map((item) => (
                <li key={item} className="text-muted-foreground leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 p-5 rounded-xl border border-border bg-muted/30">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Our address
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Flying Star Aviator Private Limited, C705, Sector 7, Block C,
                Palam Extension, Dwarka, New Delhi 110077. This is our only
                centre.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4">
              Related reading
            </h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <Link to="/blog/how-to-choose-a-flying-school-in-india" className="underline hover:text-primary">
                  How to choose a flying school in India
                </Link>
              </li>
              <li>
                <Link to="/dgca/computer-number" className="underline hover:text-primary">
                  Getting your DGCA computer number
                </Link>
              </li>
              <li>
                <Link to="/dgca/ground-classes" className="underline hover:text-primary">
                  DGCA CPL and ATPL ground classes
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-14 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ask before you enrol anywhere
              </h2>
              <p className="text-muted-foreground mb-8">
                Tell us where you are and what you have completed so far, and we
                will tell you what the next step actually is — including when it
                is not us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="aviation" size="lg" asChild>
                  <Link to="/contact">Contact us</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`tel:${PHONE}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative py-20 md:py-24 aviation-gradient text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Where Flying Star Aviator Trains, and Where It Does Not
            </h1>
            <p className="text-lg text-primary-foreground/80">
              One centre, in Dwarka, New Delhi. Everywhere else is a partner
              relationship for the flying phase — and this page says which is
              which.
            </p>
          </motion.div>
        </div>
      </section>

      <CitableAnswer
        heading="Where does Flying Star Aviator operate?"
        answer="Flying Star Aviator Private Limited operates a single training centre, at C705, Sector 7, Block C, Palam Extension, Dwarka, New Delhi 110077, where it has taught DGCA CPL and ATPL ground classes since 2008. It does not own flying schools. For the flying phase of a licence, it works with partner flying training organisations in India and abroad."
        lastUpdated={LAST_UPDATED}
      />

      <section className="py-16 bg-background">
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
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/locations/${loc.id}`} className="block group">
                    <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={data.image}
                        alt={data.h1}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={800}
                        height={600}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                        {data.presence === "own-centre" ? (
                          <>
                            <Building2 className="h-3 w-3" />
                            <span>Our centre</span>
                          </>
                        ) : (
                          <>
                            <Handshake className="h-3 w-3" />
                            <span>Partner schools</span>
                          </>
                        )}
                      </div>
                    </div>

                    <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {data.h1}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {data.answer}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-5">
              Not sure which route fits you?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Ground training first or flying first, India or abroad — the right
              order depends on your papers, your medical and your budget. Tell us
              where you are and we will map it out.
            </p>
            <Button variant="aviation" size="lg" asChild>
              <Link to="/contact">
                Talk to us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
