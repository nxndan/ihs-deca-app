"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RESOURCE_MENU } from "@/data/resources";

/** Primary navigation destinations. */
const NAV_LINKS = [
  { href: "/", label: "Announcements" },
  { href: "/menu", label: "Menu" },
  { href: "/rec", label: "LOR Request" },
  { href: "/market", label: "Store Signups" },
  { href: "/resources", label: "Resources" },
  { href: "/precomp", label: "Precomp" },
] as const;

/** "Other" dropdown destinations. */
const OTHER_LINKS = [
  { href: "/other/dress-code", label: "Dress Code" },
  { href: "/other/expectations", label: "Expectations" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Underline({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-x-3 -bottom-px h-0.5 bg-royal transition-opacity duration-150",
        active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
      )}
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface-1">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <img
            src="/ihs-knight.png"
            alt="IHS DECA"
            className="h-9 w-auto transition-opacity duration-150 group-hover:opacity-80"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-foreground">
              IHS DECA
            </span>
            <span className="eyebrow mt-1 text-[9px] tracking-[0.24em]">
              Independence HS
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);

            // Resources gets a hover mega-menu.
            if (link.href === "/resources") {
              return (
                <li key={link.href} className="group/res relative">
                  <Link
                    href="/resources"
                    className={cn(
                      "group relative flex items-center px-3 py-2 text-sm transition-colors duration-150",
                      active
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <Underline active={active} />
                  </Link>

                  {/* Dropdown */}
                  <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-opacity duration-150 group-hover/res:visible group-hover/res:opacity-100">
                    <div className="w-[520px] rounded-lg border border-border bg-surface-1 p-2 shadow-2xl shadow-black/40">
                      <div className="grid grid-cols-2 gap-1">
                        {RESOURCE_MENU.map((c) => (
                          <div
                            key={c.slug}
                            className="rounded-md p-3 transition-colors hover:bg-surface-2"
                          >
                            <Link
                              href={`/resources/${c.slug}`}
                              className="block text-sm font-semibold text-foreground"
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
                    "group relative px-3 py-2 text-sm transition-colors duration-150",
                    active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  <Underline active={active} />
                </Link>
              </li>
            );
          })}

          {/* Other — hover dropdown */}
          <li className="group/other relative">
            <button
              type="button"
              aria-haspopup="true"
              className={cn(
                "group relative flex items-center gap-1 px-3 py-2 text-sm transition-colors duration-150",
                isActive(pathname, "/other")
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Other
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              <Underline active={isActive(pathname, "/other")} />
            </button>

            <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-opacity duration-150 group-hover/other:visible group-hover/other:opacity-100 group-focus-within/other:visible group-focus-within/other:opacity-100">
              <div className="w-52 rounded-lg border border-border bg-surface-1 p-1.5 shadow-2xl shadow-black/40">
                {OTHER_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md text-foreground transition-colors hover:bg-surface-2 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-0.5 px-5 py-3 sm:px-6">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-surface-2 font-medium text-foreground"
                        : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* Resource sub-links on mobile */}
                  {link.href === "/resources" && (
                    <div className="mb-1 ml-3 mt-1 space-y-2 border-l border-border pl-3">
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

            {/* Other section on mobile */}
            <li>
              <span className="block px-3 py-2.5 text-sm font-medium text-foreground">
                Other
              </span>
              <div className="mb-1 ml-3 mt-1 space-y-1 border-l border-border pl-3">
                {OTHER_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
