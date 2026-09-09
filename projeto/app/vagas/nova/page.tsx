import type { Metadata } from "next";
import Link from "next/link";
import { listarEmpresas } from "@/lib/api";
import FormularioDeVaga from "./formulario";

export const metadata: Metadata = { title: "Publicar vaga", description: "Cadastre uma oportunidade no Leque de Vagas." };

export default async function NovaVaga() {
  const empresas = await listarEmpresas();
  return (
    <main className="conteudo paginaInterna paginaFormulario">
      <Link className="linkVoltar" href="/vagas">← Todas as vagas</Link>
      <span className="etiqueta">Nova oportunidade</span>
      <h1>Publique uma vaga.</h1>
      <FormularioDeVaga empresas={empresas} />
    </main>
  );
}
