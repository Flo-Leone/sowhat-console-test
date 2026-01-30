import { useState } from "react";
import { Plus, Eye, MoreHorizontal, Edit, Trash2, ChevronDown } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
interface CSSConfig {
  id: string;
  nom: string;
  couleurPrimaire: string;
  couleurSecondaire: string;
  marque: string;
  actif: boolean;
}
const mockCSSConfigs: CSSConfig[] = [{
  id: "1",
  nom: "CSS Gallika",
  couleurPrimaire: "#2e6cb2",
  couleurSecondaire: "#ffffff",
  marque: "Gallika",
  actif: true
}];
const ParametresCSSPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const toggleSelectAll = () => {
    if (selectedRows.length === mockCSSConfigs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockCSSConfigs.map(c => c.id));
    }
  };
  const toggleRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };
  return <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-foreground">Paramètres</h1>
            <p className="text-muted-foreground mt-1">
              Configuration de l'application
            </p>
          </div>
        </div>

        {/* Marque Section */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold">Marque</h2>
          </div>
          
          <Tabs defaultValue="css" className="w-full">
            
            
            <TabsContent value="css" className="p-6 pt-4">
              <div className="space-y-4">
                <Button className="btn-primary gap-2">
                  <Plus className="h-4 w-4" />
                  Créer CSS
                </Button>

                {/* CSS Table */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="w-12">
                          <Checkbox checked={selectedRows.length === mockCSSConfigs.length} onCheckedChange={toggleSelectAll} />
                        </th>
                        <th className="w-12"></th>
                        <th>Nom</th>
                        <th>Couleur primaire</th>
                        <th>Couleur secondaire</th>
                        <th>Marque</th>
                        <th className="w-20">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCSSConfigs.map(config => <tr key={config.id} className={cn(selectedRows.includes(config.id) && "bg-primary/5")}>
                          <td>
                            <Checkbox checked={selectedRows.includes(config.id)} onCheckedChange={() => toggleRow(config.id)} />
                          </td>
                          <td>
                            <span className={cn("w-2.5 h-2.5 rounded-full inline-block", config.actif ? "bg-success" : "bg-muted")} />
                          </td>
                          <td className="font-medium">{config.nom}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded border border-border" style={{
                            backgroundColor: config.couleurPrimaire
                          }} />
                              <span className="text-sm text-muted-foreground font-mono">
                                {config.couleurPrimaire}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded border border-border" style={{
                            backgroundColor: config.couleurSecondaire
                          }} />
                              <span className="text-sm text-muted-foreground font-mono">
                                {config.couleurSecondaire}
                              </span>
                            </div>
                          </td>
                          <td>{config.marque}</td>
                          <td>
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ConsoleLayout>;
};
export default ParametresCSSPage;