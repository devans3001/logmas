import DashboardLayout from "@/components/DashboardLayout";
import { User, Mail, Phone, MapPin, Save, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    fullName: "John Adebayo Ogundimu",
    email: "john.ogundimu@email.com",
    phone: "+234 801 234 5678",
    address: "12 Balogun Street, Ifo, Ogun State",
    ward: "Ward 5",
    nin: "12345678901",
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Profile Settings</h2>
          <p className="text-muted-foreground">Manage your personal information.</p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
              JO
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">{profile.fullName}</h3>
              <p className="text-sm text-muted-foreground">Resident User · Ifo LGA</p>
              <Button variant="outline" size="sm" className="mt-2"><Camera className="h-4 w-4" /> Change Photo</Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
              <Input value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Address</label>
              <Input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Ward</label>
                <Input value={profile.ward} onChange={(e) => setProfile({ ...profile, ward: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">NIN</label>
                <Input value={profile.nin} onChange={(e) => setProfile({ ...profile, nin: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="hero"><Save className="h-4 w-4" /> Save Changes</Button>
            <Button variant="outline">Change Password</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings;
