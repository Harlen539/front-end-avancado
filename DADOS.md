# Decisões de dados — aula 06

O contrato das telas continua em `projeto/lib/tipos.ts`; o Prisma gera os tipos usados na persistência. Campos internos como `criadaEm` e `arquivada` não são enviados ao cliente na listagem.

O JSON publicado é o catálogo inicial. `lib/api.ts` busca esse JSON com cache de 60 segundos e espelha as vagas no SQLite. A revisão SHA-256 dos campos publicados fica em `SincronizacaoCatalogo`; quando não muda, não repetimos os upserts. A importação preserva `arquivada` e `criadaEm`. IDs do JSON são números positivos em texto; novas vagas usam UUID. Uma vaga removida do JSON continua no banco até ser arquivada explicitamente, preservando candidaturas existentes.

Quando o slug da empresa existe no JSON e no banco, o banco vence. A edição no site é mais recente e o JSON não é alterado. `GET /api/empresas/[slug]` devolve o perfil público ou 404 para slug ausente.

Uma candidatura tem chave estrangeira para `Vaga`, inclusive para vagas originalmente vindas do JSON. As habilidades são guardadas como JSON em um campo String do SQLite. Arquivar uma vaga marca `arquivada = true`, mantém candidaturas anteriores e bloqueia novas. O mural lê somente vagas não arquivadas; os números vêm de duas consultas `count()` ao banco.

As Server Actions mantêm `revalidatePath` após escritas. As tags pertencem ao fetch do JSON, não às consultas Prisma. `connection()` força as telas que leem dados mutáveis a consultar o banco em cada requisição; `generateStaticParams` continua enumerando os IDs e slugs do JSON para as rotas. Isso evita que uma página HTML antiga oculte uma edição ou mostre uma vaga arquivada após reiniciar.

## Execução e publicação

Em `projeto/`, execute `npm install` e `npx prisma migrate dev`, depois `npm run dev`. O arquivo `prisma/dev.db` é local e ignorado pelo Git; a migration é versionada. Há um único cliente Prisma em `lib/prisma.ts`.

SQLite local **não fornece persistência durável nas funções da Vercel**. A hospedagem pública exige um banco persistente compatível e configuração segura da conexão antes de usar os formulários publicados. O desafio da aula 06 foi implementado e testado com SQLite local; esta versão não deve ser apresentada como persistência durável na Vercel.

Os testes executados nesta integração estão em `projeto/docs/VALIDACAO_BRUNO.md`. Prints, vídeos, aprovação cruzada de PR e confirmação da divisão de frentes exigem participação real da equipe.
