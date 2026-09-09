"use client";

import Link from "next/link";

export default function ErroDaVaga({ reset }: { reset: () => void }) {
  return (
    <main className="conteudo paginaEstado">
      <span className="codigoEstado">Ops</span>
      <h1>Não conseguimos carregar esta vaga.</h1>
      <p>A fonte de dados pode estar indisponível. Você pode tentar novamente.</p>
      <div className="acoes">
        <button className="botao botaoPrimario" type="button" onClick={reset}>
          Tentar de novo
        </button>
        <Link className="botao botaoSecundario" href="/vagas">
          Voltar às vagas
        </Link>
      </div>
    </main>
  );
}
