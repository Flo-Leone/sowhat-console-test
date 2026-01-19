import { useState } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: number;
  onReset: () => void;
  onApply: () => void;
}

const statuses = [
  { id: "nouveau", label: "Nouveau" },
  { id: "vivier", label: "Vivier" },
  { id: "rejete_cv", label: "Rejeté après chat ou CV" },
  { id: "appel_attente", label: "Appel Tel. - confirmation en attente" },
  { id: "appel_confirme", label: "Appel Tel. - confirmé" },
  { id: "rejete_appel", label: "Rejeté après appel" },
  { id: "invite_entretien", label: "Invité pour entretien" },
  { id: "rejete_entretien", label: "Rejeté après entretien" },
  { id: "recrute", label: "Recruté" },
  { id: "recrute_autre", label: "Recruté par un autre employeur" },
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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState([0, 100]);
  const [hoursRange, setHoursRange] = useState([20, 45]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-carbon/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-elevated z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Point de vente */}
          <div className="filter-section">
            <label className="filter-label">Point de vente / Zone</label>
            <Select>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Tous les points de vente" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-elevated">
                <SelectItem value="all">Tous les points de vente</SelectItem>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="lyon">Lyon</SelectItem>
                <SelectItem value="marseille">Marseille</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Statut */}
          <div className="filter-section">
            <label className="filter-label">Statut de candidature</label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {statuses.map((status) => (
                <label
                  key={status.id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                    "border border-transparent hover:bg-muted",
                    selectedStatuses.includes(status.id) &&
                      "bg-primary/5 border-primary/20"
                  )}
                >
                  <Checkbox
                    checked={selectedStatuses.includes(status.id)}
                    onCheckedChange={() => toggleStatus(status.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-sm">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Score expérience */}
          <div className="filter-section">
            <label className="filter-label">Score expérience</label>
            <div className="mt-4 px-2">
              <Slider
                value={experienceRange}
                onValueChange={setExperienceRange}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{experienceRange[0]}%</span>
                <span>{experienceRange[1]}%</span>
              </div>
            </div>
          </div>

          {/* Type de contrat */}
          <div className="filter-section">
            <label className="filter-label">Type de contrat</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {contractTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleContract(type.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    selectedContracts.includes(type.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Heures hebdomadaires */}
          <div className="filter-section">
            <label className="filter-label">Heures hebdomadaires</label>
            <div className="mt-4 px-2">
              <Slider
                value={hoursRange}
                onValueChange={setHoursRange}
                min={0}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{hoursRange[0]}h</span>
                <span>{hoursRange[1]}h</span>
              </div>
            </div>
          </div>

          {/* Filtres supplémentaires */}
          <div className="filter-section">
            <label className="filter-label">Filtres supplémentaires</label>
            <div className="grid grid-cols-1 gap-1 mt-2">
              {additionalFilters.map((filter) => (
                <label
                  key={filter.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                >
                  <Checkbox
                    checked={selectedAdditional.includes(filter.id)}
                    onCheckedChange={() => toggleAdditional(filter.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-sm">{filter.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/30">
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedStatuses([]);
              setSelectedContracts([]);
              setSelectedAdditional([]);
              setExperienceRange([0, 100]);
              setHoursRange([20, 45]);
              onReset();
            }}
            className="text-muted-foreground"
          >
            Réinitialiser
          </Button>
          <Button onClick={onApply} className="btn-primary">
            Appliquer les filtres
          </Button>
        </div>
      </div>
    </>
  );
};
