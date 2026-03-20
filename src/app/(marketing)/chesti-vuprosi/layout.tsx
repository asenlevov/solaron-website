import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Често Задавани Въпроси | Solaron",
  description:
    "Отговори на често задавани въпроси за фотоволтаици, монтаж, цени, техника и административни стъпки в България.",
};

export default function ChestiVuprosiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
