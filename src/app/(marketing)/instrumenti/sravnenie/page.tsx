import type { Metadata } from "next";

import { SravnenieClient } from "@/components/instrumenti/sravnenie-client";

export const metadata: Metadata = {
  title: "Сравнение на Продукти | Solaron",
  description:
    "Сравнение на панели, инвертори и батерии — ориентировъчни спецификации и акценти за избор.",
};

export default function SravneniePage() {
  return <SravnenieClient />;
}
