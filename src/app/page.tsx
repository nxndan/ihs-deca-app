import Link from "next/link";
import { Announcements, type Announcement } from "@/components/announcements";
import { MembershipButton } from "@/components/membership-button";

const announcements: Announcement[] = [
    {
    id: 1,
    title: "First Chapter Meeting SLIDES",
    date: "08/26/2026",
    summary:
      "Slides from our first chapter meeting! https://canva.link/po68hjvh3effem3",
    body: `In case you didn't make it to our first chapter meeting, here are the meeting slides! Read through them fully, they have some very important info! https://canva.link/po68hjvh3effem3`,
  },
  {
    id: 2,
    title: "Pre-Comp Testing",
    date: "09/14/2026",
    summary:
      "Pre-comp testing takes place September 14th, 5-7:30 PM in the cafeteria, mark your calendars!",
    body: "Pre-comp testing takes place September 14th, 5-7:30 PM in the cafeteria, mark your calendars!",
  },
    {
    id: 3,
    title: "T-Shirt Design Contest",
    date: "09/20/2026",
    summary:
      "Submit an entry for this year's chapter t-shirt design! bit.ly/4gcwG5w",
    body: "Submit an entry for this year's chapter t-shirt design! Winner gets a prize basket from the Knights Market! bit.ly/4gcwG5w",
  },
    {
    id: 4,
    title: "Online Competition Registration",
    date: "09/1/2026",
    summary: "Sign up for virtual DECA events, open to ALL paid DECA members!",
    body: "Online competition sign ups are OPEN! Only ONE group member should fill out the form and put their teammate's on the form. Do separate submission for each event and round you want to compete in. Sign up to be registered here: https://docs.google.com/forms/d/e/1FAIpQLSfY-jxf7r0Rr_b7HpjHZ47Nq4aU7hU5OqNqrAK0s_NMkfeviA/viewform?usp=dialog",
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
