import type { Metadata } from "next";

import { InvertoriContent } from "./invertori-content";

export const metadata: Metadata = {
  title: "Инвертори | Solaron",
  description:
    "Интелигентни инвертори SolarEdge с оптимайзери за максимална производителност на ниво панел. Мониторинг 365/24/7.",
};

export default function InvertoriPage() {
  return <InvertoriContent />;
}
