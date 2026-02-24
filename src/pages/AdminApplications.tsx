import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";

const applications = [
  { id: "APP-001", name: "Adeola Bakare", type: "Birth Certificate", date: "Feb 20, 2026", status: "Pending", lga: "Abeokuta South" },
  { id: "APP-002", name: "Tunde Ogundimu", type: "Marriage Certificate", date: "Feb 19, 2026", status: "Approved", lga: "Sagamu" },
  { id: "APP-003", name: "Folake Adeyemi", type: "State of Origin", date: "Feb 18, 2026", status: "Under Review", lga: "Ikenne" },
  { id: "APP-004", name: "Ibrahim Salisu", type: "Death Certificate", date: "Feb 17, 2026", status: "Rejected", lga: "Ado-Odo/Ota" },
  { id: "APP-005", name: "Grace Obi", type: "Birth Certificate", date: "Feb 16, 2026", status: "Pending", lga: "Ijebu Ode" },
];

const statusColors: Record<string, string> = {
  Approved: "bg-success/15 text-success",
  Pending: "bg-accent/15 text-accent",
  "Under Review": "bg-info/15 text-info",
  Rejected: "bg-destructive/15 text-destructive",
};

const AdminApplications = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Applications</h2>
            <p className="text-muted-foreground">Manage certificate applications.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search applications..." className="pl-9 h-10" />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Applicant</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden lg:table-cell">LGA</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{app.id}</td>
                    <td className="px-4 py-3 text-foreground">{app.name}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{app.type}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{app.lga}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{app.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[app.status]}`}>{app.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success"><CheckCircle className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><XCircle className="h-4 w-4" /></Button>
                      </div>
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

export default AdminApplications;
