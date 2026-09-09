"use server";

import { redirect } from "next/navigation";
import { buscarEmpresa, guardarVaga } from "@/lib/api";
import { EsquemaDaVaga } from "@/lib/esquemas";
import { estadoInvalido, valoresDoFormulario } from "@/lib/formularios";
import { revalidarCatalogo } from "@/lib/revalidar";
import type { Estado } from "@/lib/tipos";

export async function criarVaga(_anterior: Estado, dados: FormData): Promise<Estado> {
  const resultado = EsquemaDaVaga.safeParse(Object.fromEntries(dados));
  const valores = valoresDoFormulario(dados);
  if (!resultado.success) return estadoInvalido(resultado.error, valores);

  const id = crypto.randomUUID();
  try {
    const empresa = await buscarEmpresa(resultado.data.empresaSlug);
    if (!empresa) return { ok: false, erros: { empresaSlug: "Selecione uma empresa existente." }, valores };
    guardarVaga({ ...resultado.data, id, empresa: empresa.nome, publicadaEm: new Date().toISOString().slice(0, 10) });
  } catch {
    return { ok: false, erros: {}, valores, mensagem: "Não foi possível publicar a vaga. Tente novamente." };
  }
  revalidarCatalogo(id, resultado.data.empresaSlug);
  // redirect lança uma exceção de controle; deve ficar fora do try/catch.
  redirect(`/vagas/${id}`);
}
