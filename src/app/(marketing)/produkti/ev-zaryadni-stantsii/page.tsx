import type { Metadata } from "next";

import { EvZaryadniContent } from "./ev-zaryadni-content";

export const metadata: Metadata = {
  title: "EV Зарядни Станции за Дома и Бизнеса | Solaron",
  description:
    "Зарядни станции за електрически автомобили — домашни и комерсиални решения. Интеграция със соларна система за зареждане от слънчева енергия. Solaron.",
  keywords: [
    "зарядна станция електрически автомобил",
    "EV зарядна станция",
    "домашна зарядна станция",
    "соларно зареждане електромобил",
    "Solaron",
  ],
  openGraph: {
    title: "EV Зарядни Станции | Solaron",
    description:
      "Зарядни станции за електрически автомобили — домашни и комерсиални решения. Интеграция със соларна система.",
  },
  alternates: { canonical: "/produkti/ev-zaryadni-stantsii" },
};

export default function EvZaryadniPage() {
  return <EvZaryadniContent />;
}
