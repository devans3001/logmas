import DashboardLayout from "@/components/DashboardLayout";
import { FileText, Clock, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const applications = [
  { id: "IFO-CRT-001", type: "Birth Certificate", date: "Mar 10, 2026", status: "Approved", details: "Child: Adebayo Ogundimu" },
  { id: "IFO-STR-245", type: "Street Name Registration", date: "Mar 8, 2026", status: "Under Review", details: "Proposed: Olumo Street" },
  { id: "IFO-TNM-089", type: "Tenement Rate", date: "Mar 5, 2026", status: "Paid", details: "Property: 12 Abiodun Str" },
  { id: "IFO-CRT-002", type: "Marriage Certificate", date: "Mar 2, 2026", status: "Pending", details: "Couple: Tunde & Folake" },
  { id: "IFO-DMN-034", type: "Demand Notice", date: "Feb 28, 2026", status: "Approved", details: "Business: Ifo Superstores" },
  { id: "IFO-CRT-003", type: "Death Certificate", date: "Feb 20, 2026", status: "Rejected", details: "Missing documents" },
  { id: "IFO-STR-190", type: "Street Renewal", date: "Feb 15, 2026", status: "Approved", details: "Renewal: Balogun Street" },
];

const statusColors: Record<string, string> = {
  Approved: "bg-success/15 text-success",
  Pending: "bg-accent/15 text-accent",
  "Under Review": "bg-info/15 text-info",
  Rejected: "bg-destructive/15 text-destructive",
  Paid: "bg-success/15 text-success",
};

const CertificateApplications = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">My Applications</h2>
            <p className="text-muted-foreground">Track all your submitted applications.</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/dashboard/apply"><FileText className="h-4 w-4" /> New Application</Link>
          </Button>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Reference</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Details</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-primary">{app.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{app.type}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{app.details}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{app.date}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[app.status]}`}>{app.status}</span></td>
                    <td className="px-4 py-3"><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CertificateApplications;
