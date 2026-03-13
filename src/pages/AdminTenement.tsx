import AdminLayout from "@/components/AdminLayout";
import { Home, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const tenementRecords = [
  { id: "IFO-TNM-089", owner: "Ibrahim Salisu", address: "12 Abiodun Str, Ifo", type: "Residential", flatType: "3 Bedroom", flats: 4, amount: "₦28,000", status: "Paid", date: "Mar 5, 2026" },
  { id: "IFO-TNM-088", owner: "Mrs. Adekunle", address: "5 Market Rd, Ifo", type: "Commercial", flatType: "Duplex", flats: 1, amount: "₦15,000", status: "Paid", date: "Mar 3, 2026" },
  { id: "IFO-TNM-087", owner: "Balogun Estate", address: "Balogun Street, Ifo", type: "Mixed Use", flatType: "2 Bedroom", flats: 12, amount: "₦60,000", status: "Overdue", date: "Feb 15, 2026" },
  { id: "IFO-TNM-086", owner: "Chief Adeyemi", address: "GRA, Ifo", type: "Residential", flatType: "Duplex", flats: 2, amount: "₦30,000", status: "Paid", date: "Feb 10, 2026" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-success/15 text-success",
  Overdue: "bg-destructive/15 text-destructive",
  Pending: "bg-accent/15 text-accent",
};

const AdminTenement = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Tenement Rate</h2>
          <p className="text-muted-foreground">Monitor property tenement rate payments.</p>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Total Properties</div><div className="font-display text-2xl font-bold text-foreground mt-1">1,245</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Revenue Collected</div><div className="font-display text-2xl font-bold text-primary mt-1">₦8.2M</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Paid</div><div className="font-display text-2xl font-bold text-success mt-1">1,089</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Overdue</div><div className="font-display text-2xl font-bold text-destructive mt-1">156</div></div>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Owner</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Address</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {tenementRecords.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-mono text-primary">{r.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{r.owner}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{r.address}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.type}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{r.amount}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[r.status]}`}>{r.status}</span></td>
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

export default AdminTenement;
