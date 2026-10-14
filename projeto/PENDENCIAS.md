# Próximos ajustes do Leque de Vagas

## Publicação

- Configurar um provedor PostgreSQL e cadastrar `DATABASE_URL` na Vercel.
- Aplicar a migration de produção com `npm run prisma:migrate:deploy` antes de usar gravações na hospedagem.
- Publicar a correção do modo de consulta. A Vercel está sem variáveis de ambiente; antes da correção, `/empresas/aurora-tech` respondia HTTP 500 e a API HTTP 503. Sem PostgreSQL, as gravações continuam indisponíveis.
- Migrar os dados do SQLite local se eles precisarem ser mantidos na nova instância PostgreSQL.

## Confirmações do projeto

- Revalidar os requisitos exatos dos desafios 01–06 quando o curso e o briefing estiverem acessíveis. O desafio 07 retornou 404 na verificação de 14/10/2026.
- Confirmar eventuais evidências exigidas pelo enunciado oficial.
- Definir como atender pedidos de correção ou exclusão de dados de candidaturas.

Autenticação, painel administrativo e funcionalidades de checkpoints posteriores ficam fora do escopo atual.
