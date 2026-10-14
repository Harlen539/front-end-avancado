# Validação da revisão

Executada em 14/10/2026, em Windows, Node.js 22.20.0 e npm 11.13.0.

- `npm ci`: concluído; Prisma Client gerado no postinstall.
- `npm run lint`: passou sem erros.
- `npm run build`: passou com Next.js 16.4.1.
- `npx prisma validate`: schema SQLite válido.
- `DATABASE_URL=postgresql://local:local@127.0.0.1:5432/leque npx prisma validate --schema prisma/postgres/schema.prisma`: schema PostgreSQL válido. URL fictícia usada apenas para validar configuração; nenhuma conexão ou migration de produção foi executada.
- Verificações de navegador e persistência local estão registradas nas capturas desta pasta. O banco SQLite de desenvolvimento foi restaurado após os fluxos de teste.
- `npm audit`: restam 8 vulnerabilidades altas (3 em dependências de produção), ligadas principalmente ao Prisma/deepmerge-ts. `npm audit fix --force` propõe downgrade de versões principais; não foi aplicado.

O build produziu as rotas institucionais estáticas e as rotas dinâmicas de vagas, empresas e API. Veja [`../PENDENCIAS.md`](../PENDENCIAS.md) para configuração PostgreSQL/Vercel, estado do serviço publicado e itens que dependem da equipe ou de fontes indisponíveis.
