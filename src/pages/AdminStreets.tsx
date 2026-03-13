import AdminLayout from "@/components/AdminLayout";
import { Map, Eye, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const streetApplications = [
  { id: "IFO-STR-245", name: "Olumo Street", applicant: "Adeola Bakare", type: "New", date: "Mar 8, 2026", status: "Under Review" },
  { id: "IFO-STR-244", name: "Balogun Avenue", applicant: "Tunde Adeyemi", type: "New", date: "Mar 6, 2026", status: "Field Inspection" },
  { id: "IFO-STR-243", name: "Ifo Main Road", applicant: "Community CDA", type: "Renewal", date: "Mar 3, 2026", status: "Approved" },
  { id: "IFO-STR-242", name: "Agbado Lane", applicant: "Ibrahim Musa", type: "New", date: "Feb 28, 2026", status: "Submitted" },
  { id: "IFO-STR-241", name: "Coker Street", applicant: "Folake Ojo", type: "Renewal", date: "Feb 25, 2026", status: "Rejected" },
];

const statusColors: Record<string, string> = {
  Submitted: "bg-info/15 text-info",
  "Under Review": "bg-accent/15 text-accent",
  "Field Inspection": "bg-info/15 text-info",
  Approved: "bg-success/15 text-success",
  Rejected: "bg-destructive/15 text-destructive",
};

const AdminStreets = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Street Name Applications</h2>
          <p className="text-muted-foreground">Review and approve street name registrations.</p>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Total</div><div className="font-display text-2xl font-bold text-foreground mt-1">523</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Pending</div><div className="font-display text-2xl font-bold text-accent mt-1">18</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Approved</div><div className="font-display text-2xl font-bold text-success mt-1">489</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Rejected</div><div className="font-display text-2xl font-bold text-destructive mt-1">16</div></div>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Street Name</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Applicant</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {streetApplications.map((a) => (
                  <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-mono text-primary">{a.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{a.name}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{a.applicant}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{a.type}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{a.date}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[a.status]}`}>{a.status}</span></td>
                    <td className="px-4 py-3 flex gap-1">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-success"><Check className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-destructive"><X className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStreets;
