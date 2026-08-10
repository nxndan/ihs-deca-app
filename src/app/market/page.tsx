import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import config from "@/data/store-config.json";

// Always fetch the latest signup state on every request.
export const dynamic = "force-dynamic";

// ------------------------------------------------------------------
// Types & config
// ------------------------------------------------------------------
type Signup = { name: string; email: string };
type ShiftId = "morning" | "afternoon";
type DayData = Record<ShiftId, Signup[]>;
// Stored value may be a DayData object, or (legacy) a flat array.
type SignupData = Record<string, DayData | Signup[]>;

const KV_KEY = "store_signups";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

// Per-shift capacity (2 morning + 2 afternoon = 4 per day).
const CAPACITY: number = (config as { capacity?: number }).capacity ?? 2;
const SHIFTS = config.shifts as { id: ShiftId; label: string; time: string }[];
// Closures are per shift now: closed[day][shift] === true disables just that slot.
const closed = config.closed as Record<string, Partial<Record<ShiftId, boolean>>>;

function shiftClosed(day: string, shift: ShiftId): boolean {
  return Boolean(closed[day]?.[shift]);
}

// Bento spans — three medium tiles on top, two wide tiles below.
const SPAN: Record<string, string> = {
  Monday: "lg:col-span-2",
  Tuesday: "lg:col-span-2",
  Wednesday: "lg:col-span-2",
  Thursday: "lg:col-span-3",
  Friday: "lg:col-span-3",
};

// Normalize whatever is stored for a day into { morning, afternoon }.
function dayData(raw: unknown): DayData {
  if (Array.isArray(raw)) return { morning: raw as Signup[], afternoon: [] };
  const o = (raw ?? {}) as Partial<DayData>;
  return { morning: o.morning ?? [], afternoon: o.afternoon ?? [] };
}

