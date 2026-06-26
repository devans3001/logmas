// src/pages/WardApplications.tsx
import { useState } from "react";
import { getUser } from "@/lib/auth";
import { getApplications, updateApplicationStatus, Application } from "@/lib/mockData";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import WardLayout from "@/components/WardLayout";

const statusColor: Record<string, string> = {
  "Awaiting Ward Approval": "bg-amber-100 text-amber-700",
  "Ward Approved": "bg-emerald-100 text-emerald-700",
  "Ward Declined": "bg-red-100 text-red-700",
  "Correction Requested": "bg-blue-100 text-blue-700",
};

const WardApplications = () => {
  const user = getUser();
  const [apps, setApps] = useState<Application[]>(() =>
    getApplications().filter(a => a.ward === user?.ward)
  );
  const [selected, setSelected] = useState<Application | null>(null);
  const [note, setNote] = useState("");
  const [action, setAction] = useState<"approve" | "decline" | "correction" | null>(null);

  const refresh = () => setApps(getApplications().filter(a => a.ward === user?.ward));

  const handleAction = () => {
    if (!selected || !action) return;
    if ((action === "decline" || action === "correction") && !note.trim()) {
      alert("Please provide a reason.");
      return;
    }
    const statusMap = {
      approve: "Ward Approved" as const,
      decline: "Ward Declined" as const,
      correction: "Correction Requested" as const,
    };
    updateApplicationStatus(selected.id, statusMap[action], note || undefined, "wardNote");
    setSelected(null);
    setNote("");
    setAction(null);
    refresh();
  };

  return (
    <WardLayout>
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Applications — {user?.ward}</h2>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  {["ID", "Applicant", "Type", "Community", "Date", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {apps.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{app.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{app.applicantName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.community}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.submittedDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[app.status] || "bg-muted text-muted-foreground"}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {app.status === "Awaiting Ward Approval" && (
                        <button onClick={() => { setSelected(app); setAction(null); setNote(""); }}
                          className="text-xs text-primary hover:underline font-medium">
                          Review
                        </button>
                      )}
                      {app.certificateNo && (
                        <span className="text-xs text-emerald-600 font-mono">{app.certificateNo}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg shadow-xl">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-display font-bold text-lg text-foreground">Review Application</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{selected.id} · {selected.type}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Applicant:</span> <span className="font-medium">{selected.applicantName}</span></div>
                <div><span className="text-muted-foreground">Community:</span> <span className="font-medium">{selected.community}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{selected.submittedDate}</span></div>
                <div><span className="text-muted-foreground">Amount Paid:</span> <span className="font-medium">₦{selected.amount.toLocaleString()}</span></div>
              </div>

              {selected.adminNote && (
                <div className="p-3 bg-muted rounded-lg text-xs">
                  <span className="font-medium">LGA Admin Note:</span> {selected.adminNote}
                </div>
              )}

              <div className="flex gap-2">
                {(["approve", "decline", "correction"] as const).map((a) => (
                  <button key={a} onClick={() => setAction(a)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      action === a ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}>
                    {a === "approve" ? "✓ Approve" : a === "decline" ? "✗ Decline" : "⟳ Request Correction"}
                  </button>
                ))}
              </div>

              {(action === "decline" || action === "correction") && (
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Reason is required..."
                  className="w-full border border-border rounded-lg p-3 text-sm bg-background resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setSelected(null)}>Cancel</Button>
                <Button className="flex-1" disabled={!action} onClick={handleAction}>Submit Decision</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </WardLayout>
  );
};

export default WardApplications;