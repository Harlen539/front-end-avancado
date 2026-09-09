import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Esqueleto from "@/components/Esqueleto";
import ListagemDeVagas from "@/components/ListagemDeVagas";
import NumerosDoCatalogo from "@/components/NumerosDoCatalogo";

export const metadata: Metadata = {
  title: "Vagas",
  description:
    "Busque vagas de tecnologia por área e encontre oportunidades para iniciantes.",
};

export default function PaginaDeVagas() {
  return (
    <main className="conteudo paginaVagas">
      <div className="topoPagina">
        <span className="etiqueta">Oportunidades abertas</span>
        <h1>Encontre uma vaga que combine com o seu momento.</h1>
        <div className="acoes"><Link className="botao botaoPrimario" href="/vagas/nova">Publicar vaga</Link></div>
        <Suspense fallback={<Esqueleto />}>
          <NumerosDoCatalogo />
        </Suspense>
      </div>

      <Suspense fallback={<Esqueleto completo />}>
        <ListagemDeVagas />
      </Suspense>
    </main>
  );
}
