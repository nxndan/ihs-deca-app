"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Full-screen loading screen shown on every route change for at least one
 * second: the Knights mark centered with "loading" beneath it. Skips the very
 * first render so it doesn't flash on initial page load.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setVisible(true);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="route-loader fixed inset-0 z-[200] grid place-items-center bg-background"
    >
      <div className="flex flex-col items-center gap-5">
        <img
          src="/ihs-knight.png"
          alt="IHS DECA"
          className="route-loader__mark h-20 w-auto sm:h-24"
        />
        <p className="loading-dots text-sm tracking-[0.35em] text-muted-foreground">
          loading
        </p>
      </div>
    </div>
  );
}
