import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Eye,
  Check,
  X,
  Clock,
  MapPin,
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import {
  getStreetApplications,
  updateStreetApplicationStatus,
  type StreetApplication,
  type StreetAppStatus,
} from "@/lib/mockData";

// ─── Status badge config ──────────────────────────────────────────────────────
const statusConfig: Record<
  string,
  { color: string; dot: string; label: string }
> = {
  Submitted: {
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    label: "Submitted",
  },
  "Awaiting Payment": {
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    label: "Awaiting Payment",
  },
  Paid: {
    color: "bg-sky-100 text-sky-700",
    dot: "bg-sky-500",
    label: "Paid",
  },
  "Under Review": {
    color: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
    label: "Under Review",
  },
  "Field Inspection": {
    color: "bg-indigo-100 text-indigo-700",
    dot: "bg-indigo-500",
    label: "Field Inspection",
  },
  "Correction Requested": {
    color: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
    label: "Correction Requested",
  },
  Approved: {
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    label: "Approved",
  },
  "Certificate Issued": {
    color: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    label: "Certificate Issued",
  },
  Rejected: {
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    label: "Rejected",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? statusConfig["Submitted"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function ApplicationModal({
  app,
  onClose,
  onUpdate,
}: {
  app: StreetApplication;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const act = (status: StreetAppStatus, noteField: "adminNote" | "inspectionNote" = "adminNote") => {
    setLoading(status);
    setTimeout(() => {
      updateStreetApplicationStatus(app.id, status, note || undefined, noteField);
      setLoading(null);
      onUpdate();
      onClose();
    }, 800);
  };

  const canAct = ["Paid", "Under Review", "Field Inspection"].includes(app.status);

  return (
    <div className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-bold text-primary">
                {app.id}
              </span>
              <StatusBadge status={app.status} />
              <span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-0.5 rounded-full">
                {app.applicationType === "renewal" ? "Renewal" : "New Registration"}
              </span>
            </div>
            <h3 className="font-display font-bold text-foreground text-lg mt-1">
              {app.proposedName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Applicant info */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Applicant Details
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Detail label="Name" value={app.applicantName} />
              <Detail label="Phone" value={app.phone} />
              <Detail label="Email" value={app.email} />
              <Detail label="National ID" value={app.nationalId || "—"} />
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Location Details
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Detail
                label="Address"
                value={`${app.houseNumber} ${app.street}`}
              />
              <Detail label="Area" value={app.area} />
              <Detail label="Ward" value={app.ward} />
              <Detail label="CDA" value={app.cda} />
              <Detail label="Landmarks" value={app.landmarks || "—"} />
              <Detail
                label="GPS"
                value={`${app.gpsLat}° N, ${app.gpsLng}° E`}
              />
            </div>
          </div>

          {/* Street info */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Street Information
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Detail
                label="Proposed Name"
                value={app.proposedName}
                highlight
              />
              {app.previousName && (
                <Detail label="Previous Name" value={app.previousName} />
              )}
              <Detail
                label="Residency"
                value={`${app.yearsLiving || "—"} yrs · ${app.propertyStatus || "—"}`}
              />
            </div>
            {app.reason && (
              <div className="mt-3 bg-muted/50 rounded-lg p-3 text-sm">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  Reason
                </p>
                <p className="text-foreground">{app.reason}</p>
              </div>
            )}
            {app.historicalSignificance && (
              <div className="mt-2 bg-muted/50 rounded-lg p-3 text-sm">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  Historical Significance
                </p>
                <p className="text-foreground">{app.historicalSignificance}</p>
              </div>
            )}
          </div>

          {/* Payment */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Payment
            </h4>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <Detail
                label="Amount"
                value={`₦${app.amount.toLocaleString()}`}
                highlight
              />
              <Detail
                label="Status"
                value={app.paid ? "Paid ✓" : "Unpaid"}
              />
              <Detail
                label="Reference"
                value={app.paymentRef}
                mono
              />
            </div>
          </div>

          {/* Existing notes */}
          {(app.adminNote || app.inspectionNote) && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
              <p className="text-xs font-semibold text-amber-700 mb-1">
                Officer Notes
              </p>
              <p className="text-amber-800">{app.adminNote || app.inspectionNote}</p>
            </div>
          )}

          {/* Certificate */}
          {app.certificateNo && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-green-700 mb-0.5">
                  Certificate Issued
                </p>
                <p className="font-mono text-sm font-bold text-green-800">
                  {app.certificateNo}
                </p>
                <p className="text-xs text-green-600 mt-0.5">
                  Issued: {app.certificateIssuedDate}
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-green-300 text-green-700">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          )}

          {/* Action area */}
          {canAct && (
            <div className="border-t border-border pt-4 space-y-3">
              <label className="text-sm font-medium text-foreground block">
                Officer Note (required for Reject / Correction)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Add a note for the applicant…"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={!!loading}
                  onClick={() => act("Approved")}
                >
                  {loading === "Approved" ? (
                    <Clock className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}{" "}
                  Approve & Issue Certificate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                  disabled={!!loading}
                  onClick={() => act("Field Inspection", "inspectionNote")}
                >
                  {loading === "Field Inspection" ? (
                    <Clock className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}{" "}
                  Send to Field Inspection
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  disabled={!!loading || !note}
                  onClick={() => act("Correction Requested")}
                >
                  {loading === "Correction Requested" ? (
                    <Clock className="h-4 w-4 animate-spin" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}{" "}
                  Request Correction
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                  disabled={!!loading || !note}
                  onClick={() => act("Rejected")}
                >
                  {loading === "Rejected" ? (
                    <Clock className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}{" "}
                  Reject
                </Button>
              </div>
              {["Rejected", "Correction Requested"].includes("") && !note && (
                <p className="text-xs text-red-500">
                  A note is required before rejecting or requesting correction.
                </p>
              )}
            </div>
          )}

          {!canAct && !app.certificateNo && (
            <div className="text-center py-3 text-sm text-muted-foreground bg-muted/50 rounded-lg">
              {app.status === "Awaiting Payment"
                ? "Waiting for citizen to complete payment before review."
                : app.status === "Rejected"
                  ? "This application has been rejected."
                  : "No actions available for current status."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  highlight,
  mono,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="bg-muted/40 rounded-lg px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={`text-sm mt-0.5 ${highlight ? "font-bold text-primary" : mono ? "font-mono text-foreground" : "font-medium text-foreground"}`}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Main AdminStreets ────────────────────────────────────────────────────────
const AdminStreets = () => {
  const [apps, setApps] = useState<StreetApplication[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");
  const [selectedApp, setSelectedApp] = useState<StreetApplication | null>(null);

  const reload = () => setApps(getStreetApplications());

  useEffect(() => {
    reload();
  }, []);

  const statuses = [
    "All",
    "Submitted",
    "Awaiting Payment",
    "Paid",
    "Under Review",
    "Field Inspection",
    "Correction Requested",
    "Certificate Issued",
    "Rejected",
  ];

  const filtered = apps.filter((a) => {
    const matchSearch =
      !search ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.proposedName.toLowerCase().includes(search.toLowerCase()) ||
      a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      a.ward.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "All" || a.status === filterStatus;
    const matchType =
      filterType === "All" || a.applicationType === filterType.toLowerCase();
    return matchSearch && matchStatus && matchType;
  });

  // Stats
  const total = apps.length;
  const pending = apps.filter((a) =>
    ["Paid", "Under Review", "Field Inspection"].includes(a.status)
  ).length;
  const issued = apps.filter((a) => a.status === "Certificate Issued").length;
  const rejected = apps.filter((a) => a.status === "Rejected").length;
  const awaitingPayment = apps.filter(
    (a) => a.status === "Awaiting Payment"
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Street Name Applications
            </h2>
            <p className="text-muted-foreground text-sm">
              Review, inspect and approve street registration applications.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={reload}>
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Total", value: total, color: "text-foreground" },
            { label: "Pending Review", value: pending, color: "text-purple-600" },
            { label: "Awaiting Payment", value: awaitingPayment, color: "text-amber-600" },
            { label: "Certificates Issued", value: issued, color: "text-green-600" },
            { label: "Rejected", value: rejected, color: "text-red-600" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card rounded-xl p-4 shadow-card border border-border"
            >
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div
                className={`font-display text-2xl font-bold mt-1 ${s.color}`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, street, applicant, ward…"
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option>All</option>
            <option value="new">New Registration</option>
            <option value="renewal">Renewal</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {[
                    "ID",
                    "Street Name",
                    "Applicant",
                    "Ward",
                    "Type",
                    "Date",
                    "Amount",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center py-12 text-muted-foreground text-sm"
                    >
                      No applications match your search.
                    </td>
                  </tr>
                )}
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 text-xs font-mono text-primary font-bold whitespace-nowrap">
                      {a.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground whitespace-nowrap">
                      {a.proposedName}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">
                      {a.applicantName}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {a.ward}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          a.applicationType === "renewal"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {a.applicationType === "renewal" ? "Renewal" : "New"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {a.submittedDate}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground whitespace-nowrap">
                      ₦{a.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title="View details"
                          onClick={() => setSelectedApp(a)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {["Paid", "Under Review", "Field Inspection"].includes(
                          a.status
                        ) && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              title="Quick approve"
                              onClick={() => {
                                updateStreetApplicationStatus(a.id, "Approved");
                                reload();
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="View to reject with note"
                              onClick={() => setSelectedApp(a)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {a.status === "Certificate Issued" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-emerald-600"
                            title="Download certificate"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          <div className="px-4 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">
            Showing {filtered.length} of {apps.length} applications
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedApp && (
        <ApplicationModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUpdate={reload}
        />
      )}
    </AdminLayout>
  );
};

export default AdminStreets;