import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import config from '@/data/store-config.json';
// Always fetch the latest signup state on every request.
export const dynamic = "force-dynamic";

// ------------------------------------------------------------------
// Types & config
// ------------------------------------------------------------------
type Signup = { name: string; email: string };
type SignupData = Record<string, Signup[]>;

const KV_KEY = "store_signups";
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

const CAPACITY: number =
  (config as { capacity?: number }).capacity ?? 2;
const closedDays = config.closedDays as Record<string, boolean>;

// Read helper — tolerant of a not-yet-provisioned KV store so the page
// still renders in local dev before Vercel KV is connected.
async function getSignups(): Promise<SignupData> {
  try {
    // If reset is set to true in config, delete the key from KV immediately
    if (config.reset) {
      await kv.del(KV_KEY);
      return {};
    }
    return (await kv.get<SignupData>(KV_KEY)) ?? {};
  } catch {
    return {};
  }
}

// ------------------------------------------------------------------
// Server Action
// ------------------------------------------------------------------
async function handleSignup(formData: FormData) {
  "use server";

  const day = String(formData.get("day") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  // Validation
  if (!name || !email) return;
  if (!(DAYS as readonly string[]).includes(day)) return;
  if (closedDays[day]) return; // store is closed that day

const data = await getSignups();
  const dayList = data[day] ?? [];

  // Re-verify capacity on the server before writing.
  if (dayList.length >= CAPACITY) return;

  dayList.push({ name, email });
  data[day] = dayList;

  await kv.set(KV_KEY, data);
  revalidatePath("/market");
}

// ------------------------------------------------------------------
// Inline icons (no external icon libraries)
// ------------------------------------------------------------------
function StoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 9l1.5-4.5A2 2 0 0 1 6.4 3h11.2a2 2 0 0 1 1.9 1.5L21 9M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M3 9h18M8 21v-6h8v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V7a4 4 0 1 1 8 0v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default async function MarketPage() {
  const data = await getSignups();

  const openDays = DAYS.filter((d) => !closedDays[d]);
  const totalSlots = openDays.length * CAPACITY;
  const filledSlots = openDays.reduce(
    (sum, d) => sum + Math.min((data[d]?.length ?? 0), CAPACITY),
    0
  );

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-slate-900/60 text-purple-400 shadow-lg shadow-purple-900/20">
            <StoreIcon className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              School Store Operations
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Claim a daily volunteer shift at the Knights&apos; Market. Each day
              runs with {CAPACITY} students — pick an open slot below.
            </p>
          </div>
        </div>

        {/* Week-at-a-glance */}
        <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
          <span className="font-mono uppercase tracking-wider">
            {filledSlots}/{totalSlots} shifts filled this week
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
              style={{
                width: `${totalSlots ? (filledSlots / totalSlots) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* Day grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {DAYS.map((day) => {
          const isClosed = Boolean(closedDays[day]);
          const signups = data[day] ?? [];
          const filled = Math.min(signups.length, CAPACITY);
          const isFull = filled >= CAPACITY;

          return (
            <section
              key={day}
              className={[
                "flex flex-col rounded-2xl border p-6 shadow-2xl backdrop-blur-xl transition-all",
                isClosed
                  ? "border-slate-800 bg-slate-900/40 opacity-70"
                  : "border-slate-800 bg-slate-900/60 hover:border-purple-500/50 hover:shadow-purple-500/10",
              ].join(" ")}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold text-white">{day}</h2>
                {isClosed ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    <LockIcon className="h-3 w-3" />
                    Closed
                  </span>
                ) : isFull ? (
                  <span className="rounded-full border border-purple-500/40 bg-purple-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple-300">
                    Full ({CAPACITY}/{CAPACITY})
                  </span>
                ) : (
                  <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                    {filled}/{CAPACITY} filled
                  </span>
                )}
              </div>

              {/* Slots */}
              <ul className="mt-5 space-y-2">
                {Array.from({ length: CAPACITY }).map((_, i) => {
                  const s = signups[i];
                  if (s) {
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        <span className="truncate text-sm font-medium text-slate-100">
                          {s.name}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={i}
                      className={[
                        "flex items-center gap-2 rounded-xl border border-dashed px-3 py-2 text-sm",
                        isClosed
                          ? "border-slate-800 text-slate-600"
                          : "border-slate-700 text-slate-500",
                      ].join(" ")}
                    >
                      <span className="h-5 w-5 rounded-full border border-dashed border-slate-600" />
                      {isClosed ? "—" : "Open slot"}
                    </li>
                  );
                })}
              </ul>

              {/* Action area */}
              <div className="mt-5">
                {isClosed ? (
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2 text-sm font-medium text-slate-500"
                  >
                    Store Closed
                  </button>
                ) : isFull ? (
                  <p className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-center text-xs text-slate-500">
                    All slots filled
                  </p>
                ) : (
                  <details className="group">
                    <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-900/30 transition-all hover:from-purple-500 hover:to-indigo-500 [&::-webkit-details-marker]:hidden">
                      <PlusIcon className="h-4 w-4 transition-transform group-open:rotate-45" />
                      Sign Up
                    </summary>

                    <form action={handleSignup} className="mt-3 space-y-2">
                      <input type="hidden" name="day" value={day} />
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Full Name"
                        autoComplete="name"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2 text-sm text-white outline-none transition-colors focus:border-purple-500"
                      />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        autoComplete="email"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2 text-sm text-white outline-none transition-colors focus:border-purple-500"
                      />
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-900/30 transition-all hover:from-purple-500 hover:to-indigo-500"
                      >
                        Claim Slot
                      </button>
                    </form>
                  </details>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">
        Your email is shared only with the store managers, never shown publicly.
      </p>
    </div>
  );
}
