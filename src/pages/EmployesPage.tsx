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

interface Employe {
  id: string;
  prenom: string;
  nom: string;
  dateEmbauche: string;
  magasin: string;
  rappels: { envoyes: number; total: number };
  dernierRappel: string | null;
  documentsEnvoyes: boolean;
  dateEnvoiDocuments: string | null;
  statut: "accepte" | "en_attente" | "refuse";
}

const mockEmployes: Employe[] = [
  {
    id: "1",
    prenom: "Stephane",
    nom: "Boussely",
    dateEmbauche: "29 oct. 2025",
    magasin: "Paris Rivoli",
    rappels: { envoyes: 3, total: 3 },
    dernierRappel: "15/11/2025",
    documentsEnvoyes: true,
    dateEnvoiDocuments: "30/10/2025",
    statut: "accepte",
  },
  {
    id: "2",
    prenom: "Bob",
    nom: "Dupont",
    dateEmbauche: "1 nov. 2025",
    magasin: "Paris Alesia",
    rappels: { envoyes: 0, total: 3 },
    dernierRappel: null,
    documentsEnvoyes: false,
    dateEnvoiDocuments: null,
    statut: "accepte",
  },
];

const EmployesPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-foreground">Employés</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos {mockEmployes.length} employés recrutés
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Total employés
            </p>
            <p className="text-2xl font-display font-bold mt-1">{mockEmployes.length}</p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Acceptés
            </p>
            <p className="text-2xl font-display font-bold mt-1 text-success">
              {mockEmployes.filter((e) => e.statut === "accepte").length}
            </p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Documents envoyés
            </p>
            <p className="text-2xl font-display font-bold mt-1">
              {mockEmployes.filter((e) => e.documentsEnvoyes).length}
            </p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Rappels en attente
            </p>
            <p className="text-2xl font-display font-bold mt-1 text-warning">
              {mockEmployes.reduce((acc, e) => acc + (e.rappels.total - e.rappels.envoyes), 0)}
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
                placeholder="Rechercher un employé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-background">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="accepte">Accepté</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="refuse">Refusé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exporter</span>
          </Button>
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-12">
                    <Checkbox
                      checked={selectedRows.length === mockEmployes.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th>Statut</th>
                  <th>Employé</th>
                  <th>Date d'embauche</th>
                  <th>Magasin</th>
                  <th>Rappels</th>
                  <th>Documents</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {mockEmployes.map((employe, index) => (
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
                          employe.statut === "accepte"
                            ? "status-recruited"
                            : employe.statut === "en_attente"
                            ? "status-invited"
                            : "status-rejected"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {employe.statut === "accepte"
                          ? "Accepté"
                          : employe.statut === "en_attente"
                          ? "En attente"
                          : "Refusé"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                          <UserCheck className="h-4 w-4 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {employe.prenom} {employe.nom}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm">{employe.dateEmbauche}</span>
                    </td>
                    <td>
                      <span className="text-sm">{employe.magasin}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-medium",
                          employe.rappels.envoyes === employe.rappels.total
                            ? "text-success"
                            : "text-warning"
                        )}>
                          {employe.rappels.envoyes}/{employe.rappels.total}
                        </span>
                        {employe.dernierRappel && (
                          <span className="text-2xs text-muted-foreground">
                            ({employe.dernierRappel})
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      {employe.documentsEnvoyes ? (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-success" />
                          <span className="text-sm text-success">Envoyés</span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          Envoyer
                        </Button>
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
                            Voir le profil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Envoyer rappel
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Désactiver
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
              {mockEmployes.length} employé{mockEmployes.length > 1 ? "s" : ""}
            </span>
            <span className="text-sm text-muted-foreground">1 - 2 / 2</span>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default EmployesPage;
