# Dados e persistência

## Contratos e fontes

Os tipos de tela estão em `projeto/lib/tipos.ts`. Os arquivos `projeto/dados/vagas.json` e `projeto/dados/empresas.json` são o catálogo publicado e a origem inicial dos registros. `FONTE_DADOS` pode apontar para outra pasta Raw; sem essa variável, `lib/api.ts` usa os JSONs deste repositório. A leitura dos JSONs usa cache de 60 segundos e valida os dados com Zod.

No servidor, as vagas do catálogo são espelhadas no banco para que candidaturas tenham uma relação com uma vaga persistida. Uma revisão SHA-256 evita repetir a sincronização quando o catálogo não mudou. Arquivamento e edições locais são preservados durante a sincronização. Para empresas, o registro editado no banco prevalece sobre o JSON; uma empresa que só existe no JSON continua disponível como dado inicial. Se o banco estiver indisponível, as leituras usam os JSONs publicados e as operações de gravação retornam erro.

Com o banco configurado, as telas leem vagas, empresas, candidaturas e contagens persistidas. Sem banco, vagas e empresas continuam disponíveis em modo de consulta; candidaturas não podem ser enviadas e a contagem aparece como zero. Campos internos, como `criadaEm` e `arquivada`, não fazem parte do tipo público `Vaga`. IDs de vagas do catálogo são números em texto; novas vagas recebem UUIDs. Uma vaga removida do JSON não é excluída do banco automaticamente.

## Desenvolvimento local: SQLite

O schema `projeto/prisma/schema.prisma` usa SQLite em `prisma/dev.db`, ignorado pelo Git. A migration existente em `prisma/migrations/` não deve ser removida nem recriada para preparar uma instalação.

```bash
cd projeto
npm ci
npm run prisma:generate
npm run prisma:migrate:dev
npm run dev
```

`prisma:migrate:dev` aplica as migrations locais sem apagar o banco. Se houver dados locais que precisem ser preservados, faça uma cópia do `prisma/dev.db` antes de qualquer alteração manual de schema. Para iniciar outra instalação, a mesma sequência cria o arquivo local e aplica as migrations versionadas.

## Publicação: PostgreSQL

SQLite em arquivo local não é persistente entre execuções serverless da Vercel. A aplicação inclui um schema e uma migration PostgreSQL separados em `projeto/prisma/postgres/`. A geração do Prisma Client usa PostgreSQL na Vercel e SQLite localmente.

1. Configure `DATABASE_URL` nas variáveis de ambiente da Vercel com a URL de conexão PostgreSQL do provedor escolhido. Use o formato fornecido pelo provedor e mantenha a variável fora do repositório.
2. Antes de servir a aplicação, aplique a migration versionada ao banco de produção:

   ```bash
   cd projeto
   npx prisma migrate deploy --schema prisma/postgres/schema.prisma
   ```

3. Configure a Vercel para instalar dependências e executar `npm run build`. O script de build gera o cliente PostgreSQL e falha se a variável `DATABASE_URL` estiver ausente em ambiente Vercel.
4. Não use `prisma migrate dev` na publicação. Ele é o fluxo de desenvolvimento SQLite; use `migrate deploy` com o schema PostgreSQL para aplicar migrations já versionadas.

Esta configuração não cria uma conta ou banco de dados e não migra automaticamente registros do arquivo SQLite local. Nenhuma credencial está versionada. Até um banco externo ser configurado e a migration PostgreSQL aplicada, as escritas da publicação não estão habilitadas para persistência durável.

## Escritas, cache e revalidação

Server Actions validam os formulários com Zod antes de gravar. Vagas e candidaturas verificam relações e estado de arquivamento no banco. A correção da candidatura atualiza o registro existente pelo ID recebido, sem inserir uma segunda candidatura. O Route Handler `GET /api/empresas/[slug]` retorna o perfil em JSON ou 404 quando o slug não existe.

As leituras mutáveis usam `connection()` para evitar que HTML estático antigo esconda alterações no banco. As ações usam `revalidatePath` nas páginas que exibem os dados alterados. As tags e o intervalo de 60 segundos se aplicam à leitura do catálogo JSON, não às consultas Prisma.

## Variáveis de ambiente

| Variável | Uso | Exemplo sem segredo |
| --- | --- | --- |
| `FONTE_DADOS` | Pasta Raw alternativa para os JSONs do catálogo | `https://raw.githubusercontent.com/organizacao/repositorio/main/projeto/dados` |
| `DATABASE_URL` | Obrigatória na Vercel para o schema PostgreSQL | `postgresql://usuario:senha@host:5432/banco?sslmode=require` |
| `PRISMA_LOG_QUERIES` | Habilita logs SQL locais para medições | `1` |

Não publique uma URL real com usuário ou senha. Em ambiente local, `DATABASE_URL` não é necessário: o schema SQLite já define o arquivo ignorado.

## Limitações conhecidas

- O banco PostgreSQL depende da escolha e configuração de um provedor externo pela equipe.
- Migração de conteúdo SQLite para PostgreSQL não é automatizada; planeje uma importação se dados locais precisarem ser preservados fora do ambiente de desenvolvimento.
- Candidaturas guardam nome, e-mail e habilidades. A equipe deve definir o procedimento de atendimento a pedidos de correção ou exclusão.
- A conferência do ambiente Vercel tem logs e retenção limitados pelo plano conectado; consulte `projeto/docs/VALIDACAO_BRUNO.md` para o resultado observado nesta revisão.
