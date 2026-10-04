import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/content";
import "./globals.css";

const instrument = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

const interTight = localFont({
  src: [
    { path: "./fonts/InterTight-Variable.woff2", weight: "200 600", style: "normal" },
    { path: "./fonts/InterTight-Italic-Variable.woff2", weight: "200 600", style: "italic" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  // Borrador: fuera de buscadores hasta que Mario apruebe.
  robots: site.draft ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Mario Lignarolo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1615",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${instrument.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  );
}
