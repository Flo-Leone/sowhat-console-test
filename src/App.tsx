import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CandidaturesPage from "./pages/CandidaturesPage";
import CandidatPage from "./pages/CandidatPage";
import PointsDeVentePage from "./pages/PointsDeVentePage";
import StatistiquesPage from "./pages/StatistiquesPage";
import OffresEmploiPage from "./pages/OffresEmploiPage";
import EmployesPage from "./pages/EmployesPage";
import UtilisateursPage from "./pages/UtilisateursPage";
import RolesPage from "./pages/RolesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/candidatures" replace />} />
          <Route path="/candidatures" element={<CandidaturesPage />} />
          <Route path="/candidatures/:id" element={<CandidatPage />} />
          <Route path="/points-de-vente" element={<PointsDeVentePage />} />
          <Route path="/statistiques" element={<StatistiquesPage />} />
          <Route path="/offres-emploi" element={<OffresEmploiPage />} />
          <Route path="/offres-emploi/*" element={<OffresEmploiPage />} />
          <Route path="/parametres" element={<CandidaturesPage />} />
          <Route path="/employes" element={<EmployesPage />} />
          <Route path="/utilisateurs" element={<UtilisateursPage />} />
          <Route path="/utilisateurs/roles" element={<RolesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
