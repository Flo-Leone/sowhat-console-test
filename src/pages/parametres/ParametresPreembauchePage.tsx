import { useState } from "react";
import { Upload, FileText, Save, Settings, FolderOpen, Building2 } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const marches = ["Autoroutes", "Aéroports", "Gare", "Loisirs", "Siège social"];
const entitesLegales = [
  "832 AREAS DATA",
  "730 FINANCIERE PAX",
  "662 SIRESTCO",
  "658 S2EF",
  "652 SMBPC",
  "650 RESTAIRE",
  "599 SRAM",
  "597 AREAS SERVICES",
  "571 ECP FRANCE",
  "561 AREAS OPERATIONS DE RESTAURATION",
];
const conventions = [
  "Automobile L",
  "CCN DES H.C.R.",
  "CCN CAFETERIAS & ASS",
  "CCN SYNTEC",
  "CCN REST. RAPIDE",
];
const statuts = [
  "214 HRC-Agent de maîtrise",
  "214 HRC-Cadre",
  "214 HRC-Employé",
  "296 ACTAL-Agent de maîtrise",
  "296 ACTAL-Cadre",
  "296 ACTAL-Employé",
];

const ParametresPreembauchePage = () => {
  const [activeTab, setActiveTab] = useState("config");
  const [preboardingActive, setPreboardingActive] = useState(false);
  const [maxDocuments, setMaxDocuments] = useState("50");

  // Critères
  const [selectedMarches, setSelectedMarches] = useState<string[]>([]);
  const [selectedEntites, setSelectedEntites] = useState<string[]>([]);
  const [selectedConventions, setSelectedConventions] = useState<string[]>([]);
  const [selectedStatuts, setSelectedStatuts] = useState<string[]>([]);

  const toggleCriteria = (
    list: string[],
    setList: (v: string[]) => void,
    value: string
  ) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1>Paramètres Pré-embauche</h1>
          <p className="text-muted-foreground mt-1">
            Configuration du module de pré-embauche
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger
              value="config"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Settings className="h-4 w-4" />
              Configuration
            </TabsTrigger>
            <TabsTrigger
              value="documents-employes"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="h-4 w-4" />
              Documents employés
            </TabsTrigger>
            <TabsTrigger
              value="documents-entreprise"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Building2 className="h-4 w-4" />
              Documents entreprise
            </TabsTrigger>
          </TabsList>

          {/* Configuration générale */}
          <TabsContent value="config" className="mt-6 space-y-6">
            {/* Paramètres généraux */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2>Paramètres généraux</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Activation et limites du module
                </p>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={preboardingActive}
                      onCheckedChange={(checked) => setPreboardingActive(!!checked)}
                    />
                    <span className="text-sm font-medium">Module pré-embauche activé</span>
                  </label>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Maximum documents :</span>
                    <Input
                      value={maxDocuments}
                      onChange={(e) => setMaxDocuments(e.target.value)}
                      className="w-20"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Types de documents */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2>Types de documents</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Documents pouvant être demandés aux employés
                </p>
              </div>

              <div className="p-6">
                <Select>
                  <SelectTrigger className="w-full max-w-md">
                    <SelectValue placeholder="Sélectionner les types de documents" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Pièce d'identité</SelectItem>
                    <SelectItem value="rib">RIB</SelectItem>
                    <SelectItem value="cv">CV</SelectItem>
                    <SelectItem value="diplome">Diplôme</SelectItem>
                    <SelectItem value="casier">Extrait casier judiciaire</SelectItem>
                    <SelectItem value="vitale">Carte vitale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Critères */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2>Critères de sélection</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Critères attribuables aux employés par les recruteurs
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Marché */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Checkbox />
                    Marché
                  </h3>
                  <div className="ml-6 flex flex-wrap gap-x-6 gap-y-2">
                    {marches.map((marche) => (
                      <label key={marche} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedMarches.includes(marche)}
                          onCheckedChange={() =>
                            toggleCriteria(selectedMarches, setSelectedMarches, marche)
                          }
                        />
                        <span className="text-sm">{marche}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Entité légale */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Checkbox />
                    Entité légale
                  </h3>
                  <div className="ml-6 flex flex-wrap gap-x-4 gap-y-2">
                    {entitesLegales.map((entite) => (
                      <label key={entite} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedEntites.includes(entite)}
                          onCheckedChange={() =>
                            toggleCriteria(selectedEntites, setSelectedEntites, entite)
                          }
                        />
                        <span className="text-sm">{entite}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Convention collective */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Checkbox />
                    Convention collective
                  </h3>
                  <div className="ml-6 flex flex-wrap gap-x-6 gap-y-2">
                    {conventions.map((convention) => (
                      <label key={convention} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedConventions.includes(convention)}
                          onCheckedChange={() =>
                            toggleCriteria(selectedConventions, setSelectedConventions, convention)
                          }
                        />
                        <span className="text-sm">{convention}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Statut */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Checkbox />
                    Statut
                  </h3>
                  <div className="ml-6 flex flex-wrap gap-x-4 gap-y-2">
                    {statuts.map((statut) => (
                      <label key={statut} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedStatuts.includes(statut)}
                          onCheckedChange={() =>
                            toggleCriteria(selectedStatuts, setSelectedStatuts, statut)
                          }
                        />
                        <span className="text-sm">{statut}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end">
                <Button className="btn-primary gap-2">
                  <Save className="h-4 w-4" />
                  Sauvegarder
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Documents demandés aux employés */}
          <TabsContent value="documents-employes" className="mt-6">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2>Documents demandés aux employés</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Configurez les critères associés à chaque type de document
                </p>
              </div>

              <div className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <FolderOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">Aucun document configuré</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Commencez par ajouter des critères aux documents
                  </p>
                  <Button className="btn-secondary gap-2">
                    Configurer les documents
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end">
                <Button className="btn-primary gap-2">
                  <Save className="h-4 w-4" />
                  Sauvegarder
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Documents de l'entreprise */}
          <TabsContent value="documents-entreprise" className="mt-6">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h2>Documents de l'entreprise</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    0 / {maxDocuments} documents
                  </p>
                </div>
                <Button className="btn-secondary gap-2">
                  <Upload className="h-4 w-4" />
                  Ajouter un document
                </Button>
              </div>

              <div className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border rounded-xl bg-muted/20">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Déposez vos documents ici</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    ou cliquez sur "Ajouter un document"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Formats acceptés : PDF, DOC, DOCX (max. 10 Mo)
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end">
                <Button className="btn-primary gap-2">
                  <Save className="h-4 w-4" />
                  Sauvegarder
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConsoleLayout>
  );
};

export default ParametresPreembauchePage;
