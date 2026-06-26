// src/layouts/WardLayout.tsx
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Bell, LogOut, Menu, X, CheckSquare } from "lucide-react";
import emblem from "@/assets/logmas-emblem.png";
import { logout, getUser } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const wardNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/ward" },
  { icon: FileText, label: "Applications", path: "/ward/applications" },
  { icon: CheckSquare, label: "My Approvals", path: "/ward/approvals" },
  { icon: Bell, label: "Notifications", path: "/ward/notifications" },
];

const WardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getUser();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="min-h-screen flex bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
          <img src={emblem} alt="LOGMAS" className="h-8 w-8 brightness-200" />
          <div>
            <span className="font-display font-bold text-base">LOGMAS</span>
            <span className="block text-xs text-sidebar-foreground/60">Ward Officer</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-sidebar-foreground/70">
            <X className="h-5 w-5" />
          </button>
        </div>

        {user?.ward && (
          <div className="px-5 py-3 bg-sidebar-accent/30 text-xs text-sidebar-foreground/70 border-b border-sidebar-border">
            {user.ward}
          </div>
        )}

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {wardNav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="px-3 py-2 mb-1 text-xs text-sidebar-foreground/50">{user?.name}</div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-4 lg:px-6 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-display font-semibold text-lg text-foreground">Ward Councillor Portal</h1>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default WardLayout;