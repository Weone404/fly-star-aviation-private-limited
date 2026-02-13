import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import DGCA from "./pages/DGCA";
import PilotTraining from "./pages/PilotTraining";
import Locations from "./pages/Locations";
import NotFound from "./pages/NotFound";
import Cpl from "./pages/Courses/Cpl"; // ✅ ADD THIS

const queryClient = new QueryClient();

const App = () => (
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

          {/* DGCA */}
          <Route path="/dgca" element={<DGCA />} />
          <Route path="/dgca/:topic" element={<DGCA />} />

          {/* PILOT TRAINING */}
          <Route path="/pilot-training" element={<PilotTraining />} />
          <Route path="/pilot-training/:topic" element={<PilotTraining />} />

          {/* LOCATIONS */}
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:location" element={<Locations />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
