"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RESOURCE_MENU } from "@/data/resources";

/** Primary navigation destinations. */
const NAV_LINKS = [
  { href: "/", label: "Announcements" },
  { href: "/menu", label: "Menu" },
  { href: "/rec", label: "LOR Request" },
  { href: "/market", label: "Store Signups" },
  { href: "/resources", label: "Resources" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Underline({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-purple-bright to-magenta transition-all duration-300",
        active
          ? "opacity-100 shadow-[0_0_12px_var(--color-purple-bright)]"
          : "opacity-0 group-hover:opacity-100"
      )}
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-x-0 border-t-0">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
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

              // Resources gets a hover mega-menu.
              if (link.href === "/resources") {
                return (
                  <li key={link.href} className="group/res relative">
                    <Link
                      href="/resources"
                      className={cn(
                        "group relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                      <Underline active={active} />
                    </Link>

                    {/* Dropdown */}
                    <div className="invisible absolute right-0 top-full z-50 pt-3 opacity-0 transition-all duration-150 group-hover/res:visible group-hover/res:opacity-100">
                      <div className="glass w-[520px] rounded-2xl p-3 shadow-2xl">
                        <div className="grid grid-cols-2 gap-1.5">
                          {RESOURCE_MENU.map((c) => (
                            <div
                              key={c.slug}
                              className="rounded-xl p-3 transition-colors hover:bg-white/5"
                            >
                              <Link
                                href={`/resources/${c.slug}`}
                                className="block font-heading text-sm font-semibold text-foreground transition-colors hover:text-violet-glow"
                              >
                                {c.title}
                              </Link>
                              <div className="mt-2 flex flex-col gap-1">
                                {c.subtabs.map((s) => (
                                  <Link
                                    key={s.id}
                                    href={`/resources/${c.slug}?sub=${s.id}`}
                                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    {s.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

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
                    <Underline active={active} />
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

        {/* Mobile menu */}
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

                    {/* Resource sub-links on mobile */}
                    {link.href === "/resources" && (
                      <div className="mb-1 ml-3 mt-1 space-y-2 border-l border-white/10 pl-3">
                        {RESOURCE_MENU.map((c) => (
                          <div key={c.slug}>
                            <Link
                              href={`/resources/${c.slug}`}
                              onClick={() => setOpen(false)}
                              className="block py-1 text-xs font-semibold text-foreground/90"
                            >
                              {c.title}
                            </Link>
                            <div className="ml-2 flex flex-col">
                              {c.subtabs.map((s) => (
                                <Link
                                  key={s.id}
                                  href={`/resources/${c.slug}?sub=${s.id}`}
                                  onClick={() => setOpen(false)}
                                  className="py-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  {s.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
