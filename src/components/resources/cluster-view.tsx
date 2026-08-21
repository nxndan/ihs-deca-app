"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Cluster } from "@/data/resources";
import { ResourceBlocks } from "@/components/resources/resource-blocks";

export function ClusterView({ cluster }: { cluster: Cluster }) {
  const params = useSearchParams();
  const requested = params.get("sub");
  const initial =
    cluster.subtabs.find((s) => s.id === requested)?.id ??
    cluster.subtabs[0].id;
  const [active, setActive] = useState<string>(initial);

  const current =
    cluster.subtabs.find((s) => s.id === active) ?? cluster.subtabs[0];

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <header className="mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet-glow">
          Competition Resources
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {cluster.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{cluster.blurb}</p>
      </header>

      {/* Cluster intro (always visible) */}
      {cluster.intro && cluster.intro.length > 0 && (
        <div className="glass-edge mb-6 rounded-2xl p-5 sm:p-6">
          <ResourceBlocks blocks={cluster.intro} />
        </div>
      )}

      {/* Subtab switcher */}
      <div className="mb-5 flex flex-wrap gap-2">
        {cluster.subtabs.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={cn(
              "min-h-10 rounded-xl border px-4 text-sm font-medium transition-colors",
              active === s.id
                ? "border-purple-bright/60 bg-purple/20 text-foreground"
                : "border-white/12 text-muted-foreground hover:border-purple-bright/40 hover:text-foreground"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Active subtab content */}
      <div className="glass-edge rounded-2xl p-5 sm:p-6">
        <ResourceBlocks blocks={current.blocks} />
      </div>
    </div>
  );
}
