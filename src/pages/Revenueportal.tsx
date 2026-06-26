import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Search,
  Filter,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Zap,
  DollarSign,
} from "lucide-react";
import {
  Revenue,
  RevenueCategory,
  getAllActiveRevenues,
  getRevenuesByCategory,
  addRevenueApplication,
} from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { getUser } from "@/lib/auth";

const CATEGORIES: { value: RevenueCategory; label: string; icon: string }[] = [
  { value: "property", label: "Property", icon: "🏠" },
  { value: "street", label: "Street Registration", icon: "🛣️" },
  { value: "business", label: "Business", icon: "🏢" },
  { value: "market", label: "Market", icon: "🛒" },
  { value: "environmental", label: "Environmental", icon: "♻️" },
  { value: "transport", label: "Transport", icon: "🚐" },
  { value: "advertisement", label: "Advertisement", icon: "📢" },
  { value: "agriculture", label: "Agriculture", icon: "🚜" },
  { value: "health", label: "Health & Food", icon: "⚕️" },
  { value: "event", label: "Events", icon: "🎉" },
  { value: "assets", label: "Assets & Rentals", icon: "🏛️" },
  { value: "penalty", label: "Fines & Penalties", icon: "⚠️" },
];

interface ApplicationForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  customFields: Record<string, string>;
  gpsLat?: string;
  gpsLng?: string;
  documents: string[];
  agreedToTerms: boolean;
}

