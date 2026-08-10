"use client";

import { useState } from "react";
import { CalendarClock, Megaphone } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { Modal } from "@/components/modal";

export type Announcement = {
  id: number;
  title: string;
  date: string;
  summary: string; // short blurb shown on the card
  body: string; // full text (paragraphs separated by blank lines)
};

export function Announcements({ items }: { items: Announcement[] }) {
  const [active, setActive] = useState<Announcement | null>(null);

  return (
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
        {items.map((item) => (
          <TiltCard
            key={item.id}
            onClick={() => setActive(item)}
            className="tilt-card block w-full p-6 text-left"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-heading text-lg font-semibold leading-snug">
                {item.title}
              </h3>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-purple-bright/30 bg-purple/10 px-2.5 py-1 font-mono text-xs text-violet-glow">
                <CalendarClock className="h-3 w-3" />
                {item.date}
              </span>
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-violet-glow">
              Read full announcement →
            </span>
          </TiltCard>
        ))}
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title}
      >
        {active && (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-bright/30 bg-purple/10 px-2.5 py-1 font-mono text-xs text-violet-glow">
              <CalendarClock className="h-3 w-3" />
              {active.date}
            </span>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {active.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
