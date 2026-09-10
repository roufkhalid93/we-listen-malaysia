import type { Cause, OrgStats } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    // Always get fresh data from the admin backend; causes/stats change
    // whenever an admin edits them.
    cache: "no-store",
  });
  if (!res.ok) {
    let message = `Request to ${path} failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // ignore JSON parse errors on error responses
    }
    throw new Error(message);
  }
  return res.json();
}

export async function getCauses(): Promise<Cause[]> {
  try {
    return await apiFetch<Cause[]>("/api/causes");
  } catch (err) {
    console.error("Failed to load causes from admin API:", err);
    return [];
  }
}

export async function getCauseBySlug(slug: string): Promise<Cause | null> {
  const causes = await getCauses();
  return causes.find((c) => c.slug === slug) ?? null;
}

export async function getOrgStats(): Promise<OrgStats> {
  try {
    return await apiFetch<OrgStats>("/api/org-stats");
  } catch (err) {
    console.error("Failed to load org stats from admin API:", err);
    return { volunteers: 0, yearsActive: 0, partnerCommunities: 0 };
  }
}

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return apiFetch<{ success: boolean }>("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function submitDonation(payload: {
  causeId: string;
  name: string;
  email: string;
  amount: number;
  message?: string;
}) {
  return apiFetch<{ success: boolean; donation: unknown }>("/api/donations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export { API_BASE };
