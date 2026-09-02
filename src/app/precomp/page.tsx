import type { Metadata } from "next";
import { PrecompClusters } from "@/components/precomp/precomp-clusters";

export const metadata: Metadata = {
  title: "Precomp Prep",
  description:
    "Precomp preparation resources for Independence DECA — vocab flashcards and past practice exams for every cluster.",
};

export default function PrecompPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="pb-8">
        <p className="eyebrow">Independence DECA</p>
        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">Precomp Prep</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Pick your cluster to open its study resources — vocab flashcard sets
          and past practice exams. Work through as many as you can before your
          test.
        </p>
      </header>

      <PrecompClusters />
    </div>
  );
}
