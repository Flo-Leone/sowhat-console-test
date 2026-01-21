// Variante 3 - Design dashboard avec sidebar fixe à droite
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  FileText,
  MapPin,
  User,
  MessageSquare,
  Send,
  History,
  CheckCircle2,
  Download,
  Archive,
  ChevronDown,
  X,
  Plus,
  Briefcase,
  Clock,
  TrendingUp,
  Target,
  ExternalLink,
} from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Status types and config
type CandidateStatus =
  | "nouveau"
  | "vivier"
  | "rejete_cv"
  | "appel_attente"
  | "appel_confirme"
  | "rejete_appel"
  | "invite_entretien"
  | "rejete_entretien"
  | "recrute"
  | "recrute_autre";

const statusConfig: Record<CandidateStatus, { label: string; className: string; step: number }> = {
  nouveau: { label: "Nouveau", className: "status-new", step: 1 },
  vivier: { label: "Vivier", className: "status-vivier", step: 1 },
  rejete_cv: { label: "Rejeté CV", className: "status-rejected", step: 1 },
  appel_attente: { label: "Appel en attente", className: "status-invited", step: 2 },
  appel_confirme: { label: "Appel confirmé", className: "status-invited", step: 2 },
  rejete_appel: { label: "Rejeté appel", className: "status-rejected", step: 2 },
  invite_entretien: { label: "Entretien", className: "status-invited", step: 3 },
  rejete_entretien: { label: "Rejeté entretien", className: "status-rejected", step: 3 },
  recrute: { label: "Recruté", className: "status-recruited", step: 4 },
  recrute_autre: { label: "Recruté ailleurs", className: "bg-muted text-muted-foreground", step: 4 },
};

const conversionTagOptions = ["10H", "25H", "48H"];

// Mock data
const candidateData = {
  id: "3",
  firstName: "Julien",
  lastName: "Gantheret",
  email: "julien.gantheret@email.com",
  phone: "+33 6 45 67 89 01",
  status: "invite_entretien" as CandidateStatus,
  titreOffre: "Equipier polyvalent",
  applicationDate: "Oct 13, 2025",
  phoneCallDate: "Nov 12, 2025",
  interviewDate: "Oct 15, 2025",
  conversionTags: [] as string[],
  preferredStore: "Paris Rivoli",
  assignedStore: "Paris Rivoli" as string | null,
  preferredContract: "CDD",
  scores: {
    experience: 100,
    profession: 37,
    disponibilite: 37,
    global: 58,
  },
  availabilities: {
    monday: { morning: true, lunch: true, afternoon: false },
    tuesday: { morning: false, lunch: true, afternoon: true },
    wednesday: { morning: true, lunch: false, afternoon: true },
    thursday: { morning: false, lunch: false, afternoon: false },
    friday: { morning: true, lunch: true, afternoon: true },
    saturday: { morning: false, lunch: false, afternoon: true },
    sunday: { morning: false, lunch: false, afternoon: false },
  },
  storesMatching: [
    { name: "Paris Rivoli", score: 85 },
    { name: "Paris Opéra", score: 72 },
    { name: "Lyon Part-Dieu", score: 58 },
  ],
  openQuestions: [
    {
      question: "Quelle est votre disponibilité ?",
      answer: "Disponible immédiatement pour un CDD de 6 mois minimum.",
    },
  ],
  comments: [
    { id: "1", text: "Bon profil, expérience intéressante", author: "Julien Gantheret", date: "01/18/26" },
    { id: "2", text: "À revoir pour le planning", author: "Admin SW.AI", date: "01/17/26" },
    { id: "3", text: "Entretien technique satisfaisant", author: "Stephane Boussely", date: "01/16/26" },
    { id: "4", text: "Motivation claire pour le poste", author: "Florian Guerrier", date: "01/15/26" },
    { id: "5", text: "Bonne capacité d'adaptation", author: "Julie Martin", date: "01/14/26" },
    { id: "6", text: "Expérience CDD précédente validée", author: "Admin SW.AI", date: "01/13/26" },
    { id: "7", text: "Présentation soignée", author: "Stephane Boussely", date: "01/12/26" },
    { id: "8", text: "Questions pertinentes sur l'équipe", author: "Florian Guerrier", date: "01/11/26" },
    { id: "9", text: "Disponibilité immédiate confirmée", author: "Julie Martin", date: "01/10/26" },
    { id: "10", text: "Candidature prometteuse à suivre", author: "Admin SW.AI", date: "01/09/26" },
  ],
  history: [
    { date: "Jan 18, 2026", action: "Consulté par", user: "Admin SW.AI", type: "internal" as const },
    { date: "Jan 17, 2026", action: "Planning revu", user: "Stephane Boussely", type: "internal" as const },
    { date: "Jan 15, 2026", action: "Entretien technique réalisé", user: "", type: "candidate" as const },
    { date: "Jan 12, 2026", action: "Préparation dossier", user: "Florian Guerrier", type: "internal" as const },
    { date: "Jan 10, 2026", action: "Documents reçus", user: "", type: "candidate" as const },
    { date: "Nov 15, 2025", action: "Rappel entretien envoyé", user: "Julie Martin", type: "internal" as const },
    { date: "Nov 12, 2025", action: "Appel programmé", user: "", type: "candidate" as const },
    { date: "Oct 20, 2025", action: "Profil analysé", user: "Admin SW.AI", type: "internal" as const },
    { date: "Oct 15, 2025", action: "Accusé de réception envoyé", user: "", type: "candidate" as const },
    { date: "Oct 13, 2025", action: "Candidature reçue", user: "", type: "candidate" as const },
  ],
};

