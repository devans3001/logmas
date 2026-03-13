import AdminLayout from "@/components/AdminLayout";
import { Award, Download, Eye, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const certificates = [
  { id: "IFO-BC-2026-00145", type: "Birth Certificate", applicant: "Adebayo Ogundimu", date: "Mar 10, 2026", status: "Issued" },
  { id: "IFO-SNA-2026-00034", type: "Street Name Approval", applicant: "Balogun Community", date: "Feb 15, 2026", status: "Issued" },
  { id: "IFO-MC-2026-00067", type: "Marriage Certificate", applicant: "Tunde & Folake", date: "Mar 2, 2026", status: "Pending Issuance" },
  { id: "IFO-TC-2026-00089", type: "Tenement Clearance", applicant: "Ibrahim Salisu", date: "Mar 5, 2026", status: "Issued" },
  { id: "IFO-DC-2026-00012", type: "Death Certificate", applicant: "Grace Obi", date: "Feb 20, 2026", status: "Revoked" },
];

const statusColors: Record<string, string> = {
  Issued: "bg-success/15 text-success",
  "Pending Issuance": "bg-accent/15 text-accent",
  Revoked: "bg-destructive/15 text-destructive",
};

const AdminCertificates = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Certificates</h2>
          <p className="text-muted-foreground">Manage all issued certificates.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Total Issued</div><div className="font-display text-2xl font-bold text-foreground mt-1">1,245</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Pending</div><div className="font-display text-2xl font-bold text-accent mt-1">23</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Revoked</div><div className="font-display text-2xl font-bold text-destructive mt-1">5</div></div>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Certificate ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Applicant</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {certificates.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-mono text-primary">{c.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{c.type}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{c.applicant}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.date}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[c.status]}`}>{c.status}</span></td>
                    <td className="px-4 py-3 flex gap-1">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
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

export default AdminCertificates;
