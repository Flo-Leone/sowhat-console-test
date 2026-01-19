import { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Briefcase,
  Edit,
  Copy,
  Trash2,
  Eye,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Send,
  Archive,
} from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Offre {
  id: string;
  dateCreation: string;
  reference: string;
  pointVente: string;
  profession: string;
  marque: string;
  nbCandidatures: number;
  statut: "active" | "pourvue" | "archivee";
}

const mockOffres: Offre[] = [
  {
    id: "1",
    dateCreation: "13/10/2025",
    reference: "GCUD56786",
    pointVente: "",
    profession: "Equipier polyvalent",
    marque: "Gallika",
    nbCandidatures: 0,
    statut: "active",
  },
  {
    id: "2",
    dateCreation: "13/10/2025",
    reference: "GCUD56786",
    pointVente: "Point de vente Paris Alesia",
    profession: "Equipier polyvalent",
    marque: "Gallika",
    nbCandidatures: 0,
    statut: "active",
  },
];

const mockModeles = [
  {
    id: "1",
    nom: "Equipier polyvalent - Standard",
    profession: "Equipier polyvalent",
    utilisations: 12,
  },
  {
    id: "2",
    nom: "Manager - Standard",
    profession: "Manager",
    utilisations: 5,
  },
];

const OffresEmploiPage = () => {
  const [activeTab, setActiveTab] = useState("en-cours");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === mockOffres.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockOffres.map((o) => o.id));
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
            <h1 className="text-foreground">Offres d'emploi</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos offres et modèles
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
                    Mettre à jour
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 py-2.5">
                    <Send className="h-4 w-4" />
                    Dupliquer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-3 py-2.5 text-muted-foreground">
                    <Archive className="h-4 w-4" />
                    Archiver
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button className="btn-primary gap-2">
              <Plus className="h-4 w-4" />
              Créer une offre
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="en-cours" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
              Offres en cours ({mockOffres.length})
            </TabsTrigger>
            <TabsTrigger value="demandes" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
              Demandes d'offres
            </TabsTrigger>
            <TabsTrigger value="modeles" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
              Modèles d'offres ({mockModeles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="en-cours" className="mt-6">
            <div className="bg-card/50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="w-12">
                        <Checkbox
                          checked={selectedRows.length === mockOffres.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </th>
                      <th>Date de création</th>
                      <th>Référence</th>
                      <th>Point de vente</th>
                      <th>Profession</th>
                      <th>Marque</th>
                      <th>Candidatures</th>
                      <th className="w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOffres.map((offre, index) => (
                      <tr 
                        key={offre.id} 
                        style={{ animationDelay: `${index * 50}ms` }}
                        className={cn(
                          selectedRows.includes(offre.id) && "bg-primary/5"
                        )}
                      >
                        <td onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedRows.includes(offre.id)}
                            onCheckedChange={() => toggleRow(offre.id)}
                          />
                        </td>
                        <td>
                          <span className="text-sm text-muted-foreground">
                            {offre.dateCreation}
                          </span>
                        </td>
                        <td>
                          <span className="font-mono text-sm font-medium">
                            {offre.reference}
                          </span>
                        </td>
                        <td>
                          <span className="text-sm">
                            {offre.pointVente || (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{offre.profession}</span>
                          </div>
                        </td>
                        <td>
                          <span className="tag tag-primary">{offre.marque}</span>
                        </td>
                        <td>
                          <span className={cn(
                            "text-sm font-medium",
                            offre.nbCandidatures > 0 ? "text-success" : "text-muted-foreground"
                          )}>
                            {offre.nbCandidatures}
                          </span>
                        </td>
                        <td>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-card border-border shadow-elevated">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Voir l'offre
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Dupliquer
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
            </div>
          </TabsContent>

          <TabsContent value="demandes" className="mt-6">
            <div className="bg-card rounded-xl shadow-card border border-border p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                Aucune demande en attente
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Les demandes d'offres de vos points de vente apparaîtront ici.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="modeles" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockModeles.map((modele) => (
                <div
                  key={modele.id}
                  className="bg-card rounded-xl shadow-card border border-border p-5 hover:shadow-elevated transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border shadow-elevated">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Dupliquer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-semibold mt-4">{modele.nom}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {modele.profession}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {modele.utilisations} utilisations
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              ))}

              {/* Add template card */}
              <button className="bg-muted/50 rounded-xl border-2 border-dashed border-border p-5 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center min-h-[180px] group">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="font-medium mt-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  Créer un modèle
                </span>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConsoleLayout>
  );
};

export default OffresEmploiPage;