const dayLabels: Record<string, string> = {
  monday: "L",
  tuesday: "M",
  wednesday: "Me",
  thursday: "J",
  friday: "V",
  saturday: "S",
  sunday: "D",
};

const tagColorMap: Record<string, string> = {
  "10H": "bg-lavender/20 text-lavender border-lavender/30",
  "25H": "bg-coral/20 text-coral border-coral/30",
  "48H": "bg-primary/20 text-primary border-primary/30",
};

const StatusDropdown = ({
  status,
  onStatusChange,
}: {
  status: CandidateStatus;
  onStatusChange: (status: CandidateStatus) => void;
}) => {
  const [open, setOpen] = useState(false);
  const config = statusConfig[status];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={cn("status-badge cursor-pointer hover:opacity-80 transition-opacity", config.className)}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {config.label}
          <ChevronDown className="h-3 w-3 ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="start">
        <div className="space-y-0.5">
          {Object.entries(statusConfig).map(([key, value]) => (
            <button
              key={key}
              onClick={() => { onStatusChange(key as CandidateStatus); setOpen(false); }}
              className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted", status === key && "bg-muted")}
            >
              <span className={cn("status-badge text-xs", statusConfig[key as CandidateStatus].className)}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {value.label}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const CandidatPageV3 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(candidateData);

  const handleStatusChange = (newStatus: CandidateStatus) => {
    setCandidate((prev) => ({ ...prev, status: newStatus }));
  };

  const currentStep = statusConfig[candidate.status].step;

  return (
    <ConsoleLayout>
      <div className="animate-fade-in">
        {/* Version indicator */}
        <div className="fixed top-20 right-8 z-50">
          <Badge className="bg-success text-white shadow-lg">
            Design V3 - Dashboard
          </Badge>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6 lg:p-8 space-y-6">
            {/* Back Navigation */}
            <button
              onClick={() => navigate("/candidatures")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Retour</span>
            </button>

            {/* Header with Progress Pipeline */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center text-xl font-bold text-success border border-success/20">
                    {candidate.firstName[0]}{candidate.lastName[0]}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{candidate.firstName} {candidate.lastName}</h1>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5" />
                      {candidate.titreOffre}
                      {candidate.assignedStore && (
                        <>
                          <span className="text-border">•</span>
                          <MapPin className="h-3.5 w-3.5 text-coral" />
                          {candidate.assignedStore}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <StatusDropdown status={candidate.status} onStatusChange={handleStatusChange} />
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 p-4 rounded-xl bg-muted/30">
                {["CV reçu", "Appel", "Entretien", "Décision"].map((step, index) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div className="flex-1">
                      <div className={cn(
                        "h-2 rounded-full transition-all",
                        index + 1 <= currentStep ? "bg-success" : "bg-muted"
                      )} />
                      <p className={cn(
                        "text-xs mt-1 text-center",
                        index + 1 <= currentStep ? "text-success font-medium" : "text-muted-foreground"
                      )}>
                        {step}
                      </p>
                    </div>
                    {index < 3 && <div className="w-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Scores Dashboard */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="text-center p-4">
                <div className="text-3xl font-bold text-success">{candidate.scores.global}%</div>
                <p className="text-xs text-muted-foreground mt-1">Score global</p>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-info">{candidate.scores.experience}%</div>
                <p className="text-xs text-muted-foreground mt-1">Expérience</p>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-warning">{candidate.scores.profession}%</div>
                <p className="text-xs text-muted-foreground mt-1">Profession</p>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-coral">{candidate.scores.disponibilite}%</div>
                <p className="text-xs text-muted-foreground mt-1">Disponibilité</p>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Matching */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4 text-success" />
                    Matching Points de Vente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {candidate.storesMatching.map((store, index) => (
                    <div key={store.name} className="flex items-center gap-3">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                        index === 0 ? "bg-success text-white" : "bg-muted text-muted-foreground"
                      )}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{store.name}</span>
                          <span className={cn(
                            "text-sm font-bold",
                            store.score >= 80 ? "text-success" : store.score >= 60 ? "text-warning" : "text-destructive"
                          )}>{store.score}%</span>
                        </div>
                        <Progress value={store.score} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Disponibilités compact */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4 text-info" />
                    Disponibilités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Object.entries(candidate.availabilities).map(([day, slots]) => {
                      const total = [slots.morning, slots.lunch, slots.afternoon].filter(Boolean).length;
                      return (
                        <div key={day} className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground">{dayLabels[day]}</div>
                          <div className={cn(
                            "w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold",
                            total === 3 ? "bg-success/20 text-success" :
                            total === 2 ? "bg-warning/20 text-warning" :
                            total === 1 ? "bg-coral/20 text-coral" :
                            "bg-muted text-muted-foreground"
                          )}>
                            {total > 0 ? total : "-"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Complet</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Partiel</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted" /> Indisponible</span>
                  </div>
                </CardContent>
              </Card>

              {/* Préférences */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Préférences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-coral/5">
                    <span className="text-sm text-muted-foreground">Point de vente</span>
                    <span className="text-sm font-medium">{candidate.preferredStore}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-info/5">
                    <span className="text-sm text-muted-foreground">Type de contrat</span>
                    <span className="text-sm font-medium">{candidate.preferredContract}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Questions ouvertes */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Questions ouvertes</CardTitle>
                </CardHeader>
                <CardContent>
                  {candidate.openQuestions.map((q, i) => (
                    <div key={i} className="p-3 rounded-lg bg-info/5 border border-info/10">
                      <p className="text-xs text-muted-foreground mb-1">{q.question}</p>
                      <p className="text-sm font-medium">{q.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-border bg-muted/20 p-6 space-y-6 hidden xl:block">
            {/* Quick Actions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Actions rapides</h3>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Phone className="h-4 w-4 text-info" />
                Appeler
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4 text-success" />
                Planifier entretien
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4 text-lavender" />
                Télécharger CV
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground">
                <Archive className="h-4 w-4" />
                Archiver
              </Button>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Contact</h3>
              <a href={`mailto:${candidate.email}`} className="flex items-center gap-2 text-sm text-foreground hover:text-info transition-colors">
                <Mail className="h-4 w-4 text-info" />
                {candidate.email}
              </a>
              <a href={`tel:${candidate.phone}`} className="flex items-center gap-2 text-sm text-foreground hover:text-success transition-colors">
                <Phone className="h-4 w-4 text-success" />
                {candidate.phone}
              </a>
            </div>

            {/* Dates clés */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Dates clés</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Candidature</span>
                  <span>{candidate.applicationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Appel</span>
                  <span>{candidate.phoneCallDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entretien</span>
                  <span>{candidate.interviewDate}</span>
                </div>
              </div>
            </div>

            {/* Comments Mini */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground">Commentaires</h3>
                <Badge variant="secondary">{candidate.comments.length}</Badge>
              </div>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2 pr-2">
                  {candidate.comments.map((comment) => (
                    <div key={comment.id} className="p-2 rounded-lg bg-card text-xs">
                      <p className="line-clamp-2">{comment.text}</p>
                      <p className="text-muted-foreground mt-1">{comment.author} · {comment.date}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Textarea placeholder="Ajouter..." className="min-h-[60px] text-sm" />
              <Button size="sm" className="w-full gap-1">
                <Send className="h-3 w-3" />
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default CandidatPageV3;
