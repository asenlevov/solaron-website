import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Конфигуратор на Соларна Система",
  description:
    "Конфигурирайте фотоволтаична система за вашия дом или бизнес. Визуализация, ROI и екологичен ефект в реално време.",
};

export default function KonfiguratorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
