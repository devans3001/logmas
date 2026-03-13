import AdminLayout from "@/components/AdminLayout";
import { CreditCard, Download, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const payments = [
  { id: "PAY-2026-001", date: "Mar 10, 2026", user: "Adebayo Ogundimu", service: "Birth Certificate", ref: "IFO-CRT-001", amount: "₦5,000", method: "Card", status: "Successful" },
  { id: "PAY-2026-002", date: "Mar 8, 2026", user: "Adeola Bakare", service: "Street Registration", ref: "IFO-STR-245", amount: "₦25,000", method: "Bank Transfer", status: "Successful" },
  { id: "PAY-2026-003", date: "Mar 5, 2026", user: "Ibrahim Salisu", service: "Tenement Rate", ref: "IFO-TNM-089", amount: "₦28,000", method: "Card", status: "Successful" },
  { id: "PAY-2026-004", date: "Mar 3, 2026", user: "Chief Adegoke", service: "Demand Notice", ref: "IFO-DMN-034", amount: "₦150,000", method: "Bank Transfer", status: "Successful" },
  { id: "PAY-2026-005", date: "Mar 2, 2026", user: "Tunde Bakare", service: "Shop Levy", ref: "SHP-IFO-0460", amount: "₦15,000", method: "USSD", status: "Failed" },
  { id: "PAY-2026-006", date: "Mar 1, 2026", user: "Grace Obi", service: "Shop Levy", ref: "SHP-IFO-0459", amount: "₦15,000", method: "Card", status: "Successful" },
];

const statusColors: Record<string, string> = { Successful: "bg-success/15 text-success", Failed: "bg-destructive/15 text-destructive", Pending: "bg-accent/15 text-accent" };

const AdminPayments = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Payment Monitoring</h2>
          <p className="text-muted-foreground">View all payment transactions across the system.</p>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Total Revenue</div><div className="font-display text-2xl font-bold text-primary mt-1">₦18.5M</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">This Month</div><div className="font-display text-2xl font-bold text-foreground mt-1">₦2.3M</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Transactions</div><div className="font-display text-2xl font-bold text-foreground mt-1">4,567</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Failed</div><div className="font-display text-2xl font-bold text-destructive mt-1">23</div></div>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search payments..." className="pl-9" /></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">User</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Service</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Reference</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Method</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Receipt</th>
              </tr></thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{p.user}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{p.service}</td>
                    <td className="px-4 py-3 text-sm font-mono text-primary hidden md:table-cell">{p.ref}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{p.amount}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{p.method}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[p.status]}`}>{p.status}</span></td>
                    <td className="px-4 py-3"><Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button></td>
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

export default AdminPayments;
