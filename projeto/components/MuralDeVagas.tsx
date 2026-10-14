"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CardDeVaga from "@/components/CardDeVaga";
import Filtros from "@/components/Filtros";
import type { Vaga } from "@/lib/tipos";

type MuralDeVagasProps = {
  vagas: Vaga[];
};

const TODAS = "Todas";

type Mudancas = Partial<{
  busca: string;
  area: string;
  senioridade: string;
  iniciante: boolean;
}>;

function montarUrl(pathname: string, atuais: string, mudancas: Mudancas) {
  const params = new URLSearchParams(atuais);

  const definir = (chave: string, valor: string | undefined) => {
    if (valor) params.set(chave, valor);
    else params.delete(chave);
  };

  if ("busca" in mudancas) definir("busca", mudancas.busca?.trim());
  if ("area" in mudancas)
    definir("area", mudancas.area === TODAS ? undefined : mudancas.area);
  if ("senioridade" in mudancas)
    definir(
      "senioridade",
      mudancas.senioridade === TODAS ? undefined : mudancas.senioridade,
    );
  if ("iniciante" in mudancas)
    definir("iniciante", mudancas.iniciante ? "1" : undefined);

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export default function MuralDeVagas({ vagas }: MuralDeVagasProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsAtuais = searchParams.toString();

  const areas = useMemo(
    () => [TODAS, ...new Set(vagas.map((vaga) => vaga.area))],
    [vagas],
  );
  const senioridades = useMemo(
    () => [TODAS, ...new Set(vagas.map((vaga) => vaga.senioridade))],
    [vagas],
  );

  // Valores vindos da URL; parâmetros inválidos caem em "Todas".
  const buscaNaUrl = searchParams.get("busca") ?? "";
  const areaParam = searchParams.get("area") ?? TODAS;
  const senioridadeParam = searchParams.get("senioridade") ?? TODAS;
  const area = areas.includes(areaParam) ? areaParam : TODAS;
  const senioridade = senioridades.includes(senioridadeParam)
    ? senioridadeParam
    : TODAS;
  const soIniciantes = searchParams.get("iniciante") === "1";

  // O campo com debounce usa a query inteira como chave. Ao navegar com Voltar/Avançar,
  // ele é recriado já com o valor correspondente, sem sincronizar estado em efeito.
  function buscar(texto: string) {
    router.replace(montarUrl(pathname, paramsAtuais, { busca: texto }), {
      scroll: false,
    });
  }

  // Selects e checkbox usam push: cada mudança vira uma entrada no histórico.
  function atualizar(mudancas: Mudancas) {
    router.push(montarUrl(pathname, paramsAtuais, mudancas), { scroll: false });
  }

  function limpar() {
    router.push(pathname, { scroll: false });
  }

  const termo = buscaNaUrl.trim().toLocaleLowerCase("pt-BR");
  const visiveis = vagas.filter((vaga) => {
    const correspondeArea = area === TODAS || vaga.area === area;
    const correspondeSenioridade =
      senioridade === TODAS || vaga.senioridade === senioridade;
    const correspondeIniciante = !soIniciantes || vaga.aceitaIniciante;
    const texto = `${vaga.titulo} ${vaga.empresa} ${vaga.local} ${vaga.senioridade}`.toLocaleLowerCase(
      "pt-BR",
    );
    return (
      correspondeArea &&
      correspondeSenioridade &&
      correspondeIniciante &&
      texto.includes(termo)
    );
  });
  const aceitamIniciante = visiveis.filter(
    (vaga) => vaga.aceitaIniciante,
  ).length;
  const temFiltroAtivo =
    termo !== "" || area !== TODAS || senioridade !== TODAS || soIniciantes;

  return (
    <section aria-labelledby="titulo-resultados">
      <Filtros
        busca={buscaNaUrl}
        chaveDaBusca={paramsAtuais}
        aoBuscar={buscar}
        area={area}
        aoMudarArea={(valor) => atualizar({ area: valor })}
        areas={areas}
        senioridade={senioridade}
        aoMudarSenioridade={(valor) => atualizar({ senioridade: valor })}
        senioridades={senioridades}
        soIniciantes={soIniciantes}
        aoMudarSoIniciantes={(valor) => atualizar({ iniciante: valor })}
        temFiltroAtivo={temFiltroAtivo}
        aoLimpar={limpar}
      />

      <div className="resumoResultados" aria-live="polite">
        <h2 id="titulo-resultados">
          {visiveis.length} de {vagas.length} vagas
        </h2>
        <p>{aceitamIniciante} aceitam quem está começando</p>
      </div>

      {visiveis.length > 0 ? (
        <div className="gradeVagas">
          {visiveis.map((vaga) => (
            <CardDeVaga key={vaga.id} vaga={vaga} arquivavel />
          ))}
        </div>
      ) : (
        <div className="estadoVazio">
          <h2>Nenhuma vaga encontrada</h2>
          <p>Tente outro termo ou ajuste os filtros.</p>
          {temFiltroAtivo && (
            <button type="button" onClick={limpar}>
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </section>
  );
}
