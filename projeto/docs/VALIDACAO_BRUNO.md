# Validação da implementação da aula 06

Revisão local em 14/10/2026. A branch `entrega-desafios` e o commit `d4c4140` citados nos arquivos recebidos não existiam neste checkout; a implementação partiu da `main` em `5cfe635`. Este relatório registra apenas verificações feitas aqui.

## Verificado

- `npx prisma migrate dev --name persistencia_catalogo`: criou e aplicou a migration inicial com `Vaga`, `Empresa`, `Candidatura` e `SincronizacaoCatalogo`.
- `npm run lint` e `npm run build`: passaram. As rotas com dados mutáveis ficaram dinâmicas; `GET /api/empresas/aurora-tech` respondeu 200.
- GET `/vagas` sincronizou as 12 vagas do JSON no banco; a revisão do catálogo foi gravada.
- POST real ao formulário `/vagas/nova` respondeu 303 para um detalhe novo e criou a vaga no SQLite.
- POST real ao formulário de candidatura criou uma linha relacionada à vaga; POST de arquivamento marcou a vaga com `arquivada = true`.
- Uma vaga temporária continuou visível no detalhe após parar e reiniciar `npm start`. A linha de teste e a candidatura criadas durante a conferência foram removidas depois.

## Ainda requer evidência humana ou ambiente de publicação

- Prints de Node/npm, `loading`, erro, 404 e Prisma Studio; vídeos da criação e do arquivamento com estado do botão e atualização visual sem recarga.
- Experimento visual comparando `revalidateTag` e `revalidatePath` numa página já aberta, mais medida documentada das consultas antes e depois. Este relatório não afirma que esses experimentos foram feitos.
- Revisão cruzada, PR e autoria dos commits pelo Bruno. A autenticação GitHub encontrada nesta máquina era `Harlen539`, não Bruno.
- Banco hospedado persistente para a Vercel. O SQLite local verifica o desafio em desenvolvimento, mas não resolve gravações duráveis no site público.
