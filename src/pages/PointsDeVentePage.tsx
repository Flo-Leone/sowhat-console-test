import { useState } from "react";
import {
  Search,
  Download,
  Plus,
  MoreHorizontal,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
  Eye,
  SlidersHorizontal,
  X,
  Building2,
  Users,
  Wifi,
  MapPinned,
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
import { AddPointDeVenteDialog } from "@/components/points-de-vente/AddPointDeVenteDialog";

interface PointDeVente {
  id: string;
  idExterne: string | null;
  nom: string;
  marque: string;
  adresse: string;
  ville: string;
  codePostal: string;
  zone: string;
  type: string;
  statut: "actif" | "inactif";
  compteConnecte: boolean;
}

const mockPointsDeVente: PointDeVente[] = [
  {
    id: "1",
    idExterne: null,
    nom: "Point de vente Thionville",
    marque: "THIONVILLE",
    adresse: "12 rue du Commerce",
    ville: "Thionville",
    codePostal: "57100",
    zone: "Est",
    type: "Boutique",
    statut: "actif",
    compteConnecte: true,
  },
  {
    id: "2",
    idExterne: "5df8a995a473ee0004690776",
    nom: "Point de vente Amnéville",
    marque: "AMNEVILLE",
    adresse: "Centre commercial",
    ville: "Amnéville",
    codePostal: "57360",
    zone: "Est",
    type: "Centre commercial",
    statut: "actif",
    compteConnecte: true,
  },
  {
    id: "3",
    idExterne: null,
    nom: "Point de vente Provins",
    marque: "PROVINS",
    adresse: "Place du marché",
    ville: "Provins",
    codePostal: "77160",
    zone: "IDF",
    type: "Boutique",
    statut: "actif",
    compteConnecte: false,
  },
  {
    id: "4",
    idExterne: "5df8a997a473ee00046907e1",
    nom: "Point de vente Orléans Sud RN20",
    marque: "ORLEANS",
    adresse: "RN20",
    ville: "Orléans",
    codePostal: "45100",
    zone: "Centre",
    type: "Zone commerciale",
    statut: "actif",
    compteConnecte: true,
  },
  {
    id: "5",
    idExterne: null,
    nom: "Point de vente Fleury Les Aubrais",
    marque: "FLEURY LES AUBRAIS",
    adresse: "Avenue principale",
    ville: "Fleury Les Aubrais",
    codePostal: "45400",
    zone: "Centre",
    type: "Boutique",
    statut: "actif",
    compteConnecte: true,
  },
  {
    id: "6",
    idExterne: null,
    nom: "Point de vente Brioude",
    marque: "BRIOUDE",
    adresse: "Rue du centre",
    ville: "Brioude",
    codePostal: "43100",
    zone: "Auvergne",
    type: "Boutique",
    statut: "actif",
    compteConnecte: false,
  },
  {
    id: "7",
    idExterne: "5df8a997a473ee00046907da",
    nom: "Point de vente Dijon Nord-Est",
    marque: "DIJON",
    adresse: "Zone industrielle",
    ville: "Dijon",
    codePostal: "21100",
    zone: "Bourgogne",
    type: "Zone commerciale",
    statut: "actif",
    compteConnecte: true,
  },
  {
    id: "8",
    idExterne: "5df8a997a473ee0004690805",
    nom: "Point de vente Frontignan",
    marque: "FRONTIGNAN",
    adresse: "Boulevard maritime",
    ville: "Frontignan",
    codePostal: "34110",
    zone: "Sud",
    type: "Boutique",
    statut: "actif",
    compteConnecte: true,
  },
];

// Get unique values for filters
const zones = [...new Set(mockPointsDeVente.map((p) => p.zone))];
const types = [...new Set(mockPointsDeVente.map((p) => p.type))];
const villes = [...new Set(mockPointsDeVente.map((p) => p.ville))];

interface ActiveFilter {
  type: "zone" | "type" | "ville" | "statut" | "compte";
  value: string;
  label: string;
}

const PointsDeVentePage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Filter panel temporary state
  const [tempZone, setTempZone] = useState<string>("");
  const [tempType, setTempType] = useState<string>("");
  const [tempVille, setTempVille] = useState<string>("");
  const [tempStatut, setTempStatut] = useState<string>("");
  const [tempCompte, setTempCompte] = useState<string>("");

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredPoints.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPoints.map((p) => p.id));
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
    setTempZone("");
    setTempType("");
    setTempVille("");
    setTempStatut("");
    setTempCompte("");
  };

  const applyFilters = () => {
    const newFilters: ActiveFilter[] = [];
    if (tempZone) newFilters.push({ type: "zone", value: tempZone, label: `Zone: ${tempZone}` });
    if (tempType) newFilters.push({ type: "type", value: tempType, label: `Type: ${tempType}` });
    if (tempVille) newFilters.push({ type: "ville", value: tempVille, label: `Ville: ${tempVille}` });
    if (tempStatut) newFilters.push({ type: "statut", value: tempStatut, label: `Statut: ${tempStatut === "actif" ? "Actif" : "Inactif"}` });
    if (tempCompte) newFilters.push({ type: "compte", value: tempCompte, label: `Compte: ${tempCompte === "connecte" ? "Connecté" : "Non connecté"}` });
    setActiveFilters(newFilters);
    setFilterPanelOpen(false);
  };

  const filteredPoints = mockPointsDeVente.filter((point) => {
    const matchesSearch =
      point.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.codePostal.includes(searchQuery);
    
    const matchesFilters = activeFilters.every((filter) => {
      switch (filter.type) {
        case "zone":
          return point.zone === filter.value;
        case "type":
          return point.type === filter.value;
        case "ville":
          return point.ville === filter.value;
        case "statut":
          return point.statut === filter.value;
        case "compte":
          return filter.value === "connecte" ? point.compteConnecte : !point.compteConnecte;
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-foreground">Points de vente</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos {mockPointsDeVente.length} points de vente
            </p>
          </div>
          <Button 
            className="btn-primary self-start sm:self-auto" 
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Ajouter un point de vente
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par nom, ville ou code postal..."
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
                    <Edit className="h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <Eye className="h-4 w-4" />
                    Voir les détails
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-3 py-2.5 text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Download CSV */}
            <Button variant="outline" className="gap-2 shrink-0 hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Télécharger CSV</span>
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
                      checked={selectedRows.length === mockPointsDeVente.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th>Statut</th>
                  <th>Nom du point de vente</th>
                  <th>Marque</th>
                  <th>Ville</th>
                  <th>Code postal</th>
                  <th>Zone</th>
                  <th>Compte</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPoints.map((point, index) => (
                  <tr
                    key={point.id}
                    className={cn(
                      selectedRows.includes(point.id) && "bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td>
                      <Checkbox
                        checked={selectedRows.includes(point.id)}
                        onCheckedChange={() => toggleRow(point.id)}
                      />
                    </td>
                    <td>
                      <span
                        className={cn(
                          "status-badge",
                          point.statut === "actif"
                            ? "status-recruited"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {point.statut === "actif" ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-semibold text-foreground text-sm">{point.nom}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground">
                        {point.marque}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm">{point.ville}</span>
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground font-mono">
                        {point.codePostal}
                      </span>
                    </td>
                    <td>
                      <span className="tag">{point.zone}</span>
                    </td>
                    <td>
                      {point.compteConnecte ? (
                        <span className="text-success text-sm">✓ Connecté</span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td>
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
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-border bg-white">
            <span className="text-sm text-muted-foreground">
              {filteredPoints.length} résultat{filteredPoints.length > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50">
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 text-sm">1 / 1</span>
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

      {/* Advanced Search Panel */}
      <Sheet open={filterPanelOpen} onOpenChange={setFilterPanelOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-card border-border">
          <SheetHeader className="pb-6">
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              Recherche avancée
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6">
            {/* Zone Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <MapPinned className="h-4 w-4 text-muted-foreground" />
                Zone géographique
              </label>
              <Select value={tempZone || "all"} onValueChange={(v) => setTempZone(v === "all" ? "" : v)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Toutes les zones" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Toutes les zones</SelectItem>
                  {zones.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Type de point de vente
              </label>
              <Select value={tempType || "all"} onValueChange={(v) => setTempType(v === "all" ? "" : v)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Tous les types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ville Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Ville
              </label>
              <Select value={tempVille || "all"} onValueChange={(v) => setTempVille(v === "all" ? "" : v)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Toutes les villes" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {villes.map((ville) => (
                    <SelectItem key={ville} value={ville}>
                      {ville}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Statut Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4 text-muted-foreground" />
                Statut
              </label>
              <Select value={tempStatut || "all"} onValueChange={(v) => setTempStatut(v === "all" ? "" : v)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Compte Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Wifi className="h-4 w-4 text-muted-foreground" />
                Compte connecté
              </label>
              <Select value={tempCompte || "all"} onValueChange={(v) => setTempCompte(v === "all" ? "" : v)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="connecte">Connecté</SelectItem>
                  <SelectItem value="non_connecte">Non connecté</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                resetAllFilters();
                setFilterPanelOpen(false);
              }}
            >
              Réinitialiser
            </Button>
            <Button className="flex-1 btn-primary" onClick={applyFilters}>
              Appliquer les filtres
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <AddPointDeVenteDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </ConsoleLayout>
  );
};

export default PointsDeVentePage;
