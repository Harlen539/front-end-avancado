import type { Candidatura, Empresa, Vaga } from "@/lib/tipos";

// Armazenamento temporário da aula 05 (reiniciar servidor limpa os dados).
const globalCatalogo = globalThis as typeof globalThis & {
  catalogo?: {
    vagas: Vaga[];
    arquivadas: Set<string>;
    candidaturas: Candidatura[];
    empresas: Map<string, Empresa>;
  };
};
const dados = (globalCatalogo.catalogo ??= {
  vagas: [],
  arquivadas: new Set<string>(),
  candidaturas: [],
  empresas: new Map<string, Empresa>(),
});

const fonte = process.env.FONTE_DADOS ??
  "https://raw.githubusercontent.com/Harlen539/front-end-avancado/main/projeto/dados";

async function carregar<T>(nome: string, tag: string): Promise<T> {
  const resposta = await fetch(`${fonte}/${nome}`, {
    next: { revalidate: 60, tags: [tag] },
  });
  if (!resposta.ok) throw new Error(`Erro ao carregar ${nome}`);
  return resposta.json() as Promise<T>;
}

export async function listarVagas(): Promise<Vaga[]> {
  const vagas = await carregar<Vaga[]>("vagas.json", "vagas");
  return [...dados.vagas, ...vagas]
    .filter((vaga) => !dados.arquivadas.has(vaga.id))
    .map((vaga) => ({
      ...vaga,
      empresa: dados.empresas.get(vaga.empresaSlug)?.nome ?? vaga.empresa,
    }));
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  return (await listarVagas()).find((vaga) => vaga.id === id);
}

export async function listarEmpresas(): Promise<Empresa[]> {
  const empresas = await carregar<Empresa[]>("empresas.json", "empresas");
  return empresas.map((empresa) => dados.empresas.get(empresa.slug) ?? empresa);
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  return (await listarEmpresas()).find((empresa) => empresa.slug === slug);
}

export function guardarVaga(vaga: Vaga): void {
  dados.vagas.unshift(vaga);
}

export function arquivarVaga(id: string): void {
  dados.arquivadas.add(id);
}

export function guardarCandidatura(candidatura: Candidatura): void {
  dados.candidaturas.push(candidatura);
}

export function guardarEmpresa(empresa: Empresa): void {
  dados.empresas.set(empresa.slug, empresa);
}
