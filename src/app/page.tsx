import Link from "next/link";
import { Announcements, type Announcement } from "@/components/announcements";
import { MembershipButton } from "@/components/membership-button";

const announcements: Announcement[] = [
  {
    id: 1,
    title: "First Chapter Meeting",
    date: "08/26/2026",
    summary:
      "Our first chapter meeting will be after school on Wednsday August 26 2026 in the cafeteria.",
    body: `Our first chapter meeting will be after school on Wednsday August 26 2026 in the cafeteria. 
    Join us for general information on DECA, precomp, the school store, and much more! 
    Bring your friends, everyone is welcome. We can't wait to see you there!`,
  },
  {
    id: 2,
    title: "The Rumble",
    date: "08/08/2026",
    summary:
      "Catch IHS DECA at the Rumble this Saturday from 8 am to 11 am! Stop by our booth for information on competition this year!",
    body: `Catch IHS DECA at the Rumble this Saturday from 8 am to 11 am! Stop by our booth for information on competition this year,
    some cold drinks from the Knights Market, and a fun game of cornhole for a chance to win a free IHS DECA t-shirt!`,
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
            Welcome to the award-winning IndyDECA chapter website! Established in 2014, 
            Independence DECA has grown to 400+ members, sending 100+ to SCDC, and 30+ to ICDC
            with multiple top 10 finishes. This site was built as a home for the chapter's members,
            officers, and decorated, gold certified Knights Market.   
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
