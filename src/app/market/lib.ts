import "server-only";
import { kv } from "@vercel/kv";
import config from "@/data/store-config.json";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export type Signup = { name: string; email: string };
export type ShiftData = { volunteers: Signup[]; managers: Signup[] };
export type DayData = Record<string, ShiftData>;

// ------------------------------------------------------------------
// Config-derived constants
// ------------------------------------------------------------------
export const KV_KEY = "store_signups";
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export const CAPACITY: number = (config as { capacity?: number }).capacity ?? 2;
export const MANAGER_CAPACITY: number =
  (config as { managerCapacity?: number }).managerCapacity ?? 2;
// Server-only — never shipped to the client (this module is `server-only`).
export const MANAGER_PASSWORD: string =
  (config as { managerPassword?: string }).managerPassword ?? "knightsmarket";

export const SHIFTS = config.shifts as { id: string; label: string; time: string }[];

const closed = config.closed as Record<string, Record<string, boolean>>;

export function shiftClosed(day: string, shift: string): boolean {
  return Boolean(closed[day]?.[shift]);
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
// KV read — tolerant of a not-yet-provisioned store; honours `reset`.
// ------------------------------------------------------------------
export async function getSignups(): Promise<Record<string, unknown>> {
  try {
    if ((config as { reset?: boolean }).reset) {
      // Clearing the whole key wipes volunteers AND managers.
      await kv.del(KV_KEY);
      return {};
    }
    return (await kv.get<Record<string, unknown>>(KV_KEY)) ?? {};
  } catch {
    return {};
  }
}
