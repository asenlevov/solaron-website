"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useMemo } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  submitCareersForm,
  submitContactForm,
  type FormActionState,
} from "@/lib/actions/contact-form";
import { cn } from "@/lib/utils";

const initialState: FormActionState = { ok: false };

export function ContactPageForm() {
  const searchParams = useSearchParams();
  const prefill = useMemo(() => {
    return {
      panelCount: searchParams.get("panelCount") ?? undefined,
      kWp: searchParams.get("kWp") ?? undefined,
      battery: searchParams.get("battery") ?? undefined,
      city: searchParams.get("city") ?? undefined,
    };
  }, [searchParams]);

  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  const defaultMessage = useMemo(() => {
    if (
      !prefill.panelCount &&
      !prefill.kWp &&
      !prefill.battery &&
      !prefill.city
    ) {
      return "";
    }
    const parts = [
      prefill.panelCount && `Брой панели: ${prefill.panelCount}`,
      prefill.kWp && `Мощност: ${prefill.kWp} kWp`,
      prefill.battery && `Батерия: ${prefill.battery}`,
      prefill.city && `Населено място: ${prefill.city}`,
    ].filter(Boolean);
    return parts.length ? `${parts.join("\n")}\n\n` : "";
  }, [prefill]);

  const hasConfigurator =
    Boolean(prefill.panelCount) ||
    Boolean(prefill.kWp) ||
    Boolean(prefill.battery) ||
    Boolean(prefill.city);

  return (
    <div className="space-y-6">
      {hasConfigurator ? (
        <p className="rounded-lg border border-accent/25 bg-accent-light px-4 py-3 font-body text-sm text-foreground">
          Данни от конфигуратора са добавени в полето „Съобщение“. Можете да ги
          редактирате.
        </p>
      ) : null}

      <form className="space-y-5" action={formAction}>
        <input type="hidden" name="source" value="Контакти" />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 font-body text-sm font-medium text-foreground">
            Име
            <input
              name="name"
              required
              disabled={pending || state.ok}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
              autoComplete="name"
            />
          </label>
          <label className="block space-y-2 font-body text-sm font-medium text-foreground">
            Телефон
            <input
              name="phone"
              type="tel"
              required
              disabled={pending || state.ok}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
              autoComplete="tel"
            />
          </label>
        </div>

        <label className="block space-y-2 font-body text-sm font-medium text-foreground">
          Имейл
          <input
            name="email"
            type="email"
            required
            disabled={pending || state.ok}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            autoComplete="email"
          />
        </label>

        <label className="block space-y-2 font-body text-sm font-medium text-foreground">
          Тип проект
          <select
            name="projectType"
            required
            disabled={pending || state.ok}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            defaultValue=""
          >
            <option value="" disabled>
              Изберете тип
            </option>
            <option value="home">За Дома</option>
            <option value="business">За Бизнеса</option>
            <option value="industry">За Индустрията</option>
            <option value="other">Друго</option>
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 font-body text-sm font-medium text-foreground">
            Площ на покрива (м², по избор)
            <input
              name="roofArea"
              type="number"
              min={0}
              step={1}
              disabled={pending || state.ok}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            />
          </label>
          <label className="block space-y-2 font-body text-sm font-medium text-foreground">
            Месечна сметка за ток (€, по избор)
            <input
              name="monthlyBill"
              type="number"
              min={0}
              step={1}
              disabled={pending || state.ok}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            />
          </label>
        </div>

        <label className="block space-y-2 font-body text-sm font-medium text-foreground">
          Съобщение
          <textarea
            key={defaultMessage || "empty"}
            name="message"
            rows={5}
            defaultValue={defaultMessage}
            disabled={pending || state.ok}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          />
        </label>

        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="w-full sm:w-auto"
          disabled={pending || state.ok}
        >
          {pending ? "Изпращане..." : "Изпрати запитване"}
        </Button>
      </form>

      {state.error ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 font-body text-sm text-destructive"
        >
          {state.error}
        </div>
      ) : null}

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-start gap-3 rounded-lg border border-success/30 bg-success-light px-4 py-3 font-body text-sm text-success",
          !state.ok && "hidden",
        )}
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden />
        <span>
          Благодарим! Получихме вашето съобщение. Ще се свържем с вас до 24 часа.
        </span>
      </div>
    </div>
  );
}

export function CareersApplicationForm() {
  const [state, formAction, pending] = useActionState(
    submitCareersForm,
    initialState,
  );

  return (
    <div className="space-y-6">
      <form className="space-y-5" action={formAction}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 font-body text-sm font-medium text-foreground">
            Име и фамилия
            <input
              name="name"
              required
              disabled={pending || state.ok}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
              autoComplete="name"
            />
          </label>
          <label className="block space-y-2 font-body text-sm font-medium text-foreground">
            Имейл
            <input
              name="email"
              type="email"
              required
              disabled={pending || state.ok}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
              autoComplete="email"
            />
          </label>
        </div>

        <label className="block space-y-2 font-body text-sm font-medium text-foreground">
          Позиция
          <select
            name="position"
            required
            disabled={pending || state.ok}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            defaultValue=""
          >
            <option value="" disabled>
              Изберете позиция
            </option>
            <option value="installer">Соларен Монтажник</option>
            <option value="designer">Проектант на Фотоволтаични Системи</option>
            <option value="sales">Търговски Консултант</option>
          </select>
        </label>

        <label className="block space-y-2 font-body text-sm font-medium text-foreground">
          Съобщение
          <textarea
            name="message"
            rows={5}
            required
            disabled={pending || state.ok}
            placeholder="Кратко представяне, опит и мотивация"
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 font-body text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          />
        </label>

        <Button type="submit" size="lg" variant="primary" disabled={pending || state.ok}>
          {pending ? "Изпращане..." : "Изпрати кандидатура"}
        </Button>
      </form>

      {state.error ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 font-body text-sm text-destructive"
        >
          {state.error}
        </div>
      ) : null}

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-start gap-3 rounded-lg border border-success/30 bg-success-light px-4 py-3 font-body text-sm text-success",
          !state.ok && "hidden",
        )}
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden />
        <span>
          Получихме вашата кандидатура. Ще се свържем при подходяща възможност.
        </span>
      </div>
    </div>
  );
}
