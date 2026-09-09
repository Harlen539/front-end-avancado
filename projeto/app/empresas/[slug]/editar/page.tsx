import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarEmpresa } from "@/lib/api";
import FormularioDeEmpresa from "./formulario";

export const metadata: Metadata = { title: "Editar empresa", description: "Atualize o perfil da empresa no Leque de Vagas." };

export default async function EditarEmpresa({ params }: PageProps<"/empresas/[slug]/editar">) {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) notFound();
  return (
    <main className="conteudo paginaInterna paginaFormulario">
      <Link className="linkVoltar" href={`/empresas/${slug}`}>← Voltar ao perfil</Link>
      <span className="etiqueta">Perfil da empresa</span>
      <h1>Editar {empresa.nome}.</h1>
      <FormularioDeEmpresa empresa={empresa} />
    </main>
  );
}
