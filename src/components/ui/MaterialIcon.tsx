import { cn } from "@/lib/utils";

interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export const MaterialIcon = ({ name, className, filled = false }: MaterialIconProps) => {
  return (
    <span 
      className={cn(
        "material-symbols-outlined",
        className
      )}
      style={{
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0"
      }}
    >
      {name}
    </span>
  );
};
