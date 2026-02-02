// Variante 4 - Design minimal et épuré avec focus sur l'essentiel
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, FileText, MapPin, User, MessageSquare, Send, History, CheckCircle2, Download, Archive, ChevronDown, X, Plus, MoreHorizontal, ExternalLink, Sparkles, RefreshCw } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Status types and config
type CandidateStatus = "nouveau" | "vivier" | "rejete_cv" | "appel_attente" | "appel_confirme" | "rejete_appel" | "invite_entretien" | "rejete_entretien" | "recrute" | "recrute_autre";
const statusConfig: Record<CandidateStatus, {
  label: string;
  className: string;
  color: string;
}> = {
  nouveau: {
    label: "Nouveau",
    className: "status-new",
    color: "bg-info"
  },
  vivier: {
    label: "Vivier",
    className: "status-vivier",
    color: "bg-lavender"
  },
  rejete_cv: {
    label: "Rejeté CV",
    className: "status-rejected",
    color: "bg-destructive"
  },
  appel_attente: {
    label: "Appel en attente",
    className: "status-invited",
    color: "bg-warning"
  },
  appel_confirme: {
    label: "Appel confirmé",
    className: "status-invited",
    color: "bg-warning"
  },
  rejete_appel: {
    label: "Rejeté appel",
    className: "status-rejected",
    color: "bg-destructive"
  },
  invite_entretien: {
    label: "Entretien",
    className: "status-invited",
    color: "bg-warning"
  },
  rejete_entretien: {
    label: "Rejeté entretien",
    className: "status-rejected",
    color: "bg-destructive"
  },
  recrute: {
    label: "Recruté",
    className: "status-recruited",
    color: "bg-success"
  },
  recrute_autre: {
    label: "Recruté ailleurs",
    className: "bg-muted text-muted-foreground",
    color: "bg-muted-foreground"
  }
};

