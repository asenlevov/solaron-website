import type { Metadata } from "next";

import { InvertoriContent } from "./invertori-content";

export const metadata: Metadata = {
  title: "Инвертори — SolarEdge, Kstar, Deye | Solaron",
  description:
    "Соларен инвертор SolarEdge, хибриден инвертор Deye и инвертор за соларни панели цена — подбор с консултация. Kstar, оптимизатори. Solaron.",
  keywords: [
    "соларен инвертор SolarEdge",
    "хибриден инвертор Deye",
    "инвертор за соларни панели цена",
    "Kstar инвертор",
    "Solaron",
  ],
  openGraph: {
    title: "Инвертори — SolarEdge, Kstar, Deye | Solaron",
    description:
      "Соларен инвертор SolarEdge, хибриден инвертор Deye и инвертор за соларни панели цена — подбор с консултация. Kstar, оптимизатори.",
  },
  alternates: { canonical: "/produkti/invertori" },
};

export default function InvertoriPage() {
  return <InvertoriContent />;
}
