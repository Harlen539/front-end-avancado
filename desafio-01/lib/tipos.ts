export type Vaga = {
  id: string;
  titulo: string;
  empresa: string;
  empresaSlug: string;
  area: string;
  senioridade: string;
  local: string;
  aceitaIniciante: boolean;
  descricao: string;
  publicadaEm: string;
};

export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
};
