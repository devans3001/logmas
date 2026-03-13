import AdminLayout from "@/components/AdminLayout";
import { MessageSquare, Clock, Eye, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const tickets = [
  { id: "IFO-TKT-012", subject: "Payment not reflecting", user: "John Adebayo", category: "Payment Issue", status: "In Progress", date: "Mar 8, 2026", messages: [
    { from: "user", text: "I made a payment of ₦25,000 for street registration but it hasn't reflected.", time: "Mar 8, 10:30 AM" },
    { from: "admin", text: "We're investigating. Please share your payment reference.", time: "Mar 8, 2:15 PM" },
  ]},
  { id: "IFO-TKT-011", subject: "Cannot download certificate", user: "Folake Ojo", category: "Certificate Issue", status: "Open", date: "Mar 7, 2026", messages: [
    { from: "user", text: "My birth certificate download button is not working.", time: "Mar 7, 3:00 PM" },
  ]},
  { id: "IFO-TKT-010", subject: "Wrong amount on demand notice", user: "Chief Adegoke", category: "Demand Notice Inquiry", status: "Open", date: "Mar 6, 2026", messages: [
    { from: "user", text: "The demand notice shows ₦200,000 but my category should be ₦150,000.", time: "Mar 6, 9:00 AM" },
  ]},
  { id: "IFO-TKT-008", subject: "Shop levy inquiry", user: "Mama Nkechi", category: "Shop Levy Inquiry", status: "Resolved", date: "Feb 25, 2026", messages: [] },
  { id: "IFO-TKT-005", subject: "Account login issue", user: "Ibrahim Musa", category: "General Question", status: "Closed", date: "Feb 15, 2026", messages: [] },
];

const statusColors: Record<string, string> = {
  Open: "bg-info/15 text-info", "In Progress": "bg-accent/15 text-accent",
  Resolved: "bg-success/15 text-success", Closed: "bg-muted text-muted-foreground",
};

const AdminTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);
  const [reply, setReply] = useState("");

  if (selectedTicket) {
    return (
      <AdminLayout>
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{selectedTicket.subject}</h2>
              <p className="text-sm text-muted-foreground">{selectedTicket.id} · {selectedTicket.user} · {selectedTicket.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[selectedTicket.status]}`}>{selectedTicket.status}</span>
              <Button variant="outline" size="sm" onClick={() => setSelectedTicket(null)}>Back</Button>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
            {selectedTicket.messages.map((msg, i) => (
              <div key={i} className={`p-4 ${msg.from === "admin" ? "bg-primary/5" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${msg.from === "admin" ? "text-primary" : "text-foreground"}`}>{msg.from === "admin" ? "Admin" : selectedTicket.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-foreground">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type admin reply..." className="flex-1" />
            <Button variant="hero"><Send className="h-4 w-4" /> Reply</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Mark as Resolved</Button>
            <Button variant="outline" size="sm">Close Ticket</Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Support Tickets</h2>
          <p className="text-muted-foreground">Manage user support tickets.</p>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Total</div><div className="font-display text-2xl font-bold text-foreground mt-1">156</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Open</div><div className="font-display text-2xl font-bold text-info mt-1">12</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">In Progress</div><div className="font-display text-2xl font-bold text-accent mt-1">5</div></div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border"><div className="text-sm text-muted-foreground">Resolved</div><div className="font-display text-2xl font-bold text-success mt-1">139</div></div>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
          {tickets.map((t) => (
            <div key={t.id} className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => setSelectedTicket(t)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center"><MessageSquare className="h-5 w-5" /></div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{t.subject}</h4>
                  <p className="text-xs text-muted-foreground">{t.id} · {t.user} · {t.category} · <Clock className="h-3 w-3 inline" /> {t.date}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[t.status]}`}>{t.status}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTickets;
