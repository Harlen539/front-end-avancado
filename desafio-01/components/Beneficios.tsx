import Icone from "./Icone";

const beneficios = [
  {
    numero: "01",
    icone: "alvo" as const,
    titulo: "Focado em transição",
    texto: "Conectamos você a oportunidades que valorizam sua mudança de carreira.",
  },
  {
    numero: "02",
    icone: "livro" as const,
    titulo: "Conteúdo que ajuda",
    texto: "Dicas, guias e materiais para você se preparar e se destacar.",
  },
  {
    numero: "03",
    icone: "vaga" as const,
    titulo: "Vagas de verdade",
    texto: "Oportunidades reais de empresas que estão contratando.",
  },
  {
    numero: "04",
    icone: "pessoas" as const,
    titulo: "Comunidade que apoia",
    texto: "Informação e oportunidades para acompanhar você nessa jornada.",
  },
];

export default function Beneficios() {
  return (
    <section className="secao beneficios" aria-labelledby="titulo-beneficios">
      <div className="container">
        <div className="secao__cabecalho secao__cabecalho--central">
          <span className="secao__rotulo">FEITO PARA A SUA JORNADA</span>
          <h2 id="titulo-beneficios">Por que o Leque de Vagas?</h2>
          <p>Mais do que oportunidades: apoio para você avançar com confiança.</p>
        </div>
        <div className="beneficios__grade">
          {beneficios.map((item) => (
            <article className="beneficio-card" key={item.numero}>
              <span className="beneficio-card__numero">{item.numero}</span>
              <span className="beneficio-card__icone"><Icone nome={item.icone} /></span>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
