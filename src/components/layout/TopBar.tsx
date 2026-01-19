import { Bell, Search, ChevronDown, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  clientLogo?: string;
  clientName?: string;
}

export const TopBar = ({ clientLogo, clientName = "GALLIKA" }: TopBarProps) => {
  return (
    <header className="h-14 bg-topbar border-b border-border flex items-center justify-between px-4 lg:px-6 shadow-soft">
      {/* Left: Client Logo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {clientLogo ? (
            <img src={clientLogo} alt={clientName} className="h-7" />
          ) : (
            <span className="text-topbar-foreground font-display font-bold text-lg tracking-wide">
              {clientName}
            </span>
          )}
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-2xs font-medium bg-coral/15 text-coral uppercase tracking-wider">
            Demo Mode
          </span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher candidats, offres..."
            className="w-full bg-muted text-foreground placeholder:text-muted-foreground 
                       rounded-lg pl-10 pr-4 py-2 text-sm border border-border
                       focus:outline-none focus:bg-background focus:border-[hsl(var(--lavender))] focus:ring-2 focus:ring-[hsl(var(--lavender)/0.2)]
                       transition-all duration-150"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-1 
                          px-1.5 py-0.5 rounded text-2xs text-muted-foreground bg-background border border-border">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
        
        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral rounded-full" />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[hsl(var(--lavender))] text-white text-xs font-semibold">
                  SB
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-topbar-foreground">Stephane B.</p>
                <p className="text-2xs text-muted-foreground">Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border shadow-elevated">
            <div className="px-3 py-2 border-b border-border">
              <p className="font-medium text-sm">Stephane Boussely</p>
              <p className="text-xs text-muted-foreground">stephane@gallika.fr</p>
            </div>
            <DropdownMenuItem>Mon profil</DropdownMenuItem>
            <DropdownMenuItem>Préférences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Se déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
