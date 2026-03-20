import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Соларен Речник | Solaron",
  description:
    "Речник с основни термини за фотоволтаици, мрежово присъединяване и енергийна регулация.",
};

export default function RechnikLayout({ children }: { children: React.ReactNode }) {
  return children;
}
