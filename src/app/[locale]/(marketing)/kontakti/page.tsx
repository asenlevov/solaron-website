import { setRequestLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { ContactPageForm } from "@/components/marketing/company-page-forms";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

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

export default async function KontaktiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      {/* Hero */}
      <section className="grain overflow-hidden bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-white/60 mb-6">Контакти</p>
          <TextReveal
            as="h1"
            className="editorial-hero max-w-3xl text-white"
          >
            Говорете с нас
          </TextReveal>
          <p className="mt-6 max-w-2xl font-body text-lg text-white/70">
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
                <p className="editorial-overline text-accent mb-6">
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
                  <p className="editorial-overline text-accent mb-6">
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
                        href="mailto:hello@solaron.io"
                        className="text-base font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        hello@solaron.io
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

                {/* WhatsApp */}
                <a
                  href="https://wa.me/359896699009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-6 transition-colors hover:bg-[#25D366]/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                    <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      Пишете ни в WhatsApp
                    </p>
                    <p className="mt-0.5 font-body text-sm text-foreground-secondary">
                      Бърз отговор в работно време
                    </p>
                  </div>
                </a>

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
                  <p className="editorial-overline text-accent mb-3">
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

      {/* Map */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.2!2d23.2985!3d42.6699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0LHRg9C7LiDQp9C10YDQvdC4INCS0YDRitGFIDU50JEsINCh0L7RhNC40Y8!5e0!3m2!1sbg!2sbg!4v1"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Solaron Office Location"
          className="grayscale hover:grayscale-0 transition-[filter] duration-500"
        />
      </section>

      {/* Dark trust section */}
      <section className="bg-foreground py-16 md:py-20 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <blockquote className="editorial-pull-quote text-white">
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
