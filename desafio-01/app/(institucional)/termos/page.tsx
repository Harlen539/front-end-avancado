import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso do projeto acadêmico Leque de Vagas.",
};

export default function Termos() {
  return (
    <main className="conteudo paginaInterna textoLongo">
      <span className="etiqueta">Institucional</span>
      <h1>Termos de uso</h1>
      <p>
        O Leque de Vagas é um projeto acadêmico. As vagas e empresas exibidas
        são fictícias e existem apenas para demonstrar os recursos da aplicação.
      </p>
      <p>
        As candidaturas são registradas temporariamente no servidor para fins de
        demonstração. Os dados escritos nesta versão são apagados quando o
        servidor reinicia e não representam inscrições em processos seletivos reais.
      </p>
    </main>
  );
}
