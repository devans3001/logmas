import DashboardLayout from "@/components/DashboardLayout";
import { Bell, Check, Clock, FileText, CreditCard, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialNotifications = [
  { id: 1, title: "Certificate Approved", message: "Your Birth Certificate application (IFO-CRT-001) has been approved. You can now download it.", time: "2 hours ago", read: false, icon: FileText, type: "success" },
  { id: 2, title: "Payment Successful", message: "Payment of ₦25,000 for Street Name Registration has been confirmed.", time: "1 day ago", read: false, icon: CreditCard, type: "success" },
  { id: 3, title: "Application Under Review", message: "Your Street Name Registration (IFO-STR-245) is now being reviewed by an officer.", time: "2 days ago", read: false, icon: Clock, type: "info" },
  { id: 4, title: "Ticket Reply", message: "Support has replied to your ticket IFO-TKT-012 regarding payment issue.", time: "3 days ago", read: true, icon: MessageSquare, type: "info" },
  { id: 5, title: "Certificate Rejected", message: "Your Death Certificate application (IFO-CRT-003) was rejected. Please check required documents.", time: "1 week ago", read: true, icon: FileText, type: "error" },
];

const typeColors: Record<string, string> = {
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  error: "bg-destructive/10 text-destructive",
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Notifications</h2>
            <p className="text-muted-foreground">{notifications.filter(n => !n.read).length} unread notifications</p>
          </div>
          <Button variant="outline" size="sm" onClick={markAllRead}><Check className="h-4 w-4" /> Mark All Read</Button>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
          {notifications.map((n) => (
            <div key={n.id} className={`p-4 flex items-start gap-4 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[n.type]}`}>
                <n.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground">{n.title}</h4>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
