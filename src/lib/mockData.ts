// src/lib/mockData.ts

export interface Application {
  id: string;
  applicantName: string;
  citizenEmail?: string;
  type: string;
  ward: string;
  community: string;
  submittedDate: string;
  status:
    | "Submitted"
    | "Awaiting Payment"
    | "Paid"
    | "Under Review"
    | "Awaiting Ward Approval"
    | "Ward Approved"
    | "Ward Declined"
    | "Declined"
    | "Correction Requested"
    | "Approved";
  adminNote?: string;
  wardNote?: string;
  amount: number;
  paid: boolean;
  certificateNo?: string;
}

// ─── Street Applications ────────────────────────────────────────────────────

export type StreetAppStatus =
  | "Submitted"
  | "Awaiting Payment"
  | "Paid"
  | "Under Review"
  | "Field Inspection"
  | "Approved"
  | "Rejected"
  | "Correction Requested"
  | "Certificate Issued";

export interface StreetApplication {
  id: string;
  citizenEmail: string;
  applicantName: string;
  phone: string;
  email: string;
  nationalId: string;

  // Address
  houseNumber: string;
  street: string;
  area: string;
  ward: string;
  cda: string;
  landmarks: string;

  // Residency
  yearsLiving: string;
  propertyStatus: string;

  // Street info
  applicationType: "new" | "renewal";
  proposedName: string;
  previousName: string;
  reason: string;
  historicalSignificance: string;

  // GPS
  gpsLat: string;
  gpsLng: string;

  // Meta
  submittedDate: string;
  status: StreetAppStatus;
  amount: number;
  paid: boolean;
  paymentRef: string;
  paymentDate?: string;
  adminNote?: string;
  inspectionNote?: string;
  certificateNo?: string;
  certificateIssuedDate?: string;
}

