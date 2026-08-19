import Link from "next/link";
import Marca from "./Marca";

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape__grade">
          <div className="rodape__apresentacao">
            <Marca variante="escura" />
            <p>
              Conectamos pessoas em transição de carreira a oportunidades em
              tecnologia.
            </p>
          </div>

          <nav className="rodape__coluna" aria-label="Navegação do rodapé">
            <strong>Navegação</strong>
            <Link href="/">Início</Link>
            <Link href="/#vagas">Vagas</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Contato</Link>
          </nav>

          <nav className="rodape__coluna" aria-label="Links para empresas">
            <strong>Para empresas</strong>
            <Link href="/contato">Publicar vaga</Link>
            <Link href="/sobre">Sobre o projeto</Link>
            <Link href="/contato">Contato</Link>
          </nav>

          <nav className="rodape__coluna" aria-label="Links de conteúdo">
            <strong>Conteúdo</strong>
            <Link href="/#conteudos">Dicas de carreira</Link>
            <Link href="/#conteudos">Transição</Link>
            <Link href="/#conteudos">Tecnologia</Link>
          </nav>
        </div>
        <div className="rodape__base">
          <span>© 2026 Leque de Vagas. Todos os direitos reservados.</span>
          <span>Feito para abrir novos caminhos.</span>
        </div>
      </div>
    </footer>
  );
}
