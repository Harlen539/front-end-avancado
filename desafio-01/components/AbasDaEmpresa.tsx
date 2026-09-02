"use client";

import { useState } from "react";
import CardDeVaga from "@/components/CardDeVaga";
import type { Vaga } from "@/lib/tipos";

type AbasDaEmpresaProps = {
  sobre: string;
  vagas: Vaga[];
};

export default function AbasDaEmpresa({ sobre, vagas }: AbasDaEmpresaProps) {
  const [aba, setAba] = useState<"sobre" | "vagas">("sobre");

  return (
    <div className="abasEmpresa">
      <div
        className="botoesAbas"
        role="tablist"
        aria-label="Informações da empresa"
      >
        <button
          className={aba === "sobre" ? "ativa" : undefined}
          type="button"
          role="tab"
          aria-selected={aba === "sobre"}
          onClick={() => setAba("sobre")}
        >
          Sobre
        </button>
        <button
          className={aba === "vagas" ? "ativa" : undefined}
          type="button"
          role="tab"
          aria-selected={aba === "vagas"}
          onClick={() => setAba("vagas")}
        >
          Vagas ({vagas.length})
        </button>
      </div>

      {aba === "sobre" ? (
        <div className="textoEmpresa" role="tabpanel">
          {sobre.split("\n\n").map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
        </div>
      ) : (
        <div className="gradeVagas" role="tabpanel">
          {vagas.length > 0 ? (
            vagas.map((vaga) => <CardDeVaga key={vaga.id} vaga={vaga} />)
          ) : (
            <p className="estadoVazio">Esta empresa não tem vagas abertas agora.</p>
          )}
        </div>
      )}
    </div>
  );
}
