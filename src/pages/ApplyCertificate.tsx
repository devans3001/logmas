import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ChevronRight, CreditCard, RefreshCw } from "lucide-react";
import { getApplications, saveApplications, Application } from "@/lib/mockData";
import { getUser } from "@/lib/auth";
import { Link } from "react-router-dom";

const steps = ["Certificate Type", "Personal Details", "Additional Info", "Preview", "Invoice & Pay", "Complete"];

const FEES: Record<string, number> = {
  origin: 5000, birth: 5000, death: 3000, marriage: 7500,
};

const TYPE_LABELS: Record<string, string> = {
  origin: "State of Origin", birth: "Birth Certificate",
  death: "Death Certificate", marriage: "Marriage Certificate",
};

const ApplyCertificate = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [certType, setCertType] = useState("");
  const [newAppId, setNewAppId] = useState("");
  const [paying, setPaying] = useState(false);
  const [pendingApp, setPendingApp] = useState<Application | null>(null);
  const [form, setForm] = useState({
    fullName: "", dob: "", gender: "", phone: "", address: "",
    fatherName: "", motherName: "", community: "", purpose: "",
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const next = () => {
    if (currentStep === 3) {
      // Step 3 "Preview" → submit app, then show invoice on step 4
      submitApplication();
    } else {
      setCurrentStep(s => Math.min(s + 1, steps.length - 1));
    }
  };

  const prev = () => setCurrentStep(s => Math.max(s - 1, 0));

 const submitApplication = () => {
  const user = getUser();
  const apps = getApplications();
  const id = `APP-${String(apps.length + 1).padStart(3, "0")}`;
  const newApp: Application = {
    id,
    applicantName: form.fullName || user?.name || "Citizen",
    citizenEmail: user?.email,          // <-- ADD THIS
    type: TYPE_LABELS[certType] || certType,
    ward: "Ward 3 - Ifo Central",
    community: form.community || "Ifo Town",
    submittedDate: new Date().toISOString().split("T")[0],
    status: "Submitted",
    amount: FEES[certType] || 5000,
    paid: false,
  };
  saveApplications([...apps, newApp]);
  setNewAppId(id);
  setPendingApp(newApp);
  setCurrentStep(4);
};
  const simulatePayment = () => {
    if (!pendingApp) return;
    setPaying(true);
    setTimeout(() => {
      const all = getApplications();
      const idx = all.findIndex(a => a.id === pendingApp.id);
      if (idx !== -1) {
        all[idx].status = "Paid";
        all[idx].paid = true;
        saveApplications(all);
      }
      setPaying(false);
      setCurrentStep(5); // now show success
    }, 1800);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">Apply for Certificate</h2>

        {/* Stepper */}
        <div className="flex items-center mb-8 overflow-x-auto">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${i <= currentStep ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < currentStep ? "bg-primary text-primary-foreground"
                  : i === currentStep ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                }`}>
                  {i < currentStep ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{step}</span>
              </div>
              {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">

          {/* Step 0 — Certificate Type */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Select Certificate Type</h3>
              <Select value={certType} onValueChange={setCertType}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Choose certificate type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="origin">State of Origin</SelectItem>
                  <SelectItem value="birth">Birth Certificate</SelectItem>
                  <SelectItem value="death">Death Certificate</SelectItem>
                  <SelectItem value="marriage">Marriage Certificate</SelectItem>
                </SelectContent>
              </Select>
              {certType && (
                <div className="bg-muted/40 rounded-lg p-4 text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">Fee</span><span className="font-semibold text-foreground">₦{FEES[certType].toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Processing</span><span className="font-medium text-foreground">3–5 Business Days</span></div>
                </div>
              )}
            </div>
          )}

          {/* Step 1 — Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Personal Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input className="mt-1.5 h-11" value={form.fullName} onChange={set("fullName")} placeholder="Enter full name" /></div>
                <div><Label>Date of Birth</Label><Input type="date" className="mt-1.5 h-11" value={form.dob} onChange={set("dob")} /></div>
                <div>
                  <Label>Gender</Label>
                  <Select value={form.gender} onValueChange={v => setForm(f => ({ ...f, gender: v }))}>
                    <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                  </Select>
                </div>
                <div><Label>Phone Number</Label><Input className="mt-1.5 h-11" value={form.phone} onChange={set("phone")} placeholder="+234..." /></div>
              </div>
              <div><Label>Address</Label><Textarea className="mt-1.5" value={form.address} onChange={set("address")} placeholder="Enter your address" /></div>
            </div>
          )}

          {/* Step 2 — Additional Info */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Additional Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Father's Name</Label><Input className="mt-1.5 h-11" value={form.fatherName} onChange={set("fatherName")} placeholder="Enter father's name" /></div>
                <div><Label>Mother's Name</Label><Input className="mt-1.5 h-11" value={form.motherName} onChange={set("motherName")} placeholder="Enter mother's name" /></div>
                <div><Label>Community / Town</Label><Input className="mt-1.5 h-11" value={form.community} onChange={set("community")} placeholder="e.g. Ifo Town" /></div>
                <div><Label>Purpose</Label><Input className="mt-1.5 h-11" value={form.purpose} onChange={set("purpose")} placeholder="Reason for application" /></div>
              </div>
            </div>
          )}

          {/* Step 3 — Preview */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Preview Application</h3>
              <div className="bg-muted/50 rounded-lg p-5 space-y-3">
                {[
                  ["Certificate Type", TYPE_LABELS[certType] || "—"],
                  ["Full Name", form.fullName || "—"],
                  ["Community", form.community || "—"],
                  ["Father's Name", form.fatherName || "—"],
                  ["Mother's Name", form.motherName || "—"],
                  ["Purpose", form.purpose || "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-foreground">{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">By submitting, you confirm all information is accurate. You will be prompted to pay after submission.</p>
            </div>
          )}

          {/* Step 4 — Invoice & Pay */}
          {currentStep === 4 && pendingApp && (
            <div className="space-y-5">
              <h3 className="font-display font-semibold text-lg text-foreground">Invoice & Payment</h3>

              {/* Invoice */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-primary/5 px-5 py-3 border-b border-border flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">LOGMAS Local Government</p>
                    <p className="text-xs text-muted-foreground">Official Invoice</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-primary font-semibold">INV-{pendingApp.id}</p>
                    <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString("en-NG")}</p>
                  </div>
                </div>
                <div className="p-5 space-y-2 text-sm">
                  {[
                    ["Application ID", pendingApp.id],
                    ["Service", pendingApp.type],
                    ["Applicant", pendingApp.applicantName],
                    ["Ward", pendingApp.ward],
                    ["Due Date", new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-NG")],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium text-foreground">{v}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 mt-3 flex justify-between items-center">
                    <span className="font-bold text-foreground">Total Amount Due</span>
                    <span className="font-display text-2xl font-bold text-primary">₦{pendingApp.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
                ⚠️ Your application will not be reviewed until payment is confirmed.
              </div>

              {/* Payment methods (display only) */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Payment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Online Payment", "Bank Transfer", "Virtual Account", "POS"].map(m => (
                    <div key={m} className="border border-border rounded-lg p-2.5 text-xs text-center text-muted-foreground bg-muted/30">{m}</div>
                  ))}
                </div>
              </div>

              <Button variant="hero" className="w-full h-12 text-base" onClick={simulatePayment} disabled={paying}>
                {paying
                  ? <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4 animate-spin" />Processing Payment...</span>
                  : <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" />Pay ₦{pendingApp.amount.toLocaleString()} Now</span>
                }
              </Button>
            </div>
          )}

          {/* Step 5 — Success */}
          {currentStep === 5 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Payment Confirmed!</h3>
              <p className="text-muted-foreground mb-1">Application ID: <strong>{newAppId}</strong></p>
              <p className="text-sm text-muted-foreground mb-6">
                Your application is now with the LGA Admin for review. You'll be notified at each stage.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link to="/dashboard/applications">Track Application</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Nav buttons — only steps 0–3 */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prev} disabled={currentStep === 0}>Back</Button>
              <Button variant="hero" onClick={next} disabled={currentStep === 0 && !certType}>
                {currentStep === 3 ? "Submit & Get Invoice" : "Continue"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplyCertificate;