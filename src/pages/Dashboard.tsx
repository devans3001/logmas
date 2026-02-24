import DashboardLayout from "@/components/DashboardLayout";
import { FileText, FolderOpen, CreditCard, Download, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { icon: FolderOpen, label: "My Applications", value: "3", color: "text-primary", bg: "bg-primary/10" },
  { icon: FileText, label: "Certificates", value: "1", color: "text-success", bg: "bg-success/10" },
  { icon: CreditCard, label: "Payments", value: "₦15,000", color: "text-accent", bg: "bg-accent/10" },
  { icon: Download, label: "Downloads", value: "1", color: "text-info", bg: "bg-info/10" },
];

const recentApplications = [
  { id: "APP-001", type: "Birth Certificate", date: "Feb 20, 2026", status: "Approved" },
  { id: "APP-002", type: "Marriage Certificate", date: "Feb 18, 2026", status: "Pending" },
  { id: "APP-003", type: "State of Origin", date: "Feb 15, 2026", status: "Under Review" },
];

const statusColors: Record<string, string> = {
  Approved: "bg-success/15 text-success",
  Pending: "bg-accent/15 text-accent",
  "Under Review": "bg-info/15 text-info",
  Rejected: "bg-destructive/15 text-destructive",
};

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Welcome back, John 👋</h2>
          <p className="text-muted-foreground">Here's an overview of your activities.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-5 shadow-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions + Recent */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="hero" className="w-full justify-start" asChild>
                <Link to="/dashboard/apply"><FileText className="h-4 w-4" /> Apply for Certificate</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/payments"><CreditCard className="h-4 w-4" /> Make Payment</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/downloads"><Download className="h-4 w-4" /> Download Certificate</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Recent Applications</h3>
              <Link to="/dashboard/applications" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{app.type}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{app.date}</div>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
