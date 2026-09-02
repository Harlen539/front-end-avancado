import type { Empresa, Vaga } from "@/lib/tipos";

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

export function listarVagas(): Promise<Vaga[]> {
  return buscarJson<Vaga[]>("vagas.json", "vagas");
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => vaga.id === id);
}

export function listarEmpresas(): Promise<Empresa[]> {
  return buscarJson<Empresa[]>("empresas.json", "empresas");
}

export async function buscarEmpresa(
  slug: string,
): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}
