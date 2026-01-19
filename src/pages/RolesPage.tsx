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
  ChevronUp,
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

const RolesPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statutFilter, setStatutFilter] = useState("all");
  const [searchNom, setSearchNom] = useState("");

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

  const filteredRoles = mockRoles.filter((role) => {
    const matchesType = typeFilter === "all" || role.type.toLowerCase() === typeFilter;
    const matchesStatut = statutFilter === "all" || (statutFilter === "actif" ? role.actif : !role.actif);
    const matchesNom = searchNom === "" || role.nom.toLowerCase().includes(searchNom.toLowerCase());
    return matchesType && matchesStatut && matchesNom;
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
                  <Select value={statutFilter} onValueChange={setStatutFilter}>
                    <SelectTrigger className="w-32 bg-background">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">Actif</SelectItem>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="inactif">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-32 bg-background">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">Type</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="exception">Exception</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Nom"
                      value={searchNom}
                      onChange={(e) => setSearchNom(e.target.value)}
                      className="input-field pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Table Controls */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Rôles
          </div>
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

        {/* Data Table */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
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
    </ConsoleLayout>
  );
};

export default RolesPage;
