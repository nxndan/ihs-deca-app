import Link from "next/link";
import { Announcements, type Announcement } from "@/components/announcements";
import { MembershipButton } from "@/components/membership-button";

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
    <div className="space-y-20">
      {/* ---------- Hero ---------- */}
      <section className="grid items-center gap-8 pt-4 sm:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
        <div>
          <p className="eyebrow">Independence High School · Frisco, Texas</p>

          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            IHS DECA
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Announcements, the Knights&apos; Market menu, recommendation
            requests, store sign-ups, and competition resources — everything our
            chapter needs, in one place.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MembershipButton />
            <Link href="/resources" className="btn-secondary h-11 px-5">
              Competition Resources
            </Link>
          </div>
        </div>

        {/* IHS Knights emblem. */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/hero-knight.png"
            alt="IHS DECA Knights"
            className="pointer-events-none w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[400px]"
          />
        </div>
      </section>

      {/* ---------- Announcements ---------- */}
      <Announcements items={announcements} />
    </div>
  );
}
