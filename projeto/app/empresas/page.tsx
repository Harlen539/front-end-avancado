import type { Metadata } from "next";
import Link from "next/link";
import { listarEmpresas, listarVagas } from "@/lib/api";

export const metadata: Metadata = {
  title: "Empresas",
  description: "Conheça as empresas que publicam oportunidades no Leque de Vagas.",
};

export default async function PaginaDeEmpresas() {
  const [empresas, vagas] = await Promise.all([listarEmpresas(), listarVagas()]);
  const vagasPorEmpresa = new Map<string, number>();
  for (const vaga of vagas) {
    vagasPorEmpresa.set(
      vaga.empresaSlug,
      (vagasPorEmpresa.get(vaga.empresaSlug) ?? 0) + 1,
    );
  }

  return (
    <main className="conteudo paginaInterna">
      <div className="topoPagina">
        <span className="etiqueta">Quem está contratando</span>
        <h1>Empresas que abrem espaço para novos caminhos.</h1>
      </div>
      <div className="gradeEmpresas">
        {empresas.map((empresa) => {
          const total = vagasPorEmpresa.get(empresa.slug) ?? 0;
          return (
            <Link key={empresa.slug} href={`/empresas/${empresa.slug}`}>
              <span>{total} {total === 1 ? "vaga" : "vagas"}</span>
              <h2>{empresa.nome}</h2>
              <p>{empresa.sobre.split("\n\n")[0]}</p>
              <strong>Conhecer empresa →</strong>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
