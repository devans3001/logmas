// src/pages/WardDashboard.tsx

import WardLayout from "@/components/WardLayout";
import { getUser } from "@/lib/auth";
import { getApplications } from "@/lib/mockData";
import { CheckCircle, Clock, XCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const WardDashboard = () => {
  const user = getUser();
  const all = getApplications();
  const wardApps = all.filter(a => a.ward === user?.ward);

  const pending = wardApps.filter(a => a.status === "Awaiting Ward Approval").length;
  const approved = wardApps.filter(a => a.status === "Ward Approved").length;
  const declined = wardApps.filter(a => a.status === "Ward Declined").length;
  const total = wardApps.length;

  const stats = [
    { label: "Pending Review", value: pending, icon: Clock, color: "text-amber-500" },
    { label: "Approved", value: approved, icon: CheckCircle, color: "text-emerald-500" },
    { label: "Declined", value: declined, icon: XCircle, color: "text-destructive" },
    { label: "Total Received", value: total, icon: FileText, color: "text-primary" },
  ];

  const recent = wardApps.filter(a => a.status === "Awaiting Ward Approval").slice(0, 5);

  return (
    <WardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Welcome, {user?.name}</h2>
          <p className="text-muted-foreground text-sm mt-1">{user?.ward}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4">
              <s.icon className={`h-6 w-6 ${s.color} mb-2`} />
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Awaiting Your Approval</h3>
            <Link to="/ward/applications" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {recent.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">No pending applications</div>
          ) : (
            <div className="divide-y divide-border">
              {recent.map((app) => (
                <div key={app.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.applicantName}</p>
                    <p className="text-xs text-muted-foreground">{app.type} · {app.id}</p>
                  </div>
                  <Link to="/ward/applications"
                    className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </WardLayout>
  );
};

export default WardDashboard;