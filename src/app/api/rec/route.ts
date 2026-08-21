import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { REC_SECTIONS, REC_FIELDS } from "@/data/rec-questions";

export const runtime = "nodejs";

// ------------------------------------------------------------------
// Delivery via Gmail SMTP (free, no domain required, goes straight to
// Mr. Chiles). Set two vars in .env.local:
//   GMAIL_USER          the sending Gmail address (e.g. the chapter Gmail)
//   GMAIL_APP_PASSWORD  a 16-char Google "App Password" (not the login pw)
// See .env.example for how to create the App Password.
// ------------------------------------------------------------------
const TO = "chilesj@friscoisd.org";
// A blind copy for the chapter, to confirm each submission actually sent.
const COPY_TO = "contact.nandanr@gmail.com";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return NextResponse.json(
      {
        error:
          "Email is not configured yet (missing GMAIL_USER / GMAIL_APP_PASSWORD). See .env.example.",
      },
      { status: 500 }
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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `IHS DECA LOR <${user}>`,
      to: TO,
      bcc: COPY_TO,
      replyTo: studentEmail || undefined,
      subject: `LOR Request — ${legalName}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Email failed to send." },
      { status: 502 }
    );
  }
}
