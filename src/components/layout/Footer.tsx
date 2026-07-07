import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { KEYWORD_LINKS } from "@/lib/seoKeywords";

const footerLinks = {
  quickLinks: [
    { name: "About Us", href: "/about" },
    { name: "Pilot Training", href: "/pilot-training" },
    { name: "DGCA Exams", href: "/dgca" },
    { name: "Contact Us", href: "/contact" },
    { name: "Home", href: "/" },
  ],
  services: [
    { name: "CPL Training", href: "/courses/cpl" },
    { name: "PPL Training", href: "/become-a-pilot/become-pilot" },
    { name: "Chartered Services", href: "/services/charter-services" },
    { name: "Aircraft Management", href: "/services/aircraft-management" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "Blog", href: "/blogs" },
  ],
};

const seoLinkMap: Record<string, string> = {
  "CBSE Full Form": "/dgca/full-form",
  "ICSE Full Form": "/dgca/full-form",
  "DGCA Full Form": "/dgca/full-form",
  "PPL Full Form": "/become-a-pilot/become-pilot",
  "CPL Full Form": "/courses/cpl",
  "RTR Full Form": "/rtr",
  "Atpl Full Form": "/air-transport-pilots-license-atpl",
  "Commercial Pilot License": "/courses/cpl",
  "Pilot course": "/pilot-course",
  "commercial pilot": "/courses/cpl",
  "commercial pilot license salary": "/courses/cpl",
  "Pilot training": "/pilot-training",
  "commercial pilot course": "/courses/cpl",
  "commercial pilot licence course": "/courses/cpl",
  "cpl course fees": "/courses/cpl",
  "commercial pilot training": "/courses/cpl",
  "commercial pilot eligibility": "/courses/cpl",
  "commercial pilot training in india": "/courses/cpl",
  "cpl licence cost": "/courses/cpl",
  "commercial pilot license course in india": "/courses/cpl",
  "commercial pilot fees": "/courses/cpl",
  "commercial pilot course eligibility": "/courses/cpl",
  "commercial pilot license syllabus": "/courses/cpl",
  "Commercial Pilot License Admission Process": "/courses/cpl",
  "how to become a pilot": "/how-to-become-a-pilot",
  "how to become a pilot in india": "/how-to-become-a-pilot-in-india-after-12th",
  "how to become a pilot after 12th": "/how-to-become-a-pilot-after-12th",
  "Private Pilot License": "/become-a-pilot/become-pilot",
  "pilot course fees": "/pilot-course",
  "pilot training fees": "/pilot-training",
  "qualifications to become a pilot": "/how-to-become-a-pilot",
  "best pilot schools": "/pilot-training",
  "eligibility for become a pilot": "/how-to-become-a-pilot",
  "pilot syllabus": "/pilot-training",
  "pilot training eligibility": "/pilot-training",
  "eligibility for pilot course": "/pilot-course",
  "ppl syllabus": "/become-a-pilot/become-pilot",
  "pilot course syllabus": "/pilot-course",
  "ppl pilot salary": "/become-a-pilot/become-pilot",
  "private pilot license syllabus": "/become-a-pilot/become-pilot",
  "Pilot training in India": "/pilot-training/india",
  "Pilot training in Hyderabad": "/locations/hyderabad",
  "Pilot training in Mumbai": "/locations/mumbai",
  "Pilot Training in Chennai": "/locations/chennai",
  "Pilot Training in Bangalore": "/locations/bangalore",
  "Pilot training in kerala": "/locations/kerala",
  "Pilot training in Delhi": "/locations/delhi",
  "Pilot Training in Pune": "/locations/pune",
  "Pilot training institute in Kolkata": "/locations/kolkata",
  "pilot training in coimbatore": "/locations/coimbatore",
  "Pilot training in Gujarat": "/locations/gujarat",
  "Pilot training in goa": "/locations/goa",
  "Pilot Training in Gurgaon": "/locations/gurgaon",
  "Pilot training in tamil nadu": "/locations/tamil-nadu",
  "Pilot Training in Rajasthan": "/locations/rajasthan",
  "Pilot Training in Haryana": "/locations/haryana",
  "Pilot Training in Punjab": "/locations/punjab",
  "Pilot Training in Andhra Pradesh": "/locations/andhra-pradesh",
  "Pilot Training in Arunachal Pradesh": "/locations/arunachal-pradesh",
  "Pilot training in Assam": "/locations/assam",
  "Pilot Training in Bihar": "/locations/bihar",
  "Pilot Training in Chhattisgarh": "/locations/chhattisgarh",
  "Pilot Training in Himachal Pradesh": "/locations/himachal-pradesh",
  "Pilot Training in Noida": "/locations/noida",
  "Pilot Training in Ghaziabad": "/locations/ghaziabad",
  "Pilot Training in Nagpur": "/locations/nagpur",
  "Pilot Training in Maharashtra": "/locations/maharashtra",
  "Pilot Training in Jaipur": "/locations/jaipur",
  "Airline Transport Pilot License": "/air-transport-pilots-license-atpl",
  "airline transport pilot license": "/air-transport-pilots-license-atpl",
  "atpl": "/courses/atpl",
  "atpl license": "/courses/atpl",
  "airline transport license": "/air-transport-pilots-license-atpl",
  "atp licence": "/air-transport-pilots-license-atpl",
  "airline transport pilot licence cost": "/courses/atpl",
  "atpl cost": "/courses/atpl",
  "atpl requirements": "/courses/atpl",
  "atpl training": "/courses/atpl",
  "atpl pilot salary": "/courses/atpl",
  "Student Pilot License": "/become-a-pilot/become-pilot",
  "spl": "/become-a-pilot/become-pilot",
  "student pilot license": "/become-a-pilot/become-pilot",
  "student pilot certificate": "/become-a-pilot/become-pilot",
  "student pilot license cost": "/become-a-pilot/become-pilot",
  "spl pilot training fees": "/become-a-pilot/become-pilot",
  "student pilot license requirements": "/become-a-pilot/become-pilot",
  "student pilot license eligibility": "/become-a-pilot/become-pilot",
  "student pilot license fees": "/become-a-pilot/become-pilot",
  "spl eligibility": "/become-a-pilot/become-pilot",
  "spl fees": "/become-a-pilot/become-pilot",
  "Pilot Training Course": "/pilot-training",
  "DGCA": "/dgca",
  "DGCA Ground Class": "/dgca/ground-classes",
  "ground class": "/dgca/ground-classes",
  "dgca pariksha": "/dgca",
  "pariksha dgca": "/dgca",
  "dgca exam": "/dgca",
  "dgca central examination organization": "/dgca",
  "pilot exam": "/dgca",
  "dgca pariksha portal": "/dgca",
  "dgca exam fees": "/dgca",
  "dgca exam for pilot": "/dgca",
  "dgca exam eligibility": "/dgca",
  "dgca pilot exam": "/dgca",
  "what is dgca exam": "/dgca",
  "dgca exam date": "/dgca",
  "dgca cpl exam": "/courses/cpl",
  "dgca exams for cpl": "/courses/cpl",
  "www pariksha dgca": "/dgca",
  "how to apply for dgca exam": "/dgca",
  "dgca exam age limit": "/dgca",
  "dgca exam schedule": "/dgca",
  "dgca pariksha com": "/dgca",
  "aviation exam in india": "/dgca",
  "dgca entrance exam": "/dgca",
  "e pariksha dgca": "/dgca",
  "egca login": "/dgca",
  "egca": "/dgca",
  "egca dgca": "/dgca",
  "dgca login": "/dgca",
  "edgca": "/dgca",
  "ecga": "/dgca",
  "egca full form": "/dgca/full-form",
  "egca registration": "/dgca",
  "DGCA Ground Class in dwarka": "/dgca/ground-classes",
  "DGCA Ground Class in delhi": "/dgca/ground-classes",
};

