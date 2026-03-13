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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/verify" element={<VerifyCertificate />} />

          {/* Citizen Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/apply" element={<ApplyCertificate />} />
          <Route path="/dashboard/applications" element={<CertificateApplications />} />
          <Route path="/dashboard/certificates" element={<ApprovedCertificates />} />
          <Route path="/dashboard/street-registration" element={<StreetRegistration />} />
          <Route path="/dashboard/tenement-rate" element={<TenementRate />} />
          <Route path="/dashboard/demand-notice" element={<CompanyDemandNotice />} />
          <Route path="/dashboard/shop-levy" element={<ShopLevy />} />
          <Route path="/dashboard/payments" element={<PaymentHistory />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/tickets" element={<RaiseTicket />} />
          <Route path="/dashboard/settings" element={<ProfileSettings />} />
          <Route path="/dashboard/downloads" element={<ApprovedCertificates />} />

          {/* Portals */}
          <Route path="/shop-portal" element={<ShopPortal />} />
          <Route path="/business-portal" element={<BusinessPortal />} />

          {/* Admin */}
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
