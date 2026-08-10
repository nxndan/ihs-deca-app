import type { Metadata } from "next";
import { RecForm } from "@/components/rec-form";

export const metadata: Metadata = {
  title: "LOR Request",
  description:
    "Request a Letter of Recommendation from Mr. Chiles — the more detail you provide, the stronger your letter.",
};

const RESUME_MAILTO =
  "mailto:chilesj@friscoisd.org?subject=Resume%20For%20Letter%20of%20Recommendation&body=Please%20see%20attached.";

export default function RecPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet-glow">
          Independence DECA
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Letter of Recommendation{" "}
          <span className="text-gradient-brand">Request</span>
        </h1>
      </header>

      {/* Intro */}
      <div className="glass-edge rounded-2xl p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          We know it looks long, but the more information you provide, the better
          your letter will be. Not all fields are required. The higher the
          quality of the information, the better the work product he can produce —
          so please put some thought into your answers. This is your future, and
          there are few things in life more important than a quality education.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Please also send your educational résumé and/or vitae to{" "}
          <a
            href={RESUME_MAILTO}
            className="font-medium text-violet-glow underline decoration-purple-bright/40 underline-offset-2 hover:text-foreground"
          >
            Mr. Chiles via email
          </a>
          .
        </p>
      </div>

      {/* Form */}
      <RecForm />
    </div>
  );
}
