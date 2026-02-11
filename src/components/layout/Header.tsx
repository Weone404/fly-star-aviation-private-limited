import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, Plane } from "lucide-react";
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              +91 9953536199
            </a>

          </div>
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-accent" />
            <span>DGCA Training Institute</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card"
          : "bg-background"
          }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-28 md:h-28 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/flying_logo.webp"
                  alt="Flying Star Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>







            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.href || location.pathname.startsWith(item.href + "/")
                      ? "text-primary"
                      : "text-foreground"
                      }`}
                  >
                    {item.name}
                    {item.children && <ChevronDown className="h-4 w-4" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-64 bg-background rounded-lg shadow-hover border border-border p-2 mt-1"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-4 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors"
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

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="aviation" size="lg">
                Get Free Counselling
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border overflow-hidden"
            >
              <nav className="container py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className="block px-4 py-3 font-medium hover:bg-secondary rounded-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Button variant="aviation" className="w-full" size="lg">
                    Get Free Counselling
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
