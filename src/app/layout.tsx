import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sasteghar.in"),
  title: {
    default: "SasteGhar — Fine Residences in Mohali & Chandigarh",
    template: "%s · SasteGhar",
  },
  description:
    "Fresh Buy launches and resale flats across Tricity (Mohali, Chandigarh, Zirakpur, Banur Road, Kharar) — every one walked, measured, and checked against its paperwork before it reaches you.",
  keywords: [
    "real estate India",
    "flats for sale",
    "resale apartments",
    "new launches",
    "Mohali",
    "Chandigarh",
    "Zirakpur",
    "New Chandigarh",
    "Kharar",
  ],
  openGraph: {
    type: "website",
    siteName: "SasteGhar",
    title: "SasteGhar — Fine Residences in Mohali & Chandigarh",
    description:
      "Fresh Buy launches and resale flats across Tricity (Mohali, Chandigarh, Zirakpur, Banur Road, Kharar).",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
