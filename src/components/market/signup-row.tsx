"use client";

import { useActionState, useEffect, useState } from "react";
import { removeSignup } from "@/app/market/actions";

type RemoveState = { error: string | null; ok: boolean };

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SignupRow({
  day,
  shift,
  shiftLabel,
  role,
  index,
  name,
  variant,
}: {
  day: string;
  shift: string;
  shiftLabel: string;
  role: "volunteer" | "manager";
  index: number;
  name: string;
  variant: "volunteer" | "manager";
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<RemoveState, FormData>(
    removeSignup,
    { error: null, ok: false }
  );

  // Close the modal once a removal succeeds.
  useEffect(() => {
    if (state.ok) setOpen(false);
  }, [state.ok]);

  // Escape to close + lock background scroll while open.
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

  const isMgr = variant === "manager";

  return (
    <li
      className={
        isMgr
          ? "group/row relative flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1"
          : "group/row relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2"
      }
    >
      <span
        className={
          isMgr
            ? "grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border border-purple-400/30 text-purple-300"
            : "grid h-5 w-5 shrink-0 place-items-center rounded-full border border-purple-400/40 bg-purple-400/10 text-purple-200"
        }
      >
        <CheckIcon className={isMgr ? "h-2 w-2" : "h-3 w-3"} />
      </span>
      <span
        className={
          isMgr
            ? "truncate text-xs text-slate-400"
            : "truncate text-sm font-medium text-slate-100"
        }
      >
        {name}
      </span>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Remove ${name}`}
        className="ml-auto grid shrink-0 place-items-center rounded-md p-1 text-slate-500 opacity-0 transition-all hover:bg-red-400/15 hover:text-red-200 focus-visible:opacity-100 group-hover/row:opacity-100"
      >
        <XIcon className={isMgr ? "h-3 w-3" : "h-3.5 w-3.5"} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[95] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Remove ${name}`}
        >
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
          />
          <div className="animate-modal-in relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-[#140a28]/95 p-6 text-left backdrop-blur-xl">
            <h2 className="text-base font-semibold text-white">
              Remove {name}?
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Removes {name} from{" "}
              <span className="text-slate-300">
                {day} · {shiftLabel}
              </span>{" "}
              only, freeing that one slot. Enter the admin password to confirm.
            </p>

            <form action={formAction} className="mt-4 space-y-3">
              <input type="hidden" name="day" value={day} />
              <input type="hidden" name="shift" value={shift} />
              <input type="hidden" name="role" value={role} />
              <input type="hidden" name="index" value={index} />
              <input type="hidden" name="name" value={name} />
              <input
                name="password"
                type="password"
                required
                autoFocus
                placeholder="Admin password"
                aria-label="Admin password"
                className="w-full rounded-xl border border-white/10 bg-[#0a0713]/70 px-4 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-purple-400/60"
              />
              {state.error && (
                <p className="text-[11px] font-medium text-red-300">
                  {state.error}
                </p>
              )}
              <div className="flex gap-2 pt-1">
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
                  {pending ? "Removing…" : "Remove"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </li>
  );
}
