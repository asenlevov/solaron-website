"use server";

import {
  sendCareersEmail,
  sendContactEmail,
  type CareersEmailPayload,
  type ContactEmailPayload,
} from "@/lib/email/resend";

export type FormActionState = {
  ok: boolean;
  error?: string;
};

function required(value: FormDataEntryValue | null, label: string): string {
  const text = String(value ?? "").trim();
  if (!text) throw new Error(`${label} е задължително`);
  return text;
}

function optional(value: FormDataEntryValue | null): string | undefined {
  const text = String(value ?? "").trim();
  return text || undefined;
}

function validateEmail(email: string): string {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Невалиден имейл адрес");
  }
  return email;
}

export async function submitContactForm(
  _prev: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  try {
    const payload: ContactEmailPayload = {
      name: required(formData.get("name"), "Име"),
      phone: required(formData.get("phone"), "Телефон"),
      email: validateEmail(required(formData.get("email"), "Имейл")),
      projectType: optional(formData.get("projectType")),
      roofArea: optional(formData.get("roofArea")),
      monthlyBill: optional(formData.get("monthlyBill")),
      message: optional(formData.get("message")),
      source: optional(formData.get("source")) ?? "Контакти",
    };

    await sendContactEmail(payload);
    return { ok: true };
  } catch (error) {
    console.error("submitContactForm failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Възникна грешка при изпращането. Моля, опитайте отново.",
    };
  }
}

export async function submitCareersForm(
  _prev: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  try {
    const payload: CareersEmailPayload = {
      name: required(formData.get("name"), "Име"),
      email: validateEmail(required(formData.get("email"), "Имейл")),
      position: required(formData.get("position"), "Позиция"),
      message: required(formData.get("message"), "Съобщение"),
    };

    await sendCareersEmail(payload);
    return { ok: true };
  } catch (error) {
    console.error("submitCareersForm failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Възникна грешка при изпращането. Моля, опитайте отново.",
    };
  }
}

function appendToMessage(formData: FormData, extra: string) {
  const existing = String(formData.get("message") ?? "").trim();
  formData.set("message", existing ? `${existing}\n\n${extra}` : extra);
}

export async function submitLandingContactForm(
  formData: FormData,
  source: string,
): Promise<FormActionState> {
  formData.set("source", source);
  formData.set("projectType", "other");
  return submitContactForm({ ok: false }, formData);
}

export async function submitConsultationLandingForm(
  formData: FormData,
): Promise<void> {
  const preferredTime = String(formData.get("preferred_time") ?? "").trim();
  if (preferredTime) {
    appendToMessage(formData, `Предпочитан час за контакт: ${preferredTime}`);
  }
  await submitLandingContactForm(formData, "LP: Безплатна консултация");
}

export async function submitFinancingLandingForm(
  formData: FormData,
): Promise<void> {
  await submitLandingContactForm(formData, "LP: Финансиране");
}

export async function submitSolarNewHomeLandingForm(
  formData: FormData,
): Promise<void> {
  await submitLandingContactForm(formData, "LP: Солар за нов дом");
}
