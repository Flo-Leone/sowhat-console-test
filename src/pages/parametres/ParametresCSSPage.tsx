import { useState } from "react";
import { Plus, Eye, MoreHorizontal, Edit, Trash2 } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface CSSConfig {
  id: string;
  nom: string;
  couleurPrimaire: string;
  couleurSecondaire: string;
  marque: string;
  actif: boolean;
}

const mockCSSConfigs: CSSConfig[] = [
  {
    id: "1",
    nom: "CSS Gallika",
    couleurPrimaire: "#2e6cb2",
    couleurSecondaire: "#ffffff",
    marque: "Gallika",
    actif: true,
  },
];

const ParametresCSSPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === mockCSSConfigs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockCSSConfigs.map((c) => c.id));
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
        <div className="flex items-start justify-between">
          <div>
            <h1>Paramètres CSS</h1>
            <p className="text-muted-foreground mt-1">
              Gestion des styles de marque
            </p>
          </div>
          <Button className="btn-primary btn-sm gap-2">
            <Plus className="h-4 w-4" />
            Créer CSS
          </Button>
        </div>

        {/* Main Content Card */}
        <div className="bg-card rounded-xl overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-border/50">
            <h2>Configurations CSS</h2>
          </div>

          {/* CSS Table */}
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-12">
                    <Checkbox
                      checked={selectedRows.length === mockCSSConfigs.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="w-12">Statut</th>
                  <th>Nom</th>
                  <th>Couleur primaire</th>
                  <th>Couleur secondaire</th>
                  <th>Marque</th>
                  <th className="w-16">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCSSConfigs.map((config) => (
                  <tr
                    key={config.id}
                    className={cn(
                      selectedRows.includes(config.id) && "bg-primary/5"
                    )}
                  >
                    <td>
                      <Checkbox
                        checked={selectedRows.includes(config.id)}
                        onCheckedChange={() => toggleRow(config.id)}
                      />
                    </td>
                    <td>
                      <span
                        className={cn(
                          "w-2.5 h-2.5 rounded-full inline-block",
                          config.actif ? "bg-success" : "bg-muted"
                        )}
                      />
                    </td>
                    <td>
                      <span className="font-semibold text-foreground">
                        {config.nom}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded border border-border shrink-0"
                          style={{ backgroundColor: config.couleurPrimaire }}
                        />
                        <span className="text-sm text-muted-foreground font-mono">
                          {config.couleurPrimaire}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded border border-border shrink-0"
                          style={{ backgroundColor: config.couleurSecondaire }}
                        />
                        <span className="text-sm text-muted-foreground font-mono">
                          {config.couleurSecondaire}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm">{config.marque}</span>
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
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            Prévisualiser
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
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
      </div>
    </ConsoleLayout>
  );
};

export default ParametresCSSPage;
