import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const faqData = [
  { category: "Certificates", items: [
    { q: "How do I apply for a birth certificate?", a: "Log into your dashboard, click 'Apply Certificate', select 'Birth Certificate', fill in the required details, make payment, and submit. You'll receive a reference number to track your application." },
    { q: "How long does certificate processing take?", a: "Most certificates are processed within 3-5 working days after payment confirmation." },
    { q: "Can I download my certificate online?", a: "Yes, once approved, go to 'Approved Certificates' in your dashboard to download the PDF with QR verification." },
  ]},
  { category: "Payments", items: [
    { q: "What payment methods are accepted?", a: "We accept card payments (Visa, Mastercard), bank transfers, and USSD payments." },
    { q: "My payment was deducted but not reflecting", a: "Please raise a support ticket with your payment reference. Our team will resolve it within 24 hours." },
  ]},
  { category: "Street Registration", items: [
    { q: "How much does street name registration cost?", a: "New registration costs ₦25,000 and renewal costs ₦10,000." },
    { q: "What documents do I need?", a: "You need a CDA approval letter, petition signatures, and any supporting documents for the proposed street name." },
  ]},
  { category: "Tenement Rate", items: [
    { q: "How is tenement rate calculated?", a: "Rates are based on flat type: 1-bed (₦3,000), 2-bed (₦5,000), 3-bed (₦7,000), Duplex (₦15,000) per flat." },
  ]},
  { category: "Demand Notice", items: [
    { q: "What business categories are covered?", a: "Fuel stations, hotels, schools, hospitals, restaurants, supermarkets, telecom masts, warehouses, and manufacturing companies." },
  ]},
  { category: "Account", items: [
    { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page and follow the instructions sent to your email." },
    { q: "How do I contact support?", a: "Raise a ticket from your dashboard or email info@logmas.ifo.gov.ng." },
  ]},
];

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    const next = new Set(openItems);
    next.has(key) ? next.delete(key) : next.add(key);
    setOpenItems(next);
  };

  const filtered = faqData.map(cat => ({
    ...cat,
    items: cat.items.filter(i => !search || i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase()))
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">FAQ & Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions about LOGMAS services.</p>
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="pl-9" />
          </div>
        </div>
        {filtered.map((cat) => (
          <div key={cat.category} className="mb-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-3">{cat.category}</h2>
            <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
              {cat.items.map((item) => {
                const key = `${cat.category}-${item.q}`;
                const isOpen = openItems.has(key);
                return (
                  <div key={key} className="cursor-pointer" onClick={() => toggle(key)}>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{item.q}</span>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    {isOpen && <div className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <PublicFooter />
    </div>
  );
};

export default FAQ;
