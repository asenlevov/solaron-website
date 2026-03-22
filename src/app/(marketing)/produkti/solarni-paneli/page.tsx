import type { Metadata } from "next";

import { SolarniPaneliContent } from "./solarni-paneli-content";

export const metadata: Metadata = {
  title: "Соларни Панели — AIKO, DMEGC, MWT | Solaron",
  description:
    "Соларни панели AIKO и фотоволтаични панели DMEGC — висока ефективност, гаранции, проект и монтаж от Solaron.",
  keywords: [
    "соларни панели AIKO",
    "фотоволтаични панели DMEGC",
    "MWT соларни модули",
    "Tier-1 панели",
    "Solaron",
  ],
  openGraph: {
    title: "Соларни Панели — AIKO, DMEGC, MWT | Solaron",
    description:
      "Соларни панели AIKO и фотоволтаични панели DMEGC — висока ефективност, гаранции, проект и монтаж.",
  },
  alternates: { canonical: "/produkti/solarni-paneli" },
};

export default function SolarniPaneliPage() {
  return <SolarniPaneliContent />;
}
