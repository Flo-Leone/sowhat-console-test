import { cn } from "@/lib/utils";

interface ScoreBarProps {
  value: number | null;
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export const ScoreBar = ({ value, max = 100, showLabel = true, size = "sm" }: ScoreBarProps) => {
  if (value === null) {
    return <span className="text-muted-foreground text-sm">n/a</span>;
  }

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const getScoreClass = () => {
    if (percentage >= 70) return "score-high";
    if (percentage >= 40) return "score-medium";
    return "score-low";
  };

  return (
    <div className={cn("flex items-center gap-2", size === "sm" ? "w-20" : "w-28")}>
      <div className={cn("flex-1", size === "sm" ? "score-bar" : "score-bar h-2")}>
        <div
          className={cn("score-fill", getScoreClass())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn(
          "font-medium tabular-nums",
          size === "sm" ? "text-xs text-muted-foreground" : "text-sm"
        )}>
          {value}%
        </span>
      )}
    </div>
  );
};
