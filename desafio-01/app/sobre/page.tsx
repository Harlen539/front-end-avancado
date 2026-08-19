import type { Metadata } from "next";
import Link from "next/link";
import Icone from "@/components/Icone";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o estudante e a proposta do projeto Leque de Vagas.",
};

export default function Sobre() {
  return (
    <main className="pagina-interna">
      <section className="pagina-hero">
        <span className="pagina-hero__forma pagina-hero__forma--um" aria-hidden="true" />
        <span className="pagina-hero__forma pagina-hero__forma--dois" aria-hidden="true" />
        <div className="container pagina-hero__conteudo">
          <span className="etiqueta"><span aria-hidden="true">✦</span> CONHEÇA A HISTÓRIA</span>
          <h1>Sobre <span>mim</span></h1>
          <p>Olá! Meu nome é Harlen e sou estudante de Sistemas para Internet.</p>
        </div>
      </section>

      <section className="secao sobre-conteudo">
        <div className="container sobre-conteudo__grade">
          <aside className="perfil-card">
            <div className="perfil-card__avatar" aria-hidden="true">H</div>
            <span>ESTUDANTE</span>
            <h2>Harlen</h2>
            <p>Sistemas para Internet</p>
            <div className="perfil-card__tags">
              <span>Next.js</span><span>React</span><span>Web</span>
            </div>
          </aside>

          <div className="sobre-conteudo__texto">
            <article>
              <span className="sobre-conteudo__icone"><Icone nome="vaga" /></span>
              <div>
                <span className="secao__rotulo">O PROJETO</span>
                <h2>Sobre este projeto</h2>
                <p>
                  O Leque de Vagas é um projeto desenvolvido durante o semestre
                  para praticar Next.js e desenvolvimento web. A proposta é criar
                  uma experiência clara e acolhedora para pessoas que buscam uma
                  oportunidade na área de tecnologia.
                </p>
              </div>
            </article>

            <article>
              <span className="sobre-conteudo__icone sobre-conteudo__icone--verde"><Icone nome="nivel" /></span>
              <div>
                <span className="secao__rotulo">PRÓXIMOS PASSOS</span>
                <h2>O que espero do semestre</h2>
                <p>
                  Espero ampliar meus conhecimentos, praticar os conceitos vistos
                  em aula e desenvolver projetos cada vez mais completos.
                  Este texto é uma base simples e poderá ser editado depois com
                  minhas próprias palavras.
                </p>
              </div>
            </article>

            <Link className="botao botao--primario" href="/contato">
              Fale comigo <Icone nome="seta" tamanho={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
