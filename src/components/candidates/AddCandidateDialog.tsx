import { useState } from "react";
import { Paperclip } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddCandidateDialog = ({ open, onOpenChange }: AddCandidateDialogProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pointVente, setPointVente] = useState("");
  const [profession, setProfession] = useState("");

  const handleSave = () => {
    // TODO: Implement save logic
    console.log({ firstName, lastName, email, phone, pointVente, profession });
    onOpenChange(false);
    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPointVente("");
    setProfession("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPointVente("");
    setProfession("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border">
        <DialogHeader className="sr-only">
          <DialogTitle>Ajouter un candidat</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* File Upload */}
          <div className="flex justify-center">
            <button className="flex items-center gap-2 px-4 py-3 border border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-foreground transition-colors w-48">
              <span className="text-sm">Choisir fichier</span>
              <Paperclip className="h-4 w-4 text-warning" />
            </button>
          </div>

          {/* Point de vente */}
          <div className="space-y-2">
            <Label htmlFor="pointVente" className="text-xs text-muted-foreground">
              Point de vente*
            </Label>
            <Input
              id="pointVente"
              value={pointVente}
              onChange={(e) => setPointVente(e.target.value)}
              className="bg-background border-border"
            />
          </div>

          {/* Prénom / Nom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="sr-only">Prénom</Label>
              <Input
                id="firstName"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="sr-only">Nom</Label>
              <Input
                id="lastName"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>

          {/* Email / Téléphone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="sr-only">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>

          {/* Profession */}
          <div className="space-y-2">
            <Label htmlFor="profession" className="sr-only">Profession</Label>
            <Select value={profession} onValueChange={setProfession}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Profession" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="equipier_polyvalent">Equipier polyvalent</SelectItem>
                <SelectItem value="responsable_adjoint">Responsable adjoint</SelectItem>
                <SelectItem value="cuisinier">Cuisinier</SelectItem>
                <SelectItem value="serveur">Serveur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
          <Button className="btn-primary" onClick={handleSave}>
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
