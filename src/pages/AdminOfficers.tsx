import AdminLayout from "@/components/AdminLayout";
import { Users, UserPlus, Shield, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const officers = [
  { id: 1, name: "Sgt. Afolabi Ogun", role: "Verification Officer", email: "afolabi@ifo.gov.ng", status: "Active", assigned: 12 },
  { id: 2, name: "Mrs. Adebisi Kola", role: "Revenue Officer", email: "adebisi@ifo.gov.ng", status: "Active", assigned: 8 },
  { id: 3, name: "Mr. Chukwu Emeka", role: "Support Officer", email: "chukwu@ifo.gov.ng", status: "Active", assigned: 15 },
  { id: 4, name: "Miss Fatima Bello", role: "Verification Officer", email: "fatima@ifo.gov.ng", status: "Inactive", assigned: 0 },
];

const roleColors: Record<string, string> = {
  "Verification Officer": "bg-primary/15 text-primary",
  "Revenue Officer": "bg-accent/15 text-accent",
  "Support Officer": "bg-info/15 text-info",
};

const AdminOfficers = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Officer Management</h2>
            <p className="text-muted-foreground">Create and manage system officers.</p>
          </div>
          <Button variant="hero" onClick={() => setShowAdd(!showAdd)}><UserPlus className="h-4 w-4" /> Add Officer</Button>
        </div>

        {showAdd && (
          <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
            <h3 className="font-display font-semibold text-foreground">Add New Officer</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-foreground mb-1 block">Full Name</label><Input placeholder="Officer name" /></div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Email</label><Input placeholder="email@ifo.gov.ng" type="email" /></div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Role</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Select role</option>
                  <option value="verification">Verification Officer</option>
                  <option value="revenue">Revenue Officer</option>
                  <option value="support">Support Officer</option>
                </select>
              </div>
              <div><label className="text-sm font-medium text-foreground mb-1 block">Phone</label><Input placeholder="+234..." /></div>
            </div>
            <div className="flex gap-2">
              <Button variant="hero">Create Officer</Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {officers.map((o) => (
            <div key={o.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {o.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{o.name}</h4>
                  <p className="text-xs text-muted-foreground">{o.email}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleColors[o.role] || "bg-muted text-muted-foreground"}`}>{o.role}</span>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{o.assigned} assigned tasks</span>
                <span className={o.status === "Active" ? "text-success" : "text-muted-foreground"}>{o.status}</span>
              </div>
              <div className="flex gap-1 mt-3">
                <Button variant="ghost" size="sm" className="flex-1"><Eye className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOfficers;
