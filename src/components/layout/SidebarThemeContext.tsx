import { createContext, useContext, useState, ReactNode } from "react";
import { SidebarTheme } from "./SidebarThemes";

interface SidebarThemeContextType {
  theme: SidebarTheme;
  setTheme: (theme: SidebarTheme) => void;
}

const SidebarThemeContext = createContext<SidebarThemeContextType | undefined>(undefined);

export const SidebarThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<SidebarTheme>("carbon");
  
  return (
    <SidebarThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </SidebarThemeContext.Provider>
  );
};

export const useSidebarTheme = () => {
  const context = useContext(SidebarThemeContext);
  if (!context) {
    throw new Error("useSidebarTheme must be used within a SidebarThemeProvider");
  }
  return context;
};
