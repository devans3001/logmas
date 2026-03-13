import DashboardLayout from "@/components/DashboardLayout";
import { Award, Download, QrCode, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const certificates = [
  { id: "IFO-CRT-001", type: "Birth Certificate", name: "Adebayo Ogundimu", date: "Mar 10, 2026", ref: "IFO-BC-2026-00145" },
  { id: "IFO-STR-190", type: "Street Name Approval", name: "Balogun Street", date: "Feb 15, 2026", ref: "IFO-SNA-2026-00034" },
];

const ApprovedCertificates = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Approved Certificates</h2>
          <p className="text-muted-foreground">Download your approved certificates and receipts.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground">{cert.type}</h3>
                  <p className="text-sm text-muted-foreground">{cert.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Ref: {cert.ref}</p>
                  <p className="text-xs text-muted-foreground">Issued: {cert.date}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-card rounded-lg border border-border flex items-center justify-center">
                    <QrCode className="h-12 w-12 text-primary" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">QR Verification</p>
                    <p>Scan to verify certificate authenticity</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="hero" size="sm" className="flex-1"><Download className="h-4 w-4" /> Download PDF</Button>
                <Button variant="outline" size="sm"><Eye className="h-4 w-4" /> Preview</Button>
              </div>
            </div>
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium">No approved certificates yet</p>
            <p className="text-sm">Your approved certificates will appear here.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApprovedCertificates;