// Mock data
const candidateData = {
  id: "4",
  firstName: "Bob",
  lastName: "Dupont",
  email: "bob.dupont@email.com",
  phone: "+33 6 11 22 33 44",
  status: "recrute" as CandidateStatus,
  titreOffre: "Equipier polyvalent",
  referenceOffre: "EQP-043",
  applicationDate: "13 oct. 2025",
  phoneCallDate: null as string | null,
  interviewDate: null as string | null,
  recruitedDate: "15 jan. 2026",
  conversionTags: [] as string[],
  preferredStore: "Paris Rivoli",
  assignedStore: "Paris Rivoli" as string | null,
  preferredContract: "CDI",
  scores: {
    experience: 0,
    profession: null as number | null,
    disponibilite: null as number | null
  },
  availabilities: {
    monday: {
      morning: true,
      lunch: true,
      afternoon: true
    },
    tuesday: {
      morning: true,
      lunch: true,
      afternoon: true
    },
    wednesday: {
      morning: true,
      lunch: true,
      afternoon: true
    },
    thursday: {
      morning: true,
      lunch: true,
      afternoon: true
    },
    friday: {
      morning: true,
      lunch: true,
      afternoon: true
    },
    saturday: {
      morning: false,
      lunch: false,
      afternoon: false
    },
    sunday: {
      morning: false,
      lunch: false,
      afternoon: false
    }
  },
  storesMatching: [{
    name: "Paris Rivoli",
    score: 100
  }],
  openQuestions: [],
  comments: [{
    id: "1",
    text: "Recrutement finalisé, contrat signé",
    author: "Stephane Boussely",
    date: "15/01/26"
  }, {
    id: "2",
    text: "Dernier entretien validé à l'unanimité",
    author: "Admin SW.AI",
    date: "14/01/26"
  }, {
    id: "3",
    text: "Très bonne impression générale",
    author: "Florian Guerrier",
    date: "12/01/26"
  }, {
    id: "4",
    text: "Tests de compétences réussis",
    author: "Julie Martin",
    date: "10/01/26"
  }, {
    id: "5",
    text: "Présentation impeccable lors de l'entretien",
    author: "Stephane Boussely",
    date: "08/01/26"
  }, {
    id: "6",
    text: "Parcours professionnel cohérent",
    author: "Admin SW.AI",
    date: "05/01/26"
  }, {
    id: "7",
    text: "Recommandations excellentes",
    author: "Florian Guerrier",
    date: "03/01/26"
  }, {
    id: "8",
    text: "Candidat sérieux et ponctuel",
    author: "Julie Martin",
    date: "02/01/26"
  }, {
    id: "9",
    text: "Appel initial très positif",
    author: "Stephane Boussely",
    date: "20/10/25"
  }, {
    id: "10",
    text: "CV bien structuré, à convoquer rapidement",
    author: "Admin SW.AI",
    date: "13/10/25"
  }],
  history: [{
    date: "15 jan. 2026",
    action: "Recruté par",
    user: "Stephane Boussely",
    type: "internal" as const
  }, {
    date: "14 jan. 2026",
    action: "Contrat signé",
    user: "",
    type: "candidate" as const
  }, {
    date: "12 jan. 2026",
    action: "Offre acceptée",
    user: "",
    type: "candidate" as const
  }, {
    date: "10 jan. 2026",
    action: "Proposition salariale envoyée",
    user: "Admin SW.AI",
    type: "internal" as const
  }, {
    date: "08 jan. 2026",
    action: "Entretien final réalisé",
    user: "",
    type: "candidate" as const
  }, {
    date: "05 jan. 2026",
    action: "Entretien technique passé",
    user: "",
    type: "candidate" as const
  }, {
    date: "02 jan. 2026",
    action: "Invitation entretien envoyée",
    user: "Florian Guerrier",
    type: "internal" as const
  }, {
    date: "20 oct. 2025",
    action: "Appel de présélection",
    user: "",
    type: "candidate" as const
  }, {
    date: "15 oct. 2025",
    action: "CV analysé",
    user: "Julie Martin",
    type: "internal" as const
  }, {
    date: "13 oct. 2025",
    action: "Candidature reçue",
    user: "",
    type: "candidate" as const
  }]
};
const dayLabelsShort: Record<string, string> = {
  monday: "Lun",
  tuesday: "Mar",
  wednesday: "Mer",
  thursday: "Jeu",
  friday: "Ven",
  saturday: "Sam",
  sunday: "Dim"
};
const StatusDropdown = ({
  status,
  onStatusChange
}: {
  status: CandidateStatus;
  onStatusChange: (status: CandidateStatus) => void;
}) => {
  const [open, setOpen] = useState(false);
  const config = statusConfig[status];
  return <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
          "border-[0.5px] border-current cursor-pointer",
          config.className,
          "bg-opacity-15 hover:bg-opacity-25"
        )}>
          <span className="w-2 h-2 rounded-full bg-current" />
          {config.label}
          <ChevronDown className="h-4 w-4 ml-1 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="start">
        <p className="text-xs font-medium text-muted-foreground px-3 py-2">Changer le statut</p>
        <div className="space-y-0.5">
          {Object.entries(statusConfig).map(([key, value]) => <button key={key} onClick={() => {
          onStatusChange(key as CandidateStatus);
          setOpen(false);
        }} className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted", status === key && "bg-muted")}>
              <span className={cn("status-badge text-xs", statusConfig[key as CandidateStatus].className)}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {value.label}
              </span>
            </button>)}
        </div>
      </PopoverContent>
    </Popover>;
};

