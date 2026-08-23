"use client";

import { useEffect, useState } from "react";
import { UserPlus, X, ExternalLink } from "lucide-react";

const FORM_URL =
  "https://docs.google.com/forms/d/1ayR0sQACfgjREPAWQ1S-uKGYnplhchijzd03gHYklgc/viewform";
const EMBED_URL = `${FORM_URL}?embedded=true`;

export function MembershipButton() {
  const [open, setOpen] = useState(false);

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
        className="shimmer glow-purple inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple to-magenta px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
      >
        <UserPlus className="h-4 w-4" />
        Become a Member
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Membership form"
        >
          {/* Backdrop */}
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
          />

          {/* Panel */}
          <div className="animate-modal-in glass-edge relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
              <h2 className="font-heading text-lg font-bold tracking-tight">
                Membership Form
              </h2>
              <div className="flex items-center gap-2">
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-purple-bright/40 hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in new tab
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded Google Form */}
            <div className="min-h-0 flex-1 bg-white">
              <iframe
                src={EMBED_URL}
                title="IHS DECA Membership Form"
                className="h-[70vh] w-full"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
