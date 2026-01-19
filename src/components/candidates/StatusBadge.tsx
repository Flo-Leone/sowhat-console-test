import { cn } from "@/lib/utils";

export type CandidateStatus =
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

interface StatusBadgeProps {
  status: CandidateStatus;
  className?: string;
}

const statusConfig: Record<
  CandidateStatus,
  { label: string; className: string }
> = {
  nouveau: {
    label: "Nouveau",
    className: "status-new",
  },
  vivier: {
    label: "Vivier",
    className: "status-vivier",
  },
  rejete_cv: {
    label: "Rejeté après CV",
    className: "status-rejected",
  },
  appel_attente: {
    label: "Appel en attente",
    className: "status-invited",
  },
  appel_confirme: {
    label: "Appel confirmé",
    className: "status-invited",
  },
  rejete_appel: {
    label: "Rejeté après appel",
    className: "status-rejected",
  },
  invite_entretien: {
    label: "Invité pour entretien",
    className: "status-invited",
  },
  rejete_entretien: {
    label: "Rejeté après entretien",
    className: "status-rejected",
  },
  recrute: {
    label: "Recruté",
    className: "status-recruited",
  },
  recrute_autre: {
    label: "Recruté ailleurs",
    className: "bg-muted text-muted-foreground",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span className={cn("status-badge", config.className, className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
};
