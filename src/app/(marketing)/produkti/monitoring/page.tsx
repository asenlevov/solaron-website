import type { Metadata } from "next";

import { MonitoringContent } from "./monitoring-content";

export const metadata: Metadata = {
  title: "Мониторинг на Соларна Система — SolarEdge, Kstar, Deye | Solaron",
  description:
    "Наблюдение на фотоволтаична система в реално време. Сравнение на мониторинг платформи SolarEdge, Kstar и Deye. Диагностика и оптимизация от Solaron.",
  keywords: [
    "мониторинг соларна система",
    "SolarEdge мониторинг",
    "Kstar мониторинг",
    "Deye мониторинг",
    "фотоволтаична система наблюдение",
    "Solaron",
  ],
  openGraph: {
    title: "Мониторинг на Соларна Система | Solaron",
    description:
      "Наблюдение на фотоволтаична система в реално време. Сравнение на мониторинг платформи SolarEdge, Kstar и Deye.",
  },
  alternates: { canonical: "/produkti/monitoring" },
};

export default function MonitoringPage() {
  return <MonitoringContent />;
}
