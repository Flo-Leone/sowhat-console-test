import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Users,
  MapPin,
  BarChart2,
  Briefcase,
  Settings,
  UserCheck,
  Building2,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import sowhatLogo from "@/assets/sowhat-logo.png";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  children?: { to: string; label: string }[];
  collapsed?: boolean;
}

const NavItem = ({ to, icon: Icon, label, badge, children, collapsed }: NavItemProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = location.pathname === to || location.pathname.startsWith(to + "/");
  const hasChildren = children && children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "nav-item w-full justify-between",
            isActive && "bg-sidebar-accent"
          )}
        >
          <span className="flex items-center gap-3">
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>{label}</span>}
          </span>
          {!collapsed && (
            isOpen ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )
          )}
        </button>
        {isOpen && !collapsed && (
          <div className="ml-7 mt-1 space-y-0.5 border-l border-border pl-3">
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                  cn(
                    "block py-2 px-3 rounded-md text-sm transition-colors",
                    isActive
                      ? "text-foreground font-medium bg-sidebar-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                  )
                }
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
        cn("nav-item", isActive && "active")
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1">{label}</span>
          {badge !== undefined && badge > 0 && (
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-2xs font-semibold">
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

const navItems = [
  { to: "/candidatures", icon: Users, label: "Candidatures", badge: 4 },
  { to: "/points-de-vente", icon: MapPin, label: "Points de vente" },
  { to: "/statistiques", icon: BarChart2, label: "Statistiques" },
  {
    to: "/offres-emploi",
    icon: Briefcase,
    label: "Offres d'emploi",
    children: [
      { to: "/offres-emploi/en-cours", label: "Offres en cours" },
      { to: "/offres-emploi/demandes", label: "Demandes d'offres" },
      { to: "/offres-emploi/modeles", label: "Modèles d'offres" },
    ],
  },
  {
    to: "/parametres",
    icon: Settings,
    label: "Paramètres",
  },
];

const secondaryNavItems = [
  { to: "/employes", icon: UserCheck, label: "Employés" },
  { to: "/utilisateurs", icon: Building2, label: "Utilisateurs" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Collapse toggle */}
      <div className="flex items-center justify-end p-3 border-b border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
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
            <NavItem key={item.to} {...item} collapsed={collapsed} />
          ))}
        </div>

        {/* Section divider */}
        <div className="pt-4 pb-2">
          {!collapsed && (
            <span className="px-3 text-2xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Gestion
            </span>
          )}
          <div className="mt-2 space-y-1">
            {secondaryNavItems.map((item) => (
              <NavItem key={item.to} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>
      </nav>

      {/* Footer: SoWhat branding */}
      <div className={cn(
        "p-4 border-t border-sidebar-border",
        collapsed ? "flex justify-center" : ""
      )}>
        {collapsed ? (
          <img src={sowhatLogo} alt="SoWhat.ai" className="h-6 w-6 opacity-60" />
        ) : (
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <img src={sowhatLogo} alt="SoWhat.ai" className="h-5 w-5" />
            <span className="text-xs text-muted-foreground">
              Powered by <span className="font-semibold">SoWhat.ai</span>
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
