import AdminLayout from "@/components/AdminLayout";
import { BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const monthlyRevenue = [
  { month: "Sep", certificates: 800000, street: 400000, tenement: 600000, demand: 900000, shops: 300000 },
  { month: "Oct", certificates: 1000000, street: 500000, tenement: 700000, demand: 1100000, shops: 400000 },
  { month: "Nov", certificates: 900000, street: 450000, tenement: 650000, demand: 1000000, shops: 350000 },
  { month: "Dec", certificates: 1200000, street: 600000, tenement: 800000, demand: 1300000, shops: 500000 },
  { month: "Jan", certificates: 1100000, street: 550000, tenement: 750000, demand: 1200000, shops: 450000 },
  { month: "Feb", certificates: 1400000, street: 700000, tenement: 900000, demand: 1500000, shops: 600000 },
];

const applicationTrend = [
  { month: "Sep", apps: 180 }, { month: "Oct", apps: 220 }, { month: "Nov", apps: 200 },
  { month: "Dec", apps: 280 }, { month: "Jan", apps: 260 }, { month: "Feb", apps: 320 },
];

const revenueByService = [
  { name: "Demand Notice", value: 38 }, { name: "Certificates", value: 25 },
  { name: "Tenement", value: 20 }, { name: "Street Reg", value: 10 }, { name: "Shop Levy", value: 7 },
];

const PIE_COLORS = ["hsl(150,82%,23%)", "hsl(43,66%,52%)", "hsl(210,80%,52%)", "hsl(145,63%,42%)", "hsl(0,0%,60%)"];

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Revenue and application analytics for Ifo LGA.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Revenue by Service (Monthly)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(0,0%,45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0,0%,45%)" tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => `₦${v.toLocaleString()}`} />
                <Bar dataKey="demand" stackId="a" fill="hsl(150,82%,23%)" />
                <Bar dataKey="certificates" stackId="a" fill="hsl(43,66%,52%)" />
                <Bar dataKey="tenement" stackId="a" fill="hsl(210,80%,52%)" />
                <Bar dataKey="street" stackId="a" fill="hsl(145,63%,42%)" />
                <Bar dataKey="shops" stackId="a" fill="hsl(0,0%,75%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Application Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={applicationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(0,0%,45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0,0%,45%)" />
                <Tooltip />
                <Line type="monotone" dataKey="apps" stroke="hsl(150,82%,23%)" strokeWidth={2} dot={{ fill: "hsl(150,82%,23%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Revenue Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={revenueByService} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                  {revenueByService.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {revenueByService.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Summary Statistics</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Total Revenue (Year)", value: "₦18.5M", change: "+15%" },
                { label: "Total Applications", value: "2,456", change: "+12%" },
                { label: "Avg. Processing Time", value: "3.2 days", change: "-8%" },
                { label: "Customer Satisfaction", value: "94%", change: "+2%" },
                { label: "Certificates Issued", value: "1,245", change: "+10%" },
                { label: "Failed Payments", value: "23", change: "-5%" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-display text-xl font-bold text-foreground">{s.value}</span>
                    <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-success" : "text-destructive"}`}>{s.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
