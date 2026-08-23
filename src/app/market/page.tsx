import {
  DAYS,
  SHIFTS,
  CAPACITY,
  MANAGER_CAPACITY,
  shiftClosed,
  dayData,
  getSignups,
  type ShiftData,
} from "./lib";
import { handleVolunteerSignup } from "./actions";
import { ManagerSignup } from "@/components/market/manager-signup";

// Always fetch the latest signup state on every request.
export const dynamic = "force-dynamic";

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
function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 4h2l2.2 11a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.5-1.2L21 7H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="20" r="1.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function shiftIcon(id: string) {
  if (id === "morning") return SunIcon;
  if (id === "afternoon") return MoonIcon;
  return CartIcon;
}

// ------------------------------------------------------------------
// Shift panel — volunteers (prominent) + managers (compact)
// ------------------------------------------------------------------
function ShiftPanel({
  day,
  shift,
  data,
  isClosed,
}: {
  day: string;
  shift: { id: string; label: string; time: string };
  data: ShiftData;
  isClosed: boolean;
}) {
  const Icon = shiftIcon(shift.id);
  const volFilled = Math.min(data.volunteers.length, CAPACITY);
  const volFull = volFilled >= CAPACITY;
  const mgrFilled = Math.min(data.managers.length, MANAGER_CAPACITY);
  const mgrFull = mgrFilled >= MANAGER_CAPACITY;

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
        ) : volFull ? (
          <span className="shrink-0 rounded-full border border-purple-400/40 bg-purple-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-purple-200">
            Full {CAPACITY}/{CAPACITY}
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
            {volFilled}/{CAPACITY}
          </span>
        )}
      </div>

      {/* Volunteer slots */}
      <ul className="mt-3 space-y-2">
        {Array.from({ length: CAPACITY }).map((_, i) => {
          const s = data.volunteers[i];
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

      {/* Volunteer action */}
      <div className="mt-3">
        {isClosed ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-[11px] text-slate-500">
            Slot closed
          </p>
        ) : volFull ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-[11px] text-slate-500">
            Shift filled
          </p>
        ) : (
          <details className="group/su">
            <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-all hover:border-purple-400/40 hover:bg-white/10 [&::-webkit-details-marker]:hidden">
              <PlusIcon className="h-4 w-4 transition-transform group-open/su:rotate-45" />
              Sign Up
            </summary>

            <form action={handleVolunteerSignup} className="mt-3 space-y-2">
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

      {/* Managers — compact / inconspicuous */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Managers
          </span>
          {!isClosed && (
            <span className="text-[10px] font-medium text-slate-500">
              {mgrFilled}/{MANAGER_CAPACITY}
            </span>
          )}
        </div>

        <ul className="mt-2 space-y-1.5">
          {Array.from({ length: MANAGER_CAPACITY }).map((_, i) => {
            const m = data.managers[i];
            if (m && !isClosed) {
              return (
                <li
                  key={i}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1"
                >
                  <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border border-purple-400/30 text-purple-300">
                    <CheckIcon className="h-2 w-2" />
                  </span>
                  <span className="truncate text-xs text-slate-400">{m.name}</span>
                </li>
              );
            }
            return (
              <li
                key={i}
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-white/[0.08] px-2.5 py-1 text-xs text-slate-600"
              >
                <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-dashed border-white/15" />
                {isClosed ? "—" : "Open manager slot"}
              </li>
            );
          })}
        </ul>

        {!isClosed && !mgrFull && (
          <div className="mt-2">
            <ManagerSignup day={day} shiftId={shift.id} />
          </div>
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
              Three shifts a day at the Knights&apos; Market —{" "}
              <span className="text-slate-300">
                {CAPACITY} volunteers + {MANAGER_CAPACITY} managers
              </span>{" "}
              per shift. Claim an open slot below.
            </p>
          </div>
        </div>
      </header>

      {/* Day cards — one per row, three shifts across on wide screens */}
      <div className="grid grid-cols-1 gap-6">
        {DAYS.map((day) => {
          const dd = dayData(data[day]);
          const dayFullyClosed = SHIFTS.every((sh) => shiftClosed(day, sh.id));

          return (
            <div key={day} className="group relative">
              {/* Card-stack layers */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-y-2 rotate-[0.6deg] rounded-3xl border border-white/5 bg-[#140a28]/30 transition-transform duration-300 group-hover:translate-y-3 group-hover:rotate-[1.2deg]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-y-1 -rotate-[0.5deg] rounded-3xl border border-white/5 bg-[#140a28]/45 transition-transform duration-300 group-hover:translate-y-2 group-hover:-rotate-[1deg]"
              />

              {/* Main card */}
              <section
                className={[
                  "@container relative flex flex-col rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300",
                  dayFullyClosed
                    ? "border-white/10 bg-[#140a28]/55 opacity-70"
                    : "border-white/10 bg-[#140a28]/70 group-hover:border-purple-400/40 group-hover:shadow-[0_24px_60px_-24px_rgba(168,85,247,0.5)]",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-white">{day}</h2>
                  {dayFullyClosed && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      <LockIcon className="h-3 w-3" />
                      Closed
                    </span>
                  )}
                </div>

                {/* Shifts */}
                <div className="mt-4 grid gap-3 @md:grid-cols-2 @2xl:grid-cols-3">
                  {SHIFTS.map((sh) => (
                    <ShiftPanel
                      key={sh.id}
                      day={day}
                      shift={sh}
                      data={dd[sh.id]}
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
