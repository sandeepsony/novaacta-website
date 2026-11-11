import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TimeThemeProvider } from "@/hooks/useTimeTheme";
import Index from "./pages/Index";
import Platform from "./pages/Platform";
import CaseStudies from "./pages/CaseStudies";
import WhatWeDo from "./pages/WhatWeDo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TimeThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TimeThemeProvider>
  </QueryClientProvider>
);

export default App;
