import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { useSidebarTheme } from "./SidebarThemeContext";
import { sidebarThemes } from "./SidebarThemes";

interface ConsoleLayoutProps {
  children: React.ReactNode;
}

export const ConsoleLayout = ({ children }: ConsoleLayoutProps) => {
  const { theme } = useSidebarTheme();
  const themeConfig = sidebarThemes[theme];
  
  // Pour le thème Golden, utiliser le fond principal crème spécifique
  const mainBackgroundStyle = themeConfig.mainBackground 
    ? { backgroundColor: `hsl(${themeConfig.mainBackground})` }
    : undefined;
  
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopBar />
      <div className="h-1 w-full bg-gradient-secondary" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main 
          className={`flex-1 overflow-auto ${!themeConfig.mainBackground ? 'bg-gradient-coral' : ''}`}
          style={mainBackgroundStyle}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
