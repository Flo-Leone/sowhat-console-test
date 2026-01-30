import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  Trash2,
  Edit,
  ChevronDown,
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

interface Role {
  id: string;
  nom: string;
  type: string;
  dateCreation: string;
  dateModification: string;
  nombreUtilisateurs: number;
  actif: boolean;
}

const mockRoles: Role[] = [
  {
    id: "1",
    nom: "RAR Exception",
    type: "Exception",
    dateCreation: "3 oct. 2023",
    dateModification: "3 oct. 2023",
    nombreUtilisateurs: 0,
    actif: true,
  },
  {
    id: "2",
    nom: "Job Posting",
    type: "Standard",
    dateCreation: "8 oct. 2022",
    dateModification: "3 nov. 2023",
    nombreUtilisateurs: 0,
    actif: true,
  },
  {
    id: "3",
    nom: "Edit application emails",
    type: "Standard",
    dateCreation: "7 mars 2023",
    dateModification: "3 nov. 2023",
    nombreUtilisateurs: 0,
    actif: true,
  },
  {
    id: "4",
    nom: "Recruiting - Administrator",
    type: "Admin",
    dateCreation: "",
    dateModification: "21 nov. 2025",
    nombreUtilisateurs: 2,
    actif: true,
  },
  {
    id: "5",
    nom: "Recruiting - Operational",
    type: "Standard",
    dateCreation: "",
    dateModification: "5 févr. 2024",
    nombreUtilisateurs: 0,
    actif: true,
  },
  {
    id: "6",
    nom: "Subscription payer",
    type: "Standard",
    dateCreation: "20 juil. 2023",
    dateModification: "13 nov. 2023",
    nombreUtilisateurs: 0,
    actif: true,
  },
  {
    id: "7",
    nom: "CSS",
    type: "Standard",
    dateCreation: "30 mai 2023",
    dateModification: "15 nov. 2023",
    nombreUtilisateurs: 2,
    actif: true,
  },
  {
    id: "8",
    nom: "Store Edition",
    type: "Standard",
    dateCreation: "7 oct. 2023",
    dateModification: "3 nov. 2023",
    nombreUtilisateurs: 0,
    actif: true,
  },
  {
    id: "9",
    nom: "Sub-group Admin",
    type: "Admin",
    dateCreation: "3 nov. 2023",
    dateModification: "2 janv. 2024",
    nombreUtilisateurs: 0,
    actif: true,
  },
  {
    id: "10",
    nom: "RAR Settings",
    type: "Standard",
    dateCreation: "8 sept. 2023",
    dateModification: "8 sept. 2023",
    nombreUtilisateurs: 1,
    actif: true,
  },
];

interface ActiveFilter {
  type: "type" | "statut" | "nom";
  value: string;
  label: string;
}

const RolesPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter panel temporary state
  const [tempType, setTempType] = useState("");
  const [tempStatut, setTempStatut] = useState("");
  const [tempNom, setTempNom] = useState("");

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredRoles.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredRoles.map((r) => r.id));
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
    setTempType("");
    setTempStatut("");
    setTempNom("");
  };

  const applyFilters = () => {
    const newFilters: ActiveFilter[] = [];
    if (tempType) newFilters.push({ type: "type", value: tempType, label: `Type: ${tempType}` });
    if (tempStatut) newFilters.push({ type: "statut", value: tempStatut, label: `Statut: ${tempStatut === "actif" ? "Actif" : "Inactif"}` });
    if (tempNom) newFilters.push({ type: "nom", value: tempNom, label: `Nom: ${tempNom}` });
    setActiveFilters(newFilters);
    setFilterPanelOpen(false);
  };

  const filteredRoles = mockRoles.filter((role) => {
    const matchesSearch =
      searchQuery === "" ||
      role.nom.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = activeFilters.every((filter) => {
      switch (filter.type) {
        case "type":
          return role.type.toLowerCase() === filter.value.toLowerCase();
        case "statut":
          return filter.value === "actif" ? role.actif : !role.actif;
        case "nom":
          return role.nom.toLowerCase().includes(filter.value.toLowerCase());
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
            <h1 className="text-foreground">Rôles</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les rôles et permissions
            </p>
          </div>
          {selectedRows.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2 bg-[hsl(var(--coral-glow))] hover:bg-[hsl(18_100%_75%)] text-white self-start sm:self-auto">
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
                  Modifier les rôles
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 py-2.5">
                  <Edit className="h-4 w-4" />
                  Dupliquer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-3 py-2.5 text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            {/* Advanced Search Button */}
            <Button
              variant="outline"
              className={cn(
                "gap-2 shrink-0 hover:border-[hsl(var(--coral-glow))] hover:text-[hsl(var(--coral-glow))] hover:bg-[hsl(var(--coral-glow)/0.08)]",
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
                      checked={selectedRows.length === filteredRoles.length && filteredRoles.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="w-12">Statut</th>
                  <th>Rôle</th>
                  <th>Date de création</th>
                  <th>Date de dernière modification</th>
                  <th>Nombre d'utilisateurs</th>
                  <th className="w-12">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role, index) => (
                  <tr
                    key={role.id}
                    className={cn(
                      selectedRows.includes(role.id) && "bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td>
                      <Checkbox
                        checked={selectedRows.includes(role.id)}
                        onCheckedChange={() => toggleRow(role.id)}
                      />
                    </td>
                    <td>
                      <span
                        className={cn(
                          "w-2.5 h-2.5 rounded-full inline-block",
                          role.actif ? "bg-success" : "bg-muted-foreground"
                        )}
                      />
                    </td>
                    <td>
                      <span className="font-medium text-sm">{role.nom}</span>
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground">
                        {role.dateCreation || "—"}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground">
                        {role.dateModification}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm">{role.nombreUtilisateurs}</span>
                    </td>
                    <td>
                      {role.nombreUtilisateurs > 0 && (
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Info className="h-4 w-4 text-info" />
                        </button>
                      )}
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
                1 - {filteredRoles.length} / {filteredRoles.length}
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
            {/* Statut */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
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

            {/* Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={tempType || "all"} onValueChange={(v) => setTempType(v === "all" ? "" : v)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="exception">Exception</SelectItem>
                </SelectContent>
              </Select>
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
    </ConsoleLayout>
  );
};

export default RolesPage;