import { Resend } from "resend";

const DEFAULT_FROM = "Solaron Website <hello@wizia.ai>";
const DEFAULT_TO = "hello@solaron.io";

let client: Resend | null = null;

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!client) client = new Resend(key);
  return client;
}

function getFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;
}

function getContactInbox(): string {
  return process.env.CONTACT_EMAIL_TO ?? DEFAULT_TO;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  if (!value.trim()) return "";
  return `<tr><td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;color:#374151">${escapeHtml(label)}</td><td style="padding:8px 0;color:#111827">${escapeHtml(value)}</td></tr>`;
}

export type ContactEmailPayload = {
  name: string;
  phone: string;
  email: string;
  projectType?: string;
  roofArea?: string;
  monthlyBill?: string;
  message?: string;
  source?: string;
};

export async function sendContactEmail(payload: ContactEmailPayload) {
  const subject = `[Solaron] Запитване от ${payload.name}`;
  const messageHtml = payload.message
    ? `<p style="margin:16px 0 8px;font-weight:600;color:#374151">Съобщение</p><p style="margin:0;white-space:pre-wrap;color:#111827">${escapeHtml(payload.message)}</p>`
    : "";

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111827">
      <h2 style="margin:0 0 16px;font-size:20px">Ново запитване от сайта</h2>
      ${payload.source ? `<p style="margin:0 0 16px;color:#6b7280">Източник: ${escapeHtml(payload.source)}</p>` : ""}
      <table style="border-collapse:collapse">${row("Име", payload.name)}${row("Телефон", payload.phone)}${row("Имейл", payload.email)}${row("Тип проект", payload.projectType ?? "")}${row("Покрив (м²)", payload.roofArea ?? "")}${row("Месечна сметка (€)", payload.monthlyBill ?? "")}</table>
      ${messageHtml}
    </div>
  `;

  const { data, error } = await getResend().emails.send({
    from: getFromAddress(),
    to: getContactInbox(),
    replyTo: payload.email,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export type CareersEmailPayload = {
  name: string;
  email: string;
  position: string;
  message: string;
};

export async function sendCareersEmail(payload: CareersEmailPayload) {
  const subject = `[Solaron] Кандидатура: ${payload.position} — ${payload.name}`;
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111827">
      <h2 style="margin:0 0 16px;font-size:20px">Нова кандидатура</h2>
      <table style="border-collapse:collapse">${row("Име", payload.name)}${row("Имейл", payload.email)}${row("Позиция", payload.position)}</table>
      <p style="margin:16px 0 8px;font-weight:600;color:#374151">Съобщение</p>
      <p style="margin:0;white-space:pre-wrap;color:#111827">${escapeHtml(payload.message)}</p>
    </div>
  `;

  const { data, error } = await getResend().emails.send({
    from: getFromAddress(),
    to: getContactInbox(),
    replyTo: payload.email,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
