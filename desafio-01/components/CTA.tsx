import Link from "next/link";
import Icone from "./Icone";

export default function CTA() {
  return (
    <section className="secao cta-secao" id="empresas" aria-labelledby="titulo-cta">
      <div className="container">
        <div className="cta">
          <span className="cta__brilho" aria-hidden="true" />
          <div className="cta__conteudo">
            <span className="cta__rotulo">SUA PRÓXIMA OPORTUNIDADE ESTÁ AQUI</span>
            <h2 id="titulo-cta">Pronto para dar o próximo passo?</h2>
            <p>Explore oportunidades e comece hoje sua jornada na tecnologia.</p>
            <Link className="botao botao--claro" href="/#vagas">
              Explorar vagas <Icone nome="seta" tamanho={18} />
            </Link>
          </div>
          <div className="cta__leque" aria-hidden="true">
            <span /><span /><span /><span /><span />
            <i>✦</i>
          </div>
        </div>
      </div>
    </section>
  );
}
