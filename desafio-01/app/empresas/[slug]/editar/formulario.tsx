"use client";

import { useActionState } from "react";
import { salvarEmpresa } from "./acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import CampoDeFormulario from "@/components/CampoDeFormulario";
import { ESTADO_INICIAL } from "@/lib/formularios";
import type { Empresa } from "@/lib/tipos";

export default function FormularioDeEmpresa({ empresa }: { empresa: Empresa }) {
  const [estado, acao] = useActionState(salvarEmpresa, ESTADO_INICIAL, `/empresas/${empresa.slug}/editar`);
  return (
    <form action={acao} className="formulario" noValidate>
      <input type="hidden" name="slug" value={empresa.slug} />
      {estado.erros.slug && <p className="erroCampo" role="alert">{estado.erros.slug}</p>}
      <CampoDeFormulario nome="nome" rotulo="Nome" estado={estado} inicial={empresa.nome} />
      <CampoDeFormulario nome="sobre" rotulo="Sobre a empresa" tipo="textarea" estado={estado} inicial={empresa.sobre} />
      <CampoDeFormulario nome="site" rotulo="Site" tipo="url" estado={estado} inicial={empresa.site} />
      {estado.mensagem && <p role="status" className={estado.ok ? "mensagemSucesso" : "erroCampo"}>{estado.mensagem}</p>}
      <BotaoDeEnviar esperando="Salvando…">Salvar perfil</BotaoDeEnviar>
    </form>
  );
}
