"use server";

import { arquivarVaga, buscarVaga } from "@/lib/api";
import { EsquemaDeArquivamento } from "@/lib/esquemas";
import { estadoInvalido, valoresDoFormulario } from "@/lib/formularios";
import { revalidarCatalogo } from "@/lib/revalidar";
import type { Estado } from "@/lib/tipos";

export async function arquivar(_anterior: Estado, dados: FormData): Promise<Estado> {
  const resultado = EsquemaDeArquivamento.safeParse(Object.fromEntries(dados));
  const valores = valoresDoFormulario(dados);
  if (!resultado.success) return estadoInvalido(resultado.error, valores);
  let empresaSlug: string;
  try {
    const vaga = await buscarVaga(resultado.data.id);
    if (!vaga) return { ok: false, erros: { id: "Esta vaga não está mais disponível." }, valores };
    empresaSlug = vaga.empresaSlug;
    arquivarVaga(vaga.id);
  } catch {
    return { ok: false, erros: {}, valores, mensagem: "Não foi possível arquivar a vaga. Tente novamente." };
  }
  revalidarCatalogo(resultado.data.id, empresaSlug);
  return { ok: true, erros: {}, valores: {}, mensagem: "Vaga arquivada." };
}
