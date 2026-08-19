import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Cabecalho from "@/components/Cabecalho";
import Rodape from "@/components/Rodape";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Leque de Vagas",
    template: "%s | Leque de Vagas",
  },
  description:
    "Vagas de tecnologia para quem está em transição de carreira e busca novas oportunidades.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
