import type { Metadata } from "next";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Dress Code",
  description:
    "IHS DECA competition dress code — required attire for male and female competitors and what not to wear.",
};

const MALE = [
  "Suit, blazer, or coat in a neutral color (gray, blue, black).",
  "Suit pants or dress slacks that match the coat (beige works too).",
  "Belt in a neutral color.",
  "Collared dress shirt in a neutral color.",
  "Necktie — keep the color and pattern modest and not distracting.",
  "Dress shoes in black or brown.",
];

const FEMALE = [
  "No neckwear required — an ascot or scarf is welcome if you'd like.",
  'Flats, pumps, or heels no higher than 2" — be ready to walk in them.',
  "Plain or painted nails are fine; avoid fake nails.",
  "Modest, simple jewelry is allowed.",
  "We frown on skirts (too often worn inappropriately) — stick to pants. :)",
];

const DONT = [
  "Hats (religious headwear is OK)",
  "Jeans or denim",
  "Sweatpants",
  "Quarter-zips",
  "Sneakers",
  "Crop tops",
  "Short sleeves",
];

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" />
      <span>{children}</span>
    </li>
  );
}

export default function DressCodePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <p className="eyebrow">Competition</p>
        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">Dress Code</h1>
      </header>

      {/* Key rule — neutral callout with a single purple accent edge. */}
      <div className="rounded-lg border border-border border-l-2 border-l-royal bg-surface-1 p-5">
        <p className="text-base font-semibold text-foreground">
          Not in dress code? Disqualified from competition.
        </p>
      </div>

      {/* Male / Female */}
      <div className="grid gap-5 md:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface-1 p-6">
          <h2 className="text-xl">Male</h2>
          <ul className="mt-5 space-y-3.5">
            {MALE.map((t) => (
              <Item key={t}>{t}</Item>
            ))}
            <Item>
              Dark dress socks matching your pants —{" "}
              <span className="font-semibold text-foreground">
                do not skip this.
              </span>
            </Item>
          </ul>
        </section>

        <section className="rounded-lg border border-border bg-surface-1 p-6">
          <h2 className="text-xl">Female</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything the males wear, with these exceptions:
          </p>
          <ul className="mt-5 space-y-3.5">
            {FEMALE.map((t) => (
              <Item key={t}>{t}</Item>
            ))}
          </ul>
        </section>
      </div>

      {/* Do not wear */}
      <section className="rounded-lg border border-border bg-surface-1 p-6">
        <h2 className="text-xl">Do Not Wear</h2>
        <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {DONT.map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
            >
              <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
