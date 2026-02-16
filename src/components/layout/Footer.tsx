import { Link } from "react-router-dom";
import { Plane, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { name: "About Us", href: "/about" },
    { name: "Pilot Training", href: "/pilot-training" },
    { name: "DGCA Exams", href: "/dgca" },
    { name: "Contact Us", href: "/contact" },
  ],
  services: [
    { name: "CPL Training", href: "/pilot-training/cpl" },
    { name: "PPL Training", href: "/pilot-training/ppl" },
    { name: "Chartered Services", href: "/services/chartered" },
    { name: "Aircraft Management", href: "/services/management" },
  ],
  locations: [
    { name: "Delhi", href: "/locations/delhi" },
    { name: "Mumbai", href: "/locations/mumbai" },
    { name: "Bangalore", href: "/locations/bangalore" },
    { name: "Hyderabad", href: "/locations/hyderabad" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-aviation-runway text-white">
      {/* Runway Strip */}
      <div className="h-3 bg-runway-pattern opacity-40" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 aviation-gradient rounded-full flex items-center justify-center">
                <Plane className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">Flying Star</span>
                <span className="text-sm text-white/60 -mt-1">Aviator</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              Your trusted partner in aviation training and services. DGCA
              institute dedicated to creating world-class pilots.
            </p>
            <div className="space-y-3">
              <a href="tel:+919953536199" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
                <Phone className="h-5 w-5 text-accent" />
                +91 99535 36199 , 9953566619
              </a>
              <a href="mailto:info@flyingstaraviator.com" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
                <Mail className="h-5 w-5 text-accent" />

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
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white hover:pl-2 transition-all"
                  >
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
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white hover:pl-2 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Locations</h4>
            <ul className="space-y-3">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white hover:pl-2 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
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
