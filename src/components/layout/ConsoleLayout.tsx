import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

interface ConsoleLayoutProps {
  children: React.ReactNode;
}

export const ConsoleLayout = ({ children }: ConsoleLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gradient-coral">
          <div className="h-2.5 w-full bg-gradient-secondary" />
          {children}
        </main>
      </div>
    </div>
  );
};
