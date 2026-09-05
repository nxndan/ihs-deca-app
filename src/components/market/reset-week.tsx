"use client";

import { useActionState, useEffect, useState } from "react";
import { resetWeek } from "@/app/market/actions";

type ResetState = { error: string | null; ok: boolean };
type Shift = { id: string; label: string; time: string };
type ClosedMap = Record<string, Record<string, boolean>>;

function ResetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3.5 12a8.5 8.5 0 1 1 2.6 6.1M3.5 18v-4h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResetWeekButton({
  days,
  shifts,
  closed,
}: {
  days: string[];
  shifts: Shift[];
  closed: ClosedMap;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<ResetState, FormData>(
    resetWeek,
    { error: null, ok: false }
  );

  useEffect(() => {
    if (state.ok) setOpen(false);
  }, [state.ok]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur transition-colors hover:border-red-400/40 hover:text-white"
      >
        <ResetIcon className="h-4 w-4" />
        Reset week
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[95] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Reset week"
        >
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
          />
          <div className="animate-modal-in relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#140a28]/95 backdrop-blur-xl">
            <div className="border-b border-white/10 p-5">
              <h2 className="text-lg font-bold tracking-tight text-white">
                Reset week & set shifts
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Saving clears <span className="text-slate-200">every signup</span>{" "}
                (volunteers and managers) and turns off the highlighted shifts for
                the next batch. Tap a shift to toggle it off.
              </p>
            </div>

            <form
              action={formAction}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-5">
                {days.map((day) => (
                  <div
                    key={day}
                    className="flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-semibold text-white">
                      {day}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {shifts.map((s) => (
                        <label
                          key={s.id}
                          className="cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            name="off"
                            value={`${day}|${s.id}`}
                            defaultChecked={Boolean(closed[day]?.[s.id])}
                            className="peer sr-only"
                          />
                          <span className="inline-flex items-center rounded-lg border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors peer-checked:border-red-400/50 peer-checked:bg-red-400/15 peer-checked:text-red-200 peer-hover:border-white/25 peer-focus-visible:ring-2 peer-focus-visible:ring-purple-400/50">
                            {s.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="pt-1 text-[11px] text-slate-500">
                  <span className="inline-block rounded border border-red-400/50 bg-red-400/15 px-1.5 py-0.5 text-red-200">
                    Highlighted
                  </span>{" "}
                  = turned off. Everything else is open.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 p-5">
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Reset password"
                  aria-label="Reset password"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0713]/70 px-4 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-purple-400/60"
                />
                {state.error && (
                  <p className="text-[11px] font-medium text-red-300">
                    {state.error}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={pending}
                    className="flex-1 rounded-xl border border-red-400/40 bg-red-400/15 px-4 py-2 text-sm font-semibold text-red-100 transition-colors hover:bg-red-400/25 disabled:opacity-70"
                  >
                    {pending ? "Saving…" : "Clear & save changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
