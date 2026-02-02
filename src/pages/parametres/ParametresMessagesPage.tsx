import { useState } from "react";
import { Undo, Redo, ChevronDown, Save, MessageSquare } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { Button } from "@/components/ui/button";
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

const messageTypes = [
  { value: "rappel", label: "Message de rappel", icon: "🔔" },
  { value: "bienvenue", label: "Message de bienvenue", icon: "👋" },
  { value: "confirmation", label: "Confirmation entretien", icon: "✅" },
  { value: "rejet", label: "Message de rejet", icon: "❌" },
];

const defaultMessages: Record<string, string> = {
  rappel: "Bonjour {{firstName}}, nous n'avons pas eu de nouvelles de vous concernant votre candidature chez {{company}}. Êtes-vous toujours intéressé(e) ?",
  bienvenue: "Bienvenue {{firstName}} ! Nous sommes ravis de votre intérêt pour le poste de {{profession}} chez {{company}}.",
  confirmation: "Bonjour {{firstName}}, nous confirmons votre entretien pour le poste de {{profession}} le {{date}} à {{store}}.",
  rejet: "Bonjour {{firstName}}, nous avons bien reçu votre candidature pour le poste de {{profession}} chez {{company}}. Après étude de votre profil, nous ne pouvons malheureusement pas donner suite.",
};

const ParametresMessagesPage = () => {
  const [selectedMarque, setSelectedMarque] = useState("gallika");
  const [messageType, setMessageType] = useState("rappel");
  const [messageContent, setMessageContent] = useState(defaultMessages.rappel);

  const handleTypeChange = (type: string) => {
    setMessageType(type);
    setMessageContent(defaultMessages[type] || "");
  };

  return (
    <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1>Paramètres Messages</h1>
          <p className="text-muted-foreground mt-1">
            Configuration des messages automatiques
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

        {/* Message Type Selector */}
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h2>Type de message</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Sélectionnez le type de message à configurer
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {messageTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleTypeChange(type.value)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    messageType === type.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <span className="text-xl mb-2 block">{type.icon}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message Editor */}
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <div>
              <h2>Contenu du message</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {messageTypes.find(t => t.value === messageType)?.label}
              </p>
            </div>
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
              <Select onValueChange={(value) => setMessageContent(prev => prev + value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Insérer variable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="{{firstName}}">{"{{firstName}}"}</SelectItem>
                  <SelectItem value="{{lastName}}">{"{{lastName}}"}</SelectItem>
                  <SelectItem value="{{profession}}">{"{{profession}}"}</SelectItem>
                  <SelectItem value="{{store}}">{"{{store}}"}</SelectItem>
                  <SelectItem value="{{company}}">{"{{company}}"}</SelectItem>
                  <SelectItem value="{{date}}">{"{{date}}"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Textarea */}
            <Textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows={6}
              className="resize-none"
              placeholder="Saisissez votre message..."
            />

            <p className="text-xs text-muted-foreground">
              Variables disponibles : <code className="bg-muted px-1 py-0.5 rounded">{"{{firstName}}"}</code>, <code className="bg-muted px-1 py-0.5 rounded">{"{{lastName}}"}</code>, <code className="bg-muted px-1 py-0.5 rounded">{"{{profession}}"}</code>, <code className="bg-muted px-1 py-0.5 rounded">{"{{store}}"}</code>, <code className="bg-muted px-1 py-0.5 rounded">{"{{company}}"}</code>, <code className="bg-muted px-1 py-0.5 rounded">{"{{date}}"}</code>
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

export default ParametresMessagesPage;
