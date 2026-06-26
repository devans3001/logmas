import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  MapPin,
  CreditCard,
  FileText,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { getUser } from "@/lib/auth";
import {
  addStreetApplication,
  confirmStreetPayment,
  getStreetApplicationsByEmail,
  type StreetApplication,
} from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

// ─── Steps ───────────────────────────────────────────────────────────────────
const NEW_STEPS = [
  "Application Type",
  "Personal Info",
  "Address",
  "Residency",
  "Street Info",
  "Documents",
  "GPS Location",
  "Review & Pay",
];

const RENEWAL_STEPS = [
  "Application Type",
  "Personal Info",
  "Address",
  "Street Info",
  "Documents",
  "Review & Pay",
];

// ─── Status badge helper ──────────────────────────────────────────────────────
const statusMeta: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  Submitted:             { color: "bg-blue-100 text-blue-700",    icon: Clock,          label: "Submitted" },
  "Awaiting Payment":    { color: "bg-amber-100 text-amber-700",  icon: AlertCircle,    label: "Awaiting Payment" },
  Paid:                  { color: "bg-sky-100 text-sky-700",      icon: Check,          label: "Paid – Under Review" },
  "Under Review":        { color: "bg-purple-100 text-purple-700",icon: Clock,          label: "Under Review" },
  "Field Inspection":    { color: "bg-indigo-100 text-indigo-700",icon: MapPin,         label: "Field Inspection" },
  "Correction Requested":{ color: "bg-orange-100 text-orange-700",icon: AlertCircle,    label: "Correction Requested" },
  Approved:              { color: "bg-green-100 text-green-700",  icon: CheckCircle2,   label: "Approved" },
  "Certificate Issued":  { color: "bg-green-100 text-green-700",  icon: CheckCircle2,   label: "Certificate Issued" },
  Rejected:              { color: "bg-red-100 text-red-700",      icon: AlertCircle,    label: "Rejected" },
};

