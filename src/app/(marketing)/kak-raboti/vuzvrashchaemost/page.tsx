import type { Metadata } from "next";
import dynamic from "next/dynamic";

const VuzvrashchaemostContent = dynamic(
  () => import("./content").then((m) => m.VuzvrashchaemostContent),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "Възвръщаемост на Инвестицията (ROI) | Solaron",
  description:
    "Фактори за ROI на фотоволтаични системи, PVGIS прогнози, реален казус с 5 kWp система и сравнение на payback по размер на системата.",
};

export default function VuzvrashchaemostPage() {
  return <VuzvrashchaemostContent />;
}
