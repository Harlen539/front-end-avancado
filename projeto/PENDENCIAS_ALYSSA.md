# Pendências da Alyssa — Leque de Vagas

Levantamento em 14/10/2026, comparando o código local com os [desafios 01–06](https://aulas.umlequedetecnologia.com.br/cursos/introducao-nextjs) e o [briefing do projeto](https://cdn.aulas.umlequedetecnologia.com.br/public/introducao-nextjs/projeto/brief.html). Esta é uma divisão de trabalho para Bruno e Alyssa subirem as pendências. Não atribui retroativamente a eles as quatro frentes originais.

## Pré-requisito

Atualização de 14/10/2026: a integração técnica do banco, de Empresa e de Candidatura foi feita na branch local `bruno/aula-06-persistencia` para manter a aplicação funcional. Os itens marcados abaixo como concluídos ainda precisam da revisão e dos commits próprios da Alyssa. A política de tipos e fontes está em `../DADOS.md`; a confirmação da equipe continua pendente.

## Parte da Alyssa: empresas, candidaturas e filtros

### 1. Empresa no banco — aula 06

- [x] O model `Empresa` está no `prisma/schema.prisma` e `guardarEmpresa` grava no banco sem mudar o slug; revisar a implementação e a migration compartilhada.
- [x] `DADOS.md` registra a precedência do banco; `buscarEmpresa` e `listarEmpresas` a aplicam. Falta a confirmação de Bruno e Alyssa sobre a decisão.
- [x] `GET /api/empresas/[slug]` devolve JSON ou 404. Esse Route Handler é exigência **nova da aula 06**; a proibição de `app/api/` valia para a aula 05.
- [ ] Editar uma empresa, reiniciar o servidor e confirmar que a alteração persiste. Documentar no PR a regra de precedência das fontes.

### 2. Candidatura no banco — aula 06

- [x] O model `Candidatura` tem relação com `Vaga` e a migration foi criada; vagas do JSON são espelhadas no banco antes de receber candidaturas.
- [x] `guardarCandidatura` grava no banco pela Server Action existente, preservando a validação Zod e o POST sem JavaScript.
- [x] O detalhe mostra a contagem de candidaturas do banco e a ação recusa ID de vaga inexistente; revisar visualmente a mensagem do formulário.
- [ ] Enviar uma candidatura, reiniciar o servidor e confirmar que o registro e a contagem persistem. No PR, escrever uma frase sobre como atender a um pedido de exclusão de candidatura, pois o e-mail passa a ficar armazenado.

### 3. Filtros ainda pedidos pelo briefing do Checkpoint 1

- [ ] A listagem atual guarda `busca` e `area` em `useState` dentro de `components/MuralDeVagas.tsx`. O [briefing](https://cdn.aulas.umlequedetecnologia.com.br/public/introducao-nextjs/projeto/brief.html) pede filtros por **área, senioridade e aceita iniciante**, com estado na URL via `searchParams`. Acrescentar os dois filtros que faltam e tornar o resultado compartilhável por link.
- [ ] Conferir links com filtros, botão Voltar do navegador, contagens e estado vazio. Combinar com Bruno a relação entre esses filtros e a consulta ao banco após a migração.
- [ ] O briefing também pede Tailwind, responsividade e acessibilidade básica no Checkpoint 1; o projeto usa CSS comum. Planejar e registrar a adaptação visual com a equipe para o checkpoint, sem confundir essa exigência com os desafios 01–06, que pediam CSS comum.

### 4. Evidências antigas sob responsabilidade da Alyssa

- [ ] Completar no README os **nomes e frentes dos quatro integrantes**, após confirmar com a equipe. Hoje as quatro células dizem “preencher”. Se a equipe tem três integrantes, registrar a exceção e a divisão da frente 4 conforme o briefing. O histórico local mostra commits de Harlen e Carlos, mas não comprova commits próprios de Bruno e Alyssa; conferir no GitHub e garantir participação real daqui para frente.
- [ ] Adicionar prints reais de duas empresas diferentes com títulos distintos na aba do navegador, exigidos no [desafio 04](https://cdn.aulas.umlequedetecnologia.com.br/public/introducao-nextjs/aula-04-data-fetching/desafio.html).
- [ ] Registrar as demonstrações pedidas no [desafio 05](https://cdn.aulas.umlequedetecnologia.com.br/public/introducao-nextjs/aula-05-server-actions/desafio.html): edição com erros por campo e sucesso também em `/empresas`; candidatura com “Enviando…” e confirmação; print de envio sem JavaScript. Já há prints em `docs/evidencias-aula05`, mas ainda faltam os vídeos exigidos para as frentes de empresa e candidatura.
- [ ] Rever com a equipe as descrições e revisões dos PRs antigos. Documentar apenas PRs e reviews que realmente ocorreram; não criar evidência retroativa fictícia. Cada novo PR da aula 06 precisa de revisão cruzada.
- [ ] Conferir o README da raiz do repositório: ainda há marcadores `TODO` dentro das explicações pessoais. A redação final e a reflexão sobre dificuldade devem ser das pessoas da equipe. Confirmar que os links finais do site e repositório foram enviados ao grupo; isso não é verificável apenas pelo código.

### 5. Entrega da Alyssa

- [ ] Abrir branch e PR próprios, com commits feitos pela conta da Alyssa, migrations da sua parte e prints do Prisma Studio com empresa e candidatura persistidas. Pedir revisão de outra frente antes do merge.
- [ ] Após integrar com Bruno, executar `npm run lint`, `npm run build` e testar uma clonagem limpa com `npm i && npx prisma migrate dev`. Conferir os fluxos das aulas 03–05 para evitar regressões.

## Estado do desafio 07 e etapas posteriores

O índice do curso mostra um link para o desafio 07, mas em 14/10/2026 a URL do [desafio 07](https://cdn.aulas.umlequedetecnologia.com.br/public/introducao-nextjs/aula-07-autenticacao-e-autorizacao/desafio.html) responde **404**. Por isso, não há enunciado verificável para dividir entre vocês. Conferir quando for publicado.

O briefing prevê, para checkpoints posteriores, autenticação e autorização, CRUD completo de vagas, painel, testes, CI, performance e SEO. São metas do semestre; não devem ser marcadas como requisitos já publicados dos desafios 01–06. A equipe ainda precisará planejá-las quando chegarem os respectivos enunciados.
