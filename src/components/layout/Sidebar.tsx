import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FileText,
  Store,
  TrendingUp,
  Briefcase,
  Settings,
  Users,
  User,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Palette,
} from "lucide-react";
import sowhatLogoDark from "@/assets/sowhat-logo-dark.png";
import sowhatLogo from "@/assets/sowhat-logo.png";
import sowhatBubble from "@/assets/sowhat-bubble.png";
import { cn } from "@/lib/utils";
import { sidebarThemes, SidebarTheme, applySidebarTheme } from "./SidebarThemes";
import { useSidebarTheme } from "./SidebarThemeContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  children?: { to: string; label: string }[];
  collapsed?: boolean;
  theme: SidebarTheme;
}

const NavItem = ({ to, icon: Icon, label, badge, children, collapsed, theme }: NavItemProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = location.pathname === to || location.pathname.startsWith(to + "/");
  const hasChildren = children && children.length > 0;
  const themeConfig = sidebarThemes[theme];

  // Auto-open if child is active
  const childIsActive = children?.some(
    (child) => location.pathname === child.to || location.pathname.startsWith(child.to + "/")
  );

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "nav-item w-full justify-between",
            (isActive || childIsActive) && "bg-sidebar-accent"
          )}
        >
          <span className="flex items-center gap-3">
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>{label}</span>}
          </span>
          {!collapsed && (
            isOpen || childIsActive ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )
          )}
        </button>
        {(isOpen || childIsActive) && !collapsed && (
          <div className="ml-7 mt-1 space-y-0.5 border-l border-sidebar-foreground/20 pl-3">
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                end={child.to === "/utilisateurs"}
                className={({ isActive }) =>
                  cn(
                    "block py-2 px-3 rounded-md text-sm transition-colors",
                    isActive
                      ? cn(themeConfig.navActiveClass, "font-medium")
                      : cn(
                          "text-sidebar-foreground/80 hover:bg-sidebar-accent/50",
                          themeConfig.navHoverClass ? `hover:${themeConfig.navHoverClass}` : "hover:text-sidebar-foreground"
                        )
                  )
                }
                style={({ isActive }) => isActive ? { boxShadow: themeConfig.navActiveGlow } : undefined}
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "nav-item",
          isActive && themeConfig.navActiveClass,
          !isActive && themeConfig.navHoverClass && "nav-item-coral-hover"
        )
      }
      style={({ isActive }) => isActive ? { boxShadow: themeConfig.navActiveGlow } : undefined}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1">{label}</span>
          {badge !== undefined && badge > 0 && (
            <span className={cn(
              "flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-2xs font-semibold",
              theme === "carbon" 
                ? "bg-white text-[hsl(var(--carbon-black))]" 
                : theme === "lavender"
                ? "bg-white text-[hsl(241,40%,16%)]"
                : theme === "golden"
                ? "bg-[hsl(var(--carbon-black))] text-white"
                : "bg-[hsl(var(--carbon-black))] text-white"
            )}>
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

const navItems = [
  { to: "/candidatures", icon: FileText, label: "Candidatures", badge: 4 },
  { to: "/points-de-vente", icon: Store, label: "Points de vente" },
  { to: "/statistiques", icon: TrendingUp, label: "Statistiques" },
  { to: "/offres-emploi", icon: Briefcase, label: "Offres d'emploi" },
  { 
    to: "/parametres", 
    icon: Settings, 
    label: "Paramètres",
    children: [
      { to: "/parametres/css", label: "CSS" },
      { to: "/parametres/offres", label: "Offres d'emploi" },
      { to: "/parametres/messages", label: "Messages" },
      { to: "/parametres/pre-embauche", label: "Pré-embauche" },
    ],
  },
];

const secondaryNavItems = [
  { to: "/employes", icon: Users, label: "Employés" },
  { 
    to: "/utilisateurs", 
    icon: User, 
    label: "Utilisateurs",
    children: [
      { to: "/utilisateurs", label: "Liste d'utilisateurs" },
      { to: "/utilisateurs/roles", label: "Rôles" },
    ],
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useSidebarTheme();
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  
  const themeConfig = sidebarThemes[theme];
  const logoSrc = themeConfig.logoVariant === "dark" ? sowhatLogoDark : sowhatLogo;

  return (
    <aside
      className={cn(
        "h-full border-r flex flex-col transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
      style={{
        ...applySidebarTheme(theme),
        backgroundColor: `hsl(${sidebarThemes[theme].cssVars["--sidebar-background"]})`,
        borderColor: `hsl(${sidebarThemes[theme].cssVars["--sidebar-border"]})`,
        color: `hsl(${sidebarThemes[theme].cssVars["--sidebar-foreground"]})`,
      }}
    >
      {/* Collapse toggle + Theme picker */}
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: `hsl(${sidebarThemes[theme].cssVars["--sidebar-border"]})` }}>
        {!collapsed && (
          <Popover open={themePickerOpen} onOpenChange={setThemePickerOpen}>
            <PopoverTrigger asChild>
              <button
                className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
                title="Changer le thème"
              >
                <Palette className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start">
              <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Thème de la sidebar</p>
              <div className="space-y-1">
                {(Object.keys(sidebarThemes) as SidebarTheme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      setThemePickerOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted text-left",
                      theme === t && "bg-muted"
                    )}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border-2"
                      style={{ 
                        backgroundColor: `hsl(${sidebarThemes[t].cssVars["--sidebar-background"]})`,
                        borderColor: `hsl(${sidebarThemes[t].cssVars["--sidebar-primary"]})`
                      }}
                    />
                    <div>
                      <p className="font-medium">{sidebarThemes[t].name}</p>
                      <p className="text-2xs text-muted-foreground">{sidebarThemes[t].description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors ml-auto"
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} collapsed={collapsed} theme={theme} />
          ))}
        </div>

        {/* Section divider */}
        <div className="pt-4 pb-2">
          {!collapsed && (
            <span className="px-3 text-2xs font-semibold uppercase tracking-wider opacity-60">
              Gestion
            </span>
          )}
          <div className="mt-2 space-y-1">
            {secondaryNavItems.map((item) => (
              <NavItem key={item.to} {...item} collapsed={collapsed} theme={theme} />
            ))}
          </div>
        </div>
      </nav>

      {/* Footer: SoWhat branding */}
      <div className={cn(
        "p-4 border-t",
        collapsed ? "flex justify-center" : ""
      )} style={{ borderColor: `hsl(${sidebarThemes[theme].cssVars["--sidebar-border"]})` }}>
      {collapsed ? (
          <img src={sowhatBubble} alt="SoWhat" className="h-6 opacity-60" />
        ) : (
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-xs">
              Powered by
            </span>
            <img src={logoSrc} alt="SoWhat AI" className="h-3.5" />
          </div>
        )}
      </div>
    </aside>
  );
};

