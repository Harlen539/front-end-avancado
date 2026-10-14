-- CreateTable
CREATE TABLE "Vaga" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "empresaSlug" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "senioridade" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "aceitaIniciante" BOOLEAN NOT NULL,
    "descricao" TEXT NOT NULL,
    "publicadaEm" TEXT NOT NULL,
    "criadaEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "arquivada" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Empresa" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "sobre" TEXT NOT NULL,
    "site" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Candidatura" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vagaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "habilidades" TEXT NOT NULL,
    "criadaEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Candidatura_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SincronizacaoCatalogo" (
    "nome" TEXT NOT NULL PRIMARY KEY,
    "revisao" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Vaga_arquivada_aceitaIniciante_idx" ON "Vaga"("arquivada", "aceitaIniciante");

-- CreateIndex
CREATE INDEX "Vaga_empresaSlug_idx" ON "Vaga"("empresaSlug");

-- CreateIndex
CREATE INDEX "Candidatura_vagaId_idx" ON "Candidatura"("vagaId");
