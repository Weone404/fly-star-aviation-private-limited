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
import PilotTraining from "./pages/pilotTraining/PilotTraining";
import India from "./pages/pilotTraining/india";
import USA from "./pages/pilotTraining/usa";
import NewZealand from "./pages/pilotTraining/new-zealand";
import SouthAfrica from "./pages/pilotTraining/south-africa";
import Australia from "./pages/pilotTraining/australia";


import Locations from "./pages/Locations";
import NotFound from "./pages/NotFound";
import Cpl from "./pages/Courses/Cpl"; // ✅ ADD THIS
import Atpl from "./pages/Courses/Atpl";
import AirlinePreparationPage from "./pages/Courses/airline-preparation";
import CabinCrewPage from "./pages/Courses/cabin-crew";
import GroundStaffPage from "./pages/Courses/ground-staff";
import Rtr from "./pages/rtr";
import Fullform from "./pages/dgca/full-form"
import Medical from "./pages/dgca/medical";
import Groundclasses from "./pages/dgca/ground-classes"



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
            <Route path="/rtr" element={<Rtr />} />
            <Route path="/dgca/full-form" element={<Fullform />} />
            <Route path="/dgca/medical" element={<Medical />} />
            <Route path="/dgca/ground-classes" element={<Groundclasses />} />




            {/* PILOT TRAINING */}
            <Route path="/pilot-training" element={<PilotTraining />} />
            <Route path="/pilot-training/india" element={<India />} />
            <Route path="/pilot-training/usa" element={<USA />} />
            <Route path="/pilot-training/new-zealand" element={<NewZealand />} />
            <Route path="/pilot-training/south-africa" element={<SouthAfrica />} />
            <Route path="/pilot-training/australia" element={<Australia />} />



            <Route path="/pilot-training/:topic" element={<PilotTraining />} />
            <Route path="/become-a-pilot/airline-transport-pilot-licence" element={<Airlinetransportpilotlicence />} />
            <Route path="/become-a-pilot/commercial-pilot-licence" element={<Commercialpilotlicence />} />
            <Route path="/become-a-pilot/become-pilot" element={<Becomepilot />} />




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