const STREET_SEED: StreetApplication[] = [
  {
    id: "IFO-STR-245",
    citizenEmail: "citizen@logmas.ng",
    applicantName: "Adeola Bakare",
    phone: "08012345678",
    email: "adeola@example.com",
    nationalId: "12345678901",
    houseNumber: "12",
    street: "Olumo Street",
    area: "Ifo Central",
    ward: "Ward 3 - Ifo Central",
    cda: "Ifo Central CDA",
    landmarks: "Near Ifo Market",
    yearsLiving: "8",
    propertyStatus: "owner",
    applicationType: "new",
    proposedName: "Olumo Street",
    previousName: "",
    reason: "Named after the historic Olumo rock visible from this area",
    historicalSignificance: "Community landmark reference",
    gpsLat: "6.8103",
    gpsLng: "3.1970",
    submittedDate: "2026-03-08",
    status: "Certificate Issued",
    amount: 25000,
    paid: true,
    paymentRef: "PAY-STR-100245",
    paymentDate: "2026-03-08",
    certificateNo: "LOG-STR-100",
    certificateIssuedDate: "2026-03-08",
  },
  {
    id: "IFO-STR-244",
    citizenEmail: "citizen@logmas.ng",
    applicantName: "Tunde Adeyemi",
    phone: "08087654321",
    email: "tunde@example.com",
    nationalId: "",
    houseNumber: "5",
    street: "Balogun Avenue",
    area: "Sango",
    ward: "Ward 5 - Ota Road",
    cda: "Sango-Ota CDA",
    landmarks: "Off Lagos-Abeokuta Expressway",
    yearsLiving: "12",
    propertyStatus: "community_leader",
    applicationType: "new",
    proposedName: "Balogun Avenue",
    previousName: "",
    reason: "In honour of Chief Balogun who founded this community",
    historicalSignificance: "Founding family recognition",
    gpsLat: "6.8250",
    gpsLng: "3.0470",
    submittedDate: "2026-03-06",
    status: "Field Inspection",
    amount: 25000,
    paid: true,
    paymentRef: "PAY-STR-100244",
    paymentDate: "2026-03-06",
  },
  {
    id: "IFO-STR-243",
    citizenEmail: "other@logmas.ng",
    applicantName: "Community CDA",
    phone: "08055512300",
    email: "cda@ifo.ng",
    nationalId: "",
    houseNumber: "1",
    street: "Ifo Main Road",
    area: "Ifo Town",
    ward: "Ward 1 - Ifo North",
    cda: "Ifo North CDA",
    landmarks: "Central Business District",
    yearsLiving: "20",
    propertyStatus: "community_leader",
    applicationType: "renewal",
    proposedName: "Ifo Main Road",
    previousName: "Ifo Main Road",
    reason: "Annual renewal of existing registration",
    historicalSignificance: "",
    gpsLat: "6.8089",
    gpsLng: "3.2010",
    submittedDate: "2026-03-03",
    status: "Certificate Issued",
    amount: 10000,
    paid: true,
    paymentRef: "PAY-STR-100243",
    paymentDate: "2026-03-03",
    certificateNo: "LOGMAS/STR/2026/001",
    certificateIssuedDate: "2026-03-05",
  },
  {
    id: "IFO-STR-242",
    citizenEmail: "other@logmas.ng",
    applicantName: "Ibrahim Musa",
    phone: "07031234567",
    email: "ibrahim@example.com",
    nationalId: "98765432101",
    houseNumber: "22",
    street: "Agbado Lane",
    area: "Agbado",
    ward: "Ward 2 - Ifo South",
    cda: "Agbado CDA",
    landmarks: "Near Agbado Junction",
    yearsLiving: "5",
    propertyStatus: "tenant",
    applicationType: "new",
    proposedName: "Agbado Lane",
    previousName: "",
    reason: "Official naming of informal street",
    historicalSignificance: "",
    gpsLat: "6.6821",
    gpsLng: "3.2831",
    submittedDate: "2026-02-28",
    status: "Awaiting Payment",
    amount: 25000,
    paid: false,
    paymentRef: "PAY-STR-100242",
  },
  {
    id: "IFO-STR-241",
    citizenEmail: "other@logmas.ng",
    applicantName: "Folake Ojo",
    phone: "09012398765",
    email: "folake@example.com",
    nationalId: "",
    houseNumber: "8",
    street: "Coker Street",
    area: "Ifo South",
    ward: "Ward 2 - Ifo South",
    cda: "Ifo South CDA",
    landmarks: "Behind Coker Church",
    yearsLiving: "3",
    propertyStatus: "tenant",
    applicationType: "renewal",
    proposedName: "Coker Street",
    previousName: "Coker Street",
    reason: "Renewal of registration",
    historicalSignificance: "",
    gpsLat: "6.7900",
    gpsLng: "3.1810",
    submittedDate: "2026-02-25",
    status: "Rejected",
    amount: 10000,
    paid: true,
    paymentRef: "PAY-STR-100241",
    paymentDate: "2026-02-25",
    adminNote: "Incomplete CDA approval documentation provided.",
  },
];

// ─── Street Application CRUD ─────────────────────────────────────────────────

export function getStreetApplications(): StreetApplication[] {
  try {
    const raw = localStorage.getItem("logmas_street_applications");
    return raw ? JSON.parse(raw) : STREET_SEED;
  } catch {
    return STREET_SEED;
  }
}

export function saveStreetApplications(apps: StreetApplication[]) {
  localStorage.setItem("logmas_street_applications", JSON.stringify(apps));
}

export function getStreetApplicationsByEmail(
  email: string,
): StreetApplication[] {
  return getStreetApplications().filter((a) => a.citizenEmail === email);
}

export function addStreetApplication(
  app: Omit<StreetApplication, "id" | "submittedDate" | "paymentRef">,
): StreetApplication {
  const apps = getStreetApplications();
  const newId = `IFO-STR-${String(apps.length + 246).padStart(3, "0")}`;
  const paymentRef = `PAY-STR-1${String(Date.now()).slice(-5)}`;
  const newApp: StreetApplication = {
    ...app,
    id: newId,
    submittedDate: new Date().toISOString().split("T")[0],
    paymentRef,
  };
  apps.unshift(newApp);
  saveStreetApplications(apps);
  return newApp;
}

