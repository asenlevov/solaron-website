import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Често Задавани Въпроси за Соларни Системи | Solaron",
  description:
    "Отговори на най-честите въпроси за фотоволтаични системи, инвертори, батерии, монтаж, нетно отчитане и възвращаемост на инвестицията. Всичко за соларната енергия на едно място.",
  keywords: [
    "често задавани въпроси соларни панели",
    "фотоволтаици въпроси",
    "соларна система FAQ",
    "нетно отчитане въпроси",
    "фотоволтаична система информация",
  ],
  alternates: { canonical: "/chesti-vuprosi" },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
