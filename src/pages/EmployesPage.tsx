import { useState } from "react";
import {
  Search,
  Download,
  MoreHorizontal,
  UserCheck,
  Mail,
  FileText,
  Edit,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  RefreshCw,
  Send,
  Archive,
  Calendar,
  Store,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Info,
  X,
} from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Employe {
  id: string;
  prenom: string;
  nom: string;
  nomExtrait: string;
  dateEmbauche: string;
  magasin: string;
  rappels: { envoyes: number; total: number };
  dernierRappel: string | null;
  documentsEnvoyes: { envoyes: number; total: number };
  dateEnvoiDocuments: string | null;
  statut: "accepte" | "valide" | "embauche" | "archive";
}

const mockEmployes: Employe[] = [
  {
    id: "1",
    prenom: "Stephane",
    nom: "Boussely",
    nomExtrait: "",
    dateEmbauche: "29 oct. 2025",
    magasin: "",
    rappels: { envoyes: 0, total: 0 },
    dernierRappel: null,
    documentsEnvoyes: { envoyes: 3, total: 3 },
    dateEnvoiDocuments: null,
    statut: "accepte",
  },
  {
    id: "2",
    prenom: "Bob",
    nom: "Dupont",
    nomExtrait: "",
    dateEmbauche: "1 nov. 2025",
    magasin: "",
    rappels: { envoyes: 0, total: 0 },
    dernierRappel: null,
    documentsEnvoyes: { envoyes: 0, total: 3 },
    dateEnvoiDocuments: null,
    statut: "accepte",
  },
];

const statutLabels: Record<string, string> = {
  accepte: "Accepté",
  valide: "Validé",
  embauche: "Embauché",
  archive: "Archivé",
};

interface ActiveFilter {
  type: "prenom" | "nom" | "magasin" | "statut" | "archived" | "imported";
  value: string;
  label: string;
}

const EmployesPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [statusInfoOpen, setStatusInfoOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter panel temporary state
  const [tempPrenom, setTempPrenom] = useState("");
  const [tempNom, setTempNom] = useState("");
  const [tempMagasin, setTempMagasin] = useState("");
  const [tempStatut, setTempStatut] = useState("");
  const [tempArchived, setTempArchived] = useState(false);
  const [tempImported, setTempImported] = useState(false);

  const toggleSelectAll = () => {
    if (selectedRows.length === mockEmployes.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockEmployes.map((e) => e.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const removeFilter = (filterToRemove: ActiveFilter) => {
    setActiveFilters((prev) =>
      prev.filter(
        (f) => !(f.type === filterToRemove.type && f.value === filterToRemove.value)
      )
    );
  };

  const resetAllFilters = () => {
    setActiveFilters([]);
    setTempPrenom("");
    setTempNom("");
    setTempMagasin("");
    setTempStatut("");
    setTempArchived(false);
    setTempImported(false);
  };

  const applyFilters = () => {
    const newFilters: ActiveFilter[] = [];
    if (tempPrenom) newFilters.push({ type: "prenom", value: tempPrenom, label: `Prénom: ${tempPrenom}` });
    if (tempNom) newFilters.push({ type: "nom", value: tempNom, label: `Nom: ${tempNom}` });
    if (tempMagasin) newFilters.push({ type: "magasin", value: tempMagasin, label: `Magasin: ${tempMagasin}` });
    if (tempStatut) newFilters.push({ type: "statut", value: tempStatut, label: `Statut: ${statutLabels[tempStatut]}` });
    if (tempArchived) newFilters.push({ type: "archived", value: "true", label: "Inclure archivés" });
    if (tempImported) newFilters.push({ type: "imported", value: "true", label: "Importé" });
    setActiveFilters(newFilters);
    setFilterPanelOpen(false);
  };

  const filteredEmployes = mockEmployes.filter((employe) => {
    const matchesSearch =
      searchQuery === "" ||
      employe.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employe.nom.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = activeFilters.every((filter) => {
      switch (filter.type) {
        case "prenom":
          return employe.prenom.toLowerCase().includes(filter.value.toLowerCase());
        case "nom":
          return employe.nom.toLowerCase().includes(filter.value.toLowerCase());
        case "magasin":
          return employe.magasin.toLowerCase().includes(filter.value.toLowerCase());
        case "statut":
          return employe.statut === filter.value;
        default:
          return true;
      }
    });

    return matchesSearch && matchesFilters;
  });

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-foreground">Employés</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos {mockEmployes.length} employés recrutés
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par nom ou prénom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            {/* Advanced Search Button */}
            <Button
              variant="outline"
              className={cn(
                "gap-2 shrink-0 hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]",
                activeFilters.length > 0 && "border-primary bg-primary/5"
              )}
              onClick={() => setFilterPanelOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Recherche avancée
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground h-5 px-1.5 text-xs">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>

            {/* Spacer to push right-side buttons */}
            <div className="hidden sm:block sm:ml-auto" />

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
                  className="w-56 bg-card border-border shadow-elevated"
                >
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <RefreshCw className="h-4 w-4" />
                    Mettre à jour le statut
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <Send className="h-4 w-4" />
                    Envoyer rappel
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <Mail className="h-4 w-4" />
                    Envoyer documents
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-3 py-2.5 text-muted-foreground">
                    <Archive className="h-4 w-4" />
                    Archiver
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Export Button */}
            <Button variant="outline" className="gap-2 shrink-0 hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exporter</span>
            </Button>
          </div>

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Filtres actifs:</span>
              {activeFilters.map((filter, index) => (
                <Badge
                  key={`${filter.type}-${filter.value}-${index}`}
                  variant="secondary"
                  className="bg-lavender/20 text-lavender border border-lavender/30 gap-1.5 pr-1"
                >
                  {filter.label}
                  <button
                    onClick={() => removeFilter(filter)}
                    className="hover:bg-lavender/30 rounded p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <button
                onClick={resetAllFilters}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Tout effacer
              </button>
            </div>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-12">
                    <Checkbox
                      checked={selectedRows.length === filteredEmployes.length && filteredEmployes.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th>Statut</th>
                  <th>Prénom</th>
                  <th>Nom de famille</th>
                  <th>Nom extrait</th>
                  <th>Date d'embauche</th>
                  <th>Magasin</th>
                  <th># rappels</th>
                  <th>Dernier rappel</th>
                  <th>Documents envoyés</th>
                  <th>Date envoi documents</th>
                  <th className="w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployes.map((employe, index) => (
                  <tr
                    key={employe.id}
                    className={cn(
                      selectedRows.includes(employe.id) && "bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td>
                      <Checkbox
                        checked={selectedRows.includes(employe.id)}
                        onCheckedChange={() => toggleRow(employe.id)}
                      />
                    </td>
                    <td>
                      <span
                        className={cn(
                          "status-badge",
                          employe.statut === "accepte" && "status-recruited",
                          employe.statut === "valide" && "status-new",
                          employe.statut === "embauche" && "status-invited",
                          employe.statut === "archive" && "bg-muted text-muted-foreground"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {statutLabels[employe.statut]}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm">{employe.prenom}</span>
                    </td>
                    <td>
                      <span className="text-sm font-medium">{employe.nom}</span>
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground">
                        {employe.nomExtrait || "—"}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm">{employe.dateEmbauche}</span>
                    </td>
                    <td>
                      <span className="text-sm">{employe.magasin || "—"}</span>
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground">
                        {employe.rappels.total > 0 
                          ? `${employe.rappels.envoyes}/${employe.rappels.total}`
                          : "—"
                        }
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground">
                        {employe.dernierRappel || "—"}
                      </span>
                    </td>
                    <td>
                      <span className={cn(
                        "text-sm font-medium",
                        employe.documentsEnvoyes.envoyes === employe.documentsEnvoyes.total
                          ? "text-success"
                          : "text-warning"
                      )}>
                        {employe.documentsEnvoyes.envoyes}/{employe.documentsEnvoyes.total}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground">
                        {employe.dateEnvoiDocuments || "—"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Info className="h-4 w-4 text-info" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-border bg-white">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Résultats par page</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-16 h-8 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                1 - {filteredEmployes.length} / {filteredEmployes.length}
              </span>
              <div className="flex items-center gap-1">
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
      </div>

      {/* Advanced Search Sheet */}
      <Sheet open={filterPanelOpen} onOpenChange={setFilterPanelOpen}>
        <SheetContent className="w-full sm:max-w-md bg-card border-border">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Recherche avancée
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Prénom */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Prénom</label>
              <input
                type="text"
                placeholder="Rechercher par prénom..."
                value={tempPrenom}
                onChange={(e) => setTempPrenom(e.target.value)}
                className="input-field w-full"
              />
            </div>

            {/* Nom */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom</label>
              <input
                type="text"
                placeholder="Rechercher par nom..."
                value={tempNom}
                onChange={(e) => setTempNom(e.target.value)}
                className="input-field w-full"
              />
            </div>

            {/* Magasin */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Point de vente</label>
              <input
                type="text"
                placeholder="Rechercher par point de vente..."
                value={tempMagasin}
                onChange={(e) => setTempMagasin(e.target.value)}
                className="input-field w-full"
              />
            </div>

            {/* Statut */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
              <Select value={tempStatut || "all"} onValueChange={(v) => setTempStatut(v === "all" ? "" : v)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="accepte">Accepté</SelectItem>
                  <SelectItem value="valide">Validé</SelectItem>
                  <SelectItem value="embauche">Embauché</SelectItem>
                  <SelectItem value="archive">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={tempArchived}
                  onCheckedChange={(checked) => setTempArchived(!!checked)}
                />
                Inclure archivés
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={tempImported}
                  onCheckedChange={(checked) => setTempImported(!!checked)}
                />
                Importé
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={resetAllFilters}
              >
                Réinitialiser
              </Button>
              <Button
                className="flex-1 btn-primary"
                onClick={applyFilters}
              >
                Appliquer
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Status Info Sheet */}
      <Sheet open={statusInfoOpen} onOpenChange={setStatusInfoOpen}>
        <SheetContent className="w-full sm:max-w-md bg-card border-border">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-info" />
              Statuts employés
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4 text-sm">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <p className="font-semibold text-success mb-1">Accepté</p>
              <p className="text-muted-foreground">
                Candidat accepté commençant le processus de préintégration (action manuelle par un recruteur)
              </p>
            </div>
            <div className="p-4 rounded-lg bg-info/10 border border-info/20">
              <p className="font-semibold text-info mb-1">Validé</p>
              <p className="text-muted-foreground">
                Candidat dont les informations ont été mises à disposition de votre SIRH interne (action automatisée par SoWhat.ai)
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="font-semibold text-primary mb-1">Embauché</p>
              <p className="text-muted-foreground">
                Candidat ayant signé un contrat de travail et officiellement embauché (action manuelle d'un recruteur)
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="font-semibold text-muted-foreground mb-1">Archivé</p>
              <p className="text-muted-foreground">
                Candidat n'ayant pas fourni les documents et/ou ne s'étant jamais présenté
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </ConsoleLayout>
  );
};

export default EmployesPage;