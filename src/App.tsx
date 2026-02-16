import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import DGCA from "./pages/DGCA";
import PilotTraining from "./pages/PilotTraining";
import Locations from "./pages/Locations";
import NotFound from "./pages/NotFound";
import Cpl from "./pages/Courses/Cpl"; // ✅ ADD THIS
import Atpl from "./pages/Courses/Atpl";
import AirlinePreparationPage from "./pages/Courses/airline-preparation";
import CabinCrewPage from "./pages/Courses/cabin-crew";
import GroundStaffPage from "./pages/Courses/ground-staff";


import Airlinetransportpilotlicence from "./pages/BecomeAPilot/airline-transport-pilot-licence";
import Commercialpilotlicence from "./pages/BecomeAPilot/commercial-pilot-license";
import Becomepilot from "./pages/BecomeAPilot/become-pilot";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* SERVICES */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:service" element={<Services />} />

            {/* COURSES */}
            <Route path="/courses/cpl" element={<Cpl />} /> {/* ✅ FIX */}
            <Route path="/courses/atpl" element={<Atpl />} /> {/* ✅ FIX */}
            <Route path="/courses/cabin-crew" element={<CabinCrewPage />} /> {/* ✅ FIX */}
            <Route path="/courses/ground-staff" element={<GroundStaffPage />} /> {/* ✅ FIX */}

            <Route path="/courses/airline-preparation" element={<AirlinePreparationPage />} /> {/* ✅ FIX */}
            {/* DGCA */}
            <Route path="/dgca" element={<DGCA />} />
            <Route path="/dgca/:topic" element={<DGCA />} />

            {/* PILOT TRAINING */}
            <Route path="/pilot-training" element={<PilotTraining />} />
            <Route path="/pilot-training/:topic" element={<PilotTraining />} />
            <Route path="/become-a-pilot/airline-transport-pilot-licence" element={<Airlinetransportpilotlicence />} />
            <Route path="/become-a-pilot/commercial-pilot-licence" element={<Commercialpilotlicence />} />
            <Route path="/become-a-pilot/become-pilot" element={<Becomepilot />} />
            {/* <Route path="/become-a-pilot" element={<becomepilot />} /> */}



            {/* LOCATIONS */}
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:location" element={<Locations />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
