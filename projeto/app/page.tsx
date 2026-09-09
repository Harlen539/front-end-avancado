import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="conteudo heroConteudo">
          <span className="etiqueta">Vagas de entrada de verdade</span>
          <h1>
            Seu próximo passo em tecnologia <em>começa aqui.</em>
          </h1>
          <p>
            Encontre oportunidades por área, senioridade e modelo de trabalho —
            com destaque para empresas que recebem quem ainda está construindo experiência.
          </p>
          <div className="acoes">
            <Link className="botao botaoPrimario" href="/vagas">
              Explorar vagas
            </Link>
            <Link className="botao botaoSecundario" href="/sobre">
              Conhecer o projeto
            </Link>
          </div>
        </div>
      </section>

      <section className="conteudo beneficios" aria-labelledby="titulo-beneficios">
        <div className="cabecalhoSecao">
          <span className="etiqueta">Feito para começar</span>
          <h2 id="titulo-beneficios">Menos tempo filtrando. Mais tempo se preparando.</h2>
        </div>
        <div className="gradeBeneficios">
          <article>
            <span>01</span>
            <h3>Vagas honestas</h3>
            <p>Senioridade e abertura para iniciantes aparecem antes do clique.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Busca rápida</h3>
            <p>Combine palavras e áreas para chegar às oportunidades relevantes.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Contexto completo</h3>
            <p>Conheça a empresa, a vaga e o modelo de trabalho num só fluxo.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
