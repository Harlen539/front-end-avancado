"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buscarVaga, corrigirCandidatura, guardarCandidatura } from "@/lib/api";
import { EsquemaDaCandidatura, EsquemaDoId } from "@/lib/esquemas";
import { estadoInvalido, valoresDoFormulario } from "@/lib/formularios";
import type { Estado } from "@/lib/tipos";

const cookieDaCandidatura = (vagaId: string) => `candidatura-${vagaId}`;
const cookieOptions = (vagaId: string) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: `/vagas/${vagaId}`,
  maxAge: 60 * 15,
});

export async function enviarCandidatura(_anterior: Estado, dados: FormData): Promise<Estado> {
  const idRecebido = dados.get("candidaturaId");
  const idExistente = typeof idRecebido === "string" ? idRecebido.trim() : "";
  if (idExistente && !EsquemaDoId.safeParse(idExistente).success) {
    return { ok: false, erros: { candidaturaId: "Identificador de candidatura inválido." }, valores: valoresDoFormulario(dados) };
  }
  const resultado = EsquemaDaCandidatura.safeParse({
    ...Object.fromEntries(dados), habilidades: dados.getAll("habilidades").filter((valor) => typeof valor !== "string" || valor.trim() !== ""),
  });
  const valores: Record<string, string> = {
    ...valoresDoFormulario(dados),
    habilidades: JSON.stringify(dados.getAll("habilidades").filter((valor) => typeof valor === "string")),
  };
  if (!resultado.success) return estadoInvalido(resultado.error, valores);
  try {
    const candidaturaIdAutorizada = (await cookies()).get(cookieDaCandidatura(resultado.data.vagaId))?.value;
    if (idExistente && idExistente !== candidaturaIdAutorizada) {
      return { ok: false, erros: { candidaturaId: "Não foi possível autorizar a correção desta candidatura." }, valores };
    }
    if (!await buscarVaga(resultado.data.vagaId)) {
      return { ok: false, erros: { vagaId: "Esta vaga não está mais disponível." }, valores };
    }
    const candidatura = { ...resultado.data, id: idExistente || crypto.randomUUID() };
    if (idExistente) await corrigirCandidatura(candidatura);
    else await guardarCandidatura(candidatura);
    (await cookies()).set(cookieDaCandidatura(resultado.data.vagaId), candidatura.id, cookieOptions(resultado.data.vagaId));
    valores.candidaturaId = candidatura.id;
    valores.habilidades = JSON.stringify(resultado.data.habilidades);
  } catch {
    return { ok: false, erros: {}, valores, mensagem: "Não foi possível enviar a candidatura. Tente novamente." };
  }
  revalidatePath(`/vagas/${resultado.data.vagaId}`);
  return { ok: true, erros: {}, valores, mensagem: idExistente ? "Candidatura corrigida!" : "Candidatura enviada!" };
}

export async function enviarCandidaturaSemJavaScript(dados: FormData): Promise<never> {
  const vagaId = EsquemaDoId.safeParse(dados.get("vagaId"));
  if (!vagaId.success) redirect("/vagas?candidatura=erro");

  const resultado = EsquemaDaCandidatura.safeParse({
    ...Object.fromEntries(dados),
    habilidades: dados.getAll("habilidades").filter((valor) => typeof valor !== "string" || valor.trim() !== ""),
  });
  const destino = `/vagas/${vagaId.data}`;
  if (!resultado.success) {
    const campos = [...new Set(resultado.error.issues.map((problema) => String(problema.path[0] ?? "formulario")))];
    const modo = dados.get("corrigindo") === "1" ? "&corrigindo=1" : "";
    redirect(`${destino}?candidatura=inv%C3%A1lida&campos=${encodeURIComponent(campos.join(","))}${modo}`);
  }

  const cookiesAtuais = await cookies();
  const corrigindo = dados.get("corrigindo") === "1";
  const idExistente = corrigindo ? cookiesAtuais.get(cookieDaCandidatura(vagaId.data))?.value : undefined;
  if (corrigindo && !idExistente) redirect(`${destino}?candidatura=erro`);
  if (idExistente && !EsquemaDoId.safeParse(idExistente).success) {
    redirect(`${destino}?candidatura=erro`);
  }
  if (!await buscarVaga(vagaId.data)) redirect(`${destino}?candidatura=indispon%C3%ADvel`);

  let id: string;
  try {
    const candidatura = { ...resultado.data, id: idExistente || crypto.randomUUID() };
    if (idExistente) await corrigirCandidatura(candidatura);
    else await guardarCandidatura(candidatura);
    id = candidatura.id;
  } catch {
    redirect(`${destino}?candidatura=erro`);
  }

  await cookiesAtuais.set(cookieDaCandidatura(vagaId.data), id, cookieOptions(vagaId.data));
  revalidatePath(destino);
  const status = corrigindo ? "corrigida" : "enviada";
  redirect(`${destino}?candidatura=${status}&habilidades=${resultado.data.habilidades.length}`);
}
