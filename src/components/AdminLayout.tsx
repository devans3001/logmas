import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Award,
  Store,
  Building2,
  CreditCard,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Map,
  Home,
  Bell,
  Shield,
  ChevronDown,
  DollarSign,
  Briefcase,
  Package,
  AlertCircle,
  Receipt,
  Repeat2,
  User,
  Zap,
} from "lucide-react";
import emblem from "@/assets/logmas-emblem.png";
import { logout } from "@/lib/auth";

interface NavSection {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path?: string;
  submenu?: Array<{ label: string; path: string }>;
}

const adminNav: NavSection[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  {
    icon: DollarSign,
    label: "Revenue & Services",
    submenu: [
      { label: "Revenue Dashboard", path: "/admin/revenue/dashboard" },
      // { label: "Revenue Catalogue", path: "/admin/revenue/catalogue" },
      { label: "Revenue Settings", path: "/admin/revenue/settings" },
      // { label: "Citizen Applications", path: "/admin/revenue/citizen-apps" },
      // { label: "Business Applications", path: "/admin/revenue/business-apps" },
      // { label: "Market Revenue", path: "/admin/revenue/market" },
      // { label: "Property & Street Revenue", path: "/admin/revenue/property-street" },
      // { label: "Environmental Revenue", path: "/admin/revenue/environmental" },
      // { label: "Transport Revenue", path: "/admin/revenue/transport" },
      // { label: "Advertisement Revenue", path: "/admin/revenue/advertisement" },
      // { label: "Agriculture & Abattoir", path: "/admin/revenue/agriculture" },
      // { label: "Health & Food Permits", path: "/admin/revenue/health" },
      // { label: "Event & Entertainment", path: "/admin/revenue/events" },
      // { label: "Government Assets & Rentals", path: "/admin/revenue/assets" },
      // { label: "Fines & Penalties", path: "/admin/revenue/penalties" },
      // { label: "Invoices & Payments", path: "/admin/revenue/invoices" },
      // { label: "Receipts & Verification", path: "/admin/revenue/receipts" },
      // { label: "Renewal Management", path: "/admin/revenue/renewals" },
      // { label: "Field Officer Collection", path: "/admin/revenue/field-collection" },
      // { label: "Revenue Reports", path: "/admin/revenue/reports" },
    ],
  },
  { icon: FileText, label: "Applications", path: "/admin/applications" },
  { icon: Award, label: "Certificates", path: "/admin/certificates" },
  { icon: Map, label: "Street Applications", path: "/admin/streets" },
  { icon: Home, label: "Tenement Rate", path: "/admin/tenement" },
  { icon: Store, label: "Shops", path: "/admin/shops" },
  { icon: Building2, label: "Businesses", path: "/admin/businesses" },
  { icon: CreditCard, label: "Payments", path: "/admin/payments" },
  { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  { icon: MessageSquare, label: "Tickets", path: "/admin/tickets" },
  { icon: Users, label: "Officers", path: "/admin/officers" },
  { icon: Shield, label: "Users", path: "/admin/users" },
  // { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isMenuActive = (item: NavSection) => {
    if (item.path) return location.pathname === item.path;
    if (item.submenu) {
      return item.submenu.some((sub) => location.pathname === sub.path);
    }
    return false;
  };

  return (
    <div className="min-h-screen flex bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border sticky top-0 bg-sidebar">
          <img src={emblem} alt="LOGMAS" className="h-8 w-8 brightness-200" />
          <div>
            <span className="font-display font-bold text-base">LOGMAS</span>
            <span className="block text-xs text-sidebar-foreground/60">Admin Portal</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-sidebar-foreground/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {adminNav.map((item) => {
            const active = isMenuActive(item);
            const hasSubmenu = !!item.submenu;
            const isExpanded = expandedMenu === item.label;

            if (hasSubmenu) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setExpandedMenu(isExpanded ? null : item.label)
                    }
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                      {item.submenu?.map((sub) => {
                        const subActive = location.pathname === sub.path;
                        return (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              subActive
                                ? "bg-sidebar-accent/30 text-sidebar-accent-foreground"
                                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/20"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path || "#"}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border sticky bottom-0 bg-sidebar">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-4 lg:px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-display font-semibold text-lg text-foreground">
            Admin Portal
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/admin/tickets"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-[10px] flex items-center justify-center font-bold">
                5
              </span>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;