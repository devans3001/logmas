import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import {
  Download,
  Printer,
  CheckCircle2,
  MapPin,
  Shield,
  Award,
} from "lucide-react";
import { getStreetApplications } from "@/lib/mockData";

const StreetCertificate = () => {
  const { id } = useParams<{ id: string }>();
  const apps = getStreetApplications();
  const app = id ? apps.find((a) => a.id === id) : null;

  if (!app || app.status !== "Certificate Issued" || !app.certificateNo) {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto text-center py-20 space-y-4">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto" />
          <h2 className="font-display text-xl font-bold text-foreground">
            Certificate Not Available
          </h2>
          <p className="text-muted-foreground text-sm">
            This application has not been approved or the certificate has not
            been issued yet.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Street Registration Certificate
            </h2>
            <p className="text-sm text-muted-foreground">
              {app.id} · {app.proposedName}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button variant="hero" size="sm">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>

        {/* Certificate */}
        <div
          id="certificate"
          className="bg-white border-4 border-double border-green-700 rounded-2xl p-10 shadow-xl print:shadow-none"
        >
          {/* Header */}
          <div className="text-center space-y-2 border-b-2 border-green-700 pb-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Award className="h-10 w-10 text-green-700" />
            </div>
            <p className="text-xs font-semibold text-green-800 uppercase tracking-widest">
              Federal Republic of Nigeria
            </p>
            <h1 className="font-display text-2xl font-bold text-green-900">
              LOGMAS Local Government
            </h1>
            <p className="text-sm text-green-700 font-medium">
              Department of Urban Development & Street Registration
            </p>
            <div className="inline-block bg-green-700 text-white text-xs font-bold px-4 py-1 rounded-full mt-2">
              CERTIFICATE OF STREET REGISTRATION
            </div>
          </div>

          {/* Body */}
          <div className="text-center space-y-4 text-gray-700">
            <p className="text-sm">This is to certify that the street known as</p>
            <p className="font-display text-3xl font-bold text-green-800">
              {app.proposedName}
            </p>
            <p className="text-sm">
              located at{" "}
              <span className="font-semibold">{app.area}</span>,{" "}
              <span className="font-semibold">{app.ward}</span>
            </p>
            <p className="text-sm">
              has been officially registered with LOGMAS Local Government under
              the applicant
            </p>
            <p className="font-semibold text-base text-gray-900">
              {app.applicantName}
            </p>
          </div>

          {/* Details grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm border border-green-200 rounded-xl p-4 bg-green-50">
            <CertDetail label="Certificate No." value={app.certificateNo!} mono />
            <CertDetail
              label="Registration Type"
              value={
                app.applicationType === "renewal"
                  ? "Renewal"
                  : "New Registration"
              }
            />
            <CertDetail label="Date Issued" value={app.certificateIssuedDate!} />
            <CertDetail label="Ward" value={app.ward} />
            <CertDetail label="CDA" value={app.cda} />
            <CertDetail
              label="GPS Coordinates"
              value={`${app.gpsLat}° N, ${app.gpsLng}° E`}
            />
          </div>

          {/* Verification note */}
          <div className="mt-6 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <Shield className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
            <div>
              <p className="font-semibold">Verify this Certificate</p>
              <p className="text-xs mt-0.5">
                Visit <span className="font-mono font-bold">logmas.com.ng/verify</span> and
                enter certificate number{" "}
                <span className="font-mono font-bold">{app.certificateNo}</span>{" "}
                to verify authenticity.
              </p>
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-10 grid grid-cols-2 gap-8 text-center text-sm">
            <div className="border-t-2 border-gray-400 pt-3">
              <p className="font-semibold text-gray-700">LGA Chairman</p>
              <p className="text-xs text-gray-500">
                LOGMAS Local Government
              </p>
            </div>
            <div className="border-t-2 border-gray-400 pt-3">
              <p className="font-semibold text-gray-700">Director, Urban Dev.</p>
              <p className="text-xs text-gray-500">
                Department of Urban Development
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-green-200 flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono">{app.certificateNo}</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
              <span className="text-green-600 font-medium">
                Verified & Issued by LOGMAS
              </span>
            </div>
            <span>logmas.com.ng</span>
          </div>
        </div>

        {/* QR placeholder */}
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
            <MapPin className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              QR Code Verification
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Scan the QR code on the printed certificate or visit{" "}
              <span className="font-mono text-primary">logmas.com.ng/verify</span>{" "}
              to verify this certificate.
            </p>
            <p className="font-mono text-xs font-bold text-primary mt-1">
              {app.certificateNo}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

function CertDetail({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-green-600 font-medium">{label}</p>
      <p
        className={`text-sm font-semibold text-gray-800 mt-0.5 ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

export default StreetCertificate;