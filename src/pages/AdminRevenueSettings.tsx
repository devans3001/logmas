import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ChevronDown,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import {
  Revenue,
  RevenueCategory,
  RevenuePricingType,
  RenewalFrequency,
  RevenueStatus,
  getRevenues,
  saveRevenues,
  addRevenue,
  updateRevenue,
  deleteRevenue,
  getDepartments,
} from "@/lib/mockData";

const CATEGORIES: { value: RevenueCategory; label: string }[] = [
  { value: "property", label: "Property" },
  { value: "street", label: "Street Registration" },
  { value: "business", label: "Business" },
  { value: "market", label: "Market" },
  { value: "environmental", label: "Environmental" },
  { value: "transport", label: "Transport" },
  { value: "advertisement", label: "Advertisement" },
  { value: "agriculture", label: "Agriculture & Abattoir" },
  { value: "health", label: "Health & Food Permits" },
  { value: "event", label: "Events & Entertainment" },
  { value: "assets", label: "Government Assets" },
  { value: "penalty", label: "Fines & Penalties" },
  { value: "other", label: "Other" },
];

const PRICING_TYPES: { value: RevenuePricingType; label: string }[] = [
  { value: "fixed", label: "Fixed Price" },
  { value: "variable", label: "Variable (Per Unit)" },
  { value: "tiered", label: "Tiered (Based on Category)" },
  { value: "dynamic", label: "Dynamic (Admin Approved)" },
];

const RENEWAL_FREQUENCIES: { value: RenewalFrequency; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "semi-annual", label: "Semi-Annual" },
  { value: "annual", label: "Annual" },
  { value: "biennial", label: "Biennial (2 Years)" },
];

interface RevenueFormData {
  name: string;
  category: RevenueCategory;
  revenueCode: string;
  description: string;
  department: string;
  price: number;
  pricingType: RevenuePricingType;
  priceNote: string;
  renewalRequired: boolean;
  renewalFrequency?: RenewalFrequency;
  renewalPrice?: number;
  renewalDaysBeforeExpiry?: number;
  requiresApproval: boolean;
  requiresInspection: boolean;
  requiresDocuments: boolean;
  requiresGPS: boolean;
  requiresCitizenProfile: boolean;
  requiresBusinessProfile: boolean;
  maxInstallments?: number;
  revenueHead: string;
  status: RevenueStatus;
  icon?: string;
  notes?: string;
}

