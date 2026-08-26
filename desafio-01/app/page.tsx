import Link from "next/link";

export default function Home() {
  console.log("🔎 A página de vagas foi executada!");

  return (
    <main className="conteudo">
      <section className="hero">
        <span className="etiqueta">Meu primeiro projeto com Next.js</span>
        <h2>Um novo caminho começa com o primeiro passo.</h2>
        <p>
          Este projeto marca o início da minha jornada com Next.js e reúne o
          que aprendi sobre componentes, rotas e navegação.
        </p>
        <div className="acoes">
          <Link className="botao botaoPrimario" href="/sobre">
            Conheça minha história
          </Link>
          <Link className="botao botaoSecundario" href="/contato">
            Entre em contato
          </Link>
        </div>
      </section>

      <section className="aprendizados" aria-labelledby="titulo-aprendizados">
        <div>
          <span className="numero">01</span>
          <h3 id="titulo-aprendizados">Componentes</h3>
          <p>Peças reutilizáveis deixam o código mais organizado e consistente.</p>
        </div>
        <div>
          <span className="numero">02</span>
          <h3>Rotas</h3>
          <p>Cada pasta dentro de app pode representar uma página do projeto.</p>
        </div>
        <div>
          <span className="numero">03</span>
          <h3>Deploy</h3>
          <p>Publicar transforma o projeto local em uma experiência acessível.</p>
        </div>
      </section>
    </main>
  );
}
