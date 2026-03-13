import DashboardLayout from "@/components/DashboardLayout";
import { MessageSquare, Send, Paperclip, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const categories = ["Certificate Issue", "Payment Issue", "Shop Levy Inquiry", "Demand Notice Inquiry", "Street Registration", "Tenement Rate", "General Question"];

const existingTickets = [
  { id: "IFO-TKT-012", subject: "Payment not reflecting", category: "Payment Issue", status: "In Progress", date: "Mar 8, 2026", messages: [
    { from: "user", text: "I made a payment of ₦25,000 for street registration but it hasn't reflected.", time: "Mar 8, 10:30 AM" },
    { from: "admin", text: "Thank you for reaching out. We're investigating this. Please share your payment reference.", time: "Mar 8, 2:15 PM" },
    { from: "user", text: "The reference is PAY-REF-98765. Bank is GTBank.", time: "Mar 8, 3:00 PM" },
  ]},
  { id: "IFO-TKT-008", subject: "Certificate download issue", category: "Certificate Issue", status: "Resolved", date: "Feb 25, 2026", messages: [
    { from: "user", text: "Unable to download my birth certificate.", time: "Feb 25, 9:00 AM" },
    { from: "admin", text: "This has been resolved. Please try downloading again.", time: "Feb 25, 11:00 AM" },
  ]},
];

const statusColors: Record<string, string> = {
  Open: "bg-info/15 text-info",
  "In Progress": "bg-accent/15 text-accent",
  Resolved: "bg-success/15 text-success",
  Closed: "bg-muted text-muted-foreground",
};

const RaiseTicket = () => {
  const [view, setView] = useState<"list" | "new" | "conversation">("list");
  const [selectedTicket, setSelectedTicket] = useState<typeof existingTickets[0] | null>(null);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  if (view === "new") {
    return (
      <DashboardLayout>
        <div className="space-y-6 max-w-2xl">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Raise a Ticket</h2>
            <p className="text-muted-foreground">Submit a support request and we'll get back to you.</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief description of your issue" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Describe your issue in detail..." className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Attachment (optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                <Paperclip className="h-5 w-5 mx-auto mb-1" />
                Click to upload file
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="hero" onClick={() => setView("list")}><Send className="h-4 w-4" /> Submit Ticket</Button>
              <Button variant="outline" onClick={() => setView("list")}>Cancel</Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (view === "conversation" && selectedTicket) {
    return (
      <DashboardLayout>
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{selectedTicket.subject}</h2>
              <p className="text-sm text-muted-foreground">{selectedTicket.id} · {selectedTicket.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[selectedTicket.status]}`}>{selectedTicket.status}</span>
              <Button variant="outline" size="sm" onClick={() => setView("list")}>Back</Button>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
            {selectedTicket.messages.map((msg, i) => (
              <div key={i} className={`p-4 ${msg.from === "admin" ? "bg-primary/5" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${msg.from === "admin" ? "text-primary" : "text-foreground"}`}>
                    {msg.from === "admin" ? "Support Officer" : "You"}
                  </span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-foreground">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your reply..." className="flex-1" />
            <Button variant="hero"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Support Tickets</h2>
            <p className="text-muted-foreground">View or raise support tickets.</p>
          </div>
          <Button variant="hero" onClick={() => setView("new")}><MessageSquare className="h-4 w-4" /> New Ticket</Button>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
          {existingTickets.map((ticket) => (
            <div key={ticket.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => { setSelectedTicket(ticket); setView("conversation"); }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{ticket.subject}</h4>
                  <p className="text-xs text-muted-foreground">{ticket.id} · {ticket.category} · <Clock className="h-3 w-3 inline" /> {ticket.date}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[ticket.status]}`}>{ticket.status}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RaiseTicket;
