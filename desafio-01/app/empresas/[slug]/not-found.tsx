import Link from "next/link";

export default function EmpresaNaoEncontrada() {
  return (
    <main className="conteudo paginaEstado">
      <span className="codigoEstado">404</span>
      <h1>Esta empresa não foi encontrada.</h1>
      <p>Confira o endereço ou conheça as empresas que estão publicando vagas.</p>
      <Link className="botao botaoPrimario" href="/empresas">
        Ver empresas
      </Link>
    </main>
  );
}
