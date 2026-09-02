import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";
import { buscarEmpresa, listarEmpresas, listarVagas } from "@/lib/api";

export async function generateStaticParams() {
  const empresas = await listarEmpresas();
  return empresas.map((empresa) => ({ slug: empresa.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/empresas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);

  if (!empresa) return { title: "Empresa não encontrada" };

  return {
    title: empresa.nome,
    description: empresa.sobre.split("\n\n")[0],
  };
}

export default async function PaginaDaEmpresa({
  params,
}: PageProps<"/empresas/[slug]">) {
  const { slug } = await params;
  const [empresa, vagas] = await Promise.all([
    buscarEmpresa(slug),
    listarVagas(),
  ]);

  if (!empresa) notFound();

  const vagasDaEmpresa = vagas.filter((vaga) => vaga.empresaSlug === slug);

  return (
    <main className="conteudo paginaEmpresa">
      <Link className="linkVoltar" href="/empresas">
        <span aria-hidden="true">←</span> Todas as empresas
      </Link>
      <header className="cabecalhoEmpresa">
        <span className="etiqueta">Empresa</span>
        <h1>{empresa.nome}</h1>
        <a href={empresa.site} target="_blank" rel="noreferrer">
          Visitar site <span aria-hidden="true">↗</span>
        </a>
      </header>
      <AbasDaEmpresa sobre={empresa.sobre} vagas={vagasDaEmpresa} />
    </main>
  );
}
