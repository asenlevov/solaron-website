import type { Metadata } from "next";

import ZaDomaContent from "./content";

export const metadata: Metadata = {
  title: "Соларни Решения за Дома | Solaron",
  description:
    "Соларна система за дома със Solaron: до 80% спестявания от сметката за ток, по-висока стойност на имота и чиста енергия.",
};

export default function ZaDomaPage() {
  return <ZaDomaContent />;
}
