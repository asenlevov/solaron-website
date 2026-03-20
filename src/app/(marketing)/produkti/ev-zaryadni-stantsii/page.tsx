import type { Metadata } from "next";

import { EvZaryadniContent } from "./ev-zaryadni-content";

export const metadata: Metadata = {
  title: "EV Зарядни Станции | Solaron",
  description:
    "Зареждайте електрическия си автомобил директно от слънцето. Интелигентно зареждане с интеграция на соларна система и батерия.",
};

export default function EvZaryadniStantsiiPage() {
  return <EvZaryadniContent />;
}
