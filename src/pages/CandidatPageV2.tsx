// Variante 2 - Design avec tabs pour organiser le contenu
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, FileText, MapPin, User, MessageSquare, Send, History, CheckCircle2, Download, Archive, RefreshCw, ChevronDown, X, Plus, Briefcase, Clock, Star } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Status types and config
type CandidateStatus = "nouveau" | "vivier" | "rejete_cv" | "appel_attente" | "appel_confirme" | "rejete_appel" | "invite_entretien" | "rejete_entretien" | "recrute" | "recrute_autre";
const statusConfig: Record<CandidateStatus, {
  label: string;
  className: string;
}> = {
  nouveau: {
    label: "Nouveau",
    className: "status-new"
  },
  vivier: {
    label: "Vivier",
    className: "status-vivier"
  },
  rejete_cv: {
    label: "Rejeté après CV",
    className: "status-rejected"
  },
  appel_attente: {
    label: "Appel en attente",
    className: "status-invited"
  },
  appel_confirme: {
    label: "Appel confirmé",
    className: "status-invited"
  },
  rejete_appel: {
    label: "Rejeté après appel",
    className: "status-rejected"
  },
  invite_entretien: {
    label: "Invité pour entretien",
    className: "status-invited"
  },
  rejete_entretien: {
    label: "Rejeté après entretien",
    className: "status-rejected"
  },
  recrute: {
    label: "Recruté",
    className: "status-recruited"
  },
  recrute_autre: {
    label: "Recruté ailleurs",
    className: "bg-muted text-muted-foreground"
  }
};
const conversionTagOptions = ["10H", "25H", "48H"];

// Mock data
const candidateData = {
  id: "2",
  firstName: "Jean-Philippe",
  lastName: "Selle",
  email: "jean-philippe@gallika.fr",
  phone: "+33 6 12 34 56 78",
  status: "invite_entretien" as CandidateStatus,
  titreOffre: "Equipier polyvalent",
  applicationDate: "Monday, October 13, 2025",
  phoneCallDate: "Nov 12, 2025, 10:50:36 AM",
  interviewDate: "Oct 15, 2025, 2:30:00 PM",
  conversionTags: ["10H"] as string[],
  preferredStore: "Point de vente Paris Carrousel Du Louvre",
  assignedStore: null as string | null,
  preferredContract: "CDI",
  cvUrl: "#",
  availabilities: {
    monday: {
      morning: true,
      lunch: false,
      afternoon: false
    },
    tuesday: {
      morning: false,
      lunch: false,
      afternoon: false
    },
    wednesday: {
      morning: false,
      lunch: false,
      afternoon: false
    },
    thursday: {
      morning: false,
      lunch: false,
      afternoon: false
    },
    friday: {
      morning: false,
      lunch: false,
      afternoon: false
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
    name: "Paris Carrousel Du Louvre",
    score: 92
  }, {
    name: "Paris Rivoli",
    score: 78
  }, {
    name: "Paris Opéra",
    score: 65
  }],
  openQuestions: [{
    question: "Avez-vous déjà travaillé dans notre secteur d'activité auparavant ?",
    answer: "Yes"
  }],
  comments: [{
    id: "1",
    text: "Candidat très motivé, bon profil",
    author: "Admin SW.AI",
    date: "01/19/26, 10:30 AM"
  }, {
    id: "2",
    text: "A confirmé sa disponibilité pour l'entretien",
    author: "Stephane Boussely",
    date: "01/18/26, 3:45 PM"
  }, {
    id: "3",
    text: "Expérience solide dans la restauration rapide",
    author: "Florian Guerrier",
    date: "01/17/26, 11:20 AM"
  }, {
    id: "4",
    text: "Bonne présentation lors de l'appel",
    author: "Julie Martin",
    date: "01/16/26, 4:15 PM"
  }, {
    id: "5",
    text: "Ponctuel et professionnel",
    author: "Stephane Boussely",
    date: "01/15/26, 9:00 AM"
  }, {
    id: "6",
    text: "A posé des questions pertinentes sur le poste",
    author: "Admin SW.AI",
    date: "01/14/26, 2:30 PM"
  }, {
    id: "7",
    text: "Flexibilité horaire à confirmer",
    author: "Florian Guerrier",
    date: "01/13/26, 11:45 AM"
  }, {
    id: "8",
    text: "Références à vérifier",
    author: "Julie Martin",
    date: "01/12/26, 3:00 PM"
  }, {
    id: "9",
    text: "Connaissance du secteur confirmée",
    author: "Stephane Boussely",
    date: "01/11/26, 10:20 AM"
  }, {
    id: "10",
    text: "Premier contact positif par email",
    author: "Admin SW.AI",
    date: "01/10/26, 8:45 AM"
  }],
  history: [{
    date: "Jan 19, 2026",
    action: "Consulté par",
    user: "Florian Guerrier",
    type: "internal" as const
  }, {
    date: "Jan 18, 2026",
    action: "Relance effectuée",
    user: "Admin SW.AI",
    type: "internal" as const
  }, {
    date: "Jan 15, 2026",
    action: "Entretien planifié",
    user: "Stephane Boussely",
    type: "internal" as const
  }, {
    date: "Jan 12, 2026",
    action: "Documents demandés",
    user: "Julie Martin",
    type: "internal" as const
  }, {
    date: "Nov 12, 2025",
    action: "Date d'appel modifiée",
    user: "Stephane Boussely",
    type: "internal" as const
  }, {
    date: "Nov 10, 2025",
    action: "Appel de présélection",
    user: "",
    type: "candidate" as const
  }, {
    date: "Nov 05, 2025",
    action: "CV téléchargé",
    user: "Admin SW.AI",
    type: "internal" as const
  }, {
    date: "Oct 31, 2025",
    action: "Email de confirmation envoyé",
    user: "",
    type: "candidate" as const
  }, {
    date: "Oct 30, 2025",
    action: "Candidature assignée",
    user: "Florian Guerrier",
    type: "internal" as const
  }, {
    date: "Oct 29, 2025",
    action: "Candidature soumise",
    user: "",
    type: "candidate" as const
  }]
};
const allStores = ["Paris Carrousel Du Louvre", "Paris Rivoli", "Paris Opéra", "Lyon Part-Dieu", "Marseille Vieux-Port"];
const dayLabels: Record<string, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche"
};

