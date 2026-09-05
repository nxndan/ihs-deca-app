import "server-only";
import { kv } from "@vercel/kv";
import config from "@/data/store-config.json";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export type Signup = { name: string; email: string };
export type ShiftData = { volunteers: Signup[]; managers: Signup[] };
export type DayData = Record<string, ShiftData>;
export type ClosedMap = Record<string, Record<string, boolean>>;

// ------------------------------------------------------------------
// Config-derived constants
// ------------------------------------------------------------------
export const KV_KEY = "store_signups";
export const CLOSED_KV_KEY = "store_closed";
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export const CAPACITY: number = (config as { capacity?: number }).capacity ?? 2;
export const MANAGER_CAPACITY: number =
  (config as { managerCapacity?: number }).managerCapacity ?? 2;

// Server-only passwords — never shipped to the client (this module is `server-only`).
export const MANAGER_PASSWORD: string =
  (config as { managerPassword?: string }).managerPassword ?? "knightsmarket";
export const RESET_PASSWORD: string =
  (config as { resetPassword?: string }).resetPassword ?? "marketreset";
export const ADMIN_PASSWORD: string =
  (config as { adminPassword?: string }).adminPassword ?? "marketkirk";

export const SHIFTS = config.shifts as { id: string; label: string; time: string }[];

// Static fallback used until an admin saves a closure set into KV.
const DEFAULT_CLOSED = (config.closed ?? {}) as ClosedMap;

// ------------------------------------------------------------------
// Closed-shift state (dynamic — read from KV, editable at runtime)
// ------------------------------------------------------------------
export function shiftClosed(closed: ClosedMap, day: string, shift: string): boolean {
  return Boolean(closed[day]?.[shift]);
}

export async function getClosed(): Promise<ClosedMap> {
  try {
    const v = await kv.get<ClosedMap>(CLOSED_KV_KEY);
    // A saved value (even an empty object = nothing closed) wins over the static default.
    return v ?? DEFAULT_CLOSED;
  } catch {
    return DEFAULT_CLOSED;
  }
}

// ------------------------------------------------------------------
// Normalization (tolerant of older stored shapes)
// ------------------------------------------------------------------
function normalizeShift(v: unknown): ShiftData {
  // Legacy: a shift stored as a flat array of volunteers.
  if (Array.isArray(v)) return { volunteers: v as Signup[], managers: [] };
  const o = (v ?? {}) as Partial<ShiftData>;
  return { volunteers: o.volunteers ?? [], managers: o.managers ?? [] };
}

export function dayData(raw: unknown): DayData {
  const o = (raw ?? {}) as Record<string, unknown>;
  const out: DayData = {};
  for (const s of SHIFTS) out[s.id] = normalizeShift(o[s.id]);
  return out;
}

// ------------------------------------------------------------------
// KV read — tolerant of a not-yet-provisioned store.
// Clearing the week is handled by the "Reset week" action (kv.del), NOT by a
// static config flag, so signups always persist during normal operation.
// ------------------------------------------------------------------
export async function getSignups(): Promise<Record<string, unknown>> {
  try {
    return (await kv.get<Record<string, unknown>>(KV_KEY)) ?? {};
  } catch {
    return {};
  }
}
