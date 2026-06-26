import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CreditCard, Building2, Download } from "lucide-react";

const steps = ["Business Info", "Category", "Demand Notice", "Payment"];

const businessCategories = [
  { name: "Fuel Stations", fee: 150000 },
  { name: "Block Industry", fee: 80000 },
  { name: "Hotels", fee: 100000 },
  { name: "Private Schools", fee: 120000 },
  { name: "Hospitals", fee: 100000 },
  { name: "Restaurants", fee: 50000 },
  { name: "Supermarkets", fee: 40000 },
  { name: "Telecommunication Mast", fee: 200000 },
  { name: "Warehouses", fee: 60000 },
  { name: "Manufacturing Companies", fee: 180000 },
];

const CompanyDemandNotice = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    businessName: "", cacNumber: "", businessType: "", address: "", phone: "", email: "", ownerName: "",
    category: "",
  });

  const update = (f: string, v: string) => setForm(prev => ({ ...prev, [f]: v }));
  const selectedCategory = businessCategories.find(c => c.name === form.category);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Business Registration</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Business Name *</label><Input value={form.businessName} onChange={(e) => update("businessName", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">CAC Registration Number</label><Input value={form.cacNumber} onChange={(e) => update("cacNumber", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Business Address *</label><Input value={form.address} onChange={(e) => update("address", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Owner Name *</label><Input value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Phone Number *</label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Email *</label><Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" /></div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Business Category</h3>
            <p className="text-sm text-muted-foreground">Select your business category. Fees are set by Logmas administration.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {businessCategories.map((cat) => (
                <div key={cat.name} onClick={() => update("category", cat.name)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${form.category === cat.name ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <p className="text-sm font-medium text-foreground">{cat.name}</p>
                  <p className="text-sm font-bold text-primary">₦{cat.fee.toLocaleString()}/year</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Demand Notice</h3>
            <div className="bg-muted/50 rounded-xl p-6 border border-border">
              <div className="text-center mb-4">
                <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-display font-bold text-foreground">logmas GOVERNMENT AREA</h4>
                <p className="text-xs text-muted-foreground">DEMAND NOTICE</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Business Name</span><span className="font-medium text-foreground">{form.businessName || "—"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Category</span><span className="font-medium text-foreground">{form.category || "—"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount Payable</span><span className="font-bold text-primary">₦{selectedCategory?.fee.toLocaleString() || "0"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Due Date</span><span className="font-medium text-foreground">April 30, 2026</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Reference</span><span className="font-mono text-primary">IFO-DMN-{String(Math.floor(Math.random() * 900000 + 100000))}</span></div>
              </div>
            </div>
            <Button variant="outline" className="w-full"><Download className="h-4 w-4" /> Download Demand Notice PDF</Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg text-foreground">Payment</h3>
            <div className="bg-muted/50 rounded-xl p-6 border border-border text-center">
              <p className="text-sm text-muted-foreground">Demand Notice Amount</p>
              <p className="font-display text-3xl font-bold text-primary mt-1">₦{selectedCategory?.fee.toLocaleString() || "0"}</p>
              <p className="text-sm text-muted-foreground mt-1">{form.category}</p>
            </div>
            <div className="space-y-3">
              {["Card Payment", "Bank Transfer", "USSD"].map((method) => (
                <div key={method} className="p-4 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{method}</span>
                </div>
              ))}
            </div>
            <Button variant="hero" size="lg" className="w-full"><CreditCard className="h-5 w-5" /> Pay Now</Button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Company Demand Notice</h2>
          <p className="text-muted-foreground">Register your business and pay demand notice fees.</p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-6 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">{renderStep()}</div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> Previous</Button>
          <Button variant="hero" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>{step === steps.length - 1 ? "Submit" : "Next"} <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDemandNotice;
