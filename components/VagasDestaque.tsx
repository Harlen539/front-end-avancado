import Link from "next/link";
import Icone from "./Icone";

const vagas = [
  {
    cargo: "Analista de Suporte Jr.",
    empresa: "Tech Solutions",
    sigla: "TS",
    modalidade: "Remoto",
    tags: ["Suporte", "Atendimento", "Júnior", "Efetivo"],
    cor: "lilas",
  },
  {
    cargo: "Desenvolvedor(a) Front-end",
    empresa: "InovaSoft",
    sigla: "IS",
    modalidade: "Híbrido • João Pessoa, PB",
    tags: ["Desenvolvimento", "Júnior", "CLT"],
    cor: "verde",
  },
  {
    cargo: "Analista de Dados Jr.",
    empresa: "DataInsight",
    sigla: "DI",
    modalidade: "Remoto",
    tags: ["Dados", "BI", "Júnior", "Efetivo"],
    cor: "azul",
  },
  {
    cargo: "QA Tester",
    empresa: "Quality Codes",
    sigla: "QC",
    modalidade: "Híbrido • Recife, PE",
    tags: ["QA", "Testes", "Júnior", "CLT"],
    cor: "rosa",
  },
];

export default function VagasDestaque() {
  return (
    <section className="secao vagas" id="vagas" aria-labelledby="titulo-vagas">
      <div className="container">
        <div className="secao__cabecalho secao__cabecalho--linha">
          <div>
            <span className="secao__rotulo">OPORTUNIDADES PARA COMEÇAR</span>
            <h2 id="titulo-vagas">Vagas em destaque</h2>
          </div>
          <Link className="link-seta" href="/#vagas">
            Ver todas as vagas <Icone nome="seta" tamanho={18} />
          </Link>
        </div>

        <div className="vagas__grade">
          {vagas.map((vaga, indice) => (
            <article className="vaga-card" key={vaga.cargo}>
              <div className="vaga-card__topo">
                <span className={`vaga-card__logo vaga-card__logo--${vaga.cor}`}>
                  {vaga.sigla}
                </span>
                <span className="vaga-card__tempo">há {indice + 1} dia{indice > 0 ? "s" : ""}</span>
              </div>
              <h3>{vaga.cargo}</h3>
              <p className="vaga-card__empresa">
                <Icone nome="predio" tamanho={17} /> {vaga.empresa}
              </p>
              <p className="vaga-card__local">
                <Icone nome="local" tamanho={17} /> {vaga.modalidade}
              </p>
              <div className="vaga-card__tags" aria-label="Características da vaga">
                {vaga.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <Link className="vaga-card__link" href="/contato">
                Ver oportunidade <Icone nome="seta" tamanho={17} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
