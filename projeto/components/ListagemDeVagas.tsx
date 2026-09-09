import MuralDeVagas from "@/components/MuralDeVagas";
import { listarVagas } from "@/lib/api";

export default async function ListagemDeVagas() {
  const vagas = await listarVagas();
  return <MuralDeVagas vagas={vagas} />;
}
