import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";

import { SiteShell } from "@/components/site/site-shell";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Esteban Rucán · AI Engineer",
    template: "%s · Esteban Rucán",
  },
  description:
    "AI Engineer en Santiago, Chile. IA generativa, agentes, MLOps, NLP, Speech Analytics y comunicación técnica aplicada a decisiones de negocio.",
  keywords: ["AI Engineer Chile", "Google Cloud Platform Santiago", "Generative AI engineer LatAm", "MLOps", "NLP"],
  openGraph: {
    title: "Esteban Rucán · AI Engineer",
    description:
      "Construyo IA que llega a producción. Y después la explico hasta que la entienda quien la va a usar.",
    url: "https://www.estebanrucan.me",
    siteName: "Esteban Rucán",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
