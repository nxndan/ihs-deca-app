import Link from "next/link";
import { Mail, Globe } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { href: "/", label: "Announcements" },
  { href: "/menu", label: "Menu" },
  { href: "/rec", label: "LOR Request" },
  { href: "/market", label: "Store Signups" },
  { href: "/resources", label: "Resources" },
] as const;

const SOCIALS = [
  { href: "#", label: "Instagram", icon: InstagramIcon },
  { href: "#", label: "Email", icon: Mail },
  { href: "#", label: "Website", icon: Globe },
];
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20">
      {/* Neon hairline above the footer */}
      <div className="brand-hairline" />

      <div className="glass border-x-0 border-b-0">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/ihs-knight.png"
                  alt="IHS DECA"
                  className="h-11 w-auto drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                />
                <span className="font-heading text-base font-bold tracking-tight">
                  IHS <span className="text-gradient-brand">DECA</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Independence High School DECA — preparing emerging leaders and
                entrepreneurs in marketing, finance, hospitality, and management.
              </p>

              {/* Social links */}
              <div className="mt-5 flex items-center gap-2">
                {SOCIALS.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:text-white hover:glow-purple"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sponsors slot */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Our Sponsors
              </h3>
              {/* Placeholder tiles — replace with sponsor / chapter logos later. */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="grid h-14 place-items-center rounded-lg border border-dashed border-purple-bright/20 bg-white/[0.02] text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70"
                  >
                    Logo
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {year} Independence High School DECA. All rights reserved.</p>
            <p>Built by the IHS DECA chapter.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
