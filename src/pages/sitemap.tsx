import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── Scroll Reveal (replaces Next.js ScrollReveal component) ───
const useScrollReveal = () => {
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        (entry.target as HTMLElement).style.opacity = "1";
                        (entry.target as HTMLElement).style.transform = "translateY(0)";
                    }
                });
            },
            { threshold: 0.1 }
        );

        refs.current.forEach((ref) => {
            if (ref) {
                ref.style.opacity = "0";
                ref.style.transform = "translateY(24px)";
                ref.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                observer.observe(ref);
            }
        });

        return () => observer.disconnect();
    }, []);

    return refs;
};

// ─── Sitemap Data ───
const sitemapData = [
    {
        category: "Main Pages",
        icon: "🏠",
        color: "bg-blue-50 border-blue-200",
        headerColor: "bg-blue-700",
        links: [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
        ],
    },
    {
        category: "Commercial Pilot License (CPL)",
        icon: "✈️",
        color: "bg-orange-50 border-orange-200",
        headerColor: "bg-orange-600",
        links: [
            { label: "Commercial Pilot License", href: "/courses/cpl" },
            { label: "Airline Preparation Course", href: "/courses/airline-preparation" },
            { label: "ATPL", href: "/courses/atpl" },
        ],
    },
    {
        category: "DGCA Courses & Exam",
        icon: "📝",
        color: "bg-green-50 border-green-200",
        headerColor: "bg-green-700",
        links: [
            { label: "DGCA Ground Classes in India", href: "/dgca/ground-classes" },
            { label: "DGCA Full Form", href: "/dgca/full-form" },
            { label: "DGCA Class 1 & 2 Medical", href: "/dgca/medical" },
            { label: "DGCA Training Institute", href: "/dgca" },
            { label: "RTR", href: "/rtr" },
        ],
    },
    {
        category: "Pilot License Types",
        icon: "🏆",
        color: "bg-yellow-50 border-yellow-200",
        headerColor: "bg-yellow-600",
        links: [
            { label: "Commercial Pilot License (CPL)", href: "/courses/cpl" },
            { label: "ATPL (Advanced)", href: "/courses/atpl" },
            { label: "Airline Preparation", href: "/courses/airline-preparation" },
            { label: "Cabin Crew", href: "/courses/cabin-crew" },
            { label: "Ground Staff", href: "/courses/ground-staff" },
        ],
    },
    {
        category: "Flying Schools",
        icon: "🛩️",
        color: "bg-sky-50 border-sky-200",
        headerColor: "bg-sky-700",
        links: [
            { label: "Flying Training Overview", href: "/pilot-training" },
            { label: "Flying School in India", href: "/pilot-training/india" },
            { label: "Flying School in USA", href: "/pilot-training/usa" },
            { label: "Flying School in Australia", href: "/pilot-training/australia" },
            { label: "Flying School in New Zealand", href: "/pilot-training/new-zealand" },
            { label: "Flying School in South Africa", href: "/pilot-training/south-africa" },
        ],
    },
    {
        category: "How to Become a Pilot",
        icon: "🚀",
        color: "bg-indigo-50 border-indigo-200",
        headerColor: "bg-indigo-700",
        links: [
            { label: "Become a Pilot", href: "/become-a-pilot/become-pilot" },
            { label: "Commercial Pilot Licence", href: "/become-a-pilot/commercial-pilot-licence" },
            { label: "Airline Transport Pilot Licence", href: "/become-a-pilot/airline-transport-pilot-licence" },
        ],
    },
    {
        category: "Services",
        icon: "🛠️",
        color: "bg-red-50 border-red-200",
        headerColor: "bg-red-700",
        links: [
            { label: "All Services", href: "/services" },
            { label: "Charter Services", href: "/services/charter-services" },
            { label: "Aircraft Management", href: "/services/aircraft-management" },
            { label: "Aircraft Sourcing & Sale", href: "/services/aircraft-sourcing-sale" },
            { label: "Aviation Consultancy", href: "/services/aviation-consultancy" },
            { label: "MRO", href: "/services/mro" },
            { label: "Livery Painting", href: "/services/livery-painting" },
            { label: "CAMO", href: "/services/camo" },
            { label: "Components & Spares", href: "/services/components-spares" },
        ],
    },
    {
        category: "Locations",
        icon: "📍",
        color: "bg-lime-50 border-lime-200",
        headerColor: "bg-lime-700",
        links: [
            { label: "All Locations", href: "/locations" },
        ],
    },
    {
        category: "Other Pages",
        icon: "📋",
        color: "bg-gray-50 border-gray-200",
        headerColor: "bg-gray-600",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
        ],
    },
];

// ─── Main Component ───
export default function Sitemap() {
    const refs = useScrollReveal();

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-950 py-14 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                        Site<span className="text-yellow-400">map</span>
                    </h1>
                    <p className="text-white/70 text-sm">
                        Browse all pages of Flying Star Aviator — India's Most Trusted Pilot Training Institute
                    </p>
                    {/* Breadcrumb */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
                        <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">Sitemap</span>
                    </div>
                </div>
            </div>

            {/* Quick Nav */}
            <div className="bg-white border-b border-gray-100 py-4 px-4 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {sitemapData.map((section) => (
                            <a
                                key={section.category}
                                href={`#${section.category.replace(/\s+/g, "-").toLowerCase()}`}
                                className="px-3 py-1.5 text-xs font-semibold text-blue-800 bg-gray-100 hover:bg-yellow-400 hover:text-blue-900 rounded-full transition-all whitespace-nowrap"
                            >
                                {section.icon} {section.category}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sitemap Grid */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sitemapData.map((section, i) => (
                            <div
                                key={section.category}
                                ref={(el) => (refs.current[i] = el)}
                                id={section.category.replace(/\s+/g, "-").toLowerCase()}
                                className={`rounded-2xl border ${section.color} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                            >
                                {/* Card Header */}
                                <div className={`${section.headerColor} px-5 py-4 flex items-center gap-2`}>
                                    <span className="text-xl">{section.icon}</span>
                                    <h2 className="font-bold text-white text-sm leading-tight">
                                        {section.category}
                                    </h2>
                                </div>

                                {/* Links List */}
                                <ul className="px-5 py-4 space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link.href} className="flex items-start gap-2">
                                            <span className="text-yellow-500 mt-0.5 text-xs flex-shrink-0">●</span>
                                            <Link
                                                to={link.href}
                                                className="text-blue-800 text-sm hover:text-yellow-600 hover:underline transition-colors leading-snug"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-12 px-4 bg-blue-800 text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Can't find what you're looking for?
                    </h3>
                    <p className="text-white/70 text-sm mb-6">
                        Our aviation counsellors are available to answer all your queries about pilot training, DGCA exams, and career guidance.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition-all text-sm"
                    >
                        Contact Us →
                    </Link>
                </div>
            </section>
        </div>
    );
}