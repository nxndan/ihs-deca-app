"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { REC_SECTIONS, REC_FIELDS, type Field } from "@/data/rec-questions";

type Values = Record<string, string | string[]>;

const inputBase =
  "w-full rounded-lg border border-white/12 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-purple-bright/50";

export function RecForm() {
  const [values, setValues] = useState<Values>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  function set(id: string, v: string | string[]) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  function toggleAward(id: string, option: string) {
    setValues((prev) => {
      const cur = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      return {
        ...prev,
        [id]: cur.includes(option)
          ? cur.filter((o) => o !== option)
          : [...cur, option],
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Client-side required check (mirrors the server).
    const missing = REC_FIELDS.filter((f) => f.required).filter((f) => {
      const v = values[f.id];
      if (Array.isArray(v)) return v.length === 0;
      return !v || String(v).trim() === "";
    });
    if (missing.length > 0) {
      setStatus("error");
      setErrorMsg(`Please complete: ${missing.map((f) => f.label).join("; ")}`);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass-edge rounded-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-violet-glow" />
        <h2 className="mt-4 font-heading text-2xl font-bold">Request sent</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Your questionnaire has been emailed to Mr. Chiles. He&apos;ll follow up
          using the contact details you provided. Don&apos;t forget to email him
          your résumé or vitae as well.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {REC_SECTIONS.map((section) => (
        <fieldset
          key={section.title}
          className="glass-edge rounded-2xl p-5 sm:p-6"
        >
          <legend className="px-1 font-heading text-lg font-bold tracking-tight">
            {section.title}
          </legend>
          {section.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {section.description}
            </p>
          )}

          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {section.fields.map((field) => (
              <FieldRow
                key={field.id}
                field={field}
                value={values[field.id]}
                onChange={(v) => set(field.id, v)}
                onToggle={(opt) => toggleAward(field.id, opt)}
              />
            ))}
          </div>
        </fieldset>
      ))}

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="shimmer glow-purple inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-purple to-magenta px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send request"
          )}
        </button>
        <p className="text-xs text-muted-foreground">
          Sent directly to Mr. Chiles.
        </p>
      </div>
    </form>
  );
}

function FieldRow({
  field,
  value,
  onChange,
  onToggle,
}: {
  field: Field;
  value: string | string[] | undefined;
  onChange: (v: string) => void;
  onToggle: (option: string) => void;
}) {
  const spanFull = !field.half;
  const wrapCls = spanFull ? "sm:col-span-2" : "";

  const label = (
    <label
      htmlFor={field.id}
      className="mb-1.5 block text-sm font-medium text-foreground"
    >
      {field.label}
      {field.required && <span className="ml-1 text-magenta">*</span>}
    </label>
  );
  const help = field.help && (
    <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
      {field.help}
    </p>
  );

  if (field.kind === "textarea") {
    return (
      <div className={wrapCls}>
        {label}
        {help}
        <textarea
          id={field.id}
          rows={4}
          placeholder={field.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} resize-y`}
        />
      </div>
    );
  }

  if (field.kind === "radio") {
    const val = (value as string) ?? "";
    return (
      <div className={wrapCls}>
        {label}
        {help}
        <div className="flex flex-wrap gap-2">
          {field.options!.map((opt) => {
            const active = val === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`min-h-11 rounded-lg border px-4 text-sm font-medium transition-colors ${
                  active
                    ? "border-purple-bright/60 bg-purple/20 text-foreground"
                    : "border-white/12 text-muted-foreground hover:border-purple-bright/40 hover:text-foreground"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.kind === "checkboxes") {
    const arr = Array.isArray(value) ? value : [];
    return (
      <div className={wrapCls}>
        {label}
        {help}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {field.options!.map((opt) => {
            const checked = arr.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onToggle(opt)}
                className={`flex min-h-11 items-center gap-2.5 rounded-lg border px-3.5 py-2 text-left text-sm transition-colors ${
                  checked
                    ? "border-purple-bright/60 bg-purple/15 text-foreground"
                    : "border-white/12 text-muted-foreground hover:border-purple-bright/40"
                }`}
              >
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${
                    checked
                      ? "border-transparent bg-gradient-to-br from-purple to-magenta"
                      : "border-white/25"
                  }`}
                >
                  {checked && <CheckCircle2 className="h-3 w-3 text-white" />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // text / email / tel / date
  return (
    <div className={wrapCls}>
      {label}
      {help}
      <input
        id={field.id}
        type={field.kind}
        placeholder={field.placeholder}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      />
    </div>
  );
}
