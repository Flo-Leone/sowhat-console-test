// Sidebar theme configuration - Fixed Porcelain Golden theme

export const sidebarStyles = {
  background: "0 0% 100%",
  foreground: "0 0% 25%",
  primary: "44 100% 67%",
  primaryForeground: "0 0% 12%",
  accent: "40 39% 95%", // Porcelain/floral white for hover
  accentForeground: "38 100% 40%", // Dark golden for hover text
  border: "40 15% 88%",
  ring: "44 100% 67%",
  navActiveClass: "bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))]",
  navActiveGlow: "0 2px 8px rgba(255, 210, 85, 0.3)",
};

// Apply sidebar CSS vars as inline styles
export const getSidebarCssVars = (): React.CSSProperties => ({
  "--sidebar-background": sidebarStyles.background,
  "--sidebar-foreground": sidebarStyles.foreground,
  "--sidebar-primary": sidebarStyles.primary,
  "--sidebar-primary-foreground": sidebarStyles.primaryForeground,
  "--sidebar-accent": sidebarStyles.accent,
  "--sidebar-accent-foreground": sidebarStyles.accentForeground,
  "--sidebar-border": sidebarStyles.border,
  "--sidebar-ring": sidebarStyles.ring,
} as React.CSSProperties);
