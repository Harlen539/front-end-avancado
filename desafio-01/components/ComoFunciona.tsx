import Icone from "./Icone";

const etapas = [
  {
    numero: "1",
    icone: "busca" as const,
    titulo: "Busque vagas",
    texto: "Use os filtros para encontrar vagas que combinam com seu perfil.",
  },
  {
    numero: "2",
    icone: "vaga" as const,
    titulo: "Candidate-se",
    texto: "Encontre oportunidades e apresente seu potencial para as empresas.",
  },
  {
    numero: "3",
    icone: "nivel" as const,
    titulo: "Acompanhe",
    texto: "Organize sua jornada e continue buscando novas oportunidades.",
  },
  {
    numero: "4",
    icone: "alvo" as const,
    titulo: "Conquiste",
    texto: "Dê o próximo passo da sua carreira na área de tecnologia.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="secao como-funciona" aria-labelledby="titulo-como-funciona">
      <div className="container">
        <div className="secao__cabecalho secao__cabecalho--central">
          <span className="secao__rotulo">SIMPLES E DIRETO</span>
          <h2 id="titulo-como-funciona">Como funciona?</h2>
          <p>Quatro passos para transformar intenção em oportunidade.</p>
        </div>
        <div className="etapas">
          {etapas.map((etapa, indice) => (
            <article className="etapa" key={etapa.numero}>
              <div className="etapa__topo">
                <span className="etapa__numero">{etapa.numero}</span>
                {indice < etapas.length - 1 && <span className="etapa__linha" aria-hidden="true" />}
              </div>
              <span className="etapa__icone"><Icone nome={etapa.icone} /></span>
              <h3>{etapa.titulo}</h3>
              <p>{etapa.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
