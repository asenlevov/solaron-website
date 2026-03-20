import type { Metadata } from "next";
import { Suspense } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { ContactPageForm } from "@/components/marketing/company-page-forms";

export const metadata: Metadata = {
  title: "Контакти | Solaron",
  description:
    "Свържете се с Solaron за оферта и консултация — отговор до 24 часа.",
};

function FormFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 rounded-lg bg-foreground/5" />
      <div className="h-10 rounded-lg bg-foreground/5" />
      <div className="h-10 rounded-lg bg-foreground/5" />
      <div className="h-24 rounded-lg bg-foreground/5" />
    </div>
  );
}

export default function KontaktiPage() {
  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-6">Контакти</p>
          <TextReveal
            as="h1"
            className="text-editorial-hero max-w-3xl text-foreground"
          >
            Говорете с нас
          </TextReveal>
          <p className="mt-6 max-w-2xl font-body text-lg text-foreground-secondary">
            Опишете проекта си — ще подготвим предложение и график за оглед.
          </p>
        </div>
      </section>

      {/* Split: Form + Info */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form — 60% */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-white p-8 md:p-10">
                <p className="text-editorial-overline text-accent mb-6">
                  Запитване
                </p>
                <Suspense fallback={<FormFallback />}>
                  <ContactPageForm />
                </Suspense>
              </div>
            </div>

            {/* Info — 40% */}
            <aside className="lg:col-span-2">
              <div className="sticky top-28 space-y-8">
                {/* Contact details */}
                <div className="rounded-2xl border border-border bg-white p-8">
                  <p className="text-editorial-overline text-accent mb-6">
                    Директна връзка
                  </p>
                  <ul className="space-y-6 font-body">
                    <li>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground-secondary mb-1">
                        Телефон
                      </p>
                      <a
                        href="tel:+359884321560"
                        className="text-base font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        +359 88 432 1560
                      </a>
                    </li>
                    <li>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground-secondary mb-1">
                        Имейл
                      </p>
                      <a
                        href="mailto:info@solaron.pro"
                        className="text-base font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        info@solaron.pro
                      </a>
                    </li>
                    <li>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground-secondary mb-1">
                        Адрес
                      </p>
                      <p className="text-base text-foreground-secondary">
                        бул. Черни Връх 59Б, ет. 3<br />
                        1407 София, България
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Response commitment */}
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <svg
                        className="h-5 w-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold text-foreground">
                        Отговаряме в рамките на 24 часа
                      </p>
                      <p className="mt-1 font-body text-sm text-foreground-secondary">
                        В работни дни ще получите отговор с предварителна оценка
                        и следващи стъпки.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address card */}
                <div className="rounded-2xl border border-border bg-foreground p-8 grain">
                  <p className="text-editorial-overline text-accent mb-3">
                    Офис
                  </p>
                  <p className="font-display text-xl font-semibold text-white">
                    Solaron
                  </p>
                  <p className="mt-2 font-body text-sm text-white/60">
                    София, България
                  </p>
                  <p className="mt-1 font-body text-sm text-white/60">
                    Пн–Пт: 09:00 – 18:00
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Dark trust section */}
      <section className="bg-foreground py-16 md:py-20 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <blockquote className="text-editorial-pull-quote text-white">
              &ldquo;Всеки проект започва с разговор. Ние слушаме, анализираме и
              предлагаме решение, съобразено с вашите нужди.&rdquo;
            </blockquote>
            <p className="mt-6 font-body text-sm uppercase tracking-widest text-white/40">
              Екип Solaron
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
