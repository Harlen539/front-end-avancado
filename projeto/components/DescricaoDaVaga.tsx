"use client";

import { useState } from "react";

type DescricaoDaVagaProps = {
  descricao: string;
};

const LIMITE = 180;

export default function DescricaoDaVaga({ descricao }: DescricaoDaVagaProps) {
  const [aberta, setAberta] = useState(false);
  const podeResumir = descricao.length > LIMITE;
  const textoVisivel =
    podeResumir && !aberta ? `${descricao.slice(0, LIMITE).trim()}…` : descricao;

  return (
    <div className="descricaoVaga">
      <p>{textoVisivel}</p>
      {podeResumir && (
        <button
          className="botaoTexto"
          type="button"
          onClick={() => setAberta(!aberta)}
        >
          {aberta ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
}
