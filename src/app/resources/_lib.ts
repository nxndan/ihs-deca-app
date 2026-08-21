import "server-only";
import { cookies } from "next/headers";

// Cluster passwords live ONLY on the server and are never sent to the client.
const PASSWORDS: Record<string, string> = {
  "general-roleplays": "indyroleplays",
  "principles-roleplays": "indyprinc",
  "prepared-events": "indywritten",
  "online-events": "indyvirtual",
};

export function cookieName(slug: string) {
  return `ra_${slug}`;
}

export function passwordMatches(slug: string, password: string): boolean {
  const expected = PASSWORDS[slug];
  return Boolean(expected) && password.trim() === expected;
}

export async function isUnlocked(slug: string): Promise<boolean> {
  const jar = await cookies();
  return jar.get(cookieName(slug))?.value === "1";
}
