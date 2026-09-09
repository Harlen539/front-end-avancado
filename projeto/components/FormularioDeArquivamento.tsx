"use client";

import { useActionState } from "react";
import { arquivar } from "@/app/vagas/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import { ESTADO_INICIAL } from "@/lib/formularios";

export default function FormularioDeArquivamento({ id }: { id: string }) {
  const [estado, acao] = useActionState(arquivar, ESTADO_INICIAL, "/vagas");
  return (
    <form action={acao} className="formularioArquivar">
      <input type="hidden" name="id" value={id} />
      <BotaoDeEnviar esperando="Arquivando…" secundario>Arquivar</BotaoDeEnviar>
      {(estado.erros.id || estado.mensagem) && <p role="status" className="erroCampo">{estado.erros.id || estado.mensagem}</p>}
    </form>
  );
}
