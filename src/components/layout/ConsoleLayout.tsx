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
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
