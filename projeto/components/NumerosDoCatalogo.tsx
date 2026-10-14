import { contarCatalogo } from "@/lib/api";

export default async function NumerosDoCatalogo() {
  const { total, iniciantes } = await contarCatalogo();

  return (
    <div className="numerosCatalogo">
      <strong>{total} vagas</strong>
      <span aria-hidden="true">·</span>
      <span>{iniciantes} aceitam quem está começando</span>
    </div>
  );
}