const keywordLinks = KEYWORD_LINKS;

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/flystar.co.in/" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/flyingstaraviator/" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/channel/UCMgPrEdb_0Ckk7ibz7UExUA" },
];

// ─── Footer Schema: Place + EducationalOrganization + Services + Courses ──────
const footerSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Place",
      "@id": "https://www.flystar.co.in/#place",
      "name": "Flying Star Aviator Private Limited | Best Cadet Pilot Training Institute in India - DGCA CPL Flight Training in Delhi",
      "image": "https://lh3.googleusercontent.com/p/AF1QipMrTJvtIBhxipJYxisjbwA5m8a9THTO8Cox3Yim=s1360-w1360-h1020-rw",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "C705, Sector 7, Block C, Palam Extension, Dwarka",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110077",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.5852283,
        "longitude": 77.0684002
      },
      "hasMap": "https://maps.google.com/?cid=5225956059607335504"
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://www.flystar.co.in/#localbusiness",
      "name": "Flying Star Aviator Private Limited | Best Cadet Pilot Training Institute in India - DGCA CPL Flight Training in Delhi",
      "url": "https://www.flystar.co.in/",
      "logo": "https://www.flystar.co.in/flying_logo.webp",
      "image": "https://lh3.googleusercontent.com/p/AF1QipMrTJvtIBhxipJYxisjbwA5m8a9THTO8Cox3Yim=s1360-w1360-h1020-rw",
      "telephone": "+919953536199",
      "priceRange": "$$$",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "foundingDate": "2008",
      "areaServed": { "@type": "Country", "name": "India" },
      "knowsAbout": [
        "Commercial Pilot License Training",
        "DGCA Exam Preparation",
        "Aviation Ground Classes",
        "Cadet Pilot Program",
        "ATPL Training",
        "Airline Interview Coaching",
        "RTR(A) Training",
        "Type Rating Guidance"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "C705, Sector 7, Block C, Palam Extension, Dwarka",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110077",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.5852283,
        "longitude": 77.0684002
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "18:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+919953536199",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        }
      ],
      "location": { "@id": "https://www.flystar.co.in/#place" },
      "parentOrganization": { "@id": "https://www.flystar.co.in/#organization" }
    },
    {
      "@type": "Service",
      "@id": "https://www.flystar.co.in/#service-cpl",
      "name": "Commercial Pilot License Training",
      "description": "Comprehensive DGCA CPL ground classes and flight training guidance for aspiring commercial pilots in India.",
      "provider": { "@id": "https://www.flystar.co.in/#localbusiness" },
      "areaServed": { "@type": "Country", "name": "India" },
      "serviceType": "Aviation Training"
    },
    {
      "@type": "Service",
      "@id": "https://www.flystar.co.in/#service-cadet",
      "name": "Cadet Pilot Program",
      "description": "Structured cadet pilot program guiding students from zero to airline-ready commercial pilots.",
      "provider": { "@id": "https://www.flystar.co.in/#localbusiness" },
      "areaServed": { "@type": "Country", "name": "India" },
      "serviceType": "Aviation Training"
    },
    {
      "@type": "Course",
      "@id": "https://www.flystar.co.in/#course-cpl",
      "name": "DGCA Commercial Pilot License Training",
      "description": "DGCA-approved CPL ground classes covering Air Navigation, Meteorology, Air Regulations and Technical General.",
      "provider": { "@id": "https://www.flystar.co.in/#organization" },
      "educationalLevel": "Professional",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": ["OnSite", "Online"],
        "inLanguage": ["en", "hi"]
      }
    },
    {
      "@type": "Course",
      "@id": "https://www.flystar.co.in/#course-atpl",
      "name": "ATPL Ground Training",
      "description": "Airline Transport Pilot License ground training program for pilots seeking airline career advancement.",
      "provider": { "@id": "https://www.flystar.co.in/#organization" },
      "educationalLevel": "Advanced Professional"
    }
  ]
};

