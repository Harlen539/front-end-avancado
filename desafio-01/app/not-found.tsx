import Link from "next/link";

export default function PaginaNaoEncontrada() {
  return (
    <main className="conteudo paginaEstado">
      <span className="codigoEstado">404</span>
      <h1>Esta página não existe.</h1>
      <p>O endereço pode ter mudado ou ter sido digitado incorretamente.</p>
      <Link className="botao botaoPrimario" href="/">
        Voltar ao início
      </Link>
    </main>
  );
}
