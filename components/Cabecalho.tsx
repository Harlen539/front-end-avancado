import Link from "next/link";
import Marca from "./Marca";

const links = [
  { href: "/", label: "Início" },
  { href: "/#vagas", label: "Vagas" },
  { href: "/#empresas", label: "Para empresas" },
  { href: "/#conteudos", label: "Dicas" },
  { href: "/sobre", label: "Sobre" },
];

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="container cabecalho__conteudo">
        <Marca />

        <nav className="navegacao-desktop" aria-label="Navegação principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="botao botao--cabecalho" href="/contato">
          Entrar / Cadastrar
        </Link>

        <details className="menu-mobile">
          <summary aria-label="Abrir menu de navegação">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Navegação para celular">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link className="menu-mobile__acao" href="/contato">
              Entrar / Cadastrar
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
