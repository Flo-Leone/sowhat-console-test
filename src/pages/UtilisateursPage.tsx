import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  MoreHorizontal,
  Building2,
  Mail,
  Shield,
  Edit,
  Trash2,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  RefreshCw,
  Send,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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

interface Utilisateur {
  id: string;
  idExterne: string;
  email: string;
  prenom: string;
  nom: string;
  fonctionLegale: string;
  role: "admin" | "manager" | "recruteur";
  pointsVente: string[];
  actif: boolean;
}

const mockUtilisateurs: Utilisateur[] = [
  {
    id: "1",
    idExterne: "florian.guerrier+gallika@sowhat.ai",
    email: "florian.guerrier+gallika@sowhat.ai",
    prenom: "Florian",
    nom: "Guerrier",
    fonctionLegale: "Directeur RH",
    role: "admin",
    pointsVente: ["IMMO de France [HQ]"],
    actif: true,
  },
  {
    id: "2",
    idExterne: "stephane+gallika@sowhat.ai",
    email: "stephane+gallika@sowhat.ai",
    prenom: "Admin",
    nom: "SW.AI",
    fonctionLegale: "Administrateur",
    role: "admin",
    pointsVente: ["Gallika [HQ]"],
    actif: true,
  },
];

const roleLabels = {
  admin: "Administrateur",
  manager: "Manager",
  recruteur: "Recruteur",
};

const roleColors = {
  admin: "bg-destructive/10 text-destructive",
  manager: "bg-info/10 text-info",
  recruteur: "bg-muted text-muted-foreground",
};

interface ActiveFilter {
  type: "role" | "search" | "statut";
  value: string;
  label: string;
}

const UtilisateursPage = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter panel temporary state
  const [tempRole, setTempRole] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [tempStatut, setTempStatut] = useState("");

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredUtilisateurs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredUtilisateurs.map((u) => u.id));
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
    setTempRole("");
    setTempSearch("");
    setTempStatut("");
  };

  const applyFilters = () => {
    const newFilters: ActiveFilter[] = [];
    if (tempRole) newFilters.push({ type: "role", value: tempRole, label: `Rôle: ${roleLabels[tempRole as keyof typeof roleLabels]}` });
    if (tempSearch) newFilters.push({ type: "search", value: tempSearch, label: `Recherche: ${tempSearch}` });
    if (tempStatut) newFilters.push({ type: "statut", value: tempStatut, label: `Statut: ${tempStatut === "actif" ? "Actif" : "Inactif"}` });
    setActiveFilters(newFilters);
    setFilterPanelOpen(false);
  };

  const filteredUtilisateurs = mockUtilisateurs.filter((utilisateur) => {
    const matchesSearch = searchQuery === "" || 
      utilisateur.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      utilisateur.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      utilisateur.nom.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = activeFilters.every((filter) => {
      switch (filter.type) {
        case "role":
          return utilisateur.role === filter.value;
        case "search":
          return utilisateur.email.toLowerCase().includes(filter.value.toLowerCase()) ||
            utilisateur.prenom.toLowerCase().includes(filter.value.toLowerCase()) ||
            utilisateur.nom.toLowerCase().includes(filter.value.toLowerCase());
        case "statut":
          return filter.value === "actif" ? utilisateur.actif : !utilisateur.actif;
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
            <h1 className="text-foreground">Liste d'utilisateurs</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les accès à votre console
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Actions Button - appears when rows are selected */}
            {selectedRows.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-lavender hover:bg-lavender/90 text-white">
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
                    Modifier les droits
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <Send className="h-4 w-4" />
                    Renvoyer invitation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-3 py-2.5 text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button className="btn-primary gap-2" onClick={() => navigate("/utilisateurs/nouveau")}>
              <Plus className="h-4 w-4" />
              Inviter un utilisateur
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            {/* Advanced Search Button */}
            <Button
              variant="outline"
              className={cn(
                "gap-2 shrink-0",
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
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-12">
                    <Checkbox
                      checked={selectedRows.length === filteredUtilisateurs.length && filteredUtilisateurs.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Points de vente</th>
                  <th>Statut</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUtilisateurs.map((utilisateur, index) => (
                  <tr
                    key={utilisateur.id}
                    className={cn(
                      "cursor-pointer",
                      selectedRows.includes(utilisateur.id) && "bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => navigate(`/utilisateurs/${utilisateur.id}/modifier`)}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedRows.includes(utilisateur.id)}
                        onCheckedChange={() => toggleRow(utilisateur.id)}
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-lavender/15 border border-lavender/25 text-sm font-medium text-foreground">
                          {utilisateur.prenom} {utilisateur.nom}
                        </span>
                        {utilisateur.fonctionLegale && (
                          <span className="text-2xs text-muted-foreground">
                            {utilisateur.fonctionLegale}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {utilisateur.email}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          roleColors[utilisateur.role]
                        )}
                      >
                        <Shield className="h-3 w-3" />
                        {roleLabels[utilisateur.role]}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">
                          {utilisateur.pointsVente.join(", ")}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={cn(
                          "status-badge",
                          utilisateur.actif
                            ? "status-recruited"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {utilisateur.actif ? "Actif" : "Inactif"}
                      </span>
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
                          <DropdownMenuItem onClick={() => navigate(`/utilisateurs/${utilisateur.id}/modifier`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir le profil
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/utilisateurs/${utilisateur.id}/modifier`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier les droits
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Renvoyer invitation
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-border bg-muted/30">
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
                1 - {filteredUtilisateurs.length} / {filteredUtilisateurs.length}
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
            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Rôle</label>
              <Select value={tempRole || "all"} onValueChange={(v) => setTempRole(v === "all" ? "" : v)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Tous les rôles" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="recruteur">Recruteur</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <input
                type="text"
                placeholder="Nom, prénom ou email..."
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
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

export default UtilisateursPage;