export function updateStreetApplicationStatus(
  id: string,
  status: StreetAppStatus,
  note?: string,
  field: "adminNote" | "inspectionNote" = "adminNote",
) {
  const apps = getStreetApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return;
  apps[idx].status = status;
  if (note) apps[idx][field] = note;

  if (status === "Approved") {
    apps[idx].certificateNo = `LOGMAS/STR/${new Date().getFullYear()}/${String(
      Math.floor(Math.random() * 900) + 100,
    )}`;
    apps[idx].certificateIssuedDate = new Date().toISOString().split("T")[0];
    apps[idx].status = "Certificate Issued";
    if (apps[idx].citizenEmail) {
      addNotification({
        citizenEmail: apps[idx].citizenEmail,
        title: "Street Registration Approved 🎉",
        message: `Your street registration (${apps[idx].id}) has been approved. Certificate No: ${apps[idx].certificateNo}. You can now download it from your dashboard.`,
        type: "success",
      });
    }
  }

  if (status === "Rejected") {
    if (apps[idx].citizenEmail) {
      addNotification({
        citizenEmail: apps[idx].citizenEmail,
        title: "Street Registration Rejected",
        message: `Your street registration (${apps[idx].id}) was rejected. Reason: ${note || "See officer notes."}`,
        type: "error",
      });
    }
  }

  if (status === "Correction Requested") {
    if (apps[idx].citizenEmail) {
      addNotification({
        citizenEmail: apps[idx].citizenEmail,
        title: "Correction Required",
        message: `Your street registration (${apps[idx].id}) requires corrections. Note: ${note || "Please review and resubmit."}`,
        type: "info",
      });
    }
  }

  if (status === "Field Inspection") {
    if (apps[idx].citizenEmail) {
      addNotification({
        citizenEmail: apps[idx].citizenEmail,
        title: "Field Inspection Scheduled",
        message: `Your street registration (${apps[idx].id}) is now in field inspection phase. An officer will visit the location.`,
        type: "info",
      });
    }
  }

  saveStreetApplications(apps);
}

export function confirmStreetPayment(id: string) {
  const apps = getStreetApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return;
  apps[idx].paid = true;
  apps[idx].status = "Paid";
  apps[idx].paymentDate = new Date().toISOString().split("T")[0];
  if (apps[idx].citizenEmail) {
    addNotification({
      citizenEmail: apps[idx].citizenEmail,
      title: "Payment Confirmed",
      message: `Payment for street registration (${apps[idx].id}) has been confirmed. Your application is now under review.`,
      type: "success",
    });
  }
  saveStreetApplications(apps);
}

// ─── Original Application CRUD (unchanged) ───────────────────────────────────

export interface Notification {
  id: string;
  citizenEmail: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "success" | "info" | "error";
}

export const SEED: Application[] = [
  {
    id: "APP-001",
    applicantName: "Ngozi Eze",
    citizenEmail: "citizen@logmas.ng",
    type: "State of Origin",
    ward: "Ward 3 - Ifo Central",
    community: "Agbado",
    submittedDate: "2025-06-12",
    status: "Approved",
    amount: 5000,
    paid: true,
    certificateNo: "LOG-TEST",
  },
  {
    id: "APP-002",
    applicantName: "Tunde Bakare",
    citizenEmail: "citizen@logmas.ng",
    type: "Street Registration",
    ward: "Ward 5 - Ota Road",
    community: "Ota",
    submittedDate: "2025-06-14",
    status: "Paid",
    amount: 10000,
    paid: true,
  },
  {
    id: "APP-003",
    applicantName: "Amina Sule",
    citizenEmail: "citizen@logmas.ng",
    type: "State of Origin",
    ward: "Ward 3 - Ifo Central",
    community: "Ifo Town",
    submittedDate: "2025-06-15",
    status: "Paid",
    amount: 5000,
    paid: true,
  },
  {
    id: "APP-004",
    applicantName: "Chuka Obi",
    citizenEmail: "other@logmas.ng",
    type: "Business Permit",
    ward: "Ward 2 - Ifo South",
    community: "Sango",
    submittedDate: "2025-06-16",
    status: "Paid",
    amount: 15000,
    paid: true,
  },
  {
    id: "APP-005",
    applicantName: "Emeka Okonkwo",
    citizenEmail: "other@logmas.ng",
    type: "Tenement Rate",
    ward: "Ward 1 - Ifo North",
    community: "Ojodu",
    submittedDate: "2025-06-18",
    status: "Awaiting Ward Approval",
    amount: 8000,
    paid: true,
  },
];

export function getApplications(): Application[] {
  try {
    const raw = localStorage.getItem("logmas_applications");
    return raw ? JSON.parse(raw) : SEED;
  } catch {
    return SEED;
  }
}

export function saveApplications(apps: Application[]) {
  localStorage.setItem("logmas_applications", JSON.stringify(apps));
}

