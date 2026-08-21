"use client";

import { useActionState } from "react";
import { handleManagerSignup } from "@/app/market/actions";

type State = { error: string | null };

const inputCls =
  "w-full rounded-lg border border-white/10 bg-[#0a0713]/70 px-3 py-1.5 text-xs text-white outline-none backdrop-blur transition-colors focus:border-purple-400/60";

export function ManagerSignup({
  day,
  shiftId,
}: {
  day: string;
  shiftId: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    handleManagerSignup,
    { error: null }
  );

  return (
    <details className="group/mgr">
      <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-purple-400/40 hover:text-white [&::-webkit-details-marker]:hidden">
        <span className="text-purple-300 transition-transform group-open/mgr:rotate-45">
          +
        </span>
        Manager sign-up
      </summary>

      <form action={formAction} className="mt-2 space-y-1.5">
        <input type="hidden" name="day" value={day} />
        <input type="hidden" name="shift" value={shiftId} />
        <input
          name="name"
          type="text"
          required
          placeholder="Full Name"
          autoComplete="name"
          className={inputCls}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          autoComplete="email"
          className={inputCls}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Manager password"
          className={inputCls}
        />
        {state.error && (
          <p className="text-[11px] font-medium text-destructive">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg border border-purple-400/30 bg-purple-400/10 px-3 py-1.5 text-xs font-semibold text-purple-100 transition-all hover:border-purple-400/60 hover:bg-purple-400/20 disabled:opacity-70"
        >
          {pending ? "Checking…" : "Add manager"}
        </button>
      </form>
    </details>
  );
}
