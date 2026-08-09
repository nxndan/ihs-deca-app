"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Primary navigation destinations. Add new sections here as the app grows. */
const NAV_LINKS = [
  { href: "/", label: "Announcements" },
  { href: "/menu", label: "Menu" },
  { href: "/rec", label: "Chiles Rec" },
  { href: "/market", label: "Store Signups" },
  { href: "/resources", label: "Resources" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-x-0 border-t-0">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Brand / logo area */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            {/* Independence HS knight logo */}
            <img
              src="/ihs-knight.png"
              alt="IHS DECA"
              className="h-10 w-auto drop-shadow-[0_0_12px_rgba(168,85,247,0.55)] transition-transform duration-300 group-hover:scale-110"
            />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-base font-bold tracking-tight text-foreground">
                IHS <span className="text-gradient-brand">DECA</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Independence HS
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {/* Glowing gradient underline (purple -> fuchsia). */}
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-purple-bright to-magenta transition-all duration-300",
                        active
                          ? "opacity-100 shadow-[0_0_12px_var(--color-purple-bright)]"
                          : "opacity-0 group-hover:opacity-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-white/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu panel */}
        {open && (
          <div className="border-t border-white/10 md:hidden">
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
              {NAV_LINKS.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "glow-purple bg-white/5 text-foreground"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Neon hairline under the bar */}
      <div className="brand-hairline" />
    </header>
  );
}
