import type { Metadata } from "next";
import Link from "next/link";
import { GENERAL, CLUSTERS } from "@/data/resources";
import { ResourceBlocks } from "@/components/resources/resource-blocks";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Competition resources for Independence DECA — roleplays, principles, prepared events, and online events.",
};

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V7a4 4 0 1 1 8 0v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet-glow">
          Independence DECA
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Competition <span className="text-gradient-brand">Resources</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{GENERAL.blurb}</p>
      </header>

      {/* General info */}
      <div className="glass-edge rounded-2xl p-5 sm:p-6">
        <ResourceBlocks blocks={GENERAL.blocks} />
      </div>

      {/* Cluster cards */}
      <section>
        <h2 className="mb-4 font-heading text-xl font-bold tracking-tight">
          Browse by cluster
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {CLUSTERS.map((c) => (
            <Link
              key={c.slug}
              href={`/resources/${c.slug}`}
              className="group glass-edge flex flex-col rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-purple-bright/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-lg font-semibold tracking-tight">
                  {c.title}
                </h3>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/12 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <LockIcon />
                  Locked
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.blurb}</p>
              <span className="mt-3 text-xs font-medium text-violet-glow">
                Enter password to view →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
