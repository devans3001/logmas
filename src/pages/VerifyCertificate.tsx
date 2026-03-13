import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Shield, Search, CheckCircle, XCircle, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const VerifyCertificate = () => {
  const [ref, setRef] = useState("");
  const [result, setResult] = useState<"none" | "found" | "not_found">("none");

  const verify = () => {
    if (ref.startsWith("IFO-")) setResult("found");
    else setResult("not_found");
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Verify Certificate</h1>
          <p className="text-muted-foreground">Enter a certificate or receipt reference number to verify its authenticity.</p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Reference Number</label>
              <Input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="e.g. IFO-BC-2026-00145" />
            </div>
            <Button variant="hero" className="w-full" onClick={verify}><Search className="h-4 w-4" /> Verify</Button>
          </div>

          {result === "found" && (
            <div className="mt-6 p-4 rounded-xl bg-success/10 border border-success/20">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-6 w-6 text-success" />
                <h3 className="font-display font-semibold text-success">Certificate Verified ✓</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-foreground">Birth Certificate</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium text-foreground">Adebayo Ogundimu</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Issued</span><span className="font-medium text-foreground">March 10, 2026</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Reference</span><span className="font-mono text-primary">{ref}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Issued By</span><span className="font-medium text-foreground">Ifo Local Government</span></div>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-primary" />
              </div>
            </div>
          )}

          {result === "not_found" && (
            <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-destructive" />
                <div>
                  <h3 className="font-display font-semibold text-destructive">Not Found</h3>
                  <p className="text-sm text-muted-foreground">No certificate found with this reference. Please check and try again.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <PublicFooter />
    </div>
  );
};

export default VerifyCertificate;
