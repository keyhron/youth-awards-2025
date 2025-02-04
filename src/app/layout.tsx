import { type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { fontAudiowide, fontOrbitron } from "@/fonts";
import { getInitialData } from "@/services/firebaseService";
import { pageName, year } from "@/data";
import StoreProvider from "./StoreProvider";
import "./globals.css";

export const metadata = {
  title: pageName,
  description: `La misión Guanare 63 te invita a nuestro gran evento para que disfrutes de la presencia de Jehová y de las nominaciones a los Premios Juventud ${year}, no te lo puedes perder`,
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
        <StoreProvider initialState={initialData}>{children}</StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
