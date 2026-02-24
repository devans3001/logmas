import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Store, CreditCard, CheckCircle, Clock, ArrowRight } from "lucide-react";

const ShopPortal = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Shop Owner Portal</h2>
          <p className="text-muted-foreground">Manage your shop levy payments.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="bg-primary/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <Store className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">Shop Name</div>
            <div className="font-display font-bold text-lg text-foreground">Bakare & Sons Provisions</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="bg-success/10 text-success w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">Payment Status</div>
            <div className="font-display font-bold text-lg text-success">Up to Date</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="bg-accent/10 text-accent w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">Payment Code</div>
            <div className="font-display font-bold text-lg text-foreground font-mono">SHP-2026-8832</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Make Payment</h3>
            <div className="bg-muted/50 rounded-lg p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Levy Amount</span><span className="font-medium text-foreground">₦5,000 / month</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Period</span><span className="font-medium text-foreground">March 2026</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Due Date</span><span className="font-medium text-foreground">Mar 31, 2026</span></div>
            </div>
            <Button variant="hero" className="w-full">
              Pay ₦5,000 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Payment History</h3>
            <div className="space-y-3">
              {[
                { month: "February 2026", amount: "₦5,000", status: "Paid" },
                { month: "January 2026", amount: "₦5,000", status: "Paid" },
                { month: "December 2025", amount: "₦5,000", status: "Paid" },
              ].map((p) => (
                <div key={p.month} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center text-success">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{p.month}</div>
                      <div className="text-xs text-muted-foreground">{p.amount}</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-success">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShopPortal;
