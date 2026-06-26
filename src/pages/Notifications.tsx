import DashboardLayout from "@/components/DashboardLayout";
import { Bell, Check, FileText, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getNotifications, markAllNotificationsRead, Notification } from "@/lib/mockData";
import { getUser } from "@/lib/auth";

const typeColors: Record<string, string> = {
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  error: "bg-destructive/10 text-destructive",
};

const typeIcon: Record<string, any> = {
  success: FileText,
  info: Clock,
  error: FileText,
};

const Notifications = () => {
  const user = getUser();
  const [notifs, setNotifs] = useState<Notification[]>(() =>
    user ? getNotifications(user.email) : []
  );

  const markAll = () => {
    if (!user) return;
    markAllNotificationsRead(user.email);
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const unread = notifs.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Notifications</h2>
            <p className="text-muted-foreground">{unread} unread notification{unread !== 1 ? "s" : ""}</p>
          </div>
          {unread > 0 && (
            <Button variant="outline" size="sm" onClick={markAll}>
              <Check className="h-4 w-4 mr-1" /> Mark All Read
            </Button>
          )}
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
          {notifs.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <Bell className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No notifications yet</p>
              <p className="text-sm">You'll be notified when your application status changes.</p>
            </div>
          ) : notifs.map((n) => {
            const Icon = typeIcon[n.type] || FileText;
            return (
              <div key={n.id} className={`p-4 flex items-start gap-4 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[n.type]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-foreground">{n.title}</h4>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;