import Link from "next/link";
import FormularioDeArquivamento from "@/components/FormularioDeArquivamento";
import type { Vaga } from "@/lib/tipos";

type CardDeVagaProps = {
  vaga: Vaga;
  arquivavel?: boolean;
};

export default function CardDeVaga({ vaga, arquivavel = false }: CardDeVagaProps) {
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
      {arquivavel && <FormularioDeArquivamento id={vaga.id} />}
    </article>
  );
}
