import type { Metadata } from "next";

import { SpestqvaniaClient } from "@/components/instrumenti/spestqvania-client";

export const metadata: Metadata = {
  title: "Калкулатор за Спестявания | Solaron",
  description:
    "Бърза оценка на кумулативни спестявания от солар спрямо месечна сметка за ток — с и без батерия.",
};

export default function SpestqvaniaPage() {
  return <SpestqvaniaClient />;
}
