"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Modal } from "@/components/modal";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function MonthGrid() {
  // Client-only (rendered inside an opened modal), so `new Date()` is safe.
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div
            key={i}
            className={
              day === null
                ? ""
                : day === today
                ? "grid aspect-square place-items-center rounded-lg bg-gradient-to-br from-purple to-magenta text-sm font-semibold text-white"
                : "grid aspect-square place-items-center rounded-lg border border-white/8 text-sm text-muted-foreground transition-colors hover:border-purple-bright/40 hover:text-foreground"
            }
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CalendarButton() {
  const [open, setOpen] = useState(false);
  const monthLabel = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="shimmer glow-purple inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple to-magenta px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
      >
        <CalendarDays className="h-4 w-4" />
        Calendar
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={monthLabel}>
        <MonthGrid />
      </Modal>
    </>
  );
}
