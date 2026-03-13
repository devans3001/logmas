import AdminLayout from "@/components/AdminLayout";
import { Settings, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminSettings = () => {
  const [fees, setFees] = useState({
    streetRegistration: "25000", streetRenewal: "10000",
    birthCert: "5000", marriageCert: "5000", deathCert: "3000", originCert: "5000",
    tenement1bed: "3000", tenement2bed: "5000", tenement3bed: "7000", tenementDuplex: "15000",
  });

  const [categories, setCategories] = useState([
    { name: "Fuel Stations", fee: "150000" }, { name: "Block Industry", fee: "80000" },
    { name: "Hotels", fee: "100000" }, { name: "Private Schools", fee: "120000" },
    { name: "Hospitals", fee: "100000" }, { name: "Restaurants", fee: "50000" },
    { name: "Supermarkets", fee: "40000" }, { name: "Telecommunication Mast", fee: "200000" },
    { name: "Warehouses", fee: "60000" }, { name: "Manufacturing Companies", fee: "180000" },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">System Settings</h2>
          <p className="text-muted-foreground">Configure fees, rates, and system parameters.</p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Certificate Fees</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1 block">Birth Certificate (₦)</label><Input value={fees.birthCert} onChange={(e) => setFees({...fees, birthCert: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Marriage Certificate (₦)</label><Input value={fees.marriageCert} onChange={(e) => setFees({...fees, marriageCert: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Death Certificate (₦)</label><Input value={fees.deathCert} onChange={(e) => setFees({...fees, deathCert: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">State of Origin (₦)</label><Input value={fees.originCert} onChange={(e) => setFees({...fees, originCert: e.target.value})} /></div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Street Registration Fees</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1 block">New Registration (₦)</label><Input value={fees.streetRegistration} onChange={(e) => setFees({...fees, streetRegistration: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Renewal (₦)</label><Input value={fees.streetRenewal} onChange={(e) => setFees({...fees, streetRenewal: e.target.value})} /></div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Tenement Rates</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1 block">1 Bedroom Flat (₦)</label><Input value={fees.tenement1bed} onChange={(e) => setFees({...fees, tenement1bed: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">2 Bedroom Flat (₦)</label><Input value={fees.tenement2bed} onChange={(e) => setFees({...fees, tenement2bed: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">3 Bedroom Flat (₦)</label><Input value={fees.tenement3bed} onChange={(e) => setFees({...fees, tenement3bed: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-foreground mb-1 block">Duplex (₦)</label><Input value={fees.tenementDuplex} onChange={(e) => setFees({...fees, tenementDuplex: e.target.value})} /></div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Business Demand Notice Fees</h3>
          <div className="space-y-3">
            {categories.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground w-48">{cat.name}</span>
                <Input value={cat.fee} onChange={(e) => {
                  const updated = [...categories];
                  updated[i] = { ...cat, fee: e.target.value };
                  setCategories(updated);
                }} className="max-w-32" />
                <span className="text-xs text-muted-foreground">/year</span>
              </div>
            ))}
          </div>
        </div>

        <Button variant="hero" size="lg"><Save className="h-5 w-5" /> Save All Settings</Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
