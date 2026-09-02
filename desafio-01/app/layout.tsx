import type { Metadata } from "next";
import Cabecalho from "@/components/Cabecalho";
import Rodape from "@/components/Rodape";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Leque de Vagas",
    template: "%s · Leque de Vagas",
  },
  description:
    "Vagas de tecnologia para quem está começando ou migrando de carreira.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
