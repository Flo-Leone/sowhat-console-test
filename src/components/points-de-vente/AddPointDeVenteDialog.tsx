import { useState } from "react";
import { MapPin } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";

interface AddPointDeVenteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const zones = ["Est", "Ouest", "Nord", "Sud", "IDF", "Centre", "Auvergne", "Bourgogne"];
const types = ["Boutique", "Centre commercial", "Zone commerciale", "Kiosque", "Drive"];

export const AddPointDeVenteDialog = ({ open, onOpenChange }: AddPointDeVenteDialogProps) => {
  const [nom, setNom] = useState("");
  const [marque, setMarque] = useState("");
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [zone, setZone] = useState("");
  const [type, setType] = useState("");
  const [idExterne, setIdExterne] = useState("");
  const [statut, setStatut] = useState(true);

  const handleSave = () => {
    // TODO: Implement save logic
    console.log({ nom, marque, adresse, codePostal, ville, zone, type, idExterne, statut });
    onOpenChange(false);
    resetForm();
  };

  const handleCancel = () => {
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setNom("");
    setMarque("");
    setAdresse("");
    setCodePostal("");
    setVille("");
    setZone("");
    setType("");
    setIdExterne("");
    setStatut(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Ajouter un point de vente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nom et Marque */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom" className="text-xs text-muted-foreground">
                Nom du point de vente*
              </Label>
              <Input
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Point de vente Paris Centre"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marque" className="text-xs text-muted-foreground">
                Marque*
              </Label>
              <Input
                id="marque"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                placeholder="Ex: PARIS CENTRE"
                className="bg-background border-border"
              />
            </div>
          </div>

          {/* Adresse */}
          <div className="space-y-2">
            <Label htmlFor="adresse" className="text-xs text-muted-foreground">
              Adresse*
            </Label>
            <Input
              id="adresse"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Ex: 123 rue de la République"
              className="bg-background border-border"
            />
          </div>

          {/* Code postal et Ville */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codePostal" className="text-xs text-muted-foreground">
                Code postal*
              </Label>
              <Input
                id="codePostal"
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value)}
                placeholder="Ex: 75001"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ville" className="text-xs text-muted-foreground">
                Ville*
              </Label>
              <Input
                id="ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                placeholder="Ex: Paris"
                className="bg-background border-border"
              />
            </div>
          </div>

          {/* Zone et Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zone" className="text-xs text-muted-foreground">
                Zone*
              </Label>
              <Select value={zone} onValueChange={setZone}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Sélectionner une zone" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {zones.map((z) => (
                    <SelectItem key={z} value={z}>{z}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className="text-xs text-muted-foreground">
                Type*
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {types.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ID Externe */}
          <div className="space-y-2">
            <Label htmlFor="idExterne" className="text-xs text-muted-foreground">
              ID externe (optionnel)
            </Label>
            <Input
              id="idExterne"
              value={idExterne}
              onChange={(e) => setIdExterne(e.target.value)}
              placeholder="Ex: 5df8a995a473ee0004690776"
              className="bg-background border-border font-mono text-sm"
            />
          </div>

          {/* Statut */}
          <div className="flex items-center justify-between py-2">
            <div>
              <Label className="text-sm font-medium">Statut actif</Label>
              <p className="text-xs text-muted-foreground">Le point de vente sera visible et utilisable</p>
            </div>
            <Switch
              checked={statut}
              onCheckedChange={setStatut}
            />
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
