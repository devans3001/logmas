import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Upload, MapPin, CreditCard } from "lucide-react";

const steps = ["Type", "Personal Info", "Address", "Residency", "Street Info", "Documents", "Location", "Payment"];

const StreetRegistration = () => {
  const [step, setStep] = useState(0);
  const [applicationType, setApplicationType] = useState<"new" | "renewal" | "">("");
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", nationalId: "",
    houseNumber: "", street: "", area: "", ward: "", cda: "", landmarks: "",
    yearsLiving: "", propertyStatus: "",
    proposedName: "", reason: "", historicalSignificance: "", previousName: "",
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Select Application Type</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { value: "new" as const, title: "Register New Street Name", desc: "Apply for a new street name in Ifo LGA", fee: "₦25,000" },
                { value: "renewal" as const, title: "Renew Existing Street Name", desc: "Renew an existing street name registration", fee: "₦10,000" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setApplicationType(opt.value)}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${applicationType === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                >
                  <h4 className="font-display font-semibold text-foreground">{opt.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{opt.desc}</p>
                  <p className="text-sm font-bold text-primary mt-2">Fee: {opt.fee}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label><Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter full name" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Phone Number *</label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234..." /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label><Input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" type="email" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">National ID (optional)</label><Input value={form.nationalId} onChange={(e) => update("nationalId", e.target.value)} placeholder="NIN" /></div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Passport Photo</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-6 w-6 mx-auto mb-2" />
                Click to upload passport photo
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Address Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">House Number *</label><Input value={form.houseNumber} onChange={(e) => update("houseNumber", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Street *</label><Input value={form.street} onChange={(e) => update("street", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Area *</label><Input value={form.area} onChange={(e) => update("area", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Ward *</label><Input value={form.ward} onChange={(e) => update("ward", e.target.value)} /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">CDA *</label><Input value={form.cda} onChange={(e) => update("cda", e.target.value)} placeholder="Community Development Association" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Nearby Landmarks</label><Input value={form.landmarks} onChange={(e) => update("landmarks", e.target.value)} /></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Residency Details</h3>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Number of Years Living on Street *</label><Input value={form.yearsLiving} onChange={(e) => update("yearsLiving", e.target.value)} type="number" /></div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Property Status *</label>
              <select value={form.propertyStatus} onChange={(e) => update("propertyStatus", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select status</option>
                <option value="owner">Owner</option>
                <option value="tenant">Tenant</option>
                <option value="community_leader">Community Leader</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Street Information</h3>
            <div><label className="text-sm font-medium text-foreground mb-1 block">{applicationType === "renewal" ? "Current" : "Proposed"} Street Name *</label><Input value={form.proposedName} onChange={(e) => update("proposedName", e.target.value)} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Reason for Proposed Name *</label><textarea value={form.reason} onChange={(e) => update("reason", e.target.value)} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Historical Significance (optional)</label><textarea value={form.historicalSignificance} onChange={(e) => update("historicalSignificance", e.target.value)} rows={2} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
            {applicationType === "renewal" && (
              <div><label className="text-sm font-medium text-foreground mb-1 block">Previous Street Name</label><Input value={form.previousName} onChange={(e) => update("previousName", e.target.value)} /></div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Community Support Documents</h3>
            {["CDA Approval Letter", "Petition Signatures", "Supporting Documents"].map((doc) => (
              <div key={doc}>
                <label className="text-sm font-medium text-foreground mb-1 block">{doc}</label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-5 w-5 mx-auto mb-1" />
                  Click to upload
                </div>
              </div>
            ))}
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Map Location</h3>
            <p className="text-sm text-muted-foreground">Pin the street location on the map.</p>
            <div className="w-full h-64 rounded-xl bg-muted border border-border flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Interactive Map</p>
                <p className="text-xs">Click to pin street location</p>
                <p className="text-xs mt-2">GPS: 6.8103° N, 3.1970° E</p>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg text-foreground">Payment</h3>
            <div className="bg-muted/50 rounded-xl p-6 border border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Amount to Pay</p>
                <p className="font-display text-3xl font-bold text-primary mt-1">
                  {applicationType === "new" ? "₦25,000" : "₦10,000"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Street Name {applicationType === "new" ? "Registration" : "Renewal"} Fee
                </p>
              </div>
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
            <p className="text-center text-xs text-muted-foreground">Reference: IFO-STR-{String(Math.floor(Math.random() * 900000 + 100000))}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Street Name Registration</h2>
          <p className="text-muted-foreground">Register or renew a street name in Ifo LGA.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap hidden sm:inline ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-4 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          <Button variant="hero" onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === 0 && !applicationType}>
            {step === steps.length - 1 ? "Submit" : "Next"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StreetRegistration;
