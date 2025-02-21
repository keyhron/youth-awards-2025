import { type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontAudiowide, fontOrbitron } from "@/fonts";
import { getInitialData } from "@/services/firebaseService";
import { pageName, year } from "@/data";
import StoreProvider from "./StoreProvider";
import "./globals.css";
import RadioPlayer from "@/components/molecules/RadioPlayer";

export const metadata = {
  title: pageName,
  description: `La misión Guanare 63 te invita a nuestro gran evento para que disfrutes de la presencia de Jehová y de las nominaciones a los Premios Juventud ${year}, no te lo puedes perder`,
  openGraph: {
    title: pageName,
    description: `La misión Guanare 63 te invita a nuestro gran evento para que disfrutes de la presencia de Jehová y de las nominaciones a los Premios Juventud ${year}, no te lo puedes perder`,
    url: "https://juanbarrios.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/hero-3.png",
        width: 1200,
        height: 630,
        alt: "Crown image",
      },
    ],
  },
  twitter: {
    handle: "@keyhron",
    site: "@keyhron",
    cardType: "summary_large_image",
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
        className={`${fontAudiowide.variable} ${fontOrbitron.variable} font-audiowide bg-black text-white`}
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
