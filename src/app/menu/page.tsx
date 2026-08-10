import type { Metadata } from "next";
import { Clock, Wallet } from "lucide-react";
import { MenuBrowser } from "@/components/menu-browser";
import { MARKET_INFO } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The Knights' Market menu — snacks, drinks, and merch with current prices, hours, and payment options.",
};

export default function MenuPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet-glow">
          Independence DECA
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Knights&apos; <span className="text-gradient-brand">Market</span>
        </h1>
      </header>

      {/* Hours + payment info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass-edge rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="h-4 w-4 text-violet-glow" />
            Hours
          </div>
          <ul className="mt-3 space-y-2">
            {MARKET_INFO.hours.map((h) => (
              <li
                key={h.days}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span className="text-muted-foreground">{h.days}</span>
                <span className="font-medium">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-edge rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Wallet className="h-4 w-4 text-violet-glow" />
            Payment
          </div>
          <ul className="mt-3 space-y-2">
            {MARKET_INFO.payments.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple to-magenta" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filterable menu */}
      <MenuBrowser />
    </div>
  );
}
