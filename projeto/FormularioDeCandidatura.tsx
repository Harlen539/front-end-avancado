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

  if (estado.ok) return <section className="sucessoCandidatura" role="status">
    <h2>{estado.mensagem}</h2>
    <p>{estado.valores.nome}, recebemos sua candidatura para {tituloDaVaga}.</p>
  </section>;

  return <section className="candidatura">
    <h2>Candidatar-se</h2>
    <form action={acao} className="formulario" noValidate>
      <input type="hidden" name="vagaId" value={vagaId} />
      <CampoDeFormulario nome="nome" rotulo="Nome" estado={estado} />
      <CampoDeFormulario nome="email" rotulo="E-mail" tipo="email" estado={estado} />
      <fieldset className="habilidadesFormulario">
        <legend>Habilidades</legend>
        <div className="opcoesHabilidades">
          {HABILIDADES.map((habilidade) => <label className="opcaoCheckbox" key={habilidade}>
            <input type="checkbox" name="habilidades" value={habilidade} defaultChecked={selecionadas.includes(habilidade)} />
            {habilidade}
          </label>)}
        </div>
        <label htmlFor="outra-habilidade">Outra habilidade</label>
        <input id="outra-habilidade" name="habilidades" defaultValue={selecionadas.find((valor) => !HABILIDADES.includes(valor)) ?? ""} />
        {estado.erros.habilidades && <p className="erroCampo" role="alert">{estado.erros.habilidades}</p>}
      </fieldset>
      {estado.erros.vagaId && <p className="erroCampo" role="alert">{estado.erros.vagaId}</p>}
      {estado.mensagem && <p className="erroCampo" role="alert">{estado.mensagem}</p>}
      <BotaoDeEnviar>Enviar candidatura</BotaoDeEnviar>
    </form>
  </section>;
}
