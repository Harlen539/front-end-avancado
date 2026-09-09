"use client";

import { useActionState } from "react";
import { criarVaga } from "./acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import CampoDeFormulario from "@/components/CampoDeFormulario";
import { ESTADO_INICIAL } from "@/lib/formularios";
import type { Empresa } from "@/lib/tipos";

export default function FormularioDeVaga({ empresas }: { empresas: Empresa[] }) {
  const [estado, acao] = useActionState(criarVaga, ESTADO_INICIAL, "/vagas/nova");
  return (
    <form action={acao} className="formulario" noValidate>
      <CampoDeFormulario nome="titulo" rotulo="Título" estado={estado} />
      <CampoDeFormulario nome="empresaSlug" rotulo="Empresa" tipo="select" estado={estado}
        opcoes={empresas.map((empresa) => ({ valor: empresa.slug, rotulo: empresa.nome }))} />
      <CampoDeFormulario nome="area" rotulo="Área" estado={estado} />
      <CampoDeFormulario nome="senioridade" rotulo="Senioridade" estado={estado} />
      <CampoDeFormulario nome="local" rotulo="Local / modelo de trabalho" estado={estado} />
      <label className="opcaoCheckbox">
        <input type="checkbox" name="aceitaIniciante" defaultChecked={estado.valores.aceitaIniciante === "on"} />
        Aceita iniciante
      </label>
      {estado.erros.aceitaIniciante && <p className="erroCampo" role="alert">{estado.erros.aceitaIniciante}</p>}
      <CampoDeFormulario nome="descricao" rotulo="Descrição" tipo="textarea" estado={estado} />
      {estado.mensagem && <p role="alert" className="erroCampo">{estado.mensagem}</p>}
      <BotaoDeEnviar esperando="Publicando…">Publicar vaga</BotaoDeEnviar>
    </form>
  );
}
