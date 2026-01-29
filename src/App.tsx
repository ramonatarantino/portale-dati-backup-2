import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Numeridag from "@/pages/Numeridag";
import Index from "@/pages/Index";
import CosaEOpenDag from "@/pages/CosaEOpenDag";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/numeridag" element={<Numeridag />} />
          <Route path="/index" element={<Index />} />
          <Route path="/cosa-e-opendag" element={<CosaEOpenDag />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
