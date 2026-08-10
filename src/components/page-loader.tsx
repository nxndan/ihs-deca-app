"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen loading overlay: the DECA diamond spins over an
 * indeterminate bar until the page's assets finish loading, then
 * fades out. Has a minimum on-screen time (so it doesn't flash) and
 * a hard cap (so it never hangs).
 */
export function PageLoader() {
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const MIN_MS = 900;
    const CAP_MS = 4000;

    const finish = () => {
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const wait = Math.max(0, MIN_MS - (now - start));
      window.setTimeout(() => setDone(true), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    const cap = window.setTimeout(finish, CAP_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(cap);
    };
  }, []);

  // Unmount after the fade-out completes.
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setRemoved(true), 600);
    return () => window.clearTimeout(t);
  }, [done]);

  useEffect(() => {
    // Lock scroll while the loader is visible.
    document.body.style.overflow = removed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [removed]);

  if (removed) return null;

  return (
    <div
      aria-hidden={done}
      role="status"
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-7">
        <img
          src="/deca-diamond.png"
          alt="Loading"
          className="h-16 w-16 animate-spin [animation-duration:1.4s]"
        />
        <div className="h-1 w-52 overflow-hidden rounded-full bg-white/10">
          <div className="loader-bar h-full w-2/3 rounded-full bg-gradient-to-r from-purple to-magenta" />
        </div>
        <span className="font-heading text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
          Loading
        </span>
      </div>
    </div>
  );
}
