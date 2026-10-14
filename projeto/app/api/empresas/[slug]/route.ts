import { buscarEmpresa } from "@/lib/api";

export async function GET(_request: Request, { params }: RouteContext<"/api/empresas/[slug]">) {
  const { slug } = await params;
  try {
    const empresa = await buscarEmpresa(slug);
    return empresa ? Response.json(empresa) : Response.json({ erro: "Empresa não encontrada." }, { status: 404 });
  } catch {
    return Response.json({ erro: "Não foi possível consultar a empresa." }, { status: 503 });
  }
}
