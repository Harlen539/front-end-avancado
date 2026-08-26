import Link from "next/link";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link className="marca" href="/" aria-label="Ir para a página inicial">
        <span className="marcaIcone" aria-hidden="true">N</span>
        <h1>Primeiro Next</h1>
      </Link>

      <nav aria-label="Navegação principal">
        <Link href="/">Início</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/contato">Contato</Link>
      </nav>
    </header>
  );
}
