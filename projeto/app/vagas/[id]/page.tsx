import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import FormularioDeCandidatura from "@/components/FormularioDeCandidatura";
import FormularioNativoDeCandidatura from "@/components/FormularioNativoDeCandidatura";
import { buscarCandidatura, buscarVaga, contarCandidaturas, listarVagasPublicadas } from "@/lib/api";

function primeiro(valor: string | string[] | undefined) {
  return Array.isArray(valor) ? valor[0] : valor;
}

function errosDaConsulta(campos: string) {
  const erros: Record<string, string> = {};
  const lista = new Set(campos.split(","));
  if (lista.has("nome")) erros.nome = "Informe o nome com pelo menos 2 caracteres.";
  if (lista.has("email")) erros.email = "Digite um e-mail completo, incluindo @ e o domínio.";
  if (lista.has("habilidades")) erros.habilidades = "Selecione pelo menos uma habilidade.";
  if (lista.has("vagaId")) erros.vagaId = "Esta vaga não está mais disponível.";
  if (lista.has("formulario")) erros.formulario = "Revise os dados da candidatura.";
  return erros;
}

export async function generateStaticParams() {
  const vagas = await listarVagasPublicadas();
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

async function ConteudoDaVaga({
  id,
  status,
  corrigindo,
  erros,
}: {
  id: string;
  status?: string;
  corrigindo: boolean;
  erros: Record<string, string>;
}) {
  const vaga = await buscarVaga(id);
  if (!vaga) notFound();

  const [candidaturas, cookieJar] = await Promise.all([contarCandidaturas(id), cookies()]);
  const candidaturaId = corrigindo ? cookieJar.get(`candidatura-${id}`)?.value : undefined;
  const candidaturaSalva = candidaturaId ? await buscarCandidatura(candidaturaId, id) : undefined;
  const mensagemInicial = status === "corrigida"
    ? "Candidatura corrigida!"
    : status === "enviada"
      ? "Candidatura enviada!"
      : undefined;

  return (
    <>
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
        <p>{candidaturas} candidatura{candidaturas === 1 ? "" : "s"} recebida{candidaturas === 1 ? "" : "s"}</p>
      </article>

      <FormularioDeCandidatura
        tituloDaVaga={vaga.titulo}
        vagaId={vaga.id}
        candidaturaSalva={candidaturaSalva}
        mensagemInicial={mensagemInicial}
        errosIniciais={erros}
      />
    </>
  );
}

export default async function PaginaDaVaga({ params, searchParams }: PageProps<"/vagas/[id]">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const status = primeiro(query.candidatura);
  const sucesso = status === "enviada" || status === "corrigida";
  const corrigindo = query.corrigindo === "1" || sucesso;
  const quantidade = Number(primeiro(query.habilidades));
  const quantidadeValida = Number.isInteger(quantidade) && quantidade >= 0 && quantidade <= 30;
  const erros = errosDaConsulta(primeiro(query.campos) ?? "");
  if (status === "erro" || status === "indisponível") {
    erros.formulario = "Não foi possível enviar a candidatura. Tente novamente.";
  }

  return (
    <main className="conteudo paginaDetalhe">
      <Suspense fallback={
        <FormularioNativoDeCandidatura
          vagaId={id}
          erros={erros}
          corrigindo={corrigindo}
          sucesso={sucesso}
          corrigida={status === "corrigida"}
          quantidadeHabilidades={quantidadeValida ? quantidade : undefined}
        />
      }>
        <ConteudoDaVaga id={id} status={status} corrigindo={corrigindo} erros={erros} />
      </Suspense>
    </main>
  );
}
