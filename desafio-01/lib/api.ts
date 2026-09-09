import type { Candidatura, Empresa, Vaga } from "@/lib/tipos";

// Memória do processo, compartilhada entre as rotas e preservada no hot reload.
// Reiniciar o servidor apaga as escritas. A aula 06 substituirá isto por banco.
const globalDoCatalogo = globalThis as typeof globalThis & {
  lequeDeVagas?: {
    criadas: Vaga[];
    arquivadas: Set<string>;
    candidaturas: Candidatura[];
    empresas: Map<string, Empresa>;
  };
};
const memoria = (globalDoCatalogo.lequeDeVagas ??= {
  criadas: [],
  arquivadas: new Set<string>(),
  candidaturas: [],
  empresas: new Map<string, Empresa>(),
});

const FONTE =
  process.env.FONTE_DADOS ??
  "https://raw.githubusercontent.com/Harlen539/front-end-avancado/main/desafio-01/dados";

async function buscarJson<T>(
  arquivo: string,
  tag: "vagas" | "empresas",
): Promise<T> {
  const resposta = await fetch(`${FONTE}/${arquivo}`, {
    // Uma vaga nova pode esperar no máximo 60 segundos para aparecer.
    // É um intervalo curto para um mural de oportunidades sem refazer a busca a cada acesso.
    next: { revalidate: 60, tags: [tag] },
  });

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível carregar ${arquivo} (${resposta.status}).`,
    );
  }

  return resposta.json() as Promise<T>;
}

export async function listarVagas(): Promise<Vaga[]> {
  const buscadas = await buscarJson<Vaga[]>("vagas.json", "vagas");
  return [...memoria.criadas, ...buscadas]
    .filter((vaga) => !memoria.arquivadas.has(vaga.id))
    .map((vaga) => ({
      ...vaga,
      empresa: memoria.empresas.get(vaga.empresaSlug)?.nome ?? vaga.empresa,
    }));
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => vaga.id === id);
}

export async function listarEmpresas(): Promise<Empresa[]> {
  const empresas = await buscarJson<Empresa[]>("empresas.json", "empresas");
  return empresas.map((empresa) => memoria.empresas.get(empresa.slug) ?? empresa);
}

export async function buscarEmpresa(
  slug: string,
): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}

export function guardarVaga(vaga: Vaga): void {
  memoria.criadas.unshift(vaga);
}

export function arquivarVaga(id: string): void {
  memoria.arquivadas.add(id);
}

export function guardarCandidatura(candidatura: Candidatura): void {
  memoria.candidaturas.push(candidatura);
}

export function guardarEmpresa(empresa: Empresa): void {
  memoria.empresas.set(empresa.slug, empresa);
}
