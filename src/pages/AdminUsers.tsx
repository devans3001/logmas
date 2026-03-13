import AdminLayout from "@/components/AdminLayout";
import { Shield, Eye, Ban, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const users = [
  { id: 1, name: "John Adebayo Ogundimu", email: "john@email.com", role: "Resident", status: "Active", joined: "Jan 10, 2026" },
  { id: 2, name: "Adeola Bakare", email: "adeola@email.com", role: "Resident", status: "Active", joined: "Feb 5, 2026" },
  { id: 3, name: "Chief Adegoke", email: "adegoke@business.com", role: "Business", status: "Active", joined: "Dec 15, 2025" },
  { id: 4, name: "Mama Nkechi", email: "nkechi@email.com", role: "Resident", status: "Active", joined: "Mar 1, 2026" },
  { id: 5, name: "Ibrahim Salisu", email: "ibrahim@email.com", role: "Resident", status: "Suspended", joined: "Nov 20, 2025" },
];

const roleColors: Record<string, string> = { Resident: "bg-primary/15 text-primary", Business: "bg-accent/15 text-accent", Admin: "bg-info/15 text-info" };
const statusColors: Record<string, string> = { Active: "bg-success/15 text-success", Suspended: "bg-destructive/15 text-destructive" };

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage all registered users.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Total Users</div><div className="font-display text-2xl font-bold text-foreground mt-1">3,456</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Residents</div><div className="font-display text-2xl font-bold text-primary mt-1">2,814</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Businesses</div><div className="font-display text-2xl font-bold text-accent mt-1">642</div></div>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search users..." className="pl-9" /></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Email</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Role</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Joined</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{u.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleColors[u.role]}`}>{u.role}</span></td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.joined}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[u.status]}`}>{u.status}</span></td>
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

export default AdminUsers;
