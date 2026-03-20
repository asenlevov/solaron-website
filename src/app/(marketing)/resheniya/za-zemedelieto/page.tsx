import type { Metadata } from "next";

import ZaZemedelietoContent from "./content";

export const metadata: Metadata = {
  title: "Соларни Решения за Земеделието | Solaron",
  description:
    "Агриволтаици и соларни системи за земеделие: напоителни системи, хладилни камери и наземен монтаж с чиста енергия.",
};

export default function ZaZemedelietoPage() {
  return <ZaZemedelietoContent />;
}
