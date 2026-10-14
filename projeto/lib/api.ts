import { createHash } from "node:crypto";
import { cache } from "react";
import { connection } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { Candidatura, Empresa, Vaga } from "@/lib/tipos";

const fonte = process.env.FONTE_DADOS ??
  "https://raw.githubusercontent.com/Harlen539/front-end-avancado/main/projeto/dados";

const vagaPublicada = z.object({
  id: z.string().regex(/^[1-9][0-9]*$/),
  titulo: z.string(), empresa: z.string(), empresaSlug: z.string(),
  area: z.string(), senioridade: z.string(), local: z.string(),
  aceitaIniciante: z.boolean(), descricao: z.string(), publicadaEm: z.string(),
});
const empresaPublicada = z.object({
  slug: z.string(), nome: z.string(), sobre: z.string(), site: z.string(),
});

async function carregar(nome: string, tag: string): Promise<unknown> {
  const resposta = await fetch(`${fonte}/${nome}`, {
    next: { revalidate: 60, tags: [tag] },
  });
  if (!resposta.ok) throw new Error(`Erro ao carregar ${nome}`);
  return resposta.json();
}

export async function listarVagasPublicadas(): Promise<Vaga[]> {
  const vagas = z.array(vagaPublicada).parse(await carregar("vagas.json", "vagas"));
  if (new Set(vagas.map((vaga) => vaga.id)).size !== vagas.length) {
    throw new Error("O catálogo publicado contém IDs repetidos.");
  }
  return vagas;
}

export async function listarEmpresasPublicadas(): Promise<Empresa[]> {
  return z.array(empresaPublicada).parse(await carregar("empresas.json", "empresas"));
}

// O catálogo remoto é espelhado para que candidaturas tenham uma FK real,
// inclusive quando a vaga foi publicada antes de existir o banco.
const sincronizarCatalogo = cache(async () => {
  const vagas = await listarVagasPublicadas();
  const revisao = createHash("sha256").update(JSON.stringify(vagas)).digest("hex");
  const anterior = await prisma.sincronizacaoCatalogo.findUnique({ where: { nome: "vagas" } });
  if (anterior?.revisao === revisao) return;

  await prisma.$transaction(async (tx) => {
    for (const vaga of vagas) {
      await tx.vaga.upsert({
        where: { id: vaga.id },
        create: vaga,
        update: {
          titulo: vaga.titulo, empresa: vaga.empresa, empresaSlug: vaga.empresaSlug,
          area: vaga.area, senioridade: vaga.senioridade, local: vaga.local,
          aceitaIniciante: vaga.aceitaIniciante, descricao: vaga.descricao,
          publicadaEm: vaga.publicadaEm,
        },
      });
    }
    await tx.sincronizacaoCatalogo.upsert({
      where: { nome: "vagas" }, create: { nome: "vagas", revisao }, update: { revisao },
    });
  });
});

const camposPublicos = {
  id: true, titulo: true, empresa: true, empresaSlug: true, area: true,
  senioridade: true, local: true, aceitaIniciante: true,
  descricao: true, publicadaEm: true,
} as const;

export async function listarVagas(): Promise<Vaga[]> {
  await connection();
  await sincronizarCatalogo();
  const [vagas, empresas] = await Promise.all([
    prisma.vaga.findMany({ where: { arquivada: false }, select: camposPublicos, orderBy: { criadaEm: "desc" } }),
    prisma.empresa.findMany({ select: { slug: true, nome: true } }),
  ]);
  const nomes = new Map(empresas.map((empresa) => [empresa.slug, empresa.nome]));
  return vagas.map((vaga) => ({ ...vaga, empresa: nomes.get(vaga.empresaSlug) ?? vaga.empresa }));
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  await connection();
  await sincronizarCatalogo();
  const vaga = await prisma.vaga.findUnique({ where: { id, arquivada: false }, select: camposPublicos });
  if (!vaga) return undefined;
  const empresa = await prisma.empresa.findUnique({ where: { slug: vaga.empresaSlug }, select: { nome: true } });
  return { ...vaga, empresa: empresa?.nome ?? vaga.empresa };
}

export async function contarCatalogo() {
  await connection();
  await sincronizarCatalogo();
  const [total, iniciantes] = await Promise.all([
    prisma.vaga.count({ where: { arquivada: false } }),
    prisma.vaga.count({ where: { arquivada: false, aceitaIniciante: true } }),
  ]);
  return { total, iniciantes };
}

export async function contarCandidaturas(vagaId: string): Promise<number> {
  await connection();
  return prisma.candidatura.count({ where: { vagaId } });
}

export async function buscarCandidatura(id: string, vagaId: string): Promise<Candidatura | undefined> {
  const candidatura = await prisma.candidatura.findFirst({
    where: { id, vagaId },
    select: { id: true, vagaId: true, nome: true, email: true, habilidades: true },
  });
  if (!candidatura) return undefined;
  return { ...candidatura, habilidades: JSON.parse(candidatura.habilidades) as string[] };
}

export async function listarEmpresas(): Promise<Empresa[]> {
  await connection();
  const publicadas = await listarEmpresasPublicadas();
  const editadas = await prisma.empresa.findMany();
  const porSlug = new Map(publicadas.map((empresa) => [empresa.slug, empresa]));
  for (const empresa of editadas) porSlug.set(empresa.slug, empresa);
  return [...porSlug.values()];
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  return (await listarEmpresas()).find((empresa) => empresa.slug === slug);
}

export async function guardarVaga(vaga: Vaga): Promise<void> {
  await prisma.vaga.create({ data: vaga });
}

export async function arquivarVaga(id: string): Promise<void> {
  await prisma.vaga.update({ where: { id }, data: { arquivada: true } });
}

export async function guardarCandidatura(candidatura: Candidatura): Promise<void> {
  await sincronizarCatalogo();
  await prisma.$transaction(async (tx) => {
    const vaga = await tx.vaga.findUnique({ where: { id: candidatura.vagaId }, select: { arquivada: true } });
    if (!vaga || vaga.arquivada) throw new Error("Esta vaga não está mais disponível.");
    await tx.candidatura.create({ data: { ...candidatura, habilidades: JSON.stringify(candidatura.habilidades) } });
  });
}

export async function corrigirCandidatura(candidatura: Candidatura): Promise<void> {
  await sincronizarCatalogo();
  await prisma.$transaction(async (tx) => {
    const vaga = await tx.vaga.findUnique({ where: { id: candidatura.vagaId }, select: { arquivada: true } });
    if (!vaga || vaga.arquivada) throw new Error("Esta vaga não está mais disponível.");
    const atualizada = await tx.candidatura.updateMany({
      where: { id: candidatura.id, vagaId: candidatura.vagaId },
      data: {
        nome: candidatura.nome,
        email: candidatura.email,
        habilidades: JSON.stringify(candidatura.habilidades),
      },
    });
    if (atualizada.count !== 1) throw new Error("A candidatura não foi encontrada para correção.");
  });
}

export async function guardarEmpresa(empresa: Empresa): Promise<void> {
  await prisma.empresa.upsert({ where: { slug: empresa.slug }, create: empresa, update: empresa });
}
