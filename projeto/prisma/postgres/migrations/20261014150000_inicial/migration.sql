CREATE TABLE "Vaga" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "empresaSlug" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "senioridade" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "aceitaIniciante" BOOLEAN NOT NULL DEFAULT false,
    "descricao" TEXT NOT NULL,
    "publicadaEm" TEXT NOT NULL,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "arquivada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Empresa" (
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobre" TEXT NOT NULL,
    "site" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("slug")
);

CREATE TABLE "Candidatura" (
    "id" TEXT NOT NULL,
    "vagaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "habilidades" TEXT NOT NULL,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Candidatura_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SincronizacaoCatalogo" (
    "nome" TEXT NOT NULL,
    "revisao" TEXT NOT NULL,

    CONSTRAINT "SincronizacaoCatalogo_pkey" PRIMARY KEY ("nome")
);

CREATE INDEX "Vaga_arquivada_aceitaIniciante_idx" ON "Vaga"("arquivada", "aceitaIniciante");
CREATE INDEX "Vaga_empresaSlug_idx" ON "Vaga"("empresaSlug");
CREATE INDEX "Candidatura_vagaId_idx" ON "Candidatura"("vagaId");

ALTER TABLE "Candidatura" ADD CONSTRAINT "Candidatura_vagaId_fkey"
FOREIGN KEY ("vagaId") REFERENCES "Vaga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
