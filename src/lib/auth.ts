// src/lib/auth.ts
export type UserRole = "citizen" | "admin" | "ward";

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  ward?: string;
}

const USERS: Record<string, { password: string; user: AuthUser }> = {
  "citizen@logmas.ng": {
    password: "citizen123",
    user: { name: "Adebayo Okafor", email: "citizen@logmas.ng", role: "citizen" },
  },
  "admin@logmas.ng": {
    password: "admin123",
    user: { name: "Mrs. Funke Adeyemi", email: "admin@logmas.ng", role: "admin" },
  },
  "ward@logmas.ng": {
    password: "ward123",
    user: { name: "Hon. Emeka Nwosu", email: "ward@logmas.ng", role: "ward", ward: "Ward 3 - Ifo Central" },
  },
};

export function login(email: string, password: string): AuthUser | null {
  const entry = USERS[email.toLowerCase().trim()];
  if (!entry || entry.password !== password) return null;
  localStorage.setItem("logmas_user", JSON.stringify(entry.user));
  return entry.user;
}

export function logout() {
  localStorage.removeItem("logmas_user");
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("logmas_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function requireRole(role: UserRole): AuthUser | null {
  const user = getUser();
  return user?.role === role ? user : null;
}