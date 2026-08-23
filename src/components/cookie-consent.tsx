"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "ihs-deca-cookie-consent";

/**
 * First-visit cookie notice pinned to the bottom of the screen.
 * Allow / Decline / close all simply dismiss it and remember the choice
 * so it doesn't reappear — no behavior changes either way.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[120] p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg border border-border bg-surface-1 p-4 shadow-2xl shadow-black/50 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          We use cookies to keep the site running smoothly and understand how
          it&apos;s used. You can accept or decline — either way, you&apos;re good
          to browse.
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="btn-primary h-9 px-4"
          >
            Allow
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="btn-secondary h-9 px-4"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
