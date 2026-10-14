import { enviarCandidaturaSemJavaScript } from "@/app/vagas/[id]/acoes";
import { HABILIDADES } from "@/lib/esquemas";
import type { Candidatura } from "@/lib/tipos";

type Props = {
  vagaId: string;
  candidato?: Candidatura;
  erros?: Record<string, string>;
  corrigindo?: boolean;
  sucesso?: boolean;
  corrigida?: boolean;
  quantidadeHabilidades?: number;
};

export default function FormularioNativoDeCandidatura({
  vagaId,
  candidato,
  erros = {},
  corrigindo = false,
  sucesso = false,
  corrigida = false,
  quantidadeHabilidades,
}: Props) {
  const formulario = (
    <form action={enviarCandidaturaSemJavaScript} className="formulario" noValidate>
      <input type="hidden" name="vagaId" value={vagaId} />
      {corrigindo && <input type="hidden" name="corrigindo" value="1" />}
      <label>
        Nome
        <input name="nome" type="text" autoComplete="name" defaultValue={candidato?.nome ?? ""} aria-invalid={Boolean(erros.nome)} />
        {erros.nome && <span className="erroCampo" role="alert">{erros.nome}</span>}
      </label>
      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" defaultValue={candidato?.email ?? ""} aria-invalid={Boolean(erros.email)} />
        {erros.email && <span className="erroCampo" role="alert">{erros.email}</span>}
      </label>
      <fieldset className="habilidadesFormulario" aria-describedby={erros.habilidades ? `habilidades-erro-${vagaId}` : undefined}>
        <legend>Habilidades</legend>
        <div className="opcoesHabilidades">
          {HABILIDADES.map((habilidade) => (
            <label className="opcaoCheckbox" key={habilidade}>
              <input type="checkbox" name="habilidades" value={habilidade} defaultChecked={candidato?.habilidades.includes(habilidade)} />
              {habilidade}
            </label>
          ))}
        </div>
        <label htmlFor={`outra-habilidade-nativa-${vagaId}`}>Outra habilidade (opcional)</label>
        <input
          id={`outra-habilidade-nativa-${vagaId}`}
          name="habilidades"
          type="text"
          defaultValue={candidato?.habilidades.find((valor) => !HABILIDADES.includes(valor)) ?? ""}
        />
        {erros.habilidades && <p id={`habilidades-erro-${vagaId}`} className="erroCampo" role="alert">{erros.habilidades}</p>}
      </fieldset>
      {erros.vagaId && <p className="erroCampo" role="alert">{erros.vagaId}</p>}
      {erros.formulario && <p className="erroCampo" role="alert">{erros.formulario}</p>}
      <button className="botao botaoPrimario" type="submit">
        {corrigindo ? "Salvar correção" : "Enviar candidatura"}
      </button>
    </form>
  );

  if (corrigindo && candidato) {
    return (
      <details className="corrigirCandidatura">
        <summary>Corrigir alguma coisa?</summary>
        <p>Atualize os dados enviados. A correção altera a candidatura existente e não cria outra.</p>
        {formulario}
      </details>
    );
  }

  return (
    <>
      {sucesso && (
        <section className="sucessoCandidatura" role="status">
          <span aria-hidden="true">✓</span>
          <h2>{corrigida ? "Candidatura corrigida!" : "Candidatura enviada!"}</h2>
          {quantidadeHabilidades !== undefined && <p>Recebemos sua candidatura com {quantidadeHabilidades} habilidade{quantidadeHabilidades === 1 ? "" : "s"} informada{quantidadeHabilidades === 1 ? "" : "s"}.</p>}
        </section>
      )}
      {sucesso ? (
        <details className="corrigirCandidatura" open={Boolean(Object.keys(erros).length)}>
          <summary>Corrigir alguma coisa?</summary>
          <p>Atualize os dados enviados. A correção altera a candidatura existente e não cria outra.</p>
          {formulario}
        </details>
      ) : (
        <section className="candidatura" aria-labelledby={`titulo-candidatura-nativa-${vagaId}`}>
      <div className="cabecalhoSecao">
        <span className="etiqueta">Candidatura</span>
        <h2 id={`titulo-candidatura-nativa-${vagaId}`}>Mostre seu interesse</h2>
        <p>Preencha seus dados e inclua pelo menos uma habilidade.</p>
      </div>
      {formulario}
        </section>
      )}
    </>
  );
}
