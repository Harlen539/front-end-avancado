"use server";

import { revalidatePath } from "next/cache";
import { buscarVaga, guardarCandidatura } from "@/lib/api";
import { EsquemaDaCandidatura } from "@/lib/esquemas";
import { estadoInvalido, valoresDoFormulario } from "@/lib/formularios";
import type { Estado } from "@/lib/tipos";

export async function enviarCandidatura(_anterior: Estado, dados: FormData): Promise<Estado> {
  const resultado = EsquemaDaCandidatura.safeParse({
    ...Object.fromEntries(dados), habilidades: dados.getAll("habilidades").filter((valor) => typeof valor !== "string" || valor.trim() !== ""),
  });
  const valores = { ...valoresDoFormulario(dados), habilidades: JSON.stringify(dados.getAll("habilidades").filter((valor) => typeof valor === "string")) };
  if (!resultado.success) return estadoInvalido(resultado.error, valores);
  try {
    if (!await buscarVaga(resultado.data.vagaId)) {
      return { ok: false, erros: { vagaId: "Esta vaga não está mais disponível." }, valores };
    }
    guardarCandidatura({ ...resultado.data, id: crypto.randomUUID() });
  } catch {
    return { ok: false, erros: {}, valores, mensagem: "Não foi possível enviar a candidatura. Tente novamente." };
  }
  revalidatePath(`/vagas/${resultado.data.vagaId}`);
  return { ok: true, erros: {}, valores, mensagem: "Candidatura enviada!" };
}
