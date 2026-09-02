import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import FormularioDeCandidatura from "@/components/FormularioDeCandidatura";
import { buscarVaga, listarVagas } from "@/lib/api";

export async function generateStaticParams() {
  const vagas = await listarVagas();
  return vagas.map((vaga) => ({ id: vaga.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/vagas/[id]">): Promise<Metadata> {
  const { id } = await params;
  const vaga = await buscarVaga(id);

  if (!vaga) {
    return { title: "Vaga não encontrada" };
  }

  return {
    title: vaga.titulo,
    description: `${vaga.titulo} na ${vaga.empresa}. ${vaga.senioridade} · ${vaga.local}.`,
  };
}

export default async function PaginaDaVaga({ params }: PageProps<"/vagas/[id]">) {
  const { id } = await params;
  const vaga = await buscarVaga(id);

  if (!vaga) notFound();

  return (
    <main className="conteudo paginaDetalhe">
      <Link className="linkVoltar" href="/vagas">
        <span aria-hidden="true">←</span> Todas as vagas
      </Link>

      <article>
        <header className="cabecalhoDetalhe">
          <div>
            <span className="etiqueta">{vaga.area}</span>
            <h1>{vaga.titulo}</h1>
            <Link className="empresaDestaque" href={`/empresas/${vaga.empresaSlug}`}>
              {vaga.empresa} <span aria-hidden="true">→</span>
            </Link>
          </div>
          {vaga.aceitaIniciante && (
            <span className="seloIniciante">Aceita iniciante</span>
          )}
        </header>

        <div className="painelDetalhe">
          <dl>
            <div>
              <dt>Senioridade</dt>
              <dd>{vaga.senioridade}</dd>
            </div>
            <div>
              <dt>Modelo</dt>
              <dd>{vaga.local}</dd>
            </div>
            <div>
              <dt>Publicada em</dt>
              <dd>{new Intl.DateTimeFormat("pt-BR").format(new Date(`${vaga.publicadaEm}T12:00:00`))}</dd>
            </div>
          </dl>
          <BotaoCopiarLink />
        </div>

        <section className="blocoDescricao" aria-labelledby="titulo-descricao">
          <h2 id="titulo-descricao">Sobre a vaga</h2>
          <DescricaoDaVaga descricao={vaga.descricao} />
        </section>
      </article>

      <FormularioDeCandidatura tituloDaVaga={vaga.titulo} />
    </main>
  );
}
