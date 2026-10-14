# Pendências — Leque de Vagas

Estado revisto em 14/10/2026 na branch `codex/leque-vagas-revisao`. Este arquivo registra o que foi conferido e o que depende de configuração ou confirmação; ele não atribui autoria individual às alterações desta revisão.

## Implementado nesta revisão

- Busca com debounce sem sincronização de estado em efeito; filtros por área, senioridade e iniciante preservados e combináveis pela URL.
- Navegação compartilhável com Voltar/Avançar, limpeza de parâmetros, contagem e estado vazio.
- Tailwind CSS integrado aos controles de busca e filtros, junto ao CSS de identidade existente.
- Persistência local SQLite preservada e configuração alternativa PostgreSQL com schema e migration separados para produção.
- Confirmação da candidatura informa a quantidade de habilidades. “Corrigir alguma coisa” atualiza o registro existente; o fallback nativo mantém o envio sem JavaScript.
- Arquivo duplicado `projeto/FormularioDeCandidatura.tsx` removido após confirmar que as páginas importavam `components/FormularioDeCandidatura.tsx`.
- Instalação limpa, migrations locais, lint, build e fluxos de navegador registrados em [`docs/VALIDACAO_REVISAO.md`](docs/VALIDACAO_REVISAO.md).

## Falta configurar para publicação persistente

- Escolher/configurar um provedor PostgreSQL e cadastrar `DATABASE_URL` na Vercel sem publicar credenciais.
- Aplicar `npx prisma migrate deploy --schema prisma/postgres/schema.prisma` ao banco de produção antes de aceitar gravações.
- A publicação consultada continua respondendo HTTP 500 em `/empresas/aurora-tech` e HTTP 503 em `/api/empresas/aurora-tech`. Os logs históricos da Vercel não estavam disponíveis no plano conectado; não foi possível atribuir causa confirmada nem verificar a correção online.
- Planejar importação se dados do SQLite local precisarem migrar para a nova instância PostgreSQL.

## Fontes e enunciados

- O índice do curso e o briefing não puderam ser carregados nesta revisão. Portanto, a conferência dos desafios 01–06 parte das referências e registros já versionados junto ao código; os requisitos oficiais exatos precisam ser revalidados quando as páginas estiverem acessíveis.
- A URL do desafio 07 foi consultada novamente em 14/10/2026 e retornou 404. Nenhum requisito foi deduzido do título.
- O Checkpoint 1 foi tratado separadamente: os registros do projeto pedem Tailwind, responsividade e acessibilidade básica. Login, painel administrativo e outras entregas de checkpoints posteriores não foram implementados.

## Evidências e participação da equipe

- Capturas e gravações reais dos fluxos desta revisão estão em [`docs/evidencias-revisao/`](docs/evidencias-revisao/); as capturas históricas da aula 05 permanecem em [`docs/evidencias-aula05/`](docs/evidencias-aula05/).
- Faltam as capturas de ambiente (`node -v`/`npm -v`) e a imagem de duas abas visíveis simultaneamente, caso o enunciado oficial ainda as exija. A diferença de metadata de duas empresas foi verificada em navegador, mas não foi registrada nesse formato de captura.
- O experimento comparando `revalidateTag` com `revalidatePath` e a medição formal de quantidade/duração de consultas não foram executados nesta revisão. O curso não forneceu enunciado acessível para confirmar método e critério; registrar como pendente, sem afirmar resultado.
- Os nomes registrados são Harlen Henrick, Bruno Venâncio, Carlos Eduardo e Alyssa Lima. A distribuição das quatro frentes, aprovações de PR e envio de links devem ser confirmados pela equipe; não inventar atribuições ou revisões.
- Depoimentos e reflexões pessoais continuam sendo responsabilidade de cada integrante.

## Etapas posteriores

Autenticação, autorização, painel, CRUD restante, CI, testes automatizados adicionais, performance e SEO ficam para os checkpoints com enunciados publicados. A política para pedidos de correção/exclusão de e-mails de candidatura também precisa ser definida pela equipe.
