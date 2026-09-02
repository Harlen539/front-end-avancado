import Link from "next/link";
import type { Vaga } from "@/lib/tipos";

type CardDeVagaProps = {
  vaga: Vaga;
};

export default function CardDeVaga({ vaga }: CardDeVagaProps) {
  return (
    <article className="cardVaga">
      <div className="cardVagaTopo">
        <div>
          <p className="areaVaga">{vaga.area}</p>
          <h2>
            <Link href={`/vagas/${vaga.id}`}>{vaga.titulo}</Link>
          </h2>
        </div>
        {vaga.aceitaIniciante && (
          <span className="seloIniciante">Aceita iniciante</span>
        )}
      </div>

      <Link className="empresaLink" href={`/empresas/${vaga.empresaSlug}`}>
        {vaga.empresa}
      </Link>

      <div className="metadadosVaga">
        <span>{vaga.senioridade}</span>
        <span>{vaga.local}</span>
      </div>

      <Link className="linkDetalhe" href={`/vagas/${vaga.id}`}>
        Ver detalhes <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
