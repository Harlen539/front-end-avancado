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
        {!process.env.DATABASE_URL && (
          <aside className="avisoPersistencia" role="status">
            <strong>Catálogo em modo de consulta.</strong>
            <span>
              Vagas e empresas estão disponíveis. Para publicar, editar ou enviar candidaturas, configure o banco PostgreSQL.
            </span>
          </aside>
        )}
        {children}
        <Rodape />
      </body>
    </html>
  );
}
