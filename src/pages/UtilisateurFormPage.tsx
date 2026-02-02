import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, X, Mail } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock data for existing user (edit mode)
const mockUserData = {
  id: "1",
  statut: "actif",
  langue: "fr-FR",
  idExterne: "florian.guerrier+gallika@sowhat.ai",
  email: "florian.guerrier+gallika@sowhat.ai",
  pointsVente: ["IMMO de France [HQ]"],
  roles: ["Recruiting - Administrator", "SMS - unrestricted", "CSS", "Job Posting - unrestricted", "Job Postings Templates Admin (create/delete)", "Preboarding Admin"],
  prenom: "Florian",
  nom: "Guerrier",
  telephone: "",
  fonctionLegale: "",
  description: "",
  // Informations (read-only)
  premiereConnexion: "19 janv. 2026, 10:58:29",
  derniereConnexion: "19 janv. 2026, 10:58:29",
  derniereActivite: "20 janv. 2026, 19:18:43",
  premierEnvoiIdentifiants: "18 janv. 2026, 15:29:32",
  dernierEnvoiIdentifiants: "18 janv. 2026, 15:29:32",
  dateCreation: "",
  dateDerniereModification: "",
};

const availableRoles = [
  "Recruiting - Administrator",
  "SMS - unrestricted",
  "CSS",
  "Job Posting - unrestricted",
  "Job Postings Templates Admin (create/delete)",
  "Preboarding Admin",
  "Manager",
  "Recruteur",
  "Viewer",
];

const availablePointsVente = [
  "IMMO de France [HQ]",
  "Gallika [HQ]",
  "Paris Alesia",
  "Paris Rivoli",
  "Paris Carrousel Du Louvre",
  "Lyon Part-Dieu",
];

const langues = [
  { value: "fr-FR", label: "fr-FR" },
  { value: "en-US", label: "en-US" },
  { value: "es-ES", label: "es-ES" },
  { value: "de-DE", label: "de-DE" },
];

const UtilisateurFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    statut: isEditMode ? mockUserData.statut : "actif",
    langue: isEditMode ? mockUserData.langue : "",
    idExterne: isEditMode ? mockUserData.idExterne : "",
    email: isEditMode ? mockUserData.email : "",
    pointsVente: isEditMode ? mockUserData.pointsVente : [] as string[],
    roles: isEditMode ? mockUserData.roles : [] as string[],
    prenom: isEditMode ? mockUserData.prenom : "",
    nom: isEditMode ? mockUserData.nom : "",
    telephone: isEditMode ? mockUserData.telephone : "",
    fonctionLegale: isEditMode ? mockUserData.fonctionLegale : "",
    description: isEditMode ? mockUserData.description : "",
  });

  const handleCancel = () => {
    navigate("/utilisateurs");
  };

  const handleSave = () => {
    console.log("Saving user:", formData);
    navigate("/utilisateurs");
  };

  const handleSendEmails = () => {
    console.log("Sending emails to user");
  };

  const removeRole = (roleToRemove: string) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter((r) => r !== roleToRemove),
    });
  };

  const addRole = (role: string) => {
    if (!formData.roles.includes(role)) {
      setFormData({
        ...formData,
        roles: [...formData.roles, role],
      });
    }
  };

  const removePointVente = (pvToRemove: string) => {
    setFormData({
      ...formData,
      pointsVente: formData.pointsVente.filter((pv) => pv !== pvToRemove),
    });
  };

  const addPointVente = (pv: string) => {
    if (!formData.pointsVente.includes(pv)) {
      setFormData({
        ...formData,
        pointsVente: [...formData.pointsVente, pv],
      });
    }
  };

  const availableRolesToAdd = availableRoles.filter(
    (r) => !formData.roles.includes(r)
  );

  const availablePointsVenteToAdd = availablePointsVente.filter(
    (pv) => !formData.pointsVente.includes(pv)
  );

  // Scroll detection
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;
    
    const handleScroll = () => {
      setIsScrolled(mainElement.scrollTop > 100);
    };
    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ConsoleLayout>
      <div className="relative">
        {/* Sticky Action Bar */}
        <div className="sticky top-0 z-20 bg-transparent backdrop-blur-xl px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/utilisateurs")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Retour aux utilisateurs</span>
              </button>
              {isScrolled && (
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <span className="text-base font-bold text-foreground">
                    {isEditMode ? `${formData.prenom} ${formData.nom}` : "Nouvel utilisateur"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isEditMode && (
                <Button className="gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]" onClick={handleSendEmails}>
                  <Mail className="h-4 w-4" />
                  Envoyer e-mails
                </Button>
              )}
              <Button className="gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]" onClick={handleSave}>
                Sauvegarder
              </Button>
              <Button className="gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]" onClick={handleCancel}>
                Annuler
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header - only visible when not scrolled */}
          {!isScrolled && (
            <div>
              <h1 className="text-foreground">
                {isEditMode ? `${formData.prenom} ${formData.nom}` : "Nouvel utilisateur"}
              </h1>
            </div>
          )}

        {/* Données principales */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-display">Données principales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="statut">Statut*</Label>
                <Select
                  value={formData.statut}
                  onValueChange={(value) =>
                    setFormData({ ...formData, statut: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="langue">Langue</Label>
                <Select
                  value={formData.langue || "none"}
                  onValueChange={(value) =>
                    setFormData({ ...formData, langue: value === "none" ? "" : value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">—</SelectItem>
                    {langues.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idExterne">ID externe*</Label>
                <Input
                  id="idExterne"
                  value={formData.idExterne}
                  onChange={(e) =>
                    setFormData({ ...formData, idExterne: e.target.value })
                  }
                  placeholder="ID externe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail*</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="E-mail"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Point de vente*</Label>
              <div className="flex flex-wrap items-center gap-2 p-3 border border-border rounded-md min-h-[42px]">
                {formData.pointsVente.map((pv) => (
                  <Badge
                    key={pv}
                    variant="secondary"
                    className="bg-muted text-foreground gap-1.5 pr-1"
                  >
                    {pv}
                    <button
                      onClick={() => removePointVente(pv)}
                      className="hover:bg-muted-foreground/20 rounded p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {availablePointsVenteToAdd.length > 0 && (
                  <Select onValueChange={addPointVente}>
                    <SelectTrigger className="w-auto h-7 border-dashed text-xs gap-1">
                      <span className="text-muted-foreground">+ Ajouter</span>
                    </SelectTrigger>
                    <SelectContent>
                      {availablePointsVenteToAdd.map((pv) => (
                        <SelectItem key={pv} value={pv}>
                          {pv}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Niveau d'accès */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-display">Niveau d'accès</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Rôles*</Label>
              <div className="flex flex-wrap items-center gap-2 p-3 border border-border rounded-md min-h-[42px]">
                {formData.roles.map((role) => (
                  <Badge
                    key={role}
                    variant="secondary"
                    className="bg-muted text-foreground gap-1.5 pr-1"
                  >
                    {role}
                    <button
                      onClick={() => removeRole(role)}
                      className="hover:bg-muted-foreground/20 rounded p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {availableRolesToAdd.length > 0 && (
                  <Select onValueChange={addRole}>
                    <SelectTrigger className="w-auto h-7 border-dashed text-xs gap-1">
                      <span className="text-muted-foreground">+ Ajouter un rôle</span>
                    </SelectTrigger>
                    <SelectContent>
                      {availableRolesToAdd.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-display">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={formData.prenom}
                  onChange={(e) =>
                    setFormData({ ...formData, prenom: e.target.value })
                  }
                  placeholder="Prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                  placeholder="Nom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={formData.telephone}
                  onChange={(e) =>
                    setFormData({ ...formData, telephone: e.target.value })
                  }
                  placeholder="Téléphone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fonctionLegale">Fonction légale</Label>
                <Input
                  id="fonctionLegale"
                  value={formData.fonctionLegale}
                  onChange={(e) =>
                    setFormData({ ...formData, fonctionLegale: e.target.value })
                  }
                  placeholder="Fonction légale"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description"
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Informations (read-only, only in edit mode) */}
        {isEditMode && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-display">Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground">Première connexion:</p>
                  <p className="font-medium">{mockUserData.premiereConnexion || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dernière connexion:</p>
                  <p className="font-medium">{mockUserData.derniereConnexion || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dernière activité:</p>
                  <p className="font-medium">{mockUserData.derniereActivite || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Premier envoi d'identifiants:</p>
                  <p className="font-medium">{mockUserData.premierEnvoiIdentifiants || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dernier envoi d'identifiants:</p>
                  <p className="font-medium">{mockUserData.dernierEnvoiIdentifiants || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date de création:</p>
                  <p className="font-medium">{mockUserData.dateCreation || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date de dernière modification:</p>
                  <p className="font-medium">{mockUserData.dateDerniereModification || "—"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default UtilisateurFormPage;
