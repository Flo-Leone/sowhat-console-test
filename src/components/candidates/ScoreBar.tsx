import { cn } from "@/lib/utils";

interface ScoreBarProps {
  value: number | null;
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md";
  compact?: boolean;
}

export const ScoreBar = ({ value, max = 100, showLabel = true, size = "sm", compact = false }: ScoreBarProps) => {
  if (value === null) {
    return <span className="text-muted-foreground text-xs">—</span>;
  }

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const getScoreClass = () => {
    if (percentage >= 70) return "score-high";
    if (percentage >= 40) return "score-medium";
    return "score-low";
  };

  // Compact version: score inside the bar
  if (compact) {
    return (
      <div className="relative w-12 h-5 rounded bg-muted overflow-hidden">
        <div
          className={cn("h-full transition-all", getScoreClass())}
          style={{ width: `${percentage}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-2xs font-medium text-foreground">
          {value}%
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", size === "sm" ? "w-16" : "w-24")}>
      <div className={cn("flex-1", size === "sm" ? "score-bar" : "score-bar h-2")}>
        <div
          className={cn("score-fill", getScoreClass())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn(
          "font-medium tabular-nums",
          size === "sm" ? "text-2xs text-muted-foreground" : "text-sm"
        )}>
          {value}%
        </span>
      )}
    </div>
  );
};
