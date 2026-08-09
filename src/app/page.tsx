import { CalendarClock, Megaphone } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Welcome to IHS DECA!",
    date: "August 2026",
    content:
      "Welcome to our official app! Check back here for updates on meetings, competitions, and store news.",
  },
  {
    id: 2,
    title: "First Chapter Meeting",
    date: "Upcoming",
    content:
      "Join us in the auditorium next Tuesday after school to kick off the new DECA season.",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-20 text-center sm:px-10 sm:py-28">
        {/* inner glow wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,color-mix(in_oklch,var(--color-purple)_45%,transparent),transparent_70%)]"
        />

        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <h1 className="font-heading text-6xl font-bold leading-[1.02] tracking-tight sm:text-8xl">
            <span className="text-gradient-brand text-glow-purple">IHS DECA</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Announcements, menu, rec forms, store signups, and competition
            resources — everything our chapter needs, in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#announcements"
              className="shimmer glow-purple inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple to-magenta px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              <Megaphone className="h-4 w-4" />
              View Announcements
            </a>
            <a
              href="/resources"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-purple-bright/50 hover:bg-white/5"
            >
              Competition Resources
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Announcements ---------- */}
      <section id="announcements" className="scroll-mt-24 space-y-6">
        <header className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground ring-1 ring-purple-bright/30">
            <Megaphone className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight">
              Announcements Bulletin
            </h2>
            <p className="text-sm text-muted-foreground">
              Latest news and important updates for IHS DECA members.
            </p>
          </div>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          {announcements.map((item) => (
            <article key={item.id} className="card-glow group p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-heading text-lg font-semibold leading-snug">
                  {item.title}
                </h3>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-purple-bright/30 bg-purple/10 px-2.5 py-1 font-mono text-xs text-violet-glow">
                  <CalendarClock className="h-3 w-3" />
                  {item.date}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