// Reusable components
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
        }} className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted", status === key && "bg-muted")}>
              <span className={cn("status-badge text-xs", statusConfig[key as CandidateStatus].className)}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {value.label}
              </span>
            </button>)}
        </div>
      </PopoverContent>
    </Popover>;
};
const tagColorMap: Record<string, string> = {
  "10H": "bg-lavender/20 text-lavender border-lavender/30",
  "25H": "bg-coral/20 text-coral border-coral/30",
  "48H": "bg-primary/20 text-primary border-primary/30"
};
const ConversionTagsEditor = ({
  tags,
  onTagsChange
}: {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const availableTags = conversionTagOptions.filter(t => !tags.includes(t));
  return <div className="flex items-center gap-1.5">
      {tags.map(tag => <Badge key={tag} variant="secondary" className={cn("border group/tag relative pr-6", tagColorMap[tag] || "bg-muted text-muted-foreground")}>
          {tag}
          <button onClick={() => onTagsChange(tags.filter(t => t !== tag))} className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/tag:opacity-100 transition-opacity hover:text-destructive">
            <X className="h-3 w-3" />
          </button>
        </Badge>)}
      {availableTags.length > 0 && <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-muted-foreground hover:bg-muted transition-colors">
              <Plus className="h-3 w-3" />
              Tag
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="start">
            {availableTags.map(tag => <button key={tag} onClick={() => {
          onTagsChange([...tags, tag]);
          setOpen(false);
        }} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted">
                {tag}
              </button>)}
          </PopoverContent>
        </Popover>}
    </div>;
};

const CandidatPageV2 = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(candidateData);
  const [activeTab, setActiveTab] = useState("profil");
  const [newComment, setNewComment] = useState("");
  
  const handleStatusChange = (newStatus: CandidateStatus) => {
    setCandidate(prev => ({
      ...prev,
      status: newStatus
    }));
  };
  const handleTagsChange = (newTags: string[]) => {
    setCandidate(prev => ({
      ...prev,
      conversionTags: newTags
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
      <div className="relative">
        {/* Sticky Action Bar */}
        <div className="sticky top-0 z-20 bg-transparent backdrop-blur-xl px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/candidatures")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Retour aux candidatures</span>
              </button>
              {isScrolled && (
                <div className="flex items-center gap-3 pl-4 border-l border-border">
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
              <Button variant="outline" className="gap-2 hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
                <Download className="h-4 w-4" />
                CV
              </Button>
              <Button variant="outline" className="gap-2 hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
                <Archive className="h-4 w-4" />
                Archiver
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Hero Header with gradient background - only visible when not scrolled */}
          {!isScrolled && (
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-lavender/10 via-coral/5 to-primary/10 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-lavender flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {candidate.firstName[0]}{candidate.lastName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl font-bold text-foreground">
                        {candidate.firstName} {candidate.lastName}
                      </h1>
                      <StatusDropdown status={candidate.status} onStatusChange={handleStatusChange} />
                    </div>
                    <p className="text-muted-foreground mt-1 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {candidate.titreOffre}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <ConversionTagsEditor tags={candidate.conversionTags} onTagsChange={handleTagsChange} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick info bar */}
              <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-border/50">
                <a href={`mailto:${candidate.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4 text-info" />
                  {candidate.email}
                </a>
                <a href={`tel:${candidate.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Phone className="h-4 w-4 text-success" />
                  {candidate.phone}
                </a>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-warning" />
                  {candidate.applicationDate}
                </span>
              </div>
            </div>
          )}

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
              <TabsTrigger value="profil" className="gap-2 data-[state=active]:bg-white">
                <User className="h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="matching" className="gap-2 data-[state=active]:bg-white">
                <Star className="h-4 w-4" />
                Matching
              </TabsTrigger>
              <TabsTrigger value="disponibilites" className="gap-2 data-[state=active]:bg-white">
                <Clock className="h-4 w-4" />
                Disponibilités
              </TabsTrigger>
              <TabsTrigger value="commentaires" className="gap-2 data-[state=active]:bg-white">
                <MessageSquare className="h-4 w-4" />
                Commentaires ({candidate.comments.length})
              </TabsTrigger>
              <TabsTrigger value="historique" className="gap-2 data-[state=active]:bg-white">
                <History className="h-4 w-4" />
                Historique
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profil" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-info/10 border-info/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-base">Entretiens</CardTitle>
                    <Button size="sm" className="gap-2 h-8 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]">
                      <Calendar className="h-4 w-4" />
                      Planifier un entretien
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 border border-info/20">
                      <Calendar className="h-5 w-5 text-info" />
                      <div>
                        <p className="text-xs text-muted-foreground">Entretien planifié</p>
                        <p className="text-sm font-medium">{candidate.interviewDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 border border-info/20">
                      <Phone className="h-5 w-5 text-info" />
                      <div>
                        <p className="text-xs text-muted-foreground">Dernier appel</p>
                        <p className="text-sm font-medium">{candidate.phoneCallDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-coral/10 border-coral/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-base">Préférences & Matching</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2 h-8 hover:border-[hsl(18_100%_45%)] hover:text-[hsl(18_100%_45%)] hover:bg-[hsl(18_100%_45%/0.12)]">
                      <RefreshCw className="h-4 w-4" />
                      Réassigner
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 border border-coral/20">
                      <MapPin className="h-5 w-5 text-coral" />
                      <div>
                        <p className="text-xs text-muted-foreground">Point de vente préféré</p>
                        <p className="text-sm font-medium">{candidate.preferredStore}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 border border-coral/20">
                      <FileText className="h-5 w-5 text-coral" />
                      <div>
                        <p className="text-xs text-muted-foreground">Contrat préféré</p>
                        <p className="text-sm font-medium">{candidate.preferredContract}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Questions ouvertes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {candidate.openQuestions.map((q, i) => (
                      <div key={i} className="p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-2">{q.question}</p>
                        <p className="font-medium">{q.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="matching" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Matching des points de vente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidate.storesMatching.map((store, index) => (
                    <div key={store.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          index === 0 ? "bg-success text-white" : "bg-muted text-muted-foreground"
                        )}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{store.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              store.score >= 80 ? "bg-success" : store.score >= 60 ? "bg-warning" : "bg-coral"
                            )}
                            style={{ width: `${store.score}%` }}
                          />
                        </div>
                        <span className={cn(
                          "text-sm font-bold",
                          store.score >= 80 ? "text-success" : store.score >= 60 ? "text-warning" : "text-coral"
                        )}>
                          {store.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="disponibilites" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Disponibilités hebdomadaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {Object.entries(candidate.availabilities).map(([day, slots]) => (
                      <div key={day} className="text-center space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{dayLabels[day]}</p>
                        <div className="space-y-1">
                          <div className={cn(
                            "h-8 rounded flex items-center justify-center text-xs",
                            slots.morning ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                          )}>
                            Matin
                          </div>
                          <div className={cn(
                            "h-8 rounded flex items-center justify-center text-xs",
                            slots.lunch ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                          )}>
                            Midi
                          </div>
                          <div className={cn(
                            "h-8 rounded flex items-center justify-center text-xs",
                            slots.afternoon ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                          )}>
                            Après-midi
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commentaires" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Commentaires internes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add comment */}
                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Ajouter un commentaire..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1"
                    />
                    <Button className="self-end gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Comments list */}
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3 pr-4">
                      {candidate.comments.map((comment) => (
                        <div key={comment.id} className="p-3 rounded-lg bg-muted/30 space-y-2">
                          <p className="text-sm">{comment.text}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">{comment.author}</span>
                            <span>•</span>
                            <span>{comment.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historique" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Historique des actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ConsoleLayout>;
};

export default CandidatPageV2;
