import DashboardLayout from "@/components/DashboardLayout";
import { Store, CreditCard, Clock, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const shopInfo = {
  name: "Adebayo General Store",
  number: "SHP-IFO-0456",
  location: "Block 12, Ifo Market",
  status: "Active",
  lastPayment: "Jan 15, 2026",
  nextDue: "Jul 15, 2026",
  amount: "₦15,000",
};

const paymentHistory = [
  { date: "Jan 15, 2026", ref: "SHP-PAY-001", amount: "₦15,000", period: "Jan–Jun 2026", status: "Paid" },
  { date: "Jul 10, 2025", ref: "SHP-PAY-002", amount: "₦12,000", period: "Jul–Dec 2025", status: "Paid" },
  { date: "Jan 5, 2025", ref: "SHP-PAY-003", amount: "₦12,000", period: "Jan–Jun 2025", status: "Paid" },
];

const ShopLevy = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Shop Levy</h2>
          <p className="text-muted-foreground">Manage your shop registration and levy payments.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Store className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{shopInfo.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Shop No: {shopInfo.number}</p>
              <p className="text-sm text-muted-foreground">Location: {shopInfo.location}</p>
              
              <div className="mt-4 p-3 rounded-lg bg-success/10 text-success flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Status: {shopInfo.status}</span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Last Payment</span><span className="text-foreground font-medium">{shopInfo.lastPayment}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Next Due</span><span className="text-foreground font-medium">{shopInfo.nextDue}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="text-foreground font-bold">{shopInfo.amount}</span></div>
              </div>

              <Button variant="hero" className="w-full mt-4"><CreditCard className="h-4 w-4" /> Pay Now</Button>
              <p className="text-center text-xs text-muted-foreground mt-2">Payment Code: {shopInfo.number}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <h3 className="font-display font-semibold text-foreground mb-4">Payment History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Date</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Reference</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Period</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Amount</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((p) => (
                      <tr key={p.ref} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-sm text-muted-foreground">{p.date}</td>
                        <td className="px-4 py-3 text-sm font-mono text-primary">{p.ref}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{p.period}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">{p.amount}</td>
                        <td className="px-4 py-3"><Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShopLevy;
