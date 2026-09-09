import { z } from "zod";

const texto = (campo: string, minimo: number, maximo: number) =>
  z.string({ error: `Informe ${campo}.` }).trim()
    .min(minimo, `Informe ${campo} com pelo menos ${minimo} caracteres.`)
    .max(maximo, `Use no máximo ${maximo} caracteres em ${campo}.`);

export const EsquemaDoId = texto("o identificador", 1, 100)
  .regex(/^[a-zA-Z0-9-]+$/, "Identificador inválido.");

export const EsquemaDaVaga = z.object({
  titulo: texto("o título", 3, 120),
  empresaSlug: z.string({ error: "Selecione uma empresa." }).trim()
    .min(1, "Selecione uma empresa.").max(100, "Empresa inválida.")
    .regex(/^[a-zA-Z0-9-]+$/, "Selecione uma empresa válida."),
  area: texto("a área", 2, 80),
  senioridade: texto("a senioridade", 2, 80),
  local: texto("o local", 2, 120),
  aceitaIniciante: z.enum(["on"], { error: "Opção de iniciante inválida." })
    .optional().transform((valor) => valor === "on"),
  descricao: texto("a descrição", 20, 5000),
});

export const EsquemaDaEmpresa = z.object({
  slug: EsquemaDoId,
  nome: texto("o nome", 2, 120),
  sobre: texto("a apresentação", 20, 3000),
  site: texto("o site", 1, 500)
    .url("Informe uma URL válida, como https://empresa.com.")
    .refine((site) => /^https?:\/\//i.test(site), "Use um endereço com http:// ou https://."),
});

export const HABILIDADES = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Git", "SQL", "Figma", "Python"];

export const EsquemaDaCandidatura = z.object({
  vagaId: EsquemaDoId,
  nome: texto("o nome", 2, 120),
  email: texto("o e-mail", 1, 254).email("Digite um e-mail completo, incluindo @ e o domínio."),
  habilidades: z.array(texto("a habilidade", 1, 80), { error: "Informe suas habilidades." })
    .min(1, "Selecione pelo menos uma habilidade.")
    .max(30, "Selecione no máximo 30 habilidades.")
    .transform((valores) => [...new Map(valores.map((valor) => [valor.toLocaleLowerCase("pt-BR"), valor])).values()]),
});

export const EsquemaDeArquivamento = z.object({ id: EsquemaDoId });
