import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Award, Download, QrCode, RefreshCw, Printer, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApplications, Application } from "@/lib/mockData";
import { getUser } from "@/lib/auth";

const ApprovedCertificates = () => {
  const user = getUser();
  const myEmail = user?.email;

  const getMyApproved = () => getApplications().filter(a =>
    (a.status === "Ward Approved" || a.status === "Approved") &&
    a.citizenEmail === myEmail && a.certificateNo
  );

  const [certs, setCerts] = useState<Application[]>(getMyApproved);
  const [viewing, setViewing] = useState<Application | null>(null);
  const certRef = useRef<HTMLDivElement>(null);

  const refresh = () => setCerts(getMyApproved());

  const handlePrint = () => {
    const content = certRef.current?.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Certificate</title>
      <style>
        body { margin: 0; font-family: Georgia, serif; }
        @media print { body { margin: 0; } }
      </style>
      </head><body>${content}</body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  const handleShare = (cert: Application) => {
    const text = `Certificate Verification\nType: ${cert.type}\nName: ${cert.applicantName}\nCert No: ${cert.certificateNo}\nVerify at: ${window.location.origin}/verify`;
    if (navigator.share) {
      navigator.share({ title: cert.type, text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Certificate details copied to clipboard!");
    }
  };

  // Handle click on backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close modal only if the click is on the backdrop itself, not on the modal content
    if (e.target === e.currentTarget) {
      setViewing(null);
    }
  };

  // Handle Escape key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setViewing(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Approved Certificates</h2>
            <p className="text-muted-foreground">Download, print or share your certificates.</p>
          </div>
          <Button variant="outline" size="sm" onClick={refresh}><RefreshCw className="h-4 w-4" /></Button>
        </div>

        {certs.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium">No approved certificates yet</p>
            <p className="text-sm">Certificates appear here once your ward councillor approves.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {certs.map((cert) => (
              <div key={cert.id} className="bg-card rounded-xl p-6 shadow-card border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground">{cert.type}</h3>
                    <p className="text-sm text-muted-foreground">{cert.applicantName}</p>
                    <p className="text-xs font-mono text-primary mt-1">{cert.certificateNo}</p>
                    <p className="text-xs text-muted-foreground">Issued: {cert.submittedDate}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border flex items-center gap-3">
                  <QrCode className="h-12 w-12 text-primary flex-shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">QR Verification</p>
                    <p>Scan or visit /verify to confirm authenticity</p>
                    <p className="font-mono text-primary mt-0.5">{cert.certificateNo}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="hero" size="sm" className="flex-1" onClick={() => setViewing(cert)}>
                    <Download className="h-4 w-4 mr-1" /> View & Print
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(cert)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal with click outside to close */}
      {viewing && (
        <div 
          className="fixed inset-0 bg-foreground/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            {/* Modal controls - not printed */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50 rounded-t-2xl print:hidden">
              <p id="certificate-modal-title" className="text-sm font-medium text-gray-600">Certificate Preview</p>
              <div className="flex gap-2">
                <button onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
                  <Printer className="h-3.5 w-3.5" /> Print / Save PDF
                </button>
                <button onClick={() => handleShare(viewing)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
                <button onClick={() => setViewing(null)} className="p-1.5 hover:bg-gray-200 rounded-lg">
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* The actual certificate */}
            <div ref={certRef}>
              <CertificateTemplate cert={viewing} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

/* ── Certificate Template ── */
const CertificateTemplate = ({ cert }: { cert: Application }) => {
  const isOrigin = cert.type === "State of Origin";
  const isBirth = cert.type === "Birth Certificate";
  const isDeath = cert.type === "Death Certificate";
  const isMarriage = cert.type === "Marriage Certificate";

  const borderColor = isOrigin ? "#1a5276" : isBirth ? "#1e8449" : isDeath ? "#424949" : "#7d6608";
  const headerBg = isOrigin ? "#1a5276" : isBirth ? "#1e8449" : isDeath ? "#424949" : "#7d6608";
  const typeLabel = cert.type.toUpperCase();

  return (
    <div style={{ fontFamily: "Georgia, serif", padding: "40px", background: "#fff", color: "#000" }}>
      {/* Outer border */}
      <div style={{ border: `6px double ${borderColor}`, padding: "24px", position: "relative" }}>
        {/* Inner border */}
        <div style={{ border: `2px solid ${borderColor}`, padding: "24px" }}>

          {/* Header */}
          <div style={{ background: headerBg, color: "#fff", textAlign: "center", padding: "16px", marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "3px", marginBottom: "4px" }}>FEDERAL REPUBLIC OF NIGERIA</div>
            <div style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "2px" }}>LOGMAS LOCAL GOVERNMENT</div>
            <div style={{ fontSize: "11px", marginTop: "4px", opacity: 0.85 }}>Office of the Secretary</div>
          </div>

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: headerBg, letterSpacing: "1px", borderBottom: `2px solid ${borderColor}`, paddingBottom: "8px", display: "inline-block" }}>
              {typeLabel}
            </div>
          </div>

          {/* Body text */}
          <div style={{ fontSize: "13px", lineHeight: "1.9", marginBottom: "20px", textAlign: "justify" }}>
            {isOrigin && (
              <>
                <p>This is to certify that <strong>{cert.applicantName}</strong> is a bona fide indigene of <strong>{cert.community}</strong>, under <strong>{cert.ward}</strong>, within the jurisdiction of <strong>LOGMAS Local Government Area</strong>.</p>
                <p style={{ marginTop: "12px" }}>This certificate is issued in accordance with the powers vested in the Local Government Council and is valid for all lawful purposes including admission, employment, NYSC deployment, and official documentation.</p>
              </>
            )}
            {isBirth && (
              <>
                <p>This is to certify that the birth of <strong>{cert.applicantName}</strong> has been duly registered in the records of <strong>LOGMAS Local Government</strong>.</p>
                <p style={{ marginTop: "12px" }}>This certificate is issued under the Births, Deaths and Marriages Registration Act and serves as official proof of birth registration.</p>
              </>
            )}
            {isDeath && (
              <>
                <p>This is to certify that the death of <strong>{cert.applicantName}</strong>, a resident of <strong>{cert.community}</strong>, has been duly registered in the records of <strong>LOGMAS Local Government</strong>.</p>
                <p style={{ marginTop: "12px" }}>This certificate is issued for official and legal purposes in accordance with Nigerian law.</p>
              </>
            )}
            {isMarriage && (
              <>
                <p>This is to certify that the marriage involving <strong>{cert.applicantName}</strong>, resident of <strong>{cert.community}</strong>, has been duly registered at <strong>LOGMAS Local Government</strong>.</p>
                <p style={{ marginTop: "12px" }}>This certificate is issued under the Marriage Act and is valid for all legal purposes.</p>
              </>
            )}
          </div>

          {/* Details grid */}
          <div style={{ background: "#f8f9fa", border: `1px solid ${borderColor}`, borderRadius: "6px", padding: "16px", marginBottom: "24px" }}>
            <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Certificate Number", cert.certificateNo],
                  ["Applicant Name", cert.applicantName],
                  ["Community / Ward", `${cert.community} — ${cert.ward}`],
                  ["Local Government", "LOGMAS Local Government"],
                  ["Date of Issue", new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })],
                  ["Status", "VALID"],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "6px 8px", color: "#555", fontWeight: "bold", width: "40%" }}>{k}</td>
                    <td style={{ padding: "6px 8px", color: k === "Status" ? "#1e8449" : "#000", fontWeight: k === "Status" ? "bold" : "normal" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature + QR row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "cursive", fontSize: "22px", color: headerBg, borderBottom: `1px solid ${borderColor}`, paddingBottom: "4px", marginBottom: "4px", minWidth: "160px" }}>
                J. A. Adeyemi
              </div>
              <div style={{ fontSize: "10px", color: "#555" }}>Local Government Secretary</div>
              <div style={{ fontSize: "10px", color: "#555" }}>LOGMAS LGA</div>
            </div>

            {/* QR placeholder */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "80px", height: "80px", border: `2px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px" }}>
                <div style={{ fontSize: "8px", textAlign: "center", color: "#555", padding: "4px" }}>
                  {/* Simple QR-like grid visual */}
                  <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="25" height="25" fill="none" stroke={borderColor} strokeWidth="3"/>
                    <rect x="5" y="5" width="15" height="15" fill={borderColor}/>
                    <rect x="35" y="0" width="25" height="25" fill="none" stroke={borderColor} strokeWidth="3"/>
                    <rect x="40" y="5" width="15" height="15" fill={borderColor}/>
                    <rect x="0" y="35" width="25" height="25" fill="none" stroke={borderColor} strokeWidth="3"/>
                    <rect x="5" y="40" width="15" height="15" fill={borderColor}/>
                    <rect x="35" y="30" width="5" height="5" fill={borderColor}/>
                    <rect x="45" y="30" width="5" height="5" fill={borderColor}/>
                    <rect x="55" y="30" width="5" height="5" fill={borderColor}/>
                    <rect x="35" y="40" width="5" height="5" fill={borderColor}/>
                    <rect x="50" y="40" width="10" height="5" fill={borderColor}/>
                    <rect x="35" y="50" width="15" height="5" fill={borderColor}/>
                    <rect x="55" y="50" width="5" height="10" fill={borderColor}/>
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: "9px", color: "#555" }}>Scan to Verify</div>
              <div style={{ fontSize: "8px", color: "#555", fontFamily: "monospace" }}>{cert.certificateNo}</div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ width: "80px", height: "80px", border: `2px dashed ${borderColor}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px" }}>
                <div style={{ fontSize: "8px", textAlign: "center", color: headerBg, fontWeight: "bold", padding: "8px" }}>OFFICIAL SEAL</div>
              </div>
              <div style={{ fontSize: "10px", color: "#555" }}>Local Government Chairman</div>
              <div style={{ fontSize: "10px", color: "#555" }}>LOGMAS LGA</div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: "20px", paddingTop: "12px", borderTop: `1px solid ${borderColor}`, textAlign: "center", fontSize: "9px", color: "#777" }}>
            <p>This certificate can be verified online at <strong>logmas.com.ng/verify</strong> using certificate number <strong>{cert.certificateNo}</strong></p>
            <p style={{ marginTop: "4px" }}>Powered by LOGMAS Digital Government Platform · logmas Government Area · Ogun State, Nigeria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedCertificates;