import { listarVagas } from "@/lib/api";

export default async function NumerosDoCatalogo() {
  const vagas = await listarVagas();
  const iniciantes = vagas.filter((vaga) => vaga.aceitaIniciante).length;

  return (
    <div className="numerosCatalogo">
      <strong>{vagas.length} vagas</strong>
      <span aria-hidden="true">·</span>
      <span>{iniciantes} aceitam quem está começando</span>
    </div>
  );
}
