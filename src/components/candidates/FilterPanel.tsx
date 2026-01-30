import { useState } from "react";
import { X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: number;
  onReset: () => void;
  onApply: () => void;
}

const pointsDeVente = [
  { id: "paris-rivoli", label: "Paris Rivoli" },
  { id: "paris-louvre", label: "Paris Carrousel Du Louvre" },
  { id: "lyon", label: "Lyon Part-Dieu" },
  { id: "marseille", label: "Marseille Vieux-Port" },
  { id: "bordeaux", label: "Bordeaux Sainte-Catherine" },
  { id: "toulouse", label: "Toulouse Capitole" },
];

const statuses = [
  { id: "nouveau", label: "Nouveau", color: "bg-info" },
  { id: "vivier", label: "Vivier", color: "bg-lavender" },
  { id: "rejete_cv", label: "Rejeté après chat ou CV", color: "bg-destructive" },
  { id: "appel_attente", label: "Appel Tel. - confirmation en attente", color: "bg-warning" },
  { id: "appel_confirme", label: "Appel Tel. - confirmé", color: "bg-info" },
  { id: "rejete_appel", label: "Rejeté après appel", color: "bg-destructive" },
  { id: "invite_entretien", label: "Invité pour entretien", color: "bg-accent" },
  { id: "rejete_entretien", label: "Rejeté après entretien", color: "bg-destructive" },
  { id: "recrute", label: "Recruté", color: "bg-success" },
  { id: "recrute_autre", label: "A été recruté par un autre employeur", color: "bg-muted-foreground" },
];

const contractTypes = [
  { id: "cdd", label: "CDD" },
  { id: "cdi", label: "CDI" },
  { id: "etudiant", label: "Étudiant" },
  { id: "temps_partiel", label: "Temps partiel" },
];

const additionalFilters = [
  { id: "etudiants", label: "Étudiants uniquement" },
  { id: "cdd_only", label: "CDD uniquement" },
  { id: "majeurs", label: "Majeurs uniquement" },
  { id: "permis", label: "Permis de conduire uniquement" },
  { id: "vacances", label: "Pour les vacances uniquement" },
  { id: "pas_discussion", label: "Candidat n'a pas discuté" },
  { id: "pas_rappel_chat", label: "Pas de rappel de chat envoyé" },
  { id: "pas_rappel_cv", label: "Pas de rappel de CV envoyé" },
  { id: "archivees", label: "Inclure archivées" },
  { id: "importe", label: "Candidat importé" },
];

export const FilterPanel = ({
  isOpen,
  onClose,
  activeFilters,
  onReset,
  onApply,
}: FilterPanelProps) => {
  const [selectedPointsVente, setSelectedPointsVente] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState([0, 100]);
  const [hoursRange, setHoursRange] = useState([20, 45]);
  const [tagsCondition, setTagsCondition] = useState("all");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [prenomFiltre, setPrenomFiltre] = useState("");
  const [nomFiltre, setNomFiltre] = useState("");
  const [professionFiltre, setProfessionFiltre] = useState("");
  const [titreOffreFiltre, setTitreOffreFiltre] = useState("");
  const [referenceOffreFiltre, setReferenceOffreFiltre] = useState("");

  const togglePointVente = (id: string) => {
    setSelectedPointsVente((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleStatus = (id: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleContract = (id: string) => {
    setSelectedContracts((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleAdditional = (id: string) => {
    setSelectedAdditional((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectAllStatuses = () => {
    setSelectedStatuses(statuses.map((s) => s.id));
  };

  const resetAll = () => {
    setSelectedPointsVente([]);
    setSelectedStatuses([]);
    setSelectedContracts([]);
    setSelectedAdditional([]);
    setExperienceRange([0, 100]);
    setHoursRange([20, 45]);
    setTagsCondition("all");
    setDateDebut("");
    setDateFin("");
    setPrenomFiltre("");
    setNomFiltre("");
    setProfessionFiltre("");
    setTitreOffreFiltre("");
    setReferenceOffreFiltre("");
    onReset();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-carbon/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card shadow-elevated z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-lavender/5">
          <div>
            <h2 className="font-display font-semibold text-lg">Filtres</h2>
            {activeFilters > 0 && (
              <p className="text-sm text-muted-foreground">
                {activeFilters} filtre{activeFilters > 1 ? "s" : ""} actif
                {activeFilters > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content - No accordions, all sections visible */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Point de vente / Zone */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm">Point de vente / Zone</h3>
                {selectedPointsVente.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-info/10 text-info text-xs font-medium">
                    {selectedPointsVente.length}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {pointsDeVente.map((pdv) => (
                  <label
                    key={pdv.id}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                      "border border-transparent hover:bg-muted",
                      selectedPointsVente.includes(pdv.id) &&
                        "bg-info/5 border-info/20"
                    )}
                  >
                    <Checkbox
                      checked={selectedPointsVente.includes(pdv.id)}
                      onCheckedChange={() => togglePointVente(pdv.id)}
                    />
                    <span className="text-sm">{pdv.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dates de candidature */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-medium text-sm">Dates de candidature</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">De</Label>
                  <Input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">À</Label>
                  <Input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-medium text-sm">Tags</h3>
              <RadioGroup value={tagsCondition} onValueChange={setTagsCondition} className="space-y-2">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="all" id="tags-all" />
                  <Label htmlFor="tags-all" className="text-sm cursor-pointer">Réunit toutes les conditions</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="any" id="tags-any" />
                  <Label htmlFor="tags-any" className="text-sm cursor-pointer">Au moins une des conditions</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="none" id="tags-none" />
                  <Label htmlFor="tags-none" className="text-sm cursor-pointer">Aucune des conditions</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Statut */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm">Statut</h3>
                {selectedStatuses.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-lavender/10 text-lavender text-xs font-medium">
                    {selectedStatuses.length}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={selectAllStatuses}
                  className="text-xs text-info hover:underline"
                >
                  Tout sélectionner
                </button>
                <span className="text-muted-foreground">·</span>
                <button
                  onClick={() => setSelectedStatuses([])}
                  className="text-xs text-muted-foreground hover:underline"
                >
                  Réinitialiser
                </button>
              </div>
              <div className="space-y-1">
                {statuses.map((status) => (
                  <label
                    key={status.id}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                      "hover:bg-muted",
                      selectedStatuses.includes(status.id) && "bg-lavender/5"
                    )}
                  >
                    <Checkbox
                      checked={selectedStatuses.includes(status.id)}
                      onCheckedChange={() => toggleStatus(status.id)}
                    />
                    <div className={cn("w-2 h-2 rounded-full", status.color)} />
                    <span className="text-sm">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Candidat */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-medium text-sm">Candidat</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Prénom</Label>
                  <Input
                    placeholder="Filtrer par prénom"
                    value={prenomFiltre}
                    onChange={(e) => setPrenomFiltre(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Nom</Label>
                  <Input
                    placeholder="Filtrer par nom"
                    value={nomFiltre}
                    onChange={(e) => setNomFiltre(e.target.value)}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Offre */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-medium text-sm">Offre d'emploi</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Profession</Label>
                  <Input
                    placeholder="Filtrer par profession"
                    value={professionFiltre}
                    onChange={(e) => setProfessionFiltre(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Titre de l'offre</Label>
                  <Input
                    placeholder="Filtrer par titre"
                    value={titreOffreFiltre}
                    onChange={(e) => setTitreOffreFiltre(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Référence de l'offre</Label>
                  <Input
                    placeholder="Ex: EQP-042"
                    value={referenceOffreFiltre}
                    onChange={(e) => setReferenceOffreFiltre(e.target.value)}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Score expérience */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-medium text-sm">Score expérience</h3>
              <div className="px-2">
                <Slider
                  value={experienceRange}
                  onValueChange={setExperienceRange}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 text-sm">
                  <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{experienceRange[0]}%</span>
                  <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{experienceRange[1]}%</span>
                </div>
              </div>
            </div>

            {/* Type de contrat */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm">Type de contrat</h3>
                {selectedContracts.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                    {selectedContracts.length}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {contractTypes.map((contract) => (
                  <label
                    key={contract.id}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                      "hover:bg-muted",
                      selectedContracts.includes(contract.id) && "bg-success/5"
                    )}
                  >
                    <Checkbox
                      checked={selectedContracts.includes(contract.id)}
                      onCheckedChange={() => toggleContract(contract.id)}
                    />
                    <span className="text-sm">{contract.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Heures hebdomadaires */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-medium text-sm">Heures hebdomadaires</h3>
              <div className="px-2">
                <Slider
                  value={hoursRange}
                  onValueChange={setHoursRange}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 text-sm">
                  <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{hoursRange[0]}h</span>
                  <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{hoursRange[1]}h</span>
                </div>
              </div>
            </div>

            {/* Filtres additionnels */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-medium text-sm">Filtres additionnels</h3>
              <div className="space-y-1">
                {additionalFilters.map((filter) => (
                  <label
                    key={filter.id}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                      "hover:bg-muted",
                      selectedAdditional.includes(filter.id) && "bg-coral/5"
                    )}
                  >
                    <Checkbox
                      checked={selectedAdditional.includes(filter.id)}
                      onCheckedChange={() => toggleAdditional(filter.id)}
                    />
                    <span className="text-sm">{filter.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
          <Button
            variant="ghost"
            onClick={resetAll}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </Button>
          <Button onClick={onApply} className="btn-primary px-8">
            Appliquer
          </Button>
        </div>
      </div>
    </>
  );
};