// ─── My Applications list ─────────────────────────────────────────────────────
function MyStreetApplications({
  apps,
  onPayNow,
}: {
  apps: StreetApplication[];
  onPayNow: (id: string) => void;
}) {
  const navigate = useNavigate()
  if (apps.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-foreground">My Street Applications</h3>
      {apps.map((a) => {
        const meta = statusMeta[a.status] ?? statusMeta["Submitted"];
        const Icon = meta.icon;
        return (
          <div key={a.id} className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-primary font-bold">{a.id}</span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 ${meta.color}`}>
                  <Icon className="h-3 w-3" />{meta.label}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {a.applicationType === "renewal" ? "Renewal" : "New Registration"}
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground mt-1">{a.proposedName}</p>
              <p className="text-xs text-muted-foreground">{a.ward} · Submitted {a.submittedDate}</p>
              {(a.adminNote || a.inspectionNote) && (
                <p className="text-xs text-amber-600 mt-1 bg-amber-50 rounded px-2 py-1">
                  Note: {a.adminNote || a.inspectionNote}
                </p>
              )}
              {a.certificateNo && (
                <p className="text-xs text-green-700 mt-1 font-mono">Certificate: {a.certificateNo}</p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              {a.status === "Awaiting Payment" && (
                <Button size="sm" variant="hero" onClick={() => onPayNow(a.id)}>
                  <CreditCard className="h-3.5 w-3.5" /> Pay ₦{a.amount.toLocaleString()}
                </Button>
              )}
              {a.status === "Certificate Issued" && (
                <Button size="sm" variant="outline" onClick={ ()=>navigate(`/dashboard/street-certificate/${a.id}`)}>
                  <FileText className="h-3.5 w-3.5" /> Download
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const StreetRegistration = () => {
  const user = getUser();

  // ALL hooks at the top — no hooks inside conditionals
  const [view, setView] = useState<"list" | "new">("list");
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<StreetApplication | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paying, setPaying] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0); // replaces the setView flip trick
  const [applicationType, setApplicationType] = useState<"new" | "renewal" | "">("");
  const [form, setForm] = useState({
    fullName: user?.name ?? "",
    phone: "",
    email: user?.email ?? "",
    nationalId: "",
    houseNumber: "",
    street: "",
    area: "",
    ward: "",
    cda: "",
    landmarks: "",
    yearsLiving: "",
    propertyStatus: "",
    proposedName: "",
    previousName: "",
    reason: "",
    historicalSignificance: "",
    gpsLat: "6.8103",
    gpsLng: "3.1970",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const refresh = useCallback(() => setRefreshTick((t) => t + 1), []);

  const steps = applicationType === "renewal" ? RENEWAL_STEPS : NEW_STEPS;
  const fee = applicationType === "renewal" ? 10000 : 25000;

  // Derived — recalculates whenever refreshTick changes
  const myApps = user ? getStreetApplicationsByEmail(user.email) : [];

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handlePayNow = (id: string) => {
    setPaying(id);
    setTimeout(() => {
      confirmStreetPayment(id);
      setPaying(null);
      refresh();
    }, 1800);
  };

  const handleSubmit = () => {
    if (!user) return;
    const newApp = addStreetApplication({
      citizenEmail: user.email,
      applicantName: form.fullName,
      phone: form.phone,
      email: form.email,
      nationalId: form.nationalId,
      houseNumber: form.houseNumber,
      street: form.street,
      area: form.area,
      ward: form.ward,
      cda: form.cda,
      landmarks: form.landmarks,
      yearsLiving: form.yearsLiving,
      propertyStatus: form.propertyStatus,
      applicationType: applicationType as "new" | "renewal",
      proposedName: form.proposedName,
      previousName: form.previousName,
      reason: form.reason,
      historicalSignificance: form.historicalSignificance,
      gpsLat: form.gpsLat,
      gpsLng: form.gpsLng,
      status: "Awaiting Payment",
      amount: fee,
      paid: false,
    });
    setSubmittedApp(newApp);
    setSubmitted(true);
  };

  const handleInlinePayment = () => {
    if (!submittedApp) return;
    setPaymentProcessing(true);
    setTimeout(() => {
      confirmStreetPayment(submittedApp.id);
      setPaymentProcessing(false);
      setPaymentDone(true);
    }, 2200);
  };

  const resetToList = () => {
    setSubmitted(false);
    setPaymentDone(false);
    setPaymentProcessing(false);
    setSubmittedApp(null);
    setView("list");
    setStep(0);
    setApplicationType("");
    refresh();
  };

  // ─── Step renderer ──────────────────────────────────────────────────────────
  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg text-foreground">Select Application Type</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { value: "new" as const, title: "Register New Street", desc: "Apply to officially name a new street", fee: "₦25,000", icon: MapPin },
              { value: "renewal" as const, title: "Renew Existing Street", desc: "Renew an existing street name registration", fee: "₦10,000", icon: RefreshCw },
            ].map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.value}
                  onClick={() => setApplicationType(opt.value)}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${applicationType === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${applicationType === opt.value ? "bg-primary/10" : "bg-muted"}`}>
                      <Icon className={`h-5 w-5 ${applicationType === opt.value ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground text-sm">{opt.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      <p className="text-sm font-bold text-primary mt-2">Fee: {opt.fee}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg text-foreground">Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label><Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter full name" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Phone Number *</label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234..." /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label><Input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" type="email" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">National ID (NIN)</label><Input value={form.nationalId} onChange={(e) => update("nationalId", e.target.value)} placeholder="11-digit NIN" /></div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Passport Photo *</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="h-6 w-6 mx-auto mb-2" />Click to upload passport photograph
            </div>
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg text-foreground">Address Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1 block">House Number *</label><Input value={form.houseNumber} onChange={(e) => update("houseNumber", e.target.value)} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Street *</label><Input value={form.street} onChange={(e) => update("street", e.target.value)} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Area / Estate *</label><Input value={form.area} onChange={(e) => update("area", e.target.value)} /></div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Ward *</label>
              <select value={form.ward} onChange={(e) => update("ward", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select Ward</option>
                <option>Ward 1 - Ifo North</option>
                <option>Ward 2 - Ifo South</option>
                <option>Ward 3 - Ifo Central</option>
                <option>Ward 4 - Ewekoro</option>
                <option>Ward 5 - Ota Road</option>
                <option>Ward 6 - Agbado</option>
                <option>Ward 7 - Sango</option>
              </select>
            </div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">CDA *</label><Input value={form.cda} onChange={(e) => update("cda", e.target.value)} placeholder="e.g. Ifo Central CDA" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Nearby Landmarks</label><Input value={form.landmarks} onChange={(e) => update("landmarks", e.target.value)} placeholder="e.g. Near Ifo Market" /></div>
          </div>
        </div>
      );
    }

    if (step === 3) {
      // NEW → Residency | RENEWAL → Street Info
      if (applicationType === "renewal") {
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Street Information</h3>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Current / Registered Street Name *</label><Input value={form.proposedName} onChange={(e) => update("proposedName", e.target.value)} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Previous Street Name</label><Input value={form.previousName} onChange={(e) => update("previousName", e.target.value)} placeholder="If changed from original" /></div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Reason for Renewal *</label>
              <textarea value={form.reason} onChange={(e) => update("reason", e.target.value)} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Annual renewal / reason for renewal" />
            </div>
          </div>
        );
      }
      return (
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg text-foreground">Residency Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1 block">Years Living on This Street *</label><Input value={form.yearsLiving} onChange={(e) => update("yearsLiving", e.target.value)} type="number" min="0" /></div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Property Status *</label>
              <select value={form.propertyStatus} onChange={(e) => update("propertyStatus", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select status</option>
                <option value="owner">Property Owner</option>
                <option value="tenant">Tenant</option>
                <option value="community_leader">Community Leader</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    if (step === 4) {
      // NEW → Street Info | RENEWAL → Documents
      if (applicationType === "renewal") {
        return (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Supporting Documents</h3>
            <p className="text-sm text-muted-foreground">Upload required documents. PDF, JPG or PNG accepted.</p>
            {["CDA Approval Letter", "Previous Certificate (if available)", "Identification Document"].map((doc) => (
              <div key={doc}>
                <label className="text-sm font-medium text-foreground mb-1 block">{doc}</label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-5 w-5 mx-auto mb-1" />Click to upload
                </div>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg text-foreground">Street Information</h3>
          <div><label className="text-sm font-medium text-foreground mb-1 block">Proposed Street Name *</label><Input value={form.proposedName} onChange={(e) => update("proposedName", e.target.value)} placeholder="e.g. Olumo Street" /></div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Reason for Proposed Name *</label>
            <textarea value={form.reason} onChange={(e) => update("reason", e.target.value)} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Explain why this name was chosen" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Historical / Cultural Significance</label>
            <textarea value={form.historicalSignificance} onChange={(e) => update("historicalSignificance", e.target.value)} rows={2} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Optional – any historical background" />
          </div>
        </div>
      );
    }

    if (step === 5) {
      // RENEWAL → Review & Pay | NEW → Documents
      if (applicationType === "renewal") {
        return renderReviewAndPay();
      }
      return (
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg text-foreground">Community Support Documents</h3>
          <p className="text-sm text-muted-foreground">Upload required documents. PDF, JPG or PNG accepted.</p>
          {["CDA Approval Letter *", "Petition / Signatures from Residents", "Proof of Residence", "Identification Document *"].map((doc) => (
            <div key={doc}>
              <label className="text-sm font-medium text-foreground mb-1 block">{doc}</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-5 w-5 mx-auto mb-1" />Click to upload
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (step === 6) {
      return (
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg text-foreground">GPS / Map Location</h3>
          <p className="text-sm text-muted-foreground">Provide the GPS coordinates of the street location.</p>
          <div className="w-full h-56 rounded-xl bg-muted border border-border flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-foreground">Interactive Map</p>
              <p className="text-xs">Click on map to pin street location</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1 block">Latitude</label><Input value={form.gpsLat} onChange={(e) => update("gpsLat", e.target.value)} placeholder="e.g. 6.8103" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Longitude</label><Input value={form.gpsLng} onChange={(e) => update("gpsLng", e.target.value)} placeholder="e.g. 3.1970" /></div>
          </div>
        </div>
      );
    }

    if (step === 7) {
      return renderReviewAndPay();
    }

    return null;
  };

  // ─── Review & Pay panel ────────────────────────────────────────────────────
  const renderReviewAndPay = () => (
    <div className="space-y-5">
      <h3 className="font-display font-semibold text-lg text-foreground">Review & Submit</h3>
      <div className="bg-muted/50 rounded-xl p-4 border border-border space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Applicant</span><span className="font-medium text-foreground">{form.fullName}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Application Type</span><span className="font-medium text-foreground capitalize">{applicationType === "renewal" ? "Street Renewal" : "New Registration"}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Street Name</span><span className="font-medium text-foreground">{form.proposedName || "—"}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Ward</span><span className="font-medium text-foreground">{form.ward || "—"}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">CDA</span><span className="font-medium text-foreground">{form.cda || "—"}</span></div>
        <div className="flex justify-between border-t border-border pt-2 mt-2">
          <span className="font-semibold text-foreground">Amount Due</span>
          <span className="font-bold text-primary text-lg">₦{fee.toLocaleString()}</span>
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
        ⚠️ Your application will be submitted and an invoice generated. Payment must be completed before review begins.
      </div>
      <Button variant="hero" size="lg" className="w-full" onClick={handleSubmit}>
        <FileText className="h-5 w-5" /> Submit Application & Generate Invoice
      </Button>
    </div>
  );

  // ─── Post-submission: success screen ─────────────────────────────────────
  if (submitted && submittedApp && paymentDone) {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto text-center space-y-5 py-16">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Payment Confirmed!</h2>
          <p className="text-muted-foreground text-sm">
            Your street registration application{" "}
            <span className="font-mono font-bold text-primary">{submittedApp.id}</span>{" "}
            is now under review by the LGA Admin.
          </p>
          <div className="bg-muted/50 border border-border rounded-xl p-4 text-sm text-left space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Reference</span><span className="font-mono font-semibold text-foreground">{submittedApp.paymentRef}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Street</span><span className="font-semibold text-foreground">{submittedApp.proposedName}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Amount Paid</span><span className="font-bold text-green-600">₦{submittedApp.amount.toLocaleString()}</span></div>
          </div>
          <Button variant="outline" className="w-full" onClick={resetToList}>Back to My Applications</Button>
        </div>
      </DashboardLayout>
    );
  }

  // ─── Post-submission: invoice + payment screen ────────────────────────────
  if (submitted && submittedApp) {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Invoice Generated</h2>
            <p className="text-muted-foreground text-sm">Complete payment to begin processing your application.</p>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
            <div className="bg-primary px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">LOGMAS Invoice</p>
                <p className="font-display font-bold text-white text-lg">{submittedApp.paymentRef}</p>
              </div>
              <FileText className="h-8 w-8 text-primary-foreground/50" />
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Application ID</span><span className="font-mono font-bold text-primary">{submittedApp.id}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Applicant</span><span className="font-medium text-foreground">{submittedApp.applicantName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium text-foreground">Street Name {submittedApp.applicationType === "renewal" ? "Renewal" : "Registration"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Street</span><span className="font-medium text-foreground">{submittedApp.proposedName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground">{submittedApp.submittedDate}</span></div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold text-foreground text-base">Total Amount</span>
                <span className="font-display font-bold text-primary text-xl">₦{submittedApp.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Select Payment Method</p>
            {[
              { label: "Card Payment (Paystack)", desc: "Visa, Mastercard, Verve" },
              { label: "Bank Transfer", desc: "Transfer to virtual account" },
              { label: "USSD", desc: "*737#, *901# and more" },
            ].map((method) => (
              <div key={method.label} className="p-4 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{method.label}</p>
                  <p className="text-xs text-muted-foreground">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="hero" size="lg" className="w-full" disabled={paymentProcessing} onClick={handleInlinePayment}>
            {paymentProcessing ? (
              <><Clock className="h-5 w-5 animate-spin" /> Processing Payment…</>
            ) : (
              <><CreditCard className="h-5 w-5" /> Pay ₦{submittedApp.amount.toLocaleString()} Now</>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">Ref: {submittedApp.paymentRef} · Secured by LOGMAS Payment Gateway</p>
        </div>
      </DashboardLayout>
    );
  }

  // ─── List view ────────────────────────────────────────────────────────────
  if (view === "list") {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Street Name Registration</h2>
              <p className="text-muted-foreground text-sm">Register or renew a street name in LOGMAS Local Government.</p>
            </div>
            <Button variant="hero" onClick={() => { setView("new"); setStep(0); setApplicationType(""); }}>
              + New Application
            </Button>
          </div>

          {myApps.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-display font-semibold text-foreground">No applications yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start your first street registration application.</p>
              <Button variant="hero" className="mt-4" onClick={() => { setView("new"); setStep(0); setApplicationType(""); }}>
                + New Application
              </Button>
            </div>
          ) : (
            <MyStreetApplications apps={myApps} onPayNow={handlePayNow} />
          )}

          {paying && (
            <div className="fixed inset-0 bg-foreground/30 flex items-center justify-center z-50">
              <div className="bg-card rounded-xl p-8 text-center shadow-xl">
                <Clock className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
                <p className="font-display font-semibold text-foreground">Processing Payment…</p>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // ─── Form view ─────────────────────────────────────────────────────────────
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => { setView("list"); setStep(0); setApplicationType(""); }}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Street Name {applicationType === "renewal" ? "Renewal" : "Registration"}
            </h2>
            <p className="text-muted-foreground text-sm">Complete all steps to submit your application.</p>
          </div>
        </div>

        {/* Progress stepper */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1 shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
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

        {/* Navigation — hide on last step (it has its own submit button) */}
        {step < steps.length - 1 && (
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            <Button variant="hero" onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === 0 && !applicationType}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        {step === steps.length - 1 && (
          <div className="flex justify-start">
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StreetRegistration;