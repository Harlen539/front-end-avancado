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
        Ao enviar uma candidatura, nome, e-mail e habilidades são enviados ao
        servidor para registrar seu interesse na vaga. Nesta versão acadêmica,
        esses dados ficam temporariamente na memória do servidor e são apagados
        quando ele reinicia. Não há armazenamento em banco de dados.
      </p>
      <p>
        Use dados fictícios para experimentar o projeto. As candidaturas não são
        encaminhadas a empresas reais.
      </p>
    </main>
  );
}
