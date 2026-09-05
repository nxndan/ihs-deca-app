"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import {
  KV_KEY,
  CLOSED_KV_KEY,
  DAYS,
  SHIFTS,
  CAPACITY,
  MANAGER_CAPACITY,
  MANAGER_PASSWORD,
  RESET_PASSWORD,
  ADMIN_PASSWORD,
  shiftClosed,
  dayData,
  getSignups,
  getClosed,
  type ClosedMap,
} from "./lib";

function isValidDayShift(day: string, shift: string): boolean {
  return (
    (DAYS as readonly string[]).includes(day) &&
    SHIFTS.some((s) => s.id === shift)
  );
}

// A shift accepts sign-ups only if it exists and isn't currently closed.
async function isOpen(day: string, shift: string): Promise<boolean> {
  if (!isValidDayShift(day, shift)) return false;
  const closed = await getClosed();
  return !shiftClosed(closed, day, shift);
}

// -------- Volunteer sign-up (no password, plain server action) --------
export async function handleVolunteerSignup(formData: FormData) {
  const day = String(formData.get("day") ?? "");
  const shift = String(formData.get("shift") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !email) return;
  if (!(await isOpen(day, shift))) return;

  const data = await getSignups();
  const dd = dayData(data[day]);
  const sd = dd[shift];

  if (sd.volunteers.length >= CAPACITY) return; // re-verify capacity
  sd.volunteers.push({ name, email });
  data[day] = dd;

  await kv.set(KV_KEY, data);
  revalidatePath("/market");
}

// -------- Manager sign-up (requires the manager password) --------
type ManagerState = { error: string | null };

export async function handleManagerSignup(
  _prev: ManagerState,
  formData: FormData
): Promise<ManagerState> {
  const day = String(formData.get("day") ?? "");
  const shift = String(formData.get("shift") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email) return { error: "Please enter your name and email." };
  if (!isValidDayShift(day, shift)) return { error: "That shift is unavailable." };

  // Password gate — verified on the server; wrong password never saves.
  if (password.trim() !== MANAGER_PASSWORD) return { error: "Wrong password." };
  if (!(await isOpen(day, shift))) return { error: "That shift is unavailable." };

  const data = await getSignups();
  const dd = dayData(data[day]);
  const sd = dd[shift];

  if (sd.managers.length >= MANAGER_CAPACITY) {
    return { error: "Manager slots are full." };
  }
  sd.managers.push({ name, email });
  data[day] = dd;

  await kv.set(KV_KEY, data);
  revalidatePath("/market");
  return { error: null };
}

// -------- Remove one person (requires the admin password) --------
type RemoveState = { error: string | null; ok: boolean };

export async function removeSignup(
  _prev: RemoveState,
  formData: FormData
): Promise<RemoveState> {
  const day = String(formData.get("day") ?? "");
  const shift = String(formData.get("shift") ?? "");
  const role = String(formData.get("role") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const index = Number(formData.get("index"));
  const password = String(formData.get("password") ?? "");

  if (password.trim() !== ADMIN_PASSWORD) {
    return { error: "Incorrect admin password.", ok: false };
  }
  if (!isValidDayShift(day, shift)) return { error: "Invalid shift.", ok: false };
  if (role !== "volunteer" && role !== "manager") {
    return { error: "Invalid selection.", ok: false };
  }

  const data = await getSignups();
  const dd = dayData(data[day]);
  const arr = role === "manager" ? dd[shift].managers : dd[shift].volunteers;

  // Prefer the exact index, but only if the name at that index still matches
  // (guards against a concurrent change shifting positions). Otherwise fall
  // back to the first entry with the same name.
  let i =
    Number.isInteger(index) && index >= 0 && index < arr.length ? index : -1;
  if (i < 0 || arr[i]?.name !== name) {
    i = arr.findIndex((p) => p.name === name);
  }
  if (i < 0) return { error: null, ok: true }; // already gone — treat as success

  arr.splice(i, 1); // removes ONLY this person; frees exactly this one slot
  data[day] = dd;

  await kv.set(KV_KEY, data);
  revalidatePath("/market");
  return { error: null, ok: true };
}

// -------- Reset the week + set which shifts are off (admin password) --------
type ResetState = { error: string | null; ok: boolean };

export async function resetWeek(
  _prev: ResetState,
  formData: FormData
): Promise<ResetState> {
  const password = String(formData.get("password") ?? "");
  if (password.trim() !== RESET_PASSWORD) {
    return { error: "Incorrect password.", ok: false };
  }

  // Each checked "off" box arrives as "Day|shiftId".
  const offs = formData.getAll("off").map(String);
  const closed: ClosedMap = {};
  for (const o of offs) {
    const [day, shift] = o.split("|");
    if (isValidDayShift(day, shift)) {
      (closed[day] ??= {})[shift] = true;
    }
  }

  await kv.del(KV_KEY); // wipe EVERY signup — volunteers and managers alike
  await kv.set(CLOSED_KV_KEY, closed); // apply closures for the next batch
  revalidatePath("/market");
  return { error: null, ok: true };
}
