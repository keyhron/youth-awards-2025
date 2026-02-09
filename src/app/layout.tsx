import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontAudiowide, fontOrbitron } from "@/fonts";
import { getInitialData } from "@/services/firebaseService";
import { pageName, year } from "@/data";
import StoreProvider from "./StoreProvider";
import "./globals.css";
import RadioPlayer from "@/components/molecules/RadioPlayer";

const seoImage = {
  url: "/images/seo.webp",
  width: 1080,
  height: 617,
  alt: "Premios Juventud - Trofeos",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://premios-juventud.vercel.app"),
  title: pageName,
  description: `La misión Guanare 63 te invita a nuestro gran evento para que disfrutes de la presencia de Jehová y de las nominaciones a los Premios Juventud ${year}, no te lo puedes perder`,
  applicationName: pageName,
  keywords: [
    "Premios Juventud",
    "Guanare 63",
    "evento cristiano",
    "nominaciones",
    "premiacion",
    "juventud",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: pageName,
    description: `La misión Guanare 63 te invita a nuestro gran evento para que disfrutes de la presencia de Jehová y de las nominaciones a los Premios Juventud ${year}, no te lo puedes perder`,
    url: "https://premios-juventud.vercel.app",
    type: "website",
    siteName: pageName,
    locale: "es_VE",
    images: [seoImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@keyhron",
    creator: "@keyhron",
    images: [seoImage],
  },
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const initialData = await getInitialData();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontAudiowide.variable} ${fontOrbitron.variable} font-audiowide bg-[#FFF7CC] text-black`}
      >
        <StoreProvider initialState={initialData}>
          <RadioPlayer />

          {children}
        </StoreProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
