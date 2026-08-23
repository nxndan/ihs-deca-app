import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expectations",
  description: "IHS DECA member expectations — coming soon.",
};

export default function ExpectationsPage() {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center text-center">
      <p className="eyebrow">Other</p>
      <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">Expectations</h1>
      <p className="mt-4 text-base text-muted-foreground">
        Coming soon — check back shortly.
      </p>
    </div>
  );
}
