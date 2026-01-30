// Sidebar theme definitions for the 5 color variants
// Carbon, Lavender Nuit, Golden Pale, Coral Pale, Porcelain Coral

export type SidebarTheme = "carbon" | "lavender" | "golden" | "coral" | "porcelain";

interface ThemeConfig {
  name: string;
  description: string;
  cssVars: {
    "--sidebar-background": string;
    "--sidebar-foreground": string;
    "--sidebar-primary": string;
    "--sidebar-primary-foreground": string;
    "--sidebar-accent": string;
    "--sidebar-accent-foreground": string;
    "--sidebar-border": string;
    "--sidebar-ring": string;
  };
  mainBackground?: string; // Optional: custom main content background
  navActiveClass: string;
  navActiveGlow: string;
  navHoverClass?: string; // Optional: custom hover text color
  logoVariant: "dark" | "light";
}

export const sidebarThemes: Record<SidebarTheme, ThemeConfig> = {
  carbon: {
    name: "Carbon Premium",
    description: "Noir carbon, menu actif jaune SoWhat",
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
    logoVariant: "dark",
  },
  lavender: {
    name: "Lavender Nuit",
    description: "Violet profond, menu actif lavande",
    cssVars: {
      "--sidebar-background": "241 40% 18%",
      "--sidebar-foreground": "245 30% 90%",
      "--sidebar-primary": "241 54% 74%",
      "--sidebar-primary-foreground": "0 0% 100%",
      "--sidebar-accent": "241 35% 26%",
      "--sidebar-accent-foreground": "245 60% 97%",
      "--sidebar-border": "241 30% 27%",
      "--sidebar-ring": "241 54% 74%",
    },
    navActiveClass: "bg-[hsl(var(--soft-lavender))] text-white",
    navActiveGlow: "0 2px 8px rgba(147, 145, 230, 0.4)",
    logoVariant: "dark",
  },
  golden: {
    name: "Golden Pale",
    description: "Jaune SoWhat, menu actif 100%",
    cssVars: {
      "--sidebar-background": "48 75% 78%",
      "--sidebar-foreground": "0 0% 20%",
      "--sidebar-primary": "44 100% 67%",
      "--sidebar-primary-foreground": "0 0% 12%",
      "--sidebar-accent": "48 60% 72%",
      "--sidebar-accent-foreground": "0 0% 15%",
      "--sidebar-border": "48 50% 70%",
      "--sidebar-ring": "44 100% 67%",
    },
    mainBackground: "45 50% 97%",
    navActiveClass: "bg-[hsl(var(--golden-pollen))] text-[hsl(var(--carbon-black))]",
    navActiveGlow: "0 2px 8px rgba(255, 210, 85, 0.35)",
    logoVariant: "dark",
  },
  coral: {
    name: "Coral Pale",
    description: "Corail 70%, menu actif 100%",
    cssVars: {
      "--sidebar-background": "18 70% 88%",
      "--sidebar-foreground": "0 0% 20%",
      "--sidebar-primary": "18 100% 69%",
      "--sidebar-primary-foreground": "0 0% 12%",
      "--sidebar-accent": "18 55% 82%",
      "--sidebar-accent-foreground": "0 0% 18%",
      "--sidebar-border": "18 45% 80%",
      "--sidebar-ring": "18 100% 69%",
    },
    navActiveClass: "bg-[hsl(var(--coral-glow))] text-[hsl(var(--carbon-black))]",
    navActiveGlow: "0 2px 8px rgba(255, 140, 97, 0.35)",
    logoVariant: "dark",
  },
  porcelain: {
    name: "Porcelain Coral",
    description: "Fond blanc, accents corail",
    cssVars: {
      "--sidebar-background": "0 0% 100%",
      "--sidebar-foreground": "0 0% 25%",
      "--sidebar-primary": "18 100% 69%",
      "--sidebar-primary-foreground": "0 0% 100%",
      "--sidebar-accent": "40 20% 96%",
      "--sidebar-accent-foreground": "0 0% 20%",
      "--sidebar-border": "40 20% 92%",
      "--sidebar-ring": "18 100% 69%",
    },
    mainBackground: "16 30% 97%",
    navActiveClass: "bg-[hsl(var(--coral-glow))] text-white",
    navActiveGlow: "0 2px 8px rgba(255, 140, 97, 0.3)",
    navHoverClass: "text-[hsl(var(--coral-glow))]",
    logoVariant: "dark",
  },
};

// Helper to apply theme CSS vars to an element
export const applySidebarTheme = (theme: SidebarTheme): React.CSSProperties => {
  const themeConfig = sidebarThemes[theme];
  const styles: Record<string, string> = {};
  
  Object.entries(themeConfig.cssVars).forEach(([key, value]) => {
    styles[key] = value;
  });
  
  return styles as React.CSSProperties;
};