const CandidatPageV4 = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(candidateData);
  const [newComment, setNewComment] = useState("");
  
  const handleStatusChange = (newStatus: CandidateStatus) => {
    setCandidate(prev => ({
      ...prev,
      status: newStatus
    }));
  };

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

  return <ConsoleLayout>
      <div className="relative min-h-screen bg-background">
        {/* Sticky Action Bar */}
        <div className="sticky top-0 z-20 bg-transparent backdrop-blur-xl px-6 lg:px-8 py-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/candidatures")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Retour aux candidatures</span>
              </button>
              {isScrolled && (
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {candidate.firstName[0]}{candidate.lastName[0]}
                  </div>
                  <span className="text-base font-bold text-foreground">
                    {candidate.firstName} {candidate.lastName}
                  </span>
                  <StatusDropdown status={candidate.status} onStatusChange={handleStatusChange} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isScrolled && (
                <>
                  <Button className="gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]">
                    <Calendar className="h-4 w-4" />
                    Planifier un entretien
                  </Button>
                  <Button className="gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]">
                    <RefreshCw className="h-4 w-4" />
                    Réassigner
                  </Button>
                </>
              )}
              <Button variant="outline" size="icon" className="hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
                <Download className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Planifier entretien
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Voir l'offre
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 text-muted-foreground">
                    <Archive className="h-4 w-4" />
                    Archiver
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 lg:px-8 py-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
          {/* Header - only visible when not scrolled */}
          {!isScrolled && (
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {candidate.firstName[0]}{candidate.lastName[0]}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold">
                    {candidate.firstName} {candidate.lastName}
                  </h1>
                  <StatusDropdown status={candidate.status} onStatusChange={handleStatusChange} />
                </div>
                <p className="text-muted-foreground">
                  {candidate.titreOffre} · {candidate.referenceOffre} · {candidate.assignedStore}
                </p>
              </div>
            </div>
          )}

          {/* Success Banner for recruited */}
          {candidate.status === "recrute" && <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
              <Sparkles className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium text-success">Candidat recruté !</p>
                <p className="text-sm text-muted-foreground">
                  Recrutement finalisé le {candidate.recruitedDate} par {candidate.assignedStore}
                </p>
              </div>
            </div>}

          {/* Contact & Info */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Coordonnées</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a href={`mailto:${candidate.email}`} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-info" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium truncate group-hover:text-info transition-colors">{candidate.email}</p>
                </div>
              </a>
              <a href={`tel:${candidate.phone}`} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Téléphone</p>
                  <p className="text-sm font-medium group-hover:text-success transition-colors">{candidate.phone}</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
                <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-coral" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Point de vente</p>
                  <p className="text-sm font-medium">{candidate.preferredStore}</p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Timeline */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Parcours</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 text-center p-4 rounded-xl bg-muted/30">
                <Calendar className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Candidature</p>
                <p className="text-sm font-medium">{candidate.applicationDate}</p>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className="flex-1 text-center p-4 rounded-xl bg-muted/30">
                <Phone className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Appel</p>
                <p className="text-sm font-medium">{candidate.phoneCallDate || "—"}</p>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className="flex-1 text-center p-4 rounded-xl bg-muted/30">
                <User className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Entretien</p>
                <p className="text-sm font-medium">{candidate.interviewDate || "—"}</p>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className={cn("flex-1 text-center p-4 rounded-xl", candidate.status === "recrute" ? "bg-success/10" : "bg-muted/30")}>
                <CheckCircle2 className={cn("h-5 w-5 mx-auto mb-2", candidate.status === "recrute" ? "text-success" : "text-muted-foreground")} />
                <p className="text-xs text-muted-foreground">Décision</p>
                <p className={cn("text-sm font-medium", candidate.status === "recrute" && "text-success")}>
                  {candidate.status === "recrute" ? candidate.recruitedDate : "—"}
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Disponibilités inline */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Disponibilités</h2>
            <div className="flex items-center gap-2">
              {Object.entries(candidate.availabilities).map(([day, slots]) => {
              const available = slots.morning || slots.lunch || slots.afternoon;
              const full = slots.morning && slots.lunch && slots.afternoon;
              return <div key={day} className={cn("flex-1 text-center py-3 rounded-xl border transition-colors", full ? "bg-success/10 border-success/20 text-success" : available ? "bg-warning/10 border-warning/20 text-warning" : "bg-muted/50 border-border text-muted-foreground")}>
                    <p className="text-xs font-medium">{dayLabelsShort[day]}</p>
                    {full && <CheckCircle2 className="h-4 w-4 mx-auto mt-1" />}
                  </div>;
            })}
            </div>
          </section>

          <Separator />

          {/* Notes */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Notes internes</h2>
              <Badge variant="secondary">{candidate.comments.length}</Badge>
            </div>
            
            <div className="space-y-3">
              {/* Add comment */}
              <div className="flex gap-3">
                <Textarea
                  placeholder="Ajouter une note..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 min-h-[60px]"
                />
                <Button className="self-end gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="h-[300px]">
                <div className="space-y-2 pr-4">
                  {candidate.comments.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg border border-border bg-white">
                      <p className="text-sm">{comment.text}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span className="font-medium">{comment.author}</span>
                        <span>•</span>
                        <span>{comment.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </section>

          <Separator />

          {/* History */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Historique complet</h2>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4 pr-4">
                {candidate.history.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2 shrink-0",
                      event.type === "candidate" ? "bg-success" : "bg-info"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{event.action}</p>
                      {event.user && (
                        <p className="text-xs text-muted-foreground">{event.user}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{event.date}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>
        </div>
      </div>
    </ConsoleLayout>;
};

export default CandidatPageV4;
