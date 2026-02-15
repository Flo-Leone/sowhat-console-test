import { useState } from "react";
import { Plus, Minus, Save, Zap } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Condition {
  id: string;
  type: string;
  volumeType: string;
  comparison: string;
  quantity: number;
}

const createCondition = (): Condition => ({
  id: crypto.randomUUID(),
  type: "volume",
  volumeType: "candidatures",
  comparison: "plus_grand",
  quantity: 30,
});

const AutomatisationRelancesPage = () => {
  const [declencheur, setDeclencheur] = useState("nouvelle_conversation");
  const [conditions, setConditions] = useState<Condition[]>([createCondition()]);
  const [modele, setModele] = useState("");
  const [actionEmail, setActionEmail] = useState("");
  const [actionSms, setActionSms] = useState("");
  const [actionWhatsapp, setActionWhatsapp] = useState("");
  const [actionMessenger, setActionMessenger] = useState("");

  const addCondition = () => {
    setConditions((prev) => [...prev, createCondition()]);
  };

  const removeCondition = (id: string) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof Condition, value: string | number) => {
    setConditions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1>Automatisation des relances recruteurs</h1>
          <p className="text-muted-foreground mt-1">
            Configurez les déclencheurs, conditions et actions pour automatiser les relances
          </p>
        </div>

        {/* Déclencheur */}
        <fieldset className="border border-border rounded-xl p-6 space-y-4 bg-card">
          <legend className="px-2 text-sm font-semibold text-foreground">Déclencheur</legend>

          <div className="space-y-1.5">
            <label className="form-label">Déclencheur</label>
            <Select value={declencheur} onValueChange={setDeclencheur}>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Sélectionner un déclencheur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nouvelle_conversation">Nouvelle conversation</SelectItem>
                <SelectItem value="fin_conversation">Fin de conversation</SelectItem>
                <SelectItem value="candidature_recue">Candidature reçue</SelectItem>
                <SelectItem value="entretien_planifie">Entretien planifié</SelectItem>
                <SelectItem value="delai_sans_reponse">Délai sans réponse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </fieldset>

        {/* Conditions */}
        <fieldset className="border border-border rounded-xl p-6 space-y-4 bg-card">
          <legend className="px-2 text-sm font-semibold text-foreground">Conditions</legend>

          <Button
            type="button"
            className="btn-secondary btn-sm gap-1.5"
            variant="outline"
            onClick={addCondition}
          >
            <Plus className="h-4 w-4" />
            Ajouter condition
          </Button>

          {conditions.map((condition) => (
            <div
              key={condition.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-end"
            >
              {/* Type */}
              <div className="space-y-1.5">
                <label className="form-label">Type</label>
                <Select
                  value={condition.type}
                  onValueChange={(v) => updateCondition(condition.id, "type", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="volume">Volume</SelectItem>
                    <SelectItem value="delai">Délai</SelectItem>
                    <SelectItem value="statut">Statut</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type de volume */}
              <div className="space-y-1.5">
                <label className="form-label">Type de volume</label>
                <Select
                  value={condition.volumeType}
                  onValueChange={(v) => updateCondition(condition.id, "volumeType", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidatures">Candidatures</SelectItem>
                    <SelectItem value="entretiens">Entretiens</SelectItem>
                    <SelectItem value="conversations">Conversations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Comparaison */}
              <div className="space-y-1.5">
                <label className="form-label">Comparaison</label>
                <Select
                  value={condition.comparison}
                  onValueChange={(v) => updateCondition(condition.id, "comparison", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plus_grand">Plus grand</SelectItem>
                    <SelectItem value="plus_petit">Plus petit</SelectItem>
                    <SelectItem value="egal">Égal</SelectItem>
                    <SelectItem value="plus_grand_egal">Plus grand ou égal</SelectItem>
                    <SelectItem value="plus_petit_egal">Plus petit ou égal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantité */}
              <div className="space-y-1.5">
                <label className="form-label text-[hsl(var(--golden-pollen))]">Quantité</label>
                <Input
                  type="number"
                  value={condition.quantity}
                  onChange={(e) =>
                    updateCondition(condition.id, "quantity", parseInt(e.target.value) || 0)
                  }
                  className="border-b-2 border-b-[hsl(var(--golden-pollen))]"
                />
              </div>

              {/* Remove */}
              <button
                onClick={() => removeCondition(condition.id)}
                className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                title="Supprimer la condition"
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
          ))}
        </fieldset>

        {/* Action */}
        <fieldset className="border border-border rounded-xl p-6 space-y-6 bg-card">
          <legend className="px-2 text-sm font-semibold text-foreground">Action</legend>

          {/* Modèle */}
          <div className="space-y-1.5">
            <label className="form-label">Modèle</label>
            <Select value={modele} onValueChange={setModele}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un modèle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relance_standard">Relance standard</SelectItem>
                <SelectItem value="relance_urgente">Relance urgente</SelectItem>
                <SelectItem value="rappel_entretien">Rappel d'entretien</SelectItem>
                <SelectItem value="suivi_candidature">Suivi de candidature</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action channels */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="form-label">Action e-mail</label>
              <Select value={actionEmail} onValueChange={setActionEmail}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="envoyer">Envoyer</SelectItem>
                  <SelectItem value="ne_pas_envoyer">Ne pas envoyer</SelectItem>
                  <SelectItem value="planifier">Planifier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="form-label">Action SMS</label>
              <Select value={actionSms} onValueChange={setActionSms}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="envoyer">Envoyer</SelectItem>
                  <SelectItem value="ne_pas_envoyer">Ne pas envoyer</SelectItem>
                  <SelectItem value="planifier">Planifier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="form-label">Action WhatsApp</label>
              <Select value={actionWhatsapp} onValueChange={setActionWhatsapp}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="envoyer">Envoyer</SelectItem>
                  <SelectItem value="ne_pas_envoyer">Ne pas envoyer</SelectItem>
                  <SelectItem value="planifier">Planifier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="form-label">Action Messenger</label>
              <Select value={actionMessenger} onValueChange={setActionMessenger}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="envoyer">Envoyer</SelectItem>
                  <SelectItem value="ne_pas_envoyer">Ne pas envoyer</SelectItem>
                  <SelectItem value="planifier">Planifier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </fieldset>

        {/* Save Button */}
        <div>
          <Button className="btn-primary gap-2">
            <Save className="h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default AutomatisationRelancesPage;
