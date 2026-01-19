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
  ChevronUp,
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

const EmployesPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchPrenom, setSearchPrenom] = useState("");
  const [searchNom, setSearchNom] = useState("");
  const [searchMagasin, setSearchMagasin] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchOpen, setSearchOpen] = useState(true);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [includeImported, setIncludeImported] = useState(false);

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

  const filteredEmployes = mockEmployes.filter((employe) => {
    const matchesPrenom = searchPrenom === "" || employe.prenom.toLowerCase().includes(searchPrenom.toLowerCase());
    const matchesNom = searchNom === "" || employe.nom.toLowerCase().includes(searchNom.toLowerCase());
    const matchesMagasin = searchMagasin === "" || employe.magasin.toLowerCase().includes(searchMagasin.toLowerCase());
    const matchesStatus = statusFilter === "all" || employe.statut === statusFilter;
    return matchesPrenom && matchesNom && matchesMagasin && matchesStatus;
  });

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
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exporter</span>
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
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={searchPrenom}
                    onChange={(e) => setSearchPrenom(e.target.value)}
                    className="input-field w-36"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={searchNom}
                    onChange={(e) => setSearchNom(e.target.value)}
                    className="input-field w-36"
                  />
                  <input
                    type="text"
                    placeholder="Nom point de vente"
                    value={searchMagasin}
                    onChange={(e) => setSearchMagasin(e.target.value)}
                    className="input-field w-44"
                  />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-input bg-background">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Période d'embauche</span>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32 bg-background">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">Statut</SelectItem>
                      <SelectItem value="accepte">Accepté</SelectItem>
                      <SelectItem value="valide">Validé</SelectItem>
                      <SelectItem value="embauche">Embauché</SelectItem>
                      <SelectItem value="archive">Archivé</SelectItem>
                    </SelectContent>
                  </Select>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={includeArchived}
                      onCheckedChange={(checked) => setIncludeArchived(!!checked)}
                    />
                    Inclure archivés
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={includeImported}
                      onCheckedChange={(checked) => setIncludeImported(!!checked)}
                    />
                    Importé
                  </label>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Status Info */}
        <Collapsible>
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-info" />
                  <span className="font-medium">Statuts employés</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-5 pb-5 border-t border-border pt-4 space-y-2 text-sm">
                <p><strong className="text-success">Accepté</strong>: Candidat accepté commençant le processus de préintégration (action manuelle par un recruteur)</p>
                <p><strong className="text-info">Validé</strong>: Candidat dont les informations ont été mises à disposition de votre SIRH interne (action automatisée par SoWhat.ai)</p>
                <p><strong className="text-primary">Embauché</strong>: Candidat ayant signé un contrat de travail et officiellement embauché (action manuelle d'un recruteur)</p>
                <p><strong className="text-muted-foreground">Archivé</strong>: Candidat n'ayant pas fourni les documents et/ou ne s'étant jamais présenté</p>
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
    </ConsoleLayout>
  );
};

export default EmployesPage;
