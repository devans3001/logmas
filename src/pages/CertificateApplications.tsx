import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { FileText, Clock, RefreshCw, CreditCard, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getApplications, saveApplications, Application } from "@/lib/mockData";
import { getUser } from "@/lib/auth";

const statusColors: Record<string, string> = {
  "Ward Approved": "bg-success/15 text-success",
  Approved: "bg-success/15 text-success",
  Submitted: "bg-muted text-muted-foreground",
  "Awaiting Payment": "bg-amber-100 text-amber-700",
  Paid: "bg-info/15 text-info",
  "Under Review": "bg-info/15 text-info",
  "Awaiting Ward Approval": "bg-blue-100 text-blue-700",
  Declined: "bg-destructive/15 text-destructive",
  "Ward Declined": "bg-destructive/15 text-destructive",
  "Correction Requested": "bg-accent/15 text-accent",
};

const CertificateApplications = () => {
  const user = getUser();
  const myEmail = user?.email;
const getMyApps = () => getApplications().filter(a => a.citizenEmail === myEmail);

console.log(myEmail,"lolp",getMyApps())

  const [apps, setApps] = useState<Application[]>(getMyApps);
  const [invoice, setInvoice] = useState<Application | null>(null);
  const [paying, setPaying] = useState(false);

  const refresh = () => setApps(getMyApps());

  const simulatePayment = () => {
    if (!invoice) return;
    setPaying(true);
    setTimeout(() => {
      const all = getApplications();
      const idx = all.findIndex(a => a.id === invoice.id);
      if (idx !== -1) {
        all[idx].status = "Paid";
        all[idx].paid = true;
        saveApplications(all);
      }
      setPaying(false);
      setInvoice(null);
      refresh();
    }, 1800);
  };

  const totalPaid = apps.filter(a => a.paid).reduce((s, a) => s + a.amount, 0);
  const pending = apps.filter(a => !a.paid).reduce((s, a) => s + a.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">My Applications</h2>
            <p className="text-muted-foreground">Track and pay for your applications.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refresh}><RefreshCw className="h-4 w-4" /></Button>
            <Button variant="hero" asChild>
              <Link to="/dashboard/apply"><FileText className="h-4 w-4 mr-1" />New Application</Link>
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground">Total Applications</p>
            <p className="font-display text-2xl font-bold text-foreground mt-1">{apps.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground">Total Paid</p>
            <p className="font-display text-2xl font-bold text-success mt-1">₦{totalPaid.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground">Awaiting Payment</p>
            <p className="font-display text-2xl font-bold text-amber-500 mt-1">₦{pending.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          {apps.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No applications yet</p>
              <p className="text-sm">Submit your first application to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    {["Reference", "Type", "Date", "Fee", "Status", "Action"].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app) => (
                    <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-primary">{app.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{app.type}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{app.submittedDate}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">₦{app.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[app.status] || "bg-muted text-muted-foreground"}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {app.status === "Submitted" && (
                          <Button size="sm" variant="hero" onClick={() => setInvoice(app)}>
                            <CreditCard className="h-3 w-3 mr-1" />Pay
                          </Button>
                        )}
                        {app.certificateNo && (
                          <Link to="/dashboard/certificates" className="text-xs text-success font-medium hover:underline">
                            View Certificate
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Officer notes */}
        {apps.some(a => a.wardNote || a.adminNote) && (
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm">Officer Notes</h3>
            {apps.filter(a => a.wardNote || a.adminNote).map(a => (
              <div key={a.id} className="bg-card border border-border rounded-lg p-4 text-sm">
                <span className="font-medium text-foreground">{a.id} — {a.type}</span>
                {a.adminNote && <p className="text-muted-foreground mt-1">LGA Admin: {a.adminNote}</p>}
                {a.wardNote && <p className="text-muted-foreground mt-1">Ward Officer: {a.wardNote}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {invoice && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-md shadow-xl">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Invoice</h3>
                <p className="text-xs text-muted-foreground">LOGMAS Local Government</p>
              </div>
              <button onClick={() => setInvoice(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Invoice details */}
              <div className="bg-muted/40 rounded-xl p-4 space-y-2 text-sm">
                {[
                  ["Invoice No", `INV-${invoice.id}`],
                  ["Service", invoice.type],
                  ["Applicant", invoice.applicantName],
                  ["Ward", invoice.ward],
                  ["Date", new Date().toLocaleDateString("en-NG")],
                  ["Due Date", new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-NG")],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-foreground">{v}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-foreground">Total Amount</span>
                  <span className="text-primary text-lg">₦{invoice.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
                ⚠️ Your application will not be reviewed until payment is confirmed.
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Payment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Online Payment", "Bank Transfer", "Virtual Account", "POS"].map(m => (
                    <div key={m} className="border border-border rounded-lg p-2.5 text-xs text-center text-muted-foreground bg-muted/30 cursor-not-allowed opacity-60">{m}</div>
                  ))}
                </div>
              </div>

              <Button variant="hero" className="w-full" onClick={simulatePayment} disabled={paying}>
                {paying ? (
                  <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4 animate-spin" />Processing...</span>
                ) : (
                  <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" />Simulate Payment — ₦{invoice.amount.toLocaleString()}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CertificateApplications;