import type { Metadata } from "next";

import { MonitoringContent } from "./monitoring-content";

export const metadata: Metadata = {
  title: "Мониторинг | Solaron",
  description:
    "365/24/7 мониторинг на ниво панел с платформата SolarEdge. Следете производството в реално време от телефона си.",
};

export default function MonitoringPage() {
  return <MonitoringContent />;
}
