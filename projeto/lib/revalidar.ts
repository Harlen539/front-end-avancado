import { revalidatePath } from "next/cache";

export function revalidarCatalogo(id?: string, empresaSlug?: string) {
  // As escritas vivem no banco. A tag pertence ao fetch do JSON remoto;
  // revalidatePath atualiza as rotas afetadas pelas Server Actions.
  revalidatePath("/vagas");
  revalidatePath("/empresas");
  if (id) revalidatePath(`/vagas/${id}`);
  if (empresaSlug) revalidatePath(`/empresas/${empresaSlug}`);
}
