import { revalidatePath } from "next/cache";

export function revalidarCatalogo(id?: string, empresaSlug?: string) {
  // As alterações vivem em memória, fora do fetch etiquetado. revalidateTag
  // sozinho invalidaria o JSON remoto, não as rotas que combinam JSON e memória.
  revalidatePath("/vagas");
  revalidatePath("/empresas");
  if (id) revalidatePath(`/vagas/${id}`);
  if (empresaSlug) revalidatePath(`/empresas/${empresaSlug}`);
}