export function updateApplicationStatus(
  id: string,
  status: Application["status"],
  note?: string,
  field: "adminNote" | "wardNote" = "adminNote",
) {
  const apps = getApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return;
  apps[idx].status = status;
  if (note) apps[idx][field] = note;
  if (status === "Ward Approved") {
    apps[idx].certificateNo = `LOGMAS/SOO/2025/${String(
      Math.floor(Math.random() * 900) + 100,
    )}`;
    if (apps[idx].citizenEmail) {
      addNotification({
        citizenEmail: apps[idx].citizenEmail!,
        title: "Certificate Approved 🎉",
        message: `Your ${apps[idx].type} (${apps[idx].id}) has been approved by the Ward Councillor. Certificate No: ${apps[idx].certificateNo}. You can now download it.`,
        type: "success",
      });
    }
  }
  if (status === "Declined" || status === "Ward Declined") {
    if (apps[idx].citizenEmail) {
      addNotification({
        citizenEmail: apps[idx].citizenEmail!,
        title: "Application Declined",
        message: `Your ${apps[idx].type} (${apps[idx].id}) was declined. Reason: ${note || "See officer notes."}`,
        type: "error",
      });
    }
  }
  if (status === "Awaiting Ward Approval") {
    if (apps[idx].citizenEmail) {
      addNotification({
        citizenEmail: apps[idx].citizenEmail!,
        title: "Application Under Review",
        message: `Your ${apps[idx].type} (${apps[idx].id}) has been verified by LGA Admin and sent to the Ward Councillor for approval.`,
        type: "info",
      });
    }
  }
  saveApplications(apps);
}

// ─── Notifications ────────────────────────────────────────────────────────────

// export function getNotifications(citizenEmail: string): Notification[] {
//   try {
//     const raw = localStorage.getItem("logmas_notifications");
//     const all: Notification[] = raw ? JSON.parse(raw) : [];
//     return all.filter((n) => n.citizenEmail === citizenEmail);
//   } catch {
//     return [];
//   }
// }

// export function addNotification(
//   n: Omit<Notification, "id" | "time" | "read">
// ) {
//   try {
//     const raw = localStorage.getItem("logmas_notifications");
//     const all: Notification[] = raw ? JSON.parse(raw) : [];
//     all.unshift({
//       ...n,
//       id: `notif-${Date.now()}`,
//       time: "Just now",
//       read: false,
//     });
//     localStorage.setItem("logmas_notifications", JSON.stringify(all));
//   } catch {}
// }

// export function markAllNotificationsRead(citizenEmail: string) {
//   try {
//     const raw = localStorage.getItem("logmas_notifications");
//     const all: Notification[] = raw ? JSON.parse(raw) : [];
//     all.forEach((n) => {
//       if (n.citizenEmail === citizenEmail) n.read = true;
//     });
//     localStorage.setItem("logmas_notifications", JSON.stringify(all));
//   } catch {}
// }

// export function resetData() {
//   localStorage.removeItem("logmas_applications");
//   localStorage.removeItem("logmas_notifications");
//   localStorage.removeItem("logmas_street_applications");
// }

export interface VerificationResult {
  found: boolean;
  type: "standard" | "street" | null;
  data: Application | StreetApplication | null;
}

export function verifyAnyCertificate(certNo: string): VerificationResult {
  if (!certNo) return { found: false, type: null, data: null };
  const normalizedCertNo = certNo.trim().toUpperCase();

  // 1. Check Standard Applications
  const standardApps = getApplications();
  const foundStandard = standardApps.find(
    (a) => a.certificateNo?.toUpperCase() === normalizedCertNo,
  );
  if (foundStandard) {
    return { found: true, type: "standard", data: foundStandard };
  }

  // 2. Check Street Applications
  const streetApps = getStreetApplications();
  const foundStreet = streetApps.find(
    (a) => a.certificateNo?.toUpperCase() === normalizedCertNo,
  );
  if (foundStreet) {
    return { found: true, type: "street", data: foundStreet };
  }

  return { found: false, type: null, data: null };
}

// src/lib/mockData.ts
import { v4 as uuidv4 } from "uuid";

// ─── Revenue & Service Engine (Core Data Model) ──────────────────────────────

export type RevenuePricingType = "fixed" | "variable" | "tiered" | "dynamic";
export type RenewalFrequency =
  | "monthly"
  | "quarterly"
  | "semi-annual"
  | "annual"
  | "biennial";
