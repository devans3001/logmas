import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, FileText, ArrowRight } from "lucide-react";

const BusinessPortal = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Business Demand Notice Portal</h2>
          <p className="text-muted-foreground">Manage your business demand notices and payments.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="bg-primary/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">Business Name</div>
            <div className="font-display font-bold text-foreground">Ogundimu Enterprises</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="bg-accent/10 text-accent w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">Amount Due</div>
            <div className="font-display font-bold text-2xl text-foreground">₦250,000</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="bg-info/10 text-info w-10 h-10 rounded-lg flex items-center justify-center mb-3">
              <FileText className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">Notice ID</div>
            <div className="font-display font-bold text-foreground font-mono">DN-2026-1029</div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border max-w-xl">
          <h3 className="font-display font-semibold text-foreground mb-4">Demand Notice Details</h3>
          <div className="bg-muted/50 rounded-lg p-4 space-y-3 mb-6">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Business Type</span><span className="font-medium text-foreground">Import/Export</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Assessment Year</span><span className="font-medium text-foreground">2026</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount</span><span className="font-bold text-foreground">₦250,000</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Due Date</span><span className="font-medium text-destructive">Mar 15, 2026</span></div>
          </div>
          <Button variant="hero" size="lg" className="w-full">
            Pay ₦250,000 <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessPortal;
