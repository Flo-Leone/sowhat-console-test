import { useState } from "react";
import { Plus, Undo, Redo, ChevronDown } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-foreground">Paramètres</h1>
            <p className="text-muted-foreground mt-1">
              Configuration de l'application
            </p>
          </div>
        </div>

        {/* Marque Selector */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <Select value={selectedMarque} onValueChange={setSelectedMarque}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sélectionner une marque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gallika">Marque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-6 space-y-8">
            {/* Paramètres par défaut */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Paramètres par défaut - Company</h2>

              {/* URLs professions */}
              <div className="space-y-4">
                <h3 className="font-medium">URLs professions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {professionURLs.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                        {item.profession}
                      </Label>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">URL</Label>
                        <Input
                          value={item.url}
                          onChange={(e) => {
                            const newURLs = [...professionURLs];
                            newURLs[index].url = e.target.value;
                            setProfessionURLs(newURLs);
                          }}
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message de bienvenue */}
              <div className="space-y-3">
                <h3 className="font-medium">Message de bienvenue</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Undo className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Redo className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1 text-sm">
                          Ajouter paramètre
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>{"{{profession}}"}</DropdownMenuItem>
                        <DropdownMenuItem>{"{{store}}"}</DropdownMenuItem>
                        <DropdownMenuItem>{"{{company}}"}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Textarea
                    value={messageAccueil}
                    onChange={(e) => setMessageAccueil(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border flex justify-end">
            <Button className="btn-primary">
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default ParametresOffresPage;
