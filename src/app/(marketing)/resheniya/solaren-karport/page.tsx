import type { Metadata } from "next";

import { SolarenKarportContent } from "./content";

export const metadata: Metadata = {
  title: "Соларен Карпорт — Навес с Панели | Solaron",
  description:
    "Соларен карпорт и фотоволтаичен навес за паркинг — генерирайте чиста енергия от покрива на паркинга. Зареждане на електромобили и сянка.",
  keywords: [
    "соларен карпорт",
    "фотоволтаичен навес",
    "соларен паркинг",
    "карпорт с панели",
    "EV зареждане карпорт",
    "Solaron",
  ],
  openGraph: {
    title: "Соларен Карпорт — Навес с Панели | Solaron",
    description:
      "Соларен карпорт и фотоволтаичен навес за паркинг — генерирайте чиста енергия и заредете електромобила.",
  },
  alternates: { canonical: "/resheniya/solaren-karport" },
};

export default function SolarenKarportPage() {
  return <SolarenKarportContent />;
}
