import Link from "next/link";

export default function VagaNaoEncontrada() {
  return (
    <main className="conteudo paginaEstado">
      <span className="codigoEstado">404</span>
      <h1>Esta vaga não existe.</h1>
      <p>Ela pode ter sido encerrada ou o endereço informado está incorreto.</p>
      <Link className="botao botaoPrimario" href="/vagas">
        Ver vagas abertas
      </Link>
    </main>
  );
}
