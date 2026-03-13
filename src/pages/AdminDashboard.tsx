import AdminLayout from "@/components/AdminLayout";
import { FileText, Store, Building2, CreditCard, ArrowUpRight, Clock, Map, Home, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { icon: CreditCard, label: "Total Revenue", value: "₦18.5M", change: "+15%", color: "text-primary", bg: "bg-primary/10" },
  { icon: FileText, label: "Applications", value: "2,456", change: "+12%", color: "text-info", bg: "bg-info/10" },
  { icon: Map, label: "Street Registrations", value: "523", change: "+8%", color: "text-accent", bg: "bg-accent/10" },
  { icon: Home, label: "Tenement Payments", value: "1,245", change: "+6%", color: "text-success", bg: "bg-success/10" },
  { icon: Store, label: "Registered Shops", value: "2,156", change: "+5%", color: "text-primary", bg: "bg-primary/10" },
  { icon: Building2, label: "Businesses", value: "842", change: "+3%", color: "text-info", bg: "bg-info/10" },
];

const revenueData = [
  { month: "Sep", revenue: 2400000 }, { month: "Oct", revenue: 3200000 }, { month: "Nov", revenue: 2800000 },
  { month: "Dec", revenue: 4100000 }, { month: "Jan", revenue: 3600000 }, { month: "Feb", revenue: 4800000 },
];

const certData = [
  { name: "Birth", value: 35 }, { name: "Marriage", value: 20 }, { name: "Street", value: 25 }, { name: "Tenement", value: 20 },
];

const PIE_COLORS = ["hsl(150,82%,23%)", "hsl(43,66%,52%)", "hsl(210,80%,52%)", "hsl(145,63%,42%)"];

const recentActivity = [
  { action: "Street registration submitted", user: "Adeola Bakare", time: "5 min ago", type: "application" },
  { action: "Tenement rate payment", user: "Tunde Ogundimu", time: "12 min ago", type: "payment" },
  { action: "Certificate approved", user: "Folake Adeyemi", time: "1 hour ago", type: "certificate" },
  { action: "Demand notice paid", user: "Ibrahim Salisu", time: "2 hours ago", type: "payment" },
  { action: "New business registered", user: "Grace Obi", time: "3 hours ago", type: "business" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground">Ifo Local Government — System Overview</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-success flex items-center gap-0.5">
                  <ArrowUpRight className="h-3 w-3" /> {stat.change}
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(0,0%,45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0,0%,45%)" tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="hsl(150,82%,23%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Service Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={certData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                  {certData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {certData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {item.type === "payment" ? <CreditCard className="h-4 w-4" /> : item.type === "business" ? <Building2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.action}</div>
                    <div className="text-xs text-muted-foreground">{item.user}</div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
