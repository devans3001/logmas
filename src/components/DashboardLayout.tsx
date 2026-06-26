import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  CreditCard,
  Download,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Map,
  Home,
  Building2,
  Store,
  User,
  HelpCircle,
} from "lucide-react";
import emblem from "@/assets/logmas-emblem.png";
import { logout } from "@/lib/auth";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Apply Certificate", path: "/dashboard/apply" },
  {
    icon: FolderOpen,
    label: "My Applications",
    path: "/dashboard/applications",
  },
  {
    icon: Download,
    label: "Approved Certificates",
    path: "/dashboard/certificates",
  },
  {
    icon: Map,
    label: "Street Registration",
    path: "/dashboard/street-registration",
  },
  { icon: Home, label: "Tenement Rate", path: "/dashboard/tenement-rate" },
  { icon: Building2, label: "Demand Notice", path: "/dashboard/demand-notice" },
  { icon: Store, label: "Shop Levy", path: "/dashboard/shop-levy" },
  { icon: CreditCard, label: "Payment History", path: "/dashboard/payments" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  { icon: MessageSquare, label: "Raise Ticket", path: "/dashboard/tickets" },
  { icon: HelpCircle, label: "FAQ / Help", path: "/faq" },
  { icon: User, label: "Profile Settings", path: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
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
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
          <img src={emblem} alt="LOGMAS" className="h-8 w-8 brightness-200" />
          <div>
            <span className="font-display font-bold text-base">LOGMAS</span>
            <span className="block text-xs text-sidebar-foreground/60">
             Citizen
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-sidebar-foreground/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
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

        <div className="p-3 border-t border-sidebar-border">
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
            Citizen Portal
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/dashboard/notifications"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-[10px] flex items-center justify-center font-bold">
                3
              </span>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