// Read helper — tolerant of a not-yet-provisioned KV store so the page
// still renders in local dev before Vercel KV is connected.
async function getSignups(): Promise<SignupData> {
  try {
    // If reset is set to true in config, delete the key from KV immediately.
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
  const shift = String(formData.get("shift") ?? "") as ShiftId;
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  // Validation
  if (!name || !email) return;
  if (!(DAYS as readonly string[]).includes(day)) return;
  if (shift !== "morning" && shift !== "afternoon") return;
  if (shiftClosed(day, shift)) return; // this specific slot is closed

  const data = await getSignups();
  const dd = dayData(data[day]);

  // Re-verify this specific shift isn't full before writing.
  if (dd[shift].length >= CAPACITY) return;

  dd[shift].push({ name, email });
  data[day] = dd;

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
function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ------------------------------------------------------------------
// Shift panel
// ------------------------------------------------------------------
function ShiftPanel({
  day,
  shift,
  list,
  isClosed,
}: {
  day: string;
  shift: { id: ShiftId; label: string; time: string };
  list: Signup[];
  isClosed: boolean;
}) {
  const filled = Math.min(list.length, CAPACITY);
  const isFull = filled >= CAPACITY;
  const Icon = shift.id === "morning" ? SunIcon : MoonIcon;

  return (
    <div
      className={[
        "flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur",
        isClosed ? "opacity-60" : "",
      ].join(" ")}
    >
      {/* Shift header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
            <Icon className="h-4 w-4 shrink-0 text-purple-300" />
            {shift.label}
          </div>
          <div className="mt-0.5 whitespace-nowrap font-mono text-[11px] text-slate-400">
            {shift.time}
          </div>
        </div>
        {isClosed ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            <LockIcon className="h-3 w-3" />
            Closed
          </span>
        ) : isFull ? (
          <span className="shrink-0 rounded-full border border-purple-400/40 bg-purple-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-purple-200">
            Full {CAPACITY}/{CAPACITY}
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
            {filled}/{CAPACITY}
          </span>
        )}
      </div>

      {/* Slots */}
      <ul className="mt-3 space-y-2">
        {Array.from({ length: CAPACITY }).map((_, i) => {
          const s = list[i];
          if (s && !isClosed) {
            return (
              <li
                key={i}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-purple-400/40 bg-purple-400/10 text-purple-200">
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
              className="flex items-center gap-2 rounded-xl border border-dashed border-white/10 px-3 py-2 text-sm text-slate-500"
            >
              <span className="h-5 w-5 shrink-0 rounded-full border border-dashed border-white/20" />
              {isClosed ? "—" : "Open slot"}
            </li>
          );
        })}
      </ul>

      {/* Action */}
      <div className="mt-3">
        {isClosed ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-[11px] text-slate-500">
            Slot closed
          </p>
        ) : isFull ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-[11px] text-slate-500">
            Shift filled
          </p>
        ) : (
          <details className="group/su">
            <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-all hover:border-purple-400/40 hover:bg-white/10 [&::-webkit-details-marker]:hidden">
              <PlusIcon className="h-4 w-4 transition-transform group-open/su:rotate-45" />
              Sign Up
            </summary>

            <form action={handleSignup} className="mt-3 space-y-2">
              <input type="hidden" name="day" value={day} />
              <input type="hidden" name="shift" value={shift.id} />
              <input
                name="name"
                type="text"
                required
                placeholder="Full Name"
                autoComplete="name"
                className="w-full rounded-xl border border-white/10 bg-[#0a0713]/70 px-4 py-2 text-sm text-white outline-none backdrop-blur transition-colors focus:border-purple-400/60"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-[#0a0713]/70 px-4 py-2 text-sm text-white outline-none backdrop-blur transition-colors focus:border-purple-400/60"
              />
              <button
                type="submit"
                className="w-full rounded-xl border border-purple-400/30 bg-purple-400/10 px-4 py-2 text-sm font-semibold text-purple-100 backdrop-blur transition-all hover:border-purple-400/60 hover:bg-purple-400/20"
              >
                Claim Slot
              </button>
            </form>
          </details>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default async function MarketPage() {
  const data = await getSignups();

  const openShiftSlots = (day: string) =>
    SHIFTS.filter((sh) => !shiftClosed(day, sh.id)).length * CAPACITY;

  const totalSlots = DAYS.reduce((s, d) => s + openShiftSlots(d), 0);
  const filledSlots = DAYS.reduce((sum, d) => {
    const dd = dayData(data[d]);
    return (
      sum +
      SHIFTS.filter((sh) => !shiftClosed(d, sh.id)).reduce(
        (a, sh) => a + Math.min(dd[sh.id].length, CAPACITY),
        0
      )
    );
  }, 0);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-purple-300 backdrop-blur">
            <StoreIcon className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              School Store Operations
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Two shifts a day at the Knights&apos; Market —{" "}
              <span className="text-slate-300">{CAPACITY} morning</span> &amp;{" "}
              <span className="text-slate-300">{CAPACITY} afternoon</span>{" "}
              volunteers. Claim an open slot below.
            </p>
          </div>
        </div>

        {/* Week-at-a-glance */}
        <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
          <span className="font-mono uppercase tracking-wider">
            {filledSlots}/{totalSlots} shifts filled this week
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-violet-400/80 transition-all"
              style={{
                width: `${totalSlots ? (filledSlots / totalSlots) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* Bento day grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
        {DAYS.map((day) => {
          const dd = dayData(data[day]);
          const closedFlags = SHIFTS.map((sh) => shiftClosed(day, sh.id));
          const dayFullyClosed = closedFlags.every(Boolean);
          const openShifts = SHIFTS.filter((sh) => !shiftClosed(day, sh.id));
          const perDayOpen = openShifts.length * CAPACITY;
          const dayFilled = openShifts.reduce(
            (a, sh) => a + Math.min(dd[sh.id].length, CAPACITY),
            0
          );

          return (
            <div key={day} className={`group relative ${SPAN[day] ?? ""}`}>
              {/* Card-stack layers */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-y-2 rotate-[1.4deg] rounded-3xl border border-white/5 bg-[#140a28]/30 transition-transform duration-300 group-hover:translate-y-3.5 group-hover:rotate-[2.6deg]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-y-1 -rotate-[1deg] rounded-3xl border border-white/5 bg-[#140a28]/45 transition-transform duration-300 group-hover:translate-y-2 group-hover:-rotate-[2deg]"
              />

              {/* Main card */}
              <section
                className={[
                  "relative flex flex-col rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 @container",
                  dayFullyClosed
                    ? "border-white/10 bg-[#140a28]/55 opacity-70"
                    : "border-white/10 bg-[#140a28]/70 group-hover:-translate-y-1 group-hover:border-purple-400/40 group-hover:shadow-[0_24px_60px_-24px_rgba(168,85,247,0.5)]",
                ].join(" ")}
              >
                {/* Day header */}
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-white">{day}</h2>
                  {dayFullyClosed ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      <LockIcon className="h-3 w-3" />
                      Closed
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                      {dayFilled}/{perDayOpen} filled
                    </span>
                  )}
                </div>

                {/* Two shifts — stack on narrow cards, side-by-side on wide ones */}
                <div className="mt-4 grid gap-3 @md:grid-cols-2">
                  {SHIFTS.map((sh) => (
                    <ShiftPanel
                      key={sh.id}
                      day={day}
                      shift={sh}
                      list={dd[sh.id]}
                      isClosed={shiftClosed(day, sh.id)}
                    />
                  ))}
                </div>
              </section>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">
        Your email is shared only with the store managers, never shown publicly.
      </p>
    </div>
  );
}
