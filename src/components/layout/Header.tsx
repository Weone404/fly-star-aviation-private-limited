import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "DGCA",
    href: "/dgca",
    children: [
      { name: "DGCA Computer Number", href: "/dgca/computer-number" },
      { name: "Medical Class 1 & 2", href: "/dgca/medical" },
      { name: "Ground Classes", href: "/dgca/ground-classes" },
      { name: "DGCA Full Form", href: "/dgca/full-form" },
    ],
  },
  {
    name: "Pilot Training",
    href: "/pilot-training",
    children: [
      { name: "CPL - Commercial Pilot License", href: "/pilot-training/cpl" },
      { name: "PPL - Private Pilot License", href: "/pilot-training/ppl" },
      { name: "Eligibility Criteria", href: "/pilot-training/eligibility" },
      { name: "Syllabus", href: "/pilot-training/syllabus" },
      { name: "Admission Process", href: "/pilot-training/admission" },
      { name: "Pilot Salary", href: "/pilot-training/salary" },
    ],
  },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Pilot Training", href: "/services/pilot-training" },
      { name: "Chartered Services", href: "/services/chartered" },
      { name: "Aircraft Sale & Purchase", href: "/services/aircraft-sale" },
      { name: "Aviation Placement", href: "/services/placement" },
      { name: "Aircraft Management", href: "/services/management" },
      { name: "Aircraft Spare Parts", href: "/services/spare-parts" },
    ],
  },
  {
    name: "Locations",
    href: "/locations",
    children: [
      { name: "Pilot Training in India", href: "/locations/india" },
      { name: "Hyderabad", href: "/locations/hyderabad" },
      { name: "Mumbai", href: "/locations/mumbai" },
      { name: "Delhi", href: "/locations/delhi" },
      { name: "Bangalore", href: "/locations/bangalore" },
      { name: "Flying Schools in USA", href: "/locations/usa" },
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container flex items-center justify-between text-sm">
          <a href="tel:+919953536199" className="flex items-center gap-2 hover:text-accent">
            <Phone className="h-4 w-4" />
            +91 9953536199
          </a>
          <div className="flex items-center gap-3">
            <Plane className="h-4 w-4 text-accent" />
            <span>DGCA Training Institute</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all ${isScrolled ? "bg-background/95 backdrop-blur shadow-card" : "bg-background"
          }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4">
              <div className="w-20 h-20 md:w-36 md:h-36 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/flying_logo.webp"
                  alt="Flying Star Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>


            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-5 py-3 text-xl font-semibold transition-colors
                      ${location.pathname === item.href ||
                        location.pathname.startsWith(item.href + "/")
                        ? "text-primary"
                        : "text-foreground"
                      }`}
                  >
                    {item.name}
                    {item.children && <ChevronDown className="h-5 w-5" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-72 bg-background rounded-xl shadow-hover border p-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-4 py-3 text-lg font-medium rounded-lg hover:bg-secondary hover:text-primary"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Button variant="aviation" size="lg">
                Get Free Counselling
              </Button>
            </div>

            {/* Mobile Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t bg-background"
            >
              <nav className="container py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className="block px-4 py-3 text-lg font-semibold rounded-lg hover:bg-secondary"
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-4 py-2 text-lg text-muted-foreground hover:text-primary"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button variant="aviation" size="lg" className="w-full mt-4">
                  Get Free Counselling
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
