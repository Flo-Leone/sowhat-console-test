import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Clock,
  Monitor,
  Smartphone,
  ArrowUpDown,
  ChevronDown,
  RefreshCw,
  Send,
  Tag,
  Bell,
  Archive,
} from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { StatusBadge, CandidateStatus } from "@/components/candidates/StatusBadge";
import { ScoreBar } from "@/components/candidates/ScoreBar";
import { FilterPanel } from "@/components/candidates/FilterPanel";
import { AddCandidateDialog } from "@/components/candidates/AddCandidateDialog";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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
          <Button 
            className="btn-primary self-start sm:self-auto" 
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Ajouter un candidat
          </Button>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className={cn(
                "gap-2 relative hover:border-[hsl(var(--coral-glow))] hover:text-[hsl(var(--coral-glow))] hover:bg-[hsl(var(--coral-glow)/0.08)]",
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
            {/* Actions Button - appears when rows are selected */}
            {selectedRows.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-[hsl(var(--coral-glow))] hover:bg-[hsl(18_100%_75%)] text-white">
                    Actions ({selectedRows.length})
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-card border-border shadow-elevated"
                >
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <RefreshCw className="h-4 w-4" />
                    Mettre statut à jour
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <Send className="h-4 w-4" />
                    Transmettre les candidatures sélectionnées
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <Tag className="h-4 w-4" />
                    Modifier tags
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <Bell className="h-4 w-4" />
                    Envoyer rappel candidat
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-3 py-2.5 text-muted-foreground">
                    <Archive className="h-4 w-4" />
                    Archiver
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button variant="outline" className="gap-2 hover:border-[hsl(var(--coral-glow))] hover:text-[hsl(var(--coral-glow))] hover:bg-[hsl(var(--coral-glow)/0.08)]">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Télécharger CSV</span>
            </Button>
            <Button variant="outline" className="gap-2 hover:border-[hsl(var(--coral-glow))] hover:text-[hsl(var(--coral-glow))] hover:bg-[hsl(var(--coral-glow)/0.08)]">
              <Columns3 className="h-4 w-4" />
              <span className="hidden sm:inline">Colonnes</span>
            </Button>
          </div>
        </div>

        {/* Data Table with horizontal scroll */}
        <div className="bg-white rounded-xl overflow-hidden">
          <ScrollArea className="w-full">
            <div className="min-w-[1400px]">
              <table className="data-table w-full">
                <thead>
                  <tr>
                    <th className="w-12 sticky left-0 bg-white z-10">
                      <Checkbox
                        checked={selectedRows.length === mockCandidates.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </th>
                    <th className="sticky left-12 bg-white z-10 min-w-[180px]">
                      <div className="flex items-center gap-1.5 cursor-pointer hover:text-[hsl(var(--coral-glow))]">
                        Candidat
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="min-w-[120px]">Profession</th>
                    <th className="min-w-[100px]">
                      <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">
                        Date
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="min-w-[130px]">Statut</th>
                    <th className="min-w-[150px]">Titre offre</th>
                    <th className="min-w-[90px]">Référence</th>
                    <th className="min-w-[150px]">Point de vente</th>
                    <th className="min-w-[90px]">
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">
                          Score Exp.
                          <ArrowUpDown className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent>Score d'expérience</TooltipContent>
                      </Tooltip>
                    </th>
                    <th className="min-w-[90px]">
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">
                          Score Prof.
                          <ArrowUpDown className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent>Score de profession</TooltipContent>
                      </Tooltip>
                    </th>
                    <th className="min-w-[90px]">
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">
                          Score Dispo.
                          <ArrowUpDown className="h-3 w-3" />
                        </TooltipTrigger>
                        <TooltipContent>Score de disponibilité</TooltipContent>
                      </Tooltip>
                    </th>
                    <th className="min-w-[100px]">Appel</th>
                    <th className="min-w-[100px]">Entretien</th>
                    <th className="min-w-[110px]">Prochain évt.</th>
                    <th className="min-w-[100px]">Dernier rappel</th>
                    <th className="min-w-[130px]">Recruteur</th>
                    <th className="min-w-[80px]">Plateforme</th>
                    <th className="min-w-[60px]">Vues</th>
                    <th className="min-w-[100px]">Dernière vue</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockCandidates.map((candidate, index) => (
                    <tr
                      key={candidate.id}
                      className={cn(
                        "cursor-pointer",
                        selectedRows.includes(candidate.id) && "bg-primary/5"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => handleRowClick(candidate.id)}
                    >
                      <td 
                        className="sticky left-0 bg-white z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={selectedRows.includes(candidate.id)}
                          onCheckedChange={() => toggleRow(candidate.id)}
                        />
                      </td>
                      <td className="sticky left-12 bg-white z-10">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[hsl(18_100%_45%)]">
                            {candidate.firstName} {candidate.lastName}
                          </span>
                          {candidate.tags.length > 0 && (
                            <div className="flex gap-1">
                              {candidate.tags.map((tag) => (
                                <span key={tag} className="tag tag-primary text-2xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="text-sm">{candidate.profession}</span>
                      </td>
                      <td>
                        <span className="text-muted-foreground text-sm">
                          {candidate.dateCandidat}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={candidate.status} />
                      </td>
                      <td>
                        <span className="text-sm">{candidate.titreOffre}</span>
                      </td>
                      <td>
                        <span className="text-sm text-muted-foreground font-mono">
                          {candidate.referenceOffre}
                        </span>
                      </td>
                      <td>
                        <div className="max-w-[150px]">
                          <p className="text-sm truncate">{candidate.pointVente}</p>
                        </div>
                      </td>
                      <td>
                        <ScoreBar value={candidate.scoreExperience} compact />
                      </td>
                      <td>
                        <ScoreBar value={candidate.scoreProfession} compact />
                      </td>
                      <td>
                        <ScoreBar value={candidate.scoreDisponibilite} compact />
                      </td>
                      <td>
                        {candidate.appelDate ? (
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-info" />
                            <span className="text-sm">{candidate.appelDate}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </td>
                      <td>
                        {candidate.entretienDate ? (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-success" />
                            <span className="text-sm">{candidate.entretienDate}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </td>
                      <td>
                        {candidate.prochainEvenement ? (
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-warning" />
                            <span className="text-sm">{candidate.prochainEvenement}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </td>
                      <td>
                        {candidate.dernierRappel ? (
                          <span className="text-sm">{candidate.dernierRappel}</span>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </td>
                      <td>
                        <span className="text-sm truncate block max-w-[120px]">
                          {candidate.recruteur}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {candidate.plateforme === "Desktop" ? (
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm">{candidate.vues}</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-sm text-muted-foreground">
                          {candidate.derniereVue || "—"}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
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
                            <DropdownMenuItem onClick={() => handleRowClick(candidate.id)}>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-border bg-white">
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

      {/* Add Candidate Dialog */}
      <AddCandidateDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
      />
    </ConsoleLayout>
  );
};

export default CandidaturesPage;
