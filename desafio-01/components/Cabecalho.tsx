import Link from "next/link";
import MenuLink from "@/components/MenuLink";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link className="marca" href="/" aria-label="Ir para a página inicial">
        <span className="marcaIcone" aria-hidden="true">
          LV
        </span>
        <span>
          <strong>Leque de Vagas</strong>
          <small>Oportunidades para começar</small>
        </span>
      </Link>

      <nav aria-label="Navegação principal">
        <MenuLink href="/">Início</MenuLink>
        <MenuLink href="/vagas">Vagas</MenuLink>
        <MenuLink href="/empresas">Empresas</MenuLink>
        <MenuLink href="/sobre">Sobre</MenuLink>
      </nav>
    </header>
  );
}
