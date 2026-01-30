// Sidebar theme definitions for the 3 color variants
// Carbon (default), Lavender, Coral/Pollen Pale

export type SidebarTheme = "carbon" | "lavender" | "coral";

export const sidebarThemes = {
  carbon: {
    name: "Carbon Premium",
    description: "Sidebar noire avec accents dorés",
    cssVars: {
      "--sidebar-background": "0 0% 12%",
      "--sidebar-foreground": "40 20% 85%",
      "--sidebar-primary": "44 100% 67%",
      "--sidebar-primary-foreground": "0 0% 12%",
      "--sidebar-accent": "0 0% 18%",
      "--sidebar-accent-foreground": "40 39% 95%",
      "--sidebar-border": "0 0% 20%",
      "--sidebar-ring": "44 100% 67%",
    },
    navActiveClass: "bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))]",
    navActiveGlow: "0 2px 8px rgba(255, 210, 85, 0.3)",
    logoVariant: "dark", // uses sowhat-logo-dark.png
  },
  lavender: {
    name: "Lavender Premium",
    description: "Sidebar violet avec accents lavande",
    cssVars: {
      "--sidebar-background": "241 40% 20%",
      "--sidebar-foreground": "245 30% 90%",
      "--sidebar-primary": "241 54% 74%",
      "--sidebar-primary-foreground": "0 0% 100%",
      "--sidebar-accent": "241 35% 28%",
      "--sidebar-accent-foreground": "245 60% 97%",
      "--sidebar-border": "241 30% 30%",
      "--sidebar-ring": "241 54% 74%",
    },
    navActiveClass: "bg-[hsl(var(--soft-lavender))] text-white",
    navActiveGlow: "0 2px 8px rgba(147, 145, 230, 0.4)",
    logoVariant: "dark",
  },
  coral: {
    name: "Coral Pale",
    description: "Sidebar pêche pâle avec accents corail",
    cssVars: {
      "--sidebar-background": "18 60% 96%",
      "--sidebar-foreground": "0 0% 25%",
      "--sidebar-primary": "18 100% 69%",
      "--sidebar-primary-foreground": "0 0% 12%",
      "--sidebar-accent": "18 40% 90%",
      "--sidebar-accent-foreground": "0 0% 20%",
      "--sidebar-border": "18 30% 88%",
      "--sidebar-ring": "18 100% 69%",
    },
    navActiveClass: "bg-[hsl(var(--coral-glow))] text-[hsl(var(--carbon-black))]",
    navActiveGlow: "0 2px 8px rgba(255, 140, 97, 0.3)",
    logoVariant: "light", // uses regular sowhat-logo.png
  },
} as const;

// Helper to apply theme CSS vars to an element
export const applySidebarTheme = (theme: SidebarTheme): React.CSSProperties => {
  const themeConfig = sidebarThemes[theme];
  const styles: Record<string, string> = {};
  
  Object.entries(themeConfig.cssVars).forEach(([key, value]) => {
    styles[key] = value;
  });
  
  return styles as React.CSSProperties;
};
