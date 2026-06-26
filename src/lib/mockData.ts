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
    status: "Under Review",
    amount: 25000,
    paid: true,
    paymentRef: "PAY-STR-100245",
    paymentDate: "2026-03-08",
  },
  {
    id: "IFO-STR-244",
    citizenEmail: "other@logmas.ng",
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
  email: string
): StreetApplication[] {
  return getStreetApplications().filter((a) => a.citizenEmail === email);
}

export function addStreetApplication(
  app: Omit<StreetApplication, "id" | "submittedDate" | "paymentRef">
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
  field: "adminNote" | "inspectionNote" = "adminNote"
) {
  const apps = getStreetApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return;
  apps[idx].status = status;
  if (note) apps[idx][field] = note;

  if (status === "Approved") {
    apps[idx].certificateNo = `LOGMAS/STR/${new Date().getFullYear()}/${String(
      Math.floor(Math.random() * 900) + 100
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

const SEED: Application[] = [
  {
    id: "APP-001",
    applicantName: "Ngozi Eze",
    citizenEmail: "other@logmas.ng",
    type: "State of Origin",
    ward: "Ward 3 - Ifo Central",
    community: "Agbado",
    submittedDate: "2025-06-12",
    status: "Awaiting Ward Approval",
    amount: 5000,
    paid: true,
  },
  {
    id: "APP-002",
    applicantName: "Tunde Bakare",
    citizenEmail: "other@logmas.ng",
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
    citizenEmail: "other@logmas.ng",
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
  field: "adminNote" | "wardNote" = "adminNote"
) {
  const apps = getApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return;
  apps[idx].status = status;
  if (note) apps[idx][field] = note;
  if (status === "Ward Approved") {
    apps[idx].certificateNo = `LOGMAS/SOO/2025/${String(
      Math.floor(Math.random() * 900) + 100
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
  n: Omit<Notification, "id" | "time" | "read">
) {
  try {
    const raw = localStorage.getItem("logmas_notifications");
    const all: Notification[] = raw ? JSON.parse(raw) : [];
    all.unshift({
      ...n,
      id: `notif-${Date.now()}`,
      time: "Just now",
      read: false,
    });
    localStorage.setItem("logmas_notifications", JSON.stringify(all));
  } catch {}
}

export function markAllNotificationsRead(citizenEmail: string) {
  try {
    const raw = localStorage.getItem("logmas_notifications");
    const all: Notification[] = raw ? JSON.parse(raw) : [];
    all.forEach((n) => {
      if (n.citizenEmail === citizenEmail) n.read = true;
    });
    localStorage.setItem("logmas_notifications", JSON.stringify(all));
  } catch {}
}

export function resetData() {
  localStorage.removeItem("logmas_applications");
  localStorage.removeItem("logmas_notifications");
  localStorage.removeItem("logmas_street_applications");
}

// import { getApplications, getStreetApplications, type Application, type StreetApplication } from "@/lib/mockData";

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
    (a) => a.certificateNo?.toUpperCase() === normalizedCertNo
  );
  if (foundStandard) {
    return { found: true, type: "standard", data: foundStandard };
  }

  // 2. Check Street Applications
  const streetApps = getStreetApplications();
  const foundStreet = streetApps.find(
    (a) => a.certificateNo?.toUpperCase() === normalizedCertNo
  );
  if (foundStreet) {
    return { found: true, type: "street", data: foundStreet };
  }

  return { found: false, type: null, data: null };
}