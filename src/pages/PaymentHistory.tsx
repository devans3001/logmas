import DashboardLayout from "@/components/DashboardLayout";
import { CreditCard, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const payments = [
  { id: "PAY-001", date: "Mar 10, 2026", service: "Birth Certificate", ref: "IFO-CRT-001", amount: "₦5,000", status: "Successful" },
  { id: "PAY-002", date: "Mar 8, 2026", service: "Street Name Registration", ref: "IFO-STR-245", amount: "₦25,000", status: "Successful" },
  { id: "PAY-003", date: "Mar 5, 2026", service: "Tenement Rate", ref: "IFO-TNM-089", amount: "₦15,000", status: "Successful" },
  { id: "PAY-004", date: "Mar 2, 2026", service: "Marriage Certificate", ref: "IFO-CRT-002", amount: "₦5,000", status: "Pending" },
  { id: "PAY-005", date: "Feb 28, 2026", service: "Demand Notice (Supermarket)", ref: "IFO-DMN-034", amount: "₦40,000", status: "Successful" },
  { id: "PAY-006", date: "Feb 15, 2026", service: "Street Name Renewal", ref: "IFO-STR-190", amount: "₦10,000", status: "Successful" },
];

const statusColors: Record<string, string> = {
  Successful: "bg-success/15 text-success",
  Pending: "bg-accent/15 text-accent",
  Failed: "bg-destructive/15 text-destructive",
};

const PaymentHistory = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Payment History</h2>
          <p className="text-muted-foreground">View all your payment transactions.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="text-sm text-muted-foreground">Total Paid</div>
            <div className="font-display text-2xl font-bold text-foreground mt-1">₦100,000</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="text-sm text-muted-foreground">Transactions</div>
            <div className="font-display text-2xl font-bold text-foreground mt-1">6</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="font-display text-2xl font-bold text-accent mt-1">₦5,000</div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Service</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 hidden md:table-cell">Reference</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{p.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{p.service}</td>
                    <td className="px-4 py-3 text-sm font-mono text-primary hidden md:table-cell">{p.ref}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{p.amount}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[p.status]}`}>{p.status}</span></td>
                    <td className="px-4 py-3">
                      {p.status === "Successful" && (
                        <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                      )}
                    </td>
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

export default PaymentHistory;
