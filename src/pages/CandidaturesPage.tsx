import { useState } from "react";
import {
  Filter,
  Download,
  Columns3,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Phone,
  Calendar,
  Eye,
} from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { StatusBadge, CandidateStatus } from "@/components/candidates/StatusBadge";
import { ScoreBar } from "@/components/candidates/ScoreBar";
import { FilterPanel } from "@/components/candidates/FilterPanel";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  dateCandidat: string;
  status: CandidateStatus;
  scoreExperience: number | null;
  scoreDisponibilite: number | null;
  pointVente: string;
  pointVenteAssigne: string | null;
  appelDate: string | null;
  entretienDate: string | null;
  prochainEvenement: string | null;
  tags: string[];
  recruteur: string;
  plateforme: "Desktop" | "Mobile";
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Dupont",
    profession: "Manager",
    dateCandidat: "28/10/2025",
    status: "recrute",
    scoreExperience: null,
    scoreDisponibilite: null,
    pointVente: "Paris Rivoli",
    pointVenteAssigne: null,
    appelDate: "30/10/2025",
    entretienDate: null,
    prochainEvenement: null,
    tags: [],
    recruteur: "Stephane Boussely",
    plateforme: "Desktop",
  },
  {
    id: "2",
    firstName: "Jean-Philippe",
    lastName: "Selle",
    profession: "Equipier polyvalent",
    dateCandidat: "13/10/2025",
    status: "invite_entretien",
    scoreExperience: 100,
    scoreDisponibilite: 88,
    pointVente: "Paris Carrousel Du Louvre",
    pointVenteAssigne: "Paris Carrousel Du Louvre",
    appelDate: "12/11/2025",
    entretienDate: "15/10/2025",
    prochainEvenement: "15/10/2025",
    tags: ["Urgent", "Prioritaire"],
    recruteur: "Jean-Philippe Selle",
    plateforme: "Desktop",
  },
  {
    id: "3",
    firstName: "Julien",
    lastName: "Gantheret",
    profession: "Equipier polyvalent",
    dateCandidat: "13/10/2025",
    status: "invite_entretien",
    scoreExperience: 100,
    scoreDisponibilite: 37,
    pointVente: "Paris Rivoli",
    pointVenteAssigne: "Paris Rivoli",
    appelDate: "12/11/2025",
    entretienDate: "15/10/2025",
    prochainEvenement: "15/10/2025",
    tags: [],
    recruteur: "Julien Gantheret",
    plateforme: "Desktop",
  },
  {
    id: "4",
    firstName: "Bob",
    lastName: "Dupont",
    profession: "Equipier polyvalent",
    dateCandidat: "13/10/2025",
    status: "recrute",
    scoreExperience: 0,
    scoreDisponibilite: null,
    pointVente: "Paris Rivoli",
    pointVenteAssigne: null,
    appelDate: null,
    entretienDate: null,
    prochainEvenement: null,
    tags: [],
    recruteur: "Bob Dupont",
    plateforme: "Desktop",
  },
];

const CandidaturesPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(3);
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Total candidatures
            </p>
            <p className="text-2xl font-display font-bold mt-1">247</p>
            <p className="text-xs text-success mt-1">+12% ce mois</p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              À traiter
            </p>
            <p className="text-2xl font-display font-bold mt-1">24</p>
            <p className="text-xs text-warning mt-1">8 urgentes</p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Entretiens prévus
            </p>
            <p className="text-2xl font-display font-bold mt-1">12</p>
            <p className="text-xs text-muted-foreground mt-1">Cette semaine</p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Recrutés
            </p>
            <p className="text-2xl font-display font-bold mt-1">89</p>
            <p className="text-xs text-success mt-1">36% taux de conversion</p>
          </div>
        </div>

        {/* Table Controls */}
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
            <Button variant="outline" className="gap-2">
              <Columns3 className="h-4 w-4" />
              <span className="hidden sm:inline">Colonnes</span>
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-12">
                    <Checkbox
                      checked={selectedRows.length === mockCandidates.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th>Date</th>
                  <th>Candidat</th>
                  <th>Profession</th>
                  <th>Statut</th>
                  <th>Score Exp.</th>
                  <th>Score Dispo.</th>
                  <th>Point de vente</th>
                  <th>Prochain évènement</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {mockCandidates.map((candidate, index) => (
                  <tr
                    key={candidate.id}
                    className={cn(
                      selectedRows.includes(candidate.id) && "bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td>
                      <Checkbox
                        checked={selectedRows.includes(candidate.id)}
                        onCheckedChange={() => toggleRow(candidate.id)}
                      />
                    </td>
                    <td>
                      <span className="text-muted-foreground text-sm">
                        {candidate.dateCandidat}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center text-sm font-semibold text-golden-700">
                          {candidate.firstName[0]}
                          {candidate.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {candidate.firstName} {candidate.lastName}
                          </p>
                          <p className="text-2xs text-muted-foreground">
                            {candidate.recruteur}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm">{candidate.profession}</span>
                    </td>
                    <td>
                      <StatusBadge status={candidate.status} />
                    </td>
                    <td>
                      <ScoreBar value={candidate.scoreExperience} />
                    </td>
                    <td>
                      <ScoreBar value={candidate.scoreDisponibilite} />
                    </td>
                    <td>
                      <div className="max-w-[180px]">
                        <p className="text-sm truncate">{candidate.pointVente}</p>
                        {candidate.pointVenteAssigne && (
                          <p className="text-2xs text-muted-foreground truncate">
                            Assigné: {candidate.pointVenteAssigne}
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      {candidate.prochainEvenement ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm">
                            {candidate.prochainEvenement}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Voir le profil</TooltipContent>
                        </Tooltip>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-card border-border shadow-elevated"
                          >
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir le profil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Programmer un appel
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Planifier entretien
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Rejeter
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-border bg-muted/30">
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
