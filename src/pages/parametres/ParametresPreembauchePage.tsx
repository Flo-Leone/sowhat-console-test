import { useState } from "react";
import { Plus, Upload, ChevronDown, ChevronUp, FileText, X } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const marches = ["Autoroutes", "Aéroports", "Gare", "Loisirs", "Siège social"];
const entitesLegales = [
  "832 AREAS DATA", "730 FINANCIERE PAX", "662 SIRESTCO", "658 S2EF", 
  "652 SMBPC", "650 RESTAIRE", "599 SRAM", "597 AREAS SERVICES",
  "571 ECP FRANCE", "561 AREAS OPERATIONS DE RESTAURATION"
];
const conventions = [
  "Automobile L", "CCN DES H.C.R.", "CCN CAFETERIAS & ASS", 
  "CCN SYNTEC", "CCN REST. RAPIDE"
];
const statuts = [
  "214 HRC-Agent de maîtrise", "214 HRC-Cadre", "214 HRC-Employé",
  "296 ACTAL-Agent de maîtrise", "296 ACTAL-Cadre", "296 ACTAL-Employé"
];

interface Document {
  id: string;
  nom: string;
  type: string;
}

const mockDocuments: Document[] = [];

const ParametresPreembauchePage = () => {
  const [activeTab, setActiveTab] = useState("config");
  const [preboardingActive, setPreboardingActive] = useState(false);
  const [maxDocuments, setMaxDocuments] = useState("50");
  const [configOpen, setConfigOpen] = useState(true);
  
  // Critères
  const [selectedMarches, setSelectedMarches] = useState<string[]>([]);
  const [selectedEntites, setSelectedEntites] = useState<string[]>([]);
  const [selectedConventions, setSelectedConventions] = useState<string[]>([]);
  const [selectedStatuts, setSelectedStatuts] = useState<string[]>([]);

  const toggleCriteria = (list: string[], setList: (v: string[]) => void, value: string) => {
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-foreground">Paramètres</h1>
            <p className="text-muted-foreground mt-1">
              Configuration pré-embauche
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/50">
            <TabsTrigger 
              value="config" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Configuration générale
            </TabsTrigger>
            <TabsTrigger 
              value="documents-employes"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Documents demandés aux employés
            </TabsTrigger>
            <TabsTrigger 
              value="documents-entreprise"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Documents de l'entreprise
            </TabsTrigger>
          </TabsList>

          {/* Configuration générale */}
          <TabsContent value="config" className="mt-6">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Collapsible open={configOpen} onOpenChange={setConfigOpen}>
                <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <h2 className="font-semibold">Paramètres généraux pré-embauche</h2>
                  {configOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 space-y-6 border-t border-border pt-4">
                    {/* First row */}
                    <div className="flex items-center gap-8">
                      <label className="flex items-center gap-3">
                        <Checkbox 
                          checked={preboardingActive}
                          onCheckedChange={(checked) => setPreboardingActive(!!checked)}
                        />
                        <span className="text-sm">Preboarding module activated</span>
                      </label>
                      
                      <div className="flex items-center gap-3">
                        <Label className="text-sm text-muted-foreground">Maximum documents compagnie:</Label>
                        <Input 
                          value={maxDocuments}
                          onChange={(e) => setMaxDocuments(e.target.value)}
                          className="w-20"
                        />
                      </div>
                    </div>

                    {/* Documents section */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">Documents</h3>
                        <p className="text-sm text-muted-foreground">
                          Liste des documents que cette entreprise peut demander à l'employé
                        </p>
                      </div>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Document types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Pièce d'identité</SelectItem>
                          <SelectItem value="rib">RIB</SelectItem>
                          <SelectItem value="cv">CV</SelectItem>
                          <SelectItem value="diplome">Diplôme</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Critères */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Critères</h3>
                        <p className="text-sm text-muted-foreground">
                          Liste des critères qu'un recruteur peut attribuer à un employé
                        </p>
                      </div>

                      {/* Marché */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <Checkbox />
                          <span className="text-sm font-medium">Marché</span>
                        </label>
                        <div className="ml-6 flex flex-wrap gap-x-6 gap-y-2">
                          {marches.map((marche) => (
                            <label key={marche} className="flex items-center gap-2">
                              <Checkbox 
                                checked={selectedMarches.includes(marche)}
                                onCheckedChange={() => toggleCriteria(selectedMarches, setSelectedMarches, marche)}
                              />
                              <span className="text-sm">{marche}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Entité légale */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <Checkbox />
                          <span className="text-sm font-medium">Entité légale</span>
                        </label>
                        <div className="ml-6 flex flex-wrap gap-x-4 gap-y-2">
                          {entitesLegales.map((entite) => (
                            <label key={entite} className="flex items-center gap-2">
                              <Checkbox 
                                checked={selectedEntites.includes(entite)}
                                onCheckedChange={() => toggleCriteria(selectedEntites, setSelectedEntites, entite)}
                              />
                              <span className="text-sm">{entite}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Convention collective */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <Checkbox />
                          <span className="text-sm font-medium">Convention collective</span>
                        </label>
                        <div className="ml-6 flex flex-wrap gap-x-6 gap-y-2">
                          {conventions.map((convention) => (
                            <label key={convention} className="flex items-center gap-2">
                              <Checkbox 
                                checked={selectedConventions.includes(convention)}
                                onCheckedChange={() => toggleCriteria(selectedConventions, setSelectedConventions, convention)}
                              />
                              <span className="text-sm">{convention}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Statut */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <Checkbox />
                          <span className="text-sm font-medium">Statut</span>
                        </label>
                        <div className="ml-6 flex flex-wrap gap-x-4 gap-y-2">
                          {statuts.map((statut) => (
                            <label key={statut} className="flex items-center gap-2">
                              <Checkbox 
                                checked={selectedStatuts.includes(statut)}
                                onCheckedChange={() => toggleCriteria(selectedStatuts, setSelectedStatuts, statut)}
                              />
                              <span className="text-sm">{statut}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TabsContent>

          {/* Documents demandés aux employés */}
          <TabsContent value="documents-employes" className="mt-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-semibold text-lg">Documents demandés aux employés</h2>
              <p className="text-muted-foreground">
                Ajouter des critères aux documents spécifiés.
              </p>
              <Button className="btn-primary gap-2">
                Sauvegarder
              </Button>
            </div>
          </TabsContent>

          {/* Documents de l'entreprise */}
          <TabsContent value="documents-entreprise" className="mt-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-semibold text-lg">Documents de l'entreprise (0/50)</h2>
              
              <div className="flex items-center gap-3 p-4 border border-dashed border-border rounded-lg bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">Ajouter de nouveaux documents</span>
              </div>
              
              <Button className="btn-primary gap-2">
                Sauvegarder
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConsoleLayout>
  );
};

export default ParametresPreembauchePage;
