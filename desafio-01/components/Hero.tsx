import Link from "next/link";
import Icone from "./Icone";

const destaques = [
  {
    icone: "vaga" as const,
    titulo: "Vagas reais",
    texto: "de empresas parceiras",
  },
  {
    icone: "livro" as const,
    titulo: "Conteúdo e dicas",
    texto: "para impulsionar você",
  },
  {
    icone: "pessoas" as const,
    titulo: "Para todos os níveis",
    texto: "do iniciante ao avançado",
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__brilho hero__brilho--um" aria-hidden="true" />
      <div className="hero__brilho hero__brilho--dois" aria-hidden="true" />
      <div className="container hero__grade">
        <div className="hero__conteudo">
          <span className="etiqueta">
            <span aria-hidden="true">✦</span> Seu futuro em tecnologia
          </span>
          <h1>
            O próximo passo<br />
            da sua <span>carreira</span>
            <br /> começa aqui.
          </h1>
          <p className="hero__descricao">
            Vagas de tecnologia para quem está em transição de carreira e
            pronto para novas oportunidades.
          </p>
          <div className="hero__acoes">
            <Link className="botao botao--primario" href="/#vagas">
              Buscar vagas <Icone nome="seta" tamanho={18} />
            </Link>
            <Link className="botao botao--secundario" href="/#conteudos">
              Ver dicas
            </Link>
          </div>
          <div className="hero__prova">
            <div className="hero__avatares" aria-hidden="true">
              <span>MA</span>
              <span>JS</span>
              <span>RL</span>
            </div>
            <p>
              <strong>+2 mil pessoas</strong>
              <br />em busca de novos caminhos
            </p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Jornada da transição até a conquista profissional">
          <div className="hero-visual__orbita hero-visual__orbita--um" aria-hidden="true" />
          <div className="hero-visual__orbita hero-visual__orbita--dois" aria-hidden="true" />
          <div className="codigo-flutuante codigo-flutuante--um" aria-hidden="true">
            <span>&lt;/&gt;</span>
          </div>
          <div className="codigo-flutuante codigo-flutuante--dois" aria-hidden="true">
            <span>●</span>
            <i />
            <i />
          </div>

          <div className="mapa-carreira">
            <div className="mapa-carreira__topo">
              <span className="mapa-carreira__icone"><Icone nome="raio" /></span>
              <div>
                <small>SUA JORNADA</small>
                <strong>Um novo caminho</strong>
              </div>
              <span className="mapa-carreira__online">online</span>
            </div>
            <div className="mapa-carreira__trilha" aria-hidden="true">
              <span className="trilha-linha" />
              <div className="trilha-passo trilha-passo--ativo">
                <span>01</span>
                <p>Transição</p>
              </div>
              <div className="trilha-passo">
                <span>02</span>
                <p>Aprender</p>
              </div>
              <div className="trilha-passo">
                <span>03</span>
                <p>Evoluir</p>
              </div>
              <div className="trilha-passo trilha-passo--final">
                <span><Icone nome="check" tamanho={18} /></span>
                <p>Conquistar</p>
              </div>
            </div>
            <div className="mapa-carreira__rodape">
              <span><Icone nome="alvo" tamanho={18} /> Próximo objetivo</span>
              <strong>Primeira vaga em tech</strong>
            </div>
          </div>

          <div className="mini-card mini-card--vaga">
            <span><Icone nome="vaga" tamanho={20} /></span>
            <div><strong>Nova vaga</strong><small>Combina com você</small></div>
          </div>
          <div className="mini-card mini-card--crescimento">
            <span className="mini-grafico" aria-hidden="true"><i /><i /><i /></span>
            <div><strong>+34%</strong><small>oportunidades</small></div>
          </div>
        </div>
      </div>

      <div className="container hero__destaques" aria-label="Destaques da plataforma">
        {destaques.map((item) => (
          <article key={item.titulo}>
            <span><Icone nome={item.icone} tamanho={21} /></span>
            <p><strong>{item.titulo}</strong><small>{item.texto}</small></p>
          </article>
        ))}
      </div>
    </section>
  );
}
