import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Shield, Search, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getApplications, getStreetApplications, Application, StreetApplication } from "@/lib/mockData";

type UnifiedResult = 
  | { origin: "standard"; data: Application }
  | { origin: "street"; data: StreetApplication }
  | null;

const VerifyCertificate = () => {
  const [ref, setRef] = useState("");
  const [result, setResult] = useState<UnifiedResult | undefined>(undefined);

  const verify = () => {
    const searchRef = ref.trim().toLowerCase();
    if (!searchRef) return;

    // 1. Search Standard Application dataset
    const standardApps = getApplications();
    const foundStandard = standardApps.find(a =>
      a.certificateNo?.toLowerCase() === searchRef ||
      a.id.toLowerCase() === searchRef
    );

    if (foundStandard) {
      setResult({ origin: "standard", data: foundStandard });
      return;
    }

    // 2. Search Street Application dataset
    const streetApps = getStreetApplications();
    const foundStreet = streetApps.find(a =>
      a.certificateNo?.toLowerCase() === searchRef ||
      a.id.toLowerCase() === searchRef
    );

    if (foundStreet) {
      setResult({ origin: "street", data: foundStreet });
      return;
    }

    setResult(null);
  };

  // Status mapping abstractions based on application origin
  const isValid = result && (
    (result.origin === "standard" && (result.data.status === "Ward Approved" || result.data.status === "Approved")) ||
    (result.origin === "street" && (result.data.status === "Approved" || result.data.status === "Certificate Issued"))
  );

  const isRevoked = result && (
    (result.origin === "standard" && result.data.status === "Declined") ||
    (result.origin === "street" && result.data.status === "Rejected")
  );

  // Dynamic label configuration mapping for the valid details card rows
  const detailsRows = (() => {
    if (!result || !isValid) return [];
    
    if (result.origin === "street") {
      return [
        ["Certificate Type", `Street Naming (${result.data.applicationType})`],
        ["Applicant Name", result.data.applicantName],
        ["Registered Street Name", result.data.proposedName],
        ["CDA", result.data.cda],
        ["Ward", result.data.ward],
        ["Local Government", "LOGMAS Local Government"],
        ["Certificate Number", result.data.certificateNo!],
        ["Issue Date", result.data.certificateIssuedDate || result.data.submittedDate],
        ["Status", "✅ VALID"],
      ];
    } else {
      return [
        ["Certificate Type", result.data.type],
        ["Applicant Name", result.data.applicantName],
        ["Community", result.data.community],
        ["Ward", result.data.ward],
        ["Local Government", "LOGMAS Local Government"],
        ["Certificate Number", result.data.certificateNo!],
        ["Issue Date", result.data.submittedDate],
        ["Status", "✅ VALID"],
      ];
    }
  })();

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Verify Certificate</h1>
          <p className="text-muted-foreground text-sm">Enter a certificate number to verify its authenticity. For use by universities, employers, NYSC, immigration, and institutions.</p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Certificate Number or Application ID</label>
            <Input
              value={ref}
              onChange={e => setRef(e.target.value)}
              onKeyDown={e => e.key === "Enter" && verify()}
              placeholder="e.g. LOGMAS/SOO/2025/042"
              className="h-11"
            />
          </div>
          <Button variant="hero" className="w-full" onClick={verify}>
            <Search className="h-4 w-4 mr-1" /> Verify Certificate
          </Button>

          {/* Valid */}
          {result && isValid && (
            <div className="p-5 rounded-xl bg-success/10 border border-success/30 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-7 w-7 text-success flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-success text-lg">Certificate Valid ✓</h3>
                  <p className="text-xs text-muted-foreground">This certificate is authentic and was issued by LOGMAS Local Government</p>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-4 space-y-2 text-sm">
                {detailsRows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span className="text-muted-foreground flex-shrink-0">{k}</span>
                    <span className={`font-medium text-foreground text-right ${k === "Status" ? "text-success" : ""}`}>{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground">Verified on {new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          )}

          {/* Revoked */}
          {result && isRevoked && (
            <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-3">
                <XCircle className="h-7 w-7 text-destructive" />
                <div>
                  <h3 className="font-display font-bold text-destructive">Certificate Revoked</h3>
                  <p className="text-sm text-muted-foreground">This certificate has been revoked and is no longer valid.</p>
                </div>
              </div>
            </div>
          )}

          {/* Not found */}
          {result === null && (
            <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-3">
                <XCircle className="h-7 w-7 text-destructive" />
                <div>
                  <h3 className="font-display font-bold text-destructive">Not Found</h3>
                  <p className="text-sm text-muted-foreground">No certificate found with this reference. Please check the number and try again.</p>
                </div>
              </div>
            </div>
          )}

          {/* Info box for institutions */}
          <div className="bg-muted/40 rounded-lg p-4 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">For Institutions & Employers</p>
            <p>This portal is accessible without login and can be used to verify certificates issued by LOGMAS Local Government. Accepted by NYSC, Nigerian Army, Immigration, universities, polytechnics, and employers.</p>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
};

export default VerifyCertificate;