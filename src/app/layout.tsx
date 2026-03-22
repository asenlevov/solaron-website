import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "Solaron — Соларни Решения за Дома и Бизнеса",
    template: "%s | Solaron",
  },
  description:
    "Проектиране и монтаж на фотоволтаични системи с 20+ години европейски опит. Спестете до 80% от сметката за ток. Безплатна консултация.",
  keywords: [
    "соларни панели",
    "фотоволтаици",
    "слънчева енергия",
    "соларна система",
    "фотоволтаична система",
    "соларни панели цена",
    "фотоволтаична система за дома",
    "соларна система за къща",
    "слънчеви панели за дома",
    "фотоволтаици цена България",
    "соларни панели монтаж",
    "соларна система цена",
    "инвертор за соларни панели",
    "соларна батерия",
    "нетно отчитане",
    "SolarEdge",
    "Kstar",
    "Deye",
    "solar panels Bulgaria",
    "Solaron",
  ],
  authors: [{ name: "Solaron" }],
  creator: "Solaron",
  metadataBase: new URL("https://solaron.io"),
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "https://solaron.io",
    siteName: "Solaron",
    title: "Solaron — Соларни Решения за Дома и Бизнеса",
    description:
      "Проектиране и монтаж на фотоволтаични системи с 20+ години европейски опит. Спестете до 80% от сметката за ток.",
    images: [
      {
        url: "/og-image.png",
        width: 2684,
        height: 1548,
        alt: "Solaron — Соларни Решения",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solaron — Соларни Решения за Дома и Бизнеса",
    description:
      "Проектиране и монтаж на фотоволтаични системи с 20+ години европейски опит.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://solaron.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bg"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
