import Link from "next/link";

export default function Contato() {
  return (
    <main className="conteudo paginaInterna">
      <span className="etiqueta">Contato</span>
      <h2>Vamos conversar?</h2>
      <p>
        Esta é uma página extra do projeto. Em breve, ela poderá receber um
        formulário e links para minhas redes profissionais.
      </p>
      <div className="cartaoContato">
        <span aria-hidden="true">✦</span>
        <div>
          <h3>Projeto em construção</h3>
          <p>Cada nova aula vai trazer uma melhoria para este espaço.</p>
        </div>
      </div>
      <Link className="linkSeta" href="/">
        ← Voltar para o início
      </Link>
    </main>
  );
}
