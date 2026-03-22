import type { Metadata } from "next";

import ZaZemedelietoContent from "./content";

export const metadata: Metadata = {
  title: "Соларна Система за Земеделието | Solaron",
  description:
    "Фотоволтаични решения за земеделски стопанства — напояване, хладилни камери и агроволтаици. Намалете разходите за електричество на фермата.",
  keywords: [
    "соларна система за земеделие",
    "фотоволтаици за ферма",
    "агроволтаици",
    "соларни панели земеделие",
    "Solaron",
  ],
  openGraph: {
    title: "Соларна Система за Земеделието | Solaron",
    description:
      "Фотоволтаични решения за земеделски стопанства — напояване, хладилни камери и агроволтаици.",
  },
  alternates: { canonical: "/resheniya/za-zemedelieto" },
};

export default function ZaZemedelietoPage() {
  return <ZaZemedelietoContent />;
}