const AdminRevenueSettings = () => {
  const [revenues, setRevenues] = useState<Revenue[]>(getRevenues());
  const [departments] = useState(getDepartments());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const initialFormData: RevenueFormData = {
    name: "",
    category: "other",
    revenueCode: "",
    description: "",
    department: "",
    price: 0,
    pricingType: "fixed",
    priceNote: "",
    renewalRequired: false,
    requiresApproval: false,
    requiresInspection: false,
    requiresDocuments: false,
    requiresGPS: false,
    requiresCitizenProfile: false,
    requiresBusinessProfile: false,
    revenueHead: "",
    status: "draft",
    icon: "📋",
    notes: "",
  };

  const [form, setForm] = useState<RevenueFormData>(initialFormData);

  const handleNew = () => {
    setForm(initialFormData);
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (revenue: Revenue) => {
    setForm({
      name: revenue.name,
      category: revenue.category,
      revenueCode: revenue.revenueCode,
      description: revenue.description,
      department: revenue.department,
      price: revenue.price,
      pricingType: revenue.pricingType,
      priceNote: revenue.priceNote || "",
      renewalRequired: revenue.renewalRequired,
      renewalFrequency: revenue.renewalFrequency,
      renewalPrice: revenue.renewalPrice,
      renewalDaysBeforeExpiry: revenue.renewalDaysBeforeExpiry,
      requiresApproval: revenue.requiresApproval,
      requiresInspection: revenue.requiresInspection,
      requiresDocuments: revenue.requiresDocuments,
      requiresGPS: revenue.requiresGPS,
      requiresCitizenProfile: revenue.requiresCitizenProfile,
      requiresBusinessProfile: revenue.requiresBusinessProfile,
      maxInstallments: revenue.maxInstallments,
      revenueHead: revenue.revenueHead,
      status: revenue.status,
      icon: revenue.icon,
      notes: revenue.notes,
    });
    setEditingId(revenue.id);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.revenueCode || !form.department) {
      alert("Please fill in required fields: Name, Revenue Code, Department");
      return;
    }

    if (editingId) {
      const updated = updateRevenue(editingId, form as Partial<Revenue>);
      if (updated) {
        setRevenues(getRevenues());
      }
    } else {
      const newRev = addRevenue({
        ...form,
        createdBy: "admin@logmas.ng",
      } as Omit<Revenue, "id" | "createdAt" | "updatedAt">);
      setRevenues([newRev, ...revenues]);
    }
    setIsDialogOpen(false);
    setForm(initialFormData);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this revenue?")) {
      deleteRevenue(id);
      setRevenues(getRevenues());
    }
  };

  const activeCount = revenues.filter((r) => r.status === "active").length;
  const draftCount = revenues.filter((r) => r.status === "draft").length;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Revenue & Services Configuration
            </h2>
            <p className="text-muted-foreground mt-1">
              Create and manage all revenue streams and services without developer intervention
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg" onClick={handleNew}>
                <Plus className="h-5 w-5 mr-2" />
                New Revenue Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Revenue Service" : "Create New Revenue Service"}
                </DialogTitle>
                <DialogDescription>
                  Configure all aspects of the revenue stream
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 ml-8">
                    <div>
                      <Label>Revenue Name *</Label>
                      <Input
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="e.g., Street Registration"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Revenue Code *</Label>
                      <Input
                        value={form.revenueCode}
                        onChange={(e) =>
                          setForm({ ...form, revenueCode: e.target.value })
                        }
                        placeholder="e.g., STR-2026-001"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) =>
                          setForm({ ...form, category: v as RevenueCategory })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Department *</Label>
                      <Select
                        value={form.department}
                        onValueChange={(v) =>
                          setForm({ ...form, department: v })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                        placeholder="Describe this revenue stream"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    Pricing & Payment
                  </h3>
                  <div className="grid grid-cols-2 gap-4 ml-8">
                    <div>
                      <Label>Price (₦) *</Label>
                      <Input
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                          setForm({ ...form, price: Number(e.target.value) })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Pricing Type</Label>
                      <Select
                        value={form.pricingType}
                        onValueChange={(v) =>
                          setForm({
                            ...form,
                            pricingType: v as RevenuePricingType,
                          })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PRICING_TYPES.map((pt) => (
                            <SelectItem key={pt.value} value={pt.value}>
                              {pt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>Price Note (e.g., "per square meter")</Label>
                      <Input
                        value={form.priceNote}
                        onChange={(e) =>
                          setForm({ ...form, priceNote: e.target.value })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Max Installments</Label>
                      <Input
                        type="number"
                        value={form.maxInstallments || ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            maxInstallments: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Revenue Head (GL Account)</Label>
                      <Input
                        value={form.revenueHead}
                        onChange={(e) =>
                          setForm({ ...form, revenueHead: e.target.value })
                        }
                        placeholder="e.g., 1010-01-01"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Renewals */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    Renewal Settings
                  </h3>
                  <div className="ml-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Checkbox
                        checked={form.renewalRequired}
                        onCheckedChange={(v) =>
                          setForm({
                            ...form,
                            renewalRequired: !!v,
                          })
                        }
                      />
                      <Label className="cursor-pointer">
                        This service requires renewal
                      </Label>
                    </div>
                    {form.renewalRequired && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Renewal Frequency</Label>
                          <Select
                            value={form.renewalFrequency || "annual"}
                            onValueChange={(v) =>
                              setForm({
                                ...form,
                                renewalFrequency: v as RenewalFrequency,
                              })
                            }
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {RENEWAL_FREQUENCIES.map((rf) => (
                                <SelectItem key={rf.value} value={rf.value}>
                                  {rf.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Renewal Price (₦)</Label>
                          <Input
                            type="number"
                            value={form.renewalPrice || ""}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                renewalPrice: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              })
                            }
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label>Notify Before Expiry (Days)</Label>
                          <Input
                            type="number"
                            value={form.renewalDaysBeforeExpiry || ""}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                renewalDaysBeforeExpiry: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              })
                            }
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Workflow */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    Workflow & Requirements
                  </h3>
                  <div className="ml-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={form.requiresApproval}
                        onCheckedChange={(v) =>
                          setForm({
                            ...form,
                            requiresApproval: !!v,
                          })
                        }
                      />
                      <Label className="cursor-pointer">
                        Requires Admin Approval
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={form.requiresInspection}
                        onCheckedChange={(v) =>
                          setForm({
                            ...form,
                            requiresInspection: !!v,
                          })
                        }
                      />
                      <Label className="cursor-pointer">
                        Requires Field Inspection
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={form.requiresDocuments}
                        onCheckedChange={(v) =>
                          setForm({
                            ...form,
                            requiresDocuments: !!v,
                          })
                        }
                      />
                      <Label className="cursor-pointer">
                        Requires Supporting Documents
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={form.requiresGPS}
                        onCheckedChange={(v) =>
                          setForm({
                            ...form,
                            requiresGPS: !!v,
                          })
                        }
                      />
                      <Label className="cursor-pointer">
                        Requires GPS Coordinates
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={form.requiresCitizenProfile}
                        onCheckedChange={(v) =>
                          setForm({
                            ...form,
                            requiresCitizenProfile: !!v,
                          })
                        }
                      />
                      <Label className="cursor-pointer">
                        Requires Citizen KYC Profile
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={form.requiresBusinessProfile}
                        onCheckedChange={(v) =>
                          setForm({
                            ...form,
                            requiresBusinessProfile: !!v,
                          })
                        }
                      />
                      <Label className="cursor-pointer">
                        Requires Business Registration
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-foreground">Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Publication Status</Label>
                      <Select
                        value={form.status}
                        onValueChange={(v) =>
                          setForm({ ...form, status: v as RevenueStatus })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft (Not Published)</SelectItem>
                          <SelectItem value="active">Active (Published)</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={form.icon || ""}
                        onChange={(e) =>
                          setForm({ ...form, icon: e.target.value })
                        }
                        placeholder="e.g., 🏠"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Notes (Admin Use)</Label>
                    <Textarea
                      value={form.notes || ""}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      placeholder="Internal notes about this revenue stream"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-6 border-t">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="hero" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Update" : "Create"} Service
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Total Services</p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {revenues.length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Active (Published)</p>
            <p className="text-3xl font-bold text-success mt-1">{activeCount}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Draft</p>
            <p className="text-3xl font-bold text-warning mt-1">{draftCount}</p>
          </div>
        </div>

        {/* Revenues List */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Revenue Service
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Department
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {revenues.map((revenue) => (
                  <tr
                    key={revenue.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {revenue.icon} {revenue.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {revenue.category}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {revenue.revenueCode}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {revenue.department}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-foreground">
                      ₦{revenue.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          revenue.status === "active"
                            ? "bg-success/10 text-success"
                            : revenue.status === "draft"
                            ? "bg-warning/10 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {revenue.status.charAt(0).toUpperCase() +
                          revenue.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(revenue)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4 text-primary" />
                        </button>
                        <button
                          onClick={() => handleDelete(revenue.id)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRevenueSettings;