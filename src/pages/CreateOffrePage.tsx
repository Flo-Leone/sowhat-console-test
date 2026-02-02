import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  LayoutTemplate,
  FileX,
  Filter,
  Search,
  Columns3,
} from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type CreationMethod = "template" | "empty";

interface Template {
  id: string;
  dateCreation: string;
  reference: string;
  profession: string;
  titre: string;
  marque: string;
  type: "complet" | "partiel";
}

const mockTemplates: Template[] = [
  {
    id: "1",
    dateCreation: "13 oct. 2025",
    reference: "GCUD56786",
    profession: "Equipier polyvalent",
    titre: "Employé polyvalent",
    marque: "Gallika",
    type: "complet",
  },
  {
    id: "2",
    dateCreation: "13 oct. 2025",
    reference: "GCUD56786",
    profession: "Equipier polyvalent",
    titre: "Employé polyvalent",
    marque: "TOUTES",
    type: "partiel",
  },
];

const professions = [
  "Equipier polyvalent",
  "Manager",
  "Assistant manager",
  "Responsable de salle",
  "Cuisinier",
];

const pointsVente = [
  "Paris Alesia",
  "Paris Rivoli",
  "Paris Carrousel Du Louvre",
  "Paris Opéra",
  "Lyon Part-Dieu",
];

const CreateOffrePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [creationMethod, setCreationMethod] = useState<CreationMethod>("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form data
  const [formData, setFormData] = useState({
    titre: "",
    reference: "",
    pointVente: "",
    profession: "",
    description: "",
    profilCandidat: "",
  });

  const handleNext = () => {
    if (step === 1) {
      if (creationMethod === "empty") {
        setStep(3);
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      if (selectedTemplate) {
        const template = mockTemplates.find((t) => t.id === selectedTemplate);
        if (template) {
          setFormData({
            titre: template.titre,
            reference: template.reference,
            pointVente: "",
            profession: template.profession,
            description: "XXXX",
            profilCandidat: "XXXX",
          });
        }
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 3 && creationMethod === "empty") {
      setStep(1);
    } else if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/offres-emploi");
    }
  };

  const handleCreate = () => {
    console.log("Creating offer:", formData);
    navigate("/offres-emploi");
  };

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return selectedTemplate !== null;
    if (step === 3) {
      return (
        formData.titre.trim() !== "" &&
        formData.reference.trim() !== "" &&
        formData.profession !== "" &&
        formData.description.trim() !== "" &&
        formData.profilCandidat.trim() !== ""
      );
    }
    return false;
  };

  const filteredTemplates = mockTemplates.filter(
    (t) =>
      t.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stepTitles: Record<number, string> = {
    1: "Comment souhaitez-vous créer votre offre?",
    2: "Sélectionnez un modèle",
    3: "Détails de l'offre",
  };

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Header with back navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Retour</span>
          </button>
        </div>

        {/* Page title */}
        <div>
          <h1 className="text-foreground">Créer une offre</h1>
          <p className="text-muted-foreground mt-1">
            Étape {step} sur 3 — {stepTitles[step]}
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 rounded-full transition-all",
                s === step ? "w-8 bg-lavender" : "w-2",
                s < step ? "bg-lavender/50" : s > step ? "bg-muted" : ""
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="bg-card rounded-xl p-6">
          {/* Step 1: Choose creation method */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setCreationMethod("template")}
                  className={cn(
                    "flex flex-col items-center gap-4 p-8 rounded-xl border-2 transition-all min-w-[200px]",
                    creationMethod === "template"
                      ? "border-lavender bg-lavender/5"
                      : "border-border hover:border-muted-foreground/30"
                  )}
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center",
                      creationMethod === "template"
                        ? "bg-lavender/10"
                        : "bg-muted"
                    )}
                  >
                    <LayoutTemplate
                      className={cn(
                        "h-8 w-8",
                        creationMethod === "template"
                          ? "text-lavender"
                          : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "font-medium",
                      creationMethod === "template"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    À partir d'un modèle
                  </span>
                </button>

                <button
                  onClick={() => setCreationMethod("empty")}
                  className={cn(
                    "flex flex-col items-center gap-4 p-8 rounded-xl border-2 transition-all min-w-[200px]",
                    creationMethod === "empty"
                      ? "border-lavender bg-lavender/5"
                      : "border-border hover:border-muted-foreground/30"
                  )}
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center",
                      creationMethod === "empty" ? "bg-lavender/10" : "bg-muted"
                    )}
                  >
                    <FileX
                      className={cn(
                        "h-8 w-8",
                        creationMethod === "empty"
                          ? "text-lavender"
                          : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "font-medium",
                      creationMethod === "empty"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Offre vide
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select template */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                  <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-2xs">
                    1
                  </Badge>
                </Button>
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex-1" />
                <Button variant="outline" size="sm" className="gap-2">
                  <Columns3 className="h-4 w-4" />
                  Colonnes
                </Button>
              </div>

              <div className="rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="w-12 p-3"></th>
                      <th className="p-3 text-left font-medium text-muted-foreground">
                        Date de création
                      </th>
                      <th className="p-3 text-left font-medium text-muted-foreground">
                        Référence de l'offre
                      </th>
                      <th className="p-3 text-left font-medium text-muted-foreground">
                        Profession
                      </th>
                      <th className="p-3 text-left font-medium text-muted-foreground">
                        Titre de l'offre
                      </th>
                      <th className="p-3 text-left font-medium text-muted-foreground">
                        Marque
                      </th>
                      <th className="p-3 text-left font-medium text-muted-foreground">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTemplates.map((template) => (
                      <tr
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          "border-t border-border cursor-pointer transition-colors",
                          selectedTemplate === template.id
                            ? "bg-lavender/5"
                            : "hover:bg-muted/30"
                        )}
                      >
                        <td className="p-3">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                              selectedTemplate === template.id
                                ? "border-lavender"
                                : "border-muted-foreground/30"
                            )}
                          >
                            {selectedTemplate === template.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-lavender" />
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {template.dateCreation}
                        </td>
                        <td className="p-3 font-mono">{template.reference}</td>
                        <td className="p-3">{template.profession}</td>
                        <td className="p-3">{template.titre}</td>
                        <td className="p-3">{template.marque}</td>
                        <td className="p-3">
                          <span
                            className={cn(
                              "text-sm font-medium",
                              template.type === "complet"
                                ? "text-success"
                                : "text-coral"
                            )}
                          >
                            {template.type === "complet" ? "Complet" : "Partiel"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-end text-sm text-muted-foreground">
                <span>Résultats par page 50</span>
                <span className="ml-4">1 - {filteredTemplates.length} / {filteredTemplates.length}</span>
              </div>
            </div>
          )}

          {/* Step 3: Fill in offer details */}
          {step === 3 && (
            <div className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre de l'offre*</Label>
                  <Input
                    id="titre"
                    placeholder="par ex.: Commercial senior"
                    value={formData.titre}
                    onChange={(e) =>
                      setFormData({ ...formData, titre: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference">Référence de l'offre*</Label>
                  <Input
                    id="reference"
                    placeholder="par ex.: REF-2024-001"
                    value={formData.reference}
                    onChange={(e) =>
                      setFormData({ ...formData, reference: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pointVente">Point de vente*</Label>
                  <Select
                    value={formData.pointVente}
                    onValueChange={(value) =>
                      setFormData({ ...formData, pointVente: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un point de vente" />
                    </SelectTrigger>
                    <SelectContent>
                      {pointsVente.map((pv) => (
                        <SelectItem key={pv} value={pv}>
                          Point de vente {pv}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.pointVente && (
                    <p className="text-xs text-coral">
                      Showing only stores from brand Gallika
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession*</Label>
                  <Select
                    value={formData.profession}
                    onValueChange={(value) =>
                      setFormData({ ...formData, profession: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une profession" />
                    </SelectTrigger>
                    <SelectContent>
                      {professions.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description de l'offre*</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez le poste, les principales responsabilités, l'environnement de travail..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilCandidat">Profil du candidat*</Label>
                <Textarea
                  id="profilCandidat"
                  placeholder="Compétences requises, expérience souhaitée, qualifications..."
                  value={formData.profilCandidat}
                  onChange={(e) =>
                    setFormData({ ...formData, profilCandidat: e.target.value })
                  }
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack}>
            {step === 1 ? "Annuler" : "Précédent"}
          </Button>
          <div className="flex gap-2">
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-lavender hover:bg-lavender/90 text-white"
              >
                Continuer
              </Button>
            ) : (
              <Button
                onClick={handleCreate}
                disabled={!canProceed()}
                className="bg-lavender hover:bg-lavender/90 text-white"
              >
                Créer l'offre
              </Button>
            )}
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default CreateOffrePage;
