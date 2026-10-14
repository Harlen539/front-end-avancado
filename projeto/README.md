# Leque de Vagas

Aplicação Next.js para consultar vagas de tecnologia, conhecer empresas e enviar candidaturas. As vagas e empresas de exemplo são dados didáticos.

## Estado desta revisão

- Desafios 01–06: o código atual mantém App Router, TypeScript, CSS existente, componentes, rotas, metadata, busca de dados, validação Zod, Server Actions, persistência e API de leitura. O índice do curso e o briefing não foram acessíveis nesta conferência; a lista de requisitos publicada de cada aula precisa ser confirmada quando as páginas estiverem disponíveis.
- Checkpoint 1: filtros de área, senioridade e iniciante usam a URL; Tailwind CSS foi integrado aos controles do filtro, mantendo as regras visuais existentes e o layout responsivo.
- Aula 07: o desafio retornou 404 na conferência de 14/10/2026. Nenhum requisito foi inventado a partir do título da aula.
- Checkpoints posteriores: autenticação, painel administrativo e CRUD adicional não fazem parte desta entrega.

## Equipe

Integrantes registrados: Harlen Henrick, Bruno Venâncio, Carlos Eduardo e Alyssa Lima. Os registros consultados não confirmam quem ficou responsável por cada uma das quatro frentes; não atribua uma frente sem confirmação da equipe.

## Rotas

| Rota | O que apresenta |
| --- | --- |
| `/` | Apresentação do projeto |
| `/vagas` | Listagem, busca e filtros combinados |
| `/vagas/nova` | Criação de vaga |
| `/vagas/[id]` | Detalhe, contagem e candidatura |
| `/empresas` | Catálogo de empresas |
| `/empresas/[slug]` | Perfil e vagas da empresa |
| `/empresas/[slug]/editar` | Edição do perfil |
| `/api/empresas/[slug]` | JSON público da empresa ou 404 |
| `/sobre`, `/contato`, `/termos`, `/privacidade` | Páginas institucionais |

As rotas de vaga e empresa usam parâmetros dinâmicos, `generateMetadata` e `notFound`. Uma vaga inexistente mostra a página visual de ausência; como Next.js pode transmitir a resposta antes de decidir o estado, a verificação observou HTTP 200 nessa rota dinâmica e HTTP 404 em uma rota geral inexistente.

## Busca e filtros

O mural combina o texto da busca com área, senioridade e a opção “Aceita iniciante”. O estado é lido e escrito em `searchParams`, mantendo links compartilháveis e o histórico Voltar/Avançar. A digitação da busca atualiza a URL com debounce de 300 ms; os outros filtros atualizam a navegação imediatamente. O botão de limpar remove os parâmetros e o resultado vazio oferece a mesma ação.

## Dados e persistência

`lib/api.ts` é a camada de acesso às fontes. Os JSONs em `dados/` são o catálogo inicial. As vagas do JSON são sincronizadas para o banco; a edição local de uma empresa prevalece sobre seu perfil publicado. O cache de 60 segundos se aplica ao catálogo remoto, enquanto consultas mutáveis do Prisma leem o banco.

O desenvolvimento local usa SQLite em `prisma/dev.db`. Para Vercel há um schema e migrations PostgreSQL separados em `prisma/postgres/`; a hospedagem ainda precisa de uma URL `DATABASE_URL` válida e da aplicação da migration. Veja [`../DADOS.md`](../DADOS.md) antes de publicar. O SQLite local não oferece armazenamento durável entre execuções serverless.

Uma candidatura é vinculada a uma vaga. A tela de sucesso informa a quantidade de habilidades registradas e permite “Corrigir alguma coisa” atualizando o mesmo registro. A edição fica associada a um cookie `HttpOnly` limitado à rota da vaga. O formulário tem fallback HTML com Server Action para envio sem JavaScript.

As Server Actions validam os formulários com Zod, preservam mensagens por campo, revalidam as rotas afetadas e mantêm formulários funcionais sem JavaScript. Arquivar uma vaga não apaga as candidaturas existentes.

## Instalação e execução

Requisitos: Node.js 20.9 ou superior e npm.

```bash
cd projeto
npm ci
npm run prisma:generate
npm run prisma:migrate:dev
npm run dev
```

Abra `http://localhost:3000`. O banco `prisma/dev.db` é local e ignorado pelo Git. `prisma:migrate:dev` aplica a migration SQLite versionada sem resetar o banco.

Para validar produção localmente:

```bash
npm run lint
npm run build
npm start
```

O build executa a geração do Prisma Client antes de `next build`. Em ambiente Vercel, a geração escolhe o schema PostgreSQL e falha se `DATABASE_URL` não estiver configurada.

## Configuração de ambiente

| Variável | Quando usar | Exemplo |
| --- | --- | --- |
| `FONTE_DADOS` | Opcional, para trocar a pasta Raw do catálogo | `https://raw.githubusercontent.com/organizacao/repositorio/main/projeto/dados` |
| `DATABASE_URL` | Obrigatória na Vercel para PostgreSQL | `postgresql://usuario:senha@host:5432/banco?sslmode=require` |
| `PRISMA_LOG_QUERIES` | Opcional, para logs SQL locais | `1` |

Não inclua credenciais em arquivos versionados. A aplicação não cria um banco hospedado. Antes do tráfego de produção, aplique `npx prisma migrate deploy --schema prisma/postgres/schema.prisma` com a conexão do provedor configurada.

## Build desta revisão

Executado com Node.js 22.20.0, npm 11.6.2, Next.js 16.4.1 e Prisma 6.19.3:

```text
○ /                         estática
○ /_not-found               estática
ƒ /api/empresas/[slug]      sob demanda
○ /contato                  estática
ƒ /empresas                 sob demanda
ƒ /empresas/[slug]          sob demanda
ƒ /empresas/[slug]/editar   sob demanda
○ /privacidade              estática
○ /sobre                    estática
○ /termos                   estática
ƒ /vagas                    sob demanda
ƒ /vagas/[id]               sob demanda
ƒ /vagas/nova               sob demanda
```

`○` indica conteúdo estático e `ƒ` indica renderização por requisição. A lista será atualizada se a saída do build final diferir após a instalação limpa.

## Validação e evidências

Os resultados desta revisão, incluindo dependências, migrations, testes de interface, limitações da Vercel e evidências, estão em [`docs/VALIDACAO_REVISAO.md`](docs/VALIDACAO_REVISAO.md). Capturas e gravações reais dos fluxos executados estão em [`docs/evidencias-revisao/`](docs/evidencias-revisao/). As evidências antigas da aula 05 permanecem em [`docs/evidencias-aula05/`](docs/evidencias-aula05/).

## Pendências externas

- Configurar PostgreSQL hospedado, definir `DATABASE_URL` na Vercel e aplicar a migration de produção.
- Investigar e corrigir os erros atualmente observados na publicação (`/empresas/aurora-tech` com HTTP 500 e `/api/empresas/aurora-tech` com HTTP 503) após a configuração do banco.
- Confirmar com a equipe a divisão das quatro frentes, as revisões de PR e o envio dos links finais.
- Repetir a auditoria completa dos enunciados quando o curso e o briefing estiverem acessíveis; a URL do desafio 07 segue indisponível.
- Consultar a equipe sobre procedimento de correção e exclusão dos dados pessoais armazenados nas candidaturas.
