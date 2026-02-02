// Variante 1 - Design actuel (classique avec cards)
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, FileText, MapPin, Clock, Building2, User, MessageSquare, Send, History, CheckCircle2, Download, Archive, RefreshCw, ChevronDown, X, Plus } from "lucide-react";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
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

// Conversion tags options
const conversionTagOptions = ["10H", "25H", "48H"];

// Mock data for candidate
const candidateData = {
  id: "1",
  firstName: "Marie",
  lastName: "Dupont",
  email: "marie.dupont@email.com",
  phone: "+33 6 98 76 54 32",
  status: "recrute" as CandidateStatus,
  titreOffre: "Manager",
  applicationDate: "Monday, October 28, 2025",
  phoneCallDate: "Oct 30, 2025, 10:00 AM",
  interviewDate: "Nov 05, 2025, 2:00 PM",
  conversionTags: [] as string[],
  preferredStore: "Paris Rivoli",
  assignedStore: null as string | null,
  preferredContract: "CDI",
  cvUrl: "#",
  availabilities: {
    monday: {
      morning: true,
      lunch: true,
      afternoon: true
    },
    tuesday: {
      morning: true,
      lunch: false,
      afternoon: true
    },
    wednesday: {
      morning: false,
      lunch: false,
      afternoon: true
    },
    thursday: {
      morning: true,
      lunch: true,
      afternoon: false
    },
    friday: {
      morning: true,
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
    name: "Paris Rivoli",
    score: 95
  }, {
    name: "Paris Opéra",
    score: 82
  }, {
    name: "Paris Carrousel Du Louvre",
    score: 70
  }],
  openQuestions: [{
    question: "Pourquoi souhaitez-vous rejoindre notre équipe ?",
    answer: "Je souhaite évoluer vers un poste de management et votre enseigne est reconnue pour sa politique de promotion interne."
  }],
  comments: [{
    id: "1",
    text: "Excellente candidate avec une solide expérience en management. Elle a démontré une capacité remarquable à gérer des équipes de plus de 15 personnes, avec des résultats mesurables en termes de satisfaction client et de performance commerciale. Son parcours montre une progression constante vers des postes à responsabilité. Elle communique de manière très professionnelle et sait mettre en avant ses réalisations avec des exemples concrets. Je recommande vivement de poursuivre le processus de recrutement avec cette candidate. Son profil correspond parfaitement à ce que nous recherchons pour le poste de manager.",
    author: "Stephane Boussely",
    date: "01/19/26, 11:00 AM"
  }, {
    id: "2",
    text: "Entretien très positif. La candidate était très à l'aise à l'oral et a su répondre à toutes nos questions avec pertinence. Elle a montré une bonne connaissance du secteur retail et des enjeux spécifiques à notre marque. Points forts : leadership naturel, bonne gestion du stress, capacité d'adaptation. Elle a également posé des questions très pertinentes sur l'évolution possible au sein de l'entreprise, ce qui montre sa motivation à s'investir sur le long terme.",
    author: "Admin SW.AI",
    date: "01/18/26, 4:00 PM"
  }, {
    id: "3",
    text: "Disponibilité confirmée pour début février. La candidate peut commencer dès le 3 février si besoin, ce qui correspond parfaitement à notre planning d'ouverture du nouveau point de vente. Elle a également mentionné qu'elle serait flexible sur les horaires pendant la période de formation.",
    author: "Florian Guerrier",
    date: "01/17/26, 2:30 PM"
  }, {
    id: "4",
    text: "A négocié le salaire, accord trouvé à 2800€ brut mensuel + primes sur objectifs. La candidate était initialement sur une demande à 3200€ mais a accepté notre contre-proposition compte tenu des perspectives d'évolution et des avantages proposés (mutuelle, tickets restaurant, intéressement).",
    author: "Stephane Boussely",
    date: "01/16/26, 10:15 AM"
  }, {
    id: "5",
    text: "Références vérifiées auprès de l'ancien employeur (Retail Group SA). Retours très positifs sur sa performance, son implication et sa capacité à fédérer les équipes. Son ancien manager a confirmé qu'elle était partie de son plein gré pour des raisons géographiques (déménagement) et qu'il la reprendrait sans hésitation si elle revenait dans la région.",
    author: "Admin SW.AI",
    date: "01/15/26, 3:45 PM"
  }, {
    id: "6",
    text: "Très motivée par le poste de management proposé. Elle voit cette opportunité comme une étape importante dans sa carrière et souhaite développer ses compétences en gestion d'équipe et en pilotage commercial. Elle a notamment apprécié notre politique de formation continue.",
    author: "Julie Martin",
    date: "01/14/26, 11:00 AM"
  }, {
    id: "7",
    text: "CV impressionnant avec 5 ans d'expérience retail dont 3 ans sur des postes d'encadrement. Formation initiale en commerce (BTS MUC) complétée par une licence professionnelle en management des organisations. Maîtrise des outils informatiques courants et du logiciel de caisse utilisé dans nos points de vente.",
    author: "Florian Guerrier",
    date: "01/13/26, 9:30 AM"
  }, {
    id: "8",
    text: "Appel de présélection réussi. Bonne élocution, répond de manière structurée aux questions. A bien préparé l'entretien et connaît notre enseigne. Motivation claire et cohérente avec son projet professionnel. Disponible rapidement.",
    author: "Stephane Boussely",
    date: "01/12/26, 4:00 PM"
  }, {
    id: "9",
    text: "Profil correspond parfaitement aux critères définis dans le brief : expérience management confirmée, connaissance du retail, disponibilité immédiate, mobilité géographique. Score de matching élevé sur tous les critères.",
    author: "Admin SW.AI",
    date: "01/11/26, 2:00 PM"
  }, {
    id: "10",
    text: "Candidature spontanée à considérer en priorité. CV reçu via notre page carrières avec une lettre de motivation personnalisée mentionnant spécifiquement notre enseigne et ses valeurs. Ce type de démarche proactive est toujours un bon indicateur de motivation.",
    author: "Julie Martin",
    date: "01/10/26, 10:00 AM"
  }],
  history: [{
    date: "Jan 19, 2026",
    action: "Statut changé en Recruté par",
    user: "Stephane Boussely",
    type: "internal" as const
  }, {
    date: "Jan 18, 2026",
    action: "Contrat envoyé pour signature",
    user: "Admin SW.AI",
    type: "internal" as const
  }, {
    date: "Jan 16, 2026",
    action: "Négociation salariale finalisée",
    user: "Stephane Boussely",
    type: "internal" as const
  }, {
    date: "Jan 15, 2026",
    action: "Références vérifiées",
    user: "Admin SW.AI",
    type: "internal" as const
  }, {
    date: "Jan 12, 2026",
    action: "Deuxième entretien réalisé",
    user: "",
    type: "candidate" as const
  }, {
    date: "Nov 05, 2025",
    action: "Premier entretien réalisé",
    user: "",
    type: "candidate" as const
  }, {
    date: "Nov 02, 2025",
    action: "Invitation entretien envoyée",
    user: "Florian Guerrier",
    type: "internal" as const
  }, {
    date: "Oct 30, 2025",
    action: "Appel téléphonique effectué",
    user: "",
    type: "candidate" as const
  }, {
    date: "Oct 29, 2025",
    action: "CV analysé et approuvé",
    user: "Julie Martin",
    type: "internal" as const
  }, {
    date: "Oct 28, 2025",
    action: "Candidature reçue",
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

// Status Dropdown Component
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

// Tag color mapping
const tagColorMap: Record<string, string> = {
  "10H": "bg-lavender/20 text-lavender border-lavender/30",
  "25H": "bg-coral/20 text-coral border-coral/30",
  "48H": "bg-primary/20 text-primary border-primary/30"
};

// Conversion Tags Editor Component
const ConversionTagsEditor = ({
  tags,
  onTagsChange
}: {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(t => t !== tagToRemove));
  };
  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
  };
  const availableTags = conversionTagOptions.filter(t => !tags.includes(t));
  return <div className="flex items-center gap-1.5">
      {tags.map(tag => <Badge key={tag} variant="secondary" className={cn("border group/tag relative pr-6", tagColorMap[tag] || "bg-muted text-muted-foreground")}>
          {tag}
          <button onClick={() => removeTag(tag)} className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/tag:opacity-100 transition-opacity hover:text-destructive">
            <X className="h-3 w-3" />
          </button>
        </Badge>)}
      {availableTags.length > 0 && <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-muted-foreground hover:bg-muted transition-colors">
              <Plus className="h-3 w-3" />
              Ajouter un tag
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="start">
            <p className="text-xs font-medium text-muted-foreground mb-2">Tags de conversion</p>
            <div className="space-y-1">
              {availableTags.map(tag => <button key={tag} onClick={() => {
            addTag(tag);
            setOpen(false);
          }} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted">
                  <span className={cn("w-3 h-3 rounded-full", tag === "10H" && "bg-lavender", tag === "25H" && "bg-coral", tag === "48H" && "bg-primary")} />
                  {tag}
                </button>)}
            </div>
          </PopoverContent>
        </Popover>}
    </div>;
};

// Reassign Store Component
const ReassignStoreDropdown = ({
  currentStore,
  onStoreChange
}: {
  currentStore: string | null;
  onStoreChange: (store: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Réassigner
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end">
        <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Assigner à un point de vente</p>
        <div className="space-y-0.5">
          {allStores.map(store => <button key={store} onClick={() => {
          onStoreChange(store);
          setOpen(false);
        }} className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted text-left", currentStore === store && "bg-muted")}>
              <MapPin className="h-4 w-4 text-coral shrink-0" />
              <span className="truncate">{store}</span>
            </button>)}
        </div>
      </PopoverContent>
    </Popover>;
};
const CandidatPageV1 = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(candidateData);
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
  const handleStoreChange = (newStore: string) => {
    setCandidate(prev => ({
      ...prev,
      assignedStore: newStore
    }));
  };
  const handleArchive = () => {
    console.log("Archiving candidate", id);
  };
  const handleReassign = () => {
    console.log("Reassigning candidate", id);
  };
  
  // Scroll detection - target the main container
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
            <button onClick={() => navigate("/candidatures")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Retour aux candidatures</span>
            </button>
            <div className="flex items-center gap-2">
              {isScrolled && (
                <>
                  <Button className="gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]">
                    <Calendar className="h-4 w-4" />
                    Planifier un entretien
                  </Button>
                  <Button className="gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]" onClick={handleReassign}>
                    <RefreshCw className="h-4 w-4" />
                    Réassigner
                  </Button>
                </>
              )}
              <Button className="gap-2 bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))] hover:bg-[hsl(44_100%_80%)]" onClick={handleArchive}>
                <Archive className="h-4 w-4" />
                Archiver
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-md bg-lavender/20 flex items-center justify-center text-2xl font-bold text-lavender">
                {candidate.firstName[0]}{candidate.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-foreground">
                    {candidate.firstName} {candidate.lastName}
                  </h1>
                  <StatusDropdown status={candidate.status} onStatusChange={handleStatusChange} />
                  <ConversionTagsEditor tags={candidate.conversionTags} onTagsChange={handleTagsChange} />
                </div>
                <p className="text-muted-foreground mt-1">
                  Candidature pour: <span className="text-foreground font-medium">{candidate.titreOffre}</span>
                </p>
                {candidate.assignedStore && <p className="text-sm text-coral mt-1 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Assigné à: {candidate.assignedStore}
                  </p>}
                
                {/* Compact profile info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
                  <a href={`mailto:${candidate.email}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-4 w-4 text-info" />
                    <span>{candidate.email}</span>
                  </a>
                  <a href={`tel:${candidate.phone}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="h-4 w-4 text-success" />
                    <span>{candidate.phone}</span>
                  </a>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-warning" />
                    <span>{candidate.applicationDate}</span>
                  </span>
                  <Button variant="link" className="h-auto p-0 text-sm text-lavender hover:text-lavender/80">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Télécharger CV
                  </Button>
                </div>
              </div>
            </div>
          </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Entretiens Card */}
            <Card className="shadow-card">
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-display">Entretiens</CardTitle>
                <Button variant="outline" className="gap-2 hover:border-[hsl(18_100%_50%)] hover:text-[hsl(18_100%_50%)] hover:bg-[hsl(18_100%_50%/0.12)]">
                  <Calendar className="h-4 w-4" />
                  Planifier un entretien
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-info/10 border border-info/20">
                    <Calendar className="h-5 w-5 text-info" />
                    <div>
                      <p className="text-xs text-muted-foreground">Entretien planifié</p>
                      <p className="text-sm font-medium">{candidate.interviewDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-info/10 border border-info/20">
                    <Phone className="h-5 w-5 text-info" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dernier appel</p>
                      <p className="text-sm font-medium">{candidate.phoneCallDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences & Matching Combined */}
            <Card className="shadow-card">
              <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-display">Préférences & Matching</CardTitle>
                <ReassignStoreDropdown currentStore={candidate.assignedStore} onStoreChange={handleStoreChange} />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preferences Section */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Préférences du candidat</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-coral/10 border border-coral/20">
                      <MapPin className="h-5 w-5 text-coral mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Point de vente préféré</p>
                        <p className="text-sm font-medium">{candidate.preferredStore}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-coral/10 border border-coral/20">
                      <FileText className="h-5 w-5 text-coral mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Contrat préféré</p>
                        <p className="text-sm font-medium">{candidate.preferredContract}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Matching Section */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Matching dynamique des points de vente</h4>
                  <div className="space-y-3">
                    {candidate.storesMatching.map((store, index) => <div key={store.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold", index === 0 ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{store.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all", store.score >= 80 ? "bg-success" : store.score >= 60 ? "bg-warning" : "bg-destructive")} style={{
                          width: `${store.score}%`
                        }} />
                          </div>
                          <span className={cn("text-sm font-semibold min-w-[40px] text-right", store.score >= 80 ? "text-success" : store.score >= 60 ? "text-warning" : "text-destructive")}>
                            {store.score}%
                          </span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availabilities */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display">Disponibilités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Jour</th>
                        <th className="text-center py-2 px-4 text-xs font-medium text-muted-foreground">8h - 12h</th>
                        <th className="text-center py-2 px-4 text-xs font-medium text-muted-foreground">12h - 13h</th>
                        <th className="text-center py-2 px-4 text-xs font-medium text-muted-foreground">13h - 18h</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(candidate.availabilities).map(([day, slots]) => <tr key={day} className="border-b border-border last:border-0">
                          <td className="py-3 pr-4 font-medium">{dayLabels[day]}</td>
                          <td className="py-3 px-4 text-center">
                            {slots.morning ? <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              </div> : <div className="w-6 h-6 rounded-full bg-muted mx-auto" />}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {slots.lunch ? <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              </div> : <div className="w-6 h-6 rounded-full bg-muted mx-auto" />}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {slots.afternoon ? <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              </div> : <div className="w-6 h-6 rounded-full bg-muted mx-auto" />}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Open Questions */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display">Questions ouvertes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.openQuestions.map((q, index) => <div key={index} className="p-4 rounded-lg bg-info/5 border border-info/10">
                      <p className="text-sm font-medium text-foreground mb-2">{q.question}</p>
                      <p className="text-sm text-info font-medium">{q.answer}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Comments & History */}
          <div className="space-y-6">
            {/* Internal Comments */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-lavender" />
                  Commentaires internes
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  {candidate.comments.length} commentaires
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-3">
                    {candidate.comments.map(comment => <div key={comment.id} className="p-3 rounded-lg bg-lavender/5 border border-lavender/10">
                        <p className="text-sm">{comment.text}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{comment.author}</span>
                          <span>·</span>
                          <span>{comment.date}</span>
                        </div>
                      </div>)}
                  </div>
                </ScrollArea>

                <div className="pt-2 border-t border-border">
                  <Textarea placeholder="Ajouter un commentaire..." className="min-h-[80px] resize-none" />
                  <Button className="mt-2 w-full gap-2" variant="outline">
                    <Send className="h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action History */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <History className="h-5 w-5 text-coral" />
                  Historique des actions
                </CardTitle>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-lavender/50 border-2 border-lavender" />
                    <span>Interne</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-coral/50 border-2 border-coral" />
                    <span>Candidat</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                  <div className="space-y-4">
                    {candidate.history.map((event, index) => <div key={index} className="flex gap-4 relative">
                        <div className={cn("w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 z-10", event.type === "internal" ? "bg-lavender/20 border-lavender" : "bg-coral/20 border-coral")} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                          <p className="text-sm mt-0.5">
                            {event.action}
                            {event.user && <span className="font-medium text-foreground"> {event.user}</span>}
                          </p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </ConsoleLayout>;
};
export default CandidatPageV1;