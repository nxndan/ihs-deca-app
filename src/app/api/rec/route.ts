import { NextResponse } from "next/server";
import { Resend } from "resend";
import { REC_SECTIONS, REC_FIELDS } from "@/data/rec-questions";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where the questionnaire is delivered.
const TO = "chilesj@friscoisd.org";
// Until ihsdeca.com is verified in Resend, use the shared onboarding sender.
const FROM = "IHS DECA LOR <onboarding@resend.dev>";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function answerToText(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  return typeof value === "string" ? value : "";
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Server-side required-field validation.
  const missing = REC_FIELDS.filter((f) => f.required).filter((f) => {
    const v = data[f.id];
    if (Array.isArray(v)) return v.length === 0;
    return !v || String(v).trim() === "";
  });
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.map((f) => f.label).join("; ")}` },
      { status: 422 }
    );
  }

  const studentEmail = answerToText(data.email);
  const legalName =
    `${answerToText(data.legalFirst)} ${answerToText(data.legalLast)}`.trim() ||
    "Unknown student";

  // Build a readable HTML email grouped by section.
  const sectionsHtml = REC_SECTIONS.map((section) => {
    const rows = section.fields
      .map((f) => {
        const text = answerToText(data[f.id]).trim();
        if (!text) return "";
        return `
          <tr>
            <td style="padding:6px 0;vertical-align:top;width:42%;color:#555;font-size:13px;">${esc(
              f.label
            )}</td>
            <td style="padding:6px 0;vertical-align:top;color:#111;font-size:14px;white-space:pre-wrap;">${esc(
              text
            )}</td>
          </tr>`;
      })
      .join("");
    if (!rows) return "";
    return `
      <h2 style="margin:26px 0 6px;font-size:16px;color:#5b21b6;border-bottom:1px solid #eee;padding-bottom:4px;">${esc(
        section.title
      )}</h2>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>`;
  }).join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#111;">
      <h1 style="font-size:20px;margin:0 0 4px;">Letter of Recommendation Request</h1>
      <p style="margin:0 0 4px;color:#555;font-size:14px;">From <strong>${esc(
        legalName
      )}</strong> — <a href="mailto:${esc(studentEmail)}">${esc(
    studentEmail
  )}</a></p>
      <p style="margin:0 0 16px;color:#999;font-size:12px;">Submitted via the IHS DECA website. Reply to this email to reach the student.</p>
      ${sectionsHtml}
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: studentEmail || undefined,
      subject: `LOR Request — ${legalName}`,
      html,
    });
    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Email failed to send." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
