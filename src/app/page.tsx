import { TypedTitle } from "@/components/typed-title";
import { Announcements, type Announcement } from "@/components/announcements";
import { CalendarButton } from "@/components/calendar-button";

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Welcome to IHS DECA!",
    date: "August 2026",
    summary:
      "Welcome to our official app — meeting times, competition dates, and store news will all live right here.",
    body: `Welcome to the official IHS DECA app!

This is home base for the chapter this year. We'll post meeting reminders, competition registration deadlines, conference travel details, and school store updates here as they happen.

Bookmark the page and check back often — the newest announcements always sit at the top. If you're new to DECA, introduce yourself at the next meeting and grab a member handbook.

Let's make it a great season, Knights.`,
  },
  {
    id: 2,
    title: "First Chapter Meeting",
    date: "Upcoming",
    summary:
      "We kick off the season in the auditorium next Tuesday right after school — everyone welcome.",
    body: `Our first chapter meeting of the year is next Tuesday in the auditorium, right after the final bell.

On the agenda: an overview of the competitive events, the conference calendar, officer introductions, and how the school store works this year. We'll also hand out membership forms and answer any questions about getting started.

No experience needed and no commitment required to come check it out — bring a friend. Snacks will be provided.`,
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* ---------- Hero ---------- */}
      <section className="glass-edge relative overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-10 sm:py-28">
        {/* crisp neon top edge line */}
        <div
          aria-hidden="true"
          className="brand-hairline-anim absolute inset-x-10 top-0"
        />

        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <h1 className="font-heading text-6xl font-bold leading-[1.02] tracking-tight sm:text-8xl">
            <TypedTitle
              text="IHS DECA"
              textClassName="text-gradient-brand text-glow-purple"
            />
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Announcements, menu, rec forms, store signups, and competition
            resources — everything our chapter needs, in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CalendarButton />
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
      <Announcements items={announcements} />
    </div>
  );
}
