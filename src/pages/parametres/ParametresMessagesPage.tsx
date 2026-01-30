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

const ParametresMessagesPage = () => {
  const [selectedMarque, setSelectedMarque] = useState("gallika");
  const [messageType, setMessageType] = useState("rappel");
  const [messageContent, setMessageContent] = useState(
    "Bonjour {{firstName}}, nous n'avons pas eu de nouvelles de vous concernant votre candidature chez {{company}}. Êtes-vous toujours intéressé(e) ?"
  );

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-foreground">Paramètres</h1>
            <p className="text-muted-foreground mt-1">
              Configuration des messages automatiques
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
            {/* Type de message */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Configuration des messages</h2>
              
              <div className="space-y-3">
                <Label>Type de message</Label>
                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rappel">Message de rappel</SelectItem>
                    <SelectItem value="bienvenue">Message de bienvenue</SelectItem>
                    <SelectItem value="confirmation">Confirmation entretien</SelectItem>
                    <SelectItem value="rejet">Message de rejet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Éditeur de message */}
              <div className="space-y-3">
                <Label>Contenu du message</Label>
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
                        <DropdownMenuItem>{"{{firstName}}"}</DropdownMenuItem>
                        <DropdownMenuItem>{"{{lastName}}"}</DropdownMenuItem>
                        <DropdownMenuItem>{"{{profession}}"}</DropdownMenuItem>
                        <DropdownMenuItem>{"{{store}}"}</DropdownMenuItem>
                        <DropdownMenuItem>{"{{company}}"}</DropdownMenuItem>
                        <DropdownMenuItem>{"{{date}}"}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
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

export default ParametresMessagesPage;
