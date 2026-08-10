"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Cookie,
  CupSoda,
  ShoppingBag,
  LayoutGrid,
  Ghost,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MENU,
  CATEGORIES,
  CATEGORY_TAGS,
  type CategoryId,
  type MenuItem,
} from "@/data/menu";

type Filter = "all" | CategoryId | "ghost";
type Sort = "alpha" | "price" | "clearance";

function sortItems(items: MenuItem[], sort: Sort): MenuItem[] {
  const arr = [...items];
  if (sort === "price") {
    arr.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
  } else if (sort === "clearance") {
    arr.sort(
      (a, b) =>
        (b.clearance ? 1 : 0) - (a.clearance ? 1 : 0) ||
        a.name.localeCompare(b.name)
    );
  } else {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  }
  return arr;
}

const ICON: Record<Filter, React.ComponentType<{ className?: string }>> = {
  all: LayoutGrid,
  snacks: Cookie,
  drinks: CupSoda,
  merch: ShoppingBag,
  ghost: Ghost,
};

function price(n: number) {
  return `$${n.toFixed(2)}`;
}

function MenuCard({ item }: { item: MenuItem }) {
  const FallbackIcon = ICON[item.category];
  const tag = item.clearance ? "Clearance" : CATEGORY_TAGS[item.category];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-purple-bright/15 bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-bright/50 hover:shadow-[0_18px_45px_-24px_rgba(217,70,239,0.65)]">
      {/* Liquid-glass image panel — transparent, faint glow lifts the product */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-white/5 p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_58%_at_50%_42%,rgba(168,85,247,0.16),transparent_70%)]"
        />
        {tag && (
          <span className="absolute left-2 top-2 z-10 rounded-full border border-purple-bright/30 bg-purple/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-glow backdrop-blur-sm">
            {tag}
          </span>
        )}
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            className="relative max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <FallbackIcon className="relative h-14 w-14 text-purple-bright/60" />
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-semibold leading-tight">
            {item.name}
          </h3>
          {item.badge && (
            <span className="mt-0.5 shrink-0 rounded-full border border-purple-bright/30 bg-purple/10 px-2 py-0.5 text-[10px] font-medium text-violet-glow">
              {item.badge}
            </span>
          )}
        </div>

        {item.flavors && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {item.flavors.join(" · ")}
          </p>
        )}
        {item.note && (
          <p className="mt-1.5 text-xs italic text-muted-foreground">
            {item.note}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <span className="font-heading text-lg font-bold text-foreground">
            {price(item.price)}
          </span>
          {item.priceNote && (
            <span className="pb-0.5 font-mono text-[11px] text-muted-foreground">
              {item.priceNote}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function MenuBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("alpha");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All Items" },
    ...CATEGORIES,
    { id: "ghost", label: "Ghost" },
  ];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU.filter((item) => {
      if (filter === "ghost" && item.brand !== "ghost") return false;
      if (filter !== "all" && filter !== "ghost" && item.category !== filter)
        return false;
      if (!q) return true;
      const hay = [
        item.name,
        item.brand ?? "",
        item.badge ?? "",
        ...(item.flavors ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [filter, query]);

  // Build the sections to render.
  const sections: { id: string; label: string; icon: Filter; items: MenuItem[] }[] =
    filter === "ghost"
      ? [{ id: "ghost", label: "Ghost Energy", icon: "ghost", items: results }]
      : (filter === "all" ? CATEGORIES.map((c) => c.id) : [filter as CategoryId]).map(
          (id) => ({
            id,
            label: CATEGORIES.find((c) => c.id === id)!.label,
            icon: id as Filter,
            items: results.filter((i) => i.category === id),
          })
        );

  return (
    <div className="grid gap-6 md:grid-cols-[190px_1fr]">
      {/* Category rail */}
      <aside className="md:sticky md:top-20 md:self-start">
        <ul className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
          {filters.map((f) => {
            const Icon = ICON[f.id];
            const active = filter === f.id;
            return (
              <li key={f.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "border-purple-bright/50 bg-purple/15 text-foreground"
                      : "border-white/10 text-muted-foreground hover:border-purple-bright/30 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {f.label}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Search + results */}
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search snacks, drinks, flavors…"
              className="w-full rounded-xl border border-white/12 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-purple-bright/50"
            />
          </div>
          <label className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-xl border border-white/12 bg-secondary px-3 py-2.5 text-sm text-foreground outline-none focus:border-purple-bright/50"
            >
              <option value="alpha">Alphabetical</option>
              <option value="price">Price (low → high)</option>
              <option value="clearance">Clearance first</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-muted-foreground">
            No items match “{query}”.
          </p>
        ) : (
          <div className="space-y-10">
            {sections.map((section) => {
              if (section.items.length === 0) return null;
              const Icon = ICON[section.icon];
              return (
                <section key={section.id}>
                  <div className="mb-4 flex items-center gap-2.5">
                    <Icon className="h-5 w-5 text-violet-glow" />
                    <h2 className="font-heading text-xl font-bold tracking-tight">
                      {section.label}
                    </h2>
                    <span className="font-mono text-xs text-muted-foreground">
                      {section.items.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                    {sortItems(section.items, sort).map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
