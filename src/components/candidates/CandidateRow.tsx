import { useState } from "react";
import { 
  Phone, 
  Calendar, 
  Clock, 
  Eye, 
  Monitor, 
  Smartphone,
  MoreHorizontal,
  MapPin,
  Briefcase,
  ChevronDown,
  User
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CandidateRowProps {
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

export const CandidateRow = ({ 
  candidate, 
  isSelected, 
  onSelect, 
  onClick 
}: CandidateRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const avgScore = [candidate.scoreExperience, candidate.scoreProfession, candidate.scoreDisponibilite]
    .filter((s): s is number => s !== null)
    .reduce((a, b, _, arr) => a + b / arr.length, 0);

  const hasScores = candidate.scoreExperience !== null || 
                    candidate.scoreProfession !== null || 
                    candidate.scoreDisponibilite !== null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          "bg-card border border-border rounded-lg transition-all duration-200",
          "hover:border-primary/20",
          isSelected && "border-primary/50 bg-primary/5 ring-1 ring-primary/20",
          isOpen && "rounded-b-none border-b-0"
        )}
      >
        {/* Main Row - Always visible */}
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Checkbox */}
          <div 
            className="shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            <Checkbox checked={isSelected} />
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-lavender/20 flex items-center justify-center text-sm font-semibold text-lavender shrink-0">
            {candidate.firstName[0]}{candidate.lastName[0]}
          </div>

          {/* Name & Profession */}
          <div className="min-w-[180px] flex-1">
            <div className="flex items-center gap-2">
              <span 
                className="font-medium text-foreground hover:text-primary cursor-pointer transition-colors"
                onClick={onClick}
              >
                {candidate.firstName} {candidate.lastName}
              </span>
              {candidate.tags.map((tag) => (
                <span 
                  key={tag} 
                  className={cn(
                    "px-1.5 py-0.5 rounded text-2xs font-medium border",
                    tagColorMap[tag] || "bg-muted text-muted-foreground"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground truncate">{candidate.profession}</p>
          </div>

          {/* Status */}
          <div className="shrink-0 min-w-[120px]">
            <StatusBadge status={candidate.status} />
          </div>

          {/* Offre */}
          <div className="hidden md:block min-w-[140px]">
            <p className="text-sm truncate">{candidate.titreOffre}</p>
            <p className="text-xs text-muted-foreground font-mono">{candidate.referenceOffre}</p>
          </div>

          {/* Point de vente */}
          <div className="hidden lg:block min-w-[150px]">
            <p className="text-sm truncate">{candidate.pointVente}</p>
          </div>

          {/* Score moyen */}
          <div className="hidden xl:flex items-center gap-2 min-w-[100px]">
            {hasScores ? (
              <>
                <div className="w-16">
                  <ScoreBar value={Math.round(avgScore)} />
                </div>
                <span className="text-xs text-muted-foreground">moy.</span>
              </>
            ) : (
              <span className="text-xs text-muted-foreground italic">N/A</span>
            )}
          </div>

          {/* Date candidature */}
          <div className="hidden sm:block text-sm text-muted-foreground min-w-[90px]">
            {candidate.dateCandidat}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <CollapsibleTrigger asChild>
              <button 
                className={cn(
                  "p-1.5 rounded-md hover:bg-muted transition-all duration-200",
                  isOpen && "bg-muted"
                )}
              >
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )} />
              </button>
            </CollapsibleTrigger>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={onClick}>Voir le profil</DropdownMenuItem>
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
      </div>

      {/* Expanded Details */}
      <CollapsibleContent>
        <div className={cn(
          "bg-muted/30 border border-t-0 border-border rounded-b-lg px-4 py-4",
          isSelected && "border-primary/50"
        )}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pl-12">
            {/* Offre (visible on mobile) */}
            <div className="md:hidden space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" />
                <span className="text-xs font-medium uppercase tracking-wide">Offre</span>
              </div>
              <p className="text-sm font-medium">{candidate.titreOffre}</p>
              <p className="text-xs text-muted-foreground font-mono">{candidate.referenceOffre}</p>
            </div>

            {/* Point de vente (visible on smaller screens) */}
            <div className="lg:hidden space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs font-medium uppercase tracking-wide">Point de vente</span>
              </div>
              <p className="text-sm font-medium">{candidate.pointVente}</p>
            </div>

            {/* Scores détaillés */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Scores</span>
              {hasScores ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-10">Exp.</span>
                    <ScoreBar value={candidate.scoreExperience} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-10">Prof.</span>
                    <ScoreBar value={candidate.scoreProfession} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-10">Dispo.</span>
                    <ScoreBar value={candidate.scoreDisponibilite} />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">Non évalué</p>
              )}
            </div>

            {/* Dates importantes */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs font-medium uppercase tracking-wide">Dates clés</span>
              </div>
              <div className="space-y-1 text-sm">
                {candidate.appelDate && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-info" />
                    <span className="text-xs">Appel: {candidate.appelDate}</span>
                  </div>
                )}
                {candidate.entretienDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-success" />
                    <span className="text-xs">Entretien: {candidate.entretienDate}</span>
                  </div>
                )}
                {candidate.prochainEvenement && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-warning" />
                    <span className="text-xs">Prochain: {candidate.prochainEvenement}</span>
                  </div>
                )}
                {!candidate.appelDate && !candidate.entretienDate && !candidate.prochainEvenement && (
                  <p className="text-xs text-muted-foreground italic">Aucune date planifiée</p>
                )}
              </div>
            </div>

            {/* Recruteur */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span className="text-xs font-medium uppercase tracking-wide">Recruteur</span>
              </div>
              <p className="text-sm">{candidate.recruteur}</p>
            </div>

            {/* Activité */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Activité</span>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  {candidate.plateforme === "Desktop" ? (
                    <Monitor className="h-3.5 w-3.5" />
                  ) : (
                    <Smartphone className="h-3.5 w-3.5" />
                  )}
                  <span>{candidate.plateforme}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{candidate.vues} vues</span>
                </div>
              </div>
              {candidate.derniereVue && (
                <p className="text-xs text-muted-foreground">
                  Dernière vue: {candidate.derniereVue}
                </p>
              )}
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
