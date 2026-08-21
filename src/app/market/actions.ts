"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import {
  KV_KEY,
  DAYS,
  SHIFTS,
  CAPACITY,
  MANAGER_CAPACITY,
  MANAGER_PASSWORD,
  shiftClosed,
  dayData,
  getSignups,
} from "./lib";

function validTarget(day: string, shift: string): boolean {
  return (
    (DAYS as readonly string[]).includes(day) &&
    SHIFTS.some((s) => s.id === shift) &&
    !shiftClosed(day, shift)
  );
}

// -------- Volunteer sign-up (no password, plain server action) --------
export async function handleVolunteerSignup(formData: FormData) {
  const day = String(formData.get("day") ?? "");
  const shift = String(formData.get("shift") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !email) return;
  if (!validTarget(day, shift)) return;

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
  if (!validTarget(day, shift)) return { error: "That shift is unavailable." };

  // Password gate — verified on the server; wrong password never saves.
  if (password.trim() !== MANAGER_PASSWORD) return { error: "Wrong password." };

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