export function Footer() {
  // Inject Footer Schema into <head>
  useEffect(() => {
    const existing = document.getElementById("flystar-footer-schema");
    if (!existing) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(footerSchema);
      script.id = "flystar-footer-schema";
      document.head.appendChild(script);
    }
    return () => {
      document.getElementById("flystar-footer-schema")?.remove();
    };
  }, []);

  return (
    <footer className="bg-aviation-runway text-white">
      {/* Runway Strip */}
      <div className="h-3 bg-runway-pattern opacity-40" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/flying_logo.webp"
                alt="Flying Star Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl">Flying Star private limited</span>
                <span className="text-sm text-white/60 -mt-1">Aviator</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              Your trusted partner in aviation training and services. Pilot
              institute dedicated to creating world-class pilots.
            </p>
            <div className="space-y-3">
              <a href="tel:+919953536199" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
                <Phone className="h-5 w-5 text-accent" />
                +91 99535 36199 , 9953566619
              </a>
              <a href="mailto:flyingstaraviator@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
                <Mail className="h-5 w-5 text-accent" />
                flyingstaraviator@gmail.com
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>C705, Sector 7, Block C,
                  <br />Palam Extension, Dwarka, Delhi, 110077</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/70 hover:text-white hover:pl-2 transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Our Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/70 hover:text-white hover:pl-2 transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Keyword Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-4 text-accent">Popular Pilot Keywords</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/70">
              {keywordLinks.slice(0, 18).map((link) => (
                <Link key={link.keyword} to={link.href} className="block hover:text-white transition-colors">
                  {link.keyword}
                </Link>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-4 text-accent">Our Location</h4>
            <div className="rounded-lg overflow-hidden w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14013.949592847395!2d77.0683977!3d28.5851516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1bfa2be4aefb%3A0x48a070e238521650!2sFlying%20Star%20Aviator%20Private%20Limited%20%7C%20Best%20Cadet%20Pilot%20Training%20Institute%20in%20India%20-%20DGCA%20CPL%20Flight%20Training%20in%20Delhi!5e0!3m2!1sen!2sin!4v1772702645906!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Flying Star Aviator Location"
              />
            </div>
          </div>

        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-white/50 text-sm text-center">
              © {new Date().getFullYear()} Flying Star Aviator. All rights reserved. |
              <Link to="/privacy" className="hover:text-white ml-1">Privacy Policy</Link> |
              <Link to="/terms" className="hover:text-white ml-1">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}