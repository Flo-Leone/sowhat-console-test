import { useState } from "react";
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
  ChevronUp,
  RefreshCw,
  Send,
  Archive,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

const UtilisateursPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchOpen, setSearchOpen] = useState(true);

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

  const filteredUtilisateurs = mockUtilisateurs.filter((utilisateur) => {
    const matchesSearch = searchQuery === "" || 
      utilisateur.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      utilisateur.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      utilisateur.nom.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || utilisateur.role === roleFilter;
    return matchesSearch && matchesRole;
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
            <Button className="btn-primary gap-2">
              <Plus className="h-4 w-4" />
              Inviter un utilisateur
            </Button>
          </div>
        </div>

        {/* Advanced Search */}
        <Collapsible open={searchOpen} onOpenChange={setSearchOpen}>
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Recherche avancée</span>
                </div>
                {searchOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-5 pb-5 border-t border-border pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-36 bg-background">
                      <SelectValue placeholder="Tous les rôles" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">Tous les rôles</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="recruteur">Recruteur</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Rechercher par nom ou email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

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
                      selectedRows.includes(utilisateur.id) && "bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td>
                      <Checkbox
                        checked={selectedRows.includes(utilisateur.id)}
                        onCheckedChange={() => toggleRow(utilisateur.id)}
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center text-sm font-semibold text-golden-700">
                          {utilisateur.prenom[0]}
                          {utilisateur.nom[0]}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {utilisateur.prenom} {utilisateur.nom}
                          </p>
                          {utilisateur.fonctionLegale && (
                            <p className="text-2xs text-muted-foreground">
                              {utilisateur.fonctionLegale}
                            </p>
                          )}
                        </div>
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
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir le profil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
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
    </ConsoleLayout>
  );
};

export default UtilisateursPage;
