"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { cookieName, passwordMatches } from "./_lib";

type UnlockState = { error: string | null };

export async function unlockCluster(
  _prev: UnlockState,
  formData: FormData
): Promise<UnlockState> {
  const slug = String(formData.get("slug") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!slug) return { error: "Something went wrong. Please try again." };
  if (!password.trim()) return { error: "Please enter the password." };

  if (!passwordMatches(slug, password)) {
    return { error: "Incorrect password. Please try again." };
  }

  const jar = await cookies();
  jar.set(cookieName(slug), "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  revalidatePath(slug === "precomp" ? "/precomp" : `/resources/${slug}`);
  return { error: null };
}
