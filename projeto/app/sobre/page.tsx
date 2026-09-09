import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o propósito do Leque de Vagas.",
};

export default function Sobre() {
  return (
    <main className="conteudo paginaInterna textoLongo">
      <span className="etiqueta">Sobre o projeto</span>
      <h1>O começo da carreira não deveria parecer um labirinto.</h1>
      <p>
        O Leque de Vagas ajuda pessoas em transição de carreira a encontrar
        oportunidades de tecnologia compatíveis com o momento em que estão.
        A proposta é deixar claros a área, a senioridade, o modelo de trabalho
        e, principalmente, se a empresa aceita quem ainda está começando.
      </p>
      <p>
        Este projeto foi desenvolvido durante as aulas de Introdução ao Next.js.
        Até a aula 4 ele reúne componentes de servidor e cliente, rotas dinâmicas,
        estado, dados externos, cache, revalidação, streaming e metadata.
      </p>
      <Link className="linkSeta" href="/vagas">
        Conhecer as vagas <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
