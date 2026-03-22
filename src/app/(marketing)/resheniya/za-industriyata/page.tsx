import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ZaIndustriyataContent = dynamic(() => import("./content").then((m) => m.ZaIndustriyataContent), { ssr: true });

export const metadata: Metadata = {
  title: "Соларни Системи за Индустрията | Solaron",
  description: "Индустриални фотоволтаични системи от 100 kWp до MW мащаб. Пикова оптимизация, 50% намаление на пиковата мощност и 2-4 години ROI.",
};

export default function ZaIndustriyataPage() {
  return <ZaIndustriyataContent />;
}
