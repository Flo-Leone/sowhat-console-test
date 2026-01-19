import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { CandidateStatus } from "@/components/candidates/StatusBadge";
import { FilterPanel } from "@/components/candidates/FilterPanel";
import { CandidateRow } from "@/components/candidates/CandidateRow";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  titreOffre: string;
  referenceOffre: string;
  dateCandidat: string;
  status: CandidateStatus;
  scoreExperience: number | null;
  scoreProfession: number | null;
  scoreDisponibilite: number | null;
  pointVente: string;
  pointVenteAssigne: string | null;
  appelDate: string | null;
  entretienDate: string | null;
  prochainEvenement: string | null;
  dernierRappel: string | null;
  prochainRappel: string | null;
  tags: string[];
  recruteur: string;
  plateforme: "Desktop" | "Mobile";
  vues: number;
  derniereVue: string | null;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Dupont",
    profession: "Manager",
    titreOffre: "Manager",
    referenceOffre: "MGR-001",
    dateCandidat: "28/10/2025",
    status: "recrute",
    scoreExperience: null,
    scoreProfession: null,
    scoreDisponibilite: null,
    pointVente: "Paris Rivoli",
    pointVenteAssigne: null,
    appelDate: "30/10/2025",
    entretienDate: null,
    prochainEvenement: null,
    dernierRappel: null,
    prochainRappel: null,
    tags: [],
    recruteur: "Stephane Boussely",
    plateforme: "Desktop",
    vues: 5,
    derniereVue: "19/01/2026",
  },
  {
    id: "2",
    firstName: "Jean-Philippe",
    lastName: "Selle",
    profession: "Equipier polyvalent",
    titreOffre: "Equipier polyvalent",
    referenceOffre: "EQP-042",
    dateCandidat: "13/10/2025",
    status: "invite_entretien",
    scoreExperience: 100,
    scoreProfession: 88,
    scoreDisponibilite: 88,
    pointVente: "Paris Carrousel Du Louvre",
    pointVenteAssigne: "Paris Carrousel Du Louvre",
    appelDate: "12/11/2025",
    entretienDate: "15/10/2025",
    prochainEvenement: "15/10/2025",
    dernierRappel: null,
    prochainRappel: null,
    tags: ["10H"],
    recruteur: "Admin SW.AI",
    plateforme: "Desktop",
    vues: 12,
    derniereVue: "19/01/2026",
  },
  {
    id: "3",
    firstName: "Julien",
    lastName: "Gantheret",
    profession: "Equipier polyvalent",
    titreOffre: "Equipier polyvalent",
    referenceOffre: "EQP-042",
    dateCandidat: "13/10/2025",
    status: "invite_entretien",
    scoreExperience: 100,
    scoreProfession: 37,
    scoreDisponibilite: 37,
    pointVente: "Paris Rivoli",
    pointVenteAssigne: "Paris Rivoli",
    appelDate: "12/11/2025",
    entretienDate: "15/10/2025",
    prochainEvenement: "15/10/2025",
    dernierRappel: null,
    prochainRappel: null,
    tags: [],
    recruteur: "Julien Gantheret",
    plateforme: "Desktop",
    vues: 8,
    derniereVue: "18/01/2026",
  },
  {
    id: "4",
    firstName: "Bob",
    lastName: "Dupont",
    profession: "Equipier polyvalent",
    titreOffre: "Equipier polyvalent",
    referenceOffre: "EQP-043",
    dateCandidat: "13/10/2025",
    status: "recrute",
    scoreExperience: 0,
    scoreProfession: null,
    scoreDisponibilite: null,
    pointVente: "Paris Rivoli",
    pointVenteAssigne: null,
    appelDate: null,
    entretienDate: null,
    prochainEvenement: null,
    dernierRappel: null,
    prochainRappel: null,
    tags: [],
    recruteur: "Bob Dupont",
    plateforme: "Desktop",
    vues: 3,
    derniereVue: "15/01/2026",
  },
];

const CandidaturesPage = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState("50");
  
  const toggleSelectAll = () => {
    if (selectedRows.length === mockCandidates.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockCandidates.map((c) => c.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleRowClick = (candidateId: string) => {
    navigate(`/candidatures/${candidateId}`);
  };

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-foreground">Candidatures</h1>
            <p className="text-muted-foreground mt-1">
              Les candidatures de votre périmètre
            </p>
          </div>
          <Button className="btn-primary gap-2 self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Ajouter un candidat
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className={cn(
                "gap-2 relative",
                activeFilters > 0 && "border-primary/50 bg-primary/5"
              )}
              onClick={() => setFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filtrer
              {activeFilters > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-2xs font-bold">
                  {activeFilters}
                </span>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Télécharger CSV</span>
            </Button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-2">
          {mockCandidates.map((candidate, index) => (
            <div 
              key={candidate.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <CandidateRow
                candidate={candidate}
                isSelected={selectedRows.includes(candidate.id)}
                onSelect={() => toggleRow(candidate.id)}
                onClick={() => handleRowClick(candidate.id)}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Résultats par page</span>
            <Select value={pageSize} onValueChange={setPageSize}>
              <SelectTrigger className="w-16 h-8 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground mr-4">
              1 - 4 / 4
            </span>
            <button className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50">
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50">
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        activeFilters={activeFilters}
        onReset={() => setActiveFilters(0)}
        onApply={() => setFilterOpen(false)}
      />
    </ConsoleLayout>
  );
};

export default CandidaturesPage;
