import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  getRevenues,
  getRevenueApplications,
  getDepartments,
} from "@/lib/mockData";
import { useMemo } from "react";

const AdminRevenueDashboard = () => {
  const revenues = getRevenues();
  const applications = getRevenueApplications();
  const departments = getDepartments();

  // Calculate KPIs
  const stats = useMemo(() => {
    const activeCount = revenues.filter((r) => r.status === "active").length;
    const totalApplications = applications.length;
    const paidApplications = applications.filter((a) => a.paid).length;
    const totalCollected = applications
      .filter((a) => a.paid)
      .reduce((sum, a) => sum + a.amount, 0);

    const statusBreakdown = {
      submitted: applications.filter((a) => a.status === "submitted").length,
      awaiting_payment: applications.filter(
        (a) => a.status === "awaiting_payment"
      ).length,
      paid: applications.filter((a) => a.status === "paid").length,
      awaiting_approval: applications.filter(
        (a) => a.status === "awaiting_approval"
      ).length,
      approved: applications.filter((a) => a.status === "approved").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
    };

    // Top services by applications
    const serviceAppCount: Record<string, number> = {};
    applications.forEach((app) => {
      const revenue = revenues.find((r) => r.id === app.revenueId);
      if (revenue) {
        serviceAppCount[revenue.name] =
          (serviceAppCount[revenue.name] || 0) + 1;
      }
    });

    const topServices = Object.entries(serviceAppCount)
      .map(([name, count]) => ({ name, applications: count }))
      .sort((a, b) => b.applications - a.applications)
      .slice(0, 5);

    // Department-wise revenue
    const deptRevenue: Record<string, number> = {};
    applications.forEach((app) => {
      const revenue = revenues.find((r) => r.id === app.revenueId);
      if (revenue && app.paid) {
        deptRevenue[revenue.department] =
          (deptRevenue[revenue.department] || 0) + app.amount;
      }
    });

    const deptData = Object.entries(deptRevenue)
      .map(([dept, amount]) => ({
        name: dept.split(" ").slice(0, 3).join(" "), // Truncate long names
        revenue: amount,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Collection trend (mock data - last 6 months)
    const collectionTrend = [
      { month: "Jan", collected: 250000 },
      { month: "Feb", collected: 320000 },
      { month: "Mar", collected: 480000 },
      { month: "Apr", collected: 410000 },
      { month: "May", collected: 560000 },
      { month: "Jun", collected: totalCollected },
    ];

    return {
      activeCount,
      totalApplications,
      paidApplications,
      totalCollected,
      collectionRate: totalApplications
        ? ((paidApplications / totalApplications) * 100).toFixed(1)
        : 0,
      statusBreakdown,
      topServices,
      deptData,
      collectionTrend,
    };
  }, [revenues, applications]);

  // Colors
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Revenue Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time analytics and performance metrics
            </p>
          </div>
          <Button variant="outline" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {stats.activeCount}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  of {revenues.length} total
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  ₦{(stats.totalCollected / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-success mt-2">+12% from last month</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success/10 text-success flex items-center justify-center">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {stats.totalApplications}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.paidApplications} paid
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {stats.collectionRate}%
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.paidApplications} of {stats.totalApplications}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Collection Trend */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              Collection Trend (6 Months)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.collectionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                  formatter={(value) => `₦${(value as number).toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="collected"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Application Status Breakdown */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              Application Status
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Paid",
                      value: stats.statusBreakdown.paid,
                    },
                    {
                      name: "Awaiting Payment",
                      value: stats.statusBreakdown.awaiting_payment,
                    },
                    {
                      name: "Submitted",
                      value: stats.statusBreakdown.submitted,
                    },
                    {
                      name: "Awaiting Approval",
                      value: stats.statusBreakdown.awaiting_approval,
                    },
                    {
                      name: "Approved",
                      value: stats.statusBreakdown.approved,
                    },
                    {
                      name: "Rejected",
                      value: stats.statusBreakdown.rejected,
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) =>
                    entry.value > 0 ? `${entry.name} (${entry.value})` : ""
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value} applications`}
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Services */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              Top Services by Applications
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topServices}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-muted-foreground)"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                  formatter={(value) => `${value} applications`}
                />
                <Bar dataKey="applications" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department-wise Revenue */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              Revenue by Department
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stats.deptData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 200 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  type="number"
                  stroke="var(--color-muted-foreground)"
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="var(--color-muted-foreground)"
                  width={190}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                  formatter={(value) => `₦${(value as number).toLocaleString()}`}
                />
                <Bar dataKey="revenue" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h2 className="font-display font-bold text-lg text-foreground mb-6">
            Status Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {stats.statusBreakdown.submitted}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Submitted</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">
                {stats.statusBreakdown.awaiting_payment}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting Payment
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {stats.statusBreakdown.paid}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Paid</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {stats.statusBreakdown.awaiting_approval}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting Approval
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">
                {stats.statusBreakdown.approved}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Approved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                {stats.statusBreakdown.rejected}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Rejected</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report (PDF)
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data (CSV)
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRevenueDashboard;