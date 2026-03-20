import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бисквитки",
  description: "Информация за използването на бисквитки на solaron.pro.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-foreground">Бисквитки</h1>
      <p className="mt-6 font-body text-foreground-secondary">
        Тази страница е в подготовка. Тук ще публикуваме информация за бисквитките и настройките за
        поверителност.
      </p>
    </div>
  );
}
