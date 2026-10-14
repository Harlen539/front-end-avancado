"use client";

import { useActionState } from "react";
import { enviarCandidatura } from "@/app/vagas/[id]/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import CampoDeFormulario from "@/components/CampoDeFormulario";
import { HABILIDADES } from "@/lib/esquemas";
import type { Candidatura, Estado } from "@/lib/tipos";

type Props = {
  tituloDaVaga: string;
  vagaId: string;
  candidaturaSalva?: Candidatura;
  mensagemInicial?: string;
  errosIniciais?: Record<string, string>;
};

export default function FormularioDeCandidatura({
  tituloDaVaga,
  vagaId,
  candidaturaSalva,
  mensagemInicial,
  errosIniciais,
}: Props) {
  const estadoInicial: Estado = {
    ok: Boolean(mensagemInicial),
    erros: errosIniciais ?? {},
    valores: candidaturaSalva
      ? {
          nome: candidaturaSalva.nome,
          email: candidaturaSalva.email,
          habilidades: JSON.stringify(candidaturaSalva.habilidades),
          candidaturaId: candidaturaSalva.id,
        }
      : {},
    mensagem: mensagemInicial,
  };
  const [estado, acao] = useActionState(enviarCandidatura, estadoInicial, `/vagas/${vagaId}`);
  const selecionadas: string[] = JSON.parse(estado.valores.habilidades ?? "[]");
  const formulario = (
    <form action={acao} className="formulario" noValidate>
      <input type="hidden" name="vagaId" value={vagaId} />
      {estado.valores.candidaturaId && (
        <input type="hidden" name="candidaturaId" value={estado.valores.candidaturaId} />
      )}
      {estado.erros.vagaId && <p className="erroCampo" role="alert">{estado.erros.vagaId}</p>}
      {estado.erros.candidaturaId && <p className="erroCampo" role="alert">{estado.erros.candidaturaId}</p>}
      <CampoDeFormulario nome="nome" rotulo="Nome" autoComplete="name" estado={estado} />
      <CampoDeFormulario nome="email" rotulo="E-mail" tipo="email" autoComplete="email" estado={estado} />
      <fieldset className="habilidadesFormulario" aria-describedby={estado.erros.habilidades ? "habilidades-erro" : undefined}>
        <legend>Habilidades</legend>
        <div className="opcoesHabilidades">
          {HABILIDADES.map((habilidade) => (
            <label className="opcaoCheckbox" key={habilidade}>
              <input type="checkbox" name="habilidades" value={habilidade} defaultChecked={selecionadas.includes(habilidade)} />
              {habilidade}
            </label>
          ))}
        </div>
        <label htmlFor={`outra-habilidade-${vagaId}`}>Outra habilidade (opcional)</label>
        <input id={`outra-habilidade-${vagaId}`} name="habilidades" type="text" defaultValue={selecionadas.find((valor) => !HABILIDADES.includes(valor)) ?? ""} />
        {estado.erros.habilidades && <p id="habilidades-erro" className="erroCampo" role="alert">{estado.erros.habilidades}</p>}
      </fieldset>
      {estado.mensagem && !estado.ok && <p className="erroCampo" role="alert">{estado.mensagem}</p>}
      <BotaoDeEnviar>{estado.ok ? "Salvar correção" : "Enviar candidatura"}</BotaoDeEnviar>
    </form>
  );

  if (estado.ok) {
    return (
      <>
        <section className="sucessoCandidatura" role="status">
          <span aria-hidden="true">✓</span>
          <h2>{estado.mensagem}</h2>
          <p>{estado.valores.nome}, recebemos seu interesse em <strong>{tituloDaVaga}</strong> com {selecionadas.length} habilidade{selecionadas.length === 1 ? "" : "s"} informada{selecionadas.length === 1 ? "" : "s"}.</p>
        </section>
        <details className="corrigirCandidatura">
          <summary>Corrigir alguma coisa?</summary>
          <p>Atualize os dados enviados. A correção altera a candidatura existente e não cria outra.</p>
          {formulario}
        </details>
      </>
    );
  }

  return (
    <section className="candidatura" aria-labelledby="titulo-candidatura">
      <div className="cabecalhoSecao">
        <span className="etiqueta">Candidatura</span>
        <h2 id="titulo-candidatura">Mostre seu interesse</h2>
        <p>Preencha seus dados e inclua pelo menos uma habilidade.</p>
      </div>
      {formulario}
    </section>
  );
}
