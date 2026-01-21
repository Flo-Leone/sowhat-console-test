// Variante 2 - Design avec tabs pour organiser le contenu
import { useState } from "react";
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
        <button className={cn("status-badge cursor-pointer hover:opacity-80 transition-opacity", config.className)}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {config.label}
          <ChevronDown className="h-3 w-3 ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="start">
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
  return <ConsoleLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Version indicator */}
        

        {/* Back Navigation */}
        <button onClick={() => navigate("/candidatures")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Retour aux candidatures</span>
        </button>

        {/* Hero Header with gradient background */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-lavender/10 via-coral/5 to-primary/10 border border-border p-6">
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

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2 bg-white/50">
                <Phone className="h-4 w-4" />
                Appeler
              </Button>
              <Button variant="outline" className="gap-2 bg-white/50">
                <Calendar className="h-4 w-4" />
                Planifier
              </Button>
              <Button variant="outline" className="gap-2 bg-white/50">
                <Download className="h-4 w-4" />
                CV
              </Button>
              <Button variant="outline" className="gap-2 bg-white/50">
                <Archive className="h-4 w-4" />
                Archiver
              </Button>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dates clés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-info/5">
                    <Phone className="h-5 w-5 text-info" />
                    <div>
                      <p className="text-xs text-muted-foreground">Appel</p>
                      <p className="text-sm font-medium">{candidate.phoneCallDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5">
                    <Calendar className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-xs text-muted-foreground">Entretien</p>
                      <p className="text-sm font-medium">{candidate.interviewDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Préférences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-coral/5">
                    <MapPin className="h-5 w-5 text-coral" />
                    <div>
                      <p className="text-xs text-muted-foreground">Point de vente préféré</p>
                      <p className="text-sm font-medium">{candidate.preferredStore}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-lavender/5">
                    <FileText className="h-5 w-5 text-lavender" />
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
                  {candidate.openQuestions.map((q, index) => <div key={index} className="p-4 rounded-lg bg-info/5 border border-info/10">
                      <p className="text-sm font-medium mb-2">{q.question}</p>
                      <p className="text-sm text-info">{q.answer}</p>
                    </div>)}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matching" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Matching dynamique des points de vente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.storesMatching.map((store, index) => <div key={store.name} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold", index === 0 ? "bg-success/20 text-success" : "bg-muted text-muted-foreground")}>
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-medium">{store.name}</span>
                          {index === 0 && <Badge className="ml-2 bg-success/10 text-success border-0">Meilleur match</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-3 rounded-full bg-muted overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all", store.score >= 80 ? "bg-success" : store.score >= 60 ? "bg-warning" : "bg-destructive")} style={{
                        width: `${store.score}%`
                      }} />
                        </div>
                        <span className={cn("text-lg font-bold min-w-[50px] text-right", store.score >= 80 ? "text-success" : store.score >= 60 ? "text-warning" : "text-destructive")}>
                          {store.score}%
                        </span>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disponibilites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Disponibilités hebdomadaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8 gap-2 text-center">
                  <div></div>
                  {Object.keys(candidate.availabilities).map(day => <div key={day} className="text-xs font-medium text-muted-foreground py-2">
                      {dayLabels[day].slice(0, 3)}
                    </div>)}
                  
                  <div className="text-xs font-medium text-muted-foreground py-3">Matin</div>
                  {Object.values(candidate.availabilities).map((slots, i) => <div key={`morning-${i}`} className="py-2">
                      <div className={cn("w-8 h-8 rounded-lg mx-auto flex items-center justify-center", slots.morning ? "bg-success/20" : "bg-muted")}>
                        {slots.morning && <CheckCircle2 className="h-4 w-4 text-success" />}
                      </div>
                    </div>)}
                  
                  <div className="text-xs font-medium text-muted-foreground py-3">Midi</div>
                  {Object.values(candidate.availabilities).map((slots, i) => <div key={`lunch-${i}`} className="py-2">
                      <div className={cn("w-8 h-8 rounded-lg mx-auto flex items-center justify-center", slots.lunch ? "bg-success/20" : "bg-muted")}>
                        {slots.lunch && <CheckCircle2 className="h-4 w-4 text-success" />}
                      </div>
                    </div>)}
                  
                  <div className="text-xs font-medium text-muted-foreground py-3">Après-midi</div>
                  {Object.values(candidate.availabilities).map((slots, i) => <div key={`afternoon-${i}`} className="py-2">
                      <div className={cn("w-8 h-8 rounded-lg mx-auto flex items-center justify-center", slots.afternoon ? "bg-success/20" : "bg-muted")}>
                        {slots.afternoon && <CheckCircle2 className="h-4 w-4 text-success" />}
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commentaires" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-lavender" />
                  Commentaires internes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3 pr-4">
                    {candidate.comments.map(comment => <div key={comment.id} className="p-4 rounded-xl bg-lavender/5 border border-lavender/10">
                        <p className="text-sm">{comment.text}</p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span className="font-medium">{comment.author}</span>
                          <span>·</span>
                          <span>{comment.date}</span>
                        </div>
                      </div>)}
                  </div>
                </ScrollArea>

                <div className="pt-4 border-t border-border">
                  <Textarea placeholder="Ajouter un commentaire..." className="min-h-[100px]" />
                  <Button className="mt-3 gap-2">
                    <Send className="h-4 w-4" />
                    Publier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historique" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="h-5 w-5 text-coral" />
                  Historique des actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6 pl-10">
                    {candidate.history.map((event, index) => <div key={index} className="relative">
                        <div className={cn("absolute -left-6 w-4 h-4 rounded-full border-2", event.type === "internal" ? "bg-lavender/20 border-lavender" : "bg-coral/20 border-coral")} />
                        <div className="bg-card p-4 rounded-xl border border-border">
                          <p className="text-xs text-muted-foreground mb-1">{event.date}</p>
                          <p className="text-sm">
                            {event.action}
                            {event.user && <span className="font-medium text-foreground"> {event.user}</span>}
                          </p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ConsoleLayout>;
};
export default CandidatPageV2;