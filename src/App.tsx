import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplyCertificate from "./pages/ApplyCertificate";
import CertificateApplications from "./pages/CertificateApplications";
import ApprovedCertificates from "./pages/ApprovedCertificates";
import StreetRegistration from "./pages/StreetRegistration";
import TenementRate from "./pages/TenementRate";
import CompanyDemandNotice from "./pages/CompanyDemandNotice";
import ShopLevy from "./pages/ShopLevy";
import PaymentHistory from "./pages/PaymentHistory";
import Notifications from "./pages/Notifications";
import RaiseTicket from "./pages/RaiseTicket";
import ProfileSettings from "./pages/ProfileSettings";
import ShopPortal from "./pages/ShopPortal";
import BusinessPortal from "./pages/BusinessPortal";
import FAQ from "./pages/FAQ";
import VerifyCertificate from "./pages/VerifyCertificate";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";
import AdminCertificates from "./pages/AdminCertificates";
import AdminStreets from "./pages/AdminStreets";
import AdminTenement from "./pages/AdminTenement";
import AdminShops from "./pages/AdminShops";
import AdminBusinesses from "./pages/AdminBusinesses";
import AdminPayments from "./pages/AdminPayments";
import AdminReports from "./pages/AdminReports";
import AdminTickets from "./pages/AdminTickets";
import AdminOfficers from "./pages/AdminOfficers";
import AdminUsers from "./pages/AdminUsers";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";
import WardDashboard from "./pages/WardDashboard";
import WardApplications from "./pages/WardApplications";
import StreetCertificate from "./pages/Streetcertificate";
import RevenuePortal from "./pages/Revenueportal";
import AdminRevenueDashboard from "./pages/Adminrevenuedashboard";
import AdminRevenueSettings from "./pages/AdminRevenueSettings";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ─── Public Routes ─────────────────────────────────────────── */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/verify" element={<VerifyCertificate />} />
 
          {/* ─── Citizen Dashboard Routes ────────────────────────────── */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/apply" element={<ApplyCertificate />} />
          <Route path="/dashboard/applications" element={<CertificateApplications />} />
          <Route path="/dashboard/certificates" element={<ApprovedCertificates />} />
          <Route path="/dashboard/street-registration" element={<StreetRegistration />} />
          <Route path="/dashboard/street-certificate/:id" element={<StreetCertificate />} />
          <Route path="/dashboard/tenement-rate" element={<TenementRate />} />
          <Route path="/dashboard/demand-notice" element={<CompanyDemandNotice />} />
          <Route path="/dashboard/shop-levy" element={<ShopLevy />} />
          <Route path="/dashboard/payments" element={<PaymentHistory />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/tickets" element={<RaiseTicket />} />
          <Route path="/dashboard/settings" element={<ProfileSettings />} />
          <Route path="/dashboard/downloads" element={<ApprovedCertificates />} />
 
          {/* ─── Revenue Engine - Citizen Routes ──────────────────────── */}
          <Route path="/dashboard/revenue" element={<RevenuePortal />} />
 
          {/* ─── Portal Routes ────────────────────────────────────────── */}
          <Route path="/shop-portal" element={<ShopPortal />} />
          <Route path="/business-portal" element={<BusinessPortal />} />
 
          {/* ─── Admin Routes ─────────────────────────────────────────── */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />
          <Route path="/admin/streets" element={<AdminStreets />} />
          <Route path="/admin/tenement" element={<AdminTenement />} />
          <Route path="/admin/shops" element={<AdminShops />} />
          <Route path="/admin/businesses" element={<AdminBusinesses />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/tickets" element={<AdminTickets />} />
          <Route path="/admin/officers" element={<AdminOfficers />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
 
          {/* ─── Revenue Engine - Admin Routes ────────────────────────── */}
          <Route path="/admin/revenue/dashboard" element={<AdminRevenueDashboard />} />
          <Route path="/admin/revenue/settings" element={<AdminRevenueSettings />} />
 
          {/* Revenue Subcategory Routes (Placeholders) */}
          <Route
            path="/admin/revenue/catalogue"
            element={
              <AdminRevenueDashboard />
            }
          />
          <Route
            path="/admin/revenue/citizen-apps"
            element={
              <AdminApplications />
            }
          />
          <Route
            path="/admin/revenue/business-apps"
            element={
              <AdminApplications />
            }
          />
          <Route
            path="/admin/revenue/market"
            element={<div className="p-8"><h1>Market Revenue (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/property-street"
            element={<AdminStreets />}
          />
          <Route
            path="/admin/revenue/environmental"
            element={<div className="p-8"><h1>Environmental Revenue (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/transport"
            element={<div className="p-8"><h1>Transport Revenue (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/advertisement"
            element={<div className="p-8"><h1>Advertisement Revenue (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/agriculture"
            element={<div className="p-8"><h1>Agriculture & Abattoir Revenue (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/health"
            element={<div className="p-8"><h1>Health & Food Permits (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/events"
            element={<div className="p-8"><h1>Events & Entertainment Permits (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/assets"
            element={<div className="p-8"><h1>Government Assets & Rentals (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/penalties"
            element={<div className="p-8"><h1>Fines & Penalties (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/invoices"
            element={<AdminPayments />}
          />
          <Route
            path="/admin/revenue/receipts"
            element={<AdminPayments />}
          />
          <Route
            path="/admin/revenue/renewals"
            element={<div className="p-8"><h1>Renewal Management (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/field-collection"
            element={<div className="p-8"><h1>Field Officer Collection (Coming Soon)</h1></div>}
          />
          <Route
            path="/admin/revenue/reports"
            element={<AdminReports />}
          />
 
          {/* ─── Ward Officer Routes ────────────────────────────────── */}
          <Route path="/ward" element={<WardDashboard />} />
          <Route path="/ward/applications" element={<WardApplications />} />
          <Route path="/ward/approvals" element={<WardApplications />} />
 
          {/* ─── Catch All / 404 ────────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
