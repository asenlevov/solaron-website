import type { Metadata } from "next";

import ZaIndustriyataContent from "./content";

export const metadata: Metadata = {
  title: "Индустриални Соларни Решения | Solaron",
  description:
    "Индустриални фотоволтаични системи от стотици kWp до мегавати: мащаб, ефективност и надеждност за производствени и логистични обекти.",
};

export default function ZaIndustriyataPage() {
  return <ZaIndustriyataContent />;
}
