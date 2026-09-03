import type { Metadata } from "next";
import { PrecompClusters } from "@/components/precomp/precomp-clusters";
import { PasswordGate } from "@/components/resources/password-gate";
import { isUnlocked } from "@/app/resources/_lib";

export const metadata: Metadata = {
  title: "Precomp Prep",
  description:
    "Precomp preparation resources for Independence DECA — vocab flashcards and past practice exams for every cluster.",
};

// Reads cookies to decide gate vs. content, so render per request.
export const dynamic = "force-dynamic";

export default async function PrecompPage() {
  const unlocked = await isUnlocked("precomp");

  if (!unlocked) {
    return <PasswordGate slug="precomp" title="Precomp" />;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="pb-8">
        <p className="eyebrow">Independence DECA</p>
        <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">Precomp Prep</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Select your cluster to open its study resources. Click each link to
          study. DO NOT SHARE OR DISTRIBUTE THE PASSWORD OR ANY MATERIAL ON THIS
          PAGE
        </p>
      </header>

      <PrecompClusters />
    </div>
  );
}
