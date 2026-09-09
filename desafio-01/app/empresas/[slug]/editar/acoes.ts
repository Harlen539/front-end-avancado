"use server";

import { revalidatePath } from "next/cache";
import { buscarEmpresa, guardarEmpresa } from "@/lib/api";
import { EsquemaDaEmpresa } from "@/lib/esquemas";
import { estadoInvalido, valoresDoFormulario } from "@/lib/formularios";
import type { Estado } from "@/lib/tipos";

export async function salvarEmpresa(_anterior: Estado, dados: FormData): Promise<Estado> {
  const resultado = EsquemaDaEmpresa.safeParse(Object.fromEntries(dados));
  const valores = valoresDoFormulario(dados);
  if (!resultado.success) return estadoInvalido(resultado.error, valores);
  try {
    if (!await buscarEmpresa(resultado.data.slug)) {
      return { ok: false, erros: { slug: "Empresa não encontrada." }, valores };
    }
    guardarEmpresa(resultado.data);
  } catch {
    return { ok: false, erros: {}, valores, mensagem: "Não foi possível salvar o perfil. Tente novamente." };
  }
  // A listagem e o perfil são caches de rotas distintos e ambos exibem o nome.
  revalidatePath("/empresas");
  revalidatePath(`/empresas/${resultado.data.slug}`);
  revalidatePath(`/empresas/${resultado.data.slug}/editar`);
  // Os cartões, detalhes e opções de nova vaga também mostram o nome da empresa.
  revalidatePath("/vagas");
  revalidatePath("/vagas/[id]", "page");
  revalidatePath("/vagas/nova");
  return { ok: true, erros: {}, valores: resultado.data, mensagem: "Perfil atualizado." };
}
