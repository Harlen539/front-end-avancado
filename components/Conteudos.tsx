import Link from "next/link";
import Icone from "./Icone";

const conteudos = [
  {
    indice: "01",
    titulo: "Como montar um currículo para área de tecnologia",
    descricao: "Dicas práticas para destacar suas habilidades mesmo em transição.",
    categoria: "Carreira",
    tempo: "5 min de leitura",
    estilo: "curriculo",
  },
  {
    indice: "02",
    titulo: "5 habilidades mais desejadas pelas empresas",
    descricao: "Veja competências que podem abrir portas para você.",
    categoria: "Habilidades",
    tempo: "6 min de leitura",
    estilo: "habilidades",
  },
  {
    indice: "03",
    titulo: "Transição de carreira: por onde começar?",
    descricao: "Passos práticos para organizar sua mudança e conquistar espaço em tecnologia.",
    categoria: "Transição",
    tempo: "7 min de leitura",
    estilo: "transicao",
  },
];

export default function Conteudos() {
  return (
    <section className="secao conteudos" id="conteudos" aria-labelledby="titulo-conteudos">
      <div className="container">
        <div className="secao__cabecalho secao__cabecalho--linha">
          <div>
            <span className="secao__rotulo">APRENDA E SE PREPARE</span>
            <h2 id="titulo-conteudos">Conteúdos para te ajudar</h2>
          </div>
          <Link className="link-seta" href="/#conteudos">
            Ver todos os conteúdos <Icone nome="seta" tamanho={18} />
          </Link>
        </div>
        <div className="conteudos__grade">
          {conteudos.map((conteudo) => (
            <article className="conteudo-card" key={conteudo.indice}>
              <div className={`conteudo-card__visual conteudo-card__visual--${conteudo.estilo}`} aria-hidden="true">
                <span className="conteudo-card__numero">{conteudo.indice}</span>
                <span className="conteudo-card__janela">
                  <i /><i /><i />
                  <b />
                  <b />
                  <b />
                </span>
              </div>
              <div className="conteudo-card__corpo">
                <span className="conteudo-card__categoria">{conteudo.categoria}</span>
                <h3>{conteudo.titulo}</h3>
                <p>{conteudo.descricao}</p>
                <div className="conteudo-card__meta">
                  <span><Icone nome="relogio" tamanho={16} /> {conteudo.tempo}</span>
                  <Link href="/#conteudos" aria-label={`Ler: ${conteudo.titulo}`}>
                    <Icone nome="seta" tamanho={18} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
