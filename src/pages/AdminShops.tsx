import AdminLayout from "@/components/AdminLayout";
import { Store, Eye, Ban, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const shops = [
  { id: "SHP-IFO-0456", name: "Adebayo General Store", location: "Block 12, Ifo Market", owner: "John Adebayo", status: "Active", lastPayment: "Jan 15, 2026", amount: "₦15,000" },
  { id: "SHP-IFO-0457", name: "Mama Nkechi Provisions", location: "Block 3, Ifo Market", owner: "Nkechi Okafor", status: "Active", lastPayment: "Feb 10, 2026", amount: "₦12,000" },
  { id: "SHP-IFO-0458", name: "Ibrahim Textiles", location: "Block 8, Ifo Market", owner: "Ibrahim Musa", status: "Inactive", lastPayment: "Jul 15, 2025", amount: "₦12,000" },
  { id: "SHP-IFO-0459", name: "Grace Fashion House", location: "Block 15, Ifo Market", owner: "Grace Obi", status: "Active", lastPayment: "Mar 1, 2026", amount: "₦15,000" },
  { id: "SHP-IFO-0460", name: "Tunde Electronics", location: "Block 5, Ifo Market", owner: "Tunde Bakare", status: "Suspended", lastPayment: "Oct 20, 2025", amount: "₦12,000" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/15 text-success",
  Inactive: "bg-muted text-muted-foreground",
  Suspended: "bg-destructive/15 text-destructive",
};

const AdminShops = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Shop Management</h2>
            <p className="text-muted-foreground">Manage registered shops and levy payments.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Total Shops</div><div className="font-display text-2xl font-bold text-foreground mt-1">2,156</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Active</div><div className="font-display text-2xl font-bold text-success mt-1">1,890</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Levy Revenue</div><div className="font-display text-2xl font-bold text-primary mt-1">₦5.4M</div></div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search shops..." className="pl-9" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Shop ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Owner</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Location</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Last Payment</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {shops.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-mono text-primary">{s.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{s.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{s.owner}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{s.location}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{s.lastPayment}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[s.status]}`}>{s.status}</span></td>
                    <td className="px-4 py-3 flex gap-1">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-destructive"><Ban className="h-4 w-4" /></Button>
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

export default AdminShops;
