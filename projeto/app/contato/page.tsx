import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o projeto Leque de Vagas.",
};

export default function Contato() {
  return (
    <main className="conteudo paginaInterna textoLongo">
      <span className="etiqueta">Contato</span>
      <h1>Vamos conversar?</h1>
      <p>
        Esta rota extra mantém o exercício de navegação da primeira aula e está
        pronta para receber um formulário em uma etapa futura do projeto.
      </p>
      <Link className="linkSeta" href="/">
        <span aria-hidden="true">←</span> Voltar ao início
      </Link>
    </main>
  );
}
