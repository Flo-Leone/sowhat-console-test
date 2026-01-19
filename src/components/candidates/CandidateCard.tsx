import { 
  Phone, 
  Calendar, 
  Clock, 
  Eye, 
  Monitor, 
  Smartphone,
  MoreHorizontal,
  MapPin,
  Briefcase
} from "lucide-react";
import { StatusBadge, CandidateStatus } from "@/components/candidates/StatusBadge";
import { ScoreBar } from "@/components/candidates/ScoreBar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: {
    id: string;
    firstName: string;
    lastName: string;
    profession: string;
    titreOffre: string;
    referenceOffre: string;
    dateCandidat: string;
    status: CandidateStatus;
    scoreExperience: number | null;
    scoreProfession: number | null;
    scoreDisponibilite: number | null;
    pointVente: string;
    pointVenteAssigne: string | null;
    appelDate: string | null;
    entretienDate: string | null;
    prochainEvenement: string | null;
    dernierRappel: string | null;
    prochainRappel: string | null;
    tags: string[];
    recruteur: string;
    plateforme: "Desktop" | "Mobile";
    vues: number;
    derniereVue: string | null;
  };
  isSelected: boolean;
  onSelect: () => void;
  onClick: () => void;
}

const tagColorMap: Record<string, string> = {
  "10H": "bg-lavender/20 text-lavender border-lavender/30",
  "25H": "bg-coral/20 text-coral border-coral/30",
  "48H": "bg-primary/20 text-primary border-primary/30",
};

export const CandidateCard = ({ 
  candidate, 
  isSelected, 
  onSelect, 
  onClick 
}: CandidateCardProps) => {
  const hasScores = candidate.scoreExperience !== null || 
                    candidate.scoreProfession !== null || 
                    candidate.scoreDisponibilite !== null;

  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border p-4 transition-all duration-200 cursor-pointer",
        "hover:shadow-card hover:border-primary/20 hover:-translate-y-0.5",
        isSelected && "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
      )}
      onClick={onClick}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div 
            className="pt-0.5"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            <Checkbox checked={isSelected} />
          </div>
          
          {/* Avatar & Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center text-sm font-semibold text-lavender shrink-0">
              {candidate.firstName[0]}{candidate.lastName[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground truncate">
                  {candidate.firstName} {candidate.lastName}
                </h3>
                {candidate.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className={cn(
                      "px-2 py-0.5 rounded-full text-2xs font-medium border",
                      tagColorMap[tag] || "bg-muted text-muted-foreground"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {candidate.profession}
              </p>
            </div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={candidate.status} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              <DropdownMenuItem>Modifier</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Planifier un appel</DropdownMenuItem>
              <DropdownMenuItem>Planifier un entretien</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Archiver</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Offre Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Offre</span>
          </div>
          <p className="text-sm font-medium truncate">{candidate.titreOffre}</p>
          <p className="text-xs text-muted-foreground font-mono">{candidate.referenceOffre}</p>
        </div>

        {/* Point de vente */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Point de vente</span>
          </div>
          <p className="text-sm font-medium truncate">{candidate.pointVente}</p>
          {candidate.pointVenteAssigne && candidate.pointVenteAssigne !== candidate.pointVente && (
            <p className="text-xs text-muted-foreground truncate">
              Assigné: {candidate.pointVenteAssigne}
            </p>
          )}
        </div>

        {/* Dates importantes */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Dates</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Candidature: <span className="text-foreground">{candidate.dateCandidat}</span>
            </p>
            {candidate.appelDate && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3 text-info" />
                <span className="text-xs">{candidate.appelDate}</span>
              </div>
            )}
            {candidate.entretienDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-success" />
                <span className="text-xs">{candidate.entretienDate}</span>
              </div>
            )}
            {candidate.prochainEvenement && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-warning" />
                <span className="text-xs">{candidate.prochainEvenement}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scores */}
        {hasScores ? (
          <div className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Scores</span>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-12">Exp.</span>
                <ScoreBar value={candidate.scoreExperience} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-12">Prof.</span>
                <ScoreBar value={candidate.scoreProfession} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-12">Dispo.</span>
                <ScoreBar value={candidate.scoreDisponibilite} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Scores</span>
            <p className="text-xs text-muted-foreground italic">Non évalué</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Recruteur: <span className="text-foreground">{candidate.recruteur}</span></span>
          <div className="flex items-center gap-1">
            {candidate.plateforme === "Desktop" ? (
              <Monitor className="h-3.5 w-3.5" />
            ) : (
              <Smartphone className="h-3.5 w-3.5" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Eye className="h-3.5 w-3.5" />
          <span>{candidate.vues} vues</span>
          {candidate.derniereVue && (
            <span className="text-muted-foreground/60">• {candidate.derniereVue}</span>
          )}
        </div>
      </div>
    </div>
  );
};
