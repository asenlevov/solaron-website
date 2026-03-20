import type { Metadata } from "next";

import { RoiKalkulatorClient } from "@/components/instrumenti/roi-kalkulator-client";

export const metadata: Metadata = {
  title: "ROI Калкулатор | Solaron",
  description:
    "Интерактивен калкулатор за възвръщаемост на соларна инсталация: град, ориентация, сенки, консумация и 25-годишна прогноза.",
};

export default function RoiKalkulatorPage() {
  return <RoiKalkulatorClient />;
}
