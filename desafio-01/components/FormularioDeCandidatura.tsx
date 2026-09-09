"use client";

import { useActionState } from "react";
import { enviarCandidatura } from "@/app/vagas/[id]/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import CampoDeFormulario from "@/components/CampoDeFormulario";
import { HABILIDADES } from "@/lib/esquemas";
import { ESTADO_INICIAL } from "@/lib/formularios";

export default function FormularioDeCandidatura({ tituloDaVaga, vagaId }: { tituloDaVaga: string; vagaId: string }) {
  const [estado, acao] = useActionState(enviarCandidatura, ESTADO_INICIAL, `/vagas/${vagaId}`);
  const selecionadas: string[] = JSON.parse(estado.valores.habilidades ?? "[]");
  if (estado.ok) {
    return (
      <section className="sucessoCandidatura" role="status">
        <span aria-hidden="true">✓</span>
        <h2>{estado.mensagem}</h2>
        <p>{estado.valores.nome}, recebemos seu interesse em <strong>{tituloDaVaga}</strong> e suas habilidades.</p>
      </section>
    );
  }
  return (
    <section className="candidatura" aria-labelledby="titulo-candidatura">
      <div className="cabecalhoSecao">
        <span className="etiqueta">Candidatura</span>
        <h2 id="titulo-candidatura">Mostre seu interesse</h2>
        <p>Preencha seus dados e inclua pelo menos uma habilidade.</p>
      </div>
      <form action={acao} className="formulario" noValidate>
        <input type="hidden" name="vagaId" value={vagaId} />
        {estado.erros.vagaId && <p className="erroCampo" role="alert">{estado.erros.vagaId}</p>}
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
          <label htmlFor="outra-habilidade">Outra habilidade (opcional)</label>
          <input id="outra-habilidade" name="habilidades" type="text" defaultValue={selecionadas.find((valor) => !HABILIDADES.includes(valor)) ?? ""} />
          {estado.erros.habilidades && <p id="habilidades-erro" className="erroCampo" role="alert">{estado.erros.habilidades}</p>}
        </fieldset>
        {estado.mensagem && <p className="erroCampo" role="alert">{estado.mensagem}</p>}
        <BotaoDeEnviar>Enviar candidatura</BotaoDeEnviar>
      </form>
    </section>
  );
}
