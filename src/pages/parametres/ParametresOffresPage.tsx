import { useState } from "react";
import { Undo, Redo, ChevronDown, Save } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfessionURL {
  profession: string;
  url: string;
}

const mockProfessionURLs: ProfessionURL[] = [
  { profession: "EQUIPIER POLYVALENT", url: "https://demo.sowhat.ai/J5azPoxvl7HjZzYN" },
  { profession: "MANAGER", url: "https://demo.sowhat.ai/J5azPoxvl7HjZzYN" },
];

const ParametresOffresPage = () => {
  const [selectedMarque, setSelectedMarque] = useState("gallika");
  const [professionURLs, setProfessionURLs] = useState(mockProfessionURLs);
  const [messageAccueil, setMessageAccueil] = useState(
    "Bienvenue sur l'Assistant Recrutement Coté Sushi. Merci pour votre intérêt pour notre opportunité de {{profession}} pour notre {{store}}."
  );

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1>Paramètres Offres d'emploi</h1>
          <p className="text-muted-foreground mt-1">
            Configuration des URLs et messages
          </p>
        </div>

        {/* Marque Selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Marque :</span>
          <Select value={selectedMarque} onValueChange={setSelectedMarque}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sélectionner une marque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gallika">Gallika</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* URLs Professions Section */}
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h2>URLs Professions</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              URLs par défaut pour chaque profession
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {professionURLs.map((item, index) => (
                <div key={index} className="space-y-2">
                  <label className="form-label">{item.profession}</label>
                  <Input
                    value={item.url}
                    onChange={(e) => {
                      const newURLs = [...professionURLs];
                      newURLs[index].url = e.target.value;
                      setProfessionURLs(newURLs);
                    }}
                    className="font-mono text-sm"
                    placeholder="https://..."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message de bienvenue Section */}
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h2>Message de bienvenue</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Message affiché aux candidats lors de leur première connexion
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* Toolbar */}
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <button className="p-2 rounded-md hover:bg-muted transition-colors" title="Annuler">
                <Undo className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-md hover:bg-muted transition-colors" title="Rétablir">
                <Redo className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="w-px h-5 bg-border mx-1" />
              <Select onValueChange={(value) => setMessageAccueil(prev => prev + value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Insérer variable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="{{profession}}">{"{{profession}}"}</SelectItem>
                  <SelectItem value="{{store}}">{"{{store}}"}</SelectItem>
                  <SelectItem value="{{company}}">{"{{company}}"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Textarea */}
            <Textarea
              value={messageAccueil}
              onChange={(e) => setMessageAccueil(e.target.value)}
              rows={6}
              className="resize-none"
              placeholder="Saisissez votre message de bienvenue..."
            />

            <p className="text-xs text-muted-foreground">
              Variables disponibles : <code className="bg-muted px-1 py-0.5 rounded">{"{{profession}}"}</code>, <code className="bg-muted px-1 py-0.5 rounded">{"{{store}}"}</code>, <code className="bg-muted px-1 py-0.5 rounded">{"{{company}}"}</code>
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border/50 bg-muted/30 flex justify-end">
            <Button className="btn-primary gap-2">
              <Save className="h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default ParametresOffresPage;
