# Front-end Avançado

Repositório das atividades e do projeto desenvolvido na disciplina de Front-end Avançado.

## Projeto do semestre: Leque de Vagas

Aplicação Next.js para consultar vagas de tecnologia, conhecer empresas e enviar candidaturas. O código da aplicação está em [`projeto/`](projeto/README.md).

- Repositório: [Harlen539/front-end-avancado](https://github.com/Harlen539/front-end-avancado)
- Publicação conhecida: [leque-de-vagas.vercel.app](https://leque-de-vagas.vercel.app/)
- Curso: [Introdução ao Next.js](https://aulas.umlequedetecnologia.com.br/cursos/introducao-nextjs)
- Briefing: [Leque de Vagas](https://cdn.aulas.umlequedetecnologia.com.br/public/introducao-nextjs/projeto/brief.html)

## Equipe

Integrantes registrados: Harlen Henrick, Bruno Venâncio, Carlos Eduardo e Alyssa Lima. A divisão das quatro frentes não está comprovada nos registros consultados; ela deve ser confirmada pela equipe antes de ser atribuída.

Este README descreve o repositório e não atribui experiências pessoais, reflexões ou revisões a integrantes.

## Estado da entrega

- Os desafios 01–06 estão representados no projeto, com criação e edição por Server Actions, validação Zod, filtros por área, senioridade e iniciante, e persistência local SQLite.
- O Checkpoint 1 inclui os filtros na URL e a adoção inicial de Tailwind CSS, preservando o CSS visual já existente.
- A configuração de PostgreSQL e as migrations para produção estão versionadas. Para persistir dados na Vercel, ainda é preciso fornecer uma conexão PostgreSQL e aplicar a migration; SQLite local não é armazenamento persistente na Vercel.
- O enunciado da aula 07 retornou 404 na conferência de 14/10/2026. Não há requisito dessa aula implementado com base em suposição.
- Login, painel administrativo e demais entregas de checkpoints posteriores ficam fora do escopo publicado e verificado desta etapa.

Consulte [`projeto/README.md`](projeto/README.md) para instalação, execução, rotas, persistência, validação e pendências de evidência. As decisões sobre fontes e dados estão em [`DADOS.md`](DADOS.md).
