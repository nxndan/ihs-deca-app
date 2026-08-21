"use client";

import { useActionState } from "react";
import { unlockCluster } from "@/app/resources/actions";

type UnlockState = { error: string | null };

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V7a4 4 0 1 1 8 0v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PasswordGate({ slug, title }: { slug: string; title: string }) {
  const [state, formAction, pending] = useActionState<UnlockState, FormData>(
    unlockCluster,
    { error: null }
  );

  return (
    <div className="mx-auto max-w-md">
      <div className="glass-edge rounded-2xl p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-purple-bright/30 bg-purple/10 text-violet-glow">
          <LockIcon />
        </span>
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This section is password-protected. Enter the {title} password to view
          these resources.
        </p>

        <form action={formAction} className="mt-6 space-y-3 text-left">
          <input type="hidden" name="slug" value={slug} />
          <input
            name="password"
            type="password"
            required
            autoFocus
            placeholder="Enter password"
            aria-label="Password"
            className="w-full rounded-xl border border-white/12 bg-[#0a0713]/70 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-purple-bright/60"
          />
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="shimmer glow-purple w-full rounded-xl bg-gradient-to-r from-purple to-magenta px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
          >
            {pending ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Don&apos;t have the password? Ask an officer or Mr. Chiles.
      </p>
    </div>
  );
}
