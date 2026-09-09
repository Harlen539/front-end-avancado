import type { ZodError } from "zod";
import type { Estado } from "@/lib/tipos";

export const ESTADO_INICIAL: Estado = { ok: false, erros: {}, valores: {} };

export function valoresDoFormulario(dados: FormData): Record<string, string> {
  return Object.fromEntries(
    [...dados.entries()].filter(([chave, valor]) => !chave.startsWith("$ACTION_") && typeof valor === "string"),
  ) as Record<string, string>;
}

export function estadoInvalido(erro: ZodError, valores: Record<string, string>): Estado {
  const erros: Record<string, string> = {};
  for (const problema of erro.issues) {
    const campo = String(problema.path[0] ?? "formulario");
    erros[campo] ??= problema.message;
  }
  return { ok: false, erros, valores };
}
