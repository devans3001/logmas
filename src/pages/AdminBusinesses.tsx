import AdminLayout from "@/components/AdminLayout";
import { Building2, Eye, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const businesses = [
  { id: "BIZ-001", name: "Ifo Petroleum Ltd", category: "Fuel Stations", owner: "Chief Adegoke", amount: "₦150,000", status: "Paid", date: "Mar 1, 2026" },
  { id: "BIZ-002", name: "Grace Block Industry", category: "Block Industry", owner: "Grace Obi", amount: "₦80,000", status: "Paid", date: "Feb 20, 2026" },
  { id: "BIZ-003", name: "Royal Hotel Ifo", category: "Hotels", owner: "Alhaji Mustapha", amount: "₦100,000", status: "Overdue", date: "Jan 15, 2026" },
  { id: "BIZ-004", name: "Bright Future Academy", category: "Private Schools", owner: "Mrs. Adesanya", amount: "₦120,000", status: "Paid", date: "Mar 5, 2026" },
  { id: "BIZ-005", name: "Mama's Kitchen", category: "Restaurants", owner: "Mama Tope", amount: "₦50,000", status: "Pending", date: "Mar 10, 2026" },
  { id: "BIZ-006", name: "MTN Tower Site #234", category: "Telecommunication Mast", owner: "MTN Nigeria", amount: "₦200,000", status: "Paid", date: "Jan 5, 2026" },
];

const statusColors: Record<string, string> = { Paid: "bg-success/15 text-success", Overdue: "bg-destructive/15 text-destructive", Pending: "bg-accent/15 text-accent" };

const AdminBusinesses = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Business Management</h2>
          <p className="text-muted-foreground">Manage registered businesses and demand notices.</p>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Total Businesses</div><div className="font-display text-2xl font-bold text-foreground mt-1">842</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Revenue</div><div className="font-display text-2xl font-bold text-primary mt-1">₦6.8M</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Compliant</div><div className="font-display text-2xl font-bold text-success mt-1">756</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Overdue</div><div className="font-display text-2xl font-bold text-destructive mt-1">86</div></div>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search businesses..." className="pl-9" /></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Business</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Owner</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {businesses.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-mono text-primary">{b.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{b.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{b.category}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{b.owner}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{b.amount}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[b.status]}`}>{b.status}</span></td>
                    <td className="px-4 py-3 flex gap-1">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-success"><Check className="h-4 w-4" /></Button>
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

export default AdminBusinesses;
