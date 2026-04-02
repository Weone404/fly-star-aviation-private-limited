import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// ✅ QueryClient moved OUTSIDE component so it's never recreated on re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // cache queries for 1 minute
    },
  },
});

// ✅ Index is kept eager — it's the homepage and must load instantly
import Index from "./pages/Index";

// ✅ Everything else is lazy loaded — users only download what they visit

// Popups — lazy + delayed mount
const ContactPopup = lazy(() => import('../src/pages/Contactpopup'));
const SpecialOfferBanner = lazy(() => import("./pages/Specialofferbanner"));

// Core pages
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const Locations = lazy(() => import("./pages/Locations"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sitemap = lazy(() => import("./pages/sitemap"));

// DGCA
const DGCA = lazy(() => import("./pages/DGCA"));
const Rtr = lazy(() => import("./pages/rtr"));
const Fullform = lazy(() => import("./pages/dgca/full-form"));
const Medical = lazy(() => import("./pages/dgca/medical"));
const Groundclasses = lazy(() => import("./pages/dgca/ground-classes"));

// Pilot Training
const PilotTraining = lazy(() => import("./pages/pilotTraining/PilotTraining"));
const India = lazy(() => import("./pages/pilotTraining/india"));
const USA = lazy(() => import("./pages/pilotTraining/usa"));
const NewZealand = lazy(() => import("./pages/pilotTraining/new-zealand"));
const SouthAfrica = lazy(() => import("./pages/pilotTraining/south-africa"));
const Australia = lazy(() => import("./pages/pilotTraining/australia"));

// Courses
const Cpl = lazy(() => import("./pages/Courses/Cpl"));
const Atpl = lazy(() => import("./pages/Courses/Atpl"));
const AirlinePreparationPage = lazy(() => import("./pages/Courses/airline-preparation"));
const CabinCrewPage = lazy(() => import("./pages/Courses/cabin-crew"));
const GroundStaffPage = lazy(() => import("./pages/Courses/ground-staff"));
const Airindiapilotinterviewpage = lazy(() => import("./pages/Courses/Air-india-pilot-interview"));
const IndigoPilotInterviewPage = lazy(() => import("./pages/Courses/Indigo-pilot-interview"));

// Services
const Charterservices = lazy(() => import("./pages/services/charter-services"));
const Aircraftmanagement = lazy(() => import("./pages/services/aircraft-management"));
const Aircraftsourcing = lazy(() => import("./pages/services/aircraft-sourcing-sale"));
const Aviationconsultancy = lazy(() => import("./pages/services/aviation-consultancy"));
const Mro = lazy(() => import("./pages/services/mro"));
const Liverypainting = lazy(() => import("./pages/services/livery-painting"));
const Camo = lazy(() => import("./pages/services/camo"));
const Componentsspares = lazy(() => import("./pages/services/components-spares"));

// Become a Pilot
const Airlinetransportpilotlicence = lazy(() => import("./pages/BecomeAPilot/airline-transport-pilot-licence"));
const Commercialpilotlicence = lazy(() => import("./pages/BecomeAPilot/commercial-pilot-license"));
const Becomepilot = lazy(() => import("./pages/BecomeAPilot/become-pilot"));

// ✅ Minimal fallback — blank screen matching background, no layout shift
function PageLoader() {
  return <div style={{ minHeight: "100vh", background: "var(--background, #fff)" }} />;
}

const App = () => {
  // ✅ Delay mounting of popups/banners by 3s — doesn't affect LCP at all
  const [showExtras, setShowExtras] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowExtras(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* ✅ Suspense wraps all routes — lazy pages show PageLoader while loading */}
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact-us" element={<Contact />} />

                {/* SERVICES */}
                <Route path="/services" element={<Services />} />
                <Route path="/services/charter-services" element={<Charterservices />} />
                <Route path="/services/aircraft-management" element={<Aircraftmanagement />} />
                <Route path="/services/aircraft-sourcing-sale" element={<Aircraftsourcing />} />
                <Route path="/services/aviation-consultancy" element={<Aviationconsultancy />} />
                <Route path="/services/mro" element={<Mro />} />
                <Route path="/services/livery-painting" element={<Liverypainting />} />
                <Route path="/services/camo" element={<Camo />} />
                <Route path="/services/components-spares" element={<Componentsspares />} />

                {/* COURSES */}
                <Route path="/courses/cpl" element={<Cpl />} />
                <Route path="/courses/atpl" element={<Atpl />} />
                <Route path="/air-transport-pilots-license-atpl" element={<Atpl />} />
                <Route path="/best-atpl-classes-in-india" element={<Atpl />} />
                <Route path="/courses/cabin-crew" element={<CabinCrewPage />} />
                <Route path="/courses/ground-staff" element={<GroundStaffPage />} />
                <Route path="/commercial-pilot-training" element={<Cpl />} />
                <Route path="/best-cpl-ground-classes" element={<Cpl />} />
                <Route path="/commercial-pilot-training-in-dwarka" element={<Cpl />} />
                <Route path="/courses-and-careers" element={<Cpl />} />
                <Route path="/pilot-course" element={<AirlinePreparationPage />} />
                <Route path="/top-aviation-courses-and-careers-after-12th" element={<AirlinePreparationPage />} />
                <Route path="/careers" element={<AirlinePreparationPage />} />
                <Route path="/commercial-pilot-training-cpl" element={<Cpl />} />
                <Route path="/courses/Air-india-pilot-interview" element={<Airindiapilotinterviewpage />} />
                <Route path="/courses/Indigo-pilot-interview" element={<IndigoPilotInterviewPage />} />
                <Route path="/courses/airline-preparation" element={<AirlinePreparationPage />} />

                {/* DGCA */}
                <Route path="/dgca" element={<DGCA />} />
                <Route path="/dgca/:topic" element={<DGCA />} />
                <Route path="/rtr" element={<Rtr />} />
                <Route path="/dgca/full-form" element={<Fullform />} />
                <Route path="/dgca/medical" element={<Medical />} />
                <Route path="/dgca/ground-classes" element={<Groundclasses />} />
                <Route path="/dgca-ground-classes-training-classes" element={<Groundclasses />} />
                <Route path="/cpl-atpl-ground-classes-2" element={<Groundclasses />} />

                {/* PILOT TRAINING */}
                <Route path="/pilot-training" element={<PilotTraining />} />
                <Route path="/pilot-training/india" element={<India />} />
                <Route path="/pilot-training/usa" element={<USA />} />
                <Route path="/pilot-training/new-zealand" element={<NewZealand />} />
                <Route path="/pilot-training/south-africa" element={<SouthAfrica />} />
                <Route path="/pilot-training/australia" element={<Australia />} />
                <Route path="/training-in-australia" element={<Australia />} />
                <Route path="/training-in-south-africa" element={<SouthAfrica />} />
                <Route path="/pilot-training/:topic" element={<PilotTraining />} />

                {/* BECOME A PILOT */}
                <Route path="/become-a-pilot/airline-transport-pilot-licence" element={<Airlinetransportpilotlicence />} />
                <Route path="/become-a-pilot/commercial-pilot-licence" element={<Commercialpilotlicence />} />
                <Route path="/become-a-pilot/become-pilot" element={<Becomepilot />} />
                <Route path="/how-to-become-a-pilot" element={<Becomepilot />} />
                <Route path="/how-to-become-a-pilot-in-india-after-12th" element={<Becomepilot />} />
                <Route path="/guide-on-how-to-become-a-pilot" element={<Becomepilot />} />
                <Route path="/training-in-india/" element={<PilotTraining />} />
                <Route path="/how-to-become-a-pilot-in-india/" element={<Becomepilot />} />

                {/* LOCATIONS */}
                <Route path="/locations" element={<Locations />} />
                <Route path="/locations/:location" element={<Locations />} />

                {/* SITEMAP */}
                <Route path="/Sitemap" element={<Sitemap />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              {/* ✅ Popups delayed by 3s — won't impact LCP or TTI scores */}
              {showExtras && (
                <>
                  <SpecialOfferBanner />
                  <ContactPopup />
                </>
              )}
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;