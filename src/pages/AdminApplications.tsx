import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { getApplications, updateApplicationStatus, Application } from "@/lib/mockData";

const ADMIN_VISIBLE = ["Paid", "Under Review", "Awaiting Ward Approval", "Ward Approved", "Ward Declined", "Declined", "Correction Requested", "Approved"];

const statusColors: Record<string, string> = {
  Paid: "bg-info/15 text-info",
  "Under Review": "bg-info/15 text-info",
  "Awaiting Ward Approval": "bg-blue-100 text-blue-700",
  "Ward Approved": "bg-success/15 text-success",
  Approved: "bg-success/15 text-success",
  Declined: "bg-destructive/15 text-destructive",
  "Ward Declined": "bg-destructive/15 text-destructive",
  "Correction Requested": "bg-amber-100 text-amber-700",
};

const AdminApplications = () => {
  const [apps, setApps] = useState<Application[]>(() =>
    getApplications().filter(a => ADMIN_VISIBLE.includes(a.status))
  );
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);
  const [note, setNote] = useState("");
  const [action, setAction] = useState<"approve" | "decline" | "correction" | null>(null);

  const refresh = () => setApps(getApplications().filter(a => ADMIN_VISIBLE.includes(a.status)));

  const filtered = apps.filter(a =>
    a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = () => {
    if (!selected || !action) return;
    if ((action === "decline" || action === "correction") && !note.trim()) {
      alert("Please provide a reason."); return;
    }
    const statusMap = {
      approve: "Awaiting Ward Approval" as const,
      decline: "Declined" as const,
      correction: "Correction Requested" as const,
    };
    updateApplicationStatus(selected.id, statusMap[action], note || undefined, "adminNote");
    setSelected(null); setNote(""); setAction(null);
    refresh();
  };

  const canReview = (status: string) => ["Paid", "Under Review", "Correction Requested"].includes(status);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Applications</h2>
            <p className="text-muted-foreground text-sm">Only paid applications are shown for review.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refresh}><RefreshCw className="h-4 w-4" /></Button>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 h-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Status summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Awaiting Review", statuses: ["Paid", "Under Review"], color: "text-info" },
            { label: "Sent to Ward", statuses: ["Awaiting Ward Approval"], color: "text-blue-600" },
            { label: "Completed", statuses: ["Ward Approved", "Approved"], color: "text-success" },
            { label: "Declined", statuses: ["Declined", "Ward Declined"], color: "text-destructive" },
          ].map(g => (
            <div key={g.label} className="bg-card border border-border rounded-xl p-3">
              <p className="text-xs text-muted-foreground">{g.label}</p>
              <p className={`font-display text-xl font-bold mt-1 ${g.color}`}>
                {apps.filter(a => g.statuses.includes(a.status)).length}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  {["ID", "Applicant", "Type", "Ward", "Date", "Amount", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-foreground text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground text-sm">No paid applications yet</td></tr>
                ) : filtered.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{app.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{app.applicantName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.type}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{app.ward}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.submittedDate}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">₦{app.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[app.status] || "bg-muted text-muted-foreground"}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {canReview(app.status) ? (
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success"
                            onClick={() => { setSelected(app); setAction("approve"); setNote(""); }}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"
                            onClick={() => { setSelected(app); setAction("decline"); setNote(""); }}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">{app.certificateNo || "—"}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg shadow-xl">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-display font-bold text-lg text-foreground">Review Application</h3>
              <p className="text-xs text-muted-foreground">{selected.id} · {selected.type} · ₦{selected.amount.toLocaleString()} Paid</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Applicant: </span><span className="font-medium">{selected.applicantName}</span></div>
                <div><span className="text-muted-foreground">Ward: </span><span className="font-medium">{selected.ward}</span></div>
                <div><span className="text-muted-foreground">Community: </span><span className="font-medium">{selected.community}</span></div>
                <div><span className="text-muted-foreground">Submitted: </span><span className="font-medium">{selected.submittedDate}</span></div>
              </div>

              <div className="flex gap-2">
                {(["approve", "decline", "correction"] as const).map(a => (
                  <button key={a} onClick={() => setAction(a)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${action === a ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                    {a === "approve" ? "✓ Forward to Ward" : a === "decline" ? "✗ Decline" : "⟳ Correction"}
                  </button>
                ))}
              </div>

              {(action === "decline" || action === "correction") && (
                <textarea value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Reason is required..."
                  className="w-full border border-border rounded-lg p-3 text-sm bg-background resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary" />
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setSelected(null)}>Cancel</Button>
                <Button className="flex-1" disabled={!action} onClick={handleAction}>Submit Decision</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminApplications;