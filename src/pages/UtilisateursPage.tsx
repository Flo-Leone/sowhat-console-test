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

  const toggleSelectAll = () => {
    if (selectedRows.length === mockUtilisateurs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockUtilisateurs.map((u) => u.id));
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
            <h1 className="text-foreground">Utilisateurs</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les accès à votre console
            </p>
          </div>
          <Button className="btn-primary gap-2 self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Inviter un utilisateur
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Total utilisateurs
            </p>
            <p className="text-2xl font-display font-bold mt-1">{mockUtilisateurs.length}</p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Administrateurs
            </p>
            <p className="text-2xl font-display font-bold mt-1 text-destructive">
              {mockUtilisateurs.filter((u) => u.role === "admin").length}
            </p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Managers
            </p>
            <p className="text-2xl font-display font-bold mt-1 text-info">
              {mockUtilisateurs.filter((u) => u.role === "manager").length}
            </p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Actifs
            </p>
            <p className="text-2xl font-display font-bold mt-1 text-success">
              {mockUtilisateurs.filter((u) => u.actif).length}
            </p>
          </div>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-36 bg-background">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="recruteur">Recruteur</SelectItem>
              </SelectContent>
            </Select>
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
                      checked={selectedRows.length === mockUtilisateurs.length}
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
                {mockUtilisateurs.map((utilisateur, index) => (
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
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
            <span className="text-sm text-muted-foreground">
              {mockUtilisateurs.length} utilisateur{mockUtilisateurs.length > 1 ? "s" : ""}
            </span>
            <span className="text-sm text-muted-foreground">1 - 2 / 2</span>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default UtilisateursPage;