export type RevenueCategory =
  | "property"
  | "street"
  | "business"
  | "market"
  | "environmental"
  | "transport"
  | "advertisement"
  | "agriculture"
  | "health"
  | "event"
  | "assets"
  | "penalty"
  | "other";

export type RevenueStatus = "active" | "inactive" | "draft" | "archived";
export type ApplicationStatus =
  | "submitted"
  | "pending_review"
  | "awaiting_payment"
  | "paid"
  | "under_inspection"
  | "awaiting_approval"
  | "approved"
  | "rejected"
  | "correction_requested"
  | "completed"
  | "cancelled";

export interface PenaltyRule {
  id: string;
  name: string;
  description: string;
  daysOverdue: number;
  penaltyPercent: number;
  maxPenalty?: number;
  active: boolean;
}

export interface WaiverRule {
  id: string;
  name: string;
  description: string;
  discountPercent: number;
  applicableGroups: string[]; // e.g., ["senior_citizen", "disabled", "low_income"]
  maxWaiver?: number;
  requiresApproval: boolean;
  active: boolean;
}

export interface Revenue {
  id: string;
  name: string;
  category: RevenueCategory;
  revenueCode: string; // e.g., "PSR-2026-001"
  description: string;
  department: string; // e.g., "Planning & Revenue", "Health"
  status: RevenueStatus;

  // Pricing & Payment
  price: number;
  currency: string; // "NGN"
  pricingType: RevenuePricingType;
  priceNote?: string; // e.g., "per square meter", "per vehicle"

  // Renewal
  renewalRequired: boolean;
  renewalFrequency?: RenewalFrequency;
  renewalPrice?: number;
  renewalDaysBeforeExpiry?: number; // Auto-notify X days before expiry

  // Workflow
  requiresApproval: boolean;
  requiresInspection: boolean;
  requiresDocuments: boolean;
  requiresGPS: boolean;
  requiresCitizenProfile: boolean; // Full citizen KYC
  requiresBusinessProfile: boolean; // Business registration

  // Rules & Compliance
  penaltyRules: PenaltyRule[];
  waiverRules: WaiverRule[];
  revenueHead: string; // GL Account code
  maxInstallments?: number;

  // Metadata
  icon?: string; // emoji or icon identifier
  createdAt: string;
  updatedAt: string;
  createdBy: string; // Admin user ID
  notes?: string;
}

export interface RevenueApplication {
  id: string;
  revenueId: string;
  citizenEmail: string;
  applicantName: string;
  phone: string;

  // Application info
  submittedDate: string;
  status: ApplicationStatus;
  amount: number;
  paid: boolean;
  paymentRef?: string;
  paymentDate?: string;

  // Conditional fields (filled based on Revenue config)
  formData: Record<string, any>; // Flexible JSON for custom fields
  documents: string[]; // File URLs or IDs
  gpsLat?: string;
  gpsLng?: string;
  inspectionDate?: string;
  inspectionNotes?: string;
  approvalDate?: string;