const RevenuePortal = () => {
  const user = getUser();
  const [activeTab, setActiveTab] = useState<RevenueCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [revenues, setRevenues] = useState<Revenue[]>(getAllActiveRevenues());
  const [selectedRevenue, setSelectedRevenue] = useState<Revenue | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState<ApplicationForm>({
    fullName: user?.name || "",
    phone: "",
    email: user?.email || "",
    address: "",
    customFields: {},
    documents: [],
    agreedToTerms: false,
  });

  const filteredRevenues =
    activeTab === "all"
      ? revenues
      : getRevenuesByCategory(activeTab as RevenueCategory);

  const searchedRevenues = filteredRevenues.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.revenueCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (revenue: Revenue) => {
    setSelectedRevenue(revenue);
    setApplicationForm({
      fullName: user?.name || "",
      phone: "",
      email: user?.email || "",
      address: "",
      customFields: {},
      documents: [],
      agreedToTerms: false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmitApplication = () => {
    if (!applicationForm.fullName || !applicationForm.phone) {
      alert("Please fill in required fields");
      return;
    }

    if (!applicationForm.agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (!selectedRevenue) return;

    const app = addRevenueApplication({
      revenueId: selectedRevenue.id,
      citizenEmail: applicationForm.email,
      applicantName: applicationForm.fullName,
      phone: applicationForm.phone,
      status: selectedRevenue.requiresApproval
        ? "awaiting_approval"
        : "paid",
      amount: selectedRevenue.price,
      paid: false,
      formData: {
        address: applicationForm.address,
        ...applicationForm.customFields,
      },
      gpsLat: applicationForm.gpsLat,
      gpsLng: applicationForm.gpsLng,
      documents: applicationForm.documents,
    });

    alert(
      `Application submitted successfully! Your reference: ${app.id}\n\nNext step: Proceed to payment.`
    );
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="space-y-4">
          <h1 className="font-display text-4xl font-bold text-foreground">
            Revenue & Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse and apply for all available Local Government services
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search services by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>

        {/* Category Tabs */}
        <div className="overflow-x-auto -mx-4 px-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="w-max bg-muted/50 border border-border">
              <TabsTrigger value="all">All Services</TabsTrigger>
              {CATEGORIES.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {searchedRevenues.length} service
          {searchedRevenues.length !== 1 ? "s" : ""}
        </div>

        {/* Services Grid */}
        {searchedRevenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedRevenues.map((revenue) => (
              <div
                key={revenue.id}
                className="bg-card rounded-xl border border-border shadow-card hover:shadow-lg hover:border-primary/50 transition-all p-6 flex flex-col"
              >
                {/* Icon & Name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{revenue.icon || "📋"}</div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-foreground">
                      {revenue.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {revenue.revenueCode}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {revenue.description}
                </p>

                {/* Price */}
                <div className="bg-primary/5 rounded-lg p-3 mb-4">
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    ₦{revenue.price.toLocaleString()}
                  </p>
                  {revenue.pricingType !== "fixed" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {revenue.pricingType === "variable" && "Per unit"}
                      {revenue.pricingType === "tiered" && "Varies by category"}
                      {revenue.pricingType === "dynamic" && "Admin approval required"}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {revenue.renewalRequired && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap className="h-3.5 w-3.5" />
                      <span>Renews {revenue.renewalFrequency}</span>
                    </div>
                  )}
                  {revenue.requiresInspection && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Field inspection required</span>
                    </div>
                  )}
                  {revenue.requiresDocuments && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Documents required</span>
                    </div>
                  )}
                  {revenue.requiresApproval && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Requires approval</span>
                    </div>
                  )}
                </div>

                {/* Department */}
                <div className="mb-4 pb-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm font-medium text-foreground">
                    {revenue.department}
                  </p>
                </div>

                {/* Apply Button */}
                <Dialog open={isDialogOpen && selectedRevenue?.id === revenue.id} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => handleApply(revenue)}
                    >
                      Apply Now <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </DialogTrigger>

                  {selectedRevenue?.id === revenue.id && (
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          Apply for {selectedRevenue.name}
                        </DialogTitle>
                        <DialogDescription>
                          Complete the application form. Amount due: ₦
                          {selectedRevenue.price.toLocaleString()}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 py-4">
                        {/* Personal Info */}
                        <div className="space-y-4">
                          <h3 className="font-semibold text-foreground">
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">
                                Full Name *
                              </label>
                              <Input
                                value={applicationForm.fullName}
                                onChange={(e) =>
                                  setApplicationForm({
                                    ...applicationForm,
                                    fullName: e.target.value,
                                  })
                                }
                                className="mt-1.5"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Phone *
                              </label>
                              <Input
                                value={applicationForm.phone}
                                onChange={(e) =>
                                  setApplicationForm({
                                    ...applicationForm,
                                    phone: e.target.value,
                                  })
                                }
                                placeholder="+234..."
                                className="mt-1.5"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                              value={applicationForm.email}
                              onChange={(e) =>
                                setApplicationForm({
                                  ...applicationForm,
                                  email: e.target.value,
                                })
                              }
                              type="email"
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              Address
                            </label>
                            <Textarea
                              value={applicationForm.address}
                              onChange={(e) =>
                                setApplicationForm({
                                  ...applicationForm,
                                  address: e.target.value,
                                })
                              }
                              className="mt-1.5"
                            />
                          </div>
                        </div>

                        {/* Conditional Fields */}
                        {selectedRevenue.requiresGPS && (
                          <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">
                              Location
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Latitude
                                </label>
                                <Input
                                  value={applicationForm.gpsLat || ""}
                                  onChange={(e) =>
                                    setApplicationForm({
                                      ...applicationForm,
                                      gpsLat: e.target.value,
                                    })
                                  }
                                  placeholder="6.8103"
                                  className="mt-1.5"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Longitude
                                </label>
                                <Input
                                  value={applicationForm.gpsLng || ""}
                                  onChange={(e) =>
                                    setApplicationForm({
                                      ...applicationForm,
                                      gpsLng: e.target.value,
                                    })
                                  }
                                  placeholder="3.1970"
                                  className="mt-1.5"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Terms */}
                        <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                          <Checkbox
                            checked={applicationForm.agreedToTerms}
                            onCheckedChange={(v) =>
                              setApplicationForm({
                                ...applicationForm,
                                agreedToTerms: !!v,
                              })
                            }
                          />
                          <label className="text-xs text-muted-foreground cursor-pointer">
                            I confirm that all information provided is accurate
                            and complete. I understand that providing false
                            information may result in rejection.
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end pt-6 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant="hero" onClick={handleSubmitApplication}>
                          Submit Application
                        </Button>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground">
              No services found
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Try adjusting your search or browse other categories
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RevenuePortal;