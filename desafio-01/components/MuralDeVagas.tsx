"use client";

import { useState } from "react";
import CardDeVaga from "@/components/CardDeVaga";
import Filtros from "@/components/Filtros";
import type { Vaga } from "@/lib/tipos";

type MuralDeVagasProps = {
  vagas: Vaga[];
};

export default function MuralDeVagas({ vagas }: MuralDeVagasProps) {
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("Todas");

  const areas = ["Todas", ...new Set(vagas.map((vaga) => vaga.area))];
  const termo = busca.trim().toLocaleLowerCase("pt-BR");
  const visiveis = vagas.filter((vaga) => {
    const correspondeArea = area === "Todas" || vaga.area === area;
    const texto = `${vaga.titulo} ${vaga.empresa} ${vaga.local} ${vaga.senioridade}`.toLocaleLowerCase("pt-BR");
    return correspondeArea && texto.includes(termo);
  });
  const aceitamIniciante = visiveis.filter(
    (vaga) => vaga.aceitaIniciante,
  ).length;

  return (
    <section aria-labelledby="titulo-resultados">
      <Filtros
        busca={busca}
        aoMudarBusca={setBusca}
        area={area}
        aoMudarArea={setArea}
        areas={areas}
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
            <CardDeVaga key={vaga.id} vaga={vaga} />
          ))}
        </div>
      ) : (
        <div className="estadoVazio">
          <h2>Nenhuma vaga encontrada</h2>
          <p>Tente outro termo ou escolha uma área diferente.</p>
        </div>
      )}
    </section>
  );
}