  // References
  certificateNo?: string;
  certificateIssuedDate?: string;
  renewalDueDate?: string;
  adminNote?: string;
  wardNote?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  email: string;
  phone: string;
  active: boolean;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const REVENUE_SEED: Revenue[] = [
  {
    id: uuidv4(),
    name: "Street Registration",
    category: "street",
    revenueCode: "STR-2026-001",
    description: "Official registration of residential streets",
    department: "Planning & Urban Development",
    status: "active",
    price: 25000,
    currency: "NGN",
    pricingType: "fixed",
    renewalRequired: true,
    renewalFrequency: "annual",
    renewalPrice: 10000,
    renewalDaysBeforeExpiry: 30,
    requiresApproval: true,
    requiresInspection: true,
    requiresDocuments: true,
    requiresGPS: true,
    requiresCitizenProfile: true,
    requiresBusinessProfile: false,
    penaltyRules: [
      {
        id: uuidv4(),
        name: "30-Day Late Fee",
        description: "5% penalty after 30 days",
        daysOverdue: 30,
        penaltyPercent: 5,
        active: true,
      },
      {
        id: uuidv4(),
        name: "60-Day Late Fee",
        description: "10% penalty after 60 days",
        daysOverdue: 60,
        penaltyPercent: 10,
        maxPenalty: 5000,
        active: true,
      },
    ],
    waiverRules: [
      {
        id: uuidv4(),
        name: "Senior Citizen Discount",
        description: "20% discount for citizens aged 65+",
        discountPercent: 20,
        applicableGroups: ["senior_citizen"],
        requiresApproval: true,
        active: true,
      },
    ],
    revenueHead: "1010-01-01",
    maxInstallments: 3,
    icon: "🛣️",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin@logmas.ng",
    notes: "Street naming and officialization process",
  },
  {
    id: uuidv4(),
    name: "State of Origin Certificate",
    category: "property",
    revenueCode: "SOO-2026-001",
    description: "Issuance of state of origin certificate",
    department: "Civil Registry",
    status: "active",
    price: 5000,
    currency: "NGN",
    pricingType: "fixed",
    renewalRequired: false,
    requiresApproval: true,
    requiresInspection: false,
    requiresDocuments: true,
    requiresGPS: false,
    requiresCitizenProfile: true,
    requiresBusinessProfile: false,
    penaltyRules: [],
    waiverRules: [],
    revenueHead: "1010-02-01",
    icon: "📜",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin@logmas.ng",
  },
  {
    id: uuidv4(),
    name: "Business Operating Permit",
    category: "business",
    revenueCode: "BUS-2026-001",
    description: "Annual business operating license",
    department: "Commerce & Industry",
    status: "active",
    price: 50000,
    currency: "NGN",
    pricingType: "tiered",
    priceNote: "Based on business category and scale",
    renewalRequired: true,
    renewalFrequency: "annual",
    renewalPrice: 50000,
    renewalDaysBeforeExpiry: 30,
    requiresApproval: true,
    requiresInspection: true,
    requiresDocuments: true,
    requiresGPS: true,
    requiresCitizenProfile: true,
    requiresBusinessProfile: true,
    penaltyRules: [
      {
        id: uuidv4(),
        name: "Operating Without License",
        description: "20% of annual fee per month of violation",
        daysOverdue: 1,
        penaltyPercent: 20,
        maxPenalty: 100000,
        active: true,
      },
    ],
    waiverRules: [],
    revenueHead: "1020-01-01",
    maxInstallments: 2,
    icon: "🏢",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin@logmas.ng",
    notes: "Covers retail, services, manufacturing",
  },
  {
    id: uuidv4(),
    name: "Market Levy",
    category: "market",
    revenueCode: "MKT-2026-001",
    description: "Daily or monthly market space fee",
    department: "Commerce & Market Development",
    status: "active",
    price: 500,
    currency: "NGN",
    pricingType: "variable",
    priceNote: "Per stall per day",
    renewalRequired: false,
    requiresApproval: false,
    requiresInspection: false,
    requiresDocuments: false,
    requiresGPS: false,
    requiresCitizenProfile: true,
    requiresBusinessProfile: false,
    penaltyRules: [],
    waiverRules: [],
    revenueHead: "1030-01-01",
    icon: "🛒",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin@logmas.ng",
  },
  {
    id: uuidv4(),
    name: "Environmental Sanitation Fee",
    category: "environmental",
    revenueCode: "ENV-2026-001",
    description: "Waste management and sanitation collection",
    department: "Environment & Sanitation",
    status: "active",
    price: 2000,
    currency: "NGN",
    pricingType: "fixed",
    renewalRequired: true,
    renewalFrequency: "monthly",
    renewalPrice: 2000,
    renewalDaysBeforeExpiry: 5,
    requiresApproval: false,
    requiresInspection: false,
    requiresDocuments: false,
    requiresGPS: false,
    requiresCitizenProfile: true,
    requiresBusinessProfile: false,
    penaltyRules: [
      {
        id: uuidv4(),
        name: "Late Payment",
        description: "10% penalty after 2 weeks",
        daysOverdue: 14,
        penaltyPercent: 10,
        active: true,
      },
    ],
    waiverRules: [],
    revenueHead: "1040-01-01",
    icon: "♻️",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin@logmas.ng",
  },
  {
    id: uuidv4(),
    name: "Transport & Vehicle Registration",
    category: "transport",
    revenueCode: "TRN-2026-001",
    description: "Commercial vehicle registration and renewal",
    department: "Transport & Logistics",
    status: "active",
    price: 15000,
    currency: "NGN",
    pricingType: "tiered",
    priceNote: "Based on vehicle type and capacity",
    renewalRequired: true,
    renewalFrequency: "annual",
    renewalPrice: 12000,
    renewalDaysBeforeExpiry: 60,
    requiresApproval: true,
    requiresInspection: true,
    requiresDocuments: true,
    requiresGPS: true,
    requiresCitizenProfile: true,
    requiresBusinessProfile: true,
    penaltyRules: [],
    waiverRules: [],
    revenueHead: "1050-01-01",
    maxInstallments: 2,
    icon: "🚐",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin@logmas.ng",
  },
];

const DEPARTMENT_SEED: Department[] = [
  {
    id: uuidv4(),
    name: "Planning & Urban Development",
    code: "PUD",
    head: "Engr. Adeleke Obi",
    email: "pud@logmas.ng",
    phone: "+2348012345678",
    active: true,
  },
  {
    id: uuidv4(),
    name: "Civil Registry",
    code: "CRG",
    head: "Mrs. Folake Adeyemi",
    email: "registry@logmas.ng",
    phone: "+2348087654321",
    active: true,
  },
  {
    id: uuidv4(),
    name: "Commerce & Industry",
    code: "CCI",
    head: "Mr. Tunde Okafor",
    email: "commerce@logmas.ng",
    phone: "+2349012345678",
    active: true,
  },
  {
    id: uuidv4(),
    name: "Environment & Sanitation",
    code: "EAS",
    head: "Dr. Chike Nwosu",
    email: "environment@logmas.ng",
    phone: "+2349087654321",
    active: true,
  },
];

// ─── Revenue CRUD ─────────────────────────────────────────────────────────────

export function getRevenues(): Revenue[] {
  try {
    const raw = localStorage.getItem("logmas_revenues");
    return raw ? JSON.parse(raw) : REVENUE_SEED;
  } catch {
    return REVENUE_SEED;
  }
}

export function saveRevenues(revenues: Revenue[]) {
  localStorage.setItem("logmas_revenues", JSON.stringify(revenues));
}

export function addRevenue(
  revenue: Omit<Revenue, "id" | "createdAt" | "updatedAt">,
): Revenue {
  const revenues = getRevenues();
  const newRevenue: Revenue = {
    ...revenue,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  revenues.unshift(newRevenue);
  saveRevenues(revenues);
  return newRevenue;
}

export function updateRevenue(
  id: string,
  updates: Partial<Revenue>,
): Revenue | null {
  const revenues = getRevenues();
  const idx = revenues.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  revenues[idx] = {
    ...revenues[idx],
    ...updates,
    id: revenues[idx].id, // Don't allow ID change
    createdAt: revenues[idx].createdAt, // Don't allow createdAt change
    updatedAt: new Date().toISOString(),
  };
  saveRevenues(revenues);
  return revenues[idx];
}

export function deleteRevenue(id: string): boolean {
  const revenues = getRevenues();
  const idx = revenues.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  revenues.splice(idx, 1);
  saveRevenues(revenues);
  return true;
}

export function getRevenueById(id: string): Revenue | null {
  const revenues = getRevenues();
  return revenues.find((r) => r.id === id) || null;
}

export function getRevenuesByCategory(category: RevenueCategory): Revenue[] {
  return getRevenues().filter(
    (r) => r.category === category && r.status === "active",
  );
}

export function getRevenuesByDepartment(department: string): Revenue[] {
  return getRevenues().filter(
    (r) => r.department === department && r.status === "active",
  );
}

export function getAllActiveRevenues(): Revenue[] {
  return getRevenues().filter((r) => r.status === "active");
}

// ─── Revenue Application CRUD ─────────────────────────────────────────────────

export function getRevenueApplications(): RevenueApplication[] {
  try {
    const raw = localStorage.getItem("logmas_revenue_applications");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRevenueApplications(apps: RevenueApplication[]) {
  localStorage.setItem("logmas_revenue_applications", JSON.stringify(apps));
}

export function addRevenueApplication(
  app: Omit<RevenueApplication, "id" | "submittedDate">,
): RevenueApplication {
  const apps = getRevenueApplications();
  const newApp: RevenueApplication = {
    ...app,
    id: `APP-REV-${String(apps.length + 1).padStart(4, "0")}`,
    submittedDate: new Date().toISOString().split("T")[0],
  };
  apps.unshift(newApp);
  saveRevenueApplications(apps);
  return newApp;
}

export function updateRevenueApplicationStatus(
  id: string,
  status: ApplicationStatus,
  updates?: Partial<RevenueApplication>,
): boolean {
  const apps = getRevenueApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  apps[idx] = {
    ...apps[idx],
    ...updates,
    status,
  };
  saveRevenueApplications(apps);
  return true;
}

export function getRevenueApplicationsByEmail(
  citizenEmail: string,
): RevenueApplication[] {
  return getRevenueApplications().filter(
    (a) => a.citizenEmail === citizenEmail,
  );
}

export function getRevenueApplicationsByRevenueId(
  revenueId: string,
): RevenueApplication[] {
  return getRevenueApplications().filter((a) => a.revenueId === revenueId);
}

export function confirmRevenuePayment(id: string): boolean {
  return updateRevenueApplicationStatus(id, "paid", {
    paid: true,
    paymentDate: new Date().toISOString().split("T")[0],
  });
}

export function getRenewalsDue(daysFromNow: number = 30): RevenueApplication[] {
  const now = new Date();
  const futureDate = new Date(
    now.getTime() + daysFromNow * 24 * 60 * 60 * 1000,
  );
  return getRevenueApplications().filter((app) => {
    if (!app.renewalDueDate) return false;
    const dueDate = new Date(app.renewalDueDate);
    return dueDate <= futureDate && dueDate >= now;
  });
}

// ─── Department CRUD ──────────────────────────────────────────────────────────

export function getDepartments(): Department[] {
  try {
    const raw = localStorage.getItem("logmas_departments");
    return raw ? JSON.parse(raw) : DEPARTMENT_SEED;
  } catch {
    return DEPARTMENT_SEED;
  }
}

export function saveDepartments(depts: Department[]) {
  localStorage.setItem("logmas_departments", JSON.stringify(depts));
}

export function addDepartment(dept: Omit<Department, "id">): Department {
  const depts = getDepartments();
  const newDept: Department = { ...dept, id: uuidv4() };
  depts.push(newDept);
  saveDepartments(depts);
  return newDept;
}

export function updateDepartment(
  id: string,
  updates: Partial<Department>,
): boolean {
  const depts = getDepartments();
  const idx = depts.findIndex((d) => d.id === id);
  if (idx === -1) return false;
  depts[idx] = { ...depts[idx], ...updates };
  saveDepartments(depts);
  return true;
}

export function getDepartmentById(id: string): Department | null {
  return getDepartments().find((d) => d.id === id) || null;
}

// ─── Notifications (Updated) ──────────────────────────────────────────────────

export interface Notification {
  id: string;
  citizenEmail: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "success" | "info" | "error" | "warning";
  relatedAppId?: string;
}

export function getNotifications(citizenEmail: string): Notification[] {
  try {
    const raw = localStorage.getItem("logmas_notifications");
    const all: Notification[] = raw ? JSON.parse(raw) : [];
    return all.filter((n) => n.citizenEmail === citizenEmail);
  } catch {
    return [];
  }
}

export function addNotification(
  n: Omit<Notification, "id" | "time" | "read">,
): Notification {
  try {
    const raw = localStorage.getItem("logmas_notifications");
    const all: Notification[] = raw ? JSON.parse(raw) : [];
    const notif: Notification = {
      ...n,
      id: `notif-${Date.now()}`,
      time: "Just now",
      read: false,
    };
    all.unshift(notif);
    localStorage.setItem("logmas_notifications", JSON.stringify(all));
    return notif;
  } catch {
    return n as Notification;
  }
}

export function markAllNotificationsRead(citizenEmail: string): void {
  try {
    const raw = localStorage.getItem("logmas_notifications");
    const all: Notification[] = raw ? JSON.parse(raw) : [];
    all.forEach((n) => {
      if (n.citizenEmail === citizenEmail) n.read = true;
    });
    localStorage.setItem("logmas_notifications", JSON.stringify(all));
  } catch {}
}

// ─── Data Reset ──────────────────────────────────────────────────────────────

export function resetData() {
  localStorage.removeItem("logmas_revenues");
  localStorage.removeItem("logmas_revenue_applications");
  localStorage.removeItem("logmas_departments");
  localStorage.removeItem("logmas_notifications");
}
