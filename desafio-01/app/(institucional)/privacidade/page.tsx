import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Política de privacidade do projeto acadêmico Leque de Vagas.",
};

export default function Privacidade() {
  return (
    <main className="conteudo paginaInterna textoLongo">
      <span className="etiqueta">Institucional</span>
      <h1>Privacidade</h1>
      <p>
        Nesta versão, o formulário funciona apenas no navegador. Nenhum nome,
        e-mail ou habilidade é enviado para uma API ou salvo em banco de dados.
      </p>
      <p>
        Uma etapa futura deverá informar de forma transparente quais dados serão
        coletados, por que serão usados e por quanto tempo ficarão armazenados.
      </p>
    </main>
  );
}
