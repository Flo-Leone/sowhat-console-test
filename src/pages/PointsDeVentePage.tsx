import { useState } from "react";
import {
  Search,
  Download,
  Plus,
  MoreHorizontal,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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

const PointsDeVentePage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const toggleSelectAll = () => {
    if (selectedRows.length === mockPointsDeVente.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockPointsDeVente.map((p) => p.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const filteredPoints = mockPointsDeVente.filter((point) => {
    const matchesSearch =
      point.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.codePostal.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || point.statut === statusFilter;
    return matchesSearch && matchesStatus;
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
          <Button className="btn-primary gap-2 self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Ajouter un point de vente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Total points de vente
            </p>
            <p className="text-2xl font-display font-bold mt-1">{mockPointsDeVente.length}</p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Actifs
            </p>
            <p className="text-2xl font-display font-bold mt-1 text-success">
              {mockPointsDeVente.filter((p) => p.statut === "actif").length}
            </p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Comptes connectés
            </p>
            <p className="text-2xl font-display font-bold mt-1">
              {mockPointsDeVente.filter((p) => p.compteConnecte).length}
            </p>
          </div>
          <div className="metric-card">
            <p className="text-2xs font-medium uppercase tracking-wider text-muted-foreground">
              Zones couvertes
            </p>
            <p className="text-2xl font-display font-bold mt-1">
              {new Set(mockPointsDeVente.map((p) => p.zone)).size}
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
                placeholder="Rechercher un point de vente..."
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
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Télécharger CSV</span>
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
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-sm">{point.nom}</span>
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-border bg-muted/30">
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
    </ConsoleLayout>
  );
};

export default PointsDeVentePage;
