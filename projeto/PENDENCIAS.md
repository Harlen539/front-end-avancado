# Próximos ajustes do Leque de Vagas

## Publicação

- Configurar um provedor PostgreSQL e cadastrar `DATABASE_URL` na Vercel.
- Aplicar a migration de produção com `npm run prisma:migrate:deploy` antes de usar gravações na hospedagem.
- Confirmar a publicação após configurar o banco. Na última verificação, `/empresas/aurora-tech` respondeu HTTP 500 e `/api/empresas/aurora-tech` respondeu HTTP 503; os logs necessários não estavam disponíveis.
- Migrar os dados do SQLite local se eles precisarem ser mantidos na nova instância PostgreSQL.

## Confirmações do projeto

- Revalidar os requisitos exatos dos desafios 01–06 quando o curso e o briefing estiverem acessíveis. O desafio 07 retornou 404 na verificação de 14/10/2026.
- Confirmar eventuais evidências exigidas pelo enunciado oficial.
- Definir como atender pedidos de correção ou exclusão de dados de candidaturas.

Autenticação, painel administrativo e funcionalidades de checkpoints posteriores ficam fora do escopo atual.
