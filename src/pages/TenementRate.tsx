import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CreditCard, Home } from "lucide-react";

const steps = ["Property Info", "Property Details", "Assessment", "Payment"];

const propertyTypes = ["Residential", "Commercial", "Mixed Use"];
const flatTypes = [
  { label: "1 Bedroom Flat", rate: 3000 },
  { label: "2 Bedroom Flat", rate: 5000 },
  { label: "3 Bedroom Flat", rate: 7000 },
  { label: "Duplex", rate: 15000 },
];

const TenementRate = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    ownerName: "", address: "", street: "", ward: "", propertyType: "",
    floors: "1", flats: "1", landSize: "", yearBuilt: "",
    flatType: "",
  });

  const update = (f: string, v: string) => setForm(prev => ({ ...prev, [f]: v }));
  const selectedRate = flatTypes.find(f => f.label === form.flatType)?.rate || 0;
  const totalFlats = parseInt(form.flats) || 1;
  const totalAmount = selectedRate * totalFlats;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Property Registration</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Property Owner Name *</label><Input value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Property Address *</label><Input value={form.address} onChange={(e) => update("address", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Street *</label><Input value={form.street} onChange={(e) => update("street", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Ward *</label><Input value={form.ward} onChange={(e) => update("ward", e.target.value)} /></div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Property Type *</label>
              <select value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select type</option>
                {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Property Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Number of Floors</label><Input type="number" value={form.floors} onChange={(e) => update("floors", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Number of Flats</label><Input type="number" value={form.flats} onChange={(e) => update("flats", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Land Size (sqm)</label><Input value={form.landSize} onChange={(e) => update("landSize", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Year Built</label><Input value={form.yearBuilt} onChange={(e) => update("yearBuilt", e.target.value)} placeholder="e.g. 2015" /></div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Flat Type *</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {flatTypes.map((ft) => (
                  <div key={ft.label} onClick={() => update("flatType", ft.label)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${form.flatType === ft.label ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <p className="text-sm font-medium text-foreground">{ft.label}</p>
                    <p className="text-sm font-bold text-primary">₦{ft.rate.toLocaleString()} per flat</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Assessment Summary</h3>
            <div className="bg-muted/50 rounded-xl p-6 border border-border space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Property Owner</span><span className="font-medium text-foreground">{form.ownerName || "—"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Address</span><span className="font-medium text-foreground">{form.address || "—"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Property Type</span><span className="font-medium text-foreground">{form.propertyType || "—"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Flat Type</span><span className="font-medium text-foreground">{form.flatType || "—"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Rate per Flat</span><span className="font-medium text-foreground">₦{selectedRate.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Number of Flats</span><span className="font-medium text-foreground">{totalFlats}</span></div>
              <div className="border-t border-border pt-3 flex justify-between"><span className="font-semibold text-foreground">Total Amount</span><span className="font-display text-xl font-bold text-primary">₦{totalAmount.toLocaleString()}</span></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg text-foreground">Payment</h3>
            <div className="bg-muted/50 rounded-xl p-6 border border-border text-center">
              <p className="text-sm text-muted-foreground">Tenement Rate Assessment</p>
              <p className="font-display text-3xl font-bold text-primary mt-1">₦{totalAmount.toLocaleString()}</p>
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
            <p className="text-center text-xs text-muted-foreground">Reference: IFO-TNM-{String(Math.floor(Math.random() * 900000 + 100000))}</p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Tenement Rate Payment</h2>
          <p className="text-muted-foreground">Register your property and pay tenement rates.</p>
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

export default TenementRate;